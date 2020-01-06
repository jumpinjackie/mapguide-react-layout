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
   * `ColorPicker`
   * `ActivityIndicator`
   * `Print` (QuickPlot supercedes this)
   * `SaveMap` (QuickPlot supercedes this)
   * `LinkToView` (Replaced with `ShareLinkToView` component)
   * `SelectRadiusValue` (Replacement planned)
   * `PanQuery`
   * `PanOnClick`
 * Due to lack of Google Maps integration, the Google Street View widget is not supported if referenced in an Application Definition (and will not be ported across due to current technical and legal constraints)

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

 * [#34](https://github.com/jumpinjackie/mapguide-react-layout/issues/34): Digitization tools have poor user experience on mobile/tablet devices
 * [#34](https://github.com/jumpinjackie/mapguide-react-layout/issues/34): Feature Tooltips does not work on mobile/tablet devices
 * Due to lack of Google Maps integration, if an Application Definition references Google Maps layers, they will be ignored
