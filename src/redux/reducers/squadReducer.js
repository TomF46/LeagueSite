import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function SquadReducer(state = initialState.squads, action) {
  switch (action.type) {
    case types.CREATE_SQUAD_SUCCESS:
      return [...state, { ...action.squad }];
    case types.UPDATE_SQUAD_SUCCESS:
      return state.map((squad) =>
        squad.id === action.squad.id ? action.squad : squad
      );
    case types.DELETE_SQUAD_OPTIMISTIC:
      return state.filter((squad) => squad.id != action.squad.id);
    case types.LOAD_SQUADS_SUCCESS:
      return action.squads;
    default:
      return state;
  }
}
