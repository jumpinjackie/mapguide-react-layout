# Components in mapguide-react-layout

Components are the building blocks of features unique to mapguide-react-layout. They are analogous to widgets in the Fusion viewer.

## Component Registry

The component registry defines the master list of components that are available to access from the viewer. If you use the standard production viewer bundle, this list is fixed.

If you use the npm module, you can incorporate new custom components into the component registry.

## Accessing Components

Components can be accessed through existing `InvokeURL` commands. Instead of using URLs, you would provide a custom `component://` URI instead.

Component URIs are structured as follows:

`component://[component name][?query]`

For components that accept parameters, you would pass them through the query string of the Component URI.

Component URIs in an `InvokeURL` command behave just like normal URLs invoked by an `InvokeURL` command except you cannot invoke a component URI into a specific frame, only in a Task Pane or a New Window (which mapguide-react-layout will re-interpret as opening in a modal dialog)

## Available Components

The following components are available in mapguide-react-layout

### Coordinate Tracker

[Demo](https://jumpinjackie.github.io/mapguide-react-layout/master/storybook-static/index.html?path=/story/container-components--coordinate-tracker)

URI Format: `component://CoordinateTracker[?projection=proj1[&projection=proj2]]`

#### Description:

Fusion's `CoordinateTracker` widget ported to mapguide-react-layout. 

NOTE: Any existing CoordinateTracker widget reference in a Fusion Application Definition is already supported.
Setting up a new InvokeURL widget with this component URI is not necessary. This is listed here for reference only.

### Share Link To View

URI Format: `component://ShareLinkToView`

#### Description:

A component that presents a shareable URL to the current map view.

### Add/Manage Layers

[Demo](https://jumpinjackie.github.io/mapguide-react-layout/master/storybook-static/index.html?path=/story/container-components--external-layer-manager)

URI Format: `component://AddManageLayers`

#### Description:

A component that allows one to add custom external layers to the current map.

This component supports adding 2 kinds of data

 * Local files in any of the following formats:
    * CSV
    * GeoJSON
    * KML
    * TopoJSON
    * GPX
    * IGC
 * Remote data source in any of the following formats:
    * WMS
    * WFS

For vector data, you may specify what projection the data is in. Default is EPSG:4326. The
list of available projections is:

 * EPSG:4326
 * EPSG:3857 (and other aliases of it)
 * Any other projection found amongst your Map Definition and/or pre-registered before mounting the viewer (see: [Known Issues / Viewer](KNOWN_ISSUES.md#viewer))

For WFS, please observe the following restrictions:

 1. The viewer bundle does not include the `GML` format driver due to bundle size. Therefore, the add layer UI will omit layers that does not offer a `GeoJSON` representation when inspecting capabilities.
 2. Added WFS layers will load all features up-front.

For CSV files, please observe the following behavior:

 1. It will be accepted as a CSV file if it contains any of the following column headers (case-insensitive) representing point coordinates and the first sampled row is verified to contain numeric data:

      * `x`, `y`
      * `lon`, `lat`
      * `lng`, `lat`
      * `longitude`, `latitude`
      * `easting`, `northing`

 2. It will skip over any row where there is missing/incomplete point coordinate data