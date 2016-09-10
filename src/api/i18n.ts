import * as logger from "../utils/logger";

//TODO: Move to separate module
const STRINGS_EN: any = {
    "TPL_SIDEBAR_OPEN_TASKPANE": "Open Task Pane",
    "TPL_SIDEBAR_OPEN_LEGEND": "Open Legend",
    "TPL_SIDEBAR_OPEN_SELECTION_PANEL": "Open Selection Panel",
    "TT_GO_HOME": "Go home",
    "TT_GO_BACK": "Go back",
    "TT_GO_FORWARD": "Go forward",
    "SESSION_EXPIRED": "Session Expired",
    "SESSION_EXPIRED_DETAILED": "Your current MapGuide session has expired",
    "SESSION_EXPIRED_AVAILABLE_ACTIONS": "Available Actions:",
    "SESSION_EXPIRED_RELOAD_VIEWER": "Reload the viewer",
    "ERR_UNREGISTERED_COMPONENT": "ERROR: No such registered component ({componentId}). Ensure the component has been registered in the component registry with an id of: {componentId}",
    "LOADING_MSG": "Loading ...",
    "MENU_TASKS": "Tasks",
    "NO_SELECTED_FEATURES": "No selected features",
    "FMT_SCALE_DISPLAY": "Scale - 1:{scale}",
    "FMT_SELECTION_COUNT": "Selected {total} features in {layerCount} layers",
    "DIGITIZE_POINT_PROMPT": "Click to finish and draw a point at this location<br/><br/>Press ESC to cancel",
    "DIGITIZE_LINE_PROMPT": "Click to set this position as the start.<br/>Click again to finish the line at this position<br/><br/>Press ESC to cancel",
    "DIGITIZE_LINESTRING_PROMPT": "Click to set this position as the start.<br/>Click again to add a vertex at this position.<br/>Hold SHIFT and drag while digitizing to draw in freehand mode<br/></br>Double click to finish<br/>Press ESC to cancel",
    "DIGITIZE_CIRCLE_PROMPT": "Click to set this position as the center.<br/>Move out to the desired radius and click again to finish<br/><br/>Press ESC to cancel",
    "DIGITIZE_RECT_PROMPT": "Click to set this position as one corner.<br/>Click again to finish and set this position as the other corner<br/><br/>Press ESC to cancel",
    "DIGITIZE_POLYGON_PROMPT": "Click to set this positon as the start.<br/>Click again to add a vertex at this position.<br/>Hold SHIFT and drag while digitizing to draw in freehand mode<br/><br/>Double click to finish and close the polygon<br/>Press ESC to cancel",
    "MEASUREMENT_TYPE": "Measurement Type",
    "MEASUREMENT_TYPE_LENGTH": "Length (LineString)",
    "MEASUREMENT_TYPE_AREA": "Area (Polygon)",
    "MEASUREMENT_USE_GEODESIC": "Use geodesic measure",
    "MEASUREMENT_CLEAR": "Clear Measurements",
    "MEASUREMENT_CONTINUE_POLYGON": "Click to continue drawing the polygon. Double-click to finish.",
    "MEASUREMENT_CONTINUE_LINE": "Click to continue drawing the line. Double-click to finish.",
    "MEASUREMENT_START_DRAWING": "Click to start drawing",
    "NAVIGATOR_PAN_EAST": "Pan East",
    "NAVIGATOR_PAN_WEST": "Pan West",
    "NAVIGATOR_PAN_SOUTH": "Pan South",
    "NAVIGATOR_PAN_NORTH": "Pan North",
    "NAVIGATOR_ZOOM_OUT": "Zoom Out",
    "NAVIGATOR_ZOOM_IN": "Zoom In",
    "FMT_NAVIGATOR_ZOOM_TO_SCALE": "Zoom to 1:{scale}",
    "EXTERNAL_BASE_LAYERS": "External Base Layers"
};

const STRINGS: any = {
    "en": STRINGS_EN
};

export function fmt(format: string, args?: any): string {
    let str = format;
    if (args != null) {
        for (const p in args) {
            //str = str.replace(new RegExp(`\{${p}\}`, "g"), `${args[p]}`);
            str = str.split(`{${p}}`).join(args[p]);
        }
        return str;
    };
    return str;
}

/**
 * Returns the localized string for the given key
 */
export function tr(key: string, locale = "en", args?: any): string {
    const bundle = STRINGS[locale];
    if (!bundle) {
        logger.warn(`No such string bundle for locale: ${locale}`);
        return key;
    } else {
        let str = bundle[key];
        if (!str) {
            logger.warn(`String bundle for locale (${locale}) is missing localized string for key: ${key}`);
            return key;
        } else {
            if (args != null) {
                return fmt(str, args);
            }
            return str;
        }
    }
}