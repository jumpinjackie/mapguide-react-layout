Known viewer issues are documented here.

Where applicable, an issue number is attached to indicate that such issues are actioned to be resolved.

Localization
============

 * No known issues

Components
==========

 * Task Pane
   * URLs loaded into the task pane push actual entries into the browser's navigation stack
   * The internal navigation stack does not gracefully handle multi-map configurations. In a multi-map configuration, it is possible to go back/forward to a page that is not applicable to the current map, especially if it was visited while on a different map.

 * Toolbars
   * Toolbars in vertical orientation currently make no attempts to gracefully handle overflow when the toolbar has more items than the physical screen/container space allows. 

 * Measure
   * This component does not work properly in a multi-map configuration

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

 * Due to lack of Google Maps integration, the Google Street View widget is not supported if reference in an Application Definition (and will not be ported across due to current technical and legal constraints) 

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
 * Due to lack of Google Maps integration, if an Application Definition references Google Maps layers, they will be ignored

Templates
=========

 * Aqua:
   * Floating windows for Legend / Selection / Task Pane have fixed width and height
   * Legend / Selection / Task Pane toggle actions are hard-coded into the template, as a result the existing InvokeScript widgets that would've performed this action are redundant
