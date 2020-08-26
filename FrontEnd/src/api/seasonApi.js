import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/seasons/";

export function getSeasons() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getSeasonById(id) {
  return fetch(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
}

export function saveSeason(season) {
  return fetch(baseUrl + (season.id || ""), {
    method: season.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(season),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteSeason(seasonId) {
  return fetch(baseUrl + seasonId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
