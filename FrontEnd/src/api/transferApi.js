import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/transfers/";

export function getTransfers() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveTransfer(transfer) {
  return fetch(baseUrl + (transfer.id || ""), {
    method: transfer.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(transfer),
  })
    .then(handleResponse)
    .catch(handleError);
}
