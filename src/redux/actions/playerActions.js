import * as types from "./actionTypes";
import * as playerApi from "../../api/playerApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadPlayersSuccess(players) {
  return { type: types.LOAD_PLAYERS_SUCCESS, players };
}

export function createPlayerSuccess(player) {
  return { type: types.CREATE_PLAYER_SUCCESS, player };
}

export function updatePlayerSuccess(player) {
  return { type: types.UPDATE_PLAYER_SUCCESS, player };
}

export function deletePlayerOptimistic(player) {
  return { type: types.DELETE_PLAYER_OPTIMISTIC, player };
}

export function loadPlayers() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return playerApi
      .getPlayers()
      .then((players) => {
        dispatch(loadPlayersSuccess(players));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function savePlayer(player) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return playerApi
      .savePlayer(player)
      .then((savedPlayer) => {
        player.id
          ? dispatch(updatePlayerSuccess(savedPlayer))
          : dispatch(createPlayerSuccess(savedPlayer));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function deletePlayer(player) {
  return function (dispatch) {
    dispatch(deletePlayerOptimistic(player));
    return playerApi.deletePlayer(player.id);
  };
}
