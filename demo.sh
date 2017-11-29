#!/bin/sh
mkdir -p pgdata;
(cd docker/demo; docker build -t mapguide-react .) && \
(cd docker/postgres; docker build . -t mapguide-db) && \
#docker run -p 80:8008 --rm \
#  --mount type=bind,source="$(pwd)"/viewer,target=/usr/local/mapguideopensource-3.1.0/webserverextensions/www/viewer \
#  --mount type=bind,source="$(pwd)"/fusion,target=/usr/local/mapguideopensource-3.1.0/webserverextensions/www/fusion \
#  -t mapguide-react --no-tomcat
docker stack deploy -c docker/docker-compose.yml webgis && docker service ls
