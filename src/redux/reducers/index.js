import { combineReducers } from "redux";
import clubs from "./clubReducer";
import squads from "./squadReducer";
import players from "./playerReducer";

import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  clubs,
  squads,
  players,
  apiCallsInProgress,
});

export default rootReducer;
