import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function PlayerReducer(state = initialState.players, action) {
  switch (action.type) {
    case types.CREATE_PLAYER_SUCCESS:
      return [...state, { ...action.player }];
    case types.UPDATE_PLAYER_SUCCESS:
      return state.map((player) =>
        player.id === action.player.id ? action.player : player
      );
    case types.DELETE_PLAYER_OPTIMISTIC:
      return state.filter((player) => player.id != action.player.id);
    case types.LOAD_PLAYERS_SUCCESS:
      return action.players;
    default:
      return state;
  }
}
