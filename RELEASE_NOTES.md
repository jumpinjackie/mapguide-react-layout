0.8
===
 * Update Blueprint to 1.9.0
 * Update React to 15.4.2
 * Improved performance due to restructured and optimized redux state tree and updates to minimize unnecessary re-rendering
 * [#108](https://github.com/jumpinjackie/mapguide-react-layout/issues/108): Added multi-map support
    * [#64](https://github.com/jumpinjackie/mapguide-react-layout/issues/64): Ported across MapMenu fusion widget

0.7.1
=====
 * [#64](https://github.com/jumpinjackie/mapguide-react-layout/issues/64): Fix accordion not showing last panel as initially expanded in Slate and Maroon templates
 * [#111](https://github.com/jumpinjackie/mapguide-react-layout/issues/111): Fix switching to fractional finite display scale not reflecting in scale dropdown
 * [#109](https://github.com/jumpinjackie/mapguide-react-layout/issues/109): Restore 'NONE' option in Base Layer Switcher component

0.7
===
 * [#98](https://github.com/jumpinjackie/mapguide-react-layout/issues/98): Updated to TypeScript 2.1
 * [#91](https://github.com/jumpinjackie/mapguide-react-layout/issues/91): Use [Blueprint](http://blueprintjs.com/) as UI foundation
   * Many UI elements updated/replaced/re-styled with blueprint equivalents
   * Menus (flyout and context) can now support multiple levels of nesting
   * Replaces the following components/libraries which have been removed
     * ol3-contextmenu
     * react-flyout
     * Our custom fontello icon set
 * Feature Tooltips are now toggle-able from Viewer Options
 * [#64](https://github.com/jumpinjackie/mapguide-react-layout/issues/64): All Fusion templates ported across
   * TurquoiseYellow
   * LimeGold
   * Slate
   * Maroon
 * Aqua template changes:
   * Added status bar
   * Changed to use Blueprint-styled modal dialogs
   * Task Pane window opens (if hidden) when an InvokeURL command is executed
 * Sidebar template changes:
   * Updated to use Blueprint icons and load spinner
 * More Fusion widgets ported over
   * [#96](https://github.com/jumpinjackie/mapguide-react-layout/issues/96): Geolocation
   * [#95](https://github.com/jumpinjackie/mapguide-react-layout/issues/95): Base map switcher
 * Now shows busy indicator on viewer startup instead of a "white screen of nothingness"
 * [#90](https://github.com/jumpinjackie/mapguide-react-layout/issues/90): Replaced `npm` with `yarn`
 * [#103](https://github.com/jumpinjackie/mapguide-react-layout/issues/103): non-`en` string bundles are now loaded on demand if the passed in `locale` parameter is not `en`
 * [#38](https://github.com/jumpinjackie/mapguide-react-layout/issues/38): Mouse cursor now updates based on active map tool
 * [#86](https://github.com/jumpinjackie/mapguide-react-layout/issues/86): Zoom slider position should now better reflect actual zoom (especially for tiled maps)
 * [#85](https://github.com/jumpinjackie/mapguide-react-layout/issues/85): Scale display is now editable. For tiled maps, this becomes a select dropdown of finite scales

0.6.2
=====

 * [#79](https://github.com/jumpinjackie/mapguide-react-layout/issues/79): Update OpenLayers to 3.19.1
 * [#87](https://github.com/jumpinjackie/mapguide-react-layout/issues/87): Update to TypeScript 2.0.10 and React 15.4.1
 * [#81](https://github.com/jumpinjackie/mapguide-react-layout/issues/81): Check that the `resource` parameter is specified
 * [#84](https://github.com/jumpinjackie/mapguide-react-layout/issues/84): Fix `DisplayInLegend` property of layers and groups not being used to determine visibility of legend items
 * [#88](https://github.com/jumpinjackie/mapguide-react-layout/issues/88): Fix property pane "spilling over" in non-Aqua templates when viewing a feature with lots of attributes
 * Better/improved tiled layer support
   * [#84](https://github.com/jumpinjackie/mapguide-react-layout/issues/84): Fix incorrect scale range visbility check for layers in legend
   * [#84](https://github.com/jumpinjackie/mapguide-react-layout/issues/84): Fix MapGuide base layer toggling not functioning properly in legend
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