import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function LeagueReducer(state = initialState.leagues, action) {
  switch (action.type) {
    case types.CREATE_LEAGUE_SUCCESS:
      return [...state, { ...action.league }];
    case types.UPDATE_LEAGUE_SUCCESS:
      return state.map((league) =>
        league.id === action.league.id ? action.league : league
      );
    case types.DELETE_LEAGUE_OPTIMISTIC:
      return state.filter((league) => league.id != action.league.id);
    case types.LOAD_LEAGUES_SUCCESS:
      return action.leagues;
    default:
      return state;
  }
}
