import * as types from "./actionTypes";
import * as seasonApi from "../../api/seasonApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadSeasonsSuccess(seasons) {
  return { type: types.LOAD_SEASONS_SUCCESS, seasons };
}

export function createSeasonSuccess(season) {
  return { type: types.CREATE_SEASON_SUCCESS, season };
}

export function updateSeasonSuccess(season) {
  return { type: types.UPDATE_SEASON_SUCCESS, season };
}

export function deleteSeasonOptimistic() {
  return { type: types.DELETE_SEASON_OPTIMISTIC };
}

export function loadSeasons() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return seasonApi
      .getSeasons()
      .then((seasons) => {
        dispatch(loadSeasonsSuccess(seasons));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function saveSeason(season) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return seasonApi
      .saveSeason(season)
      .then((savedSeason) => {
        season.id
          ? dispatch(updateSeasonSuccess(savedSeason))
          : dispatch(createSeasonSuccess(savedSeason));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function deleteSeason(season) {
  return function (dispatch) {
    dispatch(deleteSeasonOptimistic(season));
    return seasonApi.deleteSeason(season.id);
  };
}
