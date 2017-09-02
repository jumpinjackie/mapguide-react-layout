#!/bin/sh
cd docker/demo
docker build -t jumpinjackie/mapguide-react-layout-demo .
docker run -p 8008:8008 -t jumpinjackie/mapguide-react-layout-demo --no-tomcat