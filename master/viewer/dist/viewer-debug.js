const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./chunks/geotiff-debug.js","./chunks/rolldown-runtime-debug.js","./chunks/geotiff-deps-debug.js","./chunks/geotiff-codecs-debug.js"])))=>i.map(i=>d[i]);
import { a as __toESM, r as __exportAll } from "./chunks/rolldown-runtime-debug.js";
import { a as require_react_dom, i as require_jsx_runtime, o as require_react } from "./chunks/react-vendor-debug.js";
import { $t as fromLonLat, Cr as __vitePreload, Er as init_objectSpread2, Hn as buffer, Jt as init_objectWithoutProperties, P as DEVICE_PIXEL_RATIO, Qt as equivalent, Tr as _objectSpread2, V as createXYZ, W as TileGrid, Yn as createEmpty, Yt as register, dn as getArea, fn as getDistance, fr as getTopLeft, gn as METERS_PER_UNIT, gr as isEmpty, hn as Projection, k as easeOut, ln as transform, lr as getHeight, mr as getWidth, nn as get, qn as containsXY, qt as _objectWithoutProperties, sr as getCenter, tr as extend$1, un as transformExtent, wr as _asyncToGenerator, wt as unByKey } from "./chunks/geotiff-debug.js";
import { C as require_Popover, S as zt, _ as combineReducers, a as Z, b as require_lodash_xor, c as Rnd, d as useDispatch, f as Provider, g as createSelector, h as configureStore$1, i as index, l as require_cjs, m as import_react_dom$1, n as require_lodash_debounce, o as geojsonvt, p as useSelector, r as stickybits, s as require_papaparse_min, t as require_immutability_helper, u as purify, v as proj4, x as Fe, y as require_lodash_xorby } from "./vendor-debug.js";
import { C as RegularShape, S as CircleStyle, a as WMSCapabilities, at as fromExtent, b as Stroke, c as GeoJSON, ct as LineString, d as MultiPolygon, f as MultiPoint, g as Style, h as Text, i as TopoJSON, it as fromCircle, l as GeometryCollection, m as Feature, mt as Point, n as IGC, o as MVT, p as MultiLineString, q as asArray, r as GPX, rt as Polygon, s as KML, st as LinearRing, t as WKT, w as Icon$1, x as Fill } from "./chunks/ol-formats-debug.js";
import { A as TileWMS, B as ImageMapGuide, C as getRenderPixel, D as Cluster, E as VectorTile, F as OSM, G as UrlTile, H as defaultImageLoadFunction, I as ImageLayer, K as LayerGroup, L as TileLayer, M as UTFGrid, N as BingMaps, O as VectorSource, P as TileDebug, R as View, S as ImageWMS, T as VectorTileLayer, U as XYZ, V as ImageSource, W as TileImage, _ as Rotate, a as Circle, b as Translate, c as Map$1, d as MouseWheelZoom, f as KeyboardZoom, g as DragPan, h as DragRotate, i as Draw, j as WebGLTileLayer, k as VectorLayer, l as PinchZoom, m as DragBox, n as Snap, o as Select, p as KeyboardPan, q as Collection, r as Extent, s as OverviewMap, t as Modify, u as PinchRotate, v as Attribution, w as toContext, x as Heatmap, y as Overlay, z as Static } from "./chunks/ol-debug.js";
//#region src/constants.ts
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var MDF_INFINITY = 0xe8d4a51000;
var WEBLAYOUT_TOOLBAR = "Toolbar";
var WEBLAYOUT_TASKMENU = "TaskMenu";
var WEBLAYOUT_CONTEXTMENU = "MapContextMenu";
var FUSION_TASKPANE_NAME = "TaskPane";
var LAYER_ID_BASE = "LAYER_ID_BASE";
var LAYER_ID_MG_BASE = "LAYER_ID_MG_BASE";
/**
* @since 0.14.8
*/
var LAYER_ID_MG_DYNAMIC_OVERLAY = "LAYER_ID_MG_DYNAMIC_OVERLAY";
var LAYER_ID_MG_SEL_OVERLAY = "LAYER_ID_MG_SEL_OVERLAY";
var BLANK_GIF_DATA_URI = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
//#endregion
//#region src/strings/en.ts
var STRINGS_EN = {
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
	"UNIT_ABBR_DEGREES": "°",
	"UNIT_ABBR_DEC_DEGREES": "°",
	"UNIT_ABBR_DMS": "°",
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
//#endregion
//#region src/utils/logger.ts
/**
* Log an informational message. Does nothing in a production build
*
* @param {*} [message]
* @param {...any[]} optionalParams
*/
function info(message, ...optionalParams) {
	console.info(message, optionalParams);
}
/**
* Log a warning message. Does nothing in a production build
*
* @param {*} [message]
* @param {...any[]} optionalParams
*/
function warn(message, ...optionalParams) {
	console.warn(message, optionalParams);
}
/**
* Log an error message. Does nothing in a production build
*
* @param {*} [message]
* @param {...any[]} optionalParams
*/
function error(message, ...optionalParams) {
	console.error(message, optionalParams);
}
/**
* Log a debug message. Does nothing in a production build
*
* @param {*} [message]
* @param {...any[]} optionalParams
*/
function debug(message, ...optionalParams) {
	console.debug(message, optionalParams);
}
var STRINGS = { "en": STRINGS_EN };
/**
* Registers a string bundle for the given locale
*
* @param {string} locale
* @param {ILocalizedMessages} bundle
*/
function registerStringBundle(locale, bundle) {
	STRINGS[locale] = bundle;
}
/**
* Formats the specified string and substitutes any placeholders (enclosed in {})
* with the specified arguments
*
* @param {string} format
* @param {*} [args]
* @returns {string}
*/
function fmt(format, args) {
	let str = format;
	if (args != null) {
		for (const p in args) str = str.split(`{${p}}`).join(args[p]);
		return str;
	}
	return str;
}
/**
* Returns the localized string for the given key
*
* @param {keyof ILocalizedMessages} key Any property name of {@link ILocalizedMessages}
* @param {string} [locale="en"] 
* @param {*} [args] If a localized string has placeholders, they will be replaced with the values defined here
* @returns {string} 
*/
function tr(key, locale = "en", args) {
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
			if (args != null) return fmt(str, args);
			return str;
		}
	}
}
//#endregion
//#region src/api/common.ts
/**
* The default blank size
*/
var BLANK_SIZE = {
	w: 1,
	h: 1
};
var UnitOfMeasure = /* @__PURE__ */ function(UnitOfMeasure) {
	/**
	* An unknown unit
	*/
	UnitOfMeasure[UnitOfMeasure["Unknown"] = 0] = "Unknown";
	/**
	* Inch unit
	*/
	UnitOfMeasure[UnitOfMeasure["Inches"] = 1] = "Inches";
	/**
	* Feet unit
	*/
	UnitOfMeasure[UnitOfMeasure["Feet"] = 2] = "Feet";
	/**
	* Yard unit
	*/
	UnitOfMeasure[UnitOfMeasure["Yards"] = 3] = "Yards";
	/**
	* Mile unit
	*/
	UnitOfMeasure[UnitOfMeasure["Miles"] = 4] = "Miles";
	/**
	* Nautical Mile unit
	*/
	UnitOfMeasure[UnitOfMeasure["NauticalMiles"] = 5] = "NauticalMiles";
	/**
	* Millimeter unit
	*/
	UnitOfMeasure[UnitOfMeasure["Millimeters"] = 6] = "Millimeters";
	/**
	* Centimeter unit
	*/
	UnitOfMeasure[UnitOfMeasure["Centimeters"] = 7] = "Centimeters";
	/**
	* Meter unit
	*/
	UnitOfMeasure[UnitOfMeasure["Meters"] = 8] = "Meters";
	/**
	* Kilometer unit
	*/
	UnitOfMeasure[UnitOfMeasure["Kilometers"] = 9] = "Kilometers";
	/**
	* Degree unit
	*/
	UnitOfMeasure[UnitOfMeasure["Degrees"] = 10] = "Degrees";
	/**
	* Decimal Degree unit
	*/
	UnitOfMeasure[UnitOfMeasure["DecimalDegrees"] = 11] = "DecimalDegrees";
	/**
	* DMS unit
	*/
	UnitOfMeasure[UnitOfMeasure["DMS"] = 12] = "DMS";
	/**
	* Pixel unit
	*/
	UnitOfMeasure[UnitOfMeasure["Pixels"] = 13] = "Pixels";
	return UnitOfMeasure;
}({});
/**
* An active map viewer tool
*
* @enum {number}
*/
var ActiveMapTool = /* @__PURE__ */ function(ActiveMapTool) {
	/**
	* Zoom tool
	*/
	ActiveMapTool[ActiveMapTool["Zoom"] = 0] = "Zoom";
	/**
	* Selection tool
	*/
	ActiveMapTool[ActiveMapTool["Select"] = 1] = "Select";
	/**
	* Pan tool
	*/
	ActiveMapTool[ActiveMapTool["Pan"] = 2] = "Pan";
	/**
	* None
	*/
	ActiveMapTool[ActiveMapTool["None"] = 3] = "None";
	return ActiveMapTool;
}({});
/**
* A bit mask indicating how a map viewer should refresh
*
* @enum {number}
*/
var RefreshMode = /* @__PURE__ */ function(RefreshMode) {
	/**
	* Refresh only the layers
	*/
	RefreshMode[RefreshMode["LayersOnly"] = 1] = "LayersOnly";
	/**
	* Refresh only the selection
	*/
	RefreshMode[RefreshMode["SelectionOnly"] = 2] = "SelectionOnly";
	return RefreshMode;
}({});
/**
* The default modal dialog size
*/
var DEFAULT_MODAL_SIZE = [350, 500];
/**
* The default modal dialog position
* @since 0.14.8
*/
var DEFAULT_MODAL_POSITION = [500, 80];
/**
* A function that does nothing
*
*
*/
function NOOP$1() {}
/**
* A function that always returns false
*
*
* @returns false
*/
function ALWAYS_FALSE() {
	return false;
}
/**
* Helper function to get the initial map view from the application state
*
*
* @param {Readonly<IApplicationState>} state
* @returns {(IMapView | undefined)}
*/
function getInitialView(state) {
	if (state.config.activeMapName) return state.mapState[state.config.activeMapName].initialView;
}
/**
* Helper function to get the mapguide-specific sub state of the current map group
*
*
* @param {Readonly<IApplicationState>} state
* @returns {(IMapGuideSubState | undefined)}
* @since 0.14
*/
function getMapGuideSubState(state) {
	if (state.config.activeMapName) return state.mapState[state.config.activeMapName].mapguide;
}
/**
* Helper function to get the current selection set from the application state
*
*
* @param {Readonly<IApplicationState>} state
* @returns {(QueryMapFeaturesResponse | undefined)}
*/
function getSelectionSet(state) {
	var _getMapGuideSubState;
	return (_getMapGuideSubState = getMapGuideSubState(state)) === null || _getMapGuideSubState === void 0 ? void 0 : _getMapGuideSubState.selectionSet;
}
/**
* Helper function to get the current runtime map state from the application state
*
*
* @param {Readonly<IApplicationState>} state
* @returns {(RuntimeMap | undefined)}
*/
function getRuntimeMap(state) {
	var _getMapGuideSubState2;
	return (_getMapGuideSubState2 = getMapGuideSubState(state)) === null || _getMapGuideSubState2 === void 0 ? void 0 : _getMapGuideSubState2.runtimeMap;
}
/**
* Helper function to get the current view from the application state
*
*
* @param {Readonly<IApplicationState>} state
* @returns {(IMapView | undefined)}
*/
function getCurrentView(state) {
	if (state.config.activeMapName) return state.mapState[state.config.activeMapName].currentView;
}
/**
* Determines if the given external base layer is one with a visual representation
* 
* @param layer 
* @returns 
* @since 0.14.9
*/
function isVisualBaseLayer(layer) {
	return layer.kind != "UTFGrid";
}
/**
* Helper function to get the current set of available external base layers from the application state
*
* @remarks This does not include "non-visual" base layers such as UTFGrid tilesets
* 
*
* @param {Readonly<IApplicationState>} state
* @returns {(IExternalBaseLayer[] | undefined)}
* 
* @since 0.14.9 Removed includeNonVisual parameter
*/
function getExternalBaseLayers(state) {
	if (state.config.activeMapName) return state.mapState[state.config.activeMapName].externalBaseLayers;
}
/**
* Custom properties that can be attached to OpenLayers layer instances
* 
* @since 0.13
*/
var LayerProperty = /* @__PURE__ */ function(LayerProperty) {
	LayerProperty["LAYER_TYPE"] = "layer_type";
	LayerProperty["LAYER_NAME"] = "name";
	/**
	* @since 0.14
	*/
	LayerProperty["LAYER_DISPLAY_NAME"] = "display_name";
	LayerProperty["IS_GROUP"] = "is_group";
	LayerProperty["IS_EXTERNAL"] = "is_external";
	LayerProperty["IS_SELECTABLE"] = "is_selectable";
	/**
	* @since 0.14.5
	*/
	LayerProperty["DISABLE_HOVER"] = "disable_hover";
	LayerProperty["IS_SCRATCH"] = "is_scratch";
	LayerProperty["HAS_WMS_LEGEND"] = "has_wms_legend";
	LayerProperty["VECTOR_STYLE"] = "vector_style";
	LayerProperty["WGS84_BBOX"] = "wgs84_bbox";
	LayerProperty["BUSY_WORKER_COUNT"] = "busy_worker_count";
	/**
	* @since 0.14
	*/
	LayerProperty["SELECTED_POPUP_CONFIGURATION"] = "popup_config";
	/**
	* @since 0.14
	*/
	LayerProperty["LAYER_DESCRIPTION"] = "layer_description";
	/**
	* @since 0.14
	*/
	LayerProperty["LAYER_METADATA"] = "layer_metadata";
	/**
	* @since 0.14
	*/
	LayerProperty["IS_HOVER_HIGHLIGHT"] = "is_hover_highlight";
	/**
	* @since 0.14
	*/
	LayerProperty["IS_MEASURE"] = "is_measure";
	/**
	* @since 0.14
	*/
	LayerProperty["IS_WMS_SELECTION_OVERLAY"] = "is_wms_selection_overlay";
	/**
	* @since 0.14
	*/
	LayerProperty["IS_HEATMAP"] = "is_heatmap";
	/**
	* A source definition to attach to the layer. This is to assist in persistence of this layer for easy
	* restoration on an application-defined basis
	* 
	* @since 0.14.3
	*/
	LayerProperty["LAYER_DEFN"] = "layer_defn";
	return LayerProperty;
}({});
/**
* Custom properties that can be attached to OpenLayers image source instances
* 
* @since 0.13
*/
var SourceProperty = /* @__PURE__ */ function(SourceProperty) {
	SourceProperty["SUPPRESS_LOAD_EVENTS"] = "suppress_load_events";
	return SourceProperty;
}({});
/**
* MapGuide layer types
* 
* @since 0.13
*/
var MgLayerType = /* @__PURE__ */ function(MgLayerType) {
	MgLayerType["Untiled"] = "MapGuide_Untiled";
	MgLayerType["Tiled"] = "MapGuide_Tiled";
	return MgLayerType;
}({});
/**
* The type name for a MapGuide layer
* 
* @since 0.13
*/
var MG_LAYER_TYPE_NAME = "MapGuide";
/**
* The default group name for MapGuide tiled layers. This value
* is not meant for localized display
* 
* @since 0.13
*/
var MG_BASE_LAYER_GROUP_NAME = "Base Tile Layers";
/**
* Default names for MapGuide built-in layer types. These value
* are not meant for localized display
* 
* @since 0.13
*/
var MgBuiltInLayers = /* @__PURE__ */ function(MgBuiltInLayers) {
	MgBuiltInLayers["Overlay"] = "MapGuide Dynamic Overlay";
	MgBuiltInLayers["SelectionOverlay"] = "MapGuide Selection Overlay";
	MgBuiltInLayers["ActiveFeatureSelectionOverlay"] = "MapGuide Active Feature Selection Overlay";
	return MgBuiltInLayers;
}({});
//#endregion
//#region src/api/runtime.ts
/**
* runtime.ts
*
* This represents a runtime environment where components can interact with the map viewer
* in the traditional way. This module is mainly for servicing the AJAX viewer API emulation.
*
* Where possible, use actions instead of this module
*/
var _fusionRoot;
/**
* Sets the Fusion base URL
*
*
* @param {string} root
*/
function setFusionRoot(root) {
	_fusionRoot = root;
	debug(`Fusion root set to: ${root}. Access to Fusion backend services and widget content will be relative to this value`);
}
/**
* Gets the Fusion base URL
*
*
* @returns {string}
*/
function getFusionRoot() {
	return _fusionRoot || "../fusion";
}
//#endregion
//#region stdassets/cursors/digitizePoint.cur
var digitizePoint_default = "" + new URL("stdassets/cursors/digitizePoint.cur", import.meta.url).href;
//#endregion
//#region stdassets/cursors/digitizeLine.cur
var digitizeLine_default = "" + new URL("stdassets/cursors/digitizeLine.cur", import.meta.url).href;
//#endregion
//#region stdassets/cursors/digitizeLineString.cur
var digitizeLineString_default = "" + new URL("stdassets/cursors/digitizeLineString.cur", import.meta.url).href;
//#endregion
//#region stdassets/cursors/digitizeRectangle.cur
var digitizeRectangle_default = "" + new URL("stdassets/cursors/digitizeRectangle.cur", import.meta.url).href;
//#endregion
//#region stdassets/cursors/digitizePolygon.cur
var digitizePolygon_default = "" + new URL("stdassets/cursors/digitizePolygon.cur", import.meta.url).href;
//#endregion
//#region stdassets/cursors/digitizeCircle.cur
var digitizeCircle_default = "" + new URL("stdassets/cursors/digitizeCircle.cur", import.meta.url).href;
//#endregion
//#region stdassets/cursors/grabbing.cur
var grabbing_default = "data:image/x-icon;base64,AAACAAEAICAAAA8ADwCoDAAAFgAAACgAAAAgAAAAQAAAAAEAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////8AAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////////////////////////////////////////////////////////////wD///8A///+AP///AB///gAf//4AD///AA///4AP//8AD///AB///5J///////////////////////////////////////////////////////w==";
//#endregion
//#region stdassets/cursors/grab.cur
var grab_default = "data:image/x-icon;base64,AAACAAEAICAAABAAEACoDAAAFgAAACgAAAAgAAAAQAAAAAEAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////8AAAD///////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAD///////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAD///////8AAAD///////8AAAAAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////////////////////////////////////////////4B///+Af///AH///gA///wAP//8AB//+AAf//AAH//wAA//+QAP//4AD//+AA///ABf//wAf//+QP///+f////////////////////////////////////////////w==";
//#endregion
//#region stdassets/cursors/zoomin.cur
var zoomin_default = "data:image/x-icon;base64,AAACAAEAICAAAA4ADACoDAAAFgAAACgAAAAgAAAAQAAAAAEAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC/v78AAAAAAADPz88AAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADf398AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADf398AAAAAAAAAAAAAAAAAAAAAAADf398AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC/v78AAAAAAADPz88AAAAAAADPz88AAAAAAAC/v78AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAADPz88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////////////////////3////4////8f///+P//+BH//+GD///n9///znP//85z///YG///2Bv//85z///Oc///5+f//+GH///4H///////////////////////////////////////w==";
//#endregion
//#region stdassets/images/res/sliderscale.png
var sliderscale_default = "" + new URL("stdassets/images/res/sliderscale.png", import.meta.url).href;
//#endregion
//#region stdassets/images/res/spinner.gif
var spinner_default = "data:image/gif;base64,R0lGODlhEgAGAMQSABBHfhCM2xCe94irv4m82InF5BA0ZBB3vIizy4iktBBfnonM77a0tM7OzsjIyNLS0sLCwry8u////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgASACwAAAAAEgAGAAAFNKAgSNLzkCZ6lk8QkE0Dy1I8HwfpODov7T2FggSBEI2S4hEAIEUiTqjkGTUYSAwGVivJbkMAIfkEBQoAEgAsAAAAAAYABgAABRngskiSIBQFGQQEQR4HgpCKMgwkACQJaRghACH5BAUKABIALAAAAAAKAAYAAAUp4PNI0rKQgtA0ZFGQQeA4JEGQxwFBJIKQCkUkQhoMSAAAg0FKJEgGQwgAIfkEBQoAEgAsBAAAAAoABgAABSng80jSspCC0DRkUZBB4DgkQZDHAUEkgpAKRSRCGgxIAACDQUokSAZDCAAh+QQFCgASACwIAAAACgAGAAAFKeDzSNKykILQNGRRkEHgOCRBkMcBQSSCkApFJEIaDEgAAINBSiRIBkMIACH5BAUKABIALAwAAAAGAAYAAAUZ4PNI0rI0DVkUjkMSBASRCBJF5DAwDJkkIQA7";
//#endregion
//#region stdassets/images/res/slider.png
var slider_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAMCAYAAACeGbYxAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIaSURBVHjarFOxjhJRFD0HJ5FZoGMQaLQQIlJsa6JbabNS7wf4J/snfgEl1a6lyVpSKG4wuHGBITAJBQzziAzXYt6beWPs1ldM3tz33r33nHsORQSDweCF67ofXNd9XSwWn+E/L6XUXRRFn6Mo+tjr9b6z3++3S6XSpe/7L33f362CYE8IAP1NtgAAEYAEYMXSJTr8j3jVqz5uNOonjXrjW7jbXTqRUhf3v+7b4/F4DQogBGgVSGtklcxOREAQYhWiaYD6DoDZdLqfzWb7VqvV9jzvwlmv16eTu59RtFdIoekXFNEFzHNAyDSelqHACuhGJAsTgBCTySRyHjmnzmw6bQbL1e8sjWC5XFWCIKg8dJbVanXj1bwNNQildofSSanpLBYLhGGYUgoK5r5faT9vzZOBAqKx5oepGYEkxIg1CibJxuMfzXK5vBFJDknCX8zhBEEQK6VyHb4/P990Op3mQ5GORqPNcDjMxeI4jnl29ubqcIgdIwhCE62FJAILp1g4mUqbYk4tMWUy0CwSpKBQcA7OdhveHo/HrhEEU9byArFzZD+0yLfFZS8rD4ECC7eOUurLIY67OamLQLRfjE9THZszw4QZJDKPZd7+WxMARG6c7Ta8AuQpgLdJU9QgMqFYRtBnxjbaWshEaBighVsytJ8AXrNWewJA6gDeEXglQNem0DCtTWoVtkYA626uizT2lZAbgNdCLP4MACMyK8d2rHGxAAAAAElFTkSuQmCC";
//#endregion
//#region stdassets/images/icons/zoom-out-fixed.png
var zoom_out_fixed_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACcUlEQVQ4jZXSS0hUURgH8P85d+713ma8Cl4GTdB5Q6FOhAslyo2jpESrHqSVm6aFL3qvolyUEkEoQ2BBEQUSBC1aidITg16gCA45Y07XuquuM82MOledOS1iYkZt4R/+qwM/vvPxEcYYsjlz7mKvpqpdkVDIuZxMEslsZnaPZ25nRUXg/p3bg5U2J75H5pAbkgUOHTk2m/wdd5/w++HevQu8IGBtdRWhYBAPB4dQYrWGXzx76t6IEMYYDh89PttwYL97X0srBJ4HAZBmDFlcLhBw83ofoouLocmPnzy5AKcvp3p/qgttZy+cxw6xAKWyjNIiGUuGAUIIOEqxzhhq6+vwfGSkpKHJF2vxNX7IAlRTFzr93Z0wiyKKJBGKxYx0Og2e4yDk1CxJ8Pd0Q1PVztwd0Nlg0FXj9ULkeSgWCwiApLEKE6UQTKa87q2txdeZoCsXMCXicWKWJPAch/a2DmQYAwPDxgwN3wUVRSwlkyQPKCwsZCSTITzHYfjBPWQYQ4ZtBgBgLZWCxWLJe6RVNdXhmelpmCgFJeTv6Bv+n+3k5y+oqqkO5wEOuz3Qd/UaBI5CMHFbVhJ4sPQ6bg0MwGG3BzYdUvvJ06ESRXH199+AIAibRjcMA5cvXUEikYCmaRgfG/23B1ppc+LJ40fuqL4YajnYindv3sJYSYEwBmNlBa9fvkKTrxn6Lx2xqA6nw4ZGXzPLm6DS5gQAdHSc6pn/FumanJpyxeNxIssy2+P1hu0OW2Bi4v1gLKrDarWivLwc8xEV42OjhLD/bHyrNPqaWSyqQ1EUlJWVYeGHhm0BuUhxcTFAuO0DWQQA6uvq8AeNtv56TeSTZQAAAABJRU5ErkJggg==";
var ICON_ERROR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA31JREFUeNpc01tMUwcAxvH/ubWnFEohtBSYKJciCHJTsojOZS4mi9HswcwlZmaMBUMW2QOZMwvJnvewLSNLMDHGLXtmLpvRZS44QDYWqgWDrSBjsIGWcm1LaU8v55w9uRi/5y//t5/wXkcHAKZpYhgGCAL5LnddWUnp0dpqb6PVoggT/vuBX3+7Mzo2NDTNCxOeBTLpNPnu4r3NNbWfVSYTJ3OWl2R9fR3dMLC4XJh7KoyAINzu//abTx5O+qeeBaSW5may2SylFZVvvF5Rfav6z99bJL9PzITDZLa3ycRiJJ4ssT01Kbg2N6pPd77/zroszc0Gg0EAqbGhAUeRy3usouq2+5dbBVooRMaWg6ZpZESBtGGQSmfQrVaiKyts3btneau7+03/0tLPT5eXQ6IpCDRWeb8sGL6Tv7O2hvvMGZouDyCXl5OIRknEYrBrF7aeHoS2NqKRCNNf9Vs/On/+a0lRJNFR5Kot29w4oS39Q9I0yWlsRNq9m/KLF8HlxvR4sJ49S8LhYLuoiKSmsRwMoM7PH2o6cPBlqfXAwdP7NzZOpcIh0obB07Ex8HgwPB4yL5Wh19SwrSisDg0RGxiASAR9ZwdZ10nt2/evWFtZWa+thtGyOmkgvr6Gr7OThRs3iMoKMUVh6+5dEv39qKkUsixjlSSyK2EK7bleURRFMaPrpHQdbWeH+MwsptVKQlWJx+MkNQ2cTuweD7JuYJVlVEXBKokYuiFKRZ6SyqZc+4nIX3MkFhaQvV6cfX0knU5iIyMY4TC2lhYKjhxBWVxE2tzEAhTU7MWnqjdFn//+sFhZZcbn/yadyZBz7hzJwkK2RkdJXrkCV69in5uj+vhx9vT2ogIOw8BW34A/GByW5x4FAwuqddjm8by2FgoRunYNsb0dbXCQXFFENk0yA5eJWixErl/HKYrkl5Yy6XY/mp1+MCoANLS2Nn/xbsf4xKWP1aSmYQFURcFmsWCTJOyCgJpOkyfLOO12Uhc+pOv7wZMzk/6bEsBqKLQSzc2df/tCz6nNqSk5HouhmCZWSUIVRXJME4dpUlRWRrr7Az4dH+/1jQ5/ByA8L6vt8OH2S11dn+c8fnxo449xzPAKdlGisNiNpb6BQHHJw/4ff+gL+CZ++l/jizyRJKH9laOv7q+rO+bKy6s2dF16srm1ODUTHHng890hm9Wev/83AKQ+gKOX5raoAAAAAElFTkSuQmCC";
var SPRITE_LAYER_ADD = "layer_add";
var SPRITE_COORDINATE_TRACKER = "coordinate-tracker";
var SPRITE_ICON_ZOOMSELECT = "icon_zoomselect";
var SPRITE_ICON_ERROR = "icon_error";
var SPRITE_SELECT = "select";
var SPRITE_ZOOM_IN = "zoom-in";
var SPRITE_ZOOM_IN_FIXED = "zoom-in-fixed";
var SPRITE_ZOOM_OUT_FIXED = "zoom-out-fixed";
var SPRITE_ZOOM_FULL = "zoom-full";
var SPRITE_MAPTIP = "maptip";
var SPRITE_PAN_WEST = "pan-west";
var SPRITE_PAN_EAST = "pan-east";
var SPRITE_PAN_NORTH = "pan-north";
var SPRITE_PAN_SOUTH = "pan-south";
var SPRITE_ABOUT = "about";
var SPRITE_HELP = "help";
var SPRITE_MEASURE = "measure";
var SPRITE_PRINT = "print";
/**
* @since 0.15
*/
var SPRITE_MAP_SWIPE = "comparison";
var SPRITE_OPTIONS = "options";
var SPRITE_SELECT_RADIUS = "select-radius";
var SPRITE_SELECT_POLYGON = "select-polygon";
var SPRITE_INITIAL_CENTER = "initial-center";
var SPRITE_SELECT_CLEAR = "select-clear";
var SPRITE_ICON_REFRESHMAP = "icon_refreshmap";
var SPRITE_VIEW_BACK = "view-back";
var SPRITE_VIEW_FORWARD = "view-forward";
var SPRITE_GEOLOCATION = "geolocation";
var SPRITE_BUFFER = "buffer";
var SPRITE_SELECT_FEATURES = "select-features";
var SPRITE_REDLINE = "redline";
var SPRITE_FEATURE_INFO = "feature-info";
var SPRITE_QUERY = "query";
var SPRITE_THEME = "theme";
var SPRITE_INVOKE_SCRIPT = "invoke-script";
var SPRITE_INVOKE_URL = "invoke-url";
var SPRITE_SELECT_CENTRE = "select-centre";
/**
* Default map marker icon 
* 
* source: https://www.iconfinder.com/paomedia
* used under CC-BY 3.0
* @since 0.13
*/
var MAP_MARKER_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEZUlEQVRYR8WWXUxbZRjHn/ecnlLaHqBkyIeAwIaTUuIH4GiB9Yxo5sZIZiLGJSYu8YY74wW7cIksLplxIXq5mF1o9Ga6GNTAFqKGImsLMrwYBYeOBWSUUeWjPf047fl4zWEhnrK2p6ebsbfP+///f+d53/fpi+B//iGt+XO9Vr0lUtyFELYDQpUgAUII/EDAJCvQP9Rfvx7X4pk1AG5upu5XGN4BjM8AECVpQjYxwCfxsG6w1uXisgHJCuCvo53lAgnfAYFbszGVAGaRJPVUXPMsq61XBfD3MPsQTrgBiKfVzJR1jOEeReJDJd+7/Zl0qgBrJ9pHANBxLeH/rsUTZcNuJwLA6fQZAda6O7sB4eFUYlHCEBOFHWuDjgQdQaTMQBidKhuZuJITwOorHW5CB46k1gKG9UgMQlwcMEjrEhASCVBeYMiDUlM+IEj+JhGwr3LY3aQZINDLmPkoHyQQSvo0PxsBlk98ThLE+c4bs3dl47G2Z2oQQQ6YKer0k7T5oSxESaVlQ55AKoi0W3C/h2nDWPAqRVFegJUQO8B45z5IZTbmsJ2rok0DJopKKou8dKJy1DOiCeD3l1/so/P0l5Siv8PRVZvr16p0hwoDELNHnr9XYjKVK3URXnz/wKj3vCaA+Zda+i0Gw0WlaDPCfdU4dvONTDdirqvl62KjoVe5ZpuLDzb8ON2vCWCGeeHNCrPxS6UozMe/qR+dfi0TwOLRQ0NGijqpXBMIx/qfdc0MagIYb7M11BQXzOsV14sX8UZVgCtHMzN8KrM/jh3Ly8fba6SOtOzWRYzhztaGg/HcTjpPu/W0h1DeTx/THNpnzjcpwxDA5dKWG33oHEjJ1xPQWnfHZYTg7aRt46JCQNikj7iWUv43ZBxEP9utl2otRX0PDRlJGscEXKAI5OUxJ5LI0C4J+CwQhFMZLmEMy1uhbx2e2Vc1zwFZMNFuraYp/Z1Sszn5XmU6BIpaIMbhjXC8tWtqdiYnAFnksjd9XFtEv6snU4/adMaCJMHidvAK45k7lYlX9c/IY28spkjdn5VFdNJZUGuCn40kwlH+gHPat/JIADtdaGs8U11Ef5Sv06nl7tTjgghLweCHjHf+PTWBagdkgzGmxmCUCperC+gn1Azl+grLbiUE7qkO9wKrtj4rgB2INuvpykL6M/OeOb83IMLzsBpi+5ze+U/VwuV61gDyXPA4bLfrLEX16VTyq2M5GFpcKTt48PWrV8XHCiCbjbc3HC8z0iMFefqU3kEuAesxttvp/u1aNuGaOrBr6Om0emoKLfa9Dw956CxtsxPt7luHsw3PCcDlaGwtMeb/UmwwJOUEojEcjMSfOzzlu/WfAuxMSIdtqM5SeJJAD46QIGG4uxX8wun1vaUlPKcOyKKfHLb9hTpioZymSYwB/OFwPCFydR3uhYxP8FRwWd+CvWKX3XoRAD14ZGB0lpn0XdD69Tl3YDfI5WiyS5IodU3OT+US/sgAuYYqdTlvweMIlz3+AXmLlDDLPM0mAAAAAElFTkSuQmCC";
//#endregion
//#region src/utils/asset.ts
function getAssetPath(url) {
	return url;
}
var mRoot = zoom_out_fixed_default.replace("/zoom-out-fixed.png", "/../../");
function getAssetRoot() {
	return mRoot;
}
function setAssetRoot(root) {
	mRoot = root;
}
//#endregion
//#region src/utils/never.ts
/**
* Asserts that this function should never be called. The common usage is to call this as the
* "else" case in a series of if/else blocks or the default case in a switch statement when
* testing cases of an enum or union type. This is a compile-time way to ensure that your code properly
* tests for all possible cases of a given enum or union type
*
* @param {never} value
*/
function assertNever(value) {
	throw new Error("Should never get here");
}
//#endregion
//#region src/utils/string.ts
/**
* Indicates if the given string ends with the given suffix
*
* @param {string} str
* @param {string} suffix
* @returns {boolean}
*/
function strEndsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
/**
* Indicates if the given string starts with the given string
* 
* @param {string} str 
* @param {string} word 
* @returns {boolean}
* @since 0.14
*/
function strStartsWith(str, word) {
	return str.lastIndexOf(word, 0) === 0;
}
/**
* Replaces all occurrences of the given string with the specified replacement in the target
* string
* 
* @param str 
* @param find 
* @param replace 
* @since 0.12
*/
function strReplaceAll(str, find, replace) {
	return str.split(find).join(replace);
}
/**
* Indicates if the given string is null or empty
*
* @param {(string | null | undefined)} str
* @returns {boolean}
*/
function strIsNullOrEmpty(str) {
	return null == str || "" === str;
}
/**
* Returns a trimmed version of the given string
* 
* @param str The string to trim
* @since 0.12.5
*/
function strTrim(str) {
	if (!String.prototype.trim) return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
	return str.trim();
}
/**
*
*
* @param {string} expr
* @param {string} delimBegin
* @param {string} delimEnd
* @returns
* @since 0.14
*/
function extractPlaceholderTokens(expr, delimBegin, delimEnd) {
	var _matches$map;
	const regex = new RegExp(`${delimBegin}(.*?)${delimEnd}`, "g");
	const matches = expr.match(regex);
	return (_matches$map = matches === null || matches === void 0 ? void 0 : matches.map((m) => m.replace(delimBegin, "").replace(delimEnd, ""))) !== null && _matches$map !== void 0 ? _matches$map : [];
}
/**
* Gets whether the given string is a resource identifier
* 
* @param str The string to test
* @since 0.14
*/
function isResourceId(str) {
	return strStartsWith(str, "Library://");
}
//#endregion
//#region src/utils/url.ts
init_objectSpread2();
/**
* Converts a URLSearchParams instance to a plain object. Handles repeated keys by
* converting them to arrays. Uses a single O(n) pass over entries.
*/
function urlSearchParamsToObject(usp) {
	const obj = {};
	for (const [key, value] of usp.entries()) {
		const existing = obj[key];
		if (existing === void 0) obj[key] = value;
		else if (Array.isArray(existing)) existing.push(value);
		else obj[key] = [existing, value];
	}
	return obj;
}
/**
* Returns the base URL to use for resolving relative URLs. Falls back to a
* localhost base when `window` is not available (e.g. in Node.js environments).
*/
function getUrlBase() {
	return typeof window !== "undefined" ? window.location.href : "http://localhost/";
}
/**
* Indicates if the given arrays are equal
*
* @param {(string[]|null)} a
* @param {(string[]|null)} b
* @returns {boolean}
*/
function arraysEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length != b.length) return false;
	for (let i = 0; i < a.length; ++i) if (a[i] !== b[i]) return false;
	return true;
}
/**
* Indicates if the given sets of parameterse are the same
*
* @param {*} params1
* @param {*} params2
* @returns {boolean}
*/
function areParamsEqual(params1, params2) {
	const keys1 = Object.keys(params1).filter((k) => k.toLowerCase() != "locale").sort();
	if (arraysEqual(keys1, Object.keys(params2).filter((k) => k.toLowerCase() != "locale").sort())) {
		for (const key of keys1) {
			const v1 = params1[key];
			const v2 = params2[key];
			if (Array.isArray(v1) || Array.isArray(v2)) {
				if (!arraysEqual(Array.isArray(v1) ? v1 : [v1], Array.isArray(v2) ? v2 : [v2])) return false;
			} else if (v1 != v2) return false;
		}
		return true;
	}
	return false;
}
/**
* Indicates if the given URLs are the same
*
* @param {string} url1
* @param {string} url2
* @returns {boolean}
*/
function areUrlsSame(url1, url2) {
	const base = getUrlBase();
	let parsed1;
	let parsed2;
	try {
		parsed1 = new URL(url1, base);
	} catch (_unused) {
		return false;
	}
	try {
		parsed2 = new URL(url2, base);
	} catch (_unused2) {
		return false;
	}
	const params1 = urlSearchParamsToObject(parsed1.searchParams);
	const params2 = urlSearchParamsToObject(parsed2.searchParams);
	return parsed1.protocol === parsed2.protocol && parsed1.username === parsed2.username && parsed1.password === parsed2.password && parsed1.host === parsed2.host && parsed1.hostname === parsed2.hostname && parsed1.port === parsed2.port && parsed1.pathname === parsed2.pathname && parsed1.hash === parsed2.hash && areParamsEqual(params1, params2);
}
/**
* Indicates if the given URI is a component URI
*
* @param {string} uri 
* @returns {boolean} 
*/
function isComponentUri(uri) {
	return uri.indexOf("component://") >= 0;
}
/**
* Parses the given component URI. If it not a valid component URI returns undefined
*
* @param {string} uri 
* @returns {(ParsedComponentUri | undefined)} 
*/
function parseComponentUri(uri) {
	if (isComponentUri(uri)) {
		const qi = uri.lastIndexOf("?");
		return {
			name: qi < 0 ? uri.substring(12) : uri.substring(12, qi),
			props: qi < 0 ? {} : urlSearchParamsToObject(new URLSearchParams(uri.substring(qi)))
		};
	}
}
/**
* Normalizes the given URL to ensure it has the baseline set of required parameters for invoking any server-side script that uses the MapGuide Web API
*
* @param {string} url The url to normalize
* @param {(string | undefined)} mapName The name of the current runtime map
* @param {(string | undefined)} session The current session id
* @param {string} [locale] An optional locale
* @param {boolean} [uppercase=true] If true, will uppercase all parameter names
* @param {IInvokeUrlCommandParameter[]} [extraParameters=[]] Any extra parameters to append to the URL
* @returns {string} 
*/
function ensureParameters(url, mapName, session, locale, uppercase = true, extraParameters = []) {
	if (isComponentUri(url)) return url;
	const parsed = parseUrl(url);
	const params = parsed.query != null ? _objectSpread2({}, parsed.query) : {};
	let bNeedMapName = true;
	let bNeedSession = true;
	let bNeedLocale = true;
	for (const key in params) switch (key.toLowerCase()) {
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
	if (bNeedMapName && !strIsNullOrEmpty(mapName)) if (uppercase) params.MAPNAME = mapName;
	else params.mapname = mapName;
	if (bNeedSession && !strIsNullOrEmpty(session)) if (uppercase) params.SESSION = session;
	else params.session = session;
	if (bNeedLocale) if (uppercase) params.LOCALE = locale;
	else params.locale = locale;
	for (const p of extraParameters) params[p.name] = p.value;
	return appendParameters(url, params, true, false);
}
/**
* Parses the given URL and separates out the query string parameters
*
* @param {string} url The URL to parse
* @returns {IParsedUrl}
* @since 0.12
*/
function parseUrl(url) {
	const qi = url.lastIndexOf("?");
	return {
		url: qi < 0 ? url : url.substring(0, qi),
		query: qi < 0 ? {} : urlSearchParamsToObject(new URLSearchParams(url.substring(qi)))
	};
}
/**
* Converts the given object to a query string fragment
*
* @param {*} parameters The object to stringify
* @returns {string} The query string fragment
*/
function stringifyQuery(parameters) {
	const usp = new URLSearchParams();
	for (const key of Object.keys(parameters)) {
		const value = parameters[key];
		if (Array.isArray(value)) value.forEach((v, i) => {
			usp.append(`${key}[${i}]`, String(v));
		});
		else if (value !== void 0 && value !== null) usp.set(key, String(value));
	}
	return usp.toString();
}
/**
* Appends the specified parameters to the given URL
*
* @param {string} url The URL to append parameters to
* @param {*} parameters The parameters to append
* @param {boolean} [bOverwriteExisting=true] If true, will overwrite any existing parameters if the URL already has them
* @param {boolean} [bConvertToUppercase=false] If true, will ensure all parameter names are uppercase
* @param {boolean} [bDiscardExistingParams=false] If true, will discard existing query string params before appending
* @since 0.12
* @since 0.15 - Ensured return type is a string
*/
function appendParameters(url, parameters, bOverwriteExisting = true, bConvertToUppercase = false, bDiscardExistingParams = false) {
	const parsed = new URL(url, getUrlBase());
	let currentParams;
	if (!bDiscardExistingParams) currentParams = urlSearchParamsToObject(parsed.searchParams);
	else currentParams = {};
	const paramNames = {};
	for (const key of Object.keys(currentParams)) paramNames[key.toUpperCase()] = key;
	for (const name of Object.keys(parameters)) {
		const key = paramNames[name.toUpperCase()] || name;
		if (key && currentParams[key] && !bOverwriteExisting) continue;
		currentParams[key] = parameters[name];
	}
	if (bConvertToUppercase) {
		let params2 = {};
		for (const name of Object.keys(currentParams)) params2[name.toUpperCase()] = currentParams[name];
		currentParams = params2;
	}
	const queryStr = stringifyQuery(currentParams);
	parsed.search = queryStr ? `?${queryStr}` : "";
	return parsed.toString();
}
/**
* Parses the query string section of the given URL and returns the parsed
* parameters as an object
* @param url The URL to parse
* @since 0.13
*/
function parseUrlParameters(url) {
	return urlSearchParamsToObject(new URL(url, getUrlBase()).searchParams);
}
//#endregion
//#region src/constants/actions.ts
/**
* All valid action types
* 
* @since 0.12
*/
var ActionType = /* @__PURE__ */ function(ActionType) {
	ActionType["SET_LOCALE"] = "MapGuide/SET_LOCALE";
	ActionType["INIT_APP"] = "MapGuide/INIT_APP";
	ActionType["INIT_ERROR"] = "MapGuide/INIT_ERROR";
	ActionType["INIT_ACKNOWLEDGE_WARNINGS"] = "MapGuide/INIT_ACKNOWLEDGE_WARNINGS";
	ActionType["LEGEND_SET_GROUP_VISIBILITY"] = "Legend/SET_GROUP_VISIBILITY";
	ActionType["LEGEND_SET_LAYER_VISIBILITY"] = "Legend/SET_LAYER_VISIBILITY";
	ActionType["LEGEND_SET_LAYER_SELECTABLE"] = "Legend/SET_LAYER_SELECTABLE";
	ActionType["LEGEND_SET_GROUP_EXPANDABLE"] = "Legend/SET_GROUP_EXPANDABLE";
	ActionType["MAP_SET_ACTIVE_MAP"] = "Map/SET_ACTIVE_MAP";
	ActionType["MAP_REFRESH"] = "Map/REFRESH";
	ActionType["MAP_SET_VIEW"] = "Map/SET_VIEW";
	ActionType["MAP_SET_SCALE"] = "Map/SET_SCALE";
	ActionType["MAP_SET_ACTIVE_TOOL"] = "Map/SET_ACTIVE_TOOL";
	ActionType["MAP_SET_MAPTIP"] = "Map/SET_MAPTIP";
	/**
	* @since 0.14.2
	*/
	ActionType["MAP_ENABLE_SELECT_DRAGPAN"] = "Map/ENABLE_SELECT_DRAGPAN";
	ActionType["MAP_SET_MANUAL_MAPTIP"] = "Map/MAP_SET_MANUAL_MAPTIP";
	ActionType["MAP_SET_SELECTION"] = "Map/SET_SELECTION";
	/**
	* @since 0.14
	*/
	ActionType["MAP_ADD_CLIENT_SELECTED_FEATURE"] = "Map/ADD_CLIENT_SELECTED_FEATURE";
	/**
	* @since 0.14
	*/
	ActionType["MAP_CLEAR_CLIENT_SELECTION"] = "Map/CLEAR_CLIENT_SELECTION";
	ActionType["MAP_SET_BUSY_COUNT"] = "Map/SET_BUSY_COUNT";
	ActionType["MAP_SET_BASE_LAYER"] = "Map/SET_BASE_LAYER";
	ActionType["MAP_ZOOM_IN"] = "Map/ZOOM_IN";
	ActionType["MAP_ZOOM_OUT"] = "Map/ZOOM_OUT";
	ActionType["MAP_PREVIOUS_VIEW"] = "Map/PREVIOUS_VIEW";
	ActionType["MAP_NEXT_VIEW"] = "Map/NEXT_VIEW";
	ActionType["MAP_SET_LAYER_TRANSPARENCY"] = "Map/SET_LAYER_TRANSPARENCY";
	ActionType["MAP_SET_VIEW_SIZE_UNITS"] = "Map/SET_VIEW_SIZE_UNITS";
	ActionType["MAP_SET_VIEW_ROTATION"] = "Map/SET_VIEW_ROTATION";
	ActionType["MAP_SET_VIEW_ROTATION_ENABLED"] = "Map/SET_VIEW_ROTATION_ENABLED";
	ActionType["MAP_RESIZED"] = "Map/RESIZED";
	ActionType["MAP_SHOW_SELECTED_FEATURE"] = "Map/SHOW_SELECTED_FEATURE";
	ActionType["TASK_INVOKE_URL"] = "TaskPane/INVOKE_URL";
	ActionType["TASK_PANE_HOME"] = "TaskPane/HOME";
	ActionType["TASK_PANE_FORWARD"] = "TaskPane/FORWARD";
	ActionType["TASK_PANE_BACK"] = "TaskPane/BACK";
	ActionType["TASK_PANE_PUSH_URL"] = "TaskPane/PUSH_URL";
	ActionType["FUSION_SET_ELEMENT_STATE"] = "Fusion/SET_ELEMENT_STATE";
	ActionType["FUSION_SET_TASK_PANE_VISIBILITY"] = "Fusion/SET_TASK_PANE_VISIBILITY";
	ActionType["FUSION_SET_LEGEND_VISIBILITY"] = "Fusion/SET_LEGEND_VISIBILITY";
	ActionType["FUSION_SET_SELECTION_PANEL_VISIBILITY"] = "Fusion/SET_SELECTION_PANEL_VISIBILITY";
	/**
	* @since 0.14.8
	*/
	ActionType["FUSION_SET_TEMPLATE_CUSTOM_DATA"] = "Fusion/SET_TEMPLATE_CUSTOM_DATA";
	ActionType["FLYOUT_OPEN"] = "Flyout/OPEN";
	ActionType["FLYOUT_CLOSE"] = "Flyout/CLOSE";
	ActionType["CONTEXT_MENU_OPEN"] = "ContextMenu/OPEN";
	ActionType["CONTEXT_MENU_CLOSE"] = "ContextMenu/CLOSE";
	ActionType["COMPONENT_OPEN"] = "Flyout/COMPONENT_OPEN";
	ActionType["COMPONENT_CLOSE"] = "Flyout/COMPONENT_CLOSE";
	ActionType["UPDATE_MOUSE_COORDINATES"] = "Status/UPDATE_MOUSE_COORDINATES";
	ActionType["MODAL_SHOW_COMPONENT"] = "Modal/SHOW_COMPONENT";
	ActionType["MODAL_SHOW_URL"] = "Modal/SHOW_URL";
	ActionType["MODAL_CLOSE"] = "Modal/CLOSE";
	/**
	* @since 0.14.8
	*/
	ActionType["MODAL_UPDATE"] = "Modal/UPDATE";
	/**
	* @since 0.13
	*/
	ActionType["LAYER_ADDED"] = "Map/LAYER_ADDED";
	/**
	* @since 0.14
	*/
	ActionType["EXTERNAL_LAYERS_READY"] = "Map/EXTERNAL_LAYERS_READY";
	/**
	* @since 0.13
	*/
	ActionType["REMOVE_LAYER"] = "Map/REMOVE_LAYER";
	/**
	* @since 0.13
	*/
	ActionType["SET_LAYER_INDEX"] = "Map/SET_LAYER_INDEX";
	/**
	* @since 0.13
	*/
	ActionType["SET_LAYER_OPACITY"] = "Map/SET_LAYER_OPACITY";
	/**
	* @since 0.13
	*/
	ActionType["SET_LAYER_VISIBILITY"] = "Map/SET_LAYER_VISIBILITY";
	/**
	* @since 0.13
	*/
	ActionType["SET_LAYER_VECTOR_STYLE"] = "Map/SET_LAYER_VECTOR_STYLE";
	/**
	* @since 0.13
	*/
	ActionType["ADD_LAYER_BUSY_WORKER"] = "Map/ADD_LAYER_BUSY_WORKER";
	/**
	* @since 0.13
	*/
	ActionType["REMOVE_LAYER_BUSY_WORKER"] = "Map/REMOVE_LAYER_BUSY_WORKER";
	/**
	* @since 0.14
	*/
	ActionType["SET_HEATMAP_LAYER_BLUR"] = "Map/SET_HEATMAP_LAYER_BLUR";
	/**
	* @since 0.14
	*/
	ActionType["SET_HEATMAP_LAYER_RADIUS"] = "Map/SET_HEATMAP_LAYER_RADIUS";
	/**
	* @since 0.14.8
	*/
	ActionType["SET_APP_SETTING"] = "MapGuide/SET_APP_SETTING";
	/**
	* @since 0.15
	*/
	ActionType["MAP_SET_COMPARISON_MODE"] = "Map/SET_COMPARISON_MODE";
	ActionType["MAP_SET_SWIPE_MODE"] = "Map/SET_COMPARISON_MODE";
	/**
	* @since 0.15
	*/
	ActionType["MAP_SET_SWIPE_POSITION"] = "Map/SET_SWIPE_POSITION";
	ActionType["MAP_UPDATE_SWIPE_POSITION"] = "Map/SET_SWIPE_POSITION";
	/**
	* @since 0.15
	*/
	ActionType["MAP_SET_SPY_CURSOR_RADIUS"] = "Map/SET_SPY_CURSOR_RADIUS";
	return ActionType;
}({});
//#endregion
//#region src/actions/modal.ts
var modal_exports = /* @__PURE__ */ __exportAll({
	hideModal: () => hideModal,
	showModalComponent: () => showModalComponent,
	showModalUrl: () => showModalUrl,
	updateModal: () => updateModal
});
init_objectSpread2();
/**
* Displays the specified component in a modal dialog
*
* @param {*} options Modal dialog display options
* @returns {IShowComponentInModalAction}
*/
function showModalComponent(options) {
	return {
		type: ActionType.MODAL_SHOW_COMPONENT,
		payload: _objectSpread2({}, options)
	};
}
/**
* Displays the specified URL in a modal dialog
*
* @param {*} options Modal dialog display options
* @returns {IShowModalUrlAction}
*/
function showModalUrl(options) {
	return {
		type: ActionType.MODAL_SHOW_URL,
		payload: _objectSpread2({}, options)
	};
}
/**
* Hides an open modal dialog
*
* @param name The name of the modal to hide
* @returns {ICloseModalAction}
*/
function hideModal(name) {
	return {
		type: ActionType.MODAL_CLOSE,
		payload: name
	};
}
/**
* Update settings of the given modal
* 
* @param name The name of the modal to update
* @param args 
* @since 0.14.8
*/
function updateModal(name, args) {
	return {
		type: ActionType.MODAL_UPDATE,
		payload: {
			name,
			args
		}
	};
}
//#endregion
//#region src/api/registry/command.ts
var FUSION_ICON_REGEX = /images\/icons\/[a-zA-Z\-]*.png/;
function fixIconPath(path) {
	if (FUSION_ICON_REGEX.test(path)) return `${getAssetRoot()}/${path}`.replace(/\/\//g, "/");
	return path;
}
function fusionFixSpriteClass(tb, cmd) {
	if (tb.spriteClass) return tb.spriteClass;
	if (cmd && cmd.iconClass) return cmd.iconClass;
}
/**
* @hidden
*/
function mergeInvokeUrlParameters(currentParameters, extraParameters) {
	const currentP = currentParameters.reduce((prev, current, i, arr) => {
		prev[current.name] = current.value;
		return prev;
	}, {});
	if (extraParameters) {
		const keys = Object.keys(extraParameters);
		for (const k of keys) currentP[k] = extraParameters[k];
	}
	const merged = [];
	const mkeys = Object.keys(currentP);
	for (const k of mkeys) merged.push({
		name: k,
		value: currentP[k]
	});
	return merged;
}
function fixChildItems(childItems, state, commandInvoker) {
	return childItems.map((tb) => mapToolbarReference(tb, state, commandInvoker)).filter((tb) => tb != null);
}
/**
* @hidden
*/
function mapToolbarReference(tb, state, commandInvoker) {
	if (tb.error) return {
		iconClass: SPRITE_ICON_ERROR,
		tooltip: tb.error,
		label: tr("ERROR"),
		selected: ALWAYS_FALSE,
		enabled: ALWAYS_FALSE,
		invoke: NOOP$1
	};
	else if (tb.componentName) return {
		icon: tb.icon,
		iconClass: fusionFixSpriteClass(tb),
		flyoutId: tb.flyoutId,
		tooltip: tb.tooltip,
		label: tb.label,
		componentName: tb.componentName,
		componentProps: tb.componentProps
	};
	else if (tb.isSeparator === true) return { isSeparator: true };
	else if (tb.command) {
		const cmd = getCommand(tb.command);
		if (cmd != null) return {
			icon: fixIconPath(tb.icon || cmd.icon),
			iconClass: fusionFixSpriteClass(tb, cmd),
			tooltip: tb.tooltip,
			label: tb.label,
			selected: () => cmd.selected(state),
			enabled: () => cmd.enabled(state, tb.parameters),
			invoke: () => commandInvoker(cmd, tb.parameters)
		};
	} else if (tb.children) {
		const childItems = tb.children;
		return {
			icon: fixIconPath(tb.icon),
			iconClass: fusionFixSpriteClass(tb),
			label: tb.label,
			tooltip: tb.tooltip,
			childItems: fixChildItems(childItems, state, commandInvoker)
		};
	} else if (tb.label && tb.flyoutId) return {
		icon: fixIconPath(tb.icon),
		iconClass: fusionFixSpriteClass(tb),
		label: tb.label,
		tooltip: tb.tooltip,
		flyoutId: tb.flyoutId
	};
	return null;
}
/**
* Helper function to reduce full application state to state relevant for toolbar items
* 
* @param state The full application state
* @since 0.13
*/
function reduceAppToToolbarState(state) {
	var _state$config$compari, _state$config$compari2, _state$config$compari3;
	let hasSelection = false;
	let hasClientSelection = false;
	let hasPreviousView = false;
	let hasNextView = false;
	let visibleWmsLayerCount = 0;
	const selection = getSelectionSet(state);
	hasSelection = selection != null && selection.SelectedFeatures != null;
	if (state.config.activeMapName) {
		var _state$mapState$state;
		hasClientSelection = state.mapState[state.config.activeMapName].clientSelection != null;
		hasPreviousView = state.mapState[state.config.activeMapName].historyIndex > 0;
		hasNextView = state.mapState[state.config.activeMapName].historyIndex < state.mapState[state.config.activeMapName].history.length - 1;
		visibleWmsLayerCount = ((_state$mapState$state = state.mapState[state.config.activeMapName].layers) !== null && _state$mapState$state !== void 0 ? _state$mapState$state : []).filter((l) => l.visible && l.selectable && l.type == "WMS").length;
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
		comparisonMode: (_state$config$compari = state.config.comparisonMode) !== null && _state$config$compari !== void 0 ? _state$config$compari : "none",
		swipeActive: state.config.swipeActive === true,
		comparisonPairs: (_state$config$compari2 = state.config.comparisonPairs) !== null && _state$config$compari2 !== void 0 ? _state$config$compari2 : [],
		mapSwipePairs: (_state$config$compari3 = state.config.comparisonPairs) !== null && _state$config$compari3 !== void 0 ? _state$config$compari3 : [],
		activeMapName: state.config.activeMapName
	};
}
/**
* Common command condition evaluators
*
*
* @class CommandConditions
*/
var CommandConditions = class {
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
		if (!state.hasSelection) return parameters != null && (parameters.DisableIfSelectionEmpty == "true" || parameters.DisableIfSelectionEmpty == true);
		else return false;
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
};
/**
* The set of default command names
*
*
* @class DefaultCommands
*/
var DefaultCommands = /* @__PURE__ */ function(DefaultCommands) {
	DefaultCommands["Select"] = "Select";
	DefaultCommands["Pan"] = "Pan";
	DefaultCommands["Zoom"] = "Zoom";
	DefaultCommands["MapTip"] = "MapTip";
	DefaultCommands["ZoomIn"] = "ZoomIn";
	DefaultCommands["ZoomOut"] = "ZoomOut";
	DefaultCommands["RestoreView"] = "RestoreView";
	DefaultCommands["ZoomExtents"] = "ZoomExtents";
	DefaultCommands["SelectRadius"] = "SelectRadius";
	DefaultCommands["SelectPolygon"] = "SelectPolygon";
	DefaultCommands["ClearSelection"] = "ClearSelection";
	DefaultCommands["ZoomToSelection"] = "ZoomToSelection";
	DefaultCommands["PanLeft"] = "PanLeft";
	DefaultCommands["PanRight"] = "PanRight";
	DefaultCommands["PanUp"] = "PanUp";
	DefaultCommands["PanDown"] = "PanDown";
	DefaultCommands["RefreshMap"] = "RefreshMap";
	DefaultCommands["PreviousView"] = "PreviousView";
	DefaultCommands["NextView"] = "NextView";
	DefaultCommands["About"] = "About";
	DefaultCommands["Help"] = "Help";
	DefaultCommands["Measure"] = "Measure";
	DefaultCommands["ViewerOptions"] = "ViewerOptions";
	DefaultCommands["Buffer"] = "Buffer";
	DefaultCommands["SelectWithin"] = "SelectWithin";
	DefaultCommands["QuickPlot"] = "QuickPlot";
	DefaultCommands["Redline"] = "Redline";
	DefaultCommands["FeatureInfo"] = "FeatureInfo";
	DefaultCommands["Theme"] = "Theme";
	DefaultCommands["Query"] = "Query";
	DefaultCommands["Geolocation"] = "Geolocation";
	DefaultCommands["CoordinateTracker"] = "CoordinateTracker";
	/**
	* @since 0.11
	*/
	DefaultCommands["AddManageLayers"] = "AddManageLayers";
	/**
	* @since 0.11
	*/
	DefaultCommands["CenterSelection"] = "CenterSelection";
	/**
	* @since 0.14
	*/
	DefaultCommands["Print"] = "Print";
	/**
	* @since 0.15
	*/
	DefaultCommands["MapSwipe"] = "MapSwipe";
	return DefaultCommands;
}({});
var commands = {};
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
		case "CenterSelection": return false;
	}
	return true;
}
/**
* Opens the given URL in the specified target
*
* @hidden
* @param name
* @param cmdDef
* @param dispatch
* @param url
*/
function openUrlInTarget(name, cmdDef, hasTaskPane, dispatch, url, modalTitle) {
	const target = cmdDef.target;
	if (target == "TaskPane") if (!hasTaskPane) openModalUrl(name, dispatch, url, modalTitle);
	else dispatch({
		type: ActionType.TASK_INVOKE_URL,
		payload: { url }
	});
	else if (target == "NewWindow") openModalUrl(name, dispatch, url, modalTitle);
	else if (target == "SpecifiedFrame") if (cmdDef.targetFrame) {
		const frames = window.frames;
		let bInvoked = false;
		for (let i = 0; i < frames.length; i++) if (frames[i].name == cmdDef.targetFrame) {
			frames[i].location = url;
			bInvoked = true;
			break;
		}
		if (!bInvoked) error(`Frame not found: ${cmdDef.targetFrame}`);
	} else error(`Command ${name} has a target of "SpecifiedFrame", but does not specify a target frame`);
	else assertNever(target);
}
/**
* Registers a viewer command
*
*
* @param {string} name
* @param {(ICommand | IInvokeUrlCommand | ISearchCommand)} cmdDef
*/
function registerCommand(name, cmdDef) {
	let cmd;
	if (isInvokeUrlCommand(cmdDef)) cmd = {
		icon: cmdDef.icon,
		iconClass: cmdDef.iconClass,
		title: cmdDef.title,
		enabled: (state) => {
			if (cmdDef.disableIfSelectionEmpty === true) return CommandConditions.hasSelection(state);
			return true;
		},
		selected: () => false,
		invoke: (dispatch, getState, viewer, parameters) => {
			const state = getState();
			const config = state.config;
			const map = getRuntimeMap(state);
			const params = mergeInvokeUrlParameters(cmdDef.parameters, parameters);
			const url = ensureParameters(cmdDef.url, map === null || map === void 0 ? void 0 : map.Name, map === null || map === void 0 ? void 0 : map.SessionId, config.locale, true, params);
			openUrlInTarget(name, cmdDef, config.capabilities.hasTaskPane, dispatch, url, cmd.title);
		}
	};
	else if (isSearchCommand$1(cmdDef)) cmd = {
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
	else cmd = cmdDef;
	commands[name] = cmd;
}
/**
* Gets a registered viewer command by its name
*
*
* @param {string} name
* @returns {(ICommand | undefined)}
*/
function getCommand(name) {
	return commands[name];
}
//#endregion
//#region src/utils/type-guards.ts
/**
* Indicates if the given argument is an IModalDisplayOptions
*
* @param {*} arg
* @returns {arg is IModalDisplayOptions}
*/
function isModalDisplayOptions(arg) {
	return typeof (arg === null || arg === void 0 ? void 0 : arg.url) != "undefined";
}
/**
* Indicates if the given argument is an IModalComponentDisplayOptions
*
*
* @param {*} arg
* @returns {arg is IModalComponentDisplayOptions}
*/
function isModalComponentDisplayOptions(arg) {
	return typeof arg.component != "undefined";
}
/**
* Indicates if the given argument is an Error object
*
*
* @param {*} err
* @returns {err is Error}
*/
function isError(err) {
	return err instanceof Error;
}
/**
* Indicates if the given argument is an InitError object
*
*
* @param {*} item
* @returns {item is InitError}
*/
function isInitError(item) {
	return typeof item.message != "undefined" && true;
}
/**
* Indicates if the given arguemnt has the shape of an IFlyoutMenu
*
*
* @param {*} item
* @returns {item is IFlyoutMenu}
*/
function isMenuRef(item) {
	return typeof item.flyoutId != "undefined";
}
/**
* Indicates if the given argument has the shape of an IComponentFlyoutItem
*
*
* @param {*} item
* @returns {item is IComponentFlyoutItem}
*/
function isComponentFlyout(item) {
	return typeof item.componentName != "undefined";
}
/**
* Indicates if the given argument has the shape of an IInlineMenu
*
*
* @param {*} item
* @returns {item is IInlineMenu}
*/
function isMenu(item) {
	return typeof item.childItems != "undefined";
}
/**
* Indicates if the given argument is a MapLayer object
*
*
* @param {*} layer
* @returns {layer is MapLayer}
*/
function isLayer(layer) {
	return layer.LayerDefinition !== void 0;
}
/**
* Indicates if the given argument has the shape of an IMapView
*
*
* @param {*} view
* @returns {view is IMapView}
*/
function isMapView(view) {
	return typeof view.x == "number" && typeof view.y == "number" && typeof view.scale == "number";
}
/**
* Indicates if the given argument is a coordinate pair
*
* @param {*} coord
* @returns {coord is [number, number]}
*/
function isCoordinate(coord) {
	return coord instanceof Array && coord.length == 2 && typeof coord[0] == "number" && typeof coord[1] == "number";
}
/**
* Indicates if the given argument has the shape of a ViewerAction
*
*
* @param {*} action
* @returns {action is ViewerAction}
*/
function isAction(action) {
	return typeof action.type != "undefined" && typeof action.payload != "undefined";
}
/**
* Indicates if the given argument is a RuntimeMap
* 
* @param arg 
* @returns 
* @since 0.14
*/
function isRuntimeMap(arg) {
	return arg.Extents != null && arg.BackgroundColor != null && arg.CoordinateSystem != null && arg.MapDefinition != null && arg.DisplayDpi != null;
}
//#endregion
//#region src/components/elements/providers/minimal/text.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* @hidden
* @since 0.15
*/
var MnText = ({ component, className, style, children }) => {
	const cls = ["mrl-text", className].filter(Boolean).join(" ");
	switch (component !== null && component !== void 0 ? component : "span") {
		case "p": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cls,
			style,
			children
		});
		case "div": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cls,
			style,
			children
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cls,
			style,
			children
		});
	}
};
//#endregion
//#region src/components/elements/providers/minimal/heading.tsx
/**
* @hidden
* @since 0.15
*/
var MnHeading = ({ level, style, className, children }) => {
	const cls = [
		"mrl-heading",
		`mrl-heading--h${level}`,
		className
	].filter(Boolean).join(" ");
	switch (level) {
		case 1: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: cls,
			style,
			children
		});
		case 2: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: cls,
			style,
			children
		});
		case 3: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: cls,
			style,
			children
		});
		case 4: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
			className: cls,
			style,
			children
		});
		case 5: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
			className: cls,
			style,
			children
		});
		case 6: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
			className: cls,
			style,
			children
		});
		default:
			assertNever(level);
			return null;
	}
};
//#endregion
//#region src/components/elements/providers/minimal/icon-map.ts
/**
* Returns the incoming Blueprint icon name for SVG lookup.
*
* @hidden
* @since 0.15
*/
function getSvgIconName(blueprintName) {
	return blueprintName;
}
//#endregion
//#region src/components/elements/providers/minimal/svg-icons.tsx
/**
* All icon path data, keyed by a logical name.
* SVG paths are replicated from our Blueprint icon path subset.
* @hidden
* @since 0.15
*/
function toInlineSvgIcon(paths) {
	return paths.map((d) => ["path", { d }]);
}
function buildSvgIconRegistry(pathMap) {
	return Object.fromEntries(Object.entries(pathMap).map(([name, paths]) => [name, toInlineSvgIcon(paths)]));
}
var BP_ICONS_20 = {
	"arrow-left": ["M18 9H4.41L8.7 4.71c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71l-6 6c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l6 6a1.003 1.003 0 001.42-1.42L4.41 11H18c.55 0 1-.45 1-1s-.45-1-1-1z"],
	"arrow-right": ["M18.71 9.29l-6-6a1.003 1.003 0 00-1.42 1.42L15.59 9H2c-.55 0-1 .45-1 1s.45 1 1 1h13.59l-4.29 4.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l6-6c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71z"],
	"arrows-horizontal": ["M19.7 9.3l-5-5c-.2-.2-.4-.3-.7-.3-.6 0-1 .4-1 1 0 .3.1.5.3.7L16.6 9H3.4l3.3-3.3c.2-.2.3-.4.3-.7 0-.6-.4-1-1-1-.3 0-.5.1-.7.3l-5 5c-.2.2-.3.4-.3.7s.1.5.3.7l5 5c.2.2.4.3.7.3.6 0 1-.4 1-1 0-.3-.1-.5-.3-.7L3.4 11h13.2l-3.3 3.3c-.2.2-.3.4-.3.7 0 .6.4 1 1 1 .3 0 .5-.1.7-.3l5-5c.2-.2.3-.4.3-.7s-.1-.5-.3-.7z"],
	"application": ["M3.5 9h9c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-9c-.28 0-.5.22-.5.5s.22.5.5.5zm0 2h5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-5c-.28 0-.5.22-.5.5s.22.5.5.5zM19 1H1c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm-1 16H2V6h16v11zM3.5 13h7c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-7c-.28 0-.5.22-.5.5s.22.5.5.5z"],
	"caret-down": ["M16 7c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1 0 .24.1.46.24.63l-.01.01 5 6 .01-.01c.19.22.45.37.76.37s.57-.15.76-.37l.01.01 5-6-.01-.01c.14-.17.24-.39.24-.63z"],
	"caret-up": ["M15.76 12.37l.01-.01-5-6-.01.01C10.57 6.15 10.31 6 10 6s-.57.15-.76.37l-.01-.01-5 6 .01.01c-.14.17-.24.39-.24.63 0 .55.45 1 1 1h10c.55 0 1-.45 1-1 0-.24-.1-.46-.24-.63z"],
	"chevron-down": ["M16 6c-.28 0-.53.11-.71.29L10 11.59l-5.29-5.3a1.003 1.003 0 00-1.42 1.42l6 6c.18.18.43.29.71.29s.53-.11.71-.29l6-6A1.003 1.003 0 0016 6z"],
	"chevron-left": ["M8.41 10l5.29-5.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71l-6 6c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l6 6a1.003 1.003 0 001.42-1.42L8.41 10z"],
	"chevron-right": ["M13.71 9.29l-6-6a1.003 1.003 0 00-1.42 1.42l5.3 5.29-5.29 5.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l6-6c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71z"],
	"chevron-up": ["M16.71 12.29l-6-6C10.53 6.11 10.28 6 10 6s-.53.11-.71.29l-6 6a1.003 1.003 0 001.42 1.42L10 8.41l5.29 5.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71z"],
	"cross": ["M11.41 10l4.29-4.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L10 8.59l-4.29-4.3a1.003 1.003 0 00-1.42 1.42L8.59 10 4.3 14.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l4.29-4.3 4.29 4.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L11.41 10z"],
	"cog": ["M19 8h-2.31c-.14-.46-.33-.89-.56-1.3l1.7-1.7a.996.996 0 000-1.41l-1.41-1.41a.996.996 0 00-1.41 0l-1.7 1.7c-.41-.22-.84-.41-1.3-.55V1c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v2.33c-.48.14-.94.34-1.37.58L5 2.28a.972.972 0 00-1.36 0L2.28 3.64c-.37.38-.37.99 0 1.36L3.9 6.62c-.24.44-.44.89-.59 1.38H1c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2.31c.14.46.33.89.56 1.3L2.17 15a.996.996 0 000 1.41l1.41 1.41c.39.39 1.02.39 1.41 0l1.7-1.7c.41.22.84.41 1.3.55V19c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.33c.48-.14.94-.35 1.37-.59L15 17.72c.37.37.98.37 1.36 0l1.36-1.36c.37-.37.37-.98 0-1.36l-1.62-1.62c.24-.43.45-.89.6-1.38H19c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-9 6c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"],
	"comment": ["M19 1H1c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3v4a1.003 1.003 0 001.71.71l4.7-4.71H19c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zM4 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"],
	"comparison": ["M6 8H1c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm13-6h-5c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 3h-5V3h5v2zM6 14H1c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1zM6 2H1c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm4-2c-.55 0-1 .45-1 1v18c0 .55.45 1 1 1s1-.45 1-1V1c0-.55-.45-1-1-1zm9 14h-5c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1zm0 3h-5v-2h5v2zm0-9h-5c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm0 3h-5V9h5v2z"],
	"delete": ["M15 6a1.003 1.003 0 00-1.71-.71L10 8.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L8.59 10 5.3 13.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l3.29-3.3 3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L11.41 10l3.29-3.29c.19-.18.3-.43.3-.71zm-5-6C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"],
	"disable": ["M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM2 10c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L3.69 14.9A7.902 7.902 0 012 10zm8 8c-1.85 0-3.55-.63-4.9-1.69L16.31 5.1A7.902 7.902 0 0118 10c0 4.42-3.58 8-8 8z"],
	"double-caret-vertical": ["M5 9h10c.55 0 1-.45 1-1 0-.24-.1-.46-.24-.63l.01-.01-5-6-.01.01C10.57 1.15 10.31 1 10 1s-.57.15-.76.37l-.01-.01-5 6 .01.01C4.1 7.54 4 7.76 4 8c0 .55.45 1 1 1zm10 2H5c-.55 0-1 .45-1 1 0 .24.1.46.24.63l-.01.01 5 6 .01-.01c.19.22.45.37.76.37s.57-.15.76-.37l.01.01 5-6-.01-.01c.14-.17.24-.39.24-.63 0-.55-.45-1-1-1z"],
	"edit": ["M4.59 12.59l2.83 2.83 7.65-7.65-2.83-2.83-7.65 7.65zM2 18l4.41-1.59-2.81-2.79L2 18zM16 2c-.55 0-1.05.22-1.41.59l-1.65 1.65 2.83 2.83 1.65-1.65A2.006 2.006 0 0016 2z"],
	"error": ["M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 16H9v-2h2v2zm0-3H9V4h2v9z"],
	"folder-close": ["M0 17c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V7H0v10zM19 4H9.41l-1.7-1.71A.997.997 0 007 2H1c-.55 0-1 .45-1 1v3h20V5c0-.55-.45-1-1-1z"],
	"geosearch": ["M8 18.88c-3.79 0-6.88-3.09-6.88-6.88 0-.61.08-1.22.23-1.79.03.01.06-.01.1-.01h.09v.55c0 .23.21.42.44.42.04 0 .09-.01.12-.02l.9.88c.09.09.23.09.32 0s.09-.23 0-.32l-.86-.9c0-.02.05-.04.05-.07v-.13c0-.18.1-.25.29-.41h.53c.1 0 .19-.01.27-.05.01-.01.02 0 .03-.01.02-.01.03-.02.05-.04.01-.01.02-.01.02-.02l.02-.02 1.13-1.13c-.16-.32-.3-.65-.42-.99h-.64v-.53c0-.01.06.06.06-.1h.38c-.04-.16-.08-.32-.1-.48h-.71c.2-.16.42-.31.64-.45C4.02 6.09 4 5.8 4 5.5c0-.14.01-.28.02-.43C1.62 6.46 0 9.04 0 12c0 4.41 3.59 8 8 8 3.87 0 7.09-2.77 7.82-6.44l-.97-1.1c-.26 3.57-3.23 6.42-6.85 6.42zm-2.12-3.67v-.35h.15c.29 0 .49-.23.49-.53v-.68c0-.01.01-.01 0-.02L4.71 11.8h-.77c-.29 0-.47.24-.47.53v2c0 .29.18.53.47.53h.33v2.02c0 .28.28.51.56.51s.56-.23.56-.51v-1.22h-.01c.29 0 .5-.16.5-.45zm13.83-2.92l-3.68-3.68c.14-.21.27-.42.38-.65.02-.04.04-.07.05-.11.11-.22.2-.45.28-.69v-.01c.07-.24.13-.48.17-.73l.03-.17c.04-.24.06-.49.06-.75C17 2.46 14.54 0 11.5 0S6 2.46 6 5.5 8.46 11 11.5 11c.26 0 .51-.02.76-.06l.17-.03c.25-.04.49-.1.73-.17h.01c.24-.08.47-.17.69-.28.04-.02.07-.04.11-.05.23-.11.44-.24.65-.38l3.68 3.68c.17.18.42.29.7.29a1.003 1.003 0 00.71-1.71zM11.5 9.5c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm1.93 5.33v-.65c0-.11-.13-.21-.24-.21-.11 0-.24.09-.24.21v.65c0 .11.13.21.24.21.11 0 .24-.1.24-.21zm-2.41.67h.83c.29 0 .46-.21.46-.5v-1.86l.23-.22c-.34.05-.69.08-1.04.08-.36 0-.7-.03-1.05-.08.03.05.06.1.08.16V15c.01.29.2.5.49.5z"],
	"hand": ["M17 5c-.42 0-.79.27-.93.64L14.38 10h-.77l1.34-6.67c.03-.1.05-.21.05-.33a.998.998 0 00-1.98-.19h-.01L11.57 10H11V1c0-.55-.45-1-1-1S9 .45 9 1v9h-.2L6.97 2.76a.997.997 0 00-1.73-.41l-.03.03c-.01.02-.02.03-.03.04-.01.02-.01.03-.02.04v.01c-.01.01-.02.02-.02.03v.01c-.02.01-.02.02-.03.03 0 0 0 .01-.01.01 0 .01 0 .02-.01.03 0 0 0 .01-.01.01 0 .01-.01.02-.01.03 0 0 0 .01-.01.01 0 .01-.01.02-.01.03 0 .01 0 .01-.01.02 0 .01-.01.02-.01.03 0 .01 0 .01-.01.02 0 .01-.01.02-.01.03v.02c0 .01 0 .02-.01.03V3c0 .05 0 .09.01.14l1.45 10.25L6 12.7v.01L3.84 9.45h-.01A.98.98 0 003 9c-.55 0-1 .45-1 1 0 .2.06.39.17.55L6 18.44C7.06 19.4 8.46 20 10 20c3.31 0 6-2.69 6-6v-1.84l.01-.03v-.06l1.94-5.75A1.003 1.003 0 0017 5z"],
	"home": ["M2 12v7c0 .55.45 1 1 1h5v-7h4v7h5c.55 0 1-.45 1-1v-7l-8-8-8 8zm17.71-2.71L17 6.59V3c0-.55-.45-1-1-1s-1 .45-1 1v1.59L10.71.3C10.53.11 10.28 0 10 0s-.53.11-.71.29l-9 9a1.003 1.003 0 001.42 1.42L10 2.41l8.29 8.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71z"],
	"info-sign": ["M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM9 4h2v2H9V4zm4 12H7v-1h2V8H8V7h3v8h2v1z"],
	"issue": ["M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm1-2H9v-2h2v2zm0-3H9V4h2v9z"],
	"layer": ["M19.5 9.1l-9-5c-.2-.1-.3-.1-.5-.1s-.3 0-.5.1l-9 5c-.3.2-.5.5-.5.9s.2.7.5.9l9 5c.2.1.3.1.5.1s.3 0 .5-.1l9-5c.3-.2.5-.5.5-.9s-.2-.7-.5-.9z"],
	"layers": [
		"M.5 6.9l9 5c.2.1.3.1.5.1s.3 0 .5-.1l9-5c.3-.2.5-.5.5-.9s-.2-.7-.5-.9l-9-5c-.2-.1-.3-.1-.5-.1s-.3 0-.5.1l-9 5c-.3.2-.5.5-.5.9s.2.7.5.9z",
		"M19 9c-.2 0-.3 0-.5.1L10 13.9 1.5 9.1C1.3 9 1.2 9 1 9c-.6 0-1 .4-1 1 0 .4.2.7.5.9l9 5c.2.1.3.1.5.1s.3 0 .5-.1l9-5c.3-.2.5-.5.5-.9 0-.6-.4-1-1-1z",
		"M19 13c-.2 0-.3 0-.5.1L10 17.9l-8.5-4.7c-.2-.2-.3-.2-.5-.2-.6 0-1 .4-1 1 0 .4.2.7.5.9l9 5c.2.1.3.1.5.1s.3 0 .5-.1l9-5c.3-.2.5-.5.5-.9 0-.6-.4-1-1-1z"
	],
	"map": ["M19.54 4.18l.01-.02-6-4-.01.02C13.39.08 13.21 0 13 0s-.39.08-.54.18l-.01-.02L7 3.8 1.55.17l-.01.01A.969.969 0 001 0C.45 0 0 .45 0 1v14c0 .35.19.64.46.82l-.01.02 6 4 .01-.02c.15.1.33.18.54.18s.39-.08.54-.18l.01.02L13 16.2l5.45 3.63.01-.02c.15.11.33.19.54.19.55 0 1-.45 1-1V5c0-.35-.19-.64-.46-.82zM6 17.13l-4-2.67V2.87l4 2.67v11.59zm6-2.67l-4 2.67V5.54l4-2.67v11.59zm6 2.67l-4-2.67V2.87l4 2.67v11.59z"],
	"media": ["M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"],
	"menu-closed": ["M8 6h11c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zM4 6c-.28 0-.53.11-.71.29l-3 3C.11 9.47 0 9.72 0 10c0 .28.11.53.29.71l3 3A1.003 1.003 0 005 13V7c0-.55-.45-1-1-1zm15 8H8c-.55 0-1 .45-1 1s.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1zm0-5H8c-.55 0-1 .45-1 1s.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1z"],
	"menu-open": ["M12 9H1c-.55 0-1 .45-1 1s.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1zm0 5H1c-.55 0-1 .45-1 1s.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1zm0-10H1c-.55 0-1 .45-1 1s.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1zm7.71 5.29l-3-3A1.003 1.003 0 0015 7v6a1.003 1.003 0 001.71.71l3-3c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71z"],
	"minus": ["M16 9H4c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"],
	"multi-select": ["M19 3H7c-.55 0-1 .45-1 1v1h12v6h1c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zm-6 6H1c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm-1 6H2v-4h10v4zm4-9H4c-.55 0-1 .45-1 1v1h12v6h1c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1z"],
	"new-layer": ["M11.513 2.663A2 2 0 0013 6h1v1a2 2 0 104 0v-.733l1.5.833c.3.2.5.5.5.9s-.2.7-.5.9l-9 5c-.2.1-.3.1-.5.1s-.3 0-.5-.1l-9-5C.2 8.7 0 8.4 0 8s.2-.7.5-.9l9-5c.2-.1.3-.1.5-.1s.3 0 .5.1l1.013.563zM17 3h2a1 1 0 010 2h-2v2a1 1 0 01-2 0V5h-2a1 1 0 010-2h2V1a1 1 0 012 0v2z"],
	"path-search": ["M4 7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm15 11.69l-5-2.5v-3.63c-.32.11-.66.22-1 .29v3.32l-6 2.57v-7.25c-.36-.27-.69-.57-1-.9v8.1l-5-2.5V10c.55 0 1-.45 1-1s-.45-1-1-1V1.31l3.43 1.71c.11-.31.24-.62.39-.92L.72.05A.545.545 0 00.5 0C.22 0 0 .22 0 .5v16c0 .2.12.36.28.44l6 3c.07.04.14.06.22.06.07 0 .14-.01.2-.04l6.79-2.91 5.79 2.9c.07.03.14.05.22.05.28 0 .5-.22.5-.5v-4.21c-.31.13-.64.21-1 .21v3.19zM10 5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm3-1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6.72-.94l-1.43-.72c.2.43.36.89.48 1.36l.23.11V5.5c-.55 0-1 .45-1 1s.45 1 1 1v1.96l1 1V3.5c0-.2-.12-.36-.28-.44zm-3.69 5.56c.14-.21.27-.42.38-.65.02-.04.04-.07.05-.11.11-.22.2-.45.28-.69v-.01c.07-.24.13-.48.17-.73l.03-.17c.04-.25.06-.5.06-.76C17 2.46 14.54 0 11.5 0S6 2.46 6 5.5 8.46 11 11.5 11c.26 0 .51-.02.76-.06l.17-.03c.25-.04.49-.1.73-.17h.01c.24-.08.47-.17.69-.28.04-.02.07-.03.11-.05.23-.11.44-.24.65-.38l.18.18 3.5 3.5c.17.18.42.29.7.29a1.003 1.003 0 00.71-1.71l-3.68-3.67zm-4.53.88c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"],
	"play": ["M16 10c0-.36-.2-.67-.49-.84l.01-.01-10-6-.01.01A.991.991 0 005 3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1 .19 0 .36-.07.51-.16l.01.01 10-6-.01-.01c.29-.17.49-.48.49-.84z"],
	"plus": ["M16 9h-5V4c0-.55-.45-1-1-1s-1 .45-1 1v5H4c-.55 0-1 .45-1 1s.45 1 1 1h5v5c0 .55.45 1 1 1s1-.45 1-1v-5h5c.55 0 1-.45 1-1s-.45-1-1-1z"],
	"print": ["M14 16H6v-4H4v5c0 .55.45 1 1 1h10c.55 0 1-.45 1-1v-5h-2v4zm2-13c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v1h12V3zm3 2H1c-.55 0-1 .45-1 1v7c0 .55.45 1 1 1h2v-3h14v3h2c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-1 4h-2V7h2v2z"],
	"properties": ["M2 15c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm5-4h12c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1zM2 1C.9 1 0 1.9 0 3s.9 2 2 2 2-.9 2-2-.9-2-2-2zm17 8H7c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1zm0 7H7c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"],
	"select": ["M19.71 18.29l-4.25-4.25L20 12.91 9.93 9.33c.04-.1.07-.21.07-.33V3c0-.55-.45-1-1-1H4V1c0-.55-.45-1-1-1S2 .45 2 1v1H1c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 .55.45 1 1 1h6c.12 0 .23-.03.34-.07L12.91 20l1.14-4.54 4.25 4.25c.17.18.42.29.7.29a1.003 1.003 0 00.71-1.71zM8 8H4V4h4v4z"],
	"search": ["M19.56 17.44l-4.94-4.94A8.004 8.004 0 0016 8c0-4.42-3.58-8-8-8S0 3.58 0 8s3.58 8 8 8c1.67 0 3.21-.51 4.5-1.38l4.94 4.94a1.498 1.498 0 102.12-2.12zM8 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"],
	"small-cross": ["M11.41 10l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L10 8.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L8.59 10 5.3 13.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71l3.29-3.3 3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L11.41 10z"],
	"stop": ["M16 3H4c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z"],
	"tag": ["M2 4a2 2 0 012-2h4.588a2 2 0 011.414.586l7.41 7.41a2 2 0 010 2.828l-4.588 4.588a2 2 0 01-2.829 0l-7.41-7.41A2 2 0 012 8.588V4zm3.489-.006a1.495 1.495 0 100 2.99 1.495 1.495 0 000-2.99z"],
	"th": ["M19 1H1c-.6 0-1 .5-1 1v16c0 .5.4 1 1 1h18c.5 0 1-.5 1-1V2c0-.5-.5-1-1-1zM7 17H2v-3h5v3zm0-4H2v-3h5v3zm0-4H2V6h5v3zm11 8H8v-3h10v3zm0-4H8v-3h10v3zm0-4H8V6h10v3z"],
	"tick": ["M17 4c-.28 0-.53.11-.71.29L7 13.59 3.71 10.3A.965.965 0 003 10a1.003 1.003 0 00-.71 1.71l4 4c.18.18.43.29.71.29s.53-.11.71-.29l10-10A1.003 1.003 0 0017 4z"],
	"trash": ["M17 1h-5c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1H3c-.55 0-1 .45-1 1v1h16V2c0-.55-.45-1-1-1zm.5 3h-15c-.28 0-.5.22-.5.5s.22.5.5.5H3v14c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5h.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5zM7 16c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v8zm4 0c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v8zm4 0c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v8z"],
	"upload": ["M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm4 10c-.28 0-.53-.11-.71-.29L11 7.41V15c0 .55-.45 1-1 1s-1-.45-1-1V7.41l-2.29 2.3a1.003 1.003 0 01-1.42-1.42l4-4c.18-.18.43-.29.71-.29s.53.11.71.29l4 4A1.003 1.003 0 0114 10z"],
	"warning-sign": ["M19.86 17.52l.01-.01-9-16-.01.01C10.69 1.21 10.37 1 10 1s-.69.21-.86.52l-.01-.01-9 16 .01.01c-.08.14-.14.3-.14.48 0 .55.45 1 1 1h18c.55 0 1-.45 1-1 0-.18-.06-.34-.14-.48zM11 17H9v-2h2v2zm0-3H9V6h2v8z"],
	"zoom-to-fit": ["M1 7c.55 0 1-.45 1-1V2h4c.55 0 1-.45 1-1s-.45-1-1-1H1C.45 0 0 .45 0 1v5c0 .55.45 1 1 1zm5 1a1.003 1.003 0 00-1.71-.71l-2 2c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2 2a1.003 1.003 0 001.42-1.42L4.41 10 5.7 8.71c.19-.18.3-.43.3-.71zm2-2c.28 0 .53-.11.71-.29L10 4.41l1.29 1.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71l-2-2C10.53 2.11 10.28 2 10 2s-.53.11-.71.29l-2 2A1.003 1.003 0 008 6zM6 18H2v-4c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55.45 1 1 1h5c.55 0 1-.45 1-1s-.45-1-1-1zm8-6a1.003 1.003 0 001.71.71l2-2c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71l-2-2a1.003 1.003 0 00-1.42 1.42l1.3 1.29-1.29 1.29c-.19.18-.3.43-.3.71zm5-12h-5c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1V1c0-.55-.45-1-1-1zm-7 14c-.28 0-.53.11-.71.29L10 15.59 8.71 14.3A.965.965 0 008 14a1.003 1.003 0 00-.71 1.71l2 2c.18.18.43.29.71.29s.53-.11.71-.29l2-2A1.003 1.003 0 0012 14zm7-1c-.55 0-1 .45-1 1v4h-4c-.55 0-1 .45-1 1s.45 1 1 1h5c.55 0 1-.45 1-1v-5c0-.55-.45-1-1-1z"]
};
buildSvgIconRegistry(BP_ICONS_20);
function getBlueprintIconPaths(name) {
	const paths = BP_ICONS_20[name];
	if (!paths) return null;
	return {
		paths,
		viewBoxSize: 20
	};
}
/**
* Renders an inline SVG icon from the SVG_ICONS registry.
*
* @since 0.15
* @hidden
*/
var SvgIcon = ({ name, size = 16, style }) => {
	const iconData = getBlueprintIconPaths(name);
	if (!iconData) return null;
	const { paths, viewBoxSize } = iconData;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: size,
		height: size,
		viewBox: `0 0 ${viewBoxSize} ${viewBoxSize}`,
		fill: "currentColor",
		style,
		"aria-hidden": "true",
		children: paths.map((d, i) => import_react.createElement("path", {
			d,
			key: i
		}))
	});
};
//#endregion
//#region src/components/elements/providers/minimal/icon.tsx
/**
* @hidden
* @since 0.15
*/
var MnIcon = ({ icon, style, iconSize }) => {
	if (!icon) return null;
	const svgName = getSvgIconName(icon);
	if (!svgName) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgIcon, {
		name: svgName,
		size: iconSize !== null && iconSize !== void 0 ? iconSize : 16,
		style
	});
};
//#endregion
//#region src/components/elements/providers/minimal/button.tsx
/**
* @hidden
* @since 0.15
*/
var MnButton = ({ type = "button", icon, variant, minimal, active, loading, disabled, onClick, title, style, className, children }) => {
	const hasChildren = import_react.Children.count(children) > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type,
		className: [
			"mrl-btn",
			variant ? `mrl-btn--${variant}` : null,
			minimal ? "mrl-btn--minimal" : null,
			active ? "mrl-btn--active" : null,
			loading ? "mrl-btn--loading" : null,
			icon && !hasChildren ? "mrl-btn--icon-only" : null,
			className !== null && className !== void 0 ? className : null
		].filter(Boolean).join(" "),
		disabled: disabled || loading,
		onClick,
		title,
		style,
		children: [
			loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mrl-btn-spinner",
				"aria-hidden": "true"
			}),
			icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MnIcon, {
				icon,
				iconSize: 16
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mrl-btn-text",
				children
			})
		]
	});
};
//#endregion
//#region src/components/elements/providers/minimal/radio.tsx
/**
* @hidden
* @since 0.15
*/
var MnRadio = ({ name, label, value, checked, onChange }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mrl-radio",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "radio",
			name,
			value,
			checked,
			onChange
		}), label]
	});
};
//#endregion
//#region src/components/elements/providers/minimal/slider.tsx
function computeTickLabels(min, max, labelStepSize, labelValues) {
	if (labelValues && labelValues.length > 0) return labelValues;
	if (labelStepSize && labelStepSize > 0) {
		const labels = [];
		for (let v = min; v <= max; v += labelStepSize) labels.push(Math.round(v * 1e9) / 1e9);
		if (labels[labels.length - 1] < max) labels.push(max);
		return labels;
	}
	return [min, max];
}
/**
* @hidden
* @since 0.15
*/
var MnSlider = ({ min = 0, max = 100, stepSize, labelStepSize, labelValues, value, onChange, disabled }) => {
	const range = max - min;
	const ticks = computeTickLabels(min, max, labelStepSize, labelValues);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mrl-slider-wrapper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			className: "mrl-slider",
			min,
			max,
			step: stepSize,
			value,
			disabled,
			onChange: (e) => onChange === null || onChange === void 0 ? void 0 : onChange(parseFloat(e.target.value))
		}), ticks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mrl-slider-labels",
			children: ticks.map((tick, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mrl-slider-label",
				style: { left: `${(tick - min) / range * 100}%` },
				children: tick
			}, i))
		})]
	});
};
//#endregion
//#region src/components/elements/providers/minimal/collapsible.tsx
/**
* @hidden
* @since 0.15
*/
var MnCollapsible = ({ isOpen, children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			maxHeight: isOpen ? "9999px" : 0,
			overflow: isOpen ? "visible" : "hidden",
			transition: "max-height var(--mrl-transition-speed, 150ms) ease-in-out"
		},
		"aria-hidden": !isOpen || void 0,
		children
	});
};
//#endregion
//#region src/components/elements/providers/minimal/callout.tsx
var DEFAULT_ICON_BY_VARIANT = {
	primary: "info-sign",
	warning: "warning-sign",
	success: "tick",
	danger: "error"
};
/**
* @hidden
* @since 0.15
*/
var MnCallout = ({ variant, title, icon, children }) => {
	const cls = ["mrl-callout", variant ? `mrl-callout--${variant}` : null].filter(Boolean).join(" ");
	const resolvedIcon = icon !== null && icon !== void 0 ? icon : variant ? DEFAULT_ICON_BY_VARIANT[variant] : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cls,
		children: resolvedIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mrl-callout-content",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mrl-callout-icon",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MnIcon, {
					icon: resolvedIcon,
					iconSize: 20
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mrl-callout-body",
				children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mrl-callout-title",
					children: title
				}), children]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mrl-callout-title",
			children: title
		}), children] })
	});
};
//#endregion
//#region src/components/elements/providers/minimal/checkbox.tsx
/**
* @hidden
* @since 0.15
*/
var MnCheckbox = ({ checked, label, onChange, disabled, id, name }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mrl-checkbox",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			id,
			name,
			checked,
			disabled,
			onChange
		}), label]
	});
};
//#endregion
//#region src/components/elements/providers/minimal/card.tsx
/**
* @hidden
* @since 0.15
*/
var MnCard = ({ style, children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mrl-card",
		style,
		children
	});
};
//#endregion
//#region src/components/elements/providers/minimal/numeric-input.tsx
/**
* @hidden
* @since 0.15
*/
var MnNumericInput = ({ style, min, max, value, disabled, onChange }) => {
	const handleChange = (e) => {
		const parsed = parseFloat(e.target.value);
		if (!isNaN(parsed)) onChange === null || onChange === void 0 || onChange(parsed);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "number",
		className: "mrl-numeric-input",
		style,
		min,
		max,
		value,
		disabled,
		onChange: handleChange
	});
};
//#endregion
//#region src/components/elements/providers/minimal/input-group.tsx
/**
* @hidden
* @since 0.15
*/
var MnInputGroup = ({ style, round, autoFocus, leftIcon, placeholder, value, readOnly, disabled, id, name, rightElement, onChange, onClick }) => {
	const rightElementRef = import_react.useRef(null);
	const [rightElementWidth, setRightElementWidth] = import_react.useState(0);
	import_react.useEffect(() => {
		if (!rightElement || !rightElementRef.current) {
			setRightElementWidth(0);
			return;
		}
		const updateWidth = () => {
			var _rightElementRef$curr, _rightElementRef$curr2;
			setRightElementWidth(Math.ceil((_rightElementRef$curr = (_rightElementRef$curr2 = rightElementRef.current) === null || _rightElementRef$curr2 === void 0 ? void 0 : _rightElementRef$curr2.getBoundingClientRect().width) !== null && _rightElementRef$curr !== void 0 ? _rightElementRef$curr : 0));
		};
		updateWidth();
		if (typeof ResizeObserver === "undefined") return;
		const observer = new ResizeObserver(updateWidth);
		observer.observe(rightElementRef.current);
		return () => {
			observer.disconnect();
		};
	}, [rightElement]);
	const inputStyle = rightElement ? { paddingRight: `${rightElementWidth + 10}px` } : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: [
			"mrl-input-group",
			round ? "mrl-input-group--round" : null,
			leftIcon ? "mrl-input-group--with-left-icon" : null,
			rightElement ? "mrl-input-group--with-right-element" : null
		].filter(Boolean).join(" "),
		style,
		children: [
			leftIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mrl-input-left-icon",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MnIcon, {
					icon: leftIcon,
					iconSize: 14
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
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
			}),
			rightElement && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				ref: rightElementRef,
				className: "mrl-input-right-element",
				children: rightElement
			})
		]
	});
};
//#endregion
//#region src/components/elements/providers/minimal/non-ideal-state.tsx
/**
* @hidden
* @since 0.15
*/
var MnNonIdealState = ({ icon, title, description, action }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mrl-non-ideal-state",
		children: [
			icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mrl-non-ideal-state-icon",
				children: typeof icon === "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MnIcon, {
					icon,
					iconSize: 40
				}) : icon
			}),
			title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mrl-non-ideal-state-title",
				children: title
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mrl-non-ideal-state-description",
				children: description
			}),
			action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mrl-non-ideal-state-action",
				children: action
			})
		]
	});
};
//#endregion
//#region src/components/elements/providers/minimal/spinner.tsx
/**
* @hidden
* @since 0.15
*/
var MnSpinner = ({ variant, sizePreset = "standard" }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: [
			"mrl-spinner",
			`mrl-spinner--${sizePreset}`,
			variant ? `mrl-spinner--${variant}` : null
		].filter(Boolean).join(" "),
		role: "status",
		"aria-label": "Loading"
	});
};
//#endregion
//#region src/components/elements/providers/minimal/switch.tsx
/**
* @hidden
* @since 0.15
*/
var MnSwitch = ({ style, disabled, checked, label, labelElement, onChange }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mrl-switch",
		style,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				checked,
				disabled,
				onChange
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mrl-switch-track",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mrl-switch-thumb" })
			}),
			labelElement !== null && labelElement !== void 0 ? labelElement : label
		]
	});
};
//#endregion
//#region src/components/elements/providers/minimal/select.tsx
/**
* @hidden
* @since 0.15
*/
var MnSelect = ({ id, name, fill, style, placeholder, value, items, onChange, keyFunc, extraClassNames }) => {
	const wrapperCls = [
		"mrl-select",
		fill ? "mrl-select--fill" : null,
		extraClassNames !== null && extraClassNames !== void 0 ? extraClassNames : null
	].filter(Boolean).join(" ");
	const handleChange = (e) => {
		const selected = e.target.value;
		onChange === null || onChange === void 0 || onChange(selected === "" ? void 0 : selected);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: wrapperCls,
		style,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			id,
			name,
			value: value !== null && value !== void 0 ? value : "",
			onChange: handleChange,
			children: [placeholder !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: placeholder
			}), items.map((item, idx) => {
				const key = keyFunc ? keyFunc(item) : idx;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: String(item.value),
					children: item.label
				}, key);
			})]
		})
	});
};
//#endregion
//#region src/components/elements/providers/minimal/file-input.tsx
/**
* @hidden
* @since 0.15
*/
var MnFileInput = ({ fill, text, buttonText, onInputChange }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: ["mrl-file-input", fill ? "mrl-file-input--fill" : null].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				onChange: onInputChange
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mrl-file-input-text",
				children: text !== null && text !== void 0 ? text : "Choose file…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mrl-file-input-btn",
				children: buttonText !== null && buttonText !== void 0 ? buttonText : "Browse"
			})
		]
	});
};
//#endregion
//#region src/components/elements/providers/minimal/form-group.tsx
/**
* @hidden
* @since 0.15
*/
var MnFormGroup = ({ label, labelFor, inline, children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: ["mrl-form-group", inline ? "mrl-form-group--inline" : null].filter(Boolean).join(" "),
		children: [label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: labelFor,
			children: label
		}), children]
	});
};
//#endregion
//#region src/components/elements/providers/minimal/editable-text.tsx
/**
* @hidden
* @since 0.15
*/
var MnEditableText = ({ value, onChange }) => {
	const [editing, setEditing] = import_react.useState(false);
	const [localValue, setLocalValue] = import_react.useState(value !== null && value !== void 0 ? value : "");
	import_react.useEffect(() => {
		setLocalValue(value !== null && value !== void 0 ? value : "");
	}, [value]);
	const commit = () => {
		setEditing(false);
		onChange === null || onChange === void 0 || onChange(localValue);
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter") commit();
		else if (e.key === "Escape") {
			setLocalValue(value !== null && value !== void 0 ? value : "");
			setEditing(false);
		}
	};
	if (editing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mrl-editable-text",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: "mrl-editable-text-input",
			autoFocus: true,
			value: localValue,
			onChange: (e) => setLocalValue(e.target.value),
			onBlur: commit,
			onKeyDown: handleKeyDown
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mrl-editable-text",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mrl-editable-text-display",
			onClick: () => setEditing(true),
			children: localValue
		})
	});
};
//#endregion
//#region src/utils/menu.ts
/**
* @hidden
*/
function processMenuItems(items) {
	const processed = [];
	if (items != null) {
		for (const i of items) if (i != null) processed.push(i);
	}
	return processed;
}
/**
* @hidden
*/
function getText(label) {
	if (typeof label === "function") return label();
	return label;
}
//#endregion
//#region src/components/context.tsx
/**
* context.ts
*
* This module holds various React component contexts and validation maps
*/
var VOID_NOOP = () => {};
var AppContext = import_react.createContext({
	allowHtmlValuesInSelection: () => false,
	getHTMLCleaner: () => void 0,
	getPropertyValueFormatter: () => void 0,
	getLegendLayerExtraIconsProvider: () => [],
	getLegendGroupExtraIconsProvider: () => []
});
/**
* @since 0.14.9
*/
var AppContextProvider = ({ mapguide, children }) => {
	const providerImpl = import_react.useMemo(() => ({
		allowHtmlValuesInSelection: () => {
			var _mapguide$selectionSe, _mapguide$selectionSe2;
			return (_mapguide$selectionSe = mapguide === null || mapguide === void 0 || (_mapguide$selectionSe2 = mapguide.selectionSettings) === null || _mapguide$selectionSe2 === void 0 ? void 0 : _mapguide$selectionSe2.allowHtmlValues) !== null && _mapguide$selectionSe !== void 0 ? _mapguide$selectionSe : false;
		},
		getHTMLCleaner: () => {
			var _mapguide$selectionSe3;
			return mapguide === null || mapguide === void 0 || (_mapguide$selectionSe3 = mapguide.selectionSettings) === null || _mapguide$selectionSe3 === void 0 ? void 0 : _mapguide$selectionSe3.cleanHtml;
		},
		getPropertyValueFormatter: () => {
			var _mapguide$selectionSe4;
			return mapguide === null || mapguide === void 0 || (_mapguide$selectionSe4 = mapguide.selectionSettings) === null || _mapguide$selectionSe4 === void 0 ? void 0 : _mapguide$selectionSe4.formatPropertyValue;
		},
		getLegendLayerExtraIconsProvider: (options) => {
			var _mapguide$legendSetti, _mapguide$legendSetti2, _mapguide$legendSetti3;
			return (_mapguide$legendSetti = mapguide === null || mapguide === void 0 || (_mapguide$legendSetti2 = mapguide.legendSettings) === null || _mapguide$legendSetti2 === void 0 || (_mapguide$legendSetti3 = _mapguide$legendSetti2.provideExtraLayerIconsHtml) === null || _mapguide$legendSetti3 === void 0 ? void 0 : _mapguide$legendSetti3.call(_mapguide$legendSetti2, options)) !== null && _mapguide$legendSetti !== void 0 ? _mapguide$legendSetti : [];
		},
		getLegendGroupExtraIconsProvider: (options) => {
			var _mapguide$legendSetti4, _mapguide$legendSetti5, _mapguide$legendSetti6;
			return (_mapguide$legendSetti4 = mapguide === null || mapguide === void 0 || (_mapguide$legendSetti5 = mapguide.legendSettings) === null || _mapguide$legendSetti5 === void 0 || (_mapguide$legendSetti6 = _mapguide$legendSetti5.provideExtraGroupIconsHtml) === null || _mapguide$legendSetti6 === void 0 ? void 0 : _mapguide$legendSetti6.call(_mapguide$legendSetti5, options)) !== null && _mapguide$legendSetti4 !== void 0 ? _mapguide$legendSetti4 : [];
		}
	}), [mapguide]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppContext.Provider, {
		value: providerImpl,
		children
	});
};
var LegendContext = import_react.createContext({
	stateless: false,
	getMapName: () => void 0,
	getSessionId: () => void 0,
	isFiltering: () => false,
	getFilterText: () => "",
	getLocale: () => "en",
	getBaseIconSize: () => 0,
	getIconMimeType: () => "",
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
var ToolbarContext = import_react.createContext({
	openFlyout: VOID_NOOP,
	closeFlyout: VOID_NOOP,
	openComponent: VOID_NOOP,
	closeComponent: VOID_NOOP
});
//#endregion
//#region src/components/icon.tsx
init_objectSpread2();
var Icon = (props) => {
	const spStyle = _objectSpread2({}, props.style || {});
	if (!spStyle.display) spStyle.display = "inline-block";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", _objectSpread2(_objectSpread2({
		style: spStyle,
		onClick: props.onClick
	}, props.otherProps), {}, { children: props.children(props.baseSize) }));
};
/**
* An image icon component
* @param props
* @since 0.13
*/
var ImageIcon = (props) => {
	if (!props.url && !props.spriteClass) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("noscript", {});
	let url;
	let spriteClass = props.spriteClass;
	if (props.url && props.url != "images/icons.png") {
		url = getAssetPath(props.url);
		spriteClass = void 0;
	}
	if (spriteClass) {
		const spStyle = _objectSpread2({}, props.style || {});
		if (!spStyle.display) spStyle.display = "inline-block";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", _objectSpread2({
			style: spStyle,
			onClick: props.onClick,
			className: `icon ${spriteClass}`
		}, props.otherProps));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", _objectSpread2(_objectSpread2({
		className: "icon",
		style: props.style,
		src: url,
		onClick: props.onClick
	}, props.otherProps), {}, { onError: (e) => e.currentTarget.src = ICON_ERROR }));
};
//#endregion
//#region src/components/toolbar.tsx
init_objectSpread2();
var TOOLBAR_BACKGROUND_COLOR = "#f0f0f0";
function isNumeric(arg) {
	return typeof arg == "number";
}
var SVG_SIZE_RATIO = 16 / 29;
function getSelected(item) {
	const sel = item.selected;
	if (sel != null) if (typeof sel === "function") return sel();
	else return sel;
	return false;
}
function getEnabled(item) {
	const en = item.enabled;
	if (en != null) if (typeof en === "function") return en();
	else return en;
	return true;
}
var OpacityIcon = import_react.memo(({ opacity, icon, iconSize }) => {
	const { Icon } = useElementContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		style: { opacity },
		icon,
		iconSize
	});
});
function getIconElement(item, enabled, size) {
	const iconStyle = getIconStyle(enabled, size);
	if (item.iconClass || item.icon) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageIcon, {
		style: iconStyle,
		url: item.icon,
		spriteClass: item.iconClass
	});
	else if (item.svgIconName) {
		const { opacity } = iconStyle;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpacityIcon, {
			opacity,
			icon: item.svgIconName,
			iconSize: size * SVG_SIZE_RATIO
		});
	} else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
}
function getFlyoutIconElement(isFlownOut, size) {
	const { Icon } = useElementContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		icon: isFlownOut ? "chevron-up" : "chevron-down",
		iconSize: size * SVG_SIZE_RATIO
	});
}
function getTooltip(item) {
	const tt = item.tooltip;
	if (tt != null) if (typeof tt === "function") return tt();
	else return tt;
	return "";
}
function getIconStyle(enabled, height) {
	return {
		verticalAlign: "middle",
		lineHeight: height
	};
}
function getItemStyle(enabled, selected, size, isMouseOver, vertical) {
	const pad = (size - 16) / 2;
	const vertPad = 6;
	const style = {
		display: vertical === true ? "block" : "inline-flex",
		alignItems: vertical === true ? void 0 : "center",
		gap: vertical === true ? void 0 : 4,
		verticalAlign: vertical === true ? void 0 : "top",
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
	const style = { display: vertical === true ? "block" : "inline-block" };
	if (vertical === true) {
		style.paddingTop = 2;
		style.paddingBottom = -2;
		style.marginLeft = 0;
		style.marginRight = 0;
	} else {
		const separatorHeight = Math.max(1, size - 12);
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
var ComponentFlyoutItem = (props) => {
	const { size, item, vertical, isFlownOut } = props;
	const toolbarCtx = import_react.useContext(ToolbarContext);
	const [isMouseOver, setIsMouseOver] = import_react.useState(false);
	const onClick = (e) => {
		e.preventDefault();
		const { flyoutId, componentName, componentProps } = item;
		if (!!!isFlownOut) {
			const rect = e.currentTarget.getBoundingClientRect();
			const metrics = {
				posX: rect.left,
				posY: rect.top,
				width: rect.width,
				height: rect.height,
				vertical
			};
			toolbarCtx.openComponent(flyoutId, metrics, componentName, componentProps);
		} else toolbarCtx.closeComponent(flyoutId);
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
	if (vertical === true) label = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rotated-text",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rotated-text__inner rotated-text-ccw",
			children: getText(item.label)
		})
	});
	const ttip = getTooltip(item);
	const iconEl = getIconElement(item, enabled, size);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `noselect toolbar-flyout-btn ${selected ? "selected-item" : ""} ${isMouseOver ? "mouse-over" : ""}`,
		onMouseEnter,
		onMouseLeave,
		onClick,
		style,
		title: ttip,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-flyout-id": `flyout-${item.flyoutId}`,
			style: {
				display: "inline-flex",
				alignItems: "center",
				gap: 4
			},
			children: [
				iconEl,
				" ",
				label,
				" ",
				getFlyoutIconElement(isFlownOut, size)
			]
		})
	});
};
var FlyoutMenuReferenceItem = (props) => {
	const { size, menu, vertical, isFlownOut } = props;
	const toolbarCtx = import_react.useContext(ToolbarContext);
	const [isMouseOver, setIsMouseOver] = import_react.useState(false);
	const onClick = (e) => {
		e.preventDefault();
		if (!!!isFlownOut) {
			const rect = e.currentTarget.getBoundingClientRect();
			const metrics = {
				posX: rect.left,
				posY: rect.top,
				width: rect.width,
				height: rect.height,
				vertical
			};
			toolbarCtx.openFlyout(menu.flyoutId, metrics);
		} else toolbarCtx.closeFlyout(menu.flyoutId);
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
	if (vertical === true) label = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rotated-text",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rotated-text__inner rotated-text-ccw",
			children: typeof menu.label === "function" ? menu.label() : menu.label
		})
	});
	let align = menu.flyoutAlign;
	if (!align) align = vertical === true ? "right bottom" : "bottom right";
	const ttip = getTooltip(menu);
	const iconEl = getIconElement(menu, enabled, size);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `noselect toolbar-flyout-btn ${selected ? "selected-item" : ""} ${isMouseOver ? "mouse-over" : ""}`,
		onMouseEnter,
		onMouseLeave,
		onClick,
		style,
		title: ttip,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-flyout-id": `flyout-${menu.flyoutId}`,
			style: {
				display: "inline-flex",
				alignItems: "center",
				gap: 4
			},
			children: [
				iconEl,
				" ",
				label,
				" ",
				getFlyoutIconElement(isFlownOut, size)
			]
		})
	});
};
var ToolbarSeparator = (props) => {
	const style = getToolbarSeparatorItemStyle(props.size, props.vertical);
	if (props.vertical === true) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "noselect toolbar-separator-vertical",
		style
	});
	else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "noselect toolbar-separator-horizontal",
		style,
		"aria-hidden": "true"
	});
};
var ToolbarButton = (props) => {
	const { height, item, vertical, hideVerticalLabels } = props;
	const [isMouseOver, setIsMouseOver] = import_react.useState(false);
	const onMouseLeave = () => {
		setIsMouseOver(false);
	};
	const onMouseEnter = () => {
		setIsMouseOver(true);
	};
	const onClick = (e) => {
		e.preventDefault();
		const { item } = props;
		if (getEnabled(item) && item.invoke) item.invoke();
		return false;
	};
	const selected = getSelected(item);
	const enabled = getEnabled(item);
	const style = getItemStyle(enabled, selected, height, isMouseOver, vertical);
	let ttip = null;
	if (typeof item.tooltip == "function") ttip = item.tooltip();
	else ttip = item.tooltip;
	if (!enabled) style.opacity = .3;
	const iconEl = getIconElement(item, enabled, height);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `noselect toolbar-btn ${selected ? "selected-item" : ""} ${isMouseOver && enabled ? "mouse-over" : ""}`,
		onMouseEnter,
		onMouseLeave,
		style,
		title: ttip,
		onClick,
		children: [
			iconEl,
			" ",
			vertical == true && hideVerticalLabels == true ? null : getText(item.label)
		]
	});
};
/**
* A generic toolbar component
* @param props 
*/
var Toolbar = (props) => {
	const { containerStyle, containerClass, childItems, vertical, hideVerticalLabels, flyoutStates, onOpenFlyout, onCloseFlyout, onOpenComponent, onCloseComponent } = props;
	const openFlyout = (id, metrics) => onOpenFlyout === null || onOpenFlyout === void 0 ? void 0 : onOpenFlyout(id, metrics);
	const closeFlyout = (id) => onCloseFlyout === null || onCloseFlyout === void 0 ? void 0 : onCloseFlyout(id);
	const openComponent = (id, metrics, name, props) => onOpenComponent === null || onOpenComponent === void 0 ? void 0 : onOpenComponent(id, metrics, name, props);
	const closeComponent = (id) => onCloseComponent === null || onCloseComponent === void 0 ? void 0 : onCloseComponent(id);
	let height = 29;
	if (containerStyle) {
		const ch = containerStyle.height;
		if (isNumeric(ch)) height = ch;
	}
	const providerImpl = {
		openFlyout,
		closeFlyout,
		openComponent,
		closeComponent
	};
	const { Icon } = useElementContext();
	const scrollContainerRef = import_react.useRef(null);
	const [canScrollBefore, setCanScrollBefore] = import_react.useState(false);
	const [canScrollAfter, setCanScrollAfter] = import_react.useState(false);
	const updateScrollState = import_react.useCallback(() => {
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
	import_react.useEffect(() => {
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
	import_react.useLayoutEffect(() => {
		updateScrollState();
	}, [childItems, updateScrollState]);
	const onScrollBefore = import_react.useCallback(() => {
		const el = scrollContainerRef.current;
		if (!el) return;
		const amount = height * 3;
		if (vertical === true) el.scrollBy({
			top: -amount,
			behavior: "smooth"
		});
		else el.scrollBy({
			left: -amount,
			behavior: "smooth"
		});
	}, [height, vertical]);
	const onScrollAfter = import_react.useCallback(() => {
		const el = scrollContainerRef.current;
		if (!el) return;
		const amount = height * 3;
		if (vertical === true) el.scrollBy({
			top: amount,
			behavior: "smooth"
		});
		else el.scrollBy({
			left: amount,
			behavior: "smooth"
		});
	}, [height, vertical]);
	const outerStyle = _objectSpread2(_objectSpread2({}, containerStyle), {}, {
		overflow: "hidden",
		display: "flex",
		flexDirection: vertical === true ? "column" : "row"
	});
	const scrollContainerStyle = vertical === true ? {
		flex: "1 1 0",
		minHeight: 0,
		overflowY: "scroll",
		overflowX: "hidden"
	} : {
		flex: "1 1 0",
		minWidth: 0,
		overflowX: "scroll",
		overflowY: "hidden",
		whiteSpace: "nowrap"
	};
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContext.Provider, {
		value: providerImpl,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: outerStyle,
			className: `has-flyout noselect ${containerClass}`,
			children: [
				canScrollBefore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "noselect toolbar-scroll-btn",
					style: scrollBtnStyle,
					onClick: onScrollBefore,
					title: vertical === true ? "Scroll up" : "Scroll left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						icon: vertical === true ? "chevron-up" : "chevron-left",
						iconSize
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: scrollContainerRef,
					className: "toolbar-scroll-container",
					style: scrollContainerStyle,
					children: childItems.map((item, index) => {
						if (isComponentFlyout(item)) {
							const isFlownOut = flyoutStates && !!flyoutStates[item.flyoutId];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComponentFlyoutItem, {
								size: height,
								item,
								vertical,
								isFlownOut
							}, index);
						} else if (isMenuRef(item)) {
							const isFlownOut = flyoutStates && !!flyoutStates[item.flyoutId];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlyoutMenuReferenceItem, {
								size: height,
								menu: item,
								vertical,
								isFlownOut
							}, index);
						} else if (item.isSeparator === true) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarSeparator, {
							size: height,
							vertical
						}, index);
						else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
							height,
							item,
							vertical,
							hideVerticalLabels
						}, index);
					})
				}),
				canScrollAfter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "noselect toolbar-scroll-btn",
					style: scrollBtnStyle,
					onClick: onScrollAfter,
					title: vertical === true ? "Scroll down" : "Scroll right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						icon: vertical === true ? "chevron-down" : "chevron-right",
						iconSize
					})
				})
			]
		})
	});
};
//#endregion
//#region src/components/elements/providers/minimal/menu.tsx
var MnMenuItems = ({ items, onInvoked }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: items.map((item, idx) => {
		if (item.isSeparator) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "mrl-menu-separator",
			role: "separator"
		}, idx);
		if (isMenu(item)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "mrl-submenu",
			role: "none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mrl-menu-item",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mrl-menu-item-icon-slot",
					"aria-hidden": "true",
					children: (item.icon || item.iconClass) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageIcon, {
						url: item.icon,
						spriteClass: item.iconClass
					})
				}), getText(item.label)]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mrl-menu",
				role: "menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MnMenuItems, {
					items: item.childItems,
					onInvoked
				})
			})]
		}, idx);
		const enabled = getEnabled(item);
		const handleClick = () => {
			if (enabled) {
				var _item$invoke;
				(_item$invoke = item.invoke) === null || _item$invoke === void 0 || _item$invoke.call(item);
				onInvoked === null || onInvoked === void 0 || onInvoked();
			}
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: `mrl-menu-item${!enabled ? " mrl-menu-item--disabled" : ""}`,
			role: "menuitem",
			"aria-disabled": !enabled,
			onClick: handleClick,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mrl-menu-item-icon-slot",
				"aria-hidden": "true",
				children: (item.icon || item.iconClass) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageIcon, {
					url: item.icon,
					spriteClass: item.iconClass
				})
			}), getText(item.label)]
		}, idx);
	}) });
};
/**
* @hidden
* @since 0.15
*/
var MnMenuComponent = ({ items, onInvoked }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mrl-menu",
		role: "menu",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MnMenuItems, {
			items,
			onInvoked
		})
	});
};
//#endregion
//#region src/components/elements/providers/minimal/tab-set.tsx
/**
* @hidden
* @since 0.15
*/
var MnTabSet = ({ id, className, tabs, activeTabId, onTabChanged }) => {
	var _tabs$;
	const [localActive, setLocalActive] = import_react.useState(activeTabId !== null && activeTabId !== void 0 ? activeTabId : (_tabs$ = tabs[0]) === null || _tabs$ === void 0 ? void 0 : _tabs$.id);
	const activeId = activeTabId !== null && activeTabId !== void 0 ? activeTabId : localActive;
	const handleTabClick = (tabId) => {
		setLocalActive(tabId);
		onTabChanged === null || onTabChanged === void 0 || onTabChanged(tabId);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id,
		className: ["mrl-tab-set", className].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mrl-tab-list",
			role: "tablist",
			children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				role: "tab",
				"aria-selected": tab.id === activeId,
				className: `mrl-tab${tab.id === activeId ? " mrl-tab--active" : ""}`,
				onClick: () => handleTabClick(tab.id),
				children: tab.title
			}, `mrl-tab-${tab.id}`))
		}), tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "tabpanel",
			className: "mrl-tab-panel",
			hidden: tab.id !== activeId,
			children: tab.content
		}, `mrl-tab-panel-${tab.id}`))]
	});
};
//#endregion
//#region src/components/elements/providers/minimal/drawer.tsx
/**
* @hidden
* @since 0.15
*/
var MnDrawer = ({ title, isOpen, position = "right", onClose, children }) => {
	if (typeof document === "undefined") return null;
	const posClass = `mrl-drawer--${position}`;
	const openClass = isOpen ? " mrl-drawer--open" : "";
	return import_react_dom.createPortal(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mrl-drawer-backdrop",
		onClick: onClose
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `mrl-drawer ${posClass}${openClass}`,
		role: "dialog",
		"aria-modal": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mrl-drawer-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mrl-drawer-title",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "mrl-drawer-close mrl-btn mrl-btn--minimal",
				onClick: onClose,
				"aria-label": "Close",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgIcon, {
					name: "cross",
					size: 14
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mrl-drawer-body",
			children
		})]
	})] }), document.body);
};
//#endregion
//#region src/components/elements/providers/minimal/popover.css
var import_Popover = require_Popover();
//#endregion
//#region src/components/elements/providers/minimal/popover.tsx
function mapPosition$1(position) {
	switch (position) {
		case "left": return "left";
		case "right": return "right";
		case "top": return "top";
		case "bottom": return "bottom";
		default: return "right";
	}
}
/**
* @hidden
* @since 0.15
*/
var MnPopover = ({ position, children }) => {
	const [isOpen, setIsOpen] = import_react.useState(false);
	const childArray = import_react.Children.toArray(children);
	const trigger = childArray[0];
	const content = childArray[1];
	if (!trigger) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Popover.Popover, {
		isOpen,
		positions: [mapPosition$1(position)],
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: content }),
		containerClassName: "mrl-popover-container",
		onClickOutside: () => setIsOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			onClick: () => setIsOpen((prev) => !prev),
			children: trigger
		})
	});
};
//#endregion
//#region src/components/elements/providers/minimal/toaster.tsx
function mapPosition(position) {
	switch (position) {
		case "top-left": return "top-left";
		case "top-right": return "top-right";
		case "bottom": return "bottom-center";
		case "bottom-left": return "bottom-left";
		case "bottom-right": return "bottom-right";
		default: return "top-center";
	}
}
/**
* @hidden
* @since 0.15
*/
var MnToaster = import_react.forwardRef((props, ref) => {
	import_react.useImperativeHandle(ref, () => ({
		show(message) {
			const variant = message.variant;
			const classes = ["mrl-toast", variant ? `mrl-toast--${variant}` : null].filter(Boolean).join(" ");
			return zt.custom(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: classes,
				role: "status",
				"aria-live": "polite",
				children: [message.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mrl-toast-icon",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MnIcon, {
						icon: message.icon,
						iconSize: 16
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mrl-toast-message",
					children: message.message
				})]
			}));
		},
		dismiss(key) {
			zt.dismiss(key);
		}
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fe, { position: mapPosition(props.position) });
});
MnToaster.displayName = "MnToaster";
//#endregion
//#region src/components/elements/providers/minimal/dialog.tsx
/**
* @hidden
* @since 0.15
*/
var MnDialog = ({ icon, isOpen, title, onClose, children }) => {
	if (typeof document === "undefined" || !isOpen) return null;
	return import_react_dom.createPortal(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mrl-dialog-backdrop",
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose === null || onClose === void 0 || onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mrl-dialog-shell",
			role: "dialog",
			"aria-modal": "true",
			children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mrl-dialog-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", { children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mrl-dialog-icon",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MnIcon, {
						icon,
						iconSize: 18
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "mrl-dialog-close mrl-btn mrl-btn--minimal",
					onClick: onClose,
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgIcon, {
						name: "cross",
						size: 14
					})
				})]
			}), children]
		})
	}), document.body);
};
/**
* @hidden
* @since 0.15
*/
var MnDialogContainer = ({ style, className, children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: ["mrl-dialog-container", className].filter(Boolean).join(" "),
		style,
		children
	});
};
/**
* @hidden
* @since 0.15
*/
var MnDialogShell = ({ style, className, children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: ["mrl-dialog-shell", className].filter(Boolean).join(" "),
		style,
		role: "dialog",
		"aria-modal": "true",
		children
	});
};
/**
* @hidden
* @since 0.15
*/
var MnDialogHeader = ({ className, children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: ["mrl-dialog-header", className].filter(Boolean).join(" "),
		children
	});
};
/**
* @hidden
* @since 0.15
*/
var MnDialogBody = ({ style, className, children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: ["mrl-dialog-body", className].filter(Boolean).join(" "),
		style,
		children
	});
};
/**
* @hidden
* @since 0.15
*/
var MnDialogFooter = ({ style, className, children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: ["mrl-dialog-footer", className].filter(Boolean).join(" "),
		style,
		children
	});
};
/**
* @hidden
* @since 0.15
*/
var MnDialogFooterActions = ({ style, className, children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: ["mrl-dialog-footer-actions", className].filter(Boolean).join(" "),
		style,
		children
	});
};
//#endregion
//#region src/components/elements/providers/minimal/html-table.tsx
/**
* @hidden
* @since 0.15
*/
var MnHtmlTable = ({ condensed, bordered, className, style, children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		className: [
			"mrl-table",
			condensed ? "mrl-table--condensed" : null,
			bordered ? "mrl-table--bordered" : null,
			className !== null && className !== void 0 ? className : null
		].filter(Boolean).join(" "),
		style,
		children
	});
};
//#endregion
//#region src/components/elements/providers/minimal/provider.tsx
var provider = {
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
//#endregion
//#region src/components/elements/element-context.tsx
var ElementContext = import_react.createContext(provider);
/**
* Accesses the UI element context
* 
* @returns 
* @since 0.15
*/
var useElementContext = () => {
	return import_react.useContext(ElementContext);
};
/**
* The UI element provider component. To override the default UI element set, mount
* this component near the top with a custom UI element provider
* 
* @since 0.15
*/
var ElementProvider = ElementContext.Provider;
/**
* Provides a type-safe wrapper over the abstract Select UI element
* 
* @param props 
* @returns 
* @since 0.15
*/
function TypedSelect(props) {
	const { id, name, value, onChange, items, fill, placeholder, keyFunc, style } = props;
	const { Select } = useElementContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
		id,
		name,
		value,
		onChange,
		items,
		fill,
		style,
		placeholder,
		keyFunc
	});
}
/**
* A inline flex row wrapper that can form the basis of button groups or toolbars
* 
* @param param0 
* @returns 
* @since 0.15
*/
var ElementGroup = ({ style, vertical, children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style,
		className: `mrl-element-group ${vertical === true ? "mrl-element-group-vertical" : "mrl-element-group-horizontal"}`,
		children
	});
};
//#endregion
//#region src/components/error.tsx
/**
* Returns a normalized stack trace for the given error object
*
* @param {(Error|InitError)} err
* @returns {string[]}
*/
function normalizeStack(err) {
	let stack;
	if (err.stack instanceof Array) stack = err.stack || [];
	else if (typeof err.stack == "string") stack = (err.stack || "").split("\n");
	else stack = [];
	return stack;
}
/**
* The Error component displays an error object in a nicely formatted manner
* @param props
*/
var Error$1 = (props) => {
	const { Callout } = useElementContext();
	const err = props.error;
	if (isError(err) || isInitError(err)) if (props.errorRenderer) return props.errorRenderer(err);
	else {
		const stack = normalizeStack(err);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
			variant: "danger",
			icon: "error",
			title: err.message,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "error-stack",
				children: stack.map((ln, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: ln }, `stack-line-${i}`))
			})
		});
	}
	else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
		variant: "danger",
		icon: "error",
		title: err
	});
};
//#endregion
//#region src/api/registry/component.tsx
/**
* The default set of component names
*
*
* @class DefaultComponentNames
*/
var DefaultComponentNames = /* @__PURE__ */ function(DefaultComponentNames) {
	DefaultComponentNames["Legend"] = "Legend";
	DefaultComponentNames["SelectionPanel"] = "SelectionPanel";
	DefaultComponentNames["Map"] = "Map";
	DefaultComponentNames["Navigator"] = "Navigator";
	DefaultComponentNames["MouseCoordinates"] = "MouseCoordinates";
	DefaultComponentNames["ScaleDisplay"] = "ScaleDisplay";
	DefaultComponentNames["SelectedFeatureCount"] = "SelectedFeatureCount";
	DefaultComponentNames["PoweredByMapGuide"] = "PoweredByMapGuide";
	DefaultComponentNames["TaskPane"] = "TaskPane";
	DefaultComponentNames["About"] = "About";
	DefaultComponentNames["SessionExpired"] = "SessionExpired";
	DefaultComponentNames["Measure"] = "Measure";
	DefaultComponentNames["ViewerOptions"] = "ViewerOptions";
	DefaultComponentNames["QuickPlot"] = "QuickPlot";
	DefaultComponentNames["BaseMapSwitcher"] = "BaseMapSwitcher";
	DefaultComponentNames["MapMenu"] = "MapMenu";
	DefaultComponentNames["ViewSize"] = "ViewSize";
	DefaultComponentNames["CoordinateTracker"] = "CoordinateTracker";
	DefaultComponentNames["AddManageLayers"] = "AddManageLayers";
	DefaultComponentNames["ShareLinkToView"] = "ShareLinkToView";
	return DefaultComponentNames;
}({});
var components = {};
/**
* Registers a react component factory function for the given component id
*
*
* @param {string} id
* @param {ComponentFactory} factory
*/
function registerComponentFactory(id, factory) {
	components[id] = factory;
}
/**
* Gets the registered component factory function for the given component id
*
*
* @param {string} id
* @returns {ComponentFactory}
*/
function getComponentFactory(id) {
	return components[id];
}
/**
* A component placeholder
*
* @hidden
* @param props
*/
var PlaceholderComponent = (props) => {
	const { id, componentProps, locale } = props;
	const factory = getComponentFactory(id);
	if (factory) return factory(componentProps);
	else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Error$1, { error: tr("ERR_UNREGISTERED_COMPONENT", locale, { componentId: id }) });
};
//#endregion
//#region src/utils/number.ts
var SHIM_EPSILON = Math.pow(2, -52);
function epsilon() {
	return Number.EPSILON || SHIM_EPSILON;
}
/**
* Restricts the given number to the given range
* 
*
* @param {number} val 
* @param {number} lower 
* @param {number} upper 
*/
function restrictToRange(val, lower, upper) {
	return Math.min(Math.max(val, lower), upper);
}
/**
* Indicates if the given numbers are equal
*
*
* @param {number} a
* @param {number} b
* @returns {boolean}
*/
function areNumbersEqual(a, b) {
	return Math.abs(a - b) < epsilon();
}
/**
* Indicates if the given scale is within the specified range
*
*
* @param {number} scale
* @param {number} minScale
* @param {number} maxScale
* @returns {boolean}
*/
function scaleRangeBetween(scale, minScale, maxScale) {
	return scale >= minScale && scale < maxScale;
}
/**
* Gets the closest scale index for the given scale and scale array pair
*
*
* @param {[number, number]} scales
* @param {number} scale
* @returns {number}
*/
function getClosestScaleIndex(scales, scale) {
	if (Math.abs(scales[0] - scale) < Math.abs(scales[1] - scale)) return 0;
	else return 1;
}
/**
* Gets the applicable finite scale index for the given scale and finite scale array
*
*
* @param {number[]} finiteScaleList
* @param {number} scale
* @returns {number}
*/
function getFiniteScaleIndexForScale(finiteScaleList, scale) {
	for (let i = 0; i < finiteScaleList.length; i++) if (scale >= finiteScaleList[i]) if (i + 1 < finiteScaleList.length) {
		if (scale <= finiteScaleList[i + 1]) if (getClosestScaleIndex([finiteScaleList[i], finiteScaleList[i + 1]], scale) == 0) return i;
		else return i + 1;
	} else return i;
	else if (scale <= finiteScaleList[i]) if (i > 0) if (getClosestScaleIndex([finiteScaleList[i - 1], finiteScaleList[i]], scale) == 0) return i - 1;
	else return i;
	else return i;
	return 0;
}
/**
* Converts the given angle in degrees to radians
* @param deg The angle in degrees
*/
function deg2rad(deg) {
	return deg * (Math.PI / 180);
}
/**
* Rounds the given number to the specified number of decimals
* 
* @since 0.11
*
* @param {number} num 
* @param {number} [decimals=2] 
* @returns {number} 
*/
function roundTo(num, decimals = 2) {
	const a = Math.pow(10, decimals);
	return Math.round(num * a) / a;
}
//#endregion
//#region src/api/error.ts
/**
* The base of any viewer-related error
*
* @class MgError
* @extends {Error}
*/
var MgError = class extends Error {
	constructor(message) {
		super(message);
		this.message = message;
		this.name = "MgError";
		this.message = message;
		this.stack = (/* @__PURE__ */ new Error()).stack;
	}
};
/**
* Indicates if this error is a session expired error
*
* @param {MgError} err
* @returns {boolean}
*/
function isSessionExpiredError(err) {
	return err.message.indexOf("MgSessionExpiredException") >= 0;
}
//#endregion
//#region src/api/request-builder.ts
/**
* Bitmask describing what data to return when creating a runtime map
*
*
* @enum {number}
*/
var RuntimeMapFeatureFlags = /* @__PURE__ */ function(RuntimeMapFeatureFlags) {
	/**
	* Include data about layers and groups
	*/
	RuntimeMapFeatureFlags[RuntimeMapFeatureFlags["LayersAndGroups"] = 1] = "LayersAndGroups";
	/**
	* Include layer icons
	*/
	RuntimeMapFeatureFlags[RuntimeMapFeatureFlags["LayerIcons"] = 2] = "LayerIcons";
	/**
	* Include data about layer feature sources
	*/
	RuntimeMapFeatureFlags[RuntimeMapFeatureFlags["LayerFeatureSources"] = 4] = "LayerFeatureSources";
	return RuntimeMapFeatureFlags;
}({});
/**
* A bitmask indicating what to return when querying map features
*
*
* @enum {number}
*/
var QueryFeaturesSet = /* @__PURE__ */ function(QueryFeaturesSet) {
	/**
	* Include attributes of selected features
	*/
	QueryFeaturesSet[QueryFeaturesSet["Attributes"] = 1] = "Attributes";
	/**
	* Include an inline image of the selected features
	*/
	QueryFeaturesSet[QueryFeaturesSet["InlineSelection"] = 2] = "InlineSelection";
	/**
	* Include tooltips for the first matching feature
	*/
	QueryFeaturesSet[QueryFeaturesSet["Tooltip"] = 4] = "Tooltip";
	/**
	* Include hyperlink for the first matching feature
	*/
	QueryFeaturesSet[QueryFeaturesSet["Hyperlink"] = 8] = "Hyperlink";
	return QueryFeaturesSet;
}({});
/**
* An abstract MapGuide service client
*
*
* @abstract
* @class RequestBuilder
*/
var RequestBuilder = class {
	constructor(agentUri) {
		this.agentUri = agentUri;
	}
};
//#endregion
//#region src/utils/site-version.ts
/**
* Gets the MapGuide site version from the runtime map response
* @param map 
* @since 0.12
*/
function getSiteVersion(map) {
	return parseSiteVersion(map.SiteVersion);
}
/**
* Parses the given version string
* 
* @param ver The version string
* @since 0.14.8
*/
function parseSiteVersion(ver) {
	const [sMaj, sMin, sPatch, sRev] = ver.split(".");
	return [
		parseInt(sMaj, 10),
		parseInt(sMin, 10),
		parseInt(sPatch, 10),
		parseInt(sRev, 10)
	];
}
/**
* Tests if QUERYMAPFEATURES 4.0.0 API can be used with this version of MapGuide
* @param version The site version
* @since 0.12.1
*/
function canUseQueryMapFeaturesV4(version) {
	const [vMaj, vMin, vPatch, vRev] = version;
	if (vMaj >= 4) {
		if (vMaj == 4 && vMin == 0 && vPatch == 0 && vRev == 0) return true;
		if (vMaj == 4 && vMin == 0 && vPatch == 0) return vRev > 9592;
		return true;
	}
	return false;
}
//#endregion
//#region src/api/builders/mapagent.ts
init_objectSpread2();
var _MapAgentRequestBuilder;
var deArrayifyModulePromise$1 = __vitePreload(() => import("./chunks/deArrayify-debug.js"), [], import.meta.url);
var MG_MAPAGENT_ERROR_CODE = 559;
/**
* Indicates if the given response is an error response
*
* @param {Response} response
* @returns {boolean}
*/
function isErrorResponse(response) {
	return !response.ok || response.status === MG_MAPAGENT_ERROR_CODE;
}
/**
* Encodes the given object for a POST submission
*

* @param {*} data
* @returns {string}
*/
function serialize(data, uppercase = true) {
	return Object.keys(data).map((keyName) => {
		return encodeURIComponent(uppercase ? keyName.toUpperCase() : keyName) + "=" + encodeURIComponent(data[keyName]);
	}).join("&");
}
/**
* The mapagent client
*
* @class MapAgentRequestBuilder
* @extends {RequestBuilder}
*/
var MapAgentRequestBuilder = class MapAgentRequestBuilder extends RequestBuilder {
	constructor(agentUri, locale = "en") {
		super(agentUri);
		this.locale = locale;
	}
	getRawJson(url) {
		return _asyncToGenerator(function* () {
			const response = yield fetch(url, {
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				method: "GET"
			});
			if (isErrorResponse(response)) throw new MgError(response.statusText);
			return yield response.json();
		})();
	}
	extractCleanResourceJson(json) {
		if (json === null || json === void 0 ? void 0 : json.ApplicationDefinition) return json.ApplicationDefinition;
		if (json === null || json === void 0 ? void 0 : json.WebLayout) return json.WebLayout;
		if (json === null || json === void 0 ? void 0 : json.MapDefinition) return json.MapDefinition;
		if (json === null || json === void 0 ? void 0 : json.TileSetDefinition) return json.TileSetDefinition;
		return json;
	}
	extractCleanRuntimeMapJson(json) {
		if (json === null || json === void 0 ? void 0 : json.RuntimeMap) return json.RuntimeMap;
		if (json === null || json === void 0 ? void 0 : json.Map) return json.Map;
		return json;
	}
	canUseCleanResourceContent() {
		var _this = this;
		return _asyncToGenerator(function* () {
			const [major] = parseSiteVersion((yield _this.getSiteVersion()).Version);
			return major >= 4;
		})();
	}
	get(url) {
		return _asyncToGenerator(function* () {
			const response = yield fetch(url, {
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				method: "GET"
			});
			if (isErrorResponse(response)) throw new MgError(response.statusText);
			else {
				const json = yield response.json();
				const { deArrayify } = yield deArrayifyModulePromise$1;
				return deArrayify(json);
			}
		})();
	}
	post(url, data) {
		return _asyncToGenerator(function* () {
			if (!data.format) data.format = "application/json";
			const response = yield fetch(url, {
				headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
				method: "POST",
				body: serialize(data)
			});
			if (isErrorResponse(response)) throw new MgError(response.statusText);
			else {
				const json = yield response.json();
				const { deArrayify } = yield deArrayifyModulePromise$1;
				return deArrayify(json);
			}
		})();
	}
	stringifyGetUrl(options) {
		if (!options.version) options.version = "1.0.0";
		if (!options.locale) options.locale = this.locale;
		if (!options.format) options.format = "application/json";
		let url = this.agentUri;
		let bFirst = true;
		for (const key in options) if (bFirst) {
			url += `?${key.toUpperCase()}=${options[key]}`;
			bFirst = false;
		} else url += `&${key.toUpperCase()}=${options[key]}`;
		return url;
	}
	createSession(username, password) {
		var _this2 = this;
		return _asyncToGenerator(function* () {
			const url = _this2.agentUri;
			const response = yield fetch(url, {
				headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
				method: "POST",
				body: serialize({
					operation: "CREATESESSION",
					version: "1.0.0",
					USERNAME: username,
					PASSWORD: password
				})
			});
			if (isErrorResponse(response)) throw new MgError(response.statusText);
			else return yield response.text();
		})();
	}
	getServerSessionTimeout(session) {
		var _this3 = this;
		return _asyncToGenerator(function* () {
			const url = _this3.agentUri;
			const response = yield fetch(url, {
				headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
				method: "POST",
				body: serialize({
					operation: "GETSESSIONTIMEOUT",
					version: "1.0.0",
					SESSION: session
				})
			});
			if (isErrorResponse(response)) throw new MgError(response.statusText);
			else {
				const val = yield response.text();
				return parseInt(val, 10);
			}
		})();
	}
	getResource(resourceId, args) {
		var _this4 = this;
		return _asyncToGenerator(function* () {
			if (args != null) {
				if (typeof resourceId === "string" && /applicationdefinition$/i.test(resourceId.trim()) && (yield _this4.canUseCleanResourceContent())) {
					const p1 = {
						operation: "GETRESOURCECONTENT",
						resourceId,
						version: "4.0.0",
						clean: 1
					};
					const url = _this4.stringifyGetUrl(_objectSpread2(_objectSpread2({}, args), p1));
					const json = yield _this4.getRawJson(url);
					return _this4.extractCleanResourceJson(json);
				}
				const p1 = {
					operation: "GETRESOURCECONTENT",
					resourceId
				};
				const url = _this4.stringifyGetUrl(_objectSpread2(_objectSpread2({}, args), p1));
				return yield _this4.get(url);
			} else {
				const url = _this4.stringifyGetUrl({
					operation: "GETRESOURCE",
					resourceId
				});
				return yield _this4.get(url);
			}
		})();
	}
	getSiteVersion() {
		const cached = MapAgentRequestBuilder.siteVersionCache.get(this.agentUri);
		if (cached) return cached;
		const url = this.stringifyGetUrl(_objectSpread2({}, {
			operation: "GETSITEVERSION",
			version: "1.0.0",
			username: "Anonymous"
		}));
		const pending = this.get(url).catch((error) => {
			MapAgentRequestBuilder.siteVersionCache.delete(this.agentUri);
			throw error;
		});
		MapAgentRequestBuilder.siteVersionCache.set(this.agentUri, pending);
		return pending;
	}
	createRuntimeMap(options) {
		const url = this.stringifyGetUrl(_objectSpread2(_objectSpread2({}, options), {
			operation: "CREATERUNTIMEMAP",
			version: "3.0.0"
		}));
		return this.get(url);
	}
	createRuntimeMap_v4(options) {
		var _this5 = this;
		return _asyncToGenerator(function* () {
			const url = _this5.stringifyGetUrl(_objectSpread2(_objectSpread2({}, options), {
				operation: "CREATERUNTIMEMAP",
				version: "4.0.0",
				clean: 1
			}));
			const json = yield _this5.getRawJson(url);
			return _this5.extractCleanRuntimeMapJson(json);
		})();
	}
	queryMapFeatures(options) {
		return this.post(this.agentUri, _objectSpread2(_objectSpread2({}, options), {
			operation: "QUERYMAPFEATURES",
			version: "2.6.0"
		}));
	}
	queryMapFeatures_v4(options) {
		return this.post(this.agentUri, _objectSpread2(_objectSpread2({}, options), {
			operation: "QUERYMAPFEATURES",
			version: "4.0.0"
		}));
	}
	describeRuntimeMap(options) {
		const url = this.stringifyGetUrl(_objectSpread2(_objectSpread2({}, options), {
			operation: "DESCRIBERUNTIMEMAP",
			version: "3.0.0"
		}));
		return this.get(url);
	}
	describeRuntimeMap_v4(options) {
		var _this6 = this;
		return _asyncToGenerator(function* () {
			const url = _this6.stringifyGetUrl(_objectSpread2(_objectSpread2({}, options), {
				operation: "DESCRIBERUNTIMEMAP",
				version: "4.0.0",
				clean: 1
			}));
			const json = yield _this6.getRawJson(url);
			return _this6.extractCleanRuntimeMapJson(json);
		})();
	}
	getTileTemplateUrl(resourceId, groupName, xPlaceholder, yPlaceholder, zPlaceholder, isXYZ) {
		if (isXYZ) return `${this.agentUri}?OPERATION=GETTILEIMAGE&VERSION=1.2.0&USERNAME=Anonymous&MAPDEFINITION=${resourceId}&BASEMAPLAYERGROUPNAME=${groupName}&TILECOL=${yPlaceholder}&TILEROW=${xPlaceholder}&SCALEINDEX=${zPlaceholder}`;
		else return `${this.agentUri}?OPERATION=GETTILEIMAGE&VERSION=1.2.0&USERNAME=Anonymous&MAPDEFINITION=${resourceId}&BASEMAPLAYERGROUPNAME=${groupName}&TILECOL=${xPlaceholder}&TILEROW=${yPlaceholder}&SCALEINDEX=${zPlaceholder}`;
	}
};
_MapAgentRequestBuilder = MapAgentRequestBuilder;
_MapAgentRequestBuilder.siteVersionCache = /* @__PURE__ */ new Map();
//#endregion
//#region src/api/builders/factory.ts
var _builders = {};
/**
* Registers a factory for creating request builders for the given kind. This only needs to be called in the entry point of your custom viewer bundle.
* 
* @param kind 
* @param factory 
* @since 0.13
*/
function registerRequestBuilder(kind, factory) {
	_builders[kind] = factory;
}
/**
* Creates the request builder for the given kind
* 
* @param agentUri 
* @param kind 
* @since 0.13
*/
function createRequestBuilder(agentUri, kind) {
	if (_builders[kind]) return _builders[kind](agentUri);
	throw new MgError(`Unknown or unsupported client kind: ${kind}`);
}
//#endregion
//#region src/api/client.ts
/**
* The MapGuide HTTP client
*
* @class Client
*/
var Client = class {
	constructor(agentUri, kind) {
		this.builder = createRequestBuilder(agentUri, kind);
	}
	getText(url) {
		return _asyncToGenerator(function* () {
			const r = yield fetch(url);
			if (!r.ok) throw new MgError(r.statusText);
			return yield r.text();
		})();
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
				if (isErrorResponse(response)) throw new MgError(response.statusText);
				else resolve(response.json());
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
		if (!data.format) data.format = "application/json";
		return new Promise((resolve, reject) => {
			fetch(url, {
				headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
				method: "POST",
				body: serialize(data)
			}).then((response) => {
				if (isErrorResponse(response)) throw new MgError(response.statusText);
				else resolve(response.json());
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
};
//#endregion
//#region src/api/builders/selection-utils.ts
function buildSelectionXml(selection, layerIds) {
	let idCount = 0;
	let xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
	xml += "<FeatureSet xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"FeatureSet-1.0.0.xsd\">";
	if (selection) {
		const selLayers = selection.Layer;
		for (const layer of selLayers) {
			const layerId = layer["@id"];
			if (layerIds != null && layerIds.indexOf(layerId) < 0) continue;
			const cls = layer.Class;
			if (cls.ID.length === 0) continue;
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
			let xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
			xml += "<FeatureSet xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"FeatureSet-1.0.0.xsd\">";
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
//#endregion
//#region src/api/session-store.ts
/**
* session-store.ts
* 
* A thin-wrapper layer over local storage for storing any data related to viewer sessions
*/
/**
* @since 0.12
*/
function clearSessionStore() {
	return _clearSessionStore.apply(this, arguments);
}
function _clearSessionStore() {
	_clearSessionStore = _asyncToGenerator(function* () {
		try {
			for (const key in window.localStorage) if (strStartsWith(key, "selection_")) window.localStorage.removeItem(key);
		} catch (e) {}
	});
	return _clearSessionStore.apply(this, arguments);
}
function encodeKey(sessionId, mapName) {
	return `selection_${sessionId}_${mapName}`;
}
function persistSelectionSetToLocalStorage(_x, _x2, _x3) {
	return _persistSelectionSetToLocalStorage.apply(this, arguments);
}
function _persistSelectionSetToLocalStorage() {
	_persistSelectionSetToLocalStorage = _asyncToGenerator(function* (sessionId, mapName, resp) {
		const key = encodeKey(sessionId, mapName);
		const value = JSON.stringify(resp);
		try {
			window.localStorage.setItem(key, value);
		} catch (e) {}
	});
	return _persistSelectionSetToLocalStorage.apply(this, arguments);
}
function retrieveSelectionSetFromLocalStorage(_x4, _x5) {
	return _retrieveSelectionSetFromLocalStorage.apply(this, arguments);
}
function _retrieveSelectionSetFromLocalStorage() {
	_retrieveSelectionSetFromLocalStorage = _asyncToGenerator(function* (sessionId, mapName) {
		const key = encodeKey(yield sessionId.getValueAsync(), mapName);
		const content = window.localStorage.getItem(key);
		if (content) return JSON.parse(content);
	});
	return _retrieveSelectionSetFromLocalStorage.apply(this, arguments);
}
//#endregion
//#region src/utils/array.ts
/**
* Returns a unique array of strings from the given array
* @param items The array of strings to make unique
* @since 0.13
*/
function makeUnique(items) {
	const a = [];
	for (let i = 0, l = items.length; i < l; i++) if (a.indexOf(items[i]) === -1 && items[i] !== "") a.push(items[i]);
	return a;
}
/**
* Indicates if the given arrays are different (content-wise)
* @param arr 
* @param other 
* @since 0.13
*/
function areArraysDifferent(arr, other, equalityFn) {
	if (arr && other) if (arr.length != other.length) return true;
	else {
		for (let i = 0; i < arr.length; i++) if (equalityFn) {
			if (!equalityFn(arr[i], other[i])) return true;
		} else if (arr[i] !== other[i]) return true;
		return false;
	}
	else return true;
}
//#endregion
//#region src/utils/viewer-state.ts
/**
* Determines if the given IMapView instances are equal or close to it
*
* @param {(IMapView | undefined)} view
* @param {(IMapView | undefined)} otherView
* @returns {boolean}
*/
function areViewsCloseToEqual(view, otherView) {
	if (view && otherView) {
		const basePartsEqual = areNumbersEqual(view.x, otherView.x) && areNumbersEqual(view.y, otherView.y) && areNumbersEqual(view.scale, otherView.scale);
		if (view.resolution != null && otherView.resolution != null) return basePartsEqual && areNumbersEqual(view.resolution, otherView.resolution);
		else if (view.resolution == null && otherView.resolution != null || view.resolution != null && otherView.resolution == null) return false;
		else return basePartsEqual;
	} else return false;
}
/**
* Indicates if the given layer transparency sets are different
* @param set 
* @param other 
*/
function layerTransparencyChanged(set, other) {
	if (!set && other || set && !other) return true;
	const s = set !== null && set !== void 0 ? set : {};
	const o = other !== null && other !== void 0 ? other : {};
	const setLayers = Object.keys(s);
	if (areArraysDifferent(setLayers, Object.keys(o))) return true;
	for (const name of setLayers) if (s[name] != o[name]) return true;
	return false;
}
//#endregion
//#region src/api/registry/projections.ts
var import_lodash_xor = /* @__PURE__ */ __toESM(require_lodash_xor());
var import_lodash_xorby = /* @__PURE__ */ __toESM(require_lodash_xorby());
/**
* Performs a projection definititon lookup for the given EPSG code
*
* @param {string | number} epsg
* @param {string} locale
* @param {string} mapDef
* @returns {Promise<any>}
* @since 0.13
* @since 0.14.10 - Renamed to resolveProjectionFromEpsgCodeAsync from resolveProjectionFromEpsgIoAsync as this no longer hits epsg.io
*/
function resolveProjectionFromEpsgCodeAsync(_x, _x2, _x3) {
	return _resolveProjectionFromEpsgCodeAsync.apply(this, arguments);
}
function _resolveProjectionFromEpsgCodeAsync() {
	_resolveProjectionFromEpsgCodeAsync = _asyncToGenerator(function* (epsg, locale, mapDef) {
		const r = yield fetch(`https://spatialreference.org/ref/epsg/${epsg}/proj4.txt`);
		if (r.ok) {
			const defn = yield r.text();
			proj4.defs(`EPSG:${epsg}`, defn);
			debug(`Registered projection EPSG:${epsg} from spatialreference.org`);
			return proj4.defs[`EPSG:${epsg}`];
		} else throw new MgError(tr("INIT_ERROR_UNREGISTERED_EPSG_CODE", locale, {
			epsg,
			mapDefinition: mapDef
		}));
	});
	return _resolveProjectionFromEpsgCodeAsync.apply(this, arguments);
}
/**
* Ensures the given projection (by EPSG code) exists and if not invokes the given factory function (or does an epsg lookup)
* to fetch the definition to be registered.
* 
* Once registered, it will update the projection set within OpenLayers
* 
* @param {number} epsgCode
* @param {() => Promise<string>} [factoryIfNotFound] A custom factory function to provide the required proj4js string for this projection. If not specified, an external epsg lookup will be done instead
* @param {string} alias
* @returns {Promise<string>}
* @since 0.13
*/
function ensureProjection(_x4, _x5, _x6, _x7) {
	return _ensureProjection.apply(this, arguments);
}
function _ensureProjection() {
	_ensureProjection = _asyncToGenerator(function* (epsgCode, locale, alias, factoryIfNotFound) {
		let resolvedName;
		let bAdded = false;
		const name = `EPSG:${epsgCode}`;
		if (proj4.defs[name]) resolvedName = name;
		else if (factoryIfNotFound) {
			proj4.defs[name] = factoryIfNotFound();
			bAdded = true;
			resolvedName = name;
		} else {
			yield resolveProjectionFromEpsgCodeAsync(epsgCode, locale, "");
			resolvedName = name;
		}
		if (!strIsNullOrEmpty(alias) && !proj4.defs[alias]) {
			proj4.defs[alias] = proj4.defs[resolvedName];
			bAdded = true;
		}
		if (bAdded) register(proj4);
		return [epsgCode, resolvedName];
	});
	return _ensureProjection.apply(this, arguments);
}
//#endregion
//#region src/api/lazy.ts
var AsyncLazy = class {
	constructor(value) {
		this.value = value;
	}
	getValueAsync() {
		if (!this._value) this._value = this.value();
		return this._value;
	}
};
//#endregion
//#region src/utils/units.tsx
var mUnits = [
	{
		name: "Unknown",
		localizedName: (locale) => tr("UNIT_UNKNOWN", locale),
		abbreviation: (locale) => tr("UNIT_ABBR_UNKNOWN", locale),
		unitsPerMeter: 1,
		metersPerUnit: 1
	},
	{
		name: "Inches",
		localizedName: (locale) => tr("UNIT_INCHES", locale),
		abbreviation: (locale) => tr("UNIT_ABBR_INCHES", locale),
		unitsPerMeter: 39.370079,
		metersPerUnit: .0254
	},
	{
		name: "Feet",
		localizedName: (locale) => tr("UNIT_FEET", locale),
		abbreviation: (locale) => tr("UNIT_ABBR_FEET", locale),
		unitsPerMeter: 3.2808,
		metersPerUnit: .3048
	},
	{
		name: "Yards",
		localizedName: (locale) => tr("UNIT_YARDS", locale),
		abbreviation: (locale) => tr("UNIT_ABBR_YARDS", locale),
		unitsPerMeter: 1.0936133,
		metersPerUnit: .9144
	},
	{
		name: "Miles",
		localizedName: (locale) => tr("UNIT_MILES", locale),
		abbreviation: (locale) => tr("UNIT_ABBR_MILES", locale),
		unitsPerMeter: 62137e-8,
		metersPerUnit: 1609.344
	},
	{
		name: "Nautical Miles",
		localizedName: (locale) => tr("UNIT_NAUT_MILES", locale),
		abbreviation: (locale) => tr("UNIT_ABBR_NAUT_MILES", locale),
		unitsPerMeter: .000539956803,
		metersPerUnit: 1852
	},
	{
		name: "Millimeters",
		localizedName: (locale) => tr("UNIT_MILLIMETERS", locale),
		abbreviation: (locale) => tr("UNIT_ABBR_MILLIMETERS", locale),
		unitsPerMeter: 1e3,
		metersPerUnit: .001
	},
	{
		name: "Centimeters",
		localizedName: (locale) => tr("UNIT_CENTIMETERS", locale),
		abbreviation: (locale) => tr("UNIT_ABBR_CENTIMETERS", locale),
		unitsPerMeter: 100,
		metersPerUnit: .01
	},
	{
		name: "Meters",
		localizedName: (locale) => tr("UNIT_METERS", locale),
		abbreviation: (locale) => tr("UNIT_ABBR_METERS", locale),
		unitsPerMeter: 1,
		metersPerUnit: 1
	},
	{
		name: "Kilometers",
		localizedName: (locale) => tr("UNIT_KILOMETERS", locale),
		abbreviation: (locale) => tr("UNIT_ABBR_KILOMETERS", locale),
		unitsPerMeter: .001,
		metersPerUnit: 1e3
	},
	{
		name: "Degrees",
		localizedName: (locale) => tr("UNIT_DEGREES", locale),
		abbreviation: (locale) => tr("UNIT_ABBR_DEGREES", locale),
		unitsPerMeter: 9044e-9,
		metersPerUnit: 111061.75033
	},
	{
		name: "Decimal Degrees",
		localizedName: (locale) => tr("UNIT_DEC_DEGREES", locale),
		abbreviation: (locale) => tr("UNIT_ABBR_DEC_DEGREES", locale),
		unitsPerMeter: 9044e-9,
		metersPerUnit: 111061.75033
	},
	{
		name: "Degrees Minutes Seconds",
		localizedName: (locale) => tr("UNIT_DMS", locale),
		abbreviation: (locale) => tr("UNIT_ABBR_DMS", locale),
		unitsPerMeter: 9044e-9,
		metersPerUnit: 111061.75033
	},
	{
		name: "Pixels",
		localizedName: (locale) => tr("UNIT_PIXELS", locale),
		abbreviation: (locale) => tr("UNIT_ABBR_PIXELS", locale),
		unitsPerMeter: 1,
		metersPerUnit: 1
	}
];
/**
* Gets all available units of measure
* @since 0.12.2
*/
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
/**
* 
* @param unit The unit of measure
* @returns 
* 
* @since 0.15 Replaces getUnits function which has been removed
*/
function getUnitOfMeasure(unit) {
	return mUnits[unit] || mUnits[0];
}
/**
* Utility function to compute the physical map size based on the given display size and various display settings
* 
* @since 0.11
* @param {[number, number]} displaySize 
* @param {number} metersPerUnit 
* @param {UnitOfMeasure} units 
* @param {number} [resolution] 
* @param {number} [precision] 
* @returns {[number, number]} 
*/
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
/**
* Attempts to be parse unit information for the given mentor CS code 
* 
* @param csCode 
* @since 0.14.3
* @returns 
*/
function tryParseArbitraryCs(csCode) {
	if (!strIsNullOrEmpty(csCode) && strStartsWith(csCode, "XY-")) switch (csCode.substring(3)) {
		case "M": return {
			code: csCode,
			units: UnitOfMeasure.Meters
		};
		case "FT": return {
			code: csCode,
			units: UnitOfMeasure.Feet
		};
		case "IN": return {
			code: csCode,
			units: UnitOfMeasure.Inches
		};
		case "CM": return {
			code: csCode,
			units: UnitOfMeasure.Centimeters
		};
		case "KM": return {
			code: csCode,
			units: UnitOfMeasure.Kilometers
		};
		case "YD": return {
			code: csCode,
			units: UnitOfMeasure.Yards
		};
		case "MM": return {
			code: csCode,
			units: UnitOfMeasure.Millimeters
		};
		case "MI": return {
			code: csCode,
			units: UnitOfMeasure.Miles
		};
		case "NM": return {
			code: csCode,
			units: UnitOfMeasure.NauticalMiles
		};
		case "PX": return {
			code: csCode,
			units: UnitOfMeasure.Pixels
		};
	}
}
//#endregion
//#region src/actions/map.ts
var map_exports = /* @__PURE__ */ __exportAll({
	activateMap: () => activateMap,
	addClientSelectedFeature: () => addClientSelectedFeature,
	addMapLayerBusyWorker: () => addMapLayerBusyWorker,
	clearClientSelection: () => clearClientSelection,
	combineSelections: () => combineSelections,
	enableSelectDragPan: () => enableSelectDragPan,
	externalLayersReady: () => externalLayersReady,
	invokeCommand: () => invokeCommand,
	mapLayerAdded: () => mapLayerAdded,
	mapResized: () => mapResized,
	nextView: () => nextView,
	previousView: () => previousView,
	queryMapFeatures: () => queryMapFeatures,
	removeMapLayer: () => removeMapLayer,
	removeMapLayerBusyWorker: () => removeMapLayerBusyWorker,
	setActiveMap: () => setActiveMap,
	setActiveTool: () => setActiveTool,
	setBaseLayer: () => setBaseLayer,
	setBusyCount: () => setBusyCount,
	setComparisonMode: () => setComparisonMode,
	setCurrentView: () => setCurrentView,
	setFeatureTooltipsEnabled: () => setFeatureTooltipsEnabled,
	setHeatmapLayerBlur: () => setHeatmapLayerBlur,
	setHeatmapLayerRadius: () => setHeatmapLayerRadius,
	setLayerTransparency: () => setLayerTransparency,
	setManualFeatureTooltipsEnabled: () => setManualFeatureTooltipsEnabled,
	setMapLayerIndex: () => setMapLayerIndex,
	setMapLayerOpacity: () => setMapLayerOpacity,
	setMapLayerVectorStyle: () => setMapLayerVectorStyle,
	setMapLayerVisibility: () => setMapLayerVisibility,
	setMapSwipeMode: () => setMapSwipeMode,
	setMouseCoordinates: () => setMouseCoordinates,
	setScale: () => setScale,
	setSelection: () => setSelection,
	setSpyCursorRadius: () => setSpyCursorRadius,
	setSwipePosition: () => setSwipePosition,
	setViewRotation: () => setViewRotation,
	setViewRotationEnabled: () => setViewRotationEnabled,
	setViewSizeUnits: () => setViewSizeUnits,
	showSelectedFeature: () => showSelectedFeature,
	updateMapSwipePosition: () => updateMapSwipePosition
});
init_objectSpread2();
function combineSelectedFeatures(oldRes, newRes) {
	return (0, import_lodash_xorby.default)(oldRes, newRes, (f) => f.SelectionKey);
}
function combineSelectedFeatureSets(oldRes, newRes) {
	if (oldRes == null) return newRes;
	const merged = { SelectedLayer: [] };
	for (const layer of oldRes.SelectedLayer) merged.SelectedLayer.push(layer);
	if (newRes) for (const layer of newRes.SelectedLayer) {
		const layerId = layer["@id"];
		const layerName = layer["@name"];
		const existing = merged.SelectedLayer.filter((l) => l["@id"] == layerId && l["@name"] == layerName);
		if (existing.length == 0) merged.SelectedLayer.push(layer);
		else existing[0].Feature = combineSelectedFeatures(existing[0].Feature, layer.Feature);
	}
	return merged;
}
function combineFeatureSets(oldRes, newRes) {
	if (oldRes == null) return newRes;
	const merged = { Layer: [] };
	for (const layer of oldRes.Layer) merged.Layer.push(layer);
	if (newRes) for (const layer of newRes.Layer) {
		const layerId = layer["@id"];
		const existing = merged.Layer.filter((l) => l["@id"] == layerId);
		if (existing.length == 0) merged.Layer.push(layer);
		else existing[0].Class.ID = (0, import_lodash_xor.default)(existing[0].Class.ID, layer.Class.ID);
	}
	return merged;
}
/**
* @hidden Exported just to be unit testable
*/
function combineSelections(oldRes, newRes) {
	if (oldRes) return {
		SelectedFeatures: combineSelectedFeatureSets(oldRes.SelectedFeatures, newRes.SelectedFeatures),
		FeatureSet: combineFeatureSets(oldRes.FeatureSet, newRes.FeatureSet),
		Hyperlink: void 0,
		InlineSelectionImage: void 0
	};
	else return newRes;
}
function queryMapFeaturesHelper(_x, _x2, _x3, _x4, _x5) {
	return _queryMapFeaturesHelper.apply(this, arguments);
}
function _queryMapFeaturesHelper() {
	_queryMapFeaturesHelper = _asyncToGenerator(function* (map, client, opts, selectionSet, dispatch) {
		const mapName = map.Name;
		const isV4 = canUseQueryMapFeaturesV4(getSiteVersion(map));
		const queryOp = isV4 ? (opts) => client.queryMapFeatures_v4(opts) : (opts) => client.queryMapFeatures(opts);
		const isAppendingWithAttributesOnOldMapGuide = !isV4 && opts.append === true && opts.options.persist === 1 && opts.options.requestdata !== void 0 && opts.options.requestdata & QueryFeaturesSet.Attributes;
		if (isAppendingWithAttributesOnOldMapGuide) {
			debug("Not asking for attributes in first QUERYMAPFEATURES");
			opts.options.requestdata &= ~QueryFeaturesSet.Attributes;
		}
		const res = yield queryOp(opts.options);
		if (opts.options.persist === 1) if (opts.append === true) {
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
		else return res;
	});
	return _queryMapFeaturesHelper.apply(this, arguments);
}
/**
* Queries map features
*
* @param {string} mapName The name of the current runtime map
* @param {QueryMapFeatureActionOptions} opts query options
* @returns {ReduxThunkedAction}
*/
function queryMapFeatures(mapName, opts) {
	return (dispatch, getState) => {
		const state = getState();
		const args = state.config;
		const map = getRuntimeMap(state);
		const selectionSet = getSelectionSet(state);
		if (map && args.agentKind && args.agentUri) {
			const client = new Client(args.agentUri, args.agentKind);
			const success = (res) => {
				if (opts.callback != null) opts.callback(res);
			};
			const failure = (err) => {
				if (opts.errBack != null) opts.errBack(err);
			};
			queryMapFeaturesHelper(map, client, opts, selectionSet, dispatch).then((r) => success(r)).catch((e) => failure(e));
		}
	};
}
/**
* Sets the current map view.
*
* NOTE: Subscribing components are not guaranteed to receive every new view change sent by
* calling this method. For purposes of optimization, views passed in that are "close enough"
* to the current view are not dispatched to subscribing components.
* 
* @param {IMapView} view The map view to set
* @returns {ReduxThunkedAction}
*/
function setCurrentView(view) {
	return (dispatch, getState) => {
		const state = getState();
		const currentView = getCurrentView(state);
		const newView = _objectSpread2({}, view);
		const mapName = state.config.activeMapName;
		let dispatchThis = true;
		if (currentView && mapName) {
			var _mapState$mapguide;
			const mapState = state.mapState[mapName];
			const fs = mapState === null || mapState === void 0 || (_mapState$mapguide = mapState.mapguide) === null || _mapState$mapguide === void 0 || (_mapState$mapguide = _mapState$mapguide.runtimeMap) === null || _mapState$mapguide === void 0 ? void 0 : _mapState$mapguide.FiniteDisplayScale;
			if (fs && fs.length > 0) newView.scale = fs[getFiniteScaleIndexForScale(fs, newView.scale)];
			if (areViewsCloseToEqual(currentView, newView)) dispatchThis = false;
		}
		if (dispatchThis && mapName) dispatch({
			type: ActionType.MAP_SET_VIEW,
			payload: {
				mapName,
				view: newView
			}
		});
	};
}
/**
* Sends a map resized notification
* 
* @param {number} width 
* @param {number} height 
* @returns {IMapResizedAction} 
*/
function mapResized(width, height) {
	return {
		type: ActionType.MAP_RESIZED,
		payload: {
			width,
			height
		}
	};
}
/**
* Sets the selection set for the given map
* 
* @param mapName 
* @param selectionSet 
* @returns 
* 
* @since 0.14 Fixed up the type of selectionSet parameter
*/
function setSelection(mapName, selectionSet) {
	return {
		type: ActionType.MAP_SET_SELECTION,
		payload: {
			mapName,
			selection: selectionSet
		}
	};
}
/**
* Invokes the specified command
*
* @param {ICommand} cmd
* @param {IMapProviderContext} viewer
* @param {Record<string, unknown>} [parameters]
* @returns {ReduxThunkedAction}
* 
* @since 0.15 Added viewer argument and stronger-typed parameters argument
*/
function invokeCommand(cmd, viewer, parameters) {
	return (dispatch, getState) => {
		return cmd.invoke(dispatch, getState, viewer, parameters);
	};
}
/**
* Sets the busy count of the viewer. A value greater than zero signifies that the viewer is currently
* busy performing various actions (eg. Loading/Rendering the current map image)
*
* @param {number} busyCount The current busy count
* @returns {IMapSetBusyCountAction}
*/
function setBusyCount(busyCount) {
	return {
		type: ActionType.MAP_SET_BUSY_COUNT,
		payload: busyCount
	};
}
/**
* Set the given external base layer as the active base layer
*
* @param {string} mapName The name of the current runtime map
* @param {string} layerName The name of the external base layer to set as active
* @returns
*/
function setBaseLayer(mapName, layerName) {
	return {
		type: ActionType.MAP_SET_BASE_LAYER,
		payload: {
			mapName,
			layerName
		}
	};
}
/**
* Sets the view scale
*
* @param {IMapProviderContext} viewer The viewer instance
* @param {string} mapName The name of the current runtime map
* @param {number} scale The scale to set
* @returns
* 
* @since 0.15 Added viewer parameter
*/
function setScale(viewer, mapName, scale) {
	let resolution;
	if (viewer.isReady()) resolution = viewer.scaleToResolution(scale);
	return {
		type: ActionType.MAP_SET_SCALE,
		payload: {
			mapName,
			scale,
			resolution
		}
	};
}
/**
* Sets the current mouse coordinates
*
* @param {string} mapName The name of the current runtime map
* @param {*} coord The current mouse coordinates
* @returns
*/
function setMouseCoordinates(mapName, coord) {
	return {
		type: ActionType.UPDATE_MOUSE_COORDINATES,
		payload: {
			mapName,
			coord
		}
	};
}
/**
* Set the transparency for the given OL layer
*
* @param {string} mapName The name of the current runtime map
* @param {string} layerName The name of the OL layer
* @param {number} opacity A value between 0 and 1. 1 - Fully Opaque, 0 - Fully Transparent
* @returns 
*/
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
/**
* Sets the units for the map view size display
*
* @param {UnitOfMeasure} unit 
* @returns {IMapSetViewSizeUnitsAction} 
*/
function setViewSizeUnits(unit) {
	return {
		type: ActionType.MAP_SET_VIEW_SIZE_UNITS,
		payload: unit
	};
}
/**
* Goes back to the previous view on the navigation stack
*
* @param {string} mapName The name of the current runtime map
* @returns
*/
function previousView(mapName) {
	return {
		type: ActionType.MAP_PREVIOUS_VIEW,
		payload: { mapName }
	};
}
/**
* Goes to the next view on the navigation stack
*
* @param {string} mapName The name of the current runtime amp
* @returns
*/
function nextView(mapName) {
	return {
		type: ActionType.MAP_NEXT_VIEW,
		payload: { mapName }
	};
}
/**
* Sets the active map tool
*
* @param {ActiveMapTool} tool The active map tool command
* @returns
*/
function setActiveTool(tool) {
	return {
		type: ActionType.MAP_SET_ACTIVE_TOOL,
		payload: tool
	};
}
/**
* Sets the active runtime map
*
* @param {string} mapName The name of the runtime map to set as active
* @returns
*/
function setActiveMap(mapName) {
	return {
		type: ActionType.MAP_SET_ACTIVE_MAP,
		payload: mapName
	};
}
/**
* Activates the given runtime map by name. If the map has not yet been created (lazy map), it will
* be created on demand before switching to it. This is the preferred way to switch between maps in
* a multi-map flex layout.
*
* @param {string} mapName The name of the runtime map to activate
* @returns {ReduxThunkedAction}
* @since 0.15
*/
function activateMap(mapName) {
	return function() {
		var _ref = _asyncToGenerator(function* (dispatch, getState) {
			var _state$config$pending;
			const state = getState();
			const pendingMap = (_state$config$pending = state.config.pendingMaps) === null || _state$config$pending === void 0 ? void 0 : _state$config$pending[mapName];
			if (pendingMap) {
				const { agentUri, agentKind, locale } = state.config;
				if (agentUri && agentKind) {
					const activeMapName = state.config.activeMapName;
					let sessionId = "";
					if (activeMapName) {
						var _state$mapState$activ, _state$mapState$activ2;
						sessionId = (_state$mapState$activ = (_state$mapState$activ2 = state.mapState[activeMapName]) === null || _state$mapState$activ2 === void 0 || (_state$mapState$activ2 = _state$mapState$activ2.mapguide) === null || _state$mapState$activ2 === void 0 || (_state$mapState$activ2 = _state$mapState$activ2.runtimeMap) === null || _state$mapState$activ2 === void 0 ? void 0 : _state$mapState$activ2.SessionId) !== null && _state$mapState$activ !== void 0 ? _state$mapState$activ : "";
					}
					if (sessionId) try {
						const client = new Client(agentUri, agentKind);
						const useV4 = canUseQueryMapFeaturesV4(parseSiteVersion((yield new AsyncLazy(_asyncToGenerator(function* () {
							return client.getSiteVersion();
						})).getValueAsync()).Version));
						const shouldTryDescribeExisting = state.config.sessionWasReused === true;
						let map;
						if (shouldTryDescribeExisting) try {
							info(`Attempting to describe existing runtime map state (${mapName})`);
							if (useV4) map = yield client.describeRuntimeMap_v4({
								mapname: mapName,
								requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
								session: sessionId
							});
							else map = yield client.describeRuntimeMap({
								mapname: mapName,
								requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
								session: sessionId
							});
						} catch (describeErr) {
							if ((describeErr === null || describeErr === void 0 ? void 0 : describeErr.message) === "MgResourceNotFoundException") {} else throw describeErr;
						}
						if (!map) {
							info(`Lazily creating runtime map state (${mapName}) for: ${pendingMap.mapDef}`);
							if (useV4) map = yield client.createRuntimeMap_v4({
								mapDefinition: pendingMap.mapDef,
								requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
								session: sessionId,
								targetMapName: mapName
							});
							else map = yield client.createRuntimeMap({
								mapDefinition: pendingMap.mapDef,
								requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
								session: sessionId,
								targetMapName: mapName
							});
						}
						if (map) {
							const epsg = map.CoordinateSystem.EpsgCode;
							if (!tryParseArbitraryCs(map.CoordinateSystem.MentorCode) && epsg && epsg !== "0" && !proj4.defs[`EPSG:${epsg}`]) {
								yield resolveProjectionFromEpsgCodeAsync(epsg, locale, map.MapDefinition);
								register(proj4);
							}
							dispatch({
								type: ActionType.MAP_REFRESH,
								payload: {
									mapName,
									map
								}
							});
						}
					} catch (e) {
						var _e$message;
						warn(`Failed to lazily initialize runtime map (${mapName}): ${(_e$message = e === null || e === void 0 ? void 0 : e.message) !== null && _e$message !== void 0 ? _e$message : e}. Proceeding with map switch; the map may not render correctly.`);
					}
					else warn(`Cannot lazily create runtime map (${mapName}): no active session found. Proceeding with map switch; the map may not render correctly.`);
				}
			}
			dispatch(setActiveMap(mapName));
		});
		return function(_x6, _x7) {
			return _ref.apply(this, arguments);
		};
	}();
}
/**
* Sets whether feature tooltips (aka. Map Tips) are enabled
*
* @param {boolean} enabled
* @returns
*/
function setFeatureTooltipsEnabled(enabled) {
	return {
		type: ActionType.MAP_SET_MAPTIP,
		payload: enabled
	};
}
/**
* Sets whether the select tool can pan while dragging
* 
* @param enabled 
* @since 0.14.2
*/
function enableSelectDragPan(enabled) {
	return {
		type: ActionType.MAP_ENABLE_SELECT_DRAGPAN,
		payload: enabled
	};
}
/**
* Sets whether manual feature tooltips (aka. Map Tips) are enabled
*
* @param {boolean} enabled
* @returns
*/
function setManualFeatureTooltipsEnabled(enabled) {
	return {
		type: ActionType.MAP_SET_MANUAL_MAPTIP,
		payload: enabled
	};
}
/**
* Sets the rotation of the current view
*
* @param {number} rotation 
* @returns 
*/
function setViewRotation(rotation) {
	return {
		type: ActionType.MAP_SET_VIEW_ROTATION,
		payload: rotation
	};
}
/**
* Sets whether view rotation is enabled or not
*
* @param {boolean} enabled 
*/
function setViewRotationEnabled(enabled) {
	return {
		type: ActionType.MAP_SET_VIEW_ROTATION_ENABLED,
		payload: enabled
	};
}
/**
* Shows the selected feature on the map
*
* @param {string} mapName 
* @param {string} layerId 
* @param {string} selectionKey 
* @returns {IShowSelectedFeatureAction} 
*/
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
/**
* NOTE: Dispatching this action does not add the layer to the map. This is a means to notify others
* that a new layer has been added. It is expected to be dispatched by any component that is managing
* layers
* 
* @param {string} mapName
* @param {ILayerInfo} layer
* @param {IVectorLayerStyle} [defaultStyle]
* @returns {IAddedLayerAction}
* @since 0.13
* @since 0.14 defaultStyle argument changed to IVectorLayerStyle
*/
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
/**
* An action that signals the externa layers for the given map name is ready. This action
* is only dispatched when there is no external layers to initially add
* 
* @param mapName 
* @since 0.14
*/
function externalLayersReady(mapName) {
	return {
		type: ActionType.EXTERNAL_LAYERS_READY,
		payload: { mapName }
	};
}
/**
* Removes a given external layer for the given map
* 
* @param {string} mapName
* @param {string} layerName
* @returns {IRemoveLayerAction}
* @since 0.13
*/
function removeMapLayer(mapName, layerName) {
	return {
		type: ActionType.REMOVE_LAYER,
		payload: {
			mapName,
			layerName
		}
	};
}
/**
* Sets the display order index for the given external layer for the given map
* 
* @param {string} mapName
* @param {string} layerName
* @param {number} index
* @returns {ISetLayerIndexAction}
* @since 0.13
*/
function setMapLayerIndex(mapName, layerName, index) {
	return {
		type: ActionType.SET_LAYER_INDEX,
		payload: {
			mapName,
			layerName,
			index
		}
	};
}
/**
* Sets the opacity for the given external layer for the given map
* 
* @param {string} mapName
* @param {string} layerName
* @param {number} opacity
* @returns {ISetLayerOpacityAction}
* @since 0.13
*/
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
/**
* Sets the heatmap blur for the given external heatmap layer for the given map
* 
* @param mapName 
* @param layerName 
* @param blur 
*/
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
/**
* Sets the heatmap radius for the given external heatmap layer for the given map
* 
* @param mapName 
* @param layerName 
* @param radius 
*/
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
/**
* Sets the visibility for the given external layer for the given map
* 
* @param {string} mapName
* @param {string} layerName
* @param {boolean} visible
* @returns {ISetLayerVisibilityAction}
* @since 0.13
*/
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
/**
* Sets the vector style for the given external layer for the given map
* 
* @param {string} mapName
* @param {string} layerName
* @param {IVectorLayerStyle} style
* @param {VectorStyleSource} which
* @returns {ISetMapLayerVectorStyle}
* @since 0.13
* @since 0.14 style and which arguments changed to IVectorLayerStyle
*/
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
/**
* Adds a busy worker for the given external layer for the given map
* 
* @param {string} mapName
* @param {string} layerName
* @returns {IAddMapLayerBusyWorkerAction}
* @since 0.13
*/
function addMapLayerBusyWorker(mapName, layerName) {
	return {
		type: ActionType.ADD_LAYER_BUSY_WORKER,
		payload: {
			mapName,
			layerName
		}
	};
}
/**
* Removes a busy worker for the given external layer for the given map
* 
* @param {string} mapName
* @param {string} layerName
* @returns {IRemoveMapLayerBusyWorkerAction}
* @since 0.13
*/
function removeMapLayerBusyWorker(mapName, layerName) {
	return {
		type: ActionType.REMOVE_LAYER_BUSY_WORKER,
		payload: {
			mapName,
			layerName
		}
	};
}
/**
* Adds a feature to the client selection set for the given map
* 
* @param mapName 
* @param layerName 
* @param feature 
* @returns 
* @since 0.14
*/
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
/**
* Clears the client selection set for the given map
* 
* @param mapName 
* @since 0.14
*/
function clearClientSelection(mapName) {
	return {
		type: ActionType.MAP_CLEAR_CLIENT_SELECTION,
		payload: { mapName }
	};
}
/**
* Sets the active comparison mode.
*
* @param {ComparisonMode} mode
* @returns {ISetComparisonModeAction}
* @since 0.15
*/
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
/**
* Updates the swipe position
*
* @param {number} position A value between 0 and 100 representing the swipe slider position
* @returns {ISetSwipePositionAction}
* @since 0.15
*/
function setSwipePosition(position) {
	return {
		type: ActionType.MAP_SET_SWIPE_POSITION,
		payload: { position }
	};
}
function updateMapSwipePosition(position) {
	return setSwipePosition(position);
}
/**
* Updates the spy cursor radius.
*
* @param {number} radius
* @returns {ISetSpyCursorRadiusAction}
* @since 0.15
*/
function setSpyCursorRadius(radius) {
	return {
		type: ActionType.MAP_SET_SPY_CURSOR_RADIUS,
		payload: { radius }
	};
}
//#endregion
//#region src/actions/legend.ts
var legend_exports = /* @__PURE__ */ __exportAll({
	refresh: () => refresh,
	setGroupExpanded: () => setGroupExpanded,
	setGroupVisibility: () => setGroupVisibility,
	setLayerSelectable: () => setLayerSelectable,
	setLayerVisibility: () => setLayerVisibility
});
init_objectSpread2();
/**
* Sets the visibility for the given map group
*
* @param {string} mapName
* @param {{ id: string, value: boolean }} options
* @returns
*/
function setGroupVisibility(mapName, options) {
	return {
		type: ActionType.LEGEND_SET_GROUP_VISIBILITY,
		payload: _objectSpread2(_objectSpread2({}, options), { mapName })
	};
}
/**
* Sets the visibility for the given map layer
*
* @param {string} mapName
* @param {{ id: string, value: boolean }} options
* @returns
*/
function setLayerVisibility(mapName, options) {
	return {
		type: ActionType.LEGEND_SET_LAYER_VISIBILITY,
		payload: _objectSpread2(_objectSpread2({}, options), { mapName })
	};
}
/**
* Sets the expanded/collapsed state of the given group
*
* @param {string} mapName
* @param {{ id: string, value: boolean }} options
* @returns
*/
function setGroupExpanded(mapName, options) {
	return {
		type: ActionType.LEGEND_SET_GROUP_EXPANDABLE,
		payload: _objectSpread2(_objectSpread2({}, options), { mapName })
	};
}
/**
* Sets the selectability state for the given map layer
*
* @param {string} mapName
* @param {{ id: string, value: boolean }} options
* @returns
*/
function setLayerSelectable(mapName, options) {
	return {
		type: ActionType.LEGEND_SET_LAYER_SELECTABLE,
		payload: _objectSpread2(_objectSpread2({}, options), { mapName })
	};
}
/**
* Perform a full refresh with a re-query of the layer/group structure
*
* @returns {ReduxThunkedAction}
*/
function refresh() {
	return (dispatch, getState) => {
		const state = getState();
		const args = state.config;
		if (!args.viewer.isStateless) {
			const map = getRuntimeMap(state);
			if (map && args.agentUri && args.agentKind) new Client(args.agentUri, args.agentKind).describeRuntimeMap({
				mapname: map.Name,
				session: map.SessionId,
				requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups
			}).then((res) => {
				if (args.activeMapName) dispatch({
					type: ActionType.MAP_REFRESH,
					payload: {
						mapName: args.activeMapName,
						map: res
					}
				});
			});
		}
	};
}
//#endregion
//#region src/actions/template.ts
/**
* template.ts
*
* Actions to support fusion templates
*/
var template_exports = /* @__PURE__ */ __exportAll({
	setElementStates: () => setElementStates,
	setLegendVisibility: () => setLegendVisibility,
	setSelectionPanelVisibility: () => setSelectionPanelVisibility,
	setTaskPaneVisibility: () => setTaskPaneVisibility,
	setTemplateCustomData: () => setTemplateCustomData
});
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
/**
* 
* @param name 
* @param value 
* @returns 
* 
* @since 0.14.8
*/
function setTemplateCustomData(name, value) {
	return {
		type: ActionType.FUSION_SET_TEMPLATE_CUSTOM_DATA,
		payload: {
			name,
			value
		}
	};
}
//#endregion
//#region src/api/default-commands.ts
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
	if (value == "right" || value == "left") newPos = [currentExtent[direction[0]], current_center[direction[1]]];
	else newPos = [current_center[direction[0]], currentExtent[direction[1]]];
	dispatch(setCurrentView({
		x: newPos[0],
		y: newPos[1],
		scale: view.scale
	}));
}
/**
* @hidden
*/
function buildTargetedCommand(config, parameters) {
	const cmdTarget = (parameters || {})["Target"];
	const cmdDef = { target: cmdTarget || "NewWindow" };
	if (config.capabilities.hasTaskPane && cmdTarget == "TaskPane") cmdDef.target = "TaskPane";
	if (cmdTarget == "SpecifiedFrame") {
		cmdDef.target = cmdTarget;
		cmdDef.targetFrame = (parameters || {})["TargetFrame"];
	}
	return cmdDef;
}
/**
* Registers the default set of commands into the command registry. This is automatically called by the default viewer
* bundle. If creating your own viewer bundle, be sure to call this function in your entry point, or individually register
* the commands you want to make available in your custom viewer bundle
*/
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
		iconClass: "pan",
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
			if (viewer) viewer.zoomDelta(1);
		}
	});
	registerCommand(DefaultCommands.ZoomOut, {
		iconClass: SPRITE_ZOOM_OUT_FIXED,
		selected: () => false,
		enabled: () => true,
		invoke: (_dispatch, _getState, viewer) => {
			if (viewer) viewer.zoomDelta(-1);
		}
	});
	registerCommand(DefaultCommands.PanLeft, {
		iconClass: SPRITE_PAN_WEST,
		selected: () => false,
		enabled: () => true,
		invoke: (dispatch, _getState, viewer) => {
			if (viewer) panMap(dispatch, viewer, "left");
		}
	});
	registerCommand(DefaultCommands.PanRight, {
		iconClass: SPRITE_PAN_EAST,
		selected: () => false,
		enabled: () => true,
		invoke: (dispatch, _getState, viewer) => {
			if (viewer) panMap(dispatch, viewer, "right");
		}
	});
	registerCommand(DefaultCommands.PanUp, {
		iconClass: SPRITE_PAN_NORTH,
		selected: () => false,
		enabled: () => true,
		invoke: (dispatch, _getState, viewer) => {
			if (viewer) panMap(dispatch, viewer, "up");
		}
	});
	registerCommand(DefaultCommands.PanDown, {
		iconClass: SPRITE_PAN_SOUTH,
		selected: () => false,
		enabled: () => true,
		invoke: (dispatch, _getState, viewer) => {
			if (viewer) panMap(dispatch, viewer, "down");
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
				if (view != null) viewer.zoomToView(view.x, view.y, view.scale);
				else viewer.initialView();
			}
		}
	});
	registerCommand(DefaultCommands.ZoomExtents, {
		iconClass: SPRITE_ZOOM_FULL,
		selected: () => false,
		enabled: () => true,
		invoke: (_dispatch, _getState, viewer) => {
			if (viewer) viewer.initialView();
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
			if (mapName) dispatch(previousView(mapName));
		}
	});
	registerCommand(DefaultCommands.NextView, {
		iconClass: SPRITE_VIEW_FORWARD,
		selected: () => false,
		enabled: CommandConditions.hasNextView,
		invoke: (dispatch, getState) => {
			const mapName = getState().config.activeMapName;
			if (mapName) dispatch(nextView(mapName));
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
				if (parameters === null || parameters === void 0 ? void 0 : parameters["ZoomLevel"]) zoomScale = parseInt(`${parameters["ZoomLevel"]}`, 10);
				if (parameters === null || parameters === void 0 ? void 0 : parameters["EnableHighAccuracy"]) geoOptions.enableHighAccuracy = parameters["EnableHighAccuracy"] == "true";
				if (parameters === null || parameters === void 0 ? void 0 : parameters["Timeout"]) geoOptions.timeout = parseInt(`${parameters["Timeout"]}`, 10);
				if (parameters === null || parameters === void 0 ? void 0 : parameters["MaximumAge"]) geoOptions.maximumAge = parseInt(`${parameters["MaximumAge"]}`, 10);
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
					if (fact.extentContainsXY(extents, testCoord[0], testCoord[1])) viewer.toastSuccess("geolocation", tr("GEOLOCATION_SUCCESS", locale));
					else viewer.toastWarning("warning-sign", tr("GEOLOCATION_WARN_OUTSIDE_MAP", locale));
				}, (err) => {
					viewer.toastError("error", tr("GEOLOCATION_ERROR", locale, {
						message: err.message,
						code: err.code
					}));
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
			const url = `component://CoordinateTracker?${(Array.isArray(parameters === null || parameters === void 0 ? void 0 : parameters["Projection"]) ? parameters["Projection"] : []).map((p) => "projections=" + p).join("&")}`;
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
			viewer === null || viewer === void 0 || viewer.exportImage({ callback: (image) => {
				const el = import_react.createElement("img", { src: image });
				const printWindow = window.open();
				if (printWindow) {
					printWindow.document.open();
					printWindow.document.close();
					printWindow.document.head.innerHTML = `
                                <meta charset="UTF-8">
                                <title>Print View</title>
                                `;
					printWindow.document.body.innerHTML = "<div id=\"print\"></div>";
					import_react_dom.render(el, printWindow.document.getElementById("print"));
				}
			} });
		}
	});
	registerCommand(DefaultCommands.MapSwipe, {
		iconClass: SPRITE_MAP_SWIPE,
		selected: (state) => {
			var _state$comparisonMode;
			return ((_state$comparisonMode = state.comparisonMode) !== null && _state$comparisonMode !== void 0 ? _state$comparisonMode : state.swipeActive ? "swipe" : "none") !== "none";
		},
		enabled: (state) => {
			var _state$comparisonPair;
			const pairs = (_state$comparisonPair = state.comparisonPairs) !== null && _state$comparisonPair !== void 0 ? _state$comparisonPair : state.mapSwipePairs;
			if (!pairs || pairs.length === 0) return false;
			const activeMapName = state.activeMapName;
			return pairs.some((p) => p.primaryMapName === activeMapName);
		},
		invoke: (dispatch, getState) => {
			var _config$comparisonMod, _config$lastCompariso;
			const config = getState().config;
			dispatch(setComparisonMode(((_config$comparisonMod = config.comparisonMode) !== null && _config$comparisonMod !== void 0 ? _config$comparisonMod : config.swipeActive ? "swipe" : "none") === "none" ? (_config$lastCompariso = config.lastComparisonMode) !== null && _config$lastCompariso !== void 0 ? _config$lastCompariso : "swipe" : "none"));
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
//#endregion
//#region src/components/map-providers/context.tsx
var MapProviderContext = import_react.createContext({});
/**
* Wraps the provider component of react-redux
* 
* @since 0.14
*/
var ReduxProvider = ({ store, children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
	store,
	children
});
/**
* Wraps useDispatch from react-redux, typed to accept both plain ViewerActions and thunked actions.
* 
* @since 0.14
*/
function useReduxDispatch() {
	return useDispatch();
}
/**
* Fetches the requested sub-section of the application state
* 
* @since 0.14
*/
function useAppState(selector, equalityFn) {
	return useSelector(selector, equalityFn);
}
/**
* @since 0.14
*/
var MapProviderContextProvider = ({ value, children }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapProviderContext.Provider, {
		value,
		children
	});
};
/**
* Obtains the current map provider context, which provides imperative access to the current map
* 
* @since 0.14
*/
function useMapProviderContext() {
	return import_react.useContext(MapProviderContext);
}
/**
* @since 0.14
*/
var MapContextProvider = ({ value, store, children }) => {
	import_react.useEffect(() => {
		value.setReduxStore(store);
		return () => {
			value.setReduxStore(void 0);
		};
	}, [value, store]);
	let inner = children;
	if (store) inner = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReduxProvider, {
		store,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapProviderContextProvider, {
		value,
		children: inner
	});
};
//#endregion
//#region src/containers/hooks.ts
init_objectSpread2();
var EMPTY_INITIAL_EXTERNAL_LAYERS = [];
var selectReducedToolbarAppState = createSelector([(state) => state], (state) => reduceAppToToolbarState(state));
var selectActiveMapLayers = createSelector([(state) => state.config.activeMapName, (state) => state.mapState], (activeMapName, mapState) => {
	if (activeMapName) {
		var _mapState$activeMapNa;
		return (_mapState$activeMapNa = mapState[activeMapName]) === null || _mapState$activeMapNa === void 0 ? void 0 : _mapState$activeMapNa.layers;
	}
});
function usePrevious(value) {
	const ref = (0, import_react.useRef)();
	(0, import_react.useEffect)(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}
function useActiveMapName() {
	return useAppState((state) => state.config.activeMapName);
}
function useActiveMapInitialExternalLayers() {
	return useAppState((state) => {
		if (state.config.activeMapName) return state.mapState[state.config.activeMapName].initialExternalLayers;
		return EMPTY_INITIAL_EXTERNAL_LAYERS;
	});
}
function sameHeatmapSettings(left, right) {
	if (left && right) return left.blur == right.blur && left.radius == right.radius;
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
/**
* Returns the layers for the given named map. Unlike {@link useActiveMapLayers}, this hook
* accepts an explicit map name so it can be used to watch a secondary (swipe) map's layers.
*
* @since 0.15
*/
function useNamedMapLayers(mapName) {
	return useAppState((state) => {
		if (mapName && state.mapState[mapName]) return state.mapState[mapName].layers;
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
		var _state$viewer;
		return (_state$viewer = state.viewer) === null || _state$viewer === void 0 || (_state$viewer = _state$viewer.size) === null || _state$viewer === void 0 ? void 0 : _state$viewer[0];
	});
}
function useActiveMapHeight() {
	return useAppState((state) => {
		var _state$viewer2;
		return (_state$viewer2 = state.viewer) === null || _state$viewer2 === void 0 || (_state$viewer2 = _state$viewer2.size) === null || _state$viewer2 === void 0 ? void 0 : _state$viewer2[1];
	});
}
function useViewerSizeUnits() {
	return useAppState((state) => state.config.viewSizeUnits);
}
/**
* Gets the current set of available external base layers
* 
* @returns The current set of available external base layers
* @since 0.14 New required includeNonVisual parameter
* @since 0.14.9 Removed includeNonVisual parameter. Let the hook caller determine themselves if non-visual base layers should be omitted
*/
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
	if (state.config.activeMapName) return state.mapState[state.config.activeMapName];
}
function useActiveMapBranch() {
	return useAppState((state) => getActiveMapBranch(state));
}
function useActiveMapSelectionSet() {
	return useAppState((state) => {
		var _getSelectionSet;
		return (_getSelectionSet = getSelectionSet(state)) !== null && _getSelectionSet !== void 0 ? _getSelectionSet : null;
	});
}
/**
* Gets custom app settings
* 
* @returns 
* @since 0.14
*/
function useCustomAppSettings() {
	return useAppState((state) => state.config.appSettings);
}
/**
* Gets the client-side selection set
* @since 0.14
*/
function useActiveMapClientSelectionSet() {
	return useAppState((state) => {
		var _getActiveMapBranch;
		return (_getActiveMapBranch = getActiveMapBranch(state)) === null || _getActiveMapBranch === void 0 ? void 0 : _getActiveMapBranch.clientSelection;
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
/**
* Gets whether the viewer is in stateless mode
* @returns true if the viewer is in stateless mode
* @since 0.14
*/
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
/**
* @since 0.14.2
*/
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
/**
* 
* @param key 
* @returns 
* @since 0.14.8
*/
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
		return (left === null || left === void 0 ? void 0 : left.busyWorkerCount) == (right === null || right === void 0 ? void 0 : right.busyWorkerCount) && (left === null || left === void 0 ? void 0 : left.hasNextView) == (right === null || right === void 0 ? void 0 : right.hasNextView) && (left === null || left === void 0 ? void 0 : left.hasPreviousView) == (right === null || right === void 0 ? void 0 : right.hasPreviousView) && (left === null || left === void 0 ? void 0 : left.featureTooltipsEnabled) == (right === null || right === void 0 ? void 0 : right.featureTooltipsEnabled) && (left === null || left === void 0 ? void 0 : left.activeTool) == (right === null || right === void 0 ? void 0 : right.activeTool);
	});
	let hasClientSelection = false;
	let hasSelection = false;
	if (selection) {
		if (selection.FeatureSet && selection.FeatureSet.Layer.length > 0) hasSelection = true;
		if (selection.SelectedFeatures && selection.SelectedFeatures.SelectedLayer.length > 0) hasSelection = true;
	}
	if (clientSelection && clientSelection.layers.length > 0) hasClientSelection = true;
	return _objectSpread2(_objectSpread2({}, tbState), {}, {
		hasClientSelection,
		hasSelection
	});
}
//#endregion
//#region src/actions/flyout.ts
var flyout_exports = /* @__PURE__ */ __exportAll({
	closeComponent: () => closeComponent,
	closeContextMenu: () => closeContextMenu,
	closeFlyout: () => closeFlyout,
	openComponent: () => openComponent,
	openContextMenu: () => openContextMenu,
	openFlyout: () => openFlyout
});
init_objectSpread2();
/**
* Opens the context menu at the specific position
* 
* @param position The client x/y position
* @since 0.13
*/
function openContextMenu(position) {
	return {
		type: ActionType.CONTEXT_MENU_OPEN,
		payload: _objectSpread2({}, position)
	};
}
/**
* Closes the context menu
* 
* @since 0.13
*/
function closeContextMenu() {
	return { type: ActionType.CONTEXT_MENU_CLOSE };
}
/**
* Opens the specified flyout menu
*
* @param {string} id
* @param {IDOMElementMetrics} metrics
* @returns {IOpenFlyoutAction}
*/
function openFlyout(id, metrics) {
	return {
		type: ActionType.FLYOUT_OPEN,
		payload: {
			flyoutId: id,
			metrics
		}
	};
}
/**
* Closes the specified flyout menu
*
* @param {string} id
* @returns {ICloseFlyoutAction}
*/
function closeFlyout(id) {
	return {
		type: ActionType.FLYOUT_CLOSE,
		payload: { flyoutId: id }
	};
}
/**
* Load the specified component in the given flyout with the given component props
*
* @param {string} id
* @param {IDOMElementMetrics} metrics
* @param {string} name
* @param {*} props
* @returns {IOpenComponentInFlyoutAction}
*/
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
/**
* Closes the component in the given flyout
*
* @param {string} id
* @returns {ICloseComponentInFlyoutAction}
*/
function closeComponent(id) {
	return {
		type: ActionType.COMPONENT_CLOSE,
		payload: { flyoutId: id }
	};
}
//#endregion
//#region src/containers/toolbar.tsx
init_objectSpread2();
var ToolbarContainer = (props) => {
	const { containerClass, containerStyle, vertical, hideVerticalLabels } = props;
	const dispatch = useReduxDispatch();
	const flyouts = useAppState((state) => state.toolbar.flyouts);
	const toolbar = useAppState((state) => state.toolbar.toolbars[props.id]);
	const tbState = useReducedToolbarAppState();
	const viewer = useMapProviderContext();
	const invokeCommandAction = (cmd, parameters) => dispatch(invokeCommand(cmd, viewer, parameters));
	const openFlyoutAction = (id, metrics) => dispatch(openFlyout(id, metrics));
	const closeFlyoutAction = (id) => dispatch(closeFlyout(id));
	const openComponentAction = (id, metrics, name, props) => dispatch(openComponent(id, metrics, name, props));
	const closeComponentAction = (id) => dispatch(closeComponent(id));
	const onCloseFlyout = (id) => closeFlyoutAction === null || closeFlyoutAction === void 0 ? void 0 : closeFlyoutAction(id);
	const onOpenFlyout = (id, metrics) => openFlyoutAction === null || openFlyoutAction === void 0 ? void 0 : openFlyoutAction(id, metrics);
	const onOpenComponent = (id, metrics, name, props) => openComponentAction === null || openComponentAction === void 0 ? void 0 : openComponentAction(id, metrics, name, props);
	const onCloseComponent = (id) => closeComponentAction === null || closeComponentAction === void 0 ? void 0 : closeComponentAction(id);
	const flyoutStates = {};
	if (flyouts) {
		const ids = Object.keys(flyouts);
		for (const fid of ids) flyoutStates[fid] = !!flyouts[fid].open;
	}
	let tbContainerStyle = _objectSpread2({}, containerStyle || {});
	if (toolbar && toolbar.items && invokeCommandAction) {
		if (vertical === true) tbContainerStyle.width = 29;
		else {
			tbContainerStyle.height = 29;
			tbContainerStyle.overflow = "auto";
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {
			vertical,
			hideVerticalLabels,
			childItems: processMenuItems(toolbar.items.map((tb) => mapToolbarReference(tb, tbState, invokeCommandAction))),
			containerClass,
			containerStyle: tbContainerStyle,
			flyoutStates,
			onOpenComponent,
			onCloseComponent,
			onOpenFlyout,
			onCloseFlyout
		});
	} else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {});
};
//#endregion
//#region src/components/flyout-region.tsx
/**
* A FlyoutRegion component defines a region where flyout menus can be displayed
*/
var FlyoutRegion = (props) => {
	var _props$flyoutConf;
	const { MenuComponent } = useElementContext();
	const contextMenuRef = import_react.useRef(null);
	const isContextMenuOpen = !!((_props$flyoutConf = props.flyoutConf) === null || _props$flyoutConf === void 0 || (_props$flyoutConf = _props$flyoutConf["MapContextMenu"]) === null || _props$flyoutConf === void 0 ? void 0 : _props$flyoutConf.open);
	import_react.useEffect(() => {
		if (!isContextMenuOpen) return;
		const dismissContextMenu = (evt) => {
			var _contextMenuRef$curre;
			const target = evt.target;
			if (!(target instanceof Node)) return;
			if ((_contextMenuRef$curre = contextMenuRef.current) === null || _contextMenuRef$curre === void 0 ? void 0 : _contextMenuRef$curre.contains(target)) return;
			props.onCloseFlyout(WEBLAYOUT_CONTEXTMENU);
		};
		document.addEventListener("mousedown", dismissContextMenu, true);
		document.addEventListener("touchstart", dismissContextMenu, true);
		return () => {
			document.removeEventListener("mousedown", dismissContextMenu, true);
			document.removeEventListener("touchstart", dismissContextMenu, true);
		};
	}, [isContextMenuOpen, props.onCloseFlyout]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: (() => {
		const children = [];
		for (const flyoutId in props.flyoutConf) {
			const flyout = props.flyoutConf[flyoutId];
			if (!!flyout.open) {
				const items = flyout.childItems || [];
				const containerStyle = {};
				containerStyle.zIndex = 2e3;
				if (flyout.metrics) {
					const met = flyout.metrics;
					if (flyoutId == "MapContextMenu") {
						containerStyle.top = met.posY - 40;
						containerStyle.left = met.posX + 20;
					} else {
						if (flyout.metrics.vertical === true) containerStyle.top = met.posY;
						else containerStyle.top = met.posY + met.height;
						if (flyoutId == "TaskMenu") containerStyle.right = window.innerWidth - (met.posX + met.width);
						else {
							containerStyle.left = met.posX;
							if (flyout.metrics.vertical === true) containerStyle.left += met.width;
						}
					}
				}
				const invoked = () => {
					props.onCloseFlyout(flyoutId);
				};
				let className = "mg-flyout-menu-container";
				if (flyout.componentName) className = "mg-flyout-component-container";
				children.push(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: flyoutId === "MapContextMenu" ? contextMenuRef : void 0,
					className,
					style: containerStyle,
					children: [(() => {
						if (flyout.componentName) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: flyout.componentName,
							componentProps: flyout.componentProps,
							locale: props.locale
						});
						else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuComponent, {
							items,
							onInvoked: invoked
						});
					})(), (() => {
						if (flyoutId === "TaskMenu") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							src: "about:blank",
							className: "iframe-iehack-zindex"
						});
					})()]
				}, flyoutId));
			}
		}
		return children;
	})() });
};
//#endregion
//#region src/containers/flyout-region.tsx
var FlyoutRegionContainer = () => {
	const dispatch = useReduxDispatch();
	const closeFlyoutAction = (id) => dispatch(closeFlyout(id));
	const viewer = useMapProviderContext();
	const invokeCommandAction = (cmd, parameters) => dispatch(invokeCommand(cmd, viewer, parameters));
	const onCloseFlyout = (id) => closeFlyoutAction(id);
	const flyouts = useViewerFlyouts();
	const locale = useViewerLocale();
	const tbState = useReducedToolbarAppState();
	const prepared = {};
	if (invokeCommandAction) for (const flyoutId in flyouts) {
		const tb = flyouts[flyoutId];
		if (typeof tb.componentName == "undefined") {
			prepared[flyoutId] = mapToolbarReference(tb, tbState, invokeCommandAction);
			prepared[flyoutId].open = !!flyouts[flyoutId].open;
			prepared[flyoutId].metrics = flyouts[flyoutId].metrics;
		} else prepared[flyoutId] = flyouts[flyoutId];
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlyoutRegion, {
		flyoutConf: prepared,
		onCloseFlyout,
		locale
	});
};
//#endregion
//#region src/components/form-frame-shim.tsx
/**
* The FormFrameShim component provides a compatibility shim for the AJAX viewer form frame
*
* @class FormFrameShim
* @extends {React.Component<FormFrameShimProps, any>}
*/
var FormFrameShim = class extends import_react.Component {
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
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
			style: {
				visibility: "hidden",
				width: 0,
				height: 0
			},
			ref: this.onFormMounted,
			method: "post",
			id: "Frm",
			target,
			action,
			encType: "application/x-www-form-urlencoded",
			children: (() => {
				const fields = [];
				for (let i = 0; i < params.length; i += 2) fields.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: `f${i}`,
					type: "hidden",
					name: params[i],
					value: params[i + 1]
				}, `f${i}`));
				return fields;
			})()
		});
	}
};
//#endregion
//#region src/actions/taskpane.ts
var taskpane_exports = /* @__PURE__ */ __exportAll({
	goBack: () => goBack,
	goForward: () => goForward,
	goHome: () => goHome,
	pushUrl: () => pushUrl
});
/**
* Go back to the initial task URL
*
* @returns {ReduxThunkedAction}
*/
function goHome() {
	return (dispatch, getState) => {
		if (getState().taskpane.initialUrl != null) dispatch({ type: ActionType.TASK_PANE_HOME });
		else throw new MgError("Case not handled yet: Home action when no initial task URL set");
	};
}
/**
* Go back one entry in the task pane navigation history
*
* @returns
*/
function goBack() {
	return { type: ActionType.TASK_PANE_BACK };
}
/**
* Go forward one entry in the task pane navigation history
*
* @returns
*/
function goForward() {
	return { type: ActionType.TASK_PANE_FORWARD };
}
/**
* Pushes the given URL to the task pane navigation history stack
*
* @param {string} url
* @param {boolean} [silent]
* @returns
*/
function pushUrl(url, silent) {
	return {
		type: ActionType.TASK_PANE_PUSH_URL,
		payload: {
			url,
			silent
		}
	};
}
//#endregion
//#region src/containers/hooks-mapguide.ts
/**
* @since 0.14.3
*/
function useActiveMapIsArbitraryCoordSys() {
	return useAppState((state) => {
		let arbCs = false;
		if (state.config.activeMapName) {
			var _ms$mapguide, _ms$generic;
			const ms = state.mapState[state.config.activeMapName];
			if ((_ms$mapguide = ms.mapguide) === null || _ms$mapguide === void 0 ? void 0 : _ms$mapguide.runtimeMap) arbCs = tryParseArbitraryCs(ms.mapguide.runtimeMap.CoordinateSystem.MentorCode) != null;
			else if ((_ms$generic = ms.generic) === null || _ms$generic === void 0 ? void 0 : _ms$generic.subject) {
				var _ms$generic$subject$m;
				arbCs = tryParseArbitraryCs((_ms$generic$subject$m = ms.generic.subject.meta) === null || _ms$generic$subject$m === void 0 ? void 0 : _ms$generic$subject$m.projection) != null;
			}
		}
		return arbCs;
	});
}
function useActiveMapMetersPerUnit() {
	return useAppState((state) => {
		let mpu = 1;
		if (state.config.activeMapName) {
			var _ms$mapguide2;
			const ms = state.mapState[state.config.activeMapName];
			if ((_ms$mapguide2 = ms.mapguide) === null || _ms$mapguide2 === void 0 ? void 0 : _ms$mapguide2.runtimeMap) mpu = ms.mapguide.runtimeMap.CoordinateSystem.MetersPerUnit;
		}
		return mpu;
	});
}
function useActiveMapProjection() {
	return useAppState((state) => {
		let proj;
		if (state.config.activeMapName) {
			var _state$mapState$state, _state$mapState$state2;
			const map = (_state$mapState$state = state.mapState[state.config.activeMapName].mapguide) === null || _state$mapState$state === void 0 ? void 0 : _state$mapState$state.runtimeMap;
			const subject = (_state$mapState$state2 = state.mapState[state.config.activeMapName].generic) === null || _state$mapState$state2 === void 0 ? void 0 : _state$mapState$state2.subject;
			if (map) proj = `EPSG:${map.CoordinateSystem.EpsgCode}`;
			else if (subject) {
				var _subject$meta;
				proj = (_subject$meta = subject.meta) === null || _subject$meta === void 0 ? void 0 : _subject$meta.projection;
			}
		}
		return proj;
	});
}
/**
* @since 0.14.3
*/
function useActiveMapProjectionUnits() {
	return useAppState((state) => {
		let arbUnits;
		if (state.config.activeMapName) {
			var _state$mapState$state3, _state$mapState$state4;
			const map = (_state$mapState$state3 = state.mapState[state.config.activeMapName].mapguide) === null || _state$mapState$state3 === void 0 ? void 0 : _state$mapState$state3.runtimeMap;
			const subject = (_state$mapState$state4 = state.mapState[state.config.activeMapName].generic) === null || _state$mapState$state4 === void 0 ? void 0 : _state$mapState$state4.subject;
			if (map) {
				var _tryParseArbitraryCs;
				arbUnits = (_tryParseArbitraryCs = tryParseArbitraryCs(map.CoordinateSystem.MentorCode)) === null || _tryParseArbitraryCs === void 0 ? void 0 : _tryParseArbitraryCs.units;
			} else if (subject) {
				var _tryParseArbitraryCs2, _subject$meta2;
				arbUnits = (_tryParseArbitraryCs2 = tryParseArbitraryCs((_subject$meta2 = subject.meta) === null || _subject$meta2 === void 0 ? void 0 : _subject$meta2.projection)) === null || _tryParseArbitraryCs2 === void 0 ? void 0 : _tryParseArbitraryCs2.units;
			}
		}
		return arbUnits;
	});
}
function useActiveMapExpandedGroups() {
	return useAppState((state) => {
		var _getActiveMapBranch;
		return (_getActiveMapBranch = getActiveMapBranch(state)) === null || _getActiveMapBranch === void 0 || (_getActiveMapBranch = _getActiveMapBranch.mapguide) === null || _getActiveMapBranch === void 0 ? void 0 : _getActiveMapBranch.expandedGroups;
	});
}
function useActiveMapSelectableLayers() {
	return useAppState((state) => {
		var _getActiveMapBranch2;
		return (_getActiveMapBranch2 = getActiveMapBranch(state)) === null || _getActiveMapBranch2 === void 0 || (_getActiveMapBranch2 = _getActiveMapBranch2.mapguide) === null || _getActiveMapBranch2 === void 0 ? void 0 : _getActiveMapBranch2.selectableLayers;
	});
}
function useActiveMapShowGroups() {
	return useAppState((state) => {
		var _getActiveMapBranch3;
		return (_getActiveMapBranch3 = getActiveMapBranch(state)) === null || _getActiveMapBranch3 === void 0 || (_getActiveMapBranch3 = _getActiveMapBranch3.mapguide) === null || _getActiveMapBranch3 === void 0 ? void 0 : _getActiveMapBranch3.showGroups;
	});
}
function useActiveMapShowLayers() {
	return useAppState((state) => {
		var _getActiveMapBranch4;
		return (_getActiveMapBranch4 = getActiveMapBranch(state)) === null || _getActiveMapBranch4 === void 0 || (_getActiveMapBranch4 = _getActiveMapBranch4.mapguide) === null || _getActiveMapBranch4 === void 0 ? void 0 : _getActiveMapBranch4.showLayers;
	});
}
function useActiveMapHideGroups() {
	return useAppState((state) => {
		var _getActiveMapBranch5;
		return (_getActiveMapBranch5 = getActiveMapBranch(state)) === null || _getActiveMapBranch5 === void 0 || (_getActiveMapBranch5 = _getActiveMapBranch5.mapguide) === null || _getActiveMapBranch5 === void 0 ? void 0 : _getActiveMapBranch5.hideGroups;
	});
}
function useActiveMapHideLayers() {
	return useAppState((state) => {
		var _getActiveMapBranch6;
		return (_getActiveMapBranch6 = getActiveMapBranch(state)) === null || _getActiveMapBranch6 === void 0 || (_getActiveMapBranch6 = _getActiveMapBranch6.mapguide) === null || _getActiveMapBranch6 === void 0 ? void 0 : _getActiveMapBranch6.hideLayers;
	});
}
function useActiveMapLayerTransparency() {
	return useAppState((state) => {
		var _getActiveMapBranch7;
		return (_getActiveMapBranch7 = getActiveMapBranch(state)) === null || _getActiveMapBranch7 === void 0 || (_getActiveMapBranch7 = _getActiveMapBranch7.mapguide) === null || _getActiveMapBranch7 === void 0 ? void 0 : _getActiveMapBranch7.layerTransparency;
	});
}
function useActiveMapActiveSelectedFeature() {
	return useAppState((state) => {
		var _getActiveMapBranch8;
		return (_getActiveMapBranch8 = getActiveMapBranch(state)) === null || _getActiveMapBranch8 === void 0 || (_getActiveMapBranch8 = _getActiveMapBranch8.mapguide) === null || _getActiveMapBranch8 === void 0 ? void 0 : _getActiveMapBranch8.activeSelectedFeature;
	});
}
function useActiveMapSelectableLayerNames() {
	const map = useActiveMapState();
	const selectableLayers = useActiveMapSelectableLayers();
	if (map) {
		var _map$Layer;
		return ((_map$Layer = map.Layer) !== null && _map$Layer !== void 0 ? _map$Layer : []).filter((layer) => layer.Selectable && selectableLayers[layer.ObjectId] !== false).map((layer) => layer.Name);
	}
	return [];
}
function useActiveMapSessionId() {
	return useAppState((state) => {
		var _getRuntimeMap;
		return (_getRuntimeMap = getRuntimeMap(state)) === null || _getRuntimeMap === void 0 ? void 0 : _getRuntimeMap.SessionId;
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
/**
* Gets the coordinate display format override for the active map.
*
* @hidden
* @since 0.15
*/
function useActiveMapCoordinateFormat() {
	return useAppState((state) => {
		if (state.config.activeMapName) {
			var _state$mapState$state5;
			return (_state$mapState$state5 = state.mapState[state.config.activeMapName]) === null || _state$mapState$state5 === void 0 ? void 0 : _state$mapState$state5.coordinateFormat;
		}
	});
}
//#endregion
//#region src/containers/viewer-shim.tsx
var deArrayifyModulePromise = __vitePreload(() => import("./chunks/deArrayify-debug.js"), [], import.meta.url);
function isEmptySelection(selection) {
	if (selection && selection.FeatureSet) {
		let count = 0;
		for (const l of selection.FeatureSet.Layer) count += l.Class.ID.length;
		return count === 0;
	}
	return true;
}
/**
* This class emulates a subset of the Fusion API. This represents the top-level object named "Fusion"
*/
var FusionApiShim = class {
	constructor(parent) {
		this.parent = parent;
		this.Event = new FusionEventApiShim();
	}
	xml2json(callback, response, json) {
		if (json) callback(JSON.parse(response.responseText));
		else {
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
		if (client) if (typeof options.parameters == "string") {
			reqUrl += "?" + options.parameters;
			fetch(reqUrl, { method: "GET" }).then((res) => {
				if (!res.ok) {
					const stat = res.statusText;
					res.text().then((t) => {
						fail({ transport: { responseText: t } }, new MgError(stat));
					});
				} else res.text().then((t) => resolve({ responseText: t }));
			});
		} else fetch(reqUrl, {
			headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
			method: "POST",
			body: serialize(options.parameters, false)
		}).then((res) => {
			if (!res.ok) {
				const stat = res.statusText;
				res.text().then((t) => {
					fail({ transport: { responseText: t } }, new MgError(stat));
				});
			} else res.text().then((t) => resolve({ responseText: t }));
		});
	}
	getMapByName(name) {
		if (this.parent.props.map && this.parent.props.map.Name == name) return new FusionWidgetApiShim(this.parent);
	}
	getWidgetById(id) {
		if (id == "TaskPane" || id == "Map") return new FusionWidgetApiShim(this.parent);
	}
	getWidgetsByType(type) {
		if (type == "Redline") return [new FusionWidgetApiShim(this.parent)];
		return [];
	}
	registerForEvent(eventID, callback) {
		this.parent.registerForEvent(eventID, callback);
	}
};
/**
* This class emulates the OpenLayers.Function.bind helper
*/
var OL2FunctionHelper = class {
	bind(func, obj_this) {
		return func.bind(obj_this);
	}
};
/**
* This class emulates a subset of the OpenLayers 2 API
*/
var OL2Shim = class {
	constructor() {
		this.Function = new OL2FunctionHelper();
	}
	i18n(key) {
		return tr(key);
	}
};
/**
* This class emulates event constants defined by Fusion
*/
var FusionEventApiShim = class {
	constructor() {}
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
};
/**
* This class emulates a digitized rectangle
*/
var OL2Rect = class {
	constructor(poly) {
		this.poly = poly;
	}
	getVertices() {
		const coords = this.poly.getExtent();
		return [
			{
				x: coords[0],
				y: coords[1]
			},
			void 0,
			{
				x: coords[2],
				y: coords[3]
			}
		];
	}
};
/**
* This class emulates an OpenLayers 2 geometry
*/
var OL2Geom = class {
	constructor(geom) {
		this.geom = geom;
	}
	get x() {
		const g = this.geom;
		if (g instanceof Point) return g.getCoordinates()[0];
		return NaN;
	}
	get y() {
		const g = this.geom;
		if (g instanceof Point) return g.getCoordinates()[1];
		return NaN;
	}
	getVertices() {
		const g = this.geom;
		if (g instanceof Point) {} else if (g instanceof LineString) return g.getCoordinates().map((c) => {
			return {
				x: c[0],
				y: c[1]
			};
		});
		else if (g instanceof Polygon) {
			const ring = g.getLinearRing(0);
			if (ring) return ring.getCoordinates().map((c) => {
				return {
					x: c[0],
					y: c[1]
				};
			});
		}
		return [];
	}
	get CLASS_NAME() {
		if (this.geom instanceof Point) return "OpenLayers.Geometry.Point";
		else if (this.geom instanceof LineString) return "OpenLayers.Geometry.LineString";
		else if (this.geom instanceof Polygon) return "OpenLayers.Geometry.Polygon";
		else return "Unknown";
	}
};
/**
* This class emulates OpenLayers.Bounds
*/
var OL2Bounds = class {
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
};
var mRedlineMessageEnabled;
/**
* @hidden
*/
function isRedlineMessagePromptEnabled() {
	return !!mRedlineMessageEnabled;
}
/**
* @hidden
*/
function enableRedlineMessagePrompt(enabled) {
	mRedlineMessageEnabled = enabled;
}
function resolveSetExtentsBounds(bounds, miny, maxx, maxy) {
	if (typeof bounds === "number") return [
		bounds,
		miny,
		maxx,
		maxy
	];
	else if (Array.isArray(bounds)) return bounds;
	else return [
		bounds.left,
		bounds.bottom,
		bounds.right,
		bounds.top
	];
}
/**
* This class emulates APIs from various widgets
*/
var FusionWidgetApiShim = class FusionWidgetApiShim {
	constructor(parent) {
		this.parent = parent;
	}
	goHome() {
		this.parent.goHome();
	}
	processFeatureInfo(r) {
		const o = JSON.parse(r.responseText);
		if (o.FeatureInformation) deArrayifyModulePromise.then(({ deArrayify, isQueryMapFeaturesResponse }) => {
			const norm = deArrayify(o);
			if (isQueryMapFeaturesResponse(norm)) {
				const selXml = buildSelectionXml(norm.FeatureSet);
				this.setSelection(selXml, false);
			}
		});
		else if (o.Message) this.warn(o.Message);
	}
	getSelectableLayers() {
		const layers = [];
		const { map } = this.parent.props;
		if (map && map.Layer) {
			const matches = map.Layer.filter((l) => l.Selectable).map((l) => {
				return {
					layerName: l.Name,
					legendLabel: l.LegendLabel
				};
			});
			for (const l of matches) layers.push(l);
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
			if (!scale) scale = view.scale;
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
	}
	setExtents(bounds, miny, maxx, maxy) {
		const { viewer } = this.parent.props;
		if (viewer.isReady()) {
			let extent;
			if (typeof bounds === "number") extent = resolveSetExtentsBounds(bounds, miny, maxx, maxy);
			else if (Array.isArray(bounds)) extent = resolveSetExtentsBounds(bounds);
			else extent = resolveSetExtentsBounds(bounds);
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
		if (viewer.isReady()) viewer.cancelDigitization();
	}
	query(options) {
		var _this$parent$props$vi;
		const viewer = ((_this$parent$props$vi = this.parent.props.viewer) === null || _this$parent$props$vi === void 0 ? void 0 : _this$parent$props$vi.isReady()) == true ? this.parent.props.viewer.mapguideSupport() : void 0;
		const { map } = this.parent.props;
		if (map && viewer) {
			const qmo = {
				mapname: map.Name,
				session: map.SessionId,
				selectionvariant: options.selectionType,
				maxfeatures: options.maxFeatures,
				geometry: options.geometry,
				layernames: options.layers
			};
			if (qmo.maxfeatures == 0) qmo.maxfeatures = -1;
			viewer.setSelectionXml("", qmo);
		}
	}
	setSelection(xml, zoomTo) {
		const { viewer } = this.parent.props;
		const mgSupport = viewer === null || viewer === void 0 ? void 0 : viewer.mapguideSupport();
		if (viewer.isReady() && mgSupport) mgSupport.setSelectionXml(xml, { layerattributefilter: 0 }, (selection) => {
			if (zoomTo) {
				const fact = viewer.getOLFactory();
				let bounds = null;
				if (selection != null && selection.SelectedFeatures != null) selection.SelectedFeatures.SelectedLayer.forEach((layer) => {
					layer.Feature.forEach((feat) => {
						if (feat.Bounds) {
							const b = feat.Bounds.split(" ").map((s) => parseFloat(s));
							if (bounds == null) bounds = b;
							else bounds = fact.extendExtent(bounds, b);
						}
					});
				});
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
	getSelectedLayers() {
		const layers = [];
		const map = this.parent.props.map;
		const selectionSet = this.parent.props.selectionSet;
		if (map && map.Layer && selectionSet && selectionSet.FeatureSet) for (const fl of selectionSet.FeatureSet.Layer) {
			const ml = map.Layer.filter((l) => l.ObjectId == fl["@id"])[0];
			if (ml) layers.push({
				legendLabel: ml.LegendLabel,
				layerName: ml.Name
			});
		}
		return layers;
	}
	isBusy() {
		if (this.parent.props.busyCount) return this.parent.props.busyCount > 0;
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
		if (viewer.isReady()) this._activeToast = viewer.toastPrimary("info-sign", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mg-fusion-message",
			dangerouslySetInnerHTML: { __html: purify.sanitize(msg) }
		}));
	}
	warn(msg) {
		const { viewer } = this.parent.props;
		if (viewer.isReady()) this._activeToast = viewer.toastPrimary("warning-sign", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mg-fusion-message",
			dangerouslySetInnerHTML: { __html: purify.sanitize(msg) }
		}));
	}
	error(msg) {
		const { viewer } = this.parent.props;
		if (viewer.isReady()) this._activeToast = viewer.toastPrimary("error", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mg-fusion-message",
			dangerouslySetInnerHTML: { __html: purify.sanitize(msg) }
		}));
	}
	clear() {
		const { viewer } = this.parent.props;
		if (viewer.isReady() && this._activeToast) viewer.dismissToast(this._activeToast);
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
					case "layerName": return lyr.Name == value;
				}
				return false;
			})[0];
			if (ml) return { layerName: ml.Name };
		}
		return null;
	}
	pixToGeoMeasure(tolerance) {
		const { viewer } = this.parent.props;
		if (viewer.isReady()) {
			const res = viewer.getResolution();
			if (res) return tolerance * res;
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
		if (viewer.isReady()) viewer.digitizePoint((pt) => {
			handler(new OL2Geom(pt));
		});
	}
	digitizeLine(_options, handler) {
		const { viewer } = this.parent.props;
		if (viewer.isReady()) viewer.digitizeLine((ln) => {
			handler(new OL2Geom(ln));
		});
	}
	digitizeLineString(_options, handler) {
		const { viewer } = this.parent.props;
		if (viewer.isReady()) viewer.digitizeLineString((lstr) => {
			handler(new OL2Geom(lstr));
		});
	}
	digitizeRectangle(_options, handler) {
		const { viewer } = this.parent.props;
		if (viewer.isReady()) viewer.digitizeRectangle((rect) => {
			handler(new OL2Rect(rect));
		});
	}
	digitizePolygon(_options, handler) {
		const { viewer } = this.parent.props;
		if (viewer.isReady()) viewer.digitizePolygon((poly) => {
			handler(new OL2Geom(poly));
		});
	}
	digitizeCircle(_options, handler) {
		const { viewer } = this.parent.props;
		if (viewer.isReady()) viewer.digitizeCircle((circ) => {
			handler(FusionWidgetApiShim.toOL2Circle(circ));
		});
	}
};
var AjaxViewerLineStringOrPolygon = class {
	constructor(coordinates) {
		this.coordinates = coordinates;
	}
	get Count() {
		return this.coordinates.length;
	}
	Point(i) {
		return this.coordinates[i];
	}
};
/**
* This component installs a AJAX/Fusion viewer API compatibility layer when mounted allowing for existing
* script content to work against this viewer.
* 
* @class ViewerApiShim
* @extends {React.Component<ViewerApiShimProps, any>}
*/
var ViewerApiShimInner = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.onFormFrameMounted = (form) => {
			this.formFrame = form;
		};
		this.GetMapName = () => {
			var _this$props$map;
			return (_this$props$map = this.props.map) === null || _this$props$map === void 0 ? void 0 : _this$props$map.Name;
		};
		this.GetSessionId = () => {
			var _this$props$map2;
			return (_this$props$map2 = this.props.map) === null || _this$props$map2 === void 0 ? void 0 : _this$props$map2.SessionId;
		};
		this.goHome = () => {
			var _this$props$goHome, _this$props;
			return (_this$props$goHome = (_this$props = this.props).goHome) === null || _this$props$goHome === void 0 ? void 0 : _this$props$goHome.call(_this$props);
		};
		this.us = true;
		this.userSelectionHandlers = [];
		this.fusionEventHandlers = {};
		this.ol2API = new OL2Shim();
		this.fusionAPI = new FusionApiShim(this);
	}
	getClient() {
		const { agentUri, agentKind } = this.props;
		if (agentUri && agentKind) return new Client(agentUri, agentKind);
	}
	getFusionAPI() {
		return this.fusionAPI;
	}
	registerForEvent(eventID, callback) {
		debug(`Fusion registerForEvent - ${eventID}`);
		if (!this.fusionEventHandlers[eventID]) this.fusionEventHandlers[eventID] = [];
		this.fusionEventHandlers[eventID].push(callback);
	}
	deregisterForEvent(eventID, callback) {
		debug(`Fusion deregisterForEvent - ${eventID}`);
		if (this.fusionEventHandlers[eventID]) {
			const funcs = this.fusionEventHandlers[eventID].filter((f) => f != callback);
			this.fusionEventHandlers[eventID] = funcs;
		} else debug(`No callbacks registered for fusion event - ${eventID}`);
	}
	triggerFusionEvent(eventID) {
		if (this.fusionEventHandlers[eventID]) {
			debug(`Trigger Fusion Event ID - ${eventID}`);
			for (const cb of this.fusionEventHandlers[eventID]) cb.apply(null, arguments);
		}
	}
	fusionSelectionHandler(selection) {
		const eventID = isEmptySelection(selection) ? this.fusionAPI.Event.MAP_SELECTION_OFF : this.fusionAPI.Event.MAP_SELECTION_ON;
		this.triggerFusionEvent(eventID);
	}
	/**
	* Indicates if the map frame is ready
	*
	* Although this not part of the "public" API, most AJAX viewer examples test for this
	* flag anyways, so we might as well emulate it here
	*/
	get mapInit() {
		var _this$props$map3;
		return ((_this$props$map3 = this.props.map) === null || _this$props$map3 === void 0 ? void 0 : _this$props$map3.SessionId) != null;
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
		if (cmd && this.props.invokeCommand) this.props.invokeCommand(cmd);
	}
	ClearSelection() {
		var _this$props$viewer;
		(_this$props$viewer = this.props.viewer) === null || _this$props$viewer === void 0 || (_this$props$viewer = _this$props$viewer.mapguideSupport()) === null || _this$props$viewer === void 0 || _this$props$viewer.clearSelection();
	}
	DigitizeCircle(handler) {
		const { viewer } = this.props;
		if (viewer.isReady()) viewer.digitizeCircle((circle) => {
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
	DigitizeLine(handler) {
		const { viewer } = this.props;
		if (viewer.isReady()) viewer.digitizeLine((line) => {
			handler(new AjaxViewerLineStringOrPolygon(line.getCoordinates().map((coord) => {
				return {
					X: coord[0],
					Y: coord[1]
				};
			})));
		});
	}
	DigitizePoint(handler) {
		const { viewer } = this.props;
		if (viewer.isReady()) viewer.digitizePoint((pt) => {
			const coords = pt.getCoordinates();
			handler({
				X: coords[0],
				Y: coords[1]
			});
		});
	}
	DigitizePolygon(handler) {
		const { viewer } = this.props;
		if (viewer.isReady()) viewer.digitizePolygon((poly) => {
			const ring = poly.getLinearRing(0);
			if (ring) handler(new AjaxViewerLineStringOrPolygon(ring.getCoordinates().map((coord) => {
				return {
					X: coord[0],
					Y: coord[1]
				};
			})));
		});
	}
	DigitizeLineString(handler) {
		const { viewer } = this.props;
		if (viewer.isReady()) viewer.digitizeLineString((line) => {
			handler(new AjaxViewerLineStringOrPolygon(line.getCoordinates().map((coord) => {
				return {
					X: coord[0],
					Y: coord[1]
				};
			})));
		});
	}
	DigitizeRectangle(handler) {
		const { viewer } = this.props;
		if (viewer.isReady()) viewer.digitizeRectangle((rect) => {
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
	GetCenter() {
		const { viewer } = this.props;
		if (viewer.isReady()) {
			const view = viewer.getCurrentView();
			return {
				X: view.x,
				Y: view.y
			};
		}
		return null;
	}
	GetLayers(onlyVisible, onlySelectable) {
		const selLayers = [];
		const { map, selectionSet } = this.props;
		if (map && selectionSet && selectionSet.FeatureSet) {
			const ids = selectionSet.FeatureSet.Layer.map((l) => l["@id"]);
			if (map.Layer) {
				for (const layer of map.Layer) if (ids.indexOf(layer.ObjectId) >= 0) {
					if (onlyVisible === true && layer.Visible === true) selLayers.push({
						legend: layer.LegendLabel,
						name: layer.Name,
						objectid: layer.ObjectId
					});
					if (onlySelectable === true && layer.Selectable === true) selLayers.push({
						legend: layer.LegendLabel,
						name: layer.Name,
						objectid: layer.ObjectId
					});
				}
			}
		}
		return selLayers;
	}
	GetMetersPerUnit() {
		const { viewer } = this.props;
		if (viewer.isReady()) return viewer.getMetersPerUnit();
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
		return getUnitOfMeasure(this.props.sizeUnits || UnitOfMeasure.Unknown).name;
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
		if (viewer.isReady()) return viewer.getCurrentView().scale;
		return null;
	}
	GetSelectedLayers() {
		const selLayers = [];
		const { map, selectionSet } = this.props;
		if (map && selectionSet && selectionSet.FeatureSet) {
			const ids = selectionSet.FeatureSet.Layer.map((l) => l["@id"]);
			if (map.Layer) {
				for (const layer of map.Layer) if (ids.indexOf(layer.ObjectId) >= 0) selLayers.push({
					legend: layer.LegendLabel,
					name: layer.Name,
					objectid: layer.ObjectId
				});
			}
		}
		return selLayers;
	}
	GetSelectionXML() {
		const { selectionSet } = this.props;
		if (!selectionSet || !selectionSet.FeatureSet) return "";
		else return buildSelectionXml(selectionSet.FeatureSet);
	}
	GetSelectedBounds() {
		let bounds = null;
		const { selectionSet } = this.props;
		if (selectionSet && selectionSet.SelectedFeatures) selectionSet.SelectedFeatures.SelectedLayer.forEach((layer) => {
			layer.Feature.forEach((feature) => {
				const bbox = feature.Bounds ? feature.Bounds.split(" ").map((s) => parseFloat(s)) : void 0;
				if (bbox) if (bounds == null) bounds = {
					minx: bbox[0],
					miny: bbox[1],
					maxx: bbox[2],
					maxy: bbox[3]
				};
				else {
					if (bbox[0] < bounds.minx) bounds.minx = bbox[0];
					if (bbox[1] < bounds.miny) bounds.miny = bbox[1];
					if (bbox[2] > bounds.maxx) bounds.maxx = bbox[2];
					if (bbox[3] > bounds.maxy) bounds.maxy = bbox[3];
				}
			});
		});
		return bounds;
	}
	GetSelectedCount() {
		let count = 0;
		const { selectionSet } = this.props;
		if (selectionSet && selectionSet.FeatureSet) selectionSet.FeatureSet.Layer.forEach((layer) => {
			layer.Class.ID.forEach(() => {
				count++;
			});
		});
		return count;
	}
	GetSelectedFeatures() {
		var _this$props$viewer2;
		const viewer = ((_this$props$viewer2 = this.props.viewer) === null || _this$props$viewer2 === void 0 ? void 0 : _this$props$viewer2.isReady()) == true ? this.props.viewer.mapguideSupport() : void 0;
		if (viewer) {
			const selection = viewer.getSelection();
			if (selection && selection.SelectedFeatures) {
				const sel = {};
				for (const sl of selection.SelectedFeatures.SelectedLayer) sel[sl["@name"]] = sl.Feature.map((f) => {
					if (f.Bounds) {
						const bbox = f.Bounds.split(" ").map((s) => parseFloat(s));
						return {
							zoom: {
								minx: bbox[0],
								miny: bbox[1],
								maxx: bbox[2],
								maxy: bbox[3]
							},
							values: f.Property.map((p) => ({
								name: p.Name,
								value: p.Value
							}))
						};
					}
				}).filter((f) => f != null);
				return sel;
			}
		}
	}
	IsDigitizing() {
		const { viewer } = this.props;
		if (viewer.isReady()) return viewer.isDigitizing();
		else return false;
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
		const { viewer } = this.props;
		if (viewer.isReady()) {
			var _this$props$legendRef, _this$props2;
			viewer === null || viewer === void 0 || viewer.refreshMap(RefreshMode.LayersOnly | RefreshMode.SelectionOnly);
			(_this$props$legendRef = (_this$props2 = this.props).legendRefresh) === null || _this$props$legendRef === void 0 || _this$props$legendRef.call(_this$props2);
		}
	}
	ScreenToMapUnits(x, y) {
		const { viewer } = this.props;
		if (viewer.isReady()) {
			const [sx, sy] = viewer.screenToMapUnits(x, y);
			return {
				X: sx,
				Y: sy
			};
		}
	}
	SetEnglishUnits(usEnglish) {
		this.us = usEnglish;
	}
	SetLatLongDisplayUnits() {}
	SetSelectionXML(xmlSet) {
		var _this$props$viewer3;
		const viewer = ((_this$props$viewer3 = this.props.viewer) === null || _this$props$viewer3 === void 0 ? void 0 : _this$props$viewer3.isReady()) == true ? this.props.viewer.mapguideSupport() : void 0;
		if (viewer) viewer.setSelectionXml(xmlSet);
	}
	ZoomToView(x, y, scale) {
		const { viewer } = this.props;
		if (viewer.isReady()) viewer.zoomToView(x, y, scale);
	}
	SetStatusMsg(msg) {
		window.status = msg || "";
	}
	ZoomToScale(scale) {
		const { viewer } = this.props;
		if (viewer.isReady()) {
			const view = viewer.getCurrentView();
			viewer.zoomToView(view.x, view.y, scale);
		}
	}
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
		const nextProps = this.props;
		if (nextProps.map && nextProps.selectionSet != prevProps.selectionSet) for (const handler of this.userSelectionHandlers) {
			var _nextProps$selectionS;
			handler(nextProps.map.Name, (_nextProps$selectionS = nextProps.selectionSet) !== null && _nextProps$selectionS !== void 0 ? _nextProps$selectionS : void 0);
		}
		if (nextProps.busyCount != prevProps.busyCount) this.triggerFusionEvent(this.fusionAPI.Event.MAP_BUSY_CHANGED);
	}
	render() {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormFrameShim, { ref: this.onFormFrameMounted }) });
	}
};
var ViewerApiShim = () => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerApiShimInner, {
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
	});
};
//#endregion
//#region src/components/modal-dialog.tsx
init_objectSpread2();
var DIAG_HEADER_HEIGHT = 40;
var RndModalDialog = (props) => {
	const { Icon, Button, NonIdealState, Heading, DialogContainer, DialogShell, DialogHeader, DialogBody } = useElementContext();
	if (props.isOpen === false) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {});
	const [isDragging, setIsDragging] = import_react.useState(false);
	const [isResizing, setIsResizing] = import_react.useState(false);
	const [diagWidth, setDiagWidth] = import_react.useState(props.width);
	const [diagHeight, setDiagHeight] = import_react.useState(props.height);
	const modalBodyStyle = {
		margin: 0,
		height: diagHeight - DIAG_HEADER_HEIGHT,
		boxSizing: "border-box",
		overflow: "hidden"
	};
	if (!props.disableYOverflow) modalBodyStyle.overflowY = "auto";
	const [diagX, setDiagX] = import_react.useState(props.x);
	const [diagY, setDiagY] = import_react.useState(props.y);
	const ZINDEX = { zIndex: 1980 };
	const modalStyle = _objectSpread2({
		width: diagWidth,
		height: diagHeight,
		minWidth: diagWidth,
		maxWidth: diagWidth,
		marginTop: 0
	}, ZINDEX);
	const rndStyle = _objectSpread2({}, ZINDEX);
	const diagSize = [diagWidth, diagHeight - DIAG_HEADER_HEIGHT];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rnd, {
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
			var _props$onChange;
			setDiagX(d.x);
			setDiagY(d.y);
			setIsDragging(false);
			const args = {
				x: d.x,
				y: d.y,
				width: diagWidth,
				height: diagHeight
			};
			(_props$onChange = props.onChange) === null || _props$onChange === void 0 || _props$onChange.call(props, args);
		},
		onResizeStart: () => setIsResizing(true),
		onResize: (e, direction, ref, delta, position) => {
			setDiagWidth(ref.offsetWidth);
			setDiagHeight(ref.offsetHeight);
			setDiagX(position.x);
			setDiagY(position.y);
		},
		onResizeStop: (e, direction, ref, delta, position) => {
			var _props$onChange2;
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
			(_props$onChange2 = props.onChange) === null || _props$onChange2 === void 0 || _props$onChange2.call(props, args);
		},
		dragHandleClassName: "mrl-modal-diag-drag-handle",
		cancel: ".mrl-modal-diag-close-btn",
		default: {
			x: props.x,
			y: props.y,
			width: props.width,
			height: props.height
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogShell, {
			style: modalStyle,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				className: "noselect mrl-modal-diag-drag-handle mrl-rnd-modal-header",
				children: [
					props.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { icon: props.icon }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
						level: 4,
						children: props.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mrl-modal-diag-close-btn",
						onClick: props.onClose,
						"aria-label": tr("ACTION_CLOSE", props.locale),
						minimal: true,
						icon: "small-cross"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBody, {
				className: "mrl-rnd-modal-body",
				style: modalBodyStyle,
				children: (() => {
					if (props.enableInteractionMask && (isResizing || isDragging)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NonIdealState, {
						icon: "arrows-horizontal",
						description: tr(isResizing ? "WINDOW_RESIZING" : "WINDOW_MOVING", props.locale)
					});
					else return props.children(diagSize);
				})()
			})]
		}) })
	});
};
//#endregion
//#region src/containers/modal-launcher.tsx
function getComponentId(diag) {
	if (isModalComponentDisplayOptions(diag)) return {
		name: diag.component,
		props: {}
	};
	else if (isModalDisplayOptions(diag)) return parseComponentUri(diag.url);
	else assertNever(diag);
}
var ModalLauncher = (props) => {
	const dispatch = useReduxDispatch();
	const hideModalAction = (name) => dispatch(hideModal(name));
	const onCloseModal = (name) => hideModalAction(name);
	const modal = useAppState((state) => state.modal);
	const locale = useViewerLocale();
	const onModalChanged = (name, args) => {
		dispatch(updateModal(name, args));
	};
	if (!modal) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("noscript", {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [Object.keys(modal).map((key) => {
		var _diag$modal$position, _diag$modal$size;
		const diag = modal[key];
		const pos = (_diag$modal$position = diag.modal.position) !== null && _diag$modal$position !== void 0 ? _diag$modal$position : DEFAULT_MODAL_POSITION;
		const size = (_diag$modal$size = diag.modal.size) !== null && _diag$modal$size !== void 0 ? _diag$modal$size : DEFAULT_MODAL_SIZE;
		if (isModalComponentDisplayOptions(diag) || isModalDisplayOptions(diag) && isComponentUri(diag.url)) {
			const componentId = getComponentId(diag);
			if (componentId) {
				const componentRenderer = getComponentFactory(componentId.name);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RndModalDialog, {
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
						if (componentRenderer) if (isModalComponentDisplayOptions(diag)) return componentRenderer(diag.componentProps);
						else return componentRenderer(componentId.props);
						else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Error$1, { error: tr("ERR_UNREGISTERED_COMPONENT", locale, { componentId }) });
					}
				}, key);
			} else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Error$1, { error: tr("ERR_NO_COMPONENT_ID", locale) });
		} else if (isModalDisplayOptions(diag)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RndModalDialog, {
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
			children: ([w, h]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				frameBorder: 0,
				src: diag.url,
				width: w,
				height: h
			})
		}, key);
	}), props.children] });
};
//#endregion
//#region src/api/registry/layout.ts
var layouts = {};
var layoutCaps = {};
/**
* Gets the capabilities of the given layout template
* 
* @param name 
* @returns 
* @since 0.14
*/
function getLayoutCapabilities(name) {
	return layoutCaps[name];
}
/**
* Register the given react layout template component factory function for the given
* template name
*
* @param {string} name
* @param {LayoutFactory} factory
* @param caps The capabilities of this template
* @since 0.14 
*/
function registerLayout(name, factory, caps) {
	layouts[name] = factory;
	layoutCaps[name] = caps;
}
/**
* Gets the registerd react layout template component factory function for the given
* template name
*
* @param {string} name
* @returns {LayoutFactory}
*/
function getLayout(name) {
	return layouts[name];
}
//#endregion
//#region src/api/builders/de-arrayify-guards.ts
function isWebLayout(arg) {
	return arg.CommandSet != null && arg.ContextMenu != null && arg.Map != null;
}
function isAppDef(arg) {
	return arg.WidgetSet != null;
}
//#endregion
//#region src/actions/defs.ts
/**
* Valid generic subject layer types
* 
* @enum {string}
* @since 0.14
*/
var GenericSubjectLayerType = /* @__PURE__ */ function(GenericSubjectLayerType) {
	/**
	* A tiled WMS layer
	*/
	GenericSubjectLayerType["TileWMS"] = "TileWMS";
	/**
	* A vector layer based on an external CSV file
	*/
	GenericSubjectLayerType["CSV"] = "CSV";
	/**
	* A vector layer based on an external KML file
	*/
	GenericSubjectLayerType["KML"] = "KML";
	/**
	* A vector layer based on an external GeoJSON file
	*/
	GenericSubjectLayerType["GeoJSON"] = "GeoJSON";
	/**
	* A vector layer based on an inline GeoJSON fragment
	*/
	GenericSubjectLayerType["GeoJSON_Inline"] = "GeoJSON_Inline";
	/**
	* A vector layer based on a custom-defined format whose driver was registered with {@link ExternalLayerFactoryRegistry.registerExternalVectorLayerCreator}
	*/
	GenericSubjectLayerType["CustomVector"] = "CustomVector";
	/**
	* A vector layer based on a Mapbox Vector Tile set
	*/
	GenericSubjectLayerType["MVT"] = "MVT";
	/**
	* A XYZ tileset
	* @since 0.14.3
	* @remarks A XYZ subject layer will not be added as a base layer. It will be considered as an "overlay" with respect to any existing base layers present
	*/
	GenericSubjectLayerType["XYZ"] = "XYZ";
	/**
	* A static image layer
	* @since 0.14.3
	*/
	GenericSubjectLayerType["StaticImage"] = "StaticImage";
	/**
	* A WFS layer
	* @since 0.14.4
	*/
	GenericSubjectLayerType["WFS"] = "WFS";
	/**
	* A cloud-optimized GeoTIFF layer
	* @since 0.15
	*/
	GenericSubjectLayerType["GeoTIFF"] = "GeoTIFF";
	return GenericSubjectLayerType;
}({});
function isGenericSubjectMapLayer(map) {
	return typeof (map === null || map === void 0 ? void 0 : map.type) == "string";
}
//#endregion
//#region src/actions/init-command.ts
init_objectSpread2();
/**
* Parses comparison pair declarations from the application definition's MapSet.
*
* A comparison pair is declared by adding Extension.ComparisonPairWith (the paired map group id)
* and Extension.ComparisonPrimary ("true" or "false") to a MapGroup element.
*
* @since 0.15
*/
function parseComparisonPairs(appDef) {
	var _appDef$MapSet;
	const pairs = [];
	const seen = /* @__PURE__ */ new Set();
	if (!((_appDef$MapSet = appDef.MapSet) === null || _appDef$MapSet === void 0 ? void 0 : _appDef$MapSet.MapGroup)) return pairs;
	for (const mg of appDef.MapSet.MapGroup) {
		const ext = mg.Extension;
		if (!ext) continue;
		const comparisonPairWith = ext.ComparisonPairWith;
		const comparisonPrimary = ext.ComparisonPrimary;
		if (comparisonPairWith && (comparisonPrimary === null || comparisonPrimary === void 0 ? void 0 : comparisonPrimary.toLowerCase()) === "true") {
			const primaryId = mg["@id"];
			const pairKey = [primaryId, comparisonPairWith].sort().join("|");
			if (!seen.has(pairKey)) {
				seen.add(pairKey);
				const primaryLabel = ext.ComparisonPrimaryLabel;
				const secondaryLabel = ext.ComparisonSecondaryLabel;
				pairs.push(_objectSpread2(_objectSpread2({
					primaryMapName: primaryId,
					secondaryMapName: comparisonPairWith
				}, primaryLabel ? { primaryLabel } : {}), secondaryLabel ? { secondaryLabel } : {}));
			}
		}
	}
	return pairs;
}
/**
* Parses a map-level mouse coordinate format override from the first map
* configuration inside a MapGroup.
*
* Supported extension key on the first map's Extension object:
* - MouseCoordinatesFormat
*
* @hidden
* @since 0.15
*/
function parseMapGroupCoordinateFormat(mapGroup) {
	var _mapGroup$Map;
	const ext = (_mapGroup$Map = mapGroup.Map) === null || _mapGroup$Map === void 0 || (_mapGroup$Map = _mapGroup$Map[0]) === null || _mapGroup$Map === void 0 ? void 0 : _mapGroup$Map.Extension;
	if (!ext) return;
	const candidate = ext.MouseCoordinatesFormat;
	if (typeof candidate === "string" && candidate.trim().length > 0) return candidate;
}
var TYPE_SUBJECT$1 = "SubjectLayer";
function getMapGuideConfiguration(appDef) {
	const configs = [];
	if (appDef.MapSet) {
		for (const mg of appDef.MapSet.MapGroup) for (const map of mg.Map) if (map.Type == "MapGuide") configs.push([mg["@id"], map]);
	}
	return configs;
}
function tryExtractMapMetadata(extension) {
	const ext = {};
	for (const k in extension) if (strStartsWith(k, "Meta_")) {
		const sk = k.substring(5);
		ext[sk] = extension[k];
	}
	return ext;
}
function buildSubjectLayerDefn(name, map) {
	var _map$Extension$initia, _map$Extension$is_sel, _map$Extension$disabl;
	const st = map.Extension.source_type;
	const initiallyVisible = (_map$Extension$initia = map.Extension.initially_visible) !== null && _map$Extension$initia !== void 0 ? _map$Extension$initia : true;
	const sp = {};
	const lo = {};
	const meta = {};
	const keys = Object.keys(map.Extension);
	let popupTemplate = map.Extension.popup_template;
	let selectable = (_map$Extension$is_sel = map.Extension.is_selectable) !== null && _map$Extension$is_sel !== void 0 ? _map$Extension$is_sel : true;
	let disableHover = (_map$Extension$disabl = map.Extension.disable_hover) !== null && _map$Extension$disabl !== void 0 ? _map$Extension$disabl : false;
	for (const k of keys) {
		const spidx = k.indexOf("source_param_");
		const loidx = k.indexOf("layer_opt_");
		const midx = k.indexOf("meta_");
		if (spidx == 0) {
			const kn = k.substring(13);
			sp[kn] = map.Extension[k];
		} else if (loidx == 0) {
			const kn = k.substring(10);
			lo[kn] = map.Extension[k];
		} else if (midx == 0) {
			const kn = k.substring(5);
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
	if (map.Extension.cluster) sl.cluster = _objectSpread2({}, map.Extension.cluster);
	return sl;
}
function getMapDefinitionsFromFlexLayout(appDef) {
	var _appDef$MapSet2;
	const maps = [];
	const configs = getMapGuideConfiguration(appDef);
	if (configs.length > 0) for (const c of configs) maps.push({
		name: c[0],
		mapDef: c[1].Extension.ResourceId,
		metadata: tryExtractMapMetadata(c[1].Extension)
	});
	if ((_appDef$MapSet2 = appDef.MapSet) === null || _appDef$MapSet2 === void 0 ? void 0 : _appDef$MapSet2.MapGroup) {
		for (const mGroup of appDef.MapSet.MapGroup) for (const map of mGroup.Map) if (map.Type == TYPE_SUBJECT$1) {
			const name = mGroup["@id"];
			maps.push(buildSubjectLayerDefn(name, map));
		}
	}
	if (maps.length == 0) throw new MgError("No Map Definition or subject layer found in Application Definition");
	return maps;
}
function isMapDefinition(arg) {
	return arg.mapDef != null;
}
function isStateless(appDef) {
	var _appDef$Extension;
	if (((_appDef$Extension = appDef.Extension) === null || _appDef$Extension === void 0 ? void 0 : _appDef$Extension.Stateless) == "true") return true;
	try {
		const maps = getMapDefinitionsFromFlexLayout(appDef);
		for (const m of maps) if (isMapDefinition(m)) return false;
		return true;
	} catch (e) {
		return true;
	}
}
/**
* @hidden
* @since 0.15
*/
function getExtraProjectionsFromFlexLayout(appDef) {
	const epsgs = [];
	for (const ws of appDef.WidgetSet) for (const w of ws.Widget) if (w.Type == "CoordinateTracker") {
		const ps = w.Extension.Projection || [];
		for (const p of ps) epsgs.push(p.split(":")[1]);
	} else if (w.Type == "CursorPosition") {
		const dp = w.Extension.DisplayProjection;
		if (dp) epsgs.push(dp.split(":")[1]);
	}
	return makeUnique(epsgs);
}
//#endregion
//#region src/api/contracts/weblayout.ts
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
//#endregion
//#region src/utils/scoped-id.ts
/**
* @hidden
*/
var ScopedId = class {
	constructor(counter = 0) {
		this.counter = counter;
	}
	next() {
		return this.counter++;
	}
};
//#endregion
//#region src/api/registry/command-spec.ts
init_objectSpread2();
var scopedId$2 = new ScopedId();
function isCommandSpec(cmd) {
	return !strIsNullOrEmpty(cmd.command);
}
function isUIWidget(widget) {
	return widget.WidgetType === "UiWidgetType" || widget["@xsi:type"] === "UiWidgetType";
}
/**
* @hidden
*/
function isFlyoutSpec(item) {
	return typeof item.children != "undefined";
}
function makeCommand(widget, noToolbarLabels, cmdType) {
	return {
		icon: widget.ImageUrl,
		spriteClass: widget.ImageClass,
		command: cmdType,
		label: noToolbarLabels ? null : widget.Label,
		tooltip: widget.Tooltip,
		parameters: widget.Extension
	};
}
function convertWidget(widget, locale, noToolbarLabels) {
	switch (widget.Type) {
		case "Select": return makeCommand(widget, noToolbarLabels, DefaultCommands.Select);
		case "Pan": return makeCommand(widget, noToolbarLabels, DefaultCommands.Pan);
		case "Zoom": return makeCommand(widget, noToolbarLabels, DefaultCommands.Zoom);
		case "ZoomOnClick": if (parseFloat(widget.Extension.Factor) >= 1) return makeCommand(widget, noToolbarLabels, DefaultCommands.ZoomIn);
		else return makeCommand(widget, noToolbarLabels, DefaultCommands.ZoomOut);
		case "InitialMapView": return makeCommand(widget, noToolbarLabels, DefaultCommands.ZoomExtents);
		case "ZoomToSelection": return makeCommand(widget, noToolbarLabels, DefaultCommands.ZoomToSelection);
		case "ExtentHistory": if (widget.Extension.Direction == "previous") return makeCommand(widget, noToolbarLabels, DefaultCommands.PreviousView);
		else return makeCommand(widget, noToolbarLabels, DefaultCommands.NextView);
		case "CenterSelection": return makeCommand(widget, noToolbarLabels, DefaultCommands.CenterSelection);
		case "About": return makeCommand(widget, noToolbarLabels, DefaultCommands.About);
		case "BufferPanel": return makeCommand(widget, noToolbarLabels, DefaultCommands.Buffer);
		case "ClearSelection": return makeCommand(widget, noToolbarLabels, DefaultCommands.ClearSelection);
		case "CoordinateTracker": return makeCommand(widget, noToolbarLabels, DefaultCommands.CoordinateTracker);
		case "FeatureInfo": return makeCommand(widget, noToolbarLabels, DefaultCommands.FeatureInfo);
		case "Geolocation": return makeCommand(widget, noToolbarLabels, DefaultCommands.Geolocation);
		case "Help": return makeCommand(widget, noToolbarLabels, DefaultCommands.Help);
		case "Maptip": return makeCommand(widget, noToolbarLabels, DefaultCommands.MapTip);
		case "MapMenu": return {
			icon: widget.ImageUrl,
			spriteClass: widget.ImageClass,
			label: noToolbarLabels ? null : widget.Label,
			tooltip: widget.Tooltip,
			componentName: DefaultComponentNames.MapMenu,
			flyoutId: `${DefaultComponentNames.MapMenu}_${scopedId$2.next()}`,
			parameters: widget.Extension
		};
		case "Query": return makeCommand(widget, noToolbarLabels, DefaultCommands.Query);
		case "QuickPlot": return makeCommand(widget, noToolbarLabels, DefaultCommands.QuickPlot);
		case "Redline": return makeCommand(widget, noToolbarLabels, DefaultCommands.Redline);
		case "RefreshMap": return makeCommand(widget, noToolbarLabels, DefaultCommands.RefreshMap);
		case "InvokeURL":
		case "Search": return {
			icon: widget.ImageUrl,
			spriteClass: widget.ImageClass,
			command: widget.Name,
			label: noToolbarLabels ? null : widget.Label,
			tooltip: widget.Tooltip,
			parameters: widget.Extension
		};
		case "SelectPolygon": return makeCommand(widget, noToolbarLabels, DefaultCommands.SelectPolygon);
		case "SelectRadius": return makeCommand(widget, noToolbarLabels, DefaultCommands.SelectRadius);
		case "SelectWithin": return makeCommand(widget, noToolbarLabels, DefaultCommands.SelectWithin);
		case "Theme": return makeCommand(widget, noToolbarLabels, DefaultCommands.Theme);
		case "ViewOptions": return makeCommand(widget, noToolbarLabels, DefaultCommands.ViewerOptions);
		case "Measure": return makeCommand(widget, noToolbarLabels, DefaultCommands.Measure);
		case "Print": return makeCommand(widget, noToolbarLabels, DefaultCommands.Print);
		case "MapSwipe": return makeCommand(widget, noToolbarLabels, DefaultCommands.MapSwipe);
		case "BasemapSwitcher": return {
			icon: widget.ImageUrl,
			spriteClass: widget.ImageClass,
			label: noToolbarLabels ? null : widget.Label,
			tooltip: widget.Tooltip,
			componentName: DefaultComponentNames.BaseMapSwitcher,
			flyoutId: `${DefaultComponentNames.BaseMapSwitcher}_${scopedId$2.next()}`,
			parameters: widget.Extension
		};
		case "InvokeScript": return {
			icon: widget.ImageUrl,
			spriteClass: widget.ImageClass,
			command: widget.Name,
			label: noToolbarLabels ? null : widget.Label,
			tooltip: widget.Tooltip,
			parameters: widget.Extension
		};
		default: return { error: tr("UNKNOWN_WIDGET", locale, { widget: widget.Type }) };
	}
}
/**
* @hidden
* 
* @param isStateless 
* @param items 
* @param widgetsByKey 
* @param locale 
* @param noToolbarLabels 
* @returns 
*/
function convertFlexLayoutUIItems(isStateless, items, widgetsByKey, locale, noToolbarLabels = false) {
	return (items || []).map((item) => {
		switch (item.Function) {
			case "Widget": {
				const widget = widgetsByKey[item.Widget];
				if (widget && isUIWidget(widget)) {
					const cmd = convertWidget(widget, locale, noToolbarLabels);
					if (isStateless && isCommandSpec(cmd) && !isSupportedCommandInStatelessMode(cmd.command)) console.warn(`The widget (${widget.Name}) references a command (${cmd.command}) that is not supported in stateless mode. This widget will always be disabled`);
					return cmd;
				}
			}
			case "Separator": return { isSeparator: true };
			case "Flyout": return {
				label: item.Label,
				tooltip: item.Tooltip,
				icon: item.ImageUrl,
				spriteClass: item.ImageClass,
				children: convertFlexLayoutUIItems(isStateless, item.Item, widgetsByKey, locale)
			};
			default: assertNever(item);
		}
		return null;
	}).filter((i) => i != null).map((i) => i);
}
function tryTranslateImageUrlToSpriteClass(imageUrl) {
	switch (imageUrl) {
		case "../stdicons/icon_invokeurl.gif": return SPRITE_INVOKE_URL;
		case "../stdicons/icon_invokescript.gif": return SPRITE_INVOKE_SCRIPT;
	}
}
/**
* @hidden
* 
* @param items 
* @param cmdsByKey 
* @param locale 
* @param noToolbarLabels 
* @returns 
*/
function convertWebLayoutUIItems(items, cmdsByKey, locale, noToolbarLabels = true) {
	return (items || []).map((item) => {
		if (isCommandItem(item)) {
			const cmdDef = cmdsByKey[item.Command];
			if (!cmdDef) {
				warn(`Invalid reference to command: ${item.Command}`);
				return { error: tr("UNKNOWN_COMMAND_REFERENCE", locale, { command: item.Command }) };
			} else if (cmdDef.TargetViewer != "Dwf") {
				let icon = {};
				if (cmdDef.ImageURL) {
					icon.spriteClass = tryTranslateImageUrlToSpriteClass(cmdDef.ImageURL);
					if (!icon.spriteClass) icon.icon = cmdDef.ImageURL;
				}
				const commonParams = {};
				if (isTargetedCommand(cmdDef)) {
					commonParams.Target = cmdDef.Target;
					commonParams.TargetFrame = cmdDef.TargetFrame;
				}
				if (isBasicCommand(cmdDef)) {
					let action = cmdDef.Action;
					if (action == "ZoomRectangle") action = DefaultCommands.Zoom;
					else if (action == "FitToWindow") action = DefaultCommands.ZoomExtents;
					else if (action == "Refresh") action = DefaultCommands.RefreshMap;
					return _objectSpread2({
						command: action,
						label: noToolbarLabels ? null : cmdDef.Label,
						tooltip: cmdDef.Tooltip,
						parameters: commonParams
					}, icon);
				} else switch (cmdDef["@xsi:type"]) {
					case "ViewOptionsCommandType": return {
						command: DefaultCommands.ViewerOptions,
						label: noToolbarLabels ? null : cmdDef.Label,
						tooltip: cmdDef.Tooltip,
						parameters: commonParams
					};
					case "MeasureCommandType": return {
						command: DefaultCommands.Measure,
						label: noToolbarLabels ? null : cmdDef.Label,
						tooltip: cmdDef.Tooltip,
						parameters: commonParams
					};
					case "HelpCommandType": return {
						command: DefaultCommands.Help,
						label: noToolbarLabels ? null : cmdDef.Label,
						tooltip: cmdDef.Tooltip,
						parameters: commonParams
					};
					case "BufferCommandType": return {
						command: DefaultCommands.Buffer,
						label: noToolbarLabels ? null : cmdDef.Label,
						tooltip: cmdDef.Tooltip,
						parameters: commonParams
					};
					case "SelectWithinCommandType": return {
						command: DefaultCommands.SelectWithin,
						label: noToolbarLabels ? null : cmdDef.Label,
						tooltip: cmdDef.Tooltip,
						parameters: commonParams
					};
					case "GetPrintablePageCommandType": return {
						command: DefaultCommands.QuickPlot,
						label: noToolbarLabels ? null : cmdDef.Label,
						tooltip: cmdDef.Tooltip,
						parameters: commonParams
					};
					default: return _objectSpread2({
						command: cmdDef.Name,
						label: noToolbarLabels ? null : cmdDef.Label,
						tooltip: cmdDef.Tooltip,
						parameters: commonParams
					}, icon);
				}
			}
		} else if (isSeparatorItem(item)) return { isSeparator: true };
		else if (isFlyoutItem(item)) return {
			label: item.Label,
			tooltip: item.Tooltip,
			children: convertWebLayoutUIItems(item.SubItem, cmdsByKey, locale, false)
		};
		else assertNever(item);
		return null;
	}).filter((i) => i != null).map((i) => i);
}
function convertToCommandTarget(fusionCmdTarget) {
	if (strIsNullOrEmpty(fusionCmdTarget)) return "NewWindow";
	switch (fusionCmdTarget) {
		case "SearchWindow":
		case "InvokeUrlWindow": return "NewWindow";
		case "TaskPane": return "TaskPane";
		default: return "SpecifiedFrame";
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
	for (const widgetSet of appDef.WidgetSet) for (const widget of widgetSet.Widget) {
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
				if (isStatelessAppDef) console.warn(`The search command (${widget.Name}) is not supported in stateless mode. This widget will always be disabled`);
				break;
			case "InvokeURL":
				cmdRegister(widget.Name, {
					url: cmd.Url,
					disableIfSelectionEmpty: cmd.DisableIfSelectionEmpty,
					target: convertToCommandTarget(cmd.Target),
					targetFrame: cmd.Target,
					parameters: (cmd.AdditionalParameter || []).map((p) => {
						return {
							name: p.Key,
							value: p.Value
						};
					}),
					title: isUIWidget(widget) ? widget.Label : void 0
				});
				break;
		}
		widgetsByKey[widget.Name] = widget;
	}
	if (taskPane) {
		hasTaskBar = true;
		initialTask = taskPane.Extension.InitialTask || "server/TaskPane.html";
	} else initialTask = "server/TaskPane.html";
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
		if (isInvokeURLCommand(cmd)) cmdRegister(cmd.Name, {
			url: cmd.URL,
			disableIfSelectionEmpty: cmd.DisableIfSelectionEmpty,
			target: cmd.Target,
			targetFrame: cmd.TargetFrame,
			parameters: (cmd.AdditionalParameter || []).map((p) => {
				return {
					name: p.Key,
					value: p.Value
				};
			}),
			title: cmd.Label
		});
		else if (isSearchCommand(cmd)) cmdRegister(cmd.Name, {
			layer: cmd.Layer,
			prompt: cmd.Prompt,
			target: cmd.Target,
			targetFrame: cmd.TargetFrame,
			resultColumns: cmd.ResultColumns,
			filter: cmd.Filter,
			matchLimit: cmd.MatchLimit,
			title: cmd.Label
		});
		cmdsByKey[cmd.Name] = cmd;
	}
	return cmdsByKey;
}
/**
* @hidden
* 
* @param tbConf 
* @returns 
*/
function prepareSubMenus(tbConf) {
	const prepared = {
		toolbars: {},
		flyouts: {}
	};
	let bFoundContextMenu = false;
	for (const key in tbConf) {
		if (key == "MapContextMenu") bFoundContextMenu = true;
		if (key == "TaskMenu" || key == "MapContextMenu") {
			const flyoutId = key;
			prepared.flyouts[flyoutId] = { children: tbConf[key].items };
		} else {
			prepared.toolbars[key] = { items: [] };
			for (const item of tbConf[key].items) if (isFlyoutSpec(item) && key != "MapContextMenu") {
				const flyoutId = `${item.label}_${scopedId$2.next()}`;
				prepared.toolbars[key].items.push({
					label: item.label,
					tooltip: item.tooltip,
					icon: item.icon,
					spriteClass: item.spriteClass,
					flyoutId
				});
				prepared.flyouts[flyoutId] = { children: item.children };
			} else prepared.toolbars[key].items.push(item);
		}
	}
	return [prepared, bFoundContextMenu];
}
//#endregion
//#region src/utils/assert.ts
function assertIsDefined(val) {
	if (val === void 0 || val === null) throw new Error(`Expected 'val' to be defined, but received ${val}`);
}
//#endregion
//#region src/utils/browser-support.ts
/**
* Checks if this browser supports touch events
* 
* @returns true if this browser suports touch events
* @since 0.15
*/
function supportsTouch() {
	return "ontouchstart" in document.documentElement;
}
/**
* 
* 
* @param minWidthPx The minimum viewport width in pixels. Default is 767px if not specified
* @returns true if the viewport is mobile
* @since 0.15
*/
function isMobileViewport(minWidthPx = 767) {
	return window.matchMedia(`(max-width: ${minWidthPx}px)`).matches;
}
/**
* Checks if this browser supports WebGL. Some viewer features require this support to be present.
* 
* @since 0.15
*/
function supportsWebGL() {
	const canvas = document.createElement("canvas");
	return (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) instanceof WebGLRenderingContext;
}
//#endregion
//#region src/actions/init-mapguide.ts
init_objectSpread2();
var TYPE_SUBJECT = "SubjectLayer";
var TYPE_EXTERNAL = "External";
var scopedId$1 = new ScopedId();
/**
* Returns whether the supplied runtime map uses an arbitrary coordinate system.
*/
function isArbitraryCoordSys(subject) {
	if (subject) {
		if (isRuntimeMap(subject)) return tryParseArbitraryCs(subject.CoordinateSystem.MentorCode) != null;
	}
	return false;
}
/**
* Finds the first runtime map entry and returns its map name and session id.
*/
function establishInitialMapNameAndSession(mapsByName) {
	let firstMapName = "";
	let firstSessionId = "";
	for (const mapName in mapsByName) if (!firstMapName && !firstSessionId) {
		const map = mapsByName[mapName];
		if (isRuntimeMap(map)) {
			firstMapName = map.Name;
			firstSessionId = map.SessionId;
			break;
		}
	}
	return [firstMapName, firstSessionId];
}
/**
* Loads and registers the localized string bundle when a non-default locale is requested.
*/
function initLocaleAsync(_x, _x2) {
	return _initLocaleAsync.apply(this, arguments);
}
function _initLocaleAsync() {
	_initLocaleAsync = _asyncToGenerator(function* (dispatch, options) {
		const { locale } = options;
		if (locale != "en") {
			const r = yield fetch(`strings/${locale}.json`);
			if (r.ok) {
				registerStringBundle(locale, yield r.json());
				dispatch({
					type: ActionType.SET_LOCALE,
					payload: locale
				});
				info(`Registered string bundle for locale: ${locale}`);
			} else warn(`Failed to register string bundle for locale: ${locale}`);
		}
	});
	return _initLocaleAsync.apply(this, arguments);
}
/**
* Builds the normalized init payload from an ApplicationDefinition and map state.
*/
function initFromAppDefCoreAsync(_x3, _x4, _x5, _x6, _x7) {
	return _initFromAppDefCoreAsync.apply(this, arguments);
}
function _initFromAppDefCoreAsync() {
	_initFromAppDefCoreAsync = _asyncToGenerator(function* (appDef, options, mapsByName, warnings, pendingMapDefs) {
		var _appDef$Extension;
		const { taskPane, hasTaskBar, hasStatus, hasNavigator, hasSelectionPanel, hasLegend, viewSize, widgetsByKey, isStateless, initialTask } = parseWidgetsInAppDef(appDef, registerCommand);
		const { locale, featureTooltipsEnabled } = options;
		const config = {};
		config.isStateless = isStateless;
		const tbConf = {};
		for (const widgetSet of appDef.WidgetSet) {
			for (const cont of widgetSet.Container) {
				const tbName = cont.Name;
				tbConf[tbName] = { items: convertFlexLayoutUIItems(isStateless, cont.Item, widgetsByKey, locale) };
			}
			for (const w of widgetSet.Widget) if (w.Type == "CursorPosition") {
				config.coordinateProjection = w.Extension.DisplayProjection;
				config.coordinateDecimals = w.Extension.Precision;
				config.coordinateDisplayFormat = w.Extension.Template;
			}
		}
		const mapsDict = mapsByName;
		const maps = setupMaps(appDef, mapsDict, config, warnings, locale, pendingMapDefs);
		if (appDef.Title) document.title = appDef.Title || document.title;
		const [firstMapName, firstSessionId] = establishInitialMapNameAndSession(mapsDict);
		const [tb, bFoundContextMenu] = prepareSubMenus(tbConf);
		if (!bFoundContextMenu) warnings.push(tr("INIT_WARNING_NO_CONTEXT_MENU", locale, { containerName: WEBLAYOUT_CONTEXTMENU }));
		const settings = {};
		if (Array.isArray((_appDef$Extension = appDef.Extension) === null || _appDef$Extension === void 0 || (_appDef$Extension = _appDef$Extension.ViewerSettings) === null || _appDef$Extension === void 0 ? void 0 : _appDef$Extension.Setting)) for (const s of appDef.Extension.ViewerSettings.Setting) {
			const [sn] = s["@name"];
			const [sv] = s["@value"];
			settings[sn] = sv;
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
	return _initFromAppDefCoreAsync.apply(this, arguments);
}
/**
* Derives a stable target runtime map name from a map definition resource id.
*/
function getDesiredTargetMapName(mapDef) {
	const lastSlash = mapDef.lastIndexOf("/");
	const lastDot = mapDef.lastIndexOf(".");
	if (lastSlash >= 0 && lastDot >= 0 && lastDot > lastSlash) return `${mapDef.substring(lastSlash + 1, lastDot)}`;
	else return `Map_${scopedId$1.next()}`;
}
/**
* Initializes viewer payload from a WebLayout document.
*/
function initFromWebLayoutAsync(_x8, _x9, _x10, _x11, _x12) {
	return _initFromWebLayoutAsync.apply(this, arguments);
}
function _initFromWebLayoutAsync() {
	_initFromWebLayoutAsync = _asyncToGenerator(function* (client, options, webLayout, session, sessionWasReused) {
		const [mapsByName, , warnings] = yield createRuntimeMapsAsync(client, options, session, webLayout, false, (wl) => [{
			name: getDesiredTargetMapName(wl.Map.ResourceId),
			mapDef: wl.Map.ResourceId,
			metadata: {}
		}], () => [], sessionWasReused);
		const { locale, featureTooltipsEnabled, externalBaseLayers } = options;
		const cmdsByKey = parseCommandsInWebLayout(webLayout, registerCommand);
		const mainToolbar = webLayout.ToolBar.Visible ? convertWebLayoutUIItems(webLayout.ToolBar.Button, cmdsByKey, locale) : [];
		const taskBar = webLayout.TaskPane.TaskBar.Visible ? convertWebLayoutUIItems(webLayout.TaskPane.TaskBar.MenuButton, cmdsByKey, locale, false) : [];
		const contextMenu = webLayout.ContextMenu.Visible ? convertWebLayoutUIItems(webLayout.ContextMenu.MenuItem, cmdsByKey, locale, false) : [];
		const config = {};
		if (webLayout.SelectionColor != null) config.selectionColor = webLayout.SelectionColor;
		if (webLayout.MapImageFormat != null) config.imageFormat = webLayout.MapImageFormat;
		if (webLayout.SelectionImageFormat != null) config.selectionImageFormat = webLayout.SelectionImageFormat;
		if (webLayout.PointSelectionBuffer != null) config.pointSelectionBuffer = webLayout.PointSelectionBuffer;
		let initialView = null;
		if (webLayout.Map.InitialView != null) initialView = {
			x: webLayout.Map.InitialView.CenterX,
			y: webLayout.Map.InitialView.CenterY,
			scale: webLayout.Map.InitialView.Scale
		};
		if (webLayout.Title != "") document.title = webLayout.Title || document.title;
		const maps = {};
		const [firstMapName, firstSessionId] = establishInitialMapNameAndSession(mapsByName);
		for (const mapName in mapsByName) {
			var _options$externalBase;
			maps[mapName] = {
				mapGroupId: mapName,
				map: mapsByName[mapName],
				externalBaseLayers: (_options$externalBase = options.externalBaseLayers) !== null && _options$externalBase !== void 0 ? _options$externalBase : [],
				initialView
			};
		}
		const menus = {};
		menus[WEBLAYOUT_TOOLBAR] = { items: mainToolbar };
		menus[WEBLAYOUT_TASKMENU] = { items: taskBar };
		menus[WEBLAYOUT_CONTEXTMENU] = { items: contextMenu };
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
	return _initFromWebLayoutAsync.apply(this, arguments);
}
/**
* Creates a runtime map using the API variant supported by the current site version.
*/
function createRuntimeMap(_x13, _x14, _x15) {
	return _createRuntimeMap.apply(this, arguments);
}
function _createRuntimeMap() {
	_createRuntimeMap = _asyncToGenerator(function* (client, options, siteVersion) {
		let map;
		if (canUseQueryMapFeaturesV4(parseSiteVersion((yield siteVersion.getValueAsync()).Version))) map = yield client.createRuntimeMap_v4(options);
		else map = yield client.createRuntimeMap(options);
		return map;
	});
	return _createRuntimeMap.apply(this, arguments);
}
/**
* Describes an existing runtime map using the API variant supported by the current site version.
*/
function describeRuntimeMap(_x16, _x17, _x18) {
	return _describeRuntimeMap.apply(this, arguments);
}
function _describeRuntimeMap() {
	_describeRuntimeMap = _asyncToGenerator(function* (client, options, siteVersion) {
		let map;
		if (canUseQueryMapFeaturesV4(parseSiteVersion((yield siteVersion.getValueAsync()).Version))) map = yield client.describeRuntimeMap_v4(options);
		else map = yield client.describeRuntimeMap(options);
		return map;
	});
	return _describeRuntimeMap.apply(this, arguments);
}
/**
* Attempts to describe an existing runtime map and creates it if the resource does not exist.
*/
function tryDescribeRuntimeMapAsync(_x19, _x20, _x21, _x22, _x23) {
	return _tryDescribeRuntimeMapAsync.apply(this, arguments);
}
function _tryDescribeRuntimeMapAsync() {
	_tryDescribeRuntimeMapAsync = _asyncToGenerator(function* (client, mapName, session, mapDef, siteVersion) {
		try {
			return yield describeRuntimeMap(client, {
				mapname: mapName,
				requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
				session: yield session.getValueAsync()
			}, siteVersion);
		} catch (e) {
			if (e.message === "MgResourceNotFoundException") return yield createRuntimeMap(client, {
				mapDefinition: mapDef,
				requestedFeatures: RuntimeMapFeatureFlags.LayerFeatureSources | RuntimeMapFeatureFlags.LayerIcons | RuntimeMapFeatureFlags.LayersAndGroups,
				session: yield session.getValueAsync(),
				targetMapName: mapName
			}, siteVersion);
			throw e;
		}
	});
	return _tryDescribeRuntimeMapAsync.apply(this, arguments);
}
/**
* Creates and/or recovers runtime maps and collects pending lazy maps for deferred creation.
*/
function createRuntimeMapsAsync(_x24, _x25, _x26, _x27, _x28, _x29, _x30, _x31) {
	return _createRuntimeMapsAsync.apply(this, arguments);
}
function _createRuntimeMapsAsync() {
	_createRuntimeMapsAsync = _asyncToGenerator(function* (client, options, session, res, isStateless, mapDefSelector, projectionSelector, sessionWasReused) {
		const mapDefs = mapDefSelector(res);
		const mapPromises = [];
		const warnings = [];
		const { locale } = options;
		const fetchEpsgs = [];
		const pendingMapDefs = {};
		const siteVersion = new AsyncLazy(_asyncToGenerator(function* () {
			assertIsDefined(client);
			return yield client.getSiteVersion();
		}));
		const mapDefItems = mapDefs.filter(isMapDefinition);
		const canLazyLoad = !isStateless && mapDefItems.length > 1;
		const initialActiveMapName = options.initialActiveMap;
		const activeMapExistsInAppDef = !!initialActiveMapName && mapDefItems.some((mi) => mi.name === initialActiveMapName);
		if (isStateless) for (const m of mapDefs) if (isMapDefinition(m)) {
			const siteVer = yield siteVersion.getValueAsync();
			assertIsDefined(client);
			mapPromises.push(describeRuntimeMapStateless(client, siteVer.Version, m));
		} else {
			var _m$meta;
			const proj = (_m$meta = m.meta) === null || _m$meta === void 0 ? void 0 : _m$meta.projection;
			if (!strIsNullOrEmpty(proj)) {
				const [_, epsg] = proj.split(":");
				if (!proj4.defs[`EPSG:${epsg}`]) fetchEpsgs.push({
					epsg,
					mapDef: m.name
				});
			}
		}
		else {
			let isFirstMapDef = true;
			for (const m of mapDefs) if (isMapDefinition(m)) {
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
		const maps = yield Promise.all(mapPromises);
		for (const m of maps) {
			const epsg = m.CoordinateSystem.EpsgCode;
			const mapDef = m.MapDefinition;
			if (!tryParseArbitraryCs(m.CoordinateSystem.MentorCode)) {
				if (epsg == "0") throw new MgError(tr("INIT_ERROR_UNSUPPORTED_COORD_SYS", locale || "en", { mapDefinition: mapDef }));
				if (!proj4.defs[`EPSG:${epsg}`]) fetchEpsgs.push({
					epsg,
					mapDef
				});
			}
		}
		const extraEpsgs = projectionSelector(res);
		for (const e of extraEpsgs) if (!proj4.defs[`EPSG:${e}`]) fetchEpsgs.push({
			epsg: e,
			mapDef: ""
		});
		yield Promise.all(fetchEpsgs.filter((fe) => !strIsNullOrEmpty(fe.epsg)).map((f) => resolveProjectionFromEpsgCodeAsync(f.epsg, locale, f.mapDef)));
		debug(`Register proj4 with OpenLayers`);
		register(proj4);
		const mapsByName = {};
		for (const map of maps) mapsByName[map.Name] = map;
		for (const gs of mapDefs) if (!isMapDefinition(gs)) mapsByName[gs.name] = gs;
		return [
			mapsByName,
			pendingMapDefs,
			warnings
		];
	});
	return _createRuntimeMapsAsync.apply(this, arguments);
}
/**
* Builds a synthetic runtime map from a MapDefinition for stateless map operation.
*/
function describeRuntimeMapStateless(_x32, _x33, _x34) {
	return _describeRuntimeMapStateless.apply(this, arguments);
}
function _describeRuntimeMapStateless() {
	_describeRuntimeMapStateless = _asyncToGenerator(function* (client, siteVersion, m) {
		const { name, mapDef, metadata } = m;
		const mdf = yield client.getResource(mapDef, { username: "Anonymous" });
		if (!mdf) throw new Error("Failed to fetch map def");
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
				var _tsd$TileStoreParamet, _tsd$TileStoreParamet2;
				const sTileWidth = (_tsd$TileStoreParamet = tsd.TileStoreParameters.Parameter.find((p) => p.Name == "TileWidth")) === null || _tsd$TileStoreParamet === void 0 ? void 0 : _tsd$TileStoreParamet.Value;
				const sTileHeight = (_tsd$TileStoreParamet2 = tsd.TileStoreParameters.Parameter.find((p) => p.Name == "TileHeight")) === null || _tsd$TileStoreParamet2 === void 0 ? void 0 : _tsd$TileStoreParamet2.Value;
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
				});
				for (const lyr of bg.BaseMapLayer) layers.push({
					Name: lyr.Name,
					DisplayInLegend: lyr.ShowInLegend,
					Selectable: false,
					LegendLabel: lyr.LegendLabel,
					ExpandInLegend: lyr.ExpandInLegend,
					Visible: true,
					ParentId: bg.Name,
					ActuallyVisible: true,
					LayerDefinition: lyr.ResourceId,
					ObjectId: lyr.Name,
					Type: 2
				});
			}
		}
		for (const grp of mdf.MapLayerGroup) groups.push({
			Name: grp.Name,
			DisplayInLegend: grp.ShowInLegend,
			LegendLabel: grp.LegendLabel,
			ObjectId: grp.Name,
			ExpandInLegend: grp.ExpandInLegend,
			Visible: grp.Visible,
			ActuallyVisible: grp.Visible,
			Type: 1
		});
		for (const lyr of mdf.MapLayer) layers.push({
			Name: lyr.Name,
			DisplayInLegend: lyr.ShowInLegend,
			Selectable: false,
			LegendLabel: lyr.LegendLabel,
			ExpandInLegend: lyr.ExpandInLegend,
			Visible: true,
			ParentId: lyr.Group,
			ActuallyVisible: true,
			LayerDefinition: lyr.ResourceId,
			ObjectId: lyr.Name,
			Type: 1
		});
		rt.Group = groups;
		rt.Layer = layers;
		return rt;
	});
	return _describeRuntimeMapStateless.apply(this, arguments);
}
/**
* Converts AppDef map groups into viewer map entries with runtime map and layer metadata.
*/
function setupMaps(appDef, mapsByName, config, warnings, locale, pendingMapDefs) {
	const dict = {};
	if (appDef.MapSet) for (const mGroup of appDef.MapSet.MapGroup) {
		let mapName;
		const initExternalLayers = [];
		const externalBaseLayers = [];
		let subject;
		for (const map of mGroup.Map) if (map.Type === "MapGuide") {
			if (!config.selectionColor && map.Extension.SelectionColor != null) config.selectionColor = map.Extension.SelectionColor;
			if (!config.imageFormat && map.Extension.ImageFormat != null) config.imageFormat = map.Extension.ImageFormat;
			if (!config.selectionImageFormat && map.Extension.SelectionFormat != null) config.selectionImageFormat = map.Extension.SelectionFormat;
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
				if (pendingMapDefs[groupId]) mapName = groupId;
			}
		}
		const isArbitrary = isArbitraryCoordSys(subject);
		for (const map of mGroup.Map) {
			if (map.Type == "MapGuide") continue;
			if (map.Type == TYPE_SUBJECT) mapName = mGroup["@id"];
			else if (isArbitrary) warnings.push(tr("INIT_WARNING_ARBITRARY_COORDSYS_INCOMPATIBLE_LAYER", locale, {
				mapId: mGroup["@id"],
				type: map.Type
			}));
			else if (map.Type == TYPE_EXTERNAL) {
				const layer = buildSubjectLayerDefn(map.Extension.layer_name, map);
				if (layer.type == GenericSubjectLayerType.GeoTIFF && !supportsWebGL()) warnings.push(tr("INIT_WARNING_WEBGL_UNSUPPORTED", locale));
				initExternalLayers.push(layer);
			} else processLayerInMapGroup(map, warnings, config, appDef, externalBaseLayers);
		}
		if (isArbitrary) for (const wset of appDef.WidgetSet) for (const widget of wset.Widget) switch (widget.Type) {
			case "CoordinateTracker":
				warnings.push(tr("INIT_WARNING_ARBITRARY_COORDSYS_UNSUPPORTED_WIDGET", locale, {
					mapId: mGroup["@id"],
					widget: widget.Type
				}));
				break;
		}
		applyInitialBaseLayerVisibility(externalBaseLayers);
		let initialView;
		if (mGroup.InitialView) initialView = {
			x: mGroup.InitialView.CenterX,
			y: mGroup.InitialView.CenterY,
			scale: mGroup.InitialView.Scale
		};
		if (mapName) {
			const coordinateFormat = parseMapGroupCoordinateFormat(mGroup);
			const pendingEntry = pendingMapDefs === null || pendingMapDefs === void 0 ? void 0 : pendingMapDefs[mapName];
			dict[mapName] = _objectSpread2({
				mapGroupId: mGroup["@id"],
				map: mapsByName[mapName],
				initialView,
				externalBaseLayers,
				initialExternalLayers: initExternalLayers,
				coordinateFormat
			}, pendingEntry ? {
				mapDef: pendingEntry.mapDef,
				metadata: pendingEntry.metadata
			} : {});
		}
	}
	return dict;
}
/**
* Initializes viewer payload from an ApplicationDefinition document.
*/
function initFromAppDefAsync(_x35, _x36, _x37, _x38, _x39) {
	return _initFromAppDefAsync.apply(this, arguments);
}
function _initFromAppDefAsync() {
	_initFromAppDefAsync = _asyncToGenerator(function* (client, options, appDef, session, sessionWasReused) {
		var _appDef$Extension2;
		if (Array.isArray((_appDef$Extension2 = appDef.Extension) === null || _appDef$Extension2 === void 0 || (_appDef$Extension2 = _appDef$Extension2.CustomProjections) === null || _appDef$Extension2 === void 0 ? void 0 : _appDef$Extension2.Projection)) {
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
	return _initFromAppDefAsync.apply(this, arguments);
}
/**
* Resolves the init document source and returns the normalized viewer init payload.
*/
function sessionAcquiredAsync(_x40, _x41, _x42, _x43) {
	return _sessionAcquiredAsync.apply(this, arguments);
}
function _sessionAcquiredAsync() {
	_sessionAcquiredAsync = _asyncToGenerator(function* (client, options, session, sessionWasReused) {
		const { resourceId, locale } = options;
		if (!resourceId) {
			const cl = new Client("", "mapagent");
			try {
				return yield initFromAppDefAsync(client, options, yield cl.get("appdef.json"), session, sessionWasReused);
			} catch (e) {
				throw new MgError(tr("INIT_ERROR_MISSING_RESOURCE_PARAM", locale));
			}
		} else if (typeof resourceId == "string") if (strEndsWith(resourceId, "WebLayout")) {
			assertIsDefined(client);
			return yield initFromWebLayoutAsync(client, options, yield client.getResource(resourceId, { SESSION: yield session.getValueAsync() }), session, sessionWasReused);
		} else if (strEndsWith(resourceId, "ApplicationDefinition")) {
			assertIsDefined(client);
			return yield initFromAppDefAsync(client, options, yield client.getResource(resourceId, { SESSION: yield session.getValueAsync() }), session, sessionWasReused);
		} else if (isResourceId(resourceId)) throw new MgError(tr("INIT_ERROR_UNKNOWN_RESOURCE_TYPE", locale, { resourceId }));
		else {
			let fl;
			if (!client) fl = yield new Client("", "mapagent").get(resourceId);
			else fl = yield client.get(resourceId);
			return yield initFromAppDefAsync(client, options, fl, session, sessionWasReused);
		}
		else {
			const doc = yield resourceId();
			if (isWebLayout(doc)) return yield initFromWebLayoutAsync(client, options, doc, session, sessionWasReused);
			if (isAppDef(doc)) return yield initFromAppDefAsync(client, options, doc, session, sessionWasReused);
			throw new MgError(tr("INIT_ERROR_UNKNOWN_RESOURCE_TYPE", locale, { resourceId: "[function resource loader]" }));
		}
	});
	return _sessionAcquiredAsync.apply(this, arguments);
}
//#endregion
//#region src/actions/init.ts
init_objectSpread2();
function applyInitialBaseLayerVisibility(externalBaseLayers) {
	if (externalBaseLayers.length > 0) {
		const firstBase = externalBaseLayers.find((bl) => bl.kind != "UTFGrid");
		if (firstBase) firstBase.visible = true;
		const nonVisuals = externalBaseLayers.filter((bl) => bl.kind == "UTFGrid");
		for (const nv of nonVisuals) nv.visible = true;
	}
}
function processAndDispatchInitError(error, includeStack, dispatch, opts) {
	if (error.stack) dispatch({
		type: ActionType.INIT_ERROR,
		payload: {
			error: {
				message: error.message,
				stack: (error.stack || "").split("\n")
			},
			includeStack,
			options: opts
		}
	});
	else dispatch({
		type: ActionType.INIT_ERROR,
		payload: {
			error: {
				message: error.message,
				stack: []
			},
			includeStack,
			options: opts
		}
	});
}
/**
* @hidden
*/
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
/**
* Builds an INIT_APP payload from a pre-fetched init document.
*
* @hidden
* @since 0.15
*/
var _counter = 0;
function processLayerInMapGroup(map, warnings, config, appDef, externalBaseLayers) {
	switch (map.Type) {
		case "Google":
			warnings.push(tr("INIT_WARNING_UNSUPPORTED_GOOGLE_MAPS", config.locale));
			break;
		case "VirtualEarth":
			{
				const { name, type } = map.Extension.Options;
				const sName = Array.isArray(name) ? name[0] : name;
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
				if (appDef.Extension.BingMapKey) options.key = appDef.Extension.BingMapKey;
				else {
					bAdd = false;
					warnings.push(tr("INIT_WARNING_BING_API_KEY_REQD", config.locale));
				}
				if (bAdd) externalBaseLayers.push({
					name: sName,
					kind: "BingMaps",
					options
				});
			}
			break;
		case "OpenStreetMap":
			{
				const { name, type } = map.Extension.Options;
				const sName = Array.isArray(name) ? name[0] : name;
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
					name: sName,
					kind: "OSM",
					options
				});
			}
			break;
		case "StadiaMaps":
		case "Stamen":
			{
				var _appDef$Extension;
				const { name, type } = map.Extension.Options;
				const sName = Array.isArray(name) ? name[0] : name;
				const options = { layer: Array.isArray(type) ? type[0] : type };
				let bAdd = true;
				if ((_appDef$Extension = appDef.Extension) === null || _appDef$Extension === void 0 ? void 0 : _appDef$Extension.StadiaMapsKey) options.key = appDef.Extension.StadiaMapsKey;
				else {
					bAdd = false;
					warnings.push(tr("INIT_WARNING_STADIAMAPS_API_KEY_REQD", config.locale));
				}
				if (bAdd) externalBaseLayers.push({
					name: sName,
					kind: map.Type,
					options
				});
			}
			break;
		case "UTFGrid":
			externalBaseLayers.push({
				name: `UTFGridSource${_counter++}`,
				kind: "UTFGrid",
				options: { tileJSON: {
					scheme: "xyz",
					grids: Array.isArray(map.Extension.UrlTemplate) ? [...map.Extension.UrlTemplate] : [map.Extension.UrlTemplate]
				} }
			});
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
				const { name, type, attributions } = map.Extension.Options;
				const sName = Array.isArray(name) ? name[0] : name;
				const sType = Array.isArray(type) ? type[0] : type;
				let tilePixelRatio = 1;
				if (map.Extension.Options.tilePixelRatio) tilePixelRatio = parseInt(map.Extension.Options.tilePixelRatio[0], 10);
				const urls = (map.Extension.Options.urls || []).map((s) => strReplaceAll(s, "${", "{"));
				externalBaseLayers.push({
					name: sName,
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
/**
* @hidden
* @since 0.15
*/
function fetchInitDocument(_x, _x2) {
	return _fetchInitDocument.apply(this, arguments);
}
function _fetchInitDocument() {
	_fetchInitDocument = _asyncToGenerator(function* (options, client) {
		const { resourceId, locale } = options;
		let sessionWasReused = false;
		let session;
		if (!options.session) session = new AsyncLazy(_asyncToGenerator(function* () {
			if (!client) throw new MgError(tr("INIT_ERROR_NO_CONNECTION", locale));
			return yield client.createSession("Anonymous", "");
		}));
		else {
			sessionWasReused = true;
			session = new AsyncLazy(() => Promise.resolve(options.session));
		}
		if (!resourceId) {
			const cl = new Client("", "mapagent");
			try {
				return {
					document: yield cl.get("appdef.json"),
					session,
					sessionWasReused
				};
			} catch (e) {
				throw new MgError(tr("INIT_ERROR_MISSING_RESOURCE_PARAM", locale));
			}
		}
		if (typeof resourceId === "string") {
			if (strEndsWith(resourceId, "WebLayout")) {
				if (!client) throw new MgError(tr("INIT_ERROR_NO_CONNECTION", locale));
				return {
					document: yield client.getResource(resourceId, { SESSION: yield session.getValueAsync() }),
					session,
					sessionWasReused
				};
			}
			if (strEndsWith(resourceId, "ApplicationDefinition")) {
				if (!client) throw new MgError(tr("INIT_ERROR_NO_CONNECTION", locale));
				return {
					document: yield client.getResource(resourceId, { SESSION: yield session.getValueAsync() }),
					session,
					sessionWasReused
				};
			}
			if (isResourceId(resourceId)) throw new MgError(tr("INIT_ERROR_UNKNOWN_RESOURCE_TYPE", locale, { resourceId }));
			if (client) return {
				document: yield client.get(resourceId),
				session,
				sessionWasReused
			};
			return {
				document: yield new Client("", "mapagent").get(resourceId),
				session,
				sessionWasReused
			};
		}
		const document = yield resourceId();
		if (isAppDef(document) || isWebLayout(document)) return {
			document,
			session,
			sessionWasReused
		};
		throw new MgError(tr("INIT_ERROR_UNKNOWN_RESOURCE_TYPE", locale, { resourceId: "[function resource loader]" }));
	});
	return _fetchInitDocument.apply(this, arguments);
}
/**
* @hidden
* @since 0.15
*/
function initAppFromDocument(fetchResult, options) {
	return function() {
		var _ref2 = _asyncToGenerator(function* (dispatch, getState) {
			var _options$appSettings, _payload$appSettings;
			const args = getState().config;
			let client;
			if (args.agentUri && args.agentKind) client = new Client(args.agentUri, args.agentKind);
			const fullOptions = _objectSpread2(_objectSpread2({}, options), {}, { resourceId: function() {
				var _ref = _asyncToGenerator(function* () {
					return fetchResult.document;
				});
				return function resourceId() {
					return _ref.apply(this, arguments);
				};
			}() });
			yield initLocaleAsync(dispatch, fullOptions);
			const sessionWasReused = fetchResult.sessionWasReused;
			const payload = yield sessionAcquiredAsync(client, fullOptions, fetchResult.session, sessionWasReused);
			payload.sessionWasReused = sessionWasReused;
			if (sessionWasReused) {
				const initSelections = {};
				for (const mapName in payload.maps) {
					const sset = yield retrieveSelectionSetFromLocalStorage(fetchResult.session, mapName);
					if (sset) initSelections[mapName] = sset;
				}
				payload.initialSelections = initSelections;
				try {
					yield clearSessionStore();
				} catch (e) {}
			}
			let initPayload = payload;
			if (options.initialView) initPayload.initialView = _objectSpread2({}, options.initialView);
			if (options.initialActiveMap) initPayload.activeMapName = options.initialActiveMap;
			initPayload.initialHideGroups = options.initialHideGroups;
			initPayload.initialHideLayers = options.initialHideLayers;
			initPayload.initialShowGroups = options.initialShowGroups;
			initPayload.initialShowLayers = options.initialShowLayers;
			initPayload.featureTooltipsEnabled = options.featureTooltipsEnabled;
			const appSettings = (_options$appSettings = options.appSettings) !== null && _options$appSettings !== void 0 ? _options$appSettings : {};
			const inAppSettings = (_payload$appSettings = payload.appSettings) !== null && _payload$appSettings !== void 0 ? _payload$appSettings : {};
			for (const k in inAppSettings) appSettings[k] = inAppSettings[k];
			initPayload.appSettings = appSettings;
			dispatch({
				type: ActionType.INIT_APP,
				payload: initPayload
			});
		});
		return function(_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	}();
}
function acknowledgeInitWarnings() {
	return { type: ActionType.INIT_ACKNOWLEDGE_WARNINGS };
}
//#endregion
//#region src/containers/init-warning-display.tsx
var InitWarningDisplay = () => {
	const { Button, Dialog, DialogBody, DialogFooter, DialogFooterActions } = useElementContext();
	const dispatch = useReduxDispatch();
	const acknowledge = () => dispatch(acknowledgeInitWarnings());
	const warnings = useInitWarnings();
	const locale = useViewerLocale();
	if (warnings && warnings.length && acknowledge) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		icon: "warning-sign",
		isOpen: true,
		usePortal: false,
		onClose: acknowledge,
		title: tr("WARNING", locale),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogBody, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tr("INIT_WARNINGS_FOUND", locale) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: warnings.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: w }, w)) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooterActions, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "primary",
			onClick: acknowledge,
			children: tr("OK", locale)
		}) }) })]
	});
	else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("noscript", {});
};
//#endregion
//#region src/reducers/template.ts
init_objectSpread2();
var TEMPLATE_INITIAL_STATE = {
	initialInfoPaneWidth: 250,
	initialTaskPaneWidth: 300,
	taskPaneVisible: true,
	selectionPanelVisible: true,
	legendVisible: true,
	autoDisplaySelectionPanelOnSelection: true,
	templateData: {}
};
/**
* Checks if the given payload is an element state
*
* @param {*} args
* @returns {args is IElementState}
*/
function isElementState(args) {
	return args != null && typeof args.legendVisible != "undefined" && typeof args.selectionPanelVisible != "undefined" && typeof args.taskPaneVisible != "undefined";
}
var _ovReducer;
/**
* Installs a custom template reducer function. This is generally used by viewer templates
* which need to respond to template-related actions in a way that is unique to the template
*
* @param {ReducerFunction<ITemplateReducerState>} func
*/
function setCustomTemplateReducer(func) {
	_ovReducer = func;
}
function templateReducer(origState = TEMPLATE_INITIAL_STATE, action) {
	let state = origState;
	if (action.type == ActionType.MAP_SET_SELECTION) {
		const { selection } = action.payload;
		if (selection && selection.SelectedFeatures) {
			if (selection.SelectedFeatures.SelectedLayer.length && origState.autoDisplaySelectionPanelOnSelection) state = _objectSpread2(_objectSpread2({}, origState), {
				selectionPanelVisible: true,
				legendVisible: false,
				taskPaneVisible: false
			});
		}
	}
	if (action.type == ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE) {
		const { feature } = action.payload;
		if (feature === null || feature === void 0 ? void 0 : feature.properties) state = _objectSpread2(_objectSpread2({}, origState), {
			selectionPanelVisible: true,
			legendVisible: false,
			taskPaneVisible: false
		});
	}
	if (action.type == ActionType.FUSION_SET_TEMPLATE_CUSTOM_DATA) {
		const state1 = _objectSpread2({}, state);
		state1.templateData[action.payload.name] = action.payload.value;
		return state1;
	}
	if (typeof _ovReducer == "function") return _ovReducer(origState, state, action);
	else switch (action.type) {
		case ActionType.FUSION_SET_ELEMENT_STATE:
			if (isElementState(action.payload)) return _objectSpread2(_objectSpread2({}, state), action.payload);
			return state;
		case ActionType.INIT_APP: {
			let state1 = {};
			if (action.payload.initialTaskPaneWidth) state1.initialTaskPaneWidth = action.payload.initialTaskPaneWidth;
			if (action.payload.initialInfoPaneWidth) state1.initialInfoPaneWidth = action.payload.initialInfoPaneWidth;
			return _objectSpread2(_objectSpread2({}, state), state1);
		}
	}
	return state;
}
//#endregion
//#region src/layouts/hooks.ts
function useCommonTemplateState(templateReducer) {
	const [isResizing, setIsResizing] = import_react.useState(false);
	const locale = useViewerLocale();
	const capabilities = useConfiguredCapabilities();
	const showSelection = useTemplateSelectionVisible();
	const showLegend = useTemplateLegendVisible();
	const showTaskPane = useTemplateTaskPaneVisible();
	const dispatch = useReduxDispatch();
	const setElementStatesAction = import_react.useCallback((states) => dispatch(setElementStates(states)), [dispatch]);
	const onDragStart = () => setIsResizing(true);
	const onDragEnd = () => setIsResizing(false);
	const viewer = useMapProviderContext();
	import_react.useEffect(() => {
		if (templateReducer) setCustomTemplateReducer(templateReducer);
	}, []);
	const onSplitterChanged = () => {
		if (viewer.isReady()) viewer.updateSize();
	};
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
		onActiveElementChanged: import_react.useCallback((id) => {
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
			if (states.legendVisible || states.taskPaneVisible || states.selectionPanelVisible) setElementStatesAction(states);
		}, [setElementStatesAction]),
		dispatch
	};
}
//#endregion
//#region src/components/splitter-layout.tsx
var Pane = (props) => {
	const size = props.size || 0;
	const unit = props.percentage ? "%" : "px";
	let classes = "layout-pane";
	const style = {};
	if (!props.primary) if (props.vertical) style.height = `${size}${unit}`;
	else style.width = `${size}${unit}`;
	else classes += " layout-pane-primary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: classes,
		style,
		children: props.children
	});
};
function clearSelection() {
	if (window.getSelection) {
		const sel = window.getSelection();
		if (sel) {
			if (sel.empty) sel.empty();
			else if (sel.removeAllRanges) sel.removeAllRanges();
		}
	}
}
var DEFAULT_SPLITTER_SIZE = 4;
/**
* @hidden
*/
var SplitterLayout = (props) => {
	const [resizing, setResizing] = import_react.useState(false);
	const [secondaryPaneSize, setSecondaryPaneSize] = import_react.useState(0);
	const containerRef = import_react.useRef(null);
	const splitterRef = import_react.useRef(null);
	const getSecondaryPaneSize = import_react.useCallback((containerRect, splitterRect, clientPosition, offsetMouse) => {
		var _props$primaryMinSize, _props$secondaryMinSi;
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
		if (offsetMouse) offset -= splitterSize / 2;
		if (offset < 0) offset = 0;
		else if (offset > totalSize - splitterSize) offset = totalSize - splitterSize;
		let secondaryPaneSize;
		if (props.primaryIndex === 1) secondaryPaneSize = offset;
		else secondaryPaneSize = totalSize - splitterSize - offset;
		let primaryPaneSize = totalSize - splitterSize - secondaryPaneSize;
		if (props.percentage) {
			secondaryPaneSize = secondaryPaneSize * 100 / totalSize;
			primaryPaneSize = primaryPaneSize * 100 / totalSize;
			splitterSize = splitterSize * 100 / totalSize;
			totalSize = 100;
		}
		const pMinSize = (_props$primaryMinSize = props.primaryMinSize) !== null && _props$primaryMinSize !== void 0 ? _props$primaryMinSize : 0;
		const sMinSize = (_props$secondaryMinSi = props.secondaryMinSize) !== null && _props$secondaryMinSi !== void 0 ? _props$secondaryMinSi : 0;
		if (primaryPaneSize < pMinSize) secondaryPaneSize = Math.max(secondaryPaneSize - (pMinSize - primaryPaneSize), 0);
		else if (secondaryPaneSize < sMinSize) secondaryPaneSize = Math.min(totalSize - splitterSize - pMinSize, sMinSize);
		return secondaryPaneSize;
	}, [
		props.vertical,
		props.primaryIndex,
		props.percentage,
		props.primaryMinSize,
		props.secondaryMinSize
	]);
	import_react.useEffect(() => {
		let secondaryPaneSizeInit = 0;
		if (typeof props.secondaryInitialSize !== "undefined") secondaryPaneSizeInit = props.secondaryInitialSize;
		else if (containerRef.current) {
			const containerRect = containerRef.current.getBoundingClientRect();
			let splitterRect;
			if (splitterRef.current) splitterRect = splitterRef.current.getBoundingClientRect();
			else splitterRect = {
				width: DEFAULT_SPLITTER_SIZE,
				height: DEFAULT_SPLITTER_SIZE
			};
			secondaryPaneSizeInit = getSecondaryPaneSize(containerRect, splitterRect, {
				left: containerRect.left + (containerRect.width - splitterRect.width) / 2,
				top: containerRect.top + (containerRect.height - splitterRect.height) / 2
			}, false);
		}
		setSecondaryPaneSize(secondaryPaneSizeInit);
	}, []);
	import_react.useEffect(() => {
		function handleResize() {
			if (splitterRef.current && containerRef.current && !props.percentage) {
				const containerRect = containerRef.current.getBoundingClientRect();
				const splitterRect = splitterRef.current.getBoundingClientRect();
				setSecondaryPaneSize(getSecondaryPaneSize(containerRect, splitterRect, {
					left: splitterRect.left,
					top: splitterRect.top
				}, false));
			}
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [getSecondaryPaneSize, props.percentage]);
	import_react.useEffect(() => {
		function handleMouseMove(e) {
			if (resizing && containerRef.current && splitterRef.current) {
				var _e$clientX, _e$clientY;
				const newSize = getSecondaryPaneSize(containerRef.current.getBoundingClientRect(), splitterRef.current.getBoundingClientRect(), {
					left: (_e$clientX = e.clientX) !== null && _e$clientX !== void 0 ? _e$clientX : e.clientX,
					top: (_e$clientY = e.clientY) !== null && _e$clientY !== void 0 ? _e$clientY : e.clientY
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
	import_react.useEffect(() => {
		if (props.onSecondaryPaneSizeChange) props.onSecondaryPaneSizeChange(secondaryPaneSize);
	}, [secondaryPaneSize]);
	import_react.useEffect(() => {
		if (resizing && props.onDragStart) props.onDragStart();
		else if (!resizing && props.onDragEnd) props.onDragEnd();
	}, [resizing]);
	const handleSplitterMouseDown = import_react.useCallback(() => {
		clearSelection();
		setResizing(true);
	}, []);
	let containerClasses = "splitter-layout";
	if (props.customClassName) containerClasses += ` ${props.customClassName}`;
	if (props.vertical) containerClasses += " splitter-layout-vertical";
	if (resizing) containerClasses += " layout-changing";
	const children = import_react.Children.toArray(props.children).slice(0, 2);
	if (children.length === 0) children.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}));
	const wrappedChildren = [];
	const primaryIndex = props.primaryIndex !== 0 && props.primaryIndex !== 1 ? 0 : props.primaryIndex;
	for (let i = 0; i < children.length; ++i) {
		let primary = true;
		let size = null;
		if (children.length > 1 && i !== primaryIndex) {
			primary = false;
			size = secondaryPaneSize;
		}
		wrappedChildren.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pane, {
			vertical: props.vertical,
			percentage: props.percentage,
			primary,
			size,
			children: children[i]
		}, i));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: containerClasses,
		ref: containerRef,
		children: [
			wrappedChildren[0],
			wrappedChildren.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "separator",
				className: "layout-splitter",
				ref: splitterRef,
				onMouseDown: handleSplitterMouseDown,
				onTouchStart: handleSplitterMouseDown
			}),
			wrappedChildren.length > 1 && wrappedChildren[1]
		]
	});
};
//#endregion
//#region src/layouts/ajax-viewer.tsx
var DEFAULT_LEGEND_COMPONENT_PROPS$5 = { inlineBaseLayerSwitcher: true };
/**
* A viewer template that resembles the MapGuide AJAX viewer
*/
var AjaxViewerLayout = () => {
	const { isResizing, locale, capabilities, onDragStart, onDragEnd, onSplitterChanged } = useCommonTemplateState();
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
	const topOffset = hasToolbar ? 29 : 0;
	const bottomOffset = hasStatusBar ? 20 : 0;
	const lgStyle = {};
	const selStyle = {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			width: "100%",
			height: "100%"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "absolute",
					left: 0,
					right: 0,
					top: 0,
					bottom: bottomOffset
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SplitterLayout, {
					customClassName: "ajax-viewer-splitter",
					primaryIndex: 0,
					secondaryInitialSize: initTaskPaneWidth,
					onDragStart,
					onDragEnd,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [(() => {
						if (hasToolbar) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
							id: WEBLAYOUT_TOOLBAR,
							containerStyle: {
								position: "absolute",
								left: 0,
								top: 0,
								right: 0,
								zIndex: TB_Z_INDEX,
								backgroundColor: TOOLBAR_BACKGROUND_COLOR
							}
						});
					})(), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							position: "absolute",
							left: 0,
							top: topOffset,
							bottom: 0,
							right: 0
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SplitterLayout, {
							customClassName: "ajax-viewer-splitter",
							primaryIndex: 1,
							secondaryInitialSize: initInfoPaneWidth,
							onSecondaryPaneSizeChange: onSplitterChanged,
							children: [(() => {
								if (hasLegend || hasSelectionPanel) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SplitterLayout, {
									customClassName: "ajax-viewer-splitter",
									vertical: true,
									onDragStart,
									onDragEnd,
									children: [(() => {
										if (hasLegend) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "ajax-sidebar-panel",
											style: lgStyle,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "ajax-sidebar-panel-heading",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tr("TPL_TITLE_LEGEND", locale) })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "ajax-sidebar-panel-body",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
													id: DefaultComponentNames.Legend,
													locale,
													componentProps: DEFAULT_LEGEND_COMPONENT_PROPS$5
												})
											})]
										});
									})(), (() => {
										if (hasSelectionPanel) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "ajax-sidebar-panel",
											style: selStyle,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "ajax-sidebar-panel-heading",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tr("TPL_TITLE_SELECTION_PANEL", locale) })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "ajax-sidebar-panel-body",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
													id: DefaultComponentNames.SelectionPanel,
													locale
												})
											})]
										});
									})()]
								});
							})(), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									position: "absolute",
									left: 0,
									right: 0,
									top: 0,
									bottom: 0
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
									id: DefaultComponentNames.Map,
									locale
								}), (() => {
									if (hasNavigator) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
										id: DefaultComponentNames.Navigator,
										locale
									});
								})()]
							})]
						})
					})] }), (() => {
						if (hasTaskPane) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							locale,
							id: DefaultComponentNames.TaskPane,
							componentProps: { isResizing }
						});
					})()]
				})
			}),
			(() => {
				if (hasStatusBar) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						position: "absolute",
						left: 0,
						right: 0,
						bottom: 0,
						height: bottomOffset,
						backgroundColor: TOOLBAR_BACKGROUND_COLOR
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.MouseCoordinates,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.ScaleDisplay,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.ViewSize,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.SelectedFeatureCount,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.PoweredByMapGuide,
							locale
						})
					]
				});
			})(),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerApiShim, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalLauncher, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlyoutRegionContainer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InitWarningDisplay, {})
		]
	});
};
//#endregion
//#region src/layouts/sidebar.tsx
init_objectSpread2();
var DEFAULT_LEGEND_COMPONENT_PROPS$4 = { inlineBaseLayerSwitcher: true };
function sidebarTemplateReducer(origState, state, action) {
	switch (action.type) {
		case ActionType.MAP_SET_SELECTION: {
			const { selection } = action.payload;
			if (selection && selection.SelectedFeatures) {
				let autoExpandSelectionPanel = origState.autoDisplaySelectionPanelOnSelection;
				if (isMobileViewport()) return origState;
				if (selection.SelectedFeatures.SelectedLayer.length && autoExpandSelectionPanel) return _objectSpread2(_objectSpread2({}, origState), {
					selectionPanelVisible: true,
					taskPaneVisible: false,
					legendVisible: false
				});
			}
			return state;
		}
		case ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE: {
			const { feature } = action.payload;
			if (feature === null || feature === void 0 ? void 0 : feature.properties) {
				let autoExpandSelectionPanel = origState.autoDisplaySelectionPanelOnSelection;
				if (isMobileViewport()) return origState;
				if (autoExpandSelectionPanel) return _objectSpread2(_objectSpread2({}, origState), {
					selectionPanelVisible: true,
					taskPaneVisible: false,
					legendVisible: false
				});
			}
		}
		case ActionType.FUSION_SET_LEGEND_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1;
				if (data === true) state1 = {
					legendVisible: true,
					taskPaneVisible: false,
					selectionPanelVisible: false
				};
				else state1 = { legendVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1;
				if (data === true) state1 = {
					legendVisible: false,
					taskPaneVisible: false,
					selectionPanelVisible: true
				};
				else state1 = { selectionPanelVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.TASK_INVOKE_URL: return _objectSpread2(_objectSpread2({}, state), {
			taskPaneVisible: true,
			selectionPanelVisible: false,
			legendVisible: false
		});
		case ActionType.FUSION_SET_TASK_PANE_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1;
				if (data === true) state1 = {
					legendVisible: false,
					taskPaneVisible: true,
					selectionPanelVisible: false
				};
				else state1 = { taskPaneVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.FUSION_SET_ELEMENT_STATE: {
			const data = action.payload;
			if (isElementState(data)) return _objectSpread2(_objectSpread2({}, state), data);
		}
	}
	return state;
}
var SidebarHeader = (props) => {
	const sbHeaderStyle = {
		position: "absolute",
		top: 0,
		right: 0,
		height: 40,
		left: 0,
		margin: 0
	};
	sbHeaderStyle.paddingLeft = 10;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
		style: sbHeaderStyle,
		className: "sidebar-header",
		children: [props.text, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sidebar-close",
			onClick: props.onCloseClick,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "icon-left-open" })
		})]
	});
};
var Sidebar = (props) => {
	const { Spinner, Icon } = useElementContext();
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
	const lastAction = useLastDispatchedAction();
	import_react.useEffect(() => {
		switch (lastAction.type) {
			case ActionType.TASK_INVOKE_URL:
				props.onActivateTab("tasks", false);
				break;
			case ActionType.MAP_SET_SELECTION:
			case ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE: break;
		}
	}, [lastAction]);
	const { position, busy, collapsed, activeTab } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `sidebar ${collapsed ? "collapsed" : ""} sidebar-${position}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sidebar-tabs",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				role: "tablist",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: (() => {
						if (busy === true) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { sizePreset: "small" }) });
						else if (collapsed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							onClick: onClickExpand,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { icon: "menu-open" })
						});
						else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							onClick: onClickCollapse,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { icon: "menu-closed" })
						});
					})() }),
					(() => {
						if (props.taskpane) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: collapsed == false && activeTab == "tasks" ? "active" : "",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								onClick: onActivateTasks,
								title: tr("TPL_SIDEBAR_OPEN_TASKPANE", props.locale),
								role: "tab",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { icon: "application" })
							})
						});
					})(),
					(() => {
						if (props.legend) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: collapsed == false && activeTab == "legend" ? "active" : "",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								onClick: onActivateLegend,
								title: tr("TPL_SIDEBAR_OPEN_LEGEND", props.locale),
								role: "tab",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { icon: "layers" })
							})
						});
					})(),
					(() => {
						if (props.selection) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: collapsed == false && activeTab == "selection" ? "active" : "",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								onClick: onActivateSelection,
								title: tr("TPL_SIDEBAR_OPEN_SELECTION_PANEL", props.locale),
								role: "tab",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { icon: "th" })
							}), props.hasSelection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sidebar-has-selection-badge",
								children: "\xA0"
							})]
						});
					})(),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: "sidebar-separator" })
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sidebar-content",
			children: [
				(() => {
					if (props.taskpane) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `sidebar-pane ${activeTab == "tasks" ? "active" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeader, {
							text: tr("TPL_TITLE_TASKPANE", props.locale),
							onCloseClick: onClickCollapse
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								position: "absolute",
								top: 40,
								bottom: 0,
								right: 0,
								left: 0
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
								id: DefaultComponentNames.TaskPane,
								locale: props.locale
							})
						})]
					});
				})(),
				(() => {
					if (props.legend) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `sidebar-pane ${activeTab == "legend" ? "active" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeader, {
							text: tr("TPL_TITLE_LEGEND", props.locale),
							onCloseClick: onClickCollapse
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								position: "absolute",
								top: 40,
								bottom: 0,
								right: 0,
								left: 0,
								overflow: "auto"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
								id: DefaultComponentNames.Legend,
								locale: props.locale,
								componentProps: DEFAULT_LEGEND_COMPONENT_PROPS$4
							})
						})]
					});
				})(),
				(() => {
					if (props.selection) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `sidebar-pane ${activeTab == "selection" ? "active" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeader, {
							text: tr("TPL_TITLE_SELECTION_PANEL", props.locale),
							onCloseClick: onClickCollapse
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								position: "absolute",
								top: 40,
								bottom: 0,
								right: 0,
								left: 0
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
								id: DefaultComponentNames.SelectionPanel,
								locale: props.locale
							})
						})]
					});
				})()
			]
		})]
	});
};
/**
* A viewer template that is based on the design of the {@link https://github.com/Turbo87/sidebar-v2 Sidebar Map Layout}
*/
var SidebarLayout = () => {
	const { dispatch, locale, capabilities, showSelection, showLegend, showTaskPane } = useCommonTemplateState(sidebarTemplateReducer);
	const tbState = useReducedToolbarAppState();
	const setElementStatesAction = (states) => dispatch(setElementStates(states));
	const { hasTaskPane, hasStatusBar, hasNavigator, hasSelectionPanel, hasLegend, hasViewSize, hasToolbar } = capabilities;
	const busyCount = useViewerBusyCount();
	let defaultActiveTab = "tasks";
	if (showLegend) defaultActiveTab = "legend";
	else if (showSelection) defaultActiveTab = "selection";
	const [activeTab, setActiveTab] = import_react.useState(defaultActiveTab);
	import_react.useEffect(() => {
		let tab = "tasks";
		if (showLegend) tab = "legend";
		else if (showSelection) tab = "selection";
		setActiveTab(tab);
	}, [
		showLegend,
		showSelection,
		showTaskPane
	]);
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
		if (est.legendVisible || est.selectionPanelVisible || est.taskPaneVisible) setElementStatesAction(est);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			width: "100%",
			height: "100%"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
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
			}),
			(() => {
				if (hasToolbar) {
					const toolbarBottom = isMobileViewport() ? 0 : 6;
					const toolbarInnerBottom = isMobileViewport() ? 0 : 2;
					let top = 180;
					if (!hasSelectionPanel) top -= 40;
					if (!hasLegend) top -= 40;
					if (!hasTaskPane) top -= 40;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: "toolbar-region",
						style: {
							top,
							bottom: toolbarBottom
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
							id: WEBLAYOUT_TOOLBAR,
							containerClass: "sidebar-toolbar",
							vertical: true,
							hideVerticalLabels: true,
							containerStyle: {
								position: "absolute",
								top: 0,
								bottom: toolbarInnerBottom,
								left: 4,
								right: 6,
								zIndex: 100
							}
						})
					});
				}
			})(),
			(() => {
				if (hasNavigator) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
					id: DefaultComponentNames.Navigator,
					locale
				});
			})(),
			(() => {
				if (hasStatusBar) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
					id: DefaultComponentNames.MouseCoordinates,
					locale
				});
			})(),
			(() => {
				if (hasStatusBar) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
					id: DefaultComponentNames.ScaleDisplay,
					locale
				});
			})(),
			(() => {
				if (hasViewSize) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
					id: DefaultComponentNames.ViewSize,
					locale
				});
			})(),
			(() => {
				if (hasStatusBar) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
					id: DefaultComponentNames.SelectedFeatureCount,
					locale
				});
			})(),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerApiShim, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalLauncher, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlyoutRegionContainer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InitWarningDisplay, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
				id: DefaultComponentNames.Map,
				locale
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
				id: DefaultComponentNames.PoweredByMapGuide,
				locale
			})
		]
	});
};
//#endregion
//#region src/containers/hooks-generic.ts
function useActiveMapSubjectLayer() {
	return useAppState((state) => {
		if (state.config.activeMapName) {
			var _state$mapState$state;
			return (_state$mapState$state = state.mapState[state.config.activeMapName].generic) === null || _state$mapState$state === void 0 ? void 0 : _state$mapState$state.subject;
		}
	});
}
//#endregion
//#region src/layouts/aqua.tsx
init_objectSpread2();
function aquaTemplateReducer(origState, state, action) {
	switch (action.type) {
		case ActionType.MAP_SET_SELECTION: {
			const { selection } = action.payload;
			if (selection && selection.SelectedFeatures) {
				if (selection.SelectedFeatures.SelectedLayer.length && origState.autoDisplaySelectionPanelOnSelection) return _objectSpread2(_objectSpread2({}, origState), { selectionPanelVisible: true });
			}
			return state;
		}
		case ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE: {
			const { feature } = action.payload;
			if (feature === null || feature === void 0 ? void 0 : feature.properties) return _objectSpread2(_objectSpread2({}, origState), { selectionPanelVisible: true });
			return state;
		}
		case ActionType.FUSION_SET_LEGEND_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1 = { legendVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1 = { selectionPanelVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.TASK_INVOKE_URL: return _objectSpread2(_objectSpread2({}, state), { taskPaneVisible: true });
		case ActionType.FUSION_SET_TASK_PANE_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1 = { taskPaneVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
	}
	return state;
}
var SELECTION_DIALOG_HEIGHT = 300;
var LEGEND_DIALOG_HEIGHT = 400;
var TASK_DIALOG_HEIGHT = 500;
var STATUS_BAR_HEIGHT$4 = 18;
var AQUA_VERTICAL_TOOLBAR_WIDTH = 31;
/**
* A viewer template that resembles the Aqua Fusion template
*/
var AquaTemplateLayout = () => {
	const { locale, capabilities, showSelection, showLegend, showTaskPane, dispatch } = useCommonTemplateState(aquaTemplateReducer);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			width: "100%",
			height: "100%"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
				id: "FileMenu",
				containerClass: "aqua-file-menu",
				containerStyle: {
					position: "absolute",
					left: 0,
					top: 0,
					zIndex: TB_Z_INDEX,
					right: 0
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
				id: "Toolbar",
				containerClass: "aqua-toolbar",
				containerStyle: {
					position: "absolute",
					left: 0,
					top: 29,
					height: 29,
					zIndex: TB_Z_INDEX,
					right: 0
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
				id: "ToolbarVertical",
				containerClass: "aqua-toolbar-vertical",
				vertical: true,
				containerStyle: {
					position: "absolute",
					left: 0,
					top: 57,
					zIndex: TB_Z_INDEX,
					bottom: bottomOffset
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
				id: "ToolbarVertical",
				containerClass: "aqua-toolbar-vertical",
				vertical: true,
				containerStyle: {
					position: "absolute",
					left: 0,
					top: 57,
					zIndex: TB_Z_INDEX,
					bottom: bottomOffset,
					width: AQUA_VERTICAL_TOOLBAR_WIDTH
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					position: "absolute",
					left,
					top: 58,
					bottom: bottomOffset,
					right
				},
				children: [(() => {
					if (map !== null && map !== void 0 ? map : subject) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
						id: DefaultComponentNames.Map,
						locale
					});
				})(), (() => {
					if (hasNavigator) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
						id: DefaultComponentNames.Navigator,
						locale
					});
				})()]
			}),
			(() => {
				if (hasStatusBar) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "aqua-status-bar",
					style: {
						position: "absolute",
						left: 0,
						bottom: 0,
						right: 0,
						height: bottomOffset
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.MouseCoordinates,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.ScaleDisplay,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.SelectedFeatureCount,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.ViewSize,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.PoweredByMapGuide,
							locale
						})
					]
				});
			})(),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerApiShim, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalLauncher, { children: [
				(() => {
					if (hasSelectionPanel) {
						const pos = posSelection !== null && posSelection !== void 0 ? posSelection : [40, 500];
						const size = sizeSelection !== null && sizeSelection !== void 0 ? sizeSelection : [initInfoPaneWidth, SELECTION_DIALOG_HEIGHT];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RndModalDialog, {
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
							children: ([, h]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
								locale,
								id: DefaultComponentNames.SelectionPanel,
								componentProps: { maxHeight: h }
							})
						});
					}
				})(),
				(() => {
					if (hasLegend) {
						const pos = posLegend !== null && posLegend !== void 0 ? posLegend : [40, 70];
						const size = sizeLegend !== null && sizeLegend !== void 0 ? sizeLegend : [initInfoPaneWidth, LEGEND_DIALOG_HEIGHT];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RndModalDialog, {
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
							children: ([, h]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
								locale,
								id: DefaultComponentNames.Legend,
								componentProps: {
									inlineBaseLayerSwitcher: false,
									maxHeight: h
								}
							})
						});
					}
				})(),
				(() => {
					if (hasTaskPane) {
						const pos = posTaskPane !== null && posTaskPane !== void 0 ? posTaskPane : [document.body.clientWidth - initTaskPaneWidth - 70, 80];
						const size = sizeTaskPane !== null && sizeTaskPane !== void 0 ? sizeTaskPane : [initTaskPaneWidth, TASK_DIALOG_HEIGHT];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RndModalDialog, {
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
							children: ([, h]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
								locale,
								id: DefaultComponentNames.TaskPane,
								componentProps: { maxHeight: h - 15 }
							})
						});
					}
				})()
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlyoutRegionContainer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InitWarningDisplay, {})
		]
	});
};
//#endregion
//#region src/layouts/turquoise-yellow.tsx
init_objectSpread2();
function turquoiseYellowTemplateReducer(origState, state, action) {
	switch (action.type) {
		case ActionType.FUSION_SET_LEGEND_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1;
				if (data === true) state1 = {
					legendVisible: true,
					taskPaneVisible: false,
					selectionPanelVisible: false
				};
				else state1 = { legendVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1;
				if (data === true) state1 = {
					legendVisible: false,
					taskPaneVisible: false,
					selectionPanelVisible: true
				};
				else state1 = { selectionPanelVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.TASK_INVOKE_URL: return _objectSpread2(_objectSpread2({}, state), {
			taskPaneVisible: true,
			selectionPanelVisible: false,
			legendVisible: false
		});
		case ActionType.FUSION_SET_TASK_PANE_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1;
				if (data === true) state1 = {
					legendVisible: false,
					taskPaneVisible: true,
					selectionPanelVisible: false
				};
				else state1 = { taskPaneVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.FUSION_SET_ELEMENT_STATE: {
			const data = action.payload;
			if (isElementState(data)) return _objectSpread2(_objectSpread2({}, state), data);
		}
	}
	return state;
}
var SIDEBAR_PADDING$1 = 3;
var TOP_BAR_HEIGHT$1 = 29;
var TAB_BAR_HEIGHT$1 = 30;
var STATUS_BAR_HEIGHT$3 = 18;
var DEFAULT_LEGEND_COMPONENT_PROPS$3 = { inlineBaseLayerSwitcher: false };
/**
* A viewer template that resembles the TurquoiseYellow Fusion template
*/
var TurquoiseYellowTemplateLayout = () => {
	const { isResizing, locale, capabilities, showSelection, showLegend, showTaskPane, onDragStart, onDragEnd, onSplitterChanged, onActiveElementChanged } = useCommonTemplateState(turquoiseYellowTemplateReducer);
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
	const active = [
		{
			id: "Selection",
			visible: showSelection
		},
		{
			id: "TaskPane",
			visible: showTaskPane
		},
		{
			id: "Legend",
			visible: showLegend
		}
	].filter((st) => st.visible);
	let extraTabsProps = {};
	if (active.length == 1) extraTabsProps.activeTabId = active[0].id;
	const taskPaneTitle = tr("TPL_TITLE_TASKPANE", locale);
	const legendTitle = tr("TPL_TITLE_LEGEND", locale);
	const selectionTitle = tr("TPL_TITLE_SELECTION_PANEL", locale);
	const TB_Z_INDEX = 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			width: "100%",
			height: "100%"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "absolute",
					left: 0,
					top: 0,
					bottom: bottomOffset,
					right: 0
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SplitterLayout, {
					customClassName: "turquoise-yellow-splitter",
					primaryIndex: 1,
					secondaryInitialSize: sbWidth,
					onSecondaryPaneSizeChange: onSplitterChanged,
					onDragStart,
					onDragEnd,
					children: [(() => {
						if (showSelection || showTaskPane || showLegend) {
							const tabProps = _objectSpread2({
								id: "SidebarTabs",
								onTabChanged: onActiveElementChanged,
								className: "turquoise-yellow-sb-tabs",
								tabs: []
							}, extraTabsProps);
							if (hasTaskPane) {
								const panel = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: tabPanelStyle,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
										id: DefaultComponentNames.TaskPane,
										locale,
										componentProps: { isResizing }
									})
								});
								tabProps.tabs.push({
									id: "TaskPane",
									title: taskPaneTitle,
									content: panel
								});
							}
							if (hasLegend) {
								const panel = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: _objectSpread2(_objectSpread2({}, tabPanelStyle), { overflow: "auto" }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
										id: DefaultComponentNames.Legend,
										locale,
										componentProps: DEFAULT_LEGEND_COMPONENT_PROPS$3
									})
								});
								tabProps.tabs.push({
									id: "Legend",
									title: legendTitle,
									content: panel
								});
							}
							if (hasSelectionPanel) {
								const panel = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: tabPanelStyle,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
										id: DefaultComponentNames.SelectionPanel,
										locale
									})
								});
								tabProps.tabs.push({
									id: "Selection",
									title: selectionTitle,
									content: panel
								});
							}
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "turquoise-yellow-sidebar",
								style: {
									position: "absolute",
									left: SIDEBAR_PADDING$1,
									top: TOP_BAR_HEIGHT$1,
									bottom: SIDEBAR_PADDING$1,
									right: 0
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabSet, _objectSpread2({}, tabProps))
							});
						}
					})(), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
							id: "FileMenu",
							containerClass: "turquoise-yellow-file-menu",
							containerStyle: {
								position: "absolute",
								left: 0,
								top: 0,
								zIndex: TB_Z_INDEX,
								right: 0
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
							id: "Toolbar",
							containerClass: "turquoise-yellow-toolbar",
							containerStyle: {
								position: "absolute",
								left: 0,
								top: TOP_BAR_HEIGHT$1,
								zIndex: TB_Z_INDEX,
								right: 0
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
							id: "ToolbarVertical",
							containerClass: "turquoise-yellow-toolbar-vertical",
							vertical: true,
							containerStyle: {
								position: "absolute",
								left: 0,
								top: TOP_BAR_HEIGHT$1 + 29,
								zIndex: TB_Z_INDEX,
								bottom: SIDEBAR_PADDING$1
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								position: "absolute",
								left: 29,
								top: TOP_BAR_HEIGHT$1 + 29,
								bottom: SIDEBAR_PADDING$1,
								right: 0
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
								id: DefaultComponentNames.Map,
								locale
							}), (() => {
								if (hasNavigator) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
									id: DefaultComponentNames.Navigator,
									locale
								});
							})()]
						})
					] })]
				})
			}),
			(() => {
				if (hasStatusBar) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "turquoise-yellow-status-bar",
					style: {
						position: "absolute",
						left: 0,
						bottom: 0,
						right: 0,
						height: bottomOffset
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.MouseCoordinates,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.ScaleDisplay,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.SelectedFeatureCount,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.ViewSize,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.PoweredByMapGuide,
							locale
						})
					]
				});
			})(),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerApiShim, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalLauncher, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlyoutRegionContainer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InitWarningDisplay, {})
		]
	});
};
//#endregion
//#region src/layouts/limegold.tsx
init_objectSpread2();
function limegoldTemplateReducer(origState, state, action) {
	switch (action.type) {
		case ActionType.FUSION_SET_LEGEND_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1;
				if (data === true) state1 = {
					legendVisible: true,
					taskPaneVisible: false,
					selectionPanelVisible: false
				};
				else state1 = { legendVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1;
				if (data === true) state1 = {
					legendVisible: false,
					taskPaneVisible: false,
					selectionPanelVisible: true
				};
				else state1 = { selectionPanelVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.TASK_INVOKE_URL: return _objectSpread2(_objectSpread2({}, state), {
			taskPaneVisible: true,
			selectionPanelVisible: false,
			legendVisible: false
		});
		case ActionType.FUSION_SET_TASK_PANE_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1;
				if (data === true) state1 = {
					legendVisible: false,
					taskPaneVisible: true,
					selectionPanelVisible: false
				};
				else state1 = { taskPaneVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.FUSION_SET_ELEMENT_STATE: {
			const data = action.payload;
			if (isElementState(data)) return _objectSpread2(_objectSpread2({}, state), data);
		}
	}
	return state;
}
var SIDEBAR_PADDING = 0;
var TOP_BAR_HEIGHT = 29;
var TAB_BAR_HEIGHT = 30;
var STATUS_BAR_HEIGHT$2 = 18;
var DEFAULT_LEGEND_COMPONENT_PROPS$2 = { inlineBaseLayerSwitcher: false };
/**
* A viewer template that resembles the LimeGold Fusion template
*/
var LimeGoldTemplateLayout = () => {
	const { isResizing, locale, capabilities, showSelection, showLegend, showTaskPane, onDragStart, onDragEnd, onSplitterChanged, onActiveElementChanged } = useCommonTemplateState(limegoldTemplateReducer);
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
	const topOffset = TOP_BAR_HEIGHT + 58;
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
	const active = [
		{
			id: "Selection",
			visible: showSelection
		},
		{
			id: "TaskPane",
			visible: showTaskPane
		},
		{
			id: "Legend",
			visible: showLegend
		}
	].filter((st) => st.visible);
	let extraTabsProps = {};
	if (active.length == 1) extraTabsProps.activeTabId = active[0].id;
	const taskPaneTitle = tr("TPL_TITLE_TASKPANE", locale);
	const legendTitle = tr("TPL_TITLE_LEGEND", locale);
	const selectionTitle = tr("TPL_TITLE_SELECTION_PANEL", locale);
	const TB_Z_INDEX = 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			width: "100%",
			height: "100%"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
				id: "FileMenu",
				containerClass: "limegold-file-menu",
				containerStyle: {
					position: "absolute",
					left: 0,
					top: (TOP_BAR_HEIGHT - 29) / 2,
					zIndex: TB_Z_INDEX,
					right: 0
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
				id: "Toolbar",
				containerClass: "limegold-toolbar",
				containerStyle: {
					position: "absolute",
					left: 0,
					top: TOP_BAR_HEIGHT,
					zIndex: TB_Z_INDEX,
					right: 0
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
				id: "ToolbarSecondary",
				containerClass: "limegold-toolbar-secondary",
				containerStyle: {
					position: "absolute",
					left: 0,
					top: TOP_BAR_HEIGHT + 29,
					zIndex: TB_Z_INDEX,
					right: 0
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "absolute",
					left: 0,
					top: topOffset,
					bottom: bottomOffset + SIDEBAR_PADDING,
					right: 0
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SplitterLayout, {
					customClassName: "limegold-splitter",
					primaryIndex: 0,
					secondaryInitialSize: sbWidth,
					onSecondaryPaneSizeChange: onSplitterChanged,
					onDragStart,
					onDragEnd,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							position: "absolute",
							left: 0,
							right: 0,
							top: 0,
							bottom: 0
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.Map,
							locale
						}), (() => {
							if (hasNavigator) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
								id: DefaultComponentNames.Navigator,
								locale
							});
						})()]
					}), (() => {
						if (showSelection || showTaskPane || showLegend) {
							const tabProps = _objectSpread2({
								id: "SidebarTabs",
								onTabChanged: onActiveElementChanged,
								className: "limegold-sidebar-tabs",
								tabs: []
							}, extraTabsProps);
							if (hasTaskPane) {
								const panel = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: tabPanelStyle,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
										id: DefaultComponentNames.TaskPane,
										locale,
										componentProps: { isResizing }
									})
								});
								tabProps.tabs.push({
									id: "TaskPane",
									title: taskPaneTitle,
									content: panel
								});
							}
							if (hasLegend) {
								const panel = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: _objectSpread2(_objectSpread2({}, tabPanelStyle), { overflow: "auto" }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
										id: DefaultComponentNames.Legend,
										locale,
										componentProps: DEFAULT_LEGEND_COMPONENT_PROPS$2
									})
								});
								tabProps.tabs.push({
									id: "Legend",
									title: legendTitle,
									content: panel
								});
							}
							if (hasSelectionPanel) {
								const panel = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: tabPanelStyle,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
										id: DefaultComponentNames.SelectionPanel,
										locale
									})
								});
								tabProps.tabs.push({
									id: "Selection",
									title: selectionTitle,
									content: panel
								});
							}
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "limegold-sidebar",
								style: {
									position: "absolute",
									right: SIDEBAR_PADDING,
									top: 0,
									left: 0,
									bottom: 0
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabSet, _objectSpread2({}, tabProps))
							});
						}
					})()]
				})
			}),
			(() => {
				if (hasStatusBar) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "limegold-status-bar",
					style: {
						position: "absolute",
						left: 0,
						bottom: 0,
						right: 0,
						height: bottomOffset
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.MouseCoordinates,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.ScaleDisplay,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.SelectedFeatureCount,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.ViewSize,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.PoweredByMapGuide,
							locale
						})
					]
				});
			})(),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerApiShim, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalLauncher, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlyoutRegionContainer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InitWarningDisplay, {})
		]
	});
};
//#endregion
//#region src/utils/use-resize-observer.ts
/**
* @file use-resize-observer.ts
* In-house implementation of the useResizeObserver hook.
* Adapted from https://usehooks-ts.com/react-hook/use-resize-observer
*/
init_objectSpread2();
function extractSize(entry, box, sizeType) {
	if (!entry[box]) {
		if (box === "contentBoxSize") return entry.contentRect[sizeType === "inlineSize" ? "width" : "height"];
		return;
	}
	return Array.isArray(entry[box]) ? entry[box][0][sizeType] : entry[box][sizeType];
}
function useIsMounted() {
	const isMounted = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);
	return (0, import_react.useCallback)(() => isMounted.current, []);
}
var initialSize = {
	width: void 0,
	height: void 0
};
/**
* Custom hook that observes the size of an element using the ResizeObserver API.
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
* @since 0.15
* @hidden
*/
function useResizeObserver(options) {
	const { ref, box = "content-box" } = options;
	const [{ width, height }, setSize] = (0, import_react.useState)(initialSize);
	const isMounted = useIsMounted();
	const previousSize = (0, import_react.useRef)(_objectSpread2({}, initialSize));
	const onResize = (0, import_react.useRef)(void 0);
	onResize.current = options.onResize;
	(0, import_react.useEffect)(() => {
		if (!ref.current) return;
		if (typeof window === "undefined" || !("ResizeObserver" in window)) return;
		const observer = new ResizeObserver(([entry]) => {
			const boxProp = box === "border-box" ? "borderBoxSize" : box === "device-pixel-content-box" ? "devicePixelContentBoxSize" : "contentBoxSize";
			const newWidth = extractSize(entry, boxProp, "inlineSize");
			const newHeight = extractSize(entry, boxProp, "blockSize");
			if (previousSize.current.width !== newWidth || previousSize.current.height !== newHeight) {
				const newSize = {
					width: newWidth,
					height: newHeight
				};
				previousSize.current.width = newWidth;
				previousSize.current.height = newHeight;
				if (onResize.current) onResize.current(newSize);
				else if (isMounted()) setSize(newSize);
			}
		});
		observer.observe(ref.current, { box });
		return () => {
			observer.disconnect();
		};
	}, [
		box,
		ref,
		isMounted
	]);
	return {
		width,
		height
	};
}
//#endregion
//#region src/components/accordion.tsx
var PANEL_HEADER_HEIGHT = 24;
function validatePanelId(panels, id) {
	if (!id) return null;
	if (panels.filter((p) => p.id == id)[0]) return id;
	return null;
}
/**
* A generic, reusable Accordion component
* @param props 
*/
var Accordion = import_react.memo((props) => {
	const { Icon: BpIcon, Collapsible } = useElementContext();
	const target = import_react.useRef(null);
	const { style, panels, isResizing, onActivePanelChanged } = props;
	const activeId = validatePanelId(props.panels, props.activePanelId);
	const [dim, setDim] = import_react.useState({
		width: -1,
		height: -1
	});
	const [openPanel, setOpenPanel] = import_react.useState(activeId || panels[panels.length - 1].id);
	import_react.useEffect(() => {
		setOpenPanel(activeId || panels[panels.length - 1].id);
	}, [activeId]);
	import_react.useLayoutEffect(() => {
		if (target.current) setDim(target.current.getBoundingClientRect());
	}, [target]);
	useResizeObserver({
		ref: target,
		onResize: (size) => {
			var _size$width, _size$height;
			return setDim({
				width: (_size$width = size.width) !== null && _size$width !== void 0 ? _size$width : -1,
				height: (_size$height = size.height) !== null && _size$height !== void 0 ? _size$height : -1
			});
		}
	});
	const onTogglePanel = (e) => {
		const id = e.currentTarget.attributes["data-accordion-panel-id"].value;
		if (openPanel != id) {
			setOpenPanel(id);
			onActivePanelChanged === null || onActivePanelChanged === void 0 || onActivePanelChanged(id);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: target,
		style,
		className: "component-accordion",
		children: panels.map((p) => {
			const isPanelOpen = p.id == openPanel;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `component-accordion-panel`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "component-accordion-panel-header",
					style: { height: PANEL_HEADER_HEIGHT },
					"data-accordion-panel-id": p.id,
					onClick: onTogglePanel,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BpIcon, { icon: isPanelOpen ? "chevron-up" : "chevron-down" }),
						" ",
						p.title
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapsible, {
					isOpen: isPanelOpen,
					children: p.contentRenderer({
						width: dim.width,
						height: dim.height - panels.length * PANEL_HEADER_HEIGHT
					}, isResizing)
				})]
			}, p.id);
		})
	});
});
//#endregion
//#region src/layouts/slate.tsx
init_objectSpread2();
function slateTemplateReducer(origState, state, action) {
	switch (action.type) {
		case ActionType.FUSION_SET_LEGEND_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1;
				if (data === true) state1 = {
					legendVisible: true,
					taskPaneVisible: false,
					selectionPanelVisible: false
				};
				else state1 = { legendVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1;
				if (data === true) state1 = {
					legendVisible: false,
					taskPaneVisible: false,
					selectionPanelVisible: true
				};
				else state1 = { selectionPanelVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.TASK_INVOKE_URL: return _objectSpread2(_objectSpread2({}, state), {
			taskPaneVisible: true,
			selectionPanelVisible: false,
			legendVisible: false
		});
		case ActionType.FUSION_SET_TASK_PANE_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1;
				if (data === true) state1 = {
					legendVisible: false,
					taskPaneVisible: true,
					selectionPanelVisible: false
				};
				else state1 = { taskPaneVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.FUSION_SET_ELEMENT_STATE: {
			const data = action.payload;
			if (isElementState(data)) return _objectSpread2(_objectSpread2({}, state), data);
		}
	}
	return state;
}
var STATUS_BAR_HEIGHT$1 = 18;
var ACCORDION_STYLE$1 = {
	position: "absolute",
	top: 0,
	bottom: 0,
	left: 0,
	right: 0
};
var DEFAULT_LEGEND_COMPONENT_PROPS$1 = { inlineBaseLayerSwitcher: false };
/**
* A viewer template that resembles the Slate Fusion template
*/
var SlateTemplateLayout = () => {
	const { isResizing, locale, capabilities, showSelection, showLegend, showTaskPane, onDragStart, onDragEnd, onSplitterChanged, onActiveElementChanged } = useCommonTemplateState(slateTemplateReducer);
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
	const topOffset = 87;
	const panels = import_react.useMemo(() => [
		{
			id: "Legend",
			title: tr("TPL_TITLE_LEGEND", locale),
			contentRenderer: (dim) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: dim.width,
						height: dim.height,
						overflowY: "auto"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
						id: DefaultComponentNames.Legend,
						locale,
						componentProps: DEFAULT_LEGEND_COMPONENT_PROPS$1
					})
				});
			}
		},
		{
			id: "Selection",
			title: tr("TPL_TITLE_SELECTION_PANEL", locale),
			contentRenderer: (dim) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: dim.width,
						height: dim.height,
						overflowY: "auto"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
						id: DefaultComponentNames.SelectionPanel,
						locale
					})
				});
			}
		},
		{
			id: "TaskPane",
			title: tr("TPL_TITLE_TASKPANE", locale),
			contentRenderer: (dim, isResizing) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: dim.width,
						height: dim.height,
						overflowY: "auto"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
						id: DefaultComponentNames.TaskPane,
						locale,
						componentProps: { isResizing }
					})
				});
			}
		}
	], [locale]);
	let activeId;
	const active = [
		{
			id: "Selection",
			visible: showSelection
		},
		{
			id: "TaskPane",
			visible: showTaskPane
		},
		{
			id: "Legend",
			visible: showLegend
		}
	].filter((st) => st.visible);
	if (active.length == 1) activeId = active[0].id;
	const TB_Z_INDEX = 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			width: "100%",
			height: "100%"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "absolute",
					left: 0,
					top: 0,
					bottom: bottomOffset,
					right: 0
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SplitterLayout, {
					customClassName: "slate-splitter",
					primaryIndex: 1,
					secondaryInitialSize: sbWidth,
					onSecondaryPaneSizeChange: onSplitterChanged,
					onDragStart,
					onDragEnd,
					children: [(() => {
						if (showSelection || showTaskPane || showLegend) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
							style: ACCORDION_STYLE$1,
							onActivePanelChanged: onActiveElementChanged,
							activePanelId: activeId,
							panels,
							isResizing
						}) });
					})(), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
							id: "FileMenu",
							containerClass: "slate-file-menu",
							containerStyle: {
								position: "absolute",
								left: 0,
								top: 0,
								zIndex: TB_Z_INDEX,
								right: 0
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
							id: "Toolbar",
							containerClass: "slate-toolbar",
							containerStyle: {
								position: "absolute",
								left: 0,
								top: 29,
								zIndex: TB_Z_INDEX,
								right: 0
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
							id: "ToolbarSecondary",
							containerClass: "slate-toolbar-secondary",
							containerStyle: {
								position: "absolute",
								left: 0,
								top: 58,
								zIndex: TB_Z_INDEX,
								right: 0
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								position: "absolute",
								left: 0,
								right: 0,
								top: topOffset,
								bottom: 0
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
								id: DefaultComponentNames.Map,
								locale
							}), (() => {
								if (hasNavigator) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
									id: DefaultComponentNames.Navigator,
									locale
								});
							})()]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerApiShim, {})
					] })]
				})
			}),
			(() => {
				if (hasStatusBar) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "slate-status-bar",
					style: {
						position: "absolute",
						left: 0,
						bottom: 0,
						right: 0,
						height: bottomOffset
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.MouseCoordinates,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.ScaleDisplay,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.SelectedFeatureCount,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.ViewSize,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.PoweredByMapGuide,
							locale
						})
					]
				});
			})(),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalLauncher, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlyoutRegionContainer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InitWarningDisplay, {})
		]
	});
};
//#endregion
//#region src/layouts/maroon.tsx
init_objectSpread2();
function maroonTemplateReducer(origState, state, action) {
	switch (action.type) {
		case ActionType.FUSION_SET_LEGEND_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1;
				if (data === true) state1 = {
					legendVisible: true,
					taskPaneVisible: false,
					selectionPanelVisible: false
				};
				else state1 = { legendVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.FUSION_SET_SELECTION_PANEL_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1;
				if (data === true) state1 = {
					legendVisible: false,
					taskPaneVisible: false,
					selectionPanelVisible: true
				};
				else state1 = { selectionPanelVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.TASK_INVOKE_URL: return _objectSpread2(_objectSpread2({}, state), {
			taskPaneVisible: true,
			selectionPanelVisible: false,
			legendVisible: false
		});
		case ActionType.FUSION_SET_TASK_PANE_VISIBILITY: {
			const data = action.payload;
			if (typeof data == "boolean") {
				let state1;
				if (data === true) state1 = {
					legendVisible: false,
					taskPaneVisible: true,
					selectionPanelVisible: false
				};
				else state1 = { taskPaneVisible: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.FUSION_SET_ELEMENT_STATE: {
			const data = action.payload;
			if (isElementState(data)) return _objectSpread2(_objectSpread2({}, state), data);
		}
	}
	return state;
}
var STATUS_BAR_HEIGHT = 18;
var OUTER_PADDING = 3;
var ACCORDION_STYLE = {
	position: "absolute",
	top: OUTER_PADDING,
	bottom: 0,
	right: OUTER_PADDING,
	left: 0
};
var DEFAULT_LEGEND_COMPONENT_PROPS = { inlineBaseLayerSwitcher: false };
/**
* A viewer template that resembles the Maroon Fusion template
*/
var MaroonTemplateLayout = () => {
	const { isResizing, locale, capabilities, showSelection, showLegend, showTaskPane, onDragStart, onDragEnd, onSplitterChanged, onActiveElementChanged } = useCommonTemplateState(maroonTemplateReducer);
	let hasStatusBar = false;
	let hasNavigator = false;
	if (capabilities) {
		hasStatusBar = capabilities.hasStatusBar;
		hasNavigator = capabilities.hasNavigator;
	}
	const bottomOffset = hasStatusBar ? STATUS_BAR_HEIGHT : 0;
	const topOffset = 58 + OUTER_PADDING;
	const panels = import_react.useMemo(() => [
		{
			id: "Legend",
			title: tr("TPL_TITLE_LEGEND", locale),
			contentRenderer: (dim) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: dim.width,
						height: dim.height,
						overflowY: "auto"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
						id: DefaultComponentNames.Legend,
						locale,
						componentProps: DEFAULT_LEGEND_COMPONENT_PROPS
					})
				});
			}
		},
		{
			id: "Selection",
			title: tr("TPL_TITLE_SELECTION_PANEL", locale),
			contentRenderer: (dim) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: dim.width,
						height: dim.height,
						overflowY: "auto"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
						id: DefaultComponentNames.SelectionPanel,
						locale
					})
				});
			}
		},
		{
			id: "TaskPane",
			title: tr("TPL_TITLE_TASKPANE", locale),
			contentRenderer: (dim, isResizing) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: dim.width,
						height: dim.height,
						overflowY: "auto"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
						id: DefaultComponentNames.TaskPane,
						locale,
						componentProps: { isResizing }
					})
				});
			}
		}
	], [locale]);
	let activeId;
	const active = [
		{
			id: "Selection",
			visible: showSelection
		},
		{
			id: "TaskPane",
			visible: showTaskPane
		},
		{
			id: "Legend",
			visible: showLegend
		}
	].filter((st) => st.visible);
	if (active.length == 1) activeId = active[0].id;
	const initInfoPaneWidth = useTemplateInitialInfoPaneWidth();
	const initTaskPaneWidth = useTemplateInitialTaskPaneWidth();
	const sbWidth = Math.max(initInfoPaneWidth, initTaskPaneWidth);
	const TB_Z_INDEX = 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			width: "100%",
			height: "100%"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "absolute",
					left: 0,
					top: 0,
					bottom: bottomOffset,
					right: 0
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SplitterLayout, {
					customClassName: "maroon-splitter",
					primaryIndex: 0,
					secondaryInitialSize: sbWidth,
					onSecondaryPaneSizeChange: onSplitterChanged,
					onDragStart,
					onDragEnd,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
							id: "FileMenu",
							containerClass: "maroon-file-menu",
							containerStyle: {
								position: "absolute",
								left: OUTER_PADDING,
								top: OUTER_PADDING,
								right: 0,
								zIndex: TB_Z_INDEX
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
							id: "Toolbar",
							containerClass: "maroon-toolbar",
							containerStyle: {
								position: "absolute",
								left: OUTER_PADDING,
								top: 29 + OUTER_PADDING,
								right: 0,
								zIndex: TB_Z_INDEX
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarContainer, {
							id: "ToolbarVertical",
							containerClass: "maroon-toolbar-vertical",
							vertical: true,
							containerStyle: {
								position: "absolute",
								left: OUTER_PADDING,
								top: topOffset,
								bottom: 0,
								zIndex: TB_Z_INDEX,
								right: 0
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								position: "absolute",
								left: OUTER_PADDING + 29,
								right: 0,
								top: topOffset,
								bottom: 0
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
								id: DefaultComponentNames.Map,
								locale
							}), (() => {
								if (hasNavigator) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
									id: DefaultComponentNames.Navigator,
									locale
								});
							})()]
						})
					] }), (() => {
						if (showSelection || showTaskPane || showLegend) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
							style: ACCORDION_STYLE,
							onActivePanelChanged: onActiveElementChanged,
							activePanelId: activeId,
							panels,
							isResizing
						}) });
					})()]
				})
			}),
			(() => {
				if (hasStatusBar) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "maroon-status-bar",
					style: {
						position: "absolute",
						left: 0,
						bottom: 0,
						right: 0,
						height: bottomOffset
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.MouseCoordinates,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.ScaleDisplay,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.SelectedFeatureCount,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.ViewSize,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.PoweredByMapGuide,
							locale
						})
					]
				});
			})(),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerApiShim, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalLauncher, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlyoutRegionContainer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InitWarningDisplay, {})
		]
	});
};
//#endregion
//#region src/components/mouse-coordinates.tsx
function formatCoordinates(props) {
	const { coords, decimals, format, units } = props;
	if (coords == null) return null;
	const [x, y] = coords;
	const str = fmt(format || "X: {x}, Y: {y} {units}", {
		x: `${decimals != null ? x.toFixed(decimals) : x}`,
		y: `${decimals != null ? y.toFixed(decimals) : y}`,
		units: units || ""
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { dangerouslySetInnerHTML: { __html: purify.sanitize(strTrim(str)) } });
}
/**
* Displays tracked mouse coordinates
* @param props
*/
var MouseCoordinates = (props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "status-bar-component component-mouse-coordinates",
		style: props.style,
		children: formatCoordinates(props)
	});
};
//#endregion
//#region src/containers/mouse-coordinates.tsx
var MouseCoordinatesContainer = (props) => {
	const { style } = props;
	const mapProjection = useActiveMapProjection();
	const projection = useConfiguredCoordinateProjection();
	const decimals = useConfiguredCoordinateDecimals();
	const format = useConfiguredCoordinateFormat();
	const mapCoordinateFormat = useActiveMapCoordinateFormat();
	const mouse = useCurrentMouseCoordinates();
	const locale = useViewerLocale();
	if (mouse) {
		const prj = get(projection !== null && projection !== void 0 ? projection : mapProjection);
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
		if (projection && mapProjection) try {
			coords = transform(coords, mapProjection, projection);
		} catch (e) {}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MouseCoordinates, {
			units,
			coords,
			style,
			decimals,
			format: mapCoordinateFormat || format
		});
	} else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {});
};
//#endregion
//#region src/components/navigator.tsx
var import_cjs = /* @__PURE__ */ __toESM(require_cjs());
var ZoomDirection = /* @__PURE__ */ function(ZoomDirection) {
	ZoomDirection[ZoomDirection["In"] = 0] = "In";
	ZoomDirection[ZoomDirection["Out"] = 1] = "Out";
	return ZoomDirection;
}({});
var PanDirection = /* @__PURE__ */ function(PanDirection) {
	PanDirection[PanDirection["East"] = 0] = "East";
	PanDirection[PanDirection["West"] = 1] = "West";
	PanDirection[PanDirection["South"] = 2] = "South";
	PanDirection[PanDirection["North"] = 3] = "North";
	return PanDirection;
}({});
var VERT_START = 10;
var VERT_SPAN = 81;
var LN9 = Math.log(9);
function calculatePosForScale(scale, finiteScaleList) {
	if (finiteScaleList) {
		const index = getFiniteScaleIndexForScale(finiteScaleList, scale);
		const pos = VERT_SPAN / finiteScaleList.length * (index + 1);
		return Math.floor(pos);
	} else {
		const pos = 9 * Math.log(scale) / LN9;
		return Math.floor(pos);
	}
}
function calculateScaleForPos(pos, finiteScaleList) {
	const scale = Math.pow(9, pos / 9);
	if (finiteScaleList) return finiteScaleList[getFiniteScaleIndexForScale(finiteScaleList, scale)];
	else return scale;
}
/**
* The Navigator component provides an interactive zoom slider for the map viewer
* @param props 
*/
var Navigator = (props) => {
	const { busy, locale } = props;
	const onPanEast = () => {
		props.onPan(0);
	};
	const onPanWest = () => {
		props.onPan(1);
	};
	const onPanSouth = () => {
		props.onPan(2);
	};
	const onPanNorth = () => {
		props.onPan(3);
	};
	const onZoomOut = () => {
		props.onZoom(1);
	};
	const onZoomIn = () => {
		props.onZoom(0);
	};
	const onStart = (e) => {
		e.preventDefault();
		setIsDragging(true);
		setPreviewPos(pos);
	};
	const onDrag = (e, data) => {
		e.preventDefault();
		setPreviewPos(previewPos + data.deltaY);
	};
	const onStop = (e) => {
		e.preventDefault();
		const newScale = calculateScaleForPos(previewPos);
		setIsDragging(false);
		setPos(previewPos);
		props.onRequestZoomToScale(newScale);
	};
	const [previewPos, setPreviewPos] = import_react.useState(calculatePosForScale(props.scale, props.finiteScaleList));
	const [pos, setPos] = import_react.useState(calculatePosForScale(props.scale, props.finiteScaleList));
	const [isDragging, setIsDragging] = import_react.useState(false);
	import_react.useEffect(() => {
		const pos = calculatePosForScale(props.scale, props.finiteScaleList);
		setPos(pos);
		setPreviewPos(pos);
	}, [props.scale, props.finiteScaleList]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "Navigator",
		style: props.style,
		className: "component-navigator noselect",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("map", {
				name: "Navigator_ImageMap",
				id: "Navigator_ImageMap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("area", {
						onClick: onPanEast,
						shape: "poly",
						alt: tr("NAVIGATOR_PAN_EAST", locale),
						title: tr("NAVIGATOR_PAN_EAST", locale),
						coords: "27,176, 27,177, 40,190, 44,182, 44,159"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("area", {
						onClick: onPanWest,
						shape: "poly",
						alt: tr("NAVIGATOR_PAN_WEST", locale),
						title: tr("NAVIGATOR_PAN_WEST", locale),
						coords: "24,177, 24,176, 7,159, 7,182, 11,190"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("area", {
						onClick: onPanSouth,
						shape: "poly",
						alt: tr("NAVIGATOR_PAN_SOUTH", locale),
						title: tr("NAVIGATOR_PAN_SOUTH", locale),
						coords: "25,178, 12,191, 21,197, 30,197, 39,191, 26,178"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("area", {
						onClick: onPanNorth,
						shape: "poly",
						alt: tr("NAVIGATOR_PAN_NORTH", locale),
						title: tr("NAVIGATOR_PAN_NORTH", locale),
						coords: "26,175, 43,158, 8,158, 25,175"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("area", {
						onClick: onZoomOut,
						shape: "circle",
						alt: tr("NAVIGATOR_ZOOM_OUT", locale),
						title: tr("NAVIGATOR_ZOOM_OUT", locale),
						coords: "25,142,8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("area", {
						onClick: onZoomIn,
						shape: "circle",
						alt: tr("NAVIGATOR_ZOOM_IN", locale),
						title: tr("NAVIGATOR_ZOOM_IN", locale),
						coords: "25,34,8"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: sliderscale_default,
				className: "png24",
				width: "51",
				height: "201",
				useMap: "#Navigator_ImageMap",
				style: {
					position: "absolute",
					left: 0,
					top: 0
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "absolute",
					top: 6,
					left: 6,
					width: 39,
					height: 16
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: spinner_default,
					className: "navigator-spinner",
					width: "18",
					height: "6",
					style: {
						position: "absolute",
						top: 3,
						right: 4,
						visibility: busy ? "visible" : "hidden"
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_cjs.default, {
				axis: "y",
				handle: "img.navigator-drag-handle",
				position: {
					x: 0,
					y: VERT_START + pos
				},
				bounds: {
					top: VERT_START,
					bottom: 91,
					left: 0,
					right: 0
				},
				onStart,
				onDrag,
				onStop,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: slider_default,
					className: "png24 navigator-drag-handle",
					width: "29",
					height: "12",
					style: {
						position: "relative",
						left: 11,
						top: 28
					}
				}), (() => {
					if (isDragging === true) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "tooltip",
						style: {
							position: "relative",
							width: 170,
							right: 190,
							top: 28,
							textAlign: "right"
						},
						children: tr("FMT_NAVIGATOR_ZOOM_TO_SCALE", props.locale, { scale: calculateScaleForPos(previewPos).toFixed(2) })
					});
				})()] })
			})
		]
	});
};
//#endregion
//#region src/containers/navigator.tsx
var NavigatorContainer = (props) => {
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
		if (cmd) invokeCommandAction(cmd);
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
		if (cmd) invokeCommandAction(cmd);
	};
	const onRequestZoomToScale = (scale) => {
		if (activeMapName) setScaleAction(activeMapName, scale);
	};
	if (view) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigator, {
		style,
		scale: view.scale,
		finiteScaleList: finiteScales,
		locale,
		busy: busyCount > 0,
		onRequestZoomToScale,
		onPan,
		onZoom
	});
	else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {});
};
//#endregion
//#region src/components/scale-display.tsx
/**
* A component that displays the map scale
* @param props 
*/
var ScaleDisplay = (props) => {
	const { view, style, locale, finiteScales, onScaleChanged } = props;
	const [localScale, setLocalScale] = import_react.useState(void 0);
	const onFiniteScaleChanged = (e) => onScaleChanged === null || onScaleChanged === void 0 ? void 0 : onScaleChanged(parseFloat(e.target.value));
	const onScaleKeyPressed = (e) => {
		if (e.key == "Enter" && localScale) onScaleChanged === null || onScaleChanged === void 0 || onScaleChanged(localScale);
	};
	const onScaleInputChanged = (e) => setLocalScale(parseFloat(e.target.value));
	import_react.useEffect(() => {
		if (!finiteScales && view && view.scale != localScale) setLocalScale(view.scale);
	}, [finiteScales, view]);
	const label = tr("FMT_SCALE_DISPLAY", locale, { scale: "" });
	if (finiteScales) {
		const fiScale = finiteScales[getFiniteScaleIndexForScale(finiteScales, view.scale)];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "status-bar-component component-scale-display",
			style,
			children: [
				label,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "scale-input",
					value: fiScale,
					onChange: onFiniteScaleChanged,
					children: finiteScales.map((s) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: s
						}, s);
					})
				})
			]
		});
	} else return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "status-bar-component component-scale-display",
		style,
		children: [
			label,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "scale-input",
				type: "number",
				value: localScale || "",
				onChange: onScaleInputChanged,
				onKeyPress: onScaleKeyPressed
			})
		]
	});
};
//#endregion
//#region src/containers/scale-display.tsx
var ScaleDisplayContainer = (props) => {
	const { style } = props;
	const dispatch = useReduxDispatch();
	const locale = useViewerLocale();
	const activeMapName = useActiveMapName();
	const view = useActiveMapView();
	const finiteScales = useActiveMapFiniteScales();
	const viewer = useMapProviderContext();
	const setScaleAction = (mapName, scale) => dispatch(setScale(viewer, mapName, scale));
	const onScaleChanged = (scale) => {
		if (activeMapName) setScaleAction(activeMapName, scale);
	};
	if (view) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScaleDisplay, {
		onScaleChanged,
		view,
		style,
		finiteScales,
		locale
	});
	else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("noscript", {});
};
//#endregion
//#region src/components/task-pane.tsx
init_objectSpread2();
var TASK_PANE_OVERLAY_BGCOLOR = "#dee8f9";
function currentUrlDoesNotMatchMapName(currentUrl, mapName) {
	const normUrl = currentUrl.toLowerCase();
	if (normUrl.indexOf("mapname=") >= 0 && mapName) return normUrl.indexOf(`mapname=${mapName.toLowerCase()}`) < 0;
	else return false;
}
var TaskFrameLoadingOverlay = ({ locale }) => {
	const { NonIdealState, Spinner } = useElementContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			position: "absolute",
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			backgroundColor: TASK_PANE_OVERLAY_BGCOLOR
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NonIdealState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { sizePreset: "large" }),
			title: tr("TASK_PANE_LOADING", locale),
			description: tr("TASK_PANE_LOADING_DESC", locale)
		})
	}, "taskPaneFrameLoadingOverlay");
};
/**
* A component that serves as a generic container for content or User Interface for custom functionality
*
* @hidden
* @param props
*/
var TaskPane = (props) => {
	const { currentUrl, mapName, locale, homeAction, backAction, forwardAction, onUrlLoaded, lastUrlPushed, showTaskBar, maxHeight, flyoutStates, onOpenFlyout, onCloseFlyout } = props;
	const [activeComponent, setActiveComponent] = import_react.useState(null);
	const [activeComponentProps, setActiveComponentProps] = import_react.useState(null);
	const [invalidated, setInvalidated] = import_react.useState(false);
	const [frameContentLoaded, setFrameContentLoaded] = import_react.useState(false);
	const iframeRef = import_react.useRef(null);
	const taskButtons = import_react.useMemo(() => [
		homeAction,
		{ isSeparator: true },
		backAction,
		forwardAction
	], [
		homeAction,
		backAction,
		forwardAction
	]);
	const handleCloseFlyout = import_react.useCallback((id) => {
		onCloseFlyout === null || onCloseFlyout === void 0 || onCloseFlyout(id);
	}, [onCloseFlyout]);
	const handleOpenFlyout = import_react.useCallback((id, metrics) => {
		onOpenFlyout === null || onOpenFlyout === void 0 || onOpenFlyout(id, metrics);
	}, [onOpenFlyout]);
	const handleFrameMounted = import_react.useCallback((iframe) => {
		iframeRef.current = iframe;
		if (iframe) iframe.taskPaneId = FUSION_TASKPANE_NAME;
	}, []);
	const handleFrameLoaded = import_react.useCallback((e) => {
		const frame = e.currentTarget;
		if (frame.contentWindow) {
			setFrameContentLoaded(true);
			onUrlLoaded(frame.contentWindow.location.href);
		}
	}, [onUrlLoaded]);
	import_react.useEffect(() => {
		if (currentUrl && lastUrlPushed === false) loadUrl(currentUrl);
	}, [currentUrl, lastUrlPushed]);
	import_react.useEffect(() => {
		if (!invalidated && currentUrl && currentUrl.indexOf("component://") !== 0 && currentUrlDoesNotMatchMapName(currentUrl, mapName)) setInvalidated(true);
		else if (invalidated && currentUrl && (currentUrl.indexOf("component://") === 0 || !currentUrlDoesNotMatchMapName(currentUrl, mapName))) setInvalidated(false);
	}, [
		currentUrl,
		mapName,
		invalidated
	]);
	import_react.useEffect(() => {
		if (currentUrl && activeComponent === null) loadUrl(currentUrl);
	}, []);
	const loadUrl = import_react.useCallback((url) => {
		const compUri = parseComponentUri(url);
		if (compUri) {
			setActiveComponent(compUri.name);
			setActiveComponentProps(compUri.props);
		} else {
			setActiveComponent(null);
			setFrameContentLoaded(false);
			setActiveComponentProps(null);
			setTimeout(() => {
				if (iframeRef.current) {
					var _iframeRef$current$co;
					(_iframeRef$current$co = iframeRef.current.contentWindow) === null || _iframeRef$current$co === void 0 || _iframeRef$current$co.location.replace(url);
				}
			}, 0);
		}
	}, []);
	const taskMenu = import_react.useMemo(() => ({
		label: tr("MENU_TASKS", locale),
		flyoutAlign: "bottom left",
		flyoutId: WEBLAYOUT_TASKMENU
	}), [locale]);
	const rootStyle = {
		position: "relative",
		overflow: "hidden"
	};
	const taskBarStyle = {
		height: 29,
		backgroundColor: TOOLBAR_BACKGROUND_COLOR
	};
	const taskBodyStyle = {};
	const taskFrameStyle = { border: "none" };
	const taskComponentContainerStyle = { border: "none" };
	if (!maxHeight) {
		rootStyle.width = "100%";
		rootStyle.height = "100%";
		taskBarStyle.position = "absolute";
		taskBarStyle.top = 0;
		taskBarStyle.left = 0;
		taskBarStyle.right = 0;
		taskBodyStyle.position = "absolute";
		taskBodyStyle.top = showTaskBar === true ? 29 : 0;
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
		taskFrameStyle.height = showTaskBar === true ? maxHeight - 29 : maxHeight;
		taskComponentContainerStyle.width = "100%";
		taskComponentContainerStyle.maxHeight = showTaskBar === true ? maxHeight - 29 : maxHeight;
		taskComponentContainerStyle.overflowY = "auto";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: rootStyle,
		children: [showTaskBar === true && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: taskBarStyle,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {
					childItems: taskButtons,
					containerStyle: {
						float: "left",
						height: 29
					},
					onCloseFlyout: handleCloseFlyout,
					onOpenFlyout: handleOpenFlyout,
					flyoutStates
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {
					childItems: [taskMenu],
					containerStyle: {
						float: "right",
						height: 29
					},
					onCloseFlyout: handleCloseFlyout,
					onOpenFlyout: handleOpenFlyout,
					flyoutStates
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { clear: "both" } })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: taskBodyStyle,
			children: [activeComponent != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: _objectSpread2(_objectSpread2({}, taskComponentContainerStyle), {}, { overflowY: "auto" }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
					id: activeComponent,
					componentProps: activeComponentProps,
					locale
				})
			}) : (() => {
				const components = [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					name: "taskPaneFrame",
					ref: handleFrameMounted,
					onLoad: handleFrameLoaded,
					style: taskFrameStyle
				}, "taskPaneFrame")];
				if (frameContentLoaded === false) components.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskFrameLoadingOverlay, { locale }, "loading-overlay"));
				return components;
			})(), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				name: "scriptFrame",
				style: {
					width: 0,
					height: 0,
					visibility: "hidden"
				}
			})]
		})]
	});
};
//#endregion
//#region src/containers/task-pane.tsx
var TaskPaneResizingPlaceholder = ({ locale }) => {
	const { NonIdealState } = useElementContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			position: "absolute",
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			backgroundColor: TASK_PANE_OVERLAY_BGCOLOR
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NonIdealState, {
			icon: "arrows-horizontal",
			description: tr("TASK_PANE_RESIZING", locale)
		})
	});
};
var TaskPaneContainer = (props) => {
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
	const getLocale = import_react.useCallback(() => locale, [locale]);
	const canGoHome = import_react.useCallback(() => {
		if (initialUrl) {
			var _map$mapguide, _map$mapguide2, _map$mapguide3;
			const initUrl = (map === null || map === void 0 || (_map$mapguide = map.mapguide) === null || _map$mapguide === void 0 ? void 0 : _map$mapguide.runtimeMap) && initialUrl ? ensureParameters(initialUrl, map === null || map === void 0 || (_map$mapguide2 = map.mapguide) === null || _map$mapguide2 === void 0 || (_map$mapguide2 = _map$mapguide2.runtimeMap) === null || _map$mapguide2 === void 0 ? void 0 : _map$mapguide2.Name, map === null || map === void 0 || (_map$mapguide3 = map.mapguide) === null || _map$mapguide3 === void 0 || (_map$mapguide3 = _map$mapguide3.runtimeMap) === null || _map$mapguide3 === void 0 ? void 0 : _map$mapguide3.SessionId, getLocale()) : initialUrl;
			return navigationStack.length > 0 && !areUrlsSame(navigationStack[navIndex], initUrl);
		}
		return false;
	}, [
		initialUrl,
		map,
		navigationStack,
		navIndex,
		getLocale
	]);
	const canGoBack = import_react.useCallback(() => navIndex > 0, [navIndex]);
	const canGoForward = import_react.useCallback(() => navIndex < navigationStack.length - 1, [navIndex, navigationStack]);
	const homeAction = import_react.useMemo(() => ({
		svgIconName: "home",
		tooltip: tr("TT_GO_HOME", locale),
		enabled: canGoHome,
		invoke: goHomeAction
	}), [
		locale,
		canGoHome,
		goHomeAction
	]);
	const backAction = import_react.useMemo(() => ({
		svgIconName: "arrow-left",
		tooltip: tr("TT_GO_BACK", locale),
		enabled: canGoBack,
		invoke: goBackAction
	}), [
		locale,
		canGoBack,
		goBackAction
	]);
	const forwardAction = import_react.useMemo(() => ({
		svgIconName: "arrow-right",
		tooltip: tr("TT_GO_FORWARD", locale),
		enabled: canGoForward,
		invoke: goForwardAction
	}), [
		locale,
		canGoForward,
		goForwardAction
	]);
	const onCloseFlyout = import_react.useCallback((id) => closeFlyoutAction(id), [closeFlyoutAction]);
	const onOpenFlyout = import_react.useCallback((id, metrics) => openFlyoutAction(id, metrics), [openFlyoutAction]);
	const onUrlLoaded = import_react.useCallback((url) => {
		const currentUrl = navigationStack[navIndex];
		if (!areUrlsSame(currentUrl, url)) pushUrlAction(url);
	}, [
		navigationStack,
		navIndex,
		pushUrlAction
	]);
	if (navigationStack[navIndex]) {
		var _map$mapguide4, _map$mapguide5;
		const flyoutStates = {};
		if (flyouts) {
			const ids = Object.keys(flyouts);
			for (const fid of ids) flyoutStates[fid] = !!flyouts[fid].open;
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				width: "100%",
				height: "100%",
				position: "relative"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskPane, {
				currentUrl: navigationStack[navIndex],
				showTaskBar: hasTaskBar,
				lastUrlPushed,
				homeAction,
				backAction,
				onOpenFlyout,
				onCloseFlyout,
				forwardAction,
				session: map === null || map === void 0 || (_map$mapguide4 = map.mapguide) === null || _map$mapguide4 === void 0 || (_map$mapguide4 = _map$mapguide4.runtimeMap) === null || _map$mapguide4 === void 0 ? void 0 : _map$mapguide4.SessionId,
				mapName: map === null || map === void 0 || (_map$mapguide5 = map.mapguide) === null || _map$mapguide5 === void 0 || (_map$mapguide5 = _map$mapguide5.runtimeMap) === null || _map$mapguide5 === void 0 ? void 0 : _map$mapguide5.Name,
				onUrlLoaded,
				maxHeight: props.maxHeight,
				flyoutStates,
				locale: getLocale()
			}), props.isResizing === true && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskPaneResizingPlaceholder, { locale: getLocale() })]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("noscript", {});
};
//#endregion
//#region src/components/about.tsx
/**
* The About component displays information about this viewer
*/
var About = () => {
	const { Heading } = useElementContext();
	const locale = useViewerLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "component-about-dialog-content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				level: 4,
				children: "mapguide-react-layout"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				tr("ABOUT_HASH_LABEL", locale),
				" ",
				""
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				target: "_blank",
				href: "https://github.com/jumpinjackie/mapguide-react-layout",
				children: "GitHub"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				target: "_blank",
				href: "https://github.com/jumpinjackie/mapguide-react-layout/issues",
				children: "Issues"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Uses icons from the ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				target: "_blank",
				href: "http://p.yusukekamiyamane.com/",
				children: "Fugue icon set by Yusuke Kamiyamane"
			})] })
		]
	});
};
//#endregion
//#region src/containers/measure-context.ts
var LAYER_NAME = "measure-layer";
function isArbitraryProjection(proj) {
	if (proj instanceof Projection) return /XY-[A-Z]+/.test(proj.getCode());
	return false;
}
/**
* @hidden
*/
var MeasureContext = class {
	constructor(viewer, mapName, parent) {
		this.onDrawStart = (evt) => {
			this.sketch = evt.feature;
			/** @type {ol.Coordinate|undefined} */
			let tooltipCoord = evt.coordinate;
			if (this.sketch) {
				const g = this.sketch.getGeometry();
				if (g) this.listener = g.on("change", (e) => {
					const geom = e.target;
					let output;
					if (geom instanceof Polygon) {
						const [o, total, segments] = this.formatArea(geom);
						output = o;
						if (this.callback) this.callback.updateSegments("Area", total, segments);
						tooltipCoord = geom.getInteriorPoint().getCoordinates();
					} else if (geom instanceof LineString) {
						const [o, total, segments] = this.formatLength(geom);
						output = o;
						if (this.callback) this.callback.updateSegments("LineString", total, segments);
						tooltipCoord = geom.getLastCoordinate();
					} else output = "";
					if (this.measureTooltipElement) this.measureTooltipElement.innerHTML = output;
					this.measureTooltip.setPosition(tooltipCoord);
				});
			}
		};
		this.onDrawEnd = () => {
			if (this.measureTooltipElement) this.measureTooltipElement.className = "tooltip tooltip-static";
			this.measureTooltip.setOffset([0, -7]);
			this.sketch = null;
			this.measureTooltipElement = null;
			this.createMeasureTooltip();
			unByKey(this.listener);
		};
		this.onMouseMove = (evt) => {
			if (evt.dragging || !this.parent) return;
			const locale = this.parent.getLocale();
			/** @type {string} */
			let helpMsg = tr("MEASUREMENT_START_DRAWING", locale);
			if (this.sketch) {
				const geom = this.sketch.getGeometry();
				if (geom instanceof Polygon) helpMsg = tr("MEASUREMENT_CONTINUE_POLYGON", locale);
				else if (geom instanceof LineString) helpMsg = tr("MEASUREMENT_CONTINUE_LINE", locale);
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
		this.measureLayer = this.olFactory.createVectorLayer({ source: this.olFactory.createVectorSource() });
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
					segments.push({
						segment: i + 1,
						length: dist
					});
				}
			} else for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
				const dist = getDistance(this.olFactory.transformCoordinate(coordinates[i], sourceProj, "EPSG:4326"), this.olFactory.transformCoordinate(coordinates[i + 1], sourceProj, "EPSG:4326"));
				length += dist;
				segments.push({
					segment: i + 1,
					length: dist
				});
			}
		} else length = NaN;
		let output;
		if (isArbitrary && sourceProj instanceof Projection) output = `${roundTo(length, 2)} ${sourceProj.getUnits()}`;
		else if (length > 100) output = tr("UNIT_FMT_KM", locale, { value: roundTo(length / 1e3, 2) });
		else output = tr("UNIT_FMT_M", locale, { value: roundTo(length, 2) });
		return [
			output,
			length,
			segments
		];
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
						segments.push({
							segment: i + 1,
							length: dist
						});
					}
				}
			} else {
				area = getArea(geom, { projection: sourceProj });
				debug(`Polygon area: ${area}`);
				const ring = geom.getLinearRing(0);
				if (ring) {
					const coordinates = ring.getCoordinates();
					for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
						const dist = getDistance(this.olFactory.transformCoordinate(coordinates[i], sourceProj, "EPSG:4326"), this.olFactory.transformCoordinate(coordinates[i + 1], sourceProj, "EPSG:4326"));
						segments.push({
							segment: i + 1,
							length: dist
						});
					}
				}
			}
		} else area = NaN;
		let output;
		if (isArbitrary && sourceProj instanceof Projection) output = `${roundTo(area, 2)} ${sourceProj.getUnits()}<sup>2</sup>`;
		else if (area > 1e4) output = tr("UNIT_FMT_SQKM", locale, { value: `${roundTo(area / 1e6, 2)}` });
		else output = tr("UNIT_FMT_SQM", locale, { value: `${roundTo(area, 2)}` });
		return [
			output,
			area,
			segments
		];
	}
	getMapName() {
		return this.mapName;
	}
	createMeasureStyle() {
		return this.olFactory.createStyle({
			fill: this.olFactory.createStyleFill({ color: "rgba(255, 255, 255, 0.2)" }),
			stroke: this.olFactory.createStyleStroke({
				color: "#ffcc33",
				width: 2
			}),
			image: this.olFactory.createStyleCircle({
				radius: 7,
				fill: this.olFactory.createStyleFill({ color: "#ffcc33" })
			})
		});
	}
	createDrawInteraction(type) {
		const source = this.measureLayer.getSource();
		return this.olFactory.createInteractionDraw({
			source,
			type,
			style: this.olFactory.createStyle({
				fill: this.olFactory.createStyleFill({ color: "rgba(255, 255, 255, 0.2)" }),
				stroke: this.olFactory.createStyleStroke({
					color: "rgba(0, 0, 0, 0.5)",
					lineDash: [10, 10],
					width: 2
				}),
				image: this.olFactory.createStyleCircle({
					radius: 5,
					stroke: this.olFactory.createStyleStroke({ color: "rgba(0, 0, 0, 0.7)" }),
					fill: this.olFactory.createStyleFill({ color: "rgba(255, 255, 255, 0.2)" })
				})
			})
		});
	}
	removeElement(el) {
		if (el && el.parentNode) el.parentNode.removeChild(el);
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
		if (this.measureTooltip) this.measureOverlays.push(this.measureTooltip);
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
		var _this$measureLayer$ge;
		(_this$measureLayer$ge = this.measureLayer.getSource()) === null || _this$measureLayer$ge === void 0 || _this$measureLayer$ge.clear();
		for (const ov of this.measureOverlays) this.viewer.removeOverlay(ov);
		this.measureOverlays.length = 0;
		if (this.callback) this.callback.clearSegments();
	}
	handleDrawTypeChange(type) {
		if (type) this.setActiveInteraction(type);
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
		for (const ov of this.measureOverlays) this.viewer.addOverlay(ov);
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
		for (const ov of this.measureOverlays) this.viewer.removeOverlay(ov);
		this.viewer.getLayerManager(mapName).removeLayer(this.layerName);
	}
};
//#endregion
//#region src/api/ol-mapguide-source-factory.ts
/**
* @hidden
*/
function isMapGuideImageSource(arg) {
	return typeof arg.updateParams != "undefined";
}
/**
* @hidden
*/
function createMapGuideSource(options) {
	return new ImageMapGuide(options);
}
//#endregion
//#region src/api/layer-manager/parsed-features.ts
var import_papaparse_min = /* @__PURE__ */ __toESM(require_papaparse_min());
var ParsedFeatures = class {
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
		var _this = this;
		return _asyncToGenerator(function* () {
			const features = yield _this.features();
			if (dataProjection) for (const f of features) {
				const g = f.getGeometry();
				if (g) {
					const tg = g.transform(dataProjection, mapProjection);
					f.setGeometry(tg);
				}
			}
			source.addFeatures(features);
		})();
	}
	getDistinctValues(propertyName) {
		var _this2 = this;
		return _asyncToGenerator(function* () {
			const values = [];
			const features = yield _this2.features();
			for (const f of features) {
				const v = f.get(propertyName);
				if (!strIsNullOrEmpty(v) && !values.includes(v)) values.push(v);
			}
			return values;
		})();
	}
};
//#endregion
//#region src/api/layer-manager/csv-driver.ts
var CsvFormatDriver = class {
	constructor(aliases) {
		this.aliases = aliases;
		this.type = "CSV";
	}
	tryParse(size, text) {
		const aliases = this.aliases;
		const type = this.type;
		return new Promise((resolve, reject) => {
			import_papaparse_min.default.parse(text, {
				header: true,
				complete: function(results) {
					if (!results.data || results.data.length == 0) reject(/* @__PURE__ */ new Error("No data parsed. Probably not a CSV file"));
					else if (results.meta.fields) {
						let parsed;
						for (const alias of aliases) {
							var _results$meta$fields$, _results$meta$fields$2;
							if (parsed) break;
							const xc = (_results$meta$fields$ = results.meta.fields.filter((s) => s.toLowerCase() == alias.xColumn.toLowerCase())) === null || _results$meta$fields$ === void 0 ? void 0 : _results$meta$fields$[0];
							const yc = (_results$meta$fields$2 = results.meta.fields.filter((s) => s.toLowerCase() == alias.yColumn.toLowerCase())) === null || _results$meta$fields$2 === void 0 ? void 0 : _results$meta$fields$2[0];
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
									const features = new GeoJSON().readFeatures(json);
									const propNames = [];
									if (features.length > 0) {
										const first = features[0];
										for (const k of first.getKeys()) {
											if (k == first.getGeometryName()) continue;
											propNames.push(k);
										}
									}
									parsed = new ParsedFeatures(type, size, function() {
										var _ref = _asyncToGenerator(function* () {
											return features;
										});
										return function pfs() {
											return _ref.apply(this, arguments);
										};
									}(), features.length > 0, ["Point"], propNames);
									break;
								}
							}
						}
						if (parsed) resolve(parsed);
						else reject(/* @__PURE__ */ new Error("Data successfully parsed as CSV, but coordinate columns could not be found"));
					} else reject(/* @__PURE__ */ new Error("No fields found in CSV metadata"));
				}
			});
		});
	}
};
var CSV_COLUMN_ALIASES = [
	{
		xColumn: "lon",
		yColumn: "lat"
	},
	{
		xColumn: "lng",
		yColumn: "lat"
	},
	{
		xColumn: "longitude",
		yColumn: "latitude"
	},
	{
		xColumn: "x",
		yColumn: "y"
	},
	{
		xColumn: "easting",
		yColumn: "northing"
	}
];
//#endregion
//#region src/api/registry/external-layer.ts
var _ExternalLayerFactoryRegistry;
/**
* Defines a registry of custom vector layer source drivers
*/
var ExternalLayerFactoryRegistry = class ExternalLayerFactoryRegistry {
	constructor() {
		this._vectorCreators = {};
		if (ExternalLayerFactoryRegistry._instance) throw new Error("Error: Instantiation failed: Use ExternalLayerFactoryRegistry.getInstance() instead of new.");
		ExternalLayerFactoryRegistry._instance = this;
	}
	/**
	* Gets the registry instance
	* @since 0.14
	*/
	static getInstance() {
		return ExternalLayerFactoryRegistry._instance;
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
_ExternalLayerFactoryRegistry = ExternalLayerFactoryRegistry;
_ExternalLayerFactoryRegistry._instance = new _ExternalLayerFactoryRegistry();
//#endregion
//#region src/api/ol-style-contracts.ts
/**
* The source of a vector layer style
* 
* @since 0.14
*/
var VectorStyleSource = /* @__PURE__ */ function(VectorStyleSource) {
	/**
	* The base vector layer style
	*/
	VectorStyleSource[VectorStyleSource["Base"] = 0] = "Base";
	/**
	* The clustered layer style
	*/
	VectorStyleSource[VectorStyleSource["Cluster"] = 1] = "Cluster";
	return VectorStyleSource;
}({});
/**
* @since 0.14
*/
var ClusterClickAction = /* @__PURE__ */ function(ClusterClickAction) {
	ClusterClickAction["ZoomToClusterExtents"] = "ZoomToClusterExtents";
	ClusterClickAction["ShowPopup"] = "ShowPopup";
	return ClusterClickAction;
}({});
/**
* @since 0.14
*/
function isEvaluatable(arg) {
	return Array.isArray(arg === null || arg === void 0 ? void 0 : arg.expr);
}
/**
* The default style for point features
* @since 0.13
* @since 0.14 Made deep const immutable
*/
var DEFAULT_POINT_CIRCLE_STYLE = {
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
/**
* The default style for clustered point features
* @since 0.14
* @since 0.15 radius expression updated to use OL expression format; uses `clamp` instead of `min`
*/
var DEFAULT_CLUSTERED_POINT_CIRCLE_STYLE = {
	type: "Circle",
	fill: {
		color: "#ff0000",
		alpha: 255
	},
	radius: { expr: [
		"clamp",
		[
			"+",
			[
				"get",
				"features",
				"length"
			],
			4
		],
		5,
		25
	] },
	stroke: {
		color: "#0000ff",
		alpha: 255,
		width: 1
	}
};
/**
* The default icon style for point features
* @since 0.13
* @since 0.14 Made deep const immutable
*/
var DEFAULT_POINT_ICON_STYLE = {
	type: "Icon",
	anchor: [.5, .5],
	src: MAP_MARKER_ICON,
	rotateWithView: false,
	rotation: 0,
	scale: 1
};
/**
* The default color
* @since 0.13
*/
var DEFAULT_COLOR = "#000000";
/**
* The default style for line features
* @since 0.13
* @since 0.14 Made deep const immutable
*/
var DEFAULT_LINE_STYLE = {
	color: "#0000ff",
	alpha: 255,
	width: 1
};
/**
* The default style for polygon features
* @since 0.13
* @since 0.14 Made deep const immutable
*/
var DEFAULT_POLY_STYLE = {
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
/**
* The default vector layer style
* @since 0.14
*/
var DEFAULT_VECTOR_LAYER_STYLE = { default: {
	point: DEFAULT_POINT_CIRCLE_STYLE,
	line: DEFAULT_LINE_STYLE,
	polygon: DEFAULT_POLY_STYLE
} };
/**
* The default vector layer style for clustered points
* @since 0.14
*/
var DEFAULT_CLUSTERED_LAYER_STYLE = { default: { point: DEFAULT_CLUSTERED_POINT_CIRCLE_STYLE } };
//#endregion
//#region src/api/ol-style-builders.ts
function toOLColor(color, alpha) {
	const c = asArray(color);
	if (typeof alpha != "undefined") c[3] = alpha / 255;
	return c;
}
/**
* Lightweight OL encoded-expression evaluator for legend and fallback rendering.
*
* Handles the subset of OL expressions used by this library:
* - `['get', prop, ...]` — nested property access (e.g. `['get', 'features', 0, 'name']`)
* - `['literal', value]` — literal wrapper
* - Arithmetic: `+`, `-`, `*`, `/`
* - `['clamp', val, min, max]`
* - Comparisons: `==`, `!=`, `>`, `>=`, `<`, `<=`
* - Plain non-array values are returned as-is.
*
* Unknown operators return `undefined`.
*
* @hidden
* @since 0.15
*/
function evalOLExpr(expr, props) {
	if (!Array.isArray(expr)) return expr;
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
		case "literal": return args[0];
		case "+": return evalOLExpr(args[0], props) + evalOLExpr(args[1], props);
		case "-": return evalOLExpr(args[0], props) - evalOLExpr(args[1], props);
		case "*": return evalOLExpr(args[0], props) * evalOLExpr(args[1], props);
		case "/": return evalOLExpr(args[0], props) / evalOLExpr(args[1], props);
		case "clamp": {
			const val = evalOLExpr(args[0], props);
			const lo = evalOLExpr(args[1], props);
			const hi = evalOLExpr(args[2], props);
			return Math.max(lo, Math.min(hi, val));
		}
		case "==": return evalOLExpr(args[0], props) == evalOLExpr(args[1], props);
		case "!=": return evalOLExpr(args[0], props) != evalOLExpr(args[1], props);
		case ">": return evalOLExpr(args[0], props) > evalOLExpr(args[1], props);
		case ">=": return evalOLExpr(args[0], props) >= evalOLExpr(args[1], props);
		case "<": return evalOLExpr(args[0], props) < evalOLExpr(args[1], props);
		case "<=": return evalOLExpr(args[0], props) <= evalOLExpr(args[1], props);
		default: return;
	}
}
/**
* Evaluates an `ExprOr<T>` value. If the value is a literal it is returned as-is.
* If it is an `IEvaluatable` (OL encoded expression), the expression is evaluated against
* the provided feature's properties using a lightweight built-in expression evaluator.
* Returns `undefined` when the expression cannot be evaluated (e.g. no feature provided).
*
* @hidden
* @since 0.15
*/
function evalFeature(expr, feat) {
	if (!isEvaluatable(expr)) return expr;
	if (!feat) return;
	try {
		return evalOLExpr(expr.expr, feat.getProperties());
	} catch (e) {
		return;
	}
}
function setIfNotUndefined(obj, prop, value) {
	if (typeof value != "undefined") obj[prop] = value;
}
/**
* @hidden
*/
function buildStroke(stroke, feat) {
	return new Stroke({
		color: toOLColor(evalFeature(stroke.color, feat), evalFeature(stroke.alpha, feat)),
		width: evalFeature(stroke.width, feat)
	});
}
/**
* @hidden
*/
function buildFill(fill, feat) {
	return new Fill({ color: toOLColor(evalFeature(fill.color, feat), evalFeature(fill.alpha, feat)) });
}
/**
* @hidden
*/
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
		if (typeof txt != "undefined") textOpts.text = `${txt}`;
		setIfNotUndefined(textOpts, "textAlign", evalFeature(label.textAlign, feat));
		setIfNotUndefined(textOpts, "textBaseline", evalFeature(label.textBaseline, feat));
		const text = new Text(textOpts);
		if (label.padding) text.setPadding(label.padding);
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
}
//#endregion
//#region src/api/ol-style-map-set.ts
var scopedId = new ScopedId();
/**
* Converts an `ExprOr<T>` to a value suitable for an OL flat style property.
* - Literal values are returned as-is.
* - `IEvaluatable` values expose their embedded OL expression array.
*/
function toFlatExpr(val) {
	if (isEvaluatable(val)) return val.expr;
	return val;
}
/**
* Converts a colour + alpha pair to an OL flat style colour expression.
* Handles the three cases:
*  - both static   → pre-computed RGBA `number[]`
*  - colour is OL expression, alpha static → use colour expression (alpha embedded by caller)
*  - alpha is OL expression, colour static → `['color', r, g, b, alphaExpr / 255]`
*  - both OL expressions → use colour expression only
*/
function toFlatColorExpr(color, alpha) {
	const colorIsExpr = isEvaluatable(color);
	const alphaIsExpr = isEvaluatable(alpha);
	if (!colorIsExpr && !alphaIsExpr) {
		const c = asArray(color).slice();
		c[3] = alpha / 255;
		return c;
	}
	if (colorIsExpr && !alphaIsExpr) return color.expr;
	if (!colorIsExpr && alphaIsExpr) {
		const c = asArray(color);
		return [
			"color",
			c[0],
			c[1],
			c[2],
			[
				"/",
				alpha.expr,
				255
			]
		];
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
/**
* Converts an `IVectorFeatureStyle` to an OL `FlatStyle` object.
* A single `FlatStyle` covers all geometry types; OL uses the relevant
* sub-properties (`circle-*`, `stroke-*`, `fill-*`) based on feature geometry.
*
* @internal
* @since 0.15
*/
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
			result["icon-rotation"] = isEvaluatable(pt.rotation) ? [
				"*",
				pt.rotation.expr,
				Math.PI / 180
			] : deg2rad(pt.rotation);
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
	var _cpts$getImage, _cpls$getStroke, _cpls$getFill;
	const cpts = pts.clone();
	const cpls = pls.clone();
	const gcs = new Style({
		image: (_cpts$getImage = cpts.getImage()) !== null && _cpts$getImage !== void 0 ? _cpts$getImage : void 0,
		stroke: (_cpls$getStroke = cpls.getStroke()) !== null && _cpls$getStroke !== void 0 ? _cpls$getStroke : void 0,
		fill: (_cpls$getFill = cpls.getFill()) !== null && _cpls$getFill !== void 0 ? _cpls$getFill : void 0
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
/**
* Builds an `IOlStyleMap` / `DynamicStyleMap` from an `IVectorFeatureStyle`.
* Used exclusively for **legend image generation** in the style editor.
*
* For layer rendering use {@link OLStyleMapSet.toFlatRules} instead.
*
* @internal
*/
function vectorStyleToStyleMap(style) {
	var _style$point, _style$line, _style$polygon, _plStyle$fill, _plStyle$fill2, _plStyle$stroke, _plStyle$stroke2, _plStyle$stroke3;
	const ptStyle = (_style$point = style.point) !== null && _style$point !== void 0 ? _style$point : DEFAULT_POINT_CIRCLE_STYLE;
	const lnStyle = (_style$line = style.line) !== null && _style$line !== void 0 ? _style$line : DEFAULT_LINE_STYLE;
	const plStyle = (_style$polygon = style.polygon) !== null && _style$polygon !== void 0 ? _style$polygon : DEFAULT_POLY_STYLE;
	const builder = (feat) => {
		const pts = new Style();
		if (ptStyle.type == "Circle") pts.setImage(new CircleStyle({
			radius: evalFeature(ptStyle.radius, feat),
			fill: buildFill(ptStyle.fill, feat),
			stroke: buildStroke(ptStyle.stroke, feat)
		}));
		else pts.setImage(new Icon$1({
			anchor: ptStyle.anchor,
			src: evalFeature(ptStyle.src, feat),
			rotateWithView: evalFeature(ptStyle.rotateWithView, feat),
			rotation: deg2rad(evalFeature(ptStyle.rotation, feat)),
			scale: evalFeature(ptStyle.scale, feat)
		}));
		const lns = new Style({ stroke: buildStroke(lnStyle, feat) });
		const pls = new Style({
			stroke: buildStroke(plStyle.stroke, feat),
			fill: buildFill(plStyle.fill, feat)
		});
		const ptText = tryBuildTextStyle(ptStyle, feat);
		const lnText = tryBuildTextStyle(lnStyle, feat);
		const plsText = tryBuildTextStyle(plStyle, feat);
		if (ptText) pts.setText(ptText);
		if (lnText) lns.setText(lnText);
		if (plsText) pls.setText(plsText);
		return buildStyleMap(pts, lns, pls);
	};
	if (isEvaluatable(ptStyle.radius) || isEvaluatable(ptStyle.src) || isEvaluatable(ptStyle.rotateWithView) || isEvaluatable(ptStyle.rotation) || isEvaluatable(ptStyle.scale) || isEvaluatable(lnStyle.color) || isEvaluatable(lnStyle.alpha) || isEvaluatable(lnStyle.width) || isEvaluatable((_plStyle$fill = plStyle.fill) === null || _plStyle$fill === void 0 ? void 0 : _plStyle$fill.color) || isEvaluatable((_plStyle$fill2 = plStyle.fill) === null || _plStyle$fill2 === void 0 ? void 0 : _plStyle$fill2.alpha) || isEvaluatable((_plStyle$stroke = plStyle.stroke) === null || _plStyle$stroke === void 0 ? void 0 : _plStyle$stroke.color) || isEvaluatable((_plStyle$stroke2 = plStyle.stroke) === null || _plStyle$stroke2 === void 0 ? void 0 : _plStyle$stroke2.alpha) || isEvaluatable((_plStyle$stroke3 = plStyle.stroke) === null || _plStyle$stroke3 === void 0 ? void 0 : _plStyle$stroke3.width)) return builder;
	return builder(void 0);
}
/**
* @since 0.14
* @since 0.15 Reworked to use OL native flat style expressions instead of expr-eval-fork
*/
var OLStyleMapSet = class {
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
		var _this$clusterStyleDef;
		return (_this$clusterStyleDef = this.clusterStyleDef) === null || _this$clusterStyleDef === void 0 ? void 0 : _this$clusterStyleDef.onClick;
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
			if (!g) return null;
			const gt = g.getType();
			const styleMap = vectorStyleToStyleMap(matchRule(this.origStyleDef, feature));
			if (typeof styleMap === "function") return styleMap(feature)[gt];
			return styleMap[gt];
		} catch (e) {
			console.error(e);
			return null;
		}
	}
};
/**
* Selects the first matching rule style for a feature (for legend/fallback use).
* Uses the lightweight built-in OL expression evaluator to evaluate filter expressions.
*/
function matchRule(styleDef, feature) {
	if (styleDef.rules) {
		const props = feature.getProperties();
		for (const rule of styleDef.rules) if (rule.filter) try {
			if (evalOLExpr(rule.filter, props)) return rule.style;
		} catch (_unused) {}
		else if (rule.else) return rule.style;
	}
	return styleDef.default;
}
/**
* Converts an `IVectorLayerStyle` to an OL `Array<Rule>` for use with `layer.setStyle()`.
*/
function buildFlatRules(styleDef) {
	const rules = [];
	if (styleDef.rules && styleDef.rules.length > 0) for (const rule of styleDef.rules) rules.push({
		filter: rule.filter,
		else: rule.else,
		style: featureStyleToFlatStyle(rule.style)
	});
	rules.push({
		else: true,
		style: featureStyleToFlatStyle(styleDef.default)
	});
	return rules;
}
//#endregion
//#region src/api/ol-style-helpers.ts
/**
* @since 0.14
*/
var DEFAULT_STYLE_KEY = "default";
function isClusteredFeature(feature) {
	var _getClusterSubFeature;
	if ((_getClusterSubFeature = getClusterSubFeatures(feature)) === null || _getClusterSubFeature === void 0 ? void 0 : _getClusterSubFeature.length) return true;
	return false;
}
function getClusterSubFeatures(feature) {
	return feature.get("features");
}
/**
* Sets the vector layer style for the given OpenLayers vector layer using OL's
* native flat style rules. The `IVectorLayerStyle` is converted to `Array<Rule>`
* and passed directly to `layer.setStyle()` so that OL evaluates all expressions
* natively at render time.
*
* An `OLStyleMapSet` is still stored on the layer under `LayerProperty.VECTOR_STYLE`
* so that callers can read back the original style definition and cluster settings.
*
* @since 0.13
* @since 0.14 style now takes IVectorLayerStyle instead of IVectorFeatureStyle and accepts an optional cluster style
* and layer can be either a vector layer or a vector tile layer
* @since 0.15 uses OL flat style rules instead of a dynamic style function
*/
function setOLVectorLayerStyle(layer, style, clusterStyle) {
	const olstyles = new OLStyleMapSet(style, clusterStyle);
	layer.set(LayerProperty.VECTOR_STYLE, olstyles);
	layer.setStyle(olstyles.toFlatRules());
}
//#endregion
//#region src/components/external-layer-factory.ts
init_objectSpread2();
function sameProjectionAs(proj1, proj2) {
	const nproj1 = get(proj1);
	const nproj2 = get(proj2);
	if (nproj1 && nproj2) return equivalent(nproj1, nproj2);
	else return true;
}
var geoJsonVt2GeoJSON = (key, value) => {
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
	} else return value;
};
function getRawGeoJson(_x) {
	return _getRawGeoJson.apply(this, arguments);
}
function _getRawGeoJson() {
	_getRawGeoJson = _asyncToGenerator(function* (defn) {
		const { url } = defn.sourceParams;
		if (typeof url == "string") {
			debug(`Fetching url: ${url}`);
			return yield (yield fetch(url)).json();
		} else if (typeof url == "object" && !strIsNullOrEmpty(url.var_source)) {
			if (!window[url.var_source]) throw new Error(`No such global var (${url.var_source})`);
			return window[url.var_source];
		} else throw new Error("Don't know how to process URL source");
	});
	return _getRawGeoJson.apply(this, arguments);
}
function createGeoJsonVectorSource(defn, mapProjection) {
	const { url, attributions } = defn.sourceParams;
	if (typeof url == "string") return new VectorSource({
		url,
		format: new GeoJSON(),
		attributions
	});
	else if (typeof url == "object" && !strIsNullOrEmpty(url.var_source)) {
		if (!window[url.var_source]) throw new Error(`No such global var (${url.var_source})`);
		const vectorSource = new VectorSource({
			loader: (_extent, _resolution, projection) => {
				var _defn$meta;
				const features = new GeoJSON({
					dataProjection: (_defn$meta = defn.meta) === null || _defn$meta === void 0 ? void 0 : _defn$meta.projection,
					featureProjection: mapProjection
				}).readFeatures(window[url.var_source]);
				vectorSource.addFeatures(features);
			},
			attributions
		});
		return vectorSource;
	} else throw new Error("Don't know how to process URL source");
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
var EMPTY_GEOJSON = {
	type: "FeatureCollection",
	features: []
};
var geoTiffSourceCtorPromise = __vitePreload(() => import("./chunks/geotiff-debug.js").then((n) => n.t).then((mod) => mod.default), __vite__mapDeps([0,1,2,3]), import.meta.url);
/**
* @hidden
*/
function clusterSourceIfRequired(source, def) {
	if (def.cluster) return new Cluster({
		source,
		distance: def.cluster.distance,
		geometryFunction: (feature) => {
			const geometry = feature.getGeometry();
			if (geometry && geometry.getType() == "Point") return geometry;
		}
	});
	return source;
}
/**
* @hidden
*/
function createOLLayerFromSubjectDefn(defn, mapProjection, isExternal, appSettings) {
	switch (defn.type) {
		case GenericSubjectLayerType.StaticImage: {
			var _defn$meta2;
			const sourceArgs = _objectSpread2({}, defn.sourceParams);
			if (!sourceArgs.imageExtent) sourceArgs.imageExtent = (_defn$meta2 = defn.meta) === null || _defn$meta2 === void 0 ? void 0 : _defn$meta2.extents;
			const layer = new ImageLayer({ source: new Static(sourceArgs) });
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
			const layer = new TileLayer({ source: new XYZ(_objectSpread2({}, defn.sourceParams)) });
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
			var _defn$sourceParams$fe, _defn$vectorStyle;
			const source = new VectorSource({
				features: new GeoJSON().readFeatures((_defn$sourceParams$fe = defn.sourceParams.features) !== null && _defn$sourceParams$fe !== void 0 ? _defn$sourceParams$fe : EMPTY_GEOJSON),
				attributions: defn.sourceParams.attributions
			});
			const layer = new VectorLayer(_objectSpread2(_objectSpread2({}, defn.layerOptions), {}, { source: clusterSourceIfRequired(source, defn) }));
			setOLVectorLayerStyle(layer, (_defn$vectorStyle = defn.vectorStyle) !== null && _defn$vectorStyle !== void 0 ? _defn$vectorStyle : DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
			applyVectorLayerProperties(defn, layer, isExternal);
			return layer;
		}
		case GenericSubjectLayerType.GeoJSON: {
			var _defn$meta3;
			const isWebM = sameProjectionAs(mapProjection, "EPSG:3857");
			const asVT = ((_defn$meta3 = defn.meta) === null || _defn$meta3 === void 0 ? void 0 : _defn$meta3.geojson_as_vt) == true;
			if (asVT && isWebM) {
				var _defn$vectorStyle2;
				const lazyTileIndex = new AsyncLazy(_asyncToGenerator(function* () {
					var _defn$meta4;
					let json = yield getRawGeoJson(defn);
					if (((_defn$meta4 = defn.meta) === null || _defn$meta4 === void 0 ? void 0 : _defn$meta4.projection) != "EPSG:4326") {
						var _defn$meta5;
						const gj = new GeoJSON({
							dataProjection: (_defn$meta5 = defn.meta) === null || _defn$meta5 === void 0 ? void 0 : _defn$meta5.projection,
							featureProjection: "EPSG:4326"
						});
						const features = gj.readFeatures(json);
						json = gj.writeFeaturesObject(features, { dataProjection: "EPSG:4326" });
					}
					return geojsonvt(json, { extent: 4096 });
				}));
				const format = new GeoJSON({ dataProjection: new Projection({
					code: "TILE_PIXELS",
					units: "tile-pixels",
					extent: [
						0,
						0,
						4096,
						4096
					]
				}) });
				const vectorSource = new VectorTile({
					projection: mapProjection,
					tileUrlFunction: (tileCoord) => {
						return JSON.stringify(tileCoord);
					},
					tileLoadFunction: (tile, url) => {
						const tileCoord = JSON.parse(url);
						lazyTileIndex.getValueAsync().then((tileIndex) => {
							const data = tileIndex.getTile(tileCoord[0], tileCoord[1], tileCoord[2]);
							const geojson = JSON.stringify({
								type: "FeatureCollection",
								features: data ? data.features : []
							}, geoJsonVt2GeoJSON);
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
				const vectorLayer = new VectorTileLayer({ source: vectorSource });
				setOLVectorLayerStyle(vectorLayer, (_defn$vectorStyle2 = defn.vectorStyle) !== null && _defn$vectorStyle2 !== void 0 ? _defn$vectorStyle2 : DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
				applyVectorLayerProperties(defn, vectorLayer, isExternal);
				return vectorLayer;
			} else {
				var _defn$vectorStyle3;
				if (asVT) console.warn("The geojson_as_vt meta option only applies if the MapGuide map or Primary Subject Layer is in EPSG:3857. This layer will be loaded as a regular GeoJSON layer");
				const source = createGeoJsonVectorSource(defn, mapProjection);
				const layer = new VectorLayer(_objectSpread2(_objectSpread2({}, defn.layerOptions), {}, { source: clusterSourceIfRequired(source, defn) }));
				setOLVectorLayerStyle(layer, (_defn$vectorStyle3 = defn.vectorStyle) !== null && _defn$vectorStyle3 !== void 0 ? _defn$vectorStyle3 : DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
				applyVectorLayerProperties(defn, layer, isExternal);
				return layer;
			}
		}
		case GenericSubjectLayerType.MVT: {
			var _defn$vectorStyle4;
			const mo = { idProperty: defn.sourceParams.mvtIdProperty };
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
							if (response.status == 200) response.arrayBuffer().then(function(data) {
								const features = tile.getFormat().readFeatures(data, {
									extent,
									featureProjection: projection
								}).filter((f) => f != null);
								tile.setFeatures(features);
							});
						});
					});
				}
			});
			const layer = new VectorTileLayer(_objectSpread2(_objectSpread2({}, defn.layerOptions), {}, { source }));
			setOLVectorLayerStyle(layer, (_defn$vectorStyle4 = defn.vectorStyle) !== null && _defn$vectorStyle4 !== void 0 ? _defn$vectorStyle4 : DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
			applyVectorLayerProperties(defn, layer, isExternal);
			return layer;
		}
		case GenericSubjectLayerType.CSV: {
			var _defn$vectorStyle5;
			const vectorSource = new VectorSource({
				loader: (_extent, _resolution, projection) => {
					const xhr = new XMLHttpRequest();
					xhr.open("GET", defn.sourceParams.url);
					const onError = () => vectorSource.clear();
					xhr.onerror = onError;
					xhr.onload = () => {
						if (xhr.status == 200) new CsvFormatDriver(CSV_COLUMN_ALIASES).tryParse(xhr.responseText.length, xhr.responseText).then((pf) => {
							var _defn$meta6;
							pf.addTo(vectorSource, projection, (_defn$meta6 = defn.meta) === null || _defn$meta6 === void 0 ? void 0 : _defn$meta6.projection);
						}).catch((e) => onError());
						else onError();
					};
					xhr.send();
				},
				attributions: defn.sourceParams.attributions
			});
			const layer = new VectorLayer(_objectSpread2(_objectSpread2({}, defn.layerOptions), {}, { source: clusterSourceIfRequired(vectorSource, defn) }));
			setOLVectorLayerStyle(layer, (_defn$vectorStyle5 = defn.vectorStyle) !== null && _defn$vectorStyle5 !== void 0 ? _defn$vectorStyle5 : DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
			applyVectorLayerProperties(defn, layer, isExternal);
			return layer;
		}
		case GenericSubjectLayerType.KML: {
			const source = new VectorSource({
				url: defn.sourceParams.url,
				format: new KML(),
				attributions: defn.sourceParams.attributions
			});
			const layer = new VectorLayer(_objectSpread2(_objectSpread2({}, defn.layerOptions), {}, { source: clusterSourceIfRequired(source, defn) }));
			applyVectorLayerProperties(defn, layer, isExternal);
			return layer;
		}
		case GenericSubjectLayerType.TileWMS: {
			const layer = new TileLayer({ source: new TileWMS(_objectSpread2({}, defn.sourceParams)) });
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
			var _defn$meta7, _defn$vectorStyle6;
			const sourceArgs = _objectSpread2({}, defn.sourceParams);
			const layer = new VectorLayer(_objectSpread2(_objectSpread2({}, defn.layerOptions), {}, { source: new VectorSource(_objectSpread2(_objectSpread2({}, sourceArgs), {}, { format: new GeoJSON({
				dataProjection: (_defn$meta7 = defn.meta) === null || _defn$meta7 === void 0 ? void 0 : _defn$meta7.projection,
				featureProjection: mapProjection
			}) })) }));
			setOLVectorLayerStyle(layer, (_defn$vectorStyle6 = defn.vectorStyle) !== null && _defn$vectorStyle6 !== void 0 ? _defn$vectorStyle6 : DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
			applyVectorLayerProperties(defn, layer, isExternal);
			return layer;
		}
		case GenericSubjectLayerType.CustomVector: {
			var _defn$vectorStyle7;
			if (strIsNullOrEmpty(defn.driverName)) throw new Error("Missing required driverName");
			const factory = ExternalLayerFactoryRegistry.getInstance().getExternalVectorLayerCreator(defn.driverName);
			if (!factory) throw new Error(`Could not resolve an approriate factory for the given driver: ${defn.driverName}`);
			const layer = factory(defn.sourceParams, defn.meta, defn.layerOptions, appSettings);
			const source = clusterSourceIfRequired(layer.getSource(), defn);
			layer.setSource(source);
			setOLVectorLayerStyle(layer, (_defn$vectorStyle7 = defn.vectorStyle) !== null && _defn$vectorStyle7 !== void 0 ? _defn$vectorStyle7 : DEFAULT_VECTOR_LAYER_STYLE, defn.cluster);
			applyVectorLayerProperties(defn, layer, isExternal);
			return layer;
		}
		case GenericSubjectLayerType.GeoTIFF: {
			const sourceArgs = _objectSpread2({}, defn.sourceParams);
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
		default: throw new Error(`Unknown subject layer type: ${defn.type}`);
	}
}
function convertStamenLayerName(name) {
	switch (name) {
		case "toner-lite": return "toner_lite";
		default: return name;
	}
}
/**
* Creates an OpenLayers source based on the given external base layer definition
*
* @param {IExternalBaseLayer} layer
* @returns
* @since 0.14.10 - Stamen now creates a XYZ layer and a StadiaMaps API key is required
*/
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
		case "StadiaMaps": return new XYZ({
			crossOrigin: "Anonymous",
			url: "https://tiles.stadiamaps.com/tiles/" + layer.options.layer + "/{z}/{x}/{y}.png?api_key=" + layer.options.key
		});
		case "Stamen": return new XYZ({
			crossOrigin: "Anonymous",
			url: "https://tiles.stadiamaps.com/tiles/stamen_" + convertStamenLayerName(layer.options.layer) + "/{z}/{x}/{y}.png?api_key=" + layer.options.key
		});
		case "BingMaps":
			sourceCtor = BingMaps;
			break;
		case "UTFGrid":
			sourceCtor = UTFGrid;
			break;
		default: throw new MgError(`Unknown external base layer provider: ${layer.kind}`);
	}
	if (typeof layer.options != "undefined") return new sourceCtor(_objectSpread2({ crossOrigin: "Anonymous" }, layer.options));
	else return new sourceCtor({ crossOrigin: "Anonymous" });
}
//#endregion
//#region src/api/base-layer-set.ts
/**
* @hidden
*/
var BaseLayerSetOL = class {
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
		if (this.externalBaseLayersGroup) this.externalBaseLayersGroup.getLayers().forEach((l) => {
			const match = (externalBaseLayers || []).filter((el) => el.name === l.get("title"));
			if (match.length == 1) l.setVisible(!!match[0].visible);
			else l.setVisible(false);
		});
	}
	/**
	*
	* @virtual
	* @param {RefreshMode} mode
	*/
	refreshMap(mode) {}
};
var M_TO_IN = 39.37;
var DEFAULT_DPI = 96;
/**
* @hidden
*/
var GenericLayerSetOL = class extends BaseLayerSetOL {
	constructor(view, subjectLayer, extent, externalBaseLayersGroup, projection, metersPerUnit = 1, dpi = DEFAULT_DPI) {
		super(externalBaseLayersGroup, projection, dpi, extent, M_TO_IN * metersPerUnit, view);
		this.subjectLayer = subjectLayer;
	}
	getLayers() {
		const layers = [];
		if (this.externalBaseLayersGroup) layers.push(this.externalBaseLayersGroup);
		if (this.subjectLayer) layers.push(this.subjectLayer);
		return layers;
	}
	getSourcesForProgressTracking() {
		const sources = [];
		if (this.externalBaseLayersGroup) {
			const bls = this.externalBaseLayersGroup.getLayersArray();
			for (const bl of bls) if (bl instanceof ImageLayer || bl instanceof TileLayer) sources.push(bl.getSource());
		}
		if (this.subjectLayer instanceof ImageLayer) sources.push(this.subjectLayer.getSource());
		else if (this.subjectLayer instanceof TileLayer) sources.push(this.subjectLayer.getSource());
		return sources;
	}
	updateTransparency(trans) {
		if (this.externalBaseLayersGroup) if ("LAYER_ID_BASE" in trans) this.externalBaseLayersGroup.setOpacity(restrictToRange(trans[LAYER_ID_BASE], 0, 1));
		else this.externalBaseLayersGroup.setOpacity(1);
		if (this.subjectLayer) if ("LAYER_ID_MG_BASE" in trans) {
			const opacity = restrictToRange(trans[LAYER_ID_MG_BASE], 0, 1);
			this.subjectLayer.setOpacity(opacity);
		} else this.subjectLayer.setOpacity(1);
	}
	/**
	* 
	* @param mapExtent 
	* @param size @deprecated This parameter is no longer used and will be removed in a later release
	* @param uri 
	* 
	* @since 0.15 Deprecated size parameter
	*/
	showActiveSelectedFeature(mapExtent, size, uri) {}
	update(showGroups, showLayers, hideGroups, hideLayers) {}
	updateSelectionColor(color) {}
};
//#endregion
//#region src/api/layer-set.ts
var DEFAULT_BOUNDS_4326 = [
	-180,
	-90,
	180,
	90
];
function getMetersPerUnit(projection) {
	const proj = get(projection);
	return proj === null || proj === void 0 ? void 0 : proj.getMetersPerUnit();
}
function toMetersPerUnit(unit) {
	let mpu = METERS_PER_UNIT[toProjUnit(unit)];
	if (mpu) return mpu;
	else switch (unit) {
		case UnitOfMeasure.Centimeters: return .01;
		case UnitOfMeasure.DMS:
		case UnitOfMeasure.DecimalDegrees:
		case UnitOfMeasure.Degrees: return 2 * Math.PI * 6370997 / 360;
		case UnitOfMeasure.Feet: return .3048;
		case UnitOfMeasure.Inches: return .0254;
		case UnitOfMeasure.Kilometers: return 1e3;
		case UnitOfMeasure.Meters: return 1;
		case UnitOfMeasure.Miles: return 1609.344;
		case UnitOfMeasure.Millimeters: return .001;
		case UnitOfMeasure.NauticalMiles: return 1852;
		case UnitOfMeasure.Pixels: return 1;
		case UnitOfMeasure.Unknown: return 1;
		case UnitOfMeasure.Yards: return .9144;
	}
}
function toProjUnit(unit) {
	switch (unit) {
		case UnitOfMeasure.Meters: return "m";
		case UnitOfMeasure.Feet: return "ft";
		case UnitOfMeasure.Inches: return "in";
		case UnitOfMeasure.Centimeters: return "cm";
		case UnitOfMeasure.Kilometers: return "km";
		case UnitOfMeasure.Yards: return "yd";
		case UnitOfMeasure.Millimeters: return "mm";
		case UnitOfMeasure.Miles: return "mi";
		case UnitOfMeasure.NauticalMiles: return "nm";
		case UnitOfMeasure.Pixels: return "px";
		default: throw new MgError("Unsupported unit");
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
		let maxSize = tCtx.measureText(strings[0]).width + xoff;
		let ch = 46;
		maxSize = Math.max(tCtx.measureText(strings[1]).width + xoff, maxSize);
		ch += 16;
		const keys = Object.keys(parsed.query);
		for (const k of keys) if (k == "MAPNAME" || k == "SETDISPLAYWIDTH" || k == "SETDISPLAYHEIGHT" || k == "SETVIEWCENTERX" || k == "SETVIEWCENTERY" || k == "SETVIEWSCALE") {
			if (!strIsNullOrEmpty(parsed.query[k])) {
				const s = `${k}: ${parsed.query[k]}`;
				strings.push(s);
				maxSize = Math.max(tCtx.measureText(s).width + xoff, maxSize);
				ch += 16;
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
			y += 15;
		}
		image.getImage().src = tCtx.canvas.toDataURL();
	}
}
var MgLayerSetMode = /* @__PURE__ */ function(MgLayerSetMode) {
	MgLayerSetMode[MgLayerSetMode["Stateless"] = 0] = "Stateless";
	MgLayerSetMode[MgLayerSetMode["Stateful"] = 1] = "Stateful";
	MgLayerSetMode[MgLayerSetMode["OverviewMap"] = 2] = "OverviewMap";
	return MgLayerSetMode;
}({});
/**
* @hidden
*/
var MgLayerSetOL = class {
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
			for (const bl of bls) if (bl instanceof ImageLayer || bl instanceof TileLayer) sources.push(bl.getSource());
		}
		for (let i = this.mgTiledLayers.length - 1; i >= 0; i--) if (this.mgTiledLayers[i].getSource()) sources.push();
		const ovs = this.overlay.getSource();
		if (ovs) sources.push(ovs);
		if (this.selectionOverlay) {
			const sovs = this.selectionOverlay.getSource();
			if (sovs) sources.push(sovs);
		}
		if (this.activeSelectedFeatureOverlay) {
			const asovs = this.activeSelectedFeatureOverlay.getSource();
			if (asovs) sources.push(asovs);
		}
		return sources;
	}
	getLayers() {
		const layers = [];
		if (this.externalBaseLayersGroup) layers.push(this.externalBaseLayersGroup);
		for (let i = this.mgTiledLayers.length - 1; i >= 0; i--) layers.push(this.mgTiledLayers[i]);
		layers.push(this.overlay);
		if (this.selectionOverlay) layers.push(this.selectionOverlay);
		if (this.activeSelectedFeatureOverlay) layers.push(this.activeSelectedFeatureOverlay);
		return layers;
	}
	update(showGroups, showLayers, hideGroups, hideLayers) {
		this.overlay.getSource().updateParams({
			showlayers: showLayers,
			showgroups: showGroups,
			hidelayers: hideLayers,
			hidegroups: hideGroups
		});
		if (showGroups && showGroups.length > 0) for (const groupId of showGroups) {
			const match = this.mgTiledLayers.filter((l) => l.get(LayerProperty.LAYER_NAME) === groupId);
			if (match.length == 1) match[0].setVisible(true);
		}
		if (hideGroups && hideGroups.length > 0) for (const groupId of hideGroups) {
			const match = this.mgTiledLayers.filter((l) => l.get(LayerProperty.LAYER_NAME) === groupId);
			if (match.length == 1) match[0].setVisible(false);
		}
	}
	updateSelectionColor(color) {
		if (this.selectionOverlay) this.selectionOverlay.getSource().updateParams({ SELECTIONCOLOR: color });
	}
	updateExternalBaseLayers(externalBaseLayers) {
		if (this.externalBaseLayersGroup) this.externalBaseLayersGroup.getLayers().forEach((l) => {
			const match = (externalBaseLayers || []).filter((el) => el.name === l.get("title"));
			if (match.length == 1) l.setVisible(!!match[0].visible);
			else l.setVisible(false);
		});
	}
	updateTransparency(trans) {
		if (this.externalBaseLayersGroup) if ("LAYER_ID_BASE" in trans) this.externalBaseLayersGroup.setOpacity(restrictToRange(trans[LAYER_ID_BASE], 0, 1));
		else this.externalBaseLayersGroup.setOpacity(1);
		if ("LAYER_ID_MG_DYNAMIC_OVERLAY" in trans) {
			const opacity = restrictToRange(trans[LAYER_ID_MG_DYNAMIC_OVERLAY], 0, 1);
			this.overlay.setOpacity(opacity);
		} else this.overlay.setOpacity(1);
		if ("LAYER_ID_MG_BASE" in trans) {
			const opacity = restrictToRange(trans[LAYER_ID_MG_BASE], 0, 1);
			for (const group of this.mgTiledLayers) group.setOpacity(opacity);
		} else for (const group of this.mgTiledLayers) group.setOpacity(1);
		if (this.selectionOverlay) if ("LAYER_ID_MG_SEL_OVERLAY" in trans) this.selectionOverlay.setOpacity(restrictToRange(trans[LAYER_ID_MG_SEL_OVERLAY], 0, 1));
		else this.selectionOverlay.setOpacity(1);
	}
	refreshMap(mode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly) {
		if ((mode & RefreshMode.LayersOnly) == RefreshMode.LayersOnly) this.overlay.getSource().updateParams({ seq: (/* @__PURE__ */ new Date()).getTime() });
		if (this.selectionOverlay) {
			if ((mode & RefreshMode.SelectionOnly) == RefreshMode.SelectionOnly) this.selectionOverlay.getSource().updateParams({ seq: (/* @__PURE__ */ new Date()).getTime() });
		}
	}
	makeActiveSelectedFeatureSource(mapExtent, size, url = BLANK_GIF_DATA_URI) {
		return new Static({
			imageExtent: mapExtent,
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
};
/**
* @hidden
*/
var MgInnerLayerSetFactory = class {
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
				BEHAVIOR: 5
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
		const { map, agentUri } = this;
		if (isRuntimeMap(map)) {
			if (strIsNullOrEmpty(agentUri)) throw new MgError("Expected agentUri to be set");
			const resourceId = map.TileSetDefinition || map.MapDefinition;
			const tileWidth = map.TileWidth || 300;
			const tileHeight = map.TileHeight || 300;
			const metersPerUnit = map.CoordinateSystem.MetersPerUnit;
			const finiteScales = [];
			if (map.FiniteDisplayScale) for (let i = map.FiniteDisplayScale.length - 1; i >= 0; i--) finiteScales.push(map.FiniteDisplayScale[i]);
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
			for (let i = 0; i < finiteScales.length; ++i) resolutions[i] = finiteScales[i] / inPerUnit / dpi;
			const parsedArb = tryParseArbitraryCs(map.CoordinateSystem.MentorCode);
			if (parsedArb) projection = new Projection({
				code: parsedArb.code,
				units: toProjUnit(parsedArb.units),
				metersPerUnit: toMetersPerUnit(parsedArb.units)
			});
			else if (map.CoordinateSystem.EpsgCode.length > 0) projection = `EPSG:${map.CoordinateSystem.EpsgCode}`;
			const zOrigin = finiteScales.length - 1;
			const mgTiledLayers = [];
			if (map.Group) for (let i = 0; i < map.Group.length; i++) {
				const group = map.Group[i];
				if (group.Type != 2 && group.Type != 3) continue;
				let tileLayer;
				if (group.Type === 3 && map.TileSetProvider === "XYZ") {
					let retinaScale = 1;
					if (typeof map.TilePixelRatio != "undefined") retinaScale = map.TilePixelRatio;
					tileLayer = new TileLayer({ source: new XYZ({
						tileSize: [256 * retinaScale, 256 * retinaScale],
						tileGrid: createXYZ({ tileSize: [256, 256] }),
						projection,
						url: this.callback.getClient().getTileTemplateUrl(resourceId, group.Name, "{x}", "{y}", "{z}", true),
						wrapX: false
					}) });
				} else tileLayer = new TileLayer({ source: new TileImage({
					tileGrid: new TileGrid({
						origin: getTopLeft(extent),
						resolutions,
						tileSize: [tileWidth, tileHeight]
					}),
					projection,
					tileUrlFunction: this.getTileUrlFunctionForGroup(resourceId, group.Name, zOrigin),
					wrapX: false
				}) });
				tileLayer.set(LayerProperty.LAYER_NAME, group.ObjectId);
				tileLayer.set(LayerProperty.LAYER_DISPLAY_NAME, group.ObjectId);
				tileLayer.set(LayerProperty.LAYER_TYPE, MgLayerType.Tiled);
				tileLayer.set(LayerProperty.IS_EXTERNAL, false);
				tileLayer.set(LayerProperty.IS_GROUP, false);
				tileLayer.setVisible(group.Visible);
				mgTiledLayers.push(tileLayer);
			}
			const overlay = this.createMgOverlayLayer(MgBuiltInLayers.Overlay, agentUri, locale, metersPerUnit, projection, mode == 1, mode == 1 ? this.dynamicOverlayParams : this.staticOverlayParams);
			let selectionOverlay;
			let activeSelectedFeatureOverlay;
			if (mode == 1) selectionOverlay = this.createMgOverlayLayer(MgBuiltInLayers.SelectionOverlay, agentUri, locale, metersPerUnit, projection, true, this.selectionOverlayParams);
			if (mode == 1) {
				activeSelectedFeatureOverlay = new ImageLayer({ source: new Static({
					imageExtent: extent,
					url: BLANK_GIF_DATA_URI
				}) });
				activeSelectedFeatureOverlay.set(LayerProperty.LAYER_NAME, MgBuiltInLayers.ActiveFeatureSelectionOverlay);
				activeSelectedFeatureOverlay.set(LayerProperty.LAYER_DISPLAY_NAME, MgBuiltInLayers.ActiveFeatureSelectionOverlay);
				activeSelectedFeatureOverlay.set(LayerProperty.LAYER_TYPE, MG_LAYER_TYPE_NAME);
				activeSelectedFeatureOverlay.set(LayerProperty.IS_EXTERNAL, false);
				activeSelectedFeatureOverlay.set(LayerProperty.IS_GROUP, false);
			}
			let externalBaseLayersGroup;
			if (mode != 2 && externalBaseLayers != null) {
				externalBaseLayersGroup = new LayerGroup({
					title: tr("EXTERNAL_BASE_LAYERS", locale),
					layers: externalBaseLayers.map((ext) => {
						return this.createExternalBaseLayer(ext);
					})
				});
				externalBaseLayersGroup.set(LayerProperty.LAYER_NAME, MG_BASE_LAYER_GROUP_NAME);
				externalBaseLayersGroup.set(LayerProperty.LAYER_DISPLAY_NAME, MG_BASE_LAYER_GROUP_NAME);
				externalBaseLayersGroup.set(LayerProperty.IS_EXTERNAL, false);
				externalBaseLayersGroup.set(LayerProperty.IS_GROUP, true);
			}
			debug(`Creating OL view with projection ${projection} and ${resolutions.length} resolutions`);
			let view;
			if (resolutions.length == 0) view = new View({ projection });
			else view = new View({
				projection,
				resolutions
			});
			const layerSet = new MgLayerSetOL(mgTiledLayers, externalBaseLayersGroup, overlay, projection, dpi, extent, inPerUnit, view);
			layerSet.selectionOverlay = selectionOverlay;
			layerSet.activeSelectedFeatureOverlay = activeSelectedFeatureOverlay;
			return layerSet;
		} else {
			var _map$meta;
			let projection = map === null || map === void 0 || (_map$meta = map.meta) === null || _map$meta === void 0 ? void 0 : _map$meta.projection;
			let bounds;
			let externalBaseLayersGroup;
			if (externalBaseLayers != null) {
				externalBaseLayersGroup = new LayerGroup({
					title: tr("EXTERNAL_BASE_LAYERS", locale),
					layers: externalBaseLayers.map((ext) => {
						return this.createExternalBaseLayer(ext);
					})
				});
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
			if (parsedArb) projection = new Projection({
				code: parsedArb.code,
				units: toProjUnit(parsedArb.units),
				metersPerUnit: toMetersPerUnit(parsedArb.units),
				extent: bounds
			});
			else metersPerUnit = getMetersPerUnit(projection);
			return new GenericLayerSetOL(new View({ projection }), subjectLayer, bounds, externalBaseLayersGroup, projection, metersPerUnit);
		}
	}
	createExternalBaseLayer(ext) {
		const extSource = createExternalSource(ext);
		if (extSource instanceof UrlTile) {
			const loaders = this.callback.getBaseTileLoaders();
			if (loaders[ext.name]) extSource.setTileLoadFunction(loaders[ext.name]);
		}
		const tl = new TileLayer({
			title: ext.name,
			type: "base",
			visible: ext.visible === true,
			source: extSource
		});
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
			displayDpi: Math.max(Math.floor(DEVICE_PIXEL_RATIO), 1) * 96
		});
		overlaySource.setAttributions(tr("PBMG", locale !== null && locale !== void 0 ? locale : "en"));
		const layer = new ImageLayer({ source: overlaySource });
		layer.set(LayerProperty.LAYER_NAME, layerName);
		layer.set(LayerProperty.LAYER_DISPLAY_NAME, layerName);
		layer.set(LayerProperty.LAYER_TYPE, MG_LAYER_TYPE_NAME);
		layer.set(LayerProperty.IS_EXTERNAL, false);
		layer.set(LayerProperty.IS_GROUP, false);
		return layer;
	}
};
//#endregion
//#region src/containers/measure.tsx
var MeasureContainer = () => {
	var _useAvailableMaps;
	const { Callout, Button, HtmlTable } = useElementContext();
	const activeMapName = useActiveMapName();
	const locale = useViewerLocale();
	const mapNames = (_useAvailableMaps = useAvailableMaps()) === null || _useAvailableMaps === void 0 ? void 0 : _useAvailableMaps.map((m) => m.value);
	const dispatch = useReduxDispatch();
	const setActiveToolAction = (tool) => dispatch(setActiveTool(tool));
	const isArbitrary = useActiveMapIsArbitraryCoordSys();
	const projUnits = useActiveMapProjectionUnits();
	const viewer = useMapProviderContext();
	const measureUnits = isArbitrary ? projUnits : void 0;
	const [measuring, setMeasuring] = import_react.useState(false);
	const [drawType, setDrawType] = import_react.useState("LineString");
	const [activeType, setActiveType] = import_react.useState();
	const [segmentTotal, setSegmentTotal] = import_react.useState();
	const [segments, setSegments] = import_react.useState();
	const measureContexts = import_react.useRef([]);
	const getLocale = import_react.useCallback(() => locale || "en", [locale]);
	const onTypeChanged = (newType) => {
		setDrawType(newType);
	};
	import_react.useEffect(() => {
		if (activeMapName && measuring === true) {
			const activeMeasure = measureContexts.current.filter((m) => m.getMapName() === activeMapName)[0];
			if (activeMeasure) activeMeasure.handleDrawTypeChange(drawType);
		}
	}, [drawType]);
	const onClearMeasurements = import_react.useCallback((e) => {
		e.preventDefault();
		if (activeMapName) {
			const activeMeasure = measureContexts.current.filter((m) => m.getMapName() === activeMapName)[0];
			if (activeMeasure) activeMeasure.clearMeasurements();
		}
		return false;
	}, [activeMapName]);
	const startMeasure = import_react.useCallback(() => {
		if (activeMapName && drawType && !measuring) {
			setActiveToolAction === null || setActiveToolAction === void 0 || setActiveToolAction(ActiveMapTool.None);
			const activeMeasure = measureContexts.current.filter((m) => m.getMapName() === activeMapName)[0];
			if (activeMeasure) {
				activeMeasure.startMeasure(drawType);
				setMeasuring(true);
			}
		}
	}, [
		activeMapName,
		drawType,
		measuring,
		setActiveToolAction
	]);
	const endMeasure = import_react.useCallback(() => {
		if (activeMapName && measuring) {
			const activeMeasure = measureContexts.current.filter((m) => m.getMapName() === activeMapName)[0];
			if (activeMeasure) {
				activeMeasure.endMeasure();
				setMeasuring(false);
			}
		}
	}, [activeMapName, measuring]);
	const onStartMeasure = import_react.useCallback(() => startMeasure(), [startMeasure]);
	const onEndMeasure = import_react.useCallback(() => endMeasure(), [endMeasure]);
	const updateSegments = import_react.useCallback((kind, total, segs) => {
		setActiveType(kind);
		setSegmentTotal(total);
		setSegments(segs);
	}, []);
	const clearSegments = import_react.useCallback(() => setSegments(void 0), []);
	import_react.useEffect(() => {
		let activeMeasure;
		if (measureContexts.current.length === 0) {
			if (viewer.isReady() && mapNames && mapNames.length) for (const mapName of mapNames) {
				const context = new MeasureContext(viewer, mapName, {
					updateSegments,
					clearSegments,
					getCurrentDrawType: () => drawType,
					getLocale
				});
				measureContexts.current.push(context);
				if (activeMapName === mapName) activeMeasure = context;
			}
		} else {
			for (const measure of measureContexts.current) measure.setParent({
				updateSegments,
				clearSegments,
				getCurrentDrawType: () => drawType,
				getLocale
			});
			activeMeasure = measureContexts.current.filter((m) => m.getMapName() === activeMapName)[0];
		}
		if (activeMeasure && activeMapName) activeMeasure.activate(activeMapName, {
			updateSegments,
			clearSegments,
			getCurrentDrawType: () => drawType,
			getLocale
		});
		return () => {
			setMeasuring(false);
			for (const measure of measureContexts.current) measure.detachParent();
			if (activeMapName) for (const measure of measureContexts.current) measure.deactivate(activeMapName);
		};
	}, []);
	import_react.useEffect(() => {
		setMeasuring(false);
	}, [activeMapName]);
	const measurementTypes = [{
		value: "LineString",
		label: tr("MEASUREMENT_TYPE_LENGTH", locale)
	}, {
		value: "Polygon",
		label: tr("MEASUREMENT_TYPE_AREA", locale)
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "component-measure",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "form-inline",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "bp3-label",
					children: [tr("MEASUREMENT_TYPE", locale), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypedSelect, {
						value: drawType,
						onChange: onTypeChanged,
						items: measurementTypes
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ElementGroup, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						icon: "play",
						disabled: measuring,
						onClick: onStartMeasure,
						children: tr("MEASUREMENT_START", locale)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						icon: "stop",
						disabled: !measuring,
						onClick: onEndMeasure,
						children: tr("MEASUREMENT_END", locale)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						icon: "cross",
						onClick: onClearMeasurements,
						children: tr("MEASUREMENT_CLEAR", locale)
					})
				] }),
				measuring === true && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
					variant: "primary",
					title: tr("MEASURING", locale),
					children: tr("MEASURING_MESSAGE", locale)
				}), segments && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HtmlTable, {
					condensed: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: tr("MEASURE_SEGMENT", locale) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: tr("MEASURE_LENGTH", locale) })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [segments.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: tr("MEASURE_SEGMENT_PART", locale, { segment: s.segment }) }), measureUnits ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: `${roundTo(s.length, 2)} ${toProjUnit(measureUnits)}` }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: tr("UNIT_FMT_M", locale, { value: roundTo(s.length, 2) }) })] }, `segment-${s.segment}`)), segmentTotal !== void 0 && activeType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: activeType === "Area" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: tr("MEASURE_TOTAL_AREA", locale) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: measureUnits ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: `${roundTo(segmentTotal, 4)} ${toProjUnit(measureUnits)} <sup>2</sup>` } }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: purify.sanitize(tr("UNIT_FMT_SQM", locale, { value: `${roundTo(segmentTotal, 4)}` })) } }) })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: tr("MEASURE_TOTAL_LENGTH", locale) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: measureUnits ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: `${roundTo(segmentTotal, 4)} ${toProjUnit(measureUnits)}` } }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: purify.sanitize(tr("UNIT_FMT_M", locale, { value: `${roundTo(segmentTotal, 4)}` })) } }) })] }) })] })]
				})] })
			]
		})
	});
};
//#endregion
//#region src/components/base-layer-switcher.tsx
/**
* The BaseLayerSwitcher component provides a user interface for switching the active external
* base layer of the current map
* @param props 
*/
var BaseLayerSwitcher = (props) => {
	const { Radio } = useElementContext();
	const { locale, externalBaseLayers } = props;
	const visLayers = externalBaseLayers.filter((layer) => layer.visible === true);
	const [selected, setSelected] = import_react.useState(visLayers.length == 1 ? visLayers[0].name : "");
	const onBaseLayerChanged = (e) => {
		var _props$onBaseLayerCha;
		const value = e.currentTarget.value;
		setSelected(value);
		(_props$onBaseLayerCha = props.onBaseLayerChanged) === null || _props$onBaseLayerCha === void 0 || _props$onBaseLayerCha.call(props, value);
	};
	import_react.useEffect(() => {
		setSelected(visLayers.length == 1 ? visLayers[0].name : "");
	}, [visLayers]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "base-layer-switcher-item-container",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
			value: "",
			checked: strIsNullOrEmpty(selected),
			onChange: onBaseLayerChanged,
			label: tr("NONE", locale)
		})
	}), externalBaseLayers.filter((ebl) => isVisualBaseLayer(ebl)).map((layer) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "base-layer-switcher-item-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
				value: layer.name,
				checked: layer.name === selected,
				onChange: onBaseLayerChanged,
				label: layer.name
			})
		}, `base-layer-${layer.name}`);
	})] });
};
//#endregion
//#region src/containers/base-layer-switcher.tsx
var BaseLayerSwitcherContainer = () => {
	const mapName = useActiveMapName();
	const locale = useViewerLocale();
	const externalBaseLayers = useActiveMapExternalBaseLayers();
	const dispatch = useReduxDispatch();
	const setBaseLayerAction = (mapName, layerName) => dispatch(setBaseLayer(mapName, layerName));
	const onBaseLayerChanged = (layerName) => {
		if (mapName) setBaseLayerAction === null || setBaseLayerAction === void 0 || setBaseLayerAction(mapName, layerName);
	};
	if (locale && externalBaseLayers) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseLayerSwitcher, {
		onBaseLayerChanged,
		externalBaseLayers,
		locale
	});
	else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("noscript", {});
};
//#endregion
//#region src/components/map-menu.tsx
/**
* The MapMenu component provides the ability to switch between active maps
* @param props 
*/
var MapMenu = (props) => {
	const { Radio } = useElementContext();
	const [selected, setSelected] = import_react.useState(void 0);
	const onActiveMapChanged = (e) => {
		var _props$onActiveMapCha;
		const value = e.currentTarget.value;
		setSelected(value);
		(_props$onActiveMapCha = props.onActiveMapChanged) === null || _props$onActiveMapCha === void 0 || _props$onActiveMapCha.call(props, value);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: props.maps.map((layer) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "map-menu-item-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
				value: layer.mapName,
				checked: layer.mapName === props.selectedMap,
				onChange: onActiveMapChanged,
				label: layer.label
			})
		}, `base-layer-${layer.mapName}`);
	}) });
};
//#endregion
//#region src/containers/map-menu.tsx
var MapMenuContainer = () => {
	const dispatch = useReduxDispatch();
	const locale = useViewerLocale();
	const activeMapName = useActiveMapName();
	const availableMaps = useAvailableMaps();
	const onActiveMapChanged = (mapName) => dispatch(activateMap(mapName));
	if (locale && activeMapName && availableMaps) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapMenu, {
		onActiveMapChanged,
		selectedMap: activeMapName,
		maps: availableMaps.map((m) => {
			return {
				label: m.name,
				mapName: m.value
			};
		}),
		locale
	});
	else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("noscript", {});
};
//#endregion
//#region src/containers/coordinate-tracker.tsx
var CoordinateTrackerContainer = (props) => {
	const { Callout, Card, Heading } = useElementContext();
	const { projections } = props;
	const aProjections = Array.isArray(projections) ? projections : [projections];
	const locale = useViewerLocale();
	const mouse = useCurrentMouseCoordinates();
	const proj = useActiveMapProjection();
	if (aProjections && aProjections.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { margin: 8 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
			level: 3,
			children: tr("COORDTRACKER", locale)
		}), aProjections.map((p) => {
			let x = NaN;
			let y = NaN;
			if (mouse && proj) try {
				[x, y] = transform(mouse, proj, p);
			} catch (e) {}
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				style: { marginBottom: 10 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
						level: 5,
						children: p
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: tr("COORDTRACKER_X", locale) }),
						" ",
						x
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: tr("COORDTRACKER_Y", locale) }),
						" ",
						y
					] })
				]
			}, p);
		})]
	});
	else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
		variant: "danger",
		title: tr("ERROR", locale),
		icon: "error",
		children: tr("COORDTRACKER_NO_PROJECTIONS", locale)
	});
};
//#endregion
//#region src/components/color-picker.tsx
/**
* A basic color picker component
* 
* @since 0.13
*/
var ColorPicker = (props) => {
	var _props$value, _props$value2, _props$value3;
	const { Collapsible, Button, Card } = useElementContext();
	const [isPickerOpen, setIsPickerOpen] = import_react.useState(false);
	const onPickerToggle = () => {
		setIsPickerOpen(!isPickerOpen);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			disabled: props.disabled,
			style: {
				width: 80,
				borderRadius: 3,
				backgroundColor: (_props$value = props.value) !== null && _props$value !== void 0 ? _props$value : DEFAULT_COLOR
			},
			onClick: onPickerToggle,
			children: [
				"\xA0",
				"\xA0",
				"\xA0"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "text",
			"aria-label": tr("COLOR_PICKER_INPUT_LABEL", props.locale),
			value: (_props$value2 = props.value) !== null && _props$value2 !== void 0 ? _props$value2 : "#" + DEFAULT_COLOR,
			onChange: (e) => props.onChange(e.target.value.replace(/^#/, "")),
			style: {
				width: 0,
				height: 0,
				opacity: 0
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapsible, {
			isOpen: isPickerOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Z, {
				style: { width: "100%" },
				color: (_props$value3 = props.value) !== null && _props$value3 !== void 0 ? _props$value3 : DEFAULT_COLOR,
				onChange: (c) => props.onChange(c)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				icon: "chevron-up",
				variant: "primary",
				onClick: () => setIsPickerOpen(false),
				children: tr("ACTION_CLOSE", props.locale)
			})] })
		})
	] });
};
//#endregion
//#region src/components/layer-manager/common.tsx
function rgbToYIQ({ r, g, b }) {
	return (r * 299 + g * 587 + b * 114) / 1e3;
}
function hexToRgb(hex) {
	if (!hex || hex === void 0 || hex === "") return;
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : void 0;
}
function contrast(colorHex, threshold = 128) {
	if (colorHex === void 0) return "#000";
	const rgb = hexToRgb(colorHex);
	if (rgb === void 0) return "#000";
	return rgbToYIQ(rgb) >= threshold ? "#000" : "#fff";
}
function stringifyExpr(expr, locale) {
	if (!expr) return tr("EXPR_NOT_SET", locale);
	if (isEvaluatable(expr)) return tr("EXPR_EDITOR_EXPR_PREFIX", locale) + JSON.stringify(expr.expr);
	return `${expr !== null && expr !== void 0 ? expr : ""}`;
}
function stringifyExprIf(expr, mode) {
	switch (mode) {
		case "edit-expr": return isEvaluatable(expr) ? JSON.stringify(expr.expr) : "";
		case "edit-value": return isEvaluatable(expr) ? "" : `${expr !== null && expr !== void 0 ? expr : ""}`;
	}
}
function useExprEditor(props) {
	const { value, onChange } = props;
	const [editMode, setEditMode] = import_react.useState(isEvaluatable(value) ? "edit-expr" : "edit-value");
	const [localValue, setLocalValue] = import_react.useState(value);
	const [isEditing, setIsEditing] = import_react.useState(false);
	const [isEditValid, setIsEditValid] = import_react.useState(false);
	import_react.useEffect(() => {
		setLocalValue(value);
	}, [value]);
	const onCancelEditing = import_react.useCallback(() => {
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
	const { isEditValid, isEditing, localValue, setIsEditing, editMode, setEditMode, onApplyValue, onCancelEditing, onUpdateLocalValue } = useExprEditor(props);
	const [exprText, setExprText] = import_react.useState(() => stringifyExprIf(localValue, "edit-expr"));
	import_react.useEffect(() => {
		setExprText(stringifyExprIf(localValue, "edit-expr"));
	}, [localValue, editMode]);
	const onEditClick = () => {
		if (isEditing) onCancelEditing();
		else setIsEditing(true);
	};
	const editButton = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		icon: "edit",
		minimal: true,
		variant: "primary",
		style: {
			color: "white",
			backgroundColor: "#137cbd"
		},
		onClick: (e) => onEditClick()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup, {
		style: roStyle,
		readOnly: true,
		value: stringifyExpr(props.value, locale),
		rightElement: editButton
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapsible, {
		isOpen: isEditing,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				level: 5,
				children: tr("EXPR_EDITOR_EDIT_VALUE", locale)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
				name: "edit-mode",
				label: tr("EXPR_EDITOR_VALUE", locale),
				value: "edit-value",
				checked: editMode == "edit-value",
				onChange: (e) => setEditMode(e.target.value)
			}),
			renderValueEditor(localValue, onUpdateLocalValue, locale, editMode != "edit-value"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
				name: "edit-mode",
				label: tr("EXPR_EDITOR_EXPRESSION", locale),
				value: "edit-expr",
				checked: editMode == "edit-expr",
				onChange: (e) => setEditMode(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup, {
				disabled: editMode != "edit-expr",
				placeholder: "e.g. [\"get\",\"propertyName\"]",
				value: exprText,
				onChange: (e) => {
					setExprText(e.target.value);
					try {
						const parsed = JSON.parse(e.target.value);
						if (Array.isArray(parsed)) onUpdateLocalValue({ expr: parsed });
					} catch (_unused) {}
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ElementGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !isEditValid,
				variant: "success",
				onClick: (e) => onApplyValue(),
				children: tr("APPLY", locale)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "danger",
				onClick: (e) => onCancelEditing(),
				children: tr("CANCEL", locale)
			})] })
		] })
	})] });
}
var NumberExprEditor = (props) => {
	const { NumericInput } = useElementContext();
	const { min, max } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExprEditorInner, {
		locale: props.locale,
		value: props.value,
		onChange: props.onChange,
		renderValueEditor: (v, oc, loc, disabled) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericInput, {
			disabled,
			min,
			max,
			value: parseInt(stringifyExprIf(v, "edit-value"), 10),
			onChange: (e) => oc(e)
		})
	});
};
var SliderExprEditor = (props) => {
	const { Slider } = useElementContext();
	const { min, max, labelStepSize } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExprEditorInner, {
		locale: props.locale,
		value: props.value,
		onChange: props.onChange,
		renderValueEditor: (v, oc, loc, disabled) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
			disabled,
			min,
			max,
			labelStepSize,
			value: parseInt(stringifyExprIf(v, "edit-value"), 10),
			onChange: (e) => oc(e)
		})
	});
};
var StringExprEditor = (props) => {
	const { InputGroup } = useElementContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExprEditorInner, {
		locale: props.locale,
		value: props.value,
		onChange: props.onChange,
		renderValueEditor: (v, oc, loc, disabled) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup, {
			disabled,
			value: stringifyExprIf(v, "edit-value"),
			onChange: (e) => oc(e.target.value)
		})
	});
};
var ColorExprEditor = (props) => {
	const { value } = props;
	let roStyle;
	if (!isEvaluatable(value) && !strIsNullOrEmpty(value)) roStyle = {
		backgroundColor: value,
		color: contrast(value)
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExprEditorInner, {
		roStyle,
		locale: props.locale,
		value,
		onChange: props.onChange,
		renderValueEditor: (v, oc, loc, disabled) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorPicker, {
			locale: loc,
			value: stringifyExprIf(v, "edit-value"),
			onChange: (e) => oc(e)
		})
	});
};
//#endregion
//#region src/components/layer-manager/legend.ts
var DEFAULT_SIZE = [16, 16];
/** 
* Get a symbol image for a given legend item
* @param {LegendItemOptions} item 
* @param {HTMLCanvasElement|undefined} canvas a canvas to draw in, if none create one
* @param {number|undefined} row row number to draw in canvas, default 0
* @since 0.14
*/
function getLegendImage(item, canvas = void 0, row = 0) {
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
			var _feature$getGeometry;
			style = feature.getStyle();
			if (typeof style === "function") style = style(feature);
			if (!style) style = typeof item.style === "function" ? item.style(feature) : item.style || [];
			typeGeom = (_feature$getGeometry = feature.getGeometry()) === null || _feature$getGeometry === void 0 ? void 0 : _feature$getGeometry.getType();
		} else style = [];
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
			for (let i = 0; s = styles[i]; i++) {
				const img = s.getImage();
				if (img) {
					const imgElt = img.getImage(devicePixelRatio);
					if (imgElt && imgElt.complete && !imgElt.naturalWidth) {
						if (typeof item.onload === "function") imgElt.addEventListener("load", function() {
							setTimeout(function() {
								var _item$onload;
								(_item$onload = item.onload) === null || _item$onload === void 0 || _item$onload.call(item);
							}, 100);
						});
						img.load();
					}
					if (img.getAnchor) {
						const anchor = img.getAnchor();
						if (anchor) {
							const si = img.getSize();
							const dx = anchor[0] - si[0];
							const dy = anchor[1] - si[1];
							if (!extent) extent = [
								dx,
								dy,
								dx + si[0],
								dy + si[1]
							];
							else extend$1(extent, [
								dx,
								dy,
								dx + si[0],
								dy + si[1]
							]);
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
					vectorContext.drawGeometry(new Polygon([[
						[cx - sx, cy - sy],
						[cx + sx, cy - sy],
						[cx + sx, cy + sy],
						[cx - sx, cy + sy],
						[cx - sx, cy - sy]
					]]));
					break;
			}
		}
		ctx.restore();
	}
	return canvas;
}
//#endregion
//#region src/components/vector-style-editor.tsx
init_objectSpread2();
init_objectWithoutProperties();
var _excluded$3 = ["expr", "onExprChanged"], _excluded2 = ["placement"], _excluded3 = ["label"];
function assertValue(val) {
	if (isEvaluatable(val)) throw new Error("Value is expression instead of a raw value");
}
function ExprEditor(props) {
	assertValue(props.expr);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [tr("EXPR_EDITOR_EXPR_PREFIX", props.locale), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		value: `${props.expr}`,
		onChange: (e) => props.onExprChanged(props.converter(e.target.value))
	})] });
}
var DynamicSwitch = (props) => {
	const { Switch } = useElementContext();
	if (isEvaluatable(props.expr)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExprEditor, _objectSpread2(_objectSpread2({}, props), {}, { converter: (v) => (v === null || v === void 0 ? void 0 : v.toLowerCase()) == "true" }));
	else {
		const { expr, onExprChanged } = props;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, _objectSpread2({}, _objectSpread2(_objectSpread2({}, _objectWithoutProperties(props, _excluded$3)), {}, {
			checked: props.expr,
			onChange: (e) => props.onExprChanged(e.target.checked)
		})));
	}
};
var buildFont = (size, bold, italic, font = "sans-serif") => `${bold ? "bold" : ""} ${italic ? "italic" : ""} ${size}px ${font}`;
function coalesceExpr(expr, defaultVal) {
	if (isEvaluatable(expr)) return defaultVal;
	return expr !== null && expr !== void 0 ? expr : defaultVal;
}
var DEFAULT_FONT_SIZE = 14;
var LabelStyleEditor = (props) => {
	var _style$label$fill$col, _style$label, _style$label$fill$alp, _style$label2, _style$label$stroke$c, _style$label3, _style$label$stroke$w, _style$label4;
	const { Button, Switch, FormGroup } = useElementContext();
	const { style, locale, onChange, isLine } = props;
	const [bold, setBold] = import_react.useState(false);
	const [italic, setItalic] = import_react.useState(false);
	const [localBgColor, setLocalBgColor] = import_react.useState((_style$label$fill$col = (_style$label = style.label) === null || _style$label === void 0 || (_style$label = _style$label.fill) === null || _style$label === void 0 ? void 0 : _style$label.color) !== null && _style$label$fill$col !== void 0 ? _style$label$fill$col : "#000000");
	const [localBgColorAlpha, setLocalColorAlpha] = import_react.useState((_style$label$fill$alp = (_style$label2 = style.label) === null || _style$label2 === void 0 || (_style$label2 = _style$label2.fill) === null || _style$label2 === void 0 ? void 0 : _style$label2.alpha) !== null && _style$label$fill$alp !== void 0 ? _style$label$fill$alp : 255);
	const [localStrokeColor, setLocalStrokeColor] = import_react.useState((_style$label$stroke$c = (_style$label3 = style.label) === null || _style$label3 === void 0 || (_style$label3 = _style$label3.stroke) === null || _style$label3 === void 0 ? void 0 : _style$label3.color) !== null && _style$label$stroke$c !== void 0 ? _style$label$stroke$c : "#ffffff");
	const [localStrokeWidth, setLocalStrokeWidth] = import_react.useState((_style$label$stroke$w = (_style$label4 = style.label) === null || _style$label4 === void 0 || (_style$label4 = _style$label4.stroke) === null || _style$label4 === void 0 ? void 0 : _style$label4.width) !== null && _style$label$stroke$w !== void 0 ? _style$label$stroke$w : 1);
	const [localFontSize, setLocalFontSize] = import_react.useState(DEFAULT_FONT_SIZE);
	const [localLabel, setLocalLabel] = import_react.useState(_objectSpread2({ font: buildFont(localFontSize, bold, italic) }, style.label));
	const [hasLabel, setHasLabel] = import_react.useState(style.label != null);
	const onToggleLinePlacement = import_react.useCallback(() => {
		if (localLabel.placement == "line") {
			const { placement } = localLabel;
			setLocalLabel(_objectWithoutProperties(localLabel, _excluded2));
		} else setLocalLabel(_objectSpread2(_objectSpread2({}, localLabel), {}, { placement: "line" }));
	}, [localLabel]);
	import_react.useEffect(() => {
		if (hasLabel) onChange(_objectSpread2(_objectSpread2({}, style), {}, { label: localLabel }));
		else {
			const { label } = style;
			onChange(_objectWithoutProperties(style, _excluded3));
		}
	}, [localLabel, hasLabel]);
	import_react.useEffect(() => {
		setLocalLabel(_objectSpread2(_objectSpread2({}, localLabel), {}, { font: buildFont(localFontSize, bold, italic) }));
	}, [
		localFontSize,
		bold,
		italic
	]);
	import_react.useEffect(() => {
		setLocalLabel(_objectSpread2(_objectSpread2({}, localLabel), {}, {
			fill: _objectSpread2(_objectSpread2({}, localLabel.fill), {}, {
				color: localBgColor,
				alpha: localBgColorAlpha
			}),
			stroke: _objectSpread2(_objectSpread2({}, localLabel.stroke), {}, {
				color: localStrokeColor,
				width: localStrokeWidth
			})
		}));
	}, [
		localStrokeColor,
		localStrokeWidth,
		localBgColorAlpha,
		localBgColor
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked: hasLabel,
			onChange: (e) => setHasLabel(e.target.checked),
			label: tr("ENABLE_LABELS", locale)
		}),
		hasLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("LABEL_TEXT", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StringExprEditor, {
				locale,
				value: localLabel.text,
				onChange: (t) => setLocalLabel(_objectSpread2(_objectSpread2({}, localLabel), {}, { text: t }))
			})
		}),
		hasLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("LABEL_SIZE", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberExprEditor, {
				locale,
				value: localFontSize,
				onChange: (t) => setLocalFontSize(coalesceExpr(t, DEFAULT_FONT_SIZE))
			})
		}),
		hasLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ElementGroup, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "primary",
				active: bold,
				onClick: (e) => setBold(!bold),
				children: tr("LABEL_BOLD", locale)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "primary",
				active: italic,
				onClick: (e) => setItalic(!italic),
				children: tr("LABEL_ITALIC", locale)
			}),
			isLine && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "primary",
				active: localLabel.placement == "line",
				onClick: (e) => onToggleLinePlacement(),
				children: tr("LABEL_LINE_PLACEMENT", locale)
			})
		] }),
		hasLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("LABEL_COLOR", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorExprEditor, {
				locale,
				value: localBgColor,
				onChange: (c) => setLocalBgColor(c)
			})
		}),
		hasLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("LABEL_OUTLINE_COLOR", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorExprEditor, {
				locale,
				value: localStrokeColor,
				onChange: (c) => setLocalStrokeColor(c)
			})
		}),
		hasLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("LABEL_OUTLINE_THICKNESS", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberExprEditor, {
				locale,
				value: localStrokeWidth,
				onChange: (t) => setLocalStrokeWidth(t)
			})
		})
	] });
};
var PointIconStyleEditor = ({ style, onChange, locale }) => {
	const { NumericInput, FormGroup } = useElementContext();
	const [localSrc, setLocalSrc] = import_react.useState(style.src);
	import_react.useEffect(() => {
		setLocalSrc(style.src);
	}, [style.src]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormGroup, {
			label: tr("VSED_PT_ICON_SRC", locale),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StringExprEditor, {
				value: localSrc,
				onChange: (e) => setLocalSrc(e),
				locale
			}), !isEvaluatable(style.src) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: style.src })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormGroup, {
			label: tr("VSED_PT_ICON_ANCHOR", locale),
			children: [
				tr("VSED_PT_ICON_ANCHOR_H", locale),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericInput, {
					value: style.anchor[0],
					min: 0,
					onChange: (e) => onChange(_objectSpread2(_objectSpread2({}, style), {}, { anchor: [e, style.anchor[1]] }))
				}),
				tr("VSED_PT_ICON_ANCHOR_V", locale),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericInput, {
					value: style.anchor[1],
					min: 0,
					onChange: (e) => onChange(_objectSpread2(_objectSpread2({}, style), {}, { anchor: [style.anchor[0], e] }))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DynamicSwitch, {
			label: tr("VSED_PT_ICON_ROTATE_WITH_VIEW", locale),
			expr: style.rotateWithView,
			onExprChanged: (e) => onChange(_objectSpread2(_objectSpread2({}, style), {}, { rotateWithView: e })),
			locale
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("VSED_PT_ICON_ROTATION", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderExprEditor, {
				locale,
				min: 0,
				max: 360,
				labelStepSize: 360,
				value: style.rotation,
				onChange: (n) => onChange(_objectSpread2(_objectSpread2({}, style), {}, { rotation: n }))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("VSED_PT_ICON_SCALE", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberExprEditor, {
				value: style.scale,
				onChange: (n) => onChange(_objectSpread2(_objectSpread2({}, style), {}, { scale: n })),
				locale
			})
		})
	] });
};
var PointCircleStyleEditor = ({ style, onChange, locale }) => {
	const { FormGroup } = useElementContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("VSED_PT_FILL_COLOR", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorExprEditor, {
				locale,
				value: style.fill.color,
				onChange: (c) => onChange(_objectSpread2(_objectSpread2({}, style), {}, { fill: {
					color: c,
					alpha: style.fill.alpha
				} }))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("VSED_PT_FILL_COLOR_ALPHA", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderExprEditor, {
				locale,
				min: 0,
				max: 255,
				labelStepSize: 255,
				value: style.fill.alpha,
				onChange: (n) => onChange(_objectSpread2(_objectSpread2({}, style), {}, { fill: {
					color: style.fill.color,
					alpha: n
				} }))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("VSED_PT_RADIUS", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberExprEditor, {
				locale,
				value: style.radius,
				min: 1,
				onChange: (n) => onChange(_objectSpread2(_objectSpread2({}, style), {}, { radius: n }))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("VSED_PT_OUTLINE_COLOR", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorExprEditor, {
				locale,
				value: style.stroke.color,
				onChange: (c) => onChange(_objectSpread2(_objectSpread2({}, style), {}, { stroke: {
					color: c,
					width: style.stroke.width,
					alpha: style.stroke.alpha
				} }))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("VSED_PT_OUTLINE_COLOR_ALPHA", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderExprEditor, {
				locale,
				min: 0,
				max: 255,
				labelStepSize: 255,
				value: style.stroke.alpha,
				onChange: (n) => onChange(_objectSpread2(_objectSpread2({}, style), {}, { stroke: {
					color: style.stroke.color,
					width: style.stroke.width,
					alpha: n
				} }))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("VSED_PT_OUTLINE_WIDTH", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberExprEditor, {
				locale,
				value: style.stroke.width,
				min: 1,
				onChange: (n) => onChange(_objectSpread2(_objectSpread2({}, style), {}, { stroke: {
					color: style.stroke.color,
					width: n,
					alpha: style.stroke.alpha
				} }))
			})
		})
	] });
};
var PointStyleEditor = ({ style, onChange, locale }) => {
	const { Radio } = useElementContext();
	const [iconStyle, setIconStyle] = import_react.useState(void 0);
	const [circleStyle, setCircleStyle] = import_react.useState(void 0);
	const [currentStyle, setCurrentStyle] = import_react.useState(style);
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
					const s = _objectSpread2({}, DEFAULT_POINT_CIRCLE_STYLE);
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
					const s = _objectSpread2({}, DEFAULT_POINT_ICON_STYLE);
					setIconStyle(s);
					setCurrentStyle(s);
					onChange(s);
				}
				break;
		}
	};
	import_react.useEffect(() => {
		applyCurrentStyle(style);
	}, [style]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tr("VSED_PT_TYPE", locale) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
			label: tr("VSED_PT_TYPE_CIRCLE", locale),
			value: "Circle",
			checked: currentStyle.type === "Circle",
			onChange: (e) => onStyleTypeChange(e.target.value)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
			label: tr("VSED_PT_TYPE_ICON", locale),
			value: "Icon",
			checked: currentStyle.type === "Icon",
			onChange: (e) => onStyleTypeChange(e.target.value)
		}),
		currentStyle.type == "Icon" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PointIconStyleEditor, {
			style: currentStyle,
			onChange,
			locale
		}),
		currentStyle.type == "Circle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PointCircleStyleEditor, {
			style: currentStyle,
			onChange,
			locale
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelStyleEditor, {
			style: currentStyle,
			locale,
			onChange
		})
	] });
};
var LineStyleEditor = ({ style, onChange, locale }) => {
	const { FormGroup } = useElementContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("VSED_LN_OUTLINE_COLOR", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorExprEditor, {
				locale,
				value: style.color,
				onChange: (c) => onChange(_objectSpread2(_objectSpread2({}, style), {}, {
					color: c,
					width: style.width,
					alpha: style.alpha
				}))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("VSED_LN_OUTLINE_COLOR_ALPHA", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderExprEditor, {
				locale,
				min: 0,
				max: 255,
				labelStepSize: 255,
				value: style.alpha,
				onChange: (n) => onChange(_objectSpread2(_objectSpread2({}, style), {}, {
					color: style.color,
					width: style.width,
					alpha: n
				}))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("VSED_LN_OUTLINE_THICKNESS", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberExprEditor, {
				locale,
				min: 1,
				value: style.width,
				onChange: (n) => onChange(_objectSpread2(_objectSpread2({}, style), {}, {
					color: style.color,
					width: n,
					alpha: style.alpha
				}))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelStyleEditor, {
			style,
			locale,
			onChange,
			isLine: true
		})
	] });
};
var PolygonStyleEditor = ({ style, onChange, locale }) => {
	const { FormGroup } = useElementContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("VSED_PL_FILL_COLOR", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorExprEditor, {
				locale,
				value: style.fill.color,
				onChange: (c) => onChange(_objectSpread2(_objectSpread2({}, style), {}, { fill: {
					color: c,
					alpha: style.fill.alpha
				} }))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("VSED_PL_FILL_COLOR_ALPHA", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderExprEditor, {
				locale,
				min: 0,
				max: 255,
				labelStepSize: 255,
				value: style.fill.alpha,
				onChange: (n) => onChange(_objectSpread2(_objectSpread2({}, style), {}, { fill: {
					color: style.fill.color,
					alpha: n
				} }))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("VSED_PL_OUTLINE_COLOR", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorExprEditor, {
				locale,
				value: style.stroke.color,
				onChange: (c) => onChange(_objectSpread2(_objectSpread2({}, style), {}, { stroke: {
					color: c,
					width: style.stroke.width,
					alpha: style.stroke.alpha
				} }))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("VSED_PL_OUTLINE_COLOR_ALPHA", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderExprEditor, {
				locale,
				min: 0,
				max: 255,
				labelStepSize: 255,
				value: style.stroke.alpha,
				onChange: (n) => onChange(_objectSpread2(_objectSpread2({}, style), {}, { stroke: {
					color: style.stroke.color,
					width: style.stroke.width,
					alpha: n
				} }))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("VSED_PL_OUTLINE_THICKNESS", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberExprEditor, {
				locale,
				value: style.stroke.width,
				min: 1,
				onChange: (n) => onChange(_objectSpread2(_objectSpread2({}, style), {}, { stroke: {
					color: style.stroke.color,
					width: n,
					alpha: style.stroke.alpha
				} }))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelStyleEditor, {
			style,
			locale,
			onChange
		})
	] });
};
/**
* A vector style editor component
* 
* @since 0.13
*/
var VectorStyleEditor = (props) => {
	var _style$point, _style$line, _style$polygon;
	const { NonIdealState, TabSet } = useElementContext();
	const { locale, style, onChange, enableLine, enablePoint, enablePolygon } = props;
	const [selectedTab, setSelectedTab] = import_react.useState(void 0);
	const [pointStyle, setPointStyle] = import_react.useState((_style$point = style === null || style === void 0 ? void 0 : style.point) !== null && _style$point !== void 0 ? _style$point : DEFAULT_POINT_CIRCLE_STYLE);
	const [lineStyle, setLineStyle] = import_react.useState((_style$line = style === null || style === void 0 ? void 0 : style.line) !== null && _style$line !== void 0 ? _style$line : DEFAULT_LINE_STYLE);
	const [polyStyle, setPolyStyle] = import_react.useState((_style$polygon = style === null || style === void 0 ? void 0 : style.polygon) !== null && _style$polygon !== void 0 ? _style$polygon : DEFAULT_POLY_STYLE);
	import_react.useEffect(() => {
		var _style$point2, _style$line2, _style$polygon2;
		setPointStyle((_style$point2 = style === null || style === void 0 ? void 0 : style.point) !== null && _style$point2 !== void 0 ? _style$point2 : DEFAULT_POINT_CIRCLE_STYLE);
		setLineStyle((_style$line2 = style === null || style === void 0 ? void 0 : style.line) !== null && _style$line2 !== void 0 ? _style$line2 : DEFAULT_LINE_STYLE);
		setPolyStyle((_style$polygon2 = style === null || style === void 0 ? void 0 : style.polygon) !== null && _style$polygon2 !== void 0 ? _style$polygon2 : DEFAULT_POLY_STYLE);
	}, [style]);
	const onStyleChanged = (point, line, poly) => {
		const newStyle = { label: style === null || style === void 0 ? void 0 : style.label };
		if (enablePoint) newStyle.point = point;
		if (enableLine) newStyle.line = line;
		if (enablePolygon) newStyle.polygon = poly;
		onChange === null || onChange === void 0 || onChange(newStyle);
		if (newStyle.point) setPointStyle(newStyle.point);
		if (newStyle.line) setLineStyle(newStyle.line);
		if (newStyle.polygon) setPolyStyle(newStyle.polygon);
	};
	if (!enableLine && !enablePoint && !enablePolygon) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NonIdealState, {
		icon: "warning-sign",
		title: tr("VSED_NO_STYLES_TITLE", locale),
		description: tr("VSED_NO_STYLES_DESC", locale)
	});
	else {
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
		if (enablePoint) tabProps.tabs.push({
			id: "pointStyle",
			title: tr("VSED_TAB_POINT", locale),
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PointStyleEditor, {
				style: pointStyle,
				locale,
				onChange: onPointStyleChanged
			})
		});
		if (enableLine) tabProps.tabs.push({
			id: "lineStyle",
			title: tr("VSED_TAB_LINE", locale),
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineStyleEditor, {
				style: lineStyle,
				locale,
				onChange: onLineStyleChanged
			})
		});
		if (enablePolygon) tabProps.tabs.push({
			id: "polyStyle",
			title: tr("VSED_TAB_POLY", locale),
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolygonStyleEditor, {
				style: polyStyle,
				locale,
				onChange: onPolygonStyleChanged
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabSet, _objectSpread2({}, tabProps));
	}
};
/**
* Attempts to validate and parse a JSON string as an OL encoded expression array.
*/
function parseOLFilterExpr(json) {
	try {
		const parsed = JSON.parse(json);
		if (Array.isArray(parsed) && parsed.length >= 1 && typeof parsed[0] === "string") return {
			valid: true,
			expr: parsed
		};
		return { valid: false };
	} catch (_unused) {
		return { valid: false };
	}
}
var FilterItem = (props) => {
	const { Button } = useElementContext();
	const { filter, isDefault, isStyleEditorOpen, featureStyle, onChange } = props;
	const [localFilterJson, setLocalFilterJson] = import_react.useState(() => filter ? JSON.stringify(filter) : "");
	const [isLocalFilterValid, setIsLocalFilterValid] = import_react.useState(true);
	const [pointStyleUrl, setPointStyleUrl] = import_react.useState(void 0);
	const [lineStyleUrl, setLineStyleUrl] = import_react.useState(void 0);
	const [polyStyleUrl, setPolyStyleUrl] = import_react.useState(void 0);
	const filterKey = filter ? JSON.stringify(filter) : "";
	import_react.useEffect(() => {
		setLocalFilterJson(filterKey);
	}, [filterKey]);
	import_react.useEffect(() => {
		if (isDefault) {
			setIsLocalFilterValid(true);
			return;
		}
		const { valid } = parseOLFilterExpr(localFilterJson);
		setIsLocalFilterValid(valid);
	}, [localFilterJson, isDefault]);
	import_react.useEffect(() => {
		var _featureStyle$point;
		let fs = featureStyle;
		if ((featureStyle === null || featureStyle === void 0 || (_featureStyle$point = featureStyle.point) === null || _featureStyle$point === void 0 ? void 0 : _featureStyle$point.type) == "Circle" && isEvaluatable(featureStyle.point.radius)) {
			var _fs$point;
			fs = JSON.parse(JSON.stringify(featureStyle));
			if (((_fs$point = fs.point) === null || _fs$point === void 0 ? void 0 : _fs$point.type) == "Circle") fs.point.radius = 5;
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
	if (!props.enableLine) colSpan--;
	if (!props.enablePoint) colSpan--;
	if (!props.enablePolygon) colSpan--;
	const filterExprEd = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: featureStyle.label });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
		props.enablePoint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: pointStyleUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: pointStyleUrl }) }),
		props.enableLine && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: lineStyleUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: lineStyleUrl }) }),
		props.enablePolygon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: polyStyleUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: polyStyleUrl }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: isDefault ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: tr("VSED_DEFAULT_STYLE", props.locale) }) : filterExprEd }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: isStyleEditorOpen ? "danger" : "primary",
			onClick: onToggle,
			icon: isStyleEditorOpen ? "cross" : "edit"
		}) })
	] }), isStyleEditorOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		colSpan,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VectorStyleEditor, {
			style: featureStyle,
			onChange: onInnerStyleChanged,
			enableLine: props.enableLine,
			enablePoint: props.enablePoint,
			enablePolygon: props.enablePolygon,
			locale: props.locale
		})
	}) })] });
};
var VectorLayerStyleEditor = (props) => {
	var _props$style$rules;
	const rules = (_props$style$rules = props.style.rules) !== null && _props$style$rules !== void 0 ? _props$style$rules : [];
	const [openStyleEditors, setOpenStyleEditors] = import_react.useState({});
	const onRuleStyleChanged = (index, style) => {
		var _props$style$rules2, _props$onChange;
		const updatedRules = [...(_props$style$rules2 = props.style.rules) !== null && _props$style$rules2 !== void 0 ? _props$style$rules2 : []];
		updatedRules[index] = _objectSpread2(_objectSpread2({}, updatedRules[index]), {}, { style });
		(_props$onChange = props.onChange) === null || _props$onChange === void 0 || _props$onChange.call(props, _objectSpread2(_objectSpread2({}, props.style), {}, { rules: updatedRules }));
	};
	const onDefaultStyleChanged = (style) => {
		var _props$onChange2;
		(_props$onChange2 = props.onChange) === null || _props$onChange2 === void 0 || _props$onChange2.call(props, _objectSpread2(_objectSpread2({}, props.style), {}, { default: style }));
	};
	const onToggleStyleEditor = (key, visible) => {
		const opEds = _objectSpread2({}, openStyleEditors);
		if (!visible) delete opEds[key];
		else opEds[key] = true;
		setOpenStyleEditors(opEds);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
		style: { width: "100%" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("colgroup", { children: [
			props.enablePoint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", {
				span: 1,
				style: { width: 24 }
			}),
			props.enableLine && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", {
				span: 1,
				style: { width: 24 }
			}),
			props.enablePolygon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", {
				span: 1,
				style: { width: 24 }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { span: 1 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", {
				span: 1,
				style: { width: 32 }
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rules.map((rule, i) => {
			const key = `rule-${i}`;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterItem, {
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
			}, key);
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterItem, {
			isDefault: true,
			onChange: (s) => onDefaultStyleChanged(s),
			featureStyle: props.style.default,
			isStyleEditorOpen: openStyleEditors[DEFAULT_STYLE_KEY] === true,
			onToggleStyleEditor: (isVisible) => onToggleStyleEditor(DEFAULT_STYLE_KEY, isVisible),
			locale: props.locale,
			enableLine: props.enableLine,
			enablePoint: props.enablePoint,
			enablePolygon: props.enablePolygon
		})] })]
	});
};
//#endregion
//#region src/components/layer-manager/manage-layers.tsx
function isBoundsZoomable(layer) {
	var _layer$metadata;
	if (((_layer$metadata = layer.metadata) === null || _layer$metadata === void 0 ? void 0 : _layer$metadata.geojson_as_vt) === true) return false;
	return layer.type != "WMS";
}
var HEATMAP_SLIDER_RAMP = [
	0,
	10,
	20,
	30,
	40,
	50
];
var LAYER_SWITCH_STYLE = {
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis"
};
var ManageLayerItem = (props) => {
	var _layer$displayName, _layer$cluster$style, _layer$cluster, _layer$cluster2, _theVectorStyle$rules, _theVectorStyle$rules2;
	const { Card, Button, Collapsible, Slider, Icon, Spinner, Switch, FormGroup, Heading } = useElementContext();
	const { layer, locale, canMoveUp, canMoveDown, currentResolution, onSetOpacity, onSetHeatmapBlur, onSetHeatmapRadius, onRemoveLayer, onMoveLayerUp, onMoveLayerDown, onZoomToBounds, onSetVisibility, onVectorStyleChanged } = props;
	const [wmsLegendUrl, setWmsLegendUrl] = import_react.useState(void 0);
	const [openPanel, setOpenPanel] = import_react.useState(0);
	const onToggleWmsLegend = (action) => {
		if (wmsLegendUrl) {
			setWmsLegendUrl(void 0);
			setOpenPanel(0);
		} else {
			setWmsLegendUrl(action(currentResolution));
			setOpenPanel(3);
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
	if (layer.busyWorkerCount > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { sizePreset: "small" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		style: {
			textAlign: "center",
			marginTop: 5
		},
		children: tr("LOADING_LAYER", locale, { name: layer.name })
	})] });
	const canZoom = isBoundsZoomable(layer);
	let iconName = "layer";
	if (layer.type == "WMS") iconName = "media";
	const extraActions = [];
	const { extensions } = layer;
	let isWms = false;
	if (extensions) switch (extensions.type) {
		case "WMS":
			isWms = true;
			if (extensions.getLegendUrl) extraActions.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "success",
				icon: "info-sign",
				onClick: () => onToggleWmsLegend(extensions.getLegendUrl)
			}, "toggle-wms-legend"));
	}
	if (layer.vectorStyle) {
		if (layer.type != "KML" && layer.heatmap == null) extraActions.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			title: tr("LAYER_MANAGER_TT_EDIT_STYLE", locale),
			variant: "primary",
			icon: "edit",
			onClick: () => toggleOpenPanel(2)
		}, "edit-vector-style"));
	}
	extraActions.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		title: tr("LAYER_MANAGER_TT_MORE_OPTIONS", locale),
		variant: "primary",
		icon: "cog",
		onClick: () => toggleOpenPanel(1)
	}, "more-layer-options"));
	const isWmsLegendOpen = !strIsNullOrEmpty(wmsLegendUrl);
	const layerLabel = (_layer$displayName = layer.displayName) !== null && _layer$displayName !== void 0 ? _layer$displayName : layer.name;
	const theVectorStyle = (_layer$cluster$style = (_layer$cluster = layer.cluster) === null || _layer$cluster === void 0 ? void 0 : _layer$cluster.style) !== null && _layer$cluster$style !== void 0 ? _layer$cluster$style : layer.vectorStyle;
	let which;
	if (theVectorStyle == layer.vectorStyle) which = VectorStyleSource.Base;
	else if (theVectorStyle == ((_layer$cluster2 = layer.cluster) === null || _layer$cluster2 === void 0 ? void 0 : _layer$cluster2.style)) which = VectorStyleSource.Cluster;
	let enableLine = false;
	let enablePoint = false;
	let enablePolygon = false;
	const allStyles = theVectorStyle ? [theVectorStyle.default, ...(_theVectorStyle$rules = (_theVectorStyle$rules2 = theVectorStyle.rules) === null || _theVectorStyle$rules2 === void 0 ? void 0 : _theVectorStyle$rules2.map((r) => r.style)) !== null && _theVectorStyle$rules !== void 0 ? _theVectorStyle$rules : []] : [];
	for (const s of allStyles) {
		if (s.point) enablePoint = true;
		if (s.line) enableLine = true;
		if (s.polygon) enablePolygon = true;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			style: LAYER_SWITCH_STYLE,
			checked: layer.visible,
			onChange: () => onSetVisibility(layer.name, !layer.visible),
			labelElement: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				title: layerLabel,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { icon: iconName }),
					" ",
					layerLabel
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ElementGroup, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !canMoveUp,
				title: tr("LAYER_MANAGER_TT_MOVE_UP", locale),
				variant: "primary",
				icon: "caret-up",
				onClick: () => onMoveLayerUp(layer.name)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !canMoveDown,
				title: tr("LAYER_MANAGER_TT_MOVE_DOWN", locale),
				variant: "primary",
				icon: "caret-down",
				onClick: () => onMoveLayerDown(layer.name)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !canZoom,
				title: tr("LAYER_MANAGER_TT_ZOOM_EXTENTS", locale),
				variant: "success",
				icon: "zoom-to-fit",
				onClick: () => onZoomToBounds(layer.name)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				title: tr("LAYER_MANAGER_TT_REMOVE", locale),
				variant: "danger",
				icon: "trash",
				onClick: () => onRemoveLayer(layer.name)
			}),
			extraActions
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapsible, {
			isOpen: openPanel == 1,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					level: 5,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						children: tr("MORE_LAYER_OPTIONS", locale)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
					label: tr("LAYER_OPACITY", locale),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: 0,
						max: 1,
						stepSize: .01,
						value: layer.opacity,
						onChange: (e) => onSetOpacity(layer.name, e)
					})
				}),
				layer.heatmap && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
					label: tr("LAYER_HEATMAP_BLUR", locale),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: 1,
						max: 50,
						stepSize: 1,
						labelValues: HEATMAP_SLIDER_RAMP,
						value: layer.heatmap.blur,
						onChange: (e) => onSetHeatmapBlur(layer.name, e)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
					label: tr("LAYER_HEATMAP_RADIUS", locale),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						min: 1,
						max: 50,
						stepSize: 1,
						labelValues: HEATMAP_SLIDER_RAMP,
						value: layer.heatmap.radius,
						onChange: (e) => onSetHeatmapRadius(layer.name, e)
					})
				})] })
			] })
		}),
		isWms && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapsible, {
			isOpen: isWmsLegendOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				level: 5,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#",
					children: tr("WMS_LEGEND", locale)
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: wmsLegendUrl })] })
		}),
		theVectorStyle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapsible, {
			isOpen: openPanel == 2,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { padding: 5 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					level: 5,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						children: tr("VECTOR_LAYER_STYLE", locale)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VectorLayerStyleEditor, {
					onChange: (st) => onVectorStyleChanged(layer.name, st, which),
					locale,
					style: theVectorStyle,
					enablePoint,
					enableLine,
					enablePolygon
				})]
			})
		})
	] }, layer.name);
};
/**
* @hidden
*/
var ManageLayers = (props) => {
	const { NonIdealState } = useElementContext();
	const { locale, currentResolution, onSetOpacity, onSetHeatmapBlur, onSetHeatmapRadius, onRemoveLayer, onMoveLayerUp, onMoveLayerDown, onZoomToBounds, onSetVisibility, onVectorStyleChanged } = props;
	const [layers, setLayers] = import_react.useState(props.layers);
	import_react.useEffect(() => {
		setLayers(props.layers);
	}, [props.layers]);
	if (layers.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: layers.map((lyr, i) => {
		const cannotMoveUp = i == 0 || layers.length <= 1;
		const cannotMoveDown = i >= layers.length - 1 || layers.length <= 1;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManageLayerItem, {
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
		}, `manage-layer-${i}`);
	}) });
	else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NonIdealState, {
		icon: "layers",
		title: tr("NO_EXTERNAL_LAYERS", locale),
		description: tr("NO_EXTERNAL_LAYERS_DESC", locale, { tabName: tr("ADD_LAYER", locale) })
	});
};
//#endregion
//#region src/components/layer-manager/wms-capabilities-panel.tsx
init_objectWithoutProperties();
var _excluded$2 = ["Layer"];
/**
* Extracts WMS layers from the given parsed capabilities document
* 
* @hidden
* @param caps 
* @returns 
*/
function extractWmsLayers(caps) {
	const layers = [];
	const _caps$Capability$Laye = caps.Capability.Layer, { Layer } = _caps$Capability$Laye, rootLayer = _objectWithoutProperties(_caps$Capability$Laye, _excluded$2);
	if (rootLayer.Name) {
		var _rootLayer$Style;
		layers.push([rootLayer, (_rootLayer$Style = rootLayer.Style) !== null && _rootLayer$Style !== void 0 ? _rootLayer$Style : []]);
	}
	if (caps.Capability.Layer.Layer) for (const layer of caps.Capability.Layer.Layer) {
		var _layer$Style;
		layers.push([layer, (_layer$Style = layer.Style) !== null && _layer$Style !== void 0 ? _layer$Style : []]);
	}
	return layers;
}
var WmsCapabilitiesPanel = (props) => {
	const { Card, Button, Icon, Heading } = useElementContext();
	const { locale, onAddLayer } = props;
	const { capabilities: caps } = props;
	const layers = extractWmsLayers(caps);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
			level: 5,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#",
				children: tr("WMS_SERVICE_INFO", locale)
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tr("WMS_VERSION", locale, { version: caps.version }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tr("OWS_SERVICE_NAME", locale, { name: caps.Service.Name }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tr("OWS_SERVICE_TITLE", locale, { title: caps.Service.Title }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tr("OWS_SERVICE_ABSTRACT", locale, { abstract: caps.Service.Abstract }) })
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		style: { marginBottom: 10 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
			level: 5,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#",
				children: tr("WMS_AVAILABLE_LAYERS", locale)
			})
		}), layers.map(([layer, styles]) => {
			const otherActions = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				style: {
					padding: 15,
					paddingTop: 5
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Heading, {
						level: 4,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { icon: "layer" }),
							" ",
							layer.Name
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tr("OWS_LAYER_TITLE", locale, { title: layer.Title }) }),
					(() => {
						if (styles.length) return styles.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ElementGroup, {
							vertical: true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => {
										var _st$LegendURL;
										return onAddLayer(layer.Name, layer.queryable, false, st, (_st$LegendURL = st.LegendURL) === null || _st$LegendURL === void 0 || (_st$LegendURL = _st$LegendURL[0]) === null || _st$LegendURL === void 0 ? void 0 : _st$LegendURL.OnlineResource);
									},
									variant: "primary",
									icon: "new-layer",
									children: tr("ADD_LAYER_WITH_WMS_STYLE", locale, { style: st.Name })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => {
										var _st$LegendURL2;
										return onAddLayer(layer.Name, layer.queryable, true, st, (_st$LegendURL2 = st.LegendURL) === null || _st$LegendURL2 === void 0 || (_st$LegendURL2 = _st$LegendURL2[0]) === null || _st$LegendURL2 === void 0 ? void 0 : _st$LegendURL2.OnlineResource);
									},
									variant: "primary",
									icon: "new-layer",
									children: tr("ADD_LAYER_WITH_WMS_STYLE_TILED", locale, { style: st.Name })
								}),
								otherActions
							]
						}, st.Name));
						else return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ElementGroup, {
							vertical: true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => onAddLayer(layer.Name, layer.queryable, false, void 0),
									variant: "primary",
									icon: "new-layer",
									children: tr("ADD_LAYER", locale)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => onAddLayer(layer.Name, layer.queryable, true, void 0),
									variant: "primary",
									icon: "new-layer",
									children: tr("ADD_LAYER_TILED", locale)
								}),
								otherActions
							]
						});
					})()
				]
			}, layer.Name);
		})]
	})] });
};
//#endregion
//#region src/api/layer-manager/driver-registry.ts
var _drivers = [];
function getFormatDrivers() {
	return _drivers;
}
function addFormatDriver(driver) {
	_drivers.push(driver);
}
//#endregion
//#region src/components/layer-manager/color-brewer.tsx
function getColorBrewerRamps() {
	const ramps = [];
	for (const cat in index.schemeGroups) for (const scheme of index.schemeGroups[cat]) {
		const ramp = getMaxRamp(scheme);
		ramps.push({
			displayName: `${cat} - ${scheme}`,
			category: cat,
			scheme,
			ramp
		});
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
var ColorBrewerSwatch = (props) => {
	const ramp = getMaxRamp(index[props.theme]);
	if (ramp) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("colgroup", { children: ramp.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", {
		span: 1,
		style: { width: 12 }
	}, `ramp-col-${i}`)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: ramp.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		style: {
			border: "1px solid black",
			backgroundColor: r
		},
		children: "\xA0"
	}, `ramp-${i}`)) }) })] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
};
//#endregion
//#region src/api/layer-manager.ts
function cloneObject(obj) {
	return JSON.parse(JSON.stringify(obj));
}
function clonePointWithFill(baseTemplate, fillColor) {
	if (!baseTemplate) return;
	const clone = cloneObject(baseTemplate);
	switch (clone.type) {
		case "Circle":
			clone.fill.color = fillColor;
			break;
	}
	return clone;
}
function cloneLineWithFill(baseTemplate, fillColor) {
	if (!baseTemplate) return;
	const clone = cloneObject(baseTemplate);
	clone.color = fillColor;
	return clone;
}
function clonePolyWithFill(baseTemplate, fillColor) {
	if (!baseTemplate) return;
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
		if (isLine) style.label.placement = "line";
	} else style.label.text = expr;
}
function ensureLabelTextForStyle(fstyle, expr) {
	if (fstyle.line) ensureLabelText(fstyle.line, expr, true);
	if (fstyle.point) ensureLabelText(fstyle.point, expr);
	if (fstyle.polygon) ensureLabelText(fstyle.polygon, expr);
}
function getLayerInfo(layer, isExternal) {
	var _layer$get, _layer$get2;
	let vectorStyle;
	let cs;
	let ext;
	let hs;
	if (layer instanceof ImageLayer || layer instanceof TileLayer) {
		const source = layer.getSource();
		if (layer.get(LayerProperty.HAS_WMS_LEGEND) == true && (source instanceof ImageWMS || source instanceof TileWMS)) ext = {
			type: "WMS",
			getLegendUrl: (res) => source.getLegendUrl(res)
		};
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
		if (!Array.isArray(blurExpr) && !Array.isArray(radiusExpr)) hs = {
			blur: blurExpr,
			radius: radiusExpr
		};
		else {
			if (Array.isArray(blurExpr)) console.warn("Don't know how to evaluate blur", blurExpr);
			if (Array.isArray(radiusExpr)) console.warn("Don't know how to evaluate radius", radiusExpr);
		}
	}
	return {
		visible: layer.getVisible(),
		selectable: layer.get(LayerProperty.IS_SELECTABLE) == true,
		name: layer.get(LayerProperty.LAYER_NAME),
		displayName: (_layer$get = layer.get(LayerProperty.LAYER_DISPLAY_NAME)) !== null && _layer$get !== void 0 ? _layer$get : layer.get(LayerProperty.LAYER_NAME),
		description: layer.get(LayerProperty.LAYER_DESCRIPTION),
		type: layer.get(LayerProperty.LAYER_TYPE),
		opacity: layer.getOpacity(),
		isExternal,
		extensions: ext,
		vectorStyle,
		cluster: cs,
		heatmap: hs,
		busyWorkerCount: (_layer$get2 = layer.get(LayerProperty.BUSY_WORKER_COUNT)) !== null && _layer$get2 !== void 0 ? _layer$get2 : 0,
		metadata: layer.get(LayerProperty.LAYER_METADATA)
	};
}
var LayerManager = class {
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
		if (onlyAddIfNotExists && this.hasLayer(extLayer.name)) return;
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
			const handler = /* @__PURE__ */ function() {
				var _ref = _asyncToGenerator(function* (e) {
					var _e$target;
					const result = (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.result;
					if (result && typeof result == "string") {
						const formats = that._olFormats;
						if (formats.length == 0) reject(new Error(tr("ADD_LOCAL_FILE_LAYER_FAILURE_NO_FORMATS", locale)));
						let loadedType;
						let bLoaded = false;
						for (let i = 0, ii = formats.length; i < ii; ++i) {
							const format = formats[i];
							try {
								loadedType = yield format.tryParse(file.size, result);
							} catch (e) {}
							if (loadedType && loadedType.hasFeatures()) {
								loadedType.name = layerName;
								bLoaded = true;
								break;
							}
						}
						if (bLoaded && loadedType) resolve(loadedType);
						else reject(new Error(tr("ADD_LOCAL_FILE_LAYER_FAILURE", locale)));
					} else reject(new Error(tr("ADD_LOCAL_FILE_LAYER_FAILURE_NOT_TEXT", locale)));
				});
				return function handler(_x) {
					return _ref.apply(this, arguments);
				};
			}();
			reader.addEventListener("load", handler);
			reader.readAsText(file);
		});
	}
	addLayerFromParsedFeatures(options) {
		var _this = this;
		return _asyncToGenerator(function* () {
			const { features, projection, defaultStyle, extraOptions, labelOnProperty, selectedPopupTemplate, metadata, defn } = options;
			let proj = projection;
			if (!proj) proj = _this.map.getView().getProjection();
			const source = new VectorSource();
			source.set(SourceProperty.SUPPRESS_LOAD_EVENTS, true);
			let csArgs;
			if ((extraOptions === null || extraOptions === void 0 ? void 0 : extraOptions.kind) == "Cluster") csArgs = { distance: extraOptions.clusterDistance };
			let layer;
			if ((extraOptions === null || extraOptions === void 0 ? void 0 : extraOptions.kind) == "Heatmap") layer = new Heatmap({
				source,
				weight: extraOptions.weightProperty
			});
			else layer = new VectorLayer({
				source: clusterSourceIfRequired(source, { cluster: csArgs }),
				className: "external-vector-layer",
				declutter: true
			});
			yield features.addTo(source, _this.map.getView().getProjection(), proj);
			layer.set(LayerProperty.LAYER_NAME, features.name);
			layer.set(LayerProperty.LAYER_DISPLAY_NAME, features.name);
			layer.set(LayerProperty.LAYER_TYPE, features.type);
			layer.set(LayerProperty.LAYER_DEFN, defn);
			if ((extraOptions === null || extraOptions === void 0 ? void 0 : extraOptions.kind) == "Heatmap") layer.set(LayerProperty.IS_HEATMAP, true);
			else layer.set(LayerProperty.IS_SELECTABLE, true);
			layer.set(LayerProperty.IS_EXTERNAL, true);
			layer.set(LayerProperty.IS_GROUP, false);
			if (metadata) layer.set(LayerProperty.LAYER_METADATA, metadata);
			if (selectedPopupTemplate) layer.set(LayerProperty.SELECTED_POPUP_CONFIGURATION, selectedPopupTemplate);
			let clusterSettings;
			if ((extraOptions === null || extraOptions === void 0 ? void 0 : extraOptions.kind) == "Cluster") {
				var _extraOptions$onClust, _ref2, _extraOptions$cluster;
				clusterSettings = {
					distance: extraOptions.clusterDistance,
					onClick: (_extraOptions$onClust = extraOptions.onClusterClickAction) !== null && _extraOptions$onClust !== void 0 ? _extraOptions$onClust : ClusterClickAction.ShowPopup,
					style: cloneObject((_ref2 = (_extraOptions$cluster = extraOptions.clusterStyle) !== null && _extraOptions$cluster !== void 0 ? _extraOptions$cluster : defaultStyle) !== null && _ref2 !== void 0 ? _ref2 : DEFAULT_CLUSTERED_LAYER_STYLE)
				};
				if (!strIsNullOrEmpty(labelOnProperty)) ensureLabelTextForStyle(clusterSettings.style.default, { expr: [
					"get",
					"features",
					0,
					labelOnProperty
				] });
			}
			const bStyle = defaultStyle !== null && defaultStyle !== void 0 ? defaultStyle : cloneObject(DEFAULT_VECTOR_LAYER_STYLE);
			if (!features.geometryTypes.includes("Point")) {
				delete bStyle.default.point;
				clusterSettings === null || clusterSettings === void 0 || delete clusterSettings.style.default.point;
			}
			if (!features.geometryTypes.includes("LineString")) {
				delete bStyle.default.line;
				clusterSettings === null || clusterSettings === void 0 || delete clusterSettings.style.default.line;
			}
			if (!features.geometryTypes.includes("Polygon")) {
				delete bStyle.default.polygon;
				clusterSettings === null || clusterSettings === void 0 || delete clusterSettings.style.default.polygon;
			}
			if (!strIsNullOrEmpty(labelOnProperty)) ensureLabelTextForStyle(bStyle.default, { expr: ["get", labelOnProperty] });
			if ((extraOptions === null || extraOptions === void 0 ? void 0 : extraOptions.kind) == "Theme") {
				var _chosenRamp$length;
				const values = yield features.getDistinctValues(extraOptions.themeOnProperty);
				let baseTemplatePoint = bStyle.default.point;
				let baseTemplateLine = bStyle.default.line;
				let baseTemplatePoly = bStyle.default.polygon;
				let ramp = index[extraOptions.colorBrewerTheme];
				if (!ramp) ramp = index.Blues;
				const chosenRamp = getMaxRamp(ramp);
				const ruleCount = Math.min(values.length, (_chosenRamp$length = chosenRamp === null || chosenRamp === void 0 ? void 0 : chosenRamp.length) !== null && _chosenRamp$length !== void 0 ? _chosenRamp$length : 0);
				const palette = ramp[ruleCount];
				if (!bStyle.rules) bStyle.rules = [];
				for (let i = 0; i < ruleCount; i++) {
					const v = values[i];
					const style = {
						label: v,
						point: clonePointWithFill(baseTemplatePoint, palette[i]),
						line: cloneLineWithFill(baseTemplateLine, palette[i]),
						polygon: clonePolyWithFill(baseTemplatePoly, palette[i])
					};
					if (!strIsNullOrEmpty(labelOnProperty)) ensureLabelTextForStyle(style, { expr: ["get", labelOnProperty] });
					bStyle.rules.push({
						filter: [
							"==",
							["get", extraOptions.themeOnProperty],
							v
						],
						style
					});
				}
			}
			if (layer instanceof VectorLayer) setOLVectorLayerStyle(layer, bStyle, clusterSettings);
			return _this.addLayer(features.name, layer);
		})();
	}
};
//#endregion
//#region src/components/layer-manager/add-wms-layer.tsx
function tryUpgradeUrlToHttpsIfNeeded(caps, wasHttps) {
	const url = caps.Capability.Request.GetMap.DCPType[0].HTTP.Get.OnlineResource;
	if (strStartsWith(url, "http://") && wasHttps) return "https://" + url.substring(7);
	return url;
}
/**
* @hidden
*/
var AddWmsLayer = (props) => {
	const { Button, InputGroup, NonIdealState, Spinner } = useElementContext();
	const { locale } = props;
	const [wmsUrl, setWmsUrl] = import_react.useState("");
	const [loadingCapabilities, setLoadingCapabilities] = import_react.useState(false);
	const [caps, setCaps] = import_react.useState(void 0);
	const [error, setError] = import_react.useState(void 0);
	const viewer = useMapProviderContext();
	const onAddLayer = (name, selectable, isTiled, style) => {
		if (caps && viewer.isReady()) {
			var _props$targetLayerMan;
			const params = { LAYERS: name };
			if (style) params.STYLE = style.Name;
			if (isTiled) params.TILED = true;
			let layer;
			let source;
			if (isTiled) {
				source = new TileWMS({
					url: tryUpgradeUrlToHttpsIfNeeded(caps[0], caps[1]),
					params
				});
				layer = new TileLayer({ source });
			} else {
				source = new ImageWMS({
					url: tryUpgradeUrlToHttpsIfNeeded(caps[0], caps[1]),
					params
				});
				layer = new ImageLayer({ source });
			}
			layer.set(LayerProperty.LAYER_TYPE, "WMS");
			layer.set(LayerProperty.IS_SELECTABLE, selectable);
			layer.set(LayerProperty.IS_EXTERNAL, true);
			layer.set(LayerProperty.IS_GROUP, false);
			if (style) {
				var _style$LegendURL;
				if (!strIsNullOrEmpty((_style$LegendURL = style.LegendURL) === null || _style$LegendURL === void 0 || (_style$LegendURL = _style$LegendURL[0]) === null || _style$LegendURL === void 0 ? void 0 : _style$LegendURL.OnlineResource)) layer.set(LayerProperty.HAS_WMS_LEGEND, true);
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
			((_props$targetLayerMan = props.targetLayerManager) !== null && _props$targetLayerMan !== void 0 ? _props$targetLayerMan : viewer.getLayerManager()).addLayer(name, layer);
			viewer.toastSuccess("success", tr("ADDED_LAYER", locale, { name }));
			props.onLayerAdded(getLayerInfo(layer, true));
		}
	};
	const onLoadCaps = () => {
		setCaps(void 0);
		setLoadingCapabilities(true);
		new Client("", "mapagent").getText(wmsUrl).then((s) => {
			const caps = new WMSCapabilities().read(s);
			if (caps.version != "1.3.0") {
				setLoadingCapabilities(false);
				setCaps(void 0);
				setError(tr("WMS_UNSUPPORTED_VERSION", locale, { version: caps.version }));
			} else {
				setLoadingCapabilities(false);
				setCaps([caps, strStartsWith(wmsUrl, "https://")]);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup, {
		leftIcon: "geosearch",
		placeholder: tr("ADD_WMS_LAYER_URL", locale),
		value: wmsUrl,
		onChange: onWmsUrlChange,
		readOnly: loadingCapabilities,
		rightElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "primary",
			icon: "arrow-right",
			onClick: onLoadCaps,
			disabled: loadingCapabilities
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: (() => {
		if (loadingCapabilities) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NonIdealState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { sizePreset: "large" }),
			title: tr("ADD_WMS_LAYER_LOADING", locale),
			description: tr("ADD_WMS_LAYER_LOADING_DESC", locale)
		});
		else if (caps) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WmsCapabilitiesPanel, {
			onAddLayer,
			capabilities: caps[0],
			locale
		});
		else if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Error$1, { error });
		else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NonIdealState, {
			icon: "issue",
			title: tr("ADD_WMS_LAYER_NO_LAYERS", locale),
			description: tr("WMS_NO_LAYER_DESCRIPTION", locale)
		});
	})() })] });
};
//#endregion
//#region src/components/layer-manager/wfs-capabilities-parser.ts
function tryGetElementContent(el) {
	if (el) {
		var _el$textContent;
		return (_el$textContent = el.textContent) !== null && _el$textContent !== void 0 ? _el$textContent : el.text;
	}
}
function getElements(root, tagName, ns) {
	let els;
	if (ns) {
		els = root.getElementsByTagName(`${ns}:${tagName}`);
		if (els.length == 0) els = root.getElementsByTagName(tagName);
	} else els = root.getElementsByTagName(tagName);
	const elements = [];
	if (els) for (let i = 0; i < els.length; i++) {
		const el = els.item(i);
		if (el) elements.push(el);
	}
	return elements;
}
function trySetProperty(obj, setter, value) {
	if (value) setter(obj, value);
}
/**
* A basic parser for WFS capabilities XML
*
* @class WfsCapabilitiesParser
* @since 0.13
*/
var WfsCapabilitiesParser = class {
	constructor() {}
	parse(xml) {
		const parser = new DOMParser();
		this.xmlDoc = parser.parseFromString(xml, "text/xml");
		return {
			info: this.getServiceInfo(),
			layers: this.getLayers()
		};
	}
	getServiceInfo() {
		const els = getElements(this.xmlDoc, "ServiceIdentification", "ows");
		const info = {
			title: "",
			abstract: "",
			version: ""
		};
		if (els.length == 1) {
			var _getElements, _getElements2;
			const t = tryGetElementContent((_getElements = getElements(els[0], "Title", "ows")) === null || _getElements === void 0 ? void 0 : _getElements[0]);
			const a = tryGetElementContent((_getElements2 = getElements(els[0], "Abstract", "ows")) === null || _getElements2 === void 0 ? void 0 : _getElements2[0]);
			const ops = getElements(this.xmlDoc, "Operation", "ows");
			for (const op of ops) if (op.getAttribute("name") == "GetFeature") {
				const parms = getElements(op, "Parameter", "ows");
				for (const parm of parms) if (parm.getAttribute("name") == "outputFormat") {
					const allowedValues = getElements(parm, "Value", "ows").map((av) => tryGetElementContent(av)).filter((s) => !strIsNullOrEmpty(s));
					if (allowedValues.length > 0) info.allowedOutputFormats = allowedValues;
				}
			}
			const v = getElements(els[0], "ServiceTypeVersion", "ows").map((el) => tryGetElementContent(el)).filter((s) => !strIsNullOrEmpty(s));
			v.sort();
			trySetProperty(info, (i, v) => i.title = v, t);
			trySetProperty(info, (i, v) => i.abstract = v, a);
			if (v.length > 0) info.version = v[v.length - 1];
		}
		return info;
	}
	getLayers() {
		return getElements(this.xmlDoc, "FeatureType", "wfs").map((el) => {
			var _getElements3, _getElements4, _getElements5, _getElements$, _getElements6, _getElements7, _getElements8, _getElements9;
			const info = {
				name: "",
				title: "",
				abstract: "",
				defaultCrs: ""
			};
			const n = tryGetElementContent((_getElements3 = getElements(el, "Name", "wfs")) === null || _getElements3 === void 0 ? void 0 : _getElements3[0]);
			const t = tryGetElementContent((_getElements4 = getElements(el, "Title", "wfs")) === null || _getElements4 === void 0 ? void 0 : _getElements4[0]);
			const a = tryGetElementContent((_getElements5 = getElements(el, "Abstract", "wfs")) === null || _getElements5 === void 0 ? void 0 : _getElements5[0]);
			const c = tryGetElementContent((_getElements$ = (_getElements6 = getElements(el, "DefaultCRS", "wfs")) === null || _getElements6 === void 0 ? void 0 : _getElements6[0]) !== null && _getElements$ !== void 0 ? _getElements$ : (_getElements7 = getElements(el, "DefaultSRS", "wfs")) === null || _getElements7 === void 0 ? void 0 : _getElements7[0]);
			const oc = getElements(el, "OtherCRS", "wfs").map((fel) => tryGetElementContent(fel)).filter((s) => !strIsNullOrEmpty(s));
			const os = getElements(el, "OtherSRS", "wfs").map((fel) => tryGetElementContent(fel)).filter((s) => !strIsNullOrEmpty(s));
			info.otherCrs = [...oc, ...os];
			const fmts = getElements(el, "Format", "wfs").map((fel) => tryGetElementContent(fel)).filter((s) => !strIsNullOrEmpty(s));
			const ll = tryGetElementContent((_getElements8 = getElements(el, "LowerCorner", "ows")) === null || _getElements8 === void 0 ? void 0 : _getElements8[0]);
			const ur = tryGetElementContent((_getElements9 = getElements(el, "UpperCorner", "ows")) === null || _getElements9 === void 0 ? void 0 : _getElements9[0]);
			trySetProperty(info, (i, v) => i.name = v, n);
			trySetProperty(info, (i, v) => i.title = v, t);
			trySetProperty(info, (i, v) => i.abstract = v, a);
			trySetProperty(info, (i, v) => i.defaultCrs = v, c);
			if (fmts.length > 0) info.formats = fmts;
			const llParts = ll === null || ll === void 0 ? void 0 : ll.split(" ").map((s) => parseFloat(s));
			const urParts = ur === null || ur === void 0 ? void 0 : ur.split(" ").map((s) => parseFloat(s));
			if ((llParts === null || llParts === void 0 ? void 0 : llParts.length) == 2 && (urParts === null || urParts === void 0 ? void 0 : urParts.length) == 2) info.wgs84Bounds = [
				llParts[0],
				llParts[1],
				urParts[0],
				urParts[1]
			];
			return info;
		});
	}
};
//#endregion
//#region src/components/layer-manager/wfs-capabilities-panel.tsx
/**
* Attempts to extract an EPSG code from the given CRS identifier
*
* @param {string | undefined} crs
* @returns {(number | undefined)}
* @since 0.13
*/
function parseEpsgCodeFromCRS(crs) {
	if (crs == "urn:ogc:def:crs:OGC:1.3:CRS84") return 4326;
	let res = crs === null || crs === void 0 ? void 0 : crs.match(/urn:ogc:def:crs:EPSG::(\d+)/);
	if ((res === null || res === void 0 ? void 0 : res.length) == 2) return parseInt(res[1], 10);
	res = crs === null || crs === void 0 ? void 0 : crs.match(/EPSG:(\d+)/);
	if ((res === null || res === void 0 ? void 0 : res.length) == 2) return parseInt(res[1], 10);
}
function isGeoJsonMimeType(mimeType) {
	var _mimeType$toLowerCase;
	const lmt = (_mimeType$toLowerCase = mimeType === null || mimeType === void 0 ? void 0 : mimeType.toLowerCase()) !== null && _mimeType$toLowerCase !== void 0 ? _mimeType$toLowerCase : "";
	if (lmt.indexOf("application/vnd.geo+json") >= 0 || lmt.indexOf("application/json") >= 0 || lmt.indexOf("geojson") >= 0) return true;
	return false;
}
function getGeoJsonFormat(serviceInfo, layer) {
	var _filter, _layer$formats, _filter2, _serviceInfo$allowedO;
	const lformats = (_filter = ((_layer$formats = layer.formats) !== null && _layer$formats !== void 0 ? _layer$formats : []).filter((f) => isGeoJsonMimeType(f))) === null || _filter === void 0 ? void 0 : _filter[0];
	const sformats = (_filter2 = ((_serviceInfo$allowedO = serviceInfo.allowedOutputFormats) !== null && _serviceInfo$allowedO !== void 0 ? _serviceInfo$allowedO : []).filter((f) => isGeoJsonMimeType(f))) === null || _filter2 === void 0 ? void 0 : _filter2[0];
	return lformats !== null && lformats !== void 0 ? lformats : sformats;
}
function getLayerCrs(layer) {
	let pdc = [parseEpsgCodeFromCRS(layer.defaultCrs), layer.defaultCrs];
	if (!(pdc[0] == 4326 || pdc[0] == 3857)) {
		if (layer.otherCrs) {
			const matches = layer.otherCrs.filter((c) => {
				const poc = parseEpsgCodeFromCRS(c);
				return poc == 4326 || poc == 3857;
			});
			if (matches.length > 0) pdc = [parseEpsgCodeFromCRS(matches[0]), matches[0]];
		}
	}
	return pdc;
}
/**
* @hidden
*/
var WfsCapabilitiesPanel = (props) => {
	const { Card, Icon, Button, Heading } = useElementContext();
	const { locale, capabilities, onAddLayer } = props;
	const { layers, info } = capabilities;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
			level: 5,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#",
				children: tr("WFS_SERVICE_INFO", locale)
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tr("WFS_VERSION", locale, { version: info.version }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tr("OWS_SERVICE_TITLE", locale, { title: info.title }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tr("OWS_SERVICE_ABSTRACT", locale, { abstract: info.abstract }) })
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		style: { marginBottom: 10 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
			level: 5,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#",
				children: tr("WFS_AVAILABLE_LAYERS", locale)
			})
		}), layers.map((layer) => {
			const geoJsonFmt = getGeoJsonFormat(info, layer);
			const [epsgCode, origCrs] = getLayerCrs(layer);
			if (epsgCode && geoJsonFmt) {
				const otherActions = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					style: {
						padding: 15,
						paddingTop: 5
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Heading, {
							level: 4,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { icon: "layer" }),
								" ",
								layer.name
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tr("OWS_LAYER_TITLE", locale, { title: layer.title }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tr("OWS_LAYER_CRS", locale, { crs: `EPSG:${epsgCode}` }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ElementGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => onAddLayer(layer.name, info.version, geoJsonFmt, origCrs, epsgCode, layer.wgs84Bounds),
							variant: "primary",
							icon: "new-layer",
							children: tr("ADD_LAYER", locale)
						}), otherActions] })
					]
				}, layer.name);
			}
		}).filter((c) => c)]
	})] });
};
//#endregion
//#region src/components/layer-manager/add-wfs-layer.tsx
/**
* @hidden
*/
var AddWfsLayer = (props) => {
	const { InputGroup, Button, NonIdealState, Spinner } = useElementContext();
	const { locale } = props;
	const [wfsUrl, setWfsUrl] = import_react.useState("");
	const [loadingCapabilities, setLoadingCapabilities] = import_react.useState(false);
	const [caps, setCaps] = import_react.useState(void 0);
	const [error, setError] = import_react.useState(void 0);
	const viewer = useMapProviderContext();
	const onAddLayer = (name, version, format, origCrs, epsgCode, wfsWgs84Bounds) => {
		if (caps && viewer.isReady()) ensureProjection(epsgCode, locale, origCrs).then(([, resolvedProj]) => {
			var _props$targetLayerMan;
			const sourceProj = viewer.getProjection();
			const parsed = parseUrl(wfsUrl);
			let typeNameKey = "typename";
			if (version == "2.0.0") typeNameKey = "typenames";
			let urlTemplate = `${parsed.url}?service=WFS&version=${version}&request=GetFeature&${typeNameKey}=${encodeURIComponent(name)}&outputFormat=${encodeURIComponent(format)}&srsName=${encodeURIComponent(origCrs)}`;
			let sourceUrl;
			let strategy;
			const vectorFmt = new GeoJSON({
				dataProjection: resolvedProj,
				featureProjection: sourceProj
			});
			sourceUrl = urlTemplate;
			const layer = new VectorLayer({
				source: new VectorSource({
					format: vectorFmt,
					url: sourceUrl,
					strategy
				}),
				className: "external-vector-layer"
			});
			layer.set(LayerProperty.LAYER_TYPE, "WFS");
			layer.set(LayerProperty.IS_EXTERNAL, true);
			layer.set(LayerProperty.IS_SELECTABLE, true);
			layer.set(LayerProperty.IS_GROUP, false);
			if (wfsWgs84Bounds) layer.set(LayerProperty.WGS84_BBOX, wfsWgs84Bounds);
			setOLVectorLayerStyle(layer, DEFAULT_VECTOR_LAYER_STYLE, void 0);
			((_props$targetLayerMan = props.targetLayerManager) !== null && _props$targetLayerMan !== void 0 ? _props$targetLayerMan : viewer.getLayerManager()).addLayer(name, layer);
			viewer.toastSuccess("success", tr("ADDED_LAYER", locale, { name }));
			const li = getLayerInfo(layer, true);
			zoomToLayerExtents(li.name, viewer);
			props.onLayerAdded(li);
		});
	};
	const onLoadCaps = () => {
		setCaps(void 0);
		setLoadingCapabilities(true);
		new Client("", "mapagent").getText(wfsUrl).then((s) => {
			const caps = new WfsCapabilitiesParser().parse(s);
			setLoadingCapabilities(false);
			setCaps(caps);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup, {
		leftIcon: "geosearch",
		placeholder: tr("ADD_WFS_LAYER_URL", locale),
		value: wfsUrl,
		onChange: onWmsUrlChange,
		readOnly: loadingCapabilities,
		rightElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "primary",
			icon: "arrow-right",
			onClick: onLoadCaps,
			disabled: loadingCapabilities
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: (() => {
		if (loadingCapabilities) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NonIdealState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { sizePreset: "large" }),
			title: tr("ADD_WFS_LAYER_LOADING", locale),
			description: tr("ADD_WFS_LAYER_LOADING_DESC", locale)
		});
		else if (caps) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WfsCapabilitiesPanel, {
			onAddLayer,
			capabilities: caps,
			locale
		});
		else if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Error$1, { error });
		else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NonIdealState, {
			icon: "issue",
			title: tr("ADD_WFS_LAYER_NO_LAYERS", locale),
			description: tr("WFS_NO_LAYER_DESCRIPTION", locale)
		});
	})() })] });
};
//#endregion
//#region src/components/layer-manager/add-layer.tsx
init_objectSpread2();
var ADD_URL_LAYER_TYPES = {
	"WMS": {
		label: "WMS",
		content: (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddWmsLayer, _objectSpread2({}, props))
	},
	"WFS": {
		label: "WFS",
		content: (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddWfsLayer, _objectSpread2({}, props))
	}
};
function getCreateVectorLayerOptions(geomTypes, locale) {
	return [
		{
			value: "Vector",
			label: tr("CREATE_VECTOR_LAYER", locale),
			isValid: (geomTypes) => true
		},
		{
			value: "Themed",
			label: tr("CREATE_VECTOR_THEMED", locale),
			isValid: (geomTypes) => true
		},
		{
			value: "Clustered",
			label: tr("CREATE_VECTOR_CLUSTERED", locale),
			isValid: (geomTypes) => geomTypes.length == 1 && geomTypes.includes("Point")
		},
		{
			value: "Heatmap",
			label: tr("CREATE_VECTOR_HEATMAP", locale),
			isValid: (geomTypes) => geomTypes.length == 1 && geomTypes.includes("Point")
		}
	].filter((o) => o.isValid(geomTypes));
}
var AddFileLayer = (props) => {
	const { Button, Callout, NumericInput, NonIdealState, Spinner, Switch, Select, FileInput, FormGroup, EditableText } = useElementContext();
	const { locale } = props;
	const [isProcessingFile, setIsProcessingFile] = import_react.useState(false);
	const [isAddingLayer, setIsAddingLayer] = import_react.useState(false);
	const [addLayerError, setAddLayerError] = import_react.useState(void 0);
	const [loadedFile, setLoadedFile] = import_react.useState(void 0);
	const [addLayerName, setAddLayerName] = import_react.useState(void 0);
	const [addProjection, setAddProjection] = import_react.useState(4326);
	const [createOptions, setCreateOptions] = import_react.useState(getCreateVectorLayerOptions([], locale));
	const [enableLabels, setEnableLabels] = import_react.useState(false);
	const [labelOnProperty, setLabelOnProperty] = import_react.useState(void 0);
	const [themeOnProperty, setThemeOnProperty] = import_react.useState(void 0);
	const [themableProperties, setThemableProperties] = import_react.useState([]);
	const [themeToUse, setThemeToUse] = import_react.useState("Blues");
	const [createLayerAs, setCreateLayerAs] = import_react.useState("Vector");
	const [clusterDistance, setClusterDistance] = import_react.useState(10);
	const [themableRamps, _] = import_react.useState(getColorBrewerRamps());
	const [clusterClickAction, setClusterClickAction] = import_react.useState(ClusterClickAction.ShowPopup);
	const parsedFeaturesRef = import_react.useRef(void 0);
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
				if (epsg) setAddProjection(epsg);
			}
		} else {
			setLoadedFile(void 0);
			parsedFeaturesRef.current = void 0;
		}
	};
	const onFileDropped = function() {
		var _ref = _asyncToGenerator(function* (file) {
			if (viewer.isReady()) {
				setIsProcessingFile(true);
				setAddLayerError(void 0);
				const layerMgr = viewer.getLayerManager();
				try {
					setParsedFile(yield layerMgr.parseFeaturesFromFile({
						file,
						name: file.name,
						locale
					}));
				} catch (e) {
					setAddLayerError(e);
				}
				setIsProcessingFile(false);
			}
		});
		return function onFileDropped(_x) {
			return _ref.apply(this, arguments);
		};
	}();
	const onCancelAddFile = () => {
		setParsedFile(void 0);
	};
	const onAddFileLayer = import_react.useCallback(function() {
		var _ref2 = _asyncToGenerator(function* (layerProjection) {
			if (viewer.isReady() && (parsedFeaturesRef === null || parsedFeaturesRef === void 0 ? void 0 : parsedFeaturesRef.current)) {
				setIsAddingLayer(true);
				setAddLayerError(void 0);
				try {
					var _props$targetLayerMan;
					const [_, layerProj] = yield ensureProjection(layerProjection, locale);
					if (!strIsNullOrEmpty(addLayerName)) parsedFeaturesRef.current.name = addLayerName;
					const targetLayerMgr = (_props$targetLayerMan = props.targetLayerManager) !== null && _props$targetLayerMan !== void 0 ? _props$targetLayerMan : viewer.getLayerManager();
					if (targetLayerMgr.hasLayer(parsedFeaturesRef.current.name)) throw new Error(tr("LAYER_NAME_EXISTS", locale, { name: parsedFeaturesRef.current.name }));
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
							extraOpts = { kind: "Heatmap" };
							break;
					}
					let labelProp;
					if (enableLabels) labelProp = labelOnProperty;
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
					if (!strIsNullOrEmpty(e === null || e === void 0 ? void 0 : e.message)) viewer.toastError("error", e.message);
				}
				setIsAddingLayer(false);
			}
		});
		return function(_x2) {
			return _ref2.apply(this, arguments);
		};
	}(), [
		clusterDistance,
		createLayerAs,
		themeOnProperty,
		themeToUse,
		enableLabels,
		labelOnProperty,
		clusterClickAction,
		props.onLayerAdded,
		props.targetLayerManager,
		addLayerName,
		locale
	]);
	if (loadedFile) {
		let canAdd = true;
		if (createLayerAs == "Themed") {
			if (strIsNullOrEmpty(themeOnProperty)) canAdd = false;
		}
		const labelEl = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			label: tr("ENABLE_LABELS", locale),
			checked: enableLabels,
			onChange: (e) => setEnableLabels(e.target.checked)
		}), enableLabels && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("LABEL_USING_PROPERTY", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				value: labelOnProperty,
				onChange: (s) => setLabelOnProperty(s),
				items: themableProperties.map((th) => ({
					label: th,
					value: th
				}))
			})
		})] });
		const colorBrewerLabel = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: purify.sanitize(tr("COLORBREWER_THEME", locale)) } });
		const themeEl = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
				label: tr("THEME_ON_PROPERTY", locale),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: themeOnProperty,
					onChange: (s) => setThemeOnProperty(s),
					items: themableProperties.map((th) => ({
						label: th,
						value: th
					}))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
				label: colorBrewerLabel,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: themeToUse,
					onChange: (s) => setThemeToUse(s),
					items: themableRamps.map((th) => ({
						label: th.displayName,
						value: th.scheme
					}))
				})
			}),
			themeToUse && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorBrewerSwatch, { theme: themeToUse })
		] });
		const clusterActions = [{
			value: ClusterClickAction.ShowPopup,
			label: tr("CLUSTER_CLICK_ACTION_SHOW_POPUP", locale)
		}, {
			value: ClusterClickAction.ZoomToClusterExtents,
			label: tr("CLUSTER_CLICK_ACTION_ZOOM_EXTENTS", locale)
		}];
		const clusterEl = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("POINT_CLUSTER_DISTANCE", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericInput, {
				min: 1,
				value: clusterDistance,
				onChange: (v) => setClusterDistance(v)
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
			label: tr("CLUSTER_CLICK_ACTION", locale),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypedSelect, {
				value: clusterClickAction,
				onChange: (e) => setClusterClickAction(e),
				items: clusterActions
			})
		})] });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NonIdealState, {
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
				value: addLayerName,
				onChange: (v) => setAddLayerName(v)
			}),
			icon: "upload",
			description: tr("FMT_UPLOADED_FILE", locale, {
				size: loadedFile.size,
				type: strIsNullOrEmpty(loadedFile.type) ? tr("UNKNOWN_FILE_TYPE", locale) : loadedFile.type
			}),
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				addLayerError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
					variant: "danger",
					title: tr("ADDING_LAYER_ERROR", locale),
					children: addLayerError.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
					label: tr("ADD_LAYER_PROJECTION", locale),
					children: loadedFile.defaultProjection ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["EPSG:", addProjection] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://spatialreference.org/",
							target: "_blank",
							children: "EPSG:"
						}),
						inline: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericInput, {
							style: { width: 60 },
							min: 0,
							value: addProjection,
							onChange: (v) => setAddProjection(v)
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
					label: tr("CREATE_LAYER_AS", locale),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: createLayerAs,
						onChange: (e) => setCreateLayerAs(e),
						items: createOptions
					})
				}),
				(() => {
					switch (createLayerAs) {
						case "Vector": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: labelEl });
						case "Themed": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [labelEl, themeEl] });
						case "Clustered": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [labelEl, clusterEl] });
						case "Heatmap": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
						default: assertNever(createLayerAs);
					}
				})(),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ElementGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: !canAdd,
					loading: isAddingLayer,
					onClick: (e) => onAddFileLayer(addProjection),
					variant: "primary",
					children: tr("ADD_LAYER", locale)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					loading: isAddingLayer,
					onClick: (e) => onCancelAddFile(),
					variant: "danger",
					children: tr("CANCEL", locale)
				})] })
			] })
		});
	} else if (isProcessingFile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NonIdealState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { sizePreset: "large" }),
		title: tr("ADD_FILE_PROCESSING", locale)
	});
	else return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [addLayerError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
		variant: "danger",
		title: tr("ADDING_LAYER_ERROR", locale),
		children: addLayerError.message
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NonIdealState, {
		title: tr("ADD_FILE", locale),
		icon: "upload",
		description: tr("ADD_FILE_INSTRUCTIONS", locale),
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileInput, {
			fill: true,
			text: tr("CHOOSE_FILE", locale),
			buttonText: tr("BROWSE", locale),
			onInputChange: (e) => e.target.files && onFileDropped(e.target.files[0])
		})
	})] });
};
var AddUrlLayer = (props) => {
	const { locale } = props;
	const [selectedUrlType, setSelectedUrlType] = import_react.useState(void 0);
	const items = Object.keys(ADD_URL_LAYER_TYPES).map((lt) => ({
		value: lt,
		label: ADD_URL_LAYER_TYPES[lt].label
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { marginBottom: 16 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tr("LAYER_TYPE", locale) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypedSelect, {
			fill: true,
			value: selectedUrlType || "",
			placeholder: tr("SELECT_LAYER_TYPE", locale),
			onChange: (e) => setSelectedUrlType(e),
			items: items.map((i) => ({
				value: i.value,
				label: i.value
			}))
		})]
	}), (() => {
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
	})()] });
};
/**
* @hidden
*/
var AddLayer = (props) => {
	const { Radio } = useElementContext();
	const [addLayerKind, setAddLayerKind] = import_react.useState(0);
	const onAddLayerKindChanged = (e) => {
		setAddLayerKind(parseInt(e.target.value, 10));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tr("ADD_LAYER_KIND_PROMPT", props.locale) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
			label: tr("LAYER_KIND_FILE", props.locale),
			checked: addLayerKind == 0,
			value: 0,
			onChange: onAddLayerKindChanged
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
			label: tr("LAYER_KIND_URL", props.locale),
			checked: addLayerKind == 1,
			value: 1,
			onChange: onAddLayerKindChanged
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
		(() => {
			switch (addLayerKind) {
				case 0: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddFileLayer, _objectSpread2({}, props));
				case 1: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddUrlLayer, _objectSpread2({}, props));
			}
		})()
	] });
};
function clampSpyCursorRadius(radius) {
	return Math.max(25, Math.min(150, radius));
}
function useMapComparisonInfo() {
	const pairs = useAppState((state) => {
		var _state$config$compari;
		return (_state$config$compari = state.config.comparisonPairs) !== null && _state$config$compari !== void 0 ? _state$config$compari : state.config.mapSwipePairs;
	});
	const activeMapName = useAppState((state) => state.config.activeMapName);
	return import_react.useMemo(() => {
		if (!pairs || !activeMapName) return;
		const pair = pairs.find((p) => p.primaryMapName === activeMapName || p.secondaryMapName === activeMapName);
		if (!pair) return;
		return {
			pair,
			isComparisonPrimary: pair.primaryMapName === activeMapName
		};
	}, [pairs, activeMapName]);
}
function useComparisonMode() {
	return useAppState((state) => {
		if (state.config.comparisonMode) return state.config.comparisonMode;
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
		swipePosition: swipePosition !== null && swipePosition !== void 0 ? swipePosition : 50,
		spyCursorRadius: spyCursorRadius !== null && spyCursorRadius !== void 0 ? spyCursorRadius : 75,
		locale
	};
}
var SWIPE_LABEL_STYLE = {
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
var MapComparisonControl = () => {
	var _pair$primaryLabel, _pair$secondaryLabel, _pair$primaryLabel2, _pair$secondaryLabel2;
	const dispatch = useReduxDispatch();
	const viewer = useMapProviderContext();
	const comparisonInfo = useMapComparisonInfo();
	const { mode, swipePosition, spyCursorRadius, locale } = useComparisonState();
	const containerRef = import_react.useRef(null);
	const [isDragging, setIsDragging] = import_react.useState(false);
	const [spyCursor, setSpyCursor] = import_react.useState(void 0);
	import_react.useEffect(() => {
		if (!viewer.isReady()) return;
		if (!(comparisonInfo === null || comparisonInfo === void 0 ? void 0 : comparisonInfo.pair) || mode === "none") {
			viewer.deactivateMapComparison();
			return () => {
				viewer.deactivateMapComparison();
			};
		}
		const secondaryMapName = comparisonInfo.pair.secondaryMapName;
		if (!(mode === "swipe" ? viewer.activateMapComparisonSwipe(secondaryMapName, swipePosition) : viewer.activateMapComparisonSpy(secondaryMapName, spyCursorRadius))) dispatch(setComparisonMode("none"));
		return () => {
			viewer.deactivateMapComparison();
		};
	}, [
		comparisonInfo,
		dispatch,
		mode,
		spyCursorRadius,
		swipePosition,
		viewer
	]);
	import_react.useEffect(() => {
		if (!viewer.isReady()) return;
		if (mode === "swipe") viewer.updateComparisonSwipePosition(swipePosition);
		else if (mode === "spy") viewer.updateSpyCursorRadius(spyCursorRadius);
	}, [
		mode,
		spyCursorRadius,
		swipePosition,
		viewer
	]);
	import_react.useEffect(() => {
		if (mode !== "spy" || !viewer.isReady()) {
			viewer.updateSpyCursor(void 0);
			return;
		}
		viewer.updateSpyCursor((spyCursor === null || spyCursor === void 0 ? void 0 : spyCursor.visible) ? spyCursor.pixel : void 0);
	}, [
		mode,
		spyCursor,
		viewer
	]);
	import_react.useEffect(() => {
		if (mode !== "spy") {
			setSpyCursor(void 0);
			return;
		}
		const overlayEl = containerRef.current;
		const host = overlayEl === null || overlayEl === void 0 ? void 0 : overlayEl.parentElement;
		if (!overlayEl || !host) return;
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
			if (document.activeElement !== host) return;
			if (event.key === "ArrowUp") {
				dispatch(setSpyCursorRadius(clampSpyCursorRadius(spyCursorRadius + 5)));
				event.preventDefault();
			} else if (event.key === "ArrowDown") {
				dispatch(setSpyCursorRadius(clampSpyCursorRadius(spyCursorRadius - 5)));
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
	}, [
		dispatch,
		mode,
		spyCursorRadius
	]);
	if (mode === "none" || !(comparisonInfo === null || comparisonInfo === void 0 ? void 0 : comparisonInfo.pair)) return null;
	const { pair } = comparisonInfo;
	const handleClose = (e) => {
		e.stopPropagation();
		dispatch(setComparisonMode("none"));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		style: {
			position: "absolute",
			inset: 0,
			pointerEvents: "none",
			zIndex: 10
		},
		children: [mode === "swipe" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onPointerDown: (e) => {
				e.currentTarget.setPointerCapture(e.pointerId);
				setIsDragging(true);
				e.stopPropagation();
			},
			onPointerMove: (e) => {
				if (!isDragging || !containerRef.current) return;
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				position: "absolute",
				top: 0,
				bottom: 0,
				left: "50%",
				width: 3,
				background: "rgba(255,255,255,0.9)",
				boxShadow: "0 0 4px rgba(0,0,0,0.5)",
				transform: "translateX(-50%)",
				pointerEvents: "none"
			} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					width: "20",
					height: "20",
					viewBox: "0 0 20 20",
					fill: "none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M7 4L3 10L7 16M13 4L17 10L13 16",
						stroke: "#555",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				position: "absolute",
				top: 8,
				left: `${swipePosition}%`,
				transform: "translateX(-50%)",
				display: "flex",
				alignItems: "center",
				gap: 6,
				zIndex: 12,
				pointerEvents: "none"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: SWIPE_LABEL_STYLE,
					children: (_pair$primaryLabel = pair.primaryLabel) !== null && _pair$primaryLabel !== void 0 ? _pair$primaryLabel : tr("MAP_SWIPE_PRIMARY_LABEL", locale)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
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
					children: ["✕ ", tr("MAP_SWIPE_CLOSE", locale)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: SWIPE_LABEL_STYLE,
					children: (_pair$secondaryLabel = pair.secondaryLabel) !== null && _pair$secondaryLabel !== void 0 ? _pair$secondaryLabel : tr("MAP_SWIPE_SECONDARY_LABEL", locale)
				})
			]
		})] }), mode === "spy" && (spyCursor === null || spyCursor === void 0 ? void 0 : spyCursor.visible) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
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
		} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { fontWeight: "bold" },
					children: [
						tr("MAP_SWIPE_PRIMARY_LABEL", locale),
						": ",
						(_pair$primaryLabel2 = pair.primaryLabel) !== null && _pair$primaryLabel2 !== void 0 ? _pair$primaryLabel2 : pair.primaryMapName
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { fontWeight: "bold" },
					children: [
						tr("MAP_SWIPE_SECONDARY_LABEL", locale),
						": ",
						(_pair$secondaryLabel2 = pair.secondaryLabel) !== null && _pair$secondaryLabel2 !== void 0 ? _pair$secondaryLabel2 : pair.secondaryMapName
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						opacity: .75,
						fontSize: 10,
						marginTop: 3
					},
					children: tr("MAP_SPY_ESC_HINT", locale)
				})
			]
		})] })]
	});
};
//#endregion
//#region src/containers/add-manage-layers.tsx
init_objectSpread2();
var EMPTY_MANAGE_LAYERS = [];
function zoomToLayerExtents(layerName, viewer) {
	const layer = viewer.getLayerManager().getLayer(layerName);
	const ll_bbox = layer === null || layer === void 0 ? void 0 : layer.get(LayerProperty.WGS84_BBOX);
	if (ll_bbox) {
		const zoomBounds = transformExtent(ll_bbox, "EPSG:4326", viewer.getProjection());
		viewer.zoomToExtent(zoomBounds);
	} else if (layer instanceof VectorLayer) {
		const source = layer.getSource();
		let bounds;
		if (source instanceof Cluster) {
			var _source$getSource;
			bounds = (_source$getSource = source.getSource()) === null || _source$getSource === void 0 ? void 0 : _source$getSource.getExtent();
		} else bounds = source.getExtent();
		const sp = source.getProjection();
		const dp = viewer.getProjection();
		if (sp && dp) bounds = transformExtent(bounds, sp, dp);
		if (Number.isFinite(bounds[0]) && Number.isFinite(bounds[1]) && Number.isFinite(bounds[2]) && Number.isFinite(bounds[3])) viewer.zoomToExtent(bounds);
		else console.warn(`Attempted to zoom to invalid bounds for layer: ${layerName}`);
	}
}
var AddManageLayersContainer = () => {
	var _ref, _comparisonInfo$pair$, _comparisonInfo$pair$2;
	const { TabSet, Icon } = useElementContext();
	const dispatch = useReduxDispatch();
	const locale = useViewerLocale();
	const activeMapName = useActiveMapName();
	const viewer = useMapProviderContext();
	const comparisonInfo = useMapComparisonInfo();
	const isComparisonActive = useIsComparisonActive();
	const [selectedMapForLayers, setSelectedMapForLayers] = import_react.useState(activeMapName);
	import_react.useEffect(() => {
		if (!isComparisonActive) setSelectedMapForLayers(activeMapName);
	}, [isComparisonActive, activeMapName]);
	const targetMapName = isComparisonActive ? selectedMapForLayers !== null && selectedMapForLayers !== void 0 ? selectedMapForLayers : activeMapName : activeMapName;
	const targetLayerManager = import_react.useMemo(() => {
		if (isComparisonActive && targetMapName && targetMapName !== activeMapName) return viewer.getLayerManager(targetMapName);
	}, [
		isComparisonActive,
		targetMapName,
		activeMapName,
		viewer
	]);
	const primaryLayers = useAppState((state) => {
		if (activeMapName && state.mapState[activeMapName]) return state.mapState[activeMapName].layers;
	});
	const manageLayers = useAppState((state) => {
		var _state$mapState$targe;
		if (targetMapName && ((_state$mapState$targe = state.mapState[targetMapName]) === null || _state$mapState$targe === void 0 ? void 0 : _state$mapState$targe.layers)) return state.mapState[targetMapName].layers;
		return EMPTY_MANAGE_LAYERS;
	});
	const view = useAppState((state) => {
		if (targetMapName && state.mapState[targetMapName]) return state.mapState[targetMapName].currentView;
	});
	const getLayerIndex = (layerName) => {
		if (manageLayers) {
			for (let i = 0; i < manageLayers.length; i++) if (manageLayers[i].name === layerName) return i;
		}
		return -1;
	};
	const onLayerAdded = (layer) => {
		if (targetMapName) dispatch(mapLayerAdded(targetMapName, layer));
		if (isComparisonActive) viewer.refreshMapComparison();
	};
	const onAddLayerBusyWorker = (name) => {
		if (targetMapName) dispatch(addMapLayerBusyWorker(targetMapName, name));
	};
	const onRemoveLayerBusyWorker = (name) => {
		if (targetMapName) dispatch(removeMapLayerBusyWorker(targetMapName, name));
	};
	const removeHandler = (layerName) => {
		if (targetMapName) dispatch(removeMapLayer(targetMapName, layerName));
	};
	const upHandler = (layerName) => {
		const newIndex = getLayerIndex(layerName);
		if (targetMapName && newIndex >= 0) dispatch(setMapLayerIndex(targetMapName, layerName, newIndex - 1));
	};
	const downHandler = (layerName) => {
		const newIndex = getLayerIndex(layerName);
		if (manageLayers && targetMapName && newIndex < manageLayers.length - 1) dispatch(setMapLayerIndex(targetMapName, layerName, newIndex + 1));
	};
	const zoomToBounds = (layerName) => {
		if (viewer.isReady()) zoomToLayerExtents(layerName, viewer);
	};
	const setVisibility = (layerName, visible) => {
		if (targetMapName) dispatch(setMapLayerVisibility(targetMapName, layerName, visible));
	};
	const setOpacity = (layerName, value) => {
		if (targetMapName) dispatch(setMapLayerOpacity(targetMapName, layerName, value));
	};
	const setHeatmapBlur = (layerName, value) => {
		if (targetMapName) dispatch(setHeatmapLayerBlur(targetMapName, layerName, value));
	};
	const setHeatmapRadius = (layerName, value) => {
		if (targetMapName) dispatch(setHeatmapLayerRadius(targetMapName, layerName, value));
	};
	const updateVectorStyle = (layerName, value, which) => {
		if (targetMapName) dispatch(setMapLayerVectorStyle(targetMapName, layerName, value, which));
	};
	const comparisonMapSelector = isComparisonActive && comparisonInfo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "center",
			gap: 6,
			marginBottom: 8
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			style: { whiteSpace: "nowrap" },
			children: tr("MAP_SWIPE_LAYER_MANAGER_FOR", locale)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			value: (_ref = selectedMapForLayers !== null && selectedMapForLayers !== void 0 ? selectedMapForLayers : activeMapName) !== null && _ref !== void 0 ? _ref : "",
			onChange: (e) => setSelectedMapForLayers(e.target.value),
			style: { flex: 1 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
				value: comparisonInfo.pair.primaryMapName,
				children: [
					(_comparisonInfo$pair$ = comparisonInfo.pair.primaryLabel) !== null && _comparisonInfo$pair$ !== void 0 ? _comparisonInfo$pair$ : tr("MAP_SWIPE_PRIMARY_LABEL", locale),
					" (",
					comparisonInfo.pair.primaryMapName,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
				value: comparisonInfo.pair.secondaryMapName,
				children: [
					(_comparisonInfo$pair$2 = comparisonInfo.pair.secondaryLabel) !== null && _comparisonInfo$pair$2 !== void 0 ? _comparisonInfo$pair$2 : tr("MAP_SWIPE_SECONDARY_LABEL", locale),
					" (",
					comparisonInfo.pair.secondaryMapName,
					")"
				]
			})]
		})]
	}) : null;
	if (primaryLayers) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { padding: 8 },
		children: [comparisonMapSelector, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabSet, _objectSpread2({}, {
			id: "tabs",
			tabs: [{
				id: "add_layer",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { icon: "new-layer" }),
					" ",
					tr("ADD_LAYER", locale)
				] }),
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddLayer, {
					onLayerAdded,
					onAddLayerBusyWorker,
					onRemoveLayerBusyWorker,
					targetLayerManager,
					locale
				})
			}, {
				id: "manage_layers",
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { icon: "layers" }),
					" ",
					tr("MANAGE_LAYERS", locale)
				] }),
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManageLayers, {
					layers: manageLayers,
					locale,
					currentResolution: view === null || view === void 0 ? void 0 : view.resolution,
					onSetOpacity: setOpacity,
					onSetHeatmapBlur: setHeatmapBlur,
					onSetHeatmapRadius: setHeatmapRadius,
					onSetVisibility: setVisibility,
					onZoomToBounds: zoomToBounds,
					onMoveLayerDown: downHandler,
					onMoveLayerUp: upHandler,
					onRemoveLayer: removeHandler,
					onVectorStyleChanged: updateVectorStyle
				})
			}]
		}))]
	});
	else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
};
//#endregion
//#region src/components/view-size.tsx
var ViewSizeContent = ({ gw, gh, unit }) => {
	const str = fmt("{gw} x {gh} ({unit})", {
		gw,
		gh,
		unit
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { dangerouslySetInnerHTML: { __html: purify.sanitize(str) } });
};
var ViewSize = (props) => {
	const { width, height, view, metersPerUnit, units, precision, locale } = props;
	const uom = getUnitOfMeasure(units);
	const [gw, gh] = getMapSize([width, height], metersPerUnit, units, view.resolution, precision);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "status-bar-component component-view-size",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewSizeContent, {
			gw,
			gh,
			unit: uom.abbreviation(locale)
		})
	});
};
//#endregion
//#region src/containers/view-size.tsx
var ViewSizeContainer = () => {
	const width = useActiveMapWidth();
	const height = useActiveMapHeight();
	const sizeUnits = useViewerSizeUnits();
	const metersPerUnit = useActiveMapMetersPerUnit();
	const view = useActiveMapView();
	const locale = useViewerLocale();
	if (width && height && metersPerUnit && view) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewSize, {
		locale,
		width,
		height,
		view,
		metersPerUnit,
		units: sizeUnits || UnitOfMeasure.Unknown
	});
	else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("noscript", {});
};
//#endregion
//#region src/containers/share-link-to-view.tsx
function NOOP() {}
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
var ShareLinkToViewContainer = () => {
	const { Checkbox, Button } = useElementContext();
	const [showSession, setShowSession] = import_react.useState(false);
	const locale = useViewerLocale();
	const map = useActiveMapState();
	const onShowSessionChanged = () => setShowSession(!showSession);
	const v = useMapProviderContext();
	const onCopied = () => {
		if (v.isReady()) v.toastSuccess("clipboard", tr("SHARE_LINK_COPIED", locale));
	};
	const onCopyToClipboard = function() {
		var _ref = _asyncToGenerator(function* () {
			try {
				var _navigator$clipboard;
				if ((_navigator$clipboard = navigator.clipboard) === null || _navigator$clipboard === void 0 ? void 0 : _navigator$clipboard.writeText) yield navigator.clipboard.writeText(shareUrl);
				else if (!fallbackCopyTextToClipboard(shareUrl)) return;
				onCopied();
			} catch (_unused) {
				if (fallbackCopyTextToClipboard(shareUrl)) onCopied();
			}
		});
		return function onCopyToClipboard() {
			return _ref.apply(this, arguments);
		};
	}();
	const parsed = parseUrl(`${window.location}`);
	if (!showSession) delete parsed.query.session;
	const shareUrl = `${parsed.url}?${stringifyQuery(parsed.query)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			style: {
				width: "100%",
				boxSizing: "border-box",
				border: "none"
			},
			rows: 16,
			readOnly: true,
			value: shareUrl,
			onChange: NOOP
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { padding: 15 },
			children: [map && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				checked: showSession,
				label: tr("SHARE_LINK_INCLUDE_SESSION", locale),
				onChange: onShowSessionChanged
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "primary",
				onClick: onCopyToClipboard,
				children: tr("SHARE_LINK_COPY_CLIPBOARD", locale)
			})]
		})
	] });
};
//#endregion
//#region src/api/default-components.tsx
init_objectSpread2();
/**
* Registers the default set of components
*/
function registerDefaultComponents() {
	registerComponentFactory(DefaultComponentNames.Navigator, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavigatorContainer, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.MouseCoordinates, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MouseCoordinatesContainer, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.ScaleDisplay, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScaleDisplayContainer, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.TaskPane, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskPaneContainer, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.About, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.Measure, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeasureContainer, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.BaseMapSwitcher, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseLayerSwitcherContainer, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.MapMenu, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapMenuContainer, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.ViewSize, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewSizeContainer, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.CoordinateTracker, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinateTrackerContainer, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.AddManageLayers, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddManageLayersContainer, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.ShareLinkToView, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareLinkToViewContainer, _objectSpread2({}, props)));
}
//#endregion
//#region src/actions/app.ts
var app_exports = /* @__PURE__ */ __exportAll({ setAppSetting: () => setAppSetting });
/**
* Sets an app setting to the given value
* 
* @param key 
* @param value 
* @since 0.14.8
*/
function setAppSetting(key, value) {
	return {
		type: ActionType.SET_APP_SETTING,
		payload: {
			key,
			value
		}
	};
}
//#endregion
//#region src/api/layer-manager/format-driver.ts
/**
* A default format driver implementation primarily for interfacing with any
* existing OpenLayers format driver instances
*
* @class FormatDriver
* @since 0.13
*/
var FormatDriver = class {
	constructor(type, format, defaultProjection = null) {
		this.type = type;
		this.format = format;
		this.defaultProjection = defaultProjection;
	}
	tryParse(size, text) {
		var _this = this;
		return _asyncToGenerator(function* () {
			const fs = _this.format.readFeatures(text);
			let bHasPoint = false;
			let bHasLine = false;
			let bHasPoly = false;
			for (const f of fs) {
				const g = f.getGeometry();
				switch (g === null || g === void 0 ? void 0 : g.getType()) {
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
			if (bHasPoint) geomTypes.push("Point");
			if (bHasLine) geomTypes.push("LineString");
			if (bHasPoly) geomTypes.push("Polygon");
			const propNames = [];
			if (fs.length > 0) {
				const first = fs[0];
				for (const k of first.getKeys()) {
					if (k == first.getGeometryName()) continue;
					propNames.push(k);
				}
			}
			const features = function() {
				var _ref = _asyncToGenerator(function* () {
					return fs;
				});
				return function features() {
					return _ref.apply(this, arguments);
				};
			}();
			return new ParsedFeatures(_this.type, size, features, fs.length > 0, geomTypes, propNames, _this.defaultProjection);
		})();
	}
};
//#endregion
//#region src/api/composite-selection.ts
function extend(extent1, extent2) {
	if (extent2[0] < extent1[0]) extent1[0] = extent2[0];
	if (extent2[2] > extent1[2]) extent1[2] = extent2[2];
	if (extent2[1] < extent1[1]) extent1[1] = extent2[1];
	if (extent2[3] > extent1[3]) extent1[3] = extent2[3];
	return extent1;
}
/**
* A layer of a {@link CompositeSelection}
* 
* @since 0.14
*/
var CompositeSelectionLayer = class {
	constructor(layer) {
		this.layer = layer;
		this.features = [];
		if (this.isSelectedLayer(this.layer)) for (const f of this.layer.Feature) this.features.push(f);
		else for (const f of this.layer.features) {
			const fp = [];
			for (const k in f.properties) fp.push({
				Name: k,
				Value: f.properties[k]
			});
			const fb = f.bounds ? f.bounds.join(" ") : void 0;
			this.features.push({
				Bounds: fb,
				Property: fp
			});
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
		if (this.isSelectedLayer(this.layer)) this.layer.Feature.forEach((feat) => {
			const b = feat.Bounds ? feat.Bounds.split(" ").map((s) => parseFloat(s)) : void 0;
			if (b) if (!bounds) bounds = b;
			else bounds = extend(bounds, b);
		});
		else for (const f of this.layer.features) if (f.bounds) if (bounds == null) bounds = f.bounds;
		else bounds = extend(bounds, f.bounds);
		return bounds;
	}
	getLayerId() {
		if (this.isSelectedLayer(this.layer)) return this.layer["@id"];
	}
	getName() {
		if (this.isSelectedLayer(this.layer)) return this.layer["@name"];
		else return this.layer.name;
	}
	getFeatureAt(featureIndex) {
		return this.features[featureIndex];
	}
	getFeatureCount() {
		return this.features.length;
	}
	getLayerMetadata() {
		if (this.isSelectedLayer(this.layer)) return this.layer.LayerMetadata;
	}
};
/**
* A composition of a MapGuide selection set and a client-side vector feature selection
* 
* @since 0.14
*/
var CompositeSelection = class {
	constructor(mgSelection, clientSelection) {
		this.layers = [];
		if (mgSelection) for (const layer of mgSelection.SelectedLayer) this.layers.push(new CompositeSelectionLayer(layer));
		if (clientSelection) for (const layer of clientSelection.layers) this.layers.push(new CompositeSelectionLayer(layer));
	}
	getBounds() {
		if (this.layers.length == 0) return;
		let bounds;
		for (const lyr of this.layers) {
			let layerBounds = lyr.getBounds();
			if (layerBounds) if (bounds) bounds = extend(bounds, layerBounds);
			else bounds = layerBounds;
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
		return layer === null || layer === void 0 ? void 0 : layer.getFeatureAt(featureIndex);
	}
};
//#endregion
//#region src/api/mapguide-commands.ts
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
				const selMethod = (parameters === null || parameters === void 0 ? void 0 : parameters["SelectionType"]) || "INTERSECTS";
				viewer.digitizeCircle((circle) => {
					var _viewer$mapguideSuppo;
					const geom = viewer.getOLFactory().createGeomPolygonFromCircle(circle);
					(_viewer$mapguideSuppo = viewer.mapguideSupport()) === null || _viewer$mapguideSuppo === void 0 || _viewer$mapguideSuppo.selectByGeometry(geom, selMethod);
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
				const selMethod = (parameters === null || parameters === void 0 ? void 0 : parameters["SelectionType"]) || "INTERSECTS";
				viewer.digitizePolygon((geom) => {
					var _viewer$mapguideSuppo2;
					(_viewer$mapguideSuppo2 = viewer.mapguideSupport()) === null || _viewer$mapguideSuppo2 === void 0 || _viewer$mapguideSuppo2.selectByGeometry(geom, selMethod);
				});
			}
		}
	});
	registerCommand(DefaultCommands.ClearSelection, {
		iconClass: SPRITE_SELECT_CLEAR,
		selected: () => false,
		enabled: (state) => CommandConditions.hasSelection(state) || CommandConditions.hasClientSelection(state),
		invoke: (dispatch, getState, viewer) => {
			var _viewer$mapguideSuppo3;
			const st = getState();
			if (st.config.activeMapName) dispatch(clearClientSelection(st.config.activeMapName));
			viewer === null || viewer === void 0 || (_viewer$mapguideSuppo3 = viewer.mapguideSupport()) === null || _viewer$mapguideSuppo3 === void 0 || _viewer$mapguideSuppo3.clearSelection();
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
				if (st.config.activeMapName) cs = st.mapState[st.config.activeMapName].clientSelection;
				const bounds = new CompositeSelection(selection === null || selection === void 0 ? void 0 : selection.SelectedFeatures, cs).getBounds();
				if (bounds) dispatch(setCurrentView(viewer.getViewForExtent(bounds)));
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
				if (parameters === null || parameters === void 0 ? void 0 : parameters["AutogenerateLayerNames"]) {
					if (parameters === null || parameters === void 0 ? void 0 : parameters["StylizationType"]) bUseAdvancedStylization = parameters["StylizationType"] == "advanced";
				}
				if ((parameters === null || parameters === void 0 ? void 0 : parameters["DataStoreFormat"]) && (parameters === null || parameters === void 0 ? void 0 : parameters["RedlineGeometryFormat"])) {
					if (parameters["DataStoreFormat"] == "SDF" || parameters["DataStoreFormat"] == "SHP" || parameters["DataStoreFormat"] == "SQLite") {
						var geomTypes = parseInt(`${parameters["RedlineGeometryFormat"]}`);
						if (parameters["DataStoreFormat"] == "SHP") {
							if (geomTypes == 1 || geomTypes == 2 || geomTypes == 4) {
								defaultDataStoreFormat = parameters["DataStoreFormat"];
								defaultRedlineGeometryType = geomTypes;
								if (parameters === null || parameters === void 0 ? void 0 : parameters["AutoCreateOnStartup"]) bCreateOnStartup = parameters["AutoCreateOnStartup"] == "true";
							}
						} else {
							defaultDataStoreFormat = parameters["DataStoreFormat"];
							defaultRedlineGeometryType = geomTypes;
							if (parameters === null || parameters === void 0 ? void 0 : parameters["AutoCreateOnStartup"]) bCreateOnStartup = parameters["AutoCreateOnStartup"] == "true";
						}
					}
				}
				enableRedlineMessagePrompt((parameters === null || parameters === void 0 ? void 0 : parameters["UseMapMessage"]) == "true");
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
			const state = getState();
			const mapName = state.config.activeMapName;
			if (mapName && viewer) {
				var _mapState$mapguide;
				const mapState = state.mapState[mapName];
				const sf = mapState === null || mapState === void 0 || (_mapState$mapguide = mapState.mapguide) === null || _mapState$mapguide === void 0 || (_mapState$mapguide = _mapState$mapguide.selectionSet) === null || _mapState$mapguide === void 0 ? void 0 : _mapState$mapguide.SelectedFeatures;
				if (sf) {
					let bbox;
					for (const layer of sf.SelectedLayer) for (const f of layer.Feature.filter((f) => f.Bounds != null)) {
						const b = f.Bounds.split(" ").map((s) => parseFloat(s));
						if (!bbox) bbox = b;
						else bbox = extend$1(bbox, b);
					}
					if (bbox) dispatch(setCurrentView(viewer.getViewForExtent(bbox)));
				}
			}
		}
	});
}
//#endregion
//#region src/components/legend.tsx
init_objectSpread2();
var ICON_LEGEND_LAYER = "layer";
var ICON_SELECT = "select";
var ICON_LC_UNSELECT = "disable";
var ICON_LEGEND_THEME = "multi-select";
var ICON_LEGEND_TOGGLE = "chevron-down";
var ICON_LEGEND_TOGGLE_EXPAND = "chevron-right";
var ICON_LEGEND_RASTER = "media";
var ICON_FOLDER_HORIZONTAL = "folder-close";
var ICON_CLEAR = "cross";
var ICON_SEARCH = "search";
var UL_LIST_STYLE = (baseSize) => ({
	listStyle: "none",
	paddingLeft: baseSize + 4,
	marginTop: 2,
	marginBottom: 2
});
var LI_LIST_STYLE = {
	listStyle: "none",
	marginTop: 2,
	marginBottom: 2
};
var ROW_ITEM_ELEMENT_STYLE = {
	display: "inline-flex",
	alignItems: "center",
	verticalAlign: "middle"
};
var CHK_STYLE = (baseSize) => ({
	margin: 0,
	width: `${baseSize - 2}px`,
	height: `${baseSize - 2}px`,
	padding: 0,
	verticalAlign: "middle"
});
var EMPTY_STYLE = (baseSize) => ({
	display: "inline-block",
	margin: 0,
	width: `${baseSize}px`,
	height: `${baseSize}px`,
	verticalAlign: "middle"
});
var EXTRAS_STYLE = (baseSize) => ({
	display: "inline-block",
	margin: 0,
	width: `${baseSize}px`,
	height: `${baseSize}px`,
	verticalAlign: "middle"
});
var LegendLabel = (props) => {
	var _legendCtx$getFilterT;
	const legendCtx = import_react.useContext(LegendContext);
	let inner;
	const ft = (_legendCtx$getFilterT = legendCtx.getFilterText()) === null || _legendCtx$getFilterT === void 0 ? void 0 : _legendCtx$getFilterT.toLocaleLowerCase();
	if (legendCtx.isFiltering() && !strIsNullOrEmpty(ft)) {
		const idx = props.text.toLocaleLowerCase().indexOf(ft);
		if (idx >= 0) {
			inner = props.text.substring(0, idx);
			inner += `<span class='legend-label-highlight-text'>${props.text.substring(idx, idx + ft.length)}</span>`;
			inner += props.text.substring(idx + ft.length, props.text.length);
		} else inner = props.text;
	} else inner = props.text;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "legend-label",
		style: {
			lineHeight: `${props.baseSize}px`,
			verticalAlign: "middle"
		},
		dangerouslySetInnerHTML: { __html: purify.sanitize(inner) }
	});
};
function getIconUri(iconMimeType, iconBase64) {
	if (iconMimeType && iconBase64) return `data:${iconMimeType};base64,${iconBase64}`;
	else return;
}
var EmptyNode = (props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: EMPTY_STYLE(props.baseSize),
		children: "\xA0"
	});
};
var RuleNode = (props) => {
	const icon = getIconUri(props.iconMimeType, props.rule.Icon);
	const label = props.rule.LegendLabel ? props.rule.LegendLabel : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "layer-rule-node",
		style: LI_LIST_STYLE,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNode, { baseSize: props.baseSize }),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				style: ROW_ITEM_ELEMENT_STYLE,
				src: icon
			}),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendLabel, {
				baseSize: props.baseSize,
				text: label
			})
		]
	});
};
var LayerNode = (props) => {
	const { layer } = props;
	const { Icon: BpIcon } = useElementContext();
	const legendCtx = import_react.useContext(LegendContext);
	const [layerVisible, setLayerVisible] = import_react.useState(legendCtx.getLayerVisibility(props.layer));
	const label = layer.LegendLabel ? layer.LegendLabel : "";
	const iconMimeType = legendCtx.getIconMimeType();
	const onVisibilityChanged = (e) => {
		setLayerVisible(e.target.checked);
		legendCtx.setLayerVisibility(layer.ObjectId, e.target.checked);
	};
	const onToggleSelectability = (e) => {
		const selectable = getLayerSelectability(layer.ObjectId);
		legendCtx.setLayerSelectability(layer.ObjectId, !selectable);
	};
	const getExpanded = () => {
		let expanded = legendCtx.getLayerExpanded(layer.ObjectId);
		if (expanded == null) expanded = layer.ExpandInLegend;
		return expanded;
	};
	const onToggleExpansion = (e) => {
		const expanded = getExpanded();
		legendCtx.setLayerExpanded(layer.ObjectId, !expanded);
	};
	const getLayerSelectability = (layerId) => {
		let selectable = legendCtx.getLayerSelectability(layerId);
		if (selectable == null) selectable = layer.Selectable;
		return selectable;
	};
	let text = label;
	let icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		baseSize: legendCtx.getBaseIconSize(),
		style: ROW_ITEM_ELEMENT_STYLE,
		children: (bs) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BpIcon, {
			icon: ICON_LEGEND_LAYER,
			iconSize: bs
		})
	});
	let selectable;
	if (layer.Selectable === true) selectable = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		baseSize: legendCtx.getBaseIconSize(),
		style: ROW_ITEM_ELEMENT_STYLE,
		onClick: onToggleSelectability,
		children: (bs) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BpIcon, {
			icon: getLayerSelectability(layer.ObjectId) ? ICON_SELECT : ICON_LC_UNSELECT,
			iconSize: bs
		})
	});
	let chkbox;
	if (layer.Type == 1) chkbox = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "checkbox",
		className: "layer-checkbox",
		style: CHK_STYLE(legendCtx.getBaseIconSize()),
		value: layer.ObjectId,
		onChange: onVisibilityChanged,
		checked: layerVisible
	});
	const tooltip = label;
	const nodeClassName = "layer-node";
	let nodeStyle = _objectSpread2({
		whiteSpace: "nowrap",
		overflow: "hidden"
	}, LI_LIST_STYLE);
	if (layer.ScaleRange) for (const scaleRange of layer.ScaleRange) if (scaleRange.FeatureStyle && scaleRange.FeatureStyle.length > 0) {
		const ruleElements = [];
		let body;
		let isExpanded = getExpanded();
		let totalRuleCount = 0;
		for (const fts of scaleRange.FeatureStyle) totalRuleCount += fts.Rule.length;
		if (isExpanded && totalRuleCount > 1) {
			icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				baseSize: legendCtx.getBaseIconSize(),
				style: ROW_ITEM_ELEMENT_STYLE,
				children: (bs) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BpIcon, {
					icon: ICON_LEGEND_THEME,
					iconSize: bs
				})
			});
			for (let fi = 0; fi < scaleRange.FeatureStyle.length; fi++) {
				const fts = scaleRange.FeatureStyle[fi];
				const ftsRuleCount = fts.Rule.length;
				let bCompressed = false;
				if (ftsRuleCount > 3) bCompressed = !fts.Rule[1].Icon;
				if (bCompressed) {
					ruleElements.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuleNode, {
						baseSize: legendCtx.getBaseIconSize(),
						iconMimeType,
						rule: fts.Rule[0]
					}, `layer-${layer.ObjectId}-style-${fi}-rule-first`));
					ruleElements.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						style: LI_LIST_STYLE,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendLabel, {
							baseSize: legendCtx.getBaseIconSize(),
							text: tr("OTHER_THEME_RULE_COUNT", legendCtx.getLocale(), { count: ftsRuleCount - 2 })
						})
					}, `layer-${layer.ObjectId}-style-${fi}-rule-compressed`));
					ruleElements.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuleNode, {
						baseSize: legendCtx.getBaseIconSize(),
						iconMimeType,
						rule: fts.Rule[ftsRuleCount - 1]
					}, `layer-${layer.ObjectId}-style-${fi}-rule-last`));
				} else for (let i = 0; i < ftsRuleCount; i++) {
					const rule = fts.Rule[i];
					ruleElements.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuleNode, {
						baseSize: legendCtx.getBaseIconSize(),
						iconMimeType,
						rule
					}, `layer-${layer.ObjectId}-style-${fi}-rule-${i}`));
				}
			}
		} else if (totalRuleCount > 1) icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			style: ROW_ITEM_ELEMENT_STYLE,
			baseSize: legendCtx.getBaseIconSize(),
			children: (bs) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BpIcon, {
				icon: ICON_LEGEND_THEME,
				iconSize: bs
			})
		});
		else {
			const uri = getIconUri(iconMimeType, scaleRange.FeatureStyle[0].Rule[0].Icon);
			if (uri) icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageIcon, {
				style: ROW_ITEM_ELEMENT_STYLE,
				url: uri
			});
		}
		if (ruleElements.length > 0) body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			style: UL_LIST_STYLE(legendCtx.getBaseIconSize()),
			children: ruleElements
		});
		let expanded;
		if (totalRuleCount > 1) expanded = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			baseSize: legendCtx.getBaseIconSize(),
			style: ROW_ITEM_ELEMENT_STYLE,
			onClick: onToggleExpansion,
			children: (bs) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BpIcon, {
				icon: isExpanded ? ICON_LEGEND_TOGGLE : ICON_LEGEND_TOGGLE_EXPAND,
				iconSize: bs
			})
		});
		else expanded = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNode, { baseSize: legendCtx.getBaseIconSize() });
		const mapName = legendCtx.getMapName();
		const session = legendCtx.getSessionId();
		let extras;
		if (mapName && session) {
			var _legendCtx$provideExt, _legendCtx$provideExt2;
			extras = ((_legendCtx$provideExt = (_legendCtx$provideExt2 = legendCtx.provideExtraLayerIconsHtml) === null || _legendCtx$provideExt2 === void 0 ? void 0 : _legendCtx$provideExt2.call(legendCtx, {
				item: layer,
				mapName,
				session,
				sanitize: (html) => purify.sanitize(html),
				elementSize: legendCtx.getBaseIconSize()
			})) !== null && _legendCtx$provideExt !== void 0 ? _legendCtx$provideExt : []).map((html, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: EXTRAS_STYLE(legendCtx.getBaseIconSize()),
				dangerouslySetInnerHTML: { __html: html }
			}, `layer-${layer.ObjectId}-extras-${i}`));
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			title: tooltip,
			style: nodeStyle,
			className: nodeClassName,
			children: [
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendLabel, {
					baseSize: legendCtx.getBaseIconSize(),
					text
				}),
				" ",
				body
			]
		});
	} else icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		baseSize: legendCtx.getBaseIconSize(),
		style: ROW_ITEM_ELEMENT_STYLE,
		children: (bs) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BpIcon, {
			icon: ICON_LEGEND_RASTER,
			iconSize: bs
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		title: tooltip,
		style: nodeStyle,
		className: nodeClassName,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNode, { baseSize: legendCtx.getBaseIconSize() }),
			" ",
			chkbox,
			" ",
			selectable,
			" ",
			icon,
			" ",
			label
		]
	});
};
var ExternalLayerNode = ({ layer }) => {
	const { Icon: BpIcon } = useElementContext();
	const legendCtx = import_react.useContext(LegendContext);
	const nodeClassName = "layer-node";
	const nodeStyle = _objectSpread2({
		whiteSpace: "nowrap",
		overflow: "hidden"
	}, LI_LIST_STYLE);
	const dispatch = useReduxDispatch();
	const onVisibilityChanged = (visible) => {
		const activeMapName = legendCtx.getMapName();
		if (activeMapName) dispatch(setMapLayerVisibility(activeMapName, layer.name, visible));
	};
	const chkbox = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "checkbox",
		className: "layer-checkbox",
		style: CHK_STYLE(legendCtx.getBaseIconSize()),
		onChange: (e) => onVisibilityChanged(e.target.checked),
		checked: layer.visible
	});
	let iconToUse = ICON_LEGEND_LAYER;
	if (layer.type == "WMS") iconToUse = ICON_LEGEND_RASTER;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		style: nodeStyle,
		className: nodeClassName,
		children: [
			chkbox,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				baseSize: legendCtx.getBaseIconSize(),
				style: ROW_ITEM_ELEMENT_STYLE,
				children: (bs) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BpIcon, {
					icon: iconToUse,
					iconSize: bs
				})
			}),
			" ",
			layer.displayName
		]
	});
};
var ExternalLayersGroupNode = ({ layers }) => {
	const { Icon: BpIcon } = useElementContext();
	const legendCtx = import_react.useContext(LegendContext);
	if (layers.length == 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
	else {
		const nodeClassName = "group-node";
		const icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			baseSize: legendCtx.getBaseIconSize(),
			style: ROW_ITEM_ELEMENT_STYLE,
			children: (bs) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BpIcon, {
				icon: ICON_FOLDER_HORIZONTAL,
				iconSize: bs
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			style: _objectSpread2({
				whiteSpace: "nowrap",
				overflow: "hidden"
			}, LI_LIST_STYLE),
			className: nodeClassName,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				icon,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendLabel, {
					baseSize: legendCtx.getBaseIconSize(),
					text: tr("EXTERNAL_LAYERS", legendCtx.getLocale())
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				style: UL_LIST_STYLE(legendCtx.getBaseIconSize()),
				children: layers.map((layer, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLayerNode, { layer }, `external-layer=${layer.name}`))
			})]
		});
	}
};
var GroupNode = (props) => {
	const { Icon: BpIcon } = useElementContext();
	const { group } = props;
	const legendCtx = import_react.useContext(LegendContext);
	const getExpanded = () => {
		let expanded = legendCtx.getGroupExpanded(group.ObjectId);
		if (expanded == null) expanded = group.ExpandInLegend;
		return expanded;
	};
	const onToggleExpansion = (e) => {
		const expanded = getExpanded();
		legendCtx.setGroupExpanded(group.ObjectId, !expanded);
	};
	const onVisibilityChanged = (e) => {
		legendCtx.setGroupVisibility(group.ObjectId, e.target.checked);
	};
	const currentScale = legendCtx.getCurrentScale();
	const tree = legendCtx.getTree();
	const icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		baseSize: legendCtx.getBaseIconSize(),
		style: ROW_ITEM_ELEMENT_STYLE,
		children: (bs) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BpIcon, {
			icon: ICON_FOLDER_HORIZONTAL,
			iconSize: bs
		})
	});
	const isExpanded = getExpanded();
	const expanded = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		baseSize: legendCtx.getBaseIconSize(),
		style: ROW_ITEM_ELEMENT_STYLE,
		onClick: onToggleExpansion,
		children: (bs) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BpIcon, {
			icon: isExpanded ? ICON_LEGEND_TOGGLE : ICON_LEGEND_TOGGLE_EXPAND,
			iconSize: bs
		})
	});
	const chkbox = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "checkbox",
		className: "group-checkbox",
		style: CHK_STYLE(legendCtx.getBaseIconSize()),
		value: group.ObjectId,
		onChange: onVisibilityChanged,
		checked: legendCtx.getGroupVisibility(group)
	});
	const tooltip = group.LegendLabel;
	const nodeClassName = "group-node";
	let nodeStyle = _objectSpread2({
		whiteSpace: "nowrap",
		overflow: "hidden"
	}, LI_LIST_STYLE);
	const mapName = legendCtx.getMapName();
	const session = legendCtx.getSessionId();
	let extras;
	if (mapName && session) {
		var _legendCtx$provideExt3, _legendCtx$provideExt4;
		extras = ((_legendCtx$provideExt3 = (_legendCtx$provideExt4 = legendCtx.provideExtraGroupIconsHtml) === null || _legendCtx$provideExt4 === void 0 ? void 0 : _legendCtx$provideExt4.call(legendCtx, {
			item: group,
			mapName,
			session,
			sanitize: (html) => purify.sanitize(html),
			elementSize: legendCtx.getBaseIconSize()
		})) !== null && _legendCtx$provideExt3 !== void 0 ? _legendCtx$provideExt3 : []).map((html, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: EXTRAS_STYLE(legendCtx.getBaseIconSize()),
			dangerouslySetInnerHTML: { __html: html }
		}, `group-${group.ObjectId}-extras-${i}`));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		title: tooltip,
		style: nodeStyle,
		className: nodeClassName,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			expanded,
			" ",
			chkbox,
			" ",
			extras,
			" ",
			icon,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendLabel, {
				baseSize: legendCtx.getBaseIconSize(),
				text: group.LegendLabel
			})
		] }), (() => {
			if (isExpanded && props.childItems.length > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				style: UL_LIST_STYLE(legendCtx.getBaseIconSize()),
				children: props.childItems.map((item) => {
					if (item.DisplayInLegend === true) {
						if (isLayer(item)) {
							if (isLayerVisibleAtScale(item, currentScale, legendCtx.stateless)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayerNode, { layer: item }, item.ObjectId);
						} else if (isGroupVisibleAtScale(item, tree, currentScale, legendCtx.stateless)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupNode, {
							group: item,
							childItems: tree.groupChildren[item.ObjectId] || []
						}, item.ObjectId);
					}
				})
			});
		})()]
	});
};
function isLayerVisibleAtScale(layer, scale, stateless) {
	if (layer.ScaleRange) {
		for (const sr of layer.ScaleRange) if (scaleRangeBetween(scale, sr.MinScale, sr.MaxScale)) return true;
	} else if (stateless) return true;
	return false;
}
function isGroupVisibleAtScale(group, tree, scale, stateless) {
	const children = tree.groupChildren[group.ObjectId] || [];
	for (const child of children) if (isLayer(child)) {
		if (isLayerVisibleAtScale(child, scale, stateless)) return true;
	} else if (isGroupVisibleAtScale(child, tree, scale, stateless)) return true;
	if (stateless) return true;
	return false;
}
function itemTextFilter(items, text) {
	return items.map((i) => {
		if (isLayer(i)) {
			if (i.LegendLabel.toLocaleLowerCase().indexOf(text) < 0) return null;
			return i;
		} else return i;
	}).filter((i) => i != null);
}
function buildFilteredTree(tree, text) {
	const filtered = {
		root: itemTextFilter(tree.root, text),
		groupChildren: {}
	};
	const keys = Object.keys(tree.groupChildren);
	for (const oid of keys) filtered.groupChildren[oid] = itemTextFilter(tree.groupChildren[oid], text);
	return filtered;
}
function setupTree(map) {
	var _map$Layer, _map$Group;
	const state = {
		Layers: (_map$Layer = map === null || map === void 0 ? void 0 : map.Layer) !== null && _map$Layer !== void 0 ? _map$Layer : [],
		Groups: (_map$Group = map === null || map === void 0 ? void 0 : map.Group) !== null && _map$Group !== void 0 ? _map$Group : [],
		LayerMap: {},
		GroupMap: {},
		tree: {
			root: [],
			groupChildren: {}
		}
	};
	if (map === null || map === void 0 ? void 0 : map.Layer) for (const layer of map.Layer) state.LayerMap[layer.ObjectId] = layer;
	if (map === null || map === void 0 ? void 0 : map.Group) for (const group of map.Group) state.GroupMap[group.ObjectId] = group;
	const { Layers, Groups, LayerMap, GroupMap } = state;
	const { root, groupChildren } = state.tree;
	if (Groups) {
		const remainingGroups = {};
		for (const group of Groups) {
			groupChildren[group.ObjectId] = [];
			if (group.ParentId) {
				remainingGroups[group.ObjectId] = group;
				continue;
			}
			root.push(group);
		}
		var itemCount = 0;
		for (const objId in remainingGroups) itemCount++;
		while (itemCount > 0) {
			var removeIds = [];
			for (const objId in remainingGroups) {
				var group = remainingGroups[objId];
				if (typeof groupChildren[group.ParentId] != "undefined") {
					if (typeof groupChildren[group.ObjectId] != "undefined") groupChildren[group.ObjectId] = [];
					groupChildren[group.ParentId].push(group);
					removeIds.push(group.ObjectId);
				}
			}
			for (const id of removeIds) delete remainingGroups[id];
			itemCount = 0;
			for (const objId in remainingGroups) itemCount++;
		}
	}
	if (Layers) for (const layer of Layers) if (layer.ParentId) {
		if (typeof groupChildren[layer.ParentId] === "undefined") groupChildren[layer.ParentId] = [];
		groupChildren[layer.ParentId].push(layer);
	} else root.push(layer);
	return state;
}
var DEFAULT_ICON_SIZE = 16;
var FILTER_BUTTON_STYLE = {
	position: "absolute",
	right: 0,
	top: 0
};
/**
* The Legend component provides a component to view the layer structure, its styles and thematics and
* the ability to toggle the group/layer visibility of the current map
* @param props 
*/
var Legend = (props) => {
	var _props$map2, _props$baseIconSize2;
	const { Button, Card, InputGroup, Heading, MenuComponent } = useElementContext();
	const { showGroups, hideGroups, showLayers, hideLayers, currentScale, externalBaseLayers, onBaseLayerChanged, maxHeight, map } = props;
	const [state, setState] = import_react.useState(setupTree(map));
	const { tree: _tree } = state;
	const [isFiltering, setIsFiltering] = import_react.useState(false);
	const [filterText, setFilterText] = import_react.useState("");
	const [filteredTree, setFilteredTree] = import_react.useState(void 0);
	const [showInvisibleLayers, setShowInvisibleLayers] = import_react.useState(false);
	const [contextMenu, setContextMenu] = import_react.useState(void 0);
	import_react.useEffect(() => {
		onExitFilterMode();
		setState(setupTree(map));
	}, [map]);
	const onEnterFilterMode = import_react.useCallback(() => {
		setIsFiltering(true);
		setFilterText("");
		setFilteredTree(_tree);
	}, []);
	const onExitFilterMode = import_react.useCallback(() => {
		setIsFiltering(false);
		setFilterText("");
		setFilteredTree(void 0);
	}, []);
	const onFilterUpdate = import_react.useCallback((text) => {
		setFilterText(text);
		if (strIsNullOrEmpty(text)) setFilteredTree(_tree);
		else setFilteredTree(buildFilteredTree(_tree, text.toLocaleLowerCase()));
	}, [_tree]);
	const getLayerSelectability = import_react.useCallback((layerId) => {
		var _props$overrideSelect;
		return ((_props$overrideSelect = props.overrideSelectableLayers) !== null && _props$overrideSelect !== void 0 ? _props$overrideSelect : {})[layerId];
	}, [props.overrideSelectableLayers]);
	const setLayerSelectability = import_react.useCallback((layerId, selectable) => {
		var _props$onLayerSelecta;
		(_props$onLayerSelecta = props.onLayerSelectabilityChanged) === null || _props$onLayerSelecta === void 0 || _props$onLayerSelecta.call(props, layerId, selectable);
	}, [props.onLayerSelectabilityChanged]);
	const getGroupExpanded = import_react.useCallback((groupId) => {
		var _props$overrideExpand;
		return ((_props$overrideExpand = props.overrideExpandedItems) !== null && _props$overrideExpand !== void 0 ? _props$overrideExpand : {})[groupId];
	}, [props.overrideExpandedItems]);
	const setGroupExpanded = import_react.useCallback((groupId, expanded) => {
		var _props$onGroupExpansi;
		(_props$onGroupExpansi = props.onGroupExpansionChanged) === null || _props$onGroupExpansi === void 0 || _props$onGroupExpansi.call(props, groupId, expanded);
	}, [props.onGroupExpansionChanged]);
	const getLayerExpanded = import_react.useCallback((layerId) => {
		var _props$overrideExpand2;
		return ((_props$overrideExpand2 = props.overrideExpandedItems) !== null && _props$overrideExpand2 !== void 0 ? _props$overrideExpand2 : {})[layerId];
	}, [props.overrideExpandedItems]);
	const setLayerExpanded = import_react.useCallback((layerId, expanded) => {
		var _props$onGroupExpansi2;
		(_props$onGroupExpansi2 = props.onGroupExpansionChanged) === null || _props$onGroupExpansi2 === void 0 || _props$onGroupExpansi2.call(props, layerId, expanded);
	}, [props.onGroupExpansionChanged]);
	const getGroupVisibility = import_react.useCallback((group) => {
		let visible = group.Visible;
		if (showGroups && showGroups.indexOf(group.ObjectId) >= 0) visible = true;
		else if (hideGroups && hideGroups.indexOf(group.ObjectId) >= 0) visible = false;
		return visible;
	}, [showGroups, hideGroups]);
	const getLayerVisibility = import_react.useCallback((layer) => {
		let visible = layer.Visible;
		if (showLayers && showLayers.indexOf(layer.ObjectId) >= 0) visible = true;
		else if (hideLayers && hideLayers.indexOf(layer.ObjectId) >= 0) visible = false;
		return visible;
	}, [showLayers, hideLayers]);
	const setGroupVisibility = import_react.useCallback((groupId, visible) => {
		var _props$onGroupVisibil;
		(_props$onGroupVisibil = props.onGroupVisibilityChanged) === null || _props$onGroupVisibil === void 0 || _props$onGroupVisibil.call(props, groupId, visible);
	}, [props.onGroupVisibilityChanged]);
	const setLayerVisibility = import_react.useCallback((layerId, visible) => {
		var _props$onLayerVisibil;
		(_props$onLayerVisibil = props.onLayerVisibilityChanged) === null || _props$onLayerVisibil === void 0 || _props$onLayerVisibil.call(props, layerId, visible);
	}, [props.onLayerVisibilityChanged]);
	const getIconMimeType = import_react.useCallback(() => {
		var _props$map;
		return ((_props$map = props.map) === null || _props$map === void 0 ? void 0 : _props$map.IconMimeType) ? `${props.map.IconMimeType}` : void 0;
	}, [(_props$map2 = props.map) === null || _props$map2 === void 0 ? void 0 : _props$map2.IconMimeType]);
	const getChildren = import_react.useCallback((objectId) => {
		var _tree$groupChildren$o;
		return (_tree$groupChildren$o = _tree.groupChildren[objectId]) !== null && _tree$groupChildren$o !== void 0 ? _tree$groupChildren$o : [];
	}, [_tree]);
	const onExpandAll = import_react.useCallback(() => {
		if (map === null || map === void 0 ? void 0 : map.Layer) for (const layer of map.Layer) {
			var _props$onGroupExpansi3;
			(_props$onGroupExpansi3 = props.onGroupExpansionChanged) === null || _props$onGroupExpansi3 === void 0 || _props$onGroupExpansi3.call(props, layer.ObjectId, true);
		}
		if (map === null || map === void 0 ? void 0 : map.Group) for (const group of map.Group) {
			var _props$onGroupExpansi4;
			(_props$onGroupExpansi4 = props.onGroupExpansionChanged) === null || _props$onGroupExpansi4 === void 0 || _props$onGroupExpansi4.call(props, group.ObjectId, true);
		}
		setContextMenu(void 0);
	}, [map, props.onGroupExpansionChanged]);
	const onCollapseAll = import_react.useCallback(() => {
		if (map === null || map === void 0 ? void 0 : map.Layer) for (const layer of map.Layer) {
			var _props$onGroupExpansi5;
			(_props$onGroupExpansi5 = props.onGroupExpansionChanged) === null || _props$onGroupExpansi5 === void 0 || _props$onGroupExpansi5.call(props, layer.ObjectId, false);
		}
		if (map === null || map === void 0 ? void 0 : map.Group) for (const group of map.Group) {
			var _props$onGroupExpansi6;
			(_props$onGroupExpansi6 = props.onGroupExpansionChanged) === null || _props$onGroupExpansi6 === void 0 || _props$onGroupExpansi6.call(props, group.ObjectId, false);
		}
		setContextMenu(void 0);
	}, [map, props.onGroupExpansionChanged]);
	const onSetAllSelectable = import_react.useCallback((selectable) => {
		if (map === null || map === void 0 ? void 0 : map.Layer) {
			for (const layer of map.Layer) if (layer.Selectable) {
				var _props$onLayerSelecta2;
				(_props$onLayerSelecta2 = props.onLayerSelectabilityChanged) === null || _props$onLayerSelecta2 === void 0 || _props$onLayerSelecta2.call(props, layer.ObjectId, selectable);
			}
		}
		setContextMenu(void 0);
	}, [map, props.onLayerSelectabilityChanged]);
	const onContextMenuHandler = import_react.useCallback((e) => {
		e.preventDefault();
		setContextMenu({
			x: e.clientX,
			y: e.clientY
		});
	}, []);
	const onCloseContextMenu = import_react.useCallback(() => {
		setContextMenu(void 0);
	}, []);
	import_react.useEffect(() => {
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
	const rootStyle = { position: "relative" };
	if (maxHeight) rootStyle.maxHeight = maxHeight;
	const providerImpl = {
		stateless: props.stateless,
		isFiltering: () => isFiltering,
		getFilterText: () => filterText,
		getLocale: () => props.locale,
		getMapName: () => props.activeMapName,
		getSessionId: () => {
			var _props$map3;
			return (_props$map3 = props.map) === null || _props$map3 === void 0 ? void 0 : _props$map3.SessionId;
		},
		getBaseIconSize: () => {
			var _props$baseIconSize;
			return (_props$baseIconSize = props.baseIconSize) !== null && _props$baseIconSize !== void 0 ? _props$baseIconSize : DEFAULT_ICON_SIZE;
		},
		getIconMimeType,
		getChildren,
		getCurrentScale: () => props.currentScale,
		getTree: () => isFiltering && filteredTree ? filteredTree : state.tree,
		getGroupVisibility,
		getLayerVisibility,
		setGroupVisibility,
		setLayerVisibility,
		getLayerSelectability,
		setLayerSelectability,
		getGroupExpanded,
		setGroupExpanded,
		getLayerExpanded,
		setLayerExpanded,
		provideExtraGroupIconsHtml: props.provideExtraGroupIconsHtml,
		provideExtraLayerIconsHtml: props.provideExtraLayerIconsHtml
	};
	const daTree = providerImpl.getTree();
	const rootItems = daTree.root;
	const contextMenuItems = import_react.useMemo(() => {
		const items = [];
		if (props.onRefresh) {
			items.push({
				label: tr("LEGEND_CONTEXT_MENU_REFRESH", props.locale),
				invoke: () => {
					var _props$onRefresh;
					(_props$onRefresh = props.onRefresh) === null || _props$onRefresh === void 0 || _props$onRefresh.call(props);
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
	}, [
		props.onRefresh,
		props.locale,
		onExpandAll,
		onCollapseAll,
		onSetAllSelectable,
		showInvisibleLayers
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendContext.Provider, {
		value: providerImpl,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: rootStyle,
			onContextMenu: onContextMenuHandler,
			children: [
				contextMenu && document.body && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mg-legend-context-menu",
					style: {
						position: "fixed",
						top: contextMenu.y,
						left: contextMenu.x,
						zIndex: 9999
					},
					onMouseDown: (e) => e.stopPropagation(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuComponent, {
						items: contextMenuItems,
						onInvoked: onCloseContextMenu
					})
				}), document.body),
				(() => {
					if (externalBaseLayers != null && externalBaseLayers.length > 0 && props.inlineBaseLayerSwitcher) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						style: { marginBottom: 10 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
							level: 5,
							children: tr("EXTERNAL_BASE_LAYERS", props.locale)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseLayerSwitcher, {
							locale: props.locale,
							externalBaseLayers,
							onBaseLayerChanged
						})]
					});
				})(),
				(() => {
					if (isFiltering) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup, {
						round: true,
						autoFocus: true,
						leftIcon: ICON_SEARCH,
						placeholder: tr("LEGEND_FILTER_LAYERS", props.locale),
						onChange: (e) => onFilterUpdate(e.target.value),
						rightElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							minimal: true,
							icon: ICON_CLEAR,
							onClick: onExitFilterMode
						})
					});
					else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: onEnterFilterMode,
						title: tr("LEGEND_FILTER_LAYERS", props.locale),
						icon: ICON_SEARCH,
						style: FILTER_BUTTON_STYLE
					});
				})(),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					style: UL_LIST_STYLE((_props$baseIconSize2 = props.baseIconSize) !== null && _props$baseIconSize2 !== void 0 ? _props$baseIconSize2 : DEFAULT_ICON_SIZE),
					children: [rootItems.map((item) => {
						if (item.DisplayInLegend === true) if (isLayer(item)) {
							if (showInvisibleLayers || isLayerVisibleAtScale(item, currentScale, props.stateless)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayerNode, { layer: item }, item.ObjectId);
						} else {
							const bGroupVisAtScale = isGroupVisibleAtScale(item, daTree, currentScale, props.stateless);
							let bGroupVisFilter = false;
							if (providerImpl.isFiltering()) {
								if (item.LegendLabel.toLocaleLowerCase().indexOf(providerImpl.getFilterText().toLocaleLowerCase()) >= 0) bGroupVisFilter = true;
							}
							if (showInvisibleLayers || bGroupVisAtScale || bGroupVisFilter) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupNode, {
								group: item,
								childItems: daTree.groupChildren[item.ObjectId] || []
							}, item.ObjectId);
						}
					}), props.externalLayers && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLayersGroupNode, { layers: props.externalLayers })]
				})
			]
		})
	});
};
//#endregion
//#region src/containers/legend.tsx
var LegendContainer = (props) => {
	/**
	* TODO: Although we've nailed down the majority of excessive re-renders on un-related events, there are still one case
	* where it should not re-render but currently does: Panning
	* 
	* Panning does not alter zoom/scale or layer/group structure, things that the Legend does not care about, so what is it?
	* Another mis-behaving hook? Something else?
	*/
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
	const appContext = import_react.useContext(AppContext);
	const setBaseLayerAction = import_react.useCallback((mapName, layerName) => dispatch(setBaseLayer(mapName, layerName)), [dispatch]);
	const setGroupVisibilityAction = import_react.useCallback((mapName, options) => dispatch(setGroupVisibility(mapName, options)), [dispatch]);
	const setLayerVisibilityAction = import_react.useCallback((mapName, options) => dispatch(setLayerVisibility(mapName, options)), [dispatch]);
	const setLayerSelectableAction = import_react.useCallback((mapName, options) => dispatch(setLayerSelectable(mapName, options)), [dispatch]);
	const setGroupExpandedAction = import_react.useCallback((mapName, options) => dispatch(setGroupExpanded(mapName, options)), [dispatch]);
	const layers = useActiveMapLayers();
	const onLayerSelectabilityChanged = import_react.useCallback((id, selectable) => {
		if (activeMapName) setLayerSelectableAction === null || setLayerSelectableAction === void 0 || setLayerSelectableAction(activeMapName, {
			id,
			value: selectable
		});
	}, [setLayerSelectableAction, activeMapName]);
	const onGroupExpansionChanged = import_react.useCallback((id, expanded) => {
		if (setGroupExpandedAction && activeMapName) setGroupExpandedAction(activeMapName, {
			id,
			value: expanded
		});
	}, [setGroupExpandedAction, activeMapName]);
	const onGroupVisibilityChanged = import_react.useCallback((groupId, visible) => {
		if (setGroupVisibilityAction && activeMapName) setGroupVisibilityAction(activeMapName, {
			id: groupId,
			value: visible
		});
	}, [setGroupVisibilityAction, activeMapName]);
	const onLayerVisibilityChanged = import_react.useCallback((layerId, visible) => {
		if (setLayerVisibilityAction && activeMapName) setLayerVisibilityAction(activeMapName, {
			id: layerId,
			value: visible
		});
	}, [setLayerVisibilityAction, activeMapName]);
	const onBaseLayerChanged = import_react.useCallback((layerName) => {
		if (setBaseLayerAction && activeMapName) setBaseLayerAction(activeMapName, layerName);
	}, [setBaseLayerAction, activeMapName]);
	const onRefresh = import_react.useCallback(() => {
		dispatch(refresh());
	}, [dispatch]);
	if ((map || layers) && view) {
		let scale = view.scale;
		if (scale || layers) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
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
		});
		else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: tr("LOADING_MSG", locale) });
	} else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: tr("LOADING_MSG", locale) });
};
//#endregion
//#region src/api/selection-count.ts
function isSelectedFeatureSet(ss) {
	return ss.SelectedLayer;
}
function countSelection(mgSelection, clientSelection) {
	const summary = {
		total: 0,
		layerCount: 0
	};
	if (mgSelection) if (isSelectedFeatureSet(mgSelection)) {
		summary.layerCount = mgSelection.SelectedLayer.length;
		for (const lyr of mgSelection.SelectedLayer) {
			var _lyr$Feature$length, _lyr$Feature;
			summary.total += (_lyr$Feature$length = (_lyr$Feature = lyr.Feature) === null || _lyr$Feature === void 0 ? void 0 : _lyr$Feature.length) !== null && _lyr$Feature$length !== void 0 ? _lyr$Feature$length : 0;
		}
	} else {
		summary.layerCount = mgSelection.Layer.length;
		for (const lyr of mgSelection.Layer) {
			var _lyr$Class$ID$length, _lyr$Class;
			summary.total += (_lyr$Class$ID$length = (_lyr$Class = lyr.Class) === null || _lyr$Class === void 0 || (_lyr$Class = _lyr$Class.ID) === null || _lyr$Class === void 0 ? void 0 : _lyr$Class.length) !== null && _lyr$Class$ID$length !== void 0 ? _lyr$Class$ID$length : 0;
		}
	}
	if (clientSelection) {
		summary.layerCount = clientSelection.layers.length;
		for (const lyr of clientSelection.layers) {
			var _lyr$features$length, _lyr$features;
			summary.total += (_lyr$features$length = (_lyr$features = lyr.features) === null || _lyr$features === void 0 ? void 0 : _lyr$features.length) !== null && _lyr$features$length !== void 0 ? _lyr$features$length : 0;
		}
	}
	if (summary.total == 0 && summary.layerCount == 0) return;
	return summary;
}
//#endregion
//#region src/components/selected-feature-count.tsx
/**
* Displays the number of selected features on the map
*/
var SelectedFeatureCount = (props) => {
	const format = props.format || tr("FMT_SELECTION_COUNT", props.locale);
	let label;
	if (props.summary) label = fmt(format, props.summary);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "status-bar-component component-selected-feature-count",
		style: props.style,
		children: label
	});
};
//#endregion
//#region src/containers/selected-feature-count.tsx
var SelectedFeatureCountContainer = (props) => {
	const { style } = props;
	const selection = useActiveMapSelectionSet();
	const clientSelection = useActiveMapClientSelectionSet();
	const locale = useViewerLocale();
	const summary = countSelection(selection === null || selection === void 0 ? void 0 : selection.FeatureSet, clientSelection);
	if (summary) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectedFeatureCount, {
		locale,
		style,
		summary
	});
	else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {});
};
//#endregion
//#region src/components/selection-panel.tsx
var DefaultSelectedFeature = (props) => {
	const { selectedFeature, selectedLayer, layerName, locale, allowHtmlValues, cleanHTML, formatPropertyValue } = props;
	const { HtmlTable } = useElementContext();
	const featureProps = [];
	if (selectedLayer === null || selectedLayer === void 0 ? void 0 : selectedLayer.Property) for (const lp of selectedLayer.Property) {
		const matches = selectedFeature.Property.filter((fp) => fp.Name === lp.DisplayName);
		if (matches.length === 1) featureProps.push(matches[0]);
	}
	else for (const fp of selectedFeature.Property) featureProps.push(fp);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HtmlTable, {
		condensed: true,
		bordered: true,
		className: "selection-panel-property-grid",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: tr("SELECTION_PROPERTY", locale) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: tr("SELECTION_VALUE", locale) })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: featureProps.map((prop) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "property-name-cell",
				"data-property-name": prop.Name,
				children: prop.Name
			}), (() => {
				const context = {
					propertyName: prop.Name,
					layerName
				};
				let value = prop.Value;
				if (formatPropertyValue && !strIsNullOrEmpty(value)) value = formatPropertyValue(value, context);
				if (allowHtmlValues && !strIsNullOrEmpty(value)) {
					if (cleanHTML) value = cleanHTML(value, context);
					else value = purify.sanitize(value);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "property-value-cell",
						"data-property-value-for": prop.Name,
						dangerouslySetInnerHTML: { __html: value }
					});
				} else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "property-value-cell",
					"data-property-value-for": prop.Name,
					children: value
				});
			})()] }, prop.Name);
		}) })]
	});
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
var SELECTION_TOOLBAR_STYLE = {
	float: "right",
	height: 29
};
var SELECTION_PANEL_TOOLBAR_STYLE = {
	height: 29,
	backgroundColor: TOOLBAR_BACKGROUND_COLOR
};
var LAYER_COMBO_STYLE = {
	float: "left",
	height: 29
};
var FloatClear = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { clear: "both" } });
/**
* Displays attributes of selected features with the ability to zoom in on selected features
* @param props 
*/
var SelectionPanel = import_react.memo((props) => {
	const { Callout } = useElementContext();
	const { maxHeight, selection, selectedFeatureRenderer, allowHtmlValues, cleanHTML, formatPropertyValue, onShowSelectedFeature, onRequestZoomToFeature } = props;
	const [selectedLayerIndex, setSelectedLayerIndex] = import_react.useState(-1);
	const [featureIndex, setFeatureIndex] = import_react.useState(-1);
	import_react.useEffect(() => {
		if (selection.getLayerCount() > 0) if (selectedLayerIndex < 0) {
			setSelectedLayerIndex(0);
			setFeatureIndex(0);
		} else {
			const sl = selection.getLayerAt(selectedLayerIndex);
			if (!sl) {
				setSelectedLayerIndex(0);
				setFeatureIndex(0);
			} else if (featureIndex < 0 && sl.getFeatureCount() > 0) setFeatureIndex(0);
		}
	}, [selection]);
	const getCurrentLayer = () => {
		return selection.getLayerAt(selectedLayerIndex);
	};
	const getFeatureAt = (index) => {
		return selection.getFeatureAt(selectedLayerIndex, index);
	};
	const getCurrentFeature = () => {
		return getFeatureAt(featureIndex);
	};
	const canGoPrev = () => {
		return featureIndex > 0;
	};
	const canGoNext = () => {
		const layer = getCurrentLayer();
		if (layer != null) return featureIndex + 1 < layer.getFeatureCount();
		return false;
	};
	const canZoomSelectedFeature = () => {
		const feat = getCurrentFeature();
		return (feat === null || feat === void 0 ? void 0 : feat.Bounds) != null;
	};
	const prevFeature = () => {
		const newIndex = featureIndex - 1;
		setFeatureIndex(newIndex);
		const layer = getCurrentLayer();
		if (layer) {
			var _getFeatureAt;
			const layerId = layer.getLayerId();
			const sKey = (_getFeatureAt = getFeatureAt(newIndex)) === null || _getFeatureAt === void 0 ? void 0 : _getFeatureAt.SelectionKey;
			if (sKey && layerId) onShowSelectedFeature === null || onShowSelectedFeature === void 0 || onShowSelectedFeature(layerId, sKey);
		}
	};
	const nextFeature = () => {
		const newIndex = featureIndex + 1;
		setFeatureIndex(newIndex);
		const layer = getCurrentLayer();
		if (layer) {
			var _getFeatureAt2;
			const layerId = layer.getLayerId();
			const sKey = (_getFeatureAt2 = getFeatureAt(newIndex)) === null || _getFeatureAt2 === void 0 ? void 0 : _getFeatureAt2.SelectionKey;
			if (sKey && layerId) onShowSelectedFeature === null || onShowSelectedFeature === void 0 || onShowSelectedFeature(layerId, sKey);
		}
	};
	const zoomSelectedFeature = () => {
		const feat = getCurrentFeature();
		if (feat) onRequestZoomToFeature(feat);
	};
	const onSelectedLayerChanged = (index) => {
		setSelectedLayerIndex(index);
		setFeatureIndex(0);
	};
	const locale = props.locale || "en";
	let feat;
	let meta;
	let layerName;
	if (selection != null && selectedLayerIndex >= 0 && featureIndex >= 0) {
		const selLayer = selection.getLayerAt(selectedLayerIndex);
		feat = selLayer === null || selLayer === void 0 ? void 0 : selLayer.getFeatureAt(featureIndex);
		meta = selLayer === null || selLayer === void 0 ? void 0 : selLayer.getLayerMetadata();
		layerName = selLayer === null || selLayer === void 0 ? void 0 : selLayer.getName();
	}
	const selectionPanelRootStyle = {};
	let selBodyStyle;
	if (maxHeight) {
		selectionPanelRootStyle.overflow = "hidden";
		selBodyStyle = {
			overflowY: "auto",
			maxHeight: maxHeight - 29
		};
	} else {
		selectionPanelRootStyle.position = "relative";
		selectionPanelRootStyle.width = "100%";
		selectionPanelRootStyle.height = "100%";
		selectionPanelRootStyle.overflow = "hidden";
		selBodyStyle = {
			overflow: "auto",
			position: "absolute",
			top: 29,
			bottom: 0,
			right: 0,
			left: 0
		};
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: selectionPanelRootStyle,
		children: [(() => {
			if ((selection === null || selection === void 0 ? void 0 : selection.getLayerCount()) > 0) {
				const selectionToolbarItems = buildToolbarItems({
					locale,
					canGoPrev,
					canGoNext,
					prevFeature,
					nextFeature,
					canZoomSelectedFeature,
					zoomSelectedFeature
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "selection-panel-toolbar",
					style: SELECTION_PANEL_TOOLBAR_STYLE,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypedSelect, {
							extraClassNames: "selection-panel-layer-selector",
							value: selectedLayerIndex,
							style: LAYER_COMBO_STYLE,
							onChange: onSelectedLayerChanged,
							keyFunc: (item) => `selected-layer-${item.value}`,
							items: selection.getLayers().map((layer, index) => {
								var _props$onResolveLayer, _props$onResolveLayer2;
								const lid = layer.getLayerId();
								const lname = layer.getName();
								return {
									value: index,
									label: lid ? (_props$onResolveLayer = props === null || props === void 0 || (_props$onResolveLayer2 = props.onResolveLayerLabel) === null || _props$onResolveLayer2 === void 0 ? void 0 : _props$onResolveLayer2.call(props, lid, lname)) !== null && _props$onResolveLayer !== void 0 ? _props$onResolveLayer : lname : lname
								};
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {
							childItems: selectionToolbarItems,
							containerStyle: SELECTION_TOOLBAR_STYLE
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatClear, {})
					]
				});
			}
		})(), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "selection-panel-body",
			style: selBodyStyle,
			children: (() => {
				if (feat) if (selectedFeatureRenderer) return selectedFeatureRenderer({
					selectedFeature: feat,
					cleanHTML,
					formatPropertyValue,
					allowHtmlValues,
					selectedLayer: meta,
					layerName,
					locale
				});
				else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultSelectedFeature, {
					selectedFeature: feat,
					cleanHTML,
					formatPropertyValue,
					allowHtmlValues,
					selectedLayer: meta,
					layerName,
					locale
				});
				else if (!((selection === null || selection === void 0 ? void 0 : selection.getLayerCount()) > 0)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
					variant: "primary",
					icon: "info-sign",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "selection-panel-no-selection",
						children: tr("NO_SELECTED_FEATURES", locale)
					})
				});
			})()
		})]
	});
});
//#endregion
//#region src/containers/selection-panel.tsx
var selectorContainerStyle = {
	display: "flex",
	alignItems: "center",
	gap: 6,
	marginBottom: 8
};
var selectorLabelStyle = { whiteSpace: "nowrap" };
var selectorSelectStyle = { flex: 1 };
var swipeSelectionRootStyle = {
	display: "flex",
	flexDirection: "column",
	height: "100%"
};
var swipeSelectionPanelSlotStyle = {
	position: "relative",
	flex: 1,
	minHeight: 0
};
/**
* Container component for the Selection Panel. When the viewer is in split (swipe) mode,
* an additional dropdown is rendered so the user can choose which map's selection to display.
*
* @since 0.15
* @hidden
*/
var SelectionPanelContainer = (props) => {
	var _ref, _comparisonInfo$pair$, _comparisonInfo$pair$2;
	const { Callout } = useElementContext();
	const { maxHeight, selectedFeatureRenderer } = props;
	const locale = useViewerLocale();
	const dispatch = useReduxDispatch();
	const activeMapName = useActiveMapName();
	const isComparisonActive = useIsComparisonActive();
	const comparisonInfo = useMapComparisonInfo();
	const [selectedMapForSelection, setSelectedMapForSelection] = import_react.useState(activeMapName);
	import_react.useEffect(() => {
		if (!isComparisonActive) setSelectedMapForSelection(activeMapName);
	}, [isComparisonActive, activeMapName]);
	const targetMapName = isComparisonActive ? selectedMapForSelection !== null && selectedMapForSelection !== void 0 ? selectedMapForSelection : activeMapName : activeMapName;
	const map = useAppState((state) => {
		if (targetMapName && state.mapState[targetMapName]) {
			var _state$mapState$targe;
			return (_state$mapState$targe = state.mapState[targetMapName].mapguide) === null || _state$mapState$targe === void 0 ? void 0 : _state$mapState$targe.runtimeMap;
		}
	});
	const selection = useAppState((state) => {
		if (targetMapName && state.mapState[targetMapName]) {
			var _state$mapState$targe2, _state$mapState$targe3;
			return (_state$mapState$targe2 = (_state$mapState$targe3 = state.mapState[targetMapName].mapguide) === null || _state$mapState$targe3 === void 0 ? void 0 : _state$mapState$targe3.selectionSet) !== null && _state$mapState$targe2 !== void 0 ? _state$mapState$targe2 : null;
		}
		return null;
	});
	const clientSelection = useAppState((state) => {
		if (targetMapName && state.mapState[targetMapName]) return state.mapState[targetMapName].clientSelection;
	});
	const setCurrentViewAction = (view) => dispatch(setCurrentView(view));
	const showSelectedFeatureAction = (mapName, layerId, selectionKey) => dispatch(showSelectedFeature(mapName, layerId, selectionKey));
	const appContext = import_react.useContext(AppContext);
	const viewer = useMapProviderContext();
	const onZoomToSelectedFeature = (feature) => {
		if (feature.Bounds) {
			const bbox = feature.Bounds.split(" ").map((s) => parseFloat(s));
			if (viewer.isReady()) setCurrentViewAction(viewer.getViewForExtent(bbox));
		}
	};
	const resolveLayerLabel = (layerId, _) => {
		var _map$Layer, _map$Layer$filter;
		const layer = map === null || map === void 0 || (_map$Layer = map.Layer) === null || _map$Layer === void 0 || (_map$Layer$filter = _map$Layer.filter) === null || _map$Layer$filter === void 0 || (_map$Layer$filter = _map$Layer$filter.call(_map$Layer, (l) => l.ObjectId == layerId)) === null || _map$Layer$filter === void 0 ? void 0 : _map$Layer$filter[0];
		if (layer) return layer.LegendLabel;
	};
	const onShowSelectedFeature = (layerId, selectionKey) => {
		if (targetMapName) showSelectedFeatureAction(targetMapName, layerId, selectionKey);
	};
	const comparisonMapSelector = isComparisonActive && comparisonInfo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: selectorContainerStyle,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: "selection-panel-map-select",
			style: selectorLabelStyle,
			children: tr("MAP_SWIPE_SELECTION_FOR", locale)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			id: "selection-panel-map-select",
			value: (_ref = selectedMapForSelection !== null && selectedMapForSelection !== void 0 ? selectedMapForSelection : activeMapName) !== null && _ref !== void 0 ? _ref : "",
			onChange: (e) => setSelectedMapForSelection(e.target.value),
			style: selectorSelectStyle,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
				value: comparisonInfo.pair.primaryMapName,
				children: [
					(_comparisonInfo$pair$ = comparisonInfo.pair.primaryLabel) !== null && _comparisonInfo$pair$ !== void 0 ? _comparisonInfo$pair$ : tr("MAP_SWIPE_PRIMARY_LABEL", locale),
					" (",
					comparisonInfo.pair.primaryMapName,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
				value: comparisonInfo.pair.secondaryMapName,
				children: [
					(_comparisonInfo$pair$2 = comparisonInfo.pair.secondaryLabel) !== null && _comparisonInfo$pair$2 !== void 0 ? _comparisonInfo$pair$2 : tr("MAP_SWIPE_SECONDARY_LABEL", locale),
					" (",
					comparisonInfo.pair.secondaryMapName,
					")"
				]
			})]
		})]
	}) : null;
	const withSwipeSelectorLayout = (content) => {
		if (comparisonMapSelector) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: swipeSelectionRootStyle,
			children: [comparisonMapSelector, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: swipeSelectionPanelSlotStyle,
				children: content
			})]
		});
		return content;
	};
	const compSel = new CompositeSelection(selection === null || selection === void 0 ? void 0 : selection.SelectedFeatures, clientSelection);
	if ((selection === null || selection === void 0 ? void 0 : selection.SelectedFeatures) != null || clientSelection) return withSwipeSelectorLayout(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionPanel, {
		locale,
		onResolveLayerLabel: resolveLayerLabel,
		allowHtmlValues: appContext.allowHtmlValuesInSelection(),
		cleanHTML: appContext.getHTMLCleaner(),
		formatPropertyValue: appContext.getPropertyValueFormatter(),
		selection: compSel,
		onRequestZoomToFeature: onZoomToSelectedFeature,
		onShowSelectedFeature,
		selectedFeatureRenderer,
		maxHeight
	}) }));
	else return withSwipeSelectorLayout(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
		variant: "primary",
		icon: "info-sign",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "selection-panel-no-selection",
			children: tr("NO_SELECTED_FEATURES", locale)
		})
	}) }));
};
//#endregion
//#region src/components/pbmg.tsx
init_objectSpread2();
/**
* "Powered by MapGuide" logo
* @param props
*/
var PoweredByMapGuide = (props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", _objectSpread2(_objectSpread2({ className: "status-bar-component component-pbmg" }, props), {}, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageIcon, {
		style: { display: "block" },
		spriteClass: "PoweredBy_en"
	}) }));
};
//#endregion
//#region src/components/session-expired.tsx
function reload(e) {
	e.preventDefault();
	window.location.reload();
	return false;
}
/**
* Displays the "session expired" error message with possible recovery actions
* @param props
*/
var SessionExpired = (props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "component-session-expired",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tr("SESSION_EXPIRED_DETAILED", props.locale) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: tr("SESSION_EXPIRED_AVAILABLE_ACTIONS", props.locale) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#",
				onClick: reload,
				children: tr("SESSION_EXPIRED_RELOAD_VIEWER", props.locale)
			}) }) })
		]
	});
};
//#endregion
//#region src/containers/viewer-options.tsx
var ViewerOptions = () => {
	var _useActiveMapExternal;
	const { Slider, Select, Heading, Switch, FormGroup } = useElementContext();
	const externalBaseLayers = (_useActiveMapExternal = useActiveMapExternalBaseLayers()) === null || _useActiveMapExternal === void 0 ? void 0 : _useActiveMapExternal.filter((ebl) => isVisualBaseLayer(ebl));
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
	const setLayerTransparencyAction = (mapName, id, opacity) => dispatch(setLayerTransparency(mapName, id, opacity));
	const setViewSizeDisplayUnitsAction = (units) => dispatch(setViewSizeUnits(units));
	const onMgLayerOpacityChanged = (mapName, layerId, value) => {
		if (mapName) setLayerTransparencyAction === null || setLayerTransparencyAction === void 0 || setLayerTransparencyAction(mapName, layerId, value);
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
		if (value !== void 0) setViewSizeDisplayUnitsAction(parseInt(value, 10));
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
		if ("LAYER_ID_BASE" in layerTransparency) opBase = layerTransparency[LAYER_ID_BASE];
		if ("LAYER_ID_MG_BASE" in layerTransparency) opMgBase = layerTransparency[LAYER_ID_MG_BASE];
		if ("LAYER_ID_MG_DYNAMIC_OVERLAY" in layerTransparency) opMgDynamicOverlay = layerTransparency[LAYER_ID_MG_DYNAMIC_OVERLAY];
		if ("LAYER_ID_MG_SEL_OVERLAY" in layerTransparency) opMgSelOverlay = layerTransparency[LAYER_ID_MG_SEL_OVERLAY];
	}
	let hasMgBaseLayers = false;
	let isStateless = stateless;
	if (!map) isStateless = true;
	else {
		var _map$FiniteDisplaySca, _map$FiniteDisplaySca2;
		hasMgBaseLayers = ((_map$FiniteDisplaySca = (_map$FiniteDisplaySca2 = map.FiniteDisplayScale) === null || _map$FiniteDisplaySca2 === void 0 ? void 0 : _map$FiniteDisplaySca2.length) !== null && _map$FiniteDisplaySca !== void 0 ? _map$FiniteDisplaySca : 0) > 0;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "component-viewer-options",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				level: 5,
				children: tr("VIEWER_OPTIONS", locale)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
			!isStateless && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				checked: featureTooltipsEnabled,
				onChange: onFeatureTooltipsChanged,
				label: tr("FEATURE_TOOLTIPS", locale)
			}),
			(() => {
				if (!isStateless && featureTooltipsEnabled) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: manualFeatureTooltips,
					onChange: onManualFeatureTooltipsChanged,
					label: tr("MANUAL_FEATURE_TOOLTIPS", locale)
				});
			})(),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				checked: selectDragPanEnabled,
				onChange: onSelectDragPanEnabled,
				label: tr("ENABLE_SELECT_DRAGPAN", locale)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: tr("LAYER_TRANSPARENCY", locale) }),
				(() => {
					if (externalBaseLayers) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
						label: tr("LAYER_ID_BASE", locale),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								paddingLeft: 8,
								paddingRight: 8
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 0,
								max: 1,
								stepSize: .01,
								value: opBase,
								onChange: onBaseOpacityChanged
							})
						})
					});
				})(),
				hasMgBaseLayers && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
					label: tr("LAYER_ID_MG_BASE_LAYERS", locale),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							paddingLeft: 8,
							paddingRight: 8
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: 0,
							max: 1,
							stepSize: .01,
							value: opMgBase,
							onChange: onMgOpacityChanged
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
					label: map ? tr("LAYER_ID_MG_BASE", locale) : tr("LAYER_ID_SUBJECT", locale),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							paddingLeft: 8,
							paddingRight: 8
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: 0,
							max: 1,
							stepSize: .01,
							value: opMgDynamicOverlay,
							onChange: onMgDynamicOverlayOpacityChanged
						})
					})
				}),
				!isStateless && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
					label: tr("LAYER_ID_MG_SEL_OVERLAY", locale),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							paddingLeft: 8,
							paddingRight: 8
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: 0,
							max: 1,
							stepSize: .01,
							value: opMgSelOverlay,
							onChange: onMgSelOpacityChanged
						})
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
				label: tr("MAP_SIZE_DISPLAY_UNITS", locale),
				labelFor: "viewSizeUnitsSelect",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					id: "viewSizeUnitsSelect",
					value: `${viewSizeUnits}`,
					onChange: onViewSizeUnitsChanged,
					items: units.map((uom) => ({
						value: `${uom}`,
						label: getUnitOfMeasure(uom).localizedName(locale)
					}))
				})
			})
		]
	});
};
//#endregion
//#region src/containers/map-capturer-context.ts
var MapCapturerContext = class {
	constructor(viewer, mapName, rotation = 0) {
		this.viewer = viewer;
		this.mapName = mapName;
		this.rotation = rotation;
		this.features = new Collection();
		this.mapCapturerSource = new VectorSource({ features: this.features });
		this.mapCapturerLayer = new VectorLayer({ source: this.mapCapturerSource });
		this.intTranslate = new Translate({ features: this.features });
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
			const poly = this.features.item(0).getGeometry();
			const boxCoords = poly.getCoordinates()[0].map((c) => `${c[0]},${c[1]}`).join(",");
			const npoly = poly.clone();
			const ncenter = getCenter(npoly.getExtent());
			npoly.rotate(deg2rad(this.rotation), ncenter);
			const nBoxCoords = npoly.getCoordinates()[0].map((c) => `${c[0]},${c[1]}`).join(",");
			this.activeCallback.updateBoxCoords(boxCoords, nBoxCoords);
		}
	}
	updateBox(paperSize, scaleDenominator, rotation) {
		if (this.activeCallback) {
			this.rotation = rotation;
			let poly;
			if (this.features.getLength() == 0) poly = this.createCaptureBox(paperSize, scaleDenominator, this.rotation);
			else {
				poly = this.features.item(0).getGeometry();
				const center = getCenter(poly.getExtent());
				const origin = {
					x: center[0],
					y: center[1]
				};
				const ring = this.getRing(origin, paperSize, scaleDenominator);
				poly.setCoordinates(ring);
				poly.rotate(-deg2rad(this.rotation), center);
			}
			const boxCoords = poly.getCoordinates()[0].map((c) => `${c[0]},${c[1]}`).join(",");
			const npoly = poly.clone();
			const ncenter = getCenter(npoly.getExtent());
			npoly.rotate(deg2rad(this.rotation), ncenter);
			const nBoxCoords = npoly.getCoordinates()[0].map((c) => `${c[0]},${c[1]}`).join(",");
			this.activeCallback.updateBoxCoords(boxCoords, nBoxCoords);
		}
	}
	createCaptureBox(paperSize, scaleDenominator, rotation) {
		const origin = this.viewer.getCurrentView();
		const poly = new Polygon(this.getRing(origin, paperSize, scaleDenominator));
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
};
//#endregion
//#region src/containers/quick-plot.tsx
var PAPER_SIZES = [
	{
		value: "210.0,297.0,A4",
		label: "A4 (210x297 mm; 8.27x11.69 In) "
	},
	{
		value: "297.0,420.0,A3",
		label: "A3 (297x420 mm; 11.69x16.54 In) "
	},
	{
		value: "148.0,210.0,A5",
		label: "A5 (148x210 mm; 5.83x8.27 in) "
	},
	{
		value: "216.0,279.0,Letter",
		label: "Letter (216x279 mm; 8.50x11.00 In) "
	},
	{
		value: "216.0,356.0,Legal",
		label: "Legal (216x356 mm; 8.50x14.00 In) "
	}
];
var DPIS = [
	{
		value: "96",
		label: "96"
	},
	{
		value: "150",
		label: "150"
	},
	{
		value: "300",
		label: "300"
	},
	{
		value: "600",
		label: "600"
	}
];
var SCALES = [
	{
		value: "500",
		label: "1: 500"
	},
	{
		value: "1000",
		label: "1: 1000"
	},
	{
		value: "2500",
		label: "1: 2500"
	},
	{
		value: "5000",
		label: "1: 5000"
	}
];
function getMargin() {
	return {
		top: 25.4,
		buttom: 12.7,
		left: 12.7,
		right: 12.7
	};
}
function getPrintSize(viewer, showAdvanced, paperSize, orientation) {
	const value = paperSize.split(",");
	let size;
	if (orientation === "P") size = {
		w: parseFloat(value[0]),
		h: parseFloat(value[1])
	};
	else size = {
		w: parseFloat(value[1]),
		h: parseFloat(value[0])
	};
	if (!showAdvanced) {
		const paperRatio = size.w / size.h;
		var viewSize = viewer.getSize();
		let vs;
		if (orientation === "P") vs = {
			w: viewSize[1],
			h: viewSize[0]
		};
		else vs = {
			w: viewSize[0],
			h: viewSize[1]
		};
		if (vs) {
			const viewRatio = vs.w / vs.h;
			if (paperRatio > viewRatio) size.w = size.h * viewRatio;
			else size.h = size.w / viewRatio;
		}
	}
	const margins = getMargin();
	size.h = size.h - margins.top - margins.buttom;
	size.w = size.w - margins.left - margins.right;
	return size;
}
var _mapCapturers = [];
function getActiveCapturer(viewer, mapNames, activeMapName) {
	let activeCapturer;
	if (_mapCapturers.length == 0) {
		if (mapNames.length) for (const mapName of mapNames) {
			const context = new MapCapturerContext(viewer, mapName);
			_mapCapturers.push(context);
			if (activeMapName == mapName) activeCapturer = context;
		}
	} else activeCapturer = _mapCapturers.filter((m) => m.getMapName() === activeMapName)[0];
	return activeCapturer;
}
function toggleMapCapturerLayer(locale, viewer, mapNames, activeMapName, showAdvanced, paperSize, orientation, scale, rotation, updateBoxCoords, setViewRotationEnabled, setViewRotation) {
	const bVisible = showAdvanced;
	if (viewer.isReady() && mapNames) {
		const activeCapturer = getActiveCapturer(viewer, mapNames, activeMapName);
		if (activeCapturer) if (bVisible) {
			const ppSize = getPrintSize(viewer, showAdvanced, paperSize, orientation);
			const cb = { updateBoxCoords };
			activeCapturer.activate(cb, ppSize, parseFloat(scale), rotation);
			setViewRotationEnabled(false);
			setViewRotation(0);
			viewer.toastPrimary("info-sign", tr("QUICKPLOT_BOX_INFO", locale));
		} else {
			activeCapturer.deactivate();
			setViewRotationEnabled(true);
		}
	}
}
var QuickPlotContainer = () => {
	var _useAvailableMaps, _useActiveMapExternal;
	const { Slider, Callout, Button, Select, FormGroup, InputGroup, Checkbox } = useElementContext();
	const [title, setTitle] = import_react.useState("");
	const [subTitle, setSubTitle] = import_react.useState("");
	const [showLegend, setShowLegend] = import_react.useState(false);
	const [showNorthBar, setShowNorthBar] = import_react.useState(false);
	const [showCoordinates, setShowCoordinates] = import_react.useState(false);
	const [showScaleBar, setShowScaleBar] = import_react.useState(false);
	const [showDisclaimer, setShowDisclaimer] = import_react.useState(false);
	const [showAdvanced, setShowAdvanced] = import_react.useState(false);
	const [orientation, setOrientation] = import_react.useState("P");
	const [paperSize, setPaperSize] = import_react.useState("210.0,297.0,A4");
	const [scale, setScale] = import_react.useState("5000");
	const [dpi, setDpi] = import_react.useState("96");
	const [rotation, setRotation] = import_react.useState(0);
	const [box, setBox] = import_react.useState("");
	const [normalizedBox, setNormalizedBox] = import_react.useState("");
	const viewer = useMapProviderContext();
	const locale = useViewerLocale();
	const activeMapName = useActiveMapName();
	const mapNames = (_useAvailableMaps = useAvailableMaps()) === null || _useAvailableMaps === void 0 ? void 0 : _useAvailableMaps.map((m) => m.value);
	const map = useActiveMapState();
	const view = useActiveMapView();
	const externalBaseLayers = (_useActiveMapExternal = useActiveMapExternalBaseLayers()) === null || _useActiveMapExternal === void 0 ? void 0 : _useActiveMapExternal.filter((ebl) => isVisualBaseLayer(ebl));
	const dispatch = useReduxDispatch();
	const setViewRotationAction = (rotation) => dispatch(setViewRotation(rotation));
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
	const onGeneratePlot = () => {};
	const updateBoxCoords = (box, normalizedBox) => {
		setBox(box);
		setNormalizedBox(normalizedBox);
	};
	import_react.useEffect(() => {
		return () => {
			if (viewer.isReady() && mapNames) for (const activeMapName of mapNames) {
				const activeCapturer = getActiveCapturer(viewer, mapNames, activeMapName);
				if (activeCapturer) {
					debug(`De-activating map capturer for: ${activeMapName}`);
					activeCapturer.deactivate();
				}
			}
		};
	}, []);
	const prevShowAdvanced = usePrevious(showAdvanced);
	import_react.useEffect(() => {
		if (activeMapName && mapNames) {
			if (showAdvanced != prevShowAdvanced) toggleMapCapturerLayer(locale, viewer, mapNames, activeMapName, showAdvanced, paperSize, orientation, scale, rotation, updateBoxCoords, setViewRotationEnabledAction, setViewRotationAction);
			if (showAdvanced) {
				if (viewer.isReady()) {
					const capturer = getActiveCapturer(viewer, mapNames, activeMapName);
					if (capturer) {
						const ppSize = getPrintSize(viewer, showAdvanced, paperSize, orientation);
						debug(`Updating map capturer for: ${activeMapName}`);
						capturer.updateBox(ppSize, parseFloat(scale), rotation);
					}
				}
			}
		}
	}, [
		mapNames,
		activeMapName,
		showAdvanced,
		scale,
		paperSize,
		orientation,
		rotation,
		locale
	]);
	if (!viewer.isReady() || !map || !view) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("noscript", {});
	let hasExternalBaseLayers = false;
	if (externalBaseLayers) hasExternalBaseLayers = externalBaseLayers.length > 0;
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
	const ORIENTATIONS = [{
		value: "P",
		label: tr("QUICKPLOT_ORIENTATION_P", locale)
	}, {
		value: "L",
		label: tr("QUICKPLOT_ORIENTATION_L", locale)
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "component-quick-plot",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			id: "Form1",
			name: "Form1",
			target: "_blank",
			method: "post",
			action: url,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "hidden",
					id: "printId",
					name: "printId",
					value: `${Math.random() * 1e3}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "Title FixWidth",
					children: tr("QUICKPLOT_HEADER", locale)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
					label: tr("QUICKPLOT_TITLE", locale),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup, {
						name: "{field:title}",
						id: "title",
						value: title,
						onChange: onTitleChanged
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
					label: tr("QUICKPLOT_SUBTITLE", locale),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup, {
						name: "{field:sub_title}",
						id: "subtitle",
						value: subTitle,
						onChange: onSubTitleChanged
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
					label: tr("QUICKPLOT_PAPER_SIZE", locale),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypedSelect, {
						fill: true,
						id: "paperSizeSelect",
						name: "paperSizeSelect",
						value: paperSize,
						onChange: (e) => setPaperSize(e),
						items: PAPER_SIZES
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
					label: tr("QUICKPLOT_ORIENTATION", locale),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypedSelect, {
						fill: true,
						id: "orientation",
						name: "orientation",
						value: orientation,
						onChange: (e) => setOrientation(e),
						items: ORIENTATIONS
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "hidden",
					id: "paperSize",
					name: "paperSize",
					value: ppSize
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "hidden",
					id: "printSize",
					name: "printSize",
					value: prSize
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: tr("QUICKPLOT_SHOWELEMENTS", locale) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						id: "ShowLegendCheckBox",
						name: "ShowLegend",
						checked: showLegend,
						onChange: onShowLegendChanged,
						label: tr("QUICKPLOT_SHOWLEGEND", locale)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						id: "ShowNorthArrowCheckBox",
						name: "ShowNorthArrow",
						checked: showNorthBar,
						onChange: onShowNorthArrowChanged,
						label: tr("QUICKPLOT_SHOWNORTHARROW", locale)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						id: "ShowCoordinatesCheckBox",
						name: "ShowCoordinates",
						checked: showCoordinates,
						onChange: onShowCoordinatesChanged,
						label: tr("QUICKPLOT_SHOWCOORDINTES", locale)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						id: "ShowScaleBarCheckBox",
						name: "ShowScaleBar",
						checked: showScaleBar,
						onChange: onShowScaleBarChanged,
						label: tr("QUICKPLOT_SHOWSCALEBAR", locale)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						id: "ShowDisclaimerCheckBox",
						name: "ShowDisclaimer",
						checked: showDisclaimer,
						onChange: onShowDisclaimerChanged,
						label: tr("QUICKPLOT_SHOWDISCLAIMER", locale)
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "HPlaceholder5px" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					id: "AdvancedOptionsCheckBox",
					onChange: onAdvancedOptionsChanged,
					label: tr("QUICKPLOT_ADVANCED_OPTIONS", locale)
				}) }),
				(() => {
					if (showAdvanced) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
							label: tr("QUICKPLOT_SCALING", locale),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypedSelect, {
								fill: true,
								id: "scaleDenominator",
								name: "scaleDenominator",
								value: scale,
								onChange: (e) => setScale(e),
								items: SCALES
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
							label: tr("QUICKPLOT_DPI", locale),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypedSelect, {
								fill: true,
								id: "dpi",
								name: "dpi",
								onChange: (e) => setDpi(e),
								items: DPIS
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormGroup, {
							label: tr("QUICKPLOT_BOX_ROTATION", locale),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									paddingLeft: 16,
									paddingRight: 16
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									min: 0,
									max: 360,
									labelStepSize: 90,
									stepSize: 1,
									value: rotation,
									onChange: onRotationChanged
								})
							})
						})
					] });
					else return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "hidden",
						id: "scaleDenominator",
						name: "scaleDenominator",
						value: `${view.scale}`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "hidden",
						id: "dpi",
						name: "dpi",
						value: dpi
					})] });
				})(),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "HPlaceholder5px" }),
				(() => {
					if (hasExternalBaseLayers) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
						variant: "primary",
						icon: "info-sign",
						children: tr("QUICKPLOT_COMMERCIAL_LAYER_WARNING", locale)
					});
				})(),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ButtonContainer FixWidth",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "primary",
						icon: "print",
						onClick: onGeneratePlot,
						children: tr("QUICKPLOT_GENERATE", locale)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "hidden",
					id: "margin",
					name: "margin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "hidden",
					id: "normalizedBox",
					name: "normalizedBox",
					value: normBox
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "hidden",
					id: "rotation",
					name: "rotation",
					value: -(rotation || 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "hidden",
					id: "sessionId",
					name: "sessionId",
					value: map.SessionId
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "hidden",
					id: "mapName",
					name: "mapName",
					value: map.Name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "hidden",
					id: "box",
					name: "box",
					value: theBox
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "hidden",
					id: "legalNotice",
					name: "legalNotice"
				})
			]
		})
	});
};
//#endregion
//#region src/api/mapguide-components.tsx
init_objectSpread2();
function registerMapGuideComponents() {
	registerComponentFactory(DefaultComponentNames.Legend, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendContainer, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.SelectionPanel, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionPanelContainer, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.SelectedFeatureCount, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectedFeatureCountContainer, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.PoweredByMapGuide, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PoweredByMapGuide, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.SessionExpired, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionExpired, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.ViewerOptions, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerOptions, _objectSpread2({}, props)));
	registerComponentFactory(DefaultComponentNames.QuickPlot, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickPlotContainer, _objectSpread2({}, props)));
}
//#endregion
//#region src/components/tooltips/mouse.ts
var HIDDEN_CLASS_NAME = "tooltip-hidden";
/**
* @hidden
*/
var MouseTrackingTooltip = class {
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
		if (this.isContextMenuOpen()) return;
		this.tooltip.setPosition(e.coordinate);
		if (this.text) this.tooltipElement.classList.remove(HIDDEN_CLASS_NAME);
		else this.tooltipElement.classList.add(HIDDEN_CLASS_NAME);
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
		if (this.tooltipElement && this.tooltipElement.parentNode) this.tooltipElement.parentNode.removeChild(this.tooltipElement);
	}
};
//#endregion
//#region src/components/tooltips/selected-features.ts
function defaultPopupContentRenderer(feat, locale, popupConfig) {
	var _popupConfig$title, _getClusterSubFeature;
	let html = "";
	const bClustered = isClusteredFeature(feat);
	let title = (_popupConfig$title = popupConfig === null || popupConfig === void 0 ? void 0 : popupConfig.title) !== null && _popupConfig$title !== void 0 ? _popupConfig$title : tr("SEL_FEATURE_PROPERTIES", locale);
	const size = (_getClusterSubFeature = getClusterSubFeatures(feat)) === null || _getClusterSubFeature === void 0 ? void 0 : _getClusterSubFeature.length;
	if (bClustered && size > 1) {
		var _popupConfig$clustere, _popupConfig$clustere2;
		title = (_popupConfig$clustere = popupConfig === null || popupConfig === void 0 || (_popupConfig$clustere2 = popupConfig.clusteredTitle) === null || _popupConfig$clustere2 === void 0 ? void 0 : _popupConfig$clustere2.call(popupConfig, size)) !== null && _popupConfig$clustere !== void 0 ? _popupConfig$clustere : tr("SEL_CLUSTER_PROPERTIES", locale, { size });
	}
	html += "<div class='selected-popup-header'><div>" + purify.sanitize(title) + "</div><a id='feat-popup-closer' class='closer' href='#'>[x]</a><div class='clearit'></div></div>";
	const renderForMultipleSanitized = (subFeatures) => {
		let table = "<table class='selected-popup-cluster-table'>";
		const fheadings = (popupConfig === null || popupConfig === void 0 ? void 0 : popupConfig.propertyMappings) ? popupConfig.propertyMappings.filter((pm) => pm.name != subFeatures[0].getGeometryName()).map((pm) => pm.value) : Object.keys(subFeatures[0].getProperties()).filter((pn) => pn != subFeatures[0].getGeometryName());
		const fprops = (popupConfig === null || popupConfig === void 0 ? void 0 : popupConfig.propertyMappings) ? popupConfig.propertyMappings.map((pm) => pm.value) : Object.keys(subFeatures[0].getProperties()).filter((pn) => pn != subFeatures[0].getGeometryName());
		table += "<thead><tr>";
		for (const heading of fheadings) table += `<th>${purify.sanitize(heading)}</th>`;
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
		let linkFragment;
		let table = "<table class='selected-popup-single-properties-table'>";
		table += "<tbody>";
		const f = feature.getProperties();
		let pc = 0;
		if (popupConfig === null || popupConfig === void 0 ? void 0 : popupConfig.propertyMappings) for (const pm of popupConfig.propertyMappings) {
			if (pm.name == feat.getGeometryName()) continue;
			table += "<tr>";
			table += "<td class='property-name-cell'>" + purify.sanitize(pm.value) + "</td>";
			table += "<td class='property-value-cell'>" + purify.sanitize(f[pm.name]) + "</td>";
			table += "</tr>";
			pc++;
		}
		else for (const key in f) {
			if (key == feat.getGeometryName()) continue;
			table += "<tr>";
			table += "<td class='property-name-cell'>" + purify.sanitize(key) + "</td>";
			table += "<td class='property-value-cell'>" + purify.sanitize(f[key]) + "</td>";
			table += "</tr>";
			pc++;
		}
		table += "</tbody>";
		table += "</table>";
		if (popupConfig === null || popupConfig === void 0 ? void 0 : popupConfig.linkProperty) {
			const { name, label, linkTarget } = popupConfig.linkProperty;
			let linkHref;
			if (typeof name == "string") linkHref = encodeURI(f[name]);
			else {
				var _name$placeholderBegi, _name$placeholderEnd;
				const expr = name.expression;
				let url = expr;
				const pBegin = (_name$placeholderBegi = name.placeholderBegin) !== null && _name$placeholderBegi !== void 0 ? _name$placeholderBegi : "{";
				const pEnd = (_name$placeholderEnd = name.placeholderEnd) !== null && _name$placeholderEnd !== void 0 ? _name$placeholderEnd : "}";
				const tokens = extractPlaceholderTokens(expr, pBegin, pEnd);
				for (const t of tokens) {
					var _f$t;
					const al = encodeURIComponent((_f$t = f[t]) !== null && _f$t !== void 0 ? _f$t : "");
					url = strReplaceAll(url, `${pBegin}${t}${pEnd}`, al);
				}
				linkHref = url;
			}
			if (!strIsNullOrEmpty(linkHref)) linkFragment = `<div class='select-popup-single-link-wrapper'><a href="${purify.sanitize(linkHref)}" target='${purify.sanitize(linkTarget)}'>${purify.sanitize(label)}</a></div>`;
		}
		return [
			table,
			pc,
			linkFragment
		];
	};
	const singlePopupContentRender = (feature, appendHtml) => {
		const [table, pc, linkFragment] = renderForSingleSanitized(feature);
		if (pc > 0) appendHtml(`<div class='selected-popup-content-wrapper'>${table}</div>`);
		else appendHtml("<div class='selected-popup-content-none'>" + purify.sanitize(tr("SEL_FEATURE_PROPERTIES_NONE", locale)) + "</div>");
		if (!strIsNullOrEmpty(linkFragment)) appendHtml(linkFragment);
	};
	if (bClustered) {
		const subFeatures = getClusterSubFeatures(feat);
		if (subFeatures.length == 1) singlePopupContentRender(subFeatures[0], (h) => html += h);
		else {
			const table = renderForMultipleSanitized(subFeatures);
			html += `<div class='selected-popup-content-wrapper'>${table}</div>`;
		}
	} else singlePopupContentRender(feat, (h) => html += h);
	return html;
}
/**
* @hidden
*/
var SelectedFeaturesTooltip = class {
	constructor(map, parent) {
		this.parent = parent;
		this.setPopupCloseHandler = () => {
			if (this.closerEl) this.closerEl.onclick = this.closePopup;
		};
		this.closePopup = (e) => {
			e.preventDefault();
			this.hide();
			if (this.closerEl) this.closerEl.onclick = null;
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
		var _this = this;
		return _asyncToGenerator(function* () {
			let selected = 0;
			const client = new Client("", "mapagent");
			const format = new GeoJSON();
			const wmsSources = [];
			const currentWmsSource = currentLayerSet === null || currentLayerSet === void 0 ? void 0 : currentLayerSet.tryGetWmsSource();
			if (currentWmsSource) wmsSources.push(currentWmsSource);
			const layers = layerMgr.getLayers().filter((l) => l.visible && l.selectable && l.type == "WMS");
			for (const layer of layers) {
				const wmsLayer = layerMgr.getLayer(layer.name);
				if (wmsLayer instanceof ImageLayer || wmsLayer instanceof TileLayer) {
					const source = wmsLayer.getSource();
					if (source instanceof ImageWMS || source instanceof TileWMS) wmsSources.push([wmsLayer, source]);
				}
			}
			for (const pair of wmsSources) {
				const [layer, source] = pair;
				let url = source.getFeatureInfoUrl(coord, resolution, _this.map.getView().getProjection(), { "INFO_FORMAT": "application/json" });
				if (url) {
					var _json$features;
					const layerName = layer.get(LayerProperty.LAYER_NAME);
					const augs = callback.getWmsRequestAugmentations();
					if (augs[layerName]) url = augs[layerName](url);
					const resp = yield client.getText(url);
					const json = JSON.parse(resp);
					if (((_json$features = json.features) === null || _json$features === void 0 ? void 0 : _json$features.length) > 0) {
						let srcProj = source.getProjection();
						if (!srcProj) {
							var _json$crs;
							const epsg = parseEpsgCodeFromCRS((_json$crs = json.crs) === null || _json$crs === void 0 || (_json$crs = _json$crs.properties) === null || _json$crs === void 0 ? void 0 : _json$crs.name);
							if (epsg) srcProj = `EPSG:${epsg}`;
							else srcProj = void 0;
						}
						const features = format.readFeatures(resp, {
							dataProjection: srcProj,
							featureProjection: _this.map.getView().getProjection()
						});
						_this.featureTooltip.setPosition(coord);
						const popupConf = layer.get(LayerProperty.SELECTED_POPUP_CONFIGURATION);
						const html = _this.generateFeatureHtml(layerName, features[0], callback.getLocale(), popupConf);
						callback.addClientSelectedFeature(features[0], layer);
						currentLayerSet === null || currentLayerSet === void 0 || currentLayerSet.clearWmsSelectionOverlay();
						currentLayerSet === null || currentLayerSet === void 0 || currentLayerSet.addWmsSelectionOverlay(features[0]);
						callback.addFeatureToHighlight(features[0], bAppendMode);
						selected++;
						_this.featureTooltipElement.innerHTML = html;
						stickybits(".selected-popup-cluster-table th");
						_this.closerEl = document.getElementById("feat-popup-closer");
						_this.setPopupCloseHandler();
						if (html == "") _this.featureTooltipElement.classList.add("tooltip-hidden");
						else _this.featureTooltipElement.classList.remove("tooltip-hidden");
						return true;
					}
				}
			}
			if (selected == 0) {
				callback.addFeatureToHighlight(void 0, false);
				_this.hide();
			}
			return false;
		})();
	}
	generateFeatureHtml(layerName, feat, locale, popupConfig) {
		if (layerName) {
			const customRenderer = this.parent.getSelectionPopupRenderer(layerName);
			if (customRenderer) return customRenderer(feat, locale, popupConfig);
			else return defaultPopupContentRenderer(feat, locale, popupConfig);
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
			if (html == "") this.featureTooltipElement.classList.add("tooltip-hidden");
			else this.featureTooltipElement.classList.remove("tooltip-hidden");
		} else {
			this.featureTooltipElement.innerHTML = "";
			this.featureTooltipElement.classList.add("tooltip-hidden");
		}
	}
};
//#endregion
//#region src/api/ol-factory.ts
/**
* Creates various OpenLayers types used by the viewer
*
* @class OLFactory
*/
var OLFactory = class {
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
};
//#endregion
//#region src/components/map-providers/base.ts
init_objectSpread2();
function isValidView(view) {
	if (view.resolution) return !isNaN(view.x) && !isNaN(view.y) && !isNaN(view.scale) && !isNaN(view.resolution);
	else return !isNaN(view.x) && !isNaN(view.y) && !isNaN(view.scale);
}
function inflateBoundsByMeters(thisProj, extent, meters) {
	return transformExtent(buffer(transformExtent(extent, thisProj, "EPSG:3857"), meters), "EPSG:3857", thisProj);
}
function recursiveFindLayer(layers, predicate) {
	for (let i = 0; i < layers.getLength(); i++) {
		const layer = layers.item(i);
		if (layer instanceof LayerGroup) {
			const match = recursiveFindLayer(layer.getLayers(), predicate);
			if (match) return match;
		} else if (predicate(layer)) return layer;
	}
}
function isMiddleMouseDownEvent(e) {
	return e && (e.which == 2 || e.button == 4);
}
function useViewerSideEffects(context, appSettings, isReady, mapName, layers, initialExternalLayers, agentUri = void 0, agentKind = void 0, selection = null) {
	const dispatch = useReduxDispatch();
	import_react.useEffect(() => {
		if (isReady) {
			if (mapName && !layers) {
				debug(`React.useEffect - Change of initial external layers for [${mapName}] (change should only happen once per mapName!)`);
				if (initialExternalLayers && initialExternalLayers.length > 0) {
					debug(`React.useEffect - First-time loading of external layers for [${mapName}]`);
					const layerManager = context.getLayerManager(mapName);
					for (const extLayer of initialExternalLayers) {
						const added = layerManager.addExternalLayer(extLayer, true, appSettings);
						if (added) dispatch(mapLayerAdded(mapName, added));
					}
				} else {
					debug(`React.useEffect - Signal that external layers are ready for [${mapName}]`);
					dispatch(externalLayersReady(mapName));
				}
			}
		}
	}, [
		context,
		mapName,
		initialExternalLayers,
		layers,
		isReady
	]);
	import_react.useEffect(() => {
		debug(`React.useEffect - Change of external layers`);
		if (context.isReady() && layers) context.getLayerManager(mapName).apply(layers);
	}, [
		context,
		mapName,
		layers
	]);
	import_react.useEffect(() => {
		debug(`React.useEffect - Change of context and/or agent URI/kind`);
		const browserWindow = window;
		browserWindow.getViewer = browserWindow.getViewer || (() => context);
		if (agentUri && agentKind) browserWindow.getClient = browserWindow.getClient || (() => new Client(agentUri, agentKind));
		debug(`React.useEffect - Attached runtime viewer instance and installed browser global APIs`);
	}, [
		context,
		agentUri,
		agentKind
	]);
	import_react.useEffect(() => {
		debug(`React.useEffect - Change of selection`);
		context.refreshMap(RefreshMode.SelectionOnly);
	}, [context, selection]);
}
var BaseMapProviderContext = class {
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
			var _this$_comp;
			(_this$_comp = this._comp) === null || _this$_comp === void 0 || _this$_comp.onDispatch(setActiveTool(ActiveMapTool.None));
			callback(false);
		};
		this.onResize = (e) => {
			if (this._map) {
				const size = this._map.getSize();
				if (size) {
					var _this$_comp2;
					const [w, h] = size;
					(_this$_comp2 = this._comp) === null || _this$_comp2 === void 0 || _this$_comp2.onDispatch(mapResized(w, h));
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
			locale: "en",
			cancelDigitizationKey: 27,
			undoLastPointKey: 85,
			busyWorkers: 0,
			mapName: void 0,
			externalBaseLayers: void 0,
			initialExternalLayers: []
		};
		this._state = _objectSpread2(_objectSpread2({}, baseInitialState), this.getInitialProviderState());
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
					Array.prototype.forEach.call(document.querySelectorAll(".ol-layer canvas, .external-vector-layer canvas"), function(canvas) {
						if (canvas.width > 0) {
							var _parentNode$style$opa, _parentNode$style, _transform$match;
							const parentNode = canvas.parentNode;
							const opacity = (_parentNode$style$opa = parentNode === null || parentNode === void 0 || (_parentNode$style = parentNode.style) === null || _parentNode$style === void 0 ? void 0 : _parentNode$style.opacity) !== null && _parentNode$style$opa !== void 0 ? _parentNode$style$opa : "";
							mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);
							const matrix = (_transform$match = canvas.style.transform.match(/^matrix\(([^\(]*)\)$/)) === null || _transform$match === void 0 || (_transform$match = _transform$match[1]) === null || _transform$match === void 0 || (_transform$match = _transform$match.split(",")) === null || _transform$match === void 0 ? void 0 : _transform$match.map(Number);
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
		if (!this._baseTileSourceLoaders) this._baseTileSourceLoaders = {};
		if (!this._baseTileSourceLoaders[mapName]) this._baseTileSourceLoaders[mapName] = {};
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
		if (!this._tileSourceLoaders) this._tileSourceLoaders = {};
		if (!this._tileSourceLoaders[mapName]) this._tileSourceLoaders[mapName] = {};
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
		if (!this._imageSourceLoaders) this._imageSourceLoaders = {};
		if (!this._imageSourceLoaders[mapName]) this._imageSourceLoaders[mapName] = {};
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
		if (!this._wmsQueryAugmentations) this._wmsQueryAugmentations = {};
		if (!this._wmsQueryAugmentations[mapName]) this._wmsQueryAugmentations[mapName] = {};
		this._wmsQueryAugmentations[mapName][layerName] = func;
	}
	addCustomSelectionPopupRenderer(mapName, layerName, renderer) {
		if (mapName && layerName) {
			if (!this._customSelectionPopupRenderers) this._customSelectionPopupRenderers = {};
			if (!this._customSelectionPopupRenderers[mapName]) this._customSelectionPopupRenderers[mapName] = {};
			this._customSelectionPopupRenderers[mapName][layerName] = renderer;
		} else this._globalCustomSelectionPopupRenderer = renderer;
	}
	getSelectionPopupRenderer(layerName) {
		if (!this._customSelectionPopupRenderers) this._customSelectionPopupRenderers = {};
		const { mapName } = this._state;
		if (mapName) {
			if (!this._customSelectionPopupRenderers[mapName]) this._customSelectionPopupRenderers[mapName] = {};
			const r = this._customSelectionPopupRenderers[mapName][layerName];
			if (r) return r;
		}
		if (this._globalCustomSelectionPopupRenderer) return this._globalCustomSelectionPopupRenderer;
	}
	/**
	* @virtual
	*/
	hideAllPopups() {
		var _this$_mouseTooltip, _this$_selectTooltip;
		(_this$_mouseTooltip = this._mouseTooltip) === null || _this$_mouseTooltip === void 0 || _this$_mouseTooltip.clear();
		(_this$_selectTooltip = this._selectTooltip) === null || _this$_selectTooltip === void 0 || _this$_selectTooltip.hide();
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
		var _this$_map;
		return (_this$_map = this._map) === null || _this$_map === void 0 ? void 0 : _this$_map.getView();
	}
	/**
	* Recursively collects leaf (non-group) OL layers from a LayerBase tree.
	* LayerGroup prerender/postrender canvas clip does not propagate to children in OL,
	* so we must attach clip handlers to the individual leaf layers.
	*/
	getLeafLayersForClip(layer) {
		if (layer instanceof LayerGroup) {
			const result = [];
			for (const child of layer.getLayers().getArray()) result.push(...this.getLeafLayersForClip(child));
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
		if (!this._map) return false;
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
		if (!this._map) return false;
		if (secondaryMapName === this._state.mapName) return false;
		this.deactivateMapComparison();
		this._comparisonMode = "swipe";
		this._swipePosition = position;
		this._swipeSecondaryMapName = secondaryMapName;
		const primaryLayerSet = this.getLayerSetGroup(this._state.mapName);
		if (primaryLayerSet) for (const topLayer of primaryLayerSet.getSwipeableLayers()) for (const leaf of this.getLeafLayersForClip(topLayer)) {
			this.attachClipHandler(leaf, (event, ctx, size) => {
				const width = this.getSwipeWidth(size[0]);
				const tl = getRenderPixel(event, [0, 0]);
				const tr = getRenderPixel(event, [width, 0]);
				const bl = getRenderPixel(event, [0, size[1]]);
				const br = getRenderPixel(event, [width, size[1]]);
				ctx.save();
				ctx.beginPath();
				ctx.moveTo(tl[0], tl[1]);
				ctx.lineTo(tr[0], tr[1]);
				ctx.lineTo(br[0], br[1]);
				ctx.lineTo(bl[0], bl[1]);
				ctx.closePath();
				ctx.clip();
			});
			this._swipePrimaryClipLayers.push(leaf);
		}
		if (!this.addSecondaryComparisonLayers(secondaryMapName, (event, ctx, size) => {
			const width = this.getSwipeWidth(size[0]);
			const tl = getRenderPixel(event, [width, 0]);
			const tr = getRenderPixel(event, [size[0], 0]);
			const bl = getRenderPixel(event, [width, size[1]]);
			const br = getRenderPixel(event, size);
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(tl[0], tl[1]);
			ctx.lineTo(bl[0], bl[1]);
			ctx.lineTo(br[0], br[1]);
			ctx.lineTo(tr[0], tr[1]);
			ctx.closePath();
			ctx.clip();
		})) return false;
		primaryLayerSet === null || primaryLayerSet === void 0 || primaryLayerSet.ensureHelperLayersOnTop(this._map);
		this._map.render();
		return true;
	}
	activateMapComparisonSpy(secondaryMapName, radius) {
		if (!this._map) return false;
		if (secondaryMapName === this._state.mapName) return false;
		this.deactivateMapComparison();
		this._comparisonMode = "spy";
		this._swipeSecondaryMapName = secondaryMapName;
		this._spyCursorRadius = radius;
		const primaryLayerSet = this.getLayerSetGroup(this._state.mapName);
		if (!this.addSecondaryComparisonLayers(secondaryMapName, (event, ctx) => {
			ctx.save();
			ctx.beginPath();
			if (this._spyCursorPixel) {
				const center = getRenderPixel(event, this._spyCursorPixel);
				const offset = getRenderPixel(event, [this._spyCursorPixel[0] + this._spyCursorRadius, this._spyCursorPixel[1]]);
				const canvasRadius = Math.sqrt(Math.pow(offset[0] - center[0], 2) + Math.pow(offset[1] - center[1], 2));
				ctx.arc(center[0], center[1], canvasRadius, 0, 2 * Math.PI);
			}
			ctx.clip();
		})) return false;
		primaryLayerSet === null || primaryLayerSet === void 0 || primaryLayerSet.ensureHelperLayersOnTop(this._map);
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
		if (this._comparisonMode === "spy") return this._state.mapName;
		if (this._swipeSecondaryMapName && this._map) {
			const mapSize = this._map.getSize();
			if (mapSize && pixelX > this.getSwipeWidth(mapSize[0])) return this._swipeSecondaryMapName;
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
			if (preHandler) layer.un("prerender", preHandler);
			if (postHandler) layer.un("postrender", postHandler);
		}
		for (const topLayer of this._swipeSecondaryTopLayers) this._map.removeLayer(topLayer);
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
		var _this$_map2;
		this._swipePosition = position;
		(_this$_map2 = this._map) === null || _this$_map2 === void 0 || _this$_map2.render();
	}
	/**
	* @since 0.15
	*/
	updateSpyCursor(pixel) {
		var _this$_map3;
		this._spyCursorPixel = pixel;
		(_this$_map3 = this._map) === null || _this$_map3 === void 0 || _this$_map3.render();
	}
	updateSpyCursorRadius(radius) {
		var _this$_map4;
		this._spyCursorRadius = radius;
		(_this$_map4 = this._map) === null || _this$_map4 === void 0 || _this$_map4.render();
	}
	refreshMapComparison() {
		if (this._swipeSecondaryMapName) {
			if (this._comparisonMode === "swipe") this.activateMapComparisonSwipe(this._swipeSecondaryMapName, this._swipePosition);
			else if (this._comparisonMode === "spy") this.activateMapComparisonSpy(this._swipeSecondaryMapName, this._spyCursorRadius);
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
	/**
	* @virtual
	* @returns {(IMapGuideViewerSupport | undefined)}
	*
	*/
	mapguideSupport() {}
	setActiveTool(tool) {
		var _this$_comp3;
		(_this$_comp3 = this._comp) === null || _this$_comp3 === void 0 || _this$_comp3.onDispatch(setActiveTool(tool));
	}
	getOLFactory() {
		return this.olFactory;
	}
	getMapName() {
		return this._state.mapName;
	}
	setViewRotation(rotation) {
		var _this$_comp4;
		(_this$_comp4 = this._comp) === null || _this$_comp4 === void 0 || _this$_comp4.onDispatch(setViewRotation(rotation));
	}
	getViewRotation() {
		return this._state.viewRotation;
	}
	isViewRotationEnabled() {
		return this._state.viewRotationEnabled;
	}
	setViewRotationEnabled(enabled) {
		var _this$_comp5;
		(_this$_comp5 = this._comp) === null || _this$_comp5 === void 0 || _this$_comp5.onDispatch(setViewRotationEnabled(enabled));
	}
	toastSuccess(iconName, message) {
		var _this$_toasterRef;
		return (_this$_toasterRef = this._toasterRef) === null || _this$_toasterRef === void 0 || (_this$_toasterRef = _this$_toasterRef.current) === null || _this$_toasterRef === void 0 ? void 0 : _this$_toasterRef.show({
			icon: iconName,
			message,
			variant: "success"
		});
	}
	toastWarning(iconName, message) {
		var _this$_toasterRef2;
		return (_this$_toasterRef2 = this._toasterRef) === null || _this$_toasterRef2 === void 0 || (_this$_toasterRef2 = _this$_toasterRef2.current) === null || _this$_toasterRef2 === void 0 ? void 0 : _this$_toasterRef2.show({
			icon: iconName,
			message,
			variant: "warning"
		});
	}
	toastError(iconName, message) {
		var _this$_toasterRef3;
		return (_this$_toasterRef3 = this._toasterRef) === null || _this$_toasterRef3 === void 0 || (_this$_toasterRef3 = _this$_toasterRef3.current) === null || _this$_toasterRef3 === void 0 ? void 0 : _this$_toasterRef3.show({
			icon: iconName,
			message,
			variant: "danger"
		});
	}
	toastPrimary(iconName, message) {
		var _this$_toasterRef4;
		return (_this$_toasterRef4 = this._toasterRef) === null || _this$_toasterRef4 === void 0 || (_this$_toasterRef4 = _this$_toasterRef4.current) === null || _this$_toasterRef4 === void 0 ? void 0 : _this$_toasterRef4.show({
			icon: iconName,
			message,
			variant: "primary"
		});
	}
	dismissToast(key) {
		var _this$_toasterRef5;
		(_this$_toasterRef5 = this._toasterRef) === null || _this$_toasterRef5 === void 0 || (_this$_toasterRef5 = _this$_toasterRef5.current) === null || _this$_toasterRef5 === void 0 || _this$_toasterRef5.dismiss(key);
	}
	addImageLoading() {
		var _this$_comp6;
		(_this$_comp6 = this._comp) === null || _this$_comp6 === void 0 || _this$_comp6.addImageLoading();
	}
	addImageLoaded() {
		var _this$_comp7;
		(_this$_comp7 = this._comp) === null || _this$_comp7 === void 0 || _this$_comp7.addImageLoaded();
	}
	addSubscribers(props) {
		var _this$_comp$addSubscr, _this$_comp8;
		return (_this$_comp$addSubscr = (_this$_comp8 = this._comp) === null || _this$_comp8 === void 0 ? void 0 : _this$_comp8.addSubscribers(props)) !== null && _this$_comp$addSubscr !== void 0 ? _this$_comp$addSubscr : [];
	}
	removeSubscribers(names) {
		var _this$_comp$removeSub, _this$_comp9;
		return (_this$_comp$removeSub = (_this$_comp9 = this._comp) === null || _this$_comp9 === void 0 ? void 0 : _this$_comp9.removeSubscribers(names)) !== null && _this$_comp$removeSub !== void 0 ? _this$_comp$removeSub : false;
	}
	getSubscribers() {
		var _this$_comp$getSubscr, _this$_comp10;
		return (_this$_comp$getSubscr = (_this$_comp10 = this._comp) === null || _this$_comp10 === void 0 ? void 0 : _this$_comp10.getSubscribers()) !== null && _this$_comp$getSubscr !== void 0 ? _this$_comp$getSubscr : [];
	}
	dispatch(action) {
		var _this$_comp11;
		(_this$_comp11 = this._comp) === null || _this$_comp11 === void 0 || _this$_comp11.onDispatch(action);
	}
	getDefaultPointCircleStyle() {
		return _objectSpread2({}, DEFAULT_POINT_CIRCLE_STYLE);
	}
	getDefaultPointIconStyle() {
		return _objectSpread2({}, DEFAULT_POINT_ICON_STYLE);
	}
	getDefaultLineStyle() {
		return _objectSpread2({}, DEFAULT_LINE_STYLE);
	}
	getDefaultPolygonStyle() {
		return _objectSpread2({}, DEFAULT_POLY_STYLE);
	}
	getBaseTileSourceLoaders(mapName) {
		var _this$_baseTileSource, _this$_baseTileSource2;
		return (_this$_baseTileSource = (_this$_baseTileSource2 = this._baseTileSourceLoaders) === null || _this$_baseTileSource2 === void 0 ? void 0 : _this$_baseTileSource2[mapName]) !== null && _this$_baseTileSource !== void 0 ? _this$_baseTileSource : {};
	}
	getTileSourceLoaders(mapName) {
		var _this$_tileSourceLoad, _this$_tileSourceLoad2;
		return (_this$_tileSourceLoad = (_this$_tileSourceLoad2 = this._tileSourceLoaders) === null || _this$_tileSourceLoad2 === void 0 ? void 0 : _this$_tileSourceLoad2[mapName]) !== null && _this$_tileSourceLoad !== void 0 ? _this$_tileSourceLoad : {};
	}
	getImageSourceLoaders(mapName) {
		var _this$_imageSourceLoa, _this$_imageSourceLoa2;
		return (_this$_imageSourceLoa = (_this$_imageSourceLoa2 = this._imageSourceLoaders) === null || _this$_imageSourceLoa2 === void 0 ? void 0 : _this$_imageSourceLoa2[mapName]) !== null && _this$_imageSourceLoa !== void 0 ? _this$_imageSourceLoa : {};
	}
	getMockMode() {}
	addFeatureToHighlight(feat, bAppend) {
		if (this._state.mapName) {
			if (this.getLayerSetGroup(this._state.mapName)) {
				var _this$_select;
				const sf = (_this$_select = this._select) === null || _this$_select === void 0 ? void 0 : _this$_select.getFeatures();
				if (sf) {
					if (!bAppend) sf.clear();
					if (feat) sf.push(feat);
				}
			}
		}
	}
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
		const metersPerPixel = .0254 / activeLayerSet.getDpi();
		const metersPerUnit = activeLayerSet.getMetersPerUnit();
		let mapScale;
		if (devH * mcsW > devW * mcsH) mapScale = mcsW * metersPerUnit / (devW * metersPerPixel);
		else mapScale = mcsH * metersPerUnit / (devH * metersPerPixel);
		return mapScale;
	}
	getViewForExtent(extent) {
		assertIsDefined(this._map);
		let scale, center;
		if (getWidth(extent) == 0 || getHeight(extent) == 0) {
			const inflatedBounds = inflateBoundsByMeters(this.getProjection(), extent, 20);
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
		if (this._comp) {
			var _this$_zoomSelectBox;
			const extent = (_this$_zoomSelectBox = this._zoomSelectBox) === null || _this$_zoomSelectBox === void 0 ? void 0 : _this$_zoomSelectBox.getGeometry();
			if (!extent) return;
			switch (this._state.activeTool) {
				case ActiveMapTool.Zoom:
					{
						const ext = extent.getExtent();
						this._comp.onDispatch(setCurrentView(this.getViewForExtent(ext)));
					}
					break;
				case ActiveMapTool.Select:
					this.selectFeaturesByExtent(extent);
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
		if (this._comp) {
			this.handleMouseTooltipMouseMove(e);
			if (!this.isComparisonInteractionSuppressed()) this.handleHighlightHover(e);
			else if (this._highlightedFeature && this._state.mapName) {
				var _this$getLayerSetGrou;
				(_this$getLayerSetGrou = this.getLayerSetGroup(this._state.mapName)) === null || _this$getLayerSetGrou === void 0 || _this$getLayerSetGrou.removeHighlightedFeature(this._highlightedFeature);
				this._highlightedFeature = void 0;
				this._highlightedLayer = void 0;
			}
			if (this._comp.isContextMenuOpen()) return;
			if (this._state.mapName) this._comp.onDispatch(setMouseCoordinates(this._state.mapName, e.coord));
		}
	}
	incrementBusyWorker() {
		var _this$_comp12;
		this._busyWorkers++;
		(_this$_comp12 = this._comp) === null || _this$_comp12 === void 0 || _this$_comp12.onDispatch(setBusyCount(this._busyWorkers));
	}
	decrementBusyWorker() {
		var _this$_comp13;
		this._busyWorkers--;
		(_this$_comp13 = this._comp) === null || _this$_comp13 === void 0 || _this$_comp13.onDispatch(setBusyCount(this._busyWorkers));
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
				if (prompt) this.setMouseTooltip(prompt);
				this._activeDrawInteraction = draw;
				this._activeDrawInteraction.once("drawend", (e) => {
					const geom = e.feature.getGeometry();
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
	selectFeaturesByExtent(geom) {}
	zoomByDelta(delta) {
		assertIsDefined(this._map);
		const view = this._map.getView();
		if (!view) return;
		const currentZoom = view.getZoom();
		if (currentZoom !== void 0) {
			const newZoom = view.getConstrainedZoom(currentZoom + delta);
			if (view.getAnimating()) view.cancelAnimations();
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
	getLayerSetGroup(name) {
		let layerSet;
		if (name) layerSet = this._layerSetGroups[name];
		return layerSet;
	}
	/**
	* @virtual
	* @readonly
	*
	*/
	isMouseOverTooltip() {
		var _this$_selectTooltip$, _this$_selectTooltip2;
		return (_this$_selectTooltip$ = (_this$_selectTooltip2 = this._selectTooltip) === null || _this$_selectTooltip2 === void 0 ? void 0 : _this$_selectTooltip2.isMouseOver) !== null && _this$_selectTooltip$ !== void 0 ? _this$_selectTooltip$ : false;
	}
	clearMouseTooltip() {
		var _this$_mouseTooltip2;
		(_this$_mouseTooltip2 = this._mouseTooltip) === null || _this$_mouseTooltip2 === void 0 || _this$_mouseTooltip2.clear();
	}
	setMouseTooltip(text) {
		var _this$_mouseTooltip3;
		(_this$_mouseTooltip3 = this._mouseTooltip) === null || _this$_mouseTooltip3 === void 0 || _this$_mouseTooltip3.setText(text);
	}
	handleMouseTooltipMouseMove(e) {
		var _this$_mouseTooltip4, _this$_mouseTooltip4$;
		(_this$_mouseTooltip4 = this._mouseTooltip) === null || _this$_mouseTooltip4 === void 0 || (_this$_mouseTooltip4$ = _this$_mouseTooltip4.onMouseMove) === null || _this$_mouseTooltip4$ === void 0 || _this$_mouseTooltip4$.call(_this$_mouseTooltip4, e);
	}
	isSpyComparisonActive() {
		return this._comparisonMode === "spy";
	}
	isComparisonInteractionSuppressed() {
		return this.isSpyComparisonActive();
	}
	isLayerHoverable(layer) {
		return !((layer === null || layer === void 0 ? void 0 : layer.get(LayerProperty.IS_HOVER_HIGHLIGHT)) == true) && !((layer === null || layer === void 0 ? void 0 : layer.get(LayerProperty.IS_WMS_SELECTION_OVERLAY)) == true) && !((layer === null || layer === void 0 ? void 0 : layer.get(LayerProperty.IS_HEATMAP)) == true) && !((layer === null || layer === void 0 ? void 0 : layer.get(LayerProperty.IS_MEASURE)) == true) && !((layer === null || layer === void 0 ? void 0 : layer.get(LayerProperty.DISABLE_HOVER)) == true);
	}
	handleHighlightHover(e) {
		if (this.isComparisonInteractionSuppressed()) return;
		if (e.dragging) return;
		if (this._state.busyWorkers > 0) return;
		if (this._state.mapName && this._map) {
			const activeLayerSet = this.getLayerSetGroup(this._state.mapName);
			if (!activeLayerSet) return;
			const pixel = this._map.getEventPixel(e.originalEvent);
			if (pixel) {
				const effectiveMapName = this.getEffectiveMapNameAtPixel(pixel[0]);
				const effectiveLayerSet = this.getLayerSetGroup(effectiveMapName);
				if (!effectiveLayerSet) return;
				const featureToLayerMap = [];
				this._map.forEachFeatureAtPixel(pixel, (feature, layer) => {
					if (this.isLayerHoverable(layer) && (layer === null || layer === void 0 ? void 0 : layer.get(LayerProperty.IS_SELECTABLE)) == true && feature instanceof Feature) {
						if (!this._swipeSecondaryMapName || effectiveLayerSet.ownsSwipeableLayer(layer)) featureToLayerMap.push([feature, layer]);
					}
				}, { hitTolerance: 4 });
				const feature = featureToLayerMap.length ? featureToLayerMap[0][0] : void 0;
				const layer = featureToLayerMap.length ? featureToLayerMap[0][1] : void 0;
				if (feature != this._highlightedFeature) {
					if (this._highlightedFeature) activeLayerSet.removeHighlightedFeature(this._highlightedFeature);
					if (feature) activeLayerSet.addHighlightedFeature(feature);
					this._highlightedFeature = feature;
					this._highlightedLayer = layer;
				}
			}
		}
	}
	hideSelectedVectorFeaturesTooltip() {
		var _this$_selectTooltip3;
		(_this$_selectTooltip3 = this._selectTooltip) === null || _this$_selectTooltip3 === void 0 || _this$_selectTooltip3.hide();
	}
	showSelectedVectorFeatures(features, pixel, featureToLayerMap, locale) {
		var _this$_selectTooltip4;
		(_this$_selectTooltip4 = this._selectTooltip) === null || _this$_selectTooltip4 === void 0 || _this$_selectTooltip4.showSelectedVectorFeatures(features, pixel, featureToLayerMap, locale);
	}
	queryWmsFeatures(mapName, coord, bAppendMode) {
		var _this = this;
		return _asyncToGenerator(function* () {
			if (_this.isComparisonInteractionSuppressed()) return false;
			if (mapName && _this._map) {
				const activeLayerSet = _this.getLayerSetGroup(mapName);
				const layerMgr = _this.getLayerManager(mapName);
				const res = _this._map.getView().getResolution();
				if (res && _this._selectTooltip) return yield _this._selectTooltip.queryWmsFeatures(activeLayerSet, layerMgr, coord, res, bAppendMode, {
					getLocale: () => _this._state.locale,
					addClientSelectedFeature: (feat, layer) => _this.addClientSelectedFeature(feat, layer, mapName),
					addFeatureToHighlight: (feat, bAppend) => _this.addFeatureToHighlight(feat, bAppend),
					getWmsRequestAugmentations: () => {
						var _this$_wmsQueryAugmen;
						return (_this$_wmsQueryAugmen = _this._wmsQueryAugmentations[mapName]) !== null && _this$_wmsQueryAugmen !== void 0 ? _this$_wmsQueryAugmen : {};
					}
				});
			}
			return false;
		})();
	}
	/**
	* @virtual
	* @protected
	* @param {GenericEvent} e
	*
	*/
	onImageError(e) {}
	addClientSelectedFeature(f, l, mapNameOverride) {
		if (this._select) this._select.getFeatures().push(f);
		const effectiveMapName = mapNameOverride !== null && mapNameOverride !== void 0 ? mapNameOverride : this._state.mapName;
		if (effectiveMapName) {
			var _theFeature$getGeomet;
			const features = f.get("features");
			let theFeature;
			if (Array.isArray(features)) if (features.length == 1) theFeature = features[0];
			else return;
			else theFeature = f;
			const p = _objectSpread2({}, theFeature.getProperties());
			delete p[theFeature.getGeometryName()];
			const feat = {
				bounds: (_theFeature$getGeomet = theFeature.getGeometry()) === null || _theFeature$getGeomet === void 0 ? void 0 : _theFeature$getGeomet.getExtent(),
				properties: p
			};
			this.dispatch(addClientSelectedFeature(effectiveMapName, l.get(LayerProperty.LAYER_NAME), feat));
		}
	}
	clearClientSelectedFeatures(mapNameOverride) {
		if (this._select) this._select.getFeatures().clear();
		const effectiveMapName = mapNameOverride !== null && mapNameOverride !== void 0 ? mapNameOverride : this._state.mapName;
		if (effectiveMapName) this.dispatch(clearClientSelection(effectiveMapName));
	}
	onMapClick(e) {
		if (!this._comp || !this._map) return;
		if (this._comp.isContextMenuOpen()) {
			var _this$_comp$onHideCon, _this$_comp14;
			(_this$_comp$onHideCon = (_this$_comp14 = this._comp).onHideContextMenu) === null || _this$_comp$onHideCon === void 0 || _this$_comp$onHideCon.call(_this$_comp14);
		}
		if (this.isDigitizing()) return;
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
			} else this.clearClientSelectedFeatures(effectiveMapName);
		};
		const featureToLayerMap = [];
		if (this._state.activeTool == ActiveMapTool.Select && this._select) {
			const effectiveLayerSet = this._swipeSecondaryMapName ? this.getLayerSetGroup(effectiveMapName) : void 0;
			this._map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
				if (featureToLayerMap.length == 0) {
					if (layer.get(LayerProperty.IS_SELECTABLE) == true && feature instanceof Feature) {
						if (!effectiveLayerSet || effectiveLayerSet.ownsSwipeableLayer(layer)) featureToLayerMap.push([feature, layer]);
					}
				}
			}, { hitTolerance: 4 });
			if (featureToLayerMap.length == 0 && this._highlightedFeature && this._highlightedLayer) {
				if (this._highlightedLayer.get(LayerProperty.IS_SELECTABLE) == true) {
					if (!effectiveLayerSet || effectiveLayerSet.ownsSwipeableLayer(this._highlightedLayer)) {
						featureToLayerMap.push([this._highlightedFeature, this._highlightedLayer]);
						usedHoverFallback = true;
					}
				}
			}
			if (this._select && featureToLayerMap.length == 1) {
				var _l$get;
				const [f, l] = featureToLayerMap[0];
				if (isClusteredFeature(f) && getClusterSubFeatures(f).length > 1 && ((_l$get = l.get(LayerProperty.VECTOR_STYLE)) === null || _l$get === void 0 ? void 0 : _l$get.getClusterClickAction()) == ClusterClickAction.ZoomToClusterExtents) {
					const zoomBounds = getClusterSubFeatures(f).reduce((bounds, currentFeatures) => {
						const g = currentFeatures.getGeometry();
						if (g) return extend$1(bounds, g.getExtent());
						else return bounds;
					}, createEmpty());
					const inflatedBounds = inflateBoundsByMeters(this.getProjection(), zoomBounds, 20);
					this.zoomToExtent(inflatedBounds);
				} else (0, import_react_dom$1.unstable_batchedUpdates)(() => {
					clearSelectionForCurrentClick();
					this.addClientSelectedFeature(f, l, effectiveMapName);
				});
			}
		}
		const px = e.pixel;
		const isClickOnPrimary = !this._swipeSecondaryMapName || effectiveMapName === this._state.mapName;
		if (featureToLayerMap.length == 0) {
			this.hideSelectedVectorFeaturesTooltip();
			if (this._state.activeTool == ActiveMapTool.Select) {
				clearSelectionForCurrentClick();
				this.queryWmsFeatures(effectiveMapName, e.coordinate, bAppendMode).then((madeSelection) => {
					if (!madeSelection) {
						if (isClickOnPrimary) this.onProviderMapClick(px);
					} else console.log("Made WMS selection. Skipping provider click event");
				});
			} else if (isClickOnPrimary) this.onProviderMapClick(px);
		} else if (this._select) {
			{
				const activeLayerSet = this.getLayerSetGroup(effectiveMapName);
				activeLayerSet === null || activeLayerSet === void 0 || activeLayerSet.clearWmsSelectionOverlay();
			}
			const clickedFeatures = new Collection();
			for (const [feat] of featureToLayerMap) clickedFeatures.push(feat);
			this.showSelectedVectorFeatures(clickedFeatures, px, featureToLayerMap, this._state.locale);
			if (usedHoverFallback && this._state.activeTool == ActiveMapTool.Select && isClickOnPrimary) this.onProviderMapClick(px);
		}
	}
	initContext(layerSet, locale, overviewMapElementSelector) {
		if (this._map) {
			const overviewMapOpts = {
				className: "ol-overviewmap ol-custom-overviewmap",
				layers: layerSet.getLayersForOverviewMap(),
				view: new View({ projection: layerSet.getProjection() }),
				tipLabel: tr("OL_OVERVIEWMAP_TIP", locale),
				collapseLabel: String.fromCharCode(187),
				label: String.fromCharCode(171)
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
	/**
	* @virtual
	* @protected
	* @param {TLayerSetGroup} layerSetGroup
	*
	*/
	onBeforeAttachingLayerSetGroup(layerSetGroup) {}
	setToasterRef(ref) {
		this._toasterRef = ref;
	}
	onKeyDown(e) {
		var _this$_state$cancelDi, _this$_state$undoLast;
		const cancelKey = (_this$_state$cancelDi = this._state.cancelDigitizationKey) !== null && _this$_state$cancelDi !== void 0 ? _this$_state$cancelDi : 27;
		const undoKey = (_this$_state$undoLast = this._state.undoLastPointKey) !== null && _this$_state$undoLast !== void 0 ? _this$_state$undoLast : 85;
		if (e.keyCode == cancelKey) this.cancelDigitization();
		else if (e.keyCode == undoKey && this._activeDrawInteraction) this._activeDrawInteraction.removeLastPoint();
	}
	isDigitizing() {
		if (!this._map) return false;
		return this._map.getInteractions().getArray().filter((inter) => inter instanceof Draw)[0] != null;
	}
	detachFromComponent() {
		var _this$_select2, _this$_zoomSelectBox3, _this$_activeDrawInte, _this$_selectTooltip5, _this$_mouseTooltip5, _this$_map9, _this$_ovMap;
		this._comp = void 0;
		(_this$_select2 = this._select) === null || _this$_select2 === void 0 || _this$_select2.dispose();
		this._select = void 0;
		if (this._boundZoomSelectBox) {
			var _this$_zoomSelectBox2;
			(_this$_zoomSelectBox2 = this._zoomSelectBox) === null || _this$_zoomSelectBox2 === void 0 || _this$_zoomSelectBox2.un("boxend", this._boundZoomSelectBox);
			this._boundZoomSelectBox = void 0;
		}
		if (this._boundClick) {
			var _this$_map5;
			(_this$_map5 = this._map) === null || _this$_map5 === void 0 || _this$_map5.un("click", this._boundClick);
			this._boundClick = void 0;
		}
		if (this._boundMouseMove) {
			var _this$_map6;
			(_this$_map6 = this._map) === null || _this$_map6 === void 0 || _this$_map6.un("pointermove", this._boundMouseMove);
			this._boundMouseMove = void 0;
		}
		if (this._boundResize) {
			var _this$_map7;
			(_this$_map7 = this._map) === null || _this$_map7 === void 0 || _this$_map7.un("change:size", this._boundResize);
			this._boundResize = void 0;
		}
		if (this._boundMoveEnd) {
			var _this$_map8;
			(_this$_map8 = this._map) === null || _this$_map8 === void 0 || _this$_map8.un("moveend", this._boundMoveEnd);
			this._boundMoveEnd = void 0;
		}
		(_this$_zoomSelectBox3 = this._zoomSelectBox) === null || _this$_zoomSelectBox3 === void 0 || _this$_zoomSelectBox3.dispose();
		this._zoomSelectBox = void 0;
		(_this$_activeDrawInte = this._activeDrawInteraction) === null || _this$_activeDrawInte === void 0 || _this$_activeDrawInte.dispose();
		this._activeDrawInteraction = null;
		(_this$_selectTooltip5 = this._selectTooltip) === null || _this$_selectTooltip5 === void 0 || _this$_selectTooltip5.dispose();
		this._selectTooltip = void 0;
		(_this$_mouseTooltip5 = this._mouseTooltip) === null || _this$_mouseTooltip5 === void 0 || _this$_mouseTooltip5.dispose();
		this._mouseTooltip = void 0;
		(_this$_map9 = this._map) === null || _this$_map9 === void 0 || _this$_map9.setTarget(void 0);
		(_this$_ovMap = this._ovMap) === null || _this$_ovMap === void 0 || _this$_ovMap.setMap(void 0);
		this._map = void 0;
		this._ovMap = void 0;
		debug(`Map provider context detached from component and reset to initial state`);
	}
	onMoveEnd(e) {
		if (this._triggerZoomRequestOnMoveEnd) {
			const cv = this.getCurrentView();
			if (isValidView(cv)) {
				var _this$_comp15;
				(_this$_comp15 = this._comp) === null || _this$_comp15 === void 0 || _this$_comp15.onDispatch(setCurrentView(cv));
			} else console.warn("Attempt to set invalid view", cv);
		} else info("Triggering zoom request on moveend suppresseed");
		if (e.frameState.viewState.rotation != this._state.viewRotation) {
			var _this$_comp16;
			(_this$_comp16 = this._comp) === null || _this$_comp16 === void 0 || _this$_comp16.onDispatch(setViewRotation(e.frameState.viewState.rotation));
		}
	}
	/**
	* @virtual
	* @param {HTMLElement} el
	* @param {IViewerComponent} comp
	*
	*/
	attachToComponent(el, comp) {
		var _viewport$querySelect, _viewport$querySelect2;
		this._comp = comp;
		this._select = new Select({
			condition: (e) => false,
			layers: (layer) => layer.get(LayerProperty.IS_SELECTABLE) == true || layer.get(LayerProperty.IS_SCRATCH) == true
		});
		this._zoomSelectBox = new DragBox({ condition: (e) => {
			var _this$_comp17;
			if (this._state.activeTool == ActiveMapTool.Select && ((_this$_comp17 = this._comp) === null || _this$_comp17 === void 0 ? void 0 : _this$_comp17.selectCanDragPan()) === true) return false;
			const startingMiddleMouseDrag = e.type == "pointerdown" && isMiddleMouseDownEvent(e.originalEvent);
			return !this.isDigitizing() && !startingMiddleMouseDrag && (this._state.activeTool === ActiveMapTool.Select || this._state.activeTool === ActiveMapTool.Zoom);
		} });
		this._boundZoomSelectBox = this.onZoomSelectBox.bind(this);
		this._boundMouseMove = this.onMouseMove.bind(this);
		this._boundResize = this.onResize.bind(this);
		this._boundClick = this.onMapClick.bind(this);
		this._boundMoveEnd = this.onMoveEnd.bind(this);
		this._zoomSelectBox.on("boxend", this._boundZoomSelectBox);
		const mapOptions = {
			target: el,
			controls: [new Attribution({ tipLabel: tr("OL_ATTRIBUTION_TIP", this._state.locale) }), new Rotate({ tipLabel: tr("OL_RESET_ROTATION_TIP", this._state.locale) })],
			interactions: [
				this._select,
				new DragRotate(),
				new DragPan({ condition: (e) => {
					var _this$_comp18;
					if (this._state.activeTool == ActiveMapTool.Select && ((_this$_comp18 = this._comp) === null || _this$_comp18 === void 0 ? void 0 : _this$_comp18.selectCanDragPan()) === true) return true;
					return e.type == "pointerdown" && isMiddleMouseDownEvent(e.originalEvent) || this._supportsTouch || this._state.activeTool === ActiveMapTool.Pan;
				} }),
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
		(_viewport$querySelect = viewport.querySelector(".ol-overlaycontainer")) === null || _viewport$querySelect === void 0 || _viewport$querySelect.style.setProperty("z-index", "20");
		(_viewport$querySelect2 = viewport.querySelector(".ol-overlaycontainer-stopevent")) === null || _viewport$querySelect2 === void 0 || _viewport$querySelect2.style.setProperty("z-index", "20");
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
	refreshMap(mode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly) {}
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
		var _this$_comp19;
		(_this$_comp19 = this._comp) === null || _this$_comp19 === void 0 || _this$_comp19.onDispatch(setCurrentView(this.getViewForExtent(extent)));
	}
	digitizePoint(handler, prompt) {
		assertIsDefined(this._comp);
		const draw = new Draw({ type: "Point" });
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
		var _this$_state$undoLast2;
		assertIsDefined(this._comp);
		const draw = new Draw({
			type: "LineString",
			minPoints: 2
		});
		this.pushDrawInteraction("LineString", draw, handler, prompt || tr("DIGITIZE_LINESTRING_PROMPT", this._state.locale, { key: String.fromCharCode((_this$_state$undoLast2 = this._state.undoLastPointKey) !== null && _this$_state$undoLast2 !== void 0 ? _this$_state$undoLast2 : 85) }));
	}
	digitizeCircle(handler, prompt) {
		assertIsDefined(this._comp);
		const draw = new Draw({ type: "Circle" });
		this.pushDrawInteraction("Circle", draw, handler, prompt || tr("DIGITIZE_CIRCLE_PROMPT", this._state.locale));
	}
	digitizeRectangle(handler, prompt) {
		assertIsDefined(this._comp);
		const geomFunc = (coordinates, geometry) => {
			if (!geometry) geometry = new Polygon([]);
			const start = coordinates[0];
			const end = coordinates[1];
			geometry.setCoordinates([[
				start,
				[start[0], end[1]],
				end,
				[end[0], start[1]],
				start
			]]);
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
		var _this$_state$undoLast3;
		assertIsDefined(this._comp);
		const draw = new Draw({ type: "Polygon" });
		this.pushDrawInteraction("Polygon", draw, handler, prompt || tr("DIGITIZE_POLYGON_PROMPT", this._state.locale, { key: String.fromCharCode((_this$_state$undoLast3 = this._state.undoLastPointKey) !== null && _this$_state$undoLast3 !== void 0 ? _this$_state$undoLast3 : 85) }));
	}
	addInteraction(interaction) {
		assertIsDefined(this._map);
		this._map.addInteraction(interaction);
		return interaction;
	}
	removeInteraction(interaction) {
		var _this$_map10;
		(_this$_map10 = this._map) === null || _this$_map10 === void 0 || _this$_map10.removeInteraction(interaction);
	}
	addOverlay(overlay) {
		var _this$_map11;
		(_this$_map11 = this._map) === null || _this$_map11 === void 0 || _this$_map11.addOverlay(overlay);
	}
	removeOverlay(overlay) {
		var _this$_map12;
		(_this$_map12 = this._map) === null || _this$_map12 === void 0 || _this$_map12.removeOverlay(overlay);
	}
	getProjection() {
		assertIsDefined(this._map);
		return this._map.getView().getProjection();
	}
	addHandler(eventName, handler) {
		var _this$_map13;
		(_this$_map13 = this._map) === null || _this$_map13 === void 0 || _this$_map13.on(eventName, handler);
	}
	removeHandler(eventName, handler) {
		var _this$_map14;
		(_this$_map14 = this._map) === null || _this$_map14 === void 0 || _this$_map14.un(eventName, handler);
	}
	updateSize() {
		var _this$_map15;
		(_this$_map15 = this._map) === null || _this$_map15 === void 0 || _this$_map15.updateSize();
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
			if (namedLayerSet) return this.getLayerManagerForLayerSet(namedLayerSet);
		}
		const layerSet = this.ensureAndGetLayerSetGroup(this._state);
		return this.getLayerManagerForLayerSet(layerSet);
	}
	screenToMapUnits(x, y) {
		const [mapDevW, mapDevH] = this.getSize();
		const [extX1, extY1, extX2, extY2] = this.getCurrentExtent();
		if (x > mapDevW - 1) x = mapDevW - 1;
		else if (x < 0) x = 0;
		if (y > mapDevH - 1) y = mapDevH - 1;
		else if (y < 0) y = 0;
		x = extX1 + (extX2 - extX1) * (x / mapDevW);
		y = extY1 - (extY1 - extY2) * (y / mapDevH);
		return [x, y];
	}
	getSelectedFeatures() {
		var _this$_select3;
		return (_this$_select3 = this._select) === null || _this$_select3 === void 0 ? void 0 : _this$_select3.getFeatures();
	}
	getPointSelectionBox(point, ptBuffer) {
		assertIsDefined(this._map);
		const pt1 = this._map.getCoordinateFromPixel([point[0] - ptBuffer, point[1] - ptBuffer]);
		const pt2 = this._map.getCoordinateFromPixel([point[0] + ptBuffer, point[1] + ptBuffer]);
		return [
			Math.min(pt1[0], pt2[0]),
			Math.min(pt1[1], pt2[1]),
			Math.max(pt1[0], pt2[0]),
			Math.min(pt1[1], pt2[1])
		];
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
};
//#endregion
//#region src/components/map-load-indicator.tsx
var MapLoadIndicator = (props) => {
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
	if (position == "top") style.top = 0;
	else style.bottom = 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style });
};
//#endregion
//#region src/components/session-keep-alive.tsx
/**
* @hidden
*/
var SessionKeepAlive = class {
	constructor(getSession, client, onSessionExpired, check) {
		this.check = check;
		this.getSession = getSession;
		this.client = client;
		if (this.check) this.client.getServerSessionTimeout(this.getSession()).then((tm) => {
			this.interval = tm / 5 * 1e3;
			this.timeoutID = setTimeout(this.tick.bind(this), this.interval);
		});
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
		if (this.check) return this.client.getServerSessionTimeout(this.getSession());
		else return Promise.resolve(-1);
	}
};
//#endregion
//#region src/api/layer-set-group-base.ts
var import_lodash_debounce = /* @__PURE__ */ __toESM(require_lodash_debounce());
init_objectSpread2();
var HIGHLIGHT_STYLE = new Style({
	stroke: new Stroke({
		color: "#f00",
		width: 3
	}),
	fill: new Fill({ color: "rgba(255,0,0,0.1)" }),
	text: new Text({
		font: "12px Calibri,sans-serif",
		fill: new Fill({ color: "#000" }),
		stroke: new Stroke({
			color: "#f00",
			width: 3
		})
	})
});
var LayerSetGroupBase = class {
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
		this.getSwipeableLayers = () => [...this.mainSet.getLayers(), ...Object.values(this._customLayers).map((c) => c.layer)];
		this._customLayers = {};
		this.scratchLayer = new VectorLayer({ source: new VectorSource() });
		this.scratchLayer.set(LayerProperty.LAYER_NAME, "__SCRATCH__");
		this.scratchLayer.set(LayerProperty.IS_SCRATCH, true);
		this.wmsSelOverlayLayer = new VectorLayer({ source: new VectorSource() });
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
		var _this$hoverHighlightL;
		(_this$hoverHighlightL = this.hoverHighlightLayer.getSource()) === null || _this$hoverHighlightL === void 0 || _this$hoverHighlightL.addFeature(feature);
	}
	removeHighlightedFeature(feature) {
		const hs = this.hoverHighlightLayer.getSource();
		if (hs === null || hs === void 0 ? void 0 : hs.hasFeature(feature)) hs.removeFeature(feature);
	}
	clearHighlightedFeatures() {
		var _this$hoverHighlightL2;
		(_this$hoverHighlightL2 = this.hoverHighlightLayer.getSource()) === null || _this$hoverHighlightL2 === void 0 || _this$hoverHighlightL2.clear();
	}
	/**
	* @virtual
	* @returns {(LayerBase | undefined)}
	*/
	tryGetSubjectLayer() {}
	addWmsSelectionOverlay(feat) {
		var _this$wmsSelOverlayLa;
		(_this$wmsSelOverlayLa = this.wmsSelOverlayLayer.getSource()) === null || _this$wmsSelOverlayLa === void 0 || _this$wmsSelOverlayLa.addFeature(feat);
	}
	clearWmsSelectionOverlay() {
		var _this$wmsSelOverlayLa2;
		(_this$wmsSelOverlayLa2 = this.wmsSelOverlayLayer.getSource()) === null || _this$wmsSelOverlayLa2 === void 0 || _this$wmsSelOverlayLa2.clear();
	}
	addScratchFeature(feat) {
		var _this$scratchLayer$ge;
		(_this$scratchLayer$ge = this.scratchLayer.getSource()) === null || _this$scratchLayer$ge === void 0 || _this$scratchLayer$ge.addFeature(feat);
	}
	clearScratchLayer() {
		var _this$scratchLayer$ge2;
		(_this$scratchLayer$ge2 = this.scratchLayer.getSource()) === null || _this$scratchLayer$ge2 === void 0 || _this$scratchLayer$ge2.clear();
	}
	registerSourceEvents(source) {
		if (source instanceof ImageSource) {
			source.on("imageloadstart", this.callback.addImageLoading);
			if (isMapGuideImageSource(source)) source.on("imageloaderror", this.callback.onImageError);
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
		for (const item of customLayers) layers.remove(item.layer);
		for (const item of customLayers) layers.insertAt(0, item.layer);
		const allLayers = this.mainSet.getLayers();
		for (let i = allLayers.length - 1; i >= 0; i--) layers.insertAt(0, allLayers[i]);
		map.setView(this.mainSet.view);
		if (bSetLayers) {
			const ovMap = ovMapControl.getOverviewMap();
			const ovLayers = this.getLayersForOverviewMap();
			for (const layer of ovLayers) ovMap.addLayer(layer);
			const center = this.mainSet.view.getCenter();
			if (center) ovMap.setView(new View({
				center: [center[0], center[1]],
				resolution: this.mainSet.view.getResolution(),
				projection: this.mainSet.view.getProjection()
			}));
			else {
				const view = new View({ projection: this.mainSet.view.getProjection() });
				ovMap.setView(view);
				view.fit(this.mainSet.extent, { size: ovMap.getSize() });
			}
		}
	}
	detach(map, ovMapControl) {
		const allLayers = this.mainSet.getLayers();
		for (const layer of allLayers) map.removeLayer(layer);
		for (const layerName in this._customLayers) map.removeLayer(this._customLayers[layerName].layer);
		map.removeLayer(this.scratchLayer);
		map.removeLayer(this.hoverHighlightLayer);
		const ovLayers = this.getLayersForOverviewMap();
		const ovMap = ovMapControl.getOverviewMap();
		for (const layer of ovLayers) ovMap.removeLayer(layer);
	}
	getCustomLayers(map) {
		return map.getLayers().getArray().filter((l) => this._customLayers[l.get(LayerProperty.LAYER_NAME)] != null).map((l) => _objectSpread2(_objectSpread2({}, getLayerInfo(l, true)), {}, {
			isSelectable: this._customLayers[l.get(LayerProperty.LAYER_NAME)].layer.get(LayerProperty.IS_SELECTABLE) == true,
			order: this._customLayers[l.get(LayerProperty.LAYER_NAME)].order
		})).reverse();
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
		if (this._customLayers[name]) if (!bAllow) throw new MgError(tr("LAYER_NAME_EXISTS", this.callback.getLocale(), { name }));
		else map.removeLayer(this._customLayers[name].layer);
		if (layer.get(LayerProperty.LAYER_NAME) != name) layer.set(LayerProperty.LAYER_NAME, name);
		if (!layer.get(LayerProperty.LAYER_DISPLAY_NAME)) layer.set(LayerProperty.LAYER_DISPLAY_NAME, name);
		map.removeLayer(layer);
		map.addLayer(layer);
		this._customLayers[name] = {
			layer,
			order: map.getLayers().getArray().indexOf(layer)
		};
		const tileLoaders = this.callback.getTileLoaders();
		for (const k in tileLoaders) {
			const func = tileLoaders[k];
			const layer = this.getLayer(k);
			if (layer) {
				if (layer instanceof TileLayer) {
					const source = layer.getSource();
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
			const layer = this.getLayer(k);
			if (layer) {
				if (layer instanceof ImageLayer) {
					const source = layer.getSource();
					if (typeof source.setImageLoadFunction == "function") {
						source.setImageLoadFunction(func);
						debug(`Added custom tile loader for layer: ${k}`);
					}
				}
			}
		}
		return _objectSpread2(_objectSpread2({}, getLayerInfo(layer, true)), {
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
		let layer;
		if (this._customLayers[name]) {
			var _this$_customLayers$n;
			layer = (_this$_customLayers$n = this._customLayers[name]) === null || _this$_customLayers$n === void 0 ? void 0 : _this$_customLayers$n.layer;
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
		this._customLayers[name] = {
			layer,
			order
		};
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
		if (!layer) return false;
		const hasLayer = (candidate) => {
			if (candidate === layer) return true;
			if (candidate instanceof LayerGroup) return candidate.getLayers().getArray().some((child) => hasLayer(child));
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
		const layersByName = layers.reduce((current, layer) => {
			current[layer.name] = layer;
			return current;
		}, {});
		for (const layer of layers) {
			var _this$_customLayers$l;
			const oll = (_this$_customLayers$l = this._customLayers[layer.name]) === null || _this$_customLayers$l === void 0 ? void 0 : _this$_customLayers$l.layer;
			if (oll) {
				oll.setVisible(layer.visible);
				oll.setOpacity(layer.opacity);
				oll.set(LayerProperty.BUSY_WORKER_COUNT, layer.busyWorkerCount);
				if (oll instanceof VectorLayer && layer.vectorStyle) setOLVectorLayerStyle(oll, layer.vectorStyle, layer.cluster);
				if (layer.heatmap) {
					if (oll instanceof Heatmap) {
						oll.setBlur(layer.heatmap.blur);
						oll.setRadius(layer.heatmap.radius);
					}
				}
			}
		}
		let theMeasureLayer;
		for (const layerName in this._customLayers) if (!layersByName[layerName]) {
			const removed = this.removeLayer(map, layerName);
			if ((removed === null || removed === void 0 ? void 0 : removed.get(LayerProperty.IS_MEASURE)) === true) theMeasureLayer = removed;
		}
		const cCurrentLayers = map.getLayers();
		const currentLayers = cCurrentLayers.getArray().map((l) => ({
			name: l.get(LayerProperty.LAYER_NAME),
			type: l.get(LayerProperty.LAYER_TYPE),
			isExternal: l.get(LayerProperty.IS_EXTERNAL),
			isGroup: l.get(LayerProperty.IS_GROUP),
			layer: l
		})).filter((l) => {
			var _this$_customLayers$l2;
			return l.isExternal == true && ((_this$_customLayers$l2 = this._customLayers[l.name]) === null || _this$_customLayers$l2 === void 0 ? void 0 : _this$_customLayers$l2.layer) === l.layer;
		});
		if (currentLayers.length != layers.length) {
			for (const toRemove of currentLayers) map.removeLayer(toRemove.layer);
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
				if (layers[i].name != currentLayers[ii].name) {
					bReorder = true;
					break;
				}
				ii++;
			}
			if (bReorder) {
				for (const toRemove of currentLayers) map.removeLayer(toRemove.layer);
				for (let i = layers.length - 1; i >= 0; i--) {
					const toAdd = currentLayers.filter((l) => l.name == layers[i].name)[0];
					map.addLayer(toAdd.layer);
					const item = this._customLayers[layers[i].name];
					if (item) item.order = cCurrentLayers.getArray().indexOf(toAdd.layer);
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
};
//#endregion
//#region src/components/mapguide-debug-context.ts
/**
* @since 0.13
*/
var MapGuideMockMode = /* @__PURE__ */ function(MapGuideMockMode) {
	/**
	* Render a placeholder image showing the key mapagent parameters
	*/
	MapGuideMockMode[MapGuideMockMode["RenderPlaceholder"] = 0] = "RenderPlaceholder";
	/**
	* Do not render anything
	*/
	MapGuideMockMode[MapGuideMockMode["DoNotRender"] = 1] = "DoNotRender";
	return MapGuideMockMode;
}({});
import_react.createContext({});
//#endregion
//#region src/api/mg-layer-set-group.ts
/**
* @hidden
*/
var MgLayerSetGroup = class extends LayerSetGroupBase {
	constructor(props, callback) {
		super(callback);
		this.updateSelectionColor = (color) => this.mainSet.updateSelectionColor(color);
		this.update = (showGroups, showLayers, hideGroups, hideLayers) => this.mainSet.update(showGroups, showLayers, hideGroups, hideLayers);
		const { map, agentUri } = props;
		const isRtMap = isRuntimeMap(map);
		const hasAgentUri = strIsNullOrEmpty(agentUri);
		if (isRtMap) {
			if (hasAgentUri) throw new MgError("Expected agentUri to be set");
		}
		const factory = new MgInnerLayerSetFactory(callback, map, agentUri, props.imageFormat, props.selectionImageFormat, props.selectionColor);
		this.mainSet = factory.create(props.locale, props.externalBaseLayers, props.stateless ? MgLayerSetMode.Stateless : MgLayerSetMode.Stateful, props.appSettings);
		this.overviewSet = factory.create(props.locale, props.externalBaseLayers, MgLayerSetMode.OverviewMap, props.appSettings);
		const progressNotifySources = this.mainSet.getSourcesForProgressTracking();
		for (const src of progressNotifySources) if (!(src.get(SourceProperty.SUPPRESS_LOAD_EVENTS) == true)) this.registerSourceEvents(src);
	}
	/**
	* @override
	*/
	tryGetSubjectLayer() {
		if (this.mainSet instanceof GenericLayerSetOL) return this.mainSet.subjectLayer;
		else if (this.mainSet instanceof MgLayerSetOL) return this.mainSet.overlay;
	}
	/**
	* @override
	* @returns
	*/
	tryGetWmsSource() {
		const subjectLayer = this.tryGetSubjectLayer();
		if (subjectLayer instanceof ImageLayer || subjectLayer instanceof TileLayer) {
			const source = subjectLayer.getSource();
			if (source instanceof ImageWMS || source instanceof TileWMS) return [subjectLayer, source];
		}
	}
	setMapGuideMocking(mock) {
		const allLayers = this.mainSet.getLayers();
		for (const layer of allLayers) if (layer instanceof ImageLayer) {
			const source = layer.getSource();
			if (source instanceof ImageMapGuide) if (typeof mock != "undefined") switch (mock) {
				case MapGuideMockMode.RenderPlaceholder:
					source.setImageLoadFunction(mockMapGuideImageLoadFunction);
					break;
				case MapGuideMockMode.DoNotRender:
					source.setImageLoadFunction(blankImageLoadFunction);
					break;
				default:
					assertNever(mock);
					break;
			}
			else source.setImageLoadFunction(defaultImageLoadFunction);
		}
	}
};
//#endregion
//#region src/components/tooltips/feature.ts
var FeatureQueryTooltip = class {
	constructor(map, callback) {
		this.setLinkClickHandler = () => {
			if (this.linkElement) this.linkElement.onclick = this.handleLinkClick;
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
		this.throttledMouseMove = (0, import_lodash_debounce.default)((e) => {
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
			if (this.linkElement) this.linkElement.onclick = null;
		}
	}
	sendTooltipQuery(geom) {
		if (!this.enabled) return;
		if (this.isMouseOverTooltip) {
			debug(`Mouse over tooltip. Doing nothing`);
			return;
		}
		const reqQueryFeatures = 12;
		const wkt = this.wktFormat.writeGeometry(geom);
		const client = new Client(this.callback.getAgentUri(), this.callback.getAgentKind());
		const coords = getCenter(geom.getExtent());
		this.featureTooltip.setPosition(coords);
		client.queryMapFeatures({
			mapname: this.callback.getMapName(),
			session: this.callback.getSessionId(),
			geometry: wkt,
			persist: 0,
			selectionvariant: "INTERSECTS",
			maxfeatures: 1,
			requestdata: reqQueryFeatures,
			layerattributefilter: 5
		}).then((res) => {
			let html = "";
			if (res.Tooltip) html += `<div class='feature-tooltip-body'>${res.Tooltip.replace(/\\n/g, "<br/>")}</div>`;
			if (res.Hyperlink) html += `<div><a id='feature-tooltip-link' href='${res.Hyperlink}'>${tr("FEATURE_TOOLTIP_URL_HELP_TEXT", this.callback.getLocale())}</a></div>`;
			this.featureTooltipElement.innerHTML = html;
			this.linkElement = document.getElementById("feature-tooltip-link");
			this.setLinkClickHandler();
			if (html == "") {
				this.featureTooltipElement.classList.add("tooltip-hidden");
				if (this.linkElement) this.linkElement.onclick = null;
			} else this.featureTooltipElement.classList.remove("tooltip-hidden");
		}).catch((err) => {
			if (isSessionExpiredError(err)) this.callback.onSessionExpired();
		});
	}
};
//#endregion
//#region src/components/tooltips/utfgrid.ts
/**
* @hidden
*/
var UTFGridTrackingTooltip = class {
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
		if (this.isContextMenuOpen()) return;
		const viewResolution = this.map.getView().getResolution();
		if (viewResolution) this.gridSource.forDataAtCoordinateAndResolution(e.coordinate, viewResolution, (data) => {
			if (data) {
				var html = "";
				if (data.MG_TOOLTIP) html += purify.sanitize(data.MG_TOOLTIP.replace(/(\\n)+/g, "<br />"));
				if (data.MG_URL) {
					html += "<br/><br/>";
					html += "<strong>CTRL + Click for more information</strong>";
				}
				this.tooltipElement.innerHTML = html;
			}
			this.tooltip.setPosition(data ? e.coordinate : void 0);
		});
	}
	onMouseOut() {}
	setText(prompt) {
		this.text = prompt;
		this.tooltipElement.innerHTML = this.text;
	}
	clear() {
		this.text = null;
		this.tooltipElement.innerHTML = "";
	}
	destroy() {
		if (this.tooltipElement && this.tooltipElement.parentNode) this.tooltipElement.parentNode.removeChild(this.tooltipElement);
	}
};
//#endregion
//#region src/components/map-providers/mapguide.ts
init_objectSpread2();
function isMapGuideProviderState(arg) {
	return typeof arg.agentUri == "string" && typeof arg.agentKind == "string";
}
function useMapGuideViewerState() {
	var _activeSelectedFeatur;
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
	if (map) bgColor = `#${map.BackgroundColor.substring(2)}`;
	let activeSelectedFeatureXml;
	if (activeSelectedFeature && selection && selection.FeatureSet) activeSelectedFeatureXml = getActiveSelectedFeatureXml(selection.FeatureSet, activeSelectedFeature);
	let theMap = map !== null && map !== void 0 ? map : subject;
	let isReady = false;
	if (!theMap) {
		isReady = false;
		theMap = {};
	} else if (subject && layerTransparency) isReady = true;
	else if (agentUri && theMap && layerTransparency) if (!stateless) {
		if (isRuntimeMap(theMap) && sessionId) isReady = true;
	} else isReady = true;
	return {
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
		appSettings: appSettings !== null && appSettings !== void 0 ? appSettings : {},
		isReady,
		bgColor,
		layers,
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
		showGroups: showGroups !== null && showGroups !== void 0 ? showGroups : [],
		hideGroups: hideGroups !== null && hideGroups !== void 0 ? hideGroups : [],
		showLayers: showLayers !== null && showLayers !== void 0 ? showLayers : [],
		hideLayers: hideLayers !== null && hideLayers !== void 0 ? hideLayers : [],
		activeSelectedFeatureXml: (_activeSelectedFeatur = activeSelectedFeatureXml) !== null && _activeSelectedFeatur !== void 0 ? _activeSelectedFeatur : "",
		activeSelectedFeatureColor,
		selection
	};
}
var MapGuideMapProviderContext = class extends BaseMapProviderContext {
	constructor(mockMode = void 0) {
		super();
		this.mockMode = mockMode;
		this.onOpenTooltipLink = (url) => {
			var _this$_comp;
			let fixedUrl = url;
			if (this._state.mapName && this._state.sessionId) fixedUrl = ensureParameters(url, this._state.mapName, this._state.sessionId, this._state.locale);
			(_this$_comp = this._comp) === null || _this$_comp === void 0 || _this$_comp.onDispatch({
				type: ActionType.TASK_INVOKE_URL,
				payload: { url: fixedUrl }
			});
		};
		this._wktFormat = new WKT();
		this.refreshOnStateChange = (0, import_lodash_debounce.default)(this._refreshOnStateChange.bind(this), 500);
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
		var _this$_featureTooltip;
		super.hideAllPopups();
		(_this$_featureTooltip = this._featureTooltip) === null || _this$_featureTooltip === void 0 || _this$_featureTooltip.setEnabled(false);
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
			activeSelectedFeatureXml: "",
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
		var _this$_comp2;
		(_this$_comp2 = this._comp) === null || _this$_comp2 === void 0 || _this$_comp2.onDispatch(setFeatureTooltipsEnabled(enabled));
	}
	onSessionExpired() {}
	onProviderMapClick(px) {
		if (this._state.mapName && this._state.sessionId) {
			if (!this.isSpyComparisonActive() && this._state.manualFeatureTooltips && this._state.featureTooltipsEnabled) this.queryFeatureTooltip(px);
			else if (this._state.activeTool === ActiveMapTool.Select) {
				var _this$_state$pointSel;
				const ptBuffer = (_this$_state$pointSel = this._state.pointSelectionBuffer) !== null && _this$_state$pointSel !== void 0 ? _this$_state$pointSel : 2;
				const geom = fromExtent(this.getPointSelectionBox(px, ptBuffer));
				const options = this.buildDefaultQueryOptions(geom);
				options.maxfeatures = 1;
				this.sendSelectionQuery(options);
			}
		}
	}
	/**
	* @override
	* @protected
	* @param {GenericEvent} e
	* @returns
	*/
	onMouseMove(e) {
		if (this._comp) {
			this.handleMouseTooltipMouseMove(e);
			if (this._state.activeTool == ActiveMapTool.Select) this.handleHighlightHover(e);
			if (this._comp.isContextMenuOpen()) return;
			if (!this._state.manualFeatureTooltips && !this.isSpyComparisonActive()) this.handleFeatureTooltipMouseMove(e);
			if (this._utfGridTooltip) this._utfGridTooltip.onMouseMove(e);
			if (this._state.mapName) {
				var _this$_comp$onDispatc, _this$_comp3;
				(_this$_comp$onDispatc = (_this$_comp3 = this._comp).onDispatch) === null || _this$_comp$onDispatc === void 0 || _this$_comp$onDispatc.call(_this$_comp3, setMouseCoordinates(this._state.mapName, e.coordinate));
			}
		}
	}
	queryFeatureTooltip(pixel) {
		if (!this._state.stateless && this._featureTooltip && this._featureTooltip.isEnabled()) this._featureTooltip.raiseQueryFromPoint(pixel);
	}
	handleFeatureTooltipMouseMove(e) {
		if (!this._state.stateless && this._featureTooltip && this._featureTooltip.isEnabled()) this._featureTooltip.onMouseMove(e);
	}
	enableFeatureTooltips(enabled) {
		var _this$_featureTooltip2;
		(_this$_featureTooltip2 = this._featureTooltip) === null || _this$_featureTooltip2 === void 0 || _this$_featureTooltip2.setEnabled(enabled && !this.isSpyComparisonActive());
	}
	refreshMapInternal(name, mode = RefreshMode.LayersOnly | RefreshMode.SelectionOnly) {
		const layerSet = this.getLayerSetGroup(name);
		layerSet === null || layerSet === void 0 || layerSet.refreshMap(mode);
	}
	showSelectedFeature(mapExtent, size, map, selectionColor, featureXml) {
		var _this = this;
		return _asyncToGenerator(function* () {
			if (!canUseQueryMapFeaturesV4(getSiteVersion(map))) return;
			const layerSet = _this.getLayerSetGroup(map.Name);
			try {
				if (featureXml) {
					const r = yield _this._client.queryMapFeatures_v4({
						mapname: map.Name,
						session: map.SessionId,
						selectionformat: "PNG",
						featurefilter: featureXml,
						selectioncolor: selectionColor,
						requestdata: 2,
						layerattributefilter: 0,
						persist: 0
					});
					if (r.InlineSelectionImage) {
						const dataUri = `data:${r.InlineSelectionImage.MimeType};base64,${r.InlineSelectionImage.Content}`;
						layerSet === null || layerSet === void 0 || layerSet.showActiveSelectedFeature(mapExtent, size, dataUri);
					} else layerSet === null || layerSet === void 0 || layerSet.showActiveSelectedFeature(mapExtent, BLANK_SIZE, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
				} else layerSet === null || layerSet === void 0 || layerSet.showActiveSelectedFeature(mapExtent, BLANK_SIZE, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
			} catch (e) {
				layerSet === null || layerSet === void 0 || layerSet.showActiveSelectedFeature(mapExtent, BLANK_SIZE, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
			}
		})();
	}
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
		var _this$_keepAlive;
		(_this$_keepAlive = this._keepAlive) === null || _this$_keepAlive === void 0 || _this$_keepAlive.lastTry().catch((err) => {
			if (isSessionExpiredError(err)) this.onSessionExpired();
		});
	}
	getSelectableLayers() {
		var _this$_state$selectab;
		return (_this$_state$selectab = this._state.selectableLayerNames) !== null && _this$_state$selectab !== void 0 ? _this$_state$selectab : [];
	}
	buildDefaultQueryOptions(geom, reqQueryFeatures = 1) {
		assertIsDefined(this._state.sessionId);
		assertIsDefined(this._state.mapName);
		const names = this.getSelectableLayers();
		let wkt;
		if (typeof geom === "string") wkt = geom;
		else wkt = this._wktFormat.writeGeometry(geom);
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
		var _appState$mapState, _mapState$generic$sub, _mapState$generic, _mapState$mapguide, _mapState$externalBas, _mapState$initialExte;
		if (this._layerSetGroups[mapName] || !this._reduxStore) return;
		const appState = this._reduxStore.getState();
		const mapState = appState === null || appState === void 0 || (_appState$mapState = appState.mapState) === null || _appState$mapState === void 0 ? void 0 : _appState$mapState[mapName];
		if (!mapState) return;
		const targetMap = (_mapState$generic$sub = (_mapState$generic = mapState.generic) === null || _mapState$generic === void 0 ? void 0 : _mapState$generic.subject) !== null && _mapState$generic$sub !== void 0 ? _mapState$generic$sub : (_mapState$mapguide = mapState.mapguide) === null || _mapState$mapguide === void 0 ? void 0 : _mapState$mapguide.runtimeMap;
		if (!targetMap) return;
		const targetState = _objectSpread2(_objectSpread2({}, this._state), {}, {
			mapName,
			map: targetMap,
			externalBaseLayers: (_mapState$externalBas = mapState.externalBaseLayers) !== null && _mapState$externalBas !== void 0 ? _mapState$externalBas : [],
			initialExternalLayers: (_mapState$initialExte = mapState.initialExternalLayers) !== null && _mapState$initialExte !== void 0 ? _mapState$initialExte : [],
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
		if (!this._state.mapName || !this._comp || !this._state.sessionId || !this._state.selectionColor) return;
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
				var _this$_comp4;
				return (_this$_comp4 = this._comp) === null || _this$_comp4 === void 0 ? void 0 : _this$_comp4.addImageLoading();
			},
			addImageLoaded: () => {
				var _this$_comp5;
				return (_this$_comp5 = this._comp) === null || _this$_comp5 === void 0 ? void 0 : _this$_comp5.addImageLoaded();
			},
			onImageError: (e) => this.onImageError(e),
			onSessionExpired: () => this.onSessionExpired(),
			getSelectableLayers: () => this.getSelectableLayers(),
			getClient: () => this._client,
			isContextMenuOpen: () => {
				var _this$_comp$isContext, _this$_comp6;
				return (_this$_comp$isContext = (_this$_comp6 = this._comp) === null || _this$_comp6 === void 0 ? void 0 : _this$_comp6.isContextMenuOpen()) !== null && _this$_comp$isContext !== void 0 ? _this$_comp$isContext : false;
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
		if (activated) this.enableFeatureTooltips(false);
		return activated;
	}
	deactivateMapComparison() {
		super.deactivateMapComparison();
		this.enableFeatureTooltips(this._state.featureTooltipsEnabled);
	}
	getLayerManager(mapName) {
		if (mapName && mapName !== this._state.mapName) this.ensureMapLayerSetGroup(mapName);
		return super.getLayerManager(mapName);
	}
	/**
	* @override
	* @readonly
	*
	*/
	isMouseOverTooltip() {
		var _this$_featureTooltip3, _this$_selectTooltip;
		return ((_this$_featureTooltip3 = this._featureTooltip) === null || _this$_featureTooltip3 === void 0 ? void 0 : _this$_featureTooltip3.isMouseOver) == true || ((_this$_selectTooltip = this._selectTooltip) === null || _this$_selectTooltip === void 0 ? void 0 : _this$_selectTooltip.isMouseOver) == true;
	}
	/**
	* @override
	*/
	detachFromComponent() {
		var _this$_keepAlive2, _this$_featureTooltip4;
		(_this$_keepAlive2 = this._keepAlive) === null || _this$_keepAlive2 === void 0 || _this$_keepAlive2.dispose();
		this._keepAlive = void 0;
		(_this$_featureTooltip4 = this._featureTooltip) === null || _this$_featureTooltip4 === void 0 || _this$_featureTooltip4.dispose();
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
		var _ref, _ref2;
		super.attachToComponent(el, comp);
		const bCheckSession = (_ref = this._state.map && isRuntimeMap(this._state.map)) !== null && _ref !== void 0 ? _ref : false;
		this._keepAlive = new SessionKeepAlive(() => this._state.sessionId, this._client, this.onSessionExpired.bind(this), bCheckSession);
		const utfGridLayer = recursiveFindLayer(this._map.getLayers(), (oll) => {
			if (oll instanceof TileLayer) {
				if (oll.getSource() instanceof UTFGrid) return true;
			}
			return false;
		});
		if (utfGridLayer) {
			var _this$_comp$isContext2, _this$_comp7;
			const source = utfGridLayer.getSource();
			this._utfGridTooltip = new UTFGridTrackingTooltip(this._map, source, (_this$_comp$isContext2 = (_this$_comp7 = this._comp) === null || _this$_comp7 === void 0 ? void 0 : _this$_comp7.isContextMenuOpen) !== null && _this$_comp$isContext2 !== void 0 ? _this$_comp$isContext2 : (() => false));
		}
		if ((_ref2 = this._state.map && isRuntimeMap(this._state.map)) !== null && _ref2 !== void 0 ? _ref2 : false) {
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
		if (!this._comp || !this._map) {
			if (nextState.agentUri) this._client = new Client(nextState.agentUri, nextState.agentKind);
			this._state = nextState;
			return;
		}
		if (nextState.imageFormat != this._state.imageFormat) warn(`Unsupported change of props: imageFormat`);
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
			var _this$_reduxStore$get, _this$_reduxStore;
			if (((_this$_reduxStore$get = (_this$_reduxStore = this._reduxStore) === null || _this$_reduxStore === void 0 || (_this$_reduxStore = _this$_reduxStore.getState()) === null || _this$_reduxStore === void 0 || (_this$_reduxStore = _this$_reduxStore.config) === null || _this$_reduxStore === void 0 ? void 0 : _this$_reduxStore.comparisonMode) !== null && _this$_reduxStore$get !== void 0 ? _this$_reduxStore$get : "none") !== "none") {
				var _this$_reduxStore2;
				this.deactivateMapComparison();
				(_this$_reduxStore2 = this._reduxStore) === null || _this$_reduxStore2 === void 0 || _this$_reduxStore2.dispatch(setComparisonMode("none"));
			}
			this.hideAllPopups();
			const oldLayerSet = this.getLayerSetGroup(this._state.mapName);
			const newLayerSet = this.ensureAndGetLayerSetGroup(nextState);
			oldLayerSet === null || oldLayerSet === void 0 || oldLayerSet.clearHighlightedFeatures();
			newLayerSet.clearHighlightedFeatures();
			oldLayerSet === null || oldLayerSet === void 0 || oldLayerSet.detach(this._map, this._ovMap);
			newLayerSet.setMapGuideMocking(this.getMockMode());
			newLayerSet.attach(this._map, this._ovMap);
			if (!nextState.view) {
				newLayerSet.fitViewToExtent();
				bChangedView = true;
			} else {
				const layerSet = this.getLayerSetGroup(nextState.mapName);
				if (layerSet) this.applyView(layerSet, nextState.view);
			}
		}
		if (nextState.selectionColor && nextState.selectionColor != this._state.selectionColor) {
			const layerSet = this.getLayerSetGroup(nextState.mapName);
			layerSet === null || layerSet === void 0 || layerSet.updateSelectionColor(nextState.selectionColor);
		}
		if (nextState.featureTooltipsEnabled != this._state.featureTooltipsEnabled) this.enableFeatureTooltips(nextState.featureTooltipsEnabled);
		if (nextState.externalBaseLayers != null && nextState.externalBaseLayers.length > 0) {
			const layerSet = this.getLayerSetGroup(nextState.mapName);
			layerSet === null || layerSet === void 0 || layerSet.updateExternalBaseLayers(nextState.externalBaseLayers);
		}
		if (nextState.layerTransparency && layerTransparencyChanged(nextState.layerTransparency, this._state.layerTransparency)) {
			const layerSet = this.getLayerSetGroup(nextState.mapName);
			layerSet === null || layerSet === void 0 || layerSet.updateTransparency(nextState.layerTransparency);
		}
		if (nextState.mapName && (areArraysDifferent(nextState.showGroups, this._state.showGroups) || areArraysDifferent(nextState.hideGroups, this._state.hideGroups) || areArraysDifferent(nextState.showLayers, this._state.showLayers) || areArraysDifferent(nextState.hideLayers, this._state.hideLayers))) this.refreshOnStateChange(nextState.mapName, nextState.showGroups, nextState.showLayers, nextState.hideGroups, nextState.hideLayers);
		let bViewChanged = false;
		if (!areViewsCloseToEqual(nextState.view, this._state.view)) {
			const vw = nextState.view;
			if (vw != null && !bChangedView) {
				const layerSet = this.ensureAndGetLayerSetGroup(nextState);
				this.applyView(layerSet, vw);
				bViewChanged = true;
			} else debug(`Skipping zoomToView as next/current views are close enough or target view is null`);
		}
		if (nextState.overviewMapElementSelector) this.updateOverviewMapElement(nextState.overviewMapElementSelector);
		if (this._state.viewRotation != nextState.viewRotation) {
			var _this$_map;
			(_this$_map = this._map) === null || _this$_map === void 0 || _this$_map.getView().setRotation(nextState.viewRotation);
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
						if (this._busyWorkers == 0) {
							var _this$_map2;
							const view = (_this$_map2 = this._map) === null || _this$_map2 === void 0 ? void 0 : _this$_map2.getView();
							if (!view) return;
							const me = view.calculateExtent(ms);
							const size = {
								w: ms[0],
								h: ms[1]
							};
							this.showSelectedFeature(me, size, nmap, nextState.activeSelectedFeatureColor, nextState.activeSelectedFeatureXml);
						} else window.setTimeout(checkReady, 100);
					};
					checkReady();
				}
			}
		}
		this._state = nextState;
	}
	setSelectionXml(xml, queryOpts, success, failure) {
		var _this$_state$selectio;
		if (!this._state.mapName || !this._comp || !this._state.sessionId || !this._state.selectionColor) return;
		const reqQueryFeatures = 1;
		this.incrementBusyWorker();
		const mapName = this._state.mapName;
		const action = queryMapFeatures(mapName, {
			options: _objectSpread2(_objectSpread2({}, {
				mapname: mapName,
				session: this._state.sessionId,
				persist: 1,
				featurefilter: xml,
				selectioncolor: this._state.selectionColor,
				selectionformat: (_this$_state$selectio = this._state.selectionImageFormat) !== null && _this$_state$selectio !== void 0 ? _this$_state$selectio : "PNG8",
				maxfeatures: -1,
				requestdata: reqQueryFeatures
			}), queryOpts),
			callback: (res) => {
				this.decrementBusyWorker();
				if (success) success(res);
			},
			errBack: (err) => {
				this.decrementBusyWorker();
				if (failure) failure(err);
			}
		});
		this._comp.onDispatch(action);
	}
	clearSelection() {
		this.setSelectionXml("");
	}
	selectByGeometry(geom, selectionMethod) {
		const options = this.buildDefaultQueryOptions(geom);
		if (selectionMethod) options.selectionvariant = selectionMethod;
		this.sendSelectionQuery(options);
	}
	queryMapFeatures(options, success, failure) {
		this.sendSelectionQuery(options, success, failure);
	}
	isFeatureTooltipEnabled() {
		var _this$_featureTooltip5;
		return ((_this$_featureTooltip5 = this._featureTooltip) === null || _this$_featureTooltip5 === void 0 ? void 0 : _this$_featureTooltip5.isEnabled()) == true;
	}
	sendSelectionQuery(queryOpts, success, failure) {
		var _queryOpts$layernames, _this$_state$selectio2;
		if (!this._state.mapName || !this._comp || !this._state.sessionId || !this._state.selectionColor || queryOpts != null && ((_queryOpts$layernames = queryOpts.layernames) !== null && _queryOpts$layernames !== void 0 ? _queryOpts$layernames : []).length == 0) return;
		this.incrementBusyWorker();
		const mapName = this._state.mapName;
		const action = queryMapFeatures(mapName, {
			options: _objectSpread2(_objectSpread2({}, {
				mapname: mapName,
				session: this._state.sessionId,
				persist: 1,
				selectionvariant: "INTERSECTS",
				selectioncolor: this._state.selectionColor,
				selectionformat: (_this$_state$selectio2 = this._state.selectionImageFormat) !== null && _this$_state$selectio2 !== void 0 ? _this$_state$selectio2 : "PNG8",
				maxfeatures: -1
			}), queryOpts),
			callback: (res) => {
				this.decrementBusyWorker();
				if (success) success(res);
			},
			errBack: (err) => {
				this.decrementBusyWorker();
				if (failure) failure(err);
			},
			append: this._comp.isShiftKeyDown()
		});
		this._comp.onDispatch(action);
	}
};
//#endregion
//#region src/containers/subscriber.tsx
/**
* 
* @param props 
* @since 0.13
*/
var Subscriber = (props) => {
	const state = useAppState(props.appStateSelector, props.appStateEqualityFn);
	import_react.useEffect(() => {
		props.onNewState(state);
	}, [state]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("noscript", { "data-subscriber-name": props.name });
};
//#endregion
//#region src/containers/neo-map-viewer.tsx
init_objectSpread2();
function useLoadingCounters() {
	const [loading, setLoading] = import_react.useState(0);
	const [loaded, setLoaded] = import_react.useState(0);
	import_react.useEffect(() => {
		if (loaded > 0 && loading === loaded) setTimeout(() => {
			setLoading(0);
			setLoaded(0);
		}, 100);
	}, [loaded, loaded]);
	return {
		loading,
		loaded,
		incrementLoading: () => setLoading((l) => l + 1),
		incrementLoaded: () => setLoaded((l) => l + 1)
	};
}
/**
* @hidden
*/
var MapViewer = ({ children }) => {
	var _flyouts$WEBLAYOUT_CO;
	const context = useMapProviderContext();
	const { Toaster } = useElementContext();
	const toasterRef = import_react.useRef(null);
	const loadIndicatorPositioning = useConfiguredLoadIndicatorPositioning();
	const loadIndicatorColor = useConfiguredLoadIndicatorColor();
	const dispatch = useReduxDispatch();
	const hookFunc = context.getHookFunction();
	const clientSelection = useActiveMapClientSelectionSet();
	const appSettings = useCustomAppSettings();
	const nextState = hookFunc();
	const { mapName, layers, initialExternalLayers, bgColor, locale } = nextState;
	const flyouts = useViewerFlyouts();
	const [shiftKey, setShiftKey] = import_react.useState(false);
	const [isMouseDown, setIsMouseDown] = import_react.useState(false);
	const [digitizingType, setDigitizingType] = import_react.useState(void 0);
	const { loaded, loading, incrementLoaded, incrementLoading } = useLoadingCounters();
	const [subscribers, setSubscribers] = import_react.useState([]);
	const mapViewerRef = import_react.useRef(null);
	const bContextMenuOpen = ((_flyouts$WEBLAYOUT_CO = flyouts["MapContextMenu"]) === null || _flyouts$WEBLAYOUT_CO === void 0 ? void 0 : _flyouts$WEBLAYOUT_CO.open) == true;
	const bSelectCanDragPan = useViewerSelectCanDragPan();
	const isComparisonActive = useIsComparisonActive();
	const comparisonInfo = useMapComparisonInfo();
	const secondaryMapName = isComparisonActive ? comparisonInfo === null || comparisonInfo === void 0 ? void 0 : comparisonInfo.pair.secondaryMapName : void 0;
	const secondaryLayers = useNamedMapLayers(secondaryMapName);
	import_react.useEffect(() => {
		if (context.isReady() && secondaryMapName && secondaryLayers) context.getLayerManager(secondaryMapName).apply(secondaryLayers);
	}, [
		context,
		secondaryMapName,
		secondaryLayers
	]);
	let agentUri;
	let agentKind;
	let selection = null;
	if (isMapGuideProviderState(nextState)) {
		agentUri = nextState.agentUri;
		agentKind = nextState.agentKind;
		selection = nextState.selection;
	}
	import_react.useEffect(() => {
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
		if (mapNode) context.attachToComponent(mapNode, viewerComponentApi);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("keyup", onKeyUp);
			context.detachFromComponent();
		};
	}, []);
	import_react.useEffect(() => {
		if (!clientSelection) {
			var _context$getSelectedF;
			(_context$getSelectedF = context.getSelectedFeatures()) === null || _context$getSelectedF === void 0 || _context$getSelectedF.clear();
		}
	}, [clientSelection, context]);
	context.setToasterRef(toasterRef);
	context.setProviderState(nextState);
	useViewerSideEffects(context, appSettings !== null && appSettings !== void 0 ? appSettings : {}, nextState.isReady, mapName, layers, initialExternalLayers, agentUri, agentKind, selection);
	const viewerComponentApi = import_react.useMemo(() => ({
		isShiftKeyDown: () => shiftKey,
		selectCanDragPan: () => bSelectCanDragPan,
		isContextMenuOpen: () => bContextMenuOpen,
		setDigitizingType,
		onBeginDigitization: (_callback) => {},
		onHideContextMenu: () => hideContextMenuAction(),
		onOpenTooltipLink: (_url) => {},
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
	}), [
		shiftKey,
		bSelectCanDragPan,
		bContextMenuOpen,
		dispatch,
		context,
		subscribers
	]);
	const showContextMenuAction = (pos) => dispatch(openContextMenu({
		x: pos[0],
		y: pos[1]
	}));
	const hideContextMenuAction = () => dispatch(closeContextMenu());
	const onContextMenu = (e) => {
		if (context.isMouseOverTooltip()) return;
		e.preventDefault();
		showContextMenuAction([e.clientX, e.clientY]);
	};
	const onMouseDown = (e) => {
		if (!e.target.closest("button, input, select, textarea, [role='button']")) {
			var _mapViewerRef$current;
			(_mapViewerRef$current = mapViewerRef.current) === null || _mapViewerRef$current === void 0 || _mapViewerRef$current.focus();
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
	if (!((appSettings === null || appSettings === void 0 ? void 0 : appSettings["DISABLE_CURSORS"]) == "1")) if (context.isDigitizing()) switch (digitizingType) {
		case "Point":
			style.cursor = `url(${digitizePoint_default}), auto`;
			break;
		case "Line":
			style.cursor = `url(${digitizeLine_default}), auto`;
			break;
		case "LineString":
			style.cursor = `url(${digitizeLineString_default}), auto`;
			break;
		case "Rectangle":
			style.cursor = `url(${digitizeRectangle_default}), auto`;
			break;
		case "Polygon":
			style.cursor = `url(${digitizePolygon_default}), auto`;
			break;
		case "Circle":
			style.cursor = `url(${digitizeCircle_default}), auto`;
			break;
	}
	else switch (tool) {
		case ActiveMapTool.Pan:
			style.cursor = isMouseDown ? `url(${grabbing_default}), auto` : `url(${grab_default}), auto`;
			break;
		case ActiveMapTool.Zoom:
			style.cursor = `url(${zoomin_default}), auto`;
			break;
	}
	if (bgColor) style.backgroundColor = bgColor;
	if (nextState.isReady) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		usePortal: false,
		position: "top",
		ref: toasterRef
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "map-viewer-component",
		ref: mapViewerRef,
		style,
		tabIndex: 0,
		onContextMenu,
		onMouseDown,
		onMouseUp,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapLoadIndicator, {
				loaded: loaded || 0,
				loading: loading || 0,
				position: loadIndicatorPositioning,
				color: loadIndicatorColor
			}),
			subscribers.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Subscriber, _objectSpread2({}, s), `subscriber-${i}-${s.name}`)),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapComparisonControl, {})
		]
	})] });
	else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: tr("LOADING_MSG", locale) });
};
//#endregion
//#region src/layouts/generic.tsx
var MapToolbar = (props) => {
	const comparisonInfo = useMapComparisonInfo();
	const comparisonMode = useComparisonMode();
	const comparisonActive = comparisonMode !== "none";
	const dispatch = useReduxDispatch();
	const { Button, Card, Popover, Heading } = useElementContext();
	const { locale, featureTooltipsEnabled, hasSelection, map, onInvokeCommand, onSetActiveTool, activeTool, isLayerManagerOpen, setIsLayerManagerOpen, setIsLegendOpen, setIsSelectionPanelOpen, onSetFeatureTooltips } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ElementGroup, {
		vertical: true,
		style: {
			zIndex: 10,
			position: "absolute",
			left: 30,
			top: 30
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				icon: "plus",
				title: tr("NAVIGATOR_ZOOM_IN"),
				onClick: () => onInvokeCommand(DefaultCommands.ZoomIn)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				icon: "minus",
				title: tr("NAVIGATOR_ZOOM_OUT"),
				onClick: () => onInvokeCommand(DefaultCommands.ZoomOut)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				icon: "hand",
				variant: activeTool == ActiveMapTool.Pan ? "primary" : void 0,
				onClick: () => onInvokeCommand(DefaultCommands.Pan)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				icon: "zoom-to-fit",
				title: tr("LAYER_MANAGER_TT_ZOOM_EXTENTS"),
				onClick: () => onInvokeCommand(DefaultCommands.ZoomExtents)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				icon: "select",
				variant: activeTool == ActiveMapTool.Select ? "primary" : void 0,
				onClick: () => onSetActiveTool(ActiveMapTool.Select)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				icon: "layers",
				title: tr("MANAGE_LAYERS", locale),
				variant: isLayerManagerOpen ? "primary" : void 0,
				onClick: () => setIsLayerManagerOpen(!isLayerManagerOpen)
			}),
			map && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				icon: "comment",
				title: tr("FEATURE_TOOLTIPS", locale),
				variant: featureTooltipsEnabled ? "primary" : void 0,
				onClick: () => onSetFeatureTooltips(!featureTooltipsEnabled)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				icon: "th",
				variant: hasSelection ? "success" : void 0,
				title: tr("TPL_TITLE_SELECTION_PANEL", locale),
				onClick: () => setIsSelectionPanelOpen(true)
			}),
			map && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				icon: "properties",
				title: tr("TPL_TITLE_LEGEND", locale),
				onClick: () => setIsLegendOpen(true)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
				usePortal: false,
				position: "right",
				minimal: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { icon: "map" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					style: { minWidth: 200 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
							level: 5,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								children: "Active Base Layer"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.BaseMapSwitcher,
							locale
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
							level: 5,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								children: "Current Map"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
							id: DefaultComponentNames.MapMenu,
							locale
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
				usePortal: false,
				position: "right",
				minimal: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					icon: "cog",
					title: tr("VIEWER_OPTIONS", locale)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, { id: DefaultComponentNames.ViewerOptions }) })]
			}),
			(comparisonInfo === null || comparisonInfo === void 0 ? void 0 : comparisonInfo.isComparisonPrimary) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
				usePortal: false,
				position: "right",
				minimal: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					icon: "comparison",
					variant: comparisonActive ? "primary" : void 0,
					onClick: () => void 0
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					style: { minWidth: 180 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
						level: 5,
						children: tr("MAP_COMPARISON", locale)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							gap: 8
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: comparisonMode === "swipe" ? "primary" : void 0,
								onClick: () => dispatch(setComparisonMode("swipe")),
								children: tr("MAP_COMPARISON_MODE_SWIPE", locale)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: comparisonMode === "spy" ? "primary" : void 0,
								onClick: () => dispatch(setComparisonMode("spy")),
								children: tr("MAP_COMPARISON_MODE_SPY", locale)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: !comparisonActive ? "primary" : void 0,
								onClick: () => dispatch(setComparisonMode("none")),
								children: tr("MAP_COMPARISON_MODE_OFF", locale)
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				icon: "print",
				onClick: () => onInvokeCommand(DefaultCommands.Print)
			})
		]
	}) });
};
/**
* A viewer template geared towards general purpose display of maps
* 
* @since 0.14
*/
var GenericLayout = () => {
	const { Drawer } = useElementContext();
	const [isLayerManagerOpen, setIsLayerManagerOpen] = import_react.useState(false);
	const [isLegendOpen, setIsLegendOpen] = import_react.useState(false);
	const [isSelectionPanelOpen, setIsSelectionPanelOpen] = import_react.useState(false);
	const { locale, dispatch } = useCommonTemplateState();
	const map = useActiveMapState();
	const tbState = useReducedToolbarAppState();
	const activeTool = useViewerActiveTool();
	const viewer = useMapProviderContext();
	const onInvokeCommand = (name) => {
		const cmd = getCommand(name);
		if (cmd) dispatch(invokeCommand(cmd, viewer));
	};
	const onSetActiveTool = (tool) => {
		dispatch(setActiveTool(ActiveMapTool.Select));
	};
	const onSetFeatureTooltips = (flag) => {
		dispatch(setFeatureTooltipsEnabled(flag));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			width: "100%",
			height: "100%"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalLauncher, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
				id: DefaultComponentNames.Map,
				locale,
				componentProps: { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapToolbar, {
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
				}) }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
				icon: "layers",
				onClose: () => setIsLayerManagerOpen(false),
				title: tr("MANAGE_LAYERS", locale),
				position: "left",
				isOpen: isLayerManagerOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { overflowY: "auto" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
						id: DefaultComponentNames.AddManageLayers,
						locale
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
				icon: "properties",
				onClose: () => setIsLegendOpen(false),
				title: tr("TPL_TITLE_LEGEND", locale),
				position: "left",
				isOpen: isLegendOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { overflowY: "auto" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
						id: DefaultComponentNames.Legend,
						locale
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer, {
				icon: "th",
				onClose: () => setIsSelectionPanelOpen(false),
				title: tr("TPL_TITLE_SELECTION_PANEL", locale),
				position: "left",
				isOpen: isSelectionPanelOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: "100%",
						height: "100%",
						position: "relative"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
						id: DefaultComponentNames.SelectionPanel,
						locale
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
				id: DefaultComponentNames.Navigator,
				locale
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewerApiShim, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlyoutRegionContainer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InitWarningDisplay, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderComponent, {
				id: DefaultComponentNames.MouseCoordinates,
				locale
			})
		]
	});
};
//#endregion
//#region src/containers/url-state.ts
var S_DELIM = "_";
var debouncedReplaceState = (0, import_lodash_debounce.default)((state, _, url) => window.history.replaceState(state, _, url), 100);
/**
* Updates the main URL with the given application state. If passing extra custom state,
* this extra custom state is also included when getStateFromUrl() is called.
* 
* Also if the custom state shares the same keys as the main application state, the application
* state takes precedence (ie. The key/value in the custom state *will not* overwrite the application state for the same key). 
* 
* To avoid this, you should delete/omit said keys from the application state when calling this method if
* you want to take the equivalent key/value from the custom state.
*
* @param {IAppUrlState} state
* @param {*} [extraState] Any extra state to include into the main URL
* @param {string[] | undefined} ignoreProps Do not write the following properties to the URL
* 
* @since 0.13
* @since 0.14 - New optional extraState argument
* @since 0.14.9 - New optional ignoreProps argument
*/
function updateUrl(state, extraState, ignoreProps) {
	const ignoreSet = new Set((ignoreProps !== null && ignoreProps !== void 0 ? ignoreProps : []).map((k) => k.toLowerCase()));
	const st = {};
	const currentParams = parseUrlParameters(window.location.href);
	for (const k in currentParams) {
		if (ignoreSet.has(k.toLowerCase())) continue;
		st[k.toLowerCase()] = currentParams[k];
	}
	if (extraState != null) for (const k in extraState) {
		if (ignoreSet.has(k.toLowerCase())) continue;
		st[k] = extraState[k];
	}
	for (const k in state) {
		if (ignoreSet.has(k.toLowerCase())) continue;
		const val = state[k];
		switch (k) {
			case "ft":
				st.ft = val == true ? 1 : 0;
				break;
			case "sl":
				st.sl = val === null || val === void 0 ? void 0 : val.join(S_DELIM);
				break;
			case "hl":
				st.hl = val === null || val === void 0 ? void 0 : val.join(S_DELIM);
				break;
			case "sg":
				st.sg = val === null || val === void 0 ? void 0 : val.join(S_DELIM);
				break;
			case "hg":
				st.hg = val === null || val === void 0 ? void 0 : val.join(S_DELIM);
				break;
			default:
				st[k] = val;
				break;
		}
	}
	debouncedReplaceState(st, "", appendParameters(window.location.href, st, true, false, true));
}
/**
* Gets the application state from the current main URL. If the URL was updated with custom state
* via updateUrl(), they will also be included in the returned state.
*
* @param {string[]} [ignoreKeys]
* @returns {IAppUrlState}
* @since 0.13
* @since 0.14 - New optional ignoreKeys to avoid reading out certain properties from URL state
*/
function getStateFromUrl(ignoreKeys) {
	const st = parseUrlParameters(window.location.href);
	const state = {};
	const ignore = ignoreKeys !== null && ignoreKeys !== void 0 ? ignoreKeys : [];
	for (const k in st) {
		if (ignore.indexOf(k) >= 0) continue;
		const val = st[k];
		switch (k) {
			case "ft":
				{
					const n = parseInt(val, 10);
					if (!isNaN(n)) state.ft = n == 0 ? false : true;
				}
				break;
			case "x":
				{
					const n = parseFloat(val);
					if (!isNaN(n)) state.x = n;
				}
				break;
			case "y":
				{
					const n = parseFloat(val);
					if (!isNaN(n)) state.y = n;
				}
				break;
			case "scale":
				{
					const n = parseFloat(val);
					if (!isNaN(n)) state.scale = n;
				}
				break;
			case "sl":
				state.sl = val === null || val === void 0 ? void 0 : val.split(S_DELIM);
				break;
			case "hl":
				state.hl = val === null || val === void 0 ? void 0 : val.split(S_DELIM);
				break;
			case "sg":
				state.sg = val === null || val === void 0 ? void 0 : val.split(S_DELIM);
				break;
			case "hg":
				state.hg = val === null || val === void 0 ? void 0 : val.split(S_DELIM);
				break;
			default:
				state[k] = val;
				break;
		}
	}
	return state;
}
/**
* Determines if the 2 url state are equal
* @param a 
* @param b 
* @returns true if both states are equal. false otherwise
* 
* @since 0.14.5
*/
function areStatesEqual(a, b) {
	return a.ft == b.ft && !areArraysDifferent(a.hg, b.hg) && !areArraysDifferent(a.hl, b.hl) && a.locale == b.locale && a.map == b.map && a.resource == b.resource && a.scale == b.scale && a.session == b.session && !areArraysDifferent(a.sg, b.sg) && !areArraysDifferent(a.sl, b.sl) && a.x == b.x && a.y == b.y;
}
//#endregion
//#region src/containers/app.tsx
init_objectSpread2();
init_objectWithoutProperties();
var _excluded$1 = [
	"resourceId",
	"session",
	"onInit"
];
/**
* The app setting key used to specify URL props to ignore.
* The value should be a comma-separated list of URL parameter names.
*
* @example
* To ignore `x`, `y`, and `scale` URL parameters, set this app setting in your appdef's ViewerSettings:
* ```xml
* <Setting name="urlPropsIgnore" value="x,y,scale" />
* ```
*
* @since 0.15
*/
var APP_SETTING_URL_PROPS_IGNORE = "urlPropsIgnore";
/**
* Gets the effective list of URL props to ignore, combining the `urlPropsIgnore` prop value
* with any value specified in the app settings under the {@link APP_SETTING_URL_PROPS_IGNORE} key.
*
* This allows `urlPropsIgnore` to be configured via an app setting in the loaded Application
* Definition, without requiring modification of the viewer HTML template.
*
* @param propIgnore The `urlPropsIgnore` prop value
* @param settingsValue The value of the `urlPropsIgnore` app setting (comma-separated)
* @returns The combined list of URL props to ignore, or undefined if both are empty
*
* @example
* // Merging a prop value with a settings string
* getEffectiveUrlPropsIgnore(["scale"], "x,y"); // returns ["scale", "x", "y"]
*
* // Settings-only configuration
* getEffectiveUrlPropsIgnore(undefined, "x,y,scale"); // returns ["x", "y", "scale"]
*
* @since 0.15
* @hidden
*/
function getEffectiveUrlPropsIgnore(propIgnore, settingsValue) {
	var _propIgnore$map$filte, _settingsValue$split$;
	const normalizeIgnoreProp = (value) => value.trim().toLowerCase();
	const fromProps = (_propIgnore$map$filte = propIgnore === null || propIgnore === void 0 ? void 0 : propIgnore.map(normalizeIgnoreProp).filter((s) => s.length > 0)) !== null && _propIgnore$map$filte !== void 0 ? _propIgnore$map$filte : [];
	const fromSettings = (_settingsValue$split$ = settingsValue === null || settingsValue === void 0 ? void 0 : settingsValue.split(",").map(normalizeIgnoreProp).filter((s) => s.length > 0)) !== null && _settingsValue$split$ !== void 0 ? _settingsValue$split$ : [];
	const merged = [...new Set([...fromProps, ...fromSettings])];
	return merged.length > 0 ? merged : void 0;
}
/**
* Returns a copy of the given URL state with the specified keys omitted.
* Used to strip ignored keys before equality comparison so that changes
* to ignored fields do not trigger unnecessary URL updates.
*/
function omitIgnoredStateKeys(state, ignoreProps) {
	const ignoreSet = new Set(ignoreProps);
	const result = {};
	for (const k in state) if (!ignoreSet.has(k)) result[k] = state[k];
	return result;
}
var AppLoadingPlaceholder = ({ locale }) => {
	const { NonIdealState, Spinner } = useElementContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NonIdealState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { sizePreset: "large" }),
		title: tr("INIT", locale),
		description: tr("INIT_DESC", locale)
	});
};
var AppInitError = (props) => {
	const { Callout } = useElementContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
		variant: "danger",
		title: tr("INIT_ERROR_TITLE", props.locale),
		icon: "error",
		children: props.children
	});
};
var App = (props) => {
	const error = useInitError();
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
	const [isLoading, setIsLoading] = import_react.useState(true);
	import_react.useEffect(() => {
		const { onInit, mapguide, locale, resourceId, externalBaseLayers, appSettings, layout: layoutProp, urlPropsIgnore } = props;
		const { locale: urlLocale, resource: urlResource, session: urlSession, x: urlX, y: urlY, ft: urlFeatureTooltip, scale: urlScale, map: urlMap, sl: urlShowLayers, hl: urlHideLayers, sg: urlShowGroups, hg: urlHideGroups } = getStateFromUrl(getEffectiveUrlPropsIgnore(urlPropsIgnore, appSettings === null || appSettings === void 0 ? void 0 : appSettings[APP_SETTING_URL_PROPS_IGNORE]));
		if (setElementVisibility && (mapguide === null || mapguide === void 0 ? void 0 : mapguide.initialElementVisibility)) {
			const { taskpane, legend, selection } = mapguide.initialElementVisibility;
			setElementVisibility({
				taskPaneVisible: typeof taskpane != "undefined" ? taskpane : true,
				legendVisible: typeof legend != "undefined" ? legend : true,
				selectionPanelVisible: typeof selection != "undefined" ? selection : true
			});
		}
		debug(`Asset root is: ${getAssetRoot()}`);
		if (mapguide === null || mapguide === void 0 ? void 0 : mapguide.fusionRoot) setFusionRoot(mapguide.fusionRoot);
		(function() {
			var _ref2 = _asyncToGenerator(function* () {
				var _ref, _ftArgs, _amArgs, _ivArgs, _slArgs, _hlArgs, _sgArgs, _hgArgs;
				let ftArgs;
				if (typeof urlFeatureTooltip != "undefined") ftArgs = { featureTooltipsEnabled: urlFeatureTooltip };
				let amArgs;
				if (urlMap) amArgs = { initialActiveMap: urlMap };
				let ivArgs;
				if (urlX && urlY && urlScale) ivArgs = { initialView: {
					x: urlX,
					y: urlY,
					scale: urlScale
				} };
				let slArgs;
				if (urlShowLayers) slArgs = { initialShowLayers: [...urlShowLayers] };
				let hlArgs;
				if (urlHideLayers) hlArgs = { initialHideLayers: [...urlHideLayers] };
				let sgArgs;
				if (urlShowGroups) sgArgs = { initialShowGroups: [...urlShowGroups] };
				let hgArgs;
				if (urlHideGroups) hgArgs = { initialHideGroups: [...urlHideGroups] };
				const args = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, {
					resourceId: urlResource !== null && urlResource !== void 0 ? urlResource : resourceId,
					locale: (_ref = urlLocale !== null && urlLocale !== void 0 ? urlLocale : locale) !== null && _ref !== void 0 ? _ref : "en",
					externalBaseLayers,
					session: urlSession !== null && urlSession !== void 0 ? urlSession : mapguide === null || mapguide === void 0 ? void 0 : mapguide.session,
					onInit,
					layout: typeof layoutProp == "string" ? layoutProp : void 0,
					appSettings
				}), (_ftArgs = ftArgs) !== null && _ftArgs !== void 0 ? _ftArgs : {}), (_amArgs = amArgs) !== null && _amArgs !== void 0 ? _amArgs : {}), (_ivArgs = ivArgs) !== null && _ivArgs !== void 0 ? _ivArgs : {}), (_slArgs = slArgs) !== null && _slArgs !== void 0 ? _slArgs : {}), (_hlArgs = hlArgs) !== null && _hlArgs !== void 0 ? _hlArgs : {}), (_sgArgs = sgArgs) !== null && _sgArgs !== void 0 ? _sgArgs : {}), (_hgArgs = hgArgs) !== null && _hgArgs !== void 0 ? _hgArgs : {});
				let fetchClient;
				if (mapguide === null || mapguide === void 0 ? void 0 : mapguide.agentUri) try {
					var _mapguide$agentKind;
					fetchClient = new Client(mapguide.agentUri, (_mapguide$agentKind = mapguide.agentKind) !== null && _mapguide$agentKind !== void 0 ? _mapguide$agentKind : "mapagent");
				} catch (e) {
					fetchClient = void 0;
				}
				try {
					const fetchResult = yield fetchInitDocument(args, fetchClient);
					const { resourceId: _resourceId, session: _session, onInit: _onInit } = args;
					yield dispatch(initAppFromDocument(fetchResult, _objectWithoutProperties(args, _excluded$1)));
					if (onInit) onInit(viewer);
				} catch (e) {
					processAndDispatchInitError(e, false, dispatch, args);
				}
			});
			return function initialize() {
				return _ref2.apply(this, arguments);
			};
		})()();
	}, []);
	import_react.useEffect(() => {
		var _curUrlState$locale, _curUrlState$session, _props$mapguide;
		const curUrlState = getStateFromUrl();
		const nextUrlState = {
			locale: (_curUrlState$locale = curUrlState.locale) !== null && _curUrlState$locale !== void 0 ? _curUrlState$locale : props.locale,
			session: (_curUrlState$session = curUrlState.session) !== null && _curUrlState$session !== void 0 ? _curUrlState$session : (_props$mapguide = props.mapguide) === null || _props$mapguide === void 0 ? void 0 : _props$mapguide.session
		};
		if (typeof props.resourceId == "string") {
			var _curUrlState$resource;
			nextUrlState.resource = (_curUrlState$resource = curUrlState.resource) !== null && _curUrlState$resource !== void 0 ? _curUrlState$resource : props.resourceId;
		}
		if (ftEnabled !== void 0) nextUrlState.ft = ftEnabled;
		if (map != null) setIsLoading(false);
		if (activeMapName) nextUrlState.map = activeMapName;
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
				if (rtm === null || rtm === void 0 ? void 0 : rtm.Group) {
					for (const g of rtm.Group) if (showGroups.indexOf(g.ObjectId) >= 0) sg.push(g.Name);
					else if (hideGroups.indexOf(g.ObjectId) >= 0) hg.push(g.Name);
				}
				if (rtm === null || rtm === void 0 ? void 0 : rtm.Layer) {
					for (const l of rtm.Layer) if (showLayers.indexOf(l.ObjectId) >= 0) sl.push(l.Name);
					else if (hideLayers.indexOf(l.ObjectId) >= 0) hl.push(l.Name);
				}
				if (sg.length > 0) nextUrlState.sg = sg;
				if (hg.length > 0) nextUrlState.hg = hg;
				if (sl.length > 0) nextUrlState.sl = sl;
				if (hl.length > 0) nextUrlState.hl = hl;
				if (rtm) {
					const { SessionId } = rtm;
					nextUrlState.session = SessionId;
				}
			}
		}
		const effectiveIgnore = getEffectiveUrlPropsIgnore(props.urlPropsIgnore, configuredAppSettings === null || configuredAppSettings === void 0 ? void 0 : configuredAppSettings[APP_SETTING_URL_PROPS_IGNORE]);
		if (!areStatesEqual(effectiveIgnore ? omitIgnoredStateKeys(curUrlState, effectiveIgnore) : curUrlState, effectiveIgnore ? omitIgnoredStateKeys(nextUrlState, effectiveIgnore) : nextUrlState)) updateUrl(nextUrlState, void 0, effectiveIgnore);
	}, [
		map,
		activeMapName,
		ftEnabled,
		props,
		configuredAppSettings
	]);
	const renderErrorMessage = import_react.useCallback((err, locale, args) => {
		const msg = err.message;
		switch (msg) {
			case "MgConnectionFailedException": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: purify.sanitize(tr("INIT_ERROR_NO_CONNECTION", locale)) } });
			case "MgResourceNotFoundException": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: purify.sanitize(tr("INIT_ERROR_RESOURCE_NOT_FOUND", locale, { resourceId: args.resourceId })) } });
			case "MgSessionExpiredException": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: purify.sanitize(tr("INIT_ERROR_EXPIRED_SESSION", locale, { sessionId: args.session })) } });
			default: {
				const arg = { __html: purify.sanitize(msg) };
				const stack = normalizeStack(err);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: arg }), (() => {
					if (includeStack === true && stack.length > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Stack Trace" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: stack.map((ln, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: ln }, `stack-line-${i}`)) })] });
				})()] });
			}
		}
	}, [includeStack]);
	const initErrorRenderer = import_react.useCallback((err) => {
		let locale = configuredLocale;
		if (initOptions && initOptions.locale) locale = initOptions.locale;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppInitError, {
			locale,
			children: renderErrorMessage(err, locale, initOptions || {})
		});
	}, [
		configuredLocale,
		initOptions,
		renderErrorMessage
	]);
	const { layout } = props;
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Error$1, {
		error,
		errorRenderer: initErrorRenderer
	});
	else {
		const locale = configuredLocale;
		if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLoadingPlaceholder, { locale });
		else {
			const layoutEl = typeof layout == "string" ? getLayout(layout) : layout.factory;
			if (layoutEl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppContextProvider, {
				mapguide: props.mapguide,
				children: layoutEl()
			});
			else return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Error$1, { error: tr("ERR_UNREGISTERED_LAYOUT", locale, { layout }) });
		}
	}
};
//#endregion
//#region src/store/promise-middleware.ts
init_objectSpread2();
/**
* Returns whether the provided value is a promise
*
* @hidden
* @param {object} value Potential promise
* @return {Boolean}
*/
function isPromise(value) {
	if (value !== null && typeof value === "object") return value.promise && typeof value.promise.then === "function";
}
/**
* @hidden
*/
function promiseMiddleware({ dispatch }) {
	return (next) => (action) => {
		if (!isPromise(action.payload)) return next(action);
		const { types, payload, meta } = action;
		const { promise, data } = payload;
		const [PENDING, FULFILLED, REJECTED] = types;
		const p1 = { type: PENDING };
		const p2 = data ? { payload: data } : {};
		const p3 = meta ? { meta } : {};
		/**
		* Dispatch the pending action
		*/
		dispatch(_objectSpread2(_objectSpread2(_objectSpread2({}, p1), p2), p3));
		/**
		* If successful, dispatch the fulfilled action, otherwise dispatch
		* rejected action.
		*/
		return promise.then((result) => {
			dispatch({
				type: FULFILLED,
				payload: result,
				meta
			});
		}, (error) => {
			dispatch({
				type: REJECTED,
				payload: error,
				meta
			});
		});
	};
}
//#endregion
//#region src/store/logger.ts
var FILTERED_TYPES = new Set([
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
var logger = (store) => (next) => (action) => {
	const actionType = action === null || action === void 0 ? void 0 : action.type;
	if (FILTERED_TYPES.has(actionType)) return next(action);
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
//#endregion
//#region src/reducers/config.ts
init_objectSpread2();
var CONFIG_INITIAL_STATE = {
	agentUri: void 0,
	agentKind: "mapagent",
	locale: "en",
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
	cancelDigitizationKey: 27,
	undoLastPointKey: 85,
	selectCanDragPan: false,
	coordinates: { decimals: 6 },
	viewer: {
		isStateless: false,
		imageFormat: "PNG",
		selectionImageFormat: "PNG8",
		selectionColor: "0x0000FFAA",
		activeSelectedFeatureColor: "0xFF0000AA",
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
	switch (action.type) {
		case ActionType.SET_LOCALE: return _objectSpread2(_objectSpread2({}, state), { locale: action.payload });
		case ActionType.SET_APP_SETTING: {
			var _state$appSettings;
			const settings = _objectSpread2({}, (_state$appSettings = state.appSettings) !== null && _state$appSettings !== void 0 ? _state$appSettings : {});
			settings[action.payload.key] = action.payload.value;
			return _objectSpread2(_objectSpread2({}, state), { appSettings: settings });
		}
		case ActionType.INIT_APP: {
			var _action$payload;
			const payload = (_action$payload = action.payload) !== null && _action$payload !== void 0 ? _action$payload : {};
			const maps = payload.maps;
			const availableMaps = [];
			let am = payload.activeMapName;
			const mapNames = Object.keys(maps);
			for (const mapName of mapNames) availableMaps.push({
				name: maps[mapName].mapGroupId,
				value: mapName
			});
			if (mapNames.indexOf(am) < 0) {
				warn(`Invalid initial active map name: ${am}. Probably because we haven't properly implemented recovery of runtime maps on reload yet`);
				am = mapNames[0];
			}
			const pendingMaps = {};
			for (const mapName of mapNames) {
				const mi = maps[mapName];
				if (mi.mapDef) pendingMaps[mapName] = {
					mapDef: mi.mapDef,
					metadata: mi.metadata
				};
			}
			const state1 = {
				appSettings: payload.appSettings,
				locale: payload.locale || "en",
				capabilities: payload.capabilities,
				activeMapName: am,
				availableMaps,
				comparisonPairs: payload.comparisonPairs,
				mapSwipePairs: payload.comparisonPairs,
				sessionWasReused: payload.sessionWasReused === true,
				pendingMaps: Object.keys(pendingMaps).length > 0 ? pendingMaps : void 0
			};
			const newState = _objectSpread2(_objectSpread2({}, state), state1);
			if (payload.config != null && Object.keys(payload.config).length > 0) {
				const coordConfig = _objectSpread2({}, state.coordinates);
				const viewerConfig = _objectSpread2({}, state.viewer);
				if (payload.config.isStateless != null) viewerConfig.isStateless = payload.config.isStateless;
				if (payload.config.imageFormat != null) viewerConfig.imageFormat = payload.config.imageFormat;
				if (payload.config.selectionImageFormat != null) viewerConfig.selectionImageFormat = payload.config.selectionImageFormat;
				if (payload.config.selectionColor != null) viewerConfig.selectionColor = payload.config.selectionColor;
				if (payload.config.pointSelectionBuffer != null) viewerConfig.pointSelectionBuffer = payload.config.pointSelectionBuffer;
				if (payload.config.coordinateProjection != null) coordConfig.projection = payload.config.coordinateProjection;
				if (payload.config.coordinateDecimals != null) coordConfig.decimals = payload.config.coordinateDecimals;
				if (payload.config.coordinateDisplayFormat != null) coordConfig.format = payload.config.coordinateDisplayFormat;
				const state2 = {
					viewer: viewerConfig,
					coordinates: coordConfig
				};
				const mapKeys = Object.keys(payload.maps);
				if (payload.config.viewSizeUnits != null) state2.viewSizeUnits = payload.config.viewSizeUnits;
				else if (mapKeys.length == 1) {
					const m = payload.maps[mapKeys[0]].map;
					if (m) {
						let arbCs;
						if (isRuntimeMap(m)) arbCs = tryParseArbitraryCs(m.CoordinateSystem.MentorCode);
						else {
							var _m$meta;
							arbCs = tryParseArbitraryCs(m === null || m === void 0 || (_m$meta = m.meta) === null || _m$meta === void 0 ? void 0 : _m$meta.projection);
						}
						if (arbCs) state2.viewSizeUnits = arbCs.units;
					}
				}
				return _objectSpread2(_objectSpread2({}, newState), state2);
			} else return newState;
		}
		case ActionType.MAP_REFRESH:
			if (state.pendingMaps) {
				const mapName = action.payload.mapName;
				if (state.pendingMaps[mapName]) {
					const updatedPendingMaps = _objectSpread2({}, state.pendingMaps);
					delete updatedPendingMaps[mapName];
					return _objectSpread2(_objectSpread2({}, state), {}, { pendingMaps: Object.keys(updatedPendingMaps).length > 0 ? updatedPendingMaps : void 0 });
				}
			}
			return state;
		case ActionType.MAP_ENABLE_SELECT_DRAGPAN: return _objectSpread2(_objectSpread2({}, state), { selectCanDragPan: action.payload });
		case ActionType.MAP_SET_VIEW_ROTATION: return _objectSpread2(_objectSpread2({}, state), { viewRotation: action.payload });
		case ActionType.MAP_SET_VIEW_ROTATION_ENABLED: return _objectSpread2(_objectSpread2({}, state), { viewRotationEnabled: action.payload });
		case ActionType.MAP_SET_ACTIVE_MAP: {
			const data = action.payload;
			if (data) {
				const state1 = { activeMapName: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
		case ActionType.MAP_SET_VIEW_SIZE_UNITS: {
			const state1 = { viewSizeUnits: action.payload };
			return _objectSpread2(_objectSpread2({}, state), state1);
		}
		case ActionType.MAP_SET_MANUAL_MAPTIP: return _objectSpread2(_objectSpread2({}, state), { manualFeatureTooltips: action.payload });
		case ActionType.MAP_SET_COMPARISON_MODE: {
			var _action$payload$mode;
			const nextMode = (_action$payload$mode = action.payload.mode) !== null && _action$payload$mode !== void 0 ? _action$payload$mode : action.payload.active ? "swipe" : "none";
			return _objectSpread2(_objectSpread2({}, state), {}, {
				comparisonMode: nextMode,
				swipeActive: nextMode === "swipe"
			}, nextMode !== "none" ? { lastComparisonMode: nextMode } : {});
		}
		case ActionType.MAP_SET_SWIPE_POSITION: return _objectSpread2(_objectSpread2({}, state), {}, { swipePosition: action.payload.position });
		case ActionType.MAP_SET_SPY_CURSOR_RADIUS: return _objectSpread2(_objectSpread2({}, state), {}, { spyCursorRadius: action.payload.radius });
	}
	return state;
}
//#endregion
//#region src/reducers/toolbar.ts
var import_immutability_helper = /* @__PURE__ */ __toESM(require_immutability_helper());
init_objectSpread2();
function mergeFlyoutState(flyoutId, state, flyoutPayload, flyoutUpdateAction, closeOtherFlyouts = false, bSettingStates = false) {
	const updateSpec = { flyouts: {} };
	if (!state.flyouts[flyoutId] && bSettingStates) return state;
	const flyoutUpdateSpec = {};
	flyoutUpdateSpec[flyoutUpdateAction] = flyoutPayload;
	updateSpec.flyouts[flyoutId] = flyoutUpdateSpec;
	if (closeOtherFlyouts) {
		for (const key in state.flyouts) if (key != flyoutId) updateSpec.flyouts[key] = { "$merge": { open: false } };
	}
	return (0, import_immutability_helper.default)(state, updateSpec);
}
function mergeFlyoutCloseState(flyoutId, state, bSettingStates = false) {
	return mergeFlyoutState(flyoutId, state, {
		open: false,
		metrics: null
	}, "$merge", false, bSettingStates);
}
var TOOLBAR_INITIAL_STATE = {
	toolbars: {},
	flyouts: {}
};
function toolbarReducer(state = TOOLBAR_INITIAL_STATE, action) {
	switch (action.type) {
		case ActionType.INIT_APP: return _objectSpread2(_objectSpread2({}, state), action.payload.toolbars);
		case ActionType.COMPONENT_OPEN: {
			const payload = action.payload;
			let flyoutId = payload.flyoutId;
			if (flyoutId) return mergeFlyoutState(flyoutId, state, {
				open: true,
				metrics: payload.metrics,
				componentName: payload.name,
				componentProps: payload.props
			}, "$set", true);
			return state;
		}
		case ActionType.COMPONENT_CLOSE: {
			if (!state.flyouts["MapContextMenu"]) return state;
			let flyoutId = action.payload.flyoutId;
			if (flyoutId) return mergeFlyoutState(flyoutId, state, {
				open: false,
				metrics: null,
				componentName: null,
				componentProps: null
			}, "$set");
			return state;
		}
		case ActionType.CONTEXT_MENU_OPEN:
			if (!state.flyouts["MapContextMenu"]) return state;
			return mergeFlyoutState(WEBLAYOUT_CONTEXTMENU, state, {
				open: true,
				metrics: {
					posX: action.payload.x,
					posY: action.payload.y
				}
			}, "$merge", true);
		case ActionType.FLYOUT_OPEN: {
			let flyoutId = action.payload.flyoutId;
			if (flyoutId) return mergeFlyoutState(flyoutId, state, {
				open: true,
				metrics: action.payload.metrics
			}, "$merge", true);
			return state;
		}
		case ActionType.FUSION_SET_ELEMENT_STATE:
			if (isElementState(action.payload) && !action.payload.taskPaneVisible) return mergeFlyoutCloseState(WEBLAYOUT_TASKMENU, state, true);
			return state;
		case ActionType.FUSION_SET_TASK_PANE_VISIBILITY:
			if (!action.payload) return mergeFlyoutCloseState(WEBLAYOUT_TASKMENU, state);
			return state;
		case ActionType.FLYOUT_CLOSE: {
			let flyoutId = action.payload.flyoutId;
			if (flyoutId) return mergeFlyoutCloseState(flyoutId, state);
		}
		case ActionType.CONTEXT_MENU_CLOSE: return mergeFlyoutCloseState(WEBLAYOUT_CONTEXTMENU, state);
	}
	return state;
}
//#endregion
//#region src/reducers/taskpane.ts
init_objectSpread2();
var TASK_PANE_INITIAL_STATE = {
	navIndex: -1,
	navigation: [],
	initialUrl: void 0,
	lastUrlPushed: false
};
function mergeNavigatedUrl(state, url) {
	let index = state.navIndex;
	const nav = state.navigation;
	index++;
	nav[index] = url;
	if (nav.length > index + 1) nav.splice(index + 1);
	const newState = {
		navIndex: index,
		navigation: nav,
		lastUrlPushed: false
	};
	return _objectSpread2(_objectSpread2({}, state), newState);
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
			return _objectSpread2(_objectSpread2({}, state), newState);
		}
		case ActionType.TASK_PANE_HOME:
			if (state.initialUrl != null) return mergeNavigatedUrl(state, state.initialUrl);
			return state;
		case ActionType.TASK_PANE_BACK: {
			let index = state.navIndex;
			const nav = state.navigation;
			index--;
			const newState = {
				navIndex: index,
				navigation: nav,
				lastUrlPushed: false
			};
			return _objectSpread2(_objectSpread2({}, state), newState);
		}
		case ActionType.TASK_PANE_FORWARD: {
			let index = state.navIndex;
			const nav = state.navigation;
			index++;
			const newState = {
				navIndex: index,
				navigation: nav,
				lastUrlPushed: false
			};
			return _objectSpread2(_objectSpread2({}, state), newState);
		}
		case ActionType.TASK_PANE_PUSH_URL: {
			const { payload } = action;
			const index = state.navIndex;
			const nav = state.navigation;
			nav[index + 1] = payload.url;
			if (nav.length > index + 2) nav.splice(index + 2);
			if (payload.silent === true) {
				const newState = { navigation: nav };
				return _objectSpread2(_objectSpread2({}, state), newState);
			} else {
				const newState = {
					navIndex: index + 1,
					navigation: nav,
					lastUrlPushed: true
				};
				return _objectSpread2(_objectSpread2({}, state), newState);
			}
		}
		case ActionType.TASK_INVOKE_URL: return mergeNavigatedUrl(state, action.payload.url);
	}
	return state;
}
//#endregion
//#region src/reducers/last-action.ts
var NULL_ACTION = {};
function lastAction(state = null, action) {
	if (isAction(action)) switch (action.type) {
		case ActionType.MAP_SET_BUSY_COUNT:
		case ActionType.TASK_INVOKE_URL:
		case ActionType.MAP_SET_SELECTION:
		case ActionType.MAP_ADD_CLIENT_SELECTED_FEATURE:
		case ActionType.MAP_SET_MAPTIP:
		case ActionType.MAP_SET_ACTIVE_TOOL: return action;
	}
	return NULL_ACTION;
}
//#endregion
//#region src/reducers/modal.ts
init_objectSpread2();
init_objectWithoutProperties();
var _excluded = ["modal"];
function tryRestoreModalSizeAndPosition(modal, prevModal) {
	if (prevModal === null || prevModal === void 0 ? void 0 : prevModal.position) modal.position = prevModal.position;
	else if (!modal.position) modal.position = DEFAULT_MODAL_POSITION;
	if (prevModal === null || prevModal === void 0 ? void 0 : prevModal.size) modal.size = prevModal.size;
	else if (!modal.size) modal.size = DEFAULT_MODAL_SIZE;
}
var MODAL_INITIAL_STATE = {};
function modalReducer(state = MODAL_INITIAL_STATE, action) {
	switch (action.type) {
		case ActionType.MODAL_SHOW_COMPONENT: {
			var _state$action$payload;
			const newModal = action.payload.modal;
			tryRestoreModalSizeAndPosition(newModal, (_state$action$payload = state[action.payload.name]) === null || _state$action$payload === void 0 ? void 0 : _state$action$payload.modal);
			const newData = {};
			newData[action.payload.name] = {
				modal: newModal,
				component: action.payload.component,
				componentProps: action.payload.componentProps
			};
			return _objectSpread2(_objectSpread2({}, state), newData);
		}
		case ActionType.MODAL_UPDATE: {
			const newData = {};
			newData[action.payload.name] = { modal: { "$merge": {
				size: [action.payload.args.width, action.payload.args.height],
				position: [action.payload.args.x, action.payload.args.y]
			} } };
			return (0, import_immutability_helper.default)(state, newData);
		}
		case ActionType.MODAL_SHOW_URL: {
			var _state$action$payload2;
			const _action$payload = action.payload, { modal: newModal } = _action$payload, rest = _objectWithoutProperties(_action$payload, _excluded);
			tryRestoreModalSizeAndPosition(newModal, (_state$action$payload2 = state[action.payload.name]) === null || _state$action$payload2 === void 0 ? void 0 : _state$action$payload2.modal);
			const newData = {};
			newData[action.payload.name] = _objectSpread2({ modal: newModal }, rest);
			return _objectSpread2(_objectSpread2({}, state), newData);
		}
		case ActionType.MODAL_CLOSE: {
			let newState = _objectSpread2({}, state);
			delete newState[action.payload].modal.backdrop;
			delete newState[action.payload].modal.overflowYScroll;
			delete newState[action.payload].modal.title;
			for (const k in newState[action.payload]) if (k != "modal") delete newState[action.payload][k];
			return newState;
		}
	}
	return state;
}
//#endregion
//#region src/reducers/init-error.ts
init_objectSpread2();
var INIT_ERROR_INITIAL_STATE = {
	options: {},
	error: void 0,
	includeStack: true,
	warnings: []
};
function initErrorReducer(state = INIT_ERROR_INITIAL_STATE, action) {
	switch (action.type) {
		case ActionType.INIT_ACKNOWLEDGE_WARNINGS: return _objectSpread2(_objectSpread2({}, state), { warnings: [] });
		case ActionType.INIT_APP: return _objectSpread2(_objectSpread2({}, state), { warnings: makeUnique(action.payload.warnings) });
		case ActionType.INIT_ERROR: {
			const { payload } = action;
			const error = payload.error;
			const options = payload.options;
			let includeStack = payload.includeStack;
			if (typeof includeStack == "undefined") includeStack = true;
			return {
				error,
				options,
				includeStack,
				warnings: []
			};
		}
	}
	return state;
}
//#endregion
//#region src/reducers/map-state.ts
init_objectSpread2();
var MAP_STATE_INITIAL_STATE = {};
var MG_INITIAL_SUB_STATE = {
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
var MAP_STATE_INITIAL_SUB_STATE = {
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
			const mgSubState1 = _objectSpread2(_objectSpread2({}, mgSubState), toApply);
			return mergeSubState(state, mapName, _objectSpread2(_objectSpread2({}, subState), { mapguide: mgSubState1 }));
		}
	}
	return state;
}
function setLayerAction(state, mapName, layerName, selector) {
	const subState = state[mapName];
	if (subState && subState.layers) {
		const state1 = { layers: subState.layers.map((l) => {
			if (l.name == layerName) return _objectSpread2(_objectSpread2({}, l), selector(l));
			else return l;
		}) };
		return mergeSubState(state, mapName, _objectSpread2(_objectSpread2({}, subState), state1));
	}
	return state;
}
function mergeSubState(state, mapName, subState) {
	const state1 = {};
	state1[mapName] = _objectSpread2(_objectSpread2({}, state[mapName]), subState);
	return _objectSpread2(_objectSpread2({}, state), state1);
}
function mapStateReducer(state = MAP_STATE_INITIAL_STATE, action) {
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
			if (!mapNameToApplyInitialState && mapKeys.length == 1) mapNameToApplyInitialState = mapKeys[0];
			for (const mapName of mapKeys) {
				var _state$mapName;
				let cv;
				if (payload.initialView && mapName == mapNameToApplyInitialState) cv = { currentView: _objectSpread2({}, payload.initialView) };
				let isel;
				if (payload.initialSelections && payload.initialSelections[mapName]) {
					isel = { selectionSet: payload.initialSelections[mapName] };
					debug(`Restoring client-side selection set for: ${mapName}`);
				}
				const sl = [];
				const sg = [];
				const hl = [];
				const hg = [];
				let mrtm;
				let mgeneric;
				const rtm = maps[mapName].map;
				if (rtm) if (!isGenericSubjectMapLayer(rtm)) mrtm = {
					runtimeMap: rtm,
					isArbitraryCs: tryParseArbitraryCs(rtm.CoordinateSystem.MentorCode) != null
				};
				else mgeneric = { subject: _objectSpread2({}, rtm) };
				if (mapName == mapNameToApplyInitialState) {
					if (rtm && !isGenericSubjectMapLayer(rtm)) {
						var _payload$initialShowL, _payload$initialShowG, _payload$initialHideL, _payload$initialHideG;
						const isl = (_payload$initialShowL = payload.initialShowLayers) !== null && _payload$initialShowL !== void 0 ? _payload$initialShowL : [];
						const isg = (_payload$initialShowG = payload.initialShowGroups) !== null && _payload$initialShowG !== void 0 ? _payload$initialShowG : [];
						const ihl = (_payload$initialHideL = payload.initialHideLayers) !== null && _payload$initialHideL !== void 0 ? _payload$initialHideL : [];
						const ihg = (_payload$initialHideG = payload.initialHideGroups) !== null && _payload$initialHideG !== void 0 ? _payload$initialHideG : [];
						if (rtm.Layer) {
							for (const l of rtm.Layer) if (isl.indexOf(l.Name) >= 0 && !l.Visible) sl.push(l.ObjectId);
							else if (ihl.indexOf(l.Name) >= 0 && l.Visible) hl.push(l.ObjectId);
						}
						if (rtm.Group) {
							for (const g of rtm.Group) if (isg.indexOf(g.Name) >= 0 && !g.Visible) sg.push(g.ObjectId);
							else if (ihg.indexOf(g.Name) >= 0 && g.Visible) hg.push(g.ObjectId);
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
				const newMgSubState = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, MG_INITIAL_SUB_STATE), mrtm), isel || {}), sl.length > 0 ? { showLayers: [...sl] } : {}), sg.length > 0 ? { showGroups: [...sg] } : {}), hl.length > 0 ? { hideLayers: [...hl] } : {}), hg.length > 0 ? { hideGroups: [...hg] } : {});
				const newMapState = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, MAP_STATE_INITIAL_SUB_STATE), { generic: mgeneric }), { externalBaseLayers: maps[mapName].externalBaseLayers }), { initialExternalLayers: maps[mapName].initialExternalLayers }), { initialView: maps[mapName].initialView }), { coordinateFormat: maps[mapName].coordinateFormat }), cv || {}), { mapguide: newMgSubState });
				if (state === null || state === void 0 || (_state$mapName = state[mapName]) === null || _state$mapName === void 0 ? void 0 : _state$mapName.currentView) newMapState.currentView = state[mapName].currentView;
				newState[mapName] = newMapState;
			}
			return _objectSpread2(_objectSpread2({}, state), newState);
		}
		case ActionType.MAP_PREVIOUS_VIEW: {
			const { payload } = action;
			const subState = state[payload.mapName];
			let rs = state;
			if (subState) {
				const index = subState.historyIndex - 1;
				if (index >= 0) {
					const state1 = {
						historyIndex: index,
						currentView: subState.history[index]
					};
					rs = mergeSubState(state, payload.mapName, _objectSpread2(_objectSpread2({}, subState), state1));
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
				const index = subState.historyIndex + 1;
				if (index < subState.history.length) {
					const state1 = {
						historyIndex: index,
						currentView: subState.history[index]
					};
					rs = mergeSubState(state, payload.mapName, _objectSpread2(_objectSpread2({}, subState), state1));
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
					const view1 = {
						scale,
						resolution: payload.resolution
					};
					view = _objectSpread2(_objectSpread2({}, view), view1);
				}
				const newSubState = _objectSpread2(_objectSpread2({}, { currentView: view }), { historyIndex: subState.historyIndex });
				newSubState.history = [...subState.history];
				if (view && newSubState.history && newSubState.historyIndex != null) {
					newSubState.historyIndex++;
					newSubState.history[newSubState.historyIndex] = view;
					if (newSubState.history.length > newSubState.historyIndex + 1) newSubState.history.splice(newSubState.historyIndex + 1);
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
					const newSubState = _objectSpread2(_objectSpread2({}, { currentView: data }), { historyIndex: subState.historyIndex });
					newSubState.history = [...subState.history];
					if (newSubState.history && newSubState.historyIndex != null) {
						newSubState.historyIndex++;
						newSubState.history[newSubState.historyIndex] = data;
						if (newSubState.history.length > newSubState.historyIndex + 1) newSubState.history.splice(newSubState.historyIndex + 1);
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
				const trans = _objectSpread2({}, mgSubState.layerTransparency);
				trans[payload.layerName] = payload.opacity;
				return { layerTransparency: trans };
			});
		}
		case ActionType.LEGEND_SET_LAYER_SELECTABLE: {
			const { payload } = action;
			return applyMapGuideSubState(state, payload.mapName, (mgSubState) => {
				const layers = _objectSpread2({}, mgSubState.selectableLayers);
				layers[payload.id] = payload.value;
				return { selectableLayers: layers };
			});
		}
		case ActionType.LEGEND_SET_GROUP_EXPANDABLE: {
			const { payload } = action;
			return applyMapGuideSubState(state, payload.mapName, (mgSubState) => {
				const groups = _objectSpread2({}, mgSubState.expandedGroups);
				groups[payload.id] = payload.value;
				return { expandedGroups: groups };
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
				var _subState$clientSelec;
				const cs = (_subState$clientSelec = subState.clientSelection) !== null && _subState$clientSelec !== void 0 ? _subState$clientSelec : { layers: [] };
				let lyr = cs.layers.find((l) => l.name == payload.layerName);
				if (!lyr) {
					lyr = {
						name: payload.layerName,
						features: []
					};
					cs.layers.push(lyr);
				}
				lyr.features.push(payload.feature);
				return mergeSubState(state, payload.mapName, _objectSpread2(_objectSpread2({}, subState), {}, { clientSelection: cs }));
			}
			return state;
		}
		case ActionType.MAP_CLEAR_CLIENT_SELECTION: {
			const { payload } = action;
			const subState = state[payload.mapName];
			if (subState) return mergeSubState(state, payload.mapName, _objectSpread2(_objectSpread2({}, subState), {}, { clientSelection: void 0 }));
			return state;
		}
		case ActionType.MAP_SHOW_SELECTED_FEATURE: {
			const { payload } = action;
			return applyMapGuideSubState(state, payload.mapName, (_) => ({ activeSelectedFeature: {
				layerId: payload.layerId,
				selectionKey: payload.selectionKey
			} }));
		}
		case ActionType.MAP_SET_BASE_LAYER: {
			const { payload } = action;
			const subState = state[payload.mapName];
			if (subState) {
				const state1 = { externalBaseLayers: (subState.externalBaseLayers || []).map((layer) => {
					if (layer.kind != "UTFGrid") layer.visible = false;
					if (layer.name == payload.layerName) layer.visible = true;
					return layer;
				}) };
				return mergeSubState(state, payload.mapName, _objectSpread2(_objectSpread2({}, subState), state1));
			}
			return state;
		}
		case ActionType.EXTERNAL_LAYERS_READY: {
			const { payload } = action;
			const subState = state[payload.mapName];
			if (subState) {
				var _subState$layers;
				const state1 = { layers: (_subState$layers = subState.layers) !== null && _subState$layers !== void 0 ? _subState$layers : [] };
				return mergeSubState(state, payload.mapName, _objectSpread2(_objectSpread2({}, subState), state1));
			}
			return state;
		}
		case ActionType.LAYER_ADDED: {
			const { payload } = action;
			const subState = state[payload.mapName];
			if (subState) {
				var _subState$layers2;
				const state1 = { layers: [payload.layer, ...(_subState$layers2 = subState.layers) !== null && _subState$layers2 !== void 0 ? _subState$layers2 : []] };
				const ss = mergeSubState(state, payload.mapName, _objectSpread2(_objectSpread2({}, subState), state1));
				if (payload.defaultStyle) return setLayerAction(ss, payload.mapName, payload.layer.name, () => ({ vectorStyle: payload.defaultStyle }));
				return ss;
			}
			return state;
		}
		case ActionType.REMOVE_LAYER: {
			const { payload } = action;
			const subState = state[payload.mapName];
			if (subState && subState.layers) {
				const state1 = { layers: subState.layers.filter((l) => l.name != action.payload.layerName) };
				return mergeSubState(state, payload.mapName, _objectSpread2(_objectSpread2({}, subState), state1));
			}
			return state;
		}
		case ActionType.SET_LAYER_VISIBILITY: {
			const { mapName, layerName, visible } = action.payload;
			return setLayerAction(state, mapName, layerName, () => ({ visible }));
		}
		case ActionType.SET_LAYER_OPACITY: {
			const { mapName, layerName, opacity } = action.payload;
			return setLayerAction(state, mapName, layerName, () => ({ opacity }));
		}
		case ActionType.SET_HEATMAP_LAYER_BLUR: {
			const { mapName, layerName, blur } = action.payload;
			return setLayerAction(state, mapName, layerName, (layer) => {
				var _layer$heatmap;
				return { heatmap: _objectSpread2(_objectSpread2({}, (_layer$heatmap = layer.heatmap) !== null && _layer$heatmap !== void 0 ? _layer$heatmap : {
					blur: 15,
					radius: 5
				}), {}, { blur }) };
			});
		}
		case ActionType.SET_HEATMAP_LAYER_RADIUS: {
			const { mapName, layerName, radius } = action.payload;
			return setLayerAction(state, mapName, layerName, (layer) => {
				var _layer$heatmap2;
				return { heatmap: _objectSpread2(_objectSpread2({}, (_layer$heatmap2 = layer.heatmap) !== null && _layer$heatmap2 !== void 0 ? _layer$heatmap2 : {
					blur: 15,
					radius: 5
				}), {}, { radius }) };
			});
		}
		case ActionType.SET_LAYER_INDEX: {
			const { mapName, index, layerName } = action.payload;
			const subState = state[mapName];
			if (subState && subState.layers) {
				const layers = [...subState.layers];
				let currentIdx = -1;
				for (let i = 0; i < layers.length; i++) if (layers[i].name == layerName) {
					currentIdx = i;
					break;
				}
				if (currentIdx >= 0 && currentIdx != index && index < layers.length && index >= 0) {
					const theLayer = layers[currentIdx];
					layers.splice(currentIdx, 1);
					layers.splice(index, 0, theLayer);
					const state1 = { layers };
					return mergeSubState(state, mapName, _objectSpread2(_objectSpread2({}, subState), state1));
				}
			}
			return state;
		}
		case ActionType.SET_LAYER_VECTOR_STYLE: {
			const { mapName, layerName, style, which } = action.payload;
			return setLayerAction(state, mapName, layerName, (current) => {
				if (which == VectorStyleSource.Base) return { vectorStyle: style };
				else if (which == VectorStyleSource.Cluster) return { cluster: _objectSpread2(_objectSpread2({}, current.cluster), {}, { style: _objectSpread2({}, style) }) };
				else return {};
			});
		}
		case ActionType.ADD_LAYER_BUSY_WORKER: {
			const { mapName, layerName } = action.payload;
			return setLayerAction(state, mapName, layerName, (l) => ({ busyWorkerCount: l.busyWorkerCount + 1 }));
		}
		case ActionType.REMOVE_LAYER_BUSY_WORKER: {
			const { mapName, layerName } = action.payload;
			return setLayerAction(state, mapName, layerName, (l) => ({ busyWorkerCount: l.busyWorkerCount - 1 }));
		}
	}
	return state;
}
//#endregion
//#region src/reducers/viewer.ts
init_objectSpread2();
var VIEWER_INITIAL_STATE = {
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
			if (tool != null) state1 = { tool };
			let state2;
			if (typeof ft != "undefined") state2 = { featureTooltipsEnabled: ft };
			return _objectSpread2(_objectSpread2(_objectSpread2({}, state), state1), state2);
		}
		case ActionType.MAP_SET_ACTIVE_TOOL: {
			const state1 = { tool: action.payload };
			return _objectSpread2(_objectSpread2({}, state), state1);
		}
		case ActionType.MAP_SET_MAPTIP: {
			const state1 = { featureTooltipsEnabled: action.payload };
			return _objectSpread2(_objectSpread2({}, state), state1);
		}
		case ActionType.MAP_ENABLE_SELECT_DRAGPAN: {
			const state1 = { selectCanDragPan: action.payload };
			return _objectSpread2(_objectSpread2({}, state), state1);
		}
		case ActionType.MAP_SET_BUSY_COUNT: {
			const state1 = { busyCount: action.payload };
			return _objectSpread2(_objectSpread2({}, state), state1);
		}
		case ActionType.MAP_RESIZED: {
			const state1 = { size: [action.payload.width, action.payload.height] };
			return _objectSpread2(_objectSpread2({}, state), state1);
		}
	}
	return state;
}
//#endregion
//#region src/reducers/mouse.ts
init_objectSpread2();
var MOUSE_INITIAL_STATE = { coords: void 0 };
function mouseReducer(state = MOUSE_INITIAL_STATE, action) {
	switch (action.type) {
		case ActionType.UPDATE_MOUSE_COORDINATES: {
			const data = action.payload.coord;
			if (isCoordinate(data)) {
				const state1 = { coords: data };
				return _objectSpread2(_objectSpread2({}, state), state1);
			}
		}
	}
	return state;
}
//#endregion
//#region src/reducers/root.ts
var rootReducer = {
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
//#endregion
//#region src/store/configure-store.ts
init_objectSpread2();
/**
* Configures and creates a Redux store with optional initial state and extra reducers.
*
* @param initialState - The initial state of the Redux store.
* @param extraReducers - Optional additional reducers to be combined with the root reducer.
* @returns The configured Redux store instance.
* 
* @since 0.15 - Fixed return type to no longer be `any`
*/
function configureStore(initialState, extraReducers) {
	return configureStore$1({
		reducer: combineReducers(extraReducers ? _objectSpread2(_objectSpread2({}, rootReducer), extraReducers) : rootReducer),
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware({
				serializableCheck: false,
				immutableCheck: false
			}).prepend(promiseMiddleware).concat(logger);
		},
		devTools: true
	});
}
//#endregion
//#region src/entries/application.tsx
init_objectSpread2();
/**
* This is the entry point to the Application component
*
* In the browser globals context, this is accessible via MapGuide.Application
*/
var ApplicationViewModel = class {
	/**
	* @hidden
	*/
	constructor() {}
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
		var _props$subscribers, _props$mapguide, _props$mapguide$agent, _props$mapguide2;
		const subs = (_props$subscribers = props.subscribers) !== null && _props$subscribers !== void 0 ? _props$subscribers : [];
		const agentConf = {
			agentUri: (_props$mapguide = props.mapguide) === null || _props$mapguide === void 0 ? void 0 : _props$mapguide.agentUri,
			agentKind: (_props$mapguide$agent = (_props$mapguide2 = props.mapguide) === null || _props$mapguide2 === void 0 ? void 0 : _props$mapguide2.agentKind) !== null && _props$mapguide$agent !== void 0 ? _props$mapguide$agent : "mapagent"
		};
		const initState = _objectSpread2(_objectSpread2({}, { config: _objectSpread2(_objectSpread2(_objectSpread2({}, CONFIG_INITIAL_STATE), agentConf), props.initialConfig || {}) }), this.getExtraInitialState());
		const extraReducers = this.getExtraReducers();
		this._store = configureStore(initState, extraReducers);
		const provider = new MapGuideMapProviderContext();
		import_react_dom.render(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MapContextProvider, {
			value: provider,
			store: this._store,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, _objectSpread2({}, props)), subs.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Subscriber, _objectSpread2({}, s), `subscriber-${i}-${s.name}`))]
		}), node);
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
};
//#endregion
//#region src/entries/library.tsx
var library_exports = /* @__PURE__ */ __exportAll({
	Actions: () => Actions,
	Application: () => ApplicationViewModel,
	ElementGroup: () => ElementGroup,
	ElementProvider: () => ElementProvider,
	Externals: () => Externals,
	MinimalProvider: () => provider,
	Registry: () => Registry,
	TypedSelect: () => TypedSelect,
	__BRANCH__: () => __BRANCH__,
	__COMMITHASH__: () => __COMMITHASH__,
	__DEV__: () => __DEV__,
	__VERSION__: () => __VERSION__,
	getStateFromUrl: () => getStateFromUrl,
	setAssetRoot: () => setAssetRoot,
	updateUrl: () => updateUrl,
	useElementContext: () => useElementContext
});
init_objectSpread2();
addFormatDriver(new CsvFormatDriver(CSV_COLUMN_ALIASES));
addFormatDriver(new FormatDriver("GeoJSON", new GeoJSON()));
addFormatDriver(new FormatDriver("TopoJSON", new TopoJSON()));
addFormatDriver(new FormatDriver("KML", new KML(), "EPSG:4326"));
addFormatDriver(new FormatDriver("GPX", new GPX(), "EPSG:4326"));
addFormatDriver(new FormatDriver("IGC", new IGC()));
var DEFAULT_CAPS = { hasTaskPane: true };
registerLayout("ajax-viewer", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AjaxViewerLayout, {}), DEFAULT_CAPS);
registerLayout("sidebar", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarLayout, {}), DEFAULT_CAPS);
registerLayout("aqua", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AquaTemplateLayout, {}), DEFAULT_CAPS);
registerLayout("turquoise-yellow", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TurquoiseYellowTemplateLayout, {}), DEFAULT_CAPS);
registerLayout("limegold", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LimeGoldTemplateLayout, {}), DEFAULT_CAPS);
registerLayout("slate", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlateTemplateLayout, {}), DEFAULT_CAPS);
registerLayout("maroon", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaroonTemplateLayout, {}), DEFAULT_CAPS);
registerLayout("generic", () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericLayout, {}), { hasTaskPane: false });
initDefaultCommands();
initMapGuideCommands();
registerDefaultComponents();
registerMapGuideComponents();
registerComponentFactory(DefaultComponentNames.Map, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapViewer, _objectSpread2({}, props)));
registerRequestBuilder("mapagent", (agentUri, locale) => new MapAgentRequestBuilder(agentUri, locale));
/**
* Indicates if this library is in development mode. If false, this is in production mode
*
* Certain functionality (eg. Logging) is disabled in production mode.
*/
var __DEV__;
/**
* The git version (as generated by "git describe") that this bundle was built from
* 
* @since 0.13
*/
var __VERSION__;
/**
* The git commit hash that this bundle was built from
* 
* @since 0.13
*/
var __COMMITHASH__;
/**
* The git branch that this bundle was built from
* 
* @since 0.13
*/
var __BRANCH__;
/**
* A helper class for use in the browser globals context to register any of the following:
*  - String bundles
*  - Layout components
*  - Custom commands
*  - Component factories
*
* @class Registry
*/
var Registry = class {
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
		ExternalLayerFactoryRegistry.getInstance().registerExternalVectorLayerCreator(driverName, creator);
	}
};
/**
* The top-level namespace for key external libraries
*/
var Externals = {
	/**
	* The exported public API for proj4js
	*/
	proj4,
	/**
	* The exported public API for React
	*/
	React: import_react.default,
	/**
	* The exported public API for ReactDOM
	*/
	ReactDOM: import_react_dom
};
/**
* The top-level namespace for all dispatchable actions
*/
var Actions = {
	Map: map_exports,
	Legend: legend_exports,
	Flyout: flyout_exports,
	Modal: modal_exports,
	TaskPane: taskpane_exports,
	Template: template_exports,
	App: app_exports
};
//#endregion
//#region src/entries/browser-global.ts
if (typeof window !== "undefined") window.MapGuide = library_exports;
//#endregion
export { MDF_INFINITY as n, MgError as t };

//# sourceMappingURL=viewer-debug.js.map