import { combineReducers } from "redux";
import { configReducer} from "./config";
import { runtimeMapReducer } from "./map";
import { sessionReducer } from "./session";
import { commandsReducer } from "./commands";
import { viewReducer } from "./view";
import { selectionReducer } from "./selection";

const rootReducer = combineReducers({
    config: configReducer,
    map: runtimeMapReducer,
    session: sessionReducer,
    commands: commandsReducer,
    view: viewReducer,
    selection: selectionReducer
});

export default rootReducer;
