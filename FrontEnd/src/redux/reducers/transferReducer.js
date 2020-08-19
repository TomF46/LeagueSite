import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function TransferReducer(
  state = initialState.transfers,
  action
) {
  switch (action.type) {
    case types.CREATE_TRANSFER_SUCCESS:
      return [...state, { ...action.transfer }];
    case types.LOAD_TRANSFERS_SUCCESS:
      return action.transfers;
    default:
      return state;
  }
}
