#!/bin/sh
(cd docker/demo; docker build -t mapguide-react .)
# run without starting tomcat
docker run -p 80:8008 \
  --mount type=bind,source="$(pwd)"/viewer,target=/usr/local/mapguideopensource-3.1.0/webserverextensions/www/viewer \
  -t mapguide-react --no-tomcat
