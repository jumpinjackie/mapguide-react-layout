# mapguide-react-layout

[![npm version](https://badge.fury.io/js/mapguide-react-layout.svg)](https://badge.fury.io/js/mapguide-react-layout)
[![Build status](https://travis-ci.org/jumpinjackie/mapguide-react-layout.svg)](https://travis-ci.org/jumpinjackie/mapguide-react-layout)
[![Build status](https://ci.appveyor.com/api/projects/status/urdvk8788w6h26ae?svg=true)](https://ci.appveyor.com/project/jumpinjackie/mapguide-react-layout)
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
    * Internet Explorer 11. Older versions (intentionally) not supported.
    * Microsoft Edge
    * For mobile devices:
      * iOS: Mobile Safari
      * Android: Google Chrome or Mozilla Firefox
 * For development: node.js 6.x or newer
    * Make sure yarn is installed `npm install -g yarn`

# Installation - From Source

 1. Clone this repository
 2. Run from the command-line: `yarn install` (note: If this fails for you on Windows, just run it again - [Related issue](https://github.com/yarnpkg/yarn/issues/919))
 3. Either:
    * Copy the `viewer` directory to MapGuide's physical wwwroot directory
    * Map the `viewer` directory as a child virtual directory under the MapGuide's wwwroot in your web server of choice (IIS or Apache)
 4. Launch the viewer using a pre-defined template (see `Templates` below)

# Installation - From release package

 1. Download the `viewer.zip` from the `Releases` section
 2. Extract the archive to MapGuide's physical wwwroot directory
 3. Launch the viewer using a pre-defined template (see `Templates` below)

# Demo

See [DEMO.md](https://github.com/jumpinjackie/mapguide-react-layout/blob/master/docs_dev/content/DEMO.md) to find out how to use [play-with-docker](http://play-with-docker.com) easily set up a mapguide-react-layout demo site

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