#!/bin/sh
set -e

: "${MG_PATH:=/usr/local/mapguideopensource-4.0.0}"

export PATH="${MG_PATH}/server/bin:${PATH}"
export MENTOR_DICTIONARY_PATH="${MG_PATH}/share/gis/coordsys"
if [ -n "${FDOVER:-}" ]; then
  export LD_LIBRARY_PATH="/usr/local/fdo-${FDOVER}/lib:${LD_LIBRARY_PATH:-}"
  export NLSPATH="/usr/local/fdo-${FDOVER}/nls/%N:${NLSPATH:-}"
fi
mkdir -p /var/lock/mgserver
ln -sf "${MG_PATH}/server/bin/mapguidectl" /usr/local/bin/mapguidectl

SLEEPTIME=1
NO_APACHE=0
NO_TOMCAT=0
MG_PIDFILE=/var/run/mapguide.pid
STOP_REQUESTED=0
LOG_STDOUT_PID=0
LOG_STDERR_PID=0
MGLOG_PATH="${MG_PATH}/server/Logs"
MGAPACHE_LOG="${MG_PATH}/webserverextensions/apache2/logs"
MGTOMCAT_LOG="${MG_PATH}/webserverextensions/tomcat/logs"
LOG_TAIL_PIDS=""

STREAM_ACCESS=1
STREAM_ADMIN=0
STREAM_AUTH=0
STREAM_APACHE_ACCESS=0
STREAM_APACHE_MOD_JK=0
STREAM_TOMCAT_OUT=0
EXTRA_STDOUT_LOGS=""
EXTRA_STDERR_LOGS=""

setup_log_files(){
  mkdir -p "${MGLOG_PATH}" "${MGAPACHE_LOG}" "${MGTOMCAT_LOG}"
  touch \
    "${MGLOG_PATH}/Access.log" \
    "${MGLOG_PATH}/Admin.log" \
    "${MGLOG_PATH}/Authentication.log" \
    "${MGLOG_PATH}/Error.log" \
    "${MGAPACHE_LOG}/access_log" \
    "${MGAPACHE_LOG}/mod_jk.log" \
    "${MGAPACHE_LOG}/error_log" \
    "${MGTOMCAT_LOG}/catalina.out" \
    "${MGTOMCAT_LOG}/catalina.err"
}

start_log_streams(){
  if [ "${STREAM_ACCESS}" -eq 1 ]; then
    start_stdout_tail "${MGLOG_PATH}/Access.log"
  fi
  if [ "${STREAM_ADMIN}" -eq 1 ]; then
    start_stdout_tail "${MGLOG_PATH}/Admin.log"
  fi
  if [ "${STREAM_AUTH}" -eq 1 ]; then
    start_stdout_tail "${MGLOG_PATH}/Authentication.log"
  fi
  if [ "${STREAM_APACHE_ACCESS}" -eq 1 ]; then
    start_stdout_tail "${MGAPACHE_LOG}/access_log"
  fi
  if [ "${STREAM_APACHE_MOD_JK}" -eq 1 ]; then
    start_stdout_tail "${MGAPACHE_LOG}/mod_jk.log"
  fi
  if [ "${STREAM_TOMCAT_OUT}" -eq 1 ]; then
    start_stdout_tail "${MGTOMCAT_LOG}/catalina.out"
  fi

  for f in ${EXTRA_STDOUT_LOGS}; do
    start_stdout_tail "${f}"
  done

  # Errors are always streamed by default.
  start_stderr_tail "${MGLOG_PATH}/Error.log"
  start_stderr_tail "${MGAPACHE_LOG}/error_log"
  start_stderr_tail "${MGTOMCAT_LOG}/catalina.err"

  for f in ${EXTRA_STDERR_LOGS}; do
    start_stderr_tail "${f}"
  done
}

stop_log_streams(){
  for pid in ${LOG_TAIL_PIDS}; do
    kill "${pid}" 2>/dev/null || true
  done
  LOG_TAIL_PIDS=""
}

start_stdout_tail(){
  tail -n0 -F "$1" &
  LOG_TAIL_PIDS="${LOG_TAIL_PIDS} $!"
}

start_stderr_tail(){
  tail -n0 -F "$1" >&2 &
  LOG_TAIL_PIDS="${LOG_TAIL_PIDS} $!"
}

enable_stream_log(){
  case "$1" in
    access)
      STREAM_ACCESS=1
    ;;
    admin)
      STREAM_ADMIN=1
    ;;
    authentication)
      STREAM_AUTH=1
    ;;
    apache-access)
      STREAM_APACHE_ACCESS=1
    ;;
    apache-mod-jk)
      STREAM_APACHE_MOD_JK=1
    ;;
    tomcat-out)
      STREAM_TOMCAT_OUT=1
    ;;
    *)
      echo "error: unsupported --stream-log value '$1'" >&2
      echo "hint: use access|admin|authentication|apache-access|apache-mod-jk|tomcat-out" >&2
      exit 1
    ;;
  esac
}

