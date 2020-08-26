import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/results/";

export function saveResult(result) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(result),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteResult(fixture) {
  return fetch(baseUrl + fixture.id, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
