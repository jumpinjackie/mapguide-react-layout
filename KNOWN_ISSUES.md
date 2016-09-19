Known viewer issues are documented here.

Where applicable, an issue number is attached to indicate that such issues are actioned to be resolved.

Components
==========

 * Task Pane
   * URLs loaded into the task pane push actual entries into the browser's navigation stack

 * Toolbars
   * Only one level of menu nesting is supported. Flyouts within Flyouts is not supported/implemented.
   * Toolbars currently make no attempts to gracefully handle overflow when the toolbar has more items than the physical screen/container space allows. 

Commands
========

 * General
   * The following commands are quick-and-dirty ports of their Fusion counterparts:
     * QuickPlot
       * The draggable map capturer box mode is not implemented
     * Buffer
     * Search
     * SelectWithin
   * The following Fusion widgets are also available, but must be accessed as InvokeURL commands:
     * FeatureInfo: `server/FeatureInfo/featureinfomain.php`
     * Query: `server/Query/querymain.php`
     * Redline: `server/Redline/markupmain.php`
     * Theme: `server/Theme/thememain.php`

 * InvokeURL commands
   * [#25](https://github.com/jumpinjackie/mapguide-react-layout/issues/25): Additional parameters not supported yet

 * InvokeScript commands
   * [#14](https://github.com/jumpinjackie/mapguide-react-layout/issues/14): InvokeScript commands are not supported. Once we implement a server-side wrapper, such commands will be supported.

 * Measure:
   * [#40](https://github.com/jumpinjackie/mapguide-react-layout/issues/40): While the UI is present, the viewer will be in "measure mode" 

Viewer
======

 * Viewer will only accept Map Definitions in coordinate systems that have a corresponding EPSG code

 * Map will silently fail to load if projection is not known to proj4js
   * Solution: Register the projection before the viewer is mounted
      * Example: `MapGuide.Externals.proj4.defs("EPSG:28355","+proj=utm +zone=55 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");`
      * You can find proj4js definitions at [epsg.io](http://epsg.io)
      * You will currently need to modify the respective template HTML file to include the projection

 * OpenLayers will render "buffered" versions of map images (possibly to take rotation into account). As a result, if your Map has watermarks, they may not be shown due to being cut off by the map viewport.

 * [#29](https://github.com/jumpinjackie/mapguide-react-layout/issues/29): When the active tool is select, it may interfere with digitization-based selection tools (eg. Select Radius/Polygon)
   * Workaround: Do not have the active tool as select before digitizing

 * [#34](https://github.com/jumpinjackie/mapguide-react-layout/issues/34): Digitization tools have poor user experience on mobile/tablet devices
 * [#34](https://github.com/jumpinjackie/mapguide-react-layout/issues/34): Feature Tooltips does not work on mobile/tablet devices

Templates
=========

 * No known issues
