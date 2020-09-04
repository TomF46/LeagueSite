import * as types from "./actionTypes";
import * as transferApi from "../../api/transferApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadTransfersSuccess(transfers) {
  return { type: types.LOAD_TRANSFERS_SUCCESS, transfers };
}

export function createTransferSuccess(transfer) {
  return { type: types.CREATE_TRANSFER_SUCCESS, transfer };
}

export function loadTransfers() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return transferApi
      .getTransfers()
      .then((transfers) => {
        dispatch(loadTransfersSuccess(transfers));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function saveTransfer(transfer) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return transferApi
      .saveTransfer(transfer)
      .then((savedTransfer) => {
        dispatch(createTransferSuccess(savedTransfer));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}
