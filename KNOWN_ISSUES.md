Known viewer issues are documented here.

Where applicable, an issue number is attached to indicate that such issues are actioned to be resolved.

Localization
============

 * If including a localized string bundle via a script tag, be sure to specify `charset="UTF-8"` in the script tag, otherwise diacritics (eg. umlauts) in any string literals will most likely be garbled.

Components
==========

 * Task Pane
   * URLs loaded into the task pane push actual entries into the browser's navigation stack
   * [#52](https://github.com/jumpinjackie/mapguide-react-layout/issues/52): On IE11, the `Tasks` flyout menu won't properly display over the Task Pane content if it is showing plugin content (eg. The Task Pane is showing a PDF document inline via a PDF viewer plugin)

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

 * [#34](https://github.com/jumpinjackie/mapguide-react-layout/issues/34): Digitization tools have poor user experience on mobile/tablet devices
 * [#34](https://github.com/jumpinjackie/mapguide-react-layout/issues/34): Feature Tooltips does not work on mobile/tablet devices

Templates
=========

 * No known issues
