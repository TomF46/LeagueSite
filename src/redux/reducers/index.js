import { combineReducers } from "redux";
import clubs from "./clubReducer";
import squads from "./squadReducer";

import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  clubs,
  squads,
  apiCallsInProgress,
});

export default rootReducer;
