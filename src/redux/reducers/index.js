import { combineReducers } from "redux";
import clubs from "./clubReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  clubs,
  apiCallsInProgress,
});

export default rootReducer;
