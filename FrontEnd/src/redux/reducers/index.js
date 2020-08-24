import { combineReducers } from "redux";
import clubs from "./clubReducer";
import squads from "./squadReducer";
import players from "./playerReducer";
import transfers from "./transferReducer";
import leagues from "./leagueReducer";

import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  clubs,
  squads,
  players,
  transfers,
  leagues,
  apiCallsInProgress,
});

export default rootReducer;
