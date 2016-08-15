import { combineReducers } from "redux";
import { configReducer} from "./config";
import { runtimeMapReducer } from "./map";
import { sessionReducer } from "./session";
import { toolbarReducer } from "./toolbar";
import { viewReducer } from "./view";
import { selectionReducer } from "./selection";

const rootReducer = combineReducers({
    config: configReducer,
    map: runtimeMapReducer,
    session: sessionReducer,
    toolbar: toolbarReducer,
    view: viewReducer,
    selection: selectionReducer
});

export default rootReducer;
