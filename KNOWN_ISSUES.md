Known viewer issues are documented here.

Where applicable, an issue number is attached to indicate that such issues are actioned to be resolved.

Localization
============

 * If including a localized string bundle via a script tag, be sure to specify `charset="UTF-8"` in the script tag, otherwise diacritics (eg. umlauts) in any string literals will most likely be garbled.

Components
==========

 * Navigator (aka. The zoom slider)
   * [#86](https://github.com/jumpinjackie/mapguide-react-layout/issues/86) While the zoom buttons and slider drags work, the component is initialized with an unrealistically high upper-bound view scale 

 * Task Pane
   * URLs loaded into the task pane push actual entries into the browser's navigation stack

 * Toolbars
   * Only one level of menu nesting is supported. Flyouts within Flyouts is not supported/implemented.
   * Toolbars in vertical orientation currently make no attempts to gracefully handle overflow when the toolbar has more items than the physical screen/container space allows. 

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

Viewer
======

 * Viewer will only accept Map Definitions in coordinate systems that have a corresponding EPSG code

 * For maps with a projection that is not known to proj4js, the viewer will automatically attempt to find a matching definition from https://epsg.io
   * If you want to avoid this automatic external request, register the projection with proj4js before the viewer is mounted
      * Example: `MapGuide.Externals.proj4.defs("EPSG:28355","+proj=utm +zone=55 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");`
      * You can find proj4js definitions at [epsg.io](https://epsg.io)
      * You will currently need to modify the respective template HTML file to include the projection

 * [#34](https://github.com/jumpinjackie/mapguide-react-layout/issues/34): Digitization tools have poor user experience on mobile/tablet devices
 * [#34](https://github.com/jumpinjackie/mapguide-react-layout/issues/34): Feature Tooltips does not work on mobile/tablet devices

Templates
=========

 * Aqua:
   * Floating windows for Legend / Selection / Task Pane have fixed width and height
   * Legend / Selection / Task Pane toggle actions are hard-coded into the template, as a result the existing InvokeScript widgets that would've performed this action are redundant
