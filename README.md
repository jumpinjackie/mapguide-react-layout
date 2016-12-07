# mapguide-react-layout

[![Build Status](https://travis-ci.org/jumpinjackie/mapguide-react-layout.svg)](https://travis-ci.org/jumpinjackie/mapguide-react-layout)

mapguide-react-layout is an experimental react-based map viewer for MapGuide.

It is built from the ground up with modern web technologies ([React](https://facebook.github.io/react/), [OpenLayers 3](http://openlayers.org/), [TypeScript](https://www.typescriptlang.org/)) to be **the definitive map viewer** for [MapGuide Open Source](http://mapguide.osgeo.org) or [Autodesk Infrastructure Map Server](http://www.autodesk.com/products/infrastructure-map-server/overview)

It aims for reasonable compatibility with the existing Web Layout and Flexible Layout (TODO) configuration documents that drive the existing AJAX and Fusion map viewers, ensuring an authoring and development experience similar to MapGuide's existing viewer offerings.

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
 * For development: node.js 4.x or newer
    * Make sure yarn is installed `npm install -g yarn`

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

# Templates

The following templates are included with this viewer.

See [TEMPLATES.md](https://github.com/jumpinjackie/mapguide-react-layout/blob/master/TEMPLATES.md) for how to launch a viewer with the desired template

## AJAX Viewer

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/doc/ajax-viewer.png)

## Sidebar

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/doc/sidebar.png)

## Aqua

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/doc/aqua.png)

## LimeGold

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/doc/limegold.png)

## TurquoiseYellow

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/doc/turquoise-yellow.png)

# Known Issues

See [KNOWN_ISSUES.md](https://github.com/jumpinjackie/mapguide-react-layout/blob/master/KNOWN_ISSUES.md)

# Release Notes

See [RELEASE_NOTES.md](https://github.com/jumpinjackie/mapguide-react-layout/blob/master/RELEASE_NOTES.md)

# Credits

mapguide-react-layout could not be possible without the following tools and libraries:

 * [OpenLayers 3](http://openlayers.org/)
 * [proj4js](http://proj4js.org/)
 * [TypeScript](https://www.typescriptlang.org/)
 * [React](https://facebook.github.io/react/)
 * [Blueprint](http://blueprintjs.com/)
 * [sidebar-v2](https://github.com/Turbo87/sidebar-v2)

# License

mapguide-react-layout is licensed under the MIT license.