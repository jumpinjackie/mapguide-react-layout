FROM brucepc/mapguide

RUN apt-get -qq update
RUN apt-get -qq -y install wget curl unzip msttcorefonts
RUN wget https://github.com/jumpinjackie/mapguide-react-layout/releases/download/v0.8/viewer.zip -O /tmp/viewer.zip
RUN wget https://github.com/jumpinjackie/mapguide-sample-melbourne/releases/download/v0.2/Melbourne.mgp -O /usr/local/mapguideopensource-3.1.0/server/Packages/Melbourne.mgp
RUN unzip /tmp/viewer.zip -d /usr/local/mapguideopensource-3.1.0/webserverextensions/www
ADD index.php /usr/local/mapguideopensource-3.1.0/webserverextensions/www
# RUN curl -u Administrator:admin -s -i -X POST -d 'MAX_FILE_SIZE=100000000' -d 'OPERATION=APPLYRESOURCEPACKAGE' -d 'VERSION=1.0.0' -d 'LOCALE=en' -d PACKAGE=/tmp/Melbourne.mgp "http://localhost:8008/mapguide/mapagent/mapagent.fcgi"