start_apache(){
  echo "Starting Apache..."
  cd "${MG_PATH}/webserverextensions/apache2/bin"
  ./apachectl start
}

start_tomcat(){
  echo "Starting tomcat..."
  cd "${MG_PATH}/webserverextensions/tomcat/bin"
  ./startup.sh
}

start_mg(){
  echo "Starting mgserver..."
  "${MG_PATH}/server/bin/mapguidectl" start
  "${MG_PATH}/server/bin/mapguidectl" status | sed -n 's/[^0-9]//gp' | head -n 1 | tee "${MG_PIDFILE}"
}

stop_all(){
  stop_log_streams

  if [ "${NO_APACHE}" -eq 0 ]; then
    echo "Stopping Apache server..."
    cd "${MG_PATH}/webserverextensions/apache2/bin"
    ./apachectl stop
  fi

  if [ "${NO_TOMCAT}" -eq 0 ]; then
    echo "Stopping Tomcat server..."
    cd "${MG_PATH}/webserverextensions/tomcat/bin"
    ./shutdown.sh
  fi

  echo "Stopping Mapguide server..."
  cd "${MG_PATH}/server/bin"
  ./mapguidectl stop
}

handle_signal(){
  STOP_REQUESTED=1
  stop_all
  exit 0
}

print_help(){
  echo "Help: "
  echo  ""
  echo "--only-mapguide\t\tstart only mapguide server"
  echo "--no-apache\t\tdon't start apache server"
  echo "--no-tomcat\t\tdon't start tomcat server"
  echo "--stream-log\t\tenable extra stdout log stream (repeatable): access|admin|authentication|apache-access|apache-mod-jk|tomcat-out"
  echo "--stream-stdout-file\tstream an additional file to stdout (repeatable)"
  echo "--stream-stderr-file\tstream an additional file to stderr (repeatable)"
  echo "--crash-time\t1\tSeconds to sleep before restart, after crash"
  echo "Default streams:\tAccess.log + error logs"
  echo "--help show this help"
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    -h|--help)
      print_help
      exit 0
    ;;
    --only-mapguide)
      NO_APACHE=1
      NO_TOMCAT=1
      shift
    ;;
    --no-apache)
      NO_APACHE=1
      shift
    ;;
    --no-tomcat)
      NO_TOMCAT=1
      shift
    ;;
    --stream-log)
      if [ "$#" -lt 2 ]; then
        echo "error: --stream-log requires a value" >&2
        exit 1
      fi
      enable_stream_log "$2"
      shift 2
    ;;
    --stream-stdout-file)
      if [ "$#" -lt 2 ]; then
        echo "error: --stream-stdout-file requires a path" >&2
        exit 1
      fi
      EXTRA_STDOUT_LOGS="${EXTRA_STDOUT_LOGS} $2"
      shift 2
    ;;
    --stream-stderr-file)
      if [ "$#" -lt 2 ]; then
        echo "error: --stream-stderr-file requires a path" >&2
        exit 1
      fi
      EXTRA_STDERR_LOGS="${EXTRA_STDERR_LOGS} $2"
      shift 2
    ;;
    --crash-time)
      if [ "$#" -lt 2 ]; then
        echo "error: --crash-time requires a numeric value" >&2
        exit 1
      fi
      case "$2" in
        ''|*[!0-9]*)
          echo "error: the --crash-time must be a number" >&2
          exit 1
        ;;
        *)
          SLEEPTIME="$2"
          shift 2
        ;;
      esac
    ;;
    *)
      echo "Invalid option. Use --help for usage." >&2
      echo "$0 --help" >&2
      exit 2
    ;;
  esac
done

trap handle_signal INT TERM

setup_log_files
start_log_streams

start_mg

if [ "${NO_APACHE}" -eq 0 ]; then
  start_apache
fi

if [ "${NO_TOMCAT}" -eq 0 ]; then
  start_tomcat
fi

while true; do
  sleep "${SLEEPTIME}"
  if [ "${STOP_REQUESTED}" -eq 1 ]; then
    exit 0
  fi
  pid="$(cat "${MG_PIDFILE}" 2>/dev/null || true)"
  if [ "${STOP_REQUESTED}" -eq 0 ] && { [ -z "${pid}" ] || [ ! -e "/proc/${pid}/exe" ]; }; then
    echo "MapGuide stopped unexpectedly and will be restarting..."
    start_mg
  fi
done