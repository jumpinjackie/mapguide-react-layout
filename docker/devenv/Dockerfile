# Developer environment image for MapGuide Open Source on Ubuntu 22.04
FROM ubuntu:22.04

ENV MG_PATH=/usr/local/mapguideopensource-4.0.0
ENV DEBIAN_FRONTEND=noninteractive
ENV DOWNLOAD_PATH=/tmp
ENV MAPGUIDE_INSTALLER=mapguideopensource-4.0.0.10202-ubuntu22-install.run
ENV MAPGUIDE_INSTALLER_URL=https://download.osgeo.org/mapguide/releases/4.0.0/Final/mapguideopensource-4.0.0.10202-ubuntu22-install.run

RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates software-properties-common wget \
 && add-apt-repository -y multiverse \
 && apt-get update \
 && echo "ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true" | debconf-set-selections \
 && apt-get install -y --no-install-recommends fontconfig ttf-mscorefonts-installer \
 && wget -O "${DOWNLOAD_PATH}/${MAPGUIDE_INSTALLER}" "${MAPGUIDE_INSTALLER_URL}" \
 && chmod +x "${DOWNLOAD_PATH}/${MAPGUIDE_INSTALLER}" \
 && "${DOWNLOAD_PATH}/${MAPGUIDE_INSTALLER}" -- --headless --with-sdf --with-shp --with-sqlite --with-gdal --with-ogr --with-rdbms --with-wfs --with-wms --no-service-install --no-mgserver-start \
 && rm -f "${DOWNLOAD_PATH}/${MAPGUIDE_INSTALLER}" \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/* /tmp/* /var/tmp/* /root/.cache/* \
 && rm -f /root/.wget-hsts

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8008

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
