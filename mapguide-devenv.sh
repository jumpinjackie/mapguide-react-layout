#!/bin/sh
# Helper script to build and run the MapGuide developer environment image.
set -e

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
DOCKERFILE_PATH="${SCRIPT_DIR}/docker/devenv/Dockerfile"
BUILD_CONTEXT="${SCRIPT_DIR}/docker/devenv"

IMAGE_NAME="mrl-devenv-mapguide:optimized"
CONTAINER_NAME="mrl-devenv-mapguide"
HOST_PORT="8008"
CONTAINER_PORT="8008"
PACKAGES_HOST_DIR=""
REPOSITORIES_HOST_DIR=""
WWW_HOST_DIR=""
TARGET_DIR=""
DETACH=0
REMOVE=1
USE_Z=1
BUILD_NO_CACHE=0
BUILD_PULL=0
BUILD_PROGRESS=""
RUN_DO_BUILD=0
STREAM_LOGS=""
STREAM_STDOUT_FILES=""
STREAM_STDERR_FILES=""
CONTAINER_ENGINE=""
ENGINE_OVERRIDE=""

print_help() {
  cat <<'EOF'
Build or run the MapGuide developer environment image.

Usage:
  ./mapguide-devenv.sh <command> [options] [-- <entrypoint args>]

Commands:
  build                      Build the image only
  run                        Run the container only
  up                         Build (optional) and run the container

Global options:
  --image <name>             Image name (default: mrl-devenv-mapguide:optimized)
  --engine <docker|podman>   Force container engine instead of auto-detecting
  -h, --help                 Show help

Build options (for build and up):
  --no-cache                 Build without cache
  --pull                     Pull newer base image
  --progress <mode>          Build progress mode (e.g. plain)

Run options (for run and up):
  --packages-dir <host_dir>  Host dir mounted to .../server/Packages (required)
  --repositories-dir <host_dir> Host dir mounted to .../server/Repositories (required)
  --www-dir <host_dir>       Host dir mounted to .../webserverextensions/www/<target_dir> (required)
  --target-dir <dir_name>    Relative subdir under www (required)
  --name <name>              Container name (default: mrl-devenv-mapguide)
  --host-port <port>         Host port mapped to container 8008 (default: 8008)
  --detach                   Run in background
  --no-rm                    Keep container after stop
  --no-z                     Do not append :Z to bind mounts
  --build                    Build image before running (run only)
  --stream-log <name>        Enable extra entrypoint stream (repeatable)
                             Supported: access|admin|authentication|apache-access|apache-mod-jk|tomcat-out
  --stream-stdout-file <path> Stream additional file to container stdout (repeatable)
  --stream-stderr-file <path> Stream additional file to container stderr (repeatable)

Runtime defaults:
  Container engine selection prefers docker and falls back to podman.
  The container entrypoint is always invoked with --no-tomcat.
  Log streaming defaults to Access.log + error logs.

Caveat:
  Repeated --stream-stdout-file/--stream-stderr-file values are space-split.
  Use paths without spaces for these options.

Examples:
  ./mapguide-devenv.sh build --image mrl-devenv-mapguide:optimized --no-cache

  ./mapguide-devenv.sh run \
    --packages-dir /data/mg-packages \
    --repositories-dir /data/mg-repositories \
    --www-dir /data/mg-web \
    --target-dir myapp \
    --stream-log admin

  ./mapguide-devenv.sh up \
    --pull \
    --packages-dir /data/mg-packages \
    --repositories-dir /data/mg-repositories \
    --www-dir /data/mg-web \
    --target-dir myapp \
    --stream-log apache-access
EOF
}

select_container_engine() {
  if [ -n "${ENGINE_OVERRIDE}" ]; then
    if command -v "${ENGINE_OVERRIDE}" >/dev/null 2>&1; then
      CONTAINER_ENGINE="${ENGINE_OVERRIDE}"
      return
    fi

    echo "error: requested engine '${ENGINE_OVERRIDE}' was not found in PATH" >&2
    exit 1
  fi

  if command -v docker >/dev/null 2>&1; then
    CONTAINER_ENGINE="docker"
  elif command -v podman >/dev/null 2>&1; then
    CONTAINER_ENGINE="podman"
  else
    echo "error: neither docker nor podman was found in PATH" >&2
    exit 1
  fi
}

