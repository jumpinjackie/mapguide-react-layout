#!/bin/sh
cd docker/demo
docker build -t jumpinjackie/mapguide-react-layout-demo .
# run without starting tomcat
docker run -p 8008:8008 -t jumpinjackie/mapguide-react-layout-demo --no-tomcat