# Viewer API Compatibility with AJAX/Fusion viewer

mapguide-react-layout offers a compatibility layer to make the process of migrating from an AJAX or Fusion viewer to require minimal to zero modifications.

The following APIs have been implemented

## AJAX Viewer

  * Main Frame
     * `ExecuteMapAction`
     * `GetMapFrame`
     * `mapFrame`
     * `formFrame`
     * Map Frame
        * `mapInit`
        * `ClearSelection`
        * `DigitizeCircle`
        * `DigitizeLine`
        * `DigitizePoint`
        * `DigitizePolygon`
        * `DigitizeLineString`
        * `DigitizeRectangle`
        * `GetCenter`
        * `GetLayers`
        * `GetMapName`
        * `GetMapHeight` (implemented in 0.11)
        * `GetMapUnitsType` (implemented in 0.11)
        * `GetMapWidth` (implemented in 0.11)
        * `GetMetersPerUnit`
        * `GetScale`
        * `GetSelectedBounds`
        * `GetSelectedCount`
        * `GetSelectedFeatures` (implemented in 0.11)
        * `GetSelectedLayers`
        * `GetSelectionXML`
        * `GetSessionId`
        * `IsDigitizing`
        * `IsEnglishUnits`
        * `IsLatLonDisplayUnits`
        * `Refresh`
        * `ScreenToMapUnits` (implemented in 0.11)
        * `SetEnglishUnits`
        * `SetLatLonDisplayUnits`
        * `SetSelectionXML`
        * `ZoomToView`
     * Form Frame
        * `Submit`

## Fusion

 * Fusion
     * `Fusion.ajaxRequest`
     * `Fusion.getMapByName`
     * `Fusion.getWidgetById` (only recognizes `Map` and `TaskPane`)
     * `Fusion.getWidgetsByType` (only recognizes `Redline`)
     * `Fusion.registerForEvent`
 * Widget Base
     * `registerForEvent`
     * `deregisterForEvent`
 * Map Widget
     * `mapWidget`
     * `getExtentFromPoint`
     * `setExtents`
     * `setActiveLayer`
     * `getActiveLayer`
     * `clearSelection`
     * `cancelDigitization`
     * `query`
     * `setSelection`
     * `getSelectedLayers`
     * `isBusy`
     * `isMapLoaded`
     * `redraw`
     * `reloadMap` (partially implemented, does not do legend refresh at the moment)
     * `pixToGeoMeasure`
     * `drawMap`
     * `digitizePoint`
     * `digitizeLine`
     * `digitizeLineString`
     * `digitizeRectangle`
     * `digitizePolygon`
     * `digitizeCircle`
     * `layerRoot`
        * `findLayerByAttribute`
     * `message`
        * `info`
        * `warn`
        * `error`
        * `clear`
 * Task Pane
     * `goHome`