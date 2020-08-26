import { combineReducers } from "redux";
import clubs from "./clubReducer";
import squads from "./squadReducer";
import players from "./playerReducer";
import transfers from "./transferReducer";
import leagues from "./leagueReducer";
import seasons from "./seasonReducer";

import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  clubs,
  squads,
  players,
  transfers,
  leagues,
  seasons,
  apiCallsInProgress,
});

export default rootReducer;