build_image() {
  set -- build -t "${IMAGE_NAME}" -f "${DOCKERFILE_PATH}"

  if [ "${BUILD_NO_CACHE}" -eq 1 ]; then
    set -- "$@" --no-cache
  fi
  if [ "${BUILD_PULL}" -eq 1 ]; then
    set -- "$@" --pull
  fi
  if [ -n "${BUILD_PROGRESS}" ]; then
    set -- "$@" --progress "${BUILD_PROGRESS}"
  fi

  set -- "$@" "${BUILD_CONTEXT}"
  "${CONTAINER_ENGINE}" "$@"
}

validate_run_inputs() {
  [ -n "${PACKAGES_HOST_DIR}" ] || { echo "error: --packages-dir is required" >&2; exit 1; }
  [ -n "${REPOSITORIES_HOST_DIR}" ] || { echo "error: --repositories-dir is required" >&2; exit 1; }
  [ -n "${WWW_HOST_DIR}" ] || { echo "error: --www-dir is required" >&2; exit 1; }
  [ -n "${TARGET_DIR}" ] || { echo "error: --target-dir is required" >&2; exit 1; }

  case "${HOST_PORT}" in
    ''|*[!0-9]*)
      echo "error: --host-port must be numeric" >&2
      exit 1
    ;;
  esac

  case "${TARGET_DIR}" in
    /*)
      echo "error: --target-dir must be relative (no leading slash)" >&2
      exit 1
    ;;
    *..*)
      echo "error: --target-dir cannot contain '..'" >&2
      exit 1
    ;;
  esac

  mkdir -p "${PACKAGES_HOST_DIR}" "${REPOSITORIES_HOST_DIR}" "${WWW_HOST_DIR}"

  PACKAGES_HOST_DIR="$(readlink -f "${PACKAGES_HOST_DIR}" 2>/dev/null || true)"
  REPOSITORIES_HOST_DIR="$(readlink -f "${REPOSITORIES_HOST_DIR}" 2>/dev/null || true)"
  WWW_HOST_DIR="$(readlink -f "${WWW_HOST_DIR}" 2>/dev/null || true)"

  [ -n "${PACKAGES_HOST_DIR}" ] || { echo "error: invalid --packages-dir path" >&2; exit 1; }
  [ -n "${REPOSITORIES_HOST_DIR}" ] || { echo "error: invalid --repositories-dir path" >&2; exit 1; }
  [ -n "${WWW_HOST_DIR}" ] || { echo "error: invalid --www-dir path" >&2; exit 1; }
}

run_container() {
  ENTRYPOINT_ARGS="$*"
  PACKAGES_CONTAINER_DIR="/usr/local/mapguideopensource-4.0.0/server/Packages"
  REPOSITORIES_CONTAINER_DIR="/usr/local/mapguideopensource-4.0.0/server/Repositories"
  WWW_CONTAINER_DIR="/usr/local/mapguideopensource-4.0.0/webserverextensions/www/${TARGET_DIR}"
  MOUNT_SUFFIX=""

  if [ "${USE_Z}" -eq 1 ]; then
    MOUNT_SUFFIX=":Z"
  fi

  set -- run
  if [ "${DETACH}" -eq 1 ]; then
    set -- "$@" -d
  fi
  if [ "${REMOVE}" -eq 1 ]; then
    set -- "$@" --rm
  fi

  set -- "$@" \
    --name "${CONTAINER_NAME}" \
    -p "${HOST_PORT}:${CONTAINER_PORT}" \
    -v "${PACKAGES_HOST_DIR}:${PACKAGES_CONTAINER_DIR}${MOUNT_SUFFIX}" \
    -v "${REPOSITORIES_HOST_DIR}:${REPOSITORIES_CONTAINER_DIR}${MOUNT_SUFFIX}" \
    -v "${WWW_HOST_DIR}:${WWW_CONTAINER_DIR}${MOUNT_SUFFIX}" \
    "${IMAGE_NAME}" \
    --no-tomcat

  for stream_log in ${STREAM_LOGS}; do
    set -- "$@" --stream-log "${stream_log}"
  done

  for stdout_file in ${STREAM_STDOUT_FILES}; do
    set -- "$@" --stream-stdout-file "${stdout_file}"
  done

  for stderr_file in ${STREAM_STDERR_FILES}; do
    set -- "$@" --stream-stderr-file "${stderr_file}"
  done

  if [ -n "${ENTRYPOINT_ARGS}" ]; then
    # shellcheck disable=SC2086
    set -- "$@" ${ENTRYPOINT_ARGS}
  fi

  "${CONTAINER_ENGINE}" "$@"
}

[ "$#" -gt 0 ] || { print_help; exit 1; }

COMMAND="$1"
shift

case "${COMMAND}" in
  -h|--help)
    print_help
    exit 0
  ;;
  build|run|up)
  ;;
  *)
    echo "error: unknown command '${COMMAND}'" >&2
    print_help
    exit 1
  ;;
esac

select_container_engine

while [ "$#" -gt 0 ]; do
  case "$1" in
    --image)
      [ "$#" -ge 2 ] || { echo "error: --image requires a value" >&2; exit 1; }
      IMAGE_NAME="$2"
      shift 2
    ;;
    --engine)
      [ "$#" -ge 2 ] || { echo "error: --engine requires a value" >&2; exit 1; }
      case "$2" in
        docker|podman)
          ENGINE_OVERRIDE="$2"
        ;;
        *)
          echo "error: --engine must be 'docker' or 'podman'" >&2
          exit 1
        ;;
      esac
      shift 2
    ;;
    --packages-dir)
      [ "$#" -ge 2 ] || { echo "error: --packages-dir requires a path" >&2; exit 1; }
      PACKAGES_HOST_DIR="$2"
      shift 2
    ;;
    --repositories-dir)
      [ "$#" -ge 2 ] || { echo "error: --repositories-dir requires a path" >&2; exit 1; }
      REPOSITORIES_HOST_DIR="$2"
      shift 2
    ;;
    --www-dir)
      [ "$#" -ge 2 ] || { echo "error: --www-dir requires a path" >&2; exit 1; }
      WWW_HOST_DIR="$2"
      shift 2
    ;;
    --target-dir)
      [ "$#" -ge 2 ] || { echo "error: --target-dir requires a value" >&2; exit 1; }
      TARGET_DIR="$2"
      shift 2
    ;;
    --name)
      [ "$#" -ge 2 ] || { echo "error: --name requires a value" >&2; exit 1; }
      CONTAINER_NAME="$2"
      shift 2
    ;;
    --host-port)
      [ "$#" -ge 2 ] || { echo "error: --host-port requires a value" >&2; exit 1; }
      HOST_PORT="$2"
      shift 2
    ;;
    --detach)
      DETACH=1
      shift
    ;;
    --no-rm)
      REMOVE=0
      shift
    ;;
    --no-z)
      USE_Z=0
      shift
    ;;
    --build)
      RUN_DO_BUILD=1
      shift
    ;;
    --stream-log)
      [ "$#" -ge 2 ] || { echo "error: --stream-log requires a value" >&2; exit 1; }
      STREAM_LOGS="${STREAM_LOGS} $2"
      shift 2
    ;;
    --stream-stdout-file)
      [ "$#" -ge 2 ] || { echo "error: --stream-stdout-file requires a path" >&2; exit 1; }
      STREAM_STDOUT_FILES="${STREAM_STDOUT_FILES} $2"
      shift 2
    ;;
    --stream-stderr-file)
      [ "$#" -ge 2 ] || { echo "error: --stream-stderr-file requires a path" >&2; exit 1; }
      STREAM_STDERR_FILES="${STREAM_STDERR_FILES} $2"
      shift 2
    ;;
    --no-cache)
      BUILD_NO_CACHE=1
      shift
    ;;
    --pull)
      BUILD_PULL=1
      shift
    ;;
    --progress)
      [ "$#" -ge 2 ] || { echo "error: --progress requires a value" >&2; exit 1; }
      BUILD_PROGRESS="$2"
      shift 2
    ;;
    -h|--help)
      print_help
      exit 0
    ;;
    --)
      shift
      break
    ;;
    *)
      echo "error: unknown option '$1'" >&2
      print_help
      exit 1
    ;;
  esac
done

case "${COMMAND}" in
  build)
    build_image
    ;;
  run)
    if [ "${RUN_DO_BUILD}" -eq 1 ]; then
      build_image
    fi
    validate_run_inputs
    run_container "$@"
    ;;
  up)
    build_image
    validate_run_inputs
    run_container "$@"
    ;;
esac
