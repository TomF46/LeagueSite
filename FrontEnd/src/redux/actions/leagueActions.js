import * as types from "./actionTypes";
import * as leagueApi from "../../api/leagueApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadLeaguesSuccess(leagues) {
  return { type: types.LOAD_LEAGUES_SUCCESS, leagues };
}

export function createLeagueSuccess(league) {
  return { type: types.CREATE_LEAGUE_SUCCESS, league };
}

export function updateLeagueSuccess(league) {
  return { type: types.UPDATE_LEAGUE_SUCCESS, league };
}

export function deleteLeagueOptimistic() {
  return { type: types.DELETE_LEAGUE_OPTIMISTIC };
}

export function loadLeagues() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return leagueApi
      .getLeagues()
      .then((leagues) => {
        dispatch(loadLeaguesSuccess(leagues));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function saveLeague(league) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return leagueApi
      .saveLeague(league)
      .then((savedLeague) => {
        league.id
          ? dispatch(updateLeagueSuccess(savedLeague))
          : dispatch(createLeagueSuccess(savedLeague));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function deleteLeague(league) {
  return function (dispatch) {
    dispatch(deleteLeagueOptimistic(league));
    return leagueApi.deleteLeague(league.id);
  };
}
