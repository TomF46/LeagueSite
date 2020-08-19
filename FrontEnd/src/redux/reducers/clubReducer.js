import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function ClubReducer(state = initialState.clubs, action) {
  switch (action.type) {
    case types.CREATE_CLUB_SUCCESS:
      return [...state, { ...action.club }];
    case types.UPDATE_CLUB_SUCCESS:
      return state.map((club) =>
        club.id === action.club.id ? action.club : club
      );
    case types.DELETE_CLUB_OPTIMISTIC:
      return state.filter((club) => club.id != action.club.id);
    case types.LOAD_CLUBS_SUCCESS:
      return action.clubs;
    default:
      return state;
  }
}
