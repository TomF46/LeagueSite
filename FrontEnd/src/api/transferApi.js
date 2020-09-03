import {
  handleResponse,
  handleError,
  getDefaultHeaders,
  getDefaultHeadersWithContentType,
} from "./apiUtils";
const baseUrl = process.env.API_URL + "/transfers/";

export function getTransfers() {
  return fetch(baseUrl, { headers: getDefaultHeaders() })
    .then(handleResponse)
    .catch(handleError);
}

export function saveTransfer(transfer) {
  return fetch(baseUrl + (transfer.id || ""), {
    method: transfer.id ? "PUT" : "POST",
    headers: getDefaultHeadersWithContentType(),
    body: JSON.stringify(transfer),
  })
    .then(handleResponse)
    .catch(handleError);
}
