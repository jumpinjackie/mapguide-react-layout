import { combineReducers } from "redux";
import { configReducer} from "./config";
import { runtimeMapReducer } from "./map";
import { sessionReducer } from "./session";
import { toolbarReducer } from "./toolbar";
import { viewReducer } from "./view";
import { selectionReducer } from "./selection";
import { legendReducer } from "./legend";

const rootReducer = combineReducers({
    config: configReducer,
    map: runtimeMapReducer,
    session: sessionReducer,
    toolbar: toolbarReducer,
    view: viewReducer,
    selection: selectionReducer,
    legend: legendReducer
});

export default rootReducer;
