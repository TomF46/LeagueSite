import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function SeasonReducer(state = initialState.seasons, action) {
  switch (action.type) {
    case types.CREATE_SEASON_SUCCESS:
      return [...state, { ...action.season }];
    case types.UPDATE_SEASON_SUCCESS:
      return state.map((season) =>
        season.id === action.season.id ? action.season : season
      );
    case types.DELETE_SEASON_OPTIMISTIC:
      return state.filter((season) => season.id != action.season.id);
    case types.LOAD_SEASONS_SUCCESS:
      return action.seasons;
    default:
      return state;
  }
}
