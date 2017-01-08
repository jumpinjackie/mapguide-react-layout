import { combineReducers } from "redux";
import { configReducer} from "./config";
import { toolbarReducer } from "./toolbar";
import { taskPaneReducer } from "./taskpane";
import { lastAction } from "./last-action";
import { modalReducer } from "./modal";
import { initErrorReducer } from "./init-error";
import { mapStateReducer } from "./map-state";
import { viewerReducer } from "./viewer";

const rootReducer: any = combineReducers({
    initError: initErrorReducer,
    config: configReducer,
    mapState: mapStateReducer,
    viewer: viewerReducer,
    toolbar: toolbarReducer,
    taskpane: taskPaneReducer,
    modal: modalReducer,
    lastaction: lastAction
});

export default rootReducer;
