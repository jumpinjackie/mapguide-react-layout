# Known Issues

Known viewer issues or limitations are documented here.

Where applicable, an issue number is attached to indicate that such issues are actioned to be resolved.

## Localization

 * No known issues. If you identify holes in localization (ie. You still see english text when using non-english locale and string bundles), please report such issues.

## Fusion compatibility

 * API
   * Only a subset of the Fusion events are supported (only what's necessary to support the widgets converted to work in this viewer)
   * [Only a subset of the Fusion client-side API](https://jumpinjackie.github.io/mapguide-react-layout/apicompat.html) is supported
 * The following widgets are not supported (and there are no plans to port across) due to incompatible widget semantics or their limited usefulness in the context of this viewer:
   * `GoogleStreetViewer`
   * `ColorPicker`
   * `ActivityIndicator`
   * `SaveMap` (QuickPlot supercedes this)
   * `LinkToView` (Replaced with `ShareLinkToView` component)
   * `SelectRadiusValue` (Replacement planned)
   * `Scalebar`
   * `ScalebarDual`
   * `PanQuery`
   * `PanOnClick`
 * Due to lack of Google Maps integration, the Google Street View widget is not supported if referenced in an Application Definition (and will not be ported across due to current technical and legal constraints)

## Maps using arbitrary coordinate systems

Since the `0.14.3` release, the viewer has basic support for MapGuide Map Definitions that use arbitrary coordinate systems. Please observe the following caveats.

 * The following coordinate system codes will be recognised as arbitrary:
   * `XY-M`: Units will be `Meters`
   * `XY-FT`: Units will be `Feet`
   * `XY-IN`: Units will be `Inches`
   * `XY-CM`: Units will be `Centimeters`
   * `XY-KM`: Units will be `Kilometers`
   * `XY-YD`: Units will be `Yards`
   * `XY-MM`: Units will be `Millimeters`
   * `XY-MI`: Units will be `Miles`
   * `XY-NM`: Units will be `NauticalMiles`
   * Any other arbitrary coordinate system is not supported
 * Any external layers (base or overlay) specified with the map in any map group are incompatible and init warnings will be displayed for such a configuration.
 * The following widgets are incompatible with such a map and init warnings are displayed for such widgets
   * `CoordinateTracker`
 * The measure tool will measure in cartesian distances for such maps instead of great circle distances
 * The view size widget will display the cartesian dimensions of the current map view in the units inferred from the arbitrary coordinate system.
 * Maps with arbitrary coordinate systems *cannot* currently be used in stateless mode

## Components

 * Task Pane
   * URLs loaded into the task pane push actual entries into the browser's navigation stack
   * ~~The internal navigation stack does not gracefully handle multi-map configurations. In a multi-map configuration, it is possible to go back/forward to a page that is not applicable to the current map, especially if it was visited while on a different map.~~ In a multi-map configuration, task pane content will be invalidated (with a UI warning) if it is not applicable for the current active map. In such cases, you need to re-run the applicable command again.

 * Toolbars
   * Toolbars in vertical orientation currently make no attempts to gracefully handle overflow when the toolbar has more items than the physical screen/container space allows.

 * Measure
   * Recorded measurements will temporarily disappear on templates with a collapsible Task Pane (eg. Slate) when the Task Pane panel is collapsed.

 * Modal dialog backdrops do not work (due to recent Blueprint update)

## Commands

 * General
   * The following commands are quick-and-dirty ports of their Fusion counterparts with the same UI and UX:
     * `Buffer`
     * `Search`
     * `SelectWithin`
   * The following Fusion widgets are also available, but must be accessed as InvokeURL commands:
     * FeatureInfo: `server/FeatureInfo/featureinfomain.php`
     * Query: `server/Query/querymain.php`
     * Redline: `server/Redline/markupmain.php`
     * Theme: `server/Theme/thememain.php`

 * InvokeScript commands
   * InvokeScript commands are not supported as-is. In the context of mapguide-react-layout, and InvokeScript command merely invokes a registered command of the same name in the command registry. The script content of such commands are completely ignored.

## Viewer

 * Viewer will only accept Map Definitions in coordinate systems that have a corresponding EPSG code

 * For maps with a projection that is not known to proj4js, the viewer will automatically attempt to find a matching definition from https://epsg.io
   * If you want to avoid this automatic external request, register the projection with proj4js before the viewer is mounted
      * Example: `MapGuide.Externals.proj4.defs("EPSG:28355","+proj=utm +zone=55 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");`
      * You can find proj4js definitions at [epsg.io](https://epsg.io)
      * You will currently need to modify the respective template HTML file to include the projection
   * Alternatively, as of 0.14.8 you can register custom projections without invasive viewer HTML modifications by specifyinjg the following top-level extension element in your appdef XML to auto-register any custom projections

```xml
<ApplicationDefinition>
  ...
  <Extension>
    <CustomProjections>
      <Projection epsg="26741">+proj=lcc +lat_1=41.66666666666666 +lat_2=40 +lat_0=39.33333333333334 +lon_0=-122 +x_0=609601.2192024384 +y_0=0 +ellps=clrk66 +datum=NAD27 +to_meter=0.3048006096012192 +no_defs</Projection>
      <Projection epsg="28355">+proj=utm +zone=55 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs</Projection>
    </CustomProjections>
  </Extension>
</ApplicationDefinition>
```

 * [#34](https://github.com/jumpinjackie/mapguide-react-layout/issues/34): Digitization tools have poor user experience on mobile/tablet devices
 * [#34](https://github.com/jumpinjackie/mapguide-react-layout/issues/34): Feature Tooltips does not work on mobile/tablet devices
 * Due to lack of Google Maps integration, if an Application Definition references Google Maps layers, they will be ignored


## Mapbox Vector Tiles

 * In order to display Mapbox Vector Tiles, your primary Map Definition (or the first layer of your external layer set in a generic viewer context) has to be in `EPSG:3857`
 * Despite being a vector layer, Mapbox Vector Tile layers are not selectable for performance reasons. To make them selectable, set the property `layer_opt_renderMode` to `feature` in your MVT external layer definition.

## UTFGrid tiles

Starting with the `0.14` release, the viewer supports UTFGrid tilesets with the following usage caveats:

 * You must pair it with a MapDefinition that has a coordinate system of `WGS84.PseudoMercator` (aka. `EPSG:3857`)

## GeoJSON layers as vector tile layers

Starting with the `0.14` release, the viewer supports external GeoJSON layers to be specified in the Application Definition and be loaded in initially as an external layer.

For "heavy" GeoJSON layers, you may specify a `meta_geojson_as_vt` property to `true` to indicate that that the GeoJSON data source should be loaded in as a Vector Tile layer.

Vector Tile layers perform better than regular vector layers as they can handle more features being displayed, but come with their own set of trade-offs

For this option to work, your main MapGuide map or Primary Subject Layer must be in `EPSG:3857`. If it is not in this projection, the layer will be loaded in as a regular GeoJSON layer and a warning will be logged to the browser console.

GeoJSON layers as vector tile layers are selectable, but for reasons currently unknown the selected features from these layers do not render properly (you can still see their feature attributes in a popup or selection panel)

## Stateless mode

Starting with the `0.14` release, the viewer supports a new "stateless" mode. In "stateless" mode, no MapGuide session ids are created and all viewer operations/commands that rely on session ids are permanently disabled. Map rendering is done through `GETMAPIMAGE` requests instead of `GETDYNAMICMAPOVERLAYIMAGE` requests.

There are several caveats to using stateless mode, which are detailed below:

 * Stateless mode is only supported in Application Definition resources. Stateless mode will never activate from a Web Layout.
 * You must add extra metadata to the `<Extension>` element of the `<Map>` element in the Application Definition 
   * `Meta_MentorCode`: The CS-Map coordinate system code (eg. `<Meta_MentorCode>WGS84.PseudoMercator</Meta_MentorCode>`)
   * `Meta_EpsgCode`: The EPSG code of the coordinate system (eg. `<Meta_EpsgCode>3857</Meta_EpsgCode>`)
   * `Meta_MetersPerUnit`: The meters-per-unit value of the coordinate system (eg. `<Meta_MetersPerUnit>1</Meta_MetersPerUnit>`)
 * Unsupported commands are logged as console warnings on viewer startup
 * There is no session id created, so any viewer API to get this session id will return an empty string
 * MapGuide selection is not supported due to its inherently stateful nature always requiring MAPNAME/SESSION parameters to work
   * Viewer selection is limited to selection of externally added WMS or vector layers
 * InvokeURL commands are supported to the extent that your command is assumed to be able to operate without a MAPNAME/SESSION parameter pair passed to it
 * To avoid excessive requests for the required information in stateless mode, the legend will present a simplified layer/group structure:
   * Said layers/groups are visible (in the legend) at all scale ranges
   * Layer items will not render their style icons
   * Layer items do not indicate selectability (due to MapGuide selection not being supported)
 * You can still mix Map Definitions with external XYZ layers like OSM without needing to re-project the Map Definition to `WGS84.PseudoMercator` (ie. `EPSG:3857`). Just make sure to set the Map Definition to having a background color with full transparency, otherwise the Map Definition's background will fully obscure the XYZ backdrop layer.