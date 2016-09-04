# mapguide-react-layout

mapguide-react-layout is an experimental react-based map viewer for MapGuide.

It is built from the ground up with modern web technologies ([React](https://facebook.github.io/react/), [OpenLayers 3](http://openlayers.org/), [TypeScript](https://www.typescriptlang.org/)) to be **the definitive map viewer** for [MapGuide Open Source](http://mapguide.osgeo.org) or [Autodesk Infrastructure Map Server](http://www.autodesk.com/products/infrastructure-map-server/overview)

It aims for reasonable compatibility with the existing Web Layout and Flexible Layout (TODO) configuration documents that drive the existing AJAX and Fusion map viewers, ensuring an authoring and development experience similar to MapGuide's existing viewer offerings.

# Requirements

 * MapGuide Open Source 3.0 or equivalent version of Autodesk Infrastructure Map Server
 * A [**modern web browser**](http://browsehappy.com/). Practically speaking, this means any of the following:
    * Google Chrome (stable channel)
    * Mozilla Firefox (stable channel)
    * Internet Explorer 11. Older versions (intentionally) not supported.
    * For mobile devices:
      * iOS: Mobile Safari
      * Android: Google Chrome or Mozilla Firefox

# Installation

 1. Clone this repository
 2. Run from the command-line: `npm install`
 3. Either:
    * Copy the `viewer` directory to MapGuide's physical wwwroot directory
    * Map the `viewer` directory as a child virtual directory under the MapGuide's wwwroot in your web server of choice (IIS or Apache)
 4. You can launch the viewer as follows:
    * AJAX Viewer Template: `http://servername/mapguide/viewer/index.html`
    * Sidebar Template: `http://servername/mapguide/viewer/sidebar.html`
