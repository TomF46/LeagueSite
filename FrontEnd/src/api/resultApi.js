import {
  handleResponse,
  handleError,
  getDefaultHeadersWithContentType,
  getDefaultHeaders,
} from "./apiUtils";
const baseUrl = process.env.API_URL + "/results/";

export function saveResult(result) {
  return fetch(baseUrl, {
    method: "POST",
    headers: getDefaultHeadersWithContentType(),
    body: JSON.stringify(result),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteResult(fixture) {
  return fetch(baseUrl + fixture.id, {
    method: "DELETE",
    headers: getDefaultHeaders(),
  })
    .then(handleResponse)
    .catch(handleError);
}
