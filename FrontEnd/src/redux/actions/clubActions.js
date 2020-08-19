import * as types from "./actionTypes";
import * as clubApi from "../../api/clubApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadClubsSuccess(clubs) {
  return { type: types.LOAD_CLUBS_SUCCESS, clubs };
}

export function createClubSuccess(club) {
  return { type: types.CREATE_CLUB_SUCCESS, club };
}

export function updateClubSuccess(club) {
  return { type: types.UPDATE_CLUB_SUCCESS, club };
}

export function deleteClubOptimistic(club) {
  return { type: types.DELETE_CLUB_OPTIMISTIC, club };
}

export function loadClubs() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return clubApi
      .getClubs()
      .then((clubs) => {
        dispatch(loadClubsSuccess(clubs));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function saveClub(club) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return clubApi
      .saveClub(club)
      .then((savedClub) => {
        club.id
          ? dispatch(updateClubSuccess(savedClub))
          : dispatch(createClubSuccess(savedClub));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function deleteClub(club) {
  return function (dispatch) {
    dispatch(deleteClubOptimistic(club));
    return clubApi.deleteClub(club.id);
  };
}
