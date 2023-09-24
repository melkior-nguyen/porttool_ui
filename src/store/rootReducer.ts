import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import monitorReducer from "./monitor/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  monitor: monitorReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
