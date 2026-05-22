const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./chunks/deArrayify-debug.js","./vendor-debug.js","./vendor-debug.css","./chunks/geotiff-debug.js","./chunks/geotiff-deps-debug.js","./chunks/geotiff-codecs-debug.js"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { b2 as jsxRuntimeExports, _ as React, b8 as reactExports, $ as ReactDOM, X as Popover, bm as zt, F as Fe, b5 as proj4, b9 as register, bk as xor, bl as xorby, bi as useDispatch, bj as useSelector, Z as Provider, aD as createSelector, a$ as getWidth, aX as getHeight, b6 as purify, V as Point, u as LineString, W as Polygon, a2 as Rnd, aS as get, be as transform, h as Draggable, bg as unByKey, aW as getDistance, Y as Projection, aT as getArea, p as ImageMapGuide, S as Papa, l as GeoJSON, a7 as Stroke, k as Fill, a9 as Text, av as asArray, a8 as Style, a as CircleStyle, n as Icon$1, b as Cluster, aq as WebGLTileLayer, aj as VectorLayer, ak as VectorSource, ad as TileLayer, ae as TileWMS, K as KML, al as VectorTile, w as MVT, am as VectorTileLayer, ar as XYZ, o as ImageLayer, a6 as Static, aJ as equivalent, aR as geojsonvt, j as Feature, ah as UTFGrid, B as BingMaps, P as OSM, aa as TileDebug, D as DEVICE_PIXEL_RATIO, aF as createXYZ, ab as TileGrid, a_ as getTopLeft, ac as TileImage, L as LayerGroup, an as View, ai as UrlTile, M as METERS_PER_UNIT, as as Z, bb as toContext, aL as extend$1, b0 as index, H as Heatmap, r as ImageWMS, ap as WMSCapabilities, bf as transformExtent, b7 as reactDomExports, c as Collection, ag as Translate, aU as getCenter, Q as Overlay, ba as stickybits, aA as containsXY, aP as fromLonLat, C as Circle, v as LinearRing, aM as fromCircle, J as MultiLineString, N as MultiPoint, O as MultiPolygon, m as GeometryCollection, i as Draw, E as Extent, a5 as Snap, y as Modify, a4 as Select, ao as WKT, a1 as RegularShape, aZ as getRenderPixel, aI as easeOut, aC as createEmpty, R as OverviewMap, e as DragBox, g as DragRotate, f as DragPan, T as PinchRotate, U as PinchZoom, s as KeyboardPan, t as KeyboardZoom, z as MouseWheelZoom, A as Attribution, a3 as Rotate, x as Map$1, aw as buffer, q as ImageSource, aH as defaultImageLoadFunction, aG as debounce, b1 as isEmpty, aO as fromExtent, bh as update, az as configureStore$1, ay as combineReducers, af as TopoJSON, G as GPX, I as IGC, a0 as ReactDOM$1 } from "./vendor-debug.js";
import { _ as __vitePreload } from "./chunks/geotiff-debug.js";
import "./chunks/geotiff-deps-debug.js";
import "./chunks/geotiff-codecs-debug.js";
const NBSP = String.fromCharCode(160);
const DEG = String.fromCharCode(176);
const MDF_INFINITY = 1e12;
const WEBLAYOUT_TOOLBAR = "Toolbar";
const WEBLAYOUT_TASKMENU = "TaskMenu";
const WEBLAYOUT_CONTEXTMENU = "MapContextMenu";
const FUSION_TASKPANE_NAME = "TaskPane";
const FUSION_MAP_NAME = "Map";
const FUSION_REDLINE_NAME = "Redline";
const LAYER_ID_BASE = "LAYER_ID_BASE";
const LAYER_ID_MG_BASE = "LAYER_ID_MG_BASE";
const LAYER_ID_MG_DYNAMIC_OVERLAY = "LAYER_ID_MG_DYNAMIC_OVERLAY";
const LAYER_ID_MG_SEL_OVERLAY = "LAYER_ID_MG_SEL_OVERLAY";
const BLANK_GIF_DATA_URI = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
const STRINGS_EN = {
  "OK": "OK",
  "NONE": "NONE",
  "ERROR": "Error",
  "WARNING": "Warning",
  "PBMG": "Powered by <a href='https://mapguide.osgeo.org' target='_blank'>MapGuide</a>",
  "INIT_WARNINGS_FOUND": "The following warnings were encountered loading the viewer",
  "INIT_WARNING_STADIAMAPS_API_KEY_REQD": "A StadiaMaps API key is required. Sign up for an API key at https://stadiamaps.com/",
  "INIT_WARNING_BING_API_KEY_REQD": "A Bing Maps API key is required. Sign up for an API key at http://www.bingmapsportal.com/",
  "INIT_WARNING_BING_UNKNOWN_LAYER": "Unknown bing maps layer type {type}. This layer was skipped",
  "INIT_WARNING_UNSUPPORTED_GOOGLE_MAPS": "This viewer does not support Google Maps base layers",
  "INIT_WARNING_NO_CONTEXT_MENU": "Could not find the context menu configuration. Right-clicking the map will show an empty context menu. If you are loading from a Flexible Layout, it must have a container named '{containerName}'",
  "INIT_WARNING_WEBGL_UNSUPPORTED": "Your browser does not support WebGL. Certain features used by this viewer require WebGL support and do not work without this support",
  "LAYER_TRANSPARENCY": "Layer Transparency",
  "LAYER_ID_BASE": "Base Layers",
  "LAYER_ID_MG_BASE": "MapGuide Map",
  "LAYER_ID_SUBJECT": "Subject Layer",
  "LAYER_ID_MG_SEL_OVERLAY": "MapGuide Selection Overlay",
  "LAYER_ID_MG_BASE_LAYERS": "MapGuide Base Layers",
  "UNKNOWN_WIDGET": "This button references an unknown or unsupported widget: {widget}",
  "UNKNOWN_COMMAND_REFERENCE": "This button references an unknown command or unsupported: {command}",
  "INIT": "Initializing",
  "INIT_DESC": "Please wait while the viewer is loading required assets ...",
  "INIT_ERROR_TITLE": "An error occurred during startup",
  "INIT_ERROR_UNKNOWN_RESOURCE_TYPE": "<p>Unknown or unsupported resource type for resource: <strong>{resourceId}</strong></p>",
  "INIT_ERROR_MISSING_RESOURCE_PARAM": "<p>No <strong>resource</strong> parameter found. This viewer assumes this parameter to be set in the query string and must refer to a valid Web Layout or Application Definition. If not specified, it will try to init from a Application Definition document at <strong>appdef.json</strong></p>",
  "INIT_ERROR_UNSUPPORTED_COORD_SYS": "<p>The Map Definition <strong>{mapDefinition}</strong>, uses a coordinate system that does not resolve to a valid EPSG code and cannot be loaded in this viewer</p><p>Solution:</p><ul><li>Change the coordinate system of this Map Definition to one that resolves to an EPSG code</li><li>Please note: There will be a small performance overhead for server-side re-projection as a result of doing this</li></ul>",
  "INIT_ERROR_UNREGISTERED_EPSG_CODE": "<p>The Map Definition <strong>{mapDefinition}</strong>, uses a coordinate system that resolves to a valid EPSG code (<strong>EPSG:{epsg}</strong>), but no projection for this EPSG code has been registered</p><p>Solution:</p><ol><li>Search for the matching proj4js definition at <a href='https://spatialreference.org/'>https://spatialreference.org/</a></li><li>Register this projection to the viewer before mounting it</li></ol>",
  "INIT_ERROR_EXPIRED_SESSION": "<p>The session id given has expired: <strong>{sessionId}</strong></p><p>Reload the viewer without the <strong>session</strong> parameter, or supply a valid session id for the <strong>session</strong> parameter</p>",
  "INIT_ERROR_RESOURCE_NOT_FOUND": "Attempted to load the following resource, but it was not found: <strong>{resourceId}</strong>",
  "INIT_ERROR_NO_CONNECTION": "<p>There is no connection between the MapGuide Web Tier and the MapGuide Server.</p><p>Possible causes:</p><ul><li>MapGuide Server is not running or is no longer responding</li><li>Internet connection problems</li></ul><p>Possible solutions:</p><ul><li>Restart the MapGuide Server Service</li><li>Contact your server administrator</li></ul>",
  "TPL_SIDEBAR_OPEN_TASKPANE": "Open Task Pane",
  "TPL_SIDEBAR_OPEN_LEGEND": "Open Legend",
  "TPL_SIDEBAR_OPEN_SELECTION_PANEL": "Open Selection Panel",
  "TPL_TITLE_TASKPANE": "Task Pane",
  "TPL_TITLE_LEGEND": "Legend",
  "TPL_TITLE_SELECTION_PANEL": "Selection",
  "TT_GO_HOME": "Go home",
  "TT_GO_BACK": "Go back",
  "TT_GO_FORWARD": "Go forward",
  "SESSION_EXPIRED": "Session Expired",
  "SESSION_EXPIRED_DETAILED": "Your current MapGuide session has expired",
  "SESSION_EXPIRED_AVAILABLE_ACTIONS": "Available Actions:",
  "SESSION_EXPIRED_RELOAD_VIEWER": "Reload the viewer",
  "ERR_UNREGISTERED_LAYOUT": "ERROR: No layout named ({layout}) registered",
  "ERR_UNREGISTERED_COMPONENT": "ERROR: No such registered component ({componentId}). Ensure the component has been registered in the component registry with an id of: {componentId}",
  "ERR_NO_COMPONENT_ID": "No component id specified",
  "LOADING_MSG": "Loading ...",
  "MENU_TASKS": "Tasks",
  "NO_SELECTED_FEATURES": "No selected features",
  "FMT_SCALE_DISPLAY": "Scale - 1:{scale}",
  "FMT_SELECTION_COUNT": "Selected {total} feature(s) in {layerCount} layer(s)",
  "DIGITIZE_POINT_PROMPT": "Click to finish and draw a point at this location<br/><br/>Press ESC to cancel",
  "DIGITIZE_LINE_PROMPT": "Click to set this position as the start.<br/>Click again to finish the line at this position<br/><br/>Press ESC to cancel",
  "DIGITIZE_LINESTRING_PROMPT": "Click to set this position as the start.<br/>Click again to add a vertex at this position.<br/>If you drew a vertex at the wrong spot, you can press {key} to undo.<br/>Hold SHIFT and drag while digitizing to draw in freehand mode<br/></br>Double click to finish<br/>Press ESC to cancel",
  "DIGITIZE_CIRCLE_PROMPT": "Click to set this position as the center.<br/>Move out to the desired radius and click again to finish<br/><br/>Press ESC to cancel",
  "DIGITIZE_RECT_PROMPT": "Click to set this position as one corner.<br/>Click again to finish and set this position as the other corner<br/><br/>Press ESC to cancel",
  "DIGITIZE_POLYGON_PROMPT": "Click to set this positon as the start.<br/>Click again to add a vertex at this position.<br/>If you drew a vertex at the wrong spot, you can press {key} to undo<br/>Hold SHIFT and drag while digitizing to draw in freehand mode<br/><br/>Double click to finish and close the polygon<br/>Press ESC to cancel",
  "MEASURE": "Measure",
  "MEASURE_SEGMENT": "Segment",
  "MEASURE_LENGTH": "Length",
  "MEASURE_SEGMENT_PART": "Segment {segment}",
  "MEASURE_TOTAL_AREA": "Total Area",
  "MEASURE_TOTAL_LENGTH": "Total Length",
  "MEASURING": "Measuring",
  "MEASURING_MESSAGE": "You are currently measuring",
  "MEASUREMENT": "Measurement",
  "MEASUREMENT_TYPE": "Measurement Type",
  "MEASUREMENT_TYPE_LENGTH": "Length (LineString)",
  "MEASUREMENT_TYPE_AREA": "Area (Polygon)",
  "MEASUREMENT_CLEAR": "Clear",
  "MEASUREMENT_CONTINUE_POLYGON": "Click to continue drawing the polygon. Double-click to finish.",
  "MEASUREMENT_CONTINUE_LINE": "Click to continue drawing the line. Double-click to finish.",
  "MEASUREMENT_START_DRAWING": "Click to start drawing",
  "MEASUREMENT_START": "Start",
  "MEASUREMENT_END": "End",
  "NAVIGATOR_PAN_EAST": "Pan East",
  "NAVIGATOR_PAN_WEST": "Pan West",
  "NAVIGATOR_PAN_SOUTH": "Pan South",
  "NAVIGATOR_PAN_NORTH": "Pan North",
  "NAVIGATOR_ZOOM_OUT": "Zoom Out",
  "NAVIGATOR_ZOOM_IN": "Zoom In",
  "FMT_NAVIGATOR_ZOOM_TO_SCALE": "Zoom to 1:{scale}",
  "EXTERNAL_BASE_LAYERS": "External Base Layers",
  "SELECTION_PROPERTY": "Property",
  "SELECTION_VALUE": "Value",
  "SELECTION_PREV_FEATURE": "Previous Feature",
  "SELECTION_NEXT_FEATURE": "Next Feature",
  "SELECTION_ZOOMTO_FEATURE": "Zoom to selected feature",
  "VIEWER_OPTIONS": "Viewer Options",
  "ABOUT": "About",
  "HELP": "Help",
  "QUICKPLOT_HEADER": "Quick Plot",
  "QUICKPLOT_TITLE": "Title",
  "QUICKPLOT_SUBTITLE": "Sub-Title",
  "QUICKPLOT_PAPER_SIZE": "Paper Size",
  "QUICKPLOT_ORIENTATION": "Orientation",
  "QUICKPLOT_ORIENTATION_P": "Portrait",
  "QUICKPLOT_ORIENTATION_L": "Landscape",
  "QUICKPLOT_SHOWELEMENTS": "Show Elements",
  "QUICKPLOT_SHOWLEGEND": "Show Legend",
  "QUICKPLOT_SHOWNORTHARROW": "Show North Arrow",
  "QUICKPLOT_SHOWCOORDINTES": "Show Coordinates",
  "QUICKPLOT_SHOWSCALEBAR": "Show Scalebar",
  "QUICKPLOT_SHOWDISCLAIMER": "Show Disclaimer",
  "QUICKPLOT_ADVANCED_OPTIONS": "Advanced Options",
  "QUICKPLOT_SCALING": "Scale",
  "QUICKPLOT_DPI": "DPI",
  "QUICKPLOT_BOX_INFO": "Quick Plot Map Capture box is active. Map rotation is disabled while box is active",
  "QUICKPLOT_BOX_ROTATION": "Capture Box Rotation",
  "QUICKPLOT_GENERATE": "Generate Plot",
  "QUICKPLOT_COMMERCIAL_LAYER_WARNING": "Quick Plot will NOT include any visible commercial map layers",
  "FEATURE_TOOLTIPS": "Feature Tooltips",
  "MANUAL_FEATURE_TOOLTIPS": "Manual Feature Tooltips (click to show)",
  "GEOLOCATION_SUCCESS": "Zoomed to your position",
  "GEOLOCATION_WARN_OUTSIDE_MAP": "Zoomed to your position. It is outside the extents of your map",
  "GEOLOCATION_ERROR": "Geolocation error: {message} ({code})",
  "TASK_PANE_RESIZING": "Task Pane is resizing ...",
  "TASK_PANE_LOADING": "Loading",
  "TASK_PANE_LOADING_DESC": "Task Pane content is loading ...",
  "COORDTRACKER": "Coordinate Tracker",
  "COORDTRACKER_NO_PROJECTIONS": "You have no projections configured for this component",
  "MAP_SIZE_DISPLAY_UNITS": "Map view size display units",
  "ADD_MANAGE_LAYERS": "Add/Manage Layers",
  "ADD_LAYER": "Add Layer",
  "ADD_LAYER_TILED": "Add Tiled Layer",
  "MANAGE_LAYERS": "Manage Layers",
  "LAYER_TYPE": "Layer Type",
  "SELECT_LAYER_TYPE": "Select Layer Type ...",
  "ADD_WMS_LAYER_URL": "WMS Service URL",
  "ADD_WMS_LAYER_LOADING": "Loading",
  "ADD_WMS_LAYER_LOADING_DESC": "Loading WMS Capabilities",
  "ADD_WMS_LAYER_NO_LAYERS": "No WMS Layers",
  "WMS_VERSION": "WMS Version: {version}",
  "ADD_WFS_LAYER_URL": "WFS Service URL",
  "ADD_WFS_LAYER_LOADING": "Loading",
  "ADD_WFS_LAYER_LOADING_DESC": "Loading WFS Capabilities",
  "ADD_WFS_LAYER_NO_LAYERS": "No WFS Layers",
  "WFS_NO_LAYER_DESCRIPTION": "Enter a WFS Service URL above and click the button beside it to load available layers",
  "WFS_VERSION": "WFS Version: {version}",
  "OWS_SERVICE_NAME": "Name: {name}",
  "OWS_SERVICE_TITLE": "Title: {title}",
  "OWS_SERVICE_ABSTRACT": "Abstract: {abstract}",
  "WMS_LAYERS": "WMS Layers",
  "WFS_LAYERS": "WFS Layers",
  "OWS_LAYER_NAME": "Name: {name}",
  "OWS_LAYER_TITLE": "Title: {title}",
  "OWS_LAYER_ABSTRACT": "Abstract: {abstract}",
  "OWS_LAYER_CRS": "CRS: {crs}",
  "OWS_ADD_LAYER_PROMPT": "Click this layer to add it to the map",
  "ADDED_LAYER": "Added layer: {name}",
  "REMOVED_LAYER": "Removed layer: {name}",
  "ADD_WFS_LAYER": "Add WFS Layer",
  "SHARE_LINK_COPY_CLIPBOARD": "Copy Link",
  "SHARE_LINK_COPIED": "Link copied",
  "WMS_NO_LAYER_DESCRIPTION": "Enter a WMS Service URL above and click the button beside it to load available layers",
  "UNIT_UNKNOWN": "Unknown",
  "UNIT_INCHES": "Inches",
  "UNIT_FEET": "Feet",
  "UNIT_YARDS": "Yards",
  "UNIT_MILES": "Miles",
  "UNIT_NAUT_MILES": "Nautical Miles",
  "UNIT_MILLIMETERS": "Millimeters",
  "UNIT_CENTIMETERS": "Centimeters",
  "UNIT_METERS": "Meters",
  "UNIT_KILOMETERS": "Kilometers",
  "UNIT_DEGREES": "Degrees",
  "UNIT_DEC_DEGREES": "Decimal Degrees",
  "UNIT_DMS": "Degrees Minutes Seconds",
  "UNIT_PIXELS": "Pixels",
  "UNIT_ABBR_UNKNOWN": "unk",
  "UNIT_ABBR_INCHES": "in",
  "UNIT_ABBR_FEET": "ft",
  "UNIT_ABBR_YARDS": "yd",
  "UNIT_ABBR_MILES": "mi",
  "UNIT_ABBR_NAUT_MILES": "nm",
  "UNIT_ABBR_MILLIMETERS": "mm",
  "UNIT_ABBR_CENTIMETERS": "cm",
  "UNIT_ABBR_METERS": "m",
  "UNIT_ABBR_KILOMETERS": "km",
  "UNIT_ABBR_DEGREES": DEG,
  "UNIT_ABBR_DEC_DEGREES": DEG,
  "UNIT_ABBR_DMS": DEG,
  "UNIT_ABBR_PIXELS": "px",
  "UNIT_FMT_M": "{value} m",
  "UNIT_FMT_KM": "{value} km",
  "UNIT_FMT_SQM": "{value} m<sup>2</sup>",
  "UNIT_FMT_SQKM": "{value} km<sup>2</sup>",
  "OL_ATTRIBUTION_TIP": "Attributions",
  "OL_OVERVIEWMAP_TIP": "Overview Map",
  "OL_RESET_ROTATION_TIP": "Reset Rotation",
  "FEATURE_TOOLTIP_URL_HELP_TEXT": "Click for more information",
  "SHARE_LINK_INCLUDE_SESSION": "Include Session ID",
  "WINDOW_RESIZING": "Resizing Window",
  "WINDOW_MOVING": "Moving Window",
  "OTHER_THEME_RULE_COUNT": "... ({count} other theme rules)",
  "LEGEND_FILTER_LAYERS": "Filter/search for layers or groups",
  "LEGEND_CONTEXT_MENU_REFRESH": "Refresh",
  "LEGEND_CONTEXT_MENU_EXPAND_ALL": "Expand All",
  "LEGEND_CONTEXT_MENU_COLLAPSE_ALL": "Collapse All",
  "LEGEND_CONTEXT_MENU_ALL_SELECTABLE": "All Selectable",
  "LEGEND_CONTEXT_MENU_ALL_UNSELECTABLE": "All Unselectable",
  "LEGEND_CONTEXT_MENU_SHOW_INVISIBLE_LAYERS": "Show invisible layers",
  "LEGEND_CONTEXT_MENU_HIDE_INVISIBLE_LAYERS": "Hide invisible layers",
  "ADD_LAYER_KIND_PROMPT": "What kind of layer do you want to add?",
  "LAYER_KIND_FILE": "A local file-based layer",
  "LAYER_KIND_URL": "A remote url-based layer",
  "ADD_FILE": "Add Local File",
  "ADD_FILE_INSTRUCTIONS": "Browse and select a file to view it locally on the map (it won't be saved or uploaded to the internet)",
  "FMT_UPLOADED_FILE": "(size: {size} bytes, type: {type})",
  "ADD_LOCAL_FILE_LAYER_FAILURE_NOT_TEXT": "Could not read text content from this file",
  "ADD_LOCAL_FILE_LAYER_FAILURE": "Failed to load file as layer. It is probably an unsupported file format",
  "WMS_UNSUPPORTED_VERSION": "Unsupported WMS version: {version}",
  "NO_EXTERNAL_LAYERS": "No Layers",
  "NO_EXTERNAL_LAYERS_DESC": "Add layers via the {tabName} tab above",
  "LAYER_OPACITY": "Opacity",
  "LAYER_HEATMAP_BLUR": "Heatmap Blur Size",
  "LAYER_HEATMAP_RADIUS": "Heatmap Radius Size",
  "LAYER_NAME_EXISTS": "A layer named {name} already exists",
  "LAYER_MANAGER_TT_MOVE_UP": "Move this layer up the draw order",
  "LAYER_MANAGER_TT_MOVE_DOWN": "Move this layer down the draw order",
  "LAYER_MANAGER_TT_ZOOM_EXTENTS": "Zoom to the extents of this layer",
  "LAYER_MANAGER_TT_REMOVE": "Remove this layer",
  "LAYER_MANAGER_TT_EDIT_STYLE": "Edit style",
  "LAYER_MANAGER_TT_MORE_OPTIONS": "Show more layer options",
  "CANCEL": "Cancel",
  "UNKNOWN_FILE_TYPE": "Unknown",
  "WMS_SERVICE_INFO": "WMS Service Info",
  "WFS_SERVICE_INFO": "WFS Service Info",
  "WMS_AVAILABLE_LAYERS": "Available WMS Layers",
  "WFS_AVAILABLE_LAYERS": "Available WFS Layers",
  "ADD_LAYER_WITH_WMS_STYLE": "Add layer ({style})",
  "ADD_LAYER_WITH_WMS_STYLE_TILED": "Add tiled layer ({style})",
  "WMS_LEGEND": "WMS Legend",
  "VSED_NO_STYLES_TITLE": "No Styles",
  "VSED_NO_STYLES_DESC": "This editor is not configured to edit any styles",
  "VECTOR_LAYER_STYLE": "Vector Layer Style",
  "VSED_PT_FILL_COLOR": "Point Fill Color",
  "VSED_PT_FILL_COLOR_ALPHA": "Point Fill Color Alpha",
  "VSED_PT_RADIUS": "Point Radius",
  "VSED_PT_OUTLINE_COLOR": "Point Outline Color",
  "VSED_PT_OUTLINE_COLOR_ALPHA": "Point Outline Color Alpha",
  "VSED_PT_OUTLINE_WIDTH": "Point Outline Thickness",
  "VSED_LN_OUTLINE_COLOR": "Line Color",
  "VSED_LN_OUTLINE_COLOR_ALPHA": "Line Color Alpha",
  "VSED_LN_OUTLINE_THICKNESS": "Line Thickness",
  "VSED_PL_FILL_COLOR": "Fill Color",
  "VSED_PL_FILL_COLOR_ALPHA": "Fill Color Alpha",
  "VSED_PL_OUTLINE_COLOR": "Outline Color",
  "VSED_PL_OUTLINE_COLOR_ALPHA": "Outline Color Alpha",
  "VSED_PL_OUTLINE_THICKNESS": "Outline Thickness",
  "VSED_TAB_POINT": "Point",
  "VSED_TAB_LINE": "Line",
  "VSED_TAB_POLY": "Polygon",
  "VSED_PT_TYPE": "Point Style Type",
  "VSED_PT_TYPE_CIRCLE": "Circle",
  "VSED_PT_TYPE_ICON": "Icon",
  "VSED_PT_ICON_ANCHOR": "Anchor",
  "VSED_PT_ICON_ANCHOR_H": "Horizontal",
  "VSED_PT_ICON_ANCHOR_V": "Vertical",
  "VSED_PT_ICON_SRC": "Image URL",
  "VSED_PT_ICON_ROTATE_WITH_VIEW": "Rotate with view",
  "VSED_PT_ICON_ROTATION": "Rotation",
  "VSED_PT_ICON_SCALE": "Scale",
  "ADD_LAYER_PROJECTION": "Projection of this layer",
  "ADDING_LAYER_ERROR": "Error adding layer",
  "LOADING_LAYER": "Loading layer: {name}",
  "ACTION_CLOSE": "Close",
  "MORE_LAYER_OPTIONS": "More Layer Options",
  "CHOOSE_FILE": "Choose file ...",
  "BROWSE": "Browse",
  "SEL_FEATURE_PROPERTIES": "Feature Properties",
  "SEL_FEATURE_PROPERTIES_NONE": "No properties",
  "SEL_CLUSTER_PROPERTIES": "Cluster Properties (size: {size})",
  "ADD_LOCAL_FILE_LAYER_FAILURE_NO_FORMATS": "Failed to add layer. No format drivers registered",
  "ENABLE_CLUSTERING": "Enable Clustering",
  "POINT_CLUSTER_DISTANCE": "Point Cluster Distance",
  "EXPR_NOT_SET": "(Not set)",
  "ENABLE_LABELS": "Enable Labels",
  "LABEL_TEXT": "Label Text",
  "LABEL_SIZE": "Label Size",
  "LABEL_COLOR": "Label Color",
  "LABEL_OUTLINE_COLOR": "Label Outline Color",
  "LABEL_OUTLINE_THICKNESS": "Label Outline Thickness",
  "LABEL_BOLD": "Bold",
  "LABEL_ITALIC": "Italic",
  "LABEL_LINE_PLACEMENT": "Line Placement",
  "ADD_FILE_PROCESSING": "Processing file ...",
  "GENERATE_THEMABLE_LAYER": "Generate Themable Layer",
  "THEME_ON_PROPERTY": "Theme On Property",
  "COLORBREWER_THEME": "<a href='https://colorbrewer2.org/' target='_blank'>ColorBrewer</a> theme",
  "LABEL_USING_PROPERTY": "Label Using Property",
  "CREATE_LAYER_AS": "Create Layer As",
  "CLUSTER_CLICK_ACTION": "Action to perform when cluster is clicked",
  "CLUSTER_CLICK_ACTION_SHOW_POPUP": "Display attributes of points in a popup",
  "CLUSTER_CLICK_ACTION_ZOOM_EXTENTS": "Zoom into selected cluster",
  "EXTERNAL_LAYERS": "External Layers",
  "CREATE_VECTOR_LAYER": "Vector Layer",
  "CREATE_VECTOR_THEMED": "Themed Vector Layer",
  "CREATE_VECTOR_CLUSTERED": "Clustered Point Layer",
  "CREATE_VECTOR_HEATMAP": "Heatmap Layer",
  "ENABLE_SELECT_DRAGPAN": "Enable pan dragging for select tool",
  "INIT_WARNING_ARBITRARY_COORDSYS_INCOMPATIBLE_LAYER": "This viewer refers to a map ({mapId}) with an arbitrary coordinate system, which is incompatible with this layer type ({type})",
  "INIT_WARNING_ARBITRARY_COORDSYS_UNSUPPORTED_WIDGET": "This viewer refers to a map ({mapId}) with an arbitrary coordinate system, which is incompatible with this widget ({widget})",
  "MAP_SWIPE_SLIDER_TITLE": "Drag to compare maps",
  "MAP_SWIPE_CLOSE": "Close Comparison",
  "MAP_SWIPE_PRIMARY_LABEL": "Primary",
  "MAP_SWIPE_SECONDARY_LABEL": "Secondary",
  "MAP_SWIPE_LAYER_MANAGER_FOR": "Layers for:",
  "MAP_SWIPE_SELECTION_FOR": "Selection for:",
  "MAP_COMPARISON": "Comparison",
  "MAP_COMPARISON_MODE_SWIPE": "Swipe",
  "MAP_COMPARISON_MODE_SPY": "Spy",
  "MAP_COMPARISON_MODE_OFF": "Off",
  "MAP_SPY_ESC_HINT": "Press ESC to close",
  "APPLY": "Apply",
  "EXPR_EDITOR_EDIT_VALUE": "Edit Value",
  "EXPR_EDITOR_VALUE": "Value",
  "EXPR_EDITOR_EXPRESSION": "Expression",
  "EXPR_EDITOR_EXPR_PREFIX": "Expr: ",
  "VSED_DEFAULT_STYLE": "Default Style",
  "COORDTRACKER_X": "X:",
  "COORDTRACKER_Y": "Y:",
  "COLOR_PICKER_INPUT_LABEL": "color",
  "MSG_PANEL_INFO": "Info Messages",
  "MSG_PANEL_WARNING": "Warning Messages",
  "MSG_PANEL_ERROR": "Error Messages",
  "ABOUT_HASH_LABEL": "Hash:"
};
function info(message, ...optionalParams) {
  {
    console.info(message, optionalParams);
  }
}
function warn(message, ...optionalParams) {
  {
    console.warn(message, optionalParams);
  }
}
function error(message, ...optionalParams) {
  {
    console.error(message, optionalParams);
  }
}
function debug(message, ...optionalParams) {
  {
    console.debug(message, optionalParams);
  }
}
const DEFAULT_LOCALE = "en";
const STRINGS = {
  "en": STRINGS_EN
};
function registerStringBundle(locale, bundle) {
  STRINGS[locale] = bundle;
}
function fmt(format, args) {
  let str = format;
  if (args != null) {
    for (const p in args) {
      str = str.split(`{${p}}`).join(args[p]);
    }
    return str;
  }
  return str;
}
function tr(key, locale = DEFAULT_LOCALE, args) {
  const bundle = STRINGS[locale];
  if (!bundle) {
    warn(`No such string bundle for locale: ${locale}`);
    return key;
  } else {
    let str = bundle[key];
    if (!str) {
      warn(`String bundle for locale (${locale}) is missing localized string for key: ${key}`);
      return key;
    } else {
      if (args != null) {
        return fmt(str, args);
      }
      return str;
    }
  }
}
const BLANK_SIZE = { w: 1, h: 1 };
var UnitOfMeasure = /* @__PURE__ */ ((UnitOfMeasure2) => {
  UnitOfMeasure2[UnitOfMeasure2["Unknown"] = 0] = "Unknown";
  UnitOfMeasure2[UnitOfMeasure2["Inches"] = 1] = "Inches";
  UnitOfMeasure2[UnitOfMeasure2["Feet"] = 2] = "Feet";
  UnitOfMeasure2[UnitOfMeasure2["Yards"] = 3] = "Yards";
  UnitOfMeasure2[UnitOfMeasure2["Miles"] = 4] = "Miles";
  UnitOfMeasure2[UnitOfMeasure2["NauticalMiles"] = 5] = "NauticalMiles";
  UnitOfMeasure2[UnitOfMeasure2["Millimeters"] = 6] = "Millimeters";
  UnitOfMeasure2[UnitOfMeasure2["Centimeters"] = 7] = "Centimeters";
  UnitOfMeasure2[UnitOfMeasure2["Meters"] = 8] = "Meters";
  UnitOfMeasure2[UnitOfMeasure2["Kilometers"] = 9] = "Kilometers";
  UnitOfMeasure2[UnitOfMeasure2["Degrees"] = 10] = "Degrees";
  UnitOfMeasure2[UnitOfMeasure2["DecimalDegrees"] = 11] = "DecimalDegrees";
  UnitOfMeasure2[UnitOfMeasure2["DMS"] = 12] = "DMS";
  UnitOfMeasure2[UnitOfMeasure2["Pixels"] = 13] = "Pixels";
  return UnitOfMeasure2;
})(UnitOfMeasure || {});
var ActiveMapTool = /* @__PURE__ */ ((ActiveMapTool2) => {
  ActiveMapTool2[ActiveMapTool2["Zoom"] = 0] = "Zoom";
  ActiveMapTool2[ActiveMapTool2["Select"] = 1] = "Select";
  ActiveMapTool2[ActiveMapTool2["Pan"] = 2] = "Pan";
  ActiveMapTool2[ActiveMapTool2["None"] = 3] = "None";
  return ActiveMapTool2;
})(ActiveMapTool || {});
var RefreshMode = /* @__PURE__ */ ((RefreshMode2) => {
  RefreshMode2[RefreshMode2["LayersOnly"] = 1] = "LayersOnly";
  RefreshMode2[RefreshMode2["SelectionOnly"] = 2] = "SelectionOnly";
  return RefreshMode2;
})(RefreshMode || {});
const DEFAULT_MODAL_SIZE = [350, 500];
const DEFAULT_MODAL_POSITION = [500, 80];
const KC_ESCAPE = 27;
const KC_U = 85;
function NOOP$1() {
}
function ALWAYS_FALSE() {
  return false;
}
function getInitialView(state) {
  if (state.config.activeMapName) {
    return state.mapState[state.config.activeMapName].initialView;
  }
  return void 0;
}
function getMapGuideSubState(state) {
  if (state.config.activeMapName) {
    return state.mapState[state.config.activeMapName].mapguide;
  }
  return void 0;
}
function getSelectionSet(state) {
  var _a;
  return (_a = getMapGuideSubState(state)) == null ? void 0 : _a.selectionSet;
}
function getRuntimeMap(state) {
  var _a;
  return (_a = getMapGuideSubState(state)) == null ? void 0 : _a.runtimeMap;
}
function getCurrentView(state) {
  if (state.config.activeMapName) {
    return state.mapState[state.config.activeMapName].currentView;
  }
  return void 0;
}
function isVisualBaseLayer(layer) {
  return layer.kind != "UTFGrid";
}
function getExternalBaseLayers(state) {
  if (state.config.activeMapName) {
    return state.mapState[state.config.activeMapName].externalBaseLayers;
  }
  return void 0;
}
var LayerProperty = /* @__PURE__ */ ((LayerProperty2) => {
  LayerProperty2["LAYER_TYPE"] = "layer_type";
  LayerProperty2["LAYER_NAME"] = "name";
  LayerProperty2["LAYER_DISPLAY_NAME"] = "display_name";
  LayerProperty2["IS_GROUP"] = "is_group";
  LayerProperty2["IS_EXTERNAL"] = "is_external";
  LayerProperty2["IS_SELECTABLE"] = "is_selectable";
  LayerProperty2["DISABLE_HOVER"] = "disable_hover";
  LayerProperty2["IS_SCRATCH"] = "is_scratch";
  LayerProperty2["HAS_WMS_LEGEND"] = "has_wms_legend";
  LayerProperty2["VECTOR_STYLE"] = "vector_style";
  LayerProperty2["WGS84_BBOX"] = "wgs84_bbox";
  LayerProperty2["BUSY_WORKER_COUNT"] = "busy_worker_count";
  LayerProperty2["SELECTED_POPUP_CONFIGURATION"] = "popup_config";
  LayerProperty2["LAYER_DESCRIPTION"] = "layer_description";
  LayerProperty2["LAYER_METADATA"] = "layer_metadata";
  LayerProperty2["IS_HOVER_HIGHLIGHT"] = "is_hover_highlight";
  LayerProperty2["IS_MEASURE"] = "is_measure";
  LayerProperty2["IS_WMS_SELECTION_OVERLAY"] = "is_wms_selection_overlay";
  LayerProperty2["IS_HEATMAP"] = "is_heatmap";
  LayerProperty2["LAYER_DEFN"] = "layer_defn";
  return LayerProperty2;
})(LayerProperty || {});
var SourceProperty = /* @__PURE__ */ ((SourceProperty2) => {
  SourceProperty2["SUPPRESS_LOAD_EVENTS"] = "suppress_load_events";
  return SourceProperty2;
})(SourceProperty || {});
var MgLayerType = /* @__PURE__ */ ((MgLayerType2) => {
  MgLayerType2["Untiled"] = "MapGuide_Untiled";
  MgLayerType2["Tiled"] = "MapGuide_Tiled";
  return MgLayerType2;
})(MgLayerType || {});
const MG_LAYER_TYPE_NAME = "MapGuide";
const MG_BASE_LAYER_GROUP_NAME = "Base Tile Layers";
var MgBuiltInLayers = /* @__PURE__ */ ((MgBuiltInLayers2) => {
  MgBuiltInLayers2["Overlay"] = "MapGuide Dynamic Overlay";
  MgBuiltInLayers2["SelectionOverlay"] = "MapGuide Selection Overlay";
  MgBuiltInLayers2["ActiveFeatureSelectionOverlay"] = "MapGuide Active Feature Selection Overlay";
  return MgBuiltInLayers2;
})(MgBuiltInLayers || {});
let _fusionRoot;
function setFusionRoot(root) {
  _fusionRoot = root;
  debug(`Fusion root set to: ${root}. Access to Fusion backend services and widget content will be relative to this value`);
}
function getFusionRoot() {
  return _fusionRoot || "../fusion";
}
const CURSOR_DIGITIZE_POINT = "" + new URL("stdassets/cursors/digitizePoint.cur", import.meta.url).href;
const CURSOR_DIGITIZE_LINE = "" + new URL("stdassets/cursors/digitizeLine.cur", import.meta.url).href;
const CURSOR_DIGITIZE_LINESTRING = "" + new URL("stdassets/cursors/digitizeLineString.cur", import.meta.url).href;
const CURSOR_DIGITIZE_RECT = "" + new URL("stdassets/cursors/digitizeRectangle.cur", import.meta.url).href;
const CURSOR_DIGITIZE_POLYGON = "" + new URL("stdassets/cursors/digitizePolygon.cur", import.meta.url).href;
const CURSOR_DIGITIZE_CIRCLE = "" + new URL("stdassets/cursors/digitizeCircle.cur", import.meta.url).href;
const CURSOR_GRABBING = "data:application/octet-stream;base64,AAACAAEAICAAAA8ADwCoDAAAFgAAACgAAAAgAAAAQAAAAAEAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////8AAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////////////////////////////////////////////////////////////wD///8A///+AP///AB///gAf//4AD///AA///4AP//8AD///AB///5J///////////////////////////////////////////////////////w==";
const CURSOR_GRAB = "data:application/octet-stream;base64,AAACAAEAICAAABAAEACoDAAAFgAAACgAAAAgAAAAQAAAAAEAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////8AAAD///////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAD///////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAAAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////////////////////////////////////////////4B///+Af///AH///gA///wAP//8AB//+AAf//AAH//wAA//+QAP//4AD//+AA///ABf//wAf//+QP///+f////////////////////////////////////////////w==";
const CURSOR_ZOOM_IN = "data:application/octet-stream;base64,AAACAAEAICAAAA4ADACoDAAAFgAAACgAAAAgAAAAQAAAAAEAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC/v78AAAAAAADPz88AAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADf398AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADf398AAAAAAAAAAAAAAAAAAAAAAADf398AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC/v78AAAAAAADPz88AAAAAAADPz88AAAAAAAC/v78AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////////////////////3////4////8f///+P//+BH//+GD///n9///znP//85z///YG///2Bv//85z///Oc///5+f//+GH///4H///////////////////////////////////////w==";
const IMG_SLIDER_SCALE = "" + new URL("stdassets/images/res/sliderscale.png", import.meta.url).href;
const GIF_SPINNER = "data:image/gif;base64,R0lGODlhEgAGAMQSABBHfhCM2xCe94irv4m82InF5BA0ZBB3vIizy4iktBBfnonM77a0tM7OzsjIyNLS0sLCwry8u////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgASACwAAAAAEgAGAAAFNKAgSNLzkCZ6lk8QkE0Dy1I8HwfpODov7T2FggSBEI2S4hEAIEUiTqjkGTUYSAwGVivJbkMAIfkEBQoAEgAsAAAAAAYABgAABRngskiSIBQFGQQEQR4HgpCKMgwkACQJaRghACH5BAUKABIALAAAAAAKAAYAAAUp4PNI0rKQgtA0ZFGQQeA4JEGQxwFBJIKQCkUkQhoMSAAAg0FKJEgGQwgAIfkEBQoAEgAsBAAAAAoABgAABSng80jSspCC0DRkUZBB4DgkQZDHAUEkgpAKRSRCGgxIAACDQUokSAZDCAAh+QQFCgASACwIAAAACgAGAAAFKeDzSNKykILQNGRRkEHgOCRBkMcBQSSCkApFJEIaDEgAAINBSiRIBkMIACH5BAUKABIALAwAAAAGAAYAAAUZ4PNI0rI0DVkUjkMSBASRCBJF5DAwDJkkIQA7";
const IMG_SLIDER = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAMCAYAAACeGbYxAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIaSURBVHjarFOxjhJRFD0HJ5FZoGMQaLQQIlJsa6JbabNS7wf4J/snfgEl1a6lyVpSKG4wuHGBITAJBQzziAzXYt6beWPs1ldM3tz33r33nHsORQSDweCF67ofXNd9XSwWn+E/L6XUXRRFn6Mo+tjr9b6z3++3S6XSpe/7L33f362CYE8IAP1NtgAAEYAEYMXSJTr8j3jVqz5uNOonjXrjW7jbXTqRUhf3v+7b4/F4DQogBGgVSGtklcxOREAQYhWiaYD6DoDZdLqfzWb7VqvV9jzvwlmv16eTu59RtFdIoekXFNEFzHNAyDSelqHACuhGJAsTgBCTySRyHjmnzmw6bQbL1e8sjWC5XFWCIKg8dJbVanXj1bwNNQildofSSanpLBYLhGGYUgoK5r5faT9vzZOBAqKx5oepGYEkxIg1CibJxuMfzXK5vBFJDknCX8zhBEEQK6VyHb4/P990Op3mQ5GORqPNcDjMxeI4jnl29ubqcIgdIwhCE62FJAILp1g4mUqbYk4tMWUy0CwSpKBQcA7OdhveHo/HrhEEU9byArFzZD+0yLfFZS8rD4ECC7eOUurLIY67OamLQLRfjE9THZszw4QZJDKPZd7+WxMARG6c7Ta8AuQpgLdJU9QgMqFYRtBnxjbaWshEaBighVsytJ8AXrNWewJA6gDeEXglQNem0DCtTWoVtkYA626uizT2lZAbgNdCLP4MACMyK8d2rHGxAAAAAElFTkSuQmCC";
const ICON_ZOOM_OUT_FIXED = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACcUlEQVQ4jZXSS0hUURgH8P85d+713ma8Cl4GTdB5Q6FOhAslyo2jpESrHqSVm6aFL3qvolyUEkEoQ2BBEQUSBC1aidITg16gCA45Y07XuquuM82MOledOS1iYkZt4R/+qwM/vvPxEcYYsjlz7mKvpqpdkVDIuZxMEslsZnaPZ25nRUXg/p3bg5U2J75H5pAbkgUOHTk2m/wdd5/w++HevQu8IGBtdRWhYBAPB4dQYrWGXzx76t6IEMYYDh89PttwYL97X0srBJ4HAZBmDFlcLhBw83ofoouLocmPnzy5AKcvp3p/qgttZy+cxw6xAKWyjNIiGUuGAUIIOEqxzhhq6+vwfGSkpKHJF2vxNX7IAlRTFzr93Z0wiyKKJBGKxYx0Og2e4yDk1CxJ8Pd0Q1PVztwd0Nlg0FXj9ULkeSgWCwiApLEKE6UQTKa87q2txdeZoCsXMCXicWKWJPAch/a2DmQYAwPDxgwN3wUVRSwlkyQPKCwsZCSTITzHYfjBPWQYQ4ZtBgBgLZWCxWLJe6RVNdXhmelpmCgFJeTv6Bv+n+3k5y+oqqkO5wEOuz3Qd/UaBI5CMHFbVhJ4sPQ6bg0MwGG3BzYdUvvJ06ESRXH199+AIAibRjcMA5cvXUEikYCmaRgfG/23B1ppc+LJ40fuqL4YajnYindv3sJYSYEwBmNlBa9fvkKTrxn6Lx2xqA6nw4ZGXzPLm6DS5gQAdHSc6pn/FumanJpyxeNxIssy2+P1hu0OW2Bi4v1gLKrDarWivLwc8xEV42OjhLD/bHyrNPqaWSyqQ1EUlJWVYeGHhm0BuUhxcTFAuO0DWQQA6uvq8AeNtv56TeSTZQAAAABJRU5ErkJggg==";
const STD_CSS_SPRITE_RELPATH = "images/icons.png";
const ICON_ERROR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA31JREFUeNpc01tMUwcAxvH/ubWnFEohtBSYKJciCHJTsojOZS4mi9HswcwlZmaMBUMW2QOZMwvJnvewLSNLMDHGLXtmLpvRZS44QDYWqgWDrSBjsIGWcm1LaU8v55w9uRi/5y//t5/wXkcHAKZpYhgGCAL5LnddWUnp0dpqb6PVoggT/vuBX3+7Mzo2NDTNCxOeBTLpNPnu4r3NNbWfVSYTJ3OWl2R9fR3dMLC4XJh7KoyAINzu//abTx5O+qeeBaSW5may2SylFZVvvF5Rfav6z99bJL9PzITDZLa3ycRiJJ4ssT01Kbg2N6pPd77/zroszc0Gg0EAqbGhAUeRy3usouq2+5dbBVooRMaWg6ZpZESBtGGQSmfQrVaiKyts3btneau7+03/0tLPT5eXQ6IpCDRWeb8sGL6Tv7O2hvvMGZouDyCXl5OIRknEYrBrF7aeHoS2NqKRCNNf9Vs/On/+a0lRJNFR5Kot29w4oS39Q9I0yWlsRNq9m/KLF8HlxvR4sJ49S8LhYLuoiKSmsRwMoM7PH2o6cPBlqfXAwdP7NzZOpcIh0obB07Ex8HgwPB4yL5Wh19SwrSisDg0RGxiASAR9ZwdZ10nt2/evWFtZWa+thtGyOmkgvr6Gr7OThRs3iMoKMUVh6+5dEv39qKkUsixjlSSyK2EK7bleURRFMaPrpHQdbWeH+MwsptVKQlWJx+MkNQ2cTuweD7JuYJVlVEXBKokYuiFKRZ6SyqZc+4nIX3MkFhaQvV6cfX0knU5iIyMY4TC2lhYKjhxBWVxE2tzEAhTU7MWnqjdFn//+sFhZZcbn/yadyZBz7hzJwkK2RkdJXrkCV69in5uj+vhx9vT2ogIOw8BW34A/GByW5x4FAwuqddjm8by2FgoRunYNsb0dbXCQXFFENk0yA5eJWixErl/HKYrkl5Yy6XY/mp1+MCoANLS2Nn/xbsf4xKWP1aSmYQFURcFmsWCTJOyCgJpOkyfLOO12Uhc+pOv7wZMzk/6bEsBqKLQSzc2df/tCz6nNqSk5HouhmCZWSUIVRXJME4dpUlRWRrr7Az4dH+/1jQ5/ByA8L6vt8OH2S11dn+c8fnxo449xzPAKdlGisNiNpb6BQHHJw/4ff+gL+CZ++l/jizyRJKH9laOv7q+rO+bKy6s2dF16srm1ODUTHHng890hm9Wev/83AKQ+gKOX5raoAAAAAElFTkSuQmCC";
const SPRITE_LAYER_ADD = "layer_add";
const SPRITE_COORDINATE_TRACKER = "coordinate-tracker";
const SPRITE_ICON_ZOOMSELECT = "icon_zoomselect";
const SPRITE_ICON_ERROR = "icon_error";
const SPRITE_SELECT = "select";
const SPRITE_PAN = "pan";
const SPRITE_ZOOM_IN = "zoom-in";
const SPRITE_ZOOM_IN_FIXED = "zoom-in-fixed";
const SPRITE_ZOOM_OUT_FIXED = "zoom-out-fixed";
const SPRITE_ZOOM_FULL = "zoom-full";
const SPRITE_MAPTIP = "maptip";
const SPRITE_PAN_WEST = "pan-west";
const SPRITE_PAN_EAST = "pan-east";
const SPRITE_PAN_NORTH = "pan-north";
const SPRITE_PAN_SOUTH = "pan-south";
const SPRITE_ABOUT = "about";
const SPRITE_HELP = "help";
const SPRITE_MEASURE = "measure";
const SPRITE_PRINT = "print";
const SPRITE_MAP_SWIPE = "comparison";
const SPRITE_OPTIONS = "options";
const SPRITE_SELECT_RADIUS = "select-radius";
const SPRITE_SELECT_POLYGON = "select-polygon";
const SPRITE_INITIAL_CENTER = "initial-center";
const SPRITE_SELECT_CLEAR = "select-clear";
const SPRITE_ICON_REFRESHMAP = "icon_refreshmap";
const SPRITE_VIEW_BACK = "view-back";
const SPRITE_VIEW_FORWARD = "view-forward";
const SPRITE_GEOLOCATION = "geolocation";
const SPRITE_BUFFER = "buffer";
const SPRITE_SELECT_FEATURES = "select-features";
const SPRITE_REDLINE = "redline";
const SPRITE_FEATURE_INFO = "feature-info";
const SPRITE_QUERY = "query";
const SPRITE_THEME = "theme";
const SPRITE_INVOKE_SCRIPT = "invoke-script";
const SPRITE_INVOKE_URL = "invoke-url";
const SPRITE_SELECT_CENTRE = "select-centre";
const MAP_MARKER_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEZUlEQVRYR8WWXUxbZRjHn/ecnlLaHqBkyIeAwIaTUuIH4GiB9Yxo5sZIZiLGJSYu8YY74wW7cIksLplxIXq5mF1o9Ga6GNTAFqKGImsLMrwYBYeOBWSUUeWjPf047fl4zWEhnrK2p6ebsbfP+///f+d53/fpi+B//iGt+XO9Vr0lUtyFELYDQpUgAUII/EDAJCvQP9Rfvx7X4pk1AG5upu5XGN4BjM8AECVpQjYxwCfxsG6w1uXisgHJCuCvo53lAgnfAYFbszGVAGaRJPVUXPMsq61XBfD3MPsQTrgBiKfVzJR1jOEeReJDJd+7/Zl0qgBrJ9pHANBxLeH/rsUTZcNuJwLA6fQZAda6O7sB4eFUYlHCEBOFHWuDjgQdQaTMQBidKhuZuJITwOorHW5CB46k1gKG9UgMQlwcMEjrEhASCVBeYMiDUlM+IEj+JhGwr3LY3aQZINDLmPkoHyQQSvo0PxsBlk98ThLE+c4bs3dl47G2Z2oQQQ6YKer0k7T5oSxESaVlQ55AKoi0W3C/h2nDWPAqRVFegJUQO8B45z5IZTbmsJ2rok0DJopKKou8dKJy1DOiCeD3l1/so/P0l5Siv8PRVZvr16p0hwoDELNHnr9XYjKVK3URXnz/wKj3vCaA+Zda+i0Gw0WlaDPCfdU4dvONTDdirqvl62KjoVe5ZpuLDzb8ON2vCWCGeeHNCrPxS6UozMe/qR+dfi0TwOLRQ0NGijqpXBMIx/qfdc0MagIYb7M11BQXzOsV14sX8UZVgCtHMzN8KrM/jh3Ly8fba6SOtOzWRYzhztaGg/HcTjpPu/W0h1DeTx/THNpnzjcpwxDA5dKWG33oHEjJ1xPQWnfHZYTg7aRt46JCQNikj7iWUv43ZBxEP9utl2otRX0PDRlJGscEXKAI5OUxJ5LI0C4J+CwQhFMZLmEMy1uhbx2e2Vc1zwFZMNFuraYp/Z1Sszn5XmU6BIpaIMbhjXC8tWtqdiYnAFnksjd9XFtEv6snU4/adMaCJMHidvAK45k7lYlX9c/IY28spkjdn5VFdNJZUGuCn40kwlH+gHPat/JIADtdaGs8U11Ef5Sv06nl7tTjgghLweCHjHf+PTWBagdkgzGmxmCUCperC+gn1Azl+grLbiUE7qkO9wKrtj4rgB2INuvpykL6M/OeOb83IMLzsBpi+5ze+U/VwuV61gDyXPA4bLfrLEX16VTyq2M5GFpcKTt48PWrV8XHCiCbjbc3HC8z0iMFefqU3kEuAesxttvp/u1aNuGaOrBr6Om0emoKLfa9Dw956CxtsxPt7luHsw3PCcDlaGwtMeb/UmwwJOUEojEcjMSfOzzlu/WfAuxMSIdtqM5SeJJAD46QIGG4uxX8wun1vaUlPKcOyKKfHLb9hTpioZymSYwB/OFwPCFydR3uhYxP8FRwWd+CvWKX3XoRAD14ZGB0lpn0XdD69Tl3YDfI5WiyS5IodU3OT+US/sgAuYYqdTlvweMIlz3+AXmLlDDLPM0mAAAAAElFTkSuQmCC";
function getAssetPath(url) {
  return url;
}
let mRoot = ICON_ZOOM_OUT_FIXED == null ? void 0 : ICON_ZOOM_OUT_FIXED.replace("/zoom-out-fixed.png", "/../../");
function getAssetRoot() {
  return mRoot;
}
function setAssetRoot(root) {
  mRoot = root;
}
function assertNever(value) {
  throw new Error("Should never get here");
}
function strEndsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
function strStartsWith(str, word) {
  return str.lastIndexOf(word, 0) === 0;
}
function strReplaceAll(str, find, replace) {
  return str.split(find).join(replace);
}
const STR_EMPTY = "";
function strIsNullOrEmpty(str) {
  return null == str || "" === str;
}
function strTrim(str) {
  if (!String.prototype.trim) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  }
  return str.trim();
}
function extractPlaceholderTokens(expr, delimBegin, delimEnd) {
  var _a;
  const regex = new RegExp(`${delimBegin}(.*?)${delimEnd}`, "g");
  const matches = expr.match(regex);
  return (_a = matches == null ? void 0 : matches.map((m) => m.replace(delimBegin, "").replace(delimEnd, ""))) != null ? _a : [];
}
function isResourceId(str) {
  return strStartsWith(str, "Library://");
}
function urlSearchParamsToObject(usp) {
  const obj = {};
  for (const [key, value] of usp.entries()) {
    const existing = obj[key];
    if (existing === void 0) {
      obj[key] = value;
    } else if (Array.isArray(existing)) {
      existing.push(value);
    } else {
      obj[key] = [existing, value];
    }
  }
  return obj;
}
function getUrlBase() {
  return typeof window !== "undefined" ? window.location.href : "http://localhost/";
}
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
function areParamsEqual(params1, params2) {
  const keys1 = Object.keys(params1).filter((k) => k.toLowerCase() != "locale").sort();
  const keys2 = Object.keys(params2).filter((k) => k.toLowerCase() != "locale").sort();
  if (arraysEqual(keys1, keys2)) {
    for (const key of keys1) {
      const v1 = params1[key];
      const v2 = params2[key];
      if (Array.isArray(v1) || Array.isArray(v2)) {
        if (!arraysEqual(
          Array.isArray(v1) ? v1 : [v1],
          Array.isArray(v2) ? v2 : [v2]
        )) {
          return false;
        }
      } else if (v1 != v2) {
        return false;
      }
    }
    return true;
  }
  return false;
}
function areUrlsSame(url1, url2) {
  const base = getUrlBase();
  let parsed1;
  let parsed2;
  try {
    parsed1 = new URL(url1, base);
  } catch (e) {
    return false;
  }
  try {
    parsed2 = new URL(url2, base);
  } catch (e) {
    return false;
  }
  const params1 = urlSearchParamsToObject(parsed1.searchParams);
  const params2 = urlSearchParamsToObject(parsed2.searchParams);
  const same = parsed1.protocol === parsed2.protocol && parsed1.username === parsed2.username && parsed1.password === parsed2.password && parsed1.host === parsed2.host && parsed1.hostname === parsed2.hostname && parsed1.port === parsed2.port && parsed1.pathname === parsed2.pathname && parsed1.hash === parsed2.hash && areParamsEqual(params1, params2);
  return same;
}
function isComponentUri(uri) {
  return uri.indexOf("component://") >= 0;
}
function parseComponentUri(uri) {
  if (isComponentUri(uri)) {
    const qi = uri.lastIndexOf("?");
    const name = qi < 0 ? uri.substring(12) : uri.substring(12, qi);
    const props = qi < 0 ? {} : urlSearchParamsToObject(new URLSearchParams(uri.substring(qi)));
    return {
      name,
      props
    };
  }
}
function ensureParameters(url, mapName, session, locale, uppercase = true, extraParameters = []) {
  if (isComponentUri(url)) {
    return url;
  }
  const parsed = parseUrl(url);
  const params = parsed.query != null ? __spreadValues({}, parsed.query) : {};
  let bNeedMapName = true;
  let bNeedSession = true;
  let bNeedLocale = true;
  for (const key in params) {
    const name = key.toLowerCase();
    switch (name) {
      case "session":
        bNeedSession = false;
        break;
      case "mapname":
        bNeedMapName = false;
        break;
      case "locale":
        bNeedLocale = false;
        break;
    }
  }
  if (bNeedMapName && !strIsNullOrEmpty(mapName)) {
    if (uppercase) {
      params.MAPNAME = mapName;
    } else {
      params.mapname = mapName;
    }
  }
  if (bNeedSession && !strIsNullOrEmpty(session)) {
    if (uppercase) {
      params.SESSION = session;
    } else {
      params.session = session;
    }
  }
  if (bNeedLocale) {
    if (uppercase) {
      params.LOCALE = locale;
    } else {
      params.locale = locale;
    }
  }
  for (const p of extraParameters) {
    params[p.name] = p.value;
  }
  return appendParameters(
    url,
    params,
    true,
    false
    /*uppercase*/
  );
}
function parseUrl(url) {
  const qi = url.lastIndexOf("?");
  const parsedUrl = qi < 0 ? url : url.substring(0, qi);
  const query = qi < 0 ? {} : urlSearchParamsToObject(new URLSearchParams(url.substring(qi)));
  return {
    url: parsedUrl,
    query
  };
}
function stringifyQuery(parameters) {
  const usp = new URLSearchParams();
  for (const key of Object.keys(parameters)) {
    const value = parameters[key];
    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        usp.append(`${key}[${i}]`, String(v));
      });
    } else if (value !== void 0 && value !== null) {
      usp.set(key, String(value));
    }
  }
  return usp.toString();
}
function appendParameters(url, parameters, bOverwriteExisting = true, bConvertToUppercase = false, bDiscardExistingParams = false) {
  const parsed = new URL(url, getUrlBase());
  let currentParams;
  if (!bDiscardExistingParams) {
    currentParams = urlSearchParamsToObject(parsed.searchParams);
  } else {
    currentParams = {};
  }
  const paramNames = {};
  for (const key of Object.keys(currentParams)) {
    paramNames[key.toUpperCase()] = key;
  }
  for (const name of Object.keys(parameters)) {
    const key = paramNames[name.toUpperCase()] || name;
    if (key && currentParams[key] && !bOverwriteExisting) {
      continue;
    }
    currentParams[key] = parameters[name];
  }
  if (bConvertToUppercase) {
    let params2 = {};
    for (const name of Object.keys(currentParams)) {
      params2[name.toUpperCase()] = currentParams[name];
    }
    currentParams = params2;
  }
  const queryStr = stringifyQuery(currentParams);
  parsed.search = queryStr ? `?${queryStr}` : "";
  return parsed.toString();
}
function parseUrlParameters(url) {
  const parsed = new URL(url, getUrlBase());
  return urlSearchParamsToObject(parsed.searchParams);
}
var ActionType = /* @__PURE__ */ ((ActionType2) => {
  ActionType2["SET_LOCALE"] = "MapGuide/SET_LOCALE";
  ActionType2["INIT_APP"] = "MapGuide/INIT_APP";
  ActionType2["INIT_ERROR"] = "MapGuide/INIT_ERROR";
  ActionType2["INIT_ACKNOWLEDGE_WARNINGS"] = "MapGuide/INIT_ACKNOWLEDGE_WARNINGS";
  ActionType2["LEGEND_SET_GROUP_VISIBILITY"] = "Legend/SET_GROUP_VISIBILITY";
  ActionType2["LEGEND_SET_LAYER_VISIBILITY"] = "Legend/SET_LAYER_VISIBILITY";
  ActionType2["LEGEND_SET_LAYER_SELECTABLE"] = "Legend/SET_LAYER_SELECTABLE";
  ActionType2["LEGEND_SET_GROUP_EXPANDABLE"] = "Legend/SET_GROUP_EXPANDABLE";
  ActionType2["MAP_SET_ACTIVE_MAP"] = "Map/SET_ACTIVE_MAP";
  ActionType2["MAP_REFRESH"] = "Map/REFRESH";
  ActionType2["MAP_SET_VIEW"] = "Map/SET_VIEW";
  ActionType2["MAP_SET_SCALE"] = "Map/SET_SCALE";
  ActionType2["MAP_SET_ACTIVE_TOOL"] = "Map/SET_ACTIVE_TOOL";
  ActionType2["MAP_SET_MAPTIP"] = "Map/SET_MAPTIP";
  ActionType2["MAP_ENABLE_SELECT_DRAGPAN"] = "Map/ENABLE_SELECT_DRAGPAN";
  ActionType2["MAP_SET_MANUAL_MAPTIP"] = "Map/MAP_SET_MANUAL_MAPTIP";
  ActionType2["MAP_SET_SELECTION"] = "Map/SET_SELECTION";
  ActionType2["MAP_ADD_CLIENT_SELECTED_FEATURE"] = "Map/ADD_CLIENT_SELECTED_FEATURE";
  ActionType2["MAP_CLEAR_CLIENT_SELECTION"] = "Map/CLEAR_CLIENT_SELECTION";
  ActionType2["MAP_SET_BUSY_COUNT"] = "Map/SET_BUSY_COUNT";
  ActionType2["MAP_SET_BASE_LAYER"] = "Map/SET_BASE_LAYER";
  ActionType2["MAP_ZOOM_IN"] = "Map/ZOOM_IN";
  ActionType2["MAP_ZOOM_OUT"] = "Map/ZOOM_OUT";
  ActionType2["MAP_PREVIOUS_VIEW"] = "Map/PREVIOUS_VIEW";
  ActionType2["MAP_NEXT_VIEW"] = "Map/NEXT_VIEW";
  ActionType2["MAP_SET_LAYER_TRANSPARENCY"] = "Map/SET_LAYER_TRANSPARENCY";
  ActionType2["MAP_SET_VIEW_SIZE_UNITS"] = "Map/SET_VIEW_SIZE_UNITS";
  ActionType2["MAP_SET_VIEW_ROTATION"] = "Map/SET_VIEW_ROTATION";
  ActionType2["MAP_SET_VIEW_ROTATION_ENABLED"] = "Map/SET_VIEW_ROTATION_ENABLED";
  ActionType2["MAP_RESIZED"] = "Map/RESIZED";
  ActionType2["MAP_SHOW_SELECTED_FEATURE"] = "Map/SHOW_SELECTED_FEATURE";
  ActionType2["TASK_INVOKE_URL"] = "TaskPane/INVOKE_URL";
  ActionType2["TASK_PANE_HOME"] = "TaskPane/HOME";
  ActionType2["TASK_PANE_FORWARD"] = "TaskPane/FORWARD";
  ActionType2["TASK_PANE_BACK"] = "TaskPane/BACK";
  ActionType2["TASK_PANE_PUSH_URL"] = "TaskPane/PUSH_URL";
  ActionType2["FUSION_SET_ELEMENT_STATE"] = "Fusion/SET_ELEMENT_STATE";
  ActionType2["FUSION_SET_TASK_PANE_VISIBILITY"] = "Fusion/SET_TASK_PANE_VISIBILITY";
  ActionType2["FUSION_SET_LEGEND_VISIBILITY"] = "Fusion/SET_LEGEND_VISIBILITY";
  ActionType2["FUSION_SET_SELECTION_PANEL_VISIBILITY"] = "Fusion/SET_SELECTION_PANEL_VISIBILITY";
  ActionType2["FUSION_SET_TEMPLATE_CUSTOM_DATA"] = "Fusion/SET_TEMPLATE_CUSTOM_DATA";
  ActionType2["FLYOUT_OPEN"] = "Flyout/OPEN";
  ActionType2["FLYOUT_CLOSE"] = "Flyout/CLOSE";
  ActionType2["CONTEXT_MENU_OPEN"] = "ContextMenu/OPEN";
  ActionType2["CONTEXT_MENU_CLOSE"] = "ContextMenu/CLOSE";
  ActionType2["COMPONENT_OPEN"] = "Flyout/COMPONENT_OPEN";
  ActionType2["COMPONENT_CLOSE"] = "Flyout/COMPONENT_CLOSE";
  ActionType2["UPDATE_MOUSE_COORDINATES"] = "Status/UPDATE_MOUSE_COORDINATES";
  ActionType2["MODAL_SHOW_COMPONENT"] = "Modal/SHOW_COMPONENT";
  ActionType2["MODAL_SHOW_URL"] = "Modal/SHOW_URL";
  ActionType2["MODAL_CLOSE"] = "Modal/CLOSE";
  ActionType2["MODAL_UPDATE"] = "Modal/UPDATE";
  ActionType2["LAYER_ADDED"] = "Map/LAYER_ADDED";
  ActionType2["EXTERNAL_LAYERS_READY"] = "Map/EXTERNAL_LAYERS_READY";
  ActionType2["REMOVE_LAYER"] = "Map/REMOVE_LAYER";
  ActionType2["SET_LAYER_INDEX"] = "Map/SET_LAYER_INDEX";
  ActionType2["SET_LAYER_OPACITY"] = "Map/SET_LAYER_OPACITY";
  ActionType2["SET_LAYER_VISIBILITY"] = "Map/SET_LAYER_VISIBILITY";
  ActionType2["SET_LAYER_VECTOR_STYLE"] = "Map/SET_LAYER_VECTOR_STYLE";
  ActionType2["ADD_LAYER_BUSY_WORKER"] = "Map/ADD_LAYER_BUSY_WORKER";
  ActionType2["REMOVE_LAYER_BUSY_WORKER"] = "Map/REMOVE_LAYER_BUSY_WORKER";
  ActionType2["SET_HEATMAP_LAYER_BLUR"] = "Map/SET_HEATMAP_LAYER_BLUR";
  ActionType2["SET_HEATMAP_LAYER_RADIUS"] = "Map/SET_HEATMAP_LAYER_RADIUS";
  ActionType2["SET_APP_SETTING"] = "MapGuide/SET_APP_SETTING";
  ActionType2["MAP_SET_COMPARISON_MODE"] = "Map/SET_COMPARISON_MODE";
  ActionType2["MAP_SET_SWIPE_MODE"] = "Map/SET_COMPARISON_MODE";
  ActionType2["MAP_SET_SWIPE_POSITION"] = "Map/SET_SWIPE_POSITION";
  ActionType2["MAP_UPDATE_SWIPE_POSITION"] = "Map/SET_SWIPE_POSITION";
  ActionType2["MAP_SET_SPY_CURSOR_RADIUS"] = "Map/SET_SPY_CURSOR_RADIUS";
  return ActionType2;
})(ActionType || {});
function showModalComponent(options) {
  return {
    type: ActionType.MODAL_SHOW_COMPONENT,
    payload: __spreadValues({}, options)
  };
}
function showModalUrl(options) {
  return {
    type: ActionType.MODAL_SHOW_URL,
    payload: __spreadValues({}, options)
  };
}
function hideModal(name) {
  return {
    type: ActionType.MODAL_CLOSE,
    payload: name
  };
}
function updateModal(name, args) {
  return {
    type: ActionType.MODAL_UPDATE,
    payload: {
      name,
      args
    }
  };
}
const ModalActions = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hideModal,
  showModalComponent,
  showModalUrl,
  updateModal
}, Symbol.toStringTag, { value: "Module" }));
const FUSION_ICON_REGEX = /images\/icons\/[a-zA-Z\-]*.png/;
function fixIconPath(path) {
  if (FUSION_ICON_REGEX.test(path)) {
    return `${getAssetRoot()}/${path}`.replace(/\/\//g, "/");
  }
  return path;
}
function fusionFixSpriteClass(tb, cmd) {
  if (tb.spriteClass) {
    return tb.spriteClass;
  }
  if (cmd && cmd.iconClass) {
    return cmd.iconClass;
  }
  return void 0;
}
function mergeInvokeUrlParameters(currentParameters, extraParameters) {
  const currentP = currentParameters.reduce((prev, current, i, arr) => {
    prev[current.name] = current.value;
    return prev;
  }, {});
  if (extraParameters) {
    const keys = Object.keys(extraParameters);
    for (const k of keys) {
      currentP[k] = extraParameters[k];
    }
  }
  const merged = [];
  const mkeys = Object.keys(currentP);
  for (const k of mkeys) {
    merged.push({ name: k, value: currentP[k] });
  }
  return merged;
}
function fixChildItems(childItems, state, commandInvoker) {
  return childItems.map((tb) => mapToolbarReference(tb, state, commandInvoker)).filter((tb) => tb != null);
}
function mapToolbarReference(tb, state, commandInvoker) {
  if (tb.error) {
    const cmdItem = {
      iconClass: SPRITE_ICON_ERROR,
      tooltip: tb.error,
      label: tr("ERROR"),
      selected: ALWAYS_FALSE,
      enabled: ALWAYS_FALSE,
      invoke: NOOP$1
    };
    return cmdItem;
  } else if (tb.componentName) {
    return {
      icon: tb.icon,
      iconClass: fusionFixSpriteClass(tb),
      flyoutId: tb.flyoutId,
      tooltip: tb.tooltip,
      label: tb.label,
      componentName: tb.componentName,
      componentProps: tb.componentProps
    };
  } else if (tb.isSeparator === true) {
    return { isSeparator: true };
  } else if (tb.command) {
    const cmd = getCommand(tb.command);
    if (cmd != null) {
      const cmdItem = {
        icon: fixIconPath(tb.icon || cmd.icon),
        iconClass: fusionFixSpriteClass(tb, cmd),
        tooltip: tb.tooltip,
        label: tb.label,
        selected: () => cmd.selected(state),
        enabled: () => cmd.enabled(state, tb.parameters),
        invoke: () => commandInvoker(cmd, tb.parameters)
      };
      return cmdItem;
    }
  } else if (tb.children) {
    const childItems = tb.children;
    return {
      icon: fixIconPath(tb.icon),
      iconClass: fusionFixSpriteClass(tb),
      label: tb.label,
      tooltip: tb.tooltip,
      childItems: fixChildItems(childItems, state, commandInvoker)
    };
  } else if (tb.label && tb.flyoutId) {
    return {
      icon: fixIconPath(tb.icon),
      iconClass: fusionFixSpriteClass(tb),
      label: tb.label,
      tooltip: tb.tooltip,
      flyoutId: tb.flyoutId
    };
  }
  return null;
}
function reduceAppToToolbarState(state) {
  var _a, _b, _c, _d;
  let hasSelection = false;
  let hasClientSelection = false;
  let hasPreviousView = false;
  let hasNextView = false;
  let visibleWmsLayerCount = 0;
  const selection = getSelectionSet(state);
  hasSelection = selection != null && selection.SelectedFeatures != null;
  if (state.config.activeMapName) {
    hasClientSelection = state.mapState[state.config.activeMapName].clientSelection != null;
    hasPreviousView = state.mapState[state.config.activeMapName].historyIndex > 0;
    hasNextView = state.mapState[state.config.activeMapName].historyIndex < state.mapState[state.config.activeMapName].history.length - 1;
    visibleWmsLayerCount = ((_a = state.mapState[state.config.activeMapName].layers) != null ? _a : []).filter((l) => l.visible && l.selectable && l.type == "WMS").length;
  }
  return {
    stateless: state.config.viewer.isStateless,
    visibleAndSelectableWmsLayerCount: visibleWmsLayerCount,
    busyWorkerCount: state.viewer.busyCount,
    hasSelection,
    hasClientSelection,
    hasPreviousView,
    hasNextView,
    activeTool: state.viewer.tool,
    featureTooltipsEnabled: state.viewer.featureTooltipsEnabled,
    comparisonMode: (_b = state.config.comparisonMode) != null ? _b : "none",
    swipeActive: state.config.swipeActive === true,
    comparisonPairs: (_c = state.config.comparisonPairs) != null ? _c : [],
    mapSwipePairs: (_d = state.config.comparisonPairs) != null ? _d : [],
    activeMapName: state.config.activeMapName
  };
}
class CommandConditions {
  /**
   * The viewer is not busy
   *
   * @param {Readonly<IToolbarAppState>} state
   * @returns {boolean}
   */
  static isNotBusy(state) {
    return state.busyWorkerCount == 0;
  }
  /**
   * The viewer has a MapGuide selection set
   *
   * @param {Readonly<IToolbarAppState>} state
   * @returns {boolean}
   */
  static hasSelection(state) {
    return state.hasSelection;
  }
  /**
   * The viewer has a client-side selection set
   *
   * @param state 
   * @returns  
   * @since 0.14
   */
  static hasClientSelection(state) {
    return state.hasClientSelection;
  }
  /**
   * The command is set to be disabled if selection is empty
   *
   * @param {*} [parameters]
   * @returns {boolean}
   */
  static disabledIfEmptySelection(state, parameters) {
    if (!state.hasSelection) {
      return parameters != null && (parameters.DisableIfSelectionEmpty == "true" || parameters.DisableIfSelectionEmpty == true);
    } else
      return false;
  }
  /**
   * The viewer has a previous view in the view navigation stack
   *
   * @param {Readonly<IToolbarAppState>} state
   * @returns {boolean}
   */
  static hasPreviousView(state) {
    return state.hasPreviousView;
  }
  /**
   * The viewer has a next view in the view navigation stack
   *
   * @param {Readonly<IToolbarAppState>} state
   * @returns {boolean}
   */
  static hasNextView(state) {
    return state.hasNextView;
  }
}
var DefaultCommands = /* @__PURE__ */ ((DefaultCommands2) => {
  DefaultCommands2["Select"] = "Select";
  DefaultCommands2["Pan"] = "Pan";
  DefaultCommands2["Zoom"] = "Zoom";
  DefaultCommands2["MapTip"] = "MapTip";
  DefaultCommands2["ZoomIn"] = "ZoomIn";
  DefaultCommands2["ZoomOut"] = "ZoomOut";
  DefaultCommands2["RestoreView"] = "RestoreView";
  DefaultCommands2["ZoomExtents"] = "ZoomExtents";
  DefaultCommands2["SelectRadius"] = "SelectRadius";
  DefaultCommands2["SelectPolygon"] = "SelectPolygon";
  DefaultCommands2["ClearSelection"] = "ClearSelection";
  DefaultCommands2["ZoomToSelection"] = "ZoomToSelection";
  DefaultCommands2["PanLeft"] = "PanLeft";
  DefaultCommands2["PanRight"] = "PanRight";
  DefaultCommands2["PanUp"] = "PanUp";
  DefaultCommands2["PanDown"] = "PanDown";
  DefaultCommands2["RefreshMap"] = "RefreshMap";
  DefaultCommands2["PreviousView"] = "PreviousView";
  DefaultCommands2["NextView"] = "NextView";
  DefaultCommands2["About"] = "About";
  DefaultCommands2["Help"] = "Help";
  DefaultCommands2["Measure"] = "Measure";
  DefaultCommands2["ViewerOptions"] = "ViewerOptions";
  DefaultCommands2["Buffer"] = "Buffer";
  DefaultCommands2["SelectWithin"] = "SelectWithin";
  DefaultCommands2["QuickPlot"] = "QuickPlot";
  DefaultCommands2["Redline"] = "Redline";
  DefaultCommands2["FeatureInfo"] = "FeatureInfo";
  DefaultCommands2["Theme"] = "Theme";
  DefaultCommands2["Query"] = "Query";
  DefaultCommands2["Geolocation"] = "Geolocation";
  DefaultCommands2["CoordinateTracker"] = "CoordinateTracker";
  DefaultCommands2["AddManageLayers"] = "AddManageLayers";
  DefaultCommands2["CenterSelection"] = "CenterSelection";
  DefaultCommands2["Print"] = "Print";
  DefaultCommands2["MapSwipe"] = "MapSwipe";
  return DefaultCommands2;
})(DefaultCommands || {});
const commands = {};
function isInvokeUrlCommand(cmdDef) {
  return typeof cmdDef.url !== "undefined";
}
function isSearchCommand$1(cmdDef) {
  return typeof cmdDef.layer !== "undefined";
}
function openModalUrl(name, dispatch, url, modalTitle) {
  dispatch(showModalUrl({
    modal: {
      title: modalTitle || tr(name),
      backdrop: false,
      overflowYScroll: true
    },
    name,
    url
  }));
}
function isSupportedCommandInStatelessMode(name) {
  switch (name) {
    case "MapTip":
    case "QuickPlot":
    case "SelectRadius":
    case "SelectPolygon":
    case "Buffer":
    case "SelectWithin":
    case "Redline":
    case "FeatureInfo":
    case "Query":
    case "Theme":
    case "CenterSelection":
      return false;
  }
  return true;
}
function openUrlInTarget(name, cmdDef, hasTaskPane, dispatch, url, modalTitle) {
  const target = cmdDef.target;
  if (target == "TaskPane") {
    if (!hasTaskPane) {
      openModalUrl(name, dispatch, url, modalTitle);
    } else {
      dispatch({
        type: ActionType.TASK_INVOKE_URL,
        payload: {
          url
        }
      });
    }
  } else if (target == "NewWindow") {
    openModalUrl(name, dispatch, url, modalTitle);
  } else if (target == "SpecifiedFrame") {
    if (cmdDef.targetFrame) {
      const frames = window.frames;
      let bInvoked = false;
      for (let i = 0; i < frames.length; i++) {
        if (frames[i].name == cmdDef.targetFrame) {
          frames[i].location = url;
          bInvoked = true;
          break;
        }
      }
      if (!bInvoked) {
        error(`Frame not found: ${cmdDef.targetFrame}`);
      }
    } else {
      error(`Command ${name} has a target of "SpecifiedFrame", but does not specify a target frame`);
    }
  } else {
    assertNever();
  }
}
function registerCommand(name, cmdDef) {
  let cmd;
  if (isInvokeUrlCommand(cmdDef)) {
    cmd = {
      icon: cmdDef.icon,
      iconClass: cmdDef.iconClass,
      title: cmdDef.title,
      enabled: (state) => {
        if (cmdDef.disableIfSelectionEmpty === true) {
          return CommandConditions.hasSelection(state);
        }
        return true;
      },
      selected: () => false,
      invoke: (dispatch, getState, viewer, parameters) => {
        const state = getState();
        const config = state.config;
        const map = getRuntimeMap(state);
        const params = mergeInvokeUrlParameters(cmdDef.parameters, parameters);
        const url = ensureParameters(cmdDef.url, map == null ? void 0 : map.Name, map == null ? void 0 : map.SessionId, config.locale, true, params);
        openUrlInTarget(name, cmdDef, config.capabilities.hasTaskPane, dispatch, url, cmd.title);
      }
    };
  } else if (isSearchCommand$1(cmdDef)) {
    cmd = {
      icon: cmdDef.icon,
      iconClass: cmdDef.iconClass,
      title: cmdDef.title,
      enabled: (state) => !state.stateless,
      selected: () => false,
      invoke: (dispatch, getState, viewer, parameters) => {
        const state = getState();
        const config = state.config;
        const map = getRuntimeMap(state);
        if (map) {
          const url = ensureParameters(`${getFusionRoot()}/widgets/Search/SearchPrompt.php`, map.Name, map.SessionId, config.locale, false) + `&popup=0&target=TaskPane&title=${encodeURIComponent(cmdDef.title)}&prompt=${encodeURIComponent(cmdDef.prompt)}&layer=${encodeURIComponent(cmdDef.layer)}&pointZoomLevel=${parameters.PointZoomLevel}` + (cmdDef.filter ? `&filter=${encodeURIComponent(cmdDef.filter)}` : "") + `&limit=${cmdDef.matchLimit}&properties=${(cmdDef.resultColumns.Column || []).map((col) => col.Property).join(",")}&propNames=${(cmdDef.resultColumns.Column || []).map((col) => col.Name).join(",")}`;
          openUrlInTarget(name, cmdDef, config.capabilities.hasTaskPane, dispatch, url, cmd.title);
        }
      }
    };
  } else {
    cmd = cmdDef;
  }
  commands[name] = cmd;
}
function getCommand(name) {
  return commands[name];
}
function isModalDisplayOptions(arg) {
  return typeof (arg == null ? void 0 : arg.url) != "undefined";
}
function isModalComponentDisplayOptions(arg) {
  return typeof arg.component != "undefined";
}
function isError(err) {
  return err instanceof Error;
}
function isInitError(item) {
  return typeof item.message != "undefined" && typeof item.stack != void 0;
}
function isMenuRef(item) {
  return typeof item.flyoutId != "undefined";
}
function isComponentFlyout(item) {
  return typeof item.componentName != "undefined";
}
function isMenu(item) {
  return typeof item.childItems != "undefined";
}
function isLayer(layer) {
  return layer.LayerDefinition !== void 0;
}
function isMapView(view) {
  return typeof view.x == "number" && typeof view.y == "number" && typeof view.scale == "number";
}
function isCoordinate(coord) {
  return coord instanceof Array && coord.length == 2 && typeof coord[0] == "number" && typeof coord[1] == "number";
}
function isAction(action) {
  return typeof action.type != "undefined" && typeof action.payload != "undefined";
}
function isRuntimeMap(arg) {
  return arg.Extents != null && arg.BackgroundColor != null && arg.CoordinateSystem != null && arg.MapDefinition != null && arg.DisplayDpi != null;
}
const MnText = ({ component, className, style, children }) => {
  const cls = ["mrl-text", className].filter(Boolean).join(" ");
  const cmp = component != null ? component : "span";
  switch (cmp) {
    case "p":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cls, style, children });
    case "div":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cls, style, children });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cls, style, children });
  }
};
const MnHeading = ({ level, style, className, children }) => {
  const cls = ["mrl-heading", `mrl-heading--h${level}`, className].filter(Boolean).join(" ");
  switch (level) {
    case 1:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: cls, style, children });
    case 2:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: cls, style, children });
    case 3:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: cls, style, children });
    case 4:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: cls, style, children });
    case 5:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: cls, style, children });
    case 6:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: cls, style, children });
    default:
      assertNever();
      return null;
  }
};
function getSvgIconName(blueprintName) {
  return blueprintName;
}
function toInlineSvgIcon(paths) {
  return paths.map((d) => ["path", { d }]);
}
function buildSvgIconRegistry(pathMap) {
  return Object.fromEntries(
    Object.entries(pathMap).map(([name, paths]) => [name, toInlineSvgIcon(paths)])
  );
}
const BP_ICONS_20 = {
  "arrow-left": [
    "M18 9H4.41L8.7 4.71c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71l-6 6c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l6 6a1.003 1.003 0 001.42-1.42L4.41 11H18c.55 0 1-.45 1-1s-.45-1-1-1z"
  ],
  "arrow-right": [
    "M18.71 9.29l-6-6a1.003 1.003 0 00-1.42 1.42L15.59 9H2c-.55 0-1 .45-1 1s.45 1 1 1h13.59l-4.29 4.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l6-6c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71z"
  ],
  "arrows-horizontal": [
    "M19.7 9.3l-5-5c-.2-.2-.4-.3-.7-.3-.6 0-1 .4-1 1 0 .3.1.5.3.7L16.6 9H3.4l3.3-3.3c.2-.2.3-.4.3-.7 0-.6-.4-1-1-1-.3 0-.5.1-.7.3l-5 5c-.2.2-.3.4-.3.7s.1.5.3.7l5 5c.2.2.4.3.7.3.6 0 1-.4 1-1 0-.3-.1-.5-.3-.7L3.4 11h13.2l-3.3 3.3c-.2.2-.3.4-.3.7 0 .6.4 1 1 1 .3 0 .5-.1.7-.3l5-5c.2-.2.3-.4.3-.7s-.1-.5-.3-.7z"
  ],
  "application": [
    "M3.5 9h9c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-9c-.28 0-.5.22-.5.5s.22.5.5.5zm0 2h5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-5c-.28 0-.5.22-.5.5s.22.5.5.5zM19 1H1c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm-1 16H2V6h16v11zM3.5 13h7c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-7c-.28 0-.5.22-.5.5s.22.5.5.5z"
  ],
  "caret-down": [
    "M16 7c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1 0 .24.1.46.24.63l-.01.01 5 6 .01-.01c.19.22.45.37.76.37s.57-.15.76-.37l.01.01 5-6-.01-.01c.14-.17.24-.39.24-.63z"
  ],
  "caret-up": [
    "M15.76 12.37l.01-.01-5-6-.01.01C10.57 6.15 10.31 6 10 6s-.57.15-.76.37l-.01-.01-5 6 .01.01c-.14.17-.24.39-.24.63 0 .55.45 1 1 1h10c.55 0 1-.45 1-1 0-.24-.1-.46-.24-.63z"
  ],
  "chevron-down": [
    "M16 6c-.28 0-.53.11-.71.29L10 11.59l-5.29-5.3a1.003 1.003 0 00-1.42 1.42l6 6c.18.18.43.29.71.29s.53-.11.71-.29l6-6A1.003 1.003 0 0016 6z"
  ],
  "chevron-left": [
    "M8.41 10l5.29-5.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71l-6 6c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l6 6a1.003 1.003 0 001.42-1.42L8.41 10z"
  ],
  "chevron-right": [
    "M13.71 9.29l-6-6a1.003 1.003 0 00-1.42 1.42l5.3 5.29-5.29 5.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l6-6c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71z"
  ],
  "chevron-up": [
    "M16.71 12.29l-6-6C10.53 6.11 10.28 6 10 6s-.53.11-.71.29l-6 6a1.003 1.003 0 001.42 1.42L10 8.41l5.29 5.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71z"
  ],
  "cross": [
    "M11.41 10l4.29-4.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L10 8.59l-4.29-4.3a1.003 1.003 0 00-1.42 1.42L8.59 10 4.3 14.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l4.29-4.3 4.29 4.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L11.41 10z"
  ],
  "cog": [
    "M19 8h-2.31c-.14-.46-.33-.89-.56-1.3l1.7-1.7a.996.996 0 000-1.41l-1.41-1.41a.996.996 0 00-1.41 0l-1.7 1.7c-.41-.22-.84-.41-1.3-.55V1c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v2.33c-.48.14-.94.34-1.37.58L5 2.28a.972.972 0 00-1.36 0L2.28 3.64c-.37.38-.37.99 0 1.36L3.9 6.62c-.24.44-.44.89-.59 1.38H1c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2.31c.14.46.33.89.56 1.3L2.17 15a.996.996 0 000 1.41l1.41 1.41c.39.39 1.02.39 1.41 0l1.7-1.7c.41.22.84.41 1.3.55V19c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.33c.48-.14.94-.35 1.37-.59L15 17.72c.37.37.98.37 1.36 0l1.36-1.36c.37-.37.37-.98 0-1.36l-1.62-1.62c.24-.43.45-.89.6-1.38H19c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-9 6c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
  ],
  "comment": [
    "M19 1H1c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3v4a1.003 1.003 0 001.71.71l4.7-4.71H19c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zM4 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
  ],
  "comparison": [
    "M6 8H1c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm13-6h-5c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 3h-5V3h5v2zM6 14H1c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1zM6 2H1c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm4-2c-.55 0-1 .45-1 1v18c0 .55.45 1 1 1s1-.45 1-1V1c0-.55-.45-1-1-1zm9 14h-5c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1zm0 3h-5v-2h5v2zm0-9h-5c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm0 3h-5V9h5v2z"
  ],
  "delete": [
    "M15 6a1.003 1.003 0 00-1.71-.71L10 8.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L8.59 10 5.3 13.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l3.29-3.3 3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L11.41 10l3.29-3.29c.19-.18.3-.43.3-.71zm-5-6C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
  ],
  "disable": [
    "M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM2 10c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L3.69 14.9A7.902 7.902 0 012 10zm8 8c-1.85 0-3.55-.63-4.9-1.69L16.31 5.1A7.902 7.902 0 0118 10c0 4.42-3.58 8-8 8z"
  ],
  "double-caret-vertical": [
    "M5 9h10c.55 0 1-.45 1-1 0-.24-.1-.46-.24-.63l.01-.01-5-6-.01.01C10.57 1.15 10.31 1 10 1s-.57.15-.76.37l-.01-.01-5 6 .01.01C4.1 7.54 4 7.76 4 8c0 .55.45 1 1 1zm10 2H5c-.55 0-1 .45-1 1 0 .24.1.46.24.63l-.01.01 5 6 .01-.01c.19.22.45.37.76.37s.57-.15.76-.37l.01.01 5-6-.01-.01c.14-.17.24-.39.24-.63 0-.55-.45-1-1-1z"
  ],
  "edit": [
    "M4.59 12.59l2.83 2.83 7.65-7.65-2.83-2.83-7.65 7.65zM2 18l4.41-1.59-2.81-2.79L2 18zM16 2c-.55 0-1.05.22-1.41.59l-1.65 1.65 2.83 2.83 1.65-1.65A2.006 2.006 0 0016 2z"
  ],
  "error": [
    "M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 16H9v-2h2v2zm0-3H9V4h2v9z"
  ],
  "folder-close": [
    "M0 17c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V7H0v10zM19 4H9.41l-1.7-1.71A.997.997 0 007 2H1c-.55 0-1 .45-1 1v3h20V5c0-.55-.45-1-1-1z"
  ],
  "geosearch": [
    "M8 18.88c-3.79 0-6.88-3.09-6.88-6.88 0-.61.08-1.22.23-1.79.03.01.06-.01.1-.01h.09v.55c0 .23.21.42.44.42.04 0 .09-.01.12-.02l.9.88c.09.09.23.09.32 0s.09-.23 0-.32l-.86-.9c0-.02.05-.04.05-.07v-.13c0-.18.1-.25.29-.41h.53c.1 0 .19-.01.27-.05.01-.01.02 0 .03-.01.02-.01.03-.02.05-.04.01-.01.02-.01.02-.02l.02-.02 1.13-1.13c-.16-.32-.3-.65-.42-.99h-.64v-.53c0-.01.06.06.06-.1h.38c-.04-.16-.08-.32-.1-.48h-.71c.2-.16.42-.31.64-.45C4.02 6.09 4 5.8 4 5.5c0-.14.01-.28.02-.43C1.62 6.46 0 9.04 0 12c0 4.41 3.59 8 8 8 3.87 0 7.09-2.77 7.82-6.44l-.97-1.1c-.26 3.57-3.23 6.42-6.85 6.42zm-2.12-3.67v-.35h.15c.29 0 .49-.23.49-.53v-.68c0-.01.01-.01 0-.02L4.71 11.8h-.77c-.29 0-.47.24-.47.53v2c0 .29.18.53.47.53h.33v2.02c0 .28.28.51.56.51s.56-.23.56-.51v-1.22h-.01c.29 0 .5-.16.5-.45zm13.83-2.92l-3.68-3.68c.14-.21.27-.42.38-.65.02-.04.04-.07.05-.11.11-.22.2-.45.28-.69v-.01c.07-.24.13-.48.17-.73l.03-.17c.04-.24.06-.49.06-.75C17 2.46 14.54 0 11.5 0S6 2.46 6 5.5 8.46 11 11.5 11c.26 0 .51-.02.76-.06l.17-.03c.25-.04.49-.1.73-.17h.01c.24-.08.47-.17.69-.28.04-.02.07-.04.11-.05.23-.11.44-.24.65-.38l3.68 3.68c.17.18.42.29.7.29a1.003 1.003 0 00.71-1.71zM11.5 9.5c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm1.93 5.33v-.65c0-.11-.13-.21-.24-.21-.11 0-.24.09-.24.21v.65c0 .11.13.21.24.21.11 0 .24-.1.24-.21zm-2.41.67h.83c.29 0 .46-.21.46-.5v-1.86l.23-.22c-.34.05-.69.08-1.04.08-.36 0-.7-.03-1.05-.08.03.05.06.1.08.16V15c.01.29.2.5.49.5z"
  ],
  "hand": [
    "M17 5c-.42 0-.79.27-.93.64L14.38 10h-.77l1.34-6.67c.03-.1.05-.21.05-.33a.998.998 0 00-1.98-.19h-.01L11.57 10H11V1c0-.55-.45-1-1-1S9 .45 9 1v9h-.2L6.97 2.76a.997.997 0 00-1.73-.41l-.03.03c-.01.02-.02.03-.03.04-.01.02-.01.03-.02.04v.01c-.01.01-.02.02-.02.03v.01c-.02.01-.02.02-.03.03 0 0 0 .01-.01.01 0 .01 0 .02-.01.03 0 0 0 .01-.01.01 0 .01-.01.02-.01.03 0 0 0 .01-.01.01 0 .01-.01.02-.01.03 0 .01 0 .01-.01.02 0 .01-.01.02-.01.03 0 .01 0 .01-.01.02 0 .01-.01.02-.01.03v.02c0 .01 0 .02-.01.03V3c0 .05 0 .09.01.14l1.45 10.25L6 12.7v.01L3.84 9.45h-.01A.98.98 0 003 9c-.55 0-1 .45-1 1 0 .2.06.39.17.55L6 18.44C7.06 19.4 8.46 20 10 20c3.31 0 6-2.69 6-6v-1.84l.01-.03v-.06l1.94-5.75A1.003 1.003 0 0017 5z"
  ],
  "home": [
    "M2 12v7c0 .55.45 1 1 1h5v-7h4v7h5c.55 0 1-.45 1-1v-7l-8-8-8 8zm17.71-2.71L17 6.59V3c0-.55-.45-1-1-1s-1 .45-1 1v1.59L10.71.3C10.53.11 10.28 0 10 0s-.53.11-.71.29l-9 9a1.003 1.003 0 001.42 1.42L10 2.41l8.29 8.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71z"
  ],
  "info-sign": [
    "M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM9 4h2v2H9V4zm4 12H7v-1h2V8H8V7h3v8h2v1z"
  ],
  "issue": [
    "M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm1-2H9v-2h2v2zm0-3H9V4h2v9z"
  ],
  "layer": [
    "M19.5 9.1l-9-5c-.2-.1-.3-.1-.5-.1s-.3 0-.5.1l-9 5c-.3.2-.5.5-.5.9s.2.7.5.9l9 5c.2.1.3.1.5.1s.3 0 .5-.1l9-5c.3-.2.5-.5.5-.9s-.2-.7-.5-.9z"
  ],
  "layers": [
    "M.5 6.9l9 5c.2.1.3.1.5.1s.3 0 .5-.1l9-5c.3-.2.5-.5.5-.9s-.2-.7-.5-.9l-9-5c-.2-.1-.3-.1-.5-.1s-.3 0-.5.1l-9 5c-.3.2-.5.5-.5.9s.2.7.5.9z",
    "M19 9c-.2 0-.3 0-.5.1L10 13.9 1.5 9.1C1.3 9 1.2 9 1 9c-.6 0-1 .4-1 1 0 .4.2.7.5.9l9 5c.2.1.3.1.5.1s.3 0 .5-.1l9-5c.3-.2.5-.5.5-.9 0-.6-.4-1-1-1z",
    "M19 13c-.2 0-.3 0-.5.1L10 17.9l-8.5-4.7c-.2-.2-.3-.2-.5-.2-.6 0-1 .4-1 1 0 .4.2.7.5.9l9 5c.2.1.3.1.5.1s.3 0 .5-.1l9-5c.3-.2.5-.5.5-.9 0-.6-.4-1-1-1z"
  ],
  "map": [
    "M19.54 4.18l.01-.02-6-4-.01.02C13.39.08 13.21 0 13 0s-.39.08-.54.18l-.01-.02L7 3.8 1.55.17l-.01.01A.969.969 0 001 0C.45 0 0 .45 0 1v14c0 .35.19.64.46.82l-.01.02 6 4 .01-.02c.15.1.33.18.54.18s.39-.08.54-.18l.01.02L13 16.2l5.45 3.63.01-.02c.15.11.33.19.54.19.55 0 1-.45 1-1V5c0-.35-.19-.64-.46-.82zM6 17.13l-4-2.67V2.87l4 2.67v11.59zm6-2.67l-4 2.67V5.54l4-2.67v11.59zm6 2.67l-4-2.67V2.87l4 2.67v11.59z"
  ],
  "media": [
    "M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
  ],
  "menu-closed": [
    "M8 6h11c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zM4 6c-.28 0-.53.11-.71.29l-3 3C.11 9.47 0 9.72 0 10c0 .28.11.53.29.71l3 3A1.003 1.003 0 005 13V7c0-.55-.45-1-1-1zm15 8H8c-.55 0-1 .45-1 1s.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1zm0-5H8c-.55 0-1 .45-1 1s.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1z"
  ],
  "menu-open": [
    "M12 9H1c-.55 0-1 .45-1 1s.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1zm0 5H1c-.55 0-1 .45-1 1s.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1zm0-10H1c-.55 0-1 .45-1 1s.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1zm7.71 5.29l-3-3A1.003 1.003 0 0015 7v6a1.003 1.003 0 001.71.71l3-3c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71z"
  ],
  "minus": [
    "M16 9H4c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"
  ],
  "multi-select": [
    "M19 3H7c-.55 0-1 .45-1 1v1h12v6h1c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zm-6 6H1c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm-1 6H2v-4h10v4zm4-9H4c-.55 0-1 .45-1 1v1h12v6h1c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1z"
  ],
  "new-layer": [
    "M11.513 2.663A2 2 0 0013 6h1v1a2 2 0 104 0v-.733l1.5.833c.3.2.5.5.5.9s-.2.7-.5.9l-9 5c-.2.1-.3.1-.5.1s-.3 0-.5-.1l-9-5C.2 8.7 0 8.4 0 8s.2-.7.5-.9l9-5c.2-.1.3-.1.5-.1s.3 0 .5.1l1.013.563zM17 3h2a1 1 0 010 2h-2v2a1 1 0 01-2 0V5h-2a1 1 0 010-2h2V1a1 1 0 012 0v2z"
  ],
  "path-search": [
    "M4 7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm15 11.69l-5-2.5v-3.63c-.32.11-.66.22-1 .29v3.32l-6 2.57v-7.25c-.36-.27-.69-.57-1-.9v8.1l-5-2.5V10c.55 0 1-.45 1-1s-.45-1-1-1V1.31l3.43 1.71c.11-.31.24-.62.39-.92L.72.05A.545.545 0 00.5 0C.22 0 0 .22 0 .5v16c0 .2.12.36.28.44l6 3c.07.04.14.06.22.06.07 0 .14-.01.2-.04l6.79-2.91 5.79 2.9c.07.03.14.05.22.05.28 0 .5-.22.5-.5v-4.21c-.31.13-.64.21-1 .21v3.19zM10 5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm3-1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6.72-.94l-1.43-.72c.2.43.36.89.48 1.36l.23.11V5.5c-.55 0-1 .45-1 1s.45 1 1 1v1.96l1 1V3.5c0-.2-.12-.36-.28-.44zm-3.69 5.56c.14-.21.27-.42.38-.65.02-.04.04-.07.05-.11.11-.22.2-.45.28-.69v-.01c.07-.24.13-.48.17-.73l.03-.17c.04-.25.06-.5.06-.76C17 2.46 14.54 0 11.5 0S6 2.46 6 5.5 8.46 11 11.5 11c.26 0 .51-.02.76-.06l.17-.03c.25-.04.49-.1.73-.17h.01c.24-.08.47-.17.69-.28.04-.02.07-.03.11-.05.23-.11.44-.24.65-.38l.18.18 3.5 3.5c.17.18.42.29.7.29a1.003 1.003 0 00.71-1.71l-3.68-3.67zm-4.53.88c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
  ],
  "play": [
    "M16 10c0-.36-.2-.67-.49-.84l.01-.01-10-6-.01.01A.991.991 0 005 3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1 .19 0 .36-.07.51-.16l.01.01 10-6-.01-.01c.29-.17.49-.48.49-.84z"
  ],
  "plus": [
    "M16 9h-5V4c0-.55-.45-1-1-1s-1 .45-1 1v5H4c-.55 0-1 .45-1 1s.45 1 1 1h5v5c0 .55.45 1 1 1s1-.45 1-1v-5h5c.55 0 1-.45 1-1s-.45-1-1-1z"
  ],
  "print": [
    "M14 16H6v-4H4v5c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-5h-2v4zm2-13c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v1h12V3zm3 2H1c-.55 0-1 .45-1 1v7c0 .55.45 1 1 1h2v-3h14v3h2c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-1 4h-2V7h2v2z"
  ],
  "properties": [
    "M2 15c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm5-4h12c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1zM2 1C.9 1 0 1.9 0 3s.9 2 2 2 2-.9 2-2-.9-2-2-2zm17 8H7c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1zm0 7H7c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"
  ],
  "select": [
    "M19.71 18.29l-4.25-4.25L20 12.91 9.93 9.33c.04-.1.07-.21.07-.33V3c0-.55-.45-1-1-1H4V1c0-.55-.45-1-1-1S2 .45 2 1v1H1c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 .55.45 1 1 1h6c.12 0 .23-.03.34-.07L12.91 20l1.14-4.54 4.25 4.25c.17.18.42.29.7.29a1.003 1.003 0 00.71-1.71zM8 8H4V4h4v4z"
  ],
  "search": [
    "M19.56 17.44l-4.94-4.94A8.004 8.004 0 0016 8c0-4.42-3.58-8-8-8S0 3.58 0 8s3.58 8 8 8c1.67 0 3.21-.51 4.5-1.38l4.94 4.94a1.498 1.498 0 102.12-2.12zM8 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
  ],
  "small-cross": [
    "M11.41 10l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L10 8.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L8.59 10 5.3 13.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l3.29-3.3 3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L11.41 10z"
  ],
  "stop": [
    "M16 3H4c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z"
  ],
  "tag": [
    "M2 4a2 2 0 012-2h4.588a2 2 0 011.414.586l7.41 7.41a2 2 0 010 2.828l-4.588 4.588a2 2 0 01-2.829 0l-7.41-7.41A2 2 0 012 8.588V4zm3.489-.006a1.495 1.495 0 100 2.99 1.495 1.495 0 000-2.99z"
  ],
  "th": [
    "M19 1H1c-.6 0-1 .5-1 1v16c0 .5.4 1 1 1h18c.5 0 1-.5 1-1V2c0-.5-.5-1-1-1zM7 17H2v-3h5v3zm0-4H2v-3h5v3zm0-4H2V6h5v3zm11 8H8v-3h10v3zm0-4H8v-3h10v3zm0-4H8V6h10v3z"
  ],
  "tick": [
    "M17 4c-.28 0-.53.11-.71.29L7 13.59 3.71 10.3A.965.965 0 003 10a1.003 1.003 0 00-.71 1.71l4 4c.18.18.43.29.71.29s.53-.11.71-.29l10-10A1.003 1.003 0 0017 4z"
  ],
  "trash": [
    "M17 1h-5c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1H3c-.55 0-1 .45-1 1v1h16V2c0-.55-.45-1-1-1zm.5 3h-15c-.28 0-.5.22-.5.5s.22.5.5.5H3v14c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5h.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5zM7 16c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v8zm4 0c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v8zm4 0c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v8z"
  ],
  "upload": [
    "M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm4 10c-.28 0-.53-.11-.71-.29L11 7.41V15c0 .55-.45 1-1 1s-1-.45-1-1V7.41l-2.29 2.3a1.003 1.003 0 01-1.42-1.42l4-4c.18-.18.43-.29.71-.29s.53.11.71.29l4 4A1.003 1.003 0 0114 10z"
  ],
  "warning-sign": [
    "M19.86 17.52l.01-.01-9-16-.01.01C10.69 1.21 10.37 1 10 1s-.69.21-.86.52l-.01-.01-9 16 .01.01c-.08.14-.14.3-.14.48 0 .55.45 1 1 1h18c.55 0 1-.45 1-1 0-.18-.06-.34-.14-.48zM11 17H9v-2h2v2zm0-3H9V6h2v8z"
  ],
  "zoom-to-fit": [
    "M1 7c.55 0 1-.45 1-1V2h4c.55 0 1-.45 1-1s-.45-1-1-1H1C.45 0 0 .45 0 1v5c0 .55.45 1 1 1zm5 1a1.003 1.003 0 00-1.71-.71l-2 2c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2 2a1.003 1.003 0 001.42-1.42L4.41 10 5.7 8.71c.19-.18.3-.43.3-.71zm2-2c.28 0 .53-.11.71-.29L10 4.41l1.29 1.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71l-2-2C10.53 2.11 10.28 2 10 2s-.53.11-.71.29l-2 2A1.003 1.003 0 008 6zM6 18H2v-4c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55.45 1 1 1h5c.55 0 1-.45 1-1s-.45-1-1-1zm8-6a1.003 1.003 0 001.71.71l2-2c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71l-2-2a1.003 1.003 0 00-1.42 1.42l1.3 1.29-1.29 1.29c-.19.18-.3.43-.3.71zm5-12h-5c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1V1c0-.55-.45-1-1-1zm-7 14c-.28 0-.53.11-.71.29L10 15.59 8.71 14.3A.965.965 0 008 14a1.003 1.003 0 00-.71 1.71l2 2c.18.18.43.29.71.29s.53-.11.71-.29l2-2A1.003 1.003 0 0012 14zm7-1c-.55 0-1 .45-1 1v4h-4c-.55 0-1 .45-1 1s.45 1 1 1h5c.55 0 1-.45 1-1v-5c0-.55-.45-1-1-1z"
  ]
};
buildSvgIconRegistry(BP_ICONS_20);
function getBlueprintIconPaths(name) {
  const paths = BP_ICONS_20[name];
  if (!paths) {
    return null;
  }
  return { paths, viewBoxSize: 20 };
}
const SvgIcon = ({ name, size = 16, style }) => {
  const iconData = getBlueprintIconPaths(name);
  if (!iconData) {
    return null;
  }
  const { paths, viewBoxSize } = iconData;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: `0 0 ${viewBoxSize} ${viewBoxSize}`,
      fill: "currentColor",
      style,
      "aria-hidden": "true",
      children: paths.map((d, i) => React.createElement("path", { d, key: i }))
    }
  );
};
const MnIcon = ({ icon, style, iconSize }) => {
  if (!icon) {
    return null;
  }
  const svgName = getSvgIconName(icon);
  if (!svgName) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SvgIcon, { name: svgName, size: iconSize != null ? iconSize : 16, style });
};
const MnButton = ({
  type = "button",
  icon,
  variant,
  minimal,
  active,
  loading,
  disabled,
  onClick,
  title,
  style,
  className,
  children
}) => {
  const hasChildren = React.Children.count(children) > 0;
  const classes = [
    "mrl-btn",
    variant ? `mrl-btn--${variant}` : null,
    minimal ? "mrl-btn--minimal" : null,
    active ? "mrl-btn--active" : null,
    loading ? "mrl-btn--loading" : null,
    icon && !hasChildren ? "mrl-btn--icon-only" : null,
    className != null ? className : null
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type,
      className: classes,
      disabled: disabled || loading,
      onClick,
      title,
      style,
      children: [
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mrl-btn-spinner", "aria-hidden": "true" }),
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx(MnIcon, { icon, iconSize: 16 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mrl-btn-text", children })
      ]
    }
  );
};
const MnRadio = ({ name, label, value, checked, onChange }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mrl-radio", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "radio",
        name,
        value,
        checked,
        onChange
      }
    ),
    label
  ] });
};
function computeTickLabels(min, max, labelStepSize, labelValues) {
  if (labelValues && labelValues.length > 0) {
    return labelValues;
  }
  if (labelStepSize && labelStepSize > 0) {
    const labels = [];
    for (let v = min; v <= max; v += labelStepSize) {
      labels.push(Math.round(v * 1e9) / 1e9);
    }
    if (labels[labels.length - 1] < max) {
      labels.push(max);
    }
    return labels;
  }
  return [min, max];
}
const MnSlider = ({ min = 0, max = 100, stepSize, labelStepSize, labelValues, value, onChange, disabled }) => {
  const range = max - min;
  const ticks = computeTickLabels(min, max, labelStepSize, labelValues);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mrl-slider-wrapper", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "range",
        className: "mrl-slider",
        min,
        max,
        step: stepSize,
        value,
        disabled,
        onChange: (e) => onChange == null ? void 0 : onChange(parseFloat(e.target.value))
      }
    ),
    ticks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mrl-slider-labels", children: ticks.map((tick, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "mrl-slider-label",
        style: { left: `${(tick - min) / range * 100}%` },
        children: tick
      },
      i
    )) })
  ] });
};
const MnCollapsible = ({ isOpen, children }) => {
  const style = {
    maxHeight: isOpen ? "9999px" : 0,
    overflow: isOpen ? "visible" : "hidden",
    transition: "max-height var(--mrl-transition-speed, 150ms) ease-in-out"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style, "aria-hidden": !isOpen || void 0, children });
};
const DEFAULT_ICON_BY_VARIANT = {
  primary: "info-sign",
  warning: "warning-sign",
  success: "tick",
  danger: "error"
};
const MnCallout = ({ variant, title, icon, children }) => {
  const cls = ["mrl-callout", variant ? `mrl-callout--${variant}` : null].filter(Boolean).join(" ");
  const resolvedIcon = icon != null ? icon : variant ? DEFAULT_ICON_BY_VARIANT[variant] : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cls, children: resolvedIcon ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mrl-callout-content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mrl-callout-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MnIcon, { icon: resolvedIcon, iconSize: 20 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mrl-callout-body", children: [
      title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mrl-callout-title", children: title }),
      children
    ] })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mrl-callout-title", children: title }),
    children
  ] }) });
};
const MnCheckbox = ({ checked, label, onChange, disabled, id, name }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mrl-checkbox", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        id,
        name,
        checked,
        disabled,
        onChange
      }
    ),
    label
  ] });
};
const MnCard = ({ style, children }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mrl-card", style, children });
};
const MnNumericInput = ({ style, min, max, value, disabled, onChange }) => {
  const handleChange = (e) => {
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed)) {
      onChange == null ? void 0 : onChange(parsed);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type: "number",
      className: "mrl-numeric-input",
      style,
      min,
      max,
      value,
      disabled,
      onChange: handleChange
    }
  );
};
const MnInputGroup = ({
  style,
  round,
  autoFocus,
  leftIcon,
  placeholder,
  value,
  readOnly,
  disabled,
  id,
  name,
  rightElement,
  onChange,
  onClick
}) => {
  const rightElementRef = React.useRef(null);
  const [rightElementWidth, setRightElementWidth] = React.useState(0);
  React.useEffect(() => {
    if (!rightElement || !rightElementRef.current) {
      setRightElementWidth(0);
      return;
    }
    const updateWidth = () => {
      var _a, _b;
      const width = Math.ceil((_b = (_a = rightElementRef.current) == null ? void 0 : _a.getBoundingClientRect().width) != null ? _b : 0);
      setRightElementWidth(width);
    };
    updateWidth();
    if (typeof ResizeObserver === "undefined") {
      return;
    }
    const observer = new ResizeObserver(updateWidth);
    observer.observe(rightElementRef.current);
    return () => {
      observer.disconnect();
    };
  }, [rightElement]);
  const inputStyle = rightElement ? { paddingRight: `${rightElementWidth + 10}px` } : void 0;
  const classes = [
    "mrl-input-group",
    round ? "mrl-input-group--round" : null,
    leftIcon ? "mrl-input-group--with-left-icon" : null,
    rightElement ? "mrl-input-group--with-right-element" : null
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: classes, style, children: [
    leftIcon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mrl-input-left-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MnIcon, { icon: leftIcon, iconSize: 14 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        id,
        name,
        type: "text",
        autoFocus,
        placeholder,
        value,
        readOnly,
        disabled,
        style: inputStyle,
        onChange,
        onClick
      }
    ),
    rightElement && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ref: rightElementRef, className: "mrl-input-right-element", children: rightElement })
  ] });
};
const MnNonIdealState = ({ icon, title, description, action }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mrl-non-ideal-state", children: [
    icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mrl-non-ideal-state-icon", children: typeof icon === "string" ? /* @__PURE__ */ jsxRuntimeExports.jsx(MnIcon, { icon, iconSize: 40 }) : icon }),
    title && /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mrl-non-ideal-state-title", children: title }),
    description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mrl-non-ideal-state-description", children: description }),
    action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mrl-non-ideal-state-action", children: action })
  ] });
};
const MnSpinner = ({ variant, sizePreset = "standard" }) => {
  const cls = [
    "mrl-spinner",
    `mrl-spinner--${sizePreset}`,
    variant ? `mrl-spinner--${variant}` : null
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cls, role: "status", "aria-label": "Loading" });
};
const MnSwitch = ({ style, disabled, checked, label, labelElement, onChange }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mrl-switch", style, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        checked,
        disabled,
        onChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mrl-switch-track", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mrl-switch-thumb" }) }),
    labelElement != null ? labelElement : label
  ] });
};
const MnSelect = ({ id, name, fill, style, placeholder, value, items, onChange, keyFunc, extraClassNames }) => {
  const wrapperCls = ["mrl-select", fill ? "mrl-select--fill" : null, extraClassNames != null ? extraClassNames : null].filter(Boolean).join(" ");
  const handleChange = (e) => {
    const selected = e.target.value;
    onChange == null ? void 0 : onChange(selected === "" ? void 0 : selected);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: wrapperCls, style, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id, name, value: value != null ? value : "", onChange: handleChange, children: [
    placeholder !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: placeholder }),
    items.map((item, idx) => {
      const key = keyFunc ? keyFunc(item) : idx;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: String(item.value), children: item.label }, key);
    })
  ] }) });
};
const MnFileInput = ({ fill, text, buttonText, onInputChange }) => {
  const cls = ["mrl-file-input", fill ? "mrl-file-input--fill" : null].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: cls, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", onChange: onInputChange }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mrl-file-input-text", children: text != null ? text : "Choose file…" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mrl-file-input-btn", children: buttonText != null ? buttonText : "Browse" })
  ] });
};
const MnFormGroup = ({ label, labelFor, inline, children }) => {
  const cls = ["mrl-form-group", inline ? "mrl-form-group--inline" : null].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cls, children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: labelFor, children: label }),
    children
  ] });
};
const MnEditableText = ({ value, onChange }) => {
  const [editing, setEditing] = React.useState(false);
  const [localValue, setLocalValue] = React.useState(value != null ? value : "");
  React.useEffect(() => {
    setLocalValue(value != null ? value : "");
  }, [value]);
  const commit = () => {
    setEditing(false);
    onChange == null ? void 0 : onChange(localValue);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      commit();
    } else if (e.key === "Escape") {
      setLocalValue(value != null ? value : "");
      setEditing(false);
    }
  };
  if (editing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mrl-editable-text", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        className: "mrl-editable-text-input",
        autoFocus: true,
        value: localValue,
        onChange: (e) => setLocalValue(e.target.value),
        onBlur: commit,
        onKeyDown: handleKeyDown
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mrl-editable-text", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "mrl-editable-text-display",
      onClick: () => setEditing(true),
      children: localValue
    }
  ) });
};
function processMenuItems(items) {
  const processed = [];
  if (items != null) {
    for (const i of items) {
      if (i != null) {
        processed.push(i);
      }
    }
  }
  return processed;
}
function getText(label) {
  if (typeof label === "function") {
    return label();
  }
  return label;
}
const VOID_NOOP = () => {
};
const AppContext = reactExports.createContext({
  allowHtmlValuesInSelection: () => false,
  getHTMLCleaner: () => void 0,
  getPropertyValueFormatter: () => void 0,
  getLegendLayerExtraIconsProvider: () => [],
  getLegendGroupExtraIconsProvider: () => []
});
const AppContextProvider = ({ mapguide, children }) => {
  const providerImpl = reactExports.useMemo(() => ({
    allowHtmlValuesInSelection: () => {
      var _a, _b;
      return (_b = (_a = mapguide == null ? void 0 : mapguide.selectionSettings) == null ? void 0 : _a.allowHtmlValues) != null ? _b : false;
    },
    getHTMLCleaner: () => {
      var _a;
      return (_a = mapguide == null ? void 0 : mapguide.selectionSettings) == null ? void 0 : _a.cleanHtml;
    },
    getPropertyValueFormatter: () => {
      var _a;
      return (_a = mapguide == null ? void 0 : mapguide.selectionSettings) == null ? void 0 : _a.formatPropertyValue;
    },
    getLegendLayerExtraIconsProvider: (options) => {
      var _a, _b, _c;
      return (_c = (_b = (_a = mapguide == null ? void 0 : mapguide.legendSettings) == null ? void 0 : _a.provideExtraLayerIconsHtml) == null ? void 0 : _b.call(_a, options)) != null ? _c : [];
    },
    getLegendGroupExtraIconsProvider: (options) => {
      var _a, _b, _c;
      return (_c = (_b = (_a = mapguide == null ? void 0 : mapguide.legendSettings) == null ? void 0 : _a.provideExtraGroupIconsHtml) == null ? void 0 : _b.call(_a, options)) != null ? _c : [];
    }
  }), [mapguide]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppContext.Provider, { value: providerImpl, children });
};
const LegendContext = reactExports.createContext({
  stateless: false,
  getMapName: () => void 0,
  getSessionId: () => void 0,
  isFiltering: () => false,
  getFilterText: () => STR_EMPTY,
  getLocale: () => DEFAULT_LOCALE,
  getBaseIconSize: () => 0,
  getIconMimeType: () => STR_EMPTY,
  getChildren: () => [],
  getCurrentScale: () => -1,
  getTree: VOID_NOOP,
  getLayerVisibility: () => false,
  getGroupVisibility: () => false,
  setGroupVisibility: VOID_NOOP,
  setLayerVisibility: VOID_NOOP,
  getLayerSelectability: () => false,
  setLayerSelectability: () => false,
  getGroupExpanded: () => false,
  setGroupExpanded: VOID_NOOP,
  getLayerExpanded: () => false,
  setLayerExpanded: VOID_NOOP,
  provideExtraGroupIconsHtml: () => [],
  provideExtraLayerIconsHtml: () => []
});
const ToolbarContext = reactExports.createContext({
  openFlyout: VOID_NOOP,
  closeFlyout: VOID_NOOP,
  openComponent: VOID_NOOP,
  closeComponent: VOID_NOOP
});
const Icon = (props) => {
  const spStyle = __spreadValues({}, props.style || {});
  if (!spStyle.display) {
    spStyle.display = "inline-block";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", __spreadProps(__spreadValues({ style: spStyle, onClick: props.onClick }, props.otherProps), { children: props.children(props.baseSize) }));
};
const ImageIcon = (props) => {
  if (!props.url && !props.spriteClass) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("noscript", {});
  }
  let url;
  let spriteClass = props.spriteClass;
  if (props.url && props.url != STD_CSS_SPRITE_RELPATH) {
    url = getAssetPath(props.url);
    spriteClass = void 0;
  }
  if (spriteClass) {
    const spStyle = __spreadValues({}, props.style || {});
    if (!spStyle.display) {
      spStyle.display = "inline-block";
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", __spreadValues({ style: spStyle, onClick: props.onClick, className: `icon ${spriteClass}` }, props.otherProps));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("img", __spreadProps(__spreadValues({ className: "icon", style: props.style, src: url, onClick: props.onClick }, props.otherProps), { onError: (e) => e.currentTarget.src = ICON_ERROR }));
};
const DEFAULT_TOOLBAR_SIZE = 29;
const TOOLBAR_BACKGROUND_COLOR = "#f0f0f0";
function isNumeric(arg) {
  return typeof arg == "number";
}
const SVG_SIZE_RATIO = 16 / DEFAULT_TOOLBAR_SIZE;
function getSelected(item) {
  const sel = item.selected;
  if (sel != null) {
    if (typeof sel === "function") {
      return sel();
    } else {
      return sel;
    }
  }
  return false;
}
function getEnabled(item) {
  const en = item.enabled;
  if (en != null) {
    if (typeof en === "function") {
      return en();
    } else {
      return en;
    }
  }
  return true;
}
const OpacityIcon = reactExports.memo(({ opacity, icon, iconSize }) => {
  const { Icon: Icon2 } = useElementContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { style: { opacity }, icon, iconSize });
});
function getIconElement(item, enabled, size) {
  const iconStyle = getIconStyle(enabled, size);
  if (item.iconClass || item.icon) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ImageIcon, { style: iconStyle, url: item.icon, spriteClass: item.iconClass });
  } else if (item.svgIconName) {
    const { opacity } = iconStyle;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(OpacityIcon, { opacity, icon: item.svgIconName, iconSize: size * SVG_SIZE_RATIO });
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
  }
}
function getFlyoutIconElement(isFlownOut, size) {
  const { Icon: Icon2 } = useElementContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { icon: isFlownOut ? "chevron-up" : "chevron-down", iconSize: size * SVG_SIZE_RATIO });
}
function getTooltip(item) {
  const tt = item.tooltip;
  if (tt != null) {
    if (typeof tt === "function") {
      return tt();
    } else {
      return tt;
    }
  }
  return STR_EMPTY;
}
function getIconStyle(enabled, height) {
  const imgStyle = {
    verticalAlign: "middle",
    lineHeight: height
  };
  return imgStyle;
}
function getItemStyle(enabled, selected, size, isMouseOver, vertical) {
  const pad = (size - 16) / 2;
  const vertPad = 6;
  const style = {
    display: vertical === true ? "block" : "inline-flex",
    alignItems: vertical === true ? void 0 : "center",
    gap: vertical === true ? void 0 : 4,
    verticalAlign: vertical === true ? void 0 : "top",
    //height: height,
    paddingLeft: pad,
    paddingRight: pad,
    paddingTop: vertPad,
    paddingBottom: vertPad
  };
  if (isMouseOver === true && enabled === true || selected) {
    style.borderWidth = 1;
    style.paddingLeft = pad - 1;
    style.paddingRight = pad - 1;
    style.paddingTop = vertPad - 1;
    style.paddingBottom = vertPad - 1;
  }
  return style;
}
function getToolbarSeparatorItemStyle(size, vertical) {
  const style = {
    display: vertical === true ? "block" : "inline-block"
  };
  if (vertical === true) {
    style.paddingTop = 2;
    style.paddingBottom = -2;
    style.marginLeft = 0;
    style.marginRight = 0;
  } else {
    const vertPad = 6;
    const separatorHeight = Math.max(1, size - vertPad * 2);
    const separatorOffset = Math.max(0, Math.floor((size - separatorHeight) / 2));
    style.height = separatorHeight;
    style.marginTop = separatorOffset;
    style.marginBottom = separatorOffset;
    style.verticalAlign = "top";
    style.boxSizing = "border-box";
    style.paddingTop = 0;
    style.paddingBottom = 0;
    style.marginLeft = 2;
    style.marginRight = 2;
  }
  return style;
}
const ComponentFlyoutItem = (props) => {
  const { size, item, vertical, isFlownOut } = props;
  const toolbarCtx = reactExports.useContext(ToolbarContext);
  const [isMouseOver, setIsMouseOver] = reactExports.useState(false);
  const onClick = (e) => {
    e.preventDefault();
    const { flyoutId, componentName, componentProps } = item;
    const newState = !!!isFlownOut;
    if (newState) {
      const rect = e.currentTarget.getBoundingClientRect();
      const metrics = {
        posX: rect.left,
        // e.clientX,
        posY: rect.top,
        // e.clientY,
        width: rect.width,
        // e.currentTarget.offsetWidth,
        height: rect.height,
        // e.currentTarget.offsetHeight
        vertical
      };
      toolbarCtx.openComponent(flyoutId, metrics, componentName, componentProps);
    } else {
      toolbarCtx.closeComponent(flyoutId);
    }
    return false;
  };
  const onMouseLeave = () => {
    setIsMouseOver(false);
  };
  const onMouseEnter = () => {
    setIsMouseOver(true);
  };
  const selected = getSelected(item);
  const enabled = getEnabled(item);
  const style = getItemStyle(enabled, selected, size, isMouseOver, vertical);
  let label = item.label;
  if (vertical === true) {
    label = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rotated-text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rotated-text__inner rotated-text-ccw", children: getText(item.label) }) });
  }
  const ttip = getTooltip(item);
  const iconEl = getIconElement(item, enabled, size);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `noselect toolbar-flyout-btn ${selected ? "selected-item" : ""} ${isMouseOver ? "mouse-over" : ""}`, onMouseEnter, onMouseLeave, onClick, style, title: ttip, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-flyout-id": `flyout-${item.flyoutId}`, style: { display: "inline-flex", alignItems: "center", gap: 4 }, children: [
    iconEl,
    " ",
    label,
    " ",
    getFlyoutIconElement(isFlownOut, size)
  ] }) });
};
const FlyoutMenuReferenceItem = (props) => {
  const { size, menu, vertical, isFlownOut } = props;
  const toolbarCtx = reactExports.useContext(ToolbarContext);
  const [isMouseOver, setIsMouseOver] = reactExports.useState(false);
  const onClick = (e) => {
    e.preventDefault();
    const newState = !!!isFlownOut;
    if (newState) {
      const rect = e.currentTarget.getBoundingClientRect();
      const metrics = {
        posX: rect.left,
        // e.clientX,
        posY: rect.top,
        // e.clientY,
        width: rect.width,
        // e.currentTarget.offsetWidth,
        height: rect.height,
        // e.currentTarget.offsetHeight
        vertical
      };
      toolbarCtx.openFlyout(menu.flyoutId, metrics);
    } else {
      toolbarCtx.closeFlyout(menu.flyoutId);
    }
    return false;
  };
  const onMouseLeave = () => {
    setIsMouseOver(false);
  };
  const onMouseEnter = () => {
    setIsMouseOver(true);
  };
  const selected = getSelected(menu);
  const enabled = getEnabled(menu);
  const style = getItemStyle(enabled, selected, size, isMouseOver, vertical);
  let label = menu.label;
  if (vertical === true) {
    const text = typeof menu.label === "function" ? menu.label() : menu.label;
    label = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rotated-text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rotated-text__inner rotated-text-ccw", children: text }) });
  }
  menu.flyoutAlign;
  const ttip = getTooltip(menu);
  const iconEl = getIconElement(menu, enabled, size);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `noselect toolbar-flyout-btn ${selected ? "selected-item" : ""} ${isMouseOver ? "mouse-over" : ""}`, onMouseEnter, onMouseLeave, onClick, style, title: ttip, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-flyout-id": `flyout-${menu.flyoutId}`, style: { display: "inline-flex", alignItems: "center", gap: 4 }, children: [
    iconEl,
    " ",
    label,
    " ",
    getFlyoutIconElement(isFlownOut, size)
  ] }) });
};
const ToolbarSeparator = (props) => {
  const style = getToolbarSeparatorItemStyle(props.size, props.vertical);
  if (props.vertical === true) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "noselect toolbar-separator-vertical", style });
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "noselect toolbar-separator-horizontal", style, "aria-hidden": "true" });
  }
};
const ToolbarButton = (props) => {
  const { height, item, vertical, hideVerticalLabels } = props;
  const [isMouseOver, setIsMouseOver] = reactExports.useState(false);
  const onMouseLeave = () => {
    setIsMouseOver(false);
  };
  const onMouseEnter = () => {
    setIsMouseOver(true);
  };
  const onClick = (e) => {
    e.preventDefault();
    const { item: item2 } = props;
    const enabled2 = getEnabled(item2);
    if (enabled2 && item2.invoke) {
      item2.invoke();
    }
    return false;
  };
  const selected = getSelected(item);
  const enabled = getEnabled(item);
  const style = getItemStyle(enabled, selected, height, isMouseOver, vertical);
  let ttip = null;
  if (typeof item.tooltip == "function") {
    ttip = item.tooltip();
  } else {
    ttip = item.tooltip;
  }
  if (!enabled) {
    style.opacity = 0.3;
  }
  const iconEl = getIconElement(item, enabled, height);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `noselect toolbar-btn ${selected ? "selected-item" : ""} ${isMouseOver && enabled ? "mouse-over" : ""}`, onMouseEnter, onMouseLeave, style, title: ttip, onClick, children: [
    iconEl,
    " ",
    vertical == true && hideVerticalLabels == true ? null : getText(item.label)
  ] });
};
const Toolbar = (props) => {
  const {
    containerStyle,
    containerClass,
    childItems,
    vertical,
    hideVerticalLabels,
    flyoutStates,
    onOpenFlyout,
    onCloseFlyout,
    onOpenComponent,
    onCloseComponent
  } = props;
  const openFlyout2 = (id, metrics) => onOpenFlyout == null ? void 0 : onOpenFlyout(id, metrics);
  const closeFlyout2 = (id) => onCloseFlyout == null ? void 0 : onCloseFlyout(id);
  const openComponent2 = (id, metrics, name, props2) => onOpenComponent == null ? void 0 : onOpenComponent(id, metrics, name, props2);
  const closeComponent2 = (id) => onCloseComponent == null ? void 0 : onCloseComponent(id);
  let height = DEFAULT_TOOLBAR_SIZE;
  if (containerStyle) {
    const ch = containerStyle.height;
    if (isNumeric(ch)) {
      height = ch;
    }
  }
  const providerImpl = {
    openFlyout: openFlyout2,
    closeFlyout: closeFlyout2,
    openComponent: openComponent2,
    closeComponent: closeComponent2
  };
  const { Icon: Icon2 } = useElementContext();
  const scrollContainerRef = reactExports.useRef(null);
  const [canScrollBefore, setCanScrollBefore] = reactExports.useState(false);
  const [canScrollAfter, setCanScrollAfter] = reactExports.useState(false);
  const updateScrollState = reactExports.useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    if (vertical === true) {
      setCanScrollBefore(el.scrollTop > 0);
      setCanScrollAfter(Math.ceil(el.scrollTop + el.clientHeight) < el.scrollHeight);
    } else {
      setCanScrollBefore(el.scrollLeft > 0);
      setCanScrollAfter(Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth);
    }
  }, [vertical]);
  reactExports.useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    updateScrollState();
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);
  reactExports.useLayoutEffect(() => {
    updateScrollState();
  }, [childItems, updateScrollState]);
  const onScrollBefore = reactExports.useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const amount = height * 3;
    if (vertical === true) {
      el.scrollBy({ top: -amount, behavior: "smooth" });
    } else {
      el.scrollBy({ left: -amount, behavior: "smooth" });
    }
  }, [height, vertical]);
  const onScrollAfter = reactExports.useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const amount = height * 3;
    if (vertical === true) {
      el.scrollBy({ top: amount, behavior: "smooth" });
    } else {
      el.scrollBy({ left: amount, behavior: "smooth" });
    }
  }, [height, vertical]);
  const outerStyle = __spreadProps(__spreadValues({}, containerStyle), {
    overflow: "hidden",
    display: "flex",
    flexDirection: vertical === true ? "column" : "row"
  });
  const scrollContainerStyle = vertical === true ? { flex: "1 1 0", minHeight: 0, overflowY: "scroll", overflowX: "hidden" } : { flex: "1 1 0", minWidth: 0, overflowX: "scroll", overflowY: "hidden", whiteSpace: "nowrap" };
  const scrollBtnStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    cursor: "pointer",
    width: vertical === true ? "100%" : height,
    height: vertical === true ? height : "100%"
  };
  const iconSize = height * SVG_SIZE_RATIO;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContext.Provider, { value: providerImpl, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: outerStyle, className: `has-flyout noselect ${containerClass}`, children: [
    canScrollBefore && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "noselect toolbar-scroll-btn",
        style: scrollBtnStyle,
        onClick: onScrollBefore,
        title: vertical === true ? "Scroll up" : "Scroll left",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { icon: vertical === true ? "chevron-up" : "chevron-left", iconSize })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollContainerRef, className: "toolbar-scroll-container", style: scrollContainerStyle, children: childItems.map((item, index2) => {
      if (isComponentFlyout(item)) {
        const isFlownOut = flyoutStates && !!flyoutStates[item.flyoutId];
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ComponentFlyoutItem, { size: height, item, vertical, isFlownOut }, index2);
      } else if (isMenuRef(item)) {
        const isFlownOut = flyoutStates && !!flyoutStates[item.flyoutId];
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FlyoutMenuReferenceItem, { size: height, menu: item, vertical, isFlownOut }, index2);
      } else if (item.isSeparator === true) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarSeparator, { size: height, vertical }, index2);
      } else {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { height, item, vertical, hideVerticalLabels }, index2);
      }
    }) }),
    canScrollAfter && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "noselect toolbar-scroll-btn",
        style: scrollBtnStyle,
        onClick: onScrollAfter,
        title: vertical === true ? "Scroll down" : "Scroll right",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { icon: vertical === true ? "chevron-down" : "chevron-right", iconSize })
      }
    )
  ] }) });
};
const MnMenuItems = ({ items, onInvoked }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: items.map((item, idx) => {
    if (item.isSeparator) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "mrl-menu-separator", role: "separator" }, idx);
    }
    if (isMenu(item)) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "mrl-submenu", role: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mrl-menu-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mrl-menu-item-icon-slot", "aria-hidden": "true", children: (item.icon || item.iconClass) && /* @__PURE__ */ jsxRuntimeExports.jsx(ImageIcon, { url: item.icon, spriteClass: item.iconClass }) }),
          getText(item.label)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mrl-menu", role: "menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MnMenuItems, { items: item.childItems, onInvoked }) })
      ] }, idx);
    }
    const enabled = getEnabled(item);
    const handleClick = () => {
      var _a;
      if (enabled) {
        (_a = item.invoke) == null ? void 0 : _a.call(item);
        onInvoked == null ? void 0 : onInvoked();
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: `mrl-menu-item${!enabled ? " mrl-menu-item--disabled" : ""}`,
        role: "menuitem",
        "aria-disabled": !enabled,
        onClick: handleClick,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mrl-menu-item-icon-slot", "aria-hidden": "true", children: (item.icon || item.iconClass) && /* @__PURE__ */ jsxRuntimeExports.jsx(ImageIcon, { url: item.icon, spriteClass: item.iconClass }) }),
          getText(item.label)
        ]
      },
      idx
    );
  }) });
};
const MnMenuComponent = ({ items, onInvoked }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mrl-menu", role: "menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MnMenuItems, { items, onInvoked }) });
};
const MnTabSet = ({ id, className, tabs, activeTabId, onTabChanged }) => {
  var _a;
  const [localActive, setLocalActive] = React.useState(
    activeTabId != null ? activeTabId : (_a = tabs[0]) == null ? void 0 : _a.id
  );
  const activeId = activeTabId != null ? activeTabId : localActive;
  const handleTabClick = (tabId) => {
    setLocalActive(tabId);
    onTabChanged == null ? void 0 : onTabChanged(tabId);
  };
  const cls = ["mrl-tab-set", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id, className: cls, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mrl-tab-list", role: "tablist", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        role: "tab",
        "aria-selected": tab.id === activeId,
        className: `mrl-tab${tab.id === activeId ? " mrl-tab--active" : ""}`,
        onClick: () => handleTabClick(tab.id),
        children: tab.title
      },
      `mrl-tab-${tab.id}`
    )) }),
    tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "tabpanel",
        className: "mrl-tab-panel",
        hidden: tab.id !== activeId,
        children: tab.content
      },
      `mrl-tab-panel-${tab.id}`
    ))
  ] });
};
const MnDrawer = ({ title, isOpen, position = "right", onClose, children }) => {
  if (typeof document === "undefined") {
    return null;
  }
  const posClass = `mrl-drawer--${position}`;
  const openClass = isOpen ? " mrl-drawer--open" : "";
  return ReactDOM.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mrl-drawer-backdrop", onClick: onClose }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mrl-drawer ${posClass}${openClass}`, role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mrl-drawer-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mrl-drawer-title", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mrl-drawer-close mrl-btn mrl-btn--minimal", onClick: onClose, "aria-label": "Close", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgIcon, { name: "cross", size: 14 }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mrl-drawer-body", children })
      ] })
    ] }),
    document.body
  );
};
function mapPosition$1(position) {
  switch (position) {
    case "left":
      return "left";
    case "right":
      return "right";
    case "top":
      return "top";
    case "bottom":
      return "bottom";
    default:
      return "right";
  }
}
const MnPopover = ({ position, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const childArray = React.Children.toArray(children);
  const trigger = childArray[0];
  const content = childArray[1];
  if (!trigger) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Popover.Popover,
    {
      isOpen,
      positions: [mapPosition$1(position)],
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: content }),
      containerClassName: "mrl-popover-container",
      onClickOutside: () => setIsOpen(false),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { onClick: () => setIsOpen((prev) => !prev), children: trigger })
    }
  );
};
function mapPosition(position) {
  switch (position) {
    case "top-left":
      return "top-left";
    case "top-right":
      return "top-right";
    case "bottom":
      return "bottom-center";
    case "bottom-left":
      return "bottom-left";
    case "bottom-right":
      return "bottom-right";
    case "top":
    default:
      return "top-center";
  }
}
const MnToaster = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    show(message) {
      const variant = message.variant;
      const classes = [
        "mrl-toast",
        variant ? `mrl-toast--${variant}` : null
      ].filter(Boolean).join(" ");
      return zt.custom(
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: classes, role: "status", "aria-live": "polite", children: [
          message.icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mrl-toast-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MnIcon, { icon: message.icon, iconSize: 16 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mrl-toast-message", children: message.message })
        ] })
      );
    },
    dismiss(key) {
      zt.dismiss(key);
    }
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Fe, { position: mapPosition(props.position) });
});
MnToaster.displayName = "MnToaster";
const MnDialog = ({ icon, isOpen, title, onClose, children }) => {
  if (typeof document === "undefined" || !isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mrl-dialog-backdrop", onClick: (e) => {
      if (e.target === e.currentTarget) {
        onClose == null ? void 0 : onClose();
      }
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mrl-dialog-shell", role: "dialog", "aria-modal": "true", children: [
      title && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mrl-dialog-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { children: [
          icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mrl-dialog-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MnIcon, { icon, iconSize: 18 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mrl-dialog-close mrl-btn mrl-btn--minimal", onClick: onClose, "aria-label": "Close", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgIcon, { name: "cross", size: 14 }) })
      ] }),
      children
    ] }) }),
    document.body
  );
};
const MnDialogContainer = ({ style, className, children }) => {
  const cls = ["mrl-dialog-container", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cls, style, children });
};
const MnDialogShell = ({ style, className, children }) => {
  const cls = ["mrl-dialog-shell", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cls, style, role: "dialog", "aria-modal": "true", children });
};
const MnDialogHeader = ({ className, children }) => {
  const cls = ["mrl-dialog-header", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cls, children });
};
const MnDialogBody = ({ style, className, children }) => {
  const cls = ["mrl-dialog-body", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cls, style, children });
};
const MnDialogFooter = ({ style, className, children }) => {
  const cls = ["mrl-dialog-footer", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cls, style, children });
};
const MnDialogFooterActions = ({ style, className, children }) => {
  const cls = ["mrl-dialog-footer-actions", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cls, style, children });
};
const MnHtmlTable = ({ condensed, bordered, className, style, children }) => {
  const cls = [
    "mrl-table",
    condensed ? "mrl-table--condensed" : null,
    bordered ? "mrl-table--bordered" : null,
    className != null ? className : null
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: cls, style, children });
};
const provider = {
  Text: MnText,
  Heading: MnHeading,
  Button: MnButton,
  Radio: MnRadio,
  Slider: MnSlider,
  Collapsible: MnCollapsible,
  Callout: MnCallout,
  Checkbox: MnCheckbox,
  Icon: MnIcon,
  Card: MnCard,
  NumericInput: MnNumericInput,
  InputGroup: MnInputGroup,
  NonIdealState: MnNonIdealState,
  Spinner: MnSpinner,
  Switch: MnSwitch,
  Select: MnSelect,
  FileInput: MnFileInput,
  FormGroup: MnFormGroup,
  EditableText: MnEditableText,
  MenuComponent: MnMenuComponent,
  TabSet: MnTabSet,
  Drawer: MnDrawer,
  Popover: MnPopover,
  Toaster: MnToaster,
  Dialog: MnDialog,
  DialogContainer: MnDialogContainer,
  DialogShell: MnDialogShell,
  DialogHeader: MnDialogHeader,
  DialogBody: MnDialogBody,
  DialogFooter: MnDialogFooter,
  DialogFooterActions: MnDialogFooterActions,
  HtmlTable: MnHtmlTable
};
const ElementContext = reactExports.createContext(provider);
const useElementContext = () => {
  const context = reactExports.useContext(ElementContext);
  return context;
};
const ElementProvider = ElementContext.Provider;
function TypedSelect(props) {
  const { id, name, value, onChange, items, fill, placeholder, keyFunc, style } = props;
  const { Select: Select2 } = useElementContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Select2,
    {
      id,
      name,
      value,
      onChange,
      items,
      fill,
      style,
      placeholder,
      keyFunc
    }
  );
}
const ElementGroup = ({ style, vertical, children }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style, className: `mrl-element-group ${vertical === true ? "mrl-element-group-vertical" : "mrl-element-group-horizontal"}`, children });
};
function normalizeStack(err) {
  let stack;
  if (err.stack instanceof Array) {
    stack = err.stack || [];
  } else if (typeof err.stack == "string") {
    stack = (err.stack || "").split("\n");
  } else {
    stack = [];
  }
  return stack;
}
const Error$1 = (props) => {
  const { Callout } = useElementContext();
  const err = props.error;
  if (isError(err) || isInitError(err)) {
    if (props.errorRenderer) {
      return props.errorRenderer(err);
    } else {
      const stack = normalizeStack(err);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Callout, { variant: "danger", icon: "error", title: err.message, children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "error-stack", children: stack.map((ln, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: ln }, `stack-line-${i}`)) }) });
    }
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Callout, { variant: "danger", icon: "error", title: err });
  }
};
var DefaultComponentNames = /* @__PURE__ */ ((DefaultComponentNames2) => {
  DefaultComponentNames2["Legend"] = "Legend";
  DefaultComponentNames2["SelectionPanel"] = "SelectionPanel";
  DefaultComponentNames2["Map"] = "Map";
  DefaultComponentNames2["Navigator"] = "Navigator";
  DefaultComponentNames2["MouseCoordinates"] = "MouseCoordinates";
  DefaultComponentNames2["ScaleDisplay"] = "ScaleDisplay";
  DefaultComponentNames2["SelectedFeatureCount"] = "SelectedFeatureCount";
  DefaultComponentNames2["PoweredByMapGuide"] = "PoweredByMapGuide";
  DefaultComponentNames2["TaskPane"] = "TaskPane";
  DefaultComponentNames2["About"] = "About";
  DefaultComponentNames2["SessionExpired"] = "SessionExpired";
  DefaultComponentNames2["Measure"] = "Measure";
  DefaultComponentNames2["ViewerOptions"] = "ViewerOptions";
  DefaultComponentNames2["QuickPlot"] = "QuickPlot";
  DefaultComponentNames2["BaseMapSwitcher"] = "BaseMapSwitcher";
  DefaultComponentNames2["MapMenu"] = "MapMenu";
  DefaultComponentNames2["ViewSize"] = "ViewSize";
  DefaultComponentNames2["CoordinateTracker"] = "CoordinateTracker";
  DefaultComponentNames2["AddManageLayers"] = "AddManageLayers";
  DefaultComponentNames2["ShareLinkToView"] = "ShareLinkToView";
  return DefaultComponentNames2;
})(DefaultComponentNames || {});
const components = {};
function registerComponentFactory(id, factory) {
  components[id] = factory;
}
function getComponentFactory(id) {
  return components[id];
}
const PlaceholderComponent = (props) => {
  const { id, componentProps, locale } = props;
  const factory = getComponentFactory(id);
  if (factory) {
    return factory(componentProps);
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Error$1, { error: tr("ERR_UNREGISTERED_COMPONENT", locale, { componentId: id }) });
  }
};
const SHIM_EPSILON = Math.pow(2, -52);
function epsilon() {
  const num = Number;
  return num.EPSILON || SHIM_EPSILON;
}
function restrictToRange(val, lower, upper) {
  return Math.min(Math.max(val, lower), upper);
}
function areNumbersEqual(a, b) {
  return Math.abs(a - b) < epsilon();
}
function scaleRangeBetween(scale, minScale, maxScale) {
  return scale >= minScale && scale < maxScale;
}
function getClosestScaleIndex(scales, scale) {
  const d1 = Math.abs(scales[0] - scale);
  const d2 = Math.abs(scales[1] - scale);
  if (d1 < d2)
    return 0;
  else
    return 1;
}
function getFiniteScaleIndexForScale(finiteScaleList, scale) {
  for (let i = 0; i < finiteScaleList.length; i++) {
    if (scale >= finiteScaleList[i]) {
      if (i + 1 < finiteScaleList.length) {
        if (scale <= finiteScaleList[i + 1]) {
          const test = [finiteScaleList[i], finiteScaleList[i + 1]];
          const testIndex = getClosestScaleIndex(test, scale);
          if (testIndex == 0) {
            return i;
          } else {
            return i + 1;
          }
        }
      } else {
        return i;
      }
    } else if (scale <= finiteScaleList[i]) {
      if (i > 0) {
        const test = [finiteScaleList[i - 1], finiteScaleList[i]];
        const testIndex = getClosestScaleIndex(test, scale);
        if (testIndex == 0) {
          return i - 1;
        } else {
          return i;
        }
      } else {
        return i;
      }
    }
  }
  return 0;
}
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
function roundTo(num, decimals = 2) {
  const a = Math.pow(10, decimals);
  return Math.round(num * a) / a;
}
class MgError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "MgError";
    this.message = message;
    this.stack = new Error().stack;
  }
}
function isSessionExpiredError(err) {
  return err.message.indexOf("MgSessionExpiredException") >= 0;
}
var RuntimeMapFeatureFlags = /* @__PURE__ */ ((RuntimeMapFeatureFlags2) => {
  RuntimeMapFeatureFlags2[RuntimeMapFeatureFlags2["LayersAndGroups"] = 1] = "LayersAndGroups";
  RuntimeMapFeatureFlags2[RuntimeMapFeatureFlags2["LayerIcons"] = 2] = "LayerIcons";
  RuntimeMapFeatureFlags2[RuntimeMapFeatureFlags2["LayerFeatureSources"] = 4] = "LayerFeatureSources";
  return RuntimeMapFeatureFlags2;
})(RuntimeMapFeatureFlags || {});
var QueryFeaturesSet = /* @__PURE__ */ ((QueryFeaturesSet2) => {
  QueryFeaturesSet2[QueryFeaturesSet2["Attributes"] = 1] = "Attributes";
  QueryFeaturesSet2[QueryFeaturesSet2["InlineSelection"] = 2] = "InlineSelection";
  QueryFeaturesSet2[QueryFeaturesSet2["Tooltip"] = 4] = "Tooltip";
  QueryFeaturesSet2[QueryFeaturesSet2["Hyperlink"] = 8] = "Hyperlink";
  return QueryFeaturesSet2;
})(QueryFeaturesSet || {});
class RequestBuilder {
  constructor(agentUri) {
    this.agentUri = agentUri;
  }
}
function getSiteVersion(map) {
  return parseSiteVersion(map.SiteVersion);
}
function parseSiteVersion(ver) {
  const [sMaj, sMin, sPatch, sRev] = ver.split(".");
  const vMaj = parseInt(sMaj, 10);
  const vMin = parseInt(sMin, 10);
  const vPatch = parseInt(sPatch, 10);
  const vRev = parseInt(sRev, 10);
  return [vMaj, vMin, vPatch, vRev];
}
function canUseQueryMapFeaturesV4(version) {
  const [vMaj, vMin, vPatch, vRev] = version;
  if (vMaj >= 4) {
    if (vMaj == 4 && vMin == 0 && vPatch == 0 && vRev == 0) {
      return true;
    }
    if (vMaj == 4 && vMin == 0 && vPatch == 0) {
      return vRev > 9592;
    }
    return true;
  }
  return false;
}
const deArrayifyModulePromise$1 = __vitePreload(() => import("./chunks/deArrayify-debug.js"), true ? __vite__mapDeps([0,1,2,3,4,5]) : void 0, import.meta.url);
const MG_MAPAGENT_ERROR_CODE = 559;
function isErrorResponse(response) {
  return !response.ok || response.status === MG_MAPAGENT_ERROR_CODE;
}
function serialize(data, uppercase = true) {
  return Object.keys(data).map((keyName) => {
    return encodeURIComponent(uppercase ? keyName.toUpperCase() : keyName) + "=" + encodeURIComponent(data[keyName]);
  }).join("&");
}
const _MapAgentRequestBuilder = class _MapAgentRequestBuilder extends RequestBuilder {
  constructor(agentUri, locale = DEFAULT_LOCALE) {
    super(agentUri);
    this.locale = locale;
  }
  getRawJson(url) {
    return __async(this, null, function* () {
      const response = yield fetch(url, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "GET"
      });
      if (isErrorResponse(response)) {
        throw new MgError(response.statusText);
      }
      return yield response.json();
    });
  }
  extractCleanResourceJson(json) {
    if (json == null ? void 0 : json.ApplicationDefinition) {
      return json.ApplicationDefinition;
    }
    if (json == null ? void 0 : json.WebLayout) {
      return json.WebLayout;
    }
    if (json == null ? void 0 : json.MapDefinition) {
      return json.MapDefinition;
    }
    if (json == null ? void 0 : json.TileSetDefinition) {
      return json.TileSetDefinition;
    }
    return json;
  }
  extractCleanRuntimeMapJson(json) {
    if (json == null ? void 0 : json.RuntimeMap) {
      return json.RuntimeMap;
    }
    if (json == null ? void 0 : json.Map) {
      return json.Map;
    }
    return json;
  }
  canUseCleanResourceContent() {
    return __async(this, null, function* () {
      const sv = yield this.getSiteVersion();
      const [major] = parseSiteVersion(sv.Version);
      return major >= 4;
    });
  }
  get(url) {
    return __async(this, null, function* () {
      const response = yield fetch(url, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "GET"
      });
      if (isErrorResponse(response)) {
        throw new MgError(response.statusText);
      } else {
        const json = yield response.json();
        const { deArrayify } = yield deArrayifyModulePromise$1;
        return deArrayify(json);
      }
    });
  }
  post(url, data) {
    return __async(this, null, function* () {
      if (!data.format) {
        data.format = "application/json";
      }
      const response = yield fetch(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        method: "POST",
        body: serialize(data)
        //form
      });
      if (isErrorResponse(response)) {
        throw new MgError(response.statusText);
      } else {
        const json = yield response.json();
        const { deArrayify } = yield deArrayifyModulePromise$1;
        return deArrayify(json);
      }
    });
  }
  stringifyGetUrl(options) {
    if (!options.version) {
      options.version = "1.0.0";
    }
    if (!options.locale) {
      options.locale = this.locale;
    }
    if (!options.format) {
      options.format = "application/json";
    }
    let url = this.agentUri;
    let bFirst = true;
    for (const key in options) {
      if (bFirst) {
        url += `?${key.toUpperCase()}=${options[key]}`;
        bFirst = false;
      } else {
        url += `&${key.toUpperCase()}=${options[key]}`;
      }
    }
    return url;
  }
  createSession(username, password) {
    return __async(this, null, function* () {
      const url = this.agentUri;
      const data = { operation: "CREATESESSION", version: "1.0.0", USERNAME: username, PASSWORD: password };
      const response = yield fetch(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        method: "POST",
        body: serialize(data)
        //form
      });
      if (isErrorResponse(response)) {
        throw new MgError(response.statusText);
      } else {
        return yield response.text();
      }
    });
  }
  getServerSessionTimeout(session) {
    return __async(this, null, function* () {
      const url = this.agentUri;
      const data = { operation: "GETSESSIONTIMEOUT", version: "1.0.0", SESSION: session };
      const response = yield fetch(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        method: "POST",
        body: serialize(data)
        //form
      });
      if (isErrorResponse(response)) {
        throw new MgError(response.statusText);
      } else {
        const val = yield response.text();
        return parseInt(val, 10);
      }
    });
  }
  getResource(resourceId, args) {
    return __async(this, null, function* () {
      if (args != null) {
        const isAppDef2 = typeof resourceId === "string" && /applicationdefinition$/i.test(resourceId.trim());
        if (isAppDef2 && (yield this.canUseCleanResourceContent())) {
          const p12 = { operation: "GETRESOURCECONTENT", resourceId, version: "4.0.0", clean: 1 };
          const url2 = this.stringifyGetUrl(__spreadValues(__spreadValues({}, args), p12));
          const json = yield this.getRawJson(url2);
          return this.extractCleanResourceJson(json);
        }
        const p1 = { operation: "GETRESOURCECONTENT", resourceId };
        const url = this.stringifyGetUrl(__spreadValues(__spreadValues({}, args), p1));
        return yield this.get(url);
      } else {
        const url = this.stringifyGetUrl({ operation: "GETRESOURCE", resourceId });
        return yield this.get(url);
      }
    });
  }
  getSiteVersion() {
    const cached = _MapAgentRequestBuilder.siteVersionCache.get(this.agentUri);
    if (cached) {
      return cached;
    }
    const p1 = { operation: "GETSITEVERSION", version: "1.0.0", username: "Anonymous" };
    const url = this.stringifyGetUrl(__spreadValues({}, p1));
    const pending = this.get(url).catch((error2) => {
      _MapAgentRequestBuilder.siteVersionCache.delete(this.agentUri);
      throw error2;
    });
    _MapAgentRequestBuilder.siteVersionCache.set(this.agentUri, pending);
    return pending;
  }
  createRuntimeMap(options) {
    const p1 = { operation: "CREATERUNTIMEMAP", version: "3.0.0" };
    const url = this.stringifyGetUrl(__spreadValues(__spreadValues({}, options), p1));
    return this.get(url);
  }
  createRuntimeMap_v4(options) {
    return __async(this, null, function* () {
      const p1 = { operation: "CREATERUNTIMEMAP", version: "4.0.0", clean: 1 };
      const url = this.stringifyGetUrl(__spreadValues(__spreadValues({}, options), p1));
      const json = yield this.getRawJson(url);
      return this.extractCleanRuntimeMapJson(json);
    });
  }
  queryMapFeatures(options) {
    const p1 = { operation: "QUERYMAPFEATURES", version: "2.6.0" };
    return this.post(this.agentUri, __spreadValues(__spreadValues({}, options), p1));
  }
  queryMapFeatures_v4(options) {
    const p1 = { operation: "QUERYMAPFEATURES", version: "4.0.0" };
    return this.post(this.agentUri, __spreadValues(__spreadValues({}, options), p1));
  }
  describeRuntimeMap(options) {
    const p1 = { operation: "DESCRIBERUNTIMEMAP", version: "3.0.0" };
    const url = this.stringifyGetUrl(__spreadValues(__spreadValues({}, options), p1));
    return this.get(url);
  }
  describeRuntimeMap_v4(options) {
    return __async(this, null, function* () {
      const p1 = { operation: "DESCRIBERUNTIMEMAP", version: "4.0.0", clean: 1 };
      const url = this.stringifyGetUrl(__spreadValues(__spreadValues({}, options), p1));
      const json = yield this.getRawJson(url);
      return this.extractCleanRuntimeMapJson(json);
    });
  }
  getTileTemplateUrl(resourceId, groupName, xPlaceholder, yPlaceholder, zPlaceholder, isXYZ) {
    if (isXYZ)
      return `${this.agentUri}?OPERATION=GETTILEIMAGE&VERSION=1.2.0&USERNAME=Anonymous&MAPDEFINITION=${resourceId}&BASEMAPLAYERGROUPNAME=${groupName}&TILECOL=${yPlaceholder}&TILEROW=${xPlaceholder}&SCALEINDEX=${zPlaceholder}`;
    else
      return `${this.agentUri}?OPERATION=GETTILEIMAGE&VERSION=1.2.0&USERNAME=Anonymous&MAPDEFINITION=${resourceId}&BASEMAPLAYERGROUPNAME=${groupName}&TILECOL=${xPlaceholder}&TILEROW=${yPlaceholder}&SCALEINDEX=${zPlaceholder}`;
  }
};
_MapAgentRequestBuilder.siteVersionCache = /* @__PURE__ */ new Map();
let MapAgentRequestBuilder = _MapAgentRequestBuilder;
const _builders = {};
function registerRequestBuilder(kind, factory) {
  _builders[kind] = factory;
}
function createRequestBuilder(agentUri, kind) {
  if (_builders[kind]) {
    return _builders[kind](agentUri);
  }
  throw new MgError(`Unknown or unsupported client kind: ${kind}`);
}
class Client {
  constructor(agentUri, kind) {
    this.builder = createRequestBuilder(agentUri, kind);
  }
  getText(url) {
    return __async(this, null, function* () {
      const r = yield fetch(url);
      if (!r.ok)
        throw new MgError(r.statusText);
      const text = yield r.text();
      return text;
    });
  }
  /**
   * Performs a generic GET request at the specified URL
   *
   * @template T The type of the object you are expecting to receive
   * @param {string} url The url to make the request to
   * @returns {Promise<T>} A promise for the value of the requested type
   *
   *
   */
  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "GET"
      }).then((response) => {
        if (isErrorResponse(response)) {
          throw new MgError(response.statusText);
        } else {
          resolve(response.json());
        }
      }).catch(reject);
    });
  }
  /**
   * Performs a generic POST request at the specified URL
   *
   * @template T The type of the object you are expecting to receive
   * @param {string} url The url to make the request to
   * @param {*} data The POST form data
   * @returns {Promise<T>} A promise for the value of the requested type
   *
   *
   */
  post(url, data) {
    if (!data.format) {
      data.format = "application/json";
    }
    return new Promise((resolve, reject) => {
      fetch(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        method: "POST",
        body: serialize(data)
        //form
      }).then((response) => {
        if (isErrorResponse(response)) {
          throw new MgError(response.statusText);
        } else {
          resolve(response.json());
        }
      }).catch(reject);
    });
  }
  /**
   * Creates a new MapGuide session
   *
   * @param {string} username
   * @param {string} password
   * @returns {Promise<string>}
   *
   *
   */
  createSession(username, password) {
    return this.builder.createSession(username, password);
  }
  /**
   * Gets the server session timeout for the given session id
   *
   * @param {string} session
   * @returns {Promise<number>}
   *
   *
   */
  getServerSessionTimeout(session) {
    return this.builder.getServerSessionTimeout(session);
  }
  /**
   * gets the MapGuide Server version
   * 
   * @since 0.14
   */
  getSiteVersion() {
    return this.builder.getSiteVersion();
  }
  /**
   * Retrieves the requested resource
   *
   * @template T
   * @param {ResourceIdentifier} resourceId
   * @param {*} [args]
   * @returns {Promise<T>}
   *
   *
   */
  getResource(resourceId, args) {
    return this.builder.getResource(resourceId, args);
  }
  /**
   * Creates a runtime map from the specified map definition. Issues a v3.0.0 request
   *
   * @param {ICreateRuntimeMapOptions} options
   * @returns {Promise<RuntimeMap>}
   *
   *
   */
  createRuntimeMap(options) {
    return this.builder.createRuntimeMap(options);
  }
  /**
   * Creates a runtime map from the specified map definition. Issues a v4.0.0 request
   *
   * @param {ICreateRuntimeMapOptions} options
   * @returns {Promise<RuntimeMap>}
   *
   *
   * @since 0.14.8
   */
  createRuntimeMap_v4(options) {
    return this.builder.createRuntimeMap_v4(options);
  }
  /**
   * Describes a runtime map. Issues a v3.0.0 request
   *
   * @param {IDescribeRuntimeMapOptions} options
   * @returns {Promise<RuntimeMap>}
   *
   *
   */
  describeRuntimeMap(options) {
    return this.builder.describeRuntimeMap(options);
  }
  /**
   * Describes a runtime map. Issues a v4.0.0 request
   *
   * @param {IDescribeRuntimeMapOptions} options
   * @returns {Promise<RuntimeMap>}
   *
   *
   * @since 0.14.8
   */
  describeRuntimeMap_v4(options) {
    return this.builder.describeRuntimeMap_v4(options);
  }
  /**
   * Performs a map selection query on the current map
   *
   * @param {IQueryMapFeaturesOptions} options
   * @returns {Promise<QueryMapFeaturesResponse>}
   *
   *
   */
  queryMapFeatures(options) {
    return this.builder.queryMapFeatures(options);
  }
  /**
   * Performs a map selection query on the current map. Only applicable for use in MapGuide Open Source
   * 4.0 and higher
   *
   * @param {IQueryMapFeaturesOptions} options
   * @returns {Promise<QueryMapFeaturesResponse>}
   *
   *
   */
  queryMapFeatures_v4(options) {
    return this.builder.queryMapFeatures_v4(options);
  }
  /**
   * Gets the tile template URL used by the viewer to send tile requests
   *
   * @param {string} resourceId
   * @param {string} groupName
   * @param {string} xPlaceholder
   * @param {string} yPlaceholder
   * @param {string} zPlaceholder
   * @returns {string}
   *
   *
   * @since 0.14.8 added isXYZ parameter
   */
  getTileTemplateUrl(resourceId, groupName, xPlaceholder, yPlaceholder, zPlaceholder, isXYZ) {
    return this.builder.getTileTemplateUrl(resourceId, groupName, xPlaceholder, yPlaceholder, zPlaceholder, isXYZ);
  }
}
function buildSelectionXml(selection, layerIds) {
  let idCount = 0;
  let xml = '<?xml version="1.0" encoding="utf-8"?>';
  xml += '<FeatureSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="FeatureSet-1.0.0.xsd">';
  if (selection) {
    const selLayers = selection.Layer;
    for (const layer of selLayers) {
      const layerId = layer["@id"];
      if (layerIds != null && layerIds.indexOf(layerId) < 0) {
        continue;
      }
      const cls = layer.Class;
      if (cls.ID.length === 0) {
        continue;
      }
      xml += `<Layer id="${layerId}">`;
      xml += `<Class id="${cls["@id"]}">`;
      for (const id of cls.ID) {
        xml += `<ID>${id}</ID>`;
        idCount++;
      }
      xml += "</Class>";
      xml += "</Layer>";
    }
  }
  xml += "</FeatureSet>";
  return idCount > 0 ? xml : "";
}
function getActiveSelectedFeatureXml(selection, feat) {
  for (const layer of selection.Layer) {
    const layerId = layer["@id"];
    if (layerId == feat.layerId) {
      const key = feat.selectionKey;
      let xml = '<?xml version="1.0" encoding="utf-8"?>';
      xml += '<FeatureSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="FeatureSet-1.0.0.xsd">';
      xml += `<Layer id="${layerId}">`;
      xml += `<Class id="${layer.Class["@id"]}">`;
      xml += `<ID>${key}</ID>`;
      xml += "</Class>";
      xml += "</Layer>";
      xml += "</FeatureSet>";
      return xml;
    }
  }
}
function clearSessionStore() {
  return __async(this, null, function* () {
    try {
      for (const key in window.localStorage) {
        if (strStartsWith(key, "selection_")) {
          window.localStorage.removeItem(key);
        }
      }
    } catch (e) {
    }
  });
}
function encodeKey(sessionId, mapName) {
  return `selection_${sessionId}_${mapName}`;
}
function persistSelectionSetToLocalStorage(sessionId, mapName, resp) {
  return __async(this, null, function* () {
    const key = encodeKey(sessionId, mapName);
    const value = JSON.stringify(resp);
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
    }
  });
}
function retrieveSelectionSetFromLocalStorage(sessionId, mapName) {
  return __async(this, null, function* () {
    const key = encodeKey(yield sessionId.getValueAsync(), mapName);
    const content = window.localStorage.getItem(key);
    if (content) {
      return JSON.parse(content);
    }
  });
}
function makeUnique(items) {
  const a = [];
  for (let i = 0, l = items.length; i < l; i++) {
    if (a.indexOf(items[i]) === -1 && items[i] !== "")
      a.push(items[i]);
  }
  return a;
}
function areArraysDifferent(arr, other, equalityFn) {
  if (arr && other) {
    if (arr.length != other.length) {
      return true;
    } else {
      for (let i = 0; i < arr.length; i++) {
        if (equalityFn) {
          if (!equalityFn(arr[i], other[i])) {
            return true;
          }
        } else if (arr[i] !== other[i]) {
          return true;
        }
      }
      return false;
    }
  } else {
    return true;
  }
}
function areViewsCloseToEqual(view, otherView) {
  if (view && otherView) {
    const basePartsEqual = areNumbersEqual(view.x, otherView.x) && areNumbersEqual(view.y, otherView.y) && areNumbersEqual(view.scale, otherView.scale);
    if (view.resolution != null && otherView.resolution != null) {
      return basePartsEqual && areNumbersEqual(view.resolution, otherView.resolution);
    } else {
      if (view.resolution == null && otherView.resolution != null || view.resolution != null && otherView.resolution == null) {
        return false;
      } else {
        return basePartsEqual;
      }
    }
  } else {
    return false;
  }
}
function layerTransparencyChanged(set, other) {
  if (!set && other || set && !other) {
    return true;
  }
  const s = set != null ? set : {};
  const o = other != null ? other : {};
  const setLayers = Object.keys(s);
  const otherLayers = Object.keys(o);
  if (areArraysDifferent(setLayers, otherLayers))
    return true;
  for (const name of setLayers) {
    if (s[name] != o[name]) {
      return true;
    }
  }
  return false;
}
function resolveProjectionFromEpsgCodeAsync(epsg, locale, mapDef) {
  return __async(this, null, function* () {
    const r = yield fetch(`https://spatialreference.org/ref/epsg/${epsg}/proj4.txt`);
    if (r.ok) {
      const defn = yield r.text();
      proj4.defs(`EPSG:${epsg}`, defn);
      debug(`Registered projection EPSG:${epsg} from spatialreference.org`);
      return proj4.defs[`EPSG:${epsg}`];
    } else {
      throw new MgError(tr("INIT_ERROR_UNREGISTERED_EPSG_CODE", locale, { epsg, mapDefinition: mapDef }));
    }
  });
}
function ensureProjection(epsgCode, locale, alias, factoryIfNotFound) {
  return __async(this, null, function* () {
    let resolvedName;
    let bAdded = false;
    const name = `EPSG:${epsgCode}`;
    if (proj4.defs[name]) {
      resolvedName = name;
    } else {
      {
        yield resolveProjectionFromEpsgCodeAsync(epsgCode, locale, "");
        resolvedName = name;
      }
    }
    if (!strIsNullOrEmpty(alias) && !proj4.defs[alias]) {
      proj4.defs[alias] = proj4.defs[resolvedName];
      bAdded = true;
    }
    if (bAdded) {
      register(proj4);
    }
    return [epsgCode, resolvedName];
  });
}
class AsyncLazy {
  constructor(value) {
    this.value = value;
  }
  getValueAsync() {
    if (!this._value) {
      this._value = this.value();
    }
    return this._value;
  }
}
const mUnits = [
  { name: "Unknown", localizedName: (locale) => tr("UNIT_UNKNOWN", locale), abbreviation: (locale) => tr("UNIT_ABBR_UNKNOWN", locale), unitsPerMeter: 1, metersPerUnit: 1 },
  { name: "Inches", localizedName: (locale) => tr("UNIT_INCHES", locale), abbreviation: (locale) => tr("UNIT_ABBR_INCHES", locale), unitsPerMeter: 39.370079, metersPerUnit: 0.0254 },
  { name: "Feet", localizedName: (locale) => tr("UNIT_FEET", locale), abbreviation: (locale) => tr("UNIT_ABBR_FEET", locale), unitsPerMeter: 3.2808, metersPerUnit: 0.3048 },
  { name: "Yards", localizedName: (locale) => tr("UNIT_YARDS", locale), abbreviation: (locale) => tr("UNIT_ABBR_YARDS", locale), unitsPerMeter: 1.0936133, metersPerUnit: 0.9144 },
  { name: "Miles", localizedName: (locale) => tr("UNIT_MILES", locale), abbreviation: (locale) => tr("UNIT_ABBR_MILES", locale), unitsPerMeter: 62137e-8, metersPerUnit: 1609.344 },
  { name: "Nautical Miles", localizedName: (locale) => tr("UNIT_NAUT_MILES", locale), abbreviation: (locale) => tr("UNIT_ABBR_NAUT_MILES", locale), unitsPerMeter: 539956803e-12, metersPerUnit: 1852 },
  { name: "Millimeters", localizedName: (locale) => tr("UNIT_MILLIMETERS", locale), abbreviation: (locale) => tr("UNIT_ABBR_MILLIMETERS", locale), unitsPerMeter: 1e3, metersPerUnit: 1e-3 },
  { name: "Centimeters", localizedName: (locale) => tr("UNIT_CENTIMETERS", locale), abbreviation: (locale) => tr("UNIT_ABBR_CENTIMETERS", locale), unitsPerMeter: 100, metersPerUnit: 0.01 },
  { name: "Meters", localizedName: (locale) => tr("UNIT_METERS", locale), abbreviation: (locale) => tr("UNIT_ABBR_METERS", locale), unitsPerMeter: 1, metersPerUnit: 1 },
  { name: "Kilometers", localizedName: (locale) => tr("UNIT_KILOMETERS", locale), abbreviation: (locale) => tr("UNIT_ABBR_KILOMETERS", locale), unitsPerMeter: 1e-3, metersPerUnit: 1e3 },
  { name: "Degrees", localizedName: (locale) => tr("UNIT_DEGREES", locale), abbreviation: (locale) => tr("UNIT_ABBR_DEGREES", locale), unitsPerMeter: 9044e-9, metersPerUnit: 111061.75033 },
  { name: "Decimal Degrees", localizedName: (locale) => tr("UNIT_DEC_DEGREES", locale), abbreviation: (locale) => tr("UNIT_ABBR_DEC_DEGREES", locale), unitsPerMeter: 9044e-9, metersPerUnit: 111061.75033 },
  { name: "Degrees Minutes Seconds", localizedName: (locale) => tr("UNIT_DMS", locale), abbreviation: (locale) => tr("UNIT_ABBR_DMS", locale), unitsPerMeter: 9044e-9, metersPerUnit: 111061.75033 },
  { name: "Pixels", localizedName: (locale) => tr("UNIT_PIXELS", locale), abbreviation: (locale) => tr("UNIT_ABBR_PIXELS", locale), unitsPerMeter: 1, metersPerUnit: 1 }
];
function getUnitsOfMeasure() {
  return [
    UnitOfMeasure.Centimeters,
    UnitOfMeasure.DecimalDegrees,
    UnitOfMeasure.Degrees,
    UnitOfMeasure.DMS,
    UnitOfMeasure.Feet,
    UnitOfMeasure.Inches,
    UnitOfMeasure.Kilometers,
    UnitOfMeasure.Meters,
    UnitOfMeasure.Miles,
    UnitOfMeasure.Millimeters,
    UnitOfMeasure.NauticalMiles,
    UnitOfMeasure.Pixels,
    UnitOfMeasure.Unknown,
    UnitOfMeasure.Yards
  ];
}
function getUnitOfMeasure(unit) {
  const u = mUnits[unit];
  return u || mUnits[0];
}
function getMapSize(displaySize, metersPerUnit, units, resolution, precision) {
  const [width, height] = displaySize;
  let gw = width;
  let gh = height;
  const uom = getUnitOfMeasure(units);
  if (resolution && units != UnitOfMeasure.Pixels) {
    gw = resolution * width;
    gh = resolution * height;
    if (units != UnitOfMeasure.Unknown) {
      gw = uom.unitsPerMeter * gw * metersPerUnit;
      gh = uom.unitsPerMeter * gh * metersPerUnit;
    }
    let prec = precision || 2;
    if (prec >= 0) {
      const factor = Math.pow(10, prec);
      gw = Math.round(gw * factor) / factor;
      gh = Math.round(gh * factor) / factor;
    }
  }
  return [gw, gh];
}
function tryParseArbitraryCs(csCode) {
  if (!strIsNullOrEmpty(csCode) && strStartsWith(csCode, "XY-")) {
    const suffix = csCode.substring(3);
    switch (suffix) {
      case "M":
        return { code: csCode, units: UnitOfMeasure.Meters };
      case "FT":
        return { code: csCode, units: UnitOfMeasure.Feet };
      case "IN":
        return { code: csCode, units: UnitOfMeasure.Inches };
      case "CM":
        return { code: csCode, units: UnitOfMeasure.Centimeters };
      case "KM":
        return { code: csCode, units: UnitOfMeasure.Kilometers };
      case "YD":
        return { code: csCode, units: UnitOfMeasure.Yards };
      case "MM":
        return { code: csCode, units: UnitOfMeasure.Millimeters };
      case "MI":
        return { code: csCode, units: UnitOfMeasure.Miles };
      case "NM":
        return { code: csCode, units: UnitOfMeasure.NauticalMiles };
      case "PX":
        return { code: csCode, units: UnitOfMeasure.Pixels };
    }
  }
  return void 0;
}
function combineSelectedFeatures(oldRes, newRes) {
  return xorby(oldRes, newRes, (f) => f.SelectionKey);
}
function combineSelectedFeatureSets(oldRes, newRes) {
  if (oldRes == null) {
    return newRes;
  }
  const merged = {
    SelectedLayer: []
  };
  for (const layer of oldRes.SelectedLayer) {
    merged.SelectedLayer.push(layer);
  }
  if (newRes) {
    for (const layer of newRes.SelectedLayer) {
      const layerId = layer["@id"];
      const layerName = layer["@name"];
      const existing = merged.SelectedLayer.filter((l) => l["@id"] == layerId && l["@name"] == layerName);
      if (existing.length == 0) {
        merged.SelectedLayer.push(layer);
      } else {
        existing[0].Feature = combineSelectedFeatures(existing[0].Feature, layer.Feature);
      }
    }
  }
  return merged;
}
function combineFeatureSets(oldRes, newRes) {
  if (oldRes == null) {
    return newRes;
  }
  const merged = {
    Layer: []
  };
  for (const layer of oldRes.Layer) {
    merged.Layer.push(layer);
  }
  if (newRes) {
    for (const layer of newRes.Layer) {
      const layerId = layer["@id"];
      const existing = merged.Layer.filter((l) => l["@id"] == layerId);
      if (existing.length == 0) {
        merged.Layer.push(layer);
      } else {
        existing[0].Class.ID = xor(existing[0].Class.ID, layer.Class.ID);
      }
    }
  }
  return merged;
}
function combineSelections(oldRes, newRes) {
  if (oldRes) {
    const merged = {
      SelectedFeatures: combineSelectedFeatureSets(oldRes.SelectedFeatures, newRes.SelectedFeatures),
      FeatureSet: combineFeatureSets(oldRes.FeatureSet, newRes.FeatureSet),
      Hyperlink: void 0,
      InlineSelectionImage: void 0
    };
    return merged;
  } else {
    return newRes;
  }
}
function queryMapFeaturesHelper(map, client, opts, selectionSet, dispatch) {
  return __async(this, null, function* () {
    const mapName = map.Name;
    const sv = getSiteVersion(map);
    const isV4 = canUseQueryMapFeaturesV4(sv);
    const queryOp = isV4 ? (opts2) => client.queryMapFeatures_v4(opts2) : (opts2) => client.queryMapFeatures(opts2);
    const isAppendingWithAttributesOnOldMapGuide = !isV4 && opts.append === true && opts.options.persist === 1 && opts.options.requestdata !== void 0 && opts.options.requestdata & QueryFeaturesSet.Attributes;
    if (isAppendingWithAttributesOnOldMapGuide) {
      debug("Not asking for attributes in first QUERYMAPFEATURES");
      opts.options.requestdata &= ~QueryFeaturesSet.Attributes;
    }
    const res = yield queryOp(opts.options);
    if (opts.options.persist === 1) {
      if (opts.append === true) {
        let combined = combineSelections(selectionSet, res);
        const mergedXml = buildSelectionXml(combined.FeatureSet);
        const opts2 = {
          session: map.SessionId,
          mapname: map.Name,
          persist: 1,
          featurefilter: mergedXml
        };
        if (isAppendingWithAttributesOnOldMapGuide) {
          debug("Now asking for attributes in second QUERYMAPFEATURES");
          opts2.requestdata = QueryFeaturesSet.Attributes;
        }
        const res2 = yield queryOp(opts2);
        if (isAppendingWithAttributesOnOldMapGuide) {
          debug("Accepting second QUERYMAPFEATURES as new combined selection response");
          combined = res2;
        }
        persistSelectionSetToLocalStorage(map.SessionId, mapName, combined);
        dispatch(setSelection(mapName, combined));
        return combined;
      } else {
        persistSelectionSetToLocalStorage(map.SessionId, mapName, res);
        dispatch(setSelection(mapName, res));
        return res;
      }
    } else {
      return res;
    }
  });
}
function queryMapFeatures(mapName, opts) {
  return (dispatch, getState) => {
    const state = getState();
    const args = state.config;
    const map = getRuntimeMap(state);
    const selectionSet = getSelectionSet(state);
    if (map && args.agentKind && args.agentUri) {
      const client = new Client(args.agentUri, args.agentKind);
      const success = (res) => {
        if (opts.callback != null) {
          opts.callback(res);
        }
      };
      const failure = (err) => {
        if (opts.errBack != null) {
          opts.errBack(err);
        }
      };
      queryMapFeaturesHelper(map, client, opts, selectionSet, dispatch).then((r) => success(r)).catch((e) => failure(e));
    }
  };
}
function setCurrentView(view) {
  return (dispatch, getState) => {
    var _a, _b;
    const state = getState();
    const currentView = getCurrentView(state);
    const newView = __spreadValues({}, view);
    const mapName = state.config.activeMapName;
    let dispatchThis = true;
    if (currentView && mapName) {
      const mapState = state.mapState[mapName];
      const fs = (_b = (_a = mapState == null ? void 0 : mapState.mapguide) == null ? void 0 : _a.runtimeMap) == null ? void 0 : _b.FiniteDisplayScale;
      if (fs && fs.length > 0) {
        const fi = getFiniteScaleIndexForScale(fs, newView.scale);
        newView.scale = fs[fi];
      }
      if (areViewsCloseToEqual(currentView, newView)) {
        dispatchThis = false;
      }
    }
    if (dispatchThis && mapName) {
      dispatch({
        type: ActionType.MAP_SET_VIEW,
        payload: {
          mapName,
          view: newView
        }
      });
    }
  };
}
function mapResized(width, height) {
  return {
    type: ActionType.MAP_RESIZED,
    payload: {
      width,
      height
    }
  };
}
function setSelection(mapName, selectionSet) {
  return {
    type: ActionType.MAP_SET_SELECTION,
    payload: {
      mapName,
      selection: selectionSet
    }
  };
}
function invokeCommand(cmd, viewer, parameters) {
  return (dispatch, getState) => {
    return cmd.invoke(dispatch, getState, viewer, parameters);
  };
}
function setBusyCount(busyCount) {
  return {
    type: ActionType.MAP_SET_BUSY_COUNT,
    payload: busyCount
  };
}
function setBaseLayer(mapName, layerName) {
  return {
    type: ActionType.MAP_SET_BASE_LAYER,
    payload: {
      mapName,
      layerName
    }
  };
}
function setScale(viewer, mapName, scale) {
  let resolution;
  if (viewer.isReady()) {
    resolution = viewer.scaleToResolution(scale);
  }
  return {
    type: ActionType.MAP_SET_SCALE,
    payload: {
      mapName,
      scale,
      resolution
    }
  };
}
function setMouseCoordinates(mapName, coord) {
  return {
    type: ActionType.UPDATE_MOUSE_COORDINATES,
    payload: {
      mapName,
      coord
    }
  };
}
function setLayerTransparency(mapName, layerName, opacity) {
  return {
    type: ActionType.MAP_SET_LAYER_TRANSPARENCY,
    payload: {
      mapName,
      layerName,
      opacity
    }
  };
}
function setViewSizeUnits(unit) {
  return {
    type: ActionType.MAP_SET_VIEW_SIZE_UNITS,
    payload: unit
  };
}
function previousView(mapName) {
  return {
    type: ActionType.MAP_PREVIOUS_VIEW,
    payload: {
      mapName
    }
  };
}
function nextView(mapName) {
  return {
    type: ActionType.MAP_NEXT_VIEW,
    payload: {
      mapName
    }
  };
}
function setActiveTool(tool) {
  return {
    type: ActionType.MAP_SET_ACTIVE_TOOL,
    payload: tool
  };
}
function setActiveMap(mapName) {
  return {
    type: ActionType.MAP_SET_ACTIVE_MAP,
    payload: mapName
  };
}
function activateMap(mapName) {
  return (dispatch, getState) => __async(this, null, function* () {
    var _a, _b, _c, _d, _e, _f;
    const state = getState();
    const pendingMap = (_a = state.config.pendingMaps) == null ? void 0 : _a[mapName];
    if (pendingMap) {
      const { agentUri, agentKind, locale } = state.config;
      if (agentUri && agentKind) {
        const activeMapName = state.config.activeMapName;
        let sessionId = "";
        if (activeMapName) {
          sessionId = (_e = (_d = (_c = (_b = state.mapState[activeMapName]) == null ? void 0 : _b.mapguide) == null ? void 0 : _c.runtimeMap) == null ? void 0 : _d.SessionId) != null ? _e : "";
        }
        if (sessionId) {
          try {
            const client = new Client(agentUri, agentKind);
            const siteVersion = new AsyncLazy(() => __async(this, null, function* () {
              return client.getSiteVersion();
            }));
            const sv = yield siteVersion.getValueAsync();
            const useV4 = canUseQueryMapFeaturesV4(parseSiteVersion(sv.Version));
            const shouldTryDescribeExisting = state.config.sessionWasReused === true;
            let map;
            if (shouldTryDescribeExisting) {
              try {
                info(`Attempting to describe existing runtime map state (${mapName})`);
                if (useV4) {
                  map = yield client.describeRuntimeMap_v4({
                    mapname: mapName,
                    requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
                    session: sessionId
                  });
                } else {
                  map = yield client.describeRuntimeMap({
                    mapname: mapName,
                    requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
                    session: sessionId
                  });
                }
              } catch (describeErr) {
                if ((describeErr == null ? void 0 : describeErr.message) === "MgResourceNotFoundException") {
                } else {
                  throw describeErr;
                }
              }
            }
            if (!map) {
              info(`Lazily creating runtime map state (${mapName}) for: ${pendingMap.mapDef}`);
              if (useV4) {
                map = yield client.createRuntimeMap_v4({
                  mapDefinition: pendingMap.mapDef,
                  requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
                  session: sessionId,
                  targetMapName: mapName
                });
              } else {
                map = yield client.createRuntimeMap({
                  mapDefinition: pendingMap.mapDef,
                  requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
                  session: sessionId,
                  targetMapName: mapName
                });
              }
            }
            if (map) {
              const epsg = map.CoordinateSystem.EpsgCode;
              const arbCs = tryParseArbitraryCs(map.CoordinateSystem.MentorCode);
              if (!arbCs && epsg && epsg !== "0" && !proj4.defs[`EPSG:${epsg}`]) {
                yield resolveProjectionFromEpsgCodeAsync(epsg, locale, map.MapDefinition);
                register(proj4);
              }
              dispatch({
                type: ActionType.MAP_REFRESH,
                payload: { mapName, map }
              });
            }
          } catch (e) {
            warn(`Failed to lazily initialize runtime map (${mapName}): ${(_f = e == null ? void 0 : e.message) != null ? _f : e}. Proceeding with map switch; the map may not render correctly.`);
          }
        } else {
          warn(`Cannot lazily create runtime map (${mapName}): no active session found. Proceeding with map switch; the map may not render correctly.`);
        }
      }
    }
    dispatch(setActiveMap(mapName));
  });
}
function setFeatureTooltipsEnabled(enabled) {
  return {
    type: ActionType.MAP_SET_MAPTIP,
    payload: enabled
  };
}
function enableSelectDragPan(enabled) {
  return {
    type: ActionType.MAP_ENABLE_SELECT_DRAGPAN,
    payload: enabled
  };
}
function setManualFeatureTooltipsEnabled(enabled) {
  return {
    type: ActionType.MAP_SET_MANUAL_MAPTIP,
    payload: enabled
  };
}
function setViewRotation(rotation) {
  return {
    type: ActionType.MAP_SET_VIEW_ROTATION,
    payload: rotation
  };
}
function setViewRotationEnabled(enabled) {
  return {
    type: ActionType.MAP_SET_VIEW_ROTATION_ENABLED,
    payload: enabled
  };
}
function showSelectedFeature(mapName, layerId, selectionKey) {
  return {
    type: ActionType.MAP_SHOW_SELECTED_FEATURE,
    payload: {
      mapName,
      layerId,
      selectionKey
    }
  };
}
function mapLayerAdded(mapName, layer, defaultStyle) {
  return {
    type: ActionType.LAYER_ADDED,
    payload: {
      mapName,
      layer,
      defaultStyle
    }
  };
}
function externalLayersReady(mapName) {
  return {
    type: ActionType.EXTERNAL_LAYERS_READY,
    payload: {
      mapName
    }
  };
}
function removeMapLayer(mapName, layerName) {
  return {
    type: ActionType.REMOVE_LAYER,
    payload: {
      mapName,
      layerName
    }
  };
}
function setMapLayerIndex(mapName, layerName, index2) {
  return {
    type: ActionType.SET_LAYER_INDEX,
    payload: {
      mapName,
      layerName,
      index: index2
    }
  };
}
function setMapLayerOpacity(mapName, layerName, opacity) {
  return {
    type: ActionType.SET_LAYER_OPACITY,
    payload: {
      mapName,
      layerName,
      opacity
    }
  };
}
function setHeatmapLayerBlur(mapName, layerName, blur) {
  return {
    type: ActionType.SET_HEATMAP_LAYER_BLUR,
    payload: {
      mapName,
      layerName,
      blur
    }
  };
}
function setHeatmapLayerRadius(mapName, layerName, radius) {
  return {
    type: ActionType.SET_HEATMAP_LAYER_RADIUS,
    payload: {
      mapName,
      layerName,
      radius
    }
  };
}
function setMapLayerVisibility(mapName, layerName, visible) {
  return {
    type: ActionType.SET_LAYER_VISIBILITY,
    payload: {
      mapName,
      layerName,
      visible
    }
  };
}
function setMapLayerVectorStyle(mapName, layerName, style, which) {
  return {
    type: ActionType.SET_LAYER_VECTOR_STYLE,
    payload: {
      mapName,
      layerName,
      style,
      which
    }
  };
}
function addMapLayerBusyWorker(mapName, layerName) {
  return {
    type: ActionType.ADD_LAYER_BUSY_WORKER,
    payload: {
      mapName,
      layerName
    }
  };
}
function removeMapLayerBusyWorker(mapName, layerName) {
  return {
    type: ActionType.REMOVE_LAYER_BUSY_WORKER,
    payload: {
      mapName,
      layerName
    }
  };
}
function addClientSelectedFeature(mapName, layerName, feature) {
  return {
    type: ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE,
    payload: {
      mapName,
      layerName,
      feature
    }
  };
}
function clearClientSelection(mapName) {
  return {
    type: ActionType.MAP_CLEAR_CLIENT_SELECTION,
    payload: {
      mapName
    }
  };
}
function setComparisonMode(mode) {
  return {
    type: ActionType.MAP_SET_COMPARISON_MODE,
    payload: {
      mode,
      active: mode !== "none"
    }
  };
}
function setMapSwipeMode(active) {
  return {
    type: ActionType.MAP_SET_COMPARISON_MODE,
    payload: {
      mode: active ? "swipe" : "none",
      active
    }
  };
}
function setSwipePosition(position) {
  return {
    type: ActionType.MAP_SET_SWIPE_POSITION,
    payload: {
      position
    }
  };
}
function updateMapSwipePosition(position) {
  return setSwipePosition(position);
}
function setSpyCursorRadius(radius) {
  return {
    type: ActionType.MAP_SET_SPY_CURSOR_RADIUS,
    payload: {
      radius
    }
  };
}
const MapActions = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activateMap,
  addClientSelectedFeature,
  addMapLayerBusyWorker,
  clearClientSelection,
  combineSelections,
  enableSelectDragPan,
  externalLayersReady,
  invokeCommand,
  mapLayerAdded,
  mapResized,
  nextView,
  previousView,
  queryMapFeatures,
  removeMapLayer,
  removeMapLayerBusyWorker,
  setActiveMap,
  setActiveTool,
  setBaseLayer,
  setBusyCount,
  setComparisonMode,
  setCurrentView,
  setFeatureTooltipsEnabled,
  setHeatmapLayerBlur,
  setHeatmapLayerRadius,
  setLayerTransparency,
  setManualFeatureTooltipsEnabled,
  setMapLayerIndex,
  setMapLayerOpacity,
  setMapLayerVectorStyle,
  setMapLayerVisibility,
  setMapSwipeMode,
  setMouseCoordinates,
  setScale,
  setSelection,
  setSpyCursorRadius,
  setSwipePosition,
  setViewRotation,
  setViewRotationEnabled,
  setViewSizeUnits,
  showSelectedFeature,
  updateMapSwipePosition
}, Symbol.toStringTag, { value: "Module" }));
function setGroupVisibility(mapName, options) {
  return {
    type: ActionType.LEGEND_SET_GROUP_VISIBILITY,
    payload: __spreadValues(__spreadValues({}, options), { mapName })
  };
}
function setLayerVisibility(mapName, options) {
  return {
    type: ActionType.LEGEND_SET_LAYER_VISIBILITY,
    payload: __spreadValues(__spreadValues({}, options), { mapName })
  };
}
function setGroupExpanded(mapName, options) {
  return {
    type: ActionType.LEGEND_SET_GROUP_EXPANDABLE,
    payload: __spreadValues(__spreadValues({}, options), { mapName })
  };
}
function setLayerSelectable(mapName, options) {
  return {
    type: ActionType.LEGEND_SET_LAYER_SELECTABLE,
    payload: __spreadValues(__spreadValues({}, options), { mapName })
  };
}
function refresh() {
  return (dispatch, getState) => {
    const state = getState();
    const args = state.config;
    if (!args.viewer.isStateless) {
      const map = getRuntimeMap(state);
      if (map && args.agentUri && args.agentKind) {
        const client = new Client(args.agentUri, args.agentKind);
        client.describeRuntimeMap({
          mapname: map.Name,
          session: map.SessionId,
          requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups
        }).then((res) => {
          if (args.activeMapName) {
            dispatch({
              type: ActionType.MAP_REFRESH,
              payload: {
                mapName: args.activeMapName,
                map: res
              }
            });
          }
        });
      }
    }
  };
}
const LegendActions = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  refresh,
  setGroupExpanded,
  setGroupVisibility,
  setLayerSelectable,
  setLayerVisibility
}, Symbol.toStringTag, { value: "Module" }));
function setElementStates(states) {
  return {
    type: ActionType.FUSION_SET_ELEMENT_STATE,
    payload: states
  };
}
function setTaskPaneVisibility(visible) {
  return {
    type: ActionType.FUSION_SET_TASK_PANE_VISIBILITY,
    payload: visible
  };
}
function setSelectionPanelVisibility(visible) {
  return {
    type: ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY,
    payload: visible
  };
}
function setLegendVisibility(visible) {
  return {
    type: ActionType.FUSION_SET_LEGEND_VISIBILITY,
    payload: visible
  };
}
function setTemplateCustomData(name, value) {
  return {
    type: ActionType.FUSION_SET_TEMPLATE_CUSTOM_DATA,
    payload: {
      name,
      value
    }
  };
}
const TemplateActions = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  setElementStates,
  setLegendVisibility,
  setSelectionPanelVisibility,
  setTaskPaneVisibility,
  setTemplateCustomData
}, Symbol.toStringTag, { value: "Module" }));
function panMap(dispatch, viewer, value) {
  const settings = {
    "right": [2, 1],
    "left": [0, 1],
    "down": [0, 1],
    "up": [0, 3]
  };
  const view = viewer.getCurrentView();
  const current_center = [view.x, view.y];
  const currentExtent = viewer.getCurrentExtent();
  let newPos;
  const direction = settings[value];
  if (value == "right" || value == "left") {
    newPos = [
      currentExtent[direction[0]],
      current_center[direction[1]]
    ];
  } else {
    newPos = [
      current_center[direction[0]],
      currentExtent[direction[1]]
    ];
  }
  dispatch(setCurrentView({ x: newPos[0], y: newPos[1], scale: view.scale }));
}
function buildTargetedCommand(config, parameters) {
  const cmdTarget = (parameters || {})["Target"];
  const cmdDef = {
    target: cmdTarget || "NewWindow"
  };
  if (config.capabilities.hasTaskPane && cmdTarget == "TaskPane") {
    cmdDef.target = "TaskPane";
  }
  if (cmdTarget == "SpecifiedFrame") {
    cmdDef.target = cmdTarget;
    cmdDef.targetFrame = (parameters || {})["TargetFrame"];
  }
  return cmdDef;
}
function initDefaultCommands() {
  registerCommand(DefaultCommands.Select, {
    iconClass: SPRITE_SELECT,
    selected: (state) => {
      return state.activeTool === ActiveMapTool.Select;
    },
    enabled: () => true,
    invoke: (dispatch) => {
      return dispatch(setActiveTool(ActiveMapTool.Select));
    }
  });
  registerCommand(DefaultCommands.Pan, {
    iconClass: SPRITE_PAN,
    selected: (state) => {
      return state.activeTool === ActiveMapTool.Pan;
    },
    enabled: () => true,
    invoke: (dispatch) => {
      return dispatch(setActiveTool(ActiveMapTool.Pan));
    }
  });
  registerCommand(DefaultCommands.Zoom, {
    iconClass: SPRITE_ZOOM_IN,
    selected: (state) => {
      return state.activeTool === ActiveMapTool.Zoom;
    },
    enabled: () => true,
    invoke: (dispatch) => {
      return dispatch(setActiveTool(ActiveMapTool.Zoom));
    }
  });
  registerCommand(DefaultCommands.ZoomIn, {
    iconClass: SPRITE_ZOOM_IN_FIXED,
    selected: () => false,
    enabled: () => true,
    invoke: (_dispatch, _getState, viewer) => {
      if (viewer) {
        viewer.zoomDelta(1);
      }
    }
  });
  registerCommand(DefaultCommands.ZoomOut, {
    iconClass: SPRITE_ZOOM_OUT_FIXED,
    selected: () => false,
    enabled: () => true,
    invoke: (_dispatch, _getState, viewer) => {
      if (viewer) {
        viewer.zoomDelta(-1);
      }
    }
  });
  registerCommand(DefaultCommands.PanLeft, {
    iconClass: SPRITE_PAN_WEST,
    selected: () => false,
    enabled: () => true,
    invoke: (dispatch, _getState, viewer) => {
      if (viewer) {
        panMap(dispatch, viewer, "left");
      }
    }
  });
  registerCommand(DefaultCommands.PanRight, {
    iconClass: SPRITE_PAN_EAST,
    selected: () => false,
    enabled: () => true,
    invoke: (dispatch, _getState, viewer) => {
      if (viewer) {
        panMap(dispatch, viewer, "right");
      }
    }
  });
  registerCommand(DefaultCommands.PanUp, {
    iconClass: SPRITE_PAN_NORTH,
    selected: () => false,
    enabled: () => true,
    invoke: (dispatch, _getState, viewer) => {
      if (viewer) {
        panMap(dispatch, viewer, "up");
      }
    }
  });
  registerCommand(DefaultCommands.PanDown, {
    iconClass: SPRITE_PAN_SOUTH,
    selected: () => false,
    enabled: () => true,
    invoke: (dispatch, _getState, viewer) => {
      if (viewer) {
        panMap(dispatch, viewer, "down");
      }
    }
  });
  registerCommand(DefaultCommands.About, {
    iconClass: SPRITE_ABOUT,
    selected: () => false,
    enabled: () => true,
    invoke: (dispatch, getState) => {
      dispatch(showModalComponent({
        modal: {
          title: tr("ABOUT", getState().config.locale),
          backdrop: true
        },
        name: DefaultComponentNames.About,
        component: DefaultComponentNames.About
      }));
    }
  });
  registerCommand(DefaultCommands.Help, {
    iconClass: SPRITE_HELP,
    selected: () => false,
    enabled: () => true,
    invoke: (dispatch, getState) => {
      dispatch(showModalUrl({
        modal: {
          title: tr("HELP", getState().config.locale),
          backdrop: true
        },
        name: DefaultCommands.Help,
        url: "help/index.html"
      }));
    }
  });
  registerCommand(DefaultCommands.Measure, {
    iconClass: SPRITE_MEASURE,
    selected: () => false,
    enabled: () => true,
    invoke: (dispatch, getState, _viewer, parameters) => {
      const config = getState().config;
      const url = "component://Measure";
      const cmdDef = buildTargetedCommand(config, parameters);
      openUrlInTarget(DefaultCommands.Measure, cmdDef, config.capabilities.hasTaskPane, dispatch, url, tr("MEASURE", config.locale));
    }
  });
  registerCommand(DefaultCommands.RestoreView, {
    iconClass: SPRITE_INITIAL_CENTER,
    selected: () => false,
    enabled: () => true,
    invoke: (_dispatch, getState, viewer) => {
      if (viewer) {
        const view = getInitialView(getState());
        if (view != null) {
          viewer.zoomToView(view.x, view.y, view.scale);
        } else {
          viewer.initialView();
        }
      }
    }
  });
  registerCommand(DefaultCommands.ZoomExtents, {
    iconClass: SPRITE_ZOOM_FULL,
    selected: () => false,
    enabled: () => true,
    invoke: (_dispatch, _getState, viewer) => {
      if (viewer) {
        viewer.initialView();
      }
    }
  });
  registerCommand(DefaultCommands.RefreshMap, {
    iconClass: SPRITE_ICON_REFRESHMAP,
    selected: () => false,
    enabled: CommandConditions.isNotBusy,
    invoke: (dispatch, _getState, viewer) => {
      if (viewer) {
        viewer.refreshMap(RefreshMode.LayersOnly | RefreshMode.SelectionOnly);
        dispatch(refresh());
      }
    }
  });
  registerCommand(DefaultCommands.PreviousView, {
    iconClass: SPRITE_VIEW_BACK,
    selected: () => false,
    enabled: CommandConditions.hasPreviousView,
    invoke: (dispatch, getState) => {
      const mapName = getState().config.activeMapName;
      if (mapName) {
        dispatch(previousView(mapName));
      }
    }
  });
  registerCommand(DefaultCommands.NextView, {
    iconClass: SPRITE_VIEW_FORWARD,
    selected: () => false,
    enabled: CommandConditions.hasNextView,
    invoke: (dispatch, getState) => {
      const mapName = getState().config.activeMapName;
      if (mapName) {
        dispatch(nextView(mapName));
      }
    }
  });
  registerCommand(DefaultCommands.Geolocation, {
    iconClass: SPRITE_GEOLOCATION,
    selected: () => false,
    enabled: CommandConditions.isNotBusy,
    invoke: (_dispatch, getState, viewer, parameters) => {
      const state = getState();
      const view = getCurrentView(state);
      const rtMap = getRuntimeMap(state);
      const locale = state.config.locale;
      if (viewer && view && rtMap) {
        const fact = viewer.getOLFactory();
        const geoOptions = {};
        let zoomScale = view.scale;
        if (parameters == null ? void 0 : parameters["ZoomLevel"]) {
          zoomScale = parseInt(`${parameters["ZoomLevel"]}`, 10);
        }
        if (parameters == null ? void 0 : parameters["EnableHighAccuracy"]) {
          geoOptions.enableHighAccuracy = parameters["EnableHighAccuracy"] == "true";
        }
        if (parameters == null ? void 0 : parameters["Timeout"]) {
          geoOptions.timeout = parseInt(`${parameters["Timeout"]}`, 10);
        }
        if (parameters == null ? void 0 : parameters["MaximumAge"]) {
          geoOptions.maximumAge = parseInt(`${parameters["MaximumAge"]}`, 10);
        }
        navigator.geolocation.getCurrentPosition((pos) => {
          const proj = viewer.getProjection();
          const txCoord = fact.transformCoordinateFromLonLat([pos.coords.longitude, pos.coords.latitude], proj);
          const testCoord = fact.transformCoordinateFromLonLat([pos.coords.longitude, pos.coords.latitude], `EPSG:${rtMap.CoordinateSystem.EpsgCode}`);
          viewer.zoomToView(txCoord[0], txCoord[1], zoomScale);
          const extents = [
            rtMap.Extents.LowerLeftCoordinate.X,
            rtMap.Extents.LowerLeftCoordinate.Y,
            rtMap.Extents.UpperRightCoordinate.X,
            rtMap.Extents.UpperRightCoordinate.Y
          ];
          if (fact.extentContainsXY(extents, testCoord[0], testCoord[1])) {
            viewer.toastSuccess("geolocation", tr("GEOLOCATION_SUCCESS", locale));
          } else {
            viewer.toastWarning("warning-sign", tr("GEOLOCATION_WARN_OUTSIDE_MAP", locale));
          }
        }, (err) => {
          viewer.toastError("error", tr("GEOLOCATION_ERROR", locale, { message: err.message, code: err.code }));
        }, geoOptions);
      }
    }
  });
  registerCommand(DefaultCommands.CoordinateTracker, {
    iconClass: SPRITE_COORDINATE_TRACKER,
    selected: () => false,
    enabled: () => true,
    invoke: (dispatch, getState, _viewer, parameters) => {
      const config = getState().config;
      const codes = Array.isArray(parameters == null ? void 0 : parameters["Projection"]) ? parameters["Projection"] : [];
      const url = `component://CoordinateTracker?${codes.map((p) => "projections=" + p).join("&")}`;
      const cmdDef = buildTargetedCommand(config, parameters);
      openUrlInTarget(DefaultCommands.CoordinateTracker, cmdDef, config.capabilities.hasTaskPane, dispatch, url, tr("COORDTRACKER", config.locale));
    }
  });
  registerCommand(DefaultCommands.AddManageLayers, {
    iconClass: SPRITE_LAYER_ADD,
    selected: () => false,
    enabled: () => true,
    invoke: (dispatch, getState, _viewer, parameters) => {
      const config = getState().config;
      const url = `component://${DefaultComponentNames.AddManageLayers}`;
      const cmdDef = buildTargetedCommand(config, parameters);
      openUrlInTarget(DefaultCommands.AddManageLayers, cmdDef, config.capabilities.hasTaskPane, dispatch, url, tr("ADD_MANAGE_LAYERS", config.locale));
    }
  });
  registerCommand(DefaultCommands.Print, {
    iconClass: SPRITE_PRINT,
    selected: () => false,
    enabled: () => true,
    invoke: (_dispatch, _getState, viewer, _parameters) => {
      viewer == null ? void 0 : viewer.exportImage({
        callback: (image) => {
          const el = React.createElement("img", { src: image });
          const printWindow = window.open();
          if (printWindow) {
            printWindow.document.open();
            printWindow.document.close();
            printWindow.document.head.innerHTML = `
                                <meta charset="UTF-8">
                                <title>Print View</title>
                                `;
            printWindow.document.body.innerHTML = '<div id="print"></div>';
            ReactDOM.render(el, printWindow.document.getElementById("print"));
          }
        }
      });
    }
  });
  registerCommand(DefaultCommands.MapSwipe, {
    iconClass: SPRITE_MAP_SWIPE,
    selected: (state) => {
      var _a;
      return ((_a = state.comparisonMode) != null ? _a : state.swipeActive ? "swipe" : "none") !== "none";
    },
    enabled: (state) => {
      var _a;
      const pairs = (_a = state.comparisonPairs) != null ? _a : state.mapSwipePairs;
      if (!pairs || pairs.length === 0) {
        return false;
      }
      const activeMapName = state.activeMapName;
      return pairs.some((p) => p.primaryMapName === activeMapName);
    },
    invoke: (dispatch, getState) => {
      var _a, _b;
      const config = getState().config;
      const currentMode = (_a = config.comparisonMode) != null ? _a : config.swipeActive ? "swipe" : "none";
      const nextMode = currentMode === "none" ? (_b = config.lastComparisonMode) != null ? _b : "swipe" : "none";
      dispatch(setComparisonMode(nextMode));
    }
  });
  registerCommand("showTaskPane", {
    iconClass: SPRITE_INVOKE_SCRIPT,
    selected: () => false,
    enabled: CommandConditions.isNotBusy,
    invoke: (dispatch, _getState) => {
      dispatch(setTaskPaneVisibility(true));
    }
  });
  registerCommand("showLegend", {
    iconClass: SPRITE_INVOKE_SCRIPT,
    selected: () => false,
    enabled: CommandConditions.isNotBusy,
    invoke: (dispatch, _getState) => {
      dispatch(setLegendVisibility(true));
    }
  });
  registerCommand("showSelectionPanel", {
    iconClass: SPRITE_INVOKE_SCRIPT,
    selected: () => false,
    enabled: CommandConditions.isNotBusy,
    invoke: (dispatch, _getState) => {
      dispatch(setSelectionPanelVisibility(true));
    }
  });
}
const MapProviderContext = reactExports.createContext({});
const ReduxProvider = ({ store, children }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Provider, { store, children });
function useReduxDispatch() {
  return useDispatch();
}
function useAppState(selector, equalityFn) {
  return useSelector(selector, equalityFn);
}
const MapProviderContextProvider = ({ value, children }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MapProviderContext.Provider, { value, children });
};
function useMapProviderContext() {
  return reactExports.useContext(MapProviderContext);
}
const MapContextProvider = ({ value, store, children }) => {
  reactExports.useEffect(() => {
    value.setReduxStore(store);
    return () => {
      value.setReduxStore(void 0);
    };
  }, [value, store]);
  let inner = children;
  if (store) {
    inner = /* @__PURE__ */ jsxRuntimeExports.jsx(ReduxProvider, { store, children });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MapProviderContextProvider, { value, children: inner });
};
const EMPTY_INITIAL_EXTERNAL_LAYERS = [];
const selectReducedToolbarAppState = createSelector(
  [(state) => state],
  (state) => reduceAppToToolbarState(state)
);
const selectActiveMapLayers = createSelector(
  [
    (state) => state.config.activeMapName,
    (state) => state.mapState
  ],
  (activeMapName, mapState) => {
    var _a;
    if (activeMapName) {
      return (_a = mapState[activeMapName]) == null ? void 0 : _a.layers;
    }
    return void 0;
  }
);
function usePrevious(value) {
  const ref = reactExports.useRef();
  reactExports.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
function useActiveMapName() {
  return useAppState((state) => state.config.activeMapName);
}
function useActiveMapInitialExternalLayers() {
  return useAppState((state) => {
    if (state.config.activeMapName) {
      return state.mapState[state.config.activeMapName].initialExternalLayers;
    }
    return EMPTY_INITIAL_EXTERNAL_LAYERS;
  });
}
function sameHeatmapSettings(left, right) {
  if (left && right) {
    return left.blur == right.blur && left.radius == right.radius;
  }
  return false;
}
function useActiveMapLayers() {
  return useAppState(selectActiveMapLayers, (left, right) => {
    if (left === right) return true;
    if (!left || !right) return false;
    return !areArraysDifferent(left, right, (l, r) => {
      return l.name == r.name && l.opacity == r.opacity && l.visible == r.visible && l.vectorStyle == r.vectorStyle && l.cluster == r.cluster && sameHeatmapSettings(l.heatmap, r.heatmap);
    });
  });
}
function useNamedMapLayers(mapName) {
  return useAppState((state) => {
    if (mapName && state.mapState[mapName]) {
      return state.mapState[mapName].layers;
    }
    return void 0;
  }, (left, right) => {
    if (left === right) return true;
    if (!left || !right) return false;
    return !areArraysDifferent(left, right, (l, r) => {
      return l.name == r.name && l.opacity == r.opacity && l.visible == r.visible && l.vectorStyle == r.vectorStyle && l.cluster == r.cluster && sameHeatmapSettings(l.heatmap, r.heatmap);
    });
  });
}
function useViewerLocale() {
  return useAppState((state) => state.config.locale);
}
function useActiveMapView() {
  return useAppState((state) => {
    return getCurrentView(state);
  });
}
function useActiveMapWidth() {
  return useAppState((state) => {
    var _a, _b;
    return (_b = (_a = state.viewer) == null ? void 0 : _a.size) == null ? void 0 : _b[0];
  });
}
function useActiveMapHeight() {
  return useAppState((state) => {
    var _a, _b;
    return (_b = (_a = state.viewer) == null ? void 0 : _a.size) == null ? void 0 : _b[1];
  });
}
function useViewerSizeUnits() {
  return useAppState((state) => state.config.viewSizeUnits);
}
function useActiveMapExternalBaseLayers() {
  return useAppState((state) => getExternalBaseLayers(state));
}
function useCurrentMouseCoordinates() {
  return useAppState((state) => state.mouse.coords);
}
function useViewerFlyouts() {
  return useAppState((state) => state.toolbar.flyouts);
}
function useInitWarnings() {
  return useAppState((state) => state.initError.warnings);
}
function useInitError() {
  return useAppState((state) => state.initError.error);
}
function useInitErrorStack() {
  return useAppState((state) => state.initError.includeStack);
}
function useInitErrorOptions() {
  return useAppState((state) => state.initError.options);
}
function getActiveMapBranch(state) {
  if (state.config.activeMapName) {
    return state.mapState[state.config.activeMapName];
  }
  return void 0;
}
function useActiveMapBranch() {
  return useAppState((state) => getActiveMapBranch(state));
}
function useActiveMapSelectionSet() {
  return useAppState((state) => {
    var _a;
    return (_a = getSelectionSet(state)) != null ? _a : null;
  });
}
function useCustomAppSettings() {
  return useAppState((state) => state.config.appSettings);
}
function useActiveMapClientSelectionSet() {
  return useAppState((state) => {
    var _a;
    return (_a = getActiveMapBranch(state)) == null ? void 0 : _a.clientSelection;
  });
}
function useAvailableMaps() {
  return useAppState((state) => state.config.availableMaps);
}
function useViewerBusyCount() {
  return useAppState((state) => state.viewer.busyCount);
}
function useViewerViewRotation() {
  return useAppState((state) => state.config.viewRotation);
}
function useViewerActiveTool() {
  return useAppState((state) => state.viewer.tool);
}
function useViewerViewRotationEnabled() {
  return useAppState((state) => state.config.viewRotationEnabled);
}
function useConfiguredCoordinateProjection() {
  return useAppState((state) => state.config.coordinates.projection);
}
function useConfiguredCoordinateDecimals() {
  return useAppState((state) => state.config.coordinates.decimals);
}
function useConfiguredCoordinateFormat() {
  return useAppState((state) => state.config.coordinates.format);
}
function useConfiguredAgentUri() {
  return useAppState((state) => state.config.agentUri);
}
function useConfiguredAgentKind() {
  return useAppState((state) => state.config.agentKind);
}
function useViewerIsStateless() {
  return useAppState((state) => state.config.viewer.isStateless);
}
function useViewerImageFormat() {
  return useAppState((state) => state.config.viewer.imageFormat);
}
function useViewerSelectionImageFormat() {
  return useAppState((state) => state.config.viewer.selectionImageFormat);
}
function useViewerSelectionColor() {
  return useAppState((state) => state.config.viewer.selectionColor);
}
function useViewerActiveFeatureSelectionColor() {
  return useAppState((state) => state.config.viewer.activeSelectedFeatureColor);
}
function useViewerPointSelectionBuffer() {
  return useAppState((state) => state.config.viewer.pointSelectionBuffer);
}
function useViewerFeatureTooltipsEnabled() {
  return useAppState((state) => state.viewer.featureTooltipsEnabled);
}
function useViewerSelectCanDragPan() {
  return useAppState((state) => state.config.selectCanDragPan);
}
function useConfiguredManualFeatureTooltips() {
  return useAppState((state) => state.config.manualFeatureTooltips);
}
function useConfiguredLoadIndicatorPositioning() {
  return useAppState((state) => state.config.viewer.loadIndicatorPositioning);
}
function useConfiguredLoadIndicatorColor() {
  return useAppState((state) => state.config.viewer.loadIndicatorColor);
}
function useConfiguredCancelDigitizationKey() {
  return useAppState((state) => state.config.cancelDigitizationKey);
}
function useConfiguredUndoLastPointKey() {
  return useAppState((state) => state.config.undoLastPointKey);
}
function useConfiguredCapabilities() {
  return useAppState((state) => state.config.capabilities);
}
function useTemplateLegendVisible() {
  return useAppState((state) => state.template.legendVisible);
}
function useTemplateTaskPaneVisible() {
  return useAppState((state) => state.template.taskPaneVisible);
}
function useTemplateSelectionVisible() {
  return useAppState((state) => state.template.selectionPanelVisible);
}
function useTemplateInitialInfoPaneWidth() {
  return useAppState((state) => state.template.initialInfoPaneWidth);
}
function useTemplateInitialTaskPaneWidth() {
  return useAppState((state) => state.template.initialTaskPaneWidth);
}
function useTemplateCustomData(key) {
  return useAppState((state) => state.template.templateData[key]);
}
function useTaskPaneInitialUrl() {
  return useAppState((state) => state.taskpane.initialUrl);
}
function useTaskPaneNavigationIndex() {
  return useAppState((state) => state.taskpane.navIndex);
}
function useTaskPaneLastUrlPushed() {
  return useAppState((state) => state.taskpane.lastUrlPushed);
}
function useTaskPaneNavigationStack() {
  return useAppState((state) => state.taskpane.navigation);
}
function useLastDispatchedAction() {
  return useAppState((state) => state.lastaction);
}
function useReducedToolbarAppState() {
  const selection = useActiveMapSelectionSet();
  const clientSelection = useActiveMapClientSelectionSet();
  const tbState = useAppState(selectReducedToolbarAppState, (left, right) => {
    return (left == null ? void 0 : left.busyWorkerCount) == (right == null ? void 0 : right.busyWorkerCount) && (left == null ? void 0 : left.hasNextView) == (right == null ? void 0 : right.hasNextView) && (left == null ? void 0 : left.hasPreviousView) == (right == null ? void 0 : right.hasPreviousView) && (left == null ? void 0 : left.featureTooltipsEnabled) == (right == null ? void 0 : right.featureTooltipsEnabled) && (left == null ? void 0 : left.activeTool) == (right == null ? void 0 : right.activeTool);
  });
  let hasClientSelection = false;
  let hasSelection = false;
  if (selection) {
    if (selection.FeatureSet && selection.FeatureSet.Layer.length > 0) {
      hasSelection = true;
    }
    if (selection.SelectedFeatures && selection.SelectedFeatures.SelectedLayer.length > 0) {
      hasSelection = true;
    }
  }
  if (clientSelection && clientSelection.layers.length > 0) {
    hasClientSelection = true;
  }
  return __spreadProps(__spreadValues({}, tbState), {
    hasClientSelection,
    hasSelection
  });
}
function openContextMenu(position) {
  return {
    type: ActionType.CONTEXT_MENU_OPEN,
    payload: __spreadValues({}, position)
  };
}
function closeContextMenu() {
  return {
    type: ActionType.CONTEXT_MENU_CLOSE
  };
}
function openFlyout(id, metrics) {
  return {
    type: ActionType.FLYOUT_OPEN,
    payload: {
      flyoutId: id,
      metrics
    }
  };
}
function closeFlyout(id) {
  return {
    type: ActionType.FLYOUT_CLOSE,
    payload: {
      flyoutId: id
    }
  };
}
function openComponent(id, metrics, name, props) {
  return {
    type: ActionType.COMPONENT_OPEN,
    payload: {
      flyoutId: id,
      metrics,
      name,
      props
    }
  };
}
function closeComponent(id) {
  return {
    type: ActionType.COMPONENT_CLOSE,
    payload: {
      flyoutId: id
    }
  };
}
const FlyoutActions = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  closeComponent,
  closeContextMenu,
  closeFlyout,
  openComponent,
  openContextMenu,
  openFlyout
}, Symbol.toStringTag, { value: "Module" }));
const ToolbarContainer = (props) => {
  const { containerClass, containerStyle, vertical, hideVerticalLabels } = props;
  const dispatch = useReduxDispatch();
  const flyouts = useAppState((state) => state.toolbar.flyouts);
  const toolbar = useAppState((state) => state.toolbar.toolbars[props.id]);
  const tbState = useReducedToolbarAppState();
  const viewer = useMapProviderContext();
  const invokeCommandAction = (cmd, parameters) => dispatch(invokeCommand(cmd, viewer, parameters));
  const openFlyoutAction = (id, metrics) => dispatch(openFlyout(id, metrics));
  const closeFlyoutAction = (id) => dispatch(closeFlyout(id));
  const openComponentAction = (id, metrics, name, props2) => dispatch(openComponent(id, metrics, name, props2));
  const closeComponentAction = (id) => dispatch(closeComponent(id));
  const onCloseFlyout = (id) => closeFlyoutAction == null ? void 0 : closeFlyoutAction(id);
  const onOpenFlyout = (id, metrics) => openFlyoutAction == null ? void 0 : openFlyoutAction(id, metrics);
  const onOpenComponent = (id, metrics, name, props2) => openComponentAction == null ? void 0 : openComponentAction(id, metrics, name, props2);
  const onCloseComponent = (id) => closeComponentAction == null ? void 0 : closeComponentAction(id);
  const flyoutStates = {};
  if (flyouts) {
    const ids = Object.keys(flyouts);
    for (const fid of ids) {
      flyoutStates[fid] = !!flyouts[fid].open;
    }
  }
  let tbContainerStyle = __spreadValues({}, containerStyle || {});
  if (toolbar && toolbar.items && invokeCommandAction) {
    if (vertical === true) {
      tbContainerStyle.width = DEFAULT_TOOLBAR_SIZE;
    } else {
      tbContainerStyle.height = DEFAULT_TOOLBAR_SIZE;
      tbContainerStyle.overflow = "auto";
    }
    const items = toolbar.items.map((tb) => mapToolbarReference(tb, tbState, invokeCommandAction));
    const childItems = processMenuItems(items);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Toolbar,
      {
        vertical,
        hideVerticalLabels,
        childItems,
        containerClass,
        containerStyle: tbContainerStyle,
        flyoutStates,
        onOpenComponent,
        onCloseComponent,
        onOpenFlyout,
        onCloseFlyout
      }
    );
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {});
  }
};
const FlyoutRegion = (props) => {
  var _a, _b;
  const { MenuComponent } = useElementContext();
  const contextMenuRef = reactExports.useRef(null);
  const isContextMenuOpen = !!((_b = (_a = props.flyoutConf) == null ? void 0 : _a[WEBLAYOUT_CONTEXTMENU]) == null ? void 0 : _b.open);
  reactExports.useEffect(() => {
    if (!isContextMenuOpen) {
      return;
    }
    const dismissContextMenu = (evt) => {
      var _a2;
      const target = evt.target;
      if (!(target instanceof Node)) {
        return;
      }
      if ((_a2 = contextMenuRef.current) == null ? void 0 : _a2.contains(target)) {
        return;
      }
      props.onCloseFlyout(WEBLAYOUT_CONTEXTMENU);
    };
    document.addEventListener("mousedown", dismissContextMenu, true);
    document.addEventListener("touchstart", dismissContextMenu, true);
    return () => {
      document.removeEventListener("mousedown", dismissContextMenu, true);
      document.removeEventListener("touchstart", dismissContextMenu, true);
    };
  }, [isContextMenuOpen, props.onCloseFlyout]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: (() => {
    const children = [];
    for (const flyoutId in props.flyoutConf) {
      const flyout = props.flyoutConf[flyoutId];
      const open = !!flyout.open;
      if (open) {
        const items = flyout.childItems || [];
        const containerStyle = {};
        containerStyle.zIndex = 2e3;
        if (flyout.metrics) {
          const met = flyout.metrics;
          if (flyoutId == WEBLAYOUT_CONTEXTMENU) {
            containerStyle.top = met.posY - 40;
            containerStyle.left = met.posX + 20;
          } else {
            if (flyout.metrics.vertical === true) {
              containerStyle.top = met.posY;
            } else {
              containerStyle.top = met.posY + met.height;
            }
            if (flyoutId == WEBLAYOUT_TASKMENU) {
              containerStyle.right = window.innerWidth - (met.posX + met.width);
            } else {
              containerStyle.left = met.posX;
              if (flyout.metrics.vertical === true) {
                containerStyle.left += met.width;
              }
            }
          }
        }
        const invoked = () => {
          props.onCloseFlyout(flyoutId);
        };
        let className = "mg-flyout-menu-container";
        if (flyout.componentName) {
          className = "mg-flyout-component-container";
        }
        children.push(/* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: flyoutId === WEBLAYOUT_CONTEXTMENU ? contextMenuRef : void 0, className, style: containerStyle, children: [
          (() => {
            if (flyout.componentName) {
              return /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: flyout.componentName, componentProps: flyout.componentProps, locale: props.locale });
            } else {
              return /* @__PURE__ */ jsxRuntimeExports.jsx(MenuComponent, { items, onInvoked: invoked });
            }
          })(),
          (() => {
            if (flyoutId === WEBLAYOUT_TASKMENU) {
              return /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: "about:blank", className: "iframe-iehack-zindex" });
            }
          })()
        ] }, flyoutId));
      }
    }
    return children;
  })() });
};
const FlyoutRegionContainer = () => {
  const dispatch = useReduxDispatch();
  const closeFlyoutAction = (id) => dispatch(closeFlyout(id));
  const viewer = useMapProviderContext();
  const invokeCommandAction = (cmd, parameters) => dispatch(invokeCommand(cmd, viewer, parameters));
  const onCloseFlyout = (id) => closeFlyoutAction(id);
  const flyouts = useViewerFlyouts();
  const locale = useViewerLocale();
  const tbState = useReducedToolbarAppState();
  const prepared = {};
  if (invokeCommandAction) {
    for (const flyoutId in flyouts) {
      const tb = flyouts[flyoutId];
      if (typeof tb.componentName == "undefined") {
        prepared[flyoutId] = mapToolbarReference(tb, tbState, invokeCommandAction);
        prepared[flyoutId].open = !!flyouts[flyoutId].open;
        prepared[flyoutId].metrics = flyouts[flyoutId].metrics;
      } else {
        prepared[flyoutId] = flyouts[flyoutId];
      }
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FlyoutRegion, { flyoutConf: prepared, onCloseFlyout, locale });
};
class FormFrameShim extends reactExports.Component {
  constructor(props) {
    super(props);
    this.onFormMounted = (form) => {
      this._form = form;
    };
    this.state = {
      target: "",
      action: "",
      params: []
    };
  }
  submit(url, params, target) {
    this.setState({
      action: url,
      params,
      target
    }, () => {
      this._form.submit();
    });
  }
  render() {
    const { target, action, params } = this.state;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("form", { style: { visibility: "hidden", width: 0, height: 0 }, ref: this.onFormMounted, method: "post", id: "Frm", target, action, encType: "application/x-www-form-urlencoded", children: (() => {
      const fields = [];
      for (let i = 0; i < params.length; i += 2) {
        fields.push(/* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: `f${i}`, type: "hidden", name: params[i], value: params[i + 1] }, `f${i}`));
      }
      return fields;
    })() });
  }
}
function goHome() {
  return (dispatch, getState) => {
    const initUrl = getState().taskpane.initialUrl;
    if (initUrl != null) {
      dispatch({
        type: ActionType.TASK_PANE_HOME
      });
    } else {
      throw new MgError("Case not handled yet: Home action when no initial task URL set");
    }
  };
}
function goBack() {
  return {
    type: ActionType.TASK_PANE_BACK
  };
}
function goForward() {
  return {
    type: ActionType.TASK_PANE_FORWARD
  };
}
function pushUrl(url, silent) {
  return {
    type: ActionType.TASK_PANE_PUSH_URL,
    payload: {
      url,
      silent
    }
  };
}
const TaskPaneActions = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  goBack,
  goForward,
  goHome,
  pushUrl
}, Symbol.toStringTag, { value: "Module" }));
function useActiveMapIsArbitraryCoordSys() {
  return useAppState((state) => {
    var _a, _b, _c;
    let arbCs = false;
    if (state.config.activeMapName) {
      const ms = state.mapState[state.config.activeMapName];
      if ((_a = ms.mapguide) == null ? void 0 : _a.runtimeMap) {
        arbCs = tryParseArbitraryCs(ms.mapguide.runtimeMap.CoordinateSystem.MentorCode) != null;
      } else if ((_b = ms.generic) == null ? void 0 : _b.subject) {
        arbCs = tryParseArbitraryCs((_c = ms.generic.subject.meta) == null ? void 0 : _c.projection) != null;
      }
    }
    return arbCs;
  });
}
function useActiveMapMetersPerUnit() {
  return useAppState((state) => {
    var _a;
    let mpu = 1;
    if (state.config.activeMapName) {
      const ms = state.mapState[state.config.activeMapName];
      if ((_a = ms.mapguide) == null ? void 0 : _a.runtimeMap) {
        mpu = ms.mapguide.runtimeMap.CoordinateSystem.MetersPerUnit;
      }
    }
    return mpu;
  });
}
function useActiveMapProjection() {
  return useAppState((state) => {
    var _a, _b, _c;
    let proj;
    if (state.config.activeMapName) {
      const map = (_a = state.mapState[state.config.activeMapName].mapguide) == null ? void 0 : _a.runtimeMap;
      const subject = (_b = state.mapState[state.config.activeMapName].generic) == null ? void 0 : _b.subject;
      if (map) {
        proj = `EPSG:${map.CoordinateSystem.EpsgCode}`;
      } else if (subject) {
        proj = (_c = subject.meta) == null ? void 0 : _c.projection;
      }
    }
    return proj;
  });
}
function useActiveMapProjectionUnits() {
  return useAppState((state) => {
    var _a, _b, _c, _d, _e;
    let arbUnits;
    if (state.config.activeMapName) {
      const map = (_a = state.mapState[state.config.activeMapName].mapguide) == null ? void 0 : _a.runtimeMap;
      const subject = (_b = state.mapState[state.config.activeMapName].generic) == null ? void 0 : _b.subject;
      if (map) {
        arbUnits = (_c = tryParseArbitraryCs(map.CoordinateSystem.MentorCode)) == null ? void 0 : _c.units;
      } else if (subject) {
        arbUnits = (_e = tryParseArbitraryCs((_d = subject.meta) == null ? void 0 : _d.projection)) == null ? void 0 : _e.units;
      }
    }
    return arbUnits;
  });
}
function useActiveMapExpandedGroups() {
  return useAppState((state) => {
    var _a, _b;
    return (_b = (_a = getActiveMapBranch(state)) == null ? void 0 : _a.mapguide) == null ? void 0 : _b.expandedGroups;
  });
}
function useActiveMapSelectableLayers() {
  return useAppState((state) => {
    var _a, _b;
    return (_b = (_a = getActiveMapBranch(state)) == null ? void 0 : _a.mapguide) == null ? void 0 : _b.selectableLayers;
  });
}
function useActiveMapShowGroups() {
  return useAppState((state) => {
    var _a, _b;
    return (_b = (_a = getActiveMapBranch(state)) == null ? void 0 : _a.mapguide) == null ? void 0 : _b.showGroups;
  });
}
function useActiveMapShowLayers() {
  return useAppState((state) => {
    var _a, _b;
    return (_b = (_a = getActiveMapBranch(state)) == null ? void 0 : _a.mapguide) == null ? void 0 : _b.showLayers;
  });
}
function useActiveMapHideGroups() {
  return useAppState((state) => {
    var _a, _b;
    return (_b = (_a = getActiveMapBranch(state)) == null ? void 0 : _a.mapguide) == null ? void 0 : _b.hideGroups;
  });
}
function useActiveMapHideLayers() {
  return useAppState((state) => {
    var _a, _b;
    return (_b = (_a = getActiveMapBranch(state)) == null ? void 0 : _a.mapguide) == null ? void 0 : _b.hideLayers;
  });
}
function useActiveMapLayerTransparency() {
  return useAppState((state) => {
    var _a, _b;
    return (_b = (_a = getActiveMapBranch(state)) == null ? void 0 : _a.mapguide) == null ? void 0 : _b.layerTransparency;
  });
}
function useActiveMapActiveSelectedFeature() {
  return useAppState((state) => {
    var _a, _b;
    return (_b = (_a = getActiveMapBranch(state)) == null ? void 0 : _a.mapguide) == null ? void 0 : _b.activeSelectedFeature;
  });
}
function useActiveMapSelectableLayerNames() {
  var _a;
  const map = useActiveMapState();
  const selectableLayers = useActiveMapSelectableLayers();
  if (map) {
    const selectableLayerNames = ((_a = map.Layer) != null ? _a : []).filter((layer) => layer.Selectable && selectableLayers[layer.ObjectId] !== false).map((layer) => layer.Name);
    return selectableLayerNames;
  }
  return [];
}
function useActiveMapSessionId() {
  return useAppState((state) => {
    var _a;
    return (_a = getRuntimeMap(state)) == null ? void 0 : _a.SessionId;
  });
}
function useActiveMapFiniteScales() {
  return useAppState((state) => {
    const map = getRuntimeMap(state);
    return map != null ? map.FiniteDisplayScale : void 0;
  });
}
function useActiveMapState() {
  return useAppState((state) => getRuntimeMap(state));
}
function useActiveMapCoordinateFormat() {
  return useAppState((state) => {
    var _a;
    if (state.config.activeMapName) {
      return (_a = state.mapState[state.config.activeMapName]) == null ? void 0 : _a.coordinateFormat;
    }
    return void 0;
  });
}
const deArrayifyModulePromise = __vitePreload(() => import("./chunks/deArrayify-debug.js"), true ? __vite__mapDeps([0,1,2,3,4,5]) : void 0, import.meta.url);
function isEmptySelection(selection) {
  if (selection && selection.FeatureSet) {
    let count = 0;
    for (const l of selection.FeatureSet.Layer) {
      count += l.Class.ID.length;
    }
    return count === 0;
  }
  return true;
}
class FusionApiShim {
  constructor(parent) {
    this.parent = parent;
    this.Event = new FusionEventApiShim();
  }
  xml2json(callback, response, json) {
    if (json) {
      const o = JSON.parse(response.responseText);
      callback(o);
    } else {
      const options = {
        onSuccess: callback,
        method: "POST",
        parameters: { "xml": encodeURIComponent(response.responseText) }
      };
      this.ajaxRequest("common/php/Xml2JSON.php", options);
    }
  }
  ajaxRequest(url, options) {
    let reqUrl = `${getFusionRoot()}/${url}`;
    const client = this.parent.getClient();
    const resolve = options.onSuccess || (() => debug(`No success handler defined for this operation`));
    const fail = options.onFailure || options.onException || ((_r, res) => error(res));
    if (client) {
      if (typeof options.parameters == "string") {
        reqUrl += "?" + options.parameters;
        fetch(reqUrl, {
          method: "GET"
        }).then((res) => {
          if (!res.ok) {
            const stat = res.statusText;
            res.text().then((t) => {
              fail({
                transport: {
                  responseText: t
                }
              }, new MgError(stat));
            });
          } else {
            res.text().then((t) => resolve({
              responseText: t
            }));
          }
        });
      } else {
        fetch(reqUrl, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          method: "POST",
          body: serialize(options.parameters, false)
          //form
        }).then((res) => {
          if (!res.ok) {
            const stat = res.statusText;
            res.text().then((t) => {
              fail({
                transport: {
                  responseText: t
                }
              }, new MgError(stat));
            });
          } else {
            res.text().then((t) => resolve({
              responseText: t
            }));
          }
        });
      }
    }
  }
  getMapByName(name) {
    if (this.parent.props.map && this.parent.props.map.Name == name) {
      return new FusionWidgetApiShim(this.parent);
    }
    return void 0;
  }
  getWidgetById(id) {
    if (id == FUSION_TASKPANE_NAME || id == FUSION_MAP_NAME) {
      return new FusionWidgetApiShim(this.parent);
    }
    return void 0;
  }
  getWidgetsByType(type) {
    if (type == FUSION_REDLINE_NAME) {
      return [
        new FusionWidgetApiShim(this.parent)
      ];
    }
    return [];
  }
  registerForEvent(eventID, callback) {
    this.parent.registerForEvent(eventID, callback);
  }
}
class OL2FunctionHelper {
  bind(func, obj_this) {
    return func.bind(obj_this);
  }
}
class OL2Shim {
  constructor() {
    this.Function = new OL2FunctionHelper();
  }
  i18n(key) {
    return tr(key);
  }
}
class FusionEventApiShim {
  constructor() {
  }
  get MAP_SELECTION_ON() {
    return 1;
  }
  get MAP_SELECTION_OFF() {
    return 2;
  }
  get MAP_ACTIVE_LAYER_CHANGED() {
    return 3;
  }
  get MAP_BUSY_CHANGED() {
    return 4;
  }
}
class OL2Rect {
  constructor(poly) {
    this.poly = poly;
  }
  getVertices() {
    const coords = this.poly.getExtent();
    return [
      { x: coords[0], y: coords[1] },
      //0
      void 0,
      //1
      { x: coords[2], y: coords[3] }
      //2
    ];
  }
}
class OL2Geom {
  constructor(geom) {
    this.geom = geom;
  }
  get x() {
    const g = this.geom;
    if (g instanceof Point) {
      return g.getCoordinates()[0];
    }
    return NaN;
  }
  get y() {
    const g = this.geom;
    if (g instanceof Point) {
      return g.getCoordinates()[1];
    }
    return NaN;
  }
  getVertices() {
    const g = this.geom;
    if (g instanceof Point) ;
    else if (g instanceof LineString) {
      return g.getCoordinates().map((c) => {
        return { x: c[0], y: c[1] };
      });
    } else if (g instanceof Polygon) {
      const ring = g.getLinearRing(0);
      if (ring) {
        return ring.getCoordinates().map((c) => {
          return { x: c[0], y: c[1] };
        });
      }
    }
    return [];
  }
  get CLASS_NAME() {
    if (this.geom instanceof Point) {
      return "OpenLayers.Geometry.Point";
    } else if (this.geom instanceof LineString) {
      return "OpenLayers.Geometry.LineString";
    } else if (this.geom instanceof Polygon) {
      return "OpenLayers.Geometry.Polygon";
    } else {
      return "Unknown";
    }
  }
}
class OL2Bounds {
  constructor(bounds) {
    if (Array.isArray(bounds)) {
      this.left = bounds[0];
      this.bottom = bounds[1];
      this.right = bounds[2];
      this.top = bounds[3];
    } else {
      this.left = bounds.left;
      this.bottom = bounds.bottom;
      this.right = bounds.right;
      this.top = bounds.top;
    }
  }
}
let mRedlineMessageEnabled;
function isRedlineMessagePromptEnabled() {
  return !!mRedlineMessageEnabled;
}
function enableRedlineMessagePrompt(enabled) {
  mRedlineMessageEnabled = enabled;
}
function resolveSetExtentsBounds(bounds, miny, maxx, maxy) {
  if (typeof bounds === "number") {
    return [bounds, miny, maxx, maxy];
  } else if (Array.isArray(bounds)) {
    return bounds;
  } else {
    return [bounds.left, bounds.bottom, bounds.right, bounds.top];
  }
}
class FusionWidgetApiShim {
  constructor(parent) {
    this.parent = parent;
  }
  goHome() {
    this.parent.goHome();
  }
  processFeatureInfo(r) {
    const o = JSON.parse(r.responseText);
    if (o.FeatureInformation) {
      void deArrayifyModulePromise.then(({ deArrayify, isQueryMapFeaturesResponse }) => {
        const norm = deArrayify(o);
        if (isQueryMapFeaturesResponse(norm)) {
          const selXml = buildSelectionXml(norm.FeatureSet);
          this.setSelection(selXml, false);
        }
      });
    } else if (o.Message) {
      this.warn(o.Message);
    }
  }
  getSelectableLayers() {
    const layers = [];
    const { map } = this.parent.props;
    if (map && map.Layer) {
      const matches = map.Layer.filter((l) => l.Selectable).map((l) => {
        return { layerName: l.Name, legendLabel: l.LegendLabel };
      });
      for (const l of matches) {
        layers.push(l);
      }
    }
    return layers;
  }
  get mapWidget() {
    return this;
  }
  getExtentFromPoint(x, y, scale) {
    const { viewer } = this.parent.props;
    if (viewer.isReady()) {
      const view = viewer.getCurrentView();
      if (!scale) {
        scale = view.scale;
      }
      const res = viewer.scaleToResolution(scale);
      const size = viewer.getSize();
      const w = size[0] * res;
      const h = size[1] * res;
      return new OL2Bounds([
        x - w / 2,
        y - h / 2,
        x + w / 2,
        y + h / 2
      ]);
    }
    return void 0;
  }
  setExtents(bounds, miny, maxx, maxy) {
    const { viewer } = this.parent.props;
    if (viewer.isReady()) {
      let extent;
      if (typeof bounds === "number") {
        extent = resolveSetExtentsBounds(bounds, miny, maxx, maxy);
      } else if (Array.isArray(bounds)) {
        extent = resolveSetExtentsBounds(bounds);
      } else {
        extent = resolveSetExtentsBounds(bounds);
      }
      viewer.zoomToExtent(extent);
    }
  }
  setActiveLayer(layer) {
    this._activeLayer = layer;
    const fusionAPI = this.parent.getFusionAPI();
    this.parent.triggerFusionEvent(fusionAPI.Event.MAP_ACTIVE_LAYER_CHANGED);
  }
  getActiveLayer() {
    return this._activeLayer;
  }
  clearSelection() {
    this.parent.ClearSelection();
  }
  cancelDigitization() {
    const { viewer } = this.parent.props;
    if (viewer.isReady()) {
      viewer.cancelDigitization();
    }
  }
  query(options) {
    var _a;
    const viewer = ((_a = this.parent.props.viewer) == null ? void 0 : _a.isReady()) == true ? this.parent.props.viewer.mapguideSupport() : void 0;
    const { map } = this.parent.props;
    if (map && viewer) {
      const mapName = map.Name;
      const qmo = {
        mapname: mapName,
        session: map.SessionId,
        selectionvariant: options.selectionType,
        maxfeatures: options.maxFeatures,
        geometry: options.geometry,
        layernames: options.layers
      };
      if (qmo.maxfeatures == 0) {
        qmo.maxfeatures = -1;
      }
      viewer.setSelectionXml("", qmo);
    }
  }
  setSelection(xml, zoomTo) {
    const { viewer } = this.parent.props;
    const mgSupport = viewer == null ? void 0 : viewer.mapguideSupport();
    if (viewer.isReady() && mgSupport) {
      mgSupport.setSelectionXml(xml, {
        layerattributefilter: 0
        //Need to set this in order for requestdata to be respected
      }, (selection) => {
        if (zoomTo) {
          const fact = viewer.getOLFactory();
          let bounds = null;
          if (selection != null && selection.SelectedFeatures != null) {
            selection.SelectedFeatures.SelectedLayer.forEach((layer) => {
              layer.Feature.forEach((feat) => {
                if (feat.Bounds) {
                  const b = feat.Bounds.split(" ").map((s) => parseFloat(s));
                  if (bounds == null) {
                    bounds = b;
                  } else {
                    bounds = fact.extendExtent(bounds, b);
                  }
                }
              });
            });
          }
          if (bounds) {
            const bw = getWidth(bounds);
            const bh = getHeight(bounds);
            if (bw > 0 && bh > 0) {
              const view = viewer.getViewForExtent(bounds);
              this.parent.ZoomToView(view.x, view.y, view.scale);
            }
          }
        }
      });
    }
  }
  getSelectedLayers() {
    const layers = [];
    const map = this.parent.props.map;
    const selectionSet = this.parent.props.selectionSet;
    if (map && map.Layer && selectionSet && selectionSet.FeatureSet) {
      for (const fl of selectionSet.FeatureSet.Layer) {
        const ml = map.Layer.filter((l) => l.ObjectId == fl["@id"])[0];
        if (ml) {
          layers.push({ legendLabel: ml.LegendLabel, layerName: ml.Name });
        }
      }
    }
    return layers;
  }
  isBusy() {
    if (this.parent.props.busyCount)
      return this.parent.props.busyCount > 0;
    return false;
  }
  isMapLoaded() {
    return true;
  }
  redraw() {
    this.parent.Refresh();
  }
  reloadMap() {
    this.parent.Refresh();
  }
  info(msg) {
    const { viewer } = this.parent.props;
    if (viewer.isReady()) {
      this._activeToast = viewer.toastPrimary("info-sign", /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fusion-message", dangerouslySetInnerHTML: { __html: purify.sanitize(msg) } }));
    }
  }
  warn(msg) {
    const { viewer } = this.parent.props;
    if (viewer.isReady()) {
      this._activeToast = viewer.toastPrimary("warning-sign", /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fusion-message", dangerouslySetInnerHTML: { __html: purify.sanitize(msg) } }));
    }
  }
  error(msg) {
    const { viewer } = this.parent.props;
    if (viewer.isReady()) {
      this._activeToast = viewer.toastPrimary("error", /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fusion-message", dangerouslySetInnerHTML: { __html: purify.sanitize(msg) } }));
    }
  }
  clear() {
    const { viewer } = this.parent.props;
    if (viewer.isReady() && this._activeToast) {
      viewer.dismissToast(this._activeToast);
    }
  }
  get mapMessagePrompt() {
    return isRedlineMessagePromptEnabled();
  }
  get container() {
    return this;
  }
  get ownerDocument() {
    return document;
  }
  get message() {
    return this;
  }
  get layerRoot() {
    return this;
  }
  findLayerByAttribute(name, value) {
    const map = this.parent.props.map;
    if (map && map.Layer) {
      const ml = map.Layer.filter((lyr) => {
        switch (name) {
          case "layerName":
            return lyr.Name == value;
        }
        return false;
      })[0];
      if (ml) {
        return { layerName: ml.Name };
      }
    }
    return null;
  }
  pixToGeoMeasure(tolerance) {
    const { viewer } = this.parent.props;
    if (viewer.isReady()) {
      const res = viewer.getResolution();
      if (res) {
        return tolerance * res;
      }
    }
    return 1e-6;
  }
  drawMap() {
    this.parent.Refresh();
  }
  registerForEvent(eventID, callback) {
    this.parent.registerForEvent(eventID, callback);
  }
  deregisterForEvent(eventID, callback) {
    this.parent.deregisterForEvent(eventID, callback);
  }
  static toOL2Circle(circ) {
    const c = circ.getCenter();
    return {
      x: c[0],
      y: c[1],
      r: circ.getRadius()
    };
  }
  digitizePoint(_options, handler) {
    const { viewer } = this.parent.props;
    if (viewer.isReady()) {
      viewer.digitizePoint((pt) => {
        handler(new OL2Geom(pt));
      });
    }
  }
  digitizeLine(_options, handler) {
    const { viewer } = this.parent.props;
    if (viewer.isReady()) {
      viewer.digitizeLine((ln) => {
        handler(new OL2Geom(ln));
      });
    }
  }
  digitizeLineString(_options, handler) {
    const { viewer } = this.parent.props;
    if (viewer.isReady()) {
      viewer.digitizeLineString((lstr) => {
        handler(new OL2Geom(lstr));
      });
    }
  }
  digitizeRectangle(_options, handler) {
    const { viewer } = this.parent.props;
    if (viewer.isReady()) {
      viewer.digitizeRectangle((rect) => {
        handler(new OL2Rect(rect));
      });
    }
  }
  digitizePolygon(_options, handler) {
    const { viewer } = this.parent.props;
    if (viewer.isReady()) {
      viewer.digitizePolygon((poly) => {
        handler(new OL2Geom(poly));
      });
    }
  }
  digitizeCircle(_options, handler) {
    const { viewer } = this.parent.props;
    if (viewer.isReady()) {
      viewer.digitizeCircle((circ) => {
        handler(FusionWidgetApiShim.toOL2Circle(circ));
      });
    }
  }
}
class AjaxViewerLineStringOrPolygon {
  constructor(coordinates) {
    this.coordinates = coordinates;
  }
  get Count() {
    return this.coordinates.length;
  }
  Point(i) {
    const pt = this.coordinates[i];
    return pt;
  }
}
class ViewerApiShimInner extends reactExports.Component {
  constructor(props) {
    super(props);
    this.onFormFrameMounted = (form) => {
      this.formFrame = form;
    };
    this.GetMapName = () => {
      var _a;
      return (_a = this.props.map) == null ? void 0 : _a.Name;
    };
    this.GetSessionId = () => {
      var _a;
      return (_a = this.props.map) == null ? void 0 : _a.SessionId;
    };
    this.goHome = () => {
      var _a, _b;
      return (_b = (_a = this.props).goHome) == null ? void 0 : _b.call(_a);
    };
    this.us = true;
    this.userSelectionHandlers = [];
    this.fusionEventHandlers = {};
    this.ol2API = new OL2Shim();
    this.fusionAPI = new FusionApiShim(this);
  }
  getClient() {
    const { agentUri, agentKind } = this.props;
    if (agentUri && agentKind) {
      return new Client(agentUri, agentKind);
    }
    return void 0;
  }
  // ------------------------ Fusion API support ----------------------- //
  getFusionAPI() {
    return this.fusionAPI;
  }
  registerForEvent(eventID, callback) {
    debug(`Fusion registerForEvent - ${eventID}`);
    if (!this.fusionEventHandlers[eventID]) {
      this.fusionEventHandlers[eventID] = [];
    }
    this.fusionEventHandlers[eventID].push(callback);
  }
  deregisterForEvent(eventID, callback) {
    debug(`Fusion deregisterForEvent - ${eventID}`);
    if (this.fusionEventHandlers[eventID]) {
      const funcs = this.fusionEventHandlers[eventID].filter((f) => f != callback);
      this.fusionEventHandlers[eventID] = funcs;
    } else {
      debug(`No callbacks registered for fusion event - ${eventID}`);
    }
  }
  triggerFusionEvent(eventID) {
    if (this.fusionEventHandlers[eventID]) {
      debug(`Trigger Fusion Event ID - ${eventID}`);
      for (const cb of this.fusionEventHandlers[eventID]) {
        cb.apply(null, arguments);
      }
    }
  }
  fusionSelectionHandler(selection) {
    const eventID = isEmptySelection(selection) ? this.fusionAPI.Event.MAP_SELECTION_OFF : this.fusionAPI.Event.MAP_SELECTION_ON;
    this.triggerFusionEvent(eventID);
  }
  // ------------------------ Map Frame -------------------------------- //
  /**
   * Indicates if the map frame is ready
   *
   * Although this not part of the "public" API, most AJAX viewer examples test for this
   * flag anyways, so we might as well emulate it here
   */
  get mapInit() {
    var _a;
    return ((_a = this.props.map) == null ? void 0 : _a.SessionId) != null;
  }
  ExecuteMapAction(code) {
    let cmdName;
    switch (code) {
      case 22:
        cmdName = DefaultCommands.About;
        break;
      case 19:
        cmdName = DefaultCommands.ClearSelection;
        break;
      case 14:
        cmdName = DefaultCommands.ZoomExtents;
        break;
      case 13:
        cmdName = DefaultCommands.NextView;
        break;
      case 3:
        cmdName = DefaultCommands.PanDown;
        break;
      case 5:
        cmdName = DefaultCommands.PanLeft;
        break;
      case 1:
        cmdName = DefaultCommands.Pan;
        break;
      case 4:
        cmdName = DefaultCommands.PanRight;
        break;
      case 2:
        cmdName = DefaultCommands.PanUp;
        break;
      case 12:
        cmdName = DefaultCommands.PreviousView;
        break;
      case 20:
        cmdName = DefaultCommands.RefreshMap;
        break;
      case 15:
        cmdName = DefaultCommands.Select;
        break;
      case 17:
        cmdName = DefaultCommands.SelectPolygon;
        break;
      case 16:
        cmdName = DefaultCommands.SelectRadius;
        break;
      case 11:
        cmdName = DefaultCommands.ZoomExtents;
        break;
      case 7:
        cmdName = DefaultCommands.ZoomIn;
        break;
      case 6:
        cmdName = DefaultCommands.Zoom;
        break;
      case 8:
        cmdName = DefaultCommands.ZoomOut;
        break;
      case 9:
        cmdName = DefaultCommands.Zoom;
        break;
      case 10:
        cmdName = DefaultCommands.ZoomToSelection;
        break;
      default:
        warn(`Unknown command code: ${code}`);
        return;
    }
    const cmd = getCommand(cmdName);
    if (cmd && this.props.invokeCommand) {
      this.props.invokeCommand(cmd);
    }
  }
  ClearSelection() {
    var _a, _b;
    (_b = (_a = this.props.viewer) == null ? void 0 : _a.mapguideSupport()) == null ? void 0 : _b.clearSelection();
  }
  DigitizeCircle(handler) {
    const { viewer } = this.props;
    if (viewer.isReady()) {
      viewer.digitizeCircle((circle) => {
        const center = circle.getCenter();
        const radius = circle.getRadius();
        handler({
          Center: {
            X: center[0],
            Y: center[1]
          },
          Radius: radius
        });
      });
    }
  }
  DigitizeLine(handler) {
    const { viewer } = this.props;
    if (viewer.isReady()) {
      viewer.digitizeLine((line) => {
        const coords = line.getCoordinates().map((coord) => {
          return {
            X: coord[0],
            Y: coord[1]
          };
        });
        handler(new AjaxViewerLineStringOrPolygon(coords));
      });
    }
  }
  DigitizePoint(handler) {
    const { viewer } = this.props;
    if (viewer.isReady()) {
      viewer.digitizePoint((pt) => {
        const coords = pt.getCoordinates();
        handler({ X: coords[0], Y: coords[1] });
      });
    }
  }
  DigitizePolygon(handler) {
    const { viewer } = this.props;
    if (viewer.isReady()) {
      viewer.digitizePolygon((poly) => {
        const ring = poly.getLinearRing(0);
        if (ring) {
          const coords = ring.getCoordinates().map((coord) => {
            return {
              X: coord[0],
              Y: coord[1]
            };
          });
          handler(new AjaxViewerLineStringOrPolygon(coords));
        }
      });
    }
  }
  DigitizeLineString(handler) {
    const { viewer } = this.props;
    if (viewer.isReady()) {
      viewer.digitizeLineString((line) => {
        const coords = line.getCoordinates().map((coord) => {
          return {
            X: coord[0],
            Y: coord[1]
          };
        });
        handler(new AjaxViewerLineStringOrPolygon(coords));
      });
    }
  }
  DigitizeRectangle(handler) {
    const { viewer } = this.props;
    if (viewer.isReady()) {
      viewer.digitizeRectangle((rect) => {
        const extent = rect.getExtent();
        handler({
          Point1: {
            X: extent[0],
            Y: extent[1]
          },
          Point2: {
            X: extent[2],
            Y: extent[3]
          }
        });
      });
    }
  }
  GetCenter() {
    const { viewer } = this.props;
    if (viewer.isReady()) {
      const view = viewer.getCurrentView();
      return { X: view.x, Y: view.y };
    }
    return null;
  }
  GetLayers(onlyVisible, onlySelectable) {
    const selLayers = [];
    const { map, selectionSet } = this.props;
    if (map && selectionSet && selectionSet.FeatureSet) {
      const fset = selectionSet.FeatureSet;
      const ids = fset.Layer.map((l) => l["@id"]);
      if (map.Layer) {
        for (const layer of map.Layer) {
          if (ids.indexOf(layer.ObjectId) >= 0) {
            if (onlyVisible === true && layer.Visible === true) {
              selLayers.push({ legend: layer.LegendLabel, name: layer.Name, objectid: layer.ObjectId });
            }
            if (onlySelectable === true && layer.Selectable === true) {
              selLayers.push({ legend: layer.LegendLabel, name: layer.Name, objectid: layer.ObjectId });
            }
          }
        }
      }
    }
    return selLayers;
  }
  GetMetersPerUnit() {
    const { viewer } = this.props;
    if (viewer.isReady()) {
      return viewer.getMetersPerUnit();
    }
    return null;
  }
  GetMapHeight() {
    const { viewer } = this.props;
    if (viewer.isReady()) {
      const [, gh] = viewer.getSize();
      return gh;
    }
    return NaN;
  }
  GetMapUnitsType() {
    const uom = getUnitOfMeasure(this.props.sizeUnits || UnitOfMeasure.Unknown);
    return uom.name;
  }
  GetMapWidth() {
    const { viewer } = this.props;
    if (viewer.isReady()) {
      const [gw] = viewer.getSize();
      return gw;
    }
    return NaN;
  }
  GetScale() {
    const { viewer } = this.props;
    if (viewer.isReady()) {
      const view = viewer.getCurrentView();
      return view.scale;
    }
    return null;
  }
  GetSelectedLayers() {
    const selLayers = [];
    const { map, selectionSet } = this.props;
    if (map && selectionSet && selectionSet.FeatureSet) {
      const fset = selectionSet.FeatureSet;
      const ids = fset.Layer.map((l) => l["@id"]);
      if (map.Layer) {
        for (const layer of map.Layer) {
          if (ids.indexOf(layer.ObjectId) >= 0) {
            selLayers.push({ legend: layer.LegendLabel, name: layer.Name, objectid: layer.ObjectId });
          }
        }
      }
    }
    return selLayers;
  }
  GetSelectionXML() {
    const { selectionSet } = this.props;
    if (!selectionSet || !selectionSet.FeatureSet) {
      return "";
    } else {
      return buildSelectionXml(selectionSet.FeatureSet);
    }
  }
  GetSelectedBounds() {
    let bounds = null;
    const { selectionSet } = this.props;
    if (selectionSet && selectionSet.SelectedFeatures) {
      const fset = selectionSet.SelectedFeatures;
      fset.SelectedLayer.forEach((layer) => {
        layer.Feature.forEach((feature) => {
          const bbox = feature.Bounds ? feature.Bounds.split(" ").map((s) => parseFloat(s)) : void 0;
          if (bbox) {
            if (bounds == null) {
              bounds = { minx: bbox[0], miny: bbox[1], maxx: bbox[2], maxy: bbox[3] };
            } else {
              if (bbox[0] < bounds.minx)
                bounds.minx = bbox[0];
              if (bbox[1] < bounds.miny)
                bounds.miny = bbox[1];
              if (bbox[2] > bounds.maxx)
                bounds.maxx = bbox[2];
              if (bbox[3] > bounds.maxy)
                bounds.maxy = bbox[3];
            }
          }
        });
      });
    }
    return bounds;
  }
  GetSelectedCount() {
    let count = 0;
    const { selectionSet } = this.props;
    if (selectionSet && selectionSet.FeatureSet) {
      const fset = selectionSet.FeatureSet;
      fset.Layer.forEach((layer) => {
        layer.Class.ID.forEach(() => {
          count++;
        });
      });
    }
    return count;
  }
  GetSelectedFeatures() {
    var _a;
    const viewer = ((_a = this.props.viewer) == null ? void 0 : _a.isReady()) == true ? this.props.viewer.mapguideSupport() : void 0;
    if (viewer) {
      const selection = viewer.getSelection();
      if (selection && selection.SelectedFeatures) {
        const sel = {};
        for (const sl of selection.SelectedFeatures.SelectedLayer) {
          sel[sl["@name"]] = sl.Feature.map((f) => {
            if (f.Bounds) {
              const bbox = f.Bounds.split(" ").map((s) => parseFloat(s));
              return {
                zoom: { minx: bbox[0], miny: bbox[1], maxx: bbox[2], maxy: bbox[3] },
                values: f.Property.map((p) => ({ name: p.Name, value: p.Value }))
              };
            }
            return void 0;
          }).filter((f) => f != null);
        }
        return sel;
      }
    }
  }
  IsDigitizing() {
    const { viewer } = this.props;
    if (viewer.isReady()) {
      return viewer.isDigitizing();
    } else {
      return false;
    }
  }
  IsEnglishUnits() {
    return this.us;
  }
  IsLatLongDisplayUnits() {
    return true;
  }
  MapUnitsToLatLon() {
    throw new MgError(`Un-implemented AJAX viewer shim API: map_frame.MapUnitsToLatLon(x, y)`);
  }
  Refresh() {
    var _a, _b;
    const { viewer } = this.props;
    if (viewer.isReady()) {
      viewer == null ? void 0 : viewer.refreshMap(RefreshMode.LayersOnly | RefreshMode.SelectionOnly);
      (_b = (_a = this.props).legendRefresh) == null ? void 0 : _b.call(_a);
    }
  }
  ScreenToMapUnits(x, y) {
    const { viewer } = this.props;
    if (viewer.isReady()) {
      const [sx, sy] = viewer.screenToMapUnits(x, y);
      return { X: sx, Y: sy };
    }
  }
  SetEnglishUnits(usEnglish) {
    this.us = usEnglish;
  }
  SetLatLongDisplayUnits() {
  }
  SetSelectionXML(xmlSet) {
    var _a;
    const viewer = ((_a = this.props.viewer) == null ? void 0 : _a.isReady()) == true ? this.props.viewer.mapguideSupport() : void 0;
    if (viewer) {
      viewer.setSelectionXml(xmlSet);
    }
  }
  ZoomToView(x, y, scale) {
    const { viewer } = this.props;
    if (viewer.isReady()) {
      viewer.zoomToView(x, y, scale);
    }
  }
  SetStatusMsg(msg) {
    window.status = msg || "";
  }
  //This isn't in the AJAX Viewer API reference, but there are samples referencing it!
  ZoomToScale(scale) {
    const { viewer } = this.props;
    if (viewer.isReady()) {
      const view = viewer.getCurrentView();
      viewer.zoomToView(view.x, view.y, scale);
    }
  }
  //Form frame
  Submit(url, params, frameTarget) {
    this.formFrame.submit(url, params, frameTarget);
  }
  RegisterSelectionHandler(handler) {
    this.userSelectionHandlers.push(handler);
    return this.userSelectionHandlers.length;
  }
  UnregisterSelectionHandler(handler) {
    this.userSelectionHandlers = this.userSelectionHandlers.filter((h) => h != handler);
    return this.userSelectionHandlers.length;
  }
  installShims(browserWindow) {
    browserWindow.Fusion = this.fusionAPI;
    browserWindow.OpenLayers = this.ol2API;
    browserWindow.GetMapFrame = browserWindow.GetMapFrame || (() => this);
    browserWindow.mapFrame = browserWindow.GetMapFrame();
    browserWindow.formFrame = browserWindow.mapFrame;
    browserWindow.ExecuteMapAction = browserWindow.ExecuteMapAction || ((code) => this.ExecuteMapAction(code));
    browserWindow.Refresh = browserWindow.Refresh || (() => this.Refresh());
    browserWindow.SetSelectionXML = browserWindow.SetSelectionXML || ((xmlSet) => this.SetSelectionXML(xmlSet));
    browserWindow.ZoomToView = browserWindow.ZoomToView || ((x, y, scale) => this.ZoomToView(x, y, scale));
    browserWindow.GotoHomePage = browserWindow.GotoHomePage || (() => this.goHome());
    browserWindow.GetViewerInterface = browserWindow.GetViewerInterface || (() => this.props.viewer);
    browserWindow.RegisterSelectionHandler = browserWindow.RegisterSelectionHandler || ((handler) => this.RegisterSelectionHandler(handler));
    browserWindow.UnregisterSelectionHandler = browserWindow.UnregisterSelectionHandler || ((handler) => this.UnregisterSelectionHandler(handler));
  }
  componentDidMount() {
    let browserWindow = window;
    this.installShims(browserWindow);
    try {
      this.installShims(window.parent);
    } catch (e) {
      debug("Could not install shims into parent window due to cross-origin restrictions");
    }
    this.RegisterSelectionHandler((_mapName, selection) => {
      this.fusionSelectionHandler(selection);
    });
  }
  componentDidUpdate(prevProps) {
    var _a;
    const nextProps = this.props;
    if (nextProps.map && nextProps.selectionSet != prevProps.selectionSet) {
      for (const handler of this.userSelectionHandlers) {
        handler(nextProps.map.Name, (_a = nextProps.selectionSet) != null ? _a : void 0);
      }
    }
    if (nextProps.busyCount != prevProps.busyCount) {
      this.triggerFusionEvent(this.fusionAPI.Event.MAP_BUSY_CHANGED);
    }
  }
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormFrameShim, { ref: this.onFormFrameMounted }) });
  }
}
const ViewerApiShim = () => {
  const map = useActiveMapState();
  const selectionSet = useActiveMapSelectionSet();
  const agentUri = useConfiguredAgentUri();
  const agentKind = useConfiguredAgentKind();
  const busyCount = useViewerBusyCount();
  const sizeUnits = useViewerSizeUnits();
  const viewer = useMapProviderContext();
  const dispatch = useReduxDispatch();
  const goHomeAction = () => dispatch(goHome());
  const legendRefresh = () => dispatch(refresh());
  const invokeCommandAction = (cmd, parameters) => dispatch(invokeCommand(cmd, viewer, parameters));
  const setSelectionAction = (mapName, res) => dispatch(setSelection(mapName, res));
  const queryMapFeaturesAction = (mapName, options) => dispatch(queryMapFeatures(mapName, options));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ViewerApiShimInner,
    {
      map,
      viewer,
      selectionSet,
      agentUri,
      agentKind,
      busyCount,
      sizeUnits,
      goHome: goHomeAction,
      legendRefresh,
      invokeCommand: invokeCommandAction,
      setSelection: setSelectionAction,
      queryMapFeatures: queryMapFeaturesAction
    }
  );
};
const DIAG_HEADER_HEIGHT = 40;
const RndModalDialog = (props) => {
  const { Icon: Icon2, Button, NonIdealState, Heading, DialogContainer, DialogShell, DialogHeader, DialogBody } = useElementContext();
  if (props.isOpen === false)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {});
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [isResizing, setIsResizing] = reactExports.useState(false);
  const [diagWidth, setDiagWidth] = reactExports.useState(props.width);
  const [diagHeight, setDiagHeight] = reactExports.useState(props.height);
  const modalBodyStyle = {
    margin: 0,
    height: diagHeight - DIAG_HEADER_HEIGHT,
    boxSizing: "border-box",
    overflow: "hidden"
  };
  if (!props.disableYOverflow) {
    modalBodyStyle.overflowY = "auto";
  }
  const [diagX, setDiagX] = reactExports.useState(props.x);
  const [diagY, setDiagY] = reactExports.useState(props.y);
  const ZINDEX = {
    zIndex: 1980
    //So flyouts will appear above it
  };
  const modalStyle = __spreadValues({
    width: diagWidth,
    height: diagHeight,
    minWidth: diagWidth,
    maxWidth: diagWidth,
    //bp defaults this to 30, which invisibly offsets the 
    //position of expected rnd drag/resize handles
    marginTop: 0
  }, ZINDEX);
  const rndStyle = __spreadValues({}, ZINDEX);
  const diagSize = [diagWidth, diagHeight - DIAG_HEADER_HEIGHT];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Rnd,
    {
      style: rndStyle,
      enableResizing: {
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
        topRight: true
      },
      enableUserSelectHack: false,
      onDragStart: () => setIsDragging(true),
      onDragStop: (e, d) => {
        var _a;
        setDiagX(d.x);
        setDiagY(d.y);
        setIsDragging(false);
        const args = {
          x: d.x,
          y: d.y,
          width: diagWidth,
          height: diagHeight
        };
        (_a = props.onChange) == null ? void 0 : _a.call(props, args);
      },
      onResizeStart: () => setIsResizing(true),
      onResize: (e, direction, ref, delta, position) => {
        setDiagWidth(ref.offsetWidth);
        setDiagHeight(ref.offsetHeight);
        setDiagX(position.x);
        setDiagY(position.y);
      },
      onResizeStop: (e, direction, ref, delta, position) => {
        var _a;
        setDiagWidth(ref.offsetWidth);
        setDiagHeight(ref.offsetHeight);
        setDiagX(position.x);
        setDiagY(position.y);
        setIsResizing(false);
        const args = {
          x: position.x,
          y: position.y,
          width: ref.offsetWidth,
          height: ref.offsetHeight
        };
        (_a = props.onChange) == null ? void 0 : _a.call(props, args);
      },
      dragHandleClassName: "mrl-modal-diag-drag-handle",
      cancel: ".mrl-modal-diag-close-btn",
      default: { x: props.x, y: props.y, width: props.width, height: props.height },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogShell, { style: modalStyle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "noselect mrl-modal-diag-drag-handle mrl-rnd-modal-header", children: [
          props.icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { icon: props.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 4, children: props.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mrl-modal-diag-close-btn", onClick: props.onClose, "aria-label": tr("ACTION_CLOSE", props.locale), minimal: true, icon: "small-cross" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { className: "mrl-rnd-modal-body", style: modalBodyStyle, children: (() => {
          if (props.enableInteractionMask && (isResizing || isDragging)) {
            const key = isResizing ? "WINDOW_RESIZING" : "WINDOW_MOVING";
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              NonIdealState,
              {
                icon: "arrows-horizontal",
                description: tr(key, props.locale)
              }
            );
          } else {
            return props.children(diagSize);
          }
        })() })
      ] }) })
    }
  );
};
function getComponentId(diag) {
  if (isModalComponentDisplayOptions(diag)) {
    return { name: diag.component, props: {} };
  } else if (isModalDisplayOptions(diag)) {
    return parseComponentUri(diag.url);
  } else {
    assertNever();
  }
}
const ModalLauncher = (props) => {
  const dispatch = useReduxDispatch();
  const hideModalAction = (name) => dispatch(hideModal(name));
  const onCloseModal = (name) => hideModalAction(name);
  const modal = useAppState((state) => state.modal);
  const locale = useViewerLocale();
  const onModalChanged = (name, args) => {
    dispatch(updateModal(name, args));
  };
  if (!modal) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("noscript", {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    Object.keys(modal).map((key) => {
      var _a, _b;
      const diag = modal[key];
      const pos = (_a = diag.modal.position) != null ? _a : DEFAULT_MODAL_POSITION;
      const size = (_b = diag.modal.size) != null ? _b : DEFAULT_MODAL_SIZE;
      if (isModalComponentDisplayOptions(diag) || isModalDisplayOptions(diag) && isComponentUri(diag.url)) {
        const componentId = getComponentId(diag);
        if (componentId) {
          const componentRenderer = getComponentFactory(componentId.name);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            RndModalDialog,
            {
              title: diag.modal.title,
              x: pos[0],
              y: pos[1],
              locale,
              enableInteractionMask: true,
              width: size[0],
              height: size[1],
              disableYOverflow: !diag.modal.overflowYScroll,
              isOpen: true,
              onChange: (args) => onModalChanged(key, args),
              onClose: () => onCloseModal(key),
              children: ([]) => {
                if (componentRenderer) {
                  if (isModalComponentDisplayOptions(diag))
                    return componentRenderer(diag.componentProps);
                  else
                    return componentRenderer(componentId.props);
                } else {
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(Error$1, { error: tr("ERR_UNREGISTERED_COMPONENT", locale, { componentId }) });
                }
              }
            },
            key
          );
        } else {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Error$1, { error: tr("ERR_NO_COMPONENT_ID", locale) });
        }
      } else if (isModalDisplayOptions(diag)) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          RndModalDialog,
          {
            title: diag.modal.title,
            isOpen: true,
            x: pos[0],
            y: pos[1],
            locale,
            enableInteractionMask: false,
            width: size[0],
            height: size[1],
            onChange: (args) => onModalChanged(key, args),
            onClose: () => onCloseModal(key),
            children: ([w, h]) => /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { frameBorder: 0, src: diag.url, width: w, height: h })
          },
          key
        );
      }
    }),
    props.children
  ] });
};
const layouts = {};
const layoutCaps = {};
function getLayoutCapabilities(name) {
  return layoutCaps[name];
}
function registerLayout(name, factory, caps) {
  layouts[name] = factory;
  layoutCaps[name] = caps;
}
function getLayout(name) {
  return layouts[name];
}
function isWebLayout(arg) {
  return arg.CommandSet != null && arg.ContextMenu != null && arg.Map != null;
}
function isAppDef(arg) {
  return arg.WidgetSet != null;
}
var GenericSubjectLayerType = /* @__PURE__ */ ((GenericSubjectLayerType2) => {
  GenericSubjectLayerType2["TileWMS"] = "TileWMS";
  GenericSubjectLayerType2["CSV"] = "CSV";
  GenericSubjectLayerType2["KML"] = "KML";
  GenericSubjectLayerType2["GeoJSON"] = "GeoJSON";
  GenericSubjectLayerType2["GeoJSON_Inline"] = "GeoJSON_Inline";
  GenericSubjectLayerType2["CustomVector"] = "CustomVector";
  GenericSubjectLayerType2["MVT"] = "MVT";
  GenericSubjectLayerType2["XYZ"] = "XYZ";
  GenericSubjectLayerType2["StaticImage"] = "StaticImage";
  GenericSubjectLayerType2["WFS"] = "WFS";
  GenericSubjectLayerType2["GeoTIFF"] = "GeoTIFF";
  return GenericSubjectLayerType2;
})(GenericSubjectLayerType || {});
function isGenericSubjectMapLayer(map) {
  return typeof (map == null ? void 0 : map.type) == "string";
}
function parseComparisonPairs(appDef) {
  var _a;
  const pairs = [];
  const seen = /* @__PURE__ */ new Set();
  if (!((_a = appDef.MapSet) == null ? void 0 : _a.MapGroup)) {
    return pairs;
  }
  for (const mg of appDef.MapSet.MapGroup) {
    const ext = mg.Extension;
    if (!ext) {
      continue;
    }
    const comparisonPairWith = ext.ComparisonPairWith;
    const comparisonPrimary = ext.ComparisonPrimary;
    if (comparisonPairWith && (comparisonPrimary == null ? void 0 : comparisonPrimary.toLowerCase()) === "true") {
      const primaryId = mg["@id"];
      const pairKey = [primaryId, comparisonPairWith].sort().join("|");
      if (!seen.has(pairKey)) {
        seen.add(pairKey);
        const primaryLabel = ext.ComparisonPrimaryLabel;
        const secondaryLabel = ext.ComparisonSecondaryLabel;
        pairs.push(__spreadValues(__spreadValues({
          primaryMapName: primaryId,
          secondaryMapName: comparisonPairWith
        }, primaryLabel ? { primaryLabel } : {}), secondaryLabel ? { secondaryLabel } : {}));
      }
    }
  }
  return pairs;
}
function parseMapGroupCoordinateFormat(mapGroup) {
  var _a, _b;
  const ext = (_b = (_a = mapGroup.Map) == null ? void 0 : _a[0]) == null ? void 0 : _b.Extension;
  if (!ext) {
    return void 0;
  }
  const candidate = ext.MouseCoordinatesFormat;
  if (typeof candidate === "string" && candidate.trim().length > 0) {
    return candidate;
  }
  return void 0;
}
const TYPE_SUBJECT$1 = "SubjectLayer";
function getMapGuideConfiguration(appDef) {
  const configs = [];
  if (appDef.MapSet) {
    for (const mg of appDef.MapSet.MapGroup) {
      for (const map of mg.Map) {
        if (map.Type == "MapGuide") {
          configs.push([mg["@id"], map]);
        }
      }
    }
  }
  return configs;
}
function tryExtractMapMetadata(extension) {
  const ext = {};
  for (const k in extension) {
    if (strStartsWith(k, "Meta_")) {
      const sk = k.substring("Meta_".length);
      ext[sk] = extension[k];
    }
  }
  return ext;
}
function buildSubjectLayerDefn(name, map) {
  var _a, _b, _c;
  const st = map.Extension.source_type;
  const initiallyVisible = (_a = map.Extension.initially_visible) != null ? _a : true;
  const sp = {};
  const lo = {};
  const meta = {};
  const keys = Object.keys(map.Extension);
  let popupTemplate = map.Extension.popup_template;
  let selectable = (_b = map.Extension.is_selectable) != null ? _b : true;
  let disableHover = (_c = map.Extension.disable_hover) != null ? _c : false;
  for (const k of keys) {
    const spidx = k.indexOf("source_param_");
    const loidx = k.indexOf("layer_opt_");
    const midx = k.indexOf("meta_");
    if (spidx == 0) {
      const kn = k.substring("source_param_".length);
      sp[kn] = map.Extension[k];
    } else if (loidx == 0) {
      const kn = k.substring("layer_opt_".length);
      lo[kn] = map.Extension[k];
    } else if (midx == 0) {
      const kn = k.substring("meta_".length);
      meta[kn] = map.Extension[k];
    }
  }
  const sl = {
    name,
    description: map.Extension.layer_description,
    displayName: map.Extension.display_name,
    driverName: map.Extension.driver_name,
    type: st,
    layerOptions: lo,
    sourceParams: sp,
    meta: Object.keys(meta).length > 0 ? meta : void 0,
    initiallyVisible,
    selectable,
    disableHover,
    popupTemplate,
    vectorStyle: map.Extension.vector_layer_style
  };
  if (map.Extension.cluster) {
    sl.cluster = __spreadValues({}, map.Extension.cluster);
  }
  return sl;
}
function getMapDefinitionsFromFlexLayout(appDef) {
  var _a;
  const maps = [];
  const configs = getMapGuideConfiguration(appDef);
  if (configs.length > 0) {
    for (const c of configs) {
      maps.push({
        name: c[0],
        mapDef: c[1].Extension.ResourceId,
        metadata: tryExtractMapMetadata(c[1].Extension)
      });
    }
  }
  if ((_a = appDef.MapSet) == null ? void 0 : _a.MapGroup) {
    for (const mGroup of appDef.MapSet.MapGroup) {
      for (const map of mGroup.Map) {
        if (map.Type == TYPE_SUBJECT$1) {
          const name = mGroup["@id"];
          maps.push(buildSubjectLayerDefn(name, map));
        }
      }
    }
  }
  if (maps.length == 0)
    throw new MgError("No Map Definition or subject layer found in Application Definition");
  return maps;
}
function isMapDefinition(arg) {
  return arg.mapDef != null;
}
function isStateless(appDef) {
  var _a;
  if (((_a = appDef.Extension) == null ? void 0 : _a.Stateless) == "true")
    return true;
  try {
    const maps = getMapDefinitionsFromFlexLayout(appDef);
    for (const m of maps) {
      if (isMapDefinition(m)) {
        return false;
      }
    }
    return true;
  } catch (e) {
    return true;
  }
}
function getExtraProjectionsFromFlexLayout(appDef) {
  const epsgs = [];
  for (const ws of appDef.WidgetSet) {
    for (const w of ws.Widget) {
      if (w.Type == "CoordinateTracker") {
        const ps = w.Extension.Projection || [];
        for (const p of ps) {
          epsgs.push(p.split(":")[1]);
        }
      } else if (w.Type == "CursorPosition") {
        const dp = w.Extension.DisplayProjection;
        if (dp) {
          epsgs.push(dp.split(":")[1]);
        }
      }
    }
  }
  return makeUnique(epsgs);
}
function isCommandItem(item) {
  return item.Function === "Command";
}
function isFlyoutItem(item) {
  return item.Function === "Flyout";
}
function isSeparatorItem(item) {
  return item.Function === "Separator";
}
function isBasicCommand(cmd) {
  return typeof cmd.Action != "undefined";
}
function isTargetedCommand(cmd) {
  return typeof cmd.Target != "undefined";
}
function isInvokeURLCommand(cmd) {
  return typeof cmd.URL != "undefined" && typeof cmd.DisableIfSelectionEmpty != "undefined";
}
function isSearchCommand(cmd) {
  return cmd["@xsi:type"] == "SearchCommandType";
}
class ScopedId {
  constructor(counter = 0) {
    this.counter = counter;
  }
  next() {
    return this.counter++;
  }
}
const scopedId$2 = new ScopedId();
function isCommandSpec(cmd) {
  return !strIsNullOrEmpty(cmd.command);
}
function isUIWidget(widget) {
  return widget.WidgetType === "UiWidgetType" || widget["@xsi:type"] === "UiWidgetType";
}
function isFlyoutSpec(item) {
  return typeof item.children != "undefined";
}
function makeCommand(widget, noToolbarLabels, cmdType) {
  return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: cmdType, label: noToolbarLabels ? null : widget.Label, tooltip: widget.Tooltip, parameters: widget.Extension };
}
function convertWidget(widget, locale, noToolbarLabels) {
  switch (widget.Type) {
    case "Select":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.Select);
    case "Pan":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.Pan);
    case "Zoom":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.Zoom);
    case "ZoomOnClick": {
      const factor = parseFloat(widget.Extension.Factor);
      if (factor >= 1) {
        return makeCommand(widget, noToolbarLabels, DefaultCommands.ZoomIn);
      } else {
        return makeCommand(widget, noToolbarLabels, DefaultCommands.ZoomOut);
      }
    }
    case "InitialMapView":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.ZoomExtents);
    case "ZoomToSelection":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.ZoomToSelection);
    case "ExtentHistory": {
      if (widget.Extension.Direction == "previous") {
        return makeCommand(widget, noToolbarLabels, DefaultCommands.PreviousView);
      } else {
        return makeCommand(widget, noToolbarLabels, DefaultCommands.NextView);
      }
    }
    case "CenterSelection":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.CenterSelection);
    case "About":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.About);
    case "BufferPanel":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.Buffer);
    case "ClearSelection":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.ClearSelection);
    case "CoordinateTracker":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.CoordinateTracker);
    case "FeatureInfo":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.FeatureInfo);
    case "Geolocation":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.Geolocation);
    case "Help":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.Help);
    case "Maptip":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.MapTip);
    case "MapMenu":
      return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, label: noToolbarLabels ? null : widget.Label, tooltip: widget.Tooltip, componentName: DefaultComponentNames.MapMenu, flyoutId: `${DefaultComponentNames.MapMenu}_${scopedId$2.next()}`, parameters: widget.Extension };
    case "Query":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.Query);
    case "QuickPlot":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.QuickPlot);
    case "Redline":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.Redline);
    case "RefreshMap":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.RefreshMap);
    case "InvokeURL":
    case "Search":
      return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: widget.Name, label: noToolbarLabels ? null : widget.Label, tooltip: widget.Tooltip, parameters: widget.Extension };
    case "SelectPolygon":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.SelectPolygon);
    case "SelectRadius":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.SelectRadius);
    case "SelectWithin":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.SelectWithin);
    case "Theme":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.Theme);
    case "ViewOptions":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.ViewerOptions);
    case "Measure":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.Measure);
    case "Print":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.Print);
    case "MapSwipe":
      return makeCommand(widget, noToolbarLabels, DefaultCommands.MapSwipe);
    case "BasemapSwitcher":
      return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, label: noToolbarLabels ? null : widget.Label, tooltip: widget.Tooltip, componentName: DefaultComponentNames.BaseMapSwitcher, flyoutId: `${DefaultComponentNames.BaseMapSwitcher}_${scopedId$2.next()}`, parameters: widget.Extension };
    case "InvokeScript":
      return { icon: widget.ImageUrl, spriteClass: widget.ImageClass, command: widget.Name, label: noToolbarLabels ? null : widget.Label, tooltip: widget.Tooltip, parameters: widget.Extension };
    default:
      return { error: tr("UNKNOWN_WIDGET", locale, { widget: widget.Type }) };
  }
}
function convertFlexLayoutUIItems(isStateless2, items, widgetsByKey, locale, noToolbarLabels = false) {
  const converted = (items || []).map((item) => {
    switch (item.Function) {
      case "Widget": {
        const widget = widgetsByKey[item.Widget];
        if (widget && isUIWidget(widget)) {
          const cmd = convertWidget(widget, locale, noToolbarLabels);
          if (isStateless2 && isCommandSpec(cmd) && !isSupportedCommandInStatelessMode(cmd.command)) {
            console.warn(`The widget (${widget.Name}) references a command (${cmd.command}) that is not supported in stateless mode. This widget will always be disabled`);
          }
          return cmd;
        }
      }
      case "Separator":
        return { isSeparator: true };
      case "Flyout":
        return {
          label: item.Label,
          tooltip: item.Tooltip,
          icon: item.ImageUrl,
          spriteClass: item.ImageClass,
          children: convertFlexLayoutUIItems(isStateless2, item.Item, widgetsByKey, locale)
        };
      default:
        assertNever();
    }
    return null;
  }).filter((i) => i != null).map((i) => i);
  return converted;
}
function tryTranslateImageUrlToSpriteClass(imageUrl) {
  switch (imageUrl) {
    case "../stdicons/icon_invokeurl.gif":
      return SPRITE_INVOKE_URL;
    case "../stdicons/icon_invokescript.gif":
      return SPRITE_INVOKE_SCRIPT;
  }
}
function convertWebLayoutUIItems(items, cmdsByKey, locale, noToolbarLabels = true) {
  const converted = (items || []).map((item) => {
    if (isCommandItem(item)) {
      const cmdDef = cmdsByKey[item.Command];
      if (!cmdDef) {
        warn(`Invalid reference to command: ${item.Command}`);
        return { error: tr("UNKNOWN_COMMAND_REFERENCE", locale, { command: item.Command }) };
      } else if (cmdDef.TargetViewer != "Dwf") {
        let icon = {};
        if (cmdDef.ImageURL) {
          icon.spriteClass = tryTranslateImageUrlToSpriteClass(cmdDef.ImageURL);
          if (!icon.spriteClass) {
            icon.icon = cmdDef.ImageURL;
          }
        }
        const commonParams = {};
        if (isTargetedCommand(cmdDef)) {
          commonParams.Target = cmdDef.Target;
          commonParams.TargetFrame = cmdDef.TargetFrame;
        }
        if (isBasicCommand(cmdDef)) {
          let action = cmdDef.Action;
          if (action == "ZoomRectangle") {
            action = DefaultCommands.Zoom;
          } else if (action == "FitToWindow") {
            action = DefaultCommands.ZoomExtents;
          } else if (action == "Refresh") {
            action = DefaultCommands.RefreshMap;
          }
          return __spreadValues({ command: action, label: noToolbarLabels ? null : cmdDef.Label, tooltip: cmdDef.Tooltip, parameters: commonParams }, icon);
        } else {
          switch (cmdDef["@xsi:type"]) {
            case "ViewOptionsCommandType":
              return { command: DefaultCommands.ViewerOptions, label: noToolbarLabels ? null : cmdDef.Label, tooltip: cmdDef.Tooltip, parameters: commonParams };
            case "MeasureCommandType":
              return { command: DefaultCommands.Measure, label: noToolbarLabels ? null : cmdDef.Label, tooltip: cmdDef.Tooltip, parameters: commonParams };
            case "HelpCommandType":
              return { command: DefaultCommands.Help, label: noToolbarLabels ? null : cmdDef.Label, tooltip: cmdDef.Tooltip, parameters: commonParams };
            case "BufferCommandType":
              return { command: DefaultCommands.Buffer, label: noToolbarLabels ? null : cmdDef.Label, tooltip: cmdDef.Tooltip, parameters: commonParams };
            case "SelectWithinCommandType":
              return { command: DefaultCommands.SelectWithin, label: noToolbarLabels ? null : cmdDef.Label, tooltip: cmdDef.Tooltip, parameters: commonParams };
            case "GetPrintablePageCommandType":
              return { command: DefaultCommands.QuickPlot, label: noToolbarLabels ? null : cmdDef.Label, tooltip: cmdDef.Tooltip, parameters: commonParams };
            default:
              return __spreadValues({ command: cmdDef.Name, label: noToolbarLabels ? null : cmdDef.Label, tooltip: cmdDef.Tooltip, parameters: commonParams }, icon);
          }
        }
      }
    } else if (isSeparatorItem(item)) {
      return { isSeparator: true };
    } else if (isFlyoutItem(item)) {
      return {
        label: item.Label,
        tooltip: item.Tooltip,
        children: convertWebLayoutUIItems(item.SubItem, cmdsByKey, locale, false)
      };
    } else {
      assertNever();
    }
    return null;
  }).filter((i) => i != null).map((i) => i);
  return converted;
}
function convertToCommandTarget(fusionCmdTarget) {
  if (strIsNullOrEmpty(fusionCmdTarget)) {
    return "NewWindow";
  }
  switch (fusionCmdTarget) {
    case "SearchWindow":
    case "InvokeUrlWindow":
      return "NewWindow";
    case "TaskPane":
      return "TaskPane";
    default:
      return "SpecifiedFrame";
  }
}
function parseWidgetsInAppDef(appDef, cmdRegister) {
  let taskPane;
  let viewSize;
  let hasLegend = false;
  let hasStatus = false;
  let hasNavigator = false;
  let hasSelectionPanel = false;
  let hasTaskBar = false;
  let initialTask;
  const isStatelessAppDef = isStateless(appDef);
  const widgetsByKey = {};
  for (const widgetSet of appDef.WidgetSet) {
    for (const widget of widgetSet.Widget) {
      const cmd = widget.Extension;
      switch (widget.Type) {
        case "TaskPane":
          taskPane = widget;
          break;
        case "ViewSize":
          viewSize = widget;
          break;
        case "Legend":
          hasLegend = true;
          break;
        case "SelectionPanel":
          hasSelectionPanel = true;
          break;
        case "CursorPosition":
        case "SelectionInfo":
          hasStatus = true;
          break;
        case "Navigator":
          hasNavigator = true;
          break;
        case "Search":
          cmdRegister(widget.Name, {
            layer: cmd.Layer,
            prompt: cmd.Prompt,
            resultColumns: cmd.ResultColumns,
            filter: cmd.Filter,
            matchLimit: cmd.MatchLimit,
            title: cmd.Title || (isUIWidget(widget) ? widget.Label : void 0),
            target: convertToCommandTarget(cmd.Target),
            targetFrame: cmd.Target
          });
          if (isStatelessAppDef) {
            console.warn(`The search command (${widget.Name}) is not supported in stateless mode. This widget will always be disabled`);
          }
          break;
        case "InvokeURL":
          cmdRegister(widget.Name, {
            url: cmd.Url,
            disableIfSelectionEmpty: cmd.DisableIfSelectionEmpty,
            target: convertToCommandTarget(cmd.Target),
            targetFrame: cmd.Target,
            parameters: (cmd.AdditionalParameter || []).map((p) => {
              return { name: p.Key, value: p.Value };
            }),
            title: isUIWidget(widget) ? widget.Label : void 0
          });
          break;
      }
      widgetsByKey[widget.Name] = widget;
    }
  }
  if (taskPane) {
    hasTaskBar = true;
    initialTask = taskPane.Extension.InitialTask || "server/TaskPane.html";
  } else {
    initialTask = "server/TaskPane.html";
  }
  return {
    taskPane,
    viewSize,
    initialTask,
    hasLegend,
    hasStatus,
    hasNavigator,
    hasSelectionPanel,
    hasTaskBar,
    isStateless: isStatelessAppDef,
    widgetsByKey
  };
}
function parseCommandsInWebLayout(webLayout, cmdRegister) {
  const cmdsByKey = {};
  for (const cmd of webLayout.CommandSet.Command) {
    if (isInvokeURLCommand(cmd)) {
      cmdRegister(cmd.Name, {
        url: cmd.URL,
        disableIfSelectionEmpty: cmd.DisableIfSelectionEmpty,
        target: cmd.Target,
        targetFrame: cmd.TargetFrame,
        parameters: (cmd.AdditionalParameter || []).map((p) => {
          return { name: p.Key, value: p.Value };
        }),
        title: cmd.Label
      });
    } else if (isSearchCommand(cmd)) {
      cmdRegister(cmd.Name, {
        layer: cmd.Layer,
        prompt: cmd.Prompt,
        target: cmd.Target,
        targetFrame: cmd.TargetFrame,
        resultColumns: cmd.ResultColumns,
        filter: cmd.Filter,
        matchLimit: cmd.MatchLimit,
        title: cmd.Label
      });
    }
    cmdsByKey[cmd.Name] = cmd;
  }
  return cmdsByKey;
}
function prepareSubMenus(tbConf) {
  const prepared = {
    toolbars: {},
    flyouts: {}
  };
  let bFoundContextMenu = false;
  for (const key in tbConf) {
    if (key == WEBLAYOUT_CONTEXTMENU) {
      bFoundContextMenu = true;
    }
    if (key == WEBLAYOUT_TASKMENU || key == WEBLAYOUT_CONTEXTMENU) {
      const flyoutId = key;
      prepared.flyouts[flyoutId] = {
        children: tbConf[key].items
      };
    } else {
      prepared.toolbars[key] = {
        items: []
      };
      for (const item of tbConf[key].items) {
        if (isFlyoutSpec(item) && key != WEBLAYOUT_CONTEXTMENU) {
          const flyoutId = `${item.label}_${scopedId$2.next()}`;
          prepared.toolbars[key].items.push({
            label: item.label,
            tooltip: item.tooltip,
            icon: item.icon,
            spriteClass: item.spriteClass,
            flyoutId
          });
          prepared.flyouts[flyoutId] = {
            children: item.children
          };
        } else {
          prepared.toolbars[key].items.push(item);
        }
      }
    }
  }
  return [prepared, bFoundContextMenu];
}
function assertIsDefined(val) {
  if (val === void 0 || val === null) {
    throw new Error(
      `Expected 'val' to be defined, but received ${val}`
    );
  }
}
function supportsTouch() {
  return "ontouchstart" in document.documentElement;
}
function isMobileViewport(minWidthPx = 767) {
  return window.matchMedia(`(max-width: ${minWidthPx}px)`).matches;
}
function supportsWebGL() {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  return gl instanceof WebGLRenderingContext;
}
const TYPE_SUBJECT = "SubjectLayer";
const TYPE_EXTERNAL = "External";
const scopedId$1 = new ScopedId();
function isArbitraryCoordSys(subject) {
  if (subject) {
    if (isRuntimeMap(subject)) {
      const arbCs = tryParseArbitraryCs(subject.CoordinateSystem.MentorCode);
      return arbCs != null;
    }
  }
  return false;
}
function establishInitialMapNameAndSession(mapsByName) {
  let firstMapName = "";
  let firstSessionId = "";
  for (const mapName in mapsByName) {
    if (!firstMapName && !firstSessionId) {
      const map = mapsByName[mapName];
      if (isRuntimeMap(map)) {
        firstMapName = map.Name;
        firstSessionId = map.SessionId;
        break;
      }
    }
  }
  return [firstMapName, firstSessionId];
}
function initLocaleAsync(dispatch, options) {
  return __async(this, null, function* () {
    const { locale } = options;
    if (locale != DEFAULT_LOCALE) {
      const r = yield fetch(`strings/${locale}.json`);
      if (r.ok) {
        const res = yield r.json();
        registerStringBundle(locale, res);
        dispatch({
          type: ActionType.SET_LOCALE,
          payload: locale
        });
        info(`Registered string bundle for locale: ${locale}`);
      } else {
        warn(`Failed to register string bundle for locale: ${locale}`);
      }
    }
  });
}
function initFromAppDefCoreAsync(appDef, options, mapsByName, warnings, pendingMapDefs) {
  return __async(this, null, function* () {
    var _a, _b;
    const {
      taskPane,
      hasTaskBar,
      hasStatus,
      hasNavigator,
      hasSelectionPanel,
      hasLegend,
      viewSize,
      widgetsByKey,
      isStateless: isStateless2,
      initialTask
    } = parseWidgetsInAppDef(appDef, registerCommand);
    const { locale, featureTooltipsEnabled } = options;
    const config = {};
    config.isStateless = isStateless2;
    const tbConf = {};
    for (const widgetSet of appDef.WidgetSet) {
      for (const cont of widgetSet.Container) {
        const tbName = cont.Name;
        tbConf[tbName] = { items: convertFlexLayoutUIItems(isStateless2, cont.Item, widgetsByKey, locale) };
      }
      for (const w of widgetSet.Widget) {
        if (w.Type == "CursorPosition") {
          config.coordinateProjection = w.Extension.DisplayProjection;
          config.coordinateDecimals = w.Extension.Precision;
          config.coordinateDisplayFormat = w.Extension.Template;
        }
      }
    }
    const mapsDict = mapsByName;
    const maps = setupMaps(appDef, mapsDict, config, warnings, locale, pendingMapDefs);
    if (appDef.Title) {
      document.title = appDef.Title || document.title;
    }
    const [firstMapName, firstSessionId] = establishInitialMapNameAndSession(mapsDict);
    const [tb, bFoundContextMenu] = prepareSubMenus(tbConf);
    if (!bFoundContextMenu) {
      warnings.push(tr("INIT_WARNING_NO_CONTEXT_MENU", locale, { containerName: WEBLAYOUT_CONTEXTMENU }));
    }
    const settings = {};
    if (Array.isArray((_b = (_a = appDef.Extension) == null ? void 0 : _a.ViewerSettings) == null ? void 0 : _b.Setting)) {
      for (const s of appDef.Extension.ViewerSettings.Setting) {
        const [sn] = s["@name"];
        const [sv] = s["@value"];
        settings[sn] = sv;
      }
    }
    const comparisonPairs = parseComparisonPairs(appDef);
    return normalizeInitPayload({
      appSettings: settings,
      activeMapName: firstMapName,
      initialUrl: ensureParameters(initialTask, firstMapName, firstSessionId, locale),
      featureTooltipsEnabled,
      locale,
      maps,
      config,
      capabilities: {
        hasTaskPane: taskPane != null,
        hasTaskBar,
        hasStatusBar: hasStatus,
        hasNavigator,
        hasSelectionPanel,
        hasLegend,
        hasToolbar: Object.keys(tbConf).length > 0,
        hasViewSize: viewSize != null
      },
      toolbars: tb,
      warnings,
      initialActiveTool: ActiveMapTool.Pan,
      comparisonPairs,
      mapSwipePairs: comparisonPairs
    }, options.layout);
  });
}
function getDesiredTargetMapName(mapDef) {
  const lastSlash = mapDef.lastIndexOf("/");
  const lastDot = mapDef.lastIndexOf(".");
  if (lastSlash >= 0 && lastDot >= 0 && lastDot > lastSlash) {
    return `${mapDef.substring(lastSlash + 1, lastDot)}`;
  } else {
    return `Map_${scopedId$1.next()}`;
  }
}
function initFromWebLayoutAsync(client, options, webLayout, session, sessionWasReused) {
  return __async(this, null, function* () {
    var _a;
    const [mapsByName, , warnings] = yield createRuntimeMapsAsync(client, options, session, webLayout, false, (wl) => [{ name: getDesiredTargetMapName(wl.Map.ResourceId), mapDef: wl.Map.ResourceId, metadata: {} }], () => [], sessionWasReused);
    const { locale, featureTooltipsEnabled } = options;
    const cmdsByKey = parseCommandsInWebLayout(webLayout, registerCommand);
    const mainToolbar = webLayout.ToolBar.Visible ? convertWebLayoutUIItems(webLayout.ToolBar.Button, cmdsByKey, locale) : [];
    const taskBar = webLayout.TaskPane.TaskBar.Visible ? convertWebLayoutUIItems(webLayout.TaskPane.TaskBar.MenuButton, cmdsByKey, locale, false) : [];
    const contextMenu = webLayout.ContextMenu.Visible ? convertWebLayoutUIItems(webLayout.ContextMenu.MenuItem, cmdsByKey, locale, false) : [];
    const config = {};
    if (webLayout.SelectionColor != null) {
      config.selectionColor = webLayout.SelectionColor;
    }
    if (webLayout.MapImageFormat != null) {
      config.imageFormat = webLayout.MapImageFormat;
    }
    if (webLayout.SelectionImageFormat != null) {
      config.selectionImageFormat = webLayout.SelectionImageFormat;
    }
    if (webLayout.PointSelectionBuffer != null) {
      config.pointSelectionBuffer = webLayout.PointSelectionBuffer;
    }
    let initialView = null;
    if (webLayout.Map.InitialView != null) {
      initialView = {
        x: webLayout.Map.InitialView.CenterX,
        y: webLayout.Map.InitialView.CenterY,
        scale: webLayout.Map.InitialView.Scale
      };
    }
    if (webLayout.Title != "") {
      document.title = webLayout.Title || document.title;
    }
    const maps = {};
    const [firstMapName, firstSessionId] = establishInitialMapNameAndSession(mapsByName);
    for (const mapName in mapsByName) {
      const map = mapsByName[mapName];
      maps[mapName] = {
        mapGroupId: mapName,
        map,
        externalBaseLayers: (_a = options.externalBaseLayers) != null ? _a : [],
        initialView
      };
    }
    const menus = {};
    menus[WEBLAYOUT_TOOLBAR] = {
      items: mainToolbar
    };
    menus[WEBLAYOUT_TASKMENU] = {
      items: taskBar
    };
    menus[WEBLAYOUT_CONTEXTMENU] = {
      items: contextMenu
    };
    const tb = prepareSubMenus(menus)[0];
    return {
      activeMapName: firstMapName,
      featureTooltipsEnabled,
      initialUrl: ensureParameters(webLayout.TaskPane.InitialTask || "server/TaskPane.html", firstMapName, firstSessionId, locale),
      initialTaskPaneWidth: webLayout.TaskPane.Width,
      initialInfoPaneWidth: webLayout.InformationPane.Width,
      maps,
      locale,
      config,
      capabilities: {
        hasTaskPane: webLayout.TaskPane.Visible,
        hasTaskBar: webLayout.TaskPane.TaskBar.Visible,
        hasStatusBar: webLayout.StatusBar.Visible,
        hasNavigator: webLayout.ZoomControl.Visible,
        hasSelectionPanel: webLayout.InformationPane.Visible && webLayout.InformationPane.PropertiesVisible,
        hasLegend: webLayout.InformationPane.Visible && webLayout.InformationPane.LegendVisible,
        hasToolbar: webLayout.ToolBar.Visible,
        hasViewSize: webLayout.StatusBar.Visible
      },
      toolbars: tb,
      warnings,
      initialActiveTool: ActiveMapTool.Pan
    };
  });
}
function createRuntimeMap(client, options, siteVersion) {
  return __async(this, null, function* () {
    let map;
    const sv = yield siteVersion.getValueAsync();
    if (canUseQueryMapFeaturesV4(parseSiteVersion(sv.Version))) {
      map = yield client.createRuntimeMap_v4(options);
    } else {
      map = yield client.createRuntimeMap(options);
    }
    return map;
  });
}
function describeRuntimeMap(client, options, siteVersion) {
  return __async(this, null, function* () {
    let map;
    const sv = yield siteVersion.getValueAsync();
    if (canUseQueryMapFeaturesV4(parseSiteVersion(sv.Version))) {
      map = yield client.describeRuntimeMap_v4(options);
    } else {
      map = yield client.describeRuntimeMap(options);
    }
    return map;
  });
}
function tryDescribeRuntimeMapAsync(client, mapName, session, mapDef, siteVersion) {
  return __async(this, null, function* () {
    try {
      const map = yield describeRuntimeMap(client, {
        mapname: mapName,
        requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
        session: yield session.getValueAsync()
      }, siteVersion);
      return map;
    } catch (e) {
      if (e.message === "MgResourceNotFoundException") {
        const map = yield createRuntimeMap(client, {
          mapDefinition: mapDef,
          requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
          session: yield session.getValueAsync(),
          targetMapName: mapName
        }, siteVersion);
        return map;
      }
      throw e;
    }
  });
}
function createRuntimeMapsAsync(client, options, session, res, isStateless2, mapDefSelector, projectionSelector, sessionWasReused) {
  return __async(this, null, function* () {
    var _a;
    const mapDefs = mapDefSelector(res);
    const mapPromises = [];
    const warnings = [];
    const { locale } = options;
    const fetchEpsgs = [];
    const pendingMapDefs = {};
    const siteVersion = new AsyncLazy(() => __async(this, null, function* () {
      assertIsDefined(client);
      const sv = yield client.getSiteVersion();
      return sv;
    }));
    const mapDefItems = mapDefs.filter(isMapDefinition);
    const canLazyLoad = !isStateless2 && mapDefItems.length > 1;
    const initialActiveMapName = options.initialActiveMap;
    const activeMapExistsInAppDef = !!initialActiveMapName && mapDefItems.some((mi) => mi.name === initialActiveMapName);
    if (isStateless2) {
      for (const m of mapDefs) {
        if (isMapDefinition(m)) {
          const siteVer = yield siteVersion.getValueAsync();
          assertIsDefined(client);
          mapPromises.push(describeRuntimeMapStateless(client, siteVer.Version, m));
        } else {
          const proj = (_a = m.meta) == null ? void 0 : _a.projection;
          if (!strIsNullOrEmpty(proj)) {
            const [_, epsg] = proj.split(":");
            if (!proj4.defs[`EPSG:${epsg}`]) {
              fetchEpsgs.push({ epsg, mapDef: m.name });
            }
          }
        }
      }
    } else {
      let isFirstMapDef = true;
      for (const m of mapDefs) {
        if (isMapDefinition(m)) {
          const isPrimaryMap = sessionWasReused && activeMapExistsInAppDef ? m.name === initialActiveMapName : isFirstMapDef;
          if (canLazyLoad && !isPrimaryMap) {
            info(`Deferring lazy creation of runtime map (${m.name}) for: ${m.mapDef}`);
            pendingMapDefs[m.name] = m;
          } else if (sessionWasReused) {
            info(`Session ID re-used. Attempting recovery of map state of: ${m.name}`);
            assertIsDefined(client);
            mapPromises.push(tryDescribeRuntimeMapAsync(client, m.name, session, m.mapDef, siteVersion));
          } else {
            info(`Creating runtime map state (${m.name}) for: ${m.mapDef}`);
            assertIsDefined(client);
            mapPromises.push(createRuntimeMap(client, {
              mapDefinition: m.mapDef,
              requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
              session: yield session.getValueAsync(),
              targetMapName: m.name
            }, siteVersion));
          }
          isFirstMapDef = false;
        }
      }
    }
    const maps = yield Promise.all(mapPromises);
    for (const m of maps) {
      const epsg = m.CoordinateSystem.EpsgCode;
      const mapDef = m.MapDefinition;
      const arbCs = tryParseArbitraryCs(m.CoordinateSystem.MentorCode);
      if (!arbCs) {
        if (epsg == "0") {
          throw new MgError(tr("INIT_ERROR_UNSUPPORTED_COORD_SYS", locale || DEFAULT_LOCALE, { mapDefinition: mapDef }));
        }
        if (!proj4.defs[`EPSG:${epsg}`]) {
          fetchEpsgs.push({ epsg, mapDef });
        }
      }
    }
    const extraEpsgs = projectionSelector(res);
    for (const e of extraEpsgs) {
      if (!proj4.defs[`EPSG:${e}`]) {
        fetchEpsgs.push({ epsg: e, mapDef: "" });
      }
    }
    yield Promise.all(fetchEpsgs.filter((fe) => !strIsNullOrEmpty(fe.epsg)).map((f) => resolveProjectionFromEpsgCodeAsync(f.epsg, locale, f.mapDef)));
    debug(`Register proj4 with OpenLayers`);
    register(proj4);
    const mapsByName = {};
    for (const map of maps) {
      mapsByName[map.Name] = map;
    }
    for (const gs of mapDefs) {
      if (!isMapDefinition(gs)) {
        mapsByName[gs.name] = gs;
      }
    }
    return [mapsByName, pendingMapDefs, warnings];
  });
}
function describeRuntimeMapStateless(client, siteVersion, m) {
  return __async(this, null, function* () {
    var _a, _b;
    const { name, mapDef, metadata } = m;
    const mdf = yield client.getResource(mapDef, { username: "Anonymous" });
    if (!mdf)
      throw new Error("Failed to fetch map def");
    const rt = {
      SessionId: "",
      Extents: {
        LowerLeftCoordinate: {
          X: mdf.Extents.MinX,
          Y: mdf.Extents.MinY
        },
        UpperRightCoordinate: {
          X: mdf.Extents.MaxX,
          Y: mdf.Extents.MaxY
        }
      },
      SiteVersion: siteVersion,
      Name: name,
      DisplayDpi: 96,
      BackgroundColor: mdf.BackgroundColor,
      MapDefinition: mapDef,
      CoordinateSystem: {
        // We are assuming the app def specifies this data in each <Map> entry as extension properties
        // beginning with "Meta_" (eg. Meta_MentorCode, Meta_EpsgCode, etc)
        MentorCode: metadata.MentorCode,
        EpsgCode: metadata.EpsgCode,
        MetersPerUnit: metadata.MetersPerUnit,
        Wkt: mdf.CoordinateSystem
      },
      IconMimeType: "image/png"
    };
    const groups = [];
    const layers = [];
    if (mdf.TileSetSource) {
      rt.TileSetDefinition = mdf.TileSetSource.ResourceId;
      const tsd = yield client.getResource(mdf.TileSetSource.ResourceId);
      if (tsd.TileStoreParameters.TileProvider == "Default") {
        const sTileWidth = (_a = tsd.TileStoreParameters.Parameter.find((p) => p.Name == "TileWidth")) == null ? void 0 : _a.Value;
        const sTileHeight = (_b = tsd.TileStoreParameters.Parameter.find((p) => p.Name == "TileHeight")) == null ? void 0 : _b.Value;
        if (!strIsNullOrEmpty(sTileWidth) && !strIsNullOrEmpty(sTileHeight)) {
          rt.TileWidth = parseInt(sTileWidth, 10);
          rt.TileHeight = parseInt(sTileHeight, 10);
        }
      } else if (tsd.TileStoreParameters.TileProvider == "XYZ") {
        rt.TileHeight = 256;
        rt.TileHeight = 256;
      }
      for (const bg of tsd.BaseMapLayerGroup) {
        groups.push({
          Name: bg.Name,
          DisplayInLegend: bg.ShowInLegend,
          LegendLabel: bg.LegendLabel,
          ObjectId: bg.Name,
          ExpandInLegend: bg.ExpandInLegend,
          Visible: bg.Visible,
          ActuallyVisible: bg.Visible,
          Type: 3
          /* BaseMapFromTileSet */
        });
        for (const lyr of bg.BaseMapLayer) {
          layers.push({
            Name: lyr.Name,
            DisplayInLegend: lyr.ShowInLegend,
            // We don't have stateless QUERYMAPFEATURES (yet), so there is no point actually respecting this flag
            Selectable: false,
            //lyr.Selectable,
            LegendLabel: lyr.LegendLabel,
            ExpandInLegend: lyr.ExpandInLegend,
            Visible: true,
            ParentId: bg.Name,
            ActuallyVisible: true,
            LayerDefinition: lyr.ResourceId,
            ObjectId: lyr.Name,
            Type: 2
            /* BaseMap */
          });
        }
      }
    }
    for (const grp of mdf.MapLayerGroup) {
      groups.push({
        Name: grp.Name,
        DisplayInLegend: grp.ShowInLegend,
        LegendLabel: grp.LegendLabel,
        ObjectId: grp.Name,
        ExpandInLegend: grp.ExpandInLegend,
        Visible: grp.Visible,
        ActuallyVisible: grp.Visible,
        Type: 1
        /* Normal */
      });
    }
    for (const lyr of mdf.MapLayer) {
      layers.push({
        Name: lyr.Name,
        DisplayInLegend: lyr.ShowInLegend,
        // We don't have stateless QUERYMAPFEATURES (yet), so there is no point actually respecting this flag
        Selectable: false,
        // lyr.Selectable,
        LegendLabel: lyr.LegendLabel,
        ExpandInLegend: lyr.ExpandInLegend,
        Visible: true,
        ParentId: lyr.Group,
        ActuallyVisible: true,
        LayerDefinition: lyr.ResourceId,
        ObjectId: lyr.Name,
        Type: 1
        /* Dynamic */
      });
    }
    rt.Group = groups;
    rt.Layer = layers;
    return rt;
  });
}
function setupMaps(appDef, mapsByName, config, warnings, locale, pendingMapDefs) {
  const dict = {};
  if (appDef.MapSet) {
    for (const mGroup of appDef.MapSet.MapGroup) {
      let mapName;
      const initExternalLayers = [];
      const externalBaseLayers = [];
      let subject;
      for (const map of mGroup.Map) {
        if (map.Type === "MapGuide") {
          if (!config.selectionColor && map.Extension.SelectionColor != null) {
            config.selectionColor = map.Extension.SelectionColor;
          }
          if (!config.imageFormat && map.Extension.ImageFormat != null) {
            config.imageFormat = map.Extension.ImageFormat;
          }
          if (!config.selectionImageFormat && map.Extension.SelectionFormat != null) {
            config.selectionImageFormat = map.Extension.SelectionFormat;
          }
          for (const name in mapsByName) {
            const mapDef = mapsByName[name];
            if (isRuntimeMap(mapDef) && mapDef.MapDefinition == map.Extension.ResourceId) {
              mapName = name;
              subject = mapDef;
              break;
            }
          }
          if (!mapName && pendingMapDefs) {
            const groupId = mGroup["@id"];
            if (pendingMapDefs[groupId]) {
              mapName = groupId;
            }
          }
        }
      }
      const isArbitrary = isArbitraryCoordSys(subject);
      for (const map of mGroup.Map) {
        if (map.Type == "MapGuide") {
          continue;
        }
        if (map.Type == TYPE_SUBJECT) {
          mapName = mGroup["@id"];
        } else {
          if (isArbitrary) {
            warnings.push(tr("INIT_WARNING_ARBITRARY_COORDSYS_INCOMPATIBLE_LAYER", locale, { mapId: mGroup["@id"], type: map.Type }));
          } else {
            if (map.Type == TYPE_EXTERNAL) {
              const layer = buildSubjectLayerDefn(map.Extension.layer_name, map);
              if (layer.type == GenericSubjectLayerType.GeoTIFF && !supportsWebGL()) {
                warnings.push(tr("INIT_WARNING_WEBGL_UNSUPPORTED", locale));
              }
              initExternalLayers.push(layer);
            } else {
              processLayerInMapGroup(map, warnings, config, appDef, externalBaseLayers);
            }
          }
        }
      }
      if (isArbitrary) {
        for (const wset of appDef.WidgetSet) {
          for (const widget of wset.Widget) {
            switch (widget.Type) {
              case "CoordinateTracker":
                warnings.push(tr("INIT_WARNING_ARBITRARY_COORDSYS_UNSUPPORTED_WIDGET", locale, { mapId: mGroup["@id"], widget: widget.Type }));
                break;
            }
          }
        }
      }
      applyInitialBaseLayerVisibility(externalBaseLayers);
      let initialView;
      if (mGroup.InitialView) {
        initialView = {
          x: mGroup.InitialView.CenterX,
          y: mGroup.InitialView.CenterY,
          scale: mGroup.InitialView.Scale
        };
      }
      if (mapName) {
        const coordinateFormat = parseMapGroupCoordinateFormat(mGroup);
        const pendingEntry = pendingMapDefs == null ? void 0 : pendingMapDefs[mapName];
        dict[mapName] = __spreadValues({
          mapGroupId: mGroup["@id"],
          map: mapsByName[mapName],
          initialView,
          externalBaseLayers,
          initialExternalLayers: initExternalLayers,
          coordinateFormat
        }, pendingEntry ? { mapDef: pendingEntry.mapDef, metadata: pendingEntry.metadata } : {});
      }
    }
  }
  return dict;
}
function initFromAppDefAsync(client, options, appDef, session, sessionWasReused) {
  return __async(this, null, function* () {
    var _a, _b;
    if (Array.isArray((_b = (_a = appDef.Extension) == null ? void 0 : _a.CustomProjections) == null ? void 0 : _b.Projection)) {
      for (const pd of appDef.Extension.CustomProjections.Projection) {
        let k, v;
        if (typeof pd.epsg === "string" && typeof pd.text === "string") {
          k = pd.epsg;
          v = pd.text;
        } else {
          const [epsg] = pd["@epsg"];
          const [projStr] = pd["#text"];
          k = epsg;
          v = projStr;
        }
        if (!strIsNullOrEmpty(k) && !strIsNullOrEmpty(v)) {
          proj4.defs(`EPSG:${k}`, v);
          debug(`Registered proj4 defn from appdef for EPSG:${k}`, v);
        }
      }
      register(proj4);
    }
    const [mapsByName, pendingMapDefs, warnings] = yield createRuntimeMapsAsync(client, options, session, appDef, isStateless(appDef), (fl) => getMapDefinitionsFromFlexLayout(fl), (fl) => getExtraProjectionsFromFlexLayout(fl), sessionWasReused);
    return yield initFromAppDefCoreAsync(appDef, options, mapsByName, warnings, pendingMapDefs);
  });
}
function sessionAcquiredAsync(client, options, session, sessionWasReused) {
  return __async(this, null, function* () {
    const { resourceId, locale } = options;
    if (!resourceId) {
      const cl = new Client("", "mapagent");
      try {
        const fl = yield cl.get("appdef.json");
        return yield initFromAppDefAsync(client, options, fl, session, sessionWasReused);
      } catch (e) {
        throw new MgError(tr("INIT_ERROR_MISSING_RESOURCE_PARAM", locale));
      }
    } else {
      if (typeof resourceId == "string") {
        if (strEndsWith(resourceId, "WebLayout")) {
          assertIsDefined(client);
          const wl = yield client.getResource(resourceId, { SESSION: yield session.getValueAsync() });
          return yield initFromWebLayoutAsync(client, options, wl, session, sessionWasReused);
        } else if (strEndsWith(resourceId, "ApplicationDefinition")) {
          assertIsDefined(client);
          const fl = yield client.getResource(resourceId, { SESSION: yield session.getValueAsync() });
          return yield initFromAppDefAsync(client, options, fl, session, sessionWasReused);
        } else {
          if (isResourceId(resourceId)) {
            throw new MgError(tr("INIT_ERROR_UNKNOWN_RESOURCE_TYPE", locale, { resourceId }));
          } else {
            let fl;
            if (!client) {
              const cl = new Client("", "mapagent");
              fl = yield cl.get(resourceId);
            } else {
              fl = yield client.get(resourceId);
            }
            return yield initFromAppDefAsync(client, options, fl, session, sessionWasReused);
          }
        }
      } else {
        const doc = yield resourceId();
        if (isWebLayout(doc)) {
          const wl = doc;
          return yield initFromWebLayoutAsync(client, options, wl, session, sessionWasReused);
        }
        if (isAppDef(doc)) {
          const appDef = doc;
          return yield initFromAppDefAsync(client, options, appDef, session, sessionWasReused);
        }
        throw new MgError(tr("INIT_ERROR_UNKNOWN_RESOURCE_TYPE", locale, { resourceId: "[function resource loader]" }));
      }
    }
  });
}
function applyInitialBaseLayerVisibility(externalBaseLayers) {
  if (externalBaseLayers.length > 0) {
    const firstBase = externalBaseLayers.find((bl) => bl.kind != "UTFGrid");
    if (firstBase) {
      firstBase.visible = true;
    }
    const nonVisuals = externalBaseLayers.filter((bl) => bl.kind == "UTFGrid");
    for (const nv of nonVisuals) {
      nv.visible = true;
    }
  }
}
function processAndDispatchInitError(error2, includeStack, dispatch, opts) {
  if (error2.stack) {
    dispatch({
      type: ActionType.INIT_ERROR,
      payload: {
        error: {
          message: error2.message,
          stack: (error2.stack || "").split("\n")
        },
        includeStack,
        options: opts
      }
    });
  } else {
    dispatch({
      type: ActionType.INIT_ERROR,
      payload: {
        error: {
          message: error2.message,
          stack: []
        },
        includeStack,
        options: opts
      }
    });
  }
}
function normalizeInitPayload(payload, layout) {
  if (!strIsNullOrEmpty(layout)) {
    const caps = getLayoutCapabilities(layout);
    if (caps) {
      if (!caps.hasTaskPane) {
        debug("Overriding hasTaskPane capability to false");
        payload.capabilities.hasTaskPane = false;
      }
    }
  }
  return payload;
}
let _counter = 0;
function processLayerInMapGroup(map, warnings, config, appDef, externalBaseLayers) {
  var _a;
  switch (map.Type) {
    case "Google":
      warnings.push(tr("INIT_WARNING_UNSUPPORTED_GOOGLE_MAPS", config.locale));
      break;
    case "VirtualEarth":
      {
        const { name: name2, type } = map.Extension.Options;
        const sName2 = Array.isArray(name2) ? name2[0] : name2;
        const sType = Array.isArray(type) ? type[0] : type;
        const options = {};
        let bAdd = true;
        switch (sType) {
          case "Aerial":
          case "a":
            options.imagerySet = "Aerial";
            break;
          case "AerialWithLabels":
            options.imagerySet = "AerialWithLabels";
            break;
          case "Road":
            options.imagerySet = "Road";
            break;
          default:
            bAdd = false;
            warnings.push(tr("INIT_WARNING_BING_UNKNOWN_LAYER", config.locale, { type }));
            break;
        }
        if (appDef.Extension.BingMapKey) {
          options.key = appDef.Extension.BingMapKey;
        } else {
          bAdd = false;
          warnings.push(tr("INIT_WARNING_BING_API_KEY_REQD", config.locale));
        }
        if (bAdd) {
          externalBaseLayers.push({
            name: sName2,
            kind: "BingMaps",
            options
          });
        }
      }
      break;
    case "OpenStreetMap":
      {
        const { name: name2, type } = map.Extension.Options;
        const sName2 = Array.isArray(name2) ? name2[0] : name2;
        const sType = Array.isArray(type) ? type[0] : type;
        const options = {};
        switch (sType) {
          case "CycleMap":
            options.url = "http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png";
            break;
          case "TransportMap":
            options.url = "http://tile2.opencyclemap.org/transport/{z}/{x}/{y}.png";
            break;
        }
        externalBaseLayers.push({
          name: sName2,
          kind: "OSM",
          options
        });
      }
      break;
    case "StadiaMaps":
    case "Stamen":
      {
        const { name: name2, type } = map.Extension.Options;
        const sName2 = Array.isArray(name2) ? name2[0] : name2;
        const sType = Array.isArray(type) ? type[0] : type;
        const options = {
          layer: sType
        };
        let bAdd = true;
        if ((_a = appDef.Extension) == null ? void 0 : _a.StadiaMapsKey) {
          options.key = appDef.Extension.StadiaMapsKey;
        } else {
          bAdd = false;
          warnings.push(tr("INIT_WARNING_STADIAMAPS_API_KEY_REQD", config.locale));
        }
        if (bAdd) {
          externalBaseLayers.push({
            name: sName2,
            kind: map.Type,
            options
          });
        }
      }
      break;
    case "UTFGrid":
      {
        externalBaseLayers.push({
          name: `UTFGridSource${_counter++}`,
          kind: "UTFGrid",
          options: {
            tileJSON: {
              scheme: "xyz",
              grids: Array.isArray(map.Extension.UrlTemplate) ? [...map.Extension.UrlTemplate] : [map.Extension.UrlTemplate]
            }
          }
        });
      }
      break;
    case "XYZDebug":
      const { name } = map.Extension.Options;
      const sName = Array.isArray(name) ? name[0] : name;
      externalBaseLayers.push({
        name: sName,
        kind: "XYZDebug"
      });
      break;
    case "XYZ":
      {
        const { name: name2, type, attributions } = map.Extension.Options;
        const sName2 = Array.isArray(name2) ? name2[0] : name2;
        const sType = Array.isArray(type) ? type[0] : type;
        let tilePixelRatio = 1;
        if (map.Extension.Options.tilePixelRatio) {
          tilePixelRatio = parseInt(map.Extension.Options.tilePixelRatio[0], 10);
        }
        const urls = (map.Extension.Options.urls || []).map((s) => strReplaceAll(s, "${", "{"));
        externalBaseLayers.push({
          name: sName2,
          kind: "XYZ",
          options: {
            layer: sType,
            urls,
            attributions,
            tilePixelRatio
          }
        });
      }
      break;
  }
}
function fetchInitDocument(options, client) {
  return __async(this, null, function* () {
    const { resourceId, locale } = options;
    let sessionWasReused = false;
    let session;
    if (!options.session) {
      session = new AsyncLazy(() => __async(this, null, function* () {
        if (!client) {
          throw new MgError(tr("INIT_ERROR_NO_CONNECTION", locale));
        }
        return yield client.createSession("Anonymous", "");
      }));
    } else {
      sessionWasReused = true;
      session = new AsyncLazy(() => Promise.resolve(options.session));
    }
    if (!resourceId) {
      const cl = new Client("", "mapagent");
      try {
        const appDef = yield cl.get("appdef.json");
        return {
          document: appDef,
          session,
          sessionWasReused
        };
      } catch (e) {
        throw new MgError(tr("INIT_ERROR_MISSING_RESOURCE_PARAM", locale));
      }
    }
    if (typeof resourceId === "string") {
      if (strEndsWith(resourceId, "WebLayout")) {
        if (!client) {
          throw new MgError(tr("INIT_ERROR_NO_CONNECTION", locale));
        }
        const wl = yield client.getResource(resourceId, { SESSION: yield session.getValueAsync() });
        return {
          document: wl,
          session,
          sessionWasReused
        };
      }
      if (strEndsWith(resourceId, "ApplicationDefinition")) {
        if (!client) {
          throw new MgError(tr("INIT_ERROR_NO_CONNECTION", locale));
        }
        const appDef2 = yield client.getResource(resourceId, { SESSION: yield session.getValueAsync() });
        return {
          document: appDef2,
          session,
          sessionWasReused
        };
      }
      if (isResourceId(resourceId)) {
        throw new MgError(tr("INIT_ERROR_UNKNOWN_RESOURCE_TYPE", locale, { resourceId }));
      }
      if (client) {
        const appDef2 = yield client.get(resourceId);
        return {
          document: appDef2,
          session,
          sessionWasReused
        };
      }
      const cl = new Client("", "mapagent");
      const appDef = yield cl.get(resourceId);
      return {
        document: appDef,
        session,
        sessionWasReused
      };
    }
    const document2 = yield resourceId();
    if (isAppDef(document2) || isWebLayout(document2)) {
      return {
        document: document2,
        session,
        sessionWasReused
      };
    }
    throw new MgError(tr("INIT_ERROR_UNKNOWN_RESOURCE_TYPE", locale, { resourceId: "[function resource loader]" }));
  });
}
function initAppFromDocument(fetchResult, options) {
  return (dispatch, getState) => __async(this, null, function* () {
    var _a, _b;
    const args = getState().config;
    let client;
    if (args.agentUri && args.agentKind) {
      client = new Client(args.agentUri, args.agentKind);
    }
    const fullOptions = __spreadProps(__spreadValues({}, options), {
      resourceId: () => __async(this, null, function* () {
        return fetchResult.document;
      })
    });
    yield initLocaleAsync(dispatch, fullOptions);
    const sessionWasReused = fetchResult.sessionWasReused;
    const payload = yield sessionAcquiredAsync(client, fullOptions, fetchResult.session, sessionWasReused);
    payload.sessionWasReused = sessionWasReused;
    if (sessionWasReused) {
      const initSelections = {};
      for (const mapName in payload.maps) {
        const sset = yield retrieveSelectionSetFromLocalStorage(fetchResult.session, mapName);
        if (sset) {
          initSelections[mapName] = sset;
        }
      }
      payload.initialSelections = initSelections;
      try {
        yield clearSessionStore();
      } catch (e) {
      }
    }
    let initPayload = payload;
    if (options.initialView) {
      initPayload.initialView = __spreadValues({}, options.initialView);
    }
    if (options.initialActiveMap) {
      initPayload.activeMapName = options.initialActiveMap;
    }
    initPayload.initialHideGroups = options.initialHideGroups;
    initPayload.initialHideLayers = options.initialHideLayers;
    initPayload.initialShowGroups = options.initialShowGroups;
    initPayload.initialShowLayers = options.initialShowLayers;
    initPayload.featureTooltipsEnabled = options.featureTooltipsEnabled;
    const appSettings = (_a = options.appSettings) != null ? _a : {};
    const inAppSettings = (_b = payload.appSettings) != null ? _b : {};
    for (const k in inAppSettings) {
      appSettings[k] = inAppSettings[k];
    }
    initPayload.appSettings = appSettings;
    dispatch({
      type: ActionType.INIT_APP,
      payload: initPayload
    });
  });
}
function acknowledgeInitWarnings() {
  return {
    type: ActionType.INIT_ACKNOWLEDGE_WARNINGS
  };
}
const InitWarningDisplay = () => {
  const { Button, Dialog, DialogBody, DialogFooter, DialogFooterActions } = useElementContext();
  const dispatch = useReduxDispatch();
  const acknowledge = () => dispatch(acknowledgeInitWarnings());
  const warnings = useInitWarnings();
  const locale = useViewerLocale();
  if (warnings && warnings.length && acknowledge) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Dialog,
      {
        icon: "warning-sign",
        isOpen: true,
        usePortal: false,
        onClose: acknowledge,
        title: tr("WARNING", locale),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogBody, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tr("INIT_WARNINGS_FOUND", locale) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: warnings.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: w }, w)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooterActions, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "primary",
              onClick: acknowledge,
              children: tr("OK", locale)
            }
          ) }) })
        ]
      }
    );
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("noscript", {});
  }
};
const TEMPLATE_INITIAL_STATE = {
  initialInfoPaneWidth: 250,
  initialTaskPaneWidth: 300,
  taskPaneVisible: true,
  selectionPanelVisible: true,
  legendVisible: true,
  autoDisplaySelectionPanelOnSelection: true,
  templateData: {}
};
function isElementState(args) {
  return args != null && typeof args.legendVisible != "undefined" && typeof args.selectionPanelVisible != "undefined" && typeof args.taskPaneVisible != "undefined";
}
let _ovReducer;
function setCustomTemplateReducer(func) {
  _ovReducer = func;
}
function templateReducer(origState = TEMPLATE_INITIAL_STATE, action) {
  let state = origState;
  if (action.type == ActionType.MAP_SET_SELECTION) {
    const { selection } = action.payload;
    if (selection && selection.SelectedFeatures) {
      if (selection.SelectedFeatures.SelectedLayer.length && origState.autoDisplaySelectionPanelOnSelection) {
        state = __spreadValues(__spreadValues({}, origState), { selectionPanelVisible: true, legendVisible: false, taskPaneVisible: false });
      }
    }
  }
  if (action.type == ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE) {
    const { feature } = action.payload;
    if (feature == null ? void 0 : feature.properties) {
      state = __spreadValues(__spreadValues({}, origState), { selectionPanelVisible: true, legendVisible: false, taskPaneVisible: false });
    }
  }
  if (action.type == ActionType.FUSION_SET_TEMPLATE_CUSTOM_DATA) {
    const state1 = __spreadValues({}, state);
    state1.templateData[action.payload.name] = action.payload.value;
    return state1;
  }
  if (typeof _ovReducer == "function") {
    return _ovReducer(origState, state, action);
  } else {
    switch (action.type) {
      case ActionType.FUSION_SET_ELEMENT_STATE: {
        if (isElementState(action.payload)) {
          return __spreadValues(__spreadValues({}, state), action.payload);
        }
        return state;
      }
      case ActionType.INIT_APP: {
        let state1 = {};
        if (action.payload.initialTaskPaneWidth) {
          state1.initialTaskPaneWidth = action.payload.initialTaskPaneWidth;
        }
        if (action.payload.initialInfoPaneWidth) {
          state1.initialInfoPaneWidth = action.payload.initialInfoPaneWidth;
        }
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
  }
  return state;
}
function useCommonTemplateState(templateReducer2) {
  const [isResizing, setIsResizing] = reactExports.useState(false);
  const locale = useViewerLocale();
  const capabilities = useConfiguredCapabilities();
  const showSelection = useTemplateSelectionVisible();
  const showLegend = useTemplateLegendVisible();
  const showTaskPane = useTemplateTaskPaneVisible();
  const dispatch = useReduxDispatch();
  const setElementStatesAction = reactExports.useCallback((states) => dispatch(setElementStates(states)), [dispatch]);
  const onDragStart = () => setIsResizing(true);
  const onDragEnd = () => setIsResizing(false);
  const viewer = useMapProviderContext();
  reactExports.useEffect(() => {
    if (templateReducer2) {
      setCustomTemplateReducer(templateReducer2);
    }
  }, []);
  const onSplitterChanged = () => {
    if (viewer.isReady()) {
      viewer.updateSize();
    }
  };
  const onActiveElementChanged = reactExports.useCallback((id) => {
    const states = {
      legendVisible: false,
      taskPaneVisible: false,
      selectionPanelVisible: false
    };
    switch (id) {
      case "Legend":
        states.legendVisible = true;
        break;
      case "TaskPane":
        states.taskPaneVisible = true;
        break;
      case "Selection":
        states.selectionPanelVisible = true;
        break;
    }
    if (states.legendVisible || states.taskPaneVisible || states.selectionPanelVisible)
      setElementStatesAction(states);
  }, [setElementStatesAction]);
  return {
    isResizing,
    setIsResizing,
    locale,
    capabilities,
    showSelection,
    showLegend,
    showTaskPane,
    onDragStart,
    onDragEnd,
    onSplitterChanged,
    onActiveElementChanged,
    dispatch
  };
}
const Pane = (props) => {
  const size = props.size || 0;
  const unit = props.percentage ? "%" : "px";
  let classes = "layout-pane";
  const style = {};
  if (!props.primary) {
    if (props.vertical) {
      style.height = `${size}${unit}`;
    } else {
      style.width = `${size}${unit}`;
    }
  } else {
    classes += " layout-pane-primary";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: classes, style, children: props.children });
};
function clearSelection() {
  if (window.getSelection) {
    const sel = window.getSelection();
    if (sel) {
      if (sel.empty) {
        sel.empty();
      } else if (sel.removeAllRanges) {
        sel.removeAllRanges();
      }
    }
  }
}
const DEFAULT_SPLITTER_SIZE = 4;
const SplitterLayout = (props) => {
  const [resizing, setResizing] = React.useState(false);
  const [secondaryPaneSize, setSecondaryPaneSize] = React.useState(0);
  const containerRef = React.useRef(null);
  const splitterRef = React.useRef(null);
  const getSecondaryPaneSize = React.useCallback((containerRect, splitterRect, clientPosition, offsetMouse) => {
    var _a, _b;
    let totalSize;
    let splitterSize;
    let offset;
    if (props.vertical) {
      totalSize = containerRect.height;
      splitterSize = splitterRect.height;
      offset = clientPosition.top - containerRect.top;
    } else {
      totalSize = containerRect.width;
      splitterSize = splitterRect.width;
      offset = clientPosition.left - containerRect.left;
    }
    if (offsetMouse) {
      offset -= splitterSize / 2;
    }
    if (offset < 0) {
      offset = 0;
    } else if (offset > totalSize - splitterSize) {
      offset = totalSize - splitterSize;
    }
    let secondaryPaneSize2;
    if (props.primaryIndex === 1) {
      secondaryPaneSize2 = offset;
    } else {
      secondaryPaneSize2 = totalSize - splitterSize - offset;
    }
    let primaryPaneSize = totalSize - splitterSize - secondaryPaneSize2;
    if (props.percentage) {
      secondaryPaneSize2 = secondaryPaneSize2 * 100 / totalSize;
      primaryPaneSize = primaryPaneSize * 100 / totalSize;
      splitterSize = splitterSize * 100 / totalSize;
      totalSize = 100;
    }
    const pMinSize = (_a = props.primaryMinSize) != null ? _a : 0;
    const sMinSize = (_b = props.secondaryMinSize) != null ? _b : 0;
    if (primaryPaneSize < pMinSize) {
      secondaryPaneSize2 = Math.max(secondaryPaneSize2 - (pMinSize - primaryPaneSize), 0);
    } else if (secondaryPaneSize2 < sMinSize) {
      secondaryPaneSize2 = Math.min(totalSize - splitterSize - pMinSize, sMinSize);
    }
    return secondaryPaneSize2;
  }, [props.vertical, props.primaryIndex, props.percentage, props.primaryMinSize, props.secondaryMinSize]);
  React.useEffect(() => {
    let secondaryPaneSizeInit = 0;
    if (typeof props.secondaryInitialSize !== "undefined") {
      secondaryPaneSizeInit = props.secondaryInitialSize;
    } else if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      let splitterRect;
      if (splitterRef.current) {
        splitterRect = splitterRef.current.getBoundingClientRect();
      } else {
        splitterRect = { width: DEFAULT_SPLITTER_SIZE, height: DEFAULT_SPLITTER_SIZE };
      }
      secondaryPaneSizeInit = getSecondaryPaneSize(containerRect, splitterRect, {
        left: containerRect.left + (containerRect.width - splitterRect.width) / 2,
        top: containerRect.top + (containerRect.height - splitterRect.height) / 2
      }, false);
    }
    setSecondaryPaneSize(secondaryPaneSizeInit);
  }, []);
  React.useEffect(() => {
    function handleResize() {
      if (splitterRef.current && containerRef.current && !props.percentage) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const splitterRect = splitterRef.current.getBoundingClientRect();
        const newSize = getSecondaryPaneSize(containerRect, splitterRect, {
          left: splitterRect.left,
          top: splitterRect.top
        }, false);
        setSecondaryPaneSize(newSize);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getSecondaryPaneSize, props.percentage]);
  React.useEffect(() => {
    function handleMouseMove(e) {
      var _a, _b;
      if (resizing && containerRef.current && splitterRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const splitterRect = splitterRef.current.getBoundingClientRect();
        const newSize = getSecondaryPaneSize(containerRect, splitterRect, {
          left: (_a = e.clientX) != null ? _a : e.clientX,
          top: (_b = e.clientY) != null ? _b : e.clientY
        }, true);
        clearSelection();
        setSecondaryPaneSize(newSize);
      }
    }
    function handleTouchMove(e) {
      handleMouseMove(e.changedTouches[0]);
    }
    function handleMouseUp() {
      setResizing(false);
    }
    function handleTouchEnd() {
      setResizing(false);
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [resizing, getSecondaryPaneSize]);
  React.useEffect(() => {
    if (props.onSecondaryPaneSizeChange) {
      props.onSecondaryPaneSizeChange(secondaryPaneSize);
    }
  }, [secondaryPaneSize]);
  React.useEffect(() => {
    if (resizing && props.onDragStart) {
      props.onDragStart();
    } else if (!resizing && props.onDragEnd) {
      props.onDragEnd();
    }
  }, [resizing]);
  const handleSplitterMouseDown = React.useCallback(() => {
    clearSelection();
    setResizing(true);
  }, []);
  let containerClasses = "splitter-layout";
  if (props.customClassName) {
    containerClasses += ` ${props.customClassName}`;
  }
  if (props.vertical) {
    containerClasses += " splitter-layout-vertical";
  }
  if (resizing) {
    containerClasses += " layout-changing";
  }
  const children = React.Children.toArray(props.children).slice(0, 2);
  if (children.length === 0) {
    children.push(/* @__PURE__ */ jsxRuntimeExports.jsx("div", {}));
  }
  const wrappedChildren = [];
  const primaryIndex = props.primaryIndex !== 0 && props.primaryIndex !== 1 ? 0 : props.primaryIndex;
  for (let i = 0; i < children.length; ++i) {
    let primary = true;
    let size = null;
    if (children.length > 1 && i !== primaryIndex) {
      primary = false;
      size = secondaryPaneSize;
    }
    wrappedChildren.push(
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pane, { vertical: props.vertical, percentage: props.percentage, primary, size, children: children[i] }, i)
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: containerClasses, ref: containerRef, children: [
    wrappedChildren[0],
    wrappedChildren.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "separator",
        className: "layout-splitter",
        ref: splitterRef,
        onMouseDown: handleSplitterMouseDown,
        onTouchStart: handleSplitterMouseDown
      }
    ),
    wrappedChildren.length > 1 && wrappedChildren[1]
  ] });
};
const DEFAULT_LEGEND_COMPONENT_PROPS$5 = { inlineBaseLayerSwitcher: true };
const AjaxViewerLayout = () => {
  const {
    isResizing,
    locale,
    capabilities,
    onDragStart,
    onDragEnd,
    onSplitterChanged
  } = useCommonTemplateState();
  const initInfoPaneWidth = useTemplateInitialInfoPaneWidth();
  const initTaskPaneWidth = useTemplateInitialTaskPaneWidth();
  let hasToolbar = false;
  let hasTaskPane = false;
  let hasStatusBar = false;
  let hasNavigator = false;
  let hasSelectionPanel = false;
  let hasLegend = false;
  if (capabilities) {
    hasToolbar = capabilities.hasToolbar;
    hasTaskPane = capabilities.hasTaskPane;
    hasStatusBar = capabilities.hasStatusBar;
    hasNavigator = capabilities.hasNavigator;
    hasSelectionPanel = capabilities.hasSelectionPanel;
    hasLegend = capabilities.hasLegend;
  }
  const TB_Z_INDEX = 10;
  const topOffset = hasToolbar ? DEFAULT_TOOLBAR_SIZE : 0;
  const bottomOffset = hasStatusBar ? 20 : 0;
  const lgStyle = {};
  const selStyle = {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", height: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", left: 0, right: 0, top: 0, bottom: bottomOffset }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SplitterLayout, { customClassName: "ajax-viewer-splitter", primaryIndex: 0, secondaryInitialSize: initTaskPaneWidth, onDragStart, onDragEnd, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        (() => {
          if (hasToolbar) {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: WEBLAYOUT_TOOLBAR, containerStyle: { position: "absolute", left: 0, top: 0, right: 0, zIndex: TB_Z_INDEX, backgroundColor: TOOLBAR_BACKGROUND_COLOR } });
          }
        })(),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", left: 0, top: topOffset, bottom: 0, right: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SplitterLayout, { customClassName: "ajax-viewer-splitter", primaryIndex: 1, secondaryInitialSize: initInfoPaneWidth, onSecondaryPaneSizeChange: onSplitterChanged, children: [
          (() => {
            if (hasLegend || hasSelectionPanel) {
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(SplitterLayout, { customClassName: "ajax-viewer-splitter", vertical: true, onDragStart, onDragEnd, children: [
                (() => {
                  if (hasLegend) {
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ajax-sidebar-panel", style: lgStyle, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ajax-sidebar-panel-heading", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tr("TPL_TITLE_LEGEND", locale) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ajax-sidebar-panel-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Legend, locale, componentProps: DEFAULT_LEGEND_COMPONENT_PROPS$5 }) })
                    ] });
                  }
                })(),
                (() => {
                  if (hasSelectionPanel) {
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ajax-sidebar-panel", style: selStyle, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ajax-sidebar-panel-heading", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tr("TPL_TITLE_SELECTION_PANEL", locale) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ajax-sidebar-panel-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.SelectionPanel, locale }) })
                    ] });
                  }
                })()
              ] });
            }
          })(),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Map, locale }),
            (() => {
              if (hasNavigator) {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Navigator, locale });
              }
            })()
          ] })
        ] }) })
      ] }),
      (() => {
        if (hasTaskPane) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { locale, id: DefaultComponentNames.TaskPane, componentProps: { isResizing } });
        }
      })()
    ] }) }),
    (() => {
      if (hasStatusBar) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, height: bottomOffset, backgroundColor: TOOLBAR_BACKGROUND_COLOR }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.MouseCoordinates, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.ScaleDisplay, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.ViewSize, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.SelectedFeatureCount, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.PoweredByMapGuide, locale })
        ] });
      }
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ViewerApiShim, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModalLauncher, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FlyoutRegionContainer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InitWarningDisplay, {})
  ] });
};
const DEFAULT_LEGEND_COMPONENT_PROPS$4 = { inlineBaseLayerSwitcher: true };
function sidebarTemplateReducer(origState, state, action) {
  switch (action.type) {
    case ActionType.MAP_SET_SELECTION: {
      const { selection } = action.payload;
      if (selection && selection.SelectedFeatures) {
        let autoExpandSelectionPanel = origState.autoDisplaySelectionPanelOnSelection;
        if (isMobileViewport()) {
          return origState;
        }
        if (selection.SelectedFeatures.SelectedLayer.length && autoExpandSelectionPanel) {
          return __spreadValues(__spreadValues({}, origState), { selectionPanelVisible: true, taskPaneVisible: false, legendVisible: false });
        }
      }
      return state;
    }
    case ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE: {
      const { feature } = action.payload;
      if (feature == null ? void 0 : feature.properties) {
        let autoExpandSelectionPanel = origState.autoDisplaySelectionPanelOnSelection;
        if (isMobileViewport()) {
          return origState;
        }
        if (autoExpandSelectionPanel) {
          return __spreadValues(__spreadValues({}, origState), { selectionPanelVisible: true, taskPaneVisible: false, legendVisible: false });
        }
      }
    }
    case ActionType.FUSION_SET_LEGEND_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1;
        if (data === true) {
          state1 = { legendVisible: true, taskPaneVisible: false, selectionPanelVisible: false };
        } else {
          state1 = { legendVisible: data };
        }
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1;
        if (data === true) {
          state1 = { legendVisible: false, taskPaneVisible: false, selectionPanelVisible: true };
        } else {
          state1 = { selectionPanelVisible: data };
        }
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.TASK_INVOKE_URL: {
      let state1 = { taskPaneVisible: true, selectionPanelVisible: false, legendVisible: false };
      return __spreadValues(__spreadValues({}, state), state1);
    }
    case ActionType.FUSION_SET_TASK_PANE_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1;
        if (data === true) {
          state1 = { legendVisible: false, taskPaneVisible: true, selectionPanelVisible: false };
        } else {
          state1 = { taskPaneVisible: data };
        }
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.FUSION_SET_ELEMENT_STATE: {
      const data = action.payload;
      if (isElementState(data)) {
        return __spreadValues(__spreadValues({}, state), data);
      }
    }
  }
  return state;
}
const SidebarHeader = (props) => {
  const sbHeaderStyle = {
    position: "absolute",
    top: 0,
    right: 0,
    height: 40,
    left: 0,
    margin: 0
  };
  sbHeaderStyle.paddingLeft = 10;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { style: sbHeaderStyle, className: "sidebar-header", children: [
    props.text,
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sidebar-close", onClick: props.onCloseClick, children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "icon-left-open" }) })
  ] });
};
const Sidebar = (props) => {
  const { Spinner, Icon: Icon2 } = useElementContext();
  const onActivateTasks = (e) => {
    const { onActivateTab } = props;
    e.preventDefault();
    onActivateTab("tasks");
    return false;
  };
  const onActivateLegend = (e) => {
    const { onActivateTab } = props;
    e.preventDefault();
    onActivateTab("legend");
    return false;
  };
  const onActivateSelection = (e) => {
    const { onActivateTab } = props;
    e.preventDefault();
    onActivateTab("selection");
    return false;
  };
  const onClickCollapse = (e) => {
    const { onCollapse } = props;
    e.preventDefault();
    onCollapse();
    return false;
  };
  const onClickExpand = (e) => {
    const { onExpand } = props;
    e.preventDefault();
    onExpand();
    return false;
  };
  const lastAction2 = useLastDispatchedAction();
  reactExports.useEffect(() => {
    switch (lastAction2.type) {
      case ActionType.TASK_INVOKE_URL:
        {
          props.onActivateTab("tasks", false);
        }
        break;
      case ActionType.MAP_SET_SELECTION:
      case ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE:
        break;
    }
  }, [lastAction2]);
  const { position, busy, collapsed, activeTab } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `sidebar ${collapsed ? "collapsed" : ""} sidebar-${position}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sidebar-tabs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { role: "tablist", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: (() => {
        if (busy === true) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { sizePreset: "small" }) });
        } else {
          if (collapsed) {
            return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { onClick: onClickExpand, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { icon: "menu-open" }) });
          } else {
            return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { onClick: onClickCollapse, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { icon: "menu-closed" }) });
          }
        }
      })() }),
      (() => {
        if (props.taskpane) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: collapsed == false && activeTab == "tasks" ? "active" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { onClick: onActivateTasks, title: tr("TPL_SIDEBAR_OPEN_TASKPANE", props.locale), role: "tab", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { icon: "application" }) }) });
        }
      })(),
      (() => {
        if (props.legend) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: collapsed == false && activeTab == "legend" ? "active" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { onClick: onActivateLegend, title: tr("TPL_SIDEBAR_OPEN_LEGEND", props.locale), role: "tab", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { icon: "layers" }) }) });
        }
      })(),
      (() => {
        if (props.selection) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: collapsed == false && activeTab == "selection" ? "active" : "", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { onClick: onActivateSelection, title: tr("TPL_SIDEBAR_OPEN_SELECTION_PANEL", props.locale), role: "tab", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { icon: "th" }) }),
            props.hasSelection && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sidebar-has-selection-badge", children: NBSP })
          ] });
        }
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "sidebar-separator" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sidebar-content", children: [
      (() => {
        if (props.taskpane) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `sidebar-pane ${activeTab == "tasks" ? "active" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarHeader, { text: tr("TPL_TITLE_TASKPANE", props.locale), onCloseClick: onClickCollapse }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: 40, bottom: 0, right: 0, left: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.TaskPane, locale: props.locale }) })
          ] });
        }
      })(),
      (() => {
        if (props.legend) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `sidebar-pane ${activeTab == "legend" ? "active" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarHeader, { text: tr("TPL_TITLE_LEGEND", props.locale), onCloseClick: onClickCollapse }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: 40, bottom: 0, right: 0, left: 0, overflow: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Legend, locale: props.locale, componentProps: DEFAULT_LEGEND_COMPONENT_PROPS$4 }) })
          ] });
        }
      })(),
      (() => {
        if (props.selection) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `sidebar-pane ${activeTab == "selection" ? "active" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarHeader, { text: tr("TPL_TITLE_SELECTION_PANEL", props.locale), onCloseClick: onClickCollapse }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: 40, bottom: 0, right: 0, left: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.SelectionPanel, locale: props.locale }) })
          ] });
        }
      })()
    ] })
  ] });
};
const SidebarLayout = () => {
  const {
    dispatch,
    locale,
    capabilities,
    showSelection,
    showLegend,
    showTaskPane
  } = useCommonTemplateState(sidebarTemplateReducer);
  const tbState = useReducedToolbarAppState();
  const setElementStatesAction = (states) => dispatch(setElementStates(states));
  const {
    hasTaskPane,
    hasStatusBar,
    hasNavigator,
    hasSelectionPanel,
    hasLegend,
    hasViewSize,
    hasToolbar
  } = capabilities;
  const busyCount = useViewerBusyCount();
  let defaultActiveTab = "tasks";
  if (showLegend) {
    defaultActiveTab = "legend";
  } else if (showSelection) {
    defaultActiveTab = "selection";
  }
  const [activeTab, setActiveTab] = reactExports.useState(defaultActiveTab);
  reactExports.useEffect(() => {
    let tab = "tasks";
    if (showLegend) {
      tab = "legend";
    } else if (showSelection) {
      tab = "selection";
    }
    setActiveTab(tab);
  }, [showLegend, showSelection, showTaskPane]);
  const onCollapse = () => {
    setElementStatesAction({
      taskPaneVisible: false,
      legendVisible: false,
      selectionPanelVisible: false
    });
  };
  const onExpand = () => {
    const est = {
      legendVisible: false,
      selectionPanelVisible: false,
      taskPaneVisible: false
    };
    switch (activeTab) {
      case "legend":
        est.legendVisible = true;
        break;
      case "selection":
        est.selectionPanelVisible = true;
        break;
      case "tasks":
        est.taskPaneVisible = true;
        break;
    }
    if (est.legendVisible || est.selectionPanelVisible || est.taskPaneVisible) {
      setElementStatesAction(est);
    }
  };
  const onActivateTab = (tab) => {
    const est = {
      legendVisible: false,
      selectionPanelVisible: false,
      taskPaneVisible: false
    };
    switch (tab) {
      case "legend":
        est.legendVisible = true;
        break;
      case "selection":
        est.selectionPanelVisible = true;
        break;
      case "tasks":
        est.taskPaneVisible = true;
        break;
    }
    if (est.legendVisible || est.selectionPanelVisible || est.taskPaneVisible) {
      setElementStatesAction(est);
      setActiveTab(tab);
    }
  };
  const collapsed = !(showLegend || showSelection || showTaskPane);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", height: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Sidebar,
      {
        position: "left",
        busy: busyCount > 0,
        legend: hasLegend,
        selection: hasSelectionPanel,
        taskpane: hasTaskPane,
        hasSelection: tbState.hasSelection || tbState.hasClientSelection,
        locale,
        collapsed: collapsed || false,
        activeTab: activeTab || "tasks",
        onCollapse,
        onActivateTab,
        onExpand
      }
    ),
    (() => {
      if (hasToolbar) {
        const toolbarBottom = isMobileViewport() ? 0 : 6;
        const toolbarInnerBottom = isMobileViewport() ? 0 : 2;
        let top = 180;
        if (!hasSelectionPanel) {
          top -= 40;
        }
        if (!hasLegend) {
          top -= 40;
        }
        if (!hasTaskPane) {
          top -= 40;
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "toolbar-region", style: { top, bottom: toolbarBottom }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: WEBLAYOUT_TOOLBAR, containerClass: "sidebar-toolbar", vertical: true, hideVerticalLabels: true, containerStyle: { position: "absolute", top: 0, bottom: toolbarInnerBottom, left: 4, right: 6, zIndex: 100 } }) });
      }
    })(),
    (() => {
      if (hasNavigator) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Navigator, locale });
      }
    })(),
    (() => {
      if (hasStatusBar) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.MouseCoordinates, locale });
      }
    })(),
    (() => {
      if (hasStatusBar) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.ScaleDisplay, locale });
      }
    })(),
    (() => {
      if (hasViewSize) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.ViewSize, locale });
      }
    })(),
    (() => {
      if (hasStatusBar) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.SelectedFeatureCount, locale });
      }
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ViewerApiShim, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModalLauncher, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FlyoutRegionContainer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InitWarningDisplay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Map, locale }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.PoweredByMapGuide, locale })
  ] });
};
function useActiveMapSubjectLayer() {
  return useAppState((state) => {
    var _a;
    if (state.config.activeMapName) {
      return (_a = state.mapState[state.config.activeMapName].generic) == null ? void 0 : _a.subject;
    }
    return void 0;
  });
}
function aquaTemplateReducer(origState, state, action) {
  switch (action.type) {
    case ActionType.MAP_SET_SELECTION: {
      const { selection } = action.payload;
      if (selection && selection.SelectedFeatures) {
        if (selection.SelectedFeatures.SelectedLayer.length && origState.autoDisplaySelectionPanelOnSelection) {
          return __spreadValues(__spreadValues({}, origState), { selectionPanelVisible: true });
        }
      }
      return state;
    }
    case ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE: {
      const { feature } = action.payload;
      if (feature == null ? void 0 : feature.properties) {
        return __spreadValues(__spreadValues({}, origState), { selectionPanelVisible: true });
      }
      return state;
    }
    case ActionType.FUSION_SET_LEGEND_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1 = { legendVisible: data };
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1 = { selectionPanelVisible: data };
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.TASK_INVOKE_URL: {
      let state1 = { taskPaneVisible: true };
      return __spreadValues(__spreadValues({}, state), state1);
    }
    case ActionType.FUSION_SET_TASK_PANE_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1 = { taskPaneVisible: data };
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
  }
  return state;
}
const SELECTION_DIALOG_HEIGHT = 300;
const LEGEND_DIALOG_HEIGHT = 400;
const TASK_DIALOG_HEIGHT = 500;
const STATUS_BAR_HEIGHT$4 = 18;
const AQUA_VERTICAL_TOOLBAR_WIDTH = DEFAULT_TOOLBAR_SIZE + 2;
const AquaTemplateLayout = () => {
  const {
    locale,
    capabilities,
    showSelection,
    showLegend,
    showTaskPane,
    dispatch
  } = useCommonTemplateState(aquaTemplateReducer);
  const posLegend = useTemplateCustomData("AQUA_LEGEND_POS");
  const sizeLegend = useTemplateCustomData("AQUA_LEGEND_SIZE");
  const posSelection = useTemplateCustomData("AQUA_SELECTION_POS");
  const sizeSelection = useTemplateCustomData("AQUA_SELECTION_SIZE");
  const posTaskPane = useTemplateCustomData("AQUA_TASKPANE_POS");
  const sizeTaskPane = useTemplateCustomData("AQUA_TASKPANE_SIZE");
  const map = useActiveMapState();
  const subject = useActiveMapSubjectLayer();
  const hideLegend = () => dispatch(setLegendVisibility(false));
  const hideSelection = () => dispatch(setSelectionPanelVisibility(false));
  const hideTaskPane = () => dispatch(setTaskPaneVisibility(false));
  const onHideTaskPane = () => hideTaskPane();
  const onHideLegend = () => hideLegend();
  const onHideSelection = () => hideSelection();
  let hasTaskPane = false;
  let hasStatusBar = false;
  let hasNavigator = false;
  let hasSelectionPanel = false;
  let hasLegend = false;
  if (capabilities) {
    hasTaskPane = capabilities.hasTaskPane;
    hasStatusBar = capabilities.hasStatusBar;
    hasNavigator = capabilities.hasNavigator;
    hasSelectionPanel = capabilities.hasSelectionPanel;
    hasLegend = capabilities.hasLegend;
  }
  const bottomOffset = hasStatusBar ? STATUS_BAR_HEIGHT$4 : 0;
  let left = AQUA_VERTICAL_TOOLBAR_WIDTH;
  let right = 0;
  const TB_Z_INDEX = 0;
  const initInfoPaneWidth = useTemplateInitialInfoPaneWidth();
  const initTaskPaneWidth = useTemplateInitialTaskPaneWidth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", height: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: "FileMenu", containerClass: "aqua-file-menu", containerStyle: { position: "absolute", left: 0, top: 0, zIndex: TB_Z_INDEX, right: 0 } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: "Toolbar", containerClass: "aqua-toolbar", containerStyle: { position: "absolute", left: 0, top: DEFAULT_TOOLBAR_SIZE, height: DEFAULT_TOOLBAR_SIZE, zIndex: TB_Z_INDEX, right: 0 } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: "ToolbarVertical", containerClass: "aqua-toolbar-vertical", vertical: true, containerStyle: { position: "absolute", left: 0, top: DEFAULT_TOOLBAR_SIZE * 2 - 1, zIndex: TB_Z_INDEX, bottom: bottomOffset } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: "ToolbarVertical", containerClass: "aqua-toolbar-vertical", vertical: true, containerStyle: { position: "absolute", left: 0, top: DEFAULT_TOOLBAR_SIZE * 2 - 1, zIndex: TB_Z_INDEX, bottom: bottomOffset, width: AQUA_VERTICAL_TOOLBAR_WIDTH } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", left, top: DEFAULT_TOOLBAR_SIZE * 2, bottom: bottomOffset, right }, children: [
      (() => {
        const theMap = map != null ? map : subject;
        if (theMap) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Map, locale });
        }
      })(),
      (() => {
        if (hasNavigator) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Navigator, locale });
        }
      })()
    ] }),
    (() => {
      if (hasStatusBar) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aqua-status-bar", style: { position: "absolute", left: 0, bottom: 0, right: 0, height: bottomOffset }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.MouseCoordinates, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.ScaleDisplay, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.SelectedFeatureCount, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.ViewSize, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.PoweredByMapGuide, locale })
        ] });
      }
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ViewerApiShim, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ModalLauncher, { children: [
      (() => {
        if (hasSelectionPanel) {
          const pos = posSelection != null ? posSelection : [40, 500];
          const size = sizeSelection != null ? sizeSelection : [initInfoPaneWidth, SELECTION_DIALOG_HEIGHT];
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            RndModalDialog,
            {
              icon: "th",
              locale,
              isOpen: !!showSelection,
              onClose: onHideSelection,
              title: tr("TPL_TITLE_SELECTION_PANEL", locale),
              onChange: (args) => {
                dispatch(setTemplateCustomData("AQUA_SELECTION_POS", [args.x, args.y]));
                dispatch(setTemplateCustomData("AQUA_SELECTION_SIZE", [args.width, args.height]));
              },
              x: pos[0],
              y: pos[1],
              width: size[0],
              height: size[1],
              disableYOverflow: true,
              enableInteractionMask: true,
              children: ([, h]) => /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { locale, id: DefaultComponentNames.SelectionPanel, componentProps: { maxHeight: h } })
            }
          );
        }
      })(),
      (() => {
        if (hasLegend) {
          const pos = posLegend != null ? posLegend : [40, 70];
          const size = sizeLegend != null ? sizeLegend : [initInfoPaneWidth, LEGEND_DIALOG_HEIGHT];
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            RndModalDialog,
            {
              icon: "layers",
              locale,
              isOpen: !!showLegend,
              onClose: onHideLegend,
              title: tr("TPL_TITLE_LEGEND", locale),
              onChange: (args) => {
                dispatch(setTemplateCustomData("AQUA_LEGEND_POS", [args.x, args.y]));
                dispatch(setTemplateCustomData("AQUA_LEGEND_SIZE", [args.width, args.height]));
              },
              x: pos[0],
              y: pos[1],
              width: size[0],
              height: size[1],
              enableInteractionMask: true,
              children: ([, h]) => /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { locale, id: DefaultComponentNames.Legend, componentProps: { inlineBaseLayerSwitcher: false, maxHeight: h } })
            }
          );
        }
      })(),
      (() => {
        if (hasTaskPane) {
          const pos = posTaskPane != null ? posTaskPane : [document.body.clientWidth - initTaskPaneWidth - 70, 80];
          const size = sizeTaskPane != null ? sizeTaskPane : [initTaskPaneWidth, TASK_DIALOG_HEIGHT];
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            RndModalDialog,
            {
              icon: "application",
              locale,
              isOpen: !!showTaskPane,
              onClose: onHideTaskPane,
              onChange: (args) => {
                dispatch(setTemplateCustomData("AQUA_TASKPANE_POS", [args.x, args.y]));
                dispatch(setTemplateCustomData("AQUA_TASKPANE_SIZE", [args.width, args.height]));
              },
              width: size[0],
              height: size[1],
              title: tr("TPL_TITLE_TASKPANE", locale),
              x: pos[0],
              y: pos[1],
              disableYOverflow: true,
              enableInteractionMask: false,
              children: ([, h]) => /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { locale, id: DefaultComponentNames.TaskPane, componentProps: {
                maxHeight: h - 15
                /* some height breathing space */
              } })
            }
          );
        }
      })()
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FlyoutRegionContainer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InitWarningDisplay, {})
  ] });
};
function turquoiseYellowTemplateReducer(origState, state, action) {
  switch (action.type) {
    case ActionType.FUSION_SET_LEGEND_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1;
        if (data === true) {
          state1 = { legendVisible: true, taskPaneVisible: false, selectionPanelVisible: false };
        } else {
          state1 = { legendVisible: data };
        }
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1;
        if (data === true) {
          state1 = { legendVisible: false, taskPaneVisible: false, selectionPanelVisible: true };
        } else {
          state1 = { selectionPanelVisible: data };
        }
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.TASK_INVOKE_URL: {
      let state1 = { taskPaneVisible: true, selectionPanelVisible: false, legendVisible: false };
      return __spreadValues(__spreadValues({}, state), state1);
    }
    case ActionType.FUSION_SET_TASK_PANE_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1;
        if (data === true) {
          state1 = { legendVisible: false, taskPaneVisible: true, selectionPanelVisible: false };
        } else {
          state1 = { taskPaneVisible: data };
        }
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.FUSION_SET_ELEMENT_STATE: {
      const data = action.payload;
      if (isElementState(data)) {
        return __spreadValues(__spreadValues({}, state), data);
      }
    }
  }
  return state;
}
const SIDEBAR_PADDING$1 = 3;
const TOP_BAR_HEIGHT$1 = DEFAULT_TOOLBAR_SIZE;
const TAB_BAR_HEIGHT$1 = 30;
const STATUS_BAR_HEIGHT$3 = 18;
const DEFAULT_LEGEND_COMPONENT_PROPS$3 = { inlineBaseLayerSwitcher: false };
const TurquoiseYellowTemplateLayout = () => {
  const {
    isResizing,
    locale,
    capabilities,
    showSelection,
    showLegend,
    showTaskPane,
    onDragStart,
    onDragEnd,
    onSplitterChanged,
    onActiveElementChanged
  } = useCommonTemplateState(turquoiseYellowTemplateReducer);
  const { TabSet } = useElementContext();
  let hasTaskPane = false;
  let hasStatusBar = false;
  let hasNavigator = false;
  let hasSelectionPanel = false;
  let hasLegend = false;
  if (capabilities) {
    hasTaskPane = capabilities.hasTaskPane;
    hasStatusBar = capabilities.hasStatusBar;
    hasNavigator = capabilities.hasNavigator;
    hasSelectionPanel = capabilities.hasSelectionPanel;
    hasLegend = capabilities.hasLegend;
  }
  const bottomOffset = hasStatusBar ? STATUS_BAR_HEIGHT$3 : 0;
  const initInfoPaneWidth = useTemplateInitialInfoPaneWidth();
  const initTaskPaneWidth = useTemplateInitialTaskPaneWidth();
  const sbWidth = Math.max(initInfoPaneWidth, initTaskPaneWidth);
  const tabPanelStyle = {
    position: "absolute",
    top: TAB_BAR_HEIGHT$1,
    left: 0,
    right: 0,
    bottom: 0
  };
  const states = [
    { id: "Selection", visible: showSelection },
    { id: "TaskPane", visible: showTaskPane },
    { id: "Legend", visible: showLegend }
  ];
  const active = states.filter((st) => st.visible);
  let extraTabsProps = {};
  if (active.length == 1) {
    extraTabsProps.activeTabId = active[0].id;
  }
  const taskPaneTitle = tr("TPL_TITLE_TASKPANE", locale);
  const legendTitle = tr("TPL_TITLE_LEGEND", locale);
  const selectionTitle = tr("TPL_TITLE_SELECTION_PANEL", locale);
  const TB_Z_INDEX = 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", height: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", left: 0, top: 0, bottom: bottomOffset, right: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SplitterLayout, { customClassName: "turquoise-yellow-splitter", primaryIndex: 1, secondaryInitialSize: sbWidth, onSecondaryPaneSizeChange: onSplitterChanged, onDragStart, onDragEnd, children: [
      (() => {
        if (showSelection || showTaskPane || showLegend) {
          const tabProps = __spreadValues({
            id: "SidebarTabs",
            onTabChanged: onActiveElementChanged,
            className: "turquoise-yellow-sb-tabs",
            tabs: []
          }, extraTabsProps);
          if (hasTaskPane) {
            const panel = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: tabPanelStyle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.TaskPane, locale, componentProps: { isResizing } }) });
            tabProps.tabs.push({
              id: "TaskPane",
              title: taskPaneTitle,
              content: panel
            });
          }
          if (hasLegend) {
            const p1 = { overflow: "auto" };
            const panel = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: __spreadValues(__spreadValues({}, tabPanelStyle), p1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Legend, locale, componentProps: DEFAULT_LEGEND_COMPONENT_PROPS$3 }) });
            tabProps.tabs.push({
              id: "Legend",
              title: legendTitle,
              content: panel
            });
          }
          if (hasSelectionPanel) {
            const panel = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: tabPanelStyle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.SelectionPanel, locale }) });
            tabProps.tabs.push({
              id: "Selection",
              title: selectionTitle,
              content: panel
            });
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "turquoise-yellow-sidebar", style: { position: "absolute", left: SIDEBAR_PADDING$1, top: TOP_BAR_HEIGHT$1, bottom: SIDEBAR_PADDING$1, right: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabSet, __spreadValues({}, tabProps)) });
        }
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: "FileMenu", containerClass: "turquoise-yellow-file-menu", containerStyle: { position: "absolute", left: 0, top: 0, zIndex: TB_Z_INDEX, right: 0 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: "Toolbar", containerClass: "turquoise-yellow-toolbar", containerStyle: { position: "absolute", left: 0, top: TOP_BAR_HEIGHT$1, zIndex: TB_Z_INDEX, right: 0 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: "ToolbarVertical", containerClass: "turquoise-yellow-toolbar-vertical", vertical: true, containerStyle: { position: "absolute", left: 0, top: TOP_BAR_HEIGHT$1 + DEFAULT_TOOLBAR_SIZE, zIndex: TB_Z_INDEX, bottom: SIDEBAR_PADDING$1 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", left: DEFAULT_TOOLBAR_SIZE, top: TOP_BAR_HEIGHT$1 + DEFAULT_TOOLBAR_SIZE, bottom: SIDEBAR_PADDING$1, right: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Map, locale }),
          (() => {
            if (hasNavigator) {
              return /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Navigator, locale });
            }
          })()
        ] })
      ] })
    ] }) }),
    (() => {
      if (hasStatusBar) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "turquoise-yellow-status-bar", style: { position: "absolute", left: 0, bottom: 0, right: 0, height: bottomOffset }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.MouseCoordinates, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.ScaleDisplay, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.SelectedFeatureCount, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.ViewSize, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.PoweredByMapGuide, locale })
        ] });
      }
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ViewerApiShim, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModalLauncher, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FlyoutRegionContainer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InitWarningDisplay, {})
  ] });
};
function limegoldTemplateReducer(origState, state, action) {
  switch (action.type) {
    case ActionType.FUSION_SET_LEGEND_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1;
        if (data === true) {
          state1 = { legendVisible: true, taskPaneVisible: false, selectionPanelVisible: false };
        } else {
          state1 = { legendVisible: data };
        }
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1;
        if (data === true) {
          state1 = { legendVisible: false, taskPaneVisible: false, selectionPanelVisible: true };
        } else {
          state1 = { selectionPanelVisible: data };
        }
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.TASK_INVOKE_URL: {
      let state1 = { taskPaneVisible: true, selectionPanelVisible: false, legendVisible: false };
      return __spreadValues(__spreadValues({}, state), state1);
    }
    case ActionType.FUSION_SET_TASK_PANE_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1;
        if (data === true) {
          state1 = { legendVisible: false, taskPaneVisible: true, selectionPanelVisible: false };
        } else {
          state1 = { taskPaneVisible: data };
        }
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.FUSION_SET_ELEMENT_STATE: {
      const data = action.payload;
      if (isElementState(data)) {
        return __spreadValues(__spreadValues({}, state), data);
      }
    }
  }
  return state;
}
const SIDEBAR_PADDING = 0;
const TOP_BAR_HEIGHT = DEFAULT_TOOLBAR_SIZE;
const TAB_BAR_HEIGHT = 30;
const STATUS_BAR_HEIGHT$2 = 18;
const DEFAULT_LEGEND_COMPONENT_PROPS$2 = { inlineBaseLayerSwitcher: false };
const LimeGoldTemplateLayout = () => {
  const {
    isResizing,
    locale,
    capabilities,
    showSelection,
    showLegend,
    showTaskPane,
    onDragStart,
    onDragEnd,
    onSplitterChanged,
    onActiveElementChanged
  } = useCommonTemplateState(limegoldTemplateReducer);
  const { TabSet } = useElementContext();
  let hasTaskPane = false;
  let hasStatusBar = false;
  let hasNavigator = false;
  let hasSelectionPanel = false;
  let hasLegend = false;
  if (capabilities) {
    hasTaskPane = capabilities.hasTaskPane;
    hasStatusBar = capabilities.hasStatusBar;
    hasNavigator = capabilities.hasNavigator;
    hasSelectionPanel = capabilities.hasSelectionPanel;
    hasLegend = capabilities.hasLegend;
  }
  const bottomOffset = hasStatusBar ? STATUS_BAR_HEIGHT$2 : 0;
  const topOffset = TOP_BAR_HEIGHT + DEFAULT_TOOLBAR_SIZE * 2;
  const initInfoPaneWidth = useTemplateInitialInfoPaneWidth();
  const initTaskPaneWidth = useTemplateInitialTaskPaneWidth();
  const sbWidth = Math.max(initInfoPaneWidth, initTaskPaneWidth);
  const tabPanelStyle = {
    position: "absolute",
    top: TAB_BAR_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0
  };
  const states = [
    { id: "Selection", visible: showSelection },
    { id: "TaskPane", visible: showTaskPane },
    { id: "Legend", visible: showLegend }
  ];
  const active = states.filter((st) => st.visible);
  let extraTabsProps = {};
  if (active.length == 1) {
    extraTabsProps.activeTabId = active[0].id;
  }
  const taskPaneTitle = tr("TPL_TITLE_TASKPANE", locale);
  const legendTitle = tr("TPL_TITLE_LEGEND", locale);
  const selectionTitle = tr("TPL_TITLE_SELECTION_PANEL", locale);
  const TB_Z_INDEX = 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", height: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: "FileMenu", containerClass: "limegold-file-menu", containerStyle: { position: "absolute", left: 0, top: (TOP_BAR_HEIGHT - DEFAULT_TOOLBAR_SIZE) / 2, zIndex: TB_Z_INDEX, right: 0 } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: "Toolbar", containerClass: "limegold-toolbar", containerStyle: { position: "absolute", left: 0, top: TOP_BAR_HEIGHT, zIndex: TB_Z_INDEX, right: 0 } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: "ToolbarSecondary", containerClass: "limegold-toolbar-secondary", containerStyle: { position: "absolute", left: 0, top: TOP_BAR_HEIGHT + DEFAULT_TOOLBAR_SIZE, zIndex: TB_Z_INDEX, right: 0 } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", left: 0, top: topOffset, bottom: bottomOffset + SIDEBAR_PADDING, right: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SplitterLayout, { customClassName: "limegold-splitter", primaryIndex: 0, secondaryInitialSize: sbWidth, onSecondaryPaneSizeChange: onSplitterChanged, onDragStart, onDragEnd, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Map, locale }),
        (() => {
          if (hasNavigator) {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Navigator, locale });
          }
        })()
      ] }),
      (() => {
        if (showSelection || showTaskPane || showLegend) {
          const tabProps = __spreadValues({
            id: "SidebarTabs",
            onTabChanged: onActiveElementChanged,
            className: "limegold-sidebar-tabs",
            tabs: []
          }, extraTabsProps);
          if (hasTaskPane) {
            const panel = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: tabPanelStyle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.TaskPane, locale, componentProps: { isResizing } }) });
            tabProps.tabs.push({
              id: "TaskPane",
              title: taskPaneTitle,
              content: panel
            });
          }
          if (hasLegend) {
            const p1 = { overflow: "auto" };
            const panel = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: __spreadValues(__spreadValues({}, tabPanelStyle), p1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Legend, locale, componentProps: DEFAULT_LEGEND_COMPONENT_PROPS$2 }) });
            tabProps.tabs.push({
              id: "Legend",
              title: legendTitle,
              content: panel
            });
          }
          if (hasSelectionPanel) {
            const panel = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: tabPanelStyle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.SelectionPanel, locale }) });
            tabProps.tabs.push({
              id: "Selection",
              title: selectionTitle,
              content: panel
            });
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "limegold-sidebar", style: { position: "absolute", right: SIDEBAR_PADDING, top: 0, left: 0, bottom: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabSet, __spreadValues({}, tabProps)) });
        }
      })()
    ] }) }),
    (() => {
      if (hasStatusBar) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "limegold-status-bar", style: { position: "absolute", left: 0, bottom: 0, right: 0, height: bottomOffset }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.MouseCoordinates, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.ScaleDisplay, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.SelectedFeatureCount, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.ViewSize, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.PoweredByMapGuide, locale })
        ] });
      }
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ViewerApiShim, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModalLauncher, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FlyoutRegionContainer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InitWarningDisplay, {})
  ] });
};
function extractSize(entry, box, sizeType) {
  if (!entry[box]) {
    if (box === "contentBoxSize") {
      return entry.contentRect[sizeType === "inlineSize" ? "width" : "height"];
    }
    return void 0;
  }
  return Array.isArray(entry[box]) ? entry[box][0][sizeType] : (
    // @ts-ignore Support Firefox's non-standard behavior
    entry[box][sizeType]
  );
}
function useIsMounted() {
  const isMounted = reactExports.useRef(false);
  reactExports.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return reactExports.useCallback(() => isMounted.current, []);
}
const initialSize = {
  width: void 0,
  height: void 0
};
function useResizeObserver(options) {
  const { ref, box = "content-box" } = options;
  const [{ width, height }, setSize] = reactExports.useState(initialSize);
  const isMounted = useIsMounted();
  const previousSize = reactExports.useRef(__spreadValues({}, initialSize));
  const onResize = reactExports.useRef(void 0);
  onResize.current = options.onResize;
  reactExports.useEffect(() => {
    if (!ref.current) return;
    if (typeof window === "undefined" || !("ResizeObserver" in window)) return;
    const observer = new ResizeObserver(([entry]) => {
      const boxProp = box === "border-box" ? "borderBoxSize" : box === "device-pixel-content-box" ? "devicePixelContentBoxSize" : "contentBoxSize";
      const newWidth = extractSize(entry, boxProp, "inlineSize");
      const newHeight = extractSize(entry, boxProp, "blockSize");
      const hasChanged = previousSize.current.width !== newWidth || previousSize.current.height !== newHeight;
      if (hasChanged) {
        const newSize = { width: newWidth, height: newHeight };
        previousSize.current.width = newWidth;
        previousSize.current.height = newHeight;
        if (onResize.current) {
          onResize.current(newSize);
        } else {
          if (isMounted()) {
            setSize(newSize);
          }
        }
      }
    });
    observer.observe(ref.current, { box });
    return () => {
      observer.disconnect();
    };
  }, [box, ref, isMounted]);
  return { width, height };
}
const PANEL_HEADER_HEIGHT = 24;
function validatePanelId(panels, id) {
  if (!id) {
    return null;
  }
  const panel = panels.filter((p) => p.id == id)[0];
  if (panel) {
    return id;
  }
  return null;
}
const Accordion = reactExports.memo((props) => {
  const { Icon: BpIcon, Collapsible } = useElementContext();
  const target = reactExports.useRef(null);
  const { style, panels, isResizing, onActivePanelChanged } = props;
  const activeId = validatePanelId(props.panels, props.activePanelId);
  const [dim, setDim] = reactExports.useState({
    width: -1,
    height: -1
  });
  const [openPanel, setOpenPanel] = reactExports.useState(activeId || panels[panels.length - 1].id);
  reactExports.useEffect(() => {
    setOpenPanel(activeId || panels[panels.length - 1].id);
  }, [activeId]);
  reactExports.useLayoutEffect(() => {
    if (target.current) {
      setDim(target.current.getBoundingClientRect());
    }
  }, [target]);
  useResizeObserver({ ref: target, onResize: (size) => {
    var _a, _b;
    return setDim({ width: (_a = size.width) != null ? _a : -1, height: (_b = size.height) != null ? _b : -1 });
  } });
  const onTogglePanel = (e) => {
    const id = e.currentTarget.attributes["data-accordion-panel-id"].value;
    if (openPanel != id) {
      setOpenPanel(id);
      onActivePanelChanged == null ? void 0 : onActivePanelChanged(id);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: target, style, className: "component-accordion", children: panels.map((p) => {
    const isPanelOpen = p.id == openPanel;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `component-accordion-panel`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "component-accordion-panel-header", style: { height: PANEL_HEADER_HEIGHT }, "data-accordion-panel-id": p.id, onClick: onTogglePanel, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BpIcon, { icon: isPanelOpen ? "chevron-up" : "chevron-down" }),
        " ",
        p.title
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Collapsible, { isOpen: isPanelOpen, children: p.contentRenderer({ width: dim.width, height: dim.height - panels.length * PANEL_HEADER_HEIGHT }, isResizing) })
    ] }, p.id);
  }) });
});
function slateTemplateReducer(origState, state, action) {
  switch (action.type) {
    case ActionType.FUSION_SET_LEGEND_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1;
        if (data === true) {
          state1 = { legendVisible: true, taskPaneVisible: false, selectionPanelVisible: false };
        } else {
          state1 = { legendVisible: data };
        }
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1;
        if (data === true) {
          state1 = { legendVisible: false, taskPaneVisible: false, selectionPanelVisible: true };
        } else {
          state1 = { selectionPanelVisible: data };
        }
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.TASK_INVOKE_URL: {
      let state1 = { taskPaneVisible: true, selectionPanelVisible: false, legendVisible: false };
      return __spreadValues(__spreadValues({}, state), state1);
    }
    case ActionType.FUSION_SET_TASK_PANE_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1;
        if (data === true) {
          state1 = { legendVisible: false, taskPaneVisible: true, selectionPanelVisible: false };
        } else {
          state1 = { taskPaneVisible: data };
        }
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.FUSION_SET_ELEMENT_STATE: {
      const data = action.payload;
      if (isElementState(data)) {
        return __spreadValues(__spreadValues({}, state), data);
      }
    }
  }
  return state;
}
const STATUS_BAR_HEIGHT$1 = 18;
const ACCORDION_STYLE$1 = { position: "absolute", top: 0, bottom: 0, left: 0, right: 0 };
const DEFAULT_LEGEND_COMPONENT_PROPS$1 = { inlineBaseLayerSwitcher: false };
const SlateTemplateLayout = () => {
  const {
    isResizing,
    locale,
    capabilities,
    showSelection,
    showLegend,
    showTaskPane,
    onDragStart,
    onDragEnd,
    onSplitterChanged,
    onActiveElementChanged
  } = useCommonTemplateState(slateTemplateReducer);
  let hasStatusBar = false;
  let hasNavigator = false;
  if (capabilities) {
    hasStatusBar = capabilities.hasStatusBar;
    hasNavigator = capabilities.hasNavigator;
  }
  const initInfoPaneWidth = useTemplateInitialInfoPaneWidth();
  const initTaskPaneWidth = useTemplateInitialTaskPaneWidth();
  const sbWidth = Math.max(initInfoPaneWidth, initTaskPaneWidth);
  const bottomOffset = hasStatusBar ? STATUS_BAR_HEIGHT$1 : 0;
  const topOffset = DEFAULT_TOOLBAR_SIZE * 3;
  const panels = reactExports.useMemo(() => [
    {
      id: "Legend",
      title: tr("TPL_TITLE_LEGEND", locale),
      contentRenderer: (dim) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: dim.width, height: dim.height, overflowY: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlaceholderComponent,
          {
            id: DefaultComponentNames.Legend,
            locale,
            componentProps: DEFAULT_LEGEND_COMPONENT_PROPS$1
          }
        ) });
      }
    },
    {
      id: "Selection",
      title: tr("TPL_TITLE_SELECTION_PANEL", locale),
      contentRenderer: (dim) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: dim.width, height: dim.height, overflowY: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlaceholderComponent,
          {
            id: DefaultComponentNames.SelectionPanel,
            locale
          }
        ) });
      }
    },
    {
      id: "TaskPane",
      title: tr("TPL_TITLE_TASKPANE", locale),
      contentRenderer: (dim, isResizing2) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: dim.width, height: dim.height, overflowY: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlaceholderComponent,
          {
            id: DefaultComponentNames.TaskPane,
            locale,
            componentProps: { isResizing: isResizing2 }
          }
        ) });
      }
    }
  ], [locale]);
  let activeId;
  const states = [
    { id: "Selection", visible: showSelection },
    { id: "TaskPane", visible: showTaskPane },
    { id: "Legend", visible: showLegend }
  ];
  const active = states.filter((st) => st.visible);
  if (active.length == 1) {
    activeId = active[0].id;
  }
  const TB_Z_INDEX = 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", height: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", left: 0, top: 0, bottom: bottomOffset, right: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SplitterLayout, { customClassName: "slate-splitter", primaryIndex: 1, secondaryInitialSize: sbWidth, onSecondaryPaneSizeChange: onSplitterChanged, onDragStart, onDragEnd, children: [
      (() => {
        if (showSelection || showTaskPane || showLegend) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { style: ACCORDION_STYLE$1, onActivePanelChanged: onActiveElementChanged, activePanelId: activeId, panels, isResizing }) });
        }
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: "FileMenu", containerClass: "slate-file-menu", containerStyle: { position: "absolute", left: 0, top: 0, zIndex: TB_Z_INDEX, right: 0 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: "Toolbar", containerClass: "slate-toolbar", containerStyle: { position: "absolute", left: 0, top: DEFAULT_TOOLBAR_SIZE, zIndex: TB_Z_INDEX, right: 0 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: "ToolbarSecondary", containerClass: "slate-toolbar-secondary", containerStyle: { position: "absolute", left: 0, top: DEFAULT_TOOLBAR_SIZE * 2, zIndex: TB_Z_INDEX, right: 0 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", left: 0, right: 0, top: topOffset, bottom: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Map, locale }),
          (() => {
            if (hasNavigator) {
              return /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Navigator, locale });
            }
          })()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ViewerApiShim, {})
      ] })
    ] }) }),
    (() => {
      if (hasStatusBar) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "slate-status-bar", style: { position: "absolute", left: 0, bottom: 0, right: 0, height: bottomOffset }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.MouseCoordinates, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.ScaleDisplay, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.SelectedFeatureCount, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.ViewSize, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.PoweredByMapGuide, locale })
        ] });
      }
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModalLauncher, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FlyoutRegionContainer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InitWarningDisplay, {})
  ] });
};
function maroonTemplateReducer(origState, state, action) {
  switch (action.type) {
    case ActionType.FUSION_SET_LEGEND_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1;
        if (data === true) {
          state1 = { legendVisible: true, taskPaneVisible: false, selectionPanelVisible: false };
        } else {
          state1 = { legendVisible: data };
        }
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1;
        if (data === true) {
          state1 = { legendVisible: false, taskPaneVisible: false, selectionPanelVisible: true };
        } else {
          state1 = { selectionPanelVisible: data };
        }
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.TASK_INVOKE_URL: {
      let state1 = { taskPaneVisible: true, selectionPanelVisible: false, legendVisible: false };
      return __spreadValues(__spreadValues({}, state), state1);
    }
    case ActionType.FUSION_SET_TASK_PANE_VISIBILITY: {
      const data = action.payload;
      if (typeof data == "boolean") {
        let state1;
        if (data === true) {
          state1 = { legendVisible: false, taskPaneVisible: true, selectionPanelVisible: false };
        } else {
          state1 = { taskPaneVisible: data };
        }
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.FUSION_SET_ELEMENT_STATE: {
      const data = action.payload;
      if (isElementState(data)) {
        return __spreadValues(__spreadValues({}, state), data);
      }
    }
  }
  return state;
}
const STATUS_BAR_HEIGHT = 18;
const OUTER_PADDING = 3;
const ACCORDION_STYLE = { position: "absolute", top: OUTER_PADDING, bottom: 0, right: OUTER_PADDING, left: 0 };
const DEFAULT_LEGEND_COMPONENT_PROPS = { inlineBaseLayerSwitcher: false };
const MaroonTemplateLayout = () => {
  const {
    isResizing,
    locale,
    capabilities,
    showSelection,
    showLegend,
    showTaskPane,
    onDragStart,
    onDragEnd,
    onSplitterChanged,
    onActiveElementChanged
  } = useCommonTemplateState(maroonTemplateReducer);
  let hasStatusBar = false;
  let hasNavigator = false;
  if (capabilities) {
    hasStatusBar = capabilities.hasStatusBar;
    hasNavigator = capabilities.hasNavigator;
  }
  const bottomOffset = hasStatusBar ? STATUS_BAR_HEIGHT : 0;
  const topOffset = DEFAULT_TOOLBAR_SIZE * 2 + OUTER_PADDING;
  const panels = reactExports.useMemo(() => [
    {
      id: "Legend",
      title: tr("TPL_TITLE_LEGEND", locale),
      contentRenderer: (dim) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: dim.width, height: dim.height, overflowY: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlaceholderComponent,
          {
            id: DefaultComponentNames.Legend,
            locale,
            componentProps: DEFAULT_LEGEND_COMPONENT_PROPS
          }
        ) });
      }
    },
    {
      id: "Selection",
      title: tr("TPL_TITLE_SELECTION_PANEL", locale),
      contentRenderer: (dim) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: dim.width, height: dim.height, overflowY: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlaceholderComponent,
          {
            id: DefaultComponentNames.SelectionPanel,
            locale
          }
        ) });
      }
    },
    {
      id: "TaskPane",
      title: tr("TPL_TITLE_TASKPANE", locale),
      contentRenderer: (dim, isResizing2) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: dim.width, height: dim.height, overflowY: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlaceholderComponent,
          {
            id: DefaultComponentNames.TaskPane,
            locale,
            componentProps: { isResizing: isResizing2 }
          }
        ) });
      }
    }
  ], [locale]);
  let activeId;
  const states = [
    { id: "Selection", visible: showSelection },
    { id: "TaskPane", visible: showTaskPane },
    { id: "Legend", visible: showLegend }
  ];
  const active = states.filter((st) => st.visible);
  if (active.length == 1) {
    activeId = active[0].id;
  }
  const initInfoPaneWidth = useTemplateInitialInfoPaneWidth();
  const initTaskPaneWidth = useTemplateInitialTaskPaneWidth();
  const sbWidth = Math.max(initInfoPaneWidth, initTaskPaneWidth);
  const TB_Z_INDEX = 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", height: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", left: 0, top: 0, bottom: bottomOffset, right: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SplitterLayout, { customClassName: "maroon-splitter", primaryIndex: 0, secondaryInitialSize: sbWidth, onSecondaryPaneSizeChange: onSplitterChanged, onDragStart, onDragEnd, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: "FileMenu", containerClass: "maroon-file-menu", containerStyle: { position: "absolute", left: OUTER_PADDING, top: OUTER_PADDING, right: 0, zIndex: TB_Z_INDEX } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: "Toolbar", containerClass: "maroon-toolbar", containerStyle: { position: "absolute", left: OUTER_PADDING, top: DEFAULT_TOOLBAR_SIZE + OUTER_PADDING, right: 0, zIndex: TB_Z_INDEX } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarContainer, { id: "ToolbarVertical", containerClass: "maroon-toolbar-vertical", vertical: true, containerStyle: { position: "absolute", left: OUTER_PADDING, top: topOffset, bottom: 0, zIndex: TB_Z_INDEX, right: 0 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", left: OUTER_PADDING + DEFAULT_TOOLBAR_SIZE, right: 0, top: topOffset, bottom: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Map, locale }),
          (() => {
            if (hasNavigator) {
              return /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Navigator, locale });
            }
          })()
        ] })
      ] }),
      (() => {
        if (showSelection || showTaskPane || showLegend) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { style: ACCORDION_STYLE, onActivePanelChanged: onActiveElementChanged, activePanelId: activeId, panels, isResizing }) });
        }
      })()
    ] }) }),
    (() => {
      if (hasStatusBar) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "maroon-status-bar", style: { position: "absolute", left: 0, bottom: 0, right: 0, height: bottomOffset }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.MouseCoordinates, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.ScaleDisplay, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.SelectedFeatureCount, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.ViewSize, locale }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.PoweredByMapGuide, locale })
        ] });
      }
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ViewerApiShim, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModalLauncher, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FlyoutRegionContainer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InitWarningDisplay, {})
  ] });
};
function formatCoordinates(props) {
  const { coords, decimals, format, units } = props;
  if (coords == null) {
    return null;
  }
  const [x, y] = coords;
  const sfmt = format || "X: {x}, Y: {y} {units}";
  const str = fmt(sfmt, {
    x: `${decimals != null ? x.toFixed(decimals) : x}`,
    y: `${decimals != null ? y.toFixed(decimals) : y}`,
    units: units || ""
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: purify.sanitize(strTrim(str)) } });
}
const MouseCoordinates = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "status-bar-component component-mouse-coordinates", style: props.style, children: formatCoordinates(props) });
};
const MouseCoordinatesContainer = (props) => {
  const { style } = props;
  const mapProjection = useActiveMapProjection();
  const projection = useConfiguredCoordinateProjection();
  const decimals = useConfiguredCoordinateDecimals();
  const format = useConfiguredCoordinateFormat();
  const mapCoordinateFormat = useActiveMapCoordinateFormat();
  const mouse = useCurrentMouseCoordinates();
  const locale = useViewerLocale();
  if (mouse) {
    const prj = get(projection != null ? projection : mapProjection);
    let units;
    if (prj) {
      units = prj.getUnits();
      switch (units) {
        case "degrees":
          units = getUnitOfMeasure(UnitOfMeasure.Degrees).abbreviation(locale);
          break;
        case "pixels":
        case "tile-pixels":
          units = getUnitOfMeasure(UnitOfMeasure.Pixels).abbreviation(locale);
          break;
        case "m":
          units = getUnitOfMeasure(UnitOfMeasure.Meters).abbreviation(locale);
          break;
        case "ft":
        case "us-ft":
          units = getUnitOfMeasure(UnitOfMeasure.Feet).abbreviation(locale);
          break;
      }
    }
    let coords = [mouse[0], mouse[1]];
    if (projection && mapProjection) {
      try {
        coords = transform(coords, mapProjection, projection);
      } catch (e) {
      }
    }
    const effectiveFormat = mapCoordinateFormat || format;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MouseCoordinates, { units, coords, style, decimals, format: effectiveFormat });
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {});
  }
};
var ZoomDirection = /* @__PURE__ */ ((ZoomDirection2) => {
  ZoomDirection2[ZoomDirection2["In"] = 0] = "In";
  ZoomDirection2[ZoomDirection2["Out"] = 1] = "Out";
  return ZoomDirection2;
})(ZoomDirection || {});
var PanDirection = /* @__PURE__ */ ((PanDirection2) => {
  PanDirection2[PanDirection2["East"] = 0] = "East";
  PanDirection2[PanDirection2["West"] = 1] = "West";
  PanDirection2[PanDirection2["South"] = 2] = "South";
  PanDirection2[PanDirection2["North"] = 3] = "North";
  return PanDirection2;
})(PanDirection || {});
const VERT_START = 10;
const VERT_SPAN = 81;
const LN9 = Math.log(9);
function calculatePosForScale(scale, finiteScaleList) {
  if (finiteScaleList) {
    const index2 = getFiniteScaleIndexForScale(finiteScaleList, scale);
    const pos = VERT_SPAN / finiteScaleList.length * (index2 + 1);
    return Math.floor(pos);
  } else {
    const pos = 9 * Math.log(scale) / LN9;
    return Math.floor(pos);
  }
}
function calculateScaleForPos(pos, finiteScaleList) {
  const scale = Math.pow(9, pos / 9);
  {
    return scale;
  }
}
const Navigator = (props) => {
  const { busy, locale } = props;
  const onPanEast = () => {
    props.onPan(
      0
      /* East */
    );
  };
  const onPanWest = () => {
    props.onPan(
      1
      /* West */
    );
  };
  const onPanSouth = () => {
    props.onPan(
      2
      /* South */
    );
  };
  const onPanNorth = () => {
    props.onPan(
      3
      /* North */
    );
  };
  const onZoomOut = () => {
    props.onZoom(
      1
      /* Out */
    );
  };
  const onZoomIn = () => {
    props.onZoom(
      0
      /* In */
    );
  };
  const onStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setPreviewPos(pos);
  };
  const onDrag = (e, data) => {
    e.preventDefault();
    const pos2 = previewPos;
    setPreviewPos(pos2 + data.deltaY);
  };
  const onStop = (e) => {
    e.preventDefault();
    const newScale = calculateScaleForPos(previewPos);
    setIsDragging(false);
    setPos(previewPos);
    props.onRequestZoomToScale(newScale);
  };
  const [previewPos, setPreviewPos] = reactExports.useState(calculatePosForScale(props.scale, props.finiteScaleList));
  const [pos, setPos] = reactExports.useState(calculatePosForScale(props.scale, props.finiteScaleList));
  const [isDragging, setIsDragging] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const pos2 = calculatePosForScale(props.scale, props.finiteScaleList);
    setPos(pos2);
    setPreviewPos(pos2);
  }, [props.scale, props.finiteScaleList]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "Navigator", style: props.style, className: "component-navigator noselect", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("map", { name: "Navigator_ImageMap", id: "Navigator_ImageMap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("area", { onClick: onPanEast, shape: "poly", alt: tr("NAVIGATOR_PAN_EAST", locale), title: tr("NAVIGATOR_PAN_EAST", locale), coords: "27,176, 27,177, 40,190, 44,182, 44,159" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("area", { onClick: onPanWest, shape: "poly", alt: tr("NAVIGATOR_PAN_WEST", locale), title: tr("NAVIGATOR_PAN_WEST", locale), coords: "24,177, 24,176, 7,159, 7,182, 11,190" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("area", { onClick: onPanSouth, shape: "poly", alt: tr("NAVIGATOR_PAN_SOUTH", locale), title: tr("NAVIGATOR_PAN_SOUTH", locale), coords: "25,178, 12,191, 21,197, 30,197, 39,191, 26,178" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("area", { onClick: onPanNorth, shape: "poly", alt: tr("NAVIGATOR_PAN_NORTH", locale), title: tr("NAVIGATOR_PAN_NORTH", locale), coords: "26,175, 43,158, 8,158, 25,175" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("area", { onClick: onZoomOut, shape: "circle", alt: tr("NAVIGATOR_ZOOM_OUT", locale), title: tr("NAVIGATOR_ZOOM_OUT", locale), coords: "25,142,8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("area", { onClick: onZoomIn, shape: "circle", alt: tr("NAVIGATOR_ZOOM_IN", locale), title: tr("NAVIGATOR_ZOOM_IN", locale), coords: "25,34,8" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: IMG_SLIDER_SCALE, className: "png24", width: "51", height: "201", useMap: "#Navigator_ImageMap", style: { position: "absolute", left: 0, top: 0 } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: 6, left: 6, width: 39, height: 16 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: GIF_SPINNER, className: "navigator-spinner", width: "18", height: "6", style: { position: "absolute", top: 3, right: 4, visibility: busy ? "visible" : "hidden" } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Draggable,
      {
        axis: "y",
        handle: "img.navigator-drag-handle",
        position: { x: 0, y: VERT_START + pos },
        bounds: { top: VERT_START, bottom: VERT_START + VERT_SPAN, left: 0, right: 0 },
        onStart,
        onDrag,
        onStop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: IMG_SLIDER, className: "png24 navigator-drag-handle", width: "29", height: "12", style: { position: "relative", left: 11, top: 28 } }),
          (() => {
            if (isDragging === true) {
              const dragLabel = tr("FMT_NAVIGATOR_ZOOM_TO_SCALE", props.locale, { scale: calculateScaleForPos(previewPos).toFixed(2) });
              return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tooltip", style: { position: "relative", width: 170, right: 190, top: 28, textAlign: "right" }, children: dragLabel });
            }
          })()
        ] })
      }
    )
  ] });
};
const NavigatorContainer = (props) => {
  const { style } = props;
  const dispatch = useReduxDispatch();
  const locale = useViewerLocale();
  const finiteScales = useActiveMapFiniteScales();
  const view = useActiveMapView();
  const busyCount = useViewerBusyCount();
  const activeMapName = useActiveMapName();
  const viewer = useMapProviderContext();
  const setScaleAction = (mapName, scale) => dispatch(setScale(viewer, mapName, scale));
  const invokeCommandAction = (cmd, parameters) => dispatch(invokeCommand(cmd, viewer, parameters));
  const onZoom = (direction) => {
    let cmd;
    switch (direction) {
      case ZoomDirection.In:
        cmd = getCommand(DefaultCommands.ZoomIn);
        break;
      case ZoomDirection.Out:
        cmd = getCommand(DefaultCommands.ZoomOut);
        break;
    }
    if (cmd) {
      invokeCommandAction(cmd);
    }
  };
  const onPan = (direction) => {
    let cmd;
    switch (direction) {
      case PanDirection.East:
        cmd = getCommand(DefaultCommands.PanRight);
        break;
      case PanDirection.West:
        cmd = getCommand(DefaultCommands.PanLeft);
        break;
      case PanDirection.North:
        cmd = getCommand(DefaultCommands.PanUp);
        break;
      case PanDirection.South:
        cmd = getCommand(DefaultCommands.PanDown);
        break;
    }
    if (cmd) {
      invokeCommandAction(cmd);
    }
  };
  const onRequestZoomToScale = (scale) => {
    if (activeMapName) {
      setScaleAction(activeMapName, scale);
    }
  };
  if (view) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Navigator,
      {
        style,
        scale: view.scale,
        finiteScaleList: finiteScales,
        locale,
        busy: busyCount > 0,
        onRequestZoomToScale,
        onPan,
        onZoom
      }
    );
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {});
  }
};
const ScaleDisplay = (props) => {
  const { view, style, locale, finiteScales, onScaleChanged } = props;
  const [localScale, setLocalScale] = reactExports.useState(void 0);
  const onFiniteScaleChanged = (e) => onScaleChanged == null ? void 0 : onScaleChanged(parseFloat(e.target.value));
  const onScaleKeyPressed = (e) => {
    if (e.key == "Enter" && localScale) {
      onScaleChanged == null ? void 0 : onScaleChanged(localScale);
    }
  };
  const onScaleInputChanged = (e) => setLocalScale(parseFloat(e.target.value));
  reactExports.useEffect(() => {
    if (!finiteScales && view && view.scale != localScale) {
      setLocalScale(view.scale);
    }
  }, [finiteScales, view]);
  const label = tr("FMT_SCALE_DISPLAY", locale, {
    scale: ""
  });
  if (finiteScales) {
    const fi = getFiniteScaleIndexForScale(finiteScales, view.scale);
    const fiScale = finiteScales[fi];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-bar-component component-scale-display", style, children: [
      label,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "scale-input", value: fiScale, onChange: onFiniteScaleChanged, children: finiteScales.map((s) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s);
      }) })
    ] });
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-bar-component component-scale-display", style, children: [
      label,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "scale-input", type: "number", value: localScale || "", onChange: onScaleInputChanged, onKeyPress: onScaleKeyPressed })
    ] });
  }
};
const ScaleDisplayContainer = (props) => {
  const { style } = props;
  const dispatch = useReduxDispatch();
  const locale = useViewerLocale();
  const activeMapName = useActiveMapName();
  const view = useActiveMapView();
  const finiteScales = useActiveMapFiniteScales();
  const viewer = useMapProviderContext();
  const setScaleAction = (mapName, scale) => dispatch(setScale(viewer, mapName, scale));
  const onScaleChanged = (scale) => {
    if (activeMapName) {
      setScaleAction(activeMapName, scale);
    }
  };
  if (view) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScaleDisplay,
      {
        onScaleChanged,
        view,
        style,
        finiteScales,
        locale
      }
    );
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("noscript", {});
  }
};
const TASK_PANE_OVERLAY_BGCOLOR = "#dee8f9";
function currentUrlDoesNotMatchMapName(currentUrl, mapName) {
  const normUrl = currentUrl.toLowerCase();
  if (normUrl.indexOf("mapname=") >= 0 && mapName) {
    return normUrl.indexOf(`mapname=${mapName.toLowerCase()}`) < 0;
  } else {
    return false;
  }
}
const TaskFrameLoadingOverlay = ({ locale }) => {
  const { NonIdealState, Spinner } = useElementContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: TASK_PANE_OVERLAY_BGCOLOR }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    NonIdealState,
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { sizePreset: "large" }),
      title: tr("TASK_PANE_LOADING", locale),
      description: tr("TASK_PANE_LOADING_DESC", locale)
    }
  ) }, "taskPaneFrameLoadingOverlay");
};
const TaskPane = (props) => {
  const {
    currentUrl,
    mapName,
    locale,
    homeAction,
    backAction,
    forwardAction,
    onUrlLoaded,
    lastUrlPushed,
    showTaskBar,
    maxHeight,
    flyoutStates,
    onOpenFlyout,
    onCloseFlyout
  } = props;
  const [activeComponent, setActiveComponent] = reactExports.useState(null);
  const [activeComponentProps, setActiveComponentProps] = reactExports.useState(null);
  const [invalidated, setInvalidated] = reactExports.useState(false);
  const [frameContentLoaded, setFrameContentLoaded] = reactExports.useState(false);
  const iframeRef = reactExports.useRef(null);
  const taskButtons = reactExports.useMemo(() => [
    homeAction,
    { isSeparator: true },
    backAction,
    forwardAction
  ], [homeAction, backAction, forwardAction]);
  const handleCloseFlyout = reactExports.useCallback((id) => {
    onCloseFlyout == null ? void 0 : onCloseFlyout(id);
  }, [onCloseFlyout]);
  const handleOpenFlyout = reactExports.useCallback((id, metrics) => {
    onOpenFlyout == null ? void 0 : onOpenFlyout(id, metrics);
  }, [onOpenFlyout]);
  const handleFrameMounted = reactExports.useCallback((iframe) => {
    iframeRef.current = iframe;
    if (iframe) {
      iframe.taskPaneId = FUSION_TASKPANE_NAME;
    }
  }, []);
  const handleFrameLoaded = reactExports.useCallback((e) => {
    const frame = e.currentTarget;
    if (frame.contentWindow) {
      setFrameContentLoaded(true);
      onUrlLoaded(frame.contentWindow.location.href);
    }
  }, [onUrlLoaded]);
  reactExports.useEffect(() => {
    if (currentUrl && lastUrlPushed === false) {
      loadUrl(currentUrl);
    }
  }, [currentUrl, lastUrlPushed]);
  reactExports.useEffect(() => {
    if (!invalidated && currentUrl && currentUrl.indexOf("component://") !== 0 && currentUrlDoesNotMatchMapName(currentUrl, mapName)) {
      setInvalidated(true);
    } else if (invalidated && currentUrl && (currentUrl.indexOf("component://") === 0 || !currentUrlDoesNotMatchMapName(currentUrl, mapName))) {
      setInvalidated(false);
    }
  }, [currentUrl, mapName, invalidated]);
  reactExports.useEffect(() => {
    if (currentUrl && activeComponent === null) {
      loadUrl(currentUrl);
    }
  }, []);
  const loadUrl = reactExports.useCallback((url) => {
    const compUri = parseComponentUri(url);
    if (compUri) {
      setActiveComponent(compUri.name);
      setActiveComponentProps(compUri.props);
    } else {
      setActiveComponent(null);
      setFrameContentLoaded(false);
      setActiveComponentProps(null);
      setTimeout(() => {
        var _a;
        if (iframeRef.current) {
          (_a = iframeRef.current.contentWindow) == null ? void 0 : _a.location.replace(url);
        }
      }, 0);
    }
  }, []);
  const taskMenu = reactExports.useMemo(() => ({
    label: tr("MENU_TASKS", locale),
    flyoutAlign: "bottom left",
    flyoutId: WEBLAYOUT_TASKMENU
  }), [locale]);
  const rootStyle = {
    position: "relative",
    overflow: "hidden"
  };
  const taskBarStyle = {
    height: DEFAULT_TOOLBAR_SIZE,
    backgroundColor: TOOLBAR_BACKGROUND_COLOR
  };
  const taskBodyStyle = {};
  const taskFrameStyle = {
    border: "none"
  };
  const taskComponentContainerStyle = {
    border: "none"
  };
  if (!maxHeight) {
    rootStyle.width = "100%";
    rootStyle.height = "100%";
    taskBarStyle.position = "absolute";
    taskBarStyle.top = 0;
    taskBarStyle.left = 0;
    taskBarStyle.right = 0;
    taskBodyStyle.position = "absolute";
    taskBodyStyle.top = showTaskBar === true ? DEFAULT_TOOLBAR_SIZE : 0;
    taskBodyStyle.left = 0;
    taskBodyStyle.right = 0;
    taskBodyStyle.bottom = 0;
    taskBodyStyle.overflow = "hidden";
    taskFrameStyle.width = "100%";
    taskFrameStyle.height = "100%";
    taskComponentContainerStyle.width = "100%";
    taskComponentContainerStyle.height = "100%";
  } else {
    taskFrameStyle.width = "100%";
    taskFrameStyle.height = showTaskBar === true ? maxHeight - DEFAULT_TOOLBAR_SIZE : maxHeight;
    taskComponentContainerStyle.width = "100%";
    taskComponentContainerStyle.maxHeight = showTaskBar === true ? maxHeight - DEFAULT_TOOLBAR_SIZE : maxHeight;
    taskComponentContainerStyle.overflowY = "auto";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: rootStyle, children: [
    showTaskBar === true && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: taskBarStyle, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toolbar, { childItems: taskButtons, containerStyle: { float: "left", height: DEFAULT_TOOLBAR_SIZE }, onCloseFlyout: handleCloseFlyout, onOpenFlyout: handleOpenFlyout, flyoutStates }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toolbar, { childItems: [taskMenu], containerStyle: { float: "right", height: DEFAULT_TOOLBAR_SIZE }, onCloseFlyout: handleCloseFlyout, onOpenFlyout: handleOpenFlyout, flyoutStates }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { clear: "both" } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: taskBodyStyle, children: [
      activeComponent != null ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: __spreadProps(__spreadValues({}, taskComponentContainerStyle), { overflowY: "auto" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: activeComponent, componentProps: activeComponentProps, locale }) }) : (() => {
        const components2 = [
          /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { name: "taskPaneFrame", ref: handleFrameMounted, onLoad: handleFrameLoaded, style: taskFrameStyle }, "taskPaneFrame")
        ];
        if (frameContentLoaded === false) {
          components2.push(/* @__PURE__ */ jsxRuntimeExports.jsx(TaskFrameLoadingOverlay, { locale }, "loading-overlay"));
        }
        return components2;
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { name: "scriptFrame", style: { width: 0, height: 0, visibility: "hidden" } })
    ] })
  ] });
};
const TaskPaneResizingPlaceholder = ({ locale }) => {
  const { NonIdealState } = useElementContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: TASK_PANE_OVERLAY_BGCOLOR }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    NonIdealState,
    {
      icon: "arrows-horizontal",
      description: tr("TASK_PANE_RESIZING", locale)
    }
  ) });
};
const TaskPaneContainer = (props) => {
  var _a, _b, _c, _d;
  const locale = useViewerLocale();
  const map = useActiveMapBranch();
  const flyouts = useViewerFlyouts();
  const initialUrl = useTaskPaneInitialUrl();
  const lastUrlPushed = useTaskPaneLastUrlPushed();
  const navIndex = useTaskPaneNavigationIndex();
  const navigationStack = useTaskPaneNavigationStack();
  const hasTaskBar = useConfiguredCapabilities().hasTaskBar;
  const dispatch = useReduxDispatch();
  const goHomeAction = () => dispatch(goHome());
  const goForwardAction = () => dispatch(goForward());
  const goBackAction = () => dispatch(goBack());
  const pushUrlAction = (url, silent) => dispatch(pushUrl(url, silent));
  const openFlyoutAction = (id, metrics) => dispatch(openFlyout(id, metrics));
  const closeFlyoutAction = (id) => dispatch(closeFlyout(id));
  const getLocale = reactExports.useCallback(() => locale, [locale]);
  const canGoHome = reactExports.useCallback(() => {
    var _a2, _b2, _c2, _d2, _e;
    if (initialUrl) {
      const initUrl = ((_a2 = map == null ? void 0 : map.mapguide) == null ? void 0 : _a2.runtimeMap) && initialUrl ? ensureParameters(initialUrl, (_c2 = (_b2 = map == null ? void 0 : map.mapguide) == null ? void 0 : _b2.runtimeMap) == null ? void 0 : _c2.Name, (_e = (_d2 = map == null ? void 0 : map.mapguide) == null ? void 0 : _d2.runtimeMap) == null ? void 0 : _e.SessionId, getLocale()) : initialUrl;
      return navigationStack.length > 0 && !areUrlsSame(navigationStack[navIndex], initUrl);
    }
    return false;
  }, [initialUrl, map, navigationStack, navIndex, getLocale]);
  const canGoBack = reactExports.useCallback(() => navIndex > 0, [navIndex]);
  const canGoForward = reactExports.useCallback(() => navIndex < navigationStack.length - 1, [navIndex, navigationStack]);
  const homeAction = reactExports.useMemo(() => ({
    svgIconName: "home",
    tooltip: tr("TT_GO_HOME", locale),
    enabled: canGoHome,
    invoke: goHomeAction
  }), [locale, canGoHome, goHomeAction]);
  const backAction = reactExports.useMemo(() => ({
    svgIconName: "arrow-left",
    tooltip: tr("TT_GO_BACK", locale),
    enabled: canGoBack,
    invoke: goBackAction
  }), [locale, canGoBack, goBackAction]);
  const forwardAction = reactExports.useMemo(() => ({
    svgIconName: "arrow-right",
    tooltip: tr("TT_GO_FORWARD", locale),
    enabled: canGoForward,
    invoke: goForwardAction
  }), [locale, canGoForward, goForwardAction]);
  const onCloseFlyout = reactExports.useCallback((id) => closeFlyoutAction(id), [closeFlyoutAction]);
  const onOpenFlyout = reactExports.useCallback((id, metrics) => openFlyoutAction(id, metrics), [openFlyoutAction]);
  const onUrlLoaded = reactExports.useCallback((url) => {
    const currentUrl = navigationStack[navIndex];
    if (!areUrlsSame(currentUrl, url)) {
      pushUrlAction(url);
    }
  }, [navigationStack, navIndex, pushUrlAction]);
  if (navigationStack[navIndex]) {
    const flyoutStates = {};
    if (flyouts) {
      const ids = Object.keys(flyouts);
      for (const fid of ids) {
        flyoutStates[fid] = !!flyouts[fid].open;
      }
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", height: "100%", position: "relative" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TaskPane,
        {
          currentUrl: navigationStack[navIndex],
          showTaskBar: hasTaskBar,
          lastUrlPushed,
          homeAction,
          backAction,
          onOpenFlyout,
          onCloseFlyout,
          forwardAction,
          session: (_b = (_a = map == null ? void 0 : map.mapguide) == null ? void 0 : _a.runtimeMap) == null ? void 0 : _b.SessionId,
          mapName: (_d = (_c = map == null ? void 0 : map.mapguide) == null ? void 0 : _c.runtimeMap) == null ? void 0 : _d.Name,
          onUrlLoaded,
          maxHeight: props.maxHeight,
          flyoutStates,
          locale: getLocale()
        }
      ),
      props.isResizing === true && /* @__PURE__ */ jsxRuntimeExports.jsx(TaskPaneResizingPlaceholder, { locale: getLocale() })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("noscript", {});
};
const About = () => {
  const { Heading } = useElementContext();
  const locale = useViewerLocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "component-about-dialog-content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 4, children: "mapguide-react-layout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      tr("ABOUT_HASH_LABEL", locale),
      " ",
      ""
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { target: "_blank", href: "https://github.com/jumpinjackie/mapguide-react-layout", children: "GitHub" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { target: "_blank", href: "https://github.com/jumpinjackie/mapguide-react-layout/issues", children: "Issues" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Uses icons from the ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { target: "_blank", href: "http://p.yusukekamiyamane.com/", children: "Fugue icon set by Yusuke Kamiyamane" })
    ] })
  ] });
};
const LAYER_NAME = "measure-layer";
function isArbitraryProjection(proj) {
  if (proj instanceof Projection) {
    return /XY-[A-Z]+/.test(proj.getCode());
  }
  return false;
}
class MeasureContext {
  constructor(viewer, mapName, parent) {
    this.onDrawStart = (evt) => {
      this.sketch = evt.feature;
      let tooltipCoord = evt.coordinate;
      if (this.sketch) {
        const g = this.sketch.getGeometry();
        if (g) {
          this.listener = g.on("change", (e) => {
            const geom = e.target;
            let output;
            if (geom instanceof Polygon) {
              const [o, total, segments] = this.formatArea(geom);
              output = o;
              if (this.callback) {
                this.callback.updateSegments("Area", total, segments);
              }
              tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof LineString) {
              const [o, total, segments] = this.formatLength(geom);
              output = o;
              if (this.callback) {
                this.callback.updateSegments("LineString", total, segments);
              }
              tooltipCoord = geom.getLastCoordinate();
            } else {
              output = "";
            }
            if (this.measureTooltipElement) {
              this.measureTooltipElement.innerHTML = output;
            }
            this.measureTooltip.setPosition(tooltipCoord);
          });
        }
      }
    };
    this.onDrawEnd = () => {
      if (this.measureTooltipElement) {
        this.measureTooltipElement.className = "tooltip tooltip-static";
      }
      this.measureTooltip.setOffset([0, -7]);
      this.sketch = null;
      this.measureTooltipElement = null;
      this.createMeasureTooltip();
      unByKey(this.listener);
    };
    this.onMouseMove = (evt) => {
      if (evt.dragging || !this.parent) {
        return;
      }
      const locale = this.parent.getLocale();
      let helpMsg = tr("MEASUREMENT_START_DRAWING", locale);
      if (this.sketch) {
        const geom = this.sketch.getGeometry();
        if (geom instanceof Polygon) {
          helpMsg = tr("MEASUREMENT_CONTINUE_POLYGON", locale);
        } else if (geom instanceof LineString) {
          helpMsg = tr("MEASUREMENT_CONTINUE_LINE", locale);
        }
      }
      this.helpTooltipElement.innerHTML = helpMsg;
      this.helpTooltip.setPosition(evt.coordinate);
      this.helpTooltipElement.classList.remove("hidden");
    };
    this.measureOverlays = [];
    this.viewer = viewer;
    this.mapName = mapName;
    this.parent = parent;
    this.layerName = `${LAYER_NAME}-${mapName}`;
    this.olFactory = viewer.getOLFactory();
    this.measureLayer = this.olFactory.createVectorLayer({
      source: this.olFactory.createVectorSource()
    });
    this.measureLayer.set(LayerProperty.IS_MEASURE, true);
    this.measureLayer.setStyle(this.createMeasureStyle());
  }
  /**
   * Establishes the new parent component for this context. Is called by the
   * new parent component when it mounts and is resuming from previously recorded
   * measurements and is not meant to be called directly
   * 
   * @param parent The new parent component
   * @since 0.12
   */
  setParent(parent) {
    this.parent = parent;
  }
  /**
   * Detaches the parent component from this context. Is called by the parent
   * component when it unmounts and is not meant to be called directly.
   * 
   * @since 0.12
   */
  detachParent() {
    this.parent = void 0;
  }
  /**
   * Format length output.
   * @param {LineString} line The line.
   * @return {string} The formatted length.
   */
  formatLength(line) {
    let length;
    let segments;
    let locale;
    let isArbitrary = false;
    const sourceProj = this.viewer.getProjection();
    if (this.parent) {
      locale = this.parent.getLocale();
      const coordinates = line.getCoordinates();
      segments = [];
      length = 0;
      if (isArbitraryProjection(sourceProj)) {
        isArbitrary = true;
        for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
          const c1 = coordinates[i];
          const c2 = coordinates[i + 1];
          const a = c1[0] - c2[0];
          const b = c1[1] - c2[1];
          const dist = Math.sqrt(a * a + b * b);
          length += dist;
          segments.push({ segment: i + 1, length: dist });
        }
      } else {
        for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
          const c1 = this.olFactory.transformCoordinate(coordinates[i], sourceProj, "EPSG:4326");
          const c2 = this.olFactory.transformCoordinate(coordinates[i + 1], sourceProj, "EPSG:4326");
          const dist = getDistance(c1, c2);
          length += dist;
          segments.push({ segment: i + 1, length: dist });
        }
      }
    } else {
      length = NaN;
    }
    let output;
    if (isArbitrary && sourceProj instanceof Projection) {
      output = `${roundTo(length, 2)} ${sourceProj.getUnits()}`;
    } else {
      if (length > 100) {
        output = tr("UNIT_FMT_KM", locale, { value: roundTo(length / 1e3, 2) });
      } else {
        output = tr("UNIT_FMT_M", locale, { value: roundTo(length, 2) });
      }
    }
    return [output, length, segments];
  }
  /**
   * Format area output.
   * @param {Polygon} polygon The polygon.
   * @return {string} Formatted area.
   */
  formatArea(polygon) {
    let area;
    let segments;
    let locale;
    let isArbitrary = false;
    const sourceProj = this.viewer.getProjection();
    if (this.parent) {
      locale = this.parent.getLocale();
      segments = [];
      const geom = polygon;
      if (isArbitraryProjection(sourceProj)) {
        isArbitrary = true;
        area = geom.getArea();
        const ring = geom.getLinearRing(0);
        if (ring) {
          const coordinates = ring.getCoordinates();
          for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            const c1 = coordinates[i];
            const c2 = coordinates[i + 1];
            const a = c1[0] - c2[0];
            const b = c1[1] - c2[1];
            const dist = Math.sqrt(a * a + b * b);
            segments.push({ segment: i + 1, length: dist });
          }
        }
      } else {
        area = getArea(geom, { projection: sourceProj });
        debug(`Polygon area: ${area}`);
        const ring = geom.getLinearRing(0);
        if (ring) {
          const coordinates = ring.getCoordinates();
          for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            const c1 = this.olFactory.transformCoordinate(coordinates[i], sourceProj, "EPSG:4326");
            const c2 = this.olFactory.transformCoordinate(coordinates[i + 1], sourceProj, "EPSG:4326");
            const dist = getDistance(c1, c2);
            segments.push({ segment: i + 1, length: dist });
          }
        }
      }
    } else {
      area = NaN;
    }
    let output;
    if (isArbitrary && sourceProj instanceof Projection) {
      output = `${roundTo(area, 2)} ${sourceProj.getUnits()}<sup>2</sup>`;
    } else {
      if (area > 1e4) {
        output = tr("UNIT_FMT_SQKM", locale, {
          value: `${roundTo(area / 1e6, 2)}`
        });
      } else {
        output = tr("UNIT_FMT_SQM", locale, {
          value: `${roundTo(area, 2)}`
        });
      }
    }
    return [output, area, segments];
  }
  getMapName() {
    return this.mapName;
  }
  createMeasureStyle() {
    return this.olFactory.createStyle({
      fill: this.olFactory.createStyleFill({
        color: "rgba(255, 255, 255, 0.2)"
      }),
      stroke: this.olFactory.createStyleStroke({
        color: "#ffcc33",
        width: 2
      }),
      image: this.olFactory.createStyleCircle({
        radius: 7,
        fill: this.olFactory.createStyleFill({
          color: "#ffcc33"
        })
      })
    });
  }
  createDrawInteraction(type) {
    const source = this.measureLayer.getSource();
    return this.olFactory.createInteractionDraw({
      source,
      type,
      style: this.olFactory.createStyle({
        fill: this.olFactory.createStyleFill({
          color: "rgba(255, 255, 255, 0.2)"
        }),
        stroke: this.olFactory.createStyleStroke({
          color: "rgba(0, 0, 0, 0.5)",
          lineDash: [10, 10],
          width: 2
        }),
        image: this.olFactory.createStyleCircle({
          radius: 5,
          stroke: this.olFactory.createStyleStroke({
            color: "rgba(0, 0, 0, 0.7)"
          }),
          fill: this.olFactory.createStyleFill({
            color: "rgba(255, 255, 255, 0.2)"
          })
        })
      })
    });
  }
  removeElement(el) {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
  /**
   * Creates a new help tooltip
   */
  createHelpTooltip() {
    this.removeElement(this.helpTooltipElement);
    this.helpTooltipElement = document.createElement("div");
    this.helpTooltipElement.className = "tooltip hidden";
    this.helpTooltip = this.olFactory.createOverlay({
      element: this.helpTooltipElement,
      offset: [15, 0],
      positioning: "center-left"
    });
    this.viewer.addOverlay(this.helpTooltip);
  }
  /**
   * Creates a new measure tooltip
   */
  createMeasureTooltip() {
    this.removeElement(this.measureTooltipElement);
    this.measureTooltipElement = document.createElement("div");
    this.measureTooltipElement.className = "tooltip tooltip-measure";
    if (this.measureTooltip) {
      this.measureOverlays.push(this.measureTooltip);
    }
    this.measureTooltip = this.olFactory.createOverlay({
      element: this.measureTooltipElement,
      offset: [0, -15],
      positioning: "bottom-center"
    });
    this.viewer.addOverlay(this.measureTooltip);
  }
  setActiveInteraction(type) {
    if (this.draw) {
      this.draw.un("drawstart", this.onDrawStart);
      this.draw.un("drawend", this.onDrawEnd);
      this.viewer.removeInteraction(this.draw);
    }
    this.draw = this.createDrawInteraction(type);
    if (this.draw) {
      this.draw.on("drawstart", this.onDrawStart);
      this.draw.on("drawend", this.onDrawEnd);
      this.viewer.addInteraction(this.draw);
    }
  }
  startMeasure(type) {
    if (type) {
      this.createMeasureTooltip();
      this.createHelpTooltip();
      this.setActiveInteraction(type);
      this.viewer.addHandler("pointermove", this.onMouseMove);
    }
  }
  endMeasure() {
    this.viewer.removeHandler("pointermove", this.onMouseMove);
    if (this.draw) {
      this.draw.un("drawstart", this.onDrawStart);
      this.draw.un("drawend", this.onDrawEnd);
      this.viewer.removeInteraction(this.draw);
    }
    this.removeElement(this.helpTooltipElement);
  }
  clearMeasurements() {
    var _a;
    (_a = this.measureLayer.getSource()) == null ? void 0 : _a.clear();
    for (const ov of this.measureOverlays) {
      this.viewer.removeOverlay(ov);
    }
    this.measureOverlays.length = 0;
    if (this.callback) {
      this.callback.clearSegments();
    }
  }
  handleDrawTypeChange(type) {
    if (type) {
      this.setActiveInteraction(type);
    }
  }
  /**
   * Since 0.12, mapName is required to explicitly state which map you are activating the context for
   *
   * @param {string} mapName
   * @param {IMeasureCallback} callback
   */
  activate(mapName, callback) {
    this.callback = callback;
    debug(`Activating measure context for ${this.mapName}`);
    for (const ov of this.measureOverlays) {
      this.viewer.addOverlay(ov);
    }
    this.viewer.getLayerManager(mapName).addLayer(this.layerName, this.measureLayer, true);
  }
  /**
   * Since 0.12, mapName is required to explicitly state which map you are deactivating the context for
   *
   * @param {string} mapName
   */
  deactivate(mapName) {
    this.callback = void 0;
    debug(`De-activating measure context for ${this.mapName}`);
    this.endMeasure();
    for (const ov of this.measureOverlays) {
      this.viewer.removeOverlay(ov);
    }
    this.viewer.getLayerManager(mapName).removeLayer(this.layerName);
  }
}
function isMapGuideImageSource(arg) {
  return typeof arg.updateParams != "undefined";
}
function createMapGuideSource(options) {
  const source = new ImageMapGuide(options);
  return source;
}
class ParsedFeatures {
  constructor(type, size, features, hasFeaturesFlag, geometryTypes, propertyNames, projection = null) {
    this.type = type;
    this.size = size;
    this.features = features;
    this.hasFeaturesFlag = hasFeaturesFlag;
    this.geometryTypes = geometryTypes;
    this.propertyNames = propertyNames;
    this.projection = projection;
  }
  hasFeatures() {
    return this.hasFeaturesFlag;
  }
  addTo(source, mapProjection, dataProjection) {
    return __async(this, null, function* () {
      const features = yield this.features();
      if (dataProjection) {
        for (const f of features) {
          const g = f.getGeometry();
          if (g) {
            const tg = g.transform(dataProjection, mapProjection);
            f.setGeometry(tg);
          }
        }
      }
      source.addFeatures(features);
    });
  }
  getDistinctValues(propertyName) {
    return __async(this, null, function* () {
      const values = [];
      const features = yield this.features();
      for (const f of features) {
        const v = f.get(propertyName);
        if (!strIsNullOrEmpty(v) && !values.includes(v))
          values.push(v);
      }
      return values;
    });
  }
}
class CsvFormatDriver {
  constructor(aliases) {
    this.aliases = aliases;
    this.type = "CSV";
  }
  tryParse(size, text) {
    const aliases = this.aliases;
    const type = this.type;
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        complete: function(results) {
          var _a, _b;
          if (!results.data || results.data.length == 0) {
            reject(new Error("No data parsed. Probably not a CSV file"));
          } else {
            if (results.meta.fields) {
              let parsed;
              for (const alias of aliases) {
                if (parsed) {
                  break;
                }
                const xc = (_a = results.meta.fields.filter((s) => s.toLowerCase() == alias.xColumn.toLowerCase())) == null ? void 0 : _a[0];
                const yc = (_b = results.meta.fields.filter((s) => s.toLowerCase() == alias.yColumn.toLowerCase())) == null ? void 0 : _b[0];
                if (!strIsNullOrEmpty(xc) && !strIsNullOrEmpty(yc)) {
                  const first = results.data[0];
                  const firstX = parseFloat(first[xc]);
                  const firstY = parseFloat(first[yc]);
                  if (first && !isNaN(firstX) && !isNaN(firstY)) {
                    const json = {
                      type: "FeatureCollection",
                      features: []
                    };
                    for (const d of results.data) {
                      const x = parseFloat(d[xc]);
                      const y = parseFloat(d[yc]);
                      if (!isNaN(x) && !isNaN(y)) {
                        const f = {
                          type: "Feature",
                          geometry: {
                            coordinates: [x, y],
                            type: "Point"
                          },
                          properties: d
                        };
                        delete f.properties[xc];
                        delete f.properties[yc];
                        json.features.push(f);
                      }
                    }
                    const fmt2 = new GeoJSON();
                    const features = fmt2.readFeatures(json);
                    const propNames = [];
                    if (features.length > 0) {
                      const first2 = features[0];
                      for (const k of first2.getKeys()) {
                        if (k == first2.getGeometryName()) {
                          continue;
                        }
                        propNames.push(k);
                      }
                    }
                    const pfs = () => __async(this, null, function* () {
                      return features;
                    });
                    parsed = new ParsedFeatures(type, size, pfs, features.length > 0, ["Point"], propNames);
                    break;
                  }
                }
              }
              if (parsed) {
                resolve(parsed);
              } else {
                reject(new Error("Data successfully parsed as CSV, but coordinate columns could not be found"));
              }
            } else {
              reject(new Error("No fields found in CSV metadata"));
            }
          }
        }
      });
    });
  }
}
const CSV_COLUMN_ALIASES = [
  { xColumn: "lon", yColumn: "lat" },
  { xColumn: "lng", yColumn: "lat" },
  { xColumn: "longitude", yColumn: "latitude" },
  { xColumn: "x", yColumn: "y" },
  { xColumn: "easting", yColumn: "northing" }
];
const _ExternalLayerFactoryRegistry = class _ExternalLayerFactoryRegistry {
  constructor() {
    this._vectorCreators = {};
    if (_ExternalLayerFactoryRegistry._instance) {
      throw new Error("Error: Instantiation failed: Use ExternalLayerFactoryRegistry.getInstance() instead of new.");
    }
    _ExternalLayerFactoryRegistry._instance = this;
  }
  /**
   * Gets the registry instance
   * @since 0.14
   */
  static getInstance() {
    return _ExternalLayerFactoryRegistry._instance;
  }
  /**
   * Registers the given external vector layer factory method
   * 
   * @param driverName 
   * @param creator 
   * @since 0.14
   */
  registerExternalVectorLayerCreator(driverName, creator) {
    this._vectorCreators[driverName] = creator;
  }
  /**
   * Gets the external vector layer factory method for the given driver
   * 
   * @param driverName 
   */
  getExternalVectorLayerCreator(driverName) {
    return this._vectorCreators[driverName];
  }
};
_ExternalLayerFactoryRegistry._instance = new _ExternalLayerFactoryRegistry();
let ExternalLayerFactoryRegistry = _ExternalLayerFactoryRegistry;
var VectorStyleSource = /* @__PURE__ */ ((VectorStyleSource2) => {
  VectorStyleSource2[VectorStyleSource2["Base"] = 0] = "Base";
  VectorStyleSource2[VectorStyleSource2["Cluster"] = 1] = "Cluster";
  return VectorStyleSource2;
})(VectorStyleSource || {});
var ClusterClickAction = /* @__PURE__ */ ((ClusterClickAction2) => {
  ClusterClickAction2["ZoomToClusterExtents"] = "ZoomToClusterExtents";
  ClusterClickAction2["ShowPopup"] = "ShowPopup";
  return ClusterClickAction2;
})(ClusterClickAction || {});
function isEvaluatable(arg) {
  return Array.isArray(arg == null ? void 0 : arg.expr);
}
const DEFAULT_POINT_CIRCLE_STYLE = {
  type: "Circle",
  fill: {
    color: "#ff0000",
    alpha: 255
  },
  radius: 5,
  stroke: {
    color: "#0000ff",
    alpha: 255,
    width: 1
  }
};
const DEFAULT_CLUSTERED_POINT_CIRCLE_STYLE = {
  type: "Circle",
  fill: {
    color: "#ff0000",
    alpha: 255
  },
  radius: { expr: ["clamp", ["+", ["get", "features", "length"], 4], 5, 25] },
  stroke: {
    color: "#0000ff",
    alpha: 255,
    width: 1
  }
};
const DEFAULT_POINT_ICON_STYLE = {
  type: "Icon",
  anchor: [0.5, 0.5],
  src: MAP_MARKER_ICON,
  //size: [24, 24],
  rotateWithView: false,
  rotation: 0,
  //opacity: 255,
  scale: 1
};
const DEFAULT_COLOR = "#000000";
const DEFAULT_LINE_STYLE = {
  color: "#0000ff",
  alpha: 255,
  width: 1
};
const DEFAULT_POLY_STYLE = {
  fill: {
    color: "#00ff00",
    alpha: 255
  },
  stroke: {
    color: DEFAULT_COLOR,
    alpha: 255,
    width: 1
  }
};
const DEFAULT_VECTOR_LAYER_STYLE = {
  default: {
    point: DEFAULT_POINT_CIRCLE_STYLE,
    line: DEFAULT_LINE_STYLE,
    polygon: DEFAULT_POLY_STYLE
  }
};
const DEFAULT_CLUSTERED_LAYER_STYLE = {
  default: {
    point: DEFAULT_CLUSTERED_POINT_CIRCLE_STYLE
  }
};
function toOLColor(color, alpha) {
  const c = asArray(color);
  if (typeof alpha != "undefined") {
    c[3] = alpha / 255;
  }
  return c;
}
function evalOLExpr(expr, props) {
  if (!Array.isArray(expr)) {
    return expr;
  }
  const [op, ...args] = expr;
  switch (op) {
    case "get": {
      let val = props;
      for (const key of args) {
        if (val == null) return void 0;
        val = val[key];
      }
      return val;
    }
    case "literal":
      return args[0];
    case "+":
      return evalOLExpr(args[0], props) + evalOLExpr(args[1], props);
    case "-":
      return evalOLExpr(args[0], props) - evalOLExpr(args[1], props);
    case "*":
      return evalOLExpr(args[0], props) * evalOLExpr(args[1], props);
    case "/":
      return evalOLExpr(args[0], props) / evalOLExpr(args[1], props);
    case "clamp": {
      const val = evalOLExpr(args[0], props);
      const lo = evalOLExpr(args[1], props);
      const hi = evalOLExpr(args[2], props);
      return Math.max(lo, Math.min(hi, val));
    }
    case "==":
      return evalOLExpr(args[0], props) == evalOLExpr(args[1], props);
    case "!=":
      return evalOLExpr(args[0], props) != evalOLExpr(args[1], props);
    case ">":
      return evalOLExpr(args[0], props) > evalOLExpr(args[1], props);
    case ">=":
      return evalOLExpr(args[0], props) >= evalOLExpr(args[1], props);
    case "<":
      return evalOLExpr(args[0], props) < evalOLExpr(args[1], props);
    case "<=":
      return evalOLExpr(args[0], props) <= evalOLExpr(args[1], props);
    default:
      return void 0;
  }
}
function evalFeature(expr, feat) {
  if (!isEvaluatable(expr)) {
    return expr;
  }
  if (!feat) {
    return void 0;
  }
  try {
    return evalOLExpr(expr.expr, feat.getProperties());
  } catch (e) {
    return void 0;
  }
}
function setIfNotUndefined(obj, prop, value) {
  if (typeof value != "undefined") {
    obj[prop] = value;
  }
}
function buildStroke(stroke, feat) {
  return new Stroke({
    color: toOLColor(evalFeature(stroke.color, feat), evalFeature(stroke.alpha, feat)),
    width: evalFeature(stroke.width, feat)
  });
}
function buildFill(fill, feat) {
  return new Fill({
    color: toOLColor(evalFeature(fill.color, feat), evalFeature(fill.alpha, feat))
  });
}
function tryBuildTextStyle(style, feat) {
  const { label } = style;
  if (label) {
    const textOpts = {};
    setIfNotUndefined(textOpts, "font", evalFeature(label.font, feat));
    setIfNotUndefined(textOpts, "maxAngle", evalFeature(label.maxAngle, feat));
    setIfNotUndefined(textOpts, "offsetX", evalFeature(label.offsetX, feat));
    setIfNotUndefined(textOpts, "offsetY", evalFeature(label.offsetY, feat));
    setIfNotUndefined(textOpts, "overflow", evalFeature(label.overflow, feat));
    setIfNotUndefined(textOpts, "placement", evalFeature(label.placement, feat));
    setIfNotUndefined(textOpts, "rotateWithView", evalFeature(label.rotateWithView, feat));
    setIfNotUndefined(textOpts, "rotation", evalFeature(label.rotation, feat));
    setIfNotUndefined(textOpts, "scale", evalFeature(label.scale, feat));
    const txt = evalFeature(label.text, feat);
    if (typeof txt != "undefined") {
      textOpts.text = `${txt}`;
    }
    setIfNotUndefined(textOpts, "textAlign", evalFeature(label.textAlign, feat));
    setIfNotUndefined(textOpts, "textBaseline", evalFeature(label.textBaseline, feat));
    const text = new Text(textOpts);
    if (label.padding) {
      text.setPadding(label.padding);
    }
    if (label.fill) {
      const f = buildFill(label.fill, feat);
      text.setFill(f);
    }
    if (label.backgroundFill) {
      const f = buildFill(label.backgroundFill, feat);
      text.setBackgroundFill(f);
    }
    if (label.stroke) {
      const s = buildStroke(label.stroke, feat);
      text.setStroke(s);
    }
    if (label.backgroundStroke) {
      const s = buildStroke(label.backgroundStroke, feat);
      text.setBackgroundStroke(s);
    }
    return text;
  }
  return void 0;
}
const scopedId = new ScopedId();
function toFlatExpr(val) {
  if (isEvaluatable(val)) {
    return val.expr;
  }
  return val;
}
function toFlatColorExpr(color, alpha) {
  const colorIsExpr = isEvaluatable(color);
  const alphaIsExpr = isEvaluatable(alpha);
  if (!colorIsExpr && !alphaIsExpr) {
    const c = asArray(color).slice();
    c[3] = alpha / 255;
    return c;
  }
  if (colorIsExpr && !alphaIsExpr) {
    return color.expr;
  }
  if (!colorIsExpr && alphaIsExpr) {
    const c = asArray(color);
    return ["color", c[0], c[1], c[2], ["/", alpha.expr, 255]];
  }
  return color.expr;
}
function buildFlatTextProps(labelSettings) {
  const { label } = labelSettings;
  if (!label) return {};
  const props = {};
  if (label.text !== void 0) props["text-value"] = toFlatExpr(label.text);
  if (label.font !== void 0) props["text-font"] = toFlatExpr(label.font);
  if (label.maxAngle !== void 0) props["text-max-angle"] = toFlatExpr(label.maxAngle);
  if (label.offsetX !== void 0) props["text-offset-x"] = toFlatExpr(label.offsetX);
  if (label.offsetY !== void 0) props["text-offset-y"] = toFlatExpr(label.offsetY);
  if (label.overflow !== void 0) props["text-overflow"] = toFlatExpr(label.overflow);
  if (label.placement !== void 0) props["text-placement"] = label.placement;
  if (label.scale !== void 0) props["text-scale"] = toFlatExpr(label.scale);
  if (label.rotateWithView !== void 0) props["text-rotate-with-view"] = toFlatExpr(label.rotateWithView);
  if (label.rotation !== void 0) props["text-rotation"] = toFlatExpr(label.rotation);
  if (label.textAlign !== void 0) props["text-align"] = toFlatExpr(label.textAlign);
  if (label.textBaseline !== void 0) props["text-baseline"] = toFlatExpr(label.textBaseline);
  if (label.padding !== void 0) props["text-padding"] = label.padding;
  if (label.fill) props["text-fill-color"] = toFlatColorExpr(label.fill.color, label.fill.alpha);
  if (label.backgroundFill) props["text-background-fill-color"] = toFlatColorExpr(label.backgroundFill.color, label.backgroundFill.alpha);
  if (label.stroke) {
    props["text-stroke-color"] = toFlatColorExpr(label.stroke.color, label.stroke.alpha);
    props["text-stroke-width"] = toFlatExpr(label.stroke.width);
  }
  if (label.backgroundStroke) {
    props["text-background-stroke-color"] = toFlatColorExpr(label.backgroundStroke.color, label.backgroundStroke.alpha);
    props["text-background-stroke-width"] = toFlatExpr(label.backgroundStroke.width);
  }
  return props;
}
function featureStyleToFlatStyle(style) {
  const result = {};
  if (style.point) {
    const pt = style.point;
    if (pt.type === "Circle") {
      result["circle-radius"] = toFlatExpr(pt.radius);
      result["circle-fill-color"] = toFlatColorExpr(pt.fill.color, pt.fill.alpha);
      result["circle-stroke-color"] = toFlatColorExpr(pt.stroke.color, pt.stroke.alpha);
      result["circle-stroke-width"] = toFlatExpr(pt.stroke.width);
    } else {
      result["icon-src"] = toFlatExpr(pt.src);
      result["icon-anchor"] = pt.anchor;
      result["icon-rotate-with-view"] = toFlatExpr(pt.rotateWithView);
      result["icon-rotation"] = isEvaluatable(pt.rotation) ? ["*", pt.rotation.expr, Math.PI / 180] : deg2rad(pt.rotation);
      result["icon-scale"] = toFlatExpr(pt.scale);
    }
    Object.assign(result, buildFlatTextProps(pt));
  }
  if (style.line) {
    const ln = style.line;
    result["stroke-color"] = toFlatColorExpr(ln.color, ln.alpha);
    result["stroke-width"] = toFlatExpr(ln.width);
    Object.assign(result, buildFlatTextProps(ln));
  }
  if (style.polygon) {
    const pl = style.polygon;
    result["fill-color"] = toFlatColorExpr(pl.fill.color, pl.fill.alpha);
    result["stroke-color"] = toFlatColorExpr(pl.stroke.color, pl.stroke.alpha);
    result["stroke-width"] = toFlatExpr(pl.stroke.width);
    Object.assign(result, buildFlatTextProps(pl));
  }
  return result;
}
function buildStyleMap(pts, lns, pls) {
  var _a, _b, _c;
  const cpts = pts.clone();
  const cpls = pls.clone();
  const gcs = new Style({
    image: (_a = cpts.getImage()) != null ? _a : void 0,
    stroke: (_b = cpls.getStroke()) != null ? _b : void 0,
    fill: (_c = cpls.getFill()) != null ? _c : void 0
  });
  return {
    id: `${scopedId.next()}`,
    Point: pts,
    MultiPoint: pts,
    LineString: lns,
    MultiLineString: lns,
    Polygon: pls,
    MultiPolygon: pls,
    Circle: pls,
    GeometryCollection: gcs
  };
}
function vectorStyleToStyleMap(style) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const ptStyle = (_a = style.point) != null ? _a : DEFAULT_POINT_CIRCLE_STYLE;
  const lnStyle = (_b = style.line) != null ? _b : DEFAULT_LINE_STYLE;
  const plStyle = (_c = style.polygon) != null ? _c : DEFAULT_POLY_STYLE;
  const builder = (feat) => {
    const pts = new Style();
    if (ptStyle.type == "Circle") {
      pts.setImage(new CircleStyle({
        radius: evalFeature(ptStyle.radius, feat),
        fill: buildFill(ptStyle.fill, feat),
        stroke: buildStroke(ptStyle.stroke, feat)
      }));
    } else {
      pts.setImage(new Icon$1({
        anchor: ptStyle.anchor,
        src: evalFeature(ptStyle.src, feat),
        rotateWithView: evalFeature(ptStyle.rotateWithView, feat),
        rotation: deg2rad(evalFeature(ptStyle.rotation, feat)),
        scale: evalFeature(ptStyle.scale, feat)
      }));
    }
    const lns = new Style({
      stroke: buildStroke(lnStyle, feat)
    });
    const pls = new Style({
      stroke: buildStroke(plStyle.stroke, feat),
      fill: buildFill(plStyle.fill, feat)
    });
    const ptText = tryBuildTextStyle(ptStyle, feat);
    const lnText = tryBuildTextStyle(lnStyle, feat);
    const plsText = tryBuildTextStyle(plStyle, feat);
    if (ptText) {
      pts.setText(ptText);
    }
    if (lnText) {
      lns.setText(lnText);
    }
    if (plsText) {
      pls.setText(plsText);
    }
    return buildStyleMap(pts, lns, pls);
  };
  const isDynamic = isEvaluatable(ptStyle.radius) || isEvaluatable(ptStyle.src) || isEvaluatable(ptStyle.rotateWithView) || isEvaluatable(ptStyle.rotation) || isEvaluatable(ptStyle.scale) || isEvaluatable(lnStyle.color) || isEvaluatable(lnStyle.alpha) || isEvaluatable(lnStyle.width) || isEvaluatable((_d = plStyle.fill) == null ? void 0 : _d.color) || isEvaluatable((_e = plStyle.fill) == null ? void 0 : _e.alpha) || isEvaluatable((_f = plStyle.stroke) == null ? void 0 : _f.color) || isEvaluatable((_g = plStyle.stroke) == null ? void 0 : _g.alpha) || isEvaluatable((_h = plStyle.stroke) == null ? void 0 : _h.width);
  if (isDynamic) {
    return builder;
  }
  return builder(void 0);
}
class OLStyleMapSet {
  constructor(origStyleDef, clusterStyleDef) {
    this.origStyleDef = origStyleDef;
    this.clusterStyleDef = clusterStyleDef;
  }
  toVectorLayerStyle() {
    return this.origStyleDef;
  }
  toClusterSettings() {
    return this.clusterStyleDef;
  }
  getClusterClickAction() {
    var _a;
    return (_a = this.clusterStyleDef) == null ? void 0 : _a.onClick;
  }
  /**
   * Builds an `Array<Rule>` that can be passed directly to `layer.setStyle()`.
   * OL evaluates the embedded filter expressions and flat style property expressions
   * natively at render time — no manual expression evaluation is required.
   *
   * @since 0.15
   */
  toFlatRules() {
    return buildFlatRules(this.origStyleDef);
  }
  /**
   * Builds OL `Style` objects for a single feature. Used for **legend image generation**.
   * For layer rendering use `toFlatRules()`.
   */
  evaluateStyle(feature) {
    try {
      const g = feature.getGeometry();
      if (!g) {
        return null;
      }
      const gt = g.getType();
      const styleToUse = matchRule(this.origStyleDef, feature);
      const styleMap = vectorStyleToStyleMap(styleToUse);
      if (typeof styleMap === "function") {
        return styleMap(feature)[gt];
      }
      return styleMap[gt];
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
function matchRule(styleDef, feature) {
  if (styleDef.rules) {
    const props = feature.getProperties();
    for (const rule of styleDef.rules) {
      if (rule.filter) {
        try {
          if (evalOLExpr(rule.filter, props)) {
            return rule.style;
          }
        } catch (e) {
        }
      } else if (rule.else) {
        return rule.style;
      }
    }
  }
  return styleDef.default;
}
function buildFlatRules(styleDef) {
  const rules = [];
  if (styleDef.rules && styleDef.rules.length > 0) {
    for (const rule of styleDef.rules) {
      rules.push({
        filter: rule.filter,
        else: rule.else,
        style: featureStyleToFlatStyle(rule.style)
      });
    }
  }
  rules.push({
    else: true,
    style: featureStyleToFlatStyle(styleDef.default)
  });
  return rules;
}
const DEFAULT_STYLE_KEY = "default";
function isClusteredFeature(feature) {
  var _a;
  if ((_a = getClusterSubFeatures(feature)) == null ? void 0 : _a.length) {
    return true;
  }
  return false;
}
function getClusterSubFeatures(feature) {
  return feature.get("features");
}
function setOLVectorLayerStyle(layer, style, clusterStyle) {
  const olstyles = new OLStyleMapSet(style, clusterStyle);
  layer.set(LayerProperty.VECTOR_STYLE, olstyles);
  layer.setStyle(olstyles.toFlatRules());
}
function sameProjectionAs(proj1, proj2) {
  const nproj1 = get(proj1);
  const nproj2 = get(proj2);
  if (nproj1 && nproj2)
    return equivalent(nproj1, nproj2);
  else
    return true;
}
const geoJsonVt2GeoJSON = (key, value) => {
  if (value.geometry) {
    let type;
    const rawType = value.type;
    let geometry = value.geometry;
    if (rawType === 1) {
      type = "MultiPoint";
      if (geometry.length == 1) {
        type = "Point";
        geometry = geometry[0];
      }
    } else if (rawType === 2) {
      type = "MultiLineString";
      if (geometry.length == 1) {
        type = "LineString";
        geometry = geometry[0];
      }
    } else if (rawType === 3) {
      type = "Polygon";
      if (geometry.length > 1) {
        type = "MultiPolygon";
        geometry = [geometry];
      }
    }
    return {
      "type": "Feature",
      "geometry": {
        "type": type,
        "coordinates": geometry
      },
      "properties": value.tags
    };
  } else {
    return value;
  }
};
function getRawGeoJson(defn) {
  return __async(this, null, function* () {
    const { url } = defn.sourceParams;
    if (typeof url == "string") {
      debug(`Fetching url: ${url}`);
      const resp = yield fetch(url);
      let json = yield resp.json();
      return json;
    } else if (typeof url == "object" && !strIsNullOrEmpty(url.var_source)) {
      if (!window[url.var_source]) {
        throw new Error(`No such global var (${url.var_source})`);
      }
      return window[url.var_source];
    } else {
      throw new Error("Don't know how to process URL source");
    }
  });
}
function createGeoJsonVectorSource(defn, mapProjection) {
  const { url, attributions } = defn.sourceParams;
  if (typeof url == "string") {
    const source = new VectorSource({
      url,
      format: new GeoJSON(),
      attributions
    });
    return source;
  } else if (typeof url == "object" && !strIsNullOrEmpty(url.var_source)) {
    if (!window[url.var_source]) {
      throw new Error(`No such global var (${url.var_source})`);
    }
    const vectorSource = new VectorSource({
      loader: (_extent, _resolution, projection) => {
        var _a;
        const format = new GeoJSON({
          dataProjection: (_a = defn.meta) == null ? void 0 : _a.projection,
          featureProjection: mapProjection
        });
        const features = format.readFeatures(window[url.var_source]);
        vectorSource.addFeatures(features);
      },
      attributions
    });
    return vectorSource;
  } else {
    throw new Error("Don't know how to process URL source");
  }
}
function applyVectorLayerProperties(defn, layer, isExternal) {
  layer.set(LayerProperty.LAYER_NAME, defn.name);
  layer.set(LayerProperty.LAYER_DESCRIPTION, defn.description);
  layer.set(LayerProperty.LAYER_DISPLAY_NAME, defn.displayName);
  layer.set(LayerProperty.LAYER_TYPE, defn.type);
  layer.set(LayerProperty.IS_SELECTABLE, defn.selectable);
  layer.set(LayerProperty.DISABLE_HOVER, defn.disableHover);
  layer.set(LayerProperty.IS_EXTERNAL, isExternal);
  layer.set(LayerProperty.SELECTED_POPUP_CONFIGURATION, defn.popupTemplate);
  layer.set(LayerProperty.IS_GROUP, false);
  layer.set(LayerProperty.LAYER_METADATA, defn.meta);
  layer.set(LayerProperty.LAYER_DEFN, defn);
  layer.setVisible(defn.initiallyVisible);
}
const EMPTY_GEOJSON = { type: "FeatureCollection", features: [] };
const geoTiffSourceCtorPromise = __vitePreload(() => import("./chunks/geotiff-debug.js").then((n) => n.G), true ? __vite__mapDeps([3,4,1,2,5]) : void 0, import.meta.url).then((mod) => mod.default);
function clusterSourceIfRequired(source, def) {
  if (def.cluster) {
    const cluster = new Cluster({
      source,
      distance: def.cluster.distance,
      geometryFunction: (feature) => {
        const geometry = feature.getGeometry();
        if (geometry && geometry.getType() == "Point") {
          return geometry;
        }
        return void 0;
      }
    });
    return cluster;
  }
  return source;
}
function createOLLayerFromSubjectDefn(defn, mapProjection, isExternal, appSettings) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  switch (defn.type) {
    case GenericSubjectLayerType.StaticImage: {
      const sourceArgs = __spreadValues({}, defn.sourceParams);
      if (!sourceArgs.imageExtent)
        sourceArgs.imageExtent = (_a = defn.meta) == null ? void 0 : _a.extents;
      const layer = new ImageLayer({
        source: new Static(sourceArgs)
      });
      layer.set(LayerProperty.LAYER_DESCRIPTION, defn.description);
      layer.set(LayerProperty.LAYER_TYPE, "StaticImage");
      layer.set(LayerProperty.IS_SELECTABLE, false);
      layer.set(LayerProperty.IS_EXTERNAL, isExternal);
      layer.set(LayerProperty.IS_GROUP, false);
      layer.set(LayerProperty.LAYER_METADATA, defn.meta);
      layer.set(LayerProperty.LAYER_DEFN, defn);
      layer.setVisible(defn.initiallyVisible);
      return layer;
    }
    case GenericSubjectLayerType.XYZ: {
      const sourceArgs = __spreadValues({}, defn.sourceParams);
      const layer = new TileLayer({
        source: new XYZ(sourceArgs)
      });
      layer.set(LayerProperty.LAYER_DESCRIPTION, defn.description);
      layer.set(LayerProperty.LAYER_TYPE, "XYZ");
      layer.set(LayerProperty.IS_SELECTABLE, false);
      layer.set(LayerProperty.IS_EXTERNAL, isExternal);
      layer.set(LayerProperty.IS_GROUP, false);
      layer.set(LayerProperty.LAYER_METADATA, defn.meta);
      layer.set(LayerProperty.LAYER_DEFN, defn);
      layer.setVisible(defn.initiallyVisible);
      return layer;
    }
    case GenericSubjectLayerType.GeoJSON_Inline: {
      const features = new GeoJSON().readFeatures((_b = defn.sourceParams.features) != null ? _b : EMPTY_GEOJSON);
      const source = new VectorSource({
        features,
        attributions: defn.sourceParams.attributions
      });
      const layer = new VectorLayer(__spreadProps(__spreadValues({}, defn.layerOptions), {
        source: clusterSourceIfRequired(source, defn)
      }));
      setOLVectorLayerStyle(layer, (_c = defn.vectorStyle) != null ? _c : DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
      applyVectorLayerProperties(defn, layer, isExternal);
      return layer;
    }
    case GenericSubjectLayerType.GeoJSON: {
      const isWebM = sameProjectionAs(mapProjection, "EPSG:3857");
      const asVT = ((_d = defn.meta) == null ? void 0 : _d.geojson_as_vt) == true;
      if (asVT && isWebM) {
        const lazyTileIndex = new AsyncLazy(() => __async(this, null, function* () {
          var _a2, _b2;
          let json = yield getRawGeoJson(defn);
          if (((_a2 = defn.meta) == null ? void 0 : _a2.projection) != "EPSG:4326") {
            const gj = new GeoJSON({
              dataProjection: (_b2 = defn.meta) == null ? void 0 : _b2.projection,
              featureProjection: "EPSG:4326"
            });
            const features = gj.readFeatures(json);
            json = gj.writeFeaturesObject(features, {
              dataProjection: "EPSG:4326"
            });
          }
          const tileIndex = geojsonvt(json, {
            extent: 4096
          });
          return tileIndex;
        }));
        const format = new GeoJSON({
          // Data returned from geojson-vt is in tile pixel units
          dataProjection: new Projection({
            code: "TILE_PIXELS",
            units: "tile-pixels",
            extent: [0, 0, 4096, 4096]
          })
        });
        const vectorSource = new VectorTile({
          projection: mapProjection,
          tileUrlFunction: (tileCoord) => {
            return JSON.stringify(tileCoord);
          },
          tileLoadFunction: (tile, url) => {
            const tileCoord = JSON.parse(url);
            lazyTileIndex.getValueAsync().then((tileIndex) => {
              const data = tileIndex.getTile(
                tileCoord[0],
                tileCoord[1],
                tileCoord[2]
              );
              const geojson = JSON.stringify(
                {
                  type: "FeatureCollection",
                  features: data ? data.features : []
                },
                geoJsonVt2GeoJSON
              );
              const grid = vectorSource.getTileGrid();
              if (grid) {
                const features = format.readFeatures(geojson, {
                  extent: grid.getTileCoordExtent(tileCoord),
                  featureProjection: mapProjection
                });
                tile.setFeatures(features);
              }
            });
          }
        });
        const vectorLayer = new VectorTileLayer({
          source: vectorSource
        });
        setOLVectorLayerStyle(vectorLayer, (_e = defn.vectorStyle) != null ? _e : DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
        applyVectorLayerProperties(defn, vectorLayer, isExternal);
        return vectorLayer;
      } else {
        if (asVT) {
          console.warn("The geojson_as_vt meta option only applies if the MapGuide map or Primary Subject Layer is in EPSG:3857. This layer will be loaded as a regular GeoJSON layer");
        }
        const source = createGeoJsonVectorSource(defn, mapProjection);
        const layer = new VectorLayer(__spreadProps(__spreadValues({}, defn.layerOptions), {
          source: clusterSourceIfRequired(source, defn)
        }));
        setOLVectorLayerStyle(layer, (_f = defn.vectorStyle) != null ? _f : DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
        applyVectorLayerProperties(defn, layer, isExternal);
        return layer;
      }
    }
    case GenericSubjectLayerType.MVT: {
      const mo = {
        idProperty: defn.sourceParams.mvtIdProperty
      };
      switch (defn.sourceParams.mvtFeatureClass) {
        case "feature":
          mo.featureClass = Feature;
          break;
      }
      const source = new VectorTile({
        url: defn.sourceParams.url,
        format: new MVT(mo),
        attributions: defn.sourceParams.attributions,
        tileLoadFunction: function(tile, url) {
          tile.setLoader(function(extent, resolution, projection) {
            fetch(url).then(function(response) {
              if (response.status == 200) {
                response.arrayBuffer().then(function(data) {
                  const format = tile.getFormat();
                  const features = format.readFeatures(data, {
                    extent,
                    featureProjection: projection
                  }).filter((f) => f != null);
                  tile.setFeatures(features);
                });
              }
            });
          });
        }
      });
      const layer = new VectorTileLayer(__spreadProps(__spreadValues({}, defn.layerOptions), {
        source
      }));
      setOLVectorLayerStyle(layer, (_g = defn.vectorStyle) != null ? _g : DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
      applyVectorLayerProperties(defn, layer, isExternal);
      return layer;
    }
    case GenericSubjectLayerType.CSV: {
      const vectorSource = new VectorSource({
        loader: (_extent, _resolution, projection) => {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", defn.sourceParams.url);
          const onError = () => vectorSource.clear();
          xhr.onerror = onError;
          xhr.onload = () => {
            if (xhr.status == 200) {
              const driver = new CsvFormatDriver(CSV_COLUMN_ALIASES);
              driver.tryParse(xhr.responseText.length, xhr.responseText).then((pf) => {
                var _a2;
                pf.addTo(vectorSource, projection, (_a2 = defn.meta) == null ? void 0 : _a2.projection);
              }).catch((e) => onError());
            } else {
              onError();
            }
          };
          xhr.send();
        },
        attributions: defn.sourceParams.attributions
      });
      const layer = new VectorLayer(__spreadProps(__spreadValues({}, defn.layerOptions), {
        source: clusterSourceIfRequired(vectorSource, defn)
      }));
      setOLVectorLayerStyle(layer, (_h = defn.vectorStyle) != null ? _h : DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
      applyVectorLayerProperties(defn, layer, isExternal);
      return layer;
    }
    case GenericSubjectLayerType.KML: {
      const source = new VectorSource({
        url: defn.sourceParams.url,
        format: new KML(),
        attributions: defn.sourceParams.attributions
      });
      const layer = new VectorLayer(__spreadProps(__spreadValues({}, defn.layerOptions), {
        source: clusterSourceIfRequired(source, defn)
      }));
      applyVectorLayerProperties(defn, layer, isExternal);
      return layer;
    }
    case GenericSubjectLayerType.TileWMS: {
      const sourceArgs = __spreadValues({}, defn.sourceParams);
      const layer = new TileLayer({
        source: new TileWMS(sourceArgs)
      });
      layer.set(LayerProperty.LAYER_DESCRIPTION, defn.description);
      layer.set(LayerProperty.LAYER_TYPE, "WMS");
      layer.set(LayerProperty.IS_SELECTABLE, true);
      layer.set(LayerProperty.IS_EXTERNAL, isExternal);
      layer.set(LayerProperty.IS_GROUP, false);
      layer.set(LayerProperty.SELECTED_POPUP_CONFIGURATION, defn.popupTemplate);
      layer.set(LayerProperty.LAYER_METADATA, defn.meta);
      layer.set(LayerProperty.LAYER_DEFN, defn);
      layer.setVisible(defn.initiallyVisible);
      return layer;
    }
    case GenericSubjectLayerType.WFS: {
      const sourceArgs = __spreadValues({}, defn.sourceParams);
      const layer = new VectorLayer(__spreadProps(__spreadValues({}, defn.layerOptions), {
        source: new VectorSource(__spreadProps(__spreadValues({}, sourceArgs), {
          format: new GeoJSON({
            dataProjection: (_i = defn.meta) == null ? void 0 : _i.projection,
            featureProjection: mapProjection
          })
        }))
      }));
      setOLVectorLayerStyle(layer, (_j = defn.vectorStyle) != null ? _j : DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
      applyVectorLayerProperties(defn, layer, isExternal);
      return layer;
    }
    case GenericSubjectLayerType.CustomVector: {
      if (strIsNullOrEmpty(defn.driverName)) {
        throw new Error("Missing required driverName");
      }
      const reg = ExternalLayerFactoryRegistry.getInstance();
      const factory = reg.getExternalVectorLayerCreator(defn.driverName);
      if (!factory) {
        throw new Error(`Could not resolve an approriate factory for the given driver: ${defn.driverName}`);
      }
      const layer = factory(defn.sourceParams, defn.meta, defn.layerOptions, appSettings);
      const source = clusterSourceIfRequired(layer.getSource(), defn);
      layer.setSource(source);
      setOLVectorLayerStyle(layer, (_k = defn.vectorStyle) != null ? _k : DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
      applyVectorLayerProperties(defn, layer, isExternal);
      return layer;
    }
    case GenericSubjectLayerType.GeoTIFF: {
      const sourceArgs = __spreadValues({}, defn.sourceParams);
      const layer = new WebGLTileLayer();
      geoTiffSourceCtorPromise.then((GeoTIFF) => {
        layer.setSource(new GeoTIFF(sourceArgs));
      });
      layer.set(LayerProperty.LAYER_DESCRIPTION, defn.description);
      layer.set(LayerProperty.LAYER_TYPE, "GeoTIFF");
      layer.set(LayerProperty.IS_SELECTABLE, false);
      layer.set(LayerProperty.IS_EXTERNAL, isExternal);
      layer.set(LayerProperty.IS_GROUP, false);
      layer.set(LayerProperty.LAYER_METADATA, defn.meta);
      layer.set(LayerProperty.LAYER_DEFN, defn);
      layer.setVisible(defn.initiallyVisible);
      return layer;
    }
    default:
      throw new Error(`Unknown subject layer type: ${defn.type}`);
  }
}
function convertStamenLayerName(name) {
  switch (name) {
    case "toner-lite":
      return "toner_lite";
    default:
      return name;
  }
}
function createExternalSource(layer) {
  let sourceCtor;
  switch (layer.kind) {
    case "XYZ":
      sourceCtor = XYZ;
      break;
    case "XYZDebug":
      sourceCtor = TileDebug;
      break;
    case "OSM":
      sourceCtor = OSM;
      break;
    case "StadiaMaps":
      return new XYZ({
        crossOrigin: "Anonymous",
        url: "https://tiles.stadiamaps.com/tiles/" + layer.options.layer + "/{z}/{x}/{y}.png?api_key=" + layer.options.key
      });
    case "Stamen":
      return new XYZ({
        crossOrigin: "Anonymous",
        url: "https://tiles.stadiamaps.com/tiles/stamen_" + convertStamenLayerName(layer.options.layer) + "/{z}/{x}/{y}.png?api_key=" + layer.options.key
      });
    case "BingMaps":
      sourceCtor = BingMaps;
      break;
    case "UTFGrid":
      sourceCtor = UTFGrid;
      break;
    default:
      throw new MgError(`Unknown external base layer provider: ${layer.kind}`);
  }
  if (typeof layer.options != "undefined")
    return new sourceCtor(__spreadValues({ crossOrigin: "Anonymous" }, layer.options));
  else
    return new sourceCtor({ crossOrigin: "Anonymous" });
}
class BaseLayerSetOL {
  constructor(externalBaseLayersGroup, projection, dpi, extent, inPerUnit, view) {
    this.externalBaseLayersGroup = externalBaseLayersGroup;
    this.projection = projection;
    this.dpi = dpi;
    this.extent = extent;
    this.inPerUnit = inPerUnit;
    this.view = view;
  }
  getMetersPerUnit() {
    return this.inPerUnit / 39.37;
  }
  scaleToResolution(scale) {
    return scale / this.inPerUnit / this.dpi * DEVICE_PIXEL_RATIO;
  }
  resolutionToScale(resolution) {
    return resolution * this.dpi * this.inPerUnit / DEVICE_PIXEL_RATIO;
  }
  updateExternalBaseLayers(externalBaseLayers) {
    if (this.externalBaseLayersGroup) {
      const layers = this.externalBaseLayersGroup.getLayers();
      layers.forEach((l) => {
        const match = (externalBaseLayers || []).filter((el) => el.name === l.get("title"));
        if (match.length == 1) {
          l.setVisible(!!match[0].visible);
        } else {
          l.setVisible(false);
        }
      });
    }
  }
  /**
   *
   * @virtual
   * @param {RefreshMode} mode
   */
  refreshMap(mode) {
  }
}
const DEFAULT_METERS_PER_UNIT = 1;
const M_TO_IN = 39.37;
const DEFAULT_DPI = 96;
class GenericLayerSetOL extends BaseLayerSetOL {
  constructor(view, subjectLayer, extent, externalBaseLayersGroup, projection, metersPerUnit = DEFAULT_METERS_PER_UNIT, dpi = DEFAULT_DPI) {
    super(externalBaseLayersGroup, projection, dpi, extent, M_TO_IN * metersPerUnit, view);
    this.subjectLayer = subjectLayer;
  }
  getLayers() {
    const layers = [];
    if (this.externalBaseLayersGroup) {
      layers.push(this.externalBaseLayersGroup);
    }
    if (this.subjectLayer) {
      layers.push(this.subjectLayer);
    }
    return layers;
  }
  getSourcesForProgressTracking() {
    const sources = [];
    if (this.externalBaseLayersGroup) {
      const bls = this.externalBaseLayersGroup.getLayersArray();
      for (const bl of bls) {
        if (bl instanceof ImageLayer || bl instanceof TileLayer) {
          sources.push(bl.getSource());
        }
      }
    }
    if (this.subjectLayer instanceof ImageLayer) {
      sources.push(this.subjectLayer.getSource());
    } else if (this.subjectLayer instanceof TileLayer) {
      sources.push(this.subjectLayer.getSource());
    }
    return sources;
  }
  updateTransparency(trans) {
    if (this.externalBaseLayersGroup) {
      if (LAYER_ID_BASE in trans) {
        this.externalBaseLayersGroup.setOpacity(restrictToRange(trans[LAYER_ID_BASE], 0, 1));
      } else {
        this.externalBaseLayersGroup.setOpacity(1);
      }
    }
    if (this.subjectLayer) {
      if (LAYER_ID_MG_BASE in trans) {
        const opacity = restrictToRange(trans[LAYER_ID_MG_BASE], 0, 1);
        this.subjectLayer.setOpacity(opacity);
      } else {
        this.subjectLayer.setOpacity(1);
      }
    }
  }
  /**
   * 
   * @param mapExtent 
   * @param size @deprecated This parameter is no longer used and will be removed in a later release
   * @param uri 
   * 
   * @since 0.15 Deprecated size parameter
   */
  showActiveSelectedFeature(mapExtent, size, uri) {
  }
  update(showGroups, showLayers, hideGroups, hideLayers) {
  }
  updateSelectionColor(color) {
  }
}
const DEFAULT_BOUNDS_4326 = [-180, -90, 180, 90];
function getMetersPerUnit(projection) {
  const proj = get(projection);
  return proj == null ? void 0 : proj.getMetersPerUnit();
}
function toMetersPerUnit(unit) {
  const u = toProjUnit(unit);
  let mpu = METERS_PER_UNIT[u];
  if (mpu) {
    return mpu;
  } else {
    switch (unit) {
      case UnitOfMeasure.Centimeters:
        return 0.01;
      case UnitOfMeasure.DMS:
      case UnitOfMeasure.DecimalDegrees:
      case UnitOfMeasure.Degrees:
        return 2 * Math.PI * 6370997 / 360;
      case UnitOfMeasure.Feet:
        return 0.3048;
      case UnitOfMeasure.Inches:
        return 0.0254;
      case UnitOfMeasure.Kilometers:
        return 1e3;
      case UnitOfMeasure.Meters:
        return 1;
      case UnitOfMeasure.Miles:
        return 1609.344;
      case UnitOfMeasure.Millimeters:
        return 1e-3;
      case UnitOfMeasure.NauticalMiles:
        return 1852;
      case UnitOfMeasure.Pixels:
        return 1;
      case UnitOfMeasure.Unknown:
        return 1;
      case UnitOfMeasure.Yards:
        return 0.9144;
    }
  }
}
function toProjUnit(unit) {
  switch (unit) {
    case UnitOfMeasure.Meters:
      return "m";
    case UnitOfMeasure.Feet:
      return "ft";
    case UnitOfMeasure.Inches:
      return "in";
    case UnitOfMeasure.Centimeters:
      return "cm";
    case UnitOfMeasure.Kilometers:
      return "km";
    case UnitOfMeasure.Yards:
      return "yd";
    case UnitOfMeasure.Millimeters:
      return "mm";
    case UnitOfMeasure.Miles:
      return "mi";
    case UnitOfMeasure.NauticalMiles:
      return "nm";
    case UnitOfMeasure.Pixels:
      return "px";
    default:
      throw new MgError("Unsupported unit");
  }
}
function blankImageLoadFunction(image) {
  image.getImage().src = BLANK_GIF_DATA_URI;
}
function mockMapGuideImageLoadFunction(image, src) {
  let el = document.getElementById("mg-debug-text-canvas");
  if (!el) {
    el = document.createElement("canvas");
    el.style.visibility = "hidden";
    el.id = "mg-debug-text-canvas";
    document.body.append(el);
  }
  const tCtx = el.getContext("2d");
  if (tCtx) {
    tCtx.clearRect(0, 0, tCtx.canvas.width, tCtx.canvas.height);
    const strings = [];
    const parsed = parseUrl(src);
    strings.push("[Mock MapGuide Map Image Request]");
    strings.push(`Agent: ${parsed.url}`);
    const xoff = 10;
    const yoff = 30;
    const fontSize = 14;
    let mm = tCtx.measureText(strings[0]);
    let maxSize = mm.width + xoff;
    let ch = yoff + fontSize + 2;
    maxSize = Math.max(tCtx.measureText(strings[1]).width + xoff, maxSize);
    ch += fontSize + 2;
    const keys = Object.keys(parsed.query);
    for (const k of keys) {
      if (k == "MAPNAME" || k == "SETDISPLAYWIDTH" || k == "SETDISPLAYHEIGHT" || k == "SETVIEWCENTERX" || k == "SETVIEWCENTERY" || k == "SETVIEWSCALE") {
        if (!strIsNullOrEmpty(parsed.query[k])) {
          const s = `${k}: ${parsed.query[k]}`;
          strings.push(s);
          maxSize = Math.max(tCtx.measureText(s).width + xoff, maxSize);
          ch += fontSize + 2;
        }
      }
    }
    tCtx.canvas.width = maxSize;
    tCtx.canvas.height = ch;
    tCtx.fillStyle = "rgba(255, 0, 0, 0.5)";
    tCtx.fillRect(0, 0, maxSize, ch);
    tCtx.fillStyle = "rgba(255, 255, 0, 1.0)";
    tCtx.font = `${fontSize}px sans-serif`;
    let y = yoff;
    for (const str of strings) {
      tCtx.fillText(str, 10, y);
      y += fontSize + 1;
    }
    image.getImage().src = tCtx.canvas.toDataURL();
  }
}
var MgLayerSetMode = /* @__PURE__ */ ((MgLayerSetMode2) => {
  MgLayerSetMode2[MgLayerSetMode2["Stateless"] = 0] = "Stateless";
  MgLayerSetMode2[MgLayerSetMode2["Stateful"] = 1] = "Stateful";
  MgLayerSetMode2[MgLayerSetMode2["OverviewMap"] = 2] = "OverviewMap";
  return MgLayerSetMode2;
})(MgLayerSetMode || {});
class MgLayerSetOL {
  constructor(mgTiledLayers, externalBaseLayersGroup, overlay, projection, dpi, extent, inPerUnit, view) {
    this.mgTiledLayers = mgTiledLayers;
    this.externalBaseLayersGroup = externalBaseLayersGroup;
    this.overlay = overlay;
    this.projection = projection;
    this.dpi = dpi;
    this.extent = extent;
    this.inPerUnit = inPerUnit;
    this.view = view;
  }
  getMetersPerUnit() {
    return this.inPerUnit / 39.37;
  }
  scaleToResolution(scale) {
    return scale / this.inPerUnit / this.dpi * DEVICE_PIXEL_RATIO;
  }
  resolutionToScale(resolution) {
    return resolution * this.dpi * this.inPerUnit / DEVICE_PIXEL_RATIO;
  }
  getSourcesForProgressTracking() {
    const sources = [];
    if (this.externalBaseLayersGroup) {
      const bls = this.externalBaseLayersGroup.getLayersArray();
      for (const bl of bls) {
        if (bl instanceof ImageLayer || bl instanceof TileLayer) {
          sources.push(bl.getSource());
        }
      }
    }
    for (let i = this.mgTiledLayers.length - 1; i >= 0; i--) {
      const s = this.mgTiledLayers[i].getSource();
      if (s) {
        sources.push();
      }
    }
    const ovs = this.overlay.getSource();
    if (ovs) {
      sources.push(ovs);
    }
    if (this.selectionOverlay) {
      const sovs = this.selectionOverlay.getSource();
      if (sovs) {
        sources.push(sovs);
      }
    }
    if (this.activeSelectedFeatureOverlay) {
      const asovs = this.activeSelectedFeatureOverlay.getSource();
      if (asovs) {
        sources.push(asovs);
      }
    }
    return sources;
  }
  getLayers() {
    const layers = [];
    if (this.externalBaseLayersGroup) {
      layers.push(this.externalBaseLayersGroup);
    }
    for (let i = this.mgTiledLayers.length - 1; i >= 0; i--) {
      layers.push(this.mgTiledLayers[i]);
    }
    layers.push(this.overlay);
    if (this.selectionOverlay) {
      layers.push(this.selectionOverlay);
    }
    if (this.activeSelectedFeatureOverlay) {
      layers.push(this.activeSelectedFeatureOverlay);
    }
    return layers;
  }
  update(showGroups, showLayers, hideGroups, hideLayers) {
    const imgSource = this.overlay.getSource();
    imgSource.updateParams({
      showlayers: showLayers,
      showgroups: showGroups,
      hidelayers: hideLayers,
      hidegroups: hideGroups
    });
    if (showGroups && showGroups.length > 0) {
      for (const groupId of showGroups) {
        const match = this.mgTiledLayers.filter((l) => l.get(LayerProperty.LAYER_NAME) === groupId);
        if (match.length == 1) {
          match[0].setVisible(true);
        }
      }
    }
    if (hideGroups && hideGroups.length > 0) {
      for (const groupId of hideGroups) {
        const match = this.mgTiledLayers.filter((l) => l.get(LayerProperty.LAYER_NAME) === groupId);
        if (match.length == 1) {
          match[0].setVisible(false);
        }
      }
    }
  }
  updateSelectionColor(color) {
    if (this.selectionOverlay) {
      const source = this.selectionOverlay.getSource();
      source.updateParams({
        SELECTIONCOLOR: color
      });
    }
  }
  updateExternalBaseLayers(externalBaseLayers) {
    if (this.externalBaseLayersGroup) {
      const layers = this.externalBaseLayersGroup.getLayers();
      layers.forEach((l) => {
        const match = (externalBaseLayers || []).filter((el) => el.name === l.get("title"));
        if (match.length == 1) {
          l.setVisible(!!match[0].visible);
        } else {
          l.setVisible(false);
        }
      });
    }
  }
  updateTransparency(trans) {
    if (this.externalBaseLayersGroup) {
      if (LAYER_ID_BASE in trans) {
        this.externalBaseLayersGroup.setOpacity(restrictToRange(trans[LAYER_ID_BASE], 0, 1));
      } else {
        this.externalBaseLayersGroup.setOpacity(1);
      }
    }
    if (LAYER_ID_MG_DYNAMIC_OVERLAY in trans) {
      const opacity = restrictToRange(trans[LAYER_ID_MG_DYNAMIC_OVERLAY], 0, 1);
      this.overlay.setOpacity(opacity);
    } else {
      this.overlay.setOpacity(1);
    }
    if (LAYER_ID_MG_BASE in trans) {
      const opacity = restrictToRange(trans[LAYER_ID_MG_BASE], 0, 1);
      for (const group of this.mgTiledLayers) {
        group.setOpacity(opacity);
      }
    } else {
      for (const group of this.mgTiledLayers) {
        group.setOpacity(1);
      }
    }
    if (this.selectionOverlay) {
      if (LAYER_ID_MG_SEL_OVERLAY in trans) {
        this.selectionOverlay.setOpacity(restrictToRange(trans[LAYER_ID_MG_SEL_OVERLAY], 0, 1));
      } else {
        this.selectionOverlay.setOpacity(1);
      }
    }
  }
  refreshMap(mode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly) {
    if ((mode & RefreshMode.LayersOnly) == RefreshMode.LayersOnly) {
      const imgSource = this.overlay.getSource();
      imgSource.updateParams({
        seq: (/* @__PURE__ */ new Date()).getTime()
      });
    }
    if (this.selectionOverlay) {
      if ((mode & RefreshMode.SelectionOnly) == RefreshMode.SelectionOnly) {
        const imgSource = this.selectionOverlay.getSource();
        imgSource.updateParams({
          seq: (/* @__PURE__ */ new Date()).getTime()
        });
      }
    }
  }
  makeActiveSelectedFeatureSource(mapExtent, size, url = BLANK_GIF_DATA_URI) {
    return new Static({
      imageExtent: mapExtent,
      //imageSize: [size.w, size.h],
      url
    });
  }
  /**
   * 
   * @param mapExtent 
   * @param size @deprecated This parameter is no longer used and will be removed in a later release
   * @param uri 
   * 
   * @since 0.15 Deprecated size parameter
   */
  showActiveSelectedFeature(mapExtent, size, uri) {
    if (this.activeSelectedFeatureOverlay) {
      this.activeSelectedFeatureOverlay.setSource(this.makeActiveSelectedFeatureSource(mapExtent, size, uri));
      this.activeSelectedFeatureOverlay.setVisible(true);
    }
  }
}
class MgInnerLayerSetFactory {
  constructor(callback, map, agentUri, imageFormat, selectionImageFormat, selectionColor) {
    this.callback = callback;
    this.map = map;
    this.agentUri = agentUri;
    if (isRuntimeMap(map)) {
      this.dynamicOverlayParams = {
        MAPNAME: map.Name,
        FORMAT: imageFormat,
        SESSION: map.SessionId,
        BEHAVIOR: 2
      };
      this.staticOverlayParams = {
        MAPDEFINITION: map.MapDefinition,
        FORMAT: imageFormat,
        CLIENTAGENT: "ol.source.ImageMapGuide for OverviewMap",
        USERNAME: "Anonymous",
        VERSION: "3.0.0"
      };
      this.selectionOverlayParams = {
        MAPNAME: map.Name,
        FORMAT: selectionImageFormat || "PNG8",
        SESSION: map.SessionId,
        SELECTIONCOLOR: selectionColor,
        BEHAVIOR: 1 | 4
        //selected features + include outside current scale
      };
    }
  }
  getTileUrlFunctionForGroup(resourceId, groupName, zOrigin) {
    const urlTemplate = this.callback.getClient().getTileTemplateUrl(resourceId, groupName, "{x}", "{y}", "{z}", false);
    return function(tileCoord) {
      const z = tileCoord[0];
      const x = tileCoord[1];
      const y = tileCoord[2];
      return urlTemplate.replace("{z}", (zOrigin - z).toString()).replace("{x}", x.toString()).replace("{y}", y.toString());
    };
  }
  create(locale, externalBaseLayers, mode, appSettings) {
    var _a;
    const { map, agentUri } = this;
    if (isRuntimeMap(map)) {
      if (strIsNullOrEmpty(agentUri)) {
        throw new MgError("Expected agentUri to be set");
      }
      const resourceId = map.TileSetDefinition || map.MapDefinition;
      const tileWidth = map.TileWidth || 300;
      const tileHeight = map.TileHeight || 300;
      const metersPerUnit = map.CoordinateSystem.MetersPerUnit;
      const finiteScales = [];
      if (map.FiniteDisplayScale) {
        for (let i = map.FiniteDisplayScale.length - 1; i >= 0; i--) {
          finiteScales.push(map.FiniteDisplayScale[i]);
        }
      }
      const extent = [
        map.Extents.LowerLeftCoordinate.X,
        map.Extents.LowerLeftCoordinate.Y,
        map.Extents.UpperRightCoordinate.X,
        map.Extents.UpperRightCoordinate.Y
      ];
      const dpi = map.DisplayDpi;
      const inPerUnit = 39.37 * map.CoordinateSystem.MetersPerUnit;
      const resolutions = new Array(finiteScales.length);
      let projection;
      for (let i = 0; i < finiteScales.length; ++i) {
        resolutions[i] = finiteScales[i] / inPerUnit / dpi;
      }
      const parsedArb = tryParseArbitraryCs(map.CoordinateSystem.MentorCode);
      if (parsedArb) {
        projection = new Projection({
          code: parsedArb.code,
          // HACK: Going to take a risk and just jam the values in
          units: toProjUnit(parsedArb.units),
          metersPerUnit: toMetersPerUnit(parsedArb.units)
        });
      } else {
        if (map.CoordinateSystem.EpsgCode.length > 0) {
          projection = `EPSG:${map.CoordinateSystem.EpsgCode}`;
        }
      }
      const zOrigin = finiteScales.length - 1;
      const mgTiledLayers = [];
      if (map.Group) {
        for (let i = 0; i < map.Group.length; i++) {
          const group = map.Group[i];
          if (group.Type != 2 && group.Type != 3) {
            continue;
          }
          let tileLayer;
          if (group.Type === 3 && map.TileSetProvider === "XYZ") {
            let retinaScale = 1;
            if (typeof map.TilePixelRatio != "undefined") {
              retinaScale = map.TilePixelRatio;
            }
            const tileSource = new XYZ({
              tileSize: [256 * retinaScale, 256 * retinaScale],
              tileGrid: createXYZ({ tileSize: [256, 256] }),
              projection,
              // TODO: Should use tileUrlFunction for consistency with MG tiled layers below and to also faciliate 
              // something like client-side tile caching in the future
              url: this.callback.getClient().getTileTemplateUrl(resourceId, group.Name, "{x}", "{y}", "{z}", true),
              wrapX: false
            });
            tileLayer = new TileLayer({
              //name: group.Name,
              source: tileSource
            });
          } else {
            const tileGrid = new TileGrid({
              origin: getTopLeft(extent),
              resolutions,
              tileSize: [tileWidth, tileHeight]
            });
            const tileSource = new TileImage({
              tileGrid,
              projection,
              tileUrlFunction: this.getTileUrlFunctionForGroup(resourceId, group.Name, zOrigin),
              wrapX: false
            });
            tileLayer = new TileLayer({
              //name: group.Name,
              source: tileSource
            });
          }
          tileLayer.set(LayerProperty.LAYER_NAME, group.ObjectId);
          tileLayer.set(LayerProperty.LAYER_DISPLAY_NAME, group.ObjectId);
          tileLayer.set(LayerProperty.LAYER_TYPE, MgLayerType.Tiled);
          tileLayer.set(LayerProperty.IS_EXTERNAL, false);
          tileLayer.set(LayerProperty.IS_GROUP, false);
          tileLayer.setVisible(group.Visible);
          mgTiledLayers.push(tileLayer);
        }
      }
      const overlay = this.createMgOverlayLayer(MgBuiltInLayers.Overlay, agentUri, locale, metersPerUnit, projection, mode == 1, mode == 1 ? this.dynamicOverlayParams : this.staticOverlayParams);
      let selectionOverlay;
      let activeSelectedFeatureOverlay;
      if (mode == 1) {
        selectionOverlay = this.createMgOverlayLayer(MgBuiltInLayers.SelectionOverlay, agentUri, locale, metersPerUnit, projection, true, this.selectionOverlayParams);
      }
      if (mode == 1) {
        activeSelectedFeatureOverlay = new ImageLayer({
          //OL6: need to specify a source up-front otherwise it will error blindly
          //trying to get a source out of this URL, so set up a source with an empty
          //image data URI, it will be updated if we receive a request to show an
          //active selected feature image
          source: new Static({
            imageExtent: extent,
            //imageSize: [BLANK_SIZE.w, BLANK_SIZE.h],
            url: BLANK_GIF_DATA_URI
          })
        });
        activeSelectedFeatureOverlay.set(LayerProperty.LAYER_NAME, MgBuiltInLayers.ActiveFeatureSelectionOverlay);
        activeSelectedFeatureOverlay.set(LayerProperty.LAYER_DISPLAY_NAME, MgBuiltInLayers.ActiveFeatureSelectionOverlay);
        activeSelectedFeatureOverlay.set(LayerProperty.LAYER_TYPE, MG_LAYER_TYPE_NAME);
        activeSelectedFeatureOverlay.set(LayerProperty.IS_EXTERNAL, false);
        activeSelectedFeatureOverlay.set(LayerProperty.IS_GROUP, false);
      }
      let externalBaseLayersGroup;
      if (mode != 2 && externalBaseLayers != null) {
        const groupOpts = {
          title: tr("EXTERNAL_BASE_LAYERS", locale),
          layers: externalBaseLayers.map((ext) => {
            const tl = this.createExternalBaseLayer(ext);
            return tl;
          })
        };
        externalBaseLayersGroup = new LayerGroup(groupOpts);
        externalBaseLayersGroup.set(LayerProperty.LAYER_NAME, MG_BASE_LAYER_GROUP_NAME);
        externalBaseLayersGroup.set(LayerProperty.LAYER_DISPLAY_NAME, MG_BASE_LAYER_GROUP_NAME);
        externalBaseLayersGroup.set(LayerProperty.IS_EXTERNAL, false);
        externalBaseLayersGroup.set(LayerProperty.IS_GROUP, true);
      }
      debug(`Creating OL view with projection ${projection} and ${resolutions.length} resolutions`);
      let view;
      if (resolutions.length == 0) {
        view = new View({
          projection
        });
      } else {
        view = new View({
          projection,
          resolutions
        });
      }
      const layerSet = new MgLayerSetOL(
        mgTiledLayers,
        externalBaseLayersGroup,
        overlay,
        projection,
        dpi,
        extent,
        inPerUnit,
        view
      );
      layerSet.selectionOverlay = selectionOverlay;
      layerSet.activeSelectedFeatureOverlay = activeSelectedFeatureOverlay;
      return layerSet;
    } else {
      let projection = (_a = map == null ? void 0 : map.meta) == null ? void 0 : _a.projection;
      let bounds;
      let externalBaseLayersGroup;
      if (externalBaseLayers != null) {
        const groupOpts = {
          title: tr("EXTERNAL_BASE_LAYERS", locale),
          layers: externalBaseLayers.map((ext) => {
            const tl = this.createExternalBaseLayer(ext);
            return tl;
          })
        };
        externalBaseLayersGroup = new LayerGroup(groupOpts);
        externalBaseLayersGroup.set(LayerProperty.LAYER_NAME, MG_BASE_LAYER_GROUP_NAME);
        externalBaseLayersGroup.set(LayerProperty.IS_EXTERNAL, false);
        externalBaseLayersGroup.set(LayerProperty.IS_GROUP, true);
      }
      let subjectLayer;
      if (map) {
        subjectLayer = createOLLayerFromSubjectDefn(map, projection, false, appSettings);
        if (map.meta) {
          projection = map.meta.projection;
          bounds = map.meta.extents;
        }
      }
      if (!projection && !bounds) {
        projection = "EPSG:4326";
        bounds = DEFAULT_BOUNDS_4326;
      }
      const parsedArb = tryParseArbitraryCs(projection);
      let metersPerUnit = 1;
      if (parsedArb) {
        projection = new Projection({
          code: parsedArb.code,
          // HACK: Going to take a risk and just jam the values in
          units: toProjUnit(parsedArb.units),
          metersPerUnit: toMetersPerUnit(parsedArb.units),
          extent: bounds
        });
      } else {
        metersPerUnit = getMetersPerUnit(projection);
      }
      const view = new View({
        projection
      });
      return new GenericLayerSetOL(view, subjectLayer, bounds, externalBaseLayersGroup, projection, metersPerUnit);
    }
  }
  createExternalBaseLayer(ext) {
    const extSource = createExternalSource(ext);
    if (extSource instanceof UrlTile) {
      const loaders = this.callback.getBaseTileLoaders();
      if (loaders[ext.name])
        extSource.setTileLoadFunction(loaders[ext.name]);
    }
    const options = {
      title: ext.name,
      type: "base",
      visible: ext.visible === true,
      source: extSource
    };
    const tl = new TileLayer(options);
    tl.set(LayerProperty.LAYER_TYPE, ext.kind);
    tl.set(LayerProperty.LAYER_NAME, ext.name);
    tl.set(LayerProperty.LAYER_DISPLAY_NAME, ext.name);
    tl.set(LayerProperty.IS_EXTERNAL, false);
    tl.set(LayerProperty.IS_GROUP, false);
    return tl;
  }
  createMgOverlayLayer(layerName, agentUri, locale, metersPerUnit, projection, useImageOverlayOp, params) {
    const overlaySource = createMapGuideSource({
      projection,
      url: agentUri,
      useOverlay: useImageOverlayOp,
      metersPerUnit,
      params,
      ratio: 1,
      // For mobile devices with retina/hidpi displays, the default 96 DPI produces
      // really low quality map images. For such devices, the DPI should be some
      // function of the device pixel ratio reported. As this value can be fractional
      // round it down to the nearest integer
      //
      // UPDATE 18/07/2023: But cap it to a minimum of 1, otherwise a sub-1 ratio floors to 0, making the
      // final DPI 0, which breaks everything
      displayDpi: Math.max(Math.floor(DEVICE_PIXEL_RATIO), 1) * 96
    });
    overlaySource.setAttributions(tr("PBMG", locale != null ? locale : DEFAULT_LOCALE));
    const layer = new ImageLayer({
      //name: "MapGuide Dynamic Overlay",
      source: overlaySource
    });
    layer.set(LayerProperty.LAYER_NAME, layerName);
    layer.set(LayerProperty.LAYER_DISPLAY_NAME, layerName);
    layer.set(LayerProperty.LAYER_TYPE, MG_LAYER_TYPE_NAME);
    layer.set(LayerProperty.IS_EXTERNAL, false);
    layer.set(LayerProperty.IS_GROUP, false);
    return layer;
  }
}
const MeasureContainer = () => {
  var _a;
  const { Callout, Button, HtmlTable } = useElementContext();
  const activeMapName = useActiveMapName();
  const locale = useViewerLocale();
  const mapNames = (_a = useAvailableMaps()) == null ? void 0 : _a.map((m) => m.value);
  const dispatch = useReduxDispatch();
  const setActiveToolAction = (tool) => dispatch(setActiveTool(tool));
  const isArbitrary = useActiveMapIsArbitraryCoordSys();
  const projUnits = useActiveMapProjectionUnits();
  const viewer = useMapProviderContext();
  const measureUnits = isArbitrary ? projUnits : void 0;
  const [measuring, setMeasuring] = reactExports.useState(false);
  const [drawType, setDrawType] = reactExports.useState("LineString");
  const [activeType, setActiveType] = reactExports.useState();
  const [segmentTotal, setSegmentTotal] = reactExports.useState();
  const [segments, setSegments] = reactExports.useState();
  const measureContexts = reactExports.useRef([]);
  const getLocale = reactExports.useCallback(() => locale || DEFAULT_LOCALE, [locale]);
  const onTypeChanged = (newType) => {
    setDrawType(newType);
  };
  reactExports.useEffect(() => {
    if (activeMapName && measuring === true) {
      const activeMeasure = measureContexts.current.filter((m) => m.getMapName() === activeMapName)[0];
      if (activeMeasure) {
        activeMeasure.handleDrawTypeChange(drawType);
      }
    }
  }, [drawType]);
  const onClearMeasurements = reactExports.useCallback((e) => {
    e.preventDefault();
    if (activeMapName) {
      const activeMeasure = measureContexts.current.filter((m) => m.getMapName() === activeMapName)[0];
      if (activeMeasure) {
        activeMeasure.clearMeasurements();
      }
    }
    return false;
  }, [activeMapName]);
  const startMeasure = reactExports.useCallback(() => {
    if (activeMapName && drawType && !measuring) {
      setActiveToolAction == null ? void 0 : setActiveToolAction(ActiveMapTool.None);
      const activeMeasure = measureContexts.current.filter((m) => m.getMapName() === activeMapName)[0];
      if (activeMeasure) {
        activeMeasure.startMeasure(drawType);
        setMeasuring(true);
      }
    }
  }, [activeMapName, drawType, measuring, setActiveToolAction]);
  const endMeasure = reactExports.useCallback(() => {
    if (activeMapName && measuring) {
      const activeMeasure = measureContexts.current.filter((m) => m.getMapName() === activeMapName)[0];
      if (activeMeasure) {
        activeMeasure.endMeasure();
        setMeasuring(false);
      }
    }
  }, [activeMapName, measuring]);
  const onStartMeasure = reactExports.useCallback(() => startMeasure(), [startMeasure]);
  const onEndMeasure = reactExports.useCallback(() => endMeasure(), [endMeasure]);
  const updateSegments = reactExports.useCallback((kind, total, segs) => {
    setActiveType(kind);
    setSegmentTotal(total);
    setSegments(segs);
  }, []);
  const clearSegments = reactExports.useCallback(() => setSegments(void 0), []);
  reactExports.useEffect(() => {
    let activeMeasure;
    if (measureContexts.current.length === 0) {
      if (viewer.isReady() && mapNames && mapNames.length) {
        for (const mapName of mapNames) {
          const context = new MeasureContext(viewer, mapName, {
            updateSegments,
            clearSegments,
            getCurrentDrawType: () => drawType,
            getLocale
          });
          measureContexts.current.push(context);
          if (activeMapName === mapName) {
            activeMeasure = context;
          }
        }
      }
    } else {
      for (const measure of measureContexts.current) {
        measure.setParent({
          updateSegments,
          clearSegments,
          getCurrentDrawType: () => drawType,
          getLocale
        });
      }
      activeMeasure = measureContexts.current.filter((m) => m.getMapName() === activeMapName)[0];
    }
    if (activeMeasure && activeMapName) {
      activeMeasure.activate(activeMapName, {
        updateSegments,
        clearSegments,
        getCurrentDrawType: () => drawType,
        getLocale
      });
    }
    return () => {
      setMeasuring(false);
      for (const measure of measureContexts.current) {
        measure.detachParent();
      }
      if (activeMapName) {
        for (const measure of measureContexts.current) {
          measure.deactivate(activeMapName);
        }
      }
    };
  }, []);
  reactExports.useEffect(() => {
    setMeasuring(false);
  }, [activeMapName]);
  const measurementTypes = [
    { value: "LineString", label: tr("MEASUREMENT_TYPE_LENGTH", locale) },
    { value: "Polygon", label: tr("MEASUREMENT_TYPE_AREA", locale) }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "component-measure", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "form-inline", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "bp3-label", children: [
      tr("MEASUREMENT_TYPE", locale),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TypedSelect,
        {
          value: drawType,
          onChange: onTypeChanged,
          items: measurementTypes
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ElementGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", icon: "play", disabled: measuring, onClick: onStartMeasure, children: tr("MEASUREMENT_START", locale) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", icon: "stop", disabled: !measuring, onClick: onEndMeasure, children: tr("MEASUREMENT_END", locale) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", icon: "cross", onClick: onClearMeasurements, children: tr("MEASUREMENT_CLEAR", locale) })
    ] }),
    measuring === true && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Callout, { variant: "primary", title: tr("MEASURING", locale), children: tr("MEASURING_MESSAGE", locale) }),
      segments && /* @__PURE__ */ jsxRuntimeExports.jsxs(HtmlTable, { condensed: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: tr("MEASURE_SEGMENT", locale) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: tr("MEASURE_LENGTH", locale) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          segments.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: tr("MEASURE_SEGMENT_PART", locale, { segment: s.segment }) }),
            measureUnits ? /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: `${roundTo(s.length, 2)} ${toProjUnit(measureUnits)}` }) : /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: tr("UNIT_FMT_M", locale, { value: roundTo(s.length, 2) }) })
          ] }, `segment-${s.segment}`)),
          segmentTotal !== void 0 && activeType && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: activeType === "Area" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: tr("MEASURE_TOTAL_AREA", locale) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: measureUnits ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: { __html: `${roundTo(segmentTotal, 4)} ${toProjUnit(measureUnits)} <sup>2</sup>` } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: { __html: purify.sanitize(tr("UNIT_FMT_SQM", locale, { value: `${roundTo(segmentTotal, 4)}` })) } }) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: tr("MEASURE_TOTAL_LENGTH", locale) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: measureUnits ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: { __html: `${roundTo(segmentTotal, 4)} ${toProjUnit(measureUnits)}` } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: { __html: purify.sanitize(tr("UNIT_FMT_M", locale, { value: `${roundTo(segmentTotal, 4)}` })) } }) })
          ] }) })
        ] })
      ] })
    ] })
  ] }) });
};
const BaseLayerSwitcher = (props) => {
  const { Radio } = useElementContext();
  const { locale, externalBaseLayers } = props;
  const visLayers = externalBaseLayers.filter((layer) => layer.visible === true);
  const [selected, setSelected] = reactExports.useState(visLayers.length == 1 ? visLayers[0].name : STR_EMPTY);
  const onBaseLayerChanged = (e) => {
    var _a;
    const value = e.currentTarget.value;
    setSelected(value);
    (_a = props.onBaseLayerChanged) == null ? void 0 : _a.call(props, value);
  };
  reactExports.useEffect(() => {
    setSelected(visLayers.length == 1 ? visLayers[0].name : STR_EMPTY);
  }, [visLayers]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "base-layer-switcher-item-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: STR_EMPTY, checked: strIsNullOrEmpty(selected), onChange: onBaseLayerChanged, label: tr("NONE", locale) }) }),
    externalBaseLayers.filter((ebl) => isVisualBaseLayer(ebl)).map((layer) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "base-layer-switcher-item-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: layer.name, checked: layer.name === selected, onChange: onBaseLayerChanged, label: layer.name }) }, `base-layer-${layer.name}`);
    })
  ] });
};
const BaseLayerSwitcherContainer = () => {
  const mapName = useActiveMapName();
  const locale = useViewerLocale();
  const externalBaseLayers = useActiveMapExternalBaseLayers();
  const dispatch = useReduxDispatch();
  const setBaseLayerAction = (mapName2, layerName) => dispatch(setBaseLayer(mapName2, layerName));
  const onBaseLayerChanged = (layerName) => {
    if (mapName) {
      setBaseLayerAction == null ? void 0 : setBaseLayerAction(mapName, layerName);
    }
  };
  if (locale && externalBaseLayers) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(BaseLayerSwitcher, { onBaseLayerChanged, externalBaseLayers, locale });
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("noscript", {});
  }
};
const MapMenu = (props) => {
  const { Radio } = useElementContext();
  const [selected, setSelected] = reactExports.useState(void 0);
  const onActiveMapChanged = (e) => {
    var _a;
    const value = e.currentTarget.value;
    setSelected(value);
    (_a = props.onActiveMapChanged) == null ? void 0 : _a.call(props, value);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: props.maps.map((layer) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "map-menu-item-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: layer.mapName, checked: layer.mapName === props.selectedMap, onChange: onActiveMapChanged, label: layer.label }) }, `base-layer-${layer.mapName}`);
  }) });
};
const MapMenuContainer = () => {
  const dispatch = useReduxDispatch();
  const locale = useViewerLocale();
  const activeMapName = useActiveMapName();
  const availableMaps = useAvailableMaps();
  const onActiveMapChanged = (mapName) => dispatch(activateMap(mapName));
  if (locale && activeMapName && availableMaps) {
    const entries = availableMaps.map((m) => {
      return { label: m.name, mapName: m.value };
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MapMenu, { onActiveMapChanged, selectedMap: activeMapName, maps: entries, locale });
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("noscript", {});
  }
};
const CoordinateTrackerContainer = (props) => {
  const { Callout, Card, Heading } = useElementContext();
  const { projections } = props;
  const aProjections = Array.isArray(projections) ? projections : [projections];
  const locale = useViewerLocale();
  const mouse = useCurrentMouseCoordinates();
  const proj = useActiveMapProjection();
  if (aProjections && aProjections.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { margin: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 3, children: tr("COORDTRACKER", locale) }),
      aProjections.map((p) => {
        let x = NaN;
        let y = NaN;
        if (mouse && proj) {
          try {
            [x, y] = transform(mouse, proj, p);
          } catch (e) {
          }
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { style: { marginBottom: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 5, children: p }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: tr("COORDTRACKER_X", locale) }),
            " ",
            x
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: tr("COORDTRACKER_Y", locale) }),
            " ",
            y
          ] })
        ] }, p);
      })
    ] });
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Callout, { variant: "danger", title: tr("ERROR", locale), icon: "error", children: tr("COORDTRACKER_NO_PROJECTIONS", locale) });
  }
};
const ColorPicker = (props) => {
  var _a, _b, _c;
  const { Collapsible, Button, Card } = useElementContext();
  const [isPickerOpen, setIsPickerOpen] = reactExports.useState(false);
  const onPickerToggle = () => {
    setIsPickerOpen(!isPickerOpen);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: props.disabled, style: { width: 80, borderRadius: 3, backgroundColor: (_a = props.value) != null ? _a : DEFAULT_COLOR }, onClick: onPickerToggle, children: [
      NBSP,
      NBSP,
      NBSP
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", "aria-label": tr("COLOR_PICKER_INPUT_LABEL", props.locale), value: (_b = props.value) != null ? _b : "#" + DEFAULT_COLOR, onChange: (e) => props.onChange(e.target.value.replace(/^#/, "")), style: { width: 0, height: 0, opacity: 0 } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Collapsible, { isOpen: isPickerOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Z, { style: { width: "100%" }, color: (_c = props.value) != null ? _c : DEFAULT_COLOR, onChange: (c) => props.onChange(c) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: "chevron-up", variant: "primary", onClick: () => setIsPickerOpen(false), children: tr("ACTION_CLOSE", props.locale) })
    ] }) })
  ] });
};
function rgbToYIQ({ r, g, b }) {
  return (r * 299 + g * 587 + b * 114) / 1e3;
}
function hexToRgb(hex) {
  if (!hex || hex === void 0 || hex === "") {
    return void 0;
  }
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : void 0;
}
function contrast(colorHex, threshold = 128) {
  if (colorHex === void 0) {
    return "#000";
  }
  const rgb = hexToRgb(colorHex);
  if (rgb === void 0) {
    return "#000";
  }
  return rgbToYIQ(rgb) >= threshold ? "#000" : "#fff";
}
function stringifyExpr(expr, locale) {
  if (!expr) {
    return tr("EXPR_NOT_SET", locale);
  }
  if (isEvaluatable(expr)) {
    return tr("EXPR_EDITOR_EXPR_PREFIX", locale) + JSON.stringify(expr.expr);
  }
  return `${expr != null ? expr : STR_EMPTY}`;
}
function stringifyExprIf(expr, mode) {
  switch (mode) {
    case "edit-expr":
      return isEvaluatable(expr) ? JSON.stringify(expr.expr) : STR_EMPTY;
    case "edit-value":
      return isEvaluatable(expr) ? STR_EMPTY : `${expr != null ? expr : STR_EMPTY}`;
  }
}
function useExprEditor(props) {
  const { value, onChange } = props;
  const [editMode, setEditMode] = reactExports.useState(isEvaluatable(value) ? "edit-expr" : "edit-value");
  const [localValue, setLocalValue] = reactExports.useState(value);
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [isEditValid, setIsEditValid] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setLocalValue(value);
  }, [value]);
  const onCancelEditing = reactExports.useCallback(() => {
    setLocalValue(value);
    setIsEditing(false);
  }, [value]);
  const onApplyValue = () => {
    onChange(localValue);
    setIsEditing(false);
  };
  const onUpdateLocalValue = (val) => {
    try {
      setLocalValue(val);
      setIsEditValid(true);
    } catch (e) {
      setIsEditValid(false);
    }
  };
  return {
    editMode,
    localValue,
    isEditValid,
    isEditing,
    setIsEditing,
    setEditMode,
    setLocalValue,
    onApplyValue,
    onCancelEditing,
    onUpdateLocalValue
  };
}
function ExprEditorInner(props) {
  const { Button, Collapsible, Card, Radio, InputGroup, Heading } = useElementContext();
  const { renderValueEditor, locale, roStyle } = props;
  const {
    isEditValid,
    isEditing,
    localValue,
    setIsEditing,
    editMode,
    setEditMode,
    onApplyValue,
    onCancelEditing,
    onUpdateLocalValue
  } = useExprEditor(props);
  const [exprText, setExprText] = reactExports.useState(() => stringifyExprIf(localValue, "edit-expr"));
  reactExports.useEffect(() => {
    setExprText(stringifyExprIf(localValue, "edit-expr"));
  }, [localValue, editMode]);
  const onEditClick = () => {
    if (isEditing) {
      onCancelEditing();
    } else {
      setIsEditing(true);
    }
  };
  const editButton = /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: "edit", minimal: true, variant: "primary", style: { color: "white", backgroundColor: "#137cbd" }, onClick: (e) => onEditClick() });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroup, { style: roStyle, readOnly: true, value: stringifyExpr(props.value, locale), rightElement: editButton }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Collapsible, { isOpen: isEditing, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 5, children: tr("EXPR_EDITOR_EDIT_VALUE", locale) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { name: "edit-mode", label: tr("EXPR_EDITOR_VALUE", locale), value: "edit-value", checked: editMode == "edit-value", onChange: (e) => setEditMode(e.target.value) }),
      renderValueEditor(localValue, onUpdateLocalValue, locale, editMode != "edit-value"),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { name: "edit-mode", label: tr("EXPR_EDITOR_EXPRESSION", locale), value: "edit-expr", checked: editMode == "edit-expr", onChange: (e) => setEditMode(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InputGroup,
        {
          disabled: editMode != "edit-expr",
          placeholder: 'e.g. ["get","propertyName"]',
          value: exprText,
          onChange: (e) => {
            setExprText(e.target.value);
            try {
              const parsed = JSON.parse(e.target.value);
              if (Array.isArray(parsed)) {
                onUpdateLocalValue({ expr: parsed });
              }
            } catch (e2) {
            }
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ElementGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: !isEditValid, variant: "success", onClick: (e) => onApplyValue(), children: tr("APPLY", locale) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "danger", onClick: (e) => onCancelEditing(), children: tr("CANCEL", locale) })
      ] })
    ] }) })
  ] });
}
const NumberExprEditor = (props) => {
  const { NumericInput } = useElementContext();
  const { min, max } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ExprEditorInner,
    {
      locale: props.locale,
      value: props.value,
      onChange: props.onChange,
      renderValueEditor: (v, oc, loc, disabled) => /* @__PURE__ */ jsxRuntimeExports.jsx(NumericInput, { disabled, min, max, value: parseInt(stringifyExprIf(v, "edit-value"), 10), onChange: (e) => oc(e) })
    }
  );
};
const SliderExprEditor = (props) => {
  const { Slider } = useElementContext();
  const { min, max, labelStepSize } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ExprEditorInner,
    {
      locale: props.locale,
      value: props.value,
      onChange: props.onChange,
      renderValueEditor: (v, oc, loc, disabled) => /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { disabled, min, max, labelStepSize, value: parseInt(stringifyExprIf(v, "edit-value"), 10), onChange: (e) => oc(e) })
    }
  );
};
const StringExprEditor = (props) => {
  const { InputGroup } = useElementContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ExprEditorInner,
    {
      locale: props.locale,
      value: props.value,
      onChange: props.onChange,
      renderValueEditor: (v, oc, loc, disabled) => /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroup, { disabled, value: stringifyExprIf(v, "edit-value"), onChange: (e) => oc(e.target.value) })
    }
  );
};
const ColorExprEditor = (props) => {
  const { value } = props;
  let roStyle;
  if (!isEvaluatable(value) && !strIsNullOrEmpty(value)) {
    roStyle = {
      backgroundColor: value,
      color: contrast(value)
    };
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ExprEditorInner,
    {
      roStyle,
      locale: props.locale,
      value,
      onChange: props.onChange,
      renderValueEditor: (v, oc, loc, disabled) => /* @__PURE__ */ jsxRuntimeExports.jsx(ColorPicker, { locale: loc, value: stringifyExprIf(v, "edit-value"), onChange: (e) => oc(e) })
    }
  );
};
const DEFAULT_SIZE = [16, 16];
function getLegendImage(item, canvas = void 0, row = 0) {
  var _a;
  item = item || {};
  if (typeof item.margin === "undefined") item.margin = 10;
  const size = item.size || DEFAULT_SIZE;
  item.onload = item.onload || function() {
    setTimeout(function() {
      getLegendImage(item, canvas, row);
    }, 100);
  };
  const width = size[0] + 2 * item.margin;
  const height = item.lineHeight || size[1] + 2 * item.margin;
  const ratio = DEVICE_PIXEL_RATIO;
  if (!canvas) {
    row = 0;
    canvas = document.createElement("canvas");
    canvas.width = width * ratio;
    canvas.height = height * ratio;
  }
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.save();
    const vectorContext = toContext(ctx, { pixelRatio: ratio });
    let typeGeom = item.typeGeom;
    let style;
    let feature = item.feature;
    if (!feature && typeGeom) {
      if (/Point/.test(typeGeom)) feature = new Feature(new Point([0, 0]));
      else if (/LineString/.test(typeGeom)) feature = new Feature(new LineString([0, 0]));
      else feature = new Feature(new Polygon([[[0, 0]]]));
      if (item.properties) feature.setProperties(item.properties);
    }
    if (feature) {
      style = feature.getStyle();
      if (typeof style === "function") style = style(feature);
      if (!style) {
        style = typeof item.style === "function" ? item.style(feature) : item.style || [];
      }
      typeGeom = (_a = feature.getGeometry()) == null ? void 0 : _a.getType();
    } else {
      style = [];
    }
    if (!(style instanceof Array)) style = [style];
    const styles = style;
    let cx = width / 2;
    let cy = height / 2;
    const sx = size[0] / 2;
    const sy = size[1] / 2;
    let i;
    let s;
    if (typeGeom === "Point") {
      let extent = null;
      for (let i2 = 0; s = styles[i2]; i2++) {
        const img = s.getImage();
        if (img) {
          const imgElt = img.getImage(devicePixelRatio);
          if (imgElt && imgElt.complete && !imgElt.naturalWidth) {
            if (typeof item.onload === "function") {
              imgElt.addEventListener("load", function() {
                setTimeout(function() {
                  var _a2;
                  (_a2 = item.onload) == null ? void 0 : _a2.call(item);
                }, 100);
              });
            }
            img.load();
          }
          if (img.getAnchor) {
            const anchor = img.getAnchor();
            if (anchor) {
              const si = img.getSize();
              const dx = anchor[0] - si[0];
              const dy = anchor[1] - si[1];
              if (!extent) {
                extent = [dx, dy, dx + si[0], dy + si[1]];
              } else {
                extend$1(extent, [dx, dy, dx + si[0], dy + si[1]]);
              }
            }
          }
        }
      }
      if (extent) {
        cx = cx + (extent[2] + extent[0]) / 2;
        cy = cy + (extent[3] + extent[1]) / 2;
      }
    }
    cy += row * height || 0;
    for (i = 0; s = style[i]; i++) {
      vectorContext.setStyle(s);
      switch (typeGeom) {
        case Point:
        case "Point":
        case "MultiPoint":
          vectorContext.drawGeometry(new Point([cx, cy]));
          break;
        case LineString:
        case "LineString":
        case "MultiLineString":
          ctx.save();
          ctx.rect(item.margin * ratio, 0, size[0] * ratio, canvas.height);
          ctx.clip();
          vectorContext.drawGeometry(new LineString([[cx - sx, cy], [cx + sx, cy]]));
          ctx.restore();
          break;
        case Polygon:
        case "Polygon":
        case "MultiPolygon":
          vectorContext.drawGeometry(new Polygon([[[cx - sx, cy - sy], [cx + sx, cy - sy], [cx + sx, cy + sy], [cx - sx, cy + sy], [cx - sx, cy - sy]]]));
          break;
      }
    }
    ctx.restore();
  }
  return canvas;
}
function assertValue(val) {
  if (isEvaluatable(val))
    throw new Error("Value is expression instead of a raw value");
}
function ExprEditor(props) {
  assertValue(props.expr);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    tr("EXPR_EDITOR_EXPR_PREFIX", props.locale),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: `${props.expr}`, onChange: (e) => props.onExprChanged(props.converter(e.target.value)) })
  ] });
}
const DynamicSwitch = (props) => {
  const { Switch } = useElementContext();
  if (isEvaluatable(props.expr)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ExprEditor, __spreadProps(__spreadValues({}, props), { converter: (v) => (v == null ? void 0 : v.toLowerCase()) == "true" }));
  } else {
    const _a = props, { expr, onExprChanged } = _a, rest = __objRest(_a, ["expr", "onExprChanged"]);
    const innerProps = __spreadProps(__spreadValues({}, rest), {
      checked: props.expr,
      onChange: (e) => props.onExprChanged(e.target.checked)
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, __spreadValues({}, innerProps));
  }
};
const buildFont = (size, bold, italic, font = "sans-serif") => `${bold ? "bold" : STR_EMPTY} ${italic ? "italic" : STR_EMPTY} ${size}px ${font}`;
function coalesceExpr(expr, defaultVal) {
  if (isEvaluatable(expr)) {
    return defaultVal;
  }
  return expr != null ? expr : defaultVal;
}
const DEFAULT_FONT_SIZE = 14;
const LabelStyleEditor = (props) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const { Button, Switch, FormGroup } = useElementContext();
  const { style, locale, onChange, isLine } = props;
  const [bold, setBold] = reactExports.useState(false);
  const [italic, setItalic] = reactExports.useState(false);
  const [localBgColor, setLocalBgColor] = reactExports.useState((_c = (_b = (_a = style.label) == null ? void 0 : _a.fill) == null ? void 0 : _b.color) != null ? _c : "#000000");
  const [localBgColorAlpha, setLocalColorAlpha] = reactExports.useState((_f = (_e = (_d = style.label) == null ? void 0 : _d.fill) == null ? void 0 : _e.alpha) != null ? _f : 255);
  const [localStrokeColor, setLocalStrokeColor] = reactExports.useState((_i = (_h = (_g = style.label) == null ? void 0 : _g.stroke) == null ? void 0 : _h.color) != null ? _i : "#ffffff");
  const [localStrokeWidth, setLocalStrokeWidth] = reactExports.useState((_l = (_k = (_j = style.label) == null ? void 0 : _j.stroke) == null ? void 0 : _k.width) != null ? _l : 1);
  const [localFontSize, setLocalFontSize] = reactExports.useState(DEFAULT_FONT_SIZE);
  const [localLabel, setLocalLabel] = reactExports.useState(__spreadValues({ font: buildFont(localFontSize, bold, italic) }, style.label));
  const [hasLabel, setHasLabel] = reactExports.useState(style.label != null);
  const onToggleLinePlacement = reactExports.useCallback(() => {
    if (localLabel.placement == "line") {
      const _a2 = localLabel, { placement } = _a2, rest = __objRest(_a2, ["placement"]);
      setLocalLabel(rest);
    } else {
      setLocalLabel(__spreadProps(__spreadValues({}, localLabel), { placement: "line" }));
    }
  }, [localLabel]);
  reactExports.useEffect(() => {
    if (hasLabel) {
      onChange(__spreadProps(__spreadValues({}, style), { label: localLabel }));
    } else {
      const _a2 = style, { label } = _a2, rest = __objRest(_a2, ["label"]);
      onChange(rest);
    }
  }, [localLabel, hasLabel]);
  reactExports.useEffect(() => {
    setLocalLabel(__spreadProps(__spreadValues({}, localLabel), { font: buildFont(localFontSize, bold, italic) }));
  }, [localFontSize, bold, italic]);
  reactExports.useEffect(() => {
    setLocalLabel(__spreadProps(__spreadValues({}, localLabel), {
      fill: __spreadProps(__spreadValues({}, localLabel.fill), {
        color: localBgColor,
        alpha: localBgColorAlpha
      }),
      stroke: __spreadProps(__spreadValues({}, localLabel.stroke), {
        color: localStrokeColor,
        width: localStrokeWidth
      })
    }));
  }, [localStrokeColor, localStrokeWidth, localBgColorAlpha, localBgColor]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: hasLabel, onChange: (e) => setHasLabel(e.target.checked), label: tr("ENABLE_LABELS", locale) }),
    hasLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("LABEL_TEXT", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(StringExprEditor, { locale, value: localLabel.text, onChange: (t) => setLocalLabel(__spreadProps(__spreadValues({}, localLabel), { text: t })) }) }),
    hasLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("LABEL_SIZE", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(NumberExprEditor, { locale, value: localFontSize, onChange: (t) => setLocalFontSize(coalesceExpr(t, DEFAULT_FONT_SIZE)) }) }),
    hasLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs(ElementGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", active: bold, onClick: (e) => setBold(!bold), children: tr("LABEL_BOLD", locale) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", active: italic, onClick: (e) => setItalic(!italic), children: tr("LABEL_ITALIC", locale) }),
      isLine && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", active: localLabel.placement == "line", onClick: (e) => onToggleLinePlacement(), children: tr("LABEL_LINE_PLACEMENT", locale) })
    ] }),
    hasLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("LABEL_COLOR", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ColorExprEditor, { locale, value: localBgColor, onChange: (c) => setLocalBgColor(c) }) }),
    hasLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("LABEL_OUTLINE_COLOR", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ColorExprEditor, { locale, value: localStrokeColor, onChange: (c) => setLocalStrokeColor(c) }) }),
    hasLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("LABEL_OUTLINE_THICKNESS", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(NumberExprEditor, { locale, value: localStrokeWidth, onChange: (t) => setLocalStrokeWidth(t) }) })
  ] });
};
const PointIconStyleEditor = ({ style, onChange, locale }) => {
  const { NumericInput, FormGroup } = useElementContext();
  const [localSrc, setLocalSrc] = reactExports.useState(style.src);
  reactExports.useEffect(() => {
    setLocalSrc(style.src);
  }, [style.src]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FormGroup, { label: tr("VSED_PT_ICON_SRC", locale), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StringExprEditor, { value: localSrc, onChange: (e) => setLocalSrc(e), locale }),
      !isEvaluatable(style.src) && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: style.src })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FormGroup, { label: tr("VSED_PT_ICON_ANCHOR", locale), children: [
      tr("VSED_PT_ICON_ANCHOR_H", locale),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(NumericInput, { value: style.anchor[0], min: 0, onChange: (e) => onChange(__spreadProps(__spreadValues({}, style), { anchor: [e, style.anchor[1]] })) }),
      tr("VSED_PT_ICON_ANCHOR_V", locale),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(NumericInput, { value: style.anchor[1], min: 0, onChange: (e) => onChange(__spreadProps(__spreadValues({}, style), { anchor: [style.anchor[0], e] })) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicSwitch, { label: tr("VSED_PT_ICON_ROTATE_WITH_VIEW", locale), expr: style.rotateWithView, onExprChanged: (e) => onChange(__spreadProps(__spreadValues({}, style), { rotateWithView: e })), locale }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("VSED_PT_ICON_ROTATION", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SliderExprEditor, { locale, min: 0, max: 360, labelStepSize: 360, value: style.rotation, onChange: (n) => onChange(__spreadProps(__spreadValues({}, style), { rotation: n })) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("VSED_PT_ICON_SCALE", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(NumberExprEditor, { value: style.scale, onChange: (n) => onChange(__spreadProps(__spreadValues({}, style), { scale: n })), locale }) })
  ] });
};
const PointCircleStyleEditor = ({ style, onChange, locale }) => {
  const { FormGroup } = useElementContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("VSED_PT_FILL_COLOR", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ColorExprEditor, { locale, value: style.fill.color, onChange: (c) => onChange(__spreadProps(__spreadValues({}, style), { fill: { color: c, alpha: style.fill.alpha } })) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("VSED_PT_FILL_COLOR_ALPHA", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SliderExprEditor, { locale, min: 0, max: 255, labelStepSize: 255, value: style.fill.alpha, onChange: (n) => onChange(__spreadProps(__spreadValues({}, style), { fill: { color: style.fill.color, alpha: n } })) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("VSED_PT_RADIUS", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(NumberExprEditor, { locale, value: style.radius, min: 1, onChange: (n) => onChange(__spreadProps(__spreadValues({}, style), { radius: n })) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("VSED_PT_OUTLINE_COLOR", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ColorExprEditor, { locale, value: style.stroke.color, onChange: (c) => onChange(__spreadProps(__spreadValues({}, style), { stroke: { color: c, width: style.stroke.width, alpha: style.stroke.alpha } })) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("VSED_PT_OUTLINE_COLOR_ALPHA", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SliderExprEditor, { locale, min: 0, max: 255, labelStepSize: 255, value: style.stroke.alpha, onChange: (n) => onChange(__spreadProps(__spreadValues({}, style), { stroke: { color: style.stroke.color, width: style.stroke.width, alpha: n } })) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("VSED_PT_OUTLINE_WIDTH", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(NumberExprEditor, { locale, value: style.stroke.width, min: 1, onChange: (n) => onChange(__spreadProps(__spreadValues({}, style), { stroke: { color: style.stroke.color, width: n, alpha: style.stroke.alpha } })) }) })
  ] });
};
const PointStyleEditor = ({ style, onChange, locale }) => {
  const { Radio } = useElementContext();
  const [iconStyle, setIconStyle] = reactExports.useState(void 0);
  const [circleStyle, setCircleStyle] = reactExports.useState(void 0);
  const [currentStyle, setCurrentStyle] = reactExports.useState(style);
  const applyCurrentStyle = (s) => {
    setCurrentStyle(s);
    switch (s.type) {
      case "Circle":
        setCircleStyle(s);
        break;
      case "Icon":
        setIconStyle(s);
        break;
    }
  };
  const onStyleTypeChange = (type) => {
    switch (type) {
      case "Circle":
        if (circleStyle) {
          setCurrentStyle(circleStyle);
          onChange(circleStyle);
        } else {
          const s = __spreadValues({}, DEFAULT_POINT_CIRCLE_STYLE);
          setCircleStyle(s);
          setCurrentStyle(s);
          onChange(s);
        }
        break;
      case "Icon":
        if (iconStyle) {
          setCurrentStyle(iconStyle);
          onChange(iconStyle);
        } else {
          const s = __spreadValues({}, DEFAULT_POINT_ICON_STYLE);
          setIconStyle(s);
          setCurrentStyle(s);
          onChange(s);
        }
        break;
    }
  };
  reactExports.useEffect(() => {
    applyCurrentStyle(style);
  }, [style]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tr("VSED_PT_TYPE", locale) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { label: tr("VSED_PT_TYPE_CIRCLE", locale), value: "Circle", checked: currentStyle.type === "Circle", onChange: (e) => onStyleTypeChange(e.target.value) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { label: tr("VSED_PT_TYPE_ICON", locale), value: "Icon", checked: currentStyle.type === "Icon", onChange: (e) => onStyleTypeChange(e.target.value) }),
    currentStyle.type == "Icon" && /* @__PURE__ */ jsxRuntimeExports.jsx(PointIconStyleEditor, { style: currentStyle, onChange, locale }),
    currentStyle.type == "Circle" && /* @__PURE__ */ jsxRuntimeExports.jsx(PointCircleStyleEditor, { style: currentStyle, onChange, locale }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LabelStyleEditor, { style: currentStyle, locale, onChange })
  ] });
};
const LineStyleEditor = ({ style, onChange, locale }) => {
  const { FormGroup } = useElementContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("VSED_LN_OUTLINE_COLOR", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ColorExprEditor, { locale, value: style.color, onChange: (c) => onChange(__spreadProps(__spreadValues({}, style), { color: c, width: style.width, alpha: style.alpha })) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("VSED_LN_OUTLINE_COLOR_ALPHA", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SliderExprEditor, { locale, min: 0, max: 255, labelStepSize: 255, value: style.alpha, onChange: (n) => onChange(__spreadProps(__spreadValues({}, style), { color: style.color, width: style.width, alpha: n })) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("VSED_LN_OUTLINE_THICKNESS", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(NumberExprEditor, { locale, min: 1, value: style.width, onChange: (n) => onChange(__spreadProps(__spreadValues({}, style), { color: style.color, width: n, alpha: style.alpha })) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LabelStyleEditor, { style, locale, onChange, isLine: true })
  ] });
};
const PolygonStyleEditor = ({ style, onChange, locale }) => {
  const { FormGroup } = useElementContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("VSED_PL_FILL_COLOR", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ColorExprEditor, { locale, value: style.fill.color, onChange: (c) => onChange(__spreadProps(__spreadValues({}, style), { fill: { color: c, alpha: style.fill.alpha } })) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("VSED_PL_FILL_COLOR_ALPHA", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SliderExprEditor, { locale, min: 0, max: 255, labelStepSize: 255, value: style.fill.alpha, onChange: (n) => onChange(__spreadProps(__spreadValues({}, style), { fill: { color: style.fill.color, alpha: n } })) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("VSED_PL_OUTLINE_COLOR", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ColorExprEditor, { locale, value: style.stroke.color, onChange: (c) => onChange(__spreadProps(__spreadValues({}, style), { stroke: { color: c, width: style.stroke.width, alpha: style.stroke.alpha } })) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("VSED_PL_OUTLINE_COLOR_ALPHA", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SliderExprEditor, { locale, min: 0, max: 255, labelStepSize: 255, value: style.stroke.alpha, onChange: (n) => onChange(__spreadProps(__spreadValues({}, style), { stroke: { color: style.stroke.color, width: style.stroke.width, alpha: n } })) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("VSED_PL_OUTLINE_THICKNESS", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(NumberExprEditor, { locale, value: style.stroke.width, min: 1, onChange: (n) => onChange(__spreadProps(__spreadValues({}, style), { stroke: { color: style.stroke.color, width: n, alpha: style.stroke.alpha } })) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LabelStyleEditor, { style, locale, onChange })
  ] });
};
const VectorStyleEditor = (props) => {
  var _a, _b, _c;
  const { NonIdealState, TabSet } = useElementContext();
  const { locale, style, onChange, enableLine, enablePoint, enablePolygon } = props;
  const [selectedTab, setSelectedTab] = reactExports.useState(void 0);
  const [pointStyle, setPointStyle] = reactExports.useState((_a = style == null ? void 0 : style.point) != null ? _a : DEFAULT_POINT_CIRCLE_STYLE);
  const [lineStyle, setLineStyle] = reactExports.useState((_b = style == null ? void 0 : style.line) != null ? _b : DEFAULT_LINE_STYLE);
  const [polyStyle, setPolyStyle] = reactExports.useState((_c = style == null ? void 0 : style.polygon) != null ? _c : DEFAULT_POLY_STYLE);
  reactExports.useEffect(() => {
    var _a2, _b2, _c2;
    setPointStyle((_a2 = style == null ? void 0 : style.point) != null ? _a2 : DEFAULT_POINT_CIRCLE_STYLE);
    setLineStyle((_b2 = style == null ? void 0 : style.line) != null ? _b2 : DEFAULT_LINE_STYLE);
    setPolyStyle((_c2 = style == null ? void 0 : style.polygon) != null ? _c2 : DEFAULT_POLY_STYLE);
  }, [style]);
  const onStyleChanged = (point, line, poly) => {
    const newStyle = {
      label: style == null ? void 0 : style.label
    };
    if (enablePoint) {
      newStyle.point = point;
    }
    if (enableLine) {
      newStyle.line = line;
    }
    if (enablePolygon) {
      newStyle.polygon = poly;
    }
    onChange == null ? void 0 : onChange(newStyle);
    if (newStyle.point) {
      setPointStyle(newStyle.point);
    }
    if (newStyle.line) {
      setLineStyle(newStyle.line);
    }
    if (newStyle.polygon) {
      setPolyStyle(newStyle.polygon);
    }
  };
  if (!enableLine && !enablePoint && !enablePolygon) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(NonIdealState, { icon: "warning-sign", title: tr("VSED_NO_STYLES_TITLE", locale), description: tr("VSED_NO_STYLES_DESC", locale) });
  } else {
    const onPointStyleChanged = (st) => {
      onStyleChanged(st, lineStyle, polyStyle);
    };
    const onLineStyleChanged = (st) => {
      onStyleChanged(pointStyle, st, polyStyle);
    };
    const onPolygonStyleChanged = (st) => {
      onStyleChanged(pointStyle, lineStyle, st);
    };
    const tabProps = {
      onTabChanged: (t) => setSelectedTab(t),
      activeTabId: selectedTab,
      tabs: []
    };
    if (enablePoint) {
      tabProps.tabs.push({
        id: "pointStyle",
        title: tr("VSED_TAB_POINT", locale),
        content: /* @__PURE__ */ jsxRuntimeExports.jsx(PointStyleEditor, { style: pointStyle, locale, onChange: onPointStyleChanged })
      });
    }
    if (enableLine) {
      tabProps.tabs.push({
        id: "lineStyle",
        title: tr("VSED_TAB_LINE", locale),
        content: /* @__PURE__ */ jsxRuntimeExports.jsx(LineStyleEditor, { style: lineStyle, locale, onChange: onLineStyleChanged })
      });
    }
    if (enablePolygon) {
      tabProps.tabs.push({
        id: "polyStyle",
        title: tr("VSED_TAB_POLY", locale),
        content: /* @__PURE__ */ jsxRuntimeExports.jsx(PolygonStyleEditor, { style: polyStyle, locale, onChange: onPolygonStyleChanged })
      });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TabSet, __spreadValues({}, tabProps));
  }
};
function parseOLFilterExpr(json) {
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed) && parsed.length >= 1 && typeof parsed[0] === "string") {
      return { valid: true, expr: parsed };
    }
    return { valid: false };
  } catch (e) {
    return { valid: false };
  }
}
const FilterItem = (props) => {
  const { Button } = useElementContext();
  const { filter, isDefault, isStyleEditorOpen, featureStyle, onChange } = props;
  const [localFilterJson, setLocalFilterJson] = reactExports.useState(() => filter ? JSON.stringify(filter) : "");
  const [isLocalFilterValid, setIsLocalFilterValid] = reactExports.useState(true);
  const [pointStyleUrl, setPointStyleUrl] = reactExports.useState(void 0);
  const [lineStyleUrl, setLineStyleUrl] = reactExports.useState(void 0);
  const [polyStyleUrl, setPolyStyleUrl] = reactExports.useState(void 0);
  const filterKey = filter ? JSON.stringify(filter) : "";
  reactExports.useEffect(() => {
    setLocalFilterJson(filterKey);
  }, [filterKey]);
  reactExports.useEffect(() => {
    if (isDefault) {
      setIsLocalFilterValid(true);
      return;
    }
    const { valid } = parseOLFilterExpr(localFilterJson);
    setIsLocalFilterValid(valid);
  }, [localFilterJson, isDefault]);
  reactExports.useEffect(() => {
    var _a, _b;
    let fs = featureStyle;
    if (((_a = featureStyle == null ? void 0 : featureStyle.point) == null ? void 0 : _a.type) == "Circle" && isEvaluatable(featureStyle.point.radius)) {
      fs = JSON.parse(JSON.stringify(featureStyle));
      if (((_b = fs.point) == null ? void 0 : _b.type) == "Circle") {
        fs.point.radius = 5;
      }
    }
    const olstyle = vectorStyleToStyleMap(fs);
    let pos;
    let ls;
    let pls;
    if (typeof olstyle == "function") {
      pos = (feat) => olstyle(feat)["Point"];
      ls = (feat) => olstyle(feat)["LineString"];
      pls = (feat) => olstyle(feat)["Polygon"];
    } else {
      pos = olstyle.Point;
      ls = olstyle.LineString;
      pls = olstyle.Polygon;
    }
    const cPoint = getLegendImage({
      typeGeom: "Point",
      style: pos
    });
    const cLineString = getLegendImage({
      typeGeom: "LineString",
      style: ls
    });
    const cPolygon = getLegendImage({
      typeGeom: "Polygon",
      style: pls
    });
    setPointStyleUrl(cPoint.toDataURL());
    setLineStyleUrl(cLineString.toDataURL());
    setPolyStyleUrl(cPolygon.toDataURL());
  }, [featureStyle]);
  const onToggle = () => {
    props.onToggleStyleEditor(!isStyleEditorOpen);
  };
  const onInnerStyleChanged = (style) => {
    onChange(style);
  };
  let colSpan = 5;
  if (!props.enableLine)
    colSpan--;
  if (!props.enablePoint)
    colSpan--;
  if (!props.enablePolygon)
    colSpan--;
  const filterExprEd = /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: featureStyle.label });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      props.enablePoint && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: pointStyleUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: pointStyleUrl }) }),
      props.enableLine && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: lineStyleUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: lineStyleUrl }) }),
      props.enablePolygon && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: polyStyleUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: polyStyleUrl }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: isDefault ? /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: tr("VSED_DEFAULT_STYLE", props.locale) }) : filterExprEd }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: isStyleEditorOpen ? "danger" : "primary", onClick: onToggle, icon: isStyleEditorOpen ? "cross" : "edit" }) })
    ] }),
    isStyleEditorOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      VectorStyleEditor,
      {
        style: featureStyle,
        onChange: onInnerStyleChanged,
        enableLine: props.enableLine,
        enablePoint: props.enablePoint,
        enablePolygon: props.enablePolygon,
        locale: props.locale
      }
    ) }) })
  ] });
};
const VectorLayerStyleEditor = (props) => {
  var _a;
  const rules = (_a = props.style.rules) != null ? _a : [];
  const [openStyleEditors, setOpenStyleEditors] = reactExports.useState({});
  const onRuleStyleChanged = (index2, style) => {
    var _a2, _b;
    const updatedRules = [...(_a2 = props.style.rules) != null ? _a2 : []];
    updatedRules[index2] = __spreadProps(__spreadValues({}, updatedRules[index2]), { style });
    (_b = props.onChange) == null ? void 0 : _b.call(props, __spreadProps(__spreadValues({}, props.style), { rules: updatedRules }));
  };
  const onDefaultStyleChanged = (style) => {
    var _a2;
    (_a2 = props.onChange) == null ? void 0 : _a2.call(props, __spreadProps(__spreadValues({}, props.style), { default: style }));
  };
  const onToggleStyleEditor = (key, visible) => {
    const opEds = __spreadValues({}, openStyleEditors);
    if (!visible) {
      delete opEds[key];
    } else {
      opEds[key] = true;
    }
    setOpenStyleEditors(opEds);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { width: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("colgroup", { children: [
      props.enablePoint && /* @__PURE__ */ jsxRuntimeExports.jsx("col", { span: 1, style: { width: 24 } }),
      props.enableLine && /* @__PURE__ */ jsxRuntimeExports.jsx("col", { span: 1, style: { width: 24 } }),
      props.enablePolygon && /* @__PURE__ */ jsxRuntimeExports.jsx("col", { span: 1, style: { width: 24 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("col", { span: 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("col", { span: 1, style: { width: 32 } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
      rules.map((rule, i) => {
        const key = `rule-${i}`;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterItem,
          {
            filter: rule.filter,
            isDefault: false,
            onChange: (s) => onRuleStyleChanged(i, s),
            featureStyle: rule.style,
            isStyleEditorOpen: openStyleEditors[key] === true,
            onToggleStyleEditor: (isVisible) => onToggleStyleEditor(key, isVisible),
            locale: props.locale,
            enableLine: props.enableLine,
            enablePoint: props.enablePoint,
            enablePolygon: props.enablePolygon
          },
          key
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterItem,
        {
          isDefault: true,
          onChange: (s) => onDefaultStyleChanged(s),
          featureStyle: props.style.default,
          isStyleEditorOpen: openStyleEditors[DEFAULT_STYLE_KEY] === true,
          onToggleStyleEditor: (isVisible) => onToggleStyleEditor(DEFAULT_STYLE_KEY, isVisible),
          locale: props.locale,
          enableLine: props.enableLine,
          enablePoint: props.enablePoint,
          enablePolygon: props.enablePolygon
        }
      )
    ] })
  ] });
};
function isBoundsZoomable(layer) {
  var _a;
  if (((_a = layer.metadata) == null ? void 0 : _a.geojson_as_vt) === true) {
    return false;
  }
  return layer.type != "WMS";
}
const HEATMAP_SLIDER_RAMP = [0, 10, 20, 30, 40, 50];
const LAYER_SWITCH_STYLE = { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
const ManageLayerItem = (props) => {
  var _a, _b, _c, _d, _e, _f;
  const { Card, Button, Collapsible, Slider, Icon: Icon2, Spinner, Switch, FormGroup, Heading } = useElementContext();
  const {
    layer,
    locale,
    canMoveUp,
    canMoveDown,
    currentResolution,
    onSetOpacity,
    onSetHeatmapBlur,
    onSetHeatmapRadius,
    onRemoveLayer,
    onMoveLayerUp,
    onMoveLayerDown,
    onZoomToBounds,
    onSetVisibility,
    onVectorStyleChanged
  } = props;
  const [wmsLegendUrl, setWmsLegendUrl] = reactExports.useState(void 0);
  const [openPanel, setOpenPanel] = reactExports.useState(
    0
    /* None */
  );
  const onToggleWmsLegend = (action) => {
    if (wmsLegendUrl) {
      setWmsLegendUrl(void 0);
      setOpenPanel(
        0
        /* None */
      );
    } else {
      const url = action(currentResolution);
      setWmsLegendUrl(url);
      setOpenPanel(
        3
        /* WmsLegend */
      );
    }
  };
  const toggleOpenPanel = (panel) => {
    let p = 0;
    switch (panel) {
      case 2:
      case 1:
      case 3:
        p = panel == openPanel ? 0 : panel;
        break;
    }
    setOpenPanel(p);
  };
  const isBusy = layer.busyWorkerCount > 0;
  if (isBusy) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { sizePreset: "small" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { textAlign: "center", marginTop: 5 }, children: tr("LOADING_LAYER", locale, { name: layer.name }) })
    ] });
  }
  const canZoom = isBoundsZoomable(layer);
  let iconName = "layer";
  if (layer.type == "WMS") {
    iconName = "media";
  }
  const extraActions = [];
  const { extensions } = layer;
  let isWms = false;
  if (extensions) {
    switch (extensions.type) {
      case "WMS": {
        isWms = true;
        if (extensions.getLegendUrl) {
          extraActions.push(/* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "success", icon: "info-sign", onClick: () => onToggleWmsLegend(extensions.getLegendUrl) }, "toggle-wms-legend"));
        }
      }
    }
  }
  if (layer.vectorStyle) {
    if (layer.type != "KML" && layer.heatmap == null) {
      extraActions.push(/* @__PURE__ */ jsxRuntimeExports.jsx(Button, { title: tr("LAYER_MANAGER_TT_EDIT_STYLE", locale), variant: "primary", icon: "edit", onClick: () => toggleOpenPanel(
        2
        /* EditVectorStyle */
      ) }, "edit-vector-style"));
    }
  }
  extraActions.push(/* @__PURE__ */ jsxRuntimeExports.jsx(Button, { title: tr("LAYER_MANAGER_TT_MORE_OPTIONS", locale), variant: "primary", icon: "cog", onClick: () => toggleOpenPanel(
    1
    /* MoreLayerOptions */
  ) }, "more-layer-options"));
  const isWmsLegendOpen = !strIsNullOrEmpty(wmsLegendUrl);
  const layerLabel = (_a = layer.displayName) != null ? _a : layer.name;
  const theVectorStyle = (_c = (_b = layer.cluster) == null ? void 0 : _b.style) != null ? _c : layer.vectorStyle;
  let which;
  if (theVectorStyle == layer.vectorStyle) {
    which = VectorStyleSource.Base;
  } else if (theVectorStyle == ((_d = layer.cluster) == null ? void 0 : _d.style)) {
    which = VectorStyleSource.Cluster;
  }
  let enableLine = false;
  let enablePoint = false;
  let enablePolygon = false;
  const allStyles = theVectorStyle ? [theVectorStyle.default, ...(_f = (_e = theVectorStyle.rules) == null ? void 0 : _e.map((r) => r.style)) != null ? _f : []] : [];
  for (const s of allStyles) {
    if (s.point) {
      enablePoint = true;
    }
    if (s.line) {
      enableLine = true;
    }
    if (s.polygon) {
      enablePolygon = true;
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { style: LAYER_SWITCH_STYLE, checked: layer.visible, onChange: () => onSetVisibility(layer.name, !layer.visible), labelElement: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { title: layerLabel, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { icon: iconName }),
      " ",
      layerLabel
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ElementGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: !canMoveUp, title: tr("LAYER_MANAGER_TT_MOVE_UP", locale), variant: "primary", icon: "caret-up", onClick: () => onMoveLayerUp(layer.name) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: !canMoveDown, title: tr("LAYER_MANAGER_TT_MOVE_DOWN", locale), variant: "primary", icon: "caret-down", onClick: () => onMoveLayerDown(layer.name) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: !canZoom, title: tr("LAYER_MANAGER_TT_ZOOM_EXTENTS", locale), variant: "success", icon: "zoom-to-fit", onClick: () => onZoomToBounds(layer.name) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { title: tr("LAYER_MANAGER_TT_REMOVE", locale), variant: "danger", icon: "trash", onClick: () => onRemoveLayer(layer.name) }),
      extraActions
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Collapsible, { isOpen: openPanel == 1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: tr("MORE_LAYER_OPTIONS", locale) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("LAYER_OPACITY", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { min: 0, max: 1, stepSize: 0.01, value: layer.opacity, onChange: (e) => onSetOpacity(layer.name, e) }) }),
      layer.heatmap && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("LAYER_HEATMAP_BLUR", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { min: 1, max: 50, stepSize: 1, labelValues: HEATMAP_SLIDER_RAMP, value: layer.heatmap.blur, onChange: (e) => onSetHeatmapBlur(layer.name, e) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("LAYER_HEATMAP_RADIUS", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { min: 1, max: 50, stepSize: 1, labelValues: HEATMAP_SLIDER_RAMP, value: layer.heatmap.radius, onChange: (e) => onSetHeatmapRadius(layer.name, e) }) })
      ] })
    ] }) }),
    isWms && /* @__PURE__ */ jsxRuntimeExports.jsx(Collapsible, { isOpen: isWmsLegendOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: tr("WMS_LEGEND", locale) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: wmsLegendUrl })
    ] }) }),
    theVectorStyle && /* @__PURE__ */ jsxRuntimeExports.jsx(Collapsible, { isOpen: openPanel == 2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: 5 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: tr("VECTOR_LAYER_STYLE", locale) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        VectorLayerStyleEditor,
        {
          onChange: (st) => onVectorStyleChanged(layer.name, st, which),
          locale,
          style: theVectorStyle,
          enablePoint,
          enableLine,
          enablePolygon
        }
      )
    ] }) })
  ] }, layer.name);
};
const ManageLayers = (props) => {
  const { NonIdealState } = useElementContext();
  const {
    locale,
    currentResolution,
    onSetOpacity,
    onSetHeatmapBlur,
    onSetHeatmapRadius,
    onRemoveLayer,
    onMoveLayerUp,
    onMoveLayerDown,
    onZoomToBounds,
    onSetVisibility,
    onVectorStyleChanged
  } = props;
  const [layers, setLayers] = reactExports.useState(props.layers);
  reactExports.useEffect(() => {
    setLayers(props.layers);
  }, [props.layers]);
  if (layers.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: layers.map((lyr, i) => {
      const cannotMoveUp = i == 0 || layers.length <= 1;
      const cannotMoveDown = i >= layers.length - 1 || layers.length <= 1;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ManageLayerItem,
        {
          layer: lyr,
          locale,
          canMoveUp: !cannotMoveUp,
          canMoveDown: !cannotMoveDown,
          currentResolution,
          onSetOpacity,
          onSetHeatmapBlur,
          onSetHeatmapRadius,
          onRemoveLayer,
          onMoveLayerUp,
          onMoveLayerDown,
          onZoomToBounds,
          onSetVisibility,
          onVectorStyleChanged
        },
        `manage-layer-${i}`
      );
    }) });
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      NonIdealState,
      {
        icon: "layers",
        title: tr("NO_EXTERNAL_LAYERS", locale),
        description: tr("NO_EXTERNAL_LAYERS_DESC", locale, { tabName: tr("ADD_LAYER", locale) })
      }
    );
  }
};
function extractWmsLayers(caps) {
  var _b, _c;
  const layers = [];
  const _a = caps.Capability.Layer, { Layer } = _a, rootLayer = __objRest(_a, ["Layer"]);
  if (rootLayer.Name) {
    layers.push([rootLayer, (_b = rootLayer.Style) != null ? _b : []]);
  }
  if (caps.Capability.Layer.Layer) {
    for (const layer of caps.Capability.Layer.Layer) {
      layers.push([layer, (_c = layer.Style) != null ? _c : []]);
    }
  }
  return layers;
}
const WmsCapabilitiesPanel = (props) => {
  const { Card, Button, Icon: Icon2, Heading } = useElementContext();
  const { locale, onAddLayer } = props;
  const { capabilities: caps } = props;
  const layers = extractWmsLayers(caps);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: tr("WMS_SERVICE_INFO", locale) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tr("WMS_VERSION", locale, { version: caps.version }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tr("OWS_SERVICE_NAME", locale, { name: caps.Service.Name }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tr("OWS_SERVICE_TITLE", locale, { title: caps.Service.Title }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tr("OWS_SERVICE_ABSTRACT", locale, { abstract: caps.Service.Abstract }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { style: { marginBottom: 10 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: tr("WMS_AVAILABLE_LAYERS", locale) }) }),
      layers.map(([layer, styles]) => {
        const otherActions = /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { style: { padding: 15, paddingTop: 5 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Heading, { level: 4, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { icon: "layer" }),
            " ",
            layer.Name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tr("OWS_LAYER_TITLE", locale, { title: layer.Title }) }),
          (() => {
            if (styles.length) {
              return styles.map((st) => /* @__PURE__ */ jsxRuntimeExports.jsxs(ElementGroup, { vertical: true, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
                  var _a, _b;
                  return onAddLayer(layer.Name, layer.queryable, false, st, (_b = (_a = st.LegendURL) == null ? void 0 : _a[0]) == null ? void 0 : _b.OnlineResource);
                }, variant: "primary", icon: "new-layer", children: tr("ADD_LAYER_WITH_WMS_STYLE", locale, { style: st.Name }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
                  var _a, _b;
                  return onAddLayer(layer.Name, layer.queryable, true, st, (_b = (_a = st.LegendURL) == null ? void 0 : _a[0]) == null ? void 0 : _b.OnlineResource);
                }, variant: "primary", icon: "new-layer", children: tr("ADD_LAYER_WITH_WMS_STYLE_TILED", locale, { style: st.Name }) }),
                otherActions
              ] }, st.Name));
            } else {
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(ElementGroup, { vertical: true, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => onAddLayer(layer.Name, layer.queryable, false, void 0), variant: "primary", icon: "new-layer", children: tr("ADD_LAYER", locale) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => onAddLayer(layer.Name, layer.queryable, true, void 0), variant: "primary", icon: "new-layer", children: tr("ADD_LAYER_TILED", locale) }),
                otherActions
              ] });
            }
          })()
        ] }, layer.Name);
      })
    ] })
  ] });
};
const _drivers = [];
function getFormatDrivers() {
  return _drivers;
}
function addFormatDriver(driver) {
  _drivers.push(driver);
}
function getColorBrewerRamps() {
  const ramps = [];
  for (const cat in index.schemeGroups) {
    for (const scheme of index.schemeGroups[cat]) {
      const ramp = getMaxRamp(scheme);
      ramps.push({ displayName: `${cat} - ${scheme}`, category: cat, scheme, ramp });
    }
  }
  return ramps;
}
function getMaxRamp(scheme) {
  let theScheme;
  let len = 0;
  for (const s in scheme) {
    const arr = scheme[s];
    if (Array.isArray(arr)) {
      if (arr.length > len) {
        theScheme = arr;
        len = arr.length;
      }
    }
  }
  return theScheme;
}
const ColorBrewerSwatch = (props) => {
  const ramp = getMaxRamp(index[props.theme]);
  if (ramp) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("colgroup", { children: ramp.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("col", { span: 1, style: { width: 12 } }, `ramp-col-${i}`)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ramp.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { border: "1px solid black", backgroundColor: r }, children: " " }, `ramp-${i}`)) }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
};
function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function clonePointWithFill(baseTemplate, fillColor) {
  if (!baseTemplate) {
    return void 0;
  }
  const clone = cloneObject(baseTemplate);
  switch (clone.type) {
    case "Circle":
      clone.fill.color = fillColor;
      break;
  }
  return clone;
}
function cloneLineWithFill(baseTemplate, fillColor) {
  if (!baseTemplate) {
    return void 0;
  }
  const clone = cloneObject(baseTemplate);
  clone.color = fillColor;
  return clone;
}
function clonePolyWithFill(baseTemplate, fillColor) {
  if (!baseTemplate) {
    return void 0;
  }
  const clone = cloneObject(baseTemplate);
  clone.fill.color = fillColor;
  return clone;
}
function ensureLabelText(style, expr, isLine = false) {
  if (!style.label) {
    style.label = {
      text: expr,
      textAlign: "left",
      offsetX: 15,
      fill: {
        color: "#000000",
        alpha: 255
      },
      stroke: {
        color: "#ffffff",
        alpha: 255,
        width: 3
      }
    };
    if (isLine) {
      style.label.placement = "line";
    }
  } else {
    style.label.text = expr;
  }
}
function ensureLabelTextForStyle(fstyle, expr) {
  if (fstyle.line) {
    ensureLabelText(fstyle.line, expr, true);
  }
  if (fstyle.point) {
    ensureLabelText(fstyle.point, expr);
  }
  if (fstyle.polygon) {
    ensureLabelText(fstyle.polygon, expr);
  }
}
function getLayerInfo(layer, isExternal) {
  var _a, _b;
  let vectorStyle;
  let cs;
  let ext;
  let hs;
  if (layer instanceof ImageLayer || layer instanceof TileLayer) {
    const source = layer.getSource();
    if (layer.get(LayerProperty.HAS_WMS_LEGEND) == true && (source instanceof ImageWMS || source instanceof TileWMS)) {
      ext = {
        type: "WMS",
        getLegendUrl: (res) => source.getLegendUrl(res)
      };
    }
  }
  if (layer instanceof VectorLayer) {
    const vs = layer.get(LayerProperty.VECTOR_STYLE);
    if (vs) {
      vectorStyle = vs.toVectorLayerStyle();
      cs = vs.toClusterSettings();
    }
  }
  if (layer instanceof Heatmap) {
    const blurExpr = layer.getBlur();
    const radiusExpr = layer.getRadius();
    if (!Array.isArray(blurExpr) && !Array.isArray(radiusExpr)) {
      hs = {
        blur: blurExpr,
        radius: radiusExpr
      };
    } else {
      if (Array.isArray(blurExpr)) {
        console.warn("Don't know how to evaluate blur", blurExpr);
      }
      if (Array.isArray(radiusExpr)) {
        console.warn("Don't know how to evaluate radius", radiusExpr);
      }
    }
  }
  return {
    visible: layer.getVisible(),
    selectable: layer.get(LayerProperty.IS_SELECTABLE) == true,
    name: layer.get(LayerProperty.LAYER_NAME),
    displayName: (_a = layer.get(LayerProperty.LAYER_DISPLAY_NAME)) != null ? _a : layer.get(LayerProperty.LAYER_NAME),
    description: layer.get(LayerProperty.LAYER_DESCRIPTION),
    type: layer.get(LayerProperty.LAYER_TYPE),
    opacity: layer.getOpacity(),
    isExternal,
    extensions: ext,
    vectorStyle,
    cluster: cs,
    heatmap: hs,
    busyWorkerCount: (_b = layer.get(LayerProperty.BUSY_WORKER_COUNT)) != null ? _b : 0,
    metadata: layer.get(LayerProperty.LAYER_METADATA)
  };
}
class LayerManager {
  constructor(map, layerSet) {
    this.map = map;
    this.layerSet = layerSet;
    this._olFormats = getFormatDrivers();
  }
  tryGetSubjectLayer() {
    return this.layerSet.tryGetSubjectLayer();
  }
  /**
   * INTERNAL API
   * @param {IInitialExternalLayer} extLayer
   * @returns
   */
  addExternalLayer(extLayer, onlyAddIfNotExists, appSettings) {
    if (onlyAddIfNotExists && this.hasLayer(extLayer.name)) {
      return void 0;
    }
    return this.layerSet.addExternalLayer(this.map, extLayer, appSettings);
  }
  getLayers() {
    return this.layerSet.getCustomLayers(this.map);
  }
  hasLayer(name) {
    return this.layerSet.hasLayer(name);
  }
  addLayer(name, layer, allowReplace) {
    return this.layerSet.addLayer(this.map, name, layer, allowReplace);
  }
  removeLayer(name) {
    return this.layerSet.removeLayer(this.map, name);
  }
  getLayer(name) {
    return this.layerSet.getLayer(name);
  }
  apply(layers) {
    this.layerSet.apply(this.map, layers);
  }
  parseFeaturesFromFile(options) {
    const { file, name: layerName, locale } = options;
    const that = this;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const handler = function(e) {
        return __async(this, null, function* () {
          var _a;
          const result = (_a = e.target) == null ? void 0 : _a.result;
          if (result && typeof result == "string") {
            const formats = that._olFormats;
            if (formats.length == 0) {
              reject(new Error(tr("ADD_LOCAL_FILE_LAYER_FAILURE_NO_FORMATS", locale)));
            }
            let loadedType;
            let bLoaded = false;
            for (let i = 0, ii = formats.length; i < ii; ++i) {
              const format = formats[i];
              try {
                loadedType = yield format.tryParse(file.size, result);
              } catch (e2) {
              }
              if (loadedType && loadedType.hasFeatures()) {
                loadedType.name = layerName;
                bLoaded = true;
                break;
              }
            }
            if (bLoaded && loadedType) {
              resolve(loadedType);
            } else {
              reject(new Error(tr("ADD_LOCAL_FILE_LAYER_FAILURE", locale)));
            }
          } else {
            reject(new Error(tr("ADD_LOCAL_FILE_LAYER_FAILURE_NOT_TEXT", locale)));
          }
        });
      };
      reader.addEventListener("load", handler);
      reader.readAsText(file);
    });
  }
  addLayerFromParsedFeatures(options) {
    return __async(this, null, function* () {
      var _a, _b, _c, _d;
      const { features, projection, defaultStyle, extraOptions, labelOnProperty, selectedPopupTemplate, metadata, defn } = options;
      let proj = projection;
      if (!proj) {
        const view = this.map.getView();
        proj = view.getProjection();
      }
      const source = new VectorSource();
      source.set(SourceProperty.SUPPRESS_LOAD_EVENTS, true);
      let csArgs;
      if ((extraOptions == null ? void 0 : extraOptions.kind) == "Cluster") {
        csArgs = {
          distance: extraOptions.clusterDistance
        };
      }
      let layer;
      if ((extraOptions == null ? void 0 : extraOptions.kind) == "Heatmap") {
        layer = new Heatmap({
          source,
          weight: extraOptions.weightProperty
        });
      } else {
        layer = new VectorLayer({
          source: clusterSourceIfRequired(source, { cluster: csArgs }),
          className: "external-vector-layer",
          //This is to avoid false positives for map.forEachLayerAtPixel
          declutter: true
        });
      }
      yield features.addTo(source, this.map.getView().getProjection(), proj);
      layer.set(LayerProperty.LAYER_NAME, features.name);
      layer.set(LayerProperty.LAYER_DISPLAY_NAME, features.name);
      layer.set(LayerProperty.LAYER_TYPE, features.type);
      layer.set(LayerProperty.LAYER_DEFN, defn);
      if ((extraOptions == null ? void 0 : extraOptions.kind) == "Heatmap") {
        layer.set(LayerProperty.IS_HEATMAP, true);
      } else {
        layer.set(LayerProperty.IS_SELECTABLE, true);
      }
      layer.set(LayerProperty.IS_EXTERNAL, true);
      layer.set(LayerProperty.IS_GROUP, false);
      if (metadata) {
        layer.set(LayerProperty.LAYER_METADATA, metadata);
      }
      if (selectedPopupTemplate) {
        layer.set(LayerProperty.SELECTED_POPUP_CONFIGURATION, selectedPopupTemplate);
      }
      let clusterSettings;
      if ((extraOptions == null ? void 0 : extraOptions.kind) == "Cluster") {
        clusterSettings = {
          distance: extraOptions.clusterDistance,
          onClick: (_a = extraOptions.onClusterClickAction) != null ? _a : ClusterClickAction.ShowPopup,
          style: cloneObject((_c = (_b = extraOptions.clusterStyle) != null ? _b : defaultStyle) != null ? _c : DEFAULT_CLUSTERED_LAYER_STYLE)
        };
        if (!strIsNullOrEmpty(labelOnProperty)) {
          ensureLabelTextForStyle(clusterSettings.style.default, { expr: ["get", "features", 0, labelOnProperty] });
        }
      }
      const bStyle = defaultStyle != null ? defaultStyle : cloneObject(DEFAULT_VECTOR_LAYER_STYLE);
      if (!features.geometryTypes.includes("Point")) {
        delete bStyle.default.point;
        clusterSettings == null ? true : delete clusterSettings.style.default.point;
      }
      if (!features.geometryTypes.includes("LineString")) {
        delete bStyle.default.line;
        clusterSettings == null ? true : delete clusterSettings.style.default.line;
      }
      if (!features.geometryTypes.includes("Polygon")) {
        delete bStyle.default.polygon;
        clusterSettings == null ? true : delete clusterSettings.style.default.polygon;
      }
      if (!strIsNullOrEmpty(labelOnProperty)) {
        ensureLabelTextForStyle(bStyle.default, { expr: ["get", labelOnProperty] });
      }
      if ((extraOptions == null ? void 0 : extraOptions.kind) == "Theme") {
        const values = yield features.getDistinctValues(extraOptions.themeOnProperty);
        let baseTemplatePoint = bStyle.default.point;
        let baseTemplateLine = bStyle.default.line;
        let baseTemplatePoly = bStyle.default.polygon;
        const th = extraOptions.colorBrewerTheme;
        let ramp = index[th];
        if (!ramp) {
          ramp = index.Blues;
        }
        const chosenRamp = getMaxRamp(ramp);
        const ruleCount = Math.min(values.length, (_d = chosenRamp == null ? void 0 : chosenRamp.length) != null ? _d : 0);
        const palette = ramp[ruleCount];
        if (!bStyle.rules) {
          bStyle.rules = [];
        }
        for (let i = 0; i < ruleCount; i++) {
          const v = values[i];
          const style = {
            label: v,
            point: clonePointWithFill(baseTemplatePoint, palette[i]),
            line: cloneLineWithFill(baseTemplateLine, palette[i]),
            polygon: clonePolyWithFill(baseTemplatePoly, palette[i])
          };
          if (!strIsNullOrEmpty(labelOnProperty)) {
            ensureLabelTextForStyle(style, { expr: ["get", labelOnProperty] });
          }
          bStyle.rules.push({
            filter: ["==", ["get", extraOptions.themeOnProperty], v],
            style
          });
        }
      }
      if (layer instanceof VectorLayer) {
        setOLVectorLayerStyle(layer, bStyle, clusterSettings);
      }
      const layerInfo = this.addLayer(features.name, layer);
      return layerInfo;
    });
  }
}
function tryUpgradeUrlToHttpsIfNeeded(caps, wasHttps) {
  const url = caps.Capability.Request.GetMap.DCPType[0].HTTP.Get.OnlineResource;
  if (strStartsWith(url, "http://") && wasHttps) {
    return "https://" + url.substring("http://".length);
  }
  return url;
}
const AddWmsLayer = (props) => {
  const { Button, InputGroup, NonIdealState, Spinner } = useElementContext();
  const { locale } = props;
  const [wmsUrl, setWmsUrl] = reactExports.useState("");
  const [loadingCapabilities, setLoadingCapabilities] = reactExports.useState(false);
  const [caps, setCaps] = reactExports.useState(void 0);
  const [error2, setError] = reactExports.useState(void 0);
  const viewer = useMapProviderContext();
  const onAddLayer = (name, selectable, isTiled, style) => {
    var _a, _b, _c;
    if (caps && viewer.isReady()) {
      const params = {
        LAYERS: name
      };
      if (style) {
        params.STYLE = style.Name;
      }
      if (isTiled) {
        params.TILED = true;
      }
      let layer;
      let source;
      if (isTiled) {
        source = new TileWMS({
          url: tryUpgradeUrlToHttpsIfNeeded(caps[0], caps[1]),
          params
        });
        layer = new TileLayer({
          source
        });
      } else {
        source = new ImageWMS({
          url: tryUpgradeUrlToHttpsIfNeeded(caps[0], caps[1]),
          params
        });
        layer = new ImageLayer({
          source
        });
      }
      layer.set(LayerProperty.LAYER_TYPE, "WMS");
      layer.set(LayerProperty.IS_SELECTABLE, selectable);
      layer.set(LayerProperty.IS_EXTERNAL, true);
      layer.set(LayerProperty.IS_GROUP, false);
      if (style) {
        const legendUrl = (_b = (_a = style.LegendURL) == null ? void 0 : _a[0]) == null ? void 0 : _b.OnlineResource;
        if (!strIsNullOrEmpty(legendUrl)) {
          layer.set(LayerProperty.HAS_WMS_LEGEND, true);
        }
      }
      source.set(SourceProperty.SUPPRESS_LOAD_EVENTS, true);
      const started = () => {
        viewer.addImageLoading();
        props.onAddLayerBusyWorker(name);
      };
      const finished = () => {
        viewer.addImageLoaded();
        props.onRemoveLayerBusyWorker(name);
      };
      if (source instanceof TileWMS) {
        source.on("tileloadstart", started);
        source.on("tileloadend", finished);
        source.on("tileloaderror", finished);
      } else if (source instanceof ImageWMS) {
        source.on("imageloadstart", started);
        source.on("imageloadend", finished);
        source.on("imageloaderror", finished);
      }
      ((_c = props.targetLayerManager) != null ? _c : viewer.getLayerManager()).addLayer(name, layer);
      viewer.toastSuccess("success", tr("ADDED_LAYER", locale, { name }));
      props.onLayerAdded(getLayerInfo(layer, true));
    }
  };
  const onLoadCaps = () => {
    setCaps(void 0);
    setLoadingCapabilities(true);
    const client = new Client("", "mapagent");
    client.getText(wmsUrl).then((s) => {
      const parser = new WMSCapabilities();
      const caps2 = parser.read(s);
      if (caps2.version != "1.3.0") {
        setLoadingCapabilities(false);
        setCaps(void 0);
        setError(tr("WMS_UNSUPPORTED_VERSION", locale, { version: caps2.version }));
      } else {
        setLoadingCapabilities(false);
        setCaps([caps2, strStartsWith(wmsUrl, "https://")]);
        setError(void 0);
      }
    }).catch((err) => {
      setLoadingCapabilities(false);
      setCaps(void 0);
      setError(err);
    });
  };
  const onWmsUrlChange = (e) => {
    setWmsUrl(e.target.value);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      InputGroup,
      {
        leftIcon: "geosearch",
        placeholder: tr("ADD_WMS_LAYER_URL", locale),
        value: wmsUrl,
        onChange: onWmsUrlChange,
        readOnly: loadingCapabilities,
        rightElement: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", icon: "arrow-right", onClick: onLoadCaps, disabled: loadingCapabilities })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: (() => {
      if (loadingCapabilities) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          NonIdealState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { sizePreset: "large" }),
            title: tr("ADD_WMS_LAYER_LOADING", locale),
            description: tr("ADD_WMS_LAYER_LOADING_DESC", locale)
          }
        );
      } else {
        if (caps) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(WmsCapabilitiesPanel, { onAddLayer, capabilities: caps[0], locale });
        } else if (error2) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Error$1, { error: error2 });
        } else {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            NonIdealState,
            {
              icon: "issue",
              title: tr("ADD_WMS_LAYER_NO_LAYERS", locale),
              description: tr("WMS_NO_LAYER_DESCRIPTION", locale)
            }
          );
        }
      }
    })() })
  ] });
};
function tryGetElementContent(el) {
  var _a;
  if (el) {
    return (_a = el.textContent) != null ? _a : el.text;
  }
}
function getElements(root, tagName, ns) {
  let els;
  if (ns) {
    els = root.getElementsByTagName(`${ns}:${tagName}`);
    if (els.length == 0) {
      els = root.getElementsByTagName(tagName);
    }
  } else {
    els = root.getElementsByTagName(tagName);
  }
  const elements = [];
  if (els) {
    for (let i = 0; i < els.length; i++) {
      const el = els.item(i);
      if (el) {
        elements.push(el);
      }
    }
  }
  return elements;
}
function trySetProperty(obj, setter, value) {
  if (value) {
    setter(obj, value);
  }
}
class WfsCapabilitiesParser {
  constructor() {
  }
  parse(xml) {
    const parser = new DOMParser();
    this.xmlDoc = parser.parseFromString(xml, "text/xml");
    const info2 = this.getServiceInfo();
    const layers = this.getLayers();
    return {
      info: info2,
      layers
    };
  }
  getServiceInfo() {
    var _a, _b;
    const els = getElements(this.xmlDoc, "ServiceIdentification", "ows");
    const info2 = {
      title: "",
      abstract: "",
      version: ""
    };
    if (els.length == 1) {
      const t = tryGetElementContent((_a = getElements(els[0], "Title", "ows")) == null ? void 0 : _a[0]);
      const a = tryGetElementContent((_b = getElements(els[0], "Abstract", "ows")) == null ? void 0 : _b[0]);
      const ops = getElements(this.xmlDoc, "Operation", "ows");
      for (const op of ops) {
        if (op.getAttribute("name") == "GetFeature") {
          const parms = getElements(op, "Parameter", "ows");
          for (const parm of parms) {
            if (parm.getAttribute("name") == "outputFormat") {
              const allowedValues = getElements(parm, "Value", "ows").map((av) => tryGetElementContent(av)).filter((s) => !strIsNullOrEmpty(s));
              if (allowedValues.length > 0) {
                info2.allowedOutputFormats = allowedValues;
              }
            }
          }
        }
      }
      const v = getElements(els[0], "ServiceTypeVersion", "ows").map((el) => tryGetElementContent(el)).filter((s) => !strIsNullOrEmpty(s));
      v.sort();
      trySetProperty(info2, (i, v2) => i.title = v2, t);
      trySetProperty(info2, (i, v2) => i.abstract = v2, a);
      if (v.length > 0) {
        info2.version = v[v.length - 1];
      }
    }
    return info2;
  }
  getLayers() {
    const els = getElements(this.xmlDoc, "FeatureType", "wfs");
    const layers = els.map((el) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const info2 = {
        name: "",
        title: "",
        abstract: "",
        defaultCrs: ""
      };
      const n = tryGetElementContent((_a = getElements(el, "Name", "wfs")) == null ? void 0 : _a[0]);
      const t = tryGetElementContent((_b = getElements(el, "Title", "wfs")) == null ? void 0 : _b[0]);
      const a = tryGetElementContent((_c = getElements(el, "Abstract", "wfs")) == null ? void 0 : _c[0]);
      const c = tryGetElementContent(
        (_f = (_d = getElements(el, "DefaultCRS", "wfs")) == null ? void 0 : _d[0]) != null ? _f : (
          // WFS 2.0.0
          (_e = getElements(el, "DefaultSRS", "wfs")) == null ? void 0 : _e[0]
        )
        // WFS older versions
      );
      const oc = getElements(el, "OtherCRS", "wfs").map((fel) => tryGetElementContent(fel)).filter((s) => !strIsNullOrEmpty(s));
      const os = getElements(el, "OtherSRS", "wfs").map((fel) => tryGetElementContent(fel)).filter((s) => !strIsNullOrEmpty(s));
      info2.otherCrs = [...oc, ...os];
      const fmts = getElements(el, "Format", "wfs").map((fel) => tryGetElementContent(fel)).filter((s) => !strIsNullOrEmpty(s));
      const ll = tryGetElementContent((_g = getElements(el, "LowerCorner", "ows")) == null ? void 0 : _g[0]);
      const ur = tryGetElementContent((_h = getElements(el, "UpperCorner", "ows")) == null ? void 0 : _h[0]);
      trySetProperty(info2, (i, v) => i.name = v, n);
      trySetProperty(info2, (i, v) => i.title = v, t);
      trySetProperty(info2, (i, v) => i.abstract = v, a);
      trySetProperty(info2, (i, v) => i.defaultCrs = v, c);
      if (fmts.length > 0) {
        info2.formats = fmts;
      }
      const llParts = ll == null ? void 0 : ll.split(" ").map((s) => parseFloat(s));
      const urParts = ur == null ? void 0 : ur.split(" ").map((s) => parseFloat(s));
      if ((llParts == null ? void 0 : llParts.length) == 2 && (urParts == null ? void 0 : urParts.length) == 2) {
        info2.wgs84Bounds = [
          llParts[0],
          llParts[1],
          urParts[0],
          urParts[1]
        ];
      }
      return info2;
    });
    return layers;
  }
}
function parseEpsgCodeFromCRS(crs) {
  if (crs == "urn:ogc:def:crs:OGC:1.3:CRS84") {
    return 4326;
  }
  let res = crs == null ? void 0 : crs.match(/urn:ogc:def:crs:EPSG::(\d+)/);
  if ((res == null ? void 0 : res.length) == 2) {
    return parseInt(res[1], 10);
  }
  res = crs == null ? void 0 : crs.match(/EPSG:(\d+)/);
  if ((res == null ? void 0 : res.length) == 2) {
    return parseInt(res[1], 10);
  }
  return void 0;
}
function isGeoJsonMimeType(mimeType) {
  var _a;
  const lmt = (_a = mimeType == null ? void 0 : mimeType.toLowerCase()) != null ? _a : "";
  if (lmt.indexOf("application/vnd.geo+json") >= 0 || lmt.indexOf("application/json") >= 0 || lmt.indexOf("geojson") >= 0) {
    return true;
  }
  return false;
}
function getGeoJsonFormat(serviceInfo, layer) {
  var _a, _b, _c, _d;
  const lformats = (_b = ((_a = layer.formats) != null ? _a : []).filter((f) => isGeoJsonMimeType(f))) == null ? void 0 : _b[0];
  const sformats = (_d = ((_c = serviceInfo.allowedOutputFormats) != null ? _c : []).filter((f) => isGeoJsonMimeType(f))) == null ? void 0 : _d[0];
  return lformats != null ? lformats : sformats;
}
function getLayerCrs(layer) {
  let pdc = [parseEpsgCodeFromCRS(layer.defaultCrs), layer.defaultCrs];
  if (!(pdc[0] == 4326 || pdc[0] == 3857)) {
    if (layer.otherCrs) {
      const matches = layer.otherCrs.filter((c) => {
        const poc = parseEpsgCodeFromCRS(c);
        return poc == 4326 || poc == 3857;
      });
      if (matches.length > 0) {
        pdc = [parseEpsgCodeFromCRS(matches[0]), matches[0]];
      }
    }
  }
  return pdc;
}
const WfsCapabilitiesPanel = (props) => {
  const { Card, Icon: Icon2, Button, Heading } = useElementContext();
  const { locale, capabilities, onAddLayer } = props;
  const { layers, info: info2 } = capabilities;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: tr("WFS_SERVICE_INFO", locale) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tr("WFS_VERSION", locale, { version: info2.version }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tr("OWS_SERVICE_TITLE", locale, { title: info2.title }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tr("OWS_SERVICE_ABSTRACT", locale, { abstract: info2.abstract }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { style: { marginBottom: 10 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: tr("WFS_AVAILABLE_LAYERS", locale) }) }),
      layers.map((layer) => {
        const geoJsonFmt = getGeoJsonFormat(info2, layer);
        const [epsgCode, origCrs] = getLayerCrs(layer);
        if (epsgCode && geoJsonFmt) {
          const otherActions = /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { style: { padding: 15, paddingTop: 5 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Heading, { level: 4, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { icon: "layer" }),
              " ",
              layer.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tr("OWS_LAYER_TITLE", locale, { title: layer.title }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tr("OWS_LAYER_CRS", locale, { crs: `EPSG:${epsgCode}` }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(ElementGroup, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => onAddLayer(layer.name, info2.version, geoJsonFmt, origCrs, epsgCode, layer.wgs84Bounds), variant: "primary", icon: "new-layer", children: tr("ADD_LAYER", locale) }),
              otherActions
            ] })
          ] }, layer.name);
        }
      }).filter((c) => c)
    ] })
  ] });
};
const AddWfsLayer = (props) => {
  const { InputGroup, Button, NonIdealState, Spinner } = useElementContext();
  const { locale } = props;
  const [wfsUrl, setWfsUrl] = reactExports.useState("");
  const [loadingCapabilities, setLoadingCapabilities] = reactExports.useState(false);
  const [caps, setCaps] = reactExports.useState(void 0);
  const [error2, setError] = reactExports.useState(void 0);
  const viewer = useMapProviderContext();
  const onAddLayer = (name, version, format, origCrs, epsgCode, wfsWgs84Bounds) => {
    if (caps && viewer.isReady()) {
      ensureProjection(epsgCode, locale, origCrs).then(([, resolvedProj]) => {
        var _a;
        const sourceProj = viewer.getProjection();
        const parsed = parseUrl(wfsUrl);
        let typeNameKey = "typename";
        if (version == "2.0.0") {
          typeNameKey = "typenames";
        }
        let urlTemplate = `${parsed.url}?service=WFS&version=${version}&request=GetFeature&${typeNameKey}=${encodeURIComponent(name)}&outputFormat=${encodeURIComponent(format)}&srsName=${encodeURIComponent(origCrs)}`;
        let sourceUrl;
        let strategy;
        const vectorFmt = new GeoJSON({
          dataProjection: resolvedProj,
          featureProjection: sourceProj
        });
        {
          sourceUrl = urlTemplate;
        }
        const source = new VectorSource({
          format: vectorFmt,
          url: sourceUrl,
          strategy
          /*,
          loader: innerLoader ? (function() {
              viewer.addImageLoading();
              props.onAddLayerBusyWorker(name);
              innerLoader?.apply(source, arguments);
          }) : undefined*/
        });
        const layer = new VectorLayer({
          source,
          className: "external-vector-layer"
          //This is to avoid false positives for map.forEachLayerAtPixel
        });
        layer.set(LayerProperty.LAYER_TYPE, "WFS");
        layer.set(LayerProperty.IS_EXTERNAL, true);
        layer.set(LayerProperty.IS_SELECTABLE, true);
        layer.set(LayerProperty.IS_GROUP, false);
        if (wfsWgs84Bounds) {
          layer.set(LayerProperty.WGS84_BBOX, wfsWgs84Bounds);
        }
        setOLVectorLayerStyle(layer, DEFAULT_VECTOR_LAYER_STYLE, void 0);
        ((_a = props.targetLayerManager) != null ? _a : viewer.getLayerManager()).addLayer(name, layer);
        viewer.toastSuccess("success", tr("ADDED_LAYER", locale, { name }));
        const li = getLayerInfo(layer, true);
        zoomToLayerExtents(li.name, viewer);
        props.onLayerAdded(li);
      });
    }
  };
  const onLoadCaps = () => {
    setCaps(void 0);
    setLoadingCapabilities(true);
    const client = new Client("", "mapagent");
    client.getText(wfsUrl).then((s) => {
      const parser = new WfsCapabilitiesParser();
      const caps2 = parser.parse(s);
      setLoadingCapabilities(false);
      setCaps(caps2);
      setError(void 0);
    }).catch((err) => {
      setLoadingCapabilities(false);
      setCaps(void 0);
      setError(err);
    });
  };
  const onWmsUrlChange = (e) => {
    setWfsUrl(e.target.value);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      InputGroup,
      {
        leftIcon: "geosearch",
        placeholder: tr("ADD_WFS_LAYER_URL", locale),
        value: wfsUrl,
        onChange: onWmsUrlChange,
        readOnly: loadingCapabilities,
        rightElement: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", icon: "arrow-right", onClick: onLoadCaps, disabled: loadingCapabilities })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: (() => {
      if (loadingCapabilities) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          NonIdealState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { sizePreset: "large" }),
            title: tr("ADD_WFS_LAYER_LOADING", locale),
            description: tr("ADD_WFS_LAYER_LOADING_DESC", locale)
          }
        );
      } else {
        if (caps) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(WfsCapabilitiesPanel, { onAddLayer, capabilities: caps, locale });
        } else if (error2) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Error$1, { error: error2 });
        } else {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            NonIdealState,
            {
              icon: "issue",
              title: tr("ADD_WFS_LAYER_NO_LAYERS", locale),
              description: tr("WFS_NO_LAYER_DESCRIPTION", locale)
            }
          );
        }
      }
    })() })
  ] });
};
const ADD_URL_LAYER_TYPES = {
  "WMS": {
    label: "WMS",
    content: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(AddWmsLayer, __spreadValues({}, props))
  },
  "WFS": {
    label: "WFS",
    content: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(AddWfsLayer, __spreadValues({}, props))
  }
};
function getCreateVectorLayerOptions(geomTypes, locale) {
  const options = [
    { value: "Vector", label: tr("CREATE_VECTOR_LAYER", locale), isValid: (geomTypes2) => true },
    { value: "Themed", label: tr("CREATE_VECTOR_THEMED", locale), isValid: (geomTypes2) => true },
    { value: "Clustered", label: tr("CREATE_VECTOR_CLUSTERED", locale), isValid: (geomTypes2) => geomTypes2.length == 1 && geomTypes2.includes("Point") },
    { value: "Heatmap", label: tr("CREATE_VECTOR_HEATMAP", locale), isValid: (geomTypes2) => geomTypes2.length == 1 && geomTypes2.includes("Point") }
  ];
  return options.filter((o) => o.isValid(geomTypes));
}
const AddFileLayer = (props) => {
  const { Button, Callout, NumericInput, NonIdealState, Spinner, Switch, Select: Select2, FileInput, FormGroup, EditableText } = useElementContext();
  const { locale } = props;
  const [isProcessingFile, setIsProcessingFile] = reactExports.useState(false);
  const [isAddingLayer, setIsAddingLayer] = reactExports.useState(false);
  const [addLayerError, setAddLayerError] = reactExports.useState(void 0);
  const [loadedFile, setLoadedFile] = reactExports.useState(void 0);
  const [addLayerName, setAddLayerName] = reactExports.useState(void 0);
  const [addProjection, setAddProjection] = reactExports.useState(4326);
  const [createOptions, setCreateOptions] = reactExports.useState(getCreateVectorLayerOptions([], locale));
  const [enableLabels, setEnableLabels] = reactExports.useState(false);
  const [labelOnProperty, setLabelOnProperty] = reactExports.useState(void 0);
  const [themeOnProperty, setThemeOnProperty] = reactExports.useState(void 0);
  const [themableProperties, setThemableProperties] = reactExports.useState([]);
  const [themeToUse, setThemeToUse] = reactExports.useState("Blues");
  const [createLayerAs, setCreateLayerAs] = reactExports.useState(
    "Vector"
    /* Vector */
  );
  const [clusterDistance, setClusterDistance] = reactExports.useState(10);
  const [themableRamps, _] = reactExports.useState(getColorBrewerRamps());
  const [clusterClickAction, setClusterClickAction] = reactExports.useState(ClusterClickAction.ShowPopup);
  const parsedFeaturesRef = reactExports.useRef(void 0);
  const viewer = useMapProviderContext();
  const setParsedFile = (parsed) => {
    setEnableLabels(false);
    setCreateOptions(getCreateVectorLayerOptions([], locale));
    parsedFeaturesRef.current = parsed;
    if (parsed) {
      setAddLayerName(parsed.name);
      setLoadedFile({
        name: parsed.name,
        size: parsed.size,
        type: parsed.type,
        defaultProjection: parsed.projection
      });
      setCreateOptions(getCreateVectorLayerOptions(parsed.geometryTypes, locale));
      setThemableProperties(parsed.propertyNames);
      if (parsed.propertyNames.length > 0) {
        setThemeOnProperty(parsed.propertyNames[0]);
        setLabelOnProperty(parsed.propertyNames[0]);
      }
      if (parsed.projection) {
        const epsg = parseEpsgCodeFromCRS(parsed.projection);
        if (epsg) {
          setAddProjection(epsg);
        }
      }
    } else {
      setLoadedFile(void 0);
      parsedFeaturesRef.current = void 0;
    }
  };
  const onFileDropped = (file) => __async(void 0, null, function* () {
    if (viewer.isReady()) {
      setIsProcessingFile(true);
      setAddLayerError(void 0);
      const layerMgr = viewer.getLayerManager();
      try {
        const parsed = yield layerMgr.parseFeaturesFromFile({
          file,
          name: file.name,
          locale
        });
        setParsedFile(parsed);
      } catch (e) {
        setAddLayerError(e);
      }
      setIsProcessingFile(false);
    }
  });
  const onCancelAddFile = () => {
    setParsedFile(void 0);
  };
  const onAddFileLayer = reactExports.useCallback((layerProjection) => __async(void 0, null, function* () {
    var _a;
    if (viewer.isReady() && (parsedFeaturesRef == null ? void 0 : parsedFeaturesRef.current)) {
      setIsAddingLayer(true);
      setAddLayerError(void 0);
      try {
        const [_2, layerProj] = yield ensureProjection(layerProjection, locale);
        if (!strIsNullOrEmpty(addLayerName)) {
          parsedFeaturesRef.current.name = addLayerName;
        }
        const targetLayerMgr = (_a = props.targetLayerManager) != null ? _a : viewer.getLayerManager();
        if (targetLayerMgr.hasLayer(parsedFeaturesRef.current.name)) {
          throw new Error(tr("LAYER_NAME_EXISTS", locale, { name: parsedFeaturesRef.current.name }));
        }
        let extraOpts;
        switch (createLayerAs) {
          case "Clustered":
            extraOpts = {
              kind: "Cluster",
              clusterDistance,
              onClusterClickAction: clusterClickAction
            };
            break;
          case "Themed":
            extraOpts = {
              kind: "Theme",
              themeOnProperty,
              colorBrewerTheme: themeToUse
            };
            break;
          case "Heatmap":
            extraOpts = {
              kind: "Heatmap"
            };
            break;
        }
        let labelProp;
        if (enableLabels) {
          labelProp = labelOnProperty;
        }
        const layer = yield targetLayerMgr.addLayerFromParsedFeatures({
          features: parsedFeaturesRef.current,
          projection: layerProj,
          extraOptions: extraOpts,
          labelOnProperty: labelProp
        });
        zoomToLayerExtents(layer.name, viewer);
        setIsAddingLayer(false);
        viewer.toastSuccess("success", tr("ADDED_LAYER", props.locale, { name: layer.name }));
        setAddLayerError(void 0);
        setLoadedFile(void 0);
        setAddLayerName(void 0);
        props.onLayerAdded(layer);
      } catch (e) {
        setAddLayerError(e);
        if (!strIsNullOrEmpty(e == null ? void 0 : e.message)) {
          viewer.toastError("error", e.message);
        }
      }
      setIsAddingLayer(false);
    }
  }), [clusterDistance, createLayerAs, themeOnProperty, themeToUse, enableLabels, labelOnProperty, clusterClickAction, props.onLayerAdded, props.targetLayerManager, addLayerName, locale]);
  if (loadedFile) {
    let canAdd = true;
    if (createLayerAs == "Themed") {
      if (strIsNullOrEmpty(themeOnProperty)) {
        canAdd = false;
      }
    }
    const labelEl = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { label: tr("ENABLE_LABELS", locale), checked: enableLabels, onChange: (e) => setEnableLabels(e.target.checked) }),
      enableLabels && /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("LABEL_USING_PROPERTY", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Select2,
        {
          value: labelOnProperty,
          onChange: (s) => setLabelOnProperty(s),
          items: themableProperties.map((th) => ({ label: th, value: th }))
        }
      ) })
    ] });
    const colorBrewerLabel = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: { __html: purify.sanitize(tr("COLORBREWER_THEME", locale)) } });
    const themeEl = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("THEME_ON_PROPERTY", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Select2,
        {
          value: themeOnProperty,
          onChange: (s) => setThemeOnProperty(s),
          items: themableProperties.map((th) => ({ label: th, value: th }))
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: colorBrewerLabel, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Select2,
        {
          value: themeToUse,
          onChange: (s) => setThemeToUse(s),
          items: themableRamps.map((th) => ({ label: th.displayName, value: th.scheme }))
        }
      ) }),
      themeToUse && /* @__PURE__ */ jsxRuntimeExports.jsx(ColorBrewerSwatch, { theme: themeToUse })
    ] });
    const clusterActions = [
      { value: ClusterClickAction.ShowPopup, label: tr("CLUSTER_CLICK_ACTION_SHOW_POPUP", locale) },
      { value: ClusterClickAction.ZoomToClusterExtents, label: tr("CLUSTER_CLICK_ACTION_ZOOM_EXTENTS", locale) }
    ];
    const clusterEl = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("POINT_CLUSTER_DISTANCE", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(NumericInput, { min: 1, value: clusterDistance, onChange: (v) => setClusterDistance(v) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("CLUSTER_CLICK_ACTION", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TypedSelect,
        {
          value: clusterClickAction,
          onChange: (e) => setClusterClickAction(e),
          items: clusterActions
        }
      ) })
    ] });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      NonIdealState,
      {
        title: /* @__PURE__ */ jsxRuntimeExports.jsx(EditableText, { value: addLayerName, onChange: (v) => setAddLayerName(v) }),
        icon: "upload",
        description: tr("FMT_UPLOADED_FILE", locale, { size: loadedFile.size, type: strIsNullOrEmpty(loadedFile.type) ? tr("UNKNOWN_FILE_TYPE", locale) : loadedFile.type }),
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          addLayerError && /* @__PURE__ */ jsxRuntimeExports.jsx(Callout, { variant: "danger", title: tr("ADDING_LAYER_ERROR", locale), children: addLayerError.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("ADD_LAYER_PROJECTION", locale), children: loadedFile.defaultProjection ? /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            "EPSG:",
            addProjection
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://spatialreference.org/", target: "_blank", children: "EPSG:" }), inline: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(NumericInput, { style: { width: 60 }, min: 0, value: addProjection, onChange: (v) => setAddProjection(v) }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("CREATE_LAYER_AS", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Select2,
            {
              value: createLayerAs,
              onChange: (e) => setCreateLayerAs(e),
              items: createOptions
            }
          ) }),
          (() => {
            switch (createLayerAs) {
              case "Vector":
                return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: labelEl });
              case "Themed":
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  labelEl,
                  themeEl
                ] });
              case "Clustered":
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  labelEl,
                  clusterEl
                ] });
              case "Heatmap":
                return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
              default:
                assertNever();
            }
          })(),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(ElementGroup, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: !canAdd, loading: isAddingLayer, onClick: (e) => onAddFileLayer(addProjection), variant: "primary", children: tr("ADD_LAYER", locale) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { loading: isAddingLayer, onClick: (e) => onCancelAddFile(), variant: "danger", children: tr("CANCEL", locale) })
          ] })
        ] })
      }
    );
  } else if (isProcessingFile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      NonIdealState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { sizePreset: "large" }),
        title: tr("ADD_FILE_PROCESSING", locale)
      }
    );
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      addLayerError && /* @__PURE__ */ jsxRuntimeExports.jsx(Callout, { variant: "danger", title: tr("ADDING_LAYER_ERROR", locale), children: addLayerError.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        NonIdealState,
        {
          title: tr("ADD_FILE", locale),
          icon: "upload",
          description: tr("ADD_FILE_INSTRUCTIONS", locale),
          action: /* @__PURE__ */ jsxRuntimeExports.jsx(FileInput, { fill: true, text: tr("CHOOSE_FILE", locale), buttonText: tr("BROWSE", locale), onInputChange: (e) => e.target.files && onFileDropped(e.target.files[0]) })
        }
      )
    ] });
  }
};
const AddUrlLayer = (props) => {
  const { locale } = props;
  const [selectedUrlType, setSelectedUrlType] = reactExports.useState(void 0);
  const items = Object.keys(ADD_URL_LAYER_TYPES).map((lt) => ({ value: lt, label: ADD_URL_LAYER_TYPES[lt].label }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tr("LAYER_TYPE", locale) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TypedSelect,
        {
          fill: true,
          value: selectedUrlType || "",
          placeholder: tr("SELECT_LAYER_TYPE", locale),
          onChange: (e) => setSelectedUrlType(e),
          items: items.map((i) => ({ value: i.value, label: i.value }))
        }
      )
    ] }),
    (() => {
      if (selectedUrlType && ADD_URL_LAYER_TYPES[selectedUrlType]) {
        const cprops = {
          locale,
          onLayerAdded: props.onLayerAdded,
          onAddLayerBusyWorker: props.onAddLayerBusyWorker,
          onRemoveLayerBusyWorker: props.onRemoveLayerBusyWorker,
          targetLayerManager: props.targetLayerManager
        };
        return ADD_URL_LAYER_TYPES[selectedUrlType].content(cprops);
      }
    })()
  ] });
};
const AddLayer = (props) => {
  const { Radio } = useElementContext();
  const [addLayerKind, setAddLayerKind] = reactExports.useState(
    0
    /* File */
  );
  const onAddLayerKindChanged = (e) => {
    setAddLayerKind(parseInt(e.target.value, 10));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tr("ADD_LAYER_KIND_PROMPT", props.locale) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { label: tr("LAYER_KIND_FILE", props.locale), checked: addLayerKind == 0, value: 0, onChange: onAddLayerKindChanged }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { label: tr("LAYER_KIND_URL", props.locale), checked: addLayerKind == 1, value: 1, onChange: onAddLayerKindChanged }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
    (() => {
      switch (addLayerKind) {
        case 0:
          return /* @__PURE__ */ jsxRuntimeExports.jsx(AddFileLayer, __spreadValues({}, props));
        case 1:
          return /* @__PURE__ */ jsxRuntimeExports.jsx(AddUrlLayer, __spreadValues({}, props));
      }
    })()
  ] });
};
const DEFAULT_SWIPE_POSITION = 50;
const DEFAULT_SPY_CURSOR_RADIUS = 75;
const MIN_SPY_CURSOR_RADIUS = 25;
const MAX_SPY_CURSOR_RADIUS = 150;
const SPY_CURSOR_RADIUS_STEP = 5;
function clampSpyCursorRadius(radius) {
  return Math.max(MIN_SPY_CURSOR_RADIUS, Math.min(MAX_SPY_CURSOR_RADIUS, radius));
}
function useMapComparisonInfo() {
  const pairs = useAppState((state) => {
    var _a;
    return (_a = state.config.comparisonPairs) != null ? _a : state.config.mapSwipePairs;
  });
  const activeMapName = useAppState((state) => state.config.activeMapName);
  return reactExports.useMemo(() => {
    if (!pairs || !activeMapName) {
      return void 0;
    }
    const pair = pairs.find((p) => p.primaryMapName === activeMapName || p.secondaryMapName === activeMapName);
    if (!pair) {
      return void 0;
    }
    return {
      pair,
      isComparisonPrimary: pair.primaryMapName === activeMapName
    };
  }, [pairs, activeMapName]);
}
function useComparisonMode() {
  return useAppState((state) => {
    if (state.config.comparisonMode) {
      return state.config.comparisonMode;
    }
    return state.config.swipeActive ? "swipe" : "none";
  });
}
function useIsComparisonActive() {
  return useComparisonMode() !== "none";
}
function useComparisonState() {
  const mode = useComparisonMode();
  const swipePosition = useAppState((state) => state.config.swipePosition);
  const spyCursorRadius = useAppState((state) => state.config.spyCursorRadius);
  const locale = useAppState((state) => state.config.locale);
  return {
    mode,
    swipePosition: swipePosition != null ? swipePosition : DEFAULT_SWIPE_POSITION,
    spyCursorRadius: spyCursorRadius != null ? spyCursorRadius : DEFAULT_SPY_CURSOR_RADIUS,
    locale
  };
}
const SWIPE_LABEL_STYLE = {
  background: "rgba(255,255,255,0.85)",
  border: "1px solid rgba(0,0,0,0.2)",
  borderRadius: 4,
  padding: "2px 8px",
  fontSize: 12,
  fontWeight: "bold",
  pointerEvents: "none",
  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
  whiteSpace: "nowrap"
};
const MapComparisonControl = () => {
  var _a, _b, _c, _d;
  const dispatch = useReduxDispatch();
  const viewer = useMapProviderContext();
  const comparisonInfo = useMapComparisonInfo();
  const { mode, swipePosition, spyCursorRadius, locale } = useComparisonState();
  const containerRef = reactExports.useRef(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [spyCursor, setSpyCursor] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    if (!viewer.isReady()) {
      return;
    }
    if (!(comparisonInfo == null ? void 0 : comparisonInfo.pair) || mode === "none") {
      viewer.deactivateMapComparison();
      return () => {
        viewer.deactivateMapComparison();
      };
    }
    const secondaryMapName = comparisonInfo.pair.secondaryMapName;
    const activated = mode === "swipe" ? viewer.activateMapComparisonSwipe(secondaryMapName, swipePosition) : viewer.activateMapComparisonSpy(secondaryMapName, spyCursorRadius);
    if (!activated) {
      dispatch(setComparisonMode("none"));
    }
    return () => {
      viewer.deactivateMapComparison();
    };
  }, [comparisonInfo, dispatch, mode, spyCursorRadius, swipePosition, viewer]);
  reactExports.useEffect(() => {
    if (!viewer.isReady()) {
      return;
    }
    if (mode === "swipe") {
      viewer.updateComparisonSwipePosition(swipePosition);
    } else if (mode === "spy") {
      viewer.updateSpyCursorRadius(spyCursorRadius);
    }
  }, [mode, spyCursorRadius, swipePosition, viewer]);
  reactExports.useEffect(() => {
    if (mode !== "spy" || !viewer.isReady()) {
      viewer.updateSpyCursor(void 0);
      return;
    }
    viewer.updateSpyCursor((spyCursor == null ? void 0 : spyCursor.visible) ? spyCursor.pixel : void 0);
  }, [mode, spyCursor, viewer]);
  reactExports.useEffect(() => {
    if (mode !== "spy") {
      setSpyCursor(void 0);
      return;
    }
    const overlayEl = containerRef.current;
    const host = overlayEl == null ? void 0 : overlayEl.parentElement;
    if (!overlayEl || !host) {
      return;
    }
    const onPointerMove = (event) => {
      const rect = host.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setSpyCursor({
        pixel: [x, y],
        visible: x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
      });
    };
    const onPointerLeave = () => {
      setSpyCursor(void 0);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        dispatch(setComparisonMode("none"));
        event.preventDefault();
        return;
      }
      if (document.activeElement !== host) {
        return;
      }
      if (event.key === "ArrowUp") {
        dispatch(setSpyCursorRadius(clampSpyCursorRadius(spyCursorRadius + SPY_CURSOR_RADIUS_STEP)));
        event.preventDefault();
      } else if (event.key === "ArrowDown") {
        dispatch(setSpyCursorRadius(clampSpyCursorRadius(spyCursorRadius - SPY_CURSOR_RADIUS_STEP)));
        event.preventDefault();
      }
    };
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [dispatch, mode, spyCursorRadius]);
  if (mode === "none" || !(comparisonInfo == null ? void 0 : comparisonInfo.pair)) {
    return null;
  }
  const { pair } = comparisonInfo;
  const handleClose = (e) => {
    e.stopPropagation();
    dispatch(setComparisonMode("none"));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      style: {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10
      },
      children: [
        mode === "swipe" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onPointerDown: (e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                setIsDragging(true);
                e.stopPropagation();
              },
              onPointerMove: (e) => {
                if (!isDragging || !containerRef.current) {
                  return;
                }
                const rect = containerRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const nextPosition = Math.max(0, Math.min(100, x / rect.width * 100));
                dispatch(setSwipePosition(Math.round(nextPosition)));
                e.stopPropagation();
              },
              onPointerUp: (e) => {
                e.currentTarget.releasePointerCapture(e.pointerId);
                setIsDragging(false);
                e.stopPropagation();
              },
              style: {
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `calc(${swipePosition}% - 16px)`,
                width: 32,
                cursor: "ew-resize",
                pointerEvents: "all",
                zIndex: 11
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: "50%",
                      width: 3,
                      background: "rgba(255,255,255,0.9)",
                      boxShadow: "0 0 4px rgba(0,0,0,0.5)",
                      transform: "translateX(-50%)",
                      pointerEvents: "none"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.9)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "ew-resize",
                      pointerEvents: "none",
                      userSelect: "none"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 4L3 10L7 16M13 4L17 10L13 16", stroke: "#555", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            position: "absolute",
            top: 8,
            left: `${swipePosition}%`,
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 6,
            zIndex: 12,
            pointerEvents: "none"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: SWIPE_LABEL_STYLE, children: (_a = pair.primaryLabel) != null ? _a : tr("MAP_SWIPE_PRIMARY_LABEL", locale) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: handleClose,
                title: tr("MAP_SWIPE_CLOSE", locale),
                style: {
                  background: "rgba(255,255,255,0.9)",
                  border: "1px solid rgba(0,0,0,0.3)",
                  borderRadius: 4,
                  padding: "2px 8px",
                  cursor: "pointer",
                  fontSize: 12,
                  pointerEvents: "all",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                  whiteSpace: "nowrap"
                },
                children: [
                  "✕ ",
                  tr("MAP_SWIPE_CLOSE", locale)
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: SWIPE_LABEL_STYLE, children: (_b = pair.secondaryLabel) != null ? _b : tr("MAP_SWIPE_SECONDARY_LABEL", locale) })
          ] })
        ] }),
        mode === "spy" && (spyCursor == null ? void 0 : spyCursor.visible) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                left: spyCursor.pixel[0] - spyCursorRadius,
                top: spyCursor.pixel[1] - spyCursorRadius,
                width: spyCursorRadius * 2,
                height: spyCursorRadius * 2,
                borderRadius: "50%",
                border: "4px solid rgba(0,0,0,0.5)",
                boxShadow: "0 0 0 2px rgba(255,255,255,0.85)",
                pointerEvents: "none",
                zIndex: 12
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                position: "absolute",
                left: spyCursor.pixel[0] + spyCursorRadius + 12,
                top: spyCursor.pixel[1],
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.72)",
                color: "white",
                borderRadius: 4,
                padding: "6px 10px",
                fontSize: 11,
                pointerEvents: "none",
                boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                whiteSpace: "nowrap",
                zIndex: 13,
                lineHeight: 1.6
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontWeight: "bold" }, children: [
                  tr("MAP_SWIPE_PRIMARY_LABEL", locale),
                  ": ",
                  (_c = pair.primaryLabel) != null ? _c : pair.primaryMapName
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontWeight: "bold" }, children: [
                  tr("MAP_SWIPE_SECONDARY_LABEL", locale),
                  ": ",
                  (_d = pair.secondaryLabel) != null ? _d : pair.secondaryMapName
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { opacity: 0.75, fontSize: 10, marginTop: 3 }, children: tr("MAP_SPY_ESC_HINT", locale) })
              ]
            }
          )
        ] })
      ]
    }
  );
};
const EMPTY_MANAGE_LAYERS = [];
function zoomToLayerExtents(layerName, viewer) {
  var _a;
  const layer = viewer.getLayerManager().getLayer(layerName);
  const ll_bbox = layer == null ? void 0 : layer.get(LayerProperty.WGS84_BBOX);
  if (ll_bbox) {
    const zoomBounds = transformExtent(ll_bbox, "EPSG:4326", viewer.getProjection());
    viewer.zoomToExtent(zoomBounds);
  } else if (layer instanceof VectorLayer) {
    const source = layer.getSource();
    let bounds;
    if (source instanceof Cluster) {
      bounds = (_a = source.getSource()) == null ? void 0 : _a.getExtent();
    } else {
      bounds = source.getExtent();
    }
    const sp = source.getProjection();
    const dp = viewer.getProjection();
    if (sp && dp) {
      bounds = transformExtent(bounds, sp, dp);
    }
    if (Number.isFinite(bounds[0]) && Number.isFinite(bounds[1]) && Number.isFinite(bounds[2]) && Number.isFinite(bounds[3])) {
      viewer.zoomToExtent(bounds);
    } else {
      console.warn(`Attempted to zoom to invalid bounds for layer: ${layerName}`);
    }
  }
}
const AddManageLayersContainer = () => {
  var _a, _b, _c;
  const { TabSet, Icon: Icon2 } = useElementContext();
  const dispatch = useReduxDispatch();
  const locale = useViewerLocale();
  const activeMapName = useActiveMapName();
  const viewer = useMapProviderContext();
  const comparisonInfo = useMapComparisonInfo();
  const isComparisonActive = useIsComparisonActive();
  const [selectedMapForLayers, setSelectedMapForLayers] = reactExports.useState(activeMapName);
  reactExports.useEffect(() => {
    if (!isComparisonActive) {
      setSelectedMapForLayers(activeMapName);
    }
  }, [isComparisonActive, activeMapName]);
  const targetMapName = isComparisonActive ? selectedMapForLayers != null ? selectedMapForLayers : activeMapName : activeMapName;
  const targetLayerManager = reactExports.useMemo(() => {
    if (isComparisonActive && targetMapName && targetMapName !== activeMapName) {
      return viewer.getLayerManager(targetMapName);
    }
    return void 0;
  }, [isComparisonActive, targetMapName, activeMapName, viewer]);
  const primaryLayers = useAppState((state) => {
    if (activeMapName && state.mapState[activeMapName]) {
      return state.mapState[activeMapName].layers;
    }
    return void 0;
  });
  const manageLayers = useAppState((state) => {
    var _a2;
    if (targetMapName && ((_a2 = state.mapState[targetMapName]) == null ? void 0 : _a2.layers)) {
      return state.mapState[targetMapName].layers;
    }
    return EMPTY_MANAGE_LAYERS;
  });
  const view = useAppState((state) => {
    if (targetMapName && state.mapState[targetMapName]) {
      return state.mapState[targetMapName].currentView;
    }
    return void 0;
  });
  const getLayerIndex = (layerName) => {
    if (manageLayers) {
      for (let i = 0; i < manageLayers.length; i++) {
        if (manageLayers[i].name === layerName) {
          return i;
        }
      }
    }
    return -1;
  };
  const onLayerAdded = (layer) => {
    if (targetMapName) {
      dispatch(mapLayerAdded(targetMapName, layer));
    }
    if (isComparisonActive) {
      viewer.refreshMapComparison();
    }
  };
  const onAddLayerBusyWorker = (name) => {
    if (targetMapName) {
      dispatch(addMapLayerBusyWorker(targetMapName, name));
    }
  };
  const onRemoveLayerBusyWorker = (name) => {
    if (targetMapName) {
      dispatch(removeMapLayerBusyWorker(targetMapName, name));
    }
  };
  const removeHandler = (layerName) => {
    if (targetMapName) {
      dispatch(removeMapLayer(targetMapName, layerName));
    }
  };
  const upHandler = (layerName) => {
    const newIndex = getLayerIndex(layerName);
    if (targetMapName && newIndex >= 0) {
      dispatch(setMapLayerIndex(targetMapName, layerName, newIndex - 1));
    }
  };
  const downHandler = (layerName) => {
    const newIndex = getLayerIndex(layerName);
    if (manageLayers && targetMapName && newIndex < manageLayers.length - 1) {
      dispatch(setMapLayerIndex(targetMapName, layerName, newIndex + 1));
    }
  };
  const zoomToBounds = (layerName) => {
    if (viewer.isReady()) {
      zoomToLayerExtents(layerName, viewer);
    }
  };
  const setVisibility = (layerName, visible) => {
    if (targetMapName) {
      dispatch(setMapLayerVisibility(targetMapName, layerName, visible));
    }
  };
  const setOpacity = (layerName, value) => {
    if (targetMapName) {
      dispatch(setMapLayerOpacity(targetMapName, layerName, value));
    }
  };
  const setHeatmapBlur = (layerName, value) => {
    if (targetMapName) {
      dispatch(setHeatmapLayerBlur(targetMapName, layerName, value));
    }
  };
  const setHeatmapRadius = (layerName, value) => {
    if (targetMapName) {
      dispatch(setHeatmapLayerRadius(targetMapName, layerName, value));
    }
  };
  const updateVectorStyle = (layerName, value, which) => {
    if (targetMapName) {
      dispatch(setMapLayerVectorStyle(targetMapName, layerName, value, which));
    }
  };
  const selectorContainerStyle2 = { display: "flex", alignItems: "center", gap: 6, marginBottom: 8 };
  const selectorLabelStyle2 = { whiteSpace: "nowrap" };
  const selectorSelectStyle2 = { flex: 1 };
  const comparisonMapSelector = isComparisonActive && comparisonInfo ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: selectorContainerStyle2, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: selectorLabelStyle2, children: tr("MAP_SWIPE_LAYER_MANAGER_FOR", locale) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "select",
      {
        value: (_a = selectedMapForLayers != null ? selectedMapForLayers : activeMapName) != null ? _a : "",
        onChange: (e) => setSelectedMapForLayers(e.target.value),
        style: selectorSelectStyle2,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: comparisonInfo.pair.primaryMapName, children: [
            (_b = comparisonInfo.pair.primaryLabel) != null ? _b : tr("MAP_SWIPE_PRIMARY_LABEL", locale),
            " (",
            comparisonInfo.pair.primaryMapName,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: comparisonInfo.pair.secondaryMapName, children: [
            (_c = comparisonInfo.pair.secondaryLabel) != null ? _c : tr("MAP_SWIPE_SECONDARY_LABEL", locale),
            " (",
            comparisonInfo.pair.secondaryMapName,
            ")"
          ] })
        ]
      }
    )
  ] }) : null;
  if (primaryLayers) {
    const tabProps = {
      id: "tabs",
      tabs: [
        {
          id: "add_layer",
          title: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { icon: "new-layer" }),
            " ",
            tr("ADD_LAYER", locale)
          ] }),
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(
            AddLayer,
            {
              onLayerAdded,
              onAddLayerBusyWorker,
              onRemoveLayerBusyWorker,
              targetLayerManager,
              locale
            }
          )
        },
        {
          id: "manage_layers",
          title: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { icon: "layers" }),
            " ",
            tr("MANAGE_LAYERS", locale)
          ] }),
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ManageLayers,
            {
              layers: manageLayers,
              locale,
              currentResolution: view == null ? void 0 : view.resolution,
              onSetOpacity: setOpacity,
              onSetHeatmapBlur: setHeatmapBlur,
              onSetHeatmapRadius: setHeatmapRadius,
              onSetVisibility: setVisibility,
              onZoomToBounds: zoomToBounds,
              onMoveLayerDown: downHandler,
              onMoveLayerUp: upHandler,
              onRemoveLayer: removeHandler,
              onVectorStyleChanged: updateVectorStyle
            }
          )
        }
      ]
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: 8 }, children: [
      comparisonMapSelector,
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabSet, __spreadValues({}, tabProps))
    ] });
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
  }
};
const ViewSizeContent = ({ gw, gh, unit }) => {
  const str = fmt("{gw} x {gh} ({unit})", { gw, gh, unit });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: purify.sanitize(str) } });
};
const ViewSize = (props) => {
  const { width, height, view, metersPerUnit, units, precision, locale } = props;
  const uom = getUnitOfMeasure(units);
  const [gw, gh] = getMapSize([width, height], metersPerUnit, units, view.resolution, precision);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "status-bar-component component-view-size", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ViewSizeContent, { gw, gh, unit: uom.abbreviation(locale) }) });
};
const ViewSizeContainer = () => {
  const width = useActiveMapWidth();
  const height = useActiveMapHeight();
  const sizeUnits = useViewerSizeUnits();
  const metersPerUnit = useActiveMapMetersPerUnit();
  const view = useActiveMapView();
  const locale = useViewerLocale();
  if (width && height && metersPerUnit && view) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ViewSize, { locale, width, height, view, metersPerUnit, units: sizeUnits || UnitOfMeasure.Unknown });
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("noscript", {});
  }
};
function NOOP() {
}
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "true");
  textArea.style.position = "absolute";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();
  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(textArea);
  }
}
const ShareLinkToViewContainer = () => {
  const { Checkbox, Button } = useElementContext();
  const [showSession, setShowSession] = reactExports.useState(false);
  const locale = useViewerLocale();
  const map = useActiveMapState();
  const onShowSessionChanged = () => setShowSession(!showSession);
  const v = useMapProviderContext();
  const onCopied = () => {
    if (v.isReady()) {
      v.toastSuccess("clipboard", tr("SHARE_LINK_COPIED", locale));
    }
  };
  const onCopyToClipboard = () => __async(void 0, null, function* () {
    var _a;
    try {
      if ((_a = navigator.clipboard) == null ? void 0 : _a.writeText) {
        yield navigator.clipboard.writeText(shareUrl);
      } else if (!fallbackCopyTextToClipboard(shareUrl)) {
        return;
      }
      onCopied();
    } catch (e) {
      if (fallbackCopyTextToClipboard(shareUrl)) {
        onCopied();
      }
    }
  });
  const parsed = parseUrl(`${window.location}`);
  if (!showSession) {
    delete parsed.query.session;
  }
  const shareUrl = `${parsed.url}?${stringifyQuery(parsed.query)}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { style: { width: "100%", boxSizing: "border-box", border: "none" }, rows: 16, readOnly: true, value: shareUrl, onChange: NOOP }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: 15 }, children: [
      map && /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: showSession, label: tr("SHARE_LINK_INCLUDE_SESSION", locale), onChange: onShowSessionChanged }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", onClick: onCopyToClipboard, children: tr("SHARE_LINK_COPY_CLIPBOARD", locale) })
    ] })
  ] });
};
function registerDefaultComponents() {
  registerComponentFactory(DefaultComponentNames.Navigator, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(NavigatorContainer, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.MouseCoordinates, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(MouseCoordinatesContainer, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.ScaleDisplay, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(ScaleDisplayContainer, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.TaskPane, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(TaskPaneContainer, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.About, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(About, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.Measure, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(MeasureContainer, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.BaseMapSwitcher, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(BaseLayerSwitcherContainer, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.MapMenu, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(MapMenuContainer, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.ViewSize, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(ViewSizeContainer, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.CoordinateTracker, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(CoordinateTrackerContainer, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.AddManageLayers, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(AddManageLayersContainer, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.ShareLinkToView, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(ShareLinkToViewContainer, __spreadValues({}, props)));
}
function setAppSetting(key, value) {
  return {
    type: ActionType.SET_APP_SETTING,
    payload: {
      key,
      value
    }
  };
}
const AppActions = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  setAppSetting
}, Symbol.toStringTag, { value: "Module" }));
class FormatDriver {
  constructor(type, format, defaultProjection = null) {
    this.type = type;
    this.format = format;
    this.defaultProjection = defaultProjection;
  }
  tryParse(size, text) {
    return __async(this, null, function* () {
      const fs = this.format.readFeatures(text);
      let bHasPoint = false;
      let bHasLine = false;
      let bHasPoly = false;
      for (const f of fs) {
        const g = f.getGeometry();
        switch (g == null ? void 0 : g.getType()) {
          case "Point":
            bHasPoint = true;
            break;
          case "LineString":
            bHasLine = true;
            break;
          case "LinearRing":
            bHasLine = true;
            break;
          case "Polygon":
            bHasPoly = true;
            break;
          case "MultiPoint":
            bHasPoint = true;
            break;
          case "MultiLineString":
            bHasLine = true;
            break;
          case "MultiPolygon":
            bHasPoly = true;
            break;
          case "GeometryCollection":
            bHasPoint = true;
            break;
          case "Circle":
            bHasPoly = true;
            break;
        }
      }
      let geomTypes = [];
      if (bHasPoint) {
        geomTypes.push("Point");
      }
      if (bHasLine) {
        geomTypes.push("LineString");
      }
      if (bHasPoly) {
        geomTypes.push("Polygon");
      }
      const propNames = [];
      if (fs.length > 0) {
        const first = fs[0];
        for (const k of first.getKeys()) {
          if (k == first.getGeometryName()) {
            continue;
          }
          propNames.push(k);
        }
      }
      const features = () => __async(this, null, function* () {
        return fs;
      });
      return new ParsedFeatures(this.type, size, features, fs.length > 0, geomTypes, propNames, this.defaultProjection);
    });
  }
}
function extend(extent1, extent2) {
  if (extent2[0] < extent1[0]) {
    extent1[0] = extent2[0];
  }
  if (extent2[2] > extent1[2]) {
    extent1[2] = extent2[2];
  }
  if (extent2[1] < extent1[1]) {
    extent1[1] = extent2[1];
  }
  if (extent2[3] > extent1[3]) {
    extent1[3] = extent2[3];
  }
  return extent1;
}
class CompositeSelectionLayer {
  constructor(layer) {
    this.layer = layer;
    this.features = [];
    if (this.isSelectedLayer(this.layer)) {
      for (const f of this.layer.Feature) {
        this.features.push(f);
      }
    } else {
      for (const f of this.layer.features) {
        const fp = [];
        for (const k in f.properties) {
          fp.push({
            Name: k,
            Value: f.properties[k]
          });
        }
        const fb = f.bounds ? f.bounds.join(" ") : void 0;
        this.features.push({
          Bounds: fb,
          Property: fp
        });
      }
    }
  }
  isSelectedLayer(layer) {
    return layer.Feature && layer["@id"] && layer["@name"];
  }
  /**
   * Gets the combined bounds of all selected features
   * 
   * @returns The combined bounds of all selected features in the projection of the current map view
   */
  getBounds() {
    let bounds;
    if (this.isSelectedLayer(this.layer)) {
      this.layer.Feature.forEach((feat) => {
        const b = feat.Bounds ? feat.Bounds.split(" ").map((s) => parseFloat(s)) : void 0;
        if (b) {
          if (!bounds) {
            bounds = b;
          } else {
            bounds = extend(bounds, b);
          }
        }
      });
    } else {
      for (const f of this.layer.features) {
        if (f.bounds) {
          if (bounds == null) {
            bounds = f.bounds;
          } else {
            bounds = extend(bounds, f.bounds);
          }
        }
      }
    }
    return bounds;
  }
  getLayerId() {
    if (this.isSelectedLayer(this.layer)) {
      return this.layer["@id"];
    }
    return void 0;
  }
  getName() {
    if (this.isSelectedLayer(this.layer)) {
      return this.layer["@name"];
    } else {
      return this.layer.name;
    }
  }
  getFeatureAt(featureIndex) {
    return this.features[featureIndex];
  }
  getFeatureCount() {
    return this.features.length;
  }
  getLayerMetadata() {
    if (this.isSelectedLayer(this.layer)) {
      return this.layer.LayerMetadata;
    }
    return void 0;
  }
}
class CompositeSelection {
  constructor(mgSelection, clientSelection) {
    this.layers = [];
    if (mgSelection) {
      for (const layer of mgSelection.SelectedLayer) {
        this.layers.push(new CompositeSelectionLayer(layer));
      }
    }
    if (clientSelection) {
      for (const layer of clientSelection.layers) {
        this.layers.push(new CompositeSelectionLayer(layer));
      }
    }
  }
  getBounds() {
    if (this.layers.length == 0) {
      return void 0;
    }
    let bounds;
    for (const lyr of this.layers) {
      let layerBounds = lyr.getBounds();
      if (layerBounds) {
        if (bounds) {
          bounds = extend(bounds, layerBounds);
        } else {
          bounds = layerBounds;
        }
      }
    }
    return bounds;
  }
  getLayers() {
    return this.layers;
  }
  getLayerCount() {
    return this.layers.length;
  }
  getLayerAt(layerIndex) {
    return this.layers[layerIndex];
  }
  getFeatureAt(layerIndex, featureIndex) {
    const layer = this.getLayerAt(layerIndex);
    return layer == null ? void 0 : layer.getFeatureAt(featureIndex);
  }
}
function initMapGuideCommands() {
  registerCommand(DefaultCommands.MapTip, {
    iconClass: SPRITE_MAPTIP,
    selected: (state) => {
      return state.featureTooltipsEnabled === true;
    },
    enabled: (state) => !state.stateless,
    invoke: (dispatch, getState) => {
      const enabled = getState().viewer.featureTooltipsEnabled;
      return dispatch(setFeatureTooltipsEnabled(!enabled));
    }
  });
  registerCommand(DefaultCommands.QuickPlot, {
    iconClass: SPRITE_PRINT,
    selected: () => false,
    enabled: (state) => !state.stateless,
    invoke: (dispatch, getState, _viewer, parameters) => {
      const config = getState().config;
      const url = "component://QuickPlot";
      const cmdDef = buildTargetedCommand(config, parameters);
      openUrlInTarget(DefaultCommands.QuickPlot, cmdDef, config.capabilities.hasTaskPane, dispatch, url);
    }
  });
  registerCommand(DefaultCommands.ViewerOptions, {
    iconClass: SPRITE_OPTIONS,
    selected: () => false,
    enabled: () => true,
    invoke: (dispatch, getState, _viewer, parameters) => {
      const config = getState().config;
      const url = "component://ViewerOptions";
      const cmdDef = buildTargetedCommand(config, parameters);
      openUrlInTarget(DefaultCommands.ViewerOptions, cmdDef, config.capabilities.hasTaskPane, dispatch, url, tr("VIEWER_OPTIONS", config.locale));
    }
  });
  registerCommand(DefaultCommands.SelectRadius, {
    iconClass: SPRITE_SELECT_RADIUS,
    selected: () => false,
    enabled: (state) => !state.stateless,
    invoke: (_dispatch, _getState, viewer, parameters) => {
      if (viewer) {
        const selMethod = (parameters == null ? void 0 : parameters["SelectionType"]) || "INTERSECTS";
        viewer.digitizeCircle((circle) => {
          var _a;
          const fact = viewer.getOLFactory();
          const geom = fact.createGeomPolygonFromCircle(circle);
          (_a = viewer.mapguideSupport()) == null ? void 0 : _a.selectByGeometry(geom, selMethod);
        });
      }
    }
  });
  registerCommand(DefaultCommands.SelectPolygon, {
    iconClass: SPRITE_SELECT_POLYGON,
    selected: () => false,
    enabled: (state) => !state.stateless,
    invoke: (_dispatch, _getState, viewer, parameters) => {
      if (viewer) {
        const selMethod = (parameters == null ? void 0 : parameters["SelectionType"]) || "INTERSECTS";
        viewer.digitizePolygon((geom) => {
          var _a;
          (_a = viewer.mapguideSupport()) == null ? void 0 : _a.selectByGeometry(geom, selMethod);
        });
      }
    }
  });
  registerCommand(DefaultCommands.ClearSelection, {
    iconClass: SPRITE_SELECT_CLEAR,
    selected: () => false,
    enabled: (state) => CommandConditions.hasSelection(state) || CommandConditions.hasClientSelection(state),
    invoke: (dispatch, getState, viewer) => {
      var _a;
      const st = getState();
      if (st.config.activeMapName) {
        dispatch(clearClientSelection(st.config.activeMapName));
      }
      (_a = viewer == null ? void 0 : viewer.mapguideSupport()) == null ? void 0 : _a.clearSelection();
    }
  });
  registerCommand(DefaultCommands.ZoomToSelection, {
    iconClass: SPRITE_ICON_ZOOMSELECT,
    selected: () => false,
    enabled: (state) => CommandConditions.hasSelection(state) || CommandConditions.hasClientSelection(state),
    invoke: (dispatch, getState, viewer) => {
      if (viewer) {
        viewer.getOLFactory();
        const st = getState();
        const selection = getSelectionSet(st);
        let cs;
        if (st.config.activeMapName) {
          cs = st.mapState[st.config.activeMapName].clientSelection;
        }
        const compSel = new CompositeSelection(selection == null ? void 0 : selection.SelectedFeatures, cs);
        const bounds = compSel.getBounds();
        if (bounds) {
          const view = viewer.getViewForExtent(bounds);
          dispatch(setCurrentView(view));
        }
      }
    }
  });
  registerCommand(DefaultCommands.Buffer, {
    iconClass: SPRITE_BUFFER,
    selected: () => false,
    enabled: (state) => !state.stateless && CommandConditions.hasSelection(state),
    invoke: (dispatch, getState, _viewer, parameters) => {
      const state = getState();
      const map = getRuntimeMap(state);
      const config = state.config;
      if (map) {
        let url = ensureParameters(`${getFusionRoot()}/widgets/BufferPanel/BufferPanel.php`, map.Name, map.SessionId, config.locale, false);
        url += "&popup=false&us=0";
        const cmdDef = buildTargetedCommand(config, parameters);
        openUrlInTarget(DefaultCommands.Buffer, cmdDef, config.capabilities.hasTaskPane, dispatch, url);
      }
    }
  });
  registerCommand(DefaultCommands.SelectWithin, {
    iconClass: SPRITE_SELECT_FEATURES,
    selected: () => false,
    enabled: (state, parameters) => !state.stateless && !CommandConditions.disabledIfEmptySelection(state, parameters),
    invoke: (dispatch, getState, _viewer, parameters) => {
      const state = getState();
      const map = getRuntimeMap(state);
      const config = state.config;
      if (map) {
        let url = ensureParameters(`${getFusionRoot()}/widgets/SelectWithin/SelectWithinPanel.php`, map.Name, map.SessionId, config.locale, false);
        url += "&popup=false";
        const cmdDef = buildTargetedCommand(config, parameters);
        openUrlInTarget(DefaultCommands.SelectWithin, cmdDef, config.capabilities.hasTaskPane, dispatch, url);
      }
    }
  });
  registerCommand(DefaultCommands.Redline, {
    iconClass: SPRITE_REDLINE,
    selected: () => false,
    enabled: (state) => !state.stateless && CommandConditions.isNotBusy(state),
    invoke: (dispatch, getState, viewer, parameters) => {
      const state = getState();
      const map = getRuntimeMap(state);
      const config = state.config;
      if (map) {
        let bUseAdvancedStylization = true;
        let defaultDataStoreFormat = null;
        let defaultRedlineGeometryType = 0;
        let bCreateOnStartup = false;
        if (parameters == null ? void 0 : parameters["AutogenerateLayerNames"]) {
          if (parameters == null ? void 0 : parameters["StylizationType"])
            bUseAdvancedStylization = parameters["StylizationType"] == "advanced";
        }
        if ((parameters == null ? void 0 : parameters["DataStoreFormat"]) && (parameters == null ? void 0 : parameters["RedlineGeometryFormat"])) {
          if (parameters["DataStoreFormat"] == "SDF" || parameters["DataStoreFormat"] == "SHP" || parameters["DataStoreFormat"] == "SQLite") {
            var geomTypes = parseInt(`${parameters["RedlineGeometryFormat"]}`);
            if (parameters["DataStoreFormat"] == "SHP") {
              if (geomTypes == 1 || geomTypes == 2 || geomTypes == 4) {
                defaultDataStoreFormat = parameters["DataStoreFormat"];
                defaultRedlineGeometryType = geomTypes;
                if (parameters == null ? void 0 : parameters["AutoCreateOnStartup"])
                  bCreateOnStartup = parameters["AutoCreateOnStartup"] == "true";
              }
            } else {
              defaultDataStoreFormat = parameters["DataStoreFormat"];
              defaultRedlineGeometryType = geomTypes;
              if (parameters == null ? void 0 : parameters["AutoCreateOnStartup"])
                bCreateOnStartup = parameters["AutoCreateOnStartup"] == "true";
            }
          }
        }
        enableRedlineMessagePrompt((parameters == null ? void 0 : parameters["UseMapMessage"]) == "true");
        let url = ensureParameters(`${getFusionRoot()}/widgets/Redline/markupmain.php`, map.Name, map.SessionId, config.locale, true);
        url += "&POPUP=false";
        if (defaultDataStoreFormat != null && defaultRedlineGeometryType > 0) {
          url += `&REDLINEFORMAT=${defaultDataStoreFormat}`;
          url += `&REDLINEGEOMTYPE=${defaultRedlineGeometryType}`;
          url += `&AUTOCREATE=${bCreateOnStartup ? "1" : "0"}`;
        }
        url += `&REDLINESTYLIZATION=${bUseAdvancedStylization ? "ADVANCED" : "BASIC"}`;
        const cmdDef = buildTargetedCommand(config, parameters);
        openUrlInTarget(DefaultCommands.Redline, cmdDef, config.capabilities.hasTaskPane, dispatch, url);
      }
    }
  });
  registerCommand(DefaultCommands.FeatureInfo, {
    iconClass: SPRITE_FEATURE_INFO,
    selected: () => false,
    enabled: (state) => !state.stateless && CommandConditions.isNotBusy(state),
    invoke: (dispatch, getState, _viewer, parameters) => {
      const state = getState();
      const map = getRuntimeMap(state);
      const config = state.config;
      if (map) {
        const url = ensureParameters(`${getFusionRoot()}/widgets/FeatureInfo/featureinfomain.php`, map.Name, map.SessionId, config.locale, true);
        const cmdDef = buildTargetedCommand(config, parameters);
        openUrlInTarget(DefaultCommands.FeatureInfo, cmdDef, config.capabilities.hasTaskPane, dispatch, url);
      }
    }
  });
  registerCommand(DefaultCommands.Query, {
    iconClass: SPRITE_QUERY,
    selected: () => false,
    enabled: (state) => !state.stateless && CommandConditions.isNotBusy(state),
    invoke: (dispatch, getState, _viewer, parameters) => {
      const state = getState();
      const map = getRuntimeMap(state);
      const config = state.config;
      if (map) {
        const url = ensureParameters(`${getFusionRoot()}/widgets/Query/querymain.php`, map.Name, map.SessionId, config.locale, true);
        const cmdDef = buildTargetedCommand(config, parameters);
        openUrlInTarget(DefaultCommands.Query, cmdDef, config.capabilities.hasTaskPane, dispatch, url);
      }
    }
  });
  registerCommand(DefaultCommands.Theme, {
    iconClass: SPRITE_THEME,
    selected: () => false,
    enabled: (state) => !state.stateless && CommandConditions.isNotBusy(state),
    invoke: (dispatch, getState, _viewer, parameters) => {
      const state = getState();
      const map = getRuntimeMap(state);
      const config = state.config;
      if (map) {
        const url = ensureParameters(`${getFusionRoot()}/widgets/Theme/thememain.php`, map.Name, map.SessionId, config.locale, true);
        const cmdDef = buildTargetedCommand(config, parameters);
        openUrlInTarget(DefaultCommands.Theme, cmdDef, config.capabilities.hasTaskPane, dispatch, url);
      }
    }
  });
  registerCommand(DefaultCommands.CenterSelection, {
    iconClass: SPRITE_SELECT_CENTRE,
    selected: () => false,
    enabled: (state) => !state.stateless && CommandConditions.hasSelection(state),
    invoke: (dispatch, getState, viewer) => {
      var _a, _b;
      const state = getState();
      const mapName = state.config.activeMapName;
      if (mapName && viewer) {
        const mapState = state.mapState[mapName];
        const sf = (_b = (_a = mapState == null ? void 0 : mapState.mapguide) == null ? void 0 : _a.selectionSet) == null ? void 0 : _b.SelectedFeatures;
        if (sf) {
          let bbox;
          for (const layer of sf.SelectedLayer) {
            for (const f of layer.Feature.filter((f2) => f2.Bounds != null)) {
              const b = f.Bounds.split(" ").map((s) => parseFloat(s));
              if (!bbox) {
                bbox = b;
              } else {
                bbox = extend$1(bbox, b);
              }
            }
          }
          if (bbox) {
            const view = viewer.getViewForExtent(bbox);
            dispatch(setCurrentView(view));
          }
        }
      }
    }
  });
}
const ICON_LEGEND_LAYER = "layer";
const ICON_SELECT = "select";
const ICON_LC_UNSELECT = "disable";
const ICON_LEGEND_THEME = "multi-select";
const ICON_LEGEND_TOGGLE = "chevron-down";
const ICON_LEGEND_TOGGLE_EXPAND = "chevron-right";
const ICON_LEGEND_RASTER = "media";
const ICON_FOLDER_HORIZONTAL = "folder-close";
const ICON_CLEAR = "cross";
const ICON_SEARCH = "search";
const UL_LIST_STYLE = (baseSize) => ({ listStyle: "none", paddingLeft: baseSize + 4, marginTop: 2, marginBottom: 2 });
const LI_LIST_STYLE = { listStyle: "none", marginTop: 2, marginBottom: 2 };
const ROW_ITEM_ELEMENT_STYLE = { display: "inline-flex", alignItems: "center", verticalAlign: "middle" };
const CHK_STYLE = (baseSize) => ({ margin: 0, width: `${baseSize - 2}px`, height: `${baseSize - 2}px`, padding: 0, verticalAlign: "middle" });
const EMPTY_STYLE = (baseSize) => ({ display: "inline-block", margin: 0, width: `${baseSize}px`, height: `${baseSize}px`, verticalAlign: "middle" });
const EXTRAS_STYLE = (baseSize) => ({ display: "inline-block", margin: 0, width: `${baseSize}px`, height: `${baseSize}px`, verticalAlign: "middle" });
const LegendLabel = (props) => {
  var _a;
  const legendCtx = reactExports.useContext(LegendContext);
  let inner;
  const ft = (_a = legendCtx.getFilterText()) == null ? void 0 : _a.toLocaleLowerCase();
  if (legendCtx.isFiltering() && !strIsNullOrEmpty(ft)) {
    const idx = props.text.toLocaleLowerCase().indexOf(ft);
    if (idx >= 0) {
      inner = props.text.substring(0, idx);
      inner += `<span class='legend-label-highlight-text'>${props.text.substring(idx, idx + ft.length)}</span>`;
      inner += props.text.substring(idx + ft.length, props.text.length);
    } else {
      inner = props.text;
    }
  } else {
    inner = props.text;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "legend-label", style: { lineHeight: `${props.baseSize}px`, verticalAlign: "middle" }, dangerouslySetInnerHTML: { __html: purify.sanitize(inner) } });
};
function getIconUri(iconMimeType, iconBase64) {
  if (iconMimeType && iconBase64) {
    return `data:${iconMimeType};base64,${iconBase64}`;
  } else {
    return void 0;
  }
}
const EmptyNode = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: EMPTY_STYLE(props.baseSize), children: NBSP });
};
const RuleNode = (props) => {
  const icon = getIconUri(props.iconMimeType, props.rule.Icon);
  const label = props.rule.LegendLabel ? props.rule.LegendLabel : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "layer-rule-node", style: LI_LIST_STYLE, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyNode, { baseSize: props.baseSize }),
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { style: ROW_ITEM_ELEMENT_STYLE, src: icon }),
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx(LegendLabel, { baseSize: props.baseSize, text: label })
  ] });
};
const LayerNode = (props) => {
  var _a, _b;
  const { layer } = props;
  const { Icon: BpIcon } = useElementContext();
  const legendCtx = reactExports.useContext(LegendContext);
  const [layerVisible, setLayerVisible] = reactExports.useState(legendCtx.getLayerVisibility(props.layer));
  const label = layer.LegendLabel ? layer.LegendLabel : "";
  const iconMimeType = legendCtx.getIconMimeType();
  const onVisibilityChanged = (e) => {
    setLayerVisible(e.target.checked);
    legendCtx.setLayerVisibility(layer.ObjectId, e.target.checked);
  };
  const onToggleSelectability = (e) => {
    const selectable2 = getLayerSelectability(layer.ObjectId);
    legendCtx.setLayerSelectability(layer.ObjectId, !selectable2);
  };
  const getExpanded = () => {
    let expanded = legendCtx.getLayerExpanded(layer.ObjectId);
    if (expanded == null)
      expanded = layer.ExpandInLegend;
    return expanded;
  };
  const onToggleExpansion = (e) => {
    const expanded = getExpanded();
    legendCtx.setLayerExpanded(layer.ObjectId, !expanded);
  };
  const getLayerSelectability = (layerId) => {
    let selectable2 = legendCtx.getLayerSelectability(layerId);
    if (selectable2 == null) {
      selectable2 = layer.Selectable;
    }
    return selectable2;
  };
  let text = label;
  let icon = /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { baseSize: legendCtx.getBaseIconSize(), style: ROW_ITEM_ELEMENT_STYLE, children: (bs) => /* @__PURE__ */ jsxRuntimeExports.jsx(BpIcon, { icon: ICON_LEGEND_LAYER, iconSize: bs }) });
  let selectable;
  if (layer.Selectable === true) {
    selectable = /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { baseSize: legendCtx.getBaseIconSize(), style: ROW_ITEM_ELEMENT_STYLE, onClick: onToggleSelectability, children: (bs) => /* @__PURE__ */ jsxRuntimeExports.jsx(BpIcon, { icon: getLayerSelectability(layer.ObjectId) ? ICON_SELECT : ICON_LC_UNSELECT, iconSize: bs }) });
  }
  let chkbox;
  if (layer.Type == 1) {
    chkbox = /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        className: "layer-checkbox",
        style: CHK_STYLE(legendCtx.getBaseIconSize()),
        value: layer.ObjectId,
        onChange: onVisibilityChanged,
        checked: layerVisible
      }
    );
  }
  const tooltip = label;
  const nodeClassName = "layer-node";
  let nodeStyle = __spreadValues({ whiteSpace: "nowrap", overflow: "hidden" }, LI_LIST_STYLE);
  if (layer.ScaleRange) {
    for (const scaleRange of layer.ScaleRange) {
      if (scaleRange.FeatureStyle && scaleRange.FeatureStyle.length > 0) {
        const ruleElements = [];
        let body;
        let isExpanded = getExpanded();
        let totalRuleCount = 0;
        for (const fts of scaleRange.FeatureStyle) {
          totalRuleCount += fts.Rule.length;
        }
        if (isExpanded && totalRuleCount > 1) {
          icon = /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { baseSize: legendCtx.getBaseIconSize(), style: ROW_ITEM_ELEMENT_STYLE, children: (bs) => /* @__PURE__ */ jsxRuntimeExports.jsx(BpIcon, { icon: ICON_LEGEND_THEME, iconSize: bs }) });
          for (let fi = 0; fi < scaleRange.FeatureStyle.length; fi++) {
            const fts = scaleRange.FeatureStyle[fi];
            const ftsRuleCount = fts.Rule.length;
            let bCompressed = false;
            if (ftsRuleCount > 3) {
              bCompressed = !fts.Rule[1].Icon;
            }
            if (bCompressed) {
              ruleElements.push(/* @__PURE__ */ jsxRuntimeExports.jsx(RuleNode, { baseSize: legendCtx.getBaseIconSize(), iconMimeType, rule: fts.Rule[0] }, `layer-${layer.ObjectId}-style-${fi}-rule-first`));
              ruleElements.push(/* @__PURE__ */ jsxRuntimeExports.jsx("li", { style: LI_LIST_STYLE, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LegendLabel, { baseSize: legendCtx.getBaseIconSize(), text: tr("OTHER_THEME_RULE_COUNT", legendCtx.getLocale(), { count: ftsRuleCount - 2 }) }) }, `layer-${layer.ObjectId}-style-${fi}-rule-compressed`));
              ruleElements.push(/* @__PURE__ */ jsxRuntimeExports.jsx(RuleNode, { baseSize: legendCtx.getBaseIconSize(), iconMimeType, rule: fts.Rule[ftsRuleCount - 1] }, `layer-${layer.ObjectId}-style-${fi}-rule-last`));
            } else {
              for (let i = 0; i < ftsRuleCount; i++) {
                const rule = fts.Rule[i];
                ruleElements.push(/* @__PURE__ */ jsxRuntimeExports.jsx(RuleNode, { baseSize: legendCtx.getBaseIconSize(), iconMimeType, rule }, `layer-${layer.ObjectId}-style-${fi}-rule-${i}`));
              }
            }
          }
        } else {
          if (totalRuleCount > 1) {
            icon = /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { style: ROW_ITEM_ELEMENT_STYLE, baseSize: legendCtx.getBaseIconSize(), children: (bs) => /* @__PURE__ */ jsxRuntimeExports.jsx(BpIcon, { icon: ICON_LEGEND_THEME, iconSize: bs }) });
          } else {
            const uri = getIconUri(iconMimeType, scaleRange.FeatureStyle[0].Rule[0].Icon);
            if (uri) {
              icon = /* @__PURE__ */ jsxRuntimeExports.jsx(ImageIcon, { style: ROW_ITEM_ELEMENT_STYLE, url: uri });
            }
          }
        }
        if (ruleElements.length > 0) {
          body = /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: UL_LIST_STYLE(legendCtx.getBaseIconSize()), children: ruleElements });
        }
        let expanded;
        if (totalRuleCount > 1) {
          expanded = /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { baseSize: legendCtx.getBaseIconSize(), style: ROW_ITEM_ELEMENT_STYLE, onClick: onToggleExpansion, children: (bs) => /* @__PURE__ */ jsxRuntimeExports.jsx(BpIcon, { icon: isExpanded ? ICON_LEGEND_TOGGLE : ICON_LEGEND_TOGGLE_EXPAND, iconSize: bs }) });
        } else {
          expanded = /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyNode, { baseSize: legendCtx.getBaseIconSize() });
        }
        const mapName = legendCtx.getMapName();
        const session = legendCtx.getSessionId();
        let extras;
        if (mapName && session) {
          extras = ((_b = (_a = legendCtx.provideExtraLayerIconsHtml) == null ? void 0 : _a.call(legendCtx, { item: layer, mapName, session, sanitize: (html) => purify.sanitize(html), elementSize: legendCtx.getBaseIconSize() })) != null ? _b : []).map((html, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: EXTRAS_STYLE(legendCtx.getBaseIconSize()), dangerouslySetInnerHTML: { __html: html } }, `layer-${layer.ObjectId}-extras-${i}`));
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { title: tooltip, style: nodeStyle, className: nodeClassName, children: [
          expanded,
          " ",
          chkbox,
          " ",
          selectable,
          " ",
          extras,
          " ",
          icon,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(LegendLabel, { baseSize: legendCtx.getBaseIconSize(), text }),
          " ",
          body
        ] });
      } else {
        icon = /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { baseSize: legendCtx.getBaseIconSize(), style: ROW_ITEM_ELEMENT_STYLE, children: (bs) => /* @__PURE__ */ jsxRuntimeExports.jsx(BpIcon, { icon: ICON_LEGEND_RASTER, iconSize: bs }) });
      }
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { title: tooltip, style: nodeStyle, className: nodeClassName, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyNode, { baseSize: legendCtx.getBaseIconSize() }),
    " ",
    chkbox,
    " ",
    selectable,
    " ",
    icon,
    " ",
    label
  ] });
};
const ExternalLayerNode = ({ layer }) => {
  const { Icon: BpIcon } = useElementContext();
  const legendCtx = reactExports.useContext(LegendContext);
  const nodeClassName = "layer-node";
  const nodeStyle = __spreadValues({ whiteSpace: "nowrap", overflow: "hidden" }, LI_LIST_STYLE);
  const dispatch = useReduxDispatch();
  const onVisibilityChanged = (visible) => {
    const activeMapName = legendCtx.getMapName();
    if (activeMapName) {
      dispatch(setMapLayerVisibility(activeMapName, layer.name, visible));
    }
  };
  const chkbox = /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type: "checkbox",
      className: "layer-checkbox",
      style: CHK_STYLE(legendCtx.getBaseIconSize()),
      onChange: (e) => onVisibilityChanged(e.target.checked),
      checked: layer.visible
    }
  );
  let iconToUse = ICON_LEGEND_LAYER;
  if (layer.type == "WMS") {
    iconToUse = ICON_LEGEND_RASTER;
  }
  const icon = /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { baseSize: legendCtx.getBaseIconSize(), style: ROW_ITEM_ELEMENT_STYLE, children: (bs) => /* @__PURE__ */ jsxRuntimeExports.jsx(BpIcon, { icon: iconToUse, iconSize: bs }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: nodeStyle, className: nodeClassName, children: [
    chkbox,
    " ",
    icon,
    " ",
    layer.displayName
  ] });
};
const ExternalLayersGroupNode = ({ layers }) => {
  const { Icon: BpIcon } = useElementContext();
  const legendCtx = reactExports.useContext(LegendContext);
  if (layers.length == 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
  } else {
    const nodeClassName = "group-node";
    const icon = /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { baseSize: legendCtx.getBaseIconSize(), style: ROW_ITEM_ELEMENT_STYLE, children: (bs) => /* @__PURE__ */ jsxRuntimeExports.jsx(BpIcon, { icon: ICON_FOLDER_HORIZONTAL, iconSize: bs }) });
    const nodeStyle = __spreadValues({ whiteSpace: "nowrap", overflow: "hidden" }, LI_LIST_STYLE);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: nodeStyle, className: nodeClassName, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        icon,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(LegendLabel, { baseSize: legendCtx.getBaseIconSize(), text: tr("EXTERNAL_LAYERS", legendCtx.getLocale()) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: UL_LIST_STYLE(legendCtx.getBaseIconSize()), children: layers.map((layer, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLayerNode, { layer }, `external-layer=${layer.name}`)) })
    ] });
  }
};
const GroupNode = (props) => {
  var _a, _b;
  const { Icon: BpIcon } = useElementContext();
  const { group } = props;
  const legendCtx = reactExports.useContext(LegendContext);
  const getExpanded = () => {
    let expanded2 = legendCtx.getGroupExpanded(group.ObjectId);
    if (expanded2 == null)
      expanded2 = group.ExpandInLegend;
    return expanded2;
  };
  const onToggleExpansion = (e) => {
    const expanded2 = getExpanded();
    legendCtx.setGroupExpanded(group.ObjectId, !expanded2);
  };
  const onVisibilityChanged = (e) => {
    legendCtx.setGroupVisibility(group.ObjectId, e.target.checked);
  };
  const currentScale = legendCtx.getCurrentScale();
  const tree = legendCtx.getTree();
  const icon = /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { baseSize: legendCtx.getBaseIconSize(), style: ROW_ITEM_ELEMENT_STYLE, children: (bs) => /* @__PURE__ */ jsxRuntimeExports.jsx(BpIcon, { icon: ICON_FOLDER_HORIZONTAL, iconSize: bs }) });
  const isExpanded = getExpanded();
  const expanded = /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { baseSize: legendCtx.getBaseIconSize(), style: ROW_ITEM_ELEMENT_STYLE, onClick: onToggleExpansion, children: (bs) => /* @__PURE__ */ jsxRuntimeExports.jsx(BpIcon, { icon: isExpanded ? ICON_LEGEND_TOGGLE : ICON_LEGEND_TOGGLE_EXPAND, iconSize: bs }) });
  const chkbox = /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "group-checkbox", style: CHK_STYLE(legendCtx.getBaseIconSize()), value: group.ObjectId, onChange: onVisibilityChanged, checked: legendCtx.getGroupVisibility(group) });
  const tooltip = group.LegendLabel;
  const nodeClassName = "group-node";
  let nodeStyle = __spreadValues({ whiteSpace: "nowrap", overflow: "hidden" }, LI_LIST_STYLE);
  const mapName = legendCtx.getMapName();
  const session = legendCtx.getSessionId();
  let extras;
  if (mapName && session) {
    extras = ((_b = (_a = legendCtx.provideExtraGroupIconsHtml) == null ? void 0 : _a.call(legendCtx, { item: group, mapName, session, sanitize: (html) => purify.sanitize(html), elementSize: legendCtx.getBaseIconSize() })) != null ? _b : []).map((html, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: EXTRAS_STYLE(legendCtx.getBaseIconSize()), dangerouslySetInnerHTML: { __html: html } }, `group-${group.ObjectId}-extras-${i}`));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { title: tooltip, style: nodeStyle, className: nodeClassName, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      expanded,
      " ",
      chkbox,
      " ",
      extras,
      " ",
      icon,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(LegendLabel, { baseSize: legendCtx.getBaseIconSize(), text: group.LegendLabel })
    ] }),
    (() => {
      if (isExpanded && props.childItems.length > 0) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: UL_LIST_STYLE(legendCtx.getBaseIconSize()), children: props.childItems.map((item) => {
          if (item.DisplayInLegend === true) {
            if (isLayer(item)) {
              if (isLayerVisibleAtScale(item, currentScale, legendCtx.stateless)) {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(LayerNode, { layer: item }, item.ObjectId);
              }
            } else {
              if (isGroupVisibleAtScale(item, tree, currentScale, legendCtx.stateless)) {
                const children = tree.groupChildren[item.ObjectId] || [];
                return /* @__PURE__ */ jsxRuntimeExports.jsx(GroupNode, { group: item, childItems: children }, item.ObjectId);
              }
            }
          }
        }) });
      }
    })()
  ] });
};
function isLayerVisibleAtScale(layer, scale, stateless) {
  if (layer.ScaleRange) {
    for (const sr of layer.ScaleRange) {
      if (scaleRangeBetween(scale, sr.MinScale, sr.MaxScale)) {
        return true;
      }
    }
  } else {
    if (stateless) {
      return true;
    }
  }
  return false;
}
function isGroupVisibleAtScale(group, tree, scale, stateless) {
  const children = tree.groupChildren[group.ObjectId] || [];
  for (const child of children) {
    if (isLayer(child)) {
      if (isLayerVisibleAtScale(child, scale, stateless)) {
        return true;
      }
    } else {
      if (isGroupVisibleAtScale(child, tree, scale, stateless)) {
        return true;
      }
    }
  }
  if (stateless) {
    return true;
  }
  return false;
}
function itemTextFilter(items, text) {
  const filtered = items.map((i) => {
    if (isLayer(i)) {
      if (i.LegendLabel.toLocaleLowerCase().indexOf(text) < 0) {
        return null;
      }
      return i;
    } else {
      return i;
    }
  }).filter((i) => i != null);
  return filtered;
}
function buildFilteredTree(tree, text) {
  const filtered = {
    root: itemTextFilter(tree.root, text),
    groupChildren: {}
  };
  const keys = Object.keys(tree.groupChildren);
  for (const oid of keys) {
    filtered.groupChildren[oid] = itemTextFilter(tree.groupChildren[oid], text);
  }
  return filtered;
}
function setupTree(map) {
  var _a, _b;
  const state = {
    Layers: (_a = map == null ? void 0 : map.Layer) != null ? _a : [],
    Groups: (_b = map == null ? void 0 : map.Group) != null ? _b : [],
    LayerMap: {},
    GroupMap: {},
    tree: {
      root: [],
      groupChildren: {}
    }
  };
  if (map == null ? void 0 : map.Layer) {
    for (const layer of map.Layer) {
      state.LayerMap[layer.ObjectId] = layer;
    }
  }
  if (map == null ? void 0 : map.Group) {
    for (const group2 of map.Group) {
      state.GroupMap[group2.ObjectId] = group2;
    }
  }
  const { Layers, Groups, LayerMap, GroupMap } = state;
  const { root, groupChildren } = state.tree;
  if (Groups) {
    const remainingGroups = {};
    for (const group2 of Groups) {
      groupChildren[group2.ObjectId] = [];
      if (group2.ParentId) {
        remainingGroups[group2.ObjectId] = group2;
        continue;
      }
      root.push(group2);
    }
    var itemCount = 0;
    for (const objId in remainingGroups) {
      itemCount++;
    }
    while (itemCount > 0) {
      var removeIds = [];
      for (const objId in remainingGroups) {
        var group = remainingGroups[objId];
        if (typeof groupChildren[group.ParentId] != "undefined") {
          if (typeof groupChildren[group.ObjectId] != "undefined") {
            groupChildren[group.ObjectId] = [];
          }
          groupChildren[group.ParentId].push(group);
          removeIds.push(group.ObjectId);
        }
      }
      for (const id of removeIds) {
        delete remainingGroups[id];
      }
      itemCount = 0;
      for (const objId in remainingGroups) {
        itemCount++;
      }
    }
  }
  if (Layers) {
    for (const layer of Layers) {
      if (layer.ParentId) {
        if (typeof groupChildren[layer.ParentId] === "undefined") {
          groupChildren[layer.ParentId] = [];
        }
        groupChildren[layer.ParentId].push(layer);
      } else {
        root.push(layer);
      }
    }
  }
  return state;
}
const DEFAULT_ICON_SIZE = 16;
const FILTER_BUTTON_STYLE = { position: "absolute", right: 0, top: 0 };
const Legend = (
  /*React.memo(*/
  (props) => {
    var _a, _b;
    const { Button, Card, InputGroup, Heading, MenuComponent } = useElementContext();
    const {
      showGroups,
      hideGroups,
      showLayers,
      hideLayers,
      currentScale,
      externalBaseLayers,
      onBaseLayerChanged,
      maxHeight,
      map
    } = props;
    const [state, setState] = reactExports.useState(setupTree(map));
    const { tree: _tree } = state;
    const [isFiltering, setIsFiltering] = reactExports.useState(false);
    const [filterText, setFilterText] = reactExports.useState("");
    const [filteredTree, setFilteredTree] = reactExports.useState(void 0);
    const [showInvisibleLayers, setShowInvisibleLayers] = reactExports.useState(false);
    const [contextMenu, setContextMenu] = reactExports.useState(void 0);
    reactExports.useEffect(() => {
      onExitFilterMode();
      const tree = setupTree(map);
      setState(tree);
    }, [map]);
    const onEnterFilterMode = reactExports.useCallback(() => {
      setIsFiltering(true);
      setFilterText("");
      setFilteredTree(_tree);
    }, []);
    const onExitFilterMode = reactExports.useCallback(() => {
      setIsFiltering(false);
      setFilterText("");
      setFilteredTree(void 0);
    }, []);
    const onFilterUpdate = reactExports.useCallback((text) => {
      setFilterText(text);
      if (strIsNullOrEmpty(text)) {
        setFilteredTree(_tree);
      } else {
        setFilteredTree(buildFilteredTree(_tree, text.toLocaleLowerCase()));
      }
    }, [_tree]);
    const getLayerSelectability = reactExports.useCallback((layerId) => {
      var _a2;
      const items = (_a2 = props.overrideSelectableLayers) != null ? _a2 : {};
      return items[layerId];
    }, [props.overrideSelectableLayers]);
    const setLayerSelectability = reactExports.useCallback((layerId, selectable) => {
      var _a2;
      (_a2 = props.onLayerSelectabilityChanged) == null ? void 0 : _a2.call(props, layerId, selectable);
    }, [props.onLayerSelectabilityChanged]);
    const getGroupExpanded = reactExports.useCallback((groupId) => {
      var _a2;
      const items = (_a2 = props.overrideExpandedItems) != null ? _a2 : {};
      return items[groupId];
    }, [props.overrideExpandedItems]);
    const setGroupExpanded2 = reactExports.useCallback((groupId, expanded) => {
      var _a2;
      (_a2 = props.onGroupExpansionChanged) == null ? void 0 : _a2.call(props, groupId, expanded);
    }, [props.onGroupExpansionChanged]);
    const getLayerExpanded = reactExports.useCallback((layerId) => {
      var _a2;
      const items = (_a2 = props.overrideExpandedItems) != null ? _a2 : {};
      return items[layerId];
    }, [props.overrideExpandedItems]);
    const setLayerExpanded = reactExports.useCallback((layerId, expanded) => {
      var _a2;
      (_a2 = props.onGroupExpansionChanged) == null ? void 0 : _a2.call(props, layerId, expanded);
    }, [props.onGroupExpansionChanged]);
    const getGroupVisibility = reactExports.useCallback((group) => {
      let visible = group.Visible;
      if (showGroups && showGroups.indexOf(group.ObjectId) >= 0) {
        visible = true;
      } else if (hideGroups && hideGroups.indexOf(group.ObjectId) >= 0) {
        visible = false;
      }
      return visible;
    }, [showGroups, hideGroups]);
    const getLayerVisibility = reactExports.useCallback((layer) => {
      let visible = layer.Visible;
      if (showLayers && showLayers.indexOf(layer.ObjectId) >= 0) {
        visible = true;
      } else if (hideLayers && hideLayers.indexOf(layer.ObjectId) >= 0) {
        visible = false;
      }
      return visible;
    }, [showLayers, hideLayers]);
    const setGroupVisibility2 = reactExports.useCallback((groupId, visible) => {
      var _a2;
      (_a2 = props.onGroupVisibilityChanged) == null ? void 0 : _a2.call(props, groupId, visible);
    }, [props.onGroupVisibilityChanged]);
    const setLayerVisibility2 = reactExports.useCallback((layerId, visible) => {
      var _a2;
      (_a2 = props.onLayerVisibilityChanged) == null ? void 0 : _a2.call(props, layerId, visible);
    }, [props.onLayerVisibilityChanged]);
    const getIconMimeType = reactExports.useCallback(() => {
      var _a2;
      return ((_a2 = props.map) == null ? void 0 : _a2.IconMimeType) ? `${props.map.IconMimeType}` : void 0;
    }, [(_a = props.map) == null ? void 0 : _a.IconMimeType]);
    const getChildren = reactExports.useCallback((objectId) => {
      var _a2;
      return (_a2 = _tree.groupChildren[objectId]) != null ? _a2 : [];
    }, [_tree]);
    const onExpandAll = reactExports.useCallback(() => {
      var _a2, _b2;
      if (map == null ? void 0 : map.Layer) {
        for (const layer of map.Layer) {
          (_a2 = props.onGroupExpansionChanged) == null ? void 0 : _a2.call(props, layer.ObjectId, true);
        }
      }
      if (map == null ? void 0 : map.Group) {
        for (const group of map.Group) {
          (_b2 = props.onGroupExpansionChanged) == null ? void 0 : _b2.call(props, group.ObjectId, true);
        }
      }
      setContextMenu(void 0);
    }, [map, props.onGroupExpansionChanged]);
    const onCollapseAll = reactExports.useCallback(() => {
      var _a2, _b2;
      if (map == null ? void 0 : map.Layer) {
        for (const layer of map.Layer) {
          (_a2 = props.onGroupExpansionChanged) == null ? void 0 : _a2.call(props, layer.ObjectId, false);
        }
      }
      if (map == null ? void 0 : map.Group) {
        for (const group of map.Group) {
          (_b2 = props.onGroupExpansionChanged) == null ? void 0 : _b2.call(props, group.ObjectId, false);
        }
      }
      setContextMenu(void 0);
    }, [map, props.onGroupExpansionChanged]);
    const onSetAllSelectable = reactExports.useCallback((selectable) => {
      var _a2;
      if (map == null ? void 0 : map.Layer) {
        for (const layer of map.Layer) {
          if (layer.Selectable) {
            (_a2 = props.onLayerSelectabilityChanged) == null ? void 0 : _a2.call(props, layer.ObjectId, selectable);
          }
        }
      }
      setContextMenu(void 0);
    }, [map, props.onLayerSelectabilityChanged]);
    const onContextMenuHandler = reactExports.useCallback((e) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
    }, []);
    const onCloseContextMenu = reactExports.useCallback(() => {
      setContextMenu(void 0);
    }, []);
    reactExports.useEffect(() => {
      if (!contextMenu) return;
      const handler = () => setContextMenu(void 0);
      const timerId = setTimeout(() => {
        document.addEventListener("mousedown", handler);
      }, 0);
      return () => {
        clearTimeout(timerId);
        document.removeEventListener("mousedown", handler);
      };
    }, [contextMenu]);
    const rootStyle = {
      position: "relative"
    };
    if (maxHeight) {
      rootStyle.maxHeight = maxHeight;
    }
    const providerImpl = {
      stateless: props.stateless,
      isFiltering: () => isFiltering,
      getFilterText: () => filterText,
      getLocale: () => props.locale,
      getMapName: () => props.activeMapName,
      getSessionId: () => {
        var _a2;
        return (_a2 = props.map) == null ? void 0 : _a2.SessionId;
      },
      getBaseIconSize: () => {
        var _a2;
        return (_a2 = props.baseIconSize) != null ? _a2 : DEFAULT_ICON_SIZE;
      },
      getIconMimeType,
      getChildren,
      getCurrentScale: () => props.currentScale,
      getTree: () => isFiltering && filteredTree ? filteredTree : state.tree,
      getGroupVisibility,
      getLayerVisibility,
      setGroupVisibility: setGroupVisibility2,
      setLayerVisibility: setLayerVisibility2,
      getLayerSelectability,
      setLayerSelectability,
      getGroupExpanded,
      setGroupExpanded: setGroupExpanded2,
      getLayerExpanded,
      setLayerExpanded,
      provideExtraGroupIconsHtml: props.provideExtraGroupIconsHtml,
      provideExtraLayerIconsHtml: props.provideExtraLayerIconsHtml
    };
    const daTree = providerImpl.getTree();
    const rootItems = daTree.root;
    const contextMenuItems = reactExports.useMemo(() => {
      const items = [];
      if (props.onRefresh) {
        items.push({
          label: tr("LEGEND_CONTEXT_MENU_REFRESH", props.locale),
          invoke: () => {
            var _a2;
            (_a2 = props.onRefresh) == null ? void 0 : _a2.call(props);
            setContextMenu(void 0);
          }
        });
        items.push({ isSeparator: true });
      }
      items.push({
        label: tr("LEGEND_CONTEXT_MENU_EXPAND_ALL", props.locale),
        invoke: onExpandAll
      });
      items.push({
        label: tr("LEGEND_CONTEXT_MENU_COLLAPSE_ALL", props.locale),
        invoke: onCollapseAll
      });
      items.push({ isSeparator: true });
      items.push({
        label: tr("LEGEND_CONTEXT_MENU_ALL_SELECTABLE", props.locale),
        invoke: () => onSetAllSelectable(true)
      });
      items.push({
        label: tr("LEGEND_CONTEXT_MENU_ALL_UNSELECTABLE", props.locale),
        invoke: () => onSetAllSelectable(false)
      });
      items.push({ isSeparator: true });
      items.push({
        label: showInvisibleLayers ? tr("LEGEND_CONTEXT_MENU_HIDE_INVISIBLE_LAYERS", props.locale) : tr("LEGEND_CONTEXT_MENU_SHOW_INVISIBLE_LAYERS", props.locale),
        invoke: () => {
          setShowInvisibleLayers((v) => !v);
          setContextMenu(void 0);
        }
      });
      return items;
    }, [props.onRefresh, props.locale, onExpandAll, onCollapseAll, onSetAllSelectable, showInvisibleLayers]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LegendContext.Provider, { value: providerImpl, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: rootStyle, onContextMenu: onContextMenuHandler, children: [
      contextMenu && document.body && reactDomExports.createPortal(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "mg-legend-context-menu",
            style: { position: "fixed", top: contextMenu.y, left: contextMenu.x, zIndex: 9999 },
            onMouseDown: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(MenuComponent, { items: contextMenuItems, onInvoked: onCloseContextMenu })
          }
        ),
        document.body
      ),
      (() => {
        if (externalBaseLayers != null && externalBaseLayers.length > 0 && props.inlineBaseLayerSwitcher) {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { style: { marginBottom: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 5, children: tr("EXTERNAL_BASE_LAYERS", props.locale) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BaseLayerSwitcher, { locale: props.locale, externalBaseLayers, onBaseLayerChanged })
          ] });
        }
      })(),
      (() => {
        if (isFiltering) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputGroup,
            {
              round: true,
              autoFocus: true,
              leftIcon: ICON_SEARCH,
              placeholder: tr("LEGEND_FILTER_LAYERS", props.locale),
              onChange: (e) => onFilterUpdate(e.target.value),
              rightElement: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  minimal: true,
                  icon: ICON_CLEAR,
                  onClick: onExitFilterMode
                }
              )
            }
          );
        } else {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onEnterFilterMode, title: tr("LEGEND_FILTER_LAYERS", props.locale), icon: ICON_SEARCH, style: FILTER_BUTTON_STYLE });
        }
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: UL_LIST_STYLE((_b = props.baseIconSize) != null ? _b : DEFAULT_ICON_SIZE), children: [
        rootItems.map((item) => {
          if (item.DisplayInLegend === true) {
            if (isLayer(item)) {
              if (showInvisibleLayers || isLayerVisibleAtScale(item, currentScale, props.stateless)) {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(LayerNode, { layer: item }, item.ObjectId);
              }
            } else {
              const bGroupVisAtScale = isGroupVisibleAtScale(item, daTree, currentScale, props.stateless);
              let bGroupVisFilter = false;
              if (providerImpl.isFiltering()) {
                const bInFilter = item.LegendLabel.toLocaleLowerCase().indexOf(providerImpl.getFilterText().toLocaleLowerCase()) >= 0;
                if (bInFilter) {
                  bGroupVisFilter = true;
                }
              }
              if (showInvisibleLayers || bGroupVisAtScale || bGroupVisFilter) {
                const children = daTree.groupChildren[item.ObjectId] || [];
                return /* @__PURE__ */ jsxRuntimeExports.jsx(GroupNode, { group: item, childItems: children }, item.ObjectId);
              }
            }
          }
        }),
        props.externalLayers && /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLayersGroupNode, { layers: props.externalLayers })
      ] })
    ] }) });
  }
);
const LegendContainer = (props) => {
  const { maxHeight, inlineBaseLayerSwitcher } = props;
  const dispatch = useReduxDispatch();
  const activeMapName = useActiveMapName();
  const locale = useViewerLocale();
  const map = useActiveMapState();
  const view = useActiveMapView();
  const showGroups = useActiveMapShowGroups();
  const showLayers = useActiveMapShowLayers();
  const hideGroups = useActiveMapHideGroups();
  const hideLayers = useActiveMapHideLayers();
  const expandedGroups = useActiveMapExpandedGroups();
  const selectableLayers = useActiveMapSelectableLayers();
  const externalBaseLayers = useActiveMapExternalBaseLayers();
  const stateless = useViewerIsStateless();
  const appContext = reactExports.useContext(AppContext);
  const setBaseLayerAction = reactExports.useCallback((mapName, layerName) => dispatch(setBaseLayer(mapName, layerName)), [dispatch]);
  const setGroupVisibilityAction = reactExports.useCallback((mapName, options) => dispatch(setGroupVisibility(mapName, options)), [dispatch]);
  const setLayerVisibilityAction = reactExports.useCallback((mapName, options) => dispatch(setLayerVisibility(mapName, options)), [dispatch]);
  const setLayerSelectableAction = reactExports.useCallback((mapName, options) => dispatch(setLayerSelectable(mapName, options)), [dispatch]);
  const setGroupExpandedAction = reactExports.useCallback((mapName, options) => dispatch(setGroupExpanded(mapName, options)), [dispatch]);
  const layers = useActiveMapLayers();
  const onLayerSelectabilityChanged = reactExports.useCallback((id, selectable) => {
    if (activeMapName) {
      setLayerSelectableAction == null ? void 0 : setLayerSelectableAction(activeMapName, { id, value: selectable });
    }
  }, [setLayerSelectableAction, activeMapName]);
  const onGroupExpansionChanged = reactExports.useCallback((id, expanded) => {
    if (setGroupExpandedAction && activeMapName) {
      setGroupExpandedAction(activeMapName, { id, value: expanded });
    }
  }, [setGroupExpandedAction, activeMapName]);
  const onGroupVisibilityChanged = reactExports.useCallback((groupId, visible) => {
    if (setGroupVisibilityAction && activeMapName) {
      setGroupVisibilityAction(activeMapName, { id: groupId, value: visible });
    }
  }, [setGroupVisibilityAction, activeMapName]);
  const onLayerVisibilityChanged = reactExports.useCallback((layerId, visible) => {
    if (setLayerVisibilityAction && activeMapName) {
      setLayerVisibilityAction(activeMapName, { id: layerId, value: visible });
    }
  }, [setLayerVisibilityAction, activeMapName]);
  const onBaseLayerChanged = reactExports.useCallback((layerName) => {
    if (setBaseLayerAction && activeMapName) {
      setBaseLayerAction(activeMapName, layerName);
    }
  }, [setBaseLayerAction, activeMapName]);
  const onRefresh = reactExports.useCallback(() => {
    dispatch(refresh());
  }, [dispatch]);
  if ((map || layers) && view) {
    let scale = view.scale;
    if (scale || layers) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Legend,
        {
          map,
          activeMapName,
          stateless,
          maxHeight,
          currentScale: scale,
          externalLayers: layers,
          showLayers,
          showGroups,
          hideLayers,
          hideGroups,
          locale,
          inlineBaseLayerSwitcher: !!inlineBaseLayerSwitcher,
          externalBaseLayers,
          onBaseLayerChanged,
          overrideSelectableLayers: selectableLayers,
          overrideExpandedItems: expandedGroups,
          onLayerSelectabilityChanged,
          onGroupExpansionChanged,
          onGroupVisibilityChanged,
          onLayerVisibilityChanged,
          onRefresh,
          provideExtraLayerIconsHtml: appContext.getLegendLayerExtraIconsProvider,
          provideExtraGroupIconsHtml: appContext.getLegendGroupExtraIconsProvider
        }
      );
    } else {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: tr("LOADING_MSG", locale) });
    }
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: tr("LOADING_MSG", locale) });
  }
};
function isSelectedFeatureSet(ss) {
  return ss.SelectedLayer;
}
function countSelection(mgSelection, clientSelection) {
  var _a, _b, _c, _d, _e, _f, _g;
  const summary = { total: 0, layerCount: 0 };
  if (mgSelection) {
    if (isSelectedFeatureSet(mgSelection)) {
      summary.layerCount = mgSelection.SelectedLayer.length;
      for (const lyr of mgSelection.SelectedLayer) {
        summary.total += (_b = (_a = lyr.Feature) == null ? void 0 : _a.length) != null ? _b : 0;
      }
    } else {
      summary.layerCount = mgSelection.Layer.length;
      for (const lyr of mgSelection.Layer) {
        summary.total += (_e = (_d = (_c = lyr.Class) == null ? void 0 : _c.ID) == null ? void 0 : _d.length) != null ? _e : 0;
      }
    }
  }
  if (clientSelection) {
    summary.layerCount = clientSelection.layers.length;
    for (const lyr of clientSelection.layers) {
      summary.total += (_g = (_f = lyr.features) == null ? void 0 : _f.length) != null ? _g : 0;
    }
  }
  if (summary.total == 0 && summary.layerCount == 0) {
    return void 0;
  }
  return summary;
}
const SelectedFeatureCount = (props) => {
  const format = props.format || tr("FMT_SELECTION_COUNT", props.locale);
  let label;
  if (props.summary) {
    label = fmt(format, props.summary);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "status-bar-component component-selected-feature-count", style: props.style, children: label });
};
const SelectedFeatureCountContainer = (props) => {
  const { style } = props;
  const selection = useActiveMapSelectionSet();
  const clientSelection = useActiveMapClientSelectionSet();
  const locale = useViewerLocale();
  const summary = countSelection(selection == null ? void 0 : selection.FeatureSet, clientSelection);
  if (summary) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectedFeatureCount, { locale, style, summary });
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {});
  }
};
const DefaultSelectedFeature = (props) => {
  const { selectedFeature, selectedLayer, layerName, locale, allowHtmlValues, cleanHTML, formatPropertyValue } = props;
  const { HtmlTable } = useElementContext();
  const featureProps = [];
  if (selectedLayer == null ? void 0 : selectedLayer.Property) {
    for (const lp of selectedLayer.Property) {
      const matches = selectedFeature.Property.filter((fp) => fp.Name === lp.DisplayName);
      if (matches.length === 1) {
        featureProps.push(matches[0]);
      }
    }
  } else {
    for (const fp of selectedFeature.Property) {
      featureProps.push(fp);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(HtmlTable, { condensed: true, bordered: true, className: "selection-panel-property-grid", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: tr("SELECTION_PROPERTY", locale) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: tr("SELECTION_VALUE", locale) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: featureProps.map((prop) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "property-name-cell", "data-property-name": prop.Name, children: prop.Name }),
        (() => {
          const context = { propertyName: prop.Name, layerName };
          let value = prop.Value;
          if (formatPropertyValue && !strIsNullOrEmpty(value)) {
            value = formatPropertyValue(value, context);
          }
          if (allowHtmlValues && !strIsNullOrEmpty(value)) {
            if (cleanHTML) {
              value = cleanHTML(value, context);
            } else {
              value = purify.sanitize(value);
            }
            return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "property-value-cell", "data-property-value-for": prop.Name, dangerouslySetInnerHTML: { __html: value } });
          } else {
            return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "property-value-cell", "data-property-value-for": prop.Name, children: value });
          }
        })()
      ] }, prop.Name);
    }) })
  ] });
};
function buildToolbarItems(selPanel) {
  return [
    {
      svgIconName: "arrow-left",
      tooltip: tr("SELECTION_PREV_FEATURE", selPanel.locale),
      enabled: () => selPanel.canGoPrev(),
      invoke: () => selPanel.prevFeature()
    },
    {
      svgIconName: "arrow-right",
      tooltip: tr("SELECTION_NEXT_FEATURE", selPanel.locale),
      enabled: () => selPanel.canGoNext(),
      invoke: () => selPanel.nextFeature()
    },
    { isSeparator: true },
    {
      svgIconName: "path-search",
      tooltip: tr("SELECTION_ZOOMTO_FEATURE", selPanel.locale),
      enabled: () => selPanel.canZoomSelectedFeature(),
      invoke: () => selPanel.zoomSelectedFeature()
    }
  ];
}
const SELECTION_TOOLBAR_STYLE = { float: "right", height: DEFAULT_TOOLBAR_SIZE };
const SELECTION_PANEL_TOOLBAR_STYLE = { height: DEFAULT_TOOLBAR_SIZE, backgroundColor: TOOLBAR_BACKGROUND_COLOR };
const LAYER_COMBO_STYLE = { float: "left", height: DEFAULT_TOOLBAR_SIZE };
const FloatClear = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { clear: "both" } });
const SelectionPanel = reactExports.memo((props) => {
  const { Callout } = useElementContext();
  const {
    maxHeight,
    selection,
    selectedFeatureRenderer,
    allowHtmlValues,
    cleanHTML,
    formatPropertyValue,
    onShowSelectedFeature,
    onRequestZoomToFeature
  } = props;
  const [selectedLayerIndex, setSelectedLayerIndex] = reactExports.useState(-1);
  const [featureIndex, setFeatureIndex] = reactExports.useState(-1);
  reactExports.useEffect(() => {
    if (selection.getLayerCount() > 0) {
      if (selectedLayerIndex < 0) {
        setSelectedLayerIndex(0);
        setFeatureIndex(0);
      } else {
        const sl = selection.getLayerAt(selectedLayerIndex);
        if (!sl) {
          setSelectedLayerIndex(0);
          setFeatureIndex(0);
        } else {
          if (featureIndex < 0 && sl.getFeatureCount() > 0) {
            setFeatureIndex(0);
          }
        }
      }
    }
  }, [selection]);
  const getCurrentLayer = () => {
    return selection.getLayerAt(selectedLayerIndex);
  };
  const getFeatureAt = (index2) => {
    return selection.getFeatureAt(selectedLayerIndex, index2);
  };
  const getCurrentFeature = () => {
    return getFeatureAt(featureIndex);
  };
  const canGoPrev = () => {
    return featureIndex > 0;
  };
  const canGoNext = () => {
    const layer = getCurrentLayer();
    if (layer != null) {
      return featureIndex + 1 < layer.getFeatureCount();
    }
    return false;
  };
  const canZoomSelectedFeature = () => {
    const feat2 = getCurrentFeature();
    return (feat2 == null ? void 0 : feat2.Bounds) != null;
  };
  const prevFeature = () => {
    var _a;
    const newIndex = featureIndex - 1;
    setFeatureIndex(newIndex);
    const layer = getCurrentLayer();
    if (layer) {
      const layerId = layer.getLayerId();
      const sKey = (_a = getFeatureAt(newIndex)) == null ? void 0 : _a.SelectionKey;
      if (sKey && layerId) {
        onShowSelectedFeature == null ? void 0 : onShowSelectedFeature(layerId, sKey);
      }
    }
  };
  const nextFeature = () => {
    var _a;
    const newIndex = featureIndex + 1;
    setFeatureIndex(newIndex);
    const layer = getCurrentLayer();
    if (layer) {
      const layerId = layer.getLayerId();
      const sKey = (_a = getFeatureAt(newIndex)) == null ? void 0 : _a.SelectionKey;
      if (sKey && layerId) {
        onShowSelectedFeature == null ? void 0 : onShowSelectedFeature(layerId, sKey);
      }
    }
  };
  const zoomSelectedFeature = () => {
    const feat2 = getCurrentFeature();
    if (feat2) {
      onRequestZoomToFeature(feat2);
    }
  };
  const onSelectedLayerChanged = (index2) => {
    setSelectedLayerIndex(index2);
    setFeatureIndex(0);
  };
  const locale = props.locale || DEFAULT_LOCALE;
  let feat;
  let meta;
  let layerName;
  if (selection != null && selectedLayerIndex >= 0 && featureIndex >= 0) {
    const selLayer = selection.getLayerAt(selectedLayerIndex);
    feat = selLayer == null ? void 0 : selLayer.getFeatureAt(featureIndex);
    meta = selLayer == null ? void 0 : selLayer.getLayerMetadata();
    layerName = selLayer == null ? void 0 : selLayer.getName();
  }
  const selectionPanelRootStyle = {};
  let selBodyStyle;
  if (maxHeight) {
    selectionPanelRootStyle.overflow = "hidden";
    selBodyStyle = {
      overflowY: "auto",
      maxHeight: maxHeight - DEFAULT_TOOLBAR_SIZE
    };
  } else {
    selectionPanelRootStyle.position = "relative";
    selectionPanelRootStyle.width = "100%";
    selectionPanelRootStyle.height = "100%";
    selectionPanelRootStyle.overflow = "hidden";
    selBodyStyle = {
      overflow: "auto",
      position: "absolute",
      top: DEFAULT_TOOLBAR_SIZE,
      bottom: 0,
      right: 0,
      left: 0
    };
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: selectionPanelRootStyle, children: [
    (() => {
      if ((selection == null ? void 0 : selection.getLayerCount()) > 0) {
        const selectionToolbarItems = buildToolbarItems({
          locale,
          canGoPrev,
          canGoNext,
          prevFeature,
          nextFeature,
          canZoomSelectedFeature,
          zoomSelectedFeature
        });
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "selection-panel-toolbar", style: SELECTION_PANEL_TOOLBAR_STYLE, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TypedSelect,
            {
              extraClassNames: "selection-panel-layer-selector",
              value: selectedLayerIndex,
              style: LAYER_COMBO_STYLE,
              onChange: onSelectedLayerChanged,
              keyFunc: (item) => `selected-layer-${item.value}`,
              items: selection.getLayers().map((layer, index2) => {
                var _a, _b;
                const lid = layer.getLayerId();
                const lname = layer.getName();
                const label = lid ? (_b = (_a = props == null ? void 0 : props.onResolveLayerLabel) == null ? void 0 : _a.call(props, lid, lname)) != null ? _b : lname : lname;
                return { value: index2, label };
              })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Toolbar, { childItems: selectionToolbarItems, containerStyle: SELECTION_TOOLBAR_STYLE }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatClear, {})
        ] });
      }
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "selection-panel-body", style: selBodyStyle, children: (() => {
      if (feat) {
        if (selectedFeatureRenderer) {
          return selectedFeatureRenderer({ selectedFeature: feat, cleanHTML, formatPropertyValue, allowHtmlValues, selectedLayer: meta, layerName, locale });
        } else {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultSelectedFeature, { selectedFeature: feat, cleanHTML, formatPropertyValue, allowHtmlValues, selectedLayer: meta, layerName, locale });
        }
      } else if (!((selection == null ? void 0 : selection.getLayerCount()) > 0)) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Callout, { variant: "primary", icon: "info-sign", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "selection-panel-no-selection", children: tr("NO_SELECTED_FEATURES", locale) }) });
      }
    })() })
  ] });
});
const selectorContainerStyle = { display: "flex", alignItems: "center", gap: 6, marginBottom: 8 };
const selectorLabelStyle = { whiteSpace: "nowrap" };
const selectorSelectStyle = { flex: 1 };
const swipeSelectionRootStyle = { display: "flex", flexDirection: "column", height: "100%" };
const swipeSelectionPanelSlotStyle = { position: "relative", flex: 1, minHeight: 0 };
const SelectionPanelContainer = (props) => {
  var _a, _b, _c;
  const { Callout } = useElementContext();
  const { maxHeight, selectedFeatureRenderer } = props;
  const locale = useViewerLocale();
  const dispatch = useReduxDispatch();
  const activeMapName = useActiveMapName();
  const isComparisonActive = useIsComparisonActive();
  const comparisonInfo = useMapComparisonInfo();
  const [selectedMapForSelection, setSelectedMapForSelection] = reactExports.useState(activeMapName);
  reactExports.useEffect(() => {
    if (!isComparisonActive) {
      setSelectedMapForSelection(activeMapName);
    }
  }, [isComparisonActive, activeMapName]);
  const targetMapName = isComparisonActive ? selectedMapForSelection != null ? selectedMapForSelection : activeMapName : activeMapName;
  const map = useAppState((state) => {
    var _a2;
    if (targetMapName && state.mapState[targetMapName]) {
      return (_a2 = state.mapState[targetMapName].mapguide) == null ? void 0 : _a2.runtimeMap;
    }
    return void 0;
  });
  const selection = useAppState((state) => {
    var _a2, _b2;
    if (targetMapName && state.mapState[targetMapName]) {
      return (_b2 = (_a2 = state.mapState[targetMapName].mapguide) == null ? void 0 : _a2.selectionSet) != null ? _b2 : null;
    }
    return null;
  });
  const clientSelection = useAppState((state) => {
    if (targetMapName && state.mapState[targetMapName]) {
      return state.mapState[targetMapName].clientSelection;
    }
    return void 0;
  });
  const setCurrentViewAction = (view) => dispatch(setCurrentView(view));
  const showSelectedFeatureAction = (mapName, layerId, selectionKey) => dispatch(showSelectedFeature(mapName, layerId, selectionKey));
  const appContext = reactExports.useContext(AppContext);
  const viewer = useMapProviderContext();
  const onZoomToSelectedFeature = (feature) => {
    if (feature.Bounds) {
      const bbox = feature.Bounds.split(" ").map((s) => parseFloat(s));
      if (viewer.isReady()) {
        const view = viewer.getViewForExtent(bbox);
        setCurrentViewAction(view);
      }
    }
  };
  const resolveLayerLabel = (layerId, _) => {
    var _a2, _b2, _c2;
    const layer = (_c2 = (_b2 = (_a2 = map == null ? void 0 : map.Layer) == null ? void 0 : _a2.filter) == null ? void 0 : _b2.call(_a2, (l) => l.ObjectId == layerId)) == null ? void 0 : _c2[0];
    if (layer) {
      return layer.LegendLabel;
    }
  };
  const onShowSelectedFeature = (layerId, selectionKey) => {
    if (targetMapName) {
      showSelectedFeatureAction(targetMapName, layerId, selectionKey);
    }
  };
  const comparisonMapSelector = isComparisonActive && comparisonInfo ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: selectorContainerStyle, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "selection-panel-map-select", style: selectorLabelStyle, children: tr("MAP_SWIPE_SELECTION_FOR", locale) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "select",
      {
        id: "selection-panel-map-select",
        value: (_a = selectedMapForSelection != null ? selectedMapForSelection : activeMapName) != null ? _a : "",
        onChange: (e) => setSelectedMapForSelection(e.target.value),
        style: selectorSelectStyle,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: comparisonInfo.pair.primaryMapName, children: [
            (_b = comparisonInfo.pair.primaryLabel) != null ? _b : tr("MAP_SWIPE_PRIMARY_LABEL", locale),
            " (",
            comparisonInfo.pair.primaryMapName,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: comparisonInfo.pair.secondaryMapName, children: [
            (_c = comparisonInfo.pair.secondaryLabel) != null ? _c : tr("MAP_SWIPE_SECONDARY_LABEL", locale),
            " (",
            comparisonInfo.pair.secondaryMapName,
            ")"
          ] })
        ]
      }
    )
  ] }) : null;
  const withSwipeSelectorLayout = (content) => {
    if (comparisonMapSelector) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: swipeSelectionRootStyle, children: [
        comparisonMapSelector,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: swipeSelectionPanelSlotStyle, children: content })
      ] });
    }
    return content;
  };
  const compSel = new CompositeSelection(selection == null ? void 0 : selection.SelectedFeatures, clientSelection);
  if ((selection == null ? void 0 : selection.SelectedFeatures) != null || clientSelection) {
    const allowHtmlValues = appContext.allowHtmlValuesInSelection();
    const cleaner = appContext.getHTMLCleaner();
    const formatter = appContext.getPropertyValueFormatter();
    return withSwipeSelectorLayout(/* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectionPanel,
      {
        locale,
        onResolveLayerLabel: resolveLayerLabel,
        allowHtmlValues,
        cleanHTML: cleaner,
        formatPropertyValue: formatter,
        selection: compSel,
        onRequestZoomToFeature: onZoomToSelectedFeature,
        onShowSelectedFeature,
        selectedFeatureRenderer,
        maxHeight
      }
    ) }));
  } else {
    return withSwipeSelectorLayout(/* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Callout, { variant: "primary", icon: "info-sign", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "selection-panel-no-selection", children: tr("NO_SELECTED_FEATURES", locale) }) }) }));
  }
};
const PoweredByMapGuide = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", __spreadProps(__spreadValues({ className: "status-bar-component component-pbmg" }, props), { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageIcon, { style: { display: "block" }, spriteClass: "PoweredBy_en" }) }));
};
function reload(e) {
  e.preventDefault();
  window.location.reload();
  return false;
}
const SessionExpired = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "component-session-expired", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: tr("SESSION_EXPIRED_DETAILED", props.locale) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: tr("SESSION_EXPIRED_AVAILABLE_ACTIONS", props.locale) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", onClick: reload, children: tr("SESSION_EXPIRED_RELOAD_VIEWER", props.locale) }) }) })
  ] });
};
const ViewerOptions = () => {
  var _a, _b, _c;
  const { Slider, Select: Select2, Heading, Switch, FormGroup } = useElementContext();
  const externalBaseLayers = (_a = useActiveMapExternalBaseLayers()) == null ? void 0 : _a.filter((ebl) => isVisualBaseLayer(ebl));
  const mapName = useActiveMapName();
  const layerTransparency = useActiveMapLayerTransparency();
  const featureTooltipsEnabled = useViewerFeatureTooltipsEnabled();
  const selectDragPanEnabled = useViewerSelectCanDragPan();
  const manualFeatureTooltips = useConfiguredManualFeatureTooltips();
  const viewSizeUnits = useViewerSizeUnits();
  const stateless = useViewerIsStateless();
  const map = useActiveMapState();
  const locale = useViewerLocale();
  const dispatch = useReduxDispatch();
  const toggleManualMapTipsAction = (enabled) => dispatch(setManualFeatureTooltipsEnabled(enabled));
  const toggleMapTipsAction = (enabled) => dispatch(setFeatureTooltipsEnabled(enabled));
  const toggleSelectDragPanAction = (enabled) => dispatch(enableSelectDragPan(enabled));
  const setLayerTransparencyAction = (mapName2, id, opacity) => dispatch(setLayerTransparency(mapName2, id, opacity));
  const setViewSizeDisplayUnitsAction = (units2) => dispatch(setViewSizeUnits(units2));
  const onMgLayerOpacityChanged = (mapName2, layerId, value) => {
    if (mapName2) {
      setLayerTransparencyAction == null ? void 0 : setLayerTransparencyAction(mapName2, layerId, value);
    }
  };
  const onBaseOpacityChanged = (value) => {
    onMgLayerOpacityChanged(mapName, LAYER_ID_BASE, value);
  };
  const onMgDynamicOverlayOpacityChanged = (value) => {
    onMgLayerOpacityChanged(mapName, LAYER_ID_MG_DYNAMIC_OVERLAY, value);
  };
  const onMgOpacityChanged = (value) => {
    onMgLayerOpacityChanged(mapName, LAYER_ID_MG_BASE, value);
  };
  const onMgSelOpacityChanged = (value) => {
    onMgLayerOpacityChanged(mapName, LAYER_ID_MG_SEL_OVERLAY, value);
  };
  const onViewSizeUnitsChanged = (value) => {
    if (value !== void 0) {
      setViewSizeDisplayUnitsAction(parseInt(value, 10));
    }
  };
  const onFeatureTooltipsChanged = (e) => {
    toggleMapTipsAction(e.target.checked);
  };
  const onSelectDragPanEnabled = (e) => {
    toggleSelectDragPanAction(e.target.checked);
  };
  const onManualFeatureTooltipsChanged = (e) => {
    toggleManualMapTipsAction(e.target.checked);
  };
  const units = getUnitsOfMeasure();
  let opBase = 1;
  let opMgBase = 1;
  let opMgSelOverlay = 1;
  let opMgDynamicOverlay = 1;
  if (layerTransparency) {
    if (LAYER_ID_BASE in layerTransparency) {
      opBase = layerTransparency[LAYER_ID_BASE];
    }
    if (LAYER_ID_MG_BASE in layerTransparency) {
      opMgBase = layerTransparency[LAYER_ID_MG_BASE];
    }
    if (LAYER_ID_MG_DYNAMIC_OVERLAY in layerTransparency) {
      opMgDynamicOverlay = layerTransparency[LAYER_ID_MG_DYNAMIC_OVERLAY];
    }
    if (LAYER_ID_MG_SEL_OVERLAY in layerTransparency) {
      opMgSelOverlay = layerTransparency[LAYER_ID_MG_SEL_OVERLAY];
    }
  }
  let hasMgBaseLayers = false;
  let isStateless2 = stateless;
  if (!map) {
    isStateless2 = true;
  } else {
    hasMgBaseLayers = ((_c = (_b = map.FiniteDisplayScale) == null ? void 0 : _b.length) != null ? _c : 0) > 0;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "component-viewer-options", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 5, children: tr("VIEWER_OPTIONS", locale) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
    !isStateless2 && /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: featureTooltipsEnabled, onChange: onFeatureTooltipsChanged, label: tr("FEATURE_TOOLTIPS", locale) }),
    (() => {
      if (!isStateless2 && featureTooltipsEnabled) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: manualFeatureTooltips, onChange: onManualFeatureTooltipsChanged, label: tr("MANUAL_FEATURE_TOOLTIPS", locale) });
      }
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: selectDragPanEnabled, onChange: onSelectDragPanEnabled, label: tr("ENABLE_SELECT_DRAGPAN", locale) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { children: tr("LAYER_TRANSPARENCY", locale) }),
      (() => {
        if (externalBaseLayers) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("LAYER_ID_BASE", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { paddingLeft: 8, paddingRight: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { min: 0, max: 1, stepSize: 0.01, value: opBase, onChange: onBaseOpacityChanged }) }) });
        }
      })(),
      hasMgBaseLayers && /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("LAYER_ID_MG_BASE_LAYERS", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { paddingLeft: 8, paddingRight: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { min: 0, max: 1, stepSize: 0.01, value: opMgBase, onChange: onMgOpacityChanged }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: map ? tr("LAYER_ID_MG_BASE", locale) : tr("LAYER_ID_SUBJECT", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { paddingLeft: 8, paddingRight: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { min: 0, max: 1, stepSize: 0.01, value: opMgDynamicOverlay, onChange: onMgDynamicOverlayOpacityChanged }) }) }),
      !isStateless2 && /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("LAYER_ID_MG_SEL_OVERLAY", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { paddingLeft: 8, paddingRight: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { min: 0, max: 1, stepSize: 0.01, value: opMgSelOverlay, onChange: onMgSelOpacityChanged }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("MAP_SIZE_DISPLAY_UNITS", locale), labelFor: "viewSizeUnitsSelect", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Select2,
      {
        id: "viewSizeUnitsSelect",
        value: `${viewSizeUnits}`,
        onChange: onViewSizeUnitsChanged,
        items: units.map((uom) => ({ value: `${uom}`, label: getUnitOfMeasure(uom).localizedName(locale) }))
      }
    ) })
  ] });
};
class MapCapturerContext {
  constructor(viewer, mapName, rotation = 0) {
    this.viewer = viewer;
    this.mapName = mapName;
    this.rotation = rotation;
    this.features = new Collection();
    this.mapCapturerSource = new VectorSource({
      features: this.features
    });
    this.mapCapturerLayer = new VectorLayer({
      source: this.mapCapturerSource
    });
    this.intTranslate = new Translate({
      features: this.features
    });
    this.intTranslate.on("translateend", this.onTranslateEnd.bind(this));
    this.layerName = `${mapName}_MapCapturer`;
  }
  getRing(origin, paperSize, scaleDenominator) {
    const ring = [];
    const factor = scaleDenominator / (this.viewer.getMetersPerUnit() * 1e3 * 2);
    ring.push([origin.x - paperSize.w * factor, origin.y - paperSize.h * factor]);
    ring.push([origin.x + paperSize.w * factor, origin.y - paperSize.h * factor]);
    ring.push([origin.x + paperSize.w * factor, origin.y + paperSize.h * factor]);
    ring.push([origin.x - paperSize.w * factor, origin.y + paperSize.h * factor]);
    return [ring];
  }
  onTranslateEnd() {
    if (this.features.getLength() == 1 && this.activeCallback) {
      const box = this.features.item(0);
      const poly = box.getGeometry();
      const coords = poly.getCoordinates()[0];
      const boxCoords = coords.map((c) => `${c[0]},${c[1]}`).join(",");
      const npoly = poly.clone();
      const ncenter = getCenter(npoly.getExtent());
      npoly.rotate(deg2rad(this.rotation), ncenter);
      const ncoords = npoly.getCoordinates()[0];
      const nBoxCoords = ncoords.map((c) => `${c[0]},${c[1]}`).join(",");
      this.activeCallback.updateBoxCoords(boxCoords, nBoxCoords);
    }
  }
  updateBox(paperSize, scaleDenominator, rotation) {
    if (this.activeCallback) {
      this.rotation = rotation;
      let poly;
      if (this.features.getLength() == 0) {
        poly = this.createCaptureBox(paperSize, scaleDenominator, this.rotation);
      } else {
        const box = this.features.item(0);
        poly = box.getGeometry();
        const center = getCenter(poly.getExtent());
        const origin = {
          x: center[0],
          y: center[1]
        };
        const ring = this.getRing(origin, paperSize, scaleDenominator);
        poly.setCoordinates(ring);
        poly.rotate(-deg2rad(this.rotation), center);
      }
      const coords = poly.getCoordinates()[0];
      const boxCoords = coords.map((c) => `${c[0]},${c[1]}`).join(",");
      const npoly = poly.clone();
      const ncenter = getCenter(npoly.getExtent());
      npoly.rotate(deg2rad(this.rotation), ncenter);
      const ncoords = npoly.getCoordinates()[0];
      const nBoxCoords = ncoords.map((c) => `${c[0]},${c[1]}`).join(",");
      this.activeCallback.updateBoxCoords(boxCoords, nBoxCoords);
    }
  }
  createCaptureBox(paperSize, scaleDenominator, rotation) {
    const origin = this.viewer.getCurrentView();
    const ring = this.getRing(origin, paperSize, scaleDenominator);
    const poly = new Polygon(ring);
    poly.rotate(-deg2rad(rotation), [origin.x, origin.y]);
    const box = new Feature(poly);
    this.features.clear();
    this.features.push(box);
    return poly;
  }
  getMapName() {
    return this.mapName;
  }
  activate(callback, paperSize, scaleDenominator, rotation) {
    this.activeCallback = callback;
    debug(`Activating map capturer context for ${this.mapName}`);
    this.viewer.getLayerManager().addLayer(this.layerName, this.mapCapturerLayer, true);
    this.updateBox(paperSize, scaleDenominator, rotation);
    this.viewer.addInteraction(this.intTranslate);
  }
  deactivate() {
    this.activeCallback = void 0;
    debug(`De-activating map capturer context for ${this.mapName}`);
    this.features.clear();
    this.viewer.getLayerManager().removeLayer(this.layerName);
    this.viewer.removeInteraction(this.intTranslate);
  }
}
const PAPER_SIZES = [
  { value: "210.0,297.0,A4", label: "A4 (210x297 mm; 8.27x11.69 In) " },
  { value: "297.0,420.0,A3", label: "A3 (297x420 mm; 11.69x16.54 In) " },
  { value: "148.0,210.0,A5", label: "A5 (148x210 mm; 5.83x8.27 in) " },
  { value: "216.0,279.0,Letter", label: "Letter (216x279 mm; 8.50x11.00 In) " },
  { value: "216.0,356.0,Legal", label: "Legal (216x356 mm; 8.50x14.00 In) " }
];
const DPIS = [
  { value: "96", label: "96" },
  { value: "150", label: "150" },
  { value: "300", label: "300" },
  { value: "600", label: "600" }
];
const SCALES = [
  { value: "500", label: "1: 500" },
  { value: "1000", label: "1: 1000" },
  { value: "2500", label: "1: 2500" },
  { value: "5000", label: "1: 5000" }
];
function getMargin() {
  return { top: 25.4, buttom: 12.7, left: 12.7, right: 12.7 };
}
function getPrintSize(viewer, showAdvanced, paperSize, orientation) {
  const value = paperSize.split(",");
  let size;
  if (orientation === "P") {
    size = { w: parseFloat(value[0]), h: parseFloat(value[1]) };
  } else {
    size = { w: parseFloat(value[1]), h: parseFloat(value[0]) };
  }
  if (!showAdvanced) {
    const paperRatio = size.w / size.h;
    var viewSize = viewer.getSize();
    let vs;
    if (orientation === "P") {
      vs = {
        w: viewSize[1],
        h: viewSize[0]
      };
    } else {
      vs = {
        w: viewSize[0],
        h: viewSize[1]
      };
    }
    if (vs) {
      const viewRatio = vs.w / vs.h;
      if (paperRatio > viewRatio) {
        size.w = size.h * viewRatio;
      } else {
        size.h = size.w / viewRatio;
      }
    }
  }
  const margins = getMargin();
  size.h = size.h - margins.top - margins.buttom;
  size.w = size.w - margins.left - margins.right;
  return size;
}
const _mapCapturers = [];
function getActiveCapturer(viewer, mapNames, activeMapName) {
  let activeCapturer;
  if (_mapCapturers.length == 0) {
    if (mapNames.length) {
      for (const mapName of mapNames) {
        const context = new MapCapturerContext(viewer, mapName);
        _mapCapturers.push(context);
        if (activeMapName == mapName) {
          activeCapturer = context;
        }
      }
    }
  } else {
    activeCapturer = _mapCapturers.filter((m) => m.getMapName() === activeMapName)[0];
  }
  return activeCapturer;
}
function toggleMapCapturerLayer(locale, viewer, mapNames, activeMapName, showAdvanced, paperSize, orientation, scale, rotation, updateBoxCoords, setViewRotationEnabled2, setViewRotation2) {
  const bVisible = showAdvanced;
  if (viewer.isReady() && mapNames) {
    const activeCapturer = getActiveCapturer(viewer, mapNames, activeMapName);
    if (activeCapturer) {
      if (bVisible) {
        const ppSize = getPrintSize(viewer, showAdvanced, paperSize, orientation);
        const cb = {
          updateBoxCoords
        };
        activeCapturer.activate(cb, ppSize, parseFloat(scale), rotation);
        setViewRotationEnabled2(false);
        setViewRotation2(0);
        viewer.toastPrimary("info-sign", tr("QUICKPLOT_BOX_INFO", locale));
      } else {
        activeCapturer.deactivate();
        setViewRotationEnabled2(true);
      }
    }
  }
}
const QuickPlotContainer = () => {
  var _a, _b;
  const { Slider, Callout, Button, Select: Select2, FormGroup, InputGroup, Checkbox } = useElementContext();
  const [title, setTitle] = reactExports.useState("");
  const [subTitle, setSubTitle] = reactExports.useState("");
  const [showLegend, setShowLegend] = reactExports.useState(false);
  const [showNorthBar, setShowNorthBar] = reactExports.useState(false);
  const [showCoordinates, setShowCoordinates] = reactExports.useState(false);
  const [showScaleBar, setShowScaleBar] = reactExports.useState(false);
  const [showDisclaimer, setShowDisclaimer] = reactExports.useState(false);
  const [showAdvanced, setShowAdvanced] = reactExports.useState(false);
  const [orientation, setOrientation] = reactExports.useState("P");
  const [paperSize, setPaperSize] = reactExports.useState("210.0,297.0,A4");
  const [scale, setScale2] = reactExports.useState("5000");
  const [dpi, setDpi] = reactExports.useState("96");
  const [rotation, setRotation] = reactExports.useState(0);
  const [box, setBox] = reactExports.useState("");
  const [normalizedBox, setNormalizedBox] = reactExports.useState("");
  const viewer = useMapProviderContext();
  const locale = useViewerLocale();
  const activeMapName = useActiveMapName();
  const mapNames = (_a = useAvailableMaps()) == null ? void 0 : _a.map((m) => m.value);
  const map = useActiveMapState();
  const view = useActiveMapView();
  const externalBaseLayers = (_b = useActiveMapExternalBaseLayers()) == null ? void 0 : _b.filter((ebl) => isVisualBaseLayer(ebl));
  const dispatch = useReduxDispatch();
  const setViewRotationAction = (rotation2) => dispatch(setViewRotation(rotation2));
  const setViewRotationEnabledAction = (enabled) => dispatch(setViewRotationEnabled(enabled));
  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };
  const onSubTitleChanged = (e) => {
    setSubTitle(e.target.value);
  };
  const onShowLegendChanged = () => {
    setShowLegend(!showLegend);
  };
  const onShowNorthArrowChanged = () => {
    setShowNorthBar(!showNorthBar);
  };
  const onShowCoordinatesChanged = () => {
    setShowCoordinates(!showCoordinates);
  };
  const onShowScaleBarChanged = () => {
    setShowScaleBar(!showScaleBar);
  };
  const onShowDisclaimerChanged = () => {
    setShowDisclaimer(!showDisclaimer);
  };
  const onAdvancedOptionsChanged = () => {
    setShowAdvanced(!showAdvanced);
  };
  const onRotationChanged = (value) => {
    setRotation(value);
  };
  const onGeneratePlot = () => {
  };
  const updateBoxCoords = (box2, normalizedBox2) => {
    setBox(box2);
    setNormalizedBox(normalizedBox2);
  };
  reactExports.useEffect(() => {
    return () => {
      if (viewer.isReady() && mapNames) {
        for (const activeMapName2 of mapNames) {
          const activeCapturer = getActiveCapturer(viewer, mapNames, activeMapName2);
          if (activeCapturer) {
            debug(`De-activating map capturer for: ${activeMapName2}`);
            activeCapturer.deactivate();
          }
        }
      }
    };
  }, []);
  const prevShowAdvanced = usePrevious(showAdvanced);
  reactExports.useEffect(() => {
    if (activeMapName && mapNames) {
      if (showAdvanced != prevShowAdvanced) {
        toggleMapCapturerLayer(
          locale,
          viewer,
          mapNames,
          activeMapName,
          showAdvanced,
          paperSize,
          orientation,
          scale,
          rotation,
          updateBoxCoords,
          setViewRotationEnabledAction,
          setViewRotationAction
        );
      }
      if (showAdvanced) {
        if (viewer.isReady()) {
          const capturer = getActiveCapturer(viewer, mapNames, activeMapName);
          if (capturer) {
            const ppSize2 = getPrintSize(viewer, showAdvanced, paperSize, orientation);
            debug(`Updating map capturer for: ${activeMapName}`);
            capturer.updateBox(ppSize2, parseFloat(scale), rotation);
          }
        }
      }
    }
  }, [mapNames, activeMapName, showAdvanced, scale, paperSize, orientation, rotation, locale]);
  if (!viewer.isReady() || !map || !view) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("noscript", {});
  }
  let hasExternalBaseLayers = false;
  if (externalBaseLayers) {
    hasExternalBaseLayers = externalBaseLayers.length > 0;
  }
  let normBox = normalizedBox;
  let theBox = box;
  if (!showAdvanced) {
    const extent = viewer.getCurrentExtent();
    theBox = `${extent[0]}, ${extent[1]}, ${extent[2]}, ${extent[1]}, ${extent[2]}, ${extent[3]}, ${extent[0]}, ${extent[3]}, ${extent[0]}, ${extent[1]}`;
    normBox = theBox;
  }
  let ppSize;
  let prSize;
  const tokens = paperSize.split(",");
  if (orientation === "L") {
    prSize = `${tokens[1]},${tokens[0]}`;
    ppSize = `${prSize},${tokens[2]}`;
  } else {
    prSize = `${tokens[0]},${tokens[1]}`;
    ppSize = `${prSize},${tokens[2]}`;
  }
  const url = `${getFusionRoot()}/widgets/QuickPlot/PlotAsPDF.php`;
  const ORIENTATIONS = [
    { value: "P", label: tr("QUICKPLOT_ORIENTATION_P", locale) },
    { value: "L", label: tr("QUICKPLOT_ORIENTATION_L", locale) }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "component-quick-plot", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: "Form1", name: "Form1", target: "_blank", method: "post", action: url, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", id: "printId", name: "printId", value: `${Math.random() * 1e3}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "Title FixWidth", children: tr("QUICKPLOT_HEADER", locale) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("QUICKPLOT_TITLE", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroup, { name: "{field:title}", id: "title", value: title, onChange: onTitleChanged }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("QUICKPLOT_SUBTITLE", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroup, { name: "{field:sub_title}", id: "subtitle", value: subTitle, onChange: onSubTitleChanged }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("QUICKPLOT_PAPER_SIZE", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TypedSelect,
      {
        fill: true,
        id: "paperSizeSelect",
        name: "paperSizeSelect",
        value: paperSize,
        onChange: (e) => setPaperSize(e),
        items: PAPER_SIZES
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("QUICKPLOT_ORIENTATION", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TypedSelect,
      {
        fill: true,
        id: "orientation",
        name: "orientation",
        value: orientation,
        onChange: (e) => setOrientation(e),
        items: ORIENTATIONS
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", id: "paperSize", name: "paperSize", value: ppSize }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", id: "printSize", name: "printSize", value: prSize }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { children: tr("QUICKPLOT_SHOWELEMENTS", locale) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { id: "ShowLegendCheckBox", name: "ShowLegend", checked: showLegend, onChange: onShowLegendChanged, label: tr("QUICKPLOT_SHOWLEGEND", locale) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { id: "ShowNorthArrowCheckBox", name: "ShowNorthArrow", checked: showNorthBar, onChange: onShowNorthArrowChanged, label: tr("QUICKPLOT_SHOWNORTHARROW", locale) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { id: "ShowCoordinatesCheckBox", name: "ShowCoordinates", checked: showCoordinates, onChange: onShowCoordinatesChanged, label: tr("QUICKPLOT_SHOWCOORDINTES", locale) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { id: "ShowScaleBarCheckBox", name: "ShowScaleBar", checked: showScaleBar, onChange: onShowScaleBarChanged, label: tr("QUICKPLOT_SHOWSCALEBAR", locale) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { id: "ShowDisclaimerCheckBox", name: "ShowDisclaimer", checked: showDisclaimer, onChange: onShowDisclaimerChanged, label: tr("QUICKPLOT_SHOWDISCLAIMER", locale) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "HPlaceholder5px" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { id: "AdvancedOptionsCheckBox", onChange: onAdvancedOptionsChanged, label: tr("QUICKPLOT_ADVANCED_OPTIONS", locale) }) }),
    (() => {
      if (showAdvanced) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("QUICKPLOT_SCALING", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TypedSelect,
            {
              fill: true,
              id: "scaleDenominator",
              name: "scaleDenominator",
              value: scale,
              onChange: (e) => setScale2(e),
              items: SCALES
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("QUICKPLOT_DPI", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TypedSelect,
            {
              fill: true,
              id: "dpi",
              name: "dpi",
              onChange: (e) => setDpi(e),
              items: DPIS
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { label: tr("QUICKPLOT_BOX_ROTATION", locale), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { paddingLeft: 16, paddingRight: 16 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { min: 0, max: 360, labelStepSize: 90, stepSize: 1, value: rotation, onChange: onRotationChanged }) }) })
        ] });
      } else {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", id: "scaleDenominator", name: "scaleDenominator", value: `${view.scale}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", id: "dpi", name: "dpi", value: dpi })
        ] });
      }
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "HPlaceholder5px" }),
    (() => {
      if (hasExternalBaseLayers) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Callout, { variant: "primary", icon: "info-sign", children: tr("QUICKPLOT_COMMERCIAL_LAYER_WARNING", locale) });
      }
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ButtonContainer FixWidth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "primary", icon: "print", onClick: onGeneratePlot, children: tr("QUICKPLOT_GENERATE", locale) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", id: "margin", name: "margin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", id: "normalizedBox", name: "normalizedBox", value: normBox }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", id: "rotation", name: "rotation", value: -(rotation || 0) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", id: "sessionId", name: "sessionId", value: map.SessionId }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", id: "mapName", name: "mapName", value: map.Name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", id: "box", name: "box", value: theBox }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", id: "legalNotice", name: "legalNotice" })
  ] }) });
};
function registerMapGuideComponents() {
  registerComponentFactory(DefaultComponentNames.Legend, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(LegendContainer, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.SelectionPanel, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectionPanelContainer, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.SelectedFeatureCount, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectedFeatureCountContainer, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.PoweredByMapGuide, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(PoweredByMapGuide, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.SessionExpired, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(SessionExpired, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.ViewerOptions, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(ViewerOptions, __spreadValues({}, props)));
  registerComponentFactory(DefaultComponentNames.QuickPlot, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(QuickPlotContainer, __spreadValues({}, props)));
}
const HIDDEN_CLASS_NAME = "tooltip-hidden";
class MouseTrackingTooltip {
  constructor(map, contextMenuTest) {
    this.map = map;
    this.isContextMenuOpen = contextMenuTest;
    this.map.getViewport().addEventListener("mouseout", this.onMouseOut.bind(this));
    this.tooltipElement = document.createElement("div");
    this.tooltipElement.className = "tooltip";
    this.tooltip = new Overlay({
      element: this.tooltipElement,
      offset: [15, 0],
      positioning: "center-left"
    });
    this.map.addOverlay(this.tooltip);
    this.text = null;
    this.tooltipElement.classList.add(HIDDEN_CLASS_NAME);
  }
  dispose() {
    this.tooltip.dispose();
  }
  onMouseMove(e) {
    if (this.isContextMenuOpen())
      return;
    this.tooltip.setPosition(e.coordinate);
    if (this.text)
      this.tooltipElement.classList.remove(HIDDEN_CLASS_NAME);
    else
      this.tooltipElement.classList.add(HIDDEN_CLASS_NAME);
  }
  onMouseOut() {
    this.tooltipElement.classList.add(HIDDEN_CLASS_NAME);
  }
  setText(prompt) {
    this.text = prompt;
    this.tooltipElement.innerHTML = this.text;
  }
  clear() {
    this.text = null;
    this.tooltipElement.innerHTML = "";
  }
  destroy() {
    if (this.tooltipElement && this.tooltipElement.parentNode) {
      this.tooltipElement.parentNode.removeChild(this.tooltipElement);
    }
  }
}
function defaultPopupContentRenderer(feat, locale, popupConfig) {
  var _a, _b, _c, _d;
  let html = "";
  const bClustered = isClusteredFeature(feat);
  let title = (_a = popupConfig == null ? void 0 : popupConfig.title) != null ? _a : tr("SEL_FEATURE_PROPERTIES", locale);
  const size = (_b = getClusterSubFeatures(feat)) == null ? void 0 : _b.length;
  if (bClustered && size > 1) {
    title = (_d = (_c = popupConfig == null ? void 0 : popupConfig.clusteredTitle) == null ? void 0 : _c.call(popupConfig, size)) != null ? _d : tr("SEL_CLUSTER_PROPERTIES", locale, { size });
  }
  html += "<div class='selected-popup-header'><div>" + purify.sanitize(title) + "</div><a id='feat-popup-closer' class='closer' href='#'>[x]</a><div class='clearit'></div></div>";
  const renderForMultipleSanitized = (subFeatures) => {
    let table = "<table class='selected-popup-cluster-table'>";
    const fheadings = (popupConfig == null ? void 0 : popupConfig.propertyMappings) ? popupConfig.propertyMappings.filter((pm) => pm.name != subFeatures[0].getGeometryName()).map((pm) => pm.value) : Object.keys(subFeatures[0].getProperties()).filter((pn) => pn != subFeatures[0].getGeometryName());
    const fprops = (popupConfig == null ? void 0 : popupConfig.propertyMappings) ? popupConfig.propertyMappings.map((pm) => pm.value) : Object.keys(subFeatures[0].getProperties()).filter((pn) => pn != subFeatures[0].getGeometryName());
    table += "<thead><tr>";
    for (const heading of fheadings) {
      table += `<th>${purify.sanitize(heading)}</th>`;
    }
    table += "</tr></thead>";
    table += "<tbody>";
    for (const f of subFeatures) {
      table += "<tr>";
      for (const property of fprops) {
        const val = f.get(property);
        table += `<td>${purify.sanitize(val)}</td>`;
      }
      table += "</tr>";
    }
    table += "</tbody>";
    table += "</table>";
    return table;
  };
  const renderForSingleSanitized = (feature) => {
    var _a2, _b2, _c2;
    let linkFragment;
    let table = "<table class='selected-popup-single-properties-table'>";
    table += "<tbody>";
    const f = feature.getProperties();
    let pc = 0;
    if (popupConfig == null ? void 0 : popupConfig.propertyMappings) {
      for (const pm of popupConfig.propertyMappings) {
        if (pm.name == feat.getGeometryName()) {
          continue;
        }
        table += "<tr>";
        table += "<td class='property-name-cell'>" + purify.sanitize(pm.value) + "</td>";
        table += "<td class='property-value-cell'>" + purify.sanitize(f[pm.name]) + "</td>";
        table += "</tr>";
        pc++;
      }
    } else {
      for (const key in f) {
        if (key == feat.getGeometryName()) {
          continue;
        }
        table += "<tr>";
        table += "<td class='property-name-cell'>" + purify.sanitize(key) + "</td>";
        table += "<td class='property-value-cell'>" + purify.sanitize(f[key]) + "</td>";
        table += "</tr>";
        pc++;
      }
    }
    table += "</tbody>";
    table += "</table>";
    if (popupConfig == null ? void 0 : popupConfig.linkProperty) {
      const { name, label, linkTarget } = popupConfig.linkProperty;
      let linkHref;
      if (typeof name == "string") {
        linkHref = encodeURI(f[name]);
      } else {
        const expr = name.expression;
        let url = expr;
        const pBegin = (_a2 = name.placeholderBegin) != null ? _a2 : "{";
        const pEnd = (_b2 = name.placeholderEnd) != null ? _b2 : "}";
        const tokens = extractPlaceholderTokens(expr, pBegin, pEnd);
        for (const t of tokens) {
          const al = encodeURIComponent((_c2 = f[t]) != null ? _c2 : "");
          url = strReplaceAll(url, `${pBegin}${t}${pEnd}`, al);
        }
        linkHref = url;
      }
      if (!strIsNullOrEmpty(linkHref)) {
        linkFragment = `<div class='select-popup-single-link-wrapper'><a href="${purify.sanitize(linkHref)}" target='${purify.sanitize(linkTarget)}'>${purify.sanitize(label)}</a></div>`;
      }
    }
    return [table, pc, linkFragment];
  };
  const singlePopupContentRender = (feature, appendHtml) => {
    const [table, pc, linkFragment] = renderForSingleSanitized(feature);
    if (pc > 0) {
      appendHtml(`<div class='selected-popup-content-wrapper'>${table}</div>`);
    } else {
      appendHtml("<div class='selected-popup-content-none'>" + purify.sanitize(tr("SEL_FEATURE_PROPERTIES_NONE", locale)) + "</div>");
    }
    if (!strIsNullOrEmpty(linkFragment)) {
      appendHtml(linkFragment);
    }
  };
  if (bClustered) {
    const subFeatures = getClusterSubFeatures(feat);
    if (subFeatures.length == 1) {
      singlePopupContentRender(subFeatures[0], (h) => html += h);
    } else {
      const table = renderForMultipleSanitized(subFeatures);
      html += `<div class='selected-popup-content-wrapper'>${table}</div>`;
    }
  } else {
    singlePopupContentRender(feat, (h) => html += h);
  }
  return html;
}
class SelectedFeaturesTooltip {
  constructor(map, parent) {
    this.parent = parent;
    this.setPopupCloseHandler = () => {
      if (this.closerEl) {
        this.closerEl.onclick = this.closePopup;
      }
    };
    this.closePopup = (e) => {
      e.preventDefault();
      this.hide();
      if (this.closerEl) {
        this.closerEl.onclick = null;
      }
      return false;
    };
    this.featureTooltipElement = document.createElement("div");
    this.featureTooltipElement.addEventListener("mouseover", () => this.isMouseOverTooltip = true);
    this.featureTooltipElement.addEventListener("mouseout", () => this.isMouseOverTooltip = false);
    this.featureTooltipElement.className = "selected-tooltip";
    this.featureTooltip = new Overlay({
      element: this.featureTooltipElement,
      offset: [15, 0],
      positioning: "center-left"
    });
    this.map = map;
    this.map.addOverlay(this.featureTooltip);
    this.enabled = true;
    this.isMouseOverTooltip = false;
  }
  dispose() {
    this.featureTooltip.dispose();
  }
  get isMouseOver() {
    return this.isMouseOverTooltip;
  }
  isEnabled() {
    return this.enabled;
  }
  setEnabled(enabled) {
    this.enabled = enabled;
    if (!this.enabled) {
      this.featureTooltipElement.innerHTML = "";
      this.featureTooltipElement.classList.add("tooltip-hidden");
    }
  }
  hide() {
    this.featureTooltipElement.innerHTML = "";
    this.featureTooltipElement.classList.add("tooltip-hidden");
  }
  queryWmsFeatures(currentLayerSet, layerMgr, coord, resolution, bAppendMode, callback) {
    return __async(this, null, function* () {
      var _a, _b, _c;
      let selected = 0;
      const client = new Client("", "mapagent");
      const format = new GeoJSON();
      const wmsSources = [];
      const currentWmsSource = currentLayerSet == null ? void 0 : currentLayerSet.tryGetWmsSource();
      if (currentWmsSource) {
        wmsSources.push(currentWmsSource);
      }
      const layers = layerMgr.getLayers().filter((l) => l.visible && l.selectable && l.type == "WMS");
      for (const layer of layers) {
        const wmsLayer = layerMgr.getLayer(layer.name);
        if (wmsLayer instanceof ImageLayer || wmsLayer instanceof TileLayer) {
          const source = wmsLayer.getSource();
          if (source instanceof ImageWMS || source instanceof TileWMS) {
            wmsSources.push([wmsLayer, source]);
          }
        }
      }
      for (const pair of wmsSources) {
        const [layer, source] = pair;
        let url = source.getFeatureInfoUrl(coord, resolution, this.map.getView().getProjection(), {
          "INFO_FORMAT": "application/json"
        });
        if (url) {
          const layerName = layer.get(LayerProperty.LAYER_NAME);
          const augs = callback.getWmsRequestAugmentations();
          if (augs[layerName]) {
            url = augs[layerName](url);
          }
          const resp = yield client.getText(url);
          const json = JSON.parse(resp);
          if (((_a = json.features) == null ? void 0 : _a.length) > 0) {
            let srcProj = source.getProjection();
            if (!srcProj) {
              const epsg = parseEpsgCodeFromCRS((_c = (_b = json.crs) == null ? void 0 : _b.properties) == null ? void 0 : _c.name);
              if (epsg) {
                srcProj = `EPSG:${epsg}`;
              } else {
                srcProj = void 0;
              }
            }
            const features = format.readFeatures(resp, {
              dataProjection: srcProj,
              featureProjection: this.map.getView().getProjection()
            });
            this.featureTooltip.setPosition(coord);
            const popupConf = layer.get(LayerProperty.SELECTED_POPUP_CONFIGURATION);
            const html = this.generateFeatureHtml(layerName, features[0], callback.getLocale(), popupConf);
            callback.addClientSelectedFeature(features[0], layer);
            currentLayerSet == null ? void 0 : currentLayerSet.clearWmsSelectionOverlay();
            currentLayerSet == null ? void 0 : currentLayerSet.addWmsSelectionOverlay(features[0]);
            callback.addFeatureToHighlight(features[0], bAppendMode);
            selected++;
            this.featureTooltipElement.innerHTML = html;
            stickybits(".selected-popup-cluster-table th");
            this.closerEl = document.getElementById("feat-popup-closer");
            this.setPopupCloseHandler();
            if (html == "") {
              this.featureTooltipElement.classList.add("tooltip-hidden");
            } else {
              this.featureTooltipElement.classList.remove("tooltip-hidden");
            }
            return true;
          }
        }
      }
      if (selected == 0) {
        callback.addFeatureToHighlight(void 0, false);
        this.hide();
      }
      return false;
    });
  }
  generateFeatureHtml(layerName, feat, locale, popupConfig) {
    if (layerName) {
      const customRenderer = this.parent.getSelectionPopupRenderer(layerName);
      if (customRenderer) {
        return customRenderer(feat, locale, popupConfig);
      } else {
        return defaultPopupContentRenderer(feat, locale, popupConfig);
      }
    }
    return defaultPopupContentRenderer(feat, locale, popupConfig);
  }
  showSelectedVectorFeatures(features, pixel, featureToLayerMap, locale) {
    const coords = this.map.getCoordinateFromPixel(pixel);
    if (features.getLength() > 0) {
      this.featureTooltip.setPosition(coords);
      const f = features.item(0);
      let popupConf;
      const pair = featureToLayerMap.find(([feat, _]) => feat == f);
      let layerName;
      if (pair) {
        const layer = pair[1];
        popupConf = layer.get(LayerProperty.SELECTED_POPUP_CONFIGURATION);
        layerName = layer.get(LayerProperty.LAYER_NAME);
      }
      const html = this.generateFeatureHtml(layerName, f, locale, popupConf);
      this.featureTooltipElement.innerHTML = html;
      stickybits(".selected-popup-cluster-table th");
      this.closerEl = document.getElementById("feat-popup-closer");
      this.setPopupCloseHandler();
      if (html == "") {
        this.featureTooltipElement.classList.add("tooltip-hidden");
      } else {
        this.featureTooltipElement.classList.remove("tooltip-hidden");
      }
    } else {
      this.featureTooltipElement.innerHTML = "";
      this.featureTooltipElement.classList.add("tooltip-hidden");
    }
  }
}
class OLFactory {
  createStyle(options) {
    return new Style(options);
  }
  createStyleFill(options) {
    return new Fill(options);
  }
  createStyleStroke(options) {
    return new Stroke(options);
  }
  createStyleCircle(options) {
    return new CircleStyle(options);
  }
  createFeatureCollection() {
    return new Collection();
  }
  extentContainsXY(extent, x, y) {
    return containsXY(extent, x, y);
  }
  extendExtent(extent, other) {
    return extend$1(extent, other);
  }
  createProjection(options) {
    return new Projection(options);
  }
  transformCoordinateFromLonLat(lonlat, proj) {
    return fromLonLat(lonlat, proj);
  }
  transformCoordinate(coordinate, source, target) {
    return transform(coordinate, source, target);
  }
  transformExtent(extent, source, target) {
    return transformExtent(extent, source, target);
  }
  createGeomPoint(coordinates) {
    return new Point(coordinates);
  }
  createGeomLineString(coordinates) {
    return new LineString(coordinates);
  }
  createGeomCircle(center, radius) {
    return new Circle(center, radius);
  }
  createGeomLinearRing(coordinates) {
    return new LinearRing(coordinates);
  }
  createGeomPolygon(coordinates) {
    return new Polygon(coordinates);
  }
  createGeomPolygonFromCircle(circle) {
    return fromCircle(circle);
  }
  createGeomMultiLineString(coordinates) {
    return new MultiLineString(coordinates);
  }
  createGeomMultiPoint(coordinates) {
    return new MultiPoint(coordinates);
  }
  createGeomMultiPolygon(coordinates) {
    return new MultiPolygon(coordinates);
  }
  createGeomCollection(geometries) {
    return new GeometryCollection(geometries);
  }
  createVectorSource(options) {
    return new VectorSource(options);
  }
  createVectorLayer(options) {
    return new VectorLayer(options);
  }
  createOverlay(options) {
    return new Overlay(options);
  }
  createInteractionDraw(options) {
    return new Draw(options);
  }
  createInteractionExtent(options) {
    return new Extent(options);
  }
  createInteractionTranslate(options) {
    return new Translate(options);
  }
  createInteractionSnap(options) {
    return new Snap(options);
  }
  createInteractionModify(options) {
    return new Modify(options);
  }
  createInteractionSelect(options) {
    return new Select(options);
  }
  createFeature(geomOrProps) {
    return new Feature(geomOrProps);
  }
  createFormatGeoJSON(options) {
    return new GeoJSON(options);
  }
  createFormatWKT(options) {
    return new WKT(options);
  }
  /**
   * @since 0.12.6
   */
  createStyleIcon(options) {
    return new Icon$1(options);
  }
  /**
   * @since 0.12.6
   */
  createStyleRegularShape(options) {
    return new RegularShape(options);
  }
  /**
   * @since 0.12.6
   */
  createStyleText(options) {
    return new Text(options);
  }
}
function isValidView(view) {
  if (view.resolution) {
    return !isNaN(view.x) && !isNaN(view.y) && !isNaN(view.scale) && !isNaN(view.resolution);
  } else {
    return !isNaN(view.x) && !isNaN(view.y) && !isNaN(view.scale);
  }
}
function inflateBoundsByMeters(thisProj, extent, meters) {
  const webmBounds = transformExtent(extent, thisProj, "EPSG:3857");
  const webmBounds2 = buffer(webmBounds, meters);
  const inflatedBounds = transformExtent(webmBounds2, "EPSG:3857", thisProj);
  return inflatedBounds;
}
function recursiveFindLayer(layers, predicate) {
  for (let i = 0; i < layers.getLength(); i++) {
    const layer = layers.item(i);
    if (layer instanceof LayerGroup) {
      const match = recursiveFindLayer(layer.getLayers(), predicate);
      if (match) {
        return match;
      }
    } else {
      if (predicate(layer)) {
        return layer;
      }
    }
  }
  return void 0;
}
function isMiddleMouseDownEvent(e) {
  return e && (e.which == 2 || e.button == 4);
}
function useViewerSideEffects(context, appSettings, isReady, mapName, layers, initialExternalLayers, agentUri = void 0, agentKind = void 0, selection = null) {
  const dispatch = useReduxDispatch();
  reactExports.useEffect(() => {
    if (isReady) {
      if (mapName && !layers) {
        debug(`React.useEffect - Change of initial external layers for [${mapName}] (change should only happen once per mapName!)`);
        if (initialExternalLayers && initialExternalLayers.length > 0) {
          debug(`React.useEffect - First-time loading of external layers for [${mapName}]`);
          const layerManager = context.getLayerManager(mapName);
          for (const extLayer of initialExternalLayers) {
            const added = layerManager.addExternalLayer(extLayer, true, appSettings);
            if (added) {
              dispatch(mapLayerAdded(mapName, added));
            }
          }
        } else {
          debug(`React.useEffect - Signal that external layers are ready for [${mapName}]`);
          dispatch(externalLayersReady(mapName));
        }
      }
    }
  }, [context, mapName, initialExternalLayers, layers, isReady]);
  reactExports.useEffect(() => {
    debug(`React.useEffect - Change of external layers`);
    if (context.isReady() && layers) {
      const layerManager = context.getLayerManager(mapName);
      layerManager.apply(layers);
    }
  }, [context, mapName, layers]);
  reactExports.useEffect(() => {
    debug(`React.useEffect - Change of context and/or agent URI/kind`);
    const browserWindow = window;
    browserWindow.getViewer = browserWindow.getViewer || (() => context);
    if (agentUri && agentKind) {
      browserWindow.getClient = browserWindow.getClient || (() => new Client(agentUri, agentKind));
    }
    debug(`React.useEffect - Attached runtime viewer instance and installed browser global APIs`);
  }, [context, agentUri, agentKind]);
  reactExports.useEffect(() => {
    debug(`React.useEffect - Change of selection`);
    context.refreshMap(RefreshMode.SelectionOnly);
  }, [context, selection]);
}
class BaseMapProviderContext {
  constructor(olFactory = new OLFactory()) {
    this.olFactory = olFactory;
    this._swipeSecondaryTopLayers = [];
    this._swipePrimaryClipLayers = [];
    this._swipeSecondaryClipLayers = [];
    this._swipePreRenderHandlers = /* @__PURE__ */ new WeakMap();
    this._swipePostRenderHandlers = /* @__PURE__ */ new WeakMap();
    this._swipePosition = 50;
    this._comparisonMode = "none";
    this._spyCursorPixel = void 0;
    this._spyCursorRadius = 75;
    this._swipeSecondaryMapName = void 0;
    this.onBeginDigitization = (callback) => {
      var _a;
      (_a = this._comp) == null ? void 0 : _a.onDispatch(setActiveTool(ActiveMapTool.None));
      callback(false);
    };
    this.onResize = (e) => {
      var _a;
      if (this._map) {
        const size = this._map.getSize();
        if (size) {
          const [w, h] = size;
          (_a = this._comp) == null ? void 0 : _a.onDispatch(mapResized(w, h));
        }
      }
    };
    this._busyWorkers = 0;
    this._layerSetGroups = {};
    this._tileSourceLoaders = {};
    this._imageSourceLoaders = {};
    this._wmsQueryAugmentations = {};
    this._triggerZoomRequestOnMoveEnd = true;
    this._supportsTouch = supportsTouch();
    const baseInitialState = {
      activeTool: ActiveMapTool.None,
      view: void 0,
      viewRotation: 0,
      viewRotationEnabled: true,
      locale: DEFAULT_LOCALE,
      cancelDigitizationKey: KC_ESCAPE,
      undoLastPointKey: KC_U,
      busyWorkers: 0,
      mapName: void 0,
      externalBaseLayers: void 0,
      initialExternalLayers: []
    };
    this._state = __spreadValues(__spreadValues({}, baseInitialState), this.getInitialProviderState());
  }
  /**
   * Exports an image of the current map view
   *
   * @param {IMapImageExportOptions} options
   * @since 0.14
   */
  exportImage(options) {
    if (this._map) {
      const map = this._map;
      map.once("rendercomplete", function() {
        const mapCanvas = document.createElement("canvas");
        if (options.size) {
          const [w, h] = options.size;
          mapCanvas.width = w;
          mapCanvas.height = h;
        } else {
          const size = map.getSize();
          if (size) {
            mapCanvas.width = size[0];
            mapCanvas.height = size[1];
          }
        }
        const mapContext = mapCanvas.getContext("2d");
        if (mapContext) {
          const canvasSelector = ".ol-layer canvas, .external-vector-layer canvas";
          Array.prototype.forEach.call(document.querySelectorAll(canvasSelector), function(canvas) {
            var _a, _b, _c, _d, _e;
            if (canvas.width > 0) {
              const parentNode = canvas.parentNode;
              const opacity = (_b = (_a = parentNode == null ? void 0 : parentNode.style) == null ? void 0 : _a.opacity) != null ? _b : "";
              mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
              const transform2 = canvas.style.transform;
              const matrix = (_e = (_d = (_c = transform2.match(/^matrix\(([^\(]*)\)$/)) == null ? void 0 : _c[1]) == null ? void 0 : _d.split(",")) == null ? void 0 : _e.map(Number);
              if (matrix) {
                CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
                mapContext.drawImage(canvas, 0, 0);
              }
            }
          });
          options.callback(mapCanvas.toDataURL(options.exportMimeType));
        }
      });
      map.renderSync();
    }
  }
  /**
   * Adds a custom tile load function for a given base image tile layer.
   * 
   * NOTE: Unlike other load function registrations this must be done before the viewer is mounted. New load functions added at runtime will not be recognized
   * @param mapName
   * @param layerName The base layer this function should apply for
   * @param func The custom tile load function
   * @since 0.14
   */
  addBaseTileLoadFunction(mapName, layerName, func) {
    if (!this._baseTileSourceLoaders) {
      this._baseTileSourceLoaders = {};
    }
    if (!this._baseTileSourceLoaders[mapName]) {
      this._baseTileSourceLoaders[mapName] = {};
    }
    this._baseTileSourceLoaders[mapName][layerName] = func;
  }
  /**
   * Adds a custom tile load function for a given overlay image tile layer
   * @param mapName
   * @param layerName The layer this function should apply for
   * @param func The custom tile load function
   * @since 0.14
   */
  addTileLoadFunction(mapName, layerName, func) {
    if (!this._tileSourceLoaders) {
      this._tileSourceLoaders = {};
    }
    if (!this._tileSourceLoaders[mapName]) {
      this._tileSourceLoaders[mapName] = {};
    }
    this._tileSourceLoaders[mapName][layerName] = func;
  }
  /**
   * Adds a custom image load function for a given overlay image layer
   * @param mapName
   * @param layerName The layer this function should apply for
   * @param func The custom tile load function
   * @since 0.14
   */
  addImageLoadFunction(mapName, layerName, func) {
    if (!this._imageSourceLoaders) {
      this._imageSourceLoaders = {};
    }
    if (!this._imageSourceLoaders[mapName]) {
      this._imageSourceLoaders[mapName] = {};
    }
    this._imageSourceLoaders[mapName][layerName] = func;
  }
  /**
   * Adds a WMS query augmentation for the given WMS overlay layer
   * @param mapName
   * @param layerName The layer this function should apply for
   * @param func The WMS query augmentation
   * @since 0.14
   */
  addWmsQueryAugmentation(mapName, layerName, func) {
    if (!this._wmsQueryAugmentations) {
      this._wmsQueryAugmentations = {};
    }
    if (!this._wmsQueryAugmentations[mapName]) {
      this._wmsQueryAugmentations[mapName] = {};
    }
    this._wmsQueryAugmentations[mapName][layerName] = func;
  }
  addCustomSelectionPopupRenderer(mapName, layerName, renderer) {
    if (mapName && layerName) {
      if (!this._customSelectionPopupRenderers) {
        this._customSelectionPopupRenderers = {};
      }
      if (!this._customSelectionPopupRenderers[mapName]) {
        this._customSelectionPopupRenderers[mapName] = {};
      }
      this._customSelectionPopupRenderers[mapName][layerName] = renderer;
    } else {
      this._globalCustomSelectionPopupRenderer = renderer;
    }
  }
  getSelectionPopupRenderer(layerName) {
    if (!this._customSelectionPopupRenderers) {
      this._customSelectionPopupRenderers = {};
    }
    const { mapName } = this._state;
    if (mapName) {
      if (!this._customSelectionPopupRenderers[mapName]) {
        this._customSelectionPopupRenderers[mapName] = {};
      }
      const r = this._customSelectionPopupRenderers[mapName][layerName];
      if (r) {
        return r;
      }
    }
    if (this._globalCustomSelectionPopupRenderer) {
      return this._globalCustomSelectionPopupRenderer;
    }
    return void 0;
  }
  /**
   * @virtual
   */
  hideAllPopups() {
    var _a, _b;
    (_a = this._mouseTooltip) == null ? void 0 : _a.clear();
    (_b = this._selectTooltip) == null ? void 0 : _b.hide();
  }
  isReady() {
    return !!(this._map && this._comp);
  }
  /**
   * Stores a reference to the Redux store, injected by MapContextProvider.
   * Used by subclasses (e.g. GenericMapProviderContext) to lazily initialize
   * secondary map layer sets on demand (e.g. for the map swipe feature).
   *
   * @since 0.15
   */
  setReduxStore(store) {
    this._reduxStore = store;
  }
  /**
   * @since 0.15
   */
  getOLView() {
    var _a;
    return (_a = this._map) == null ? void 0 : _a.getView();
  }
  /**
   * Recursively collects leaf (non-group) OL layers from a LayerBase tree.
   * LayerGroup prerender/postrender canvas clip does not propagate to children in OL,
   * so we must attach clip handlers to the individual leaf layers.
   */
  getLeafLayersForClip(layer) {
    if (layer instanceof LayerGroup) {
      const result = [];
      for (const child of layer.getLayers().getArray()) {
        result.push(...this.getLeafLayersForClip(child));
      }
      return result;
    }
    return [layer];
  }
  attachClipHandler(layer, makeClipPath) {
    const preRenderHandler = (event) => {
      const ctx = event.context;
      if (!ctx || !this._map) return;
      const size = this._map.getSize();
      if (!size) return;
      makeClipPath(event, ctx, size);
    };
    const postRenderHandler = (event) => {
      const ctx = event.context;
      if (ctx) ctx.restore();
    };
    layer.on("prerender", preRenderHandler);
    layer.on("postrender", postRenderHandler);
    this._swipePreRenderHandlers.set(layer, preRenderHandler);
    this._swipePostRenderHandlers.set(layer, postRenderHandler);
  }
  addSecondaryComparisonLayers(secondaryMapName, makeClipPath) {
    if (!this._map) {
      return false;
    }
    const secondaryLayerSet = this.getLayerSetGroup(secondaryMapName);
    if (!secondaryLayerSet) {
      this.deactivateMapComparison();
      return false;
    }
    for (const topLayer of secondaryLayerSet.getSwipeableLayers()) {
      this._map.removeLayer(topLayer);
      this._map.addLayer(topLayer);
      this._swipeSecondaryTopLayers.push(topLayer);
      for (const leaf of this.getLeafLayersForClip(topLayer)) {
        this.attachClipHandler(leaf, makeClipPath);
        this._swipeSecondaryClipLayers.push(leaf);
      }
    }
    return true;
  }
  /**
   * @since 0.15
   */
  activateMapComparisonSwipe(secondaryMapName, position) {
    if (!this._map) {
      return false;
    }
    if (secondaryMapName === this._state.mapName) {
      return false;
    }
    this.deactivateMapComparison();
    this._comparisonMode = "swipe";
    this._swipePosition = position;
    this._swipeSecondaryMapName = secondaryMapName;
    const primaryLayerSet = this.getLayerSetGroup(this._state.mapName);
    if (primaryLayerSet) {
      for (const topLayer of primaryLayerSet.getSwipeableLayers()) {
        for (const leaf of this.getLeafLayersForClip(topLayer)) {
          this.attachClipHandler(leaf, (event, ctx, size) => {
            const width = this.getSwipeWidth(size[0]);
            const tl = getRenderPixel(event, [0, 0]);
            const tr2 = getRenderPixel(event, [width, 0]);
            const bl = getRenderPixel(event, [0, size[1]]);
            const br = getRenderPixel(event, [width, size[1]]);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(tl[0], tl[1]);
            ctx.lineTo(tr2[0], tr2[1]);
            ctx.lineTo(br[0], br[1]);
            ctx.lineTo(bl[0], bl[1]);
            ctx.closePath();
            ctx.clip();
          });
          this._swipePrimaryClipLayers.push(leaf);
        }
      }
    }
    const added = this.addSecondaryComparisonLayers(secondaryMapName, (event, ctx, size) => {
      const width = this.getSwipeWidth(size[0]);
      const tl = getRenderPixel(event, [width, 0]);
      const tr2 = getRenderPixel(event, [size[0], 0]);
      const bl = getRenderPixel(event, [width, size[1]]);
      const br = getRenderPixel(event, size);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(tl[0], tl[1]);
      ctx.lineTo(bl[0], bl[1]);
      ctx.lineTo(br[0], br[1]);
      ctx.lineTo(tr2[0], tr2[1]);
      ctx.closePath();
      ctx.clip();
    });
    if (!added) {
      return false;
    }
    primaryLayerSet == null ? void 0 : primaryLayerSet.ensureHelperLayersOnTop(this._map);
    this._map.render();
    return true;
  }
  activateMapComparisonSpy(secondaryMapName, radius) {
    if (!this._map) {
      return false;
    }
    if (secondaryMapName === this._state.mapName) {
      return false;
    }
    this.deactivateMapComparison();
    this._comparisonMode = "spy";
    this._swipeSecondaryMapName = secondaryMapName;
    this._spyCursorRadius = radius;
    const primaryLayerSet = this.getLayerSetGroup(this._state.mapName);
    const added = this.addSecondaryComparisonLayers(secondaryMapName, (event, ctx) => {
      ctx.save();
      ctx.beginPath();
      if (this._spyCursorPixel) {
        const center = getRenderPixel(event, this._spyCursorPixel);
        const offset = getRenderPixel(event, [this._spyCursorPixel[0] + this._spyCursorRadius, this._spyCursorPixel[1]]);
        const canvasRadius = Math.sqrt(
          Math.pow(offset[0] - center[0], 2) + Math.pow(offset[1] - center[1], 2)
        );
        ctx.arc(center[0], center[1], canvasRadius, 0, 2 * Math.PI);
      }
      ctx.clip();
    });
    if (!added) {
      return false;
    }
    primaryLayerSet == null ? void 0 : primaryLayerSet.ensureHelperLayersOnTop(this._map);
    this._map.render();
    return true;
  }
  getSwipeWidth(mapWidth) {
    return mapWidth * (this._swipePosition / 100);
  }
  /**
   * Returns the effective map name for handling a mouse event at the given pixel X
   * coordinate. When swipe mode is active and the pixel is to the right of the swipe
   * divider, returns the secondary map name; otherwise returns the active map name.
   *
   * @since 0.15
   */
  getEffectiveMapNameAtPixel(pixelX) {
    if (this._comparisonMode === "spy") {
      return this._state.mapName;
    }
    if (this._swipeSecondaryMapName && this._map) {
      const mapSize = this._map.getSize();
      if (mapSize && pixelX > this.getSwipeWidth(mapSize[0])) {
        return this._swipeSecondaryMapName;
      }
    }
    return this._state.mapName;
  }
  /**
   * @since 0.15
   */
  deactivateMapComparison() {
    if (!this._map) return;
    const allClipLayers = [...this._swipePrimaryClipLayers, ...this._swipeSecondaryClipLayers];
    for (const layer of allClipLayers) {
      const preHandler = this._swipePreRenderHandlers.get(layer);
      const postHandler = this._swipePostRenderHandlers.get(layer);
      if (preHandler) {
        layer.un("prerender", preHandler);
      }
      if (postHandler) {
        layer.un("postrender", postHandler);
      }
    }
    for (const topLayer of this._swipeSecondaryTopLayers) {
      this._map.removeLayer(topLayer);
    }
    this._swipePrimaryClipLayers = [];
    this._swipeSecondaryClipLayers = [];
    this._swipeSecondaryTopLayers = [];
    this._swipePreRenderHandlers = /* @__PURE__ */ new WeakMap();
    this._swipePostRenderHandlers = /* @__PURE__ */ new WeakMap();
    this._swipeSecondaryMapName = void 0;
    this._comparisonMode = "none";
    this._spyCursorPixel = void 0;
    this._map.render();
  }
  /**
   * @since 0.15
   */
  updateComparisonSwipePosition(position) {
    var _a;
    this._swipePosition = position;
    (_a = this._map) == null ? void 0 : _a.render();
  }
  /**
   * @since 0.15
   */
  updateSpyCursor(pixel) {
    var _a;
    this._spyCursorPixel = pixel;
    (_a = this._map) == null ? void 0 : _a.render();
  }
  updateSpyCursorRadius(radius) {
    var _a;
    this._spyCursorRadius = radius;
    (_a = this._map) == null ? void 0 : _a.render();
  }
  refreshMapComparison() {
    if (this._swipeSecondaryMapName) {
      if (this._comparisonMode === "swipe") {
        this.activateMapComparisonSwipe(this._swipeSecondaryMapName, this._swipePosition);
      } else if (this._comparisonMode === "spy") {
        this.activateMapComparisonSpy(this._swipeSecondaryMapName, this._spyCursorRadius);
      }
    }
  }
  /**
   * @since 0.15
   */
  transferLayerToComparisonSecondary(layerName) {
    if (!this._map || !this._swipeSecondaryMapName) return;
    const primaryLayerSet = this.getLayerSetGroup(this._state.mapName);
    const secondaryLayerSet = this.getLayerSetGroup(this._swipeSecondaryMapName);
    if (!primaryLayerSet || !secondaryLayerSet) return;
    const olLayer = primaryLayerSet.getLayer(layerName);
    if (!olLayer) return;
    const order = this._map.getLayers().getArray().indexOf(olLayer);
    primaryLayerSet.transferLayerOut(layerName);
    secondaryLayerSet.transferLayerIn(layerName, olLayer, order >= 0 ? order : this._map.getLayers().getLength());
    this.refreshMapComparison();
  }
  activateMapSwipe(secondaryMapName, position) {
    return this.activateMapComparisonSwipe(secondaryMapName, position);
  }
  deactivateMapSwipe() {
    this.deactivateMapComparison();
  }
  updateSwipePosition(position) {
    this.updateComparisonSwipePosition(position);
  }
  refreshSwipeClips() {
    this.refreshMapComparison();
  }
  transferLayerToSwipeSecondary(layerName) {
    this.transferLayerToComparisonSecondary(layerName);
  }
  //#region IMapViewer
  /**
   * @virtual
   * @returns {(IMapGuideViewerSupport | undefined)}
   *
   */
  mapguideSupport() {
    return void 0;
  }
  setActiveTool(tool) {
    var _a;
    (_a = this._comp) == null ? void 0 : _a.onDispatch(setActiveTool(tool));
  }
  getOLFactory() {
    return this.olFactory;
  }
  getMapName() {
    return this._state.mapName;
  }
  setViewRotation(rotation) {
    var _a;
    (_a = this._comp) == null ? void 0 : _a.onDispatch(setViewRotation(rotation));
  }
  getViewRotation() {
    return this._state.viewRotation;
  }
  isViewRotationEnabled() {
    return this._state.viewRotationEnabled;
  }
  setViewRotationEnabled(enabled) {
    var _a;
    (_a = this._comp) == null ? void 0 : _a.onDispatch(setViewRotationEnabled(enabled));
  }
  toastSuccess(iconName, message) {
    var _a, _b;
    return (_b = (_a = this._toasterRef) == null ? void 0 : _a.current) == null ? void 0 : _b.show({ icon: iconName, message, variant: "success" });
  }
  toastWarning(iconName, message) {
    var _a, _b;
    return (_b = (_a = this._toasterRef) == null ? void 0 : _a.current) == null ? void 0 : _b.show({ icon: iconName, message, variant: "warning" });
  }
  toastError(iconName, message) {
    var _a, _b;
    return (_b = (_a = this._toasterRef) == null ? void 0 : _a.current) == null ? void 0 : _b.show({ icon: iconName, message, variant: "danger" });
  }
  toastPrimary(iconName, message) {
    var _a, _b;
    return (_b = (_a = this._toasterRef) == null ? void 0 : _a.current) == null ? void 0 : _b.show({ icon: iconName, message, variant: "primary" });
  }
  dismissToast(key) {
    var _a, _b;
    (_b = (_a = this._toasterRef) == null ? void 0 : _a.current) == null ? void 0 : _b.dismiss(key);
  }
  addImageLoading() {
    var _a;
    (_a = this._comp) == null ? void 0 : _a.addImageLoading();
  }
  addImageLoaded() {
    var _a;
    (_a = this._comp) == null ? void 0 : _a.addImageLoaded();
  }
  addSubscribers(props) {
    var _a, _b;
    return (_b = (_a = this._comp) == null ? void 0 : _a.addSubscribers(props)) != null ? _b : [];
  }
  removeSubscribers(names) {
    var _a, _b;
    return (_b = (_a = this._comp) == null ? void 0 : _a.removeSubscribers(names)) != null ? _b : false;
  }
  getSubscribers() {
    var _a, _b;
    return (_b = (_a = this._comp) == null ? void 0 : _a.getSubscribers()) != null ? _b : [];
  }
  dispatch(action) {
    var _a;
    (_a = this._comp) == null ? void 0 : _a.onDispatch(action);
  }
  getDefaultPointCircleStyle() {
    return __spreadValues({}, DEFAULT_POINT_CIRCLE_STYLE);
  }
  getDefaultPointIconStyle() {
    return __spreadValues({}, DEFAULT_POINT_ICON_STYLE);
  }
  getDefaultLineStyle() {
    return __spreadValues({}, DEFAULT_LINE_STYLE);
  }
  getDefaultPolygonStyle() {
    return __spreadValues({}, DEFAULT_POLY_STYLE);
  }
  getBaseTileSourceLoaders(mapName) {
    var _a, _b;
    return (_b = (_a = this._baseTileSourceLoaders) == null ? void 0 : _a[mapName]) != null ? _b : {};
  }
  getTileSourceLoaders(mapName) {
    var _a, _b;
    return (_b = (_a = this._tileSourceLoaders) == null ? void 0 : _a[mapName]) != null ? _b : {};
  }
  getImageSourceLoaders(mapName) {
    var _a, _b;
    return (_b = (_a = this._imageSourceLoaders) == null ? void 0 : _a[mapName]) != null ? _b : {};
  }
  //#region IMapViewerContextCallback
  getMockMode() {
    return void 0;
  }
  addFeatureToHighlight(feat, bAppend) {
    var _a;
    if (this._state.mapName) {
      const layerSet = this.getLayerSetGroup(this._state.mapName);
      if (layerSet) {
        const sf = (_a = this._select) == null ? void 0 : _a.getFeatures();
        if (sf) {
          if (!bAppend) {
            sf.clear();
          }
          if (feat) {
            sf.push(feat);
          }
        }
      }
    }
  }
  //#endregion
  //#region Map Context
  getScaleForExtent(bounds) {
    assertIsDefined(this._map);
    assertIsDefined(this._state.mapName);
    const activeLayerSet = this.getLayerSetGroup(this._state.mapName);
    assertIsDefined(activeLayerSet);
    const size = this._map.getSize();
    assertIsDefined(size);
    const mcsW = getWidth(bounds);
    const mcsH = getHeight(bounds);
    const devW = size[0];
    const devH = size[1];
    const metersPerPixel = 0.0254 / activeLayerSet.getDpi();
    const metersPerUnit = activeLayerSet.getMetersPerUnit();
    let mapScale;
    if (devH * mcsW > devW * mcsH)
      mapScale = mcsW * metersPerUnit / (devW * metersPerPixel);
    else
      mapScale = mcsH * metersPerUnit / (devH * metersPerPixel);
    return mapScale;
  }
  getViewForExtent(extent) {
    assertIsDefined(this._map);
    let scale, center;
    if (getWidth(extent) == 0 || getHeight(extent) == 0) {
      const thisProj = this.getProjection();
      const inflatedBounds = inflateBoundsByMeters(thisProj, extent, 20);
      scale = this.getScaleForExtent(inflatedBounds);
      center = getCenter(inflatedBounds);
    } else {
      scale = this.getScaleForExtent(extent);
      center = getCenter(extent);
    }
    return {
      x: center[0],
      y: center[1],
      scale,
      resolution: this._map.getView().getResolution()
    };
  }
  onZoomSelectBox(e) {
    var _a;
    if (this._comp) {
      const extent = (_a = this._zoomSelectBox) == null ? void 0 : _a.getGeometry();
      if (!extent) {
        return;
      }
      switch (this._state.activeTool) {
        case ActiveMapTool.Zoom:
          {
            const ext = extent.getExtent();
            this._comp.onDispatch(setCurrentView(this.getViewForExtent(ext)));
          }
          break;
        case ActiveMapTool.Select:
          {
            this.selectFeaturesByExtent(extent);
          }
          break;
      }
    }
  }
  /**
   * @virtual
   * @protected
   * @param {GenericEvent} e
   * @returns
   *
   */
  onMouseMove(e) {
    var _a;
    if (this._comp) {
      this.handleMouseTooltipMouseMove(e);
      if (!this.isComparisonInteractionSuppressed()) {
        this.handleHighlightHover(e);
      } else if (this._highlightedFeature && this._state.mapName) {
        (_a = this.getLayerSetGroup(this._state.mapName)) == null ? void 0 : _a.removeHighlightedFeature(this._highlightedFeature);
        this._highlightedFeature = void 0;
        this._highlightedLayer = void 0;
      }
      if (this._comp.isContextMenuOpen()) {
        return;
      }
      if (this._state.mapName) {
        this._comp.onDispatch(setMouseCoordinates(this._state.mapName, e.coord));
      }
    }
  }
  incrementBusyWorker() {
    var _a;
    this._busyWorkers++;
    (_a = this._comp) == null ? void 0 : _a.onDispatch(setBusyCount(this._busyWorkers));
  }
  decrementBusyWorker() {
    var _a;
    this._busyWorkers--;
    (_a = this._comp) == null ? void 0 : _a.onDispatch(setBusyCount(this._busyWorkers));
  }
  applyView(layerSet, vw) {
    this._triggerZoomRequestOnMoveEnd = false;
    layerSet.getView().setCenter([vw.x, vw.y]);
    const res = layerSet.scaleToResolution(vw.scale);
    layerSet.getView().setResolution(res);
    this._triggerZoomRequestOnMoveEnd = true;
  }
  removeActiveDrawInteraction() {
    if (this._activeDrawInteraction && this._map && this._comp) {
      this._map.removeInteraction(this._activeDrawInteraction);
      this._activeDrawInteraction = null;
      this._comp.setDigitizingType(void 0);
    }
  }
  getActiveTool() {
    return this._state.activeTool;
  }
  cancelDigitization() {
    if (this.isDigitizing()) {
      this.removeActiveDrawInteraction();
      this.clearMouseTooltip();
    }
  }
  pushDrawInteraction(digitizingType, draw, handler, prompt) {
    assertIsDefined(this._comp);
    this.onBeginDigitization((cancel) => {
      if (!cancel) {
        assertIsDefined(this._map);
        assertIsDefined(this._comp);
        this.removeActiveDrawInteraction();
        this.clearMouseTooltip();
        if (prompt) {
          this.setMouseTooltip(prompt);
        }
        this._activeDrawInteraction = draw;
        this._activeDrawInteraction.once("drawend", (e) => {
          const drawnFeature = e.feature;
          const geom = drawnFeature.getGeometry();
          this.cancelDigitization();
          handler(geom);
        });
        this._map.addInteraction(this._activeDrawInteraction);
        this._comp.setDigitizingType(digitizingType);
      }
    });
  }
  /**
   * @virtual
   * @protected
   * @param {Polygon} geom
   *
   */
  selectFeaturesByExtent(geom) {
  }
  zoomByDelta(delta) {
    assertIsDefined(this._map);
    const view = this._map.getView();
    if (!view) {
      return;
    }
    const currentZoom = view.getZoom();
    if (currentZoom !== void 0) {
      const newZoom = view.getConstrainedZoom(currentZoom + delta);
      if (view.getAnimating()) {
        view.cancelAnimations();
      }
      view.animate({
        zoom: newZoom,
        duration: 250,
        easing: easeOut
      });
    }
  }
  ensureAndGetLayerSetGroup(nextState) {
    assertIsDefined(nextState.mapName);
    let layerSet = this._layerSetGroups[nextState.mapName];
    if (!layerSet) {
      layerSet = this.initLayerSet(nextState);
      this._layerSetGroups[nextState.mapName] = layerSet;
    }
    return layerSet;
  }
  //public getLayerSet(name: string, bCreate: boolean = false, props?: IMapViewerContextProps): MgLayerSet {
  getLayerSetGroup(name) {
    let layerSet;
    if (name) {
      layerSet = this._layerSetGroups[name];
    }
    return layerSet;
  }
  /**
   * @virtual
   * @readonly
   *
   */
  isMouseOverTooltip() {
    var _a, _b;
    return (_b = (_a = this._selectTooltip) == null ? void 0 : _a.isMouseOver) != null ? _b : false;
  }
  clearMouseTooltip() {
    var _a;
    (_a = this._mouseTooltip) == null ? void 0 : _a.clear();
  }
  setMouseTooltip(text) {
    var _a;
    (_a = this._mouseTooltip) == null ? void 0 : _a.setText(text);
  }
  handleMouseTooltipMouseMove(e) {
    var _a, _b;
    (_b = (_a = this._mouseTooltip) == null ? void 0 : _a.onMouseMove) == null ? void 0 : _b.call(_a, e);
  }
  isSpyComparisonActive() {
    return this._comparisonMode === "spy";
  }
  isComparisonInteractionSuppressed() {
    return this.isSpyComparisonActive();
  }
  isLayerHoverable(layer) {
    return !((layer == null ? void 0 : layer.get(LayerProperty.IS_HOVER_HIGHLIGHT)) == true) && !((layer == null ? void 0 : layer.get(LayerProperty.IS_WMS_SELECTION_OVERLAY)) == true) && !((layer == null ? void 0 : layer.get(LayerProperty.IS_HEATMAP)) == true) && !((layer == null ? void 0 : layer.get(LayerProperty.IS_MEASURE)) == true) && !((layer == null ? void 0 : layer.get(LayerProperty.DISABLE_HOVER)) == true);
  }
  handleHighlightHover(e) {
    if (this.isComparisonInteractionSuppressed()) {
      return;
    }
    if (e.dragging) {
      return;
    }
    if (this._state.busyWorkers > 0) {
      return;
    }
    if (this._state.mapName && this._map) {
      const activeLayerSet = this.getLayerSetGroup(this._state.mapName);
      if (!activeLayerSet) {
        return;
      }
      const pixel = this._map.getEventPixel(e.originalEvent);
      if (pixel) {
        const effectiveMapName = this.getEffectiveMapNameAtPixel(pixel[0]);
        const effectiveLayerSet = this.getLayerSetGroup(effectiveMapName);
        if (!effectiveLayerSet) {
          return;
        }
        const featureToLayerMap = [];
        this._map.forEachFeatureAtPixel(pixel, (feature2, layer2) => {
          if (this.isLayerHoverable(layer2) && (layer2 == null ? void 0 : layer2.get(LayerProperty.IS_SELECTABLE)) == true && feature2 instanceof Feature) {
            if (!this._swipeSecondaryMapName || effectiveLayerSet.ownsSwipeableLayer(layer2)) {
              featureToLayerMap.push([feature2, layer2]);
            }
          }
        }, {
          hitTolerance: 4
        });
        const feature = featureToLayerMap.length ? featureToLayerMap[0][0] : void 0;
        const layer = featureToLayerMap.length ? featureToLayerMap[0][1] : void 0;
        if (feature != this._highlightedFeature) {
          if (this._highlightedFeature) {
            activeLayerSet.removeHighlightedFeature(this._highlightedFeature);
          }
          if (feature) {
            activeLayerSet.addHighlightedFeature(feature);
          }
          this._highlightedFeature = feature;
          this._highlightedLayer = layer;
        }
      }
    }
  }
  hideSelectedVectorFeaturesTooltip() {
    var _a;
    (_a = this._selectTooltip) == null ? void 0 : _a.hide();
  }
  showSelectedVectorFeatures(features, pixel, featureToLayerMap, locale) {
    var _a;
    (_a = this._selectTooltip) == null ? void 0 : _a.showSelectedVectorFeatures(features, pixel, featureToLayerMap, locale);
  }
  queryWmsFeatures(mapName, coord, bAppendMode) {
    return __async(this, null, function* () {
      if (this.isComparisonInteractionSuppressed()) {
        return false;
      }
      if (mapName && this._map) {
        const activeLayerSet = this.getLayerSetGroup(mapName);
        const layerMgr = this.getLayerManager(mapName);
        const res = this._map.getView().getResolution();
        if (res && this._selectTooltip) {
          return yield this._selectTooltip.queryWmsFeatures(activeLayerSet, layerMgr, coord, res, bAppendMode, {
            getLocale: () => this._state.locale,
            addClientSelectedFeature: (feat, layer) => this.addClientSelectedFeature(feat, layer, mapName),
            addFeatureToHighlight: (feat, bAppend) => this.addFeatureToHighlight(feat, bAppend),
            getWmsRequestAugmentations: () => {
              var _a;
              return (_a = this._wmsQueryAugmentations[mapName]) != null ? _a : {};
            }
          });
        }
      }
      return false;
    });
  }
  /**
   * @virtual
   * @protected
   * @param {GenericEvent} e
   *
   */
  onImageError(e) {
  }
  addClientSelectedFeature(f, l, mapNameOverride) {
    var _a;
    if (this._select)
      this._select.getFeatures().push(f);
    const effectiveMapName = mapNameOverride != null ? mapNameOverride : this._state.mapName;
    if (effectiveMapName) {
      const features = f.get("features");
      let theFeature;
      if (Array.isArray(features)) {
        if (features.length == 1) {
          theFeature = features[0];
        } else {
          return;
        }
      } else {
        theFeature = f;
      }
      const p = __spreadValues({}, theFeature.getProperties());
      delete p[theFeature.getGeometryName()];
      const feat = {
        bounds: (_a = theFeature.getGeometry()) == null ? void 0 : _a.getExtent(),
        properties: p
      };
      this.dispatch(addClientSelectedFeature(effectiveMapName, l.get(LayerProperty.LAYER_NAME), feat));
    }
  }
  clearClientSelectedFeatures(mapNameOverride) {
    if (this._select)
      this._select.getFeatures().clear();
    const effectiveMapName = mapNameOverride != null ? mapNameOverride : this._state.mapName;
    if (effectiveMapName) {
      this.dispatch(clearClientSelection(effectiveMapName));
    }
  }
  onMapClick(e) {
    var _a, _b, _c;
    if (!this._comp || !this._map) {
      return;
    }
    if (this._comp.isContextMenuOpen()) {
      (_b = (_a = this._comp).onHideContextMenu) == null ? void 0 : _b.call(_a);
    }
    if (this.isDigitizing()) {
      return;
    }
    if (this.isComparisonInteractionSuppressed()) {
      this.hideSelectedVectorFeaturesTooltip();
      return;
    }
    const effectiveMapName = this.getEffectiveMapNameAtPixel(e.pixel[0]);
    const bAppendMode = false;
    let usedHoverFallback = false;
    const clearSelectionForCurrentClick = () => {
      if (this._swipeSecondaryMapName && this._state.mapName) {
        this.clearClientSelectedFeatures(this._state.mapName);
        this.clearClientSelectedFeatures(this._swipeSecondaryMapName);
      } else {
        this.clearClientSelectedFeatures(effectiveMapName);
      }
    };
    const featureToLayerMap = [];
    if (this._state.activeTool == ActiveMapTool.Select && this._select) {
      const effectiveLayerSet = this._swipeSecondaryMapName ? this.getLayerSetGroup(effectiveMapName) : void 0;
      this._map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
        if (featureToLayerMap.length == 0) {
          if (layer.get(LayerProperty.IS_SELECTABLE) == true && feature instanceof Feature) {
            if (!effectiveLayerSet || effectiveLayerSet.ownsSwipeableLayer(layer)) {
              featureToLayerMap.push([feature, layer]);
            }
          }
        }
      }, {
        hitTolerance: 4
      });
      if (featureToLayerMap.length == 0 && this._highlightedFeature && this._highlightedLayer) {
        if (this._highlightedLayer.get(LayerProperty.IS_SELECTABLE) == true) {
          if (!effectiveLayerSet || effectiveLayerSet.ownsSwipeableLayer(this._highlightedLayer)) {
            featureToLayerMap.push([this._highlightedFeature, this._highlightedLayer]);
            usedHoverFallback = true;
          }
        }
      }
      if (this._select && featureToLayerMap.length == 1) {
        const [f, l] = featureToLayerMap[0];
        if (isClusteredFeature(f) && getClusterSubFeatures(f).length > 1 && ((_c = l.get(LayerProperty.VECTOR_STYLE)) == null ? void 0 : _c.getClusterClickAction()) == ClusterClickAction.ZoomToClusterExtents) {
          const zoomBounds = getClusterSubFeatures(f).reduce((bounds, currentFeatures) => {
            const g = currentFeatures.getGeometry();
            if (g) {
              return extend$1(bounds, g.getExtent());
            } else {
              return bounds;
            }
          }, createEmpty());
          const inflatedBounds = inflateBoundsByMeters(this.getProjection(), zoomBounds, 20);
          this.zoomToExtent(inflatedBounds);
        } else {
          {
            reactDomExports.unstable_batchedUpdates(() => {
              clearSelectionForCurrentClick();
              this.addClientSelectedFeature(f, l, effectiveMapName);
            });
          }
        }
      }
    }
    const px = e.pixel;
    const isClickOnPrimary = !this._swipeSecondaryMapName || effectiveMapName === this._state.mapName;
    if (featureToLayerMap.length == 0) {
      this.hideSelectedVectorFeaturesTooltip();
      if (this._state.activeTool == ActiveMapTool.Select) {
        {
          clearSelectionForCurrentClick();
        }
        this.queryWmsFeatures(effectiveMapName, e.coordinate, bAppendMode).then((madeSelection) => {
          if (!madeSelection) {
            if (isClickOnPrimary) {
              this.onProviderMapClick(px);
            }
          } else {
            console.log("Made WMS selection. Skipping provider click event");
          }
        });
      } else {
        if (isClickOnPrimary) {
          this.onProviderMapClick(px);
        }
      }
    } else {
      if (this._select) {
        {
          const activeLayerSet = this.getLayerSetGroup(effectiveMapName);
          activeLayerSet == null ? void 0 : activeLayerSet.clearWmsSelectionOverlay();
        }
        const clickedFeatures = new Collection();
        for (const [feat] of featureToLayerMap) {
          clickedFeatures.push(feat);
        }
        this.showSelectedVectorFeatures(clickedFeatures, px, featureToLayerMap, this._state.locale);
        if (usedHoverFallback && this._state.activeTool == ActiveMapTool.Select && isClickOnPrimary) {
          this.onProviderMapClick(px);
        }
      }
    }
  }
  initContext(layerSet, locale, overviewMapElementSelector) {
    if (this._map) {
      const overviewMapOpts = {
        className: "ol-overviewmap ol-custom-overviewmap",
        layers: layerSet.getLayersForOverviewMap(),
        view: new View({
          projection: layerSet.getProjection()
        }),
        tipLabel: tr("OL_OVERVIEWMAP_TIP", locale),
        collapseLabel: String.fromCharCode(187),
        //'\u00BB',
        label: String.fromCharCode(171)
        //'\u00AB'
      };
      if (overviewMapElementSelector) {
        const el = overviewMapElementSelector();
        if (el) {
          overviewMapOpts.target = el;
          overviewMapOpts.collapsed = false;
          overviewMapOpts.collapsible = false;
        }
      }
      this._ovMap = new OverviewMap(overviewMapOpts);
      this._map.addControl(this._ovMap);
      this.onBeforeAttachingLayerSetGroup(layerSet);
      layerSet.attach(this._map, this._ovMap, false);
    }
  }
  //#endregion
  /**
   * @virtual
   * @protected
   * @param {TLayerSetGroup} layerSetGroup
   *
   */
  onBeforeAttachingLayerSetGroup(layerSetGroup) {
  }
  setToasterRef(ref) {
    this._toasterRef = ref;
  }
  onKeyDown(e) {
    var _a, _b;
    const cancelKey = (_a = this._state.cancelDigitizationKey) != null ? _a : KC_ESCAPE;
    const undoKey = (_b = this._state.undoLastPointKey) != null ? _b : KC_U;
    if (e.keyCode == cancelKey) {
      this.cancelDigitization();
    } else if (e.keyCode == undoKey && this._activeDrawInteraction) {
      this._activeDrawInteraction.removeLastPoint();
    }
  }
  isDigitizing() {
    if (!this._map)
      return false;
    const activeDraw = this._map.getInteractions().getArray().filter((inter) => inter instanceof Draw)[0];
    return activeDraw != null;
  }
  detachFromComponent() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    this._comp = void 0;
    (_a = this._select) == null ? void 0 : _a.dispose();
    this._select = void 0;
    if (this._boundZoomSelectBox) {
      (_b = this._zoomSelectBox) == null ? void 0 : _b.un("boxend", this._boundZoomSelectBox);
      this._boundZoomSelectBox = void 0;
    }
    if (this._boundClick) {
      (_c = this._map) == null ? void 0 : _c.un("click", this._boundClick);
      this._boundClick = void 0;
    }
    if (this._boundMouseMove) {
      (_d = this._map) == null ? void 0 : _d.un("pointermove", this._boundMouseMove);
      this._boundMouseMove = void 0;
    }
    if (this._boundResize) {
      (_e = this._map) == null ? void 0 : _e.un("change:size", this._boundResize);
      this._boundResize = void 0;
    }
    if (this._boundMoveEnd) {
      (_f = this._map) == null ? void 0 : _f.un("moveend", this._boundMoveEnd);
      this._boundMoveEnd = void 0;
    }
    (_g = this._zoomSelectBox) == null ? void 0 : _g.dispose();
    this._zoomSelectBox = void 0;
    (_h = this._activeDrawInteraction) == null ? void 0 : _h.dispose();
    this._activeDrawInteraction = null;
    (_i = this._selectTooltip) == null ? void 0 : _i.dispose();
    this._selectTooltip = void 0;
    (_j = this._mouseTooltip) == null ? void 0 : _j.dispose();
    this._mouseTooltip = void 0;
    (_k = this._map) == null ? void 0 : _k.setTarget(void 0);
    (_l = this._ovMap) == null ? void 0 : _l.setMap(void 0);
    this._map = void 0;
    this._ovMap = void 0;
    debug(`Map provider context detached from component and reset to initial state`);
  }
  onMoveEnd(e) {
    var _a, _b;
    if (this._triggerZoomRequestOnMoveEnd) {
      const cv = this.getCurrentView();
      if (isValidView(cv)) {
        (_a = this._comp) == null ? void 0 : _a.onDispatch(setCurrentView(cv));
      } else {
        console.warn("Attempt to set invalid view", cv);
      }
    } else {
      info("Triggering zoom request on moveend suppresseed");
    }
    if (e.frameState.viewState.rotation != this._state.viewRotation) {
      (_b = this._comp) == null ? void 0 : _b.onDispatch(setViewRotation(e.frameState.viewState.rotation));
    }
  }
  /**
   * @virtual
   * @param {HTMLElement} el
   * @param {IViewerComponent} comp
   *
   */
  attachToComponent(el, comp) {
    var _a, _b;
    this._comp = comp;
    this._select = new Select({
      condition: (e) => false,
      layers: (layer) => layer.get(LayerProperty.IS_SELECTABLE) == true || layer.get(LayerProperty.IS_SCRATCH) == true
    });
    this._zoomSelectBox = new DragBox({
      condition: (e) => {
        var _a2;
        if (this._state.activeTool == ActiveMapTool.Select && ((_a2 = this._comp) == null ? void 0 : _a2.selectCanDragPan()) === true) {
          return false;
        }
        const startingMiddleMouseDrag = e.type == "pointerdown" && isMiddleMouseDownEvent(e.originalEvent);
        return !this.isDigitizing() && !startingMiddleMouseDrag && (this._state.activeTool === ActiveMapTool.Select || this._state.activeTool === ActiveMapTool.Zoom);
      }
    });
    this._boundZoomSelectBox = this.onZoomSelectBox.bind(this);
    this._boundMouseMove = this.onMouseMove.bind(this);
    this._boundResize = this.onResize.bind(this);
    this._boundClick = this.onMapClick.bind(this);
    this._boundMoveEnd = this.onMoveEnd.bind(this);
    this._zoomSelectBox.on("boxend", this._boundZoomSelectBox);
    const mapOptions = {
      target: el,
      //layers: layers,
      //view: view,
      controls: [
        new Attribution({
          tipLabel: tr("OL_ATTRIBUTION_TIP", this._state.locale)
        }),
        new Rotate({
          tipLabel: tr("OL_RESET_ROTATION_TIP", this._state.locale)
        })
      ],
      interactions: [
        this._select,
        new DragRotate(),
        new DragPan({
          condition: (e) => {
            var _a2;
            if (this._state.activeTool == ActiveMapTool.Select && ((_a2 = this._comp) == null ? void 0 : _a2.selectCanDragPan()) === true) {
              return true;
            }
            const startingMiddleMouseDrag = e.type == "pointerdown" && isMiddleMouseDownEvent(e.originalEvent);
            const enabled = startingMiddleMouseDrag || this._supportsTouch || this._state.activeTool === ActiveMapTool.Pan;
            return enabled;
          }
        }),
        new PinchRotate(),
        new PinchZoom(),
        new KeyboardPan(),
        new KeyboardZoom(),
        new MouseWheelZoom(),
        this._zoomSelectBox
      ]
    };
    this._map = new Map$1(mapOptions);
    const viewport = this._map.getViewport();
    (_a = viewport.querySelector(".ol-overlaycontainer")) == null ? void 0 : _a.style.setProperty("z-index", "20");
    (_b = viewport.querySelector(".ol-overlaycontainer-stopevent")) == null ? void 0 : _b.style.setProperty("z-index", "20");
    const activeLayerSet = this.ensureAndGetLayerSetGroup(this._state);
    this.initContext(activeLayerSet, this._state.locale, this._state.overviewMapElementSelector);
    this._mouseTooltip = new MouseTrackingTooltip(this._map, this._comp.isContextMenuOpen);
    this._selectTooltip = new SelectedFeaturesTooltip(this._map, this);
    this._map.on("pointermove", this._boundMouseMove);
    this._map.on("change:size", this._boundResize);
    this._map.on("click", this._boundClick);
    this._map.on("moveend", this._boundMoveEnd);
    if (this._state.view) {
      const { x, y, scale } = this._state.view;
      this.zoomToView(x, y, scale);
    } else {
      const extents = activeLayerSet.getExtent();
      this._map.getView().fit(extents);
    }
    this.onResize(this._map.getSize());
  }
  scaleToResolution(scale) {
    assertIsDefined(this._state.mapName);
    const activeLayerSet = this.getLayerSetGroup(this._state.mapName);
    assertIsDefined(activeLayerSet);
    return activeLayerSet.scaleToResolution(scale);
  }
  resolutionToScale(resolution) {
    assertIsDefined(this._state.mapName);
    const activeLayerSet = this.getLayerSetGroup(this._state.mapName);
    assertIsDefined(activeLayerSet);
    return activeLayerSet.resolutionToScale(resolution);
  }
  getCurrentView() {
    assertIsDefined(this._map);
    const ov = this._map.getView();
    const center = ov.getCenter();
    const resolution = ov.getResolution();
    const scale = this.resolutionToScale(resolution);
    return {
      x: center[0],
      y: center[1],
      scale,
      resolution
    };
  }
  getCurrentExtent() {
    assertIsDefined(this._map);
    return this._map.getView().calculateExtent(this._map.getSize());
  }
  getSize() {
    assertIsDefined(this._map);
    return this._map.getSize();
  }
  zoomToView(x, y, scale) {
    if (this._map) {
      const view = this._map.getView();
      view.setCenter([x, y]);
      view.setResolution(this.scaleToResolution(scale));
    }
  }
  /**
   * @virtual
   * @param {RefreshMode} [mode=RefreshMode.LayersOnly | RefreshMode.SelectionOnly]
   *
   */
  refreshMap(mode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly) {
  }
  getMetersPerUnit() {
    assertIsDefined(this._state.mapName);
    const activeLayerSet = this.getLayerSetGroup(this._state.mapName);
    assertIsDefined(activeLayerSet);
    return activeLayerSet.getMetersPerUnit();
  }
  initialView() {
    assertIsDefined(this._comp);
    assertIsDefined(this._state.mapName);
    const activeLayerSet = this.getLayerSetGroup(this._state.mapName);
    assertIsDefined(activeLayerSet);
    this._comp.onDispatch(setCurrentView(this.getViewForExtent(activeLayerSet.getExtent())));
  }
  zoomDelta(delta) {
    this.zoomByDelta(delta);
  }
  zoomToExtent(extent) {
    var _a;
    (_a = this._comp) == null ? void 0 : _a.onDispatch(setCurrentView(this.getViewForExtent(extent)));
  }
  digitizePoint(handler, prompt) {
    assertIsDefined(this._comp);
    const draw = new Draw({
      type: "Point"
    });
    this.pushDrawInteraction("Point", draw, handler, prompt || tr("DIGITIZE_POINT_PROMPT", this._state.locale));
  }
  digitizeLine(handler, prompt) {
    assertIsDefined(this._comp);
    const draw = new Draw({
      type: "LineString",
      minPoints: 2,
      maxPoints: 2
    });
    this.pushDrawInteraction("Line", draw, handler, prompt || tr("DIGITIZE_LINE_PROMPT", this._state.locale));
  }
  digitizeLineString(handler, prompt) {
    var _a;
    assertIsDefined(this._comp);
    const draw = new Draw({
      type: "LineString",
      minPoints: 2
    });
    this.pushDrawInteraction("LineString", draw, handler, prompt || tr("DIGITIZE_LINESTRING_PROMPT", this._state.locale, {
      key: String.fromCharCode((_a = this._state.undoLastPointKey) != null ? _a : KC_U)
      //Pray that a sane (printable) key was bound
    }));
  }
  digitizeCircle(handler, prompt) {
    assertIsDefined(this._comp);
    const draw = new Draw({
      type: "Circle"
    });
    this.pushDrawInteraction("Circle", draw, handler, prompt || tr("DIGITIZE_CIRCLE_PROMPT", this._state.locale));
  }
  digitizeRectangle(handler, prompt) {
    assertIsDefined(this._comp);
    const geomFunc = (coordinates, geometry) => {
      if (!geometry) {
        geometry = new Polygon([]);
      }
      const start = coordinates[0];
      const end = coordinates[1];
      geometry.setCoordinates([
        [start, [start[0], end[1]], end, [end[0], start[1]], start]
      ]);
      return geometry;
    };
    const draw = new Draw({
      type: "LineString",
      maxPoints: 2,
      geometryFunction: geomFunc
    });
    this.pushDrawInteraction("Rectangle", draw, handler, prompt || tr("DIGITIZE_RECT_PROMPT", this._state.locale));
  }
  digitizePolygon(handler, prompt) {
    var _a;
    assertIsDefined(this._comp);
    const draw = new Draw({
      type: "Polygon"
    });
    this.pushDrawInteraction("Polygon", draw, handler, prompt || tr("DIGITIZE_POLYGON_PROMPT", this._state.locale, {
      key: String.fromCharCode((_a = this._state.undoLastPointKey) != null ? _a : KC_U)
      //Pray that a sane (printable) key was bound
    }));
  }
  addInteraction(interaction) {
    assertIsDefined(this._map);
    this._map.addInteraction(interaction);
    return interaction;
  }
  removeInteraction(interaction) {
    var _a;
    (_a = this._map) == null ? void 0 : _a.removeInteraction(interaction);
  }
  addOverlay(overlay) {
    var _a;
    (_a = this._map) == null ? void 0 : _a.addOverlay(overlay);
  }
  removeOverlay(overlay) {
    var _a;
    (_a = this._map) == null ? void 0 : _a.removeOverlay(overlay);
  }
  getProjection() {
    assertIsDefined(this._map);
    return this._map.getView().getProjection();
  }
  addHandler(eventName, handler) {
    var _a;
    (_a = this._map) == null ? void 0 : _a.on(eventName, handler);
  }
  removeHandler(eventName, handler) {
    var _a;
    (_a = this._map) == null ? void 0 : _a.un(eventName, handler);
  }
  updateSize() {
    var _a;
    (_a = this._map) == null ? void 0 : _a.updateSize();
  }
  getLayerManagerForLayerSet(layerSet) {
    assertIsDefined(this._map);
    return new LayerManager(this._map, layerSet);
  }
  getLayerManager(mapName) {
    assertIsDefined(this._map);
    assertIsDefined(this._state.mapName);
    if (mapName && mapName !== this._state.mapName) {
      const namedLayerSet = this.getLayerSetGroup(mapName);
      if (namedLayerSet) {
        return this.getLayerManagerForLayerSet(namedLayerSet);
      }
    }
    const layerSet = this.ensureAndGetLayerSetGroup(this._state);
    return this.getLayerManagerForLayerSet(layerSet);
  }
  screenToMapUnits(x, y) {
    const [mapDevW, mapDevH] = this.getSize();
    const [extX1, extY1, extX2, extY2] = this.getCurrentExtent();
    {
      if (x > mapDevW - 1) x = mapDevW - 1;
      else if (x < 0) x = 0;
      if (y > mapDevH - 1) y = mapDevH - 1;
      else if (y < 0) y = 0;
    }
    x = extX1 + (extX2 - extX1) * (x / mapDevW);
    y = extY1 - (extY1 - extY2) * (y / mapDevH);
    return [x, y];
  }
  getSelectedFeatures() {
    var _a;
    return (_a = this._select) == null ? void 0 : _a.getFeatures();
  }
  getPointSelectionBox(point, ptBuffer) {
    assertIsDefined(this._map);
    const pt1 = this._map.getCoordinateFromPixel([point[0] - ptBuffer, point[1] - ptBuffer]);
    const pt2 = this._map.getCoordinateFromPixel([point[0] + ptBuffer, point[1] + ptBuffer]);
    const minX = Math.min(pt1[0], pt2[0]);
    const minY = Math.min(pt1[1], pt2[1]);
    const maxX = Math.max(pt1[0], pt2[0]);
    const maxY = Math.min(pt1[1], pt2[1]);
    return [minX, minY, maxX, maxY];
  }
  getResolution() {
    assertIsDefined(this._map);
    return this._map.getView().getResolution();
  }
  updateOverviewMapElement(overviewMapElementSelector) {
    if (this._ovMap) {
      const el = overviewMapElementSelector();
      if (el) {
        this._ovMap.setCollapsed(false);
        this._ovMap.setCollapsible(false);
        this._ovMap.setTarget(el);
      } else {
        this._ovMap.setCollapsed(true);
        this._ovMap.setCollapsible(true);
        this._ovMap.setTarget(null);
      }
    }
  }
}
const MapLoadIndicator = (props) => {
  const { loaded, loading, color, position } = props;
  let visibility = "visible";
  const pc = Math.min(100, loaded / loading * 100);
  let width = pc.toFixed(1) + "%";
  if (loaded === loading || pc >= 100) {
    visibility = "hidden";
    width = "0";
  }
  const style = {
    position: "absolute",
    zIndex: 10,
    visibility,
    left: 0,
    height: 5,
    width,
    background: color,
    transition: "width 250ms"
  };
  if (position == "top") {
    style.top = 0;
  } else {
    style.bottom = 0;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style });
};
class SessionKeepAlive {
  constructor(getSession, client, onSessionExpired, check) {
    this.check = check;
    this.getSession = getSession;
    this.client = client;
    if (this.check) {
      this.client.getServerSessionTimeout(this.getSession()).then((tm) => {
        this.interval = tm / 5 * 1e3;
        this.timeoutID = setTimeout(this.tick.bind(this), this.interval);
      });
    }
  }
  dispose() {
    clearTimeout(this.timeoutID);
  }
  tick() {
    this.client.getServerSessionTimeout(this.getSession()).then((tm) => {
      this.timeoutID = setTimeout(this.tick.bind(this), this.interval);
    });
  }
  lastTry() {
    if (this.check) {
      return this.client.getServerSessionTimeout(this.getSession());
    } else {
      return Promise.resolve(-1);
    }
  }
}
const HIGHLIGHT_STYLE = new Style({
  stroke: new Stroke({
    color: "#f00",
    width: 3
  }),
  fill: new Fill({
    color: "rgba(255,0,0,0.1)"
  }),
  text: new Text({
    font: "12px Calibri,sans-serif",
    fill: new Fill({
      color: "#000"
    }),
    stroke: new Stroke({
      color: "#f00",
      width: 3
    })
  })
});
class LayerSetGroupBase {
  constructor(callback) {
    this.callback = callback;
    this.updateTransparency = (trans) => this.mainSet.updateTransparency(trans);
    this.fitViewToExtent = () => this.mainSet.view.fit(this.mainSet.extent);
    this.getView = () => this.mainSet.view;
    this.getDpi = () => this.mainSet.dpi;
    this.getExtent = () => this.mainSet.extent;
    this.getLayersForOverviewMap = () => this.overviewSet.getLayers();
    this.getProjection = () => this.mainSet.projection;
    this.refreshMap = (mode) => this.mainSet.refreshMap(mode);
    this.showActiveSelectedFeature = (mapExtent, size, uri) => this.mainSet.showActiveSelectedFeature(mapExtent, size, uri);
    this.getMetersPerUnit = () => this.mainSet.getMetersPerUnit();
    this.scaleToResolution = (scale) => this.mainSet.scaleToResolution(scale);
    this.resolutionToScale = (resolution) => this.mainSet.resolutionToScale(resolution);
    this.getMainSetLayers = () => this.mainSet.getLayers();
    this.getSwipeableLayers = () => [
      ...this.mainSet.getLayers(),
      ...Object.values(this._customLayers).map((c) => c.layer)
    ];
    this._customLayers = {};
    this.scratchLayer = new VectorLayer({
      source: new VectorSource()
    });
    this.scratchLayer.set(LayerProperty.LAYER_NAME, "__SCRATCH__");
    this.scratchLayer.set(LayerProperty.IS_SCRATCH, true);
    this.wmsSelOverlayLayer = new VectorLayer({
      source: new VectorSource()
    });
    this.wmsSelOverlayLayer.set(LayerProperty.LAYER_NAME, "__WMS_SELECTION_OVERLAY__");
    this.wmsSelOverlayLayer.set(LayerProperty.IS_WMS_SELECTION_OVERLAY, true);
    this.hoverHighlightLayer = new VectorLayer({
      source: new VectorSource(),
      style: (feature) => {
        return HIGHLIGHT_STYLE;
      }
    });
    this.hoverHighlightLayer.set(LayerProperty.LAYER_NAME, "__HOVER_HIGHLIGHT__");
    this.hoverHighlightLayer.set(LayerProperty.IS_HOVER_HIGHLIGHT, true);
  }
  addHighlightedFeature(feature) {
    var _a;
    (_a = this.hoverHighlightLayer.getSource()) == null ? void 0 : _a.addFeature(feature);
  }
  removeHighlightedFeature(feature) {
    const hs = this.hoverHighlightLayer.getSource();
    if (hs == null ? void 0 : hs.hasFeature(feature)) {
      hs.removeFeature(feature);
    }
  }
  clearHighlightedFeatures() {
    var _a;
    (_a = this.hoverHighlightLayer.getSource()) == null ? void 0 : _a.clear();
  }
  /**
   * @virtual
   * @returns {(LayerBase | undefined)}
   */
  tryGetSubjectLayer() {
    return void 0;
  }
  addWmsSelectionOverlay(feat) {
    var _a;
    (_a = this.wmsSelOverlayLayer.getSource()) == null ? void 0 : _a.addFeature(feat);
  }
  clearWmsSelectionOverlay() {
    var _a;
    (_a = this.wmsSelOverlayLayer.getSource()) == null ? void 0 : _a.clear();
  }
  addScratchFeature(feat) {
    var _a;
    (_a = this.scratchLayer.getSource()) == null ? void 0 : _a.addFeature(feat);
  }
  clearScratchLayer() {
    var _a;
    (_a = this.scratchLayer.getSource()) == null ? void 0 : _a.clear();
  }
  registerSourceEvents(source) {
    if (source instanceof ImageSource) {
      source.on("imageloadstart", this.callback.addImageLoading);
      if (isMapGuideImageSource(source)) {
        source.on("imageloaderror", this.callback.onImageError);
      }
      source.on("imageloaderror", this.callback.addImageLoaded);
      source.on("imageloadend", this.callback.addImageLoaded);
    } else if (source instanceof TileImage) {
      source.on("tileloadstart", this.callback.addImageLoading);
      source.on("tileloaderror", this.callback.addImageLoaded);
      source.on("tileloadend", this.callback.addImageLoaded);
    }
  }
  updateExternalBaseLayers(externalBaseLayers) {
    this.mainSet.updateExternalBaseLayers(externalBaseLayers);
    this.overviewSet.updateExternalBaseLayers(externalBaseLayers);
  }
  attach(map, ovMapControl, bSetLayers = true) {
    const layers = map.getLayers();
    layers.insertAt(0, this.hoverHighlightLayer);
    layers.insertAt(0, this.scratchLayer);
    const customLayers = Object.keys(this._customLayers).map((k) => this._customLayers[k]);
    customLayers.sort((a, b) => {
      return a.order - b.order;
    });
    for (const item of customLayers) {
      layers.remove(item.layer);
    }
    for (const item of customLayers) {
      layers.insertAt(0, item.layer);
    }
    const allLayers = this.mainSet.getLayers();
    for (let i = allLayers.length - 1; i >= 0; i--) {
      layers.insertAt(0, allLayers[i]);
    }
    map.setView(this.mainSet.view);
    if (bSetLayers) {
      const ovMap = ovMapControl.getOverviewMap();
      const ovLayers = this.getLayersForOverviewMap();
      for (const layer of ovLayers) {
        ovMap.addLayer(layer);
      }
      const center = this.mainSet.view.getCenter();
      if (center) {
        ovMap.setView(new View({
          center: [center[0], center[1]],
          resolution: this.mainSet.view.getResolution(),
          projection: this.mainSet.view.getProjection()
        }));
      } else {
        const view = new View({
          projection: this.mainSet.view.getProjection()
        });
        ovMap.setView(view);
        view.fit(this.mainSet.extent, { size: ovMap.getSize() });
      }
    }
  }
  detach(map, ovMapControl) {
    const allLayers = this.mainSet.getLayers();
    for (const layer of allLayers) {
      map.removeLayer(layer);
    }
    for (const layerName in this._customLayers) {
      map.removeLayer(this._customLayers[layerName].layer);
    }
    map.removeLayer(this.scratchLayer);
    map.removeLayer(this.hoverHighlightLayer);
    const ovLayers = this.getLayersForOverviewMap();
    const ovMap = ovMapControl.getOverviewMap();
    for (const layer of ovLayers) {
      ovMap.removeLayer(layer);
    }
  }
  getCustomLayers(map) {
    const larr = map.getLayers().getArray();
    const layers = larr.filter((l) => this._customLayers[l.get(LayerProperty.LAYER_NAME)] != null).map((l) => __spreadProps(__spreadValues({}, getLayerInfo(l, true)), {
      //Smuggle these values out for debugging purposes
      isSelectable: this._customLayers[l.get(LayerProperty.LAYER_NAME)].layer.get(LayerProperty.IS_SELECTABLE) == true,
      order: this._customLayers[l.get(LayerProperty.LAYER_NAME)].order
    }));
    return layers.reverse();
  }
  hasLayer(name) {
    return this._customLayers[name] != null;
  }
  addExternalLayer(map, extLayer, appSettings) {
    const layer = createOLLayerFromSubjectDefn(extLayer, map.getView().getProjection(), true, appSettings);
    return this.addLayer(map, extLayer.name, layer);
  }
  addLayer(map, name, layer, allowReplace) {
    const bAllow = !!allowReplace;
    if (this._customLayers[name]) {
      if (!bAllow) {
        throw new MgError(tr("LAYER_NAME_EXISTS", this.callback.getLocale(), { name }));
      } else {
        map.removeLayer(this._customLayers[name].layer);
      }
    }
    if (layer.get(LayerProperty.LAYER_NAME) != name)
      layer.set(LayerProperty.LAYER_NAME, name);
    if (!layer.get(LayerProperty.LAYER_DISPLAY_NAME))
      layer.set(LayerProperty.LAYER_DISPLAY_NAME, name);
    map.removeLayer(layer);
    map.addLayer(layer);
    this._customLayers[name] = { layer, order: map.getLayers().getArray().indexOf(layer) };
    const tileLoaders = this.callback.getTileLoaders();
    for (const k in tileLoaders) {
      const func = tileLoaders[k];
      const layer2 = this.getLayer(k);
      if (layer2) {
        if (layer2 instanceof TileLayer) {
          const source = layer2.getSource();
          if (source instanceof UrlTile) {
            source.setTileLoadFunction(func);
            debug(`Added custom tile loader for layer: ${k}`);
          }
        }
      }
    }
    const imageLoaders = this.callback.getImageLoaders();
    for (const k in imageLoaders) {
      const func = imageLoaders[k];
      const layer2 = this.getLayer(k);
      if (layer2) {
        if (layer2 instanceof ImageLayer) {
          const source = layer2.getSource();
          if (typeof source.setImageLoadFunction == "function") {
            source.setImageLoadFunction(func);
            debug(`Added custom tile loader for layer: ${k}`);
          }
        }
      }
    }
    return __spreadValues(__spreadValues({}, getLayerInfo(layer, true)), {
      isSelectable: this._customLayers[name].layer.get(LayerProperty.IS_SELECTABLE) == true,
      order: this._customLayers[name].order
    });
  }
  removeLayer(map, name) {
    let layer;
    if (this._customLayers[name]) {
      layer = this._customLayers[name].layer;
      map.removeLayer(layer);
      delete this._customLayers[name];
      return layer;
    }
  }
  getLayer(name) {
    var _a;
    let layer;
    if (this._customLayers[name]) {
      layer = (_a = this._customLayers[name]) == null ? void 0 : _a.layer;
    }
    return layer;
  }
  /**
   * Removes a layer from _customLayers tracking without removing it from the OL map.
   * Used when transferring a custom layer to another layer set group in swipe mode.
   * @param name The name of the layer to remove from tracking
   * @returns The removed OL layer, or undefined if not found
   * @since 0.15
   */
  transferLayerOut(name) {
    if (this._customLayers[name]) {
      const layer = this._customLayers[name].layer;
      delete this._customLayers[name];
      return layer;
    }
    return void 0;
  }
  /**
   * Adds a layer to _customLayers tracking without adding it to the OL map.
   * Used when receiving a custom layer transferred from another layer set group in swipe mode.
   * @param name The name (identifier) of the layer
   * @param layer The OpenLayers layer instance to track
   * @param order The layer's position index in the map's layer collection
   * @since 0.15
   */
  transferLayerIn(name, layer, order) {
    this._customLayers[name] = { layer, order };
  }
  /**
   * Returns true if the given OL layer is a custom (external) layer tracked by this layer set group.
   * Used in swipe mode to restrict feature hit-detection to the map that owns the clicked pixel.
   *
   * @since 0.15
   */
  ownsCustomLayer(layer) {
    return Object.values(this._customLayers).some((c) => c.layer === layer);
  }
  /**
   * Returns true if the given OL layer belongs to this layer set's swipeable layers,
   * including children of grouped layers.
   *
   * @since 0.15
   */
  ownsSwipeableLayer(layer) {
    if (!layer) {
      return false;
    }
    const hasLayer = (candidate) => {
      if (candidate === layer) {
        return true;
      }
      if (candidate instanceof LayerGroup) {
        return candidate.getLayers().getArray().some((child) => hasLayer(child));
      }
      return false;
    };
    return this.getSwipeableLayers().some((top) => hasLayer(top));
  }
  /**
   * Ensures helper overlays are at the top of the current OL layer stack if already attached.
   *
   * @since 0.15
   */
  ensureHelperLayersOnTop(map) {
    const cCurrentLayers = map.getLayers();
    const topLayers = cCurrentLayers.getArray();
    if (topLayers.includes(this.scratchLayer) && cCurrentLayers.item(cCurrentLayers.getLength() - 1) != this.scratchLayer) {
      map.removeLayer(this.scratchLayer);
      map.addLayer(this.scratchLayer);
    }
    if (topLayers.includes(this.wmsSelOverlayLayer) && cCurrentLayers.item(cCurrentLayers.getLength() - 1) != this.wmsSelOverlayLayer) {
      map.removeLayer(this.wmsSelOverlayLayer);
      map.addLayer(this.wmsSelOverlayLayer);
    }
    if (topLayers.includes(this.hoverHighlightLayer) && cCurrentLayers.item(cCurrentLayers.getLength() - 1) != this.hoverHighlightLayer) {
      map.removeLayer(this.hoverHighlightLayer);
      map.addLayer(this.hoverHighlightLayer);
    }
  }
  apply(map, layers) {
    var _a;
    const layersByName = layers.reduce((current, layer) => {
      current[layer.name] = layer;
      return current;
    }, {});
    for (const layer of layers) {
      const oll = (_a = this._customLayers[layer.name]) == null ? void 0 : _a.layer;
      if (oll) {
        oll.setVisible(layer.visible);
        oll.setOpacity(layer.opacity);
        oll.set(LayerProperty.BUSY_WORKER_COUNT, layer.busyWorkerCount);
        if (oll instanceof VectorLayer && layer.vectorStyle) {
          setOLVectorLayerStyle(oll, layer.vectorStyle, layer.cluster);
        }
        if (layer.heatmap) {
          if (oll instanceof Heatmap) {
            oll.setBlur(layer.heatmap.blur);
            oll.setRadius(layer.heatmap.radius);
          }
        }
      }
    }
    let theMeasureLayer;
    for (const layerName in this._customLayers) {
      if (!layersByName[layerName]) {
        const removed = this.removeLayer(map, layerName);
        if ((removed == null ? void 0 : removed.get(LayerProperty.IS_MEASURE)) === true) {
          theMeasureLayer = removed;
        }
      }
    }
    const cCurrentLayers = map.getLayers();
    const aCurrentLayers = cCurrentLayers.getArray();
    const currentLayers = aCurrentLayers.map((l) => ({
      name: l.get(LayerProperty.LAYER_NAME),
      type: l.get(LayerProperty.LAYER_TYPE),
      isExternal: l.get(LayerProperty.IS_EXTERNAL),
      isGroup: l.get(LayerProperty.IS_GROUP),
      layer: l
    })).filter((l) => {
      var _a2;
      return l.isExternal == true && ((_a2 = this._customLayers[l.name]) == null ? void 0 : _a2.layer) === l.layer;
    });
    if (currentLayers.length != layers.length) {
      for (const toRemove of currentLayers) {
        map.removeLayer(toRemove.layer);
      }
      for (const rn in this._customLayers) {
        const toRemove = this._customLayers[rn];
        map.removeLayer(toRemove.layer);
      }
      for (let i = layers.length - 1; i >= 0; i--) {
        const item = this._customLayers[layers[i].name];
        if (item) {
          map.addLayer(item.layer);
          item.order = cCurrentLayers.getArray().indexOf(item.layer);
        }
      }
    } else {
      let bReorder = false;
      let ii = 0;
      for (let i = layers.length - 1; i >= 0; i--) {
        const layer = layers[i];
        if (layer.name != currentLayers[ii].name) {
          bReorder = true;
          break;
        }
        ii++;
      }
      if (bReorder) {
        for (const toRemove of currentLayers) {
          map.removeLayer(toRemove.layer);
        }
        for (let i = layers.length - 1; i >= 0; i--) {
          const toAdd = currentLayers.filter((l) => l.name == layers[i].name)[0];
          map.addLayer(toAdd.layer);
          const item = this._customLayers[layers[i].name];
          if (item) {
            item.order = cCurrentLayers.getArray().indexOf(toAdd.layer);
          }
        }
      }
    }
    this.ensureHelperLayersOnTop(map);
    if (theMeasureLayer) {
      if (cCurrentLayers.item(cCurrentLayers.getLength() - 1) != theMeasureLayer) {
        map.removeLayer(theMeasureLayer);
        map.addLayer(theMeasureLayer);
      }
    }
  }
}
var MapGuideMockMode = /* @__PURE__ */ ((MapGuideMockMode2) => {
  MapGuideMockMode2[MapGuideMockMode2["RenderPlaceholder"] = 0] = "RenderPlaceholder";
  MapGuideMockMode2[MapGuideMockMode2["DoNotRender"] = 1] = "DoNotRender";
  return MapGuideMockMode2;
})(MapGuideMockMode || {});
reactExports.createContext({});
class MgLayerSetGroup extends LayerSetGroupBase {
  constructor(props, callback) {
    super(callback);
    this.updateSelectionColor = (color) => this.mainSet.updateSelectionColor(color);
    this.update = (showGroups, showLayers, hideGroups, hideLayers) => this.mainSet.update(showGroups, showLayers, hideGroups, hideLayers);
    const { map, agentUri } = props;
    const isRtMap = isRuntimeMap(map);
    const hasAgentUri = strIsNullOrEmpty(agentUri);
    if (isRtMap) {
      if (hasAgentUri) {
        throw new MgError("Expected agentUri to be set");
      }
    }
    const factory = new MgInnerLayerSetFactory(callback, map, agentUri, props.imageFormat, props.selectionImageFormat, props.selectionColor);
    this.mainSet = factory.create(props.locale, props.externalBaseLayers, props.stateless ? MgLayerSetMode.Stateless : MgLayerSetMode.Stateful, props.appSettings);
    this.overviewSet = factory.create(props.locale, props.externalBaseLayers, MgLayerSetMode.OverviewMap, props.appSettings);
    const progressNotifySources = this.mainSet.getSourcesForProgressTracking();
    for (const src of progressNotifySources) {
      const suppress = src.get(SourceProperty.SUPPRESS_LOAD_EVENTS);
      if (!(suppress == true))
        this.registerSourceEvents(src);
    }
  }
  /**
   * @override
   */
  tryGetSubjectLayer() {
    if (this.mainSet instanceof GenericLayerSetOL) {
      return this.mainSet.subjectLayer;
    } else if (this.mainSet instanceof MgLayerSetOL) {
      return this.mainSet.overlay;
    }
    return void 0;
  }
  /**
   * @override
   * @returns
   */
  tryGetWmsSource() {
    const subjectLayer = this.tryGetSubjectLayer();
    if (subjectLayer instanceof ImageLayer || subjectLayer instanceof TileLayer) {
      const source = subjectLayer.getSource();
      if (source instanceof ImageWMS || source instanceof TileWMS) {
        return [subjectLayer, source];
      }
    }
    return void 0;
  }
  setMapGuideMocking(mock) {
    const allLayers = this.mainSet.getLayers();
    for (const layer of allLayers) {
      if (layer instanceof ImageLayer) {
        const source = layer.getSource();
        if (source instanceof ImageMapGuide) {
          if (typeof mock != "undefined") {
            switch (mock) {
              case MapGuideMockMode.RenderPlaceholder:
                source.setImageLoadFunction(mockMapGuideImageLoadFunction);
                break;
              case MapGuideMockMode.DoNotRender:
                source.setImageLoadFunction(blankImageLoadFunction);
                break;
              default:
                assertNever();
                break;
            }
          } else {
            source.setImageLoadFunction(defaultImageLoadFunction);
          }
        }
      }
    }
  }
}
class FeatureQueryTooltip {
  constructor(map, callback) {
    this.setLinkClickHandler = () => {
      if (this.linkElement) {
        this.linkElement.onclick = this.handleLinkClick;
      }
    };
    this.handleLinkClick = (e) => {
      e.preventDefault();
      this.callback.openTooltipLink(e.target.href);
      return false;
    };
    this.callback = callback;
    this.wktFormat = new WKT();
    this.featureTooltipElement = document.createElement("div");
    this.featureTooltipElement.addEventListener("mouseover", () => this.isMouseOverTooltip = true);
    this.featureTooltipElement.addEventListener("mouseout", () => this.isMouseOverTooltip = false);
    this.featureTooltipElement.className = "feature-tooltip";
    this.featureTooltip = new Overlay({
      element: this.featureTooltipElement,
      offset: [15, 0],
      positioning: "center-left"
    });
    this.map = map;
    this.map.addOverlay(this.featureTooltip);
    this.throttledMouseMove = debounce((e) => {
      this.raiseQueryFromPoint(e.pixel);
    }, 1e3);
    this.enabled = true;
    this.isMouseOverTooltip = false;
  }
  dispose() {
    this.featureTooltip.dispose();
  }
  get isMouseOver() {
    return this.isMouseOverTooltip;
  }
  raiseQueryFromPoint(pixel) {
    const box = this.callback.getPointSelectionBox(pixel);
    if (!isEmpty(box)) {
      const geom = fromExtent(box);
      debug(`[${/* @__PURE__ */ new Date()}] FeatureTooltip - onMouseMove (${box[0]}, ${box[1]}) (${box[2]}, ${box[3]})`);
      this.sendTooltipQuery(geom);
    }
  }
  onMouseMove(e) {
    this.throttledMouseMove(e);
  }
  isEnabled() {
    return this.enabled;
  }
  setEnabled(enabled) {
    this.enabled = enabled;
    if (!this.enabled) {
      this.featureTooltipElement.innerHTML = "";
      this.featureTooltipElement.classList.add("tooltip-hidden");
      if (this.linkElement) {
        this.linkElement.onclick = null;
      }
    }
  }
  sendTooltipQuery(geom) {
    if (!this.enabled) {
      return;
    }
    if (this.isMouseOverTooltip) {
      debug(`Mouse over tooltip. Doing nothing`);
      return;
    }
    const reqQueryFeatures = 4 | 8;
    const wkt = this.wktFormat.writeGeometry(geom);
    const client = new Client(this.callback.getAgentUri(), this.callback.getAgentKind());
    const coords = getCenter(geom.getExtent());
    this.featureTooltip.setPosition(coords);
    client.queryMapFeatures({
      mapname: this.callback.getMapName(),
      session: this.callback.getSessionId(),
      //layernames: selectedLayerNames != null ? selectedLayerNames.join(",") : null,
      geometry: wkt,
      persist: 0,
      selectionvariant: "INTERSECTS",
      maxfeatures: 1,
      requestdata: reqQueryFeatures,
      layerattributefilter: 5
    }).then((res) => {
      let html = "";
      if (res.Tooltip) {
        html += `<div class='feature-tooltip-body'>${res.Tooltip.replace(/\\n/g, "<br/>")}</div>`;
      }
      if (res.Hyperlink) {
        html += `<div><a id='feature-tooltip-link' href='${res.Hyperlink}'>${tr("FEATURE_TOOLTIP_URL_HELP_TEXT", this.callback.getLocale())}</a></div>`;
      }
      this.featureTooltipElement.innerHTML = html;
      this.linkElement = document.getElementById("feature-tooltip-link");
      this.setLinkClickHandler();
      if (html == "") {
        this.featureTooltipElement.classList.add("tooltip-hidden");
        if (this.linkElement) {
          this.linkElement.onclick = null;
        }
      } else {
        this.featureTooltipElement.classList.remove("tooltip-hidden");
      }
    }).catch((err) => {
      if (isSessionExpiredError(err)) {
        this.callback.onSessionExpired();
      }
    });
  }
}
class UTFGridTrackingTooltip {
  constructor(map, gridSource, isContextMenuOpen) {
    this.map = map;
    this.gridSource = gridSource;
    this.isContextMenuOpen = isContextMenuOpen;
    this.map.getViewport().addEventListener("mouseout", this.onMouseOut.bind(this));
    this.tooltipElement = document.createElement("div");
    this.tooltipElement.className = "feature-tooltip";
    this.tooltip = new Overlay({
      element: this.tooltipElement,
      offset: [15, 0],
      positioning: "center-left"
    });
    this.map.addOverlay(this.tooltip);
    this.text = null;
  }
  dispose() {
    this.tooltip.dispose();
  }
  onMouseMove(e) {
    if (this.isContextMenuOpen())
      return;
    const viewResolution = (
      /** @type {number} */
      this.map.getView().getResolution()
    );
    if (viewResolution) {
      this.gridSource.forDataAtCoordinateAndResolution(e.coordinate, viewResolution, (data) => {
        if (data) {
          var html = "";
          if (data.MG_TOOLTIP)
            html += purify.sanitize(data.MG_TOOLTIP.replace(/(\\n)+/g, "<br />"));
          if (data.MG_URL) {
            html += "<br/><br/>";
            html += "<strong>CTRL + Click for more information</strong>";
          }
          this.tooltipElement.innerHTML = html;
        }
        this.tooltip.setPosition(data ? e.coordinate : void 0);
      });
    }
  }
  onMouseOut() {
  }
  setText(prompt) {
    this.text = prompt;
    this.tooltipElement.innerHTML = this.text;
  }
  clear() {
    this.text = null;
    this.tooltipElement.innerHTML = "";
  }
  destroy() {
    if (this.tooltipElement && this.tooltipElement.parentNode) {
      this.tooltipElement.parentNode.removeChild(this.tooltipElement);
    }
  }
}
function isMapGuideProviderState(arg) {
  return typeof arg.agentUri == "string" && typeof arg.agentKind == "string";
}
function useMapGuideViewerState() {
  const activeTool = useViewerActiveTool();
  const view = useActiveMapView();
  const viewRotation = useViewerViewRotation();
  const viewRotationEnabled = useViewerViewRotationEnabled();
  const mapName = useActiveMapName();
  const locale = useViewerLocale();
  const externalBaseLayers = useActiveMapExternalBaseLayers();
  const cancelDigitizationKey = useConfiguredCancelDigitizationKey();
  const undoLastPointKey = useConfiguredUndoLastPointKey();
  const layers = useActiveMapLayers();
  const initialExternalLayers = useActiveMapInitialExternalLayers();
  useReduxDispatch();
  const busyWorkers = useViewerBusyCount();
  const appSettings = useCustomAppSettings();
  const subject = useActiveMapSubjectLayer();
  const stateless = useViewerIsStateless();
  const imageFormat = useViewerImageFormat();
  const agentUri = useConfiguredAgentUri();
  const agentKind = useConfiguredAgentKind();
  const map = useActiveMapState();
  const pointSelectionBuffer = useViewerPointSelectionBuffer();
  const featureTooltipsEnabled = useViewerFeatureTooltipsEnabled();
  const manualFeatureTooltips = useConfiguredManualFeatureTooltips();
  const sessionId = useActiveMapSessionId();
  const selectionColor = useViewerSelectionColor();
  const selectionImageFormat = useViewerSelectionImageFormat();
  const selectableLayerNames = useActiveMapSelectableLayerNames();
  const layerTransparency = useActiveMapLayerTransparency();
  const showGroups = useActiveMapShowGroups();
  const hideGroups = useActiveMapHideGroups();
  const showLayers = useActiveMapShowLayers();
  const hideLayers = useActiveMapHideLayers();
  const activeSelectedFeature = useActiveMapActiveSelectedFeature();
  const activeSelectedFeatureColor = useViewerActiveFeatureSelectionColor();
  const selection = useActiveMapSelectionSet();
  let bgColor;
  if (map) {
    bgColor = `#${map.BackgroundColor.substring(2)}`;
  }
  let activeSelectedFeatureXml;
  if (activeSelectedFeature && selection && selection.FeatureSet) {
    activeSelectedFeatureXml = getActiveSelectedFeatureXml(selection.FeatureSet, activeSelectedFeature);
  }
  let theMap = map != null ? map : subject;
  let isReady = false;
  if (!theMap) {
    isReady = false;
    theMap = {};
  } else {
    if (subject && layerTransparency) {
      isReady = true;
    } else if (agentUri && theMap && layerTransparency) {
      if (!stateless) {
        if (isRuntimeMap(theMap) && sessionId) {
          isReady = true;
        }
      } else {
        isReady = true;
      }
    }
  }
  const nextState = {
    stateless,
    activeTool,
    busyWorkers,
    view,
    viewRotation,
    viewRotationEnabled,
    mapName,
    locale,
    externalBaseLayers,
    cancelDigitizationKey,
    undoLastPointKey,
    initialExternalLayers,
    appSettings: appSettings != null ? appSettings : {},
    // ========== IMapProviderStateExtras ========== //
    isReady,
    bgColor,
    layers,
    // =========== MapGuide-specific ============== //
    imageFormat,
    agentUri,
    agentKind,
    map: theMap,
    pointSelectionBuffer,
    featureTooltipsEnabled,
    manualFeatureTooltips,
    sessionId,
    selectionColor,
    selectionImageFormat,
    selectableLayerNames,
    layerTransparency,
    showGroups: showGroups != null ? showGroups : [],
    hideGroups: hideGroups != null ? hideGroups : [],
    showLayers: showLayers != null ? showLayers : [],
    hideLayers: hideLayers != null ? hideLayers : [],
    activeSelectedFeatureXml: activeSelectedFeatureXml != null ? activeSelectedFeatureXml : STR_EMPTY,
    activeSelectedFeatureColor,
    selection
  };
  return nextState;
}
class MapGuideMapProviderContext extends BaseMapProviderContext {
  // ============================================================= //
  constructor(mockMode = void 0) {
    super();
    this.mockMode = mockMode;
    this.onOpenTooltipLink = (url) => {
      var _a;
      let fixedUrl = url;
      if (this._state.mapName && this._state.sessionId) {
        fixedUrl = ensureParameters(url, this._state.mapName, this._state.sessionId, this._state.locale);
      }
      (_a = this._comp) == null ? void 0 : _a.onDispatch({
        type: ActionType.TASK_INVOKE_URL,
        payload: {
          url: fixedUrl
        }
      });
    };
    this._wktFormat = new WKT();
    this.refreshOnStateChange = debounce(this._refreshOnStateChange.bind(this), 500);
  }
  /**
   * @override
   */
  getHookFunction() {
    return useMapGuideViewerState;
  }
  setMockMode(mode) {
    this.mockMode = mode;
  }
  /**
   * @override
   */
  hideAllPopups() {
    var _a;
    super.hideAllPopups();
    (_a = this._featureTooltip) == null ? void 0 : _a.setEnabled(false);
  }
  /**
   *
   * @override
   * @protected
   * @returns {(MapGuideMockMode | undefined)}
   *
   */
  getMockMode() {
    return this.mockMode;
  }
  getInitialProviderState() {
    return {
      stateless: false,
      imageFormat: "PNG8",
      agentUri: void 0,
      agentKind: "mapagent",
      map: {},
      pointSelectionBuffer: 2,
      featureTooltipsEnabled: true,
      manualFeatureTooltips: false,
      sessionId: void 0,
      selectionColor: "0000FF",
      selectionImageFormat: "PNG8",
      selectableLayerNames: [],
      layerTransparency: {},
      appSettings: {},
      showGroups: [],
      hideGroups: [],
      showLayers: [],
      hideLayers: [],
      activeSelectedFeatureXml: STR_EMPTY,
      activeSelectedFeatureColor: "FF0000",
      selection: null
    };
  }
  getProviderName() {
    return "MapGuide";
  }
  /**
   * @override
   * @returns {(IMapGuideViewerSupport | undefined)}
   *
   */
  mapguideSupport() {
    return this;
  }
  //#region IMapGuideViewerSupport
  getSelection() {
    return this._state.selection;
  }
  getSelectionXml(selection, layerIds) {
    return buildSelectionXml(selection, layerIds);
  }
  getSessionId() {
    return this._state.sessionId;
  }
  setFeatureTooltipEnabled(enabled) {
    var _a;
    (_a = this._comp) == null ? void 0 : _a.onDispatch(setFeatureTooltipsEnabled(enabled));
  }
  //#endregion
  //#region IMapViewerContextCallback
  onSessionExpired() {
  }
  onProviderMapClick(px) {
    var _a;
    if (this._state.mapName && this._state.sessionId) {
      if (!this.isSpyComparisonActive() && this._state.manualFeatureTooltips && this._state.featureTooltipsEnabled) {
        this.queryFeatureTooltip(px);
      } else if (this._state.activeTool === ActiveMapTool.Select) {
        const ptBuffer = (_a = this._state.pointSelectionBuffer) != null ? _a : 2;
        const box = this.getPointSelectionBox(px, ptBuffer);
        const geom = fromExtent(box);
        const options = this.buildDefaultQueryOptions(geom);
        options.maxfeatures = 1;
        this.sendSelectionQuery(options);
      }
    }
  }
  //#endregion
  //#region Map Context
  /**
   * @override
   * @protected
   * @param {GenericEvent} e
   * @returns
   */
  onMouseMove(e) {
    var _a, _b;
    if (this._comp) {
      this.handleMouseTooltipMouseMove(e);
      if (this._state.activeTool == ActiveMapTool.Select) {
        this.handleHighlightHover(e);
      }
      if (this._comp.isContextMenuOpen()) {
        return;
      }
      if (!this._state.manualFeatureTooltips && !this.isSpyComparisonActive()) {
        this.handleFeatureTooltipMouseMove(e);
      }
      if (this._utfGridTooltip) {
        this._utfGridTooltip.onMouseMove(e);
      }
      if (this._state.mapName) {
        (_b = (_a = this._comp).onDispatch) == null ? void 0 : _b.call(_a, setMouseCoordinates(this._state.mapName, e.coordinate));
      }
    }
  }
  queryFeatureTooltip(pixel) {
    if (!this._state.stateless && this._featureTooltip && this._featureTooltip.isEnabled()) {
      this._featureTooltip.raiseQueryFromPoint(pixel);
    }
  }
  handleFeatureTooltipMouseMove(e) {
    if (!this._state.stateless && this._featureTooltip && this._featureTooltip.isEnabled()) {
      this._featureTooltip.onMouseMove(e);
    }
  }
  enableFeatureTooltips(enabled) {
    var _a;
    (_a = this._featureTooltip) == null ? void 0 : _a.setEnabled(enabled && !this.isSpyComparisonActive());
  }
  refreshMapInternal(name, mode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly) {
    const layerSet = this.getLayerSetGroup(name);
    layerSet == null ? void 0 : layerSet.refreshMap(mode);
  }
  showSelectedFeature(mapExtent, size, map, selectionColor, featureXml) {
    return __async(this, null, function* () {
      const sv = getSiteVersion(map);
      if (!canUseQueryMapFeaturesV4(sv)) {
        return;
      }
      const layerSet = this.getLayerSetGroup(map.Name);
      try {
        if (featureXml) {
          const r = yield this._client.queryMapFeatures_v4({
            mapname: map.Name,
            session: map.SessionId,
            selectionformat: "PNG",
            featurefilter: featureXml,
            selectioncolor: selectionColor,
            requestdata: 2,
            //Inline selection
            layerattributefilter: 0,
            persist: 0
            //IMPORTANT: This is a transient selection
          });
          if (r.InlineSelectionImage) {
            const dataUri = `data:${r.InlineSelectionImage.MimeType};base64,${r.InlineSelectionImage.Content}`;
            layerSet == null ? void 0 : layerSet.showActiveSelectedFeature(mapExtent, size, dataUri);
          } else {
            layerSet == null ? void 0 : layerSet.showActiveSelectedFeature(mapExtent, BLANK_SIZE, BLANK_GIF_DATA_URI);
          }
        } else {
          layerSet == null ? void 0 : layerSet.showActiveSelectedFeature(mapExtent, BLANK_SIZE, BLANK_GIF_DATA_URI);
        }
      } catch (e) {
        layerSet == null ? void 0 : layerSet.showActiveSelectedFeature(mapExtent, BLANK_SIZE, BLANK_GIF_DATA_URI);
      }
    });
  }
  //#endregion
  /**
   * DO NOT CALL DIRECTLY, call this.refreshOnStateChange() instead, which is a throttled version
   * of this method
   * @private
   */
  _refreshOnStateChange(mapName, showGroups, showLayers, hideGroups, hideLayers) {
    if (showGroups || showLayers || hideGroups || hideLayers) {
      const layerSet = this.getLayerSetGroup(mapName);
      if (layerSet instanceof MgLayerSetGroup) {
        layerSet.setMapGuideMocking(this.getMockMode());
        layerSet.update(showGroups, showLayers, hideGroups, hideLayers);
      }
    }
  }
  /**
   * @override
   * @protected
   * @param {GenericEvent} e
   *
   */
  onImageError(e) {
    var _a;
    (_a = this._keepAlive) == null ? void 0 : _a.lastTry().catch((err) => {
      if (isSessionExpiredError(err)) {
        this.onSessionExpired();
      }
    });
  }
  getSelectableLayers() {
    var _a;
    return (_a = this._state.selectableLayerNames) != null ? _a : [];
  }
  buildDefaultQueryOptions(geom, reqQueryFeatures = 1) {
    assertIsDefined(this._state.sessionId);
    assertIsDefined(this._state.mapName);
    const names = this.getSelectableLayers();
    let wkt;
    if (typeof geom === "string") {
      wkt = geom;
    } else {
      wkt = this._wktFormat.writeGeometry(geom);
    }
    return {
      mapname: this._state.mapName,
      session: this._state.sessionId,
      geometry: wkt,
      requestdata: reqQueryFeatures,
      layernames: names.length > 0 ? names.join(",") : void 0,
      persist: 1
    };
  }
  ensureMapLayerSetGroup(mapName) {
    var _a, _b, _c, _d, _e, _f;
    if (this._layerSetGroups[mapName] || !this._reduxStore) {
      return;
    }
    const appState = this._reduxStore.getState();
    const mapState = (_a = appState == null ? void 0 : appState.mapState) == null ? void 0 : _a[mapName];
    if (!mapState) {
      return;
    }
    const targetMap = (_d = (_b = mapState.generic) == null ? void 0 : _b.subject) != null ? _d : (_c = mapState.mapguide) == null ? void 0 : _c.runtimeMap;
    if (!targetMap) {
      return;
    }
    const targetState = __spreadProps(__spreadValues({}, this._state), {
      mapName,
      map: targetMap,
      externalBaseLayers: (_e = mapState.externalBaseLayers) != null ? _e : [],
      initialExternalLayers: (_f = mapState.initialExternalLayers) != null ? _f : [],
      showGroups: [],
      hideGroups: [],
      showLayers: [],
      hideLayers: [],
      layerTransparency: {},
      selection: null,
      activeSelectedFeatureXml: ""
    });
    this.initLayerSet(targetState);
  }
  /**
   * @virtual
   * @protected
   * @param {Polygon} geom
   *
   */
  selectFeaturesByExtent(geom) {
    if (!this._state.mapName || !this._comp || !this._state.sessionId || !this._state.selectionColor) {
      return;
    }
    this.sendSelectionQuery(this.buildDefaultQueryOptions(geom));
  }
  /**
   * @override
   * @protected
   */
  initLayerSet(nextState) {
    const { mapName } = nextState;
    assertIsDefined(mapName);
    assertIsDefined(this._state.map);
    const layerSet = new MgLayerSetGroup(nextState, {
      getImageLoaders: () => super.getImageSourceLoaders(mapName),
      getTileLoaders: () => super.getTileSourceLoaders(mapName),
      getBaseTileLoaders: () => super.getBaseTileSourceLoaders(mapName),
      getMockMode: () => this.getMockMode(),
      incrementBusyWorker: () => this.incrementBusyWorker(),
      decrementBusyWorker: () => this.decrementBusyWorker(),
      addImageLoading: () => {
        var _a;
        return (_a = this._comp) == null ? void 0 : _a.addImageLoading();
      },
      addImageLoaded: () => {
        var _a;
        return (_a = this._comp) == null ? void 0 : _a.addImageLoaded();
      },
      onImageError: (e) => this.onImageError(e),
      onSessionExpired: () => this.onSessionExpired(),
      getSelectableLayers: () => this.getSelectableLayers(),
      getClient: () => this._client,
      isContextMenuOpen: () => {
        var _a, _b;
        return (_b = (_a = this._comp) == null ? void 0 : _a.isContextMenuOpen()) != null ? _b : false;
      },
      getAgentUri: () => this._state.agentUri,
      getAgentKind: () => this._state.agentKind,
      getMapName: () => this._state.mapName,
      getSessionId: () => this._state.sessionId,
      getLocale: () => this._state.locale,
      isFeatureTooltipEnabled: () => this.isFeatureTooltipEnabled(),
      getPointSelectionBox: (pt) => this.getPointSelectionBox(pt, this._state.pointSelectionBuffer),
      openTooltipLink: (url) => this.onOpenTooltipLink(url),
      addFeatureToHighlight: (feat, bAppend) => this.addFeatureToHighlight(feat, bAppend)
    });
    this._layerSetGroups[mapName] = layerSet;
    layerSet.update(nextState.showGroups, nextState.showLayers, nextState.hideGroups, nextState.hideLayers);
    return layerSet;
  }
  /**
   * Override activateMapSwipe to eagerly initialize the secondary map's layer set group
   * if it hasn't been visited yet. The Redux store reference (stored by MapContextProvider)
   * is used to read the secondary map's configuration from state.
   *
   * @override
   * @since 0.15
   */
  activateMapComparisonSwipe(secondaryMapName, position) {
    this.ensureMapLayerSetGroup(secondaryMapName);
    return super.activateMapComparisonSwipe(secondaryMapName, position);
  }
  activateMapComparisonSpy(secondaryMapName, radius) {
    this.ensureMapLayerSetGroup(secondaryMapName);
    const activated = super.activateMapComparisonSpy(secondaryMapName, radius);
    if (activated) {
      this.enableFeatureTooltips(false);
    }
    return activated;
  }
  deactivateMapComparison() {
    super.deactivateMapComparison();
    this.enableFeatureTooltips(this._state.featureTooltipsEnabled);
  }
  getLayerManager(mapName) {
    if (mapName && mapName !== this._state.mapName) {
      this.ensureMapLayerSetGroup(mapName);
    }
    return super.getLayerManager(mapName);
  }
  /**
   * @override
   * @readonly
   *
   */
  isMouseOverTooltip() {
    var _a, _b;
    return ((_a = this._featureTooltip) == null ? void 0 : _a.isMouseOver) == true || ((_b = this._selectTooltip) == null ? void 0 : _b.isMouseOver) == true;
  }
  /**
   * @override
   */
  detachFromComponent() {
    var _a, _b;
    (_a = this._keepAlive) == null ? void 0 : _a.dispose();
    this._keepAlive = void 0;
    (_b = this._featureTooltip) == null ? void 0 : _b.dispose();
    this._featureTooltip = void 0;
    super.detachFromComponent();
  }
  /**
   * @override
   * @param {HTMLElement} el
   * @param {IViewerComponent} comp
   *
   */
  attachToComponent(el, comp) {
    var _a, _b, _c, _d;
    super.attachToComponent(el, comp);
    const bCheckSession = (_a = this._state.map && isRuntimeMap(this._state.map)) != null ? _a : false;
    this._keepAlive = new SessionKeepAlive(() => this._state.sessionId, this._client, this.onSessionExpired.bind(this), bCheckSession);
    const utfGridLayer = recursiveFindLayer(this._map.getLayers(), (oll) => {
      if (oll instanceof TileLayer) {
        const source = oll.getSource();
        if (source instanceof UTFGrid) {
          return true;
        }
      }
      return false;
    });
    if (utfGridLayer) {
      const source = utfGridLayer.getSource();
      this._utfGridTooltip = new UTFGridTrackingTooltip(this._map, source, (_c = (_b = this._comp) == null ? void 0 : _b.isContextMenuOpen) != null ? _c : () => false);
    }
    const bEnable = (_d = this._state.map && isRuntimeMap(this._state.map)) != null ? _d : false;
    if (bEnable) {
      this._featureTooltip = new FeatureQueryTooltip(this._map, {
        incrementBusyWorker: () => this.incrementBusyWorker(),
        decrementBusyWorker: () => this.decrementBusyWorker(),
        onSessionExpired: () => this.onSessionExpired(),
        getAgentUri: () => this._state.agentUri,
        getAgentKind: () => this._state.agentKind,
        getMapName: () => this._state.mapName,
        getSessionId: () => this._state.sessionId,
        getLocale: () => this._state.locale,
        getPointSelectionBox: (pt) => this.getPointSelectionBox(pt, this._state.pointSelectionBuffer),
        openTooltipLink: (url) => this.onOpenTooltipLink(url)
      });
      this._featureTooltip.setEnabled(this._state.featureTooltipsEnabled && !this.isSpyComparisonActive());
    }
  }
  /**
   * @override
   * @param {RefreshMode} [mode=RefreshMode.LayersOnly | RefreshMode.SelectionOnly]
   *
   */
  refreshMap(mode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly) {
    assertIsDefined(this._state.mapName);
    this.refreshMapInternal(this._state.mapName, mode);
  }
  /**
   * @override
   * @protected
   * @param {MgLayerSetGroup} layerSetGroup
   *
   */
  onBeforeAttachingLayerSetGroup(layerSetGroup) {
    layerSetGroup.setMapGuideMocking(this.getMockMode());
  }
  /**
   *
   * @virtual
   * @param {IMapGuideProviderState} nextState
   *
   */
  setProviderState(nextState) {
    var _a, _b, _c, _d, _e, _f;
    if (!this._comp || !this._map) {
      if (nextState.agentUri) {
        this._client = new Client(nextState.agentUri, nextState.agentKind);
      }
      this._state = nextState;
      return;
    }
    if (nextState.imageFormat != this._state.imageFormat) {
      warn(`Unsupported change of props: imageFormat`);
    }
    if (nextState.agentUri && nextState.agentUri != this._state.agentUri) {
      warn(`Unsupported change of props: agentUri`);
      this._client = new Client(nextState.agentUri, nextState.agentKind);
    }
    if (nextState.agentUri && nextState.agentKind != this._state.agentKind) {
      warn(`Unsupported change of props: agentKind`);
      this._client = new Client(nextState.agentUri, nextState.agentKind);
    }
    let bChangedView = false;
    if (nextState.mapName != this._state.mapName && this._map && this._ovMap) {
      const comparisonMode = (_d = (_c = (_b = (_a = this._reduxStore) == null ? void 0 : _a.getState()) == null ? void 0 : _b.config) == null ? void 0 : _c.comparisonMode) != null ? _d : "none";
      if (comparisonMode !== "none") {
        this.deactivateMapComparison();
        (_e = this._reduxStore) == null ? void 0 : _e.dispatch(setComparisonMode("none"));
      }
      this.hideAllPopups();
      const oldLayerSet = this.getLayerSetGroup(this._state.mapName);
      const newLayerSet = this.ensureAndGetLayerSetGroup(nextState);
      oldLayerSet == null ? void 0 : oldLayerSet.clearHighlightedFeatures();
      newLayerSet.clearHighlightedFeatures();
      oldLayerSet == null ? void 0 : oldLayerSet.detach(this._map, this._ovMap);
      newLayerSet.setMapGuideMocking(this.getMockMode());
      newLayerSet.attach(this._map, this._ovMap);
      if (!nextState.view) {
        newLayerSet.fitViewToExtent();
        bChangedView = true;
      } else {
        const layerSet = this.getLayerSetGroup(nextState.mapName);
        if (layerSet) {
          this.applyView(layerSet, nextState.view);
        }
      }
    }
    if (nextState.selectionColor && nextState.selectionColor != this._state.selectionColor) {
      const layerSet = this.getLayerSetGroup(nextState.mapName);
      layerSet == null ? void 0 : layerSet.updateSelectionColor(nextState.selectionColor);
    }
    if (nextState.featureTooltipsEnabled != this._state.featureTooltipsEnabled) {
      this.enableFeatureTooltips(nextState.featureTooltipsEnabled);
    }
    if (nextState.externalBaseLayers != null && nextState.externalBaseLayers.length > 0) {
      const layerSet = this.getLayerSetGroup(nextState.mapName);
      layerSet == null ? void 0 : layerSet.updateExternalBaseLayers(nextState.externalBaseLayers);
    }
    if (nextState.layerTransparency && layerTransparencyChanged(nextState.layerTransparency, this._state.layerTransparency)) {
      const layerSet = this.getLayerSetGroup(nextState.mapName);
      layerSet == null ? void 0 : layerSet.updateTransparency(nextState.layerTransparency);
    }
    if (nextState.mapName && (areArraysDifferent(nextState.showGroups, this._state.showGroups) || areArraysDifferent(nextState.hideGroups, this._state.hideGroups) || areArraysDifferent(nextState.showLayers, this._state.showLayers) || areArraysDifferent(nextState.hideLayers, this._state.hideLayers))) {
      this.refreshOnStateChange(nextState.mapName, nextState.showGroups, nextState.showLayers, nextState.hideGroups, nextState.hideLayers);
    }
    let bViewChanged = false;
    if (!areViewsCloseToEqual(nextState.view, this._state.view)) {
      const vw = nextState.view;
      if (vw != null && !bChangedView) {
        const layerSet = this.ensureAndGetLayerSetGroup(nextState);
        this.applyView(layerSet, vw);
        bViewChanged = true;
      } else {
        debug(`Skipping zoomToView as next/current views are close enough or target view is null`);
      }
    }
    if (nextState.overviewMapElementSelector) {
      this.updateOverviewMapElement(nextState.overviewMapElementSelector);
    }
    if (this._state.viewRotation != nextState.viewRotation) {
      (_f = this._map) == null ? void 0 : _f.getView().setRotation(nextState.viewRotation);
    }
    if (this._state.viewRotationEnabled != nextState.viewRotationEnabled) {
      if (this._map) {
        const view = this._map.getView();
        const newView = new View({
          enableRotation: nextState.viewRotationEnabled,
          rotation: nextState.viewRotation,
          center: view.getCenter(),
          resolution: view.getResolution(),
          resolutions: view.getResolutions(),
          minResolution: view.getMinResolution(),
          maxResolution: view.getMaxResolution(),
          maxZoom: view.getMaxZoom(),
          minZoom: view.getMinZoom(),
          //constrainRotation: view.constrainRotation(),
          projection: view.getProjection(),
          zoom: view.getZoom()
        });
        this._map.setView(newView);
      }
    }
    const bDiffSelectionXml = this._state.activeSelectedFeatureXml != nextState.activeSelectedFeatureXml;
    const bRefreshActiveFeatureSelection = !strIsNullOrEmpty(nextState.activeSelectedFeatureXml) && bViewChanged;
    if (bDiffSelectionXml || bRefreshActiveFeatureSelection) {
      if (this._map && nextState.map) {
        const ms = this._map.getSize();
        if (ms && isRuntimeMap(nextState.map)) {
          const nmap = nextState.map;
          const checkReady = () => {
            var _a2;
            if (this._busyWorkers == 0) {
              const view = (_a2 = this._map) == null ? void 0 : _a2.getView();
              if (!view) return;
              const me = view.calculateExtent(ms);
              const size = { w: ms[0], h: ms[1] };
              this.showSelectedFeature(me, size, nmap, nextState.activeSelectedFeatureColor, nextState.activeSelectedFeatureXml);
            } else {
              window.setTimeout(checkReady, 100);
            }
          };
          checkReady();
        }
      }
    }
    this._state = nextState;
  }
  setSelectionXml(xml, queryOpts, success, failure) {
    var _a;
    if (!this._state.mapName || !this._comp || !this._state.sessionId || !this._state.selectionColor) {
      return;
    }
    const reqQueryFeatures = 1;
    this.incrementBusyWorker();
    const mapName = this._state.mapName;
    const qOrig = {
      mapname: mapName,
      session: this._state.sessionId,
      persist: 1,
      featurefilter: xml,
      selectioncolor: this._state.selectionColor,
      selectionformat: (_a = this._state.selectionImageFormat) != null ? _a : "PNG8",
      maxfeatures: -1,
      requestdata: reqQueryFeatures
    };
    const queryOptions = __spreadValues(__spreadValues({}, qOrig), queryOpts);
    const action = queryMapFeatures(mapName, {
      options: queryOptions,
      callback: (res) => {
        this.decrementBusyWorker();
        if (success) {
          success(res);
        }
      },
      errBack: (err) => {
        this.decrementBusyWorker();
        if (failure) {
          failure(err);
        }
      }
    });
    this._comp.onDispatch(action);
  }
  clearSelection() {
    this.setSelectionXml("");
  }
  selectByGeometry(geom, selectionMethod) {
    const options = this.buildDefaultQueryOptions(geom);
    if (selectionMethod) {
      options.selectionvariant = selectionMethod;
    }
    this.sendSelectionQuery(options);
  }
  queryMapFeatures(options, success, failure) {
    this.sendSelectionQuery(options, success, failure);
  }
  isFeatureTooltipEnabled() {
    var _a;
    return ((_a = this._featureTooltip) == null ? void 0 : _a.isEnabled()) == true;
  }
  // ================= MapGuide-specific =================== //
  sendSelectionQuery(queryOpts, success, failure) {
    var _a, _b;
    if (!this._state.mapName || !this._comp || !this._state.sessionId || !this._state.selectionColor || queryOpts != null && ((_a = queryOpts.layernames) != null ? _a : []).length == 0) {
      return;
    }
    this.incrementBusyWorker();
    const mapName = this._state.mapName;
    const qOrig = {
      mapname: mapName,
      session: this._state.sessionId,
      persist: 1,
      selectionvariant: "INTERSECTS",
      selectioncolor: this._state.selectionColor,
      selectionformat: (_b = this._state.selectionImageFormat) != null ? _b : "PNG8",
      maxfeatures: -1
    };
    const queryOptions = __spreadValues(__spreadValues({}, qOrig), queryOpts);
    const action = queryMapFeatures(mapName, {
      options: queryOptions,
      callback: (res) => {
        this.decrementBusyWorker();
        if (success) {
          success(res);
        }
      },
      errBack: (err) => {
        this.decrementBusyWorker();
        if (failure) {
          failure(err);
        }
      },
      append: this._comp.isShiftKeyDown()
    });
    this._comp.onDispatch(action);
  }
}
const Subscriber = (props) => {
  const state = useAppState(props.appStateSelector, props.appStateEqualityFn);
  reactExports.useEffect(() => {
    props.onNewState(state);
  }, [state]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("noscript", { "data-subscriber-name": props.name });
};
function useLoadingCounters() {
  const [loading, setLoading] = reactExports.useState(0);
  const [loaded, setLoaded] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (loaded > 0 && loading === loaded) {
      setTimeout(() => {
        setLoading(0);
        setLoaded(0);
      }, 100);
    }
  }, [loaded, loaded]);
  return {
    loading,
    loaded,
    incrementLoading: () => setLoading((l) => l + 1),
    incrementLoaded: () => setLoaded((l) => l + 1)
  };
}
const MapViewer = ({ children }) => {
  var _a;
  const context = useMapProviderContext();
  const { Toaster } = useElementContext();
  const toasterRef = reactExports.useRef(null);
  const loadIndicatorPositioning = useConfiguredLoadIndicatorPositioning();
  const loadIndicatorColor = useConfiguredLoadIndicatorColor();
  const dispatch = useReduxDispatch();
  const hookFunc = context.getHookFunction();
  const clientSelection = useActiveMapClientSelectionSet();
  const appSettings = useCustomAppSettings();
  const nextState = hookFunc();
  const {
    mapName,
    layers,
    initialExternalLayers,
    bgColor,
    locale
  } = nextState;
  const flyouts = useViewerFlyouts();
  const [shiftKey, setShiftKey] = reactExports.useState(false);
  const [isMouseDown, setIsMouseDown] = reactExports.useState(false);
  const [digitizingType, setDigitizingType] = reactExports.useState(void 0);
  const {
    loaded,
    loading,
    incrementLoaded,
    incrementLoading
  } = useLoadingCounters();
  const [subscribers, setSubscribers] = reactExports.useState([]);
  const mapViewerRef = reactExports.useRef(null);
  const bContextMenuOpen = ((_a = flyouts[WEBLAYOUT_CONTEXTMENU]) == null ? void 0 : _a.open) == true;
  const bSelectCanDragPan = useViewerSelectCanDragPan();
  const isComparisonActive = useIsComparisonActive();
  const comparisonInfo = useMapComparisonInfo();
  const secondaryMapName = isComparisonActive ? comparisonInfo == null ? void 0 : comparisonInfo.pair.secondaryMapName : void 0;
  const secondaryLayers = useNamedMapLayers(secondaryMapName);
  reactExports.useEffect(() => {
    if (context.isReady() && secondaryMapName && secondaryLayers) {
      const layerManager = context.getLayerManager(secondaryMapName);
      layerManager.apply(secondaryLayers);
    }
  }, [context, secondaryMapName, secondaryLayers]);
  let agentUri;
  let agentKind;
  let selection = null;
  if (isMapGuideProviderState(nextState)) {
    agentUri = nextState.agentUri;
    agentKind = nextState.agentKind;
    selection = nextState.selection;
  }
  reactExports.useEffect(() => {
    const onKeyDown = (e) => {
      context.onKeyDown(e);
      setShiftKey(e.shiftKey);
    };
    const onKeyUp = (e) => {
      setShiftKey(e.shiftKey);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    const mapNode = mapViewerRef.current;
    if (mapNode) {
      context.attachToComponent(mapNode, viewerComponentApi);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      context.detachFromComponent();
    };
  }, []);
  reactExports.useEffect(() => {
    var _a2;
    if (!clientSelection) {
      (_a2 = context.getSelectedFeatures()) == null ? void 0 : _a2.clear();
    }
  }, [clientSelection, context]);
  context.setToasterRef(toasterRef);
  context.setProviderState(nextState);
  useViewerSideEffects(
    context,
    appSettings != null ? appSettings : {},
    nextState.isReady,
    mapName,
    layers,
    initialExternalLayers,
    agentUri,
    agentKind,
    selection
  );
  const viewerComponentApi = reactExports.useMemo(() => ({
    isShiftKeyDown: () => shiftKey,
    selectCanDragPan: () => bSelectCanDragPan,
    isContextMenuOpen: () => bContextMenuOpen,
    setDigitizingType,
    onBeginDigitization: (_callback) => {
    },
    onHideContextMenu: () => hideContextMenuAction(),
    onOpenTooltipLink: (_url) => {
    },
    onDispatch: (action) => dispatch(action),
    addImageLoading: () => {
      context.incrementBusyWorker();
      incrementLoading();
    },
    addSubscribers: (props) => {
      setSubscribers((subs) => [...subs, ...props]);
      return props.map((p) => p.name);
    },
    removeSubscribers: (names) => {
      setSubscribers((subs) => subs.filter((s) => names.indexOf(s.name) < 0));
      return subscribers.filter((s) => names.indexOf(s.name) < 0).length < subscribers.length;
    },
    getSubscribers: () => subscribers.map((s) => s.name),
    addImageLoaded: () => {
      incrementLoaded();
      context.decrementBusyWorker();
    }
  }), [shiftKey, bSelectCanDragPan, bContextMenuOpen, dispatch, context, subscribers]);
  const showContextMenuAction = (pos) => dispatch(openContextMenu({ x: pos[0], y: pos[1] }));
  const hideContextMenuAction = () => dispatch(closeContextMenu());
  const onContextMenu = (e) => {
    if (context.isMouseOverTooltip()) {
      return;
    }
    e.preventDefault();
    showContextMenuAction([e.clientX, e.clientY]);
  };
  const onMouseDown = (e) => {
    var _a2;
    const target = e.target;
    if (!target.closest("button, input, select, textarea, [role='button']")) {
      (_a2 = mapViewerRef.current) == null ? void 0 : _a2.focus();
    }
    setIsMouseDown(true);
  };
  const onMouseUp = () => {
    setIsMouseDown(false);
  };
  const tool = context.getActiveTool();
  const style = {
    width: "100%",
    height: "100%"
  };
  if (!((appSettings == null ? void 0 : appSettings["DISABLE_CURSORS"]) == "1")) {
    if (context.isDigitizing()) {
      switch (digitizingType) {
        case "Point":
          style.cursor = `url(${CURSOR_DIGITIZE_POINT}), auto`;
          break;
        case "Line":
          style.cursor = `url(${CURSOR_DIGITIZE_LINE}), auto`;
          break;
        case "LineString":
          style.cursor = `url(${CURSOR_DIGITIZE_LINESTRING}), auto`;
          break;
        case "Rectangle":
          style.cursor = `url(${CURSOR_DIGITIZE_RECT}), auto`;
          break;
        case "Polygon":
          style.cursor = `url(${CURSOR_DIGITIZE_POLYGON}), auto`;
          break;
        case "Circle":
          style.cursor = `url(${CURSOR_DIGITIZE_CIRCLE}), auto`;
          break;
      }
    } else {
      switch (tool) {
        case ActiveMapTool.Pan:
          style.cursor = isMouseDown ? `url(${CURSOR_GRABBING}), auto` : `url(${CURSOR_GRAB}), auto`;
          break;
        case ActiveMapTool.Zoom:
          style.cursor = `url(${CURSOR_ZOOM_IN}), auto`;
          break;
      }
    }
  }
  if (bgColor) {
    style.backgroundColor = bgColor;
  }
  if (nextState.isReady) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { usePortal: false, position: "top", ref: toasterRef }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "map-viewer-component",
          ref: mapViewerRef,
          style,
          tabIndex: 0,
          onContextMenu,
          onMouseDown,
          onMouseUp,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MapLoadIndicator,
              {
                loaded: loaded || 0,
                loading: loading || 0,
                position: loadIndicatorPositioning,
                color: loadIndicatorColor
              }
            ),
            subscribers.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Subscriber, __spreadValues({}, s), `subscriber-${i}-${s.name}`)),
            children,
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapComparisonControl, {})
          ]
        }
      )
    ] });
  } else {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: tr("LOADING_MSG", locale) });
  }
};
const MapToolbar = (props) => {
  const comparisonInfo = useMapComparisonInfo();
  const comparisonMode = useComparisonMode();
  const comparisonActive = comparisonMode !== "none";
  const dispatch = useReduxDispatch();
  const { Button, Card, Popover: Popover2, Heading } = useElementContext();
  const { locale, featureTooltipsEnabled, hasSelection, map, onInvokeCommand, onSetActiveTool, activeTool, isLayerManagerOpen, setIsLayerManagerOpen, setIsLegendOpen, setIsSelectionPanelOpen, onSetFeatureTooltips } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ElementGroup, { vertical: true, style: { zIndex: 10, position: "absolute", left: 30, top: 30 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: "plus", title: tr("NAVIGATOR_ZOOM_IN"), onClick: () => onInvokeCommand(DefaultCommands.ZoomIn) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: "minus", title: tr("NAVIGATOR_ZOOM_OUT"), onClick: () => onInvokeCommand(DefaultCommands.ZoomOut) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: "hand", variant: activeTool == ActiveMapTool.Pan ? "primary" : void 0, onClick: () => onInvokeCommand(DefaultCommands.Pan) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: "zoom-to-fit", title: tr("LAYER_MANAGER_TT_ZOOM_EXTENTS"), onClick: () => onInvokeCommand(DefaultCommands.ZoomExtents) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: "select", variant: activeTool == ActiveMapTool.Select ? "primary" : void 0, onClick: () => onSetActiveTool(ActiveMapTool.Select) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: "layers", title: tr("MANAGE_LAYERS", locale), variant: isLayerManagerOpen ? "primary" : void 0, onClick: () => setIsLayerManagerOpen(!isLayerManagerOpen) }),
    map && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: "comment", title: tr("FEATURE_TOOLTIPS", locale), variant: featureTooltipsEnabled ? "primary" : void 0, onClick: () => onSetFeatureTooltips(!featureTooltipsEnabled) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: "th", variant: hasSelection ? "success" : void 0, title: tr("TPL_TITLE_SELECTION_PANEL", locale), onClick: () => setIsSelectionPanelOpen(true) }),
    map && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: "properties", title: tr("TPL_TITLE_LEGEND", locale), onClick: () => setIsLegendOpen(true) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover2, { usePortal: false, position: "right", minimal: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: "map" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { style: { minWidth: 200 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Active Base Layer" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.BaseMapSwitcher, locale }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 5, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Current Map" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.MapMenu, locale })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover2, { usePortal: false, position: "right", minimal: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: "cog", title: tr("VIEWER_OPTIONS", locale) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.ViewerOptions }) })
    ] }),
    (comparisonInfo == null ? void 0 : comparisonInfo.isComparisonPrimary) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover2, { usePortal: false, position: "right", minimal: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: "comparison", variant: comparisonActive ? "primary" : void 0, onClick: () => void 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { style: { minWidth: 180 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 5, children: tr("MAP_COMPARISON", locale) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: comparisonMode === "swipe" ? "primary" : void 0, onClick: () => dispatch(setComparisonMode("swipe")), children: tr("MAP_COMPARISON_MODE_SWIPE", locale) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: comparisonMode === "spy" ? "primary" : void 0, onClick: () => dispatch(setComparisonMode("spy")), children: tr("MAP_COMPARISON_MODE_SPY", locale) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: !comparisonActive ? "primary" : void 0, onClick: () => dispatch(setComparisonMode("none")), children: tr("MAP_COMPARISON_MODE_OFF", locale) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: "print", onClick: () => onInvokeCommand(DefaultCommands.Print) })
  ] }) });
};
const GenericLayout = () => {
  const { Drawer } = useElementContext();
  const [isLayerManagerOpen, setIsLayerManagerOpen] = reactExports.useState(false);
  const [isLegendOpen, setIsLegendOpen] = reactExports.useState(false);
  const [isSelectionPanelOpen, setIsSelectionPanelOpen] = reactExports.useState(false);
  const {
    locale,
    dispatch
  } = useCommonTemplateState();
  const map = useActiveMapState();
  const tbState = useReducedToolbarAppState();
  const activeTool = useViewerActiveTool();
  const viewer = useMapProviderContext();
  const onInvokeCommand = (name) => {
    const cmd = getCommand(name);
    if (cmd) {
      dispatch(invokeCommand(cmd, viewer));
    }
  };
  const onSetActiveTool = (tool) => {
    dispatch(setActiveTool(ActiveMapTool.Select));
  };
  const onSetFeatureTooltips = (flag) => {
    dispatch(setFeatureTooltipsEnabled(flag));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", height: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModalLauncher, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Map, locale, componentProps: {
      // MapToolbar has to be a child component, otherwise the map provider context is not accessible
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        MapToolbar,
        {
          locale,
          featureTooltipsEnabled: tbState.featureTooltipsEnabled,
          hasSelection: tbState.hasClientSelection || tbState.hasSelection,
          map,
          activeTool,
          isLayerManagerOpen,
          setIsLegendOpen: (f) => setIsLegendOpen(f),
          setIsSelectionPanelOpen: (f) => setIsSelectionPanelOpen(f),
          setIsLayerManagerOpen: (f) => setIsLayerManagerOpen(f),
          onInvokeCommand,
          onSetActiveTool,
          onSetFeatureTooltips
        }
      )
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer, { icon: "layers", onClose: () => setIsLayerManagerOpen(false), title: tr("MANAGE_LAYERS", locale), position: "left", isOpen: isLayerManagerOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowY: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.AddManageLayers, locale }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer, { icon: "properties", onClose: () => setIsLegendOpen(false), title: tr("TPL_TITLE_LEGEND", locale), position: "left", isOpen: isLegendOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowY: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Legend, locale }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer, { icon: "th", onClose: () => setIsSelectionPanelOpen(false), title: tr("TPL_TITLE_SELECTION_PANEL", locale), position: "left", isOpen: isSelectionPanelOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "100%", height: "100%", position: "relative" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.SelectionPanel, locale }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.Navigator, locale }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ViewerApiShim, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FlyoutRegionContainer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InitWarningDisplay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderComponent, { id: DefaultComponentNames.MouseCoordinates, locale })
  ] });
};
const S_DELIM = "_";
const debouncedReplaceState = debounce((state, _, url) => window.history.replaceState(state, _, url), 100);
function updateUrl(state, extraState, ignoreProps) {
  const ignoreSet = new Set((ignoreProps != null ? ignoreProps : []).map((k) => k.toLowerCase()));
  const st = {};
  const currentParams = parseUrlParameters(window.location.href);
  for (const k in currentParams) {
    if (ignoreSet.has(k.toLowerCase())) {
      continue;
    }
    st[k.toLowerCase()] = currentParams[k];
  }
  if (extraState != null) {
    for (const k in extraState) {
      if (ignoreSet.has(k.toLowerCase())) {
        continue;
      }
      st[k] = extraState[k];
    }
  }
  for (const k in state) {
    if (ignoreSet.has(k.toLowerCase()))
      continue;
    const val = state[k];
    switch (k) {
      case "ft":
        st.ft = val == true ? 1 : 0;
        break;
      case "sl":
        st.sl = val == null ? void 0 : val.join(S_DELIM);
        break;
      case "hl":
        st.hl = val == null ? void 0 : val.join(S_DELIM);
        break;
      case "sg":
        st.sg = val == null ? void 0 : val.join(S_DELIM);
        break;
      case "hg":
        st.hg = val == null ? void 0 : val.join(S_DELIM);
        break;
      default:
        st[k] = val;
        break;
    }
  }
  const url = appendParameters(window.location.href, st, true, false, true);
  debouncedReplaceState(st, "", url);
}
function getStateFromUrl(ignoreKeys) {
  const st = parseUrlParameters(window.location.href);
  const state = {};
  const ignore = ignoreKeys != null ? ignoreKeys : [];
  for (const k in st) {
    if (ignore.indexOf(k) >= 0) {
      continue;
    }
    const val = st[k];
    switch (k) {
      case "ft":
        {
          const n = parseInt(val, 10);
          if (!isNaN(n)) {
            state.ft = n == 0 ? false : true;
          }
        }
        break;
      case "x":
        {
          const n = parseFloat(val);
          if (!isNaN(n)) {
            state.x = n;
          }
        }
        break;
      case "y":
        {
          const n = parseFloat(val);
          if (!isNaN(n)) {
            state.y = n;
          }
        }
        break;
      case "scale":
        {
          const n = parseFloat(val);
          if (!isNaN(n)) {
            state.scale = n;
          }
        }
        break;
      case "sl":
        state.sl = val == null ? void 0 : val.split(S_DELIM);
        break;
      case "hl":
        state.hl = val == null ? void 0 : val.split(S_DELIM);
        break;
      case "sg":
        state.sg = val == null ? void 0 : val.split(S_DELIM);
        break;
      case "hg":
        state.hg = val == null ? void 0 : val.split(S_DELIM);
        break;
      default:
        state[k] = val;
        break;
    }
  }
  return state;
}
function areStatesEqual(a, b) {
  return a.ft == b.ft && !areArraysDifferent(a.hg, b.hg) && !areArraysDifferent(a.hl, b.hl) && a.locale == b.locale && a.map == b.map && a.resource == b.resource && a.scale == b.scale && a.session == b.session && !areArraysDifferent(a.sg, b.sg) && !areArraysDifferent(a.sl, b.sl) && a.x == b.x && a.y == b.y;
}
const APP_SETTING_URL_PROPS_IGNORE = "urlPropsIgnore";
function getEffectiveUrlPropsIgnore(propIgnore, settingsValue) {
  var _a, _b;
  const normalizeIgnoreProp = (value) => value.trim().toLowerCase();
  const fromProps = (_a = propIgnore == null ? void 0 : propIgnore.map(normalizeIgnoreProp).filter((s) => s.length > 0)) != null ? _a : [];
  const fromSettings = (_b = settingsValue == null ? void 0 : settingsValue.split(",").map(normalizeIgnoreProp).filter((s) => s.length > 0)) != null ? _b : [];
  const merged = [.../* @__PURE__ */ new Set([...fromProps, ...fromSettings])];
  return merged.length > 0 ? merged : void 0;
}
function omitIgnoredStateKeys(state, ignoreProps) {
  const ignoreSet = new Set(ignoreProps);
  const result = {};
  for (const k in state) {
    if (!ignoreSet.has(k)) {
      result[k] = state[k];
    }
  }
  return result;
}
const AppLoadingPlaceholder = ({ locale }) => {
  const { NonIdealState, Spinner } = useElementContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    NonIdealState,
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { sizePreset: "large" }),
      title: tr("INIT", locale),
      description: tr("INIT_DESC", locale)
    }
  );
};
const AppInitError = (props) => {
  const { Callout } = useElementContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Callout, { variant: "danger", title: tr("INIT_ERROR_TITLE", props.locale), icon: "error", children: props.children });
};
const App = (props) => {
  const error2 = useInitError();
  const includeStack = useInitErrorStack();
  const initOptions = useInitErrorOptions();
  const configuredLocale = useViewerLocale();
  const map = useActiveMapBranch();
  const activeMapName = useActiveMapName();
  const ftEnabled = useViewerFeatureTooltipsEnabled();
  const configuredAppSettings = useCustomAppSettings();
  const dispatch = useReduxDispatch();
  const viewer = useMapProviderContext();
  const setElementVisibility = (state) => dispatch(setElementStates(state));
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const {
      onInit,
      mapguide,
      locale,
      resourceId,
      externalBaseLayers,
      appSettings,
      layout: layoutProp,
      urlPropsIgnore
    } = props;
    const effectiveUrlPropsIgnore = getEffectiveUrlPropsIgnore(urlPropsIgnore, appSettings == null ? void 0 : appSettings[APP_SETTING_URL_PROPS_IGNORE]);
    const {
      locale: urlLocale,
      resource: urlResource,
      session: urlSession,
      x: urlX,
      y: urlY,
      ft: urlFeatureTooltip,
      scale: urlScale,
      map: urlMap,
      sl: urlShowLayers,
      hl: urlHideLayers,
      sg: urlShowGroups,
      hg: urlHideGroups
    } = getStateFromUrl(effectiveUrlPropsIgnore);
    if (setElementVisibility && (mapguide == null ? void 0 : mapguide.initialElementVisibility)) {
      const { taskpane, legend, selection } = mapguide.initialElementVisibility;
      const states = {
        taskPaneVisible: typeof taskpane != "undefined" ? taskpane : true,
        legendVisible: typeof legend != "undefined" ? legend : true,
        selectionPanelVisible: typeof selection != "undefined" ? selection : true
      };
      setElementVisibility(states);
    }
    debug(`Asset root is: ${getAssetRoot()}`);
    if (mapguide == null ? void 0 : mapguide.fusionRoot) {
      setFusionRoot(mapguide.fusionRoot);
    }
    const initialize = () => __async(void 0, null, function* () {
      var _a, _b;
      let ftArgs;
      if (typeof urlFeatureTooltip != "undefined") {
        ftArgs = {
          featureTooltipsEnabled: urlFeatureTooltip
        };
      }
      let amArgs;
      if (urlMap) {
        amArgs = {
          initialActiveMap: urlMap
        };
      }
      let ivArgs;
      if (urlX && urlY && urlScale) {
        ivArgs = {
          initialView: {
            x: urlX,
            y: urlY,
            scale: urlScale
          }
        };
      }
      let slArgs;
      if (urlShowLayers) {
        slArgs = {
          initialShowLayers: [...urlShowLayers]
        };
      }
      let hlArgs;
      if (urlHideLayers) {
        hlArgs = {
          initialHideLayers: [...urlHideLayers]
        };
      }
      let sgArgs;
      if (urlShowGroups) {
        sgArgs = {
          initialShowGroups: [...urlShowGroups]
        };
      }
      let hgArgs;
      if (urlHideGroups) {
        hgArgs = {
          initialHideGroups: [...urlHideGroups]
        };
      }
      const args = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, {
        resourceId: urlResource != null ? urlResource : resourceId,
        locale: (_a = urlLocale != null ? urlLocale : locale) != null ? _a : DEFAULT_LOCALE,
        externalBaseLayers,
        session: urlSession != null ? urlSession : mapguide == null ? void 0 : mapguide.session,
        onInit,
        layout: typeof layoutProp == "string" ? layoutProp : void 0,
        appSettings
      }), ftArgs != null ? ftArgs : {}), amArgs != null ? amArgs : {}), ivArgs != null ? ivArgs : {}), slArgs != null ? slArgs : {}), hlArgs != null ? hlArgs : {}), sgArgs != null ? sgArgs : {}), hgArgs != null ? hgArgs : {});
      let fetchClient;
      if (mapguide == null ? void 0 : mapguide.agentUri) {
        try {
          fetchClient = new Client(mapguide.agentUri, (_b = mapguide.agentKind) != null ? _b : "mapagent");
        } catch (e) {
          fetchClient = void 0;
        }
      }
      try {
        const fetchResult = yield fetchInitDocument(args, fetchClient);
        const _c = args, { resourceId: _resourceId, session: _session, onInit: _onInit } = _c, initArgs = __objRest(_c, ["resourceId", "session", "onInit"]);
        yield dispatch(initAppFromDocument(fetchResult, initArgs));
        if (onInit) {
          onInit(viewer);
        }
      } catch (e) {
        processAndDispatchInitError(e, false, dispatch, args);
      }
    });
    initialize();
  }, []);
  reactExports.useEffect(() => {
    var _a, _b, _c, _d;
    const curUrlState = getStateFromUrl();
    const nextUrlState = {
      locale: (_a = curUrlState.locale) != null ? _a : props.locale,
      session: (_c = curUrlState.session) != null ? _c : (_b = props.mapguide) == null ? void 0 : _b.session
    };
    if (typeof props.resourceId == "string") {
      nextUrlState.resource = (_d = curUrlState.resource) != null ? _d : props.resourceId;
    }
    if (ftEnabled !== void 0) {
      nextUrlState.ft = ftEnabled;
    }
    if (map != null) {
      setIsLoading(false);
    }
    if (activeMapName) {
      nextUrlState.map = activeMapName;
    }
    if (map) {
      if (map.currentView) {
        const { x, y, scale } = map.currentView;
        nextUrlState.x = x;
        nextUrlState.y = y;
        nextUrlState.scale = scale;
      }
      const mgs = map.mapguide;
      if (mgs) {
        const rtm = mgs.runtimeMap;
        const { showGroups, showLayers, hideGroups, hideLayers } = mgs;
        const sg = [];
        const hg = [];
        const sl = [];
        const hl = [];
        if (rtm == null ? void 0 : rtm.Group) {
          for (const g of rtm.Group) {
            if (showGroups.indexOf(g.ObjectId) >= 0) {
              sg.push(g.Name);
            } else if (hideGroups.indexOf(g.ObjectId) >= 0) {
              hg.push(g.Name);
            }
          }
        }
        if (rtm == null ? void 0 : rtm.Layer) {
          for (const l of rtm.Layer) {
            if (showLayers.indexOf(l.ObjectId) >= 0) {
              sl.push(l.Name);
            } else if (hideLayers.indexOf(l.ObjectId) >= 0) {
              hl.push(l.Name);
            }
          }
        }
        if (sg.length > 0)
          nextUrlState.sg = sg;
        if (hg.length > 0)
          nextUrlState.hg = hg;
        if (sl.length > 0)
          nextUrlState.sl = sl;
        if (hl.length > 0)
          nextUrlState.hl = hl;
        if (rtm) {
          const { SessionId } = rtm;
          nextUrlState.session = SessionId;
        }
      }
    }
    const effectiveIgnore = getEffectiveUrlPropsIgnore(props.urlPropsIgnore, configuredAppSettings == null ? void 0 : configuredAppSettings[APP_SETTING_URL_PROPS_IGNORE]);
    const curComparable = effectiveIgnore ? omitIgnoredStateKeys(curUrlState, effectiveIgnore) : curUrlState;
    const nextComparable = effectiveIgnore ? omitIgnoredStateKeys(nextUrlState, effectiveIgnore) : nextUrlState;
    if (!areStatesEqual(curComparable, nextComparable))
      updateUrl(nextUrlState, void 0, effectiveIgnore);
  }, [map, activeMapName, ftEnabled, props, configuredAppSettings]);
  const renderErrorMessage = reactExports.useCallback((err, locale, args) => {
    const msg = err.message;
    switch (msg) {
      case "MgConnectionFailedException": {
        const arg = { __html: purify.sanitize(tr("INIT_ERROR_NO_CONNECTION", locale)) };
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: arg });
      }
      case "MgResourceNotFoundException": {
        const arg = { __html: purify.sanitize(tr("INIT_ERROR_RESOURCE_NOT_FOUND", locale, { resourceId: args.resourceId })) };
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: arg });
      }
      case "MgSessionExpiredException": {
        const arg = { __html: purify.sanitize(tr("INIT_ERROR_EXPIRED_SESSION", locale, { sessionId: args.session })) };
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: arg });
      }
      default: {
        const arg = { __html: purify.sanitize(msg) };
        const stack = normalizeStack(err);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: arg }),
          (() => {
            if (includeStack === true && stack.length > 0) {
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Stack Trace" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: stack.map((ln, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: ln }, `stack-line-${i}`)) })
              ] });
            }
          })()
        ] });
      }
    }
  }, [includeStack]);
  const initErrorRenderer = reactExports.useCallback((err) => {
    let locale = configuredLocale;
    if (initOptions && initOptions.locale) {
      locale = initOptions.locale;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppInitError, { locale, children: renderErrorMessage(err, locale, initOptions || {}) });
  }, [configuredLocale, initOptions, renderErrorMessage]);
  const { layout } = props;
  if (error2) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Error$1, { error: error2, errorRenderer: initErrorRenderer });
  } else {
    const locale = configuredLocale;
    if (isLoading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLoadingPlaceholder, { locale });
    } else {
      const layoutEl = typeof layout == "string" ? getLayout(layout) : layout.factory;
      if (layoutEl) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AppContextProvider, { mapguide: props.mapguide, children: layoutEl() });
      } else {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Error$1, { error: tr("ERR_UNREGISTERED_LAYOUT", locale, { layout }) });
      }
    }
  }
};
function isPromise(value) {
  if (value !== null && typeof value === "object") {
    return value.promise && typeof value.promise.then === "function";
  }
}
function promiseMiddleware({ dispatch }) {
  return (next) => (action) => {
    if (!isPromise(action.payload)) {
      return next(action);
    }
    const { types, payload, meta } = action;
    const { promise, data } = payload;
    const [PENDING, FULFILLED, REJECTED] = types;
    const p1 = { type: PENDING };
    const p2 = data ? { payload: data } : {};
    const p3 = meta ? { meta } : {};
    dispatch(__spreadValues(__spreadValues(__spreadValues({}, p1), p2), p3));
    return promise.then(
      (result) => {
        dispatch({
          type: FULFILLED,
          payload: result,
          meta
        });
      },
      (error2) => {
        dispatch({
          type: REJECTED,
          payload: error2,
          meta
        });
      }
    );
  };
}
const FILTERED_TYPES = /* @__PURE__ */ new Set([
  "redux-form/BLUR",
  "redux-form/CHANGE",
  "redux-form/FOCUS",
  "redux-form/TOUCH",
  ActionType.MAP_RESIZED,
  ActionType.UPDATE_MOUSE_COORDINATES,
  ActionType.MAP_SET_BUSY_COUNT,
  ActionType.ADD_LAYER_BUSY_WORKER,
  ActionType.REMOVE_LAYER_BUSY_WORKER
]);
const logger = (store) => (next) => (action) => {
  const actionType = action == null ? void 0 : action.type;
  if (FILTERED_TYPES.has(actionType)) {
    return next(action);
  }
  const prevState = store.getState();
  const result = next(action);
  const nextState = store.getState();
  console.groupCollapsed(`action: ${actionType}`);
  console.log("prev state", prevState);
  console.log("action", action);
  console.log("next state", nextState);
  console.groupEnd();
  return result;
};
const CONFIG_INITIAL_STATE = {
  agentUri: void 0,
  agentKind: "mapagent",
  locale: DEFAULT_LOCALE,
  activeMapName: void 0,
  sessionWasReused: false,
  availableMaps: void 0,
  viewRotation: 0,
  viewRotationEnabled: true,
  viewSizeUnits: UnitOfMeasure.Meters,
  manualFeatureTooltips: false,
  comparisonMode: "none",
  lastComparisonMode: "swipe",
  swipeActive: false,
  swipePosition: 50,
  spyCursorRadius: 75,
  cancelDigitizationKey: KC_ESCAPE,
  undoLastPointKey: KC_U,
  selectCanDragPan: false,
  coordinates: {
    decimals: 6
  },
  viewer: {
    isStateless: false,
    imageFormat: "PNG",
    selectionImageFormat: "PNG8",
    selectionColor: "0x0000FFAA",
    //Blue
    activeSelectedFeatureColor: "0xFF0000AA",
    //Red
    pointSelectionBuffer: 2,
    loadIndicatorPositioning: "top",
    loadIndicatorColor: "rgba(34, 153, 221, 0.9)"
  },
  capabilities: {
    hasTaskPane: false,
    hasTaskBar: false,
    hasStatusBar: false,
    hasNavigator: false,
    hasSelectionPanel: false,
    hasLegend: false,
    hasToolbar: false,
    hasViewSize: false
  }
};
function configReducer(state = CONFIG_INITIAL_STATE, action) {
  var _a, _b, _c, _d;
  switch (action.type) {
    case ActionType.SET_LOCALE: {
      return __spreadValues(__spreadValues({}, state), { locale: action.payload });
    }
    case ActionType.SET_APP_SETTING: {
      const settings = __spreadValues({}, (_a = state.appSettings) != null ? _a : {});
      settings[action.payload.key] = action.payload.value;
      return __spreadValues(__spreadValues({}, state), { appSettings: settings });
    }
    case ActionType.INIT_APP: {
      const payload = (_b = action.payload) != null ? _b : {};
      const maps = payload.maps;
      const availableMaps = [];
      let am = payload.activeMapName;
      const mapNames = Object.keys(maps);
      for (const mapName of mapNames) {
        availableMaps.push({ name: maps[mapName].mapGroupId, value: mapName });
      }
      if (mapNames.indexOf(am) < 0) {
        warn(`Invalid initial active map name: ${am}. Probably because we haven't properly implemented recovery of runtime maps on reload yet`);
        am = mapNames[0];
      }
      const pendingMaps = {};
      for (const mapName of mapNames) {
        const mi = maps[mapName];
        if (mi.mapDef) {
          pendingMaps[mapName] = { mapDef: mi.mapDef, metadata: mi.metadata };
        }
      }
      const state1 = {
        appSettings: payload.appSettings,
        locale: payload.locale || DEFAULT_LOCALE,
        capabilities: payload.capabilities,
        activeMapName: am,
        availableMaps,
        comparisonPairs: payload.comparisonPairs,
        mapSwipePairs: payload.comparisonPairs,
        sessionWasReused: payload.sessionWasReused === true,
        pendingMaps: Object.keys(pendingMaps).length > 0 ? pendingMaps : void 0
      };
      const newState = __spreadValues(__spreadValues({}, state), state1);
      if (payload.config != null && Object.keys(payload.config).length > 0) {
        const coordConfig = __spreadValues({}, state.coordinates);
        const viewerConfig = __spreadValues({}, state.viewer);
        if (payload.config.isStateless != null) {
          viewerConfig.isStateless = payload.config.isStateless;
        }
        if (payload.config.imageFormat != null) {
          viewerConfig.imageFormat = payload.config.imageFormat;
        }
        if (payload.config.selectionImageFormat != null) {
          viewerConfig.selectionImageFormat = payload.config.selectionImageFormat;
        }
        if (payload.config.selectionColor != null) {
          viewerConfig.selectionColor = payload.config.selectionColor;
        }
        if (payload.config.pointSelectionBuffer != null) {
          viewerConfig.pointSelectionBuffer = payload.config.pointSelectionBuffer;
        }
        if (payload.config.coordinateProjection != null) {
          coordConfig.projection = payload.config.coordinateProjection;
        }
        if (payload.config.coordinateDecimals != null) {
          coordConfig.decimals = payload.config.coordinateDecimals;
        }
        if (payload.config.coordinateDisplayFormat != null) {
          coordConfig.format = payload.config.coordinateDisplayFormat;
        }
        const state2 = { viewer: viewerConfig, coordinates: coordConfig };
        const mapKeys = Object.keys(payload.maps);
        if (payload.config.viewSizeUnits != null) {
          state2.viewSizeUnits = payload.config.viewSizeUnits;
        } else if (mapKeys.length == 1) {
          const m = payload.maps[mapKeys[0]].map;
          if (m) {
            let arbCs;
            if (isRuntimeMap(m)) {
              arbCs = tryParseArbitraryCs(m.CoordinateSystem.MentorCode);
            } else {
              arbCs = tryParseArbitraryCs((_c = m == null ? void 0 : m.meta) == null ? void 0 : _c.projection);
            }
            if (arbCs) {
              state2.viewSizeUnits = arbCs.units;
            }
          }
        }
        return __spreadValues(__spreadValues({}, newState), state2);
      } else {
        return newState;
      }
    }
    case ActionType.MAP_REFRESH: {
      if (state.pendingMaps) {
        const mapName = action.payload.mapName;
        if (state.pendingMaps[mapName]) {
          const updatedPendingMaps = __spreadValues({}, state.pendingMaps);
          delete updatedPendingMaps[mapName];
          return __spreadProps(__spreadValues({}, state), {
            pendingMaps: Object.keys(updatedPendingMaps).length > 0 ? updatedPendingMaps : void 0
          });
        }
      }
      return state;
    }
    case ActionType.MAP_ENABLE_SELECT_DRAGPAN: {
      return __spreadValues(__spreadValues({}, state), { selectCanDragPan: action.payload });
    }
    case ActionType.MAP_SET_VIEW_ROTATION: {
      return __spreadValues(__spreadValues({}, state), { viewRotation: action.payload });
    }
    case ActionType.MAP_SET_VIEW_ROTATION_ENABLED: {
      return __spreadValues(__spreadValues({}, state), { viewRotationEnabled: action.payload });
    }
    case ActionType.MAP_SET_ACTIVE_MAP: {
      const data = action.payload;
      if (data) {
        const state1 = {
          activeMapName: data
        };
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
    case ActionType.MAP_SET_VIEW_SIZE_UNITS: {
      const state1 = { viewSizeUnits: action.payload };
      return __spreadValues(__spreadValues({}, state), state1);
    }
    case ActionType.MAP_SET_MANUAL_MAPTIP: {
      return __spreadValues(__spreadValues({}, state), { manualFeatureTooltips: action.payload });
    }
    case ActionType.MAP_SET_COMPARISON_MODE: {
      const nextMode = (_d = action.payload.mode) != null ? _d : action.payload.active ? "swipe" : "none";
      return __spreadValues(__spreadProps(__spreadValues({}, state), {
        comparisonMode: nextMode,
        swipeActive: nextMode === "swipe"
      }), nextMode !== "none" ? { lastComparisonMode: nextMode } : {});
    }
    case ActionType.MAP_SET_SWIPE_POSITION: {
      return __spreadProps(__spreadValues({}, state), { swipePosition: action.payload.position });
    }
    case ActionType.MAP_SET_SPY_CURSOR_RADIUS: {
      return __spreadProps(__spreadValues({}, state), { spyCursorRadius: action.payload.radius });
    }
  }
  return state;
}
function mergeFlyoutState(flyoutId, state, flyoutPayload, flyoutUpdateAction, closeOtherFlyouts = false, bSettingStates = false) {
  const updateSpec = {
    flyouts: {}
  };
  if (!state.flyouts[flyoutId] && bSettingStates) {
    return state;
  }
  const flyoutUpdateSpec = {};
  flyoutUpdateSpec[flyoutUpdateAction] = flyoutPayload;
  updateSpec.flyouts[flyoutId] = flyoutUpdateSpec;
  if (closeOtherFlyouts) {
    for (const key in state.flyouts) {
      if (key != flyoutId) {
        updateSpec.flyouts[key] = {
          "$merge": {
            open: false
          }
        };
      }
    }
  }
  const newState = update(state, updateSpec);
  return newState;
}
function mergeFlyoutCloseState(flyoutId, state, bSettingStates = false) {
  return mergeFlyoutState(flyoutId, state, {
    open: false,
    metrics: null
  }, "$merge", false, bSettingStates);
}
const TOOLBAR_INITIAL_STATE = {
  toolbars: {},
  flyouts: {}
};
function toolbarReducer(state = TOOLBAR_INITIAL_STATE, action) {
  switch (action.type) {
    case ActionType.INIT_APP: {
      return __spreadValues(__spreadValues({}, state), action.payload.toolbars);
    }
    case ActionType.COMPONENT_OPEN: {
      const payload = action.payload;
      let flyoutId = payload.flyoutId;
      if (flyoutId) {
        return mergeFlyoutState(
          flyoutId,
          state,
          {
            open: true,
            metrics: payload.metrics,
            componentName: payload.name,
            componentProps: payload.props
          },
          "$set",
          //Need to use $set instead of $merge as the tree won't have component flyout info initially
          true
        );
      }
      return state;
    }
    case ActionType.COMPONENT_CLOSE: {
      if (!state.flyouts[WEBLAYOUT_CONTEXTMENU]) {
        return state;
      }
      let flyoutId = action.payload.flyoutId;
      if (flyoutId) {
        return mergeFlyoutState(flyoutId, state, {
          open: false,
          metrics: null,
          componentName: null,
          componentProps: null
        }, "$set");
      }
      return state;
    }
    case ActionType.CONTEXT_MENU_OPEN: {
      if (!state.flyouts[WEBLAYOUT_CONTEXTMENU]) {
        return state;
      }
      return mergeFlyoutState(WEBLAYOUT_CONTEXTMENU, state, {
        open: true,
        metrics: {
          posX: action.payload.x,
          posY: action.payload.y
        }
      }, "$merge", true);
    }
    case ActionType.FLYOUT_OPEN: {
      let flyoutId = action.payload.flyoutId;
      if (flyoutId) {
        return mergeFlyoutState(flyoutId, state, {
          open: true,
          metrics: action.payload.metrics
        }, "$merge", true);
      }
      return state;
    }
    case ActionType.FUSION_SET_ELEMENT_STATE: {
      if (isElementState(action.payload) && !action.payload.taskPaneVisible) {
        return mergeFlyoutCloseState(WEBLAYOUT_TASKMENU, state, true);
      }
      return state;
    }
    case ActionType.FUSION_SET_TASK_PANE_VISIBILITY: {
      if (!action.payload) {
        return mergeFlyoutCloseState(WEBLAYOUT_TASKMENU, state);
      }
      return state;
    }
    case ActionType.FLYOUT_CLOSE: {
      let flyoutId = action.payload.flyoutId;
      if (flyoutId) {
        return mergeFlyoutCloseState(flyoutId, state);
      }
    }
    case ActionType.CONTEXT_MENU_CLOSE: {
      return mergeFlyoutCloseState(WEBLAYOUT_CONTEXTMENU, state);
    }
  }
  return state;
}
const TASK_PANE_INITIAL_STATE = {
  navIndex: -1,
  navigation: [],
  initialUrl: void 0,
  //Having this state sounds extremely hacky, but we need a way to signal to the "dumb" task pane that
  //the url its about to receive was pushed and should not be reloaded into the internal iframe
  lastUrlPushed: false
};
function mergeNavigatedUrl(state, url) {
  let index2 = state.navIndex;
  const nav = state.navigation;
  index2++;
  nav[index2] = url;
  if (nav.length > index2 + 1) {
    nav.splice(index2 + 1);
  }
  const newState = {
    navIndex: index2,
    navigation: nav,
    lastUrlPushed: false
  };
  return __spreadValues(__spreadValues({}, state), newState);
}
function taskPaneReducer(state = TASK_PANE_INITIAL_STATE, action) {
  switch (action.type) {
    case ActionType.INIT_APP: {
      const { payload } = action;
      const newState = {
        initialUrl: payload.initialUrl,
        navIndex: 0,
        navigation: [payload.initialUrl]
      };
      return __spreadValues(__spreadValues({}, state), newState);
    }
    case ActionType.TASK_PANE_HOME: {
      if (state.initialUrl != null) {
        return mergeNavigatedUrl(state, state.initialUrl);
      }
      return state;
    }
    case ActionType.TASK_PANE_BACK: {
      let index2 = state.navIndex;
      const nav = state.navigation;
      index2--;
      const newState = {
        navIndex: index2,
        navigation: nav,
        lastUrlPushed: false
      };
      return __spreadValues(__spreadValues({}, state), newState);
    }
    case ActionType.TASK_PANE_FORWARD: {
      let index2 = state.navIndex;
      const nav = state.navigation;
      index2++;
      const newState = {
        navIndex: index2,
        navigation: nav,
        lastUrlPushed: false
      };
      return __spreadValues(__spreadValues({}, state), newState);
    }
    case ActionType.TASK_PANE_PUSH_URL: {
      const { payload } = action;
      const index2 = state.navIndex;
      const nav = state.navigation;
      nav[index2 + 1] = payload.url;
      if (nav.length > index2 + 2) {
        nav.splice(index2 + 2);
      }
      if (payload.silent === true) {
        const newState = {
          navigation: nav
        };
        return __spreadValues(__spreadValues({}, state), newState);
      } else {
        const newState = {
          navIndex: index2 + 1,
          navigation: nav,
          lastUrlPushed: true
        };
        return __spreadValues(__spreadValues({}, state), newState);
      }
    }
    case ActionType.TASK_INVOKE_URL: {
      return mergeNavigatedUrl(state, action.payload.url);
    }
  }
  return state;
}
const NULL_ACTION = {};
function lastAction(state = null, action) {
  if (isAction(action)) {
    switch (action.type) {
      case ActionType.MAP_SET_BUSY_COUNT:
      case ActionType.TASK_INVOKE_URL:
      case ActionType.MAP_SET_SELECTION:
      case ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE:
      case ActionType.MAP_SET_MAPTIP:
      case ActionType.MAP_SET_ACTIVE_TOOL:
        return action;
    }
  }
  return NULL_ACTION;
}
function tryRestoreModalSizeAndPosition(modal, prevModal) {
  if (prevModal == null ? void 0 : prevModal.position) {
    modal.position = prevModal.position;
  } else if (!modal.position) {
    modal.position = DEFAULT_MODAL_POSITION;
  }
  if (prevModal == null ? void 0 : prevModal.size) {
    modal.size = prevModal.size;
  } else if (!modal.size) {
    modal.size = DEFAULT_MODAL_SIZE;
  }
}
const MODAL_INITIAL_STATE = {};
function modalReducer(state = MODAL_INITIAL_STATE, action) {
  var _a, _c;
  switch (action.type) {
    case ActionType.MODAL_SHOW_COMPONENT: {
      const newModal = action.payload.modal;
      tryRestoreModalSizeAndPosition(newModal, (_a = state[action.payload.name]) == null ? void 0 : _a.modal);
      const newData = {};
      newData[action.payload.name] = {
        modal: newModal,
        component: action.payload.component,
        componentProps: action.payload.componentProps
      };
      return __spreadValues(__spreadValues({}, state), newData);
    }
    case ActionType.MODAL_UPDATE: {
      const newData = {};
      newData[action.payload.name] = {
        modal: {
          "$merge": {
            size: [action.payload.args.width, action.payload.args.height],
            position: [action.payload.args.x, action.payload.args.y]
          }
        }
      };
      const newState = update(state, newData);
      return newState;
    }
    case ActionType.MODAL_SHOW_URL: {
      const _b = action.payload, { modal: newModal } = _b, rest = __objRest(_b, ["modal"]);
      tryRestoreModalSizeAndPosition(newModal, (_c = state[action.payload.name]) == null ? void 0 : _c.modal);
      const newData = {};
      newData[action.payload.name] = __spreadValues({
        modal: newModal
      }, rest);
      return __spreadValues(__spreadValues({}, state), newData);
    }
    case ActionType.MODAL_CLOSE: {
      let newState = __spreadValues({}, state);
      delete newState[action.payload].modal.backdrop;
      delete newState[action.payload].modal.overflowYScroll;
      delete newState[action.payload].modal.title;
      for (const k in newState[action.payload]) {
        if (k != "modal") {
          delete newState[action.payload][k];
        }
      }
      return newState;
    }
  }
  return state;
}
const INIT_ERROR_INITIAL_STATE = {
  options: {},
  error: void 0,
  includeStack: true,
  warnings: []
};
function initErrorReducer(state = INIT_ERROR_INITIAL_STATE, action) {
  switch (action.type) {
    case ActionType.INIT_ACKNOWLEDGE_WARNINGS: {
      return __spreadValues(__spreadValues({}, state), { warnings: [] });
    }
    case ActionType.INIT_APP: {
      return __spreadValues(__spreadValues({}, state), { warnings: makeUnique(action.payload.warnings) });
    }
    case ActionType.INIT_ERROR: {
      const { payload } = action;
      const error2 = payload.error;
      const options = payload.options;
      let includeStack = payload.includeStack;
      if (typeof includeStack == "undefined") {
        includeStack = true;
      }
      return { error: error2, options, includeStack, warnings: [] };
    }
  }
  return state;
}
const MAP_STATE_INITIAL_STATE = {};
const MG_INITIAL_SUB_STATE = {
  selectionSet: void 0,
  layerTransparency: {},
  selectableLayers: {},
  expandedGroups: {},
  runtimeMap: void 0,
  isArbitraryCs: false,
  showLayers: [],
  showGroups: [],
  hideLayers: [],
  hideGroups: [],
  activeSelectedFeature: void 0
};
const MAP_STATE_INITIAL_SUB_STATE = {
  currentView: void 0,
  initialView: void 0,
  history: [],
  historyIndex: -1,
  externalBaseLayers: [],
  initialExternalLayers: [],
  layers: void 0,
  mapguide: void 0,
  generic: void 0,
  clientSelection: void 0,
  coordinateFormat: void 0
};
function applyMapGuideSubState(state, mapName, applyFn) {
  const subState = state[mapName];
  if (subState) {
    const mgSubState = subState.mapguide;
    if (mgSubState) {
      const toApply = applyFn(mgSubState);
      const mgSubState1 = __spreadValues(__spreadValues({}, mgSubState), toApply);
      return mergeSubState(state, mapName, __spreadValues(__spreadValues({}, subState), { mapguide: mgSubState1 }));
    }
  }
  return state;
}
function setLayerAction(state, mapName, layerName, selector) {
  const subState = state[mapName];
  if (subState && subState.layers) {
    const layers = subState.layers.map((l) => {
      if (l.name == layerName) {
        return __spreadValues(__spreadValues({}, l), selector(l));
      } else {
        return l;
      }
    });
    const state1 = {
      layers
    };
    return mergeSubState(state, mapName, __spreadValues(__spreadValues({}, subState), state1));
  }
  return state;
}
function mergeSubState(state, mapName, subState) {
  const state1 = {};
  state1[mapName] = __spreadValues(__spreadValues({}, state[mapName]), subState);
  return __spreadValues(__spreadValues({}, state), state1);
}
function mapStateReducer(state = MAP_STATE_INITIAL_STATE, action) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  switch (action.type) {
    case ActionType.MAP_REFRESH: {
      const { payload } = action;
      return applyMapGuideSubState(state, payload.mapName, (_) => ({
        runtimeMap: payload.map,
        isArbitraryCs: tryParseArbitraryCs(payload.map.CoordinateSystem.MentorCode) != null
      }));
    }
    case ActionType.INIT_APP: {
      const { payload } = action;
      const maps = payload.maps;
      const mapKeys = Object.keys(maps);
      const newState = {};
      let mapNameToApplyInitialState = payload.activeMapName;
      if (!mapNameToApplyInitialState && mapKeys.length == 1) {
        mapNameToApplyInitialState = mapKeys[0];
      }
      for (const mapName of mapKeys) {
        let cv;
        if (payload.initialView && mapName == mapNameToApplyInitialState) {
          cv = {
            currentView: __spreadValues({}, payload.initialView)
          };
        }
        let isel;
        if (payload.initialSelections && payload.initialSelections[mapName]) {
          isel = {
            selectionSet: payload.initialSelections[mapName]
          };
          debug(`Restoring client-side selection set for: ${mapName}`);
        }
        const sl = [];
        const sg = [];
        const hl = [];
        const hg = [];
        let mrtm;
        let mgeneric;
        const rtm = maps[mapName].map;
        if (rtm) {
          if (!isGenericSubjectMapLayer(rtm)) {
            const arbCs = tryParseArbitraryCs(rtm.CoordinateSystem.MentorCode);
            mrtm = { runtimeMap: rtm, isArbitraryCs: arbCs != null };
          } else {
            mgeneric = { subject: __spreadValues({}, rtm) };
          }
        }
        if (mapName == mapNameToApplyInitialState) {
          if (rtm && !isGenericSubjectMapLayer(rtm)) {
            const isl = (_a = payload.initialShowLayers) != null ? _a : [];
            const isg = (_b = payload.initialShowGroups) != null ? _b : [];
            const ihl = (_c = payload.initialHideLayers) != null ? _c : [];
            const ihg = (_d = payload.initialHideGroups) != null ? _d : [];
            if (rtm.Layer) {
              for (const l of rtm.Layer) {
                if (isl.indexOf(l.Name) >= 0 && !l.Visible) {
                  sl.push(l.ObjectId);
                } else if (ihl.indexOf(l.Name) >= 0 && l.Visible) {
                  hl.push(l.ObjectId);
                }
              }
            }
            if (rtm.Group) {
              for (const g of rtm.Group) {
                if (isg.indexOf(g.Name) >= 0 && !g.Visible) {
                  sg.push(g.ObjectId);
                } else if (ihg.indexOf(g.Name) >= 0 && g.Visible) {
                  hg.push(g.ObjectId);
                }
              }
            }
            debug(`Initially showing layers: ${isl.join("|")}`);
            debug(`Initially showing groups: ${isg.join("|")}`);
            debug(`Initially hiding layers: ${ihl.join("|")}`);
            debug(`Initially hiding groups: ${ihg.join("|")}`);
            debug(`Initially showing layer ids: ${sl.join("|")}`);
            debug(`Initially showing group ids: ${sg.join("|")}`);
            debug(`Initially hiding layer ids: ${hl.join("|")}`);
            debug(`Initially hiding group ids: ${hg.join("|")}`);
          }
        }
        const newMgSubState = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, MG_INITIAL_SUB_STATE), mrtm), isel || {}), sl.length > 0 ? { showLayers: [...sl] } : {}), sg.length > 0 ? { showGroups: [...sg] } : {}), hl.length > 0 ? { hideLayers: [...hl] } : {}), hg.length > 0 ? { hideGroups: [...hg] } : {});
        const newMapState = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, MAP_STATE_INITIAL_SUB_STATE), { generic: mgeneric }), { externalBaseLayers: maps[mapName].externalBaseLayers }), { initialExternalLayers: maps[mapName].initialExternalLayers }), { initialView: maps[mapName].initialView }), { coordinateFormat: maps[mapName].coordinateFormat }), cv || {}), { mapguide: newMgSubState });
        if ((_e = state == null ? void 0 : state[mapName]) == null ? void 0 : _e.currentView) {
          newMapState.currentView = state[mapName].currentView;
        }
        newState[mapName] = newMapState;
      }
      return __spreadValues(__spreadValues({}, state), newState);
    }
    case ActionType.MAP_PREVIOUS_VIEW: {
      const { payload } = action;
      const subState = state[payload.mapName];
      let rs = state;
      if (subState) {
        const index2 = subState.historyIndex - 1;
        if (index2 >= 0) {
          const state1 = {
            historyIndex: index2,
            currentView: subState.history[index2]
          };
          rs = mergeSubState(state, payload.mapName, __spreadValues(__spreadValues({}, subState), state1));
        }
      }
      debug(`Next navigation stack:`, rs[payload.mapName].historyIndex, rs[payload.mapName].history);
      return rs;
    }
    case ActionType.MAP_NEXT_VIEW: {
      const { payload } = action;
      const subState = state[payload.mapName];
      let rs = state;
      if (subState) {
        const index2 = subState.historyIndex + 1;
        if (index2 < subState.history.length) {
          const state1 = {
            historyIndex: index2,
            currentView: subState.history[index2]
          };
          rs = mergeSubState(state, payload.mapName, __spreadValues(__spreadValues({}, subState), state1));
        }
      }
      debug(`Next navigation stack:`, rs[payload.mapName].historyIndex, rs[payload.mapName].history);
      return rs;
    }
    case ActionType.MAP_SET_SCALE: {
      const { payload } = action;
      const subState = state[payload.mapName];
      if (subState) {
        let view = subState.currentView;
        const scale = payload.scale;
        if (typeof view === "object" && typeof scale === "number") {
          const view1 = { scale, resolution: payload.resolution };
          view = __spreadValues(__spreadValues({}, view), view1);
        }
        const state1 = {
          currentView: view
        };
        const newSubState = __spreadValues(__spreadValues({}, state1), { historyIndex: subState.historyIndex });
        newSubState.history = [...subState.history];
        if (view && newSubState.history && newSubState.historyIndex != null) {
          newSubState.historyIndex++;
          newSubState.history[newSubState.historyIndex] = view;
          if (newSubState.history.length > newSubState.historyIndex + 1) {
            newSubState.history.splice(newSubState.historyIndex + 1);
          }
        }
        return mergeSubState(state, payload.mapName, newSubState);
      }
      return state;
    }
    case ActionType.MAP_SET_VIEW: {
      const { payload } = action;
      const subState = state[payload.mapName];
      let rs = state;
      if (subState) {
        const data = payload.view;
        if (isMapView(data)) {
          const state1 = {
            currentView: data
          };
          const newSubState = __spreadValues(__spreadValues({}, state1), { historyIndex: subState.historyIndex });
          newSubState.history = [...subState.history];
          if (newSubState.history && newSubState.historyIndex != null) {
            newSubState.historyIndex++;
            newSubState.history[newSubState.historyIndex] = data;
            if (newSubState.history.length > newSubState.historyIndex + 1) {
              newSubState.history.splice(newSubState.historyIndex + 1);
            }
          }
          rs = mergeSubState(state, payload.mapName, newSubState);
        }
      }
      debug(`Next navigation stack:`, rs[payload.mapName].historyIndex, rs[payload.mapName].history);
      return rs;
    }
    case ActionType.MAP_SET_LAYER_TRANSPARENCY: {
      const { payload } = action;
      return applyMapGuideSubState(state, payload.mapName, (mgSubState) => {
        const trans = __spreadValues({}, mgSubState.layerTransparency);
        trans[payload.layerName] = payload.opacity;
        return {
          layerTransparency: trans
        };
      });
    }
    case ActionType.LEGEND_SET_LAYER_SELECTABLE: {
      const { payload } = action;
      return applyMapGuideSubState(state, payload.mapName, (mgSubState) => {
        const layers = __spreadValues({}, mgSubState.selectableLayers);
        layers[payload.id] = payload.value;
        return {
          selectableLayers: layers
        };
      });
    }
    case ActionType.LEGEND_SET_GROUP_EXPANDABLE: {
      const { payload } = action;
      return applyMapGuideSubState(state, payload.mapName, (mgSubState) => {
        const groups = __spreadValues({}, mgSubState.expandedGroups);
        groups[payload.id] = payload.value;
        return {
          expandedGroups: groups
        };
      });
    }
    case ActionType.LEGEND_SET_GROUP_VISIBILITY: {
      const { payload } = action;
      return applyMapGuideSubState(state, payload.mapName, (mgSubState) => {
        let showGroups = [...mgSubState.showGroups];
        let hideGroups = [...mgSubState.hideGroups];
        if (payload.value === true) {
          showGroups.push(payload.id);
          showGroups = makeUnique(showGroups);
          hideGroups = hideGroups.filter((g) => g != payload.id);
        } else {
          hideGroups.push(payload.id);
          hideGroups = makeUnique(hideGroups);
          showGroups = showGroups.filter((g) => g != payload.id);
        }
        return {
          showLayers: mgSubState.showLayers,
          showGroups,
          hideLayers: mgSubState.hideLayers,
          hideGroups
        };
      });
    }
    case ActionType.LEGEND_SET_LAYER_VISIBILITY: {
      const { payload } = action;
      return applyMapGuideSubState(state, payload.mapName, (mgSubState) => {
        let showLayers = [...mgSubState.showLayers];
        let hideLayers = [...mgSubState.hideLayers];
        if (payload.value === true) {
          showLayers.push(payload.id);
          showLayers = makeUnique(showLayers);
          hideLayers = hideLayers.filter((g) => g != payload.id);
        } else {
          hideLayers.push(payload.id);
          hideLayers = makeUnique(hideLayers);
          showLayers = showLayers.filter((g) => g != payload.id);
        }
        return {
          showLayers,
          showGroups: mgSubState.showGroups,
          hideLayers,
          hideGroups: mgSubState.hideGroups
        };
      });
    }
    case ActionType.MAP_SET_SELECTION: {
      const { payload } = action;
      return applyMapGuideSubState(state, payload.mapName, (_) => ({
        selectionSet: payload.selection,
        layerIndex: -1,
        featureIndex: -1,
        activeSelectedFeature: void 0
      }));
    }
    case ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE: {
      const { payload } = action;
      const subState = state[payload.mapName];
      if (subState) {
        const cs = (_f = subState.clientSelection) != null ? _f : {
          layers: []
        };
        let lyr = cs.layers.find((l) => l.name == payload.layerName);
        if (!lyr) {
          lyr = {
            name: payload.layerName,
            features: []
          };
          cs.layers.push(lyr);
        }
        lyr.features.push(payload.feature);
        return mergeSubState(state, payload.mapName, __spreadProps(__spreadValues({}, subState), {
          clientSelection: cs
        }));
      }
      return state;
    }
    case ActionType.MAP_CLEAR_CLIENT_SELECTION: {
      const { payload } = action;
      const subState = state[payload.mapName];
      if (subState) {
        return mergeSubState(state, payload.mapName, __spreadProps(__spreadValues({}, subState), {
          clientSelection: void 0
        }));
      }
      return state;
    }
    case ActionType.MAP_SHOW_SELECTED_FEATURE: {
      const { payload } = action;
      return applyMapGuideSubState(state, payload.mapName, (_) => ({
        activeSelectedFeature: {
          layerId: payload.layerId,
          selectionKey: payload.selectionKey
        }
      }));
    }
    case ActionType.MAP_SET_BASE_LAYER: {
      const { payload } = action;
      const subState = state[payload.mapName];
      if (subState) {
        const layers = subState.externalBaseLayers || [];
        const baseLayers = layers.map((layer) => {
          if (layer.kind != "UTFGrid") {
            layer.visible = false;
          }
          if (layer.name == payload.layerName) {
            layer.visible = true;
          }
          return layer;
        });
        const state1 = {
          externalBaseLayers: baseLayers
        };
        return mergeSubState(state, payload.mapName, __spreadValues(__spreadValues({}, subState), state1));
      }
      return state;
    }
    case ActionType.EXTERNAL_LAYERS_READY: {
      const { payload } = action;
      const subState = state[payload.mapName];
      if (subState) {
        const layers = (_g = subState.layers) != null ? _g : [];
        const state1 = {
          layers
        };
        return mergeSubState(state, payload.mapName, __spreadValues(__spreadValues({}, subState), state1));
      }
      return state;
    }
    case ActionType.LAYER_ADDED: {
      const { payload } = action;
      const subState = state[payload.mapName];
      if (subState) {
        const layers = [payload.layer, ...(_h = subState.layers) != null ? _h : []];
        const state1 = {
          layers
        };
        const ss = mergeSubState(state, payload.mapName, __spreadValues(__spreadValues({}, subState), state1));
        if (payload.defaultStyle) {
          const ss1 = setLayerAction(ss, payload.mapName, payload.layer.name, () => ({ vectorStyle: payload.defaultStyle }));
          return ss1;
        }
        return ss;
      }
      return state;
    }
    case ActionType.REMOVE_LAYER: {
      const { payload } = action;
      const subState = state[payload.mapName];
      if (subState && subState.layers) {
        const layers = subState.layers.filter((l) => l.name != action.payload.layerName);
        const state1 = {
          layers
        };
        return mergeSubState(state, payload.mapName, __spreadValues(__spreadValues({}, subState), state1));
      }
      return state;
    }
    case ActionType.SET_LAYER_VISIBILITY: {
      const { mapName, layerName, visible } = action.payload;
      const state1 = setLayerAction(state, mapName, layerName, () => ({ visible }));
      return state1;
    }
    case ActionType.SET_LAYER_OPACITY: {
      const { mapName, layerName, opacity } = action.payload;
      const state1 = setLayerAction(state, mapName, layerName, () => ({ opacity }));
      return state1;
    }
    case ActionType.SET_HEATMAP_LAYER_BLUR: {
      const { mapName, layerName, blur } = action.payload;
      const state1 = setLayerAction(state, mapName, layerName, (layer) => {
        var _a2;
        return {
          heatmap: __spreadProps(__spreadValues({}, (_a2 = layer.heatmap) != null ? _a2 : { blur: 15, radius: 5 }), {
            blur
          })
        };
      });
      return state1;
    }
    case ActionType.SET_HEATMAP_LAYER_RADIUS: {
      const { mapName, layerName, radius } = action.payload;
      const state1 = setLayerAction(state, mapName, layerName, (layer) => {
        var _a2;
        return {
          heatmap: __spreadProps(__spreadValues({}, (_a2 = layer.heatmap) != null ? _a2 : { blur: 15, radius: 5 }), {
            radius
          })
        };
      });
      return state1;
    }
    case ActionType.SET_LAYER_INDEX: {
      const { mapName, index: index2, layerName } = action.payload;
      const subState = state[mapName];
      if (subState && subState.layers) {
        const layers = [...subState.layers];
        let currentIdx = -1;
        for (let i = 0; i < layers.length; i++) {
          if (layers[i].name == layerName) {
            currentIdx = i;
            break;
          }
        }
        if (currentIdx >= 0 && currentIdx != index2 && index2 < layers.length && index2 >= 0) {
          const theLayer = layers[currentIdx];
          layers.splice(currentIdx, 1);
          layers.splice(index2, 0, theLayer);
          const state1 = {
            layers
          };
          return mergeSubState(state, mapName, __spreadValues(__spreadValues({}, subState), state1));
        }
      }
      return state;
    }
    case ActionType.SET_LAYER_VECTOR_STYLE: {
      const { mapName, layerName, style, which } = action.payload;
      const state1 = setLayerAction(state, mapName, layerName, (current) => {
        if (which == VectorStyleSource.Base) {
          return { vectorStyle: style };
        } else if (which == VectorStyleSource.Cluster) {
          return {
            cluster: __spreadProps(__spreadValues({}, current.cluster), {
              style: __spreadValues({}, style)
            })
          };
        } else {
          return {};
        }
      });
      return state1;
    }
    case ActionType.ADD_LAYER_BUSY_WORKER: {
      const { mapName, layerName } = action.payload;
      const state1 = setLayerAction(state, mapName, layerName, (l) => ({ busyWorkerCount: l.busyWorkerCount + 1 }));
      return state1;
    }
    case ActionType.REMOVE_LAYER_BUSY_WORKER: {
      const { mapName, layerName } = action.payload;
      const state1 = setLayerAction(state, mapName, layerName, (l) => ({ busyWorkerCount: l.busyWorkerCount - 1 }));
      return state1;
    }
  }
  return state;
}
const VIEWER_INITIAL_STATE = {
  busyCount: 0,
  size: void 0,
  tool: ActiveMapTool.None,
  featureTooltipsEnabled: true
};
function viewerReducer(state = VIEWER_INITIAL_STATE, action) {
  switch (action.type) {
    case ActionType.INIT_APP: {
      const tool = action.payload.initialActiveTool;
      const ft = action.payload.featureTooltipsEnabled;
      let state1;
      if (tool != null) {
        state1 = {
          tool
        };
      }
      let state2;
      if (typeof ft != "undefined") {
        state2 = {
          featureTooltipsEnabled: ft
        };
      }
      return __spreadValues(__spreadValues(__spreadValues({}, state), state1), state2);
    }
    case ActionType.MAP_SET_ACTIVE_TOOL: {
      const state1 = {
        tool: action.payload
      };
      return __spreadValues(__spreadValues({}, state), state1);
    }
    case ActionType.MAP_SET_MAPTIP: {
      const state1 = {
        featureTooltipsEnabled: action.payload
      };
      return __spreadValues(__spreadValues({}, state), state1);
    }
    case ActionType.MAP_ENABLE_SELECT_DRAGPAN: {
      const state1 = {
        selectCanDragPan: action.payload
      };
      return __spreadValues(__spreadValues({}, state), state1);
    }
    case ActionType.MAP_SET_BUSY_COUNT: {
      const state1 = {
        busyCount: action.payload
      };
      return __spreadValues(__spreadValues({}, state), state1);
    }
    case ActionType.MAP_RESIZED: {
      const state1 = {
        size: [action.payload.width, action.payload.height]
      };
      return __spreadValues(__spreadValues({}, state), state1);
    }
  }
  return state;
}
const MOUSE_INITIAL_STATE = {
  coords: void 0
};
function mouseReducer(state = MOUSE_INITIAL_STATE, action) {
  switch (action.type) {
    case ActionType.UPDATE_MOUSE_COORDINATES: {
      const data = action.payload.coord;
      if (isCoordinate(data)) {
        const state1 = { coords: data };
        return __spreadValues(__spreadValues({}, state), state1);
      }
    }
  }
  return state;
}
const rootReducer = {
  initError: initErrorReducer,
  config: configReducer,
  template: templateReducer,
  mapState: mapStateReducer,
  viewer: viewerReducer,
  toolbar: toolbarReducer,
  taskpane: taskPaneReducer,
  modal: modalReducer,
  mouse: mouseReducer,
  lastaction: lastAction
};
function configureStore(initialState, extraReducers) {
  const rootReducerMap = extraReducers ? __spreadValues(__spreadValues({}, rootReducer), extraReducers) : rootReducer;
  const isDev = true;
  return configureStore$1({
    reducer: combineReducers(rootReducerMap),
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => {
      const base = getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
      }).prepend(promiseMiddleware);
      return base.concat(logger);
    },
    devTools: isDev
  });
}
class ApplicationViewModel {
  /**
   * @hidden
   */
  constructor() {
  }
  /**
   * Returns any extra initial state to include as part of initializing the redux store
   * 
   * Overridable by sub-classes that want to include extra initial state
   * 
   * @virtual
   * @protected
   * @returns {*} 
   *
   */
  getExtraInitialState() {
    return {};
  }
  /**
   * Returns any extra reducers to include as part of initializing the redux store
   * 
   * Overridable by sub-classes that want to include custom reducers
   * 
   * @virtual
   * @protected
   * @returns {*} 
   *
   */
  getExtraReducers() {
    return {};
  }
  /**
   * Mounts the map viewer application at the specified DOM element with the
   * given component props.
   *
   * For the viewer templates already provided, this method is already called
   * for you in the template's HTML. If you are creating your own viewer template, be
   * sure to call this method must on the template's HTML.
   *
   * @param {Element} node
   * @param {IAppProps & IApplicationMountOptions} props
   *
   *
   */
  mount(node, props) {
    var _a, _b, _c, _d;
    const subs = (_a = props.subscribers) != null ? _a : [];
    const agentConf = {
      agentUri: (_b = props.mapguide) == null ? void 0 : _b.agentUri,
      agentKind: (_d = (_c = props.mapguide) == null ? void 0 : _c.agentKind) != null ? _d : "mapagent"
    };
    const initState = __spreadValues(__spreadValues({}, { config: __spreadValues(__spreadValues(__spreadValues({}, CONFIG_INITIAL_STATE), agentConf), props.initialConfig || {}) }), this.getExtraInitialState());
    const extraReducers = this.getExtraReducers();
    this._store = configureStore(initState, extraReducers);
    const provider2 = new MapGuideMapProviderContext();
    reactDomExports.render(/* @__PURE__ */ jsxRuntimeExports.jsxs(MapContextProvider, { value: provider2, store: this._store, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(App, __spreadValues({}, props)),
      subs.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Subscriber, __spreadValues({}, s), `subscriber-${i}-${s.name}`))
    ] }), node);
  }
  /**
   * Dispatches the given action
   * 
   * @param {(ViewerAction | ReduxThunkedAction)} action 
   *
   * @remarks Usage outside of the react component context should be used sparingly. In particular
   * you should avoid trying to call this method multiple times in succession. You should call this 
   * method once in response to a DOM element event (eg. A button click)
   * @alpha
   */
  dispatch(action) {
    this._store.dispatch(action);
  }
  /**
   * Gets the command registered by the specific name
   * 
   * @param {string} commandName 
   * @returns {(ICommand | undefined)} 
   *
   */
  getCommand(commandName) {
    return getCommand(commandName);
  }
  /**
   * Returns the current application state. This state is read-only and should not be modified.
   * 
   * @returns {Readonly<IApplicationState>} 
   *
   */
  getState() {
    return this._store.getState();
  }
}
addFormatDriver(new CsvFormatDriver(CSV_COLUMN_ALIASES));
addFormatDriver(new FormatDriver("GeoJSON", new GeoJSON()));
addFormatDriver(new FormatDriver("TopoJSON", new TopoJSON()));
addFormatDriver(new FormatDriver("KML", new KML(), "EPSG:4326"));
addFormatDriver(new FormatDriver("GPX", new GPX(), "EPSG:4326"));
addFormatDriver(new FormatDriver("IGC", new IGC()));
const DEFAULT_CAPS = {
  hasTaskPane: true
};
registerLayout("ajax-viewer", () => /* @__PURE__ */ jsxRuntimeExports.jsx(AjaxViewerLayout, {}), DEFAULT_CAPS);
registerLayout("sidebar", () => /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarLayout, {}), DEFAULT_CAPS);
registerLayout("aqua", () => /* @__PURE__ */ jsxRuntimeExports.jsx(AquaTemplateLayout, {}), DEFAULT_CAPS);
registerLayout("turquoise-yellow", () => /* @__PURE__ */ jsxRuntimeExports.jsx(TurquoiseYellowTemplateLayout, {}), DEFAULT_CAPS);
registerLayout("limegold", () => /* @__PURE__ */ jsxRuntimeExports.jsx(LimeGoldTemplateLayout, {}), DEFAULT_CAPS);
registerLayout("slate", () => /* @__PURE__ */ jsxRuntimeExports.jsx(SlateTemplateLayout, {}), DEFAULT_CAPS);
registerLayout("maroon", () => /* @__PURE__ */ jsxRuntimeExports.jsx(MaroonTemplateLayout, {}), DEFAULT_CAPS);
registerLayout("generic", () => /* @__PURE__ */ jsxRuntimeExports.jsx(GenericLayout, {}), {
  hasTaskPane: false
});
initDefaultCommands();
initMapGuideCommands();
registerDefaultComponents();
registerMapGuideComponents();
registerComponentFactory(DefaultComponentNames.Map, (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(MapViewer, __spreadValues({}, props)));
registerRequestBuilder("mapagent", (agentUri, locale) => new MapAgentRequestBuilder(agentUri, locale));
var __DEV__;
var __VERSION__;
var __COMMITHASH__;
var __BRANCH__;
class Registry {
  /**
   * Registers the given string bundle under the given locale
   *
   * @static
   * @param {string} locale The locale
   * @param {*} bundle The string bundle
   *
   *
   */
  static registerStringBundle(locale, bundle) {
    registerStringBundle(locale, bundle);
  }
  /**
   * Registers the given JSX element factory for the given viewer template name
   *
   * @static
   * @param {string} name The viewer template name
   * @param {() => JSX.Element} factory The JSX element factory that creates the viewer template component
   * @param caps Viewer template capabilities
   *
   *
   * @since 0.14 Added required caps parameter
   */
  static registerLayout(name, factory, caps) {
    registerLayout(name, factory, caps);
  }
  /**
   * Registers the given command with the given name
   *
   * @static
   * @param {string} name The name of the command
   * @param {(Common.ICommand | Common.IInvokeUrlCommand | Common.ISearchCommand)} cmdDef The command to register
   *
   *
   */
  static registerCommand(name, cmdDef) {
    registerCommand(name, cmdDef);
  }
  /**
   * Registers the given JSX element factory for the given component id
   *
   * @static
   * @param {string} id The component id
   * @param {(props: any) => JSX.Element} factory The JSX element factory that creates the component
   *
   *
   */
  static registerComponentFactory(id, factory) {
    registerComponentFactory(id, factory);
  }
  /**
   * Registers the given external vector layer factory method
   * 
   * @param driverName 
   * @param creator 
   * @since 0.14
   */
  static registerExternalVectorLayerCreator(driverName, creator) {
    const reg = ExternalLayerFactoryRegistry.getInstance();
    reg.registerExternalVectorLayerCreator(driverName, creator);
  }
}
const Externals = {
  /**
   * The exported public API for proj4js
   */
  proj4,
  /**
   * The exported public API for React
   */
  React,
  /**
   * The exported public API for ReactDOM
   */
  ReactDOM: ReactDOM$1
};
const Actions = {
  Map: MapActions,
  Legend: LegendActions,
  Flyout: FlyoutActions,
  Modal: ModalActions,
  TaskPane: TaskPaneActions,
  Template: TemplateActions,
  App: AppActions
};
const MapGuide = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Actions,
  Application: ApplicationViewModel,
  ElementGroup,
  ElementProvider,
  Externals,
  MinimalProvider: provider,
  Registry,
  TypedSelect,
  __BRANCH__,
  __COMMITHASH__,
  __DEV__,
  __VERSION__,
  getStateFromUrl,
  setAssetRoot,
  updateUrl,
  useElementContext
}, Symbol.toStringTag, { value: "Module" }));
if (typeof window !== "undefined") {
  window.MapGuide = MapGuide;
}
export {
  MDF_INFINITY as M,
  MgError as a
};
//# sourceMappingURL=viewer-debug.js.map
