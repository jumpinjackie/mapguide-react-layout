import { combineReducers } from "redux";
import { configReducer} from "./config";
import { toolbarReducer } from "./toolbar";
import { taskPaneReducer } from "./taskpane";
import { lastAction } from "./last-action";
import { modalReducer } from "./modal";
import { initErrorReducer } from "./init-error";
import { mapStateReducer } from "./map-state";
import { viewerReducer } from "./viewer";
import { mouseReducer } from "./mouse";
import { templateReducer } from "./template";

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

export default rootReducer;
