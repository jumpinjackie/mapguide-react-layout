0.6.2
=====

 * [#79](https://github.com/jumpinjackie/mapguide-react-layout/issues/79): Update OpenLayers to 3.19.1
 * [#81](https://github.com/jumpinjackie/mapguide-react-layout/issues/81): Check that the `resource` parameter is specified
 * [#84](https://github.com/jumpinjackie/mapguide-react-layout/issues/84): Fix `DisplayInLegend` property of layers and groups not being used to determine visibility of legend items
 * Better/improved tiled layer support
   * [#84](https://github.com/jumpinjackie/mapguide-react-layout/issues/84): Fix incorrect scale range visbility check for layers in legend
   * [#83](https://github.com/jumpinjackie/mapguide-react-layout/issues/83): Ensure zoom actions and slider drags in Navigator (aka. Zoom slider) snap to the finite scale list for tiled maps

0.6.1
=====

 * [#76](https://github.com/jumpinjackie/mapguide-react-layout/issues/76): Fix init error when loading map containing raster layers

0.6
===

 * [#75](https://github.com/jumpinjackie/mapguide-react-layout/issues/75): Refactored flyout menus to be physically de-coupled from their toolbars
    * [#52](https://github.com/jumpinjackie/mapguide-react-layout/issues/52): Task Pane flyout menu will now properly show over the task pane when it has embedded (ActiveX/Flash/etc) content in IE.
 * [#74](https://github.com/jumpinjackie/mapguide-react-layout/issues/74): Implemented ExecuteMapAction AJAX Viewer API.
 * [#47](https://github.com/jumpinjackie/mapguide-react-layout/issues/47): Viewer now supports passing in Application Definition resource ids
    * See [KNOWN_ISSUES.md](https://github.com/jumpinjackie/mapguide-react-layout/blob/master/KNOWN_ISSUES.md) for features not yet supported
 * [#64](https://github.com/jumpinjackie/mapguide-react-layout/issues/64): New layout template: Aqua
    * This is a port of the equivalent Fusion template
 * [#33](https://github.com/jumpinjackie/mapguide-react-layout/issues/33): Update toolbar CSS in Sidebar layout template so that it better blends in.
 * [#65](https://github.com/jumpinjackie/mapguide-react-layout/issues/65): Page document title will now be set to the title of the Web Layout / Application Definition if specified
 * [#60](https://github.com/jumpinjackie/mapguide-react-layout/issues/60): Fix bad relative path to webconfig.ini that causes most server-side tools to fail
 * [#55](https://github.com/jumpinjackie/mapguide-react-layout/issues/55): Handle and show startup errors
 * [#40](https://github.com/jumpinjackie/mapguide-react-layout/issues/40): Measure tool now requires explicit start/stop of measurements
 * [#66](https://github.com/jumpinjackie/mapguide-react-layout/issues/66): Error placeholders now shown for toolbar/menu items for invalid command references
 * [#59](https://github.com/jumpinjackie/mapguide-react-layout/issues/59): Enable feature tooltips by default
 * [#73](https://github.com/jumpinjackie/mapguide-react-layout/issues/73): Fix incorrect ratio for ol.source.ImageMapGuide resulting in image requests that are bigger than viewport
 * [#71](https://github.com/jumpinjackie/mapguide-react-layout/issues/71), [#72](https://github.com/jumpinjackie/mapguide-react-layout/issues/72), [#29](https://github.com/jumpinjackie/mapguide-react-layout/issues/29): Set active tool to nothing before digitizing, ensuring selection isn't triggered when drawing
 * Selection Panel now respects attribute display order of Layer Definition
 * [#70](https://github.com/jumpinjackie/mapguide-react-layout/issues/70): Projections for unknown EPSG codes will now be requested from https://epsg.io
 * Added OL controls to base map viewer component
    * Overview Map
    * [#62](https://github.com/jumpinjackie/mapguide-react-layout/issues/62) Rotation reset 
 * [#53](https://github.com/jumpinjackie/mapguide-react-layout/issues/53) Code base migrated to TypeScript 2.0
    * [#54](https://github.com/jumpinjackie/mapguide-react-layout/issues/54) Null-safety compiler options enabled
    * [#56](https://github.com/jumpinjackie/mapguide-react-layout/issues/56) `noImplicitAny` compiler option enabled

0.4
===

Initial release