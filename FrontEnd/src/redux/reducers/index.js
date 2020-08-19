import { combineReducers } from "redux";
import clubs from "./clubReducer";
import squads from "./squadReducer";
import players from "./playerReducer";
import transfers from "./transferReducer";

import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  clubs,
  squads,
  players,
  transfers,
  apiCallsInProgress,
});

export default rootReducer;
