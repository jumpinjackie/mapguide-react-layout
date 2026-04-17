# mapguide-react-layout

[![npm version](https://badge.fury.io/js/mapguide-react-layout.svg)](https://badge.fury.io/js/mapguide-react-layout)
[![Build Status](https://github.com/jumpinjackie/mapguide-react-layout/actions/workflows/main.yml/badge.svg?branch=master)](https://github.com/jumpinjackie/mapguide-react-layout/actions/workflows/main.yml)
[![Coverage Status](https://coveralls.io/repos/github/jumpinjackie/mapguide-react-layout/badge.svg?branch=master)](https://coveralls.io/github/jumpinjackie/mapguide-react-layout?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/jumpinjackie/mapguide-react-layout/badge.svg?targetFile=package.json)](https://snyk.io/test/github/jumpinjackie/mapguide-react-layout?targetFile=package.json)

mapguide-react-layout is a modern map viewer for MapGuide.

It is built from the ground up with modern web technologies ([React](https://facebook.github.io/react/), [OpenLayers](http://openlayers.org/), [TypeScript](https://www.typescriptlang.org/)) to be **the definitive map viewer** for [MapGuide Open Source](http://mapguide.osgeo.org) or [Autodesk Infrastructure Map Server](http://www.autodesk.com/products/infrastructure-map-server/overview)

It aims for major compatibility with the existing Web Layout (AJAX Viewer) and Flexible Layout (Fusion) configuration documents that drive the existing AJAX and Fusion map viewers, ensuring an authoring and development experience similar to MapGuide's existing viewer offerings.

This project is not affiliated with Autodesk or OSGeo.

# Requirements

 * MapGuide Open Source 3.0 or equivalent version of Autodesk Infrastructure Map Server (and newer versions)
 * A [**modern web browser**](http://browsehappy.com/). Practically speaking, this means any of the following:
    * Google Chrome (stable channel)
    * Mozilla Firefox (stable channel)
    * ~~Internet Explorer 11. Older versions (intentionally) not supported.~~
    * Microsoft Edge
    * For mobile devices:
      * iOS: Mobile Safari
      * Android: Google Chrome or Mozilla Firefox
 * For development: node.js 18.x or newer
    * Make sure corepack is enabled: `corepack enable`

# Installation - From Source

 1. Clone this repository
 2. Run from the command-line: `yarn install`
 3. Either:
    * Copy the `viewer` directory to MapGuide's physical wwwroot directory
    * Map the `viewer` directory as a child virtual directory under the MapGuide's wwwroot in your web server of choice (IIS or Apache)
 4. Launch the viewer using a pre-defined template (see `Templates` below)

# Installation - From release package

 1. Download the `viewer.zip` from the `Releases` section
 2. Extract the archive to MapGuide's physical wwwroot directory
 3. Launch the viewer using a pre-defined template (see `Templates` below)

# MapGuide Dev Container

If you need a MapGuide Server to run this viewer against but don't want to install MapGuide bare metal, a Dockerfile is included to easily build and spin up. A convenience `mapguide-devenv.sh` is included to facilitate this.

To build the MapGuide docker image:

```
./mapguide-devenv.sh build
```

To spin up this MapGuide docker container:

```
./mapguide-devenv.sh run --packages-dir $PWD/docker/devenv/packages --www-dir $PWD/viewer --target-dir viewer --repositories-dir $PWD/docker/devenv/server-data
```

The MapGuide web tier will then be accessible from port 8008. The server's repository data is volume mounted to `docker/devenv/server-data` so your data will persist between container runs.

If you need to load any packages, drop the .mgp files into `docker/devenv/packages` and then load them with the Site Administrator accessible at:

http://localhost:8008/mapguide/mapadmin/login.php

The viewer will be accessible from `viewer` like so:

http://localhost:8008/mapguide/viewer/index.html?resource=Library://Samples/Sheboygan/Layouts/SheboyganPhp.WebLayout

To faciliate a rapid developer loop for your viewer against this running MapGuide Server, run `yarn watch:dev` after spinning up the MapGuide container.

# Templates

See [TEMPLATES.md](https://github.com/jumpinjackie/mapguide-react-layout/blob/master/docs_dev/content/TEMPLATES.md) for more information ahout the templates provided with this viewer and how to launch the viewer with a given template

# Known Issues

See [KNOWN_ISSUES.md](https://github.com/jumpinjackie/mapguide-react-layout/blob/master/docs_dev/content/KNOWN_ISSUES.md)

# Release Notes

See [RELEASE_NOTES.md](https://github.com/jumpinjackie/mapguide-react-layout/blob/master/docs_dev/content/RELEASE_NOTES.md)

# Credits

mapguide-react-layout could not be possible without the following tools and libraries:

 * [OpenLayers](http://openlayers.org/)
 * [proj4js](http://proj4js.org/)
 * [TypeScript](https://www.typescriptlang.org/)
 * [React](https://facebook.github.io/react/)
 * [Blueprint](http://blueprintjs.com/)
 * [sidebar-v2](https://github.com/Turbo87/sidebar-v2)

mapguide-react-layout uses icons from the Fugue icons set, by [Yusuke Kamiyamane](http://p.yusukekamiyamane.com)

# License

mapguide-react-layout is licensed under the MIT license.