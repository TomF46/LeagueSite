import { combineReducers } from "redux";
import clubs from "./clubReducer";
import squads from "./squadReducer";
import players from "./playerReducer";
import transfers from "./transferReducer";
import leagues from "./leagueReducer";
import seasons from "./seasonReducer";
import user from "./authenticationReducer";

import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  clubs,
  squads,
  players,
  transfers,
  leagues,
  seasons,
  user,
  apiCallsInProgress,
});

export default rootReducer;
