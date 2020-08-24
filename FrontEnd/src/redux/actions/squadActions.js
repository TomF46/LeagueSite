import * as types from "./actionTypes";
import * as squadApi from "../../api/squadApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadSquadsSuccess(squads) {
  return { type: types.LOAD_SQUADS_SUCCESS, squads };
}

export function createSquadSuccess(squad) {
  return { type: types.CREATE_SQUAD_SUCCESS, squad };
}

export function updateSquadSuccess(squad) {
  return { type: types.UPDATE_SQUAD_SUCCESS, squad };
}

export function deleteSquadOptimistic(squad) {
  return { type: types.DELETE_SQUAD_OPTIMISTIC, squad };
}

export function AddSquadToLeagueSuccess(squad) {
  return { type: types.ADD_SQUAD_TO_LEAGUE_SUCCESS, squad };
}

export function loadSquads() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return squadApi
      .getSquads()
      .then((squads) => {
        dispatch(loadSquadsSuccess(squads));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function saveSquad(squad) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return squadApi
      .saveSquad(squad)
      .then((savedSquad) => {
        squad.id
          ? dispatch(updateSquadSuccess(savedSquad))
          : dispatch(createSquadSuccess(savedSquad));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function deleteSquad(squad) {
  return function (dispatch) {
    dispatch(deleteSquadOptimistic(squad));
    return squadApi.deleteSquad(squad.id);
  };
}

export function addSquadToLeague(relation) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return squadApi.AddSquadToLeague(relation).then((squad) => {
      dispatch(AddSquadToLeagueSuccess(squad));
    });
  };
}
