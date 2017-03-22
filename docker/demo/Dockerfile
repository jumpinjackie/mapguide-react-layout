FROM brucepc/mapguide

ENV DEBIAN_FRONTEND noninteractive

# ---------
# MULTIVERSE
# ---------
RUN apt-get update
RUN apt-get install -y --no-install-recommends software-properties-common wget unzip curl
RUN apt-add-repository multiverse
RUN apt-get update

# ---------
# MS CORE FONTS
# ---------
# from http://askubuntu.com/a/25614
RUN echo "ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true" | debconf-set-selections
RUN apt-get install -y --no-install-recommends fontconfig ttf-mscorefonts-installer
# ADD localfonts.conf /etc/fonts/local.conf
# RUN fc-cache -f -v

RUN wget https://github.com/jumpinjackie/mapguide-react-layout/releases/download/v0.8/viewer.zip -O /tmp/viewer.zip
RUN wget https://github.com/jumpinjackie/mapguide-sample-melbourne/releases/download/v0.2/Melbourne.mgp -O /usr/local/mapguideopensource-3.1.0/server/Packages/Melbourne.mgp
RUN unzip /tmp/viewer.zip -d /usr/local/mapguideopensource-3.1.0/webserverextensions/www
ADD index.php /usr/local/mapguideopensource-3.1.0/webserverextensions/www
# RUN curl -u Administrator:admin -s -i -X POST -d 'MAX_FILE_SIZE=100000000' -d 'OPERATION=APPLYRESOURCEPACKAGE' -d 'VERSION=1.0.0' -d 'LOCALE=en' -d PACKAGE=/tmp/Melbourne.mgp "http://localhost:8008/mapguide/mapagent/mapagent.fcgi"