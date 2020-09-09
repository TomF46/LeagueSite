import {
  handleResponse,
  handleError,
  getDefaultHeaders,
  getDefaultHeadersWithContentType,
} from "./apiUtils";
const baseUrl = process.env.API_URL + "/seasons/";

export function getSeasons() {
  return fetch(baseUrl, { headers: getDefaultHeaders() })
    .then(handleResponse)
    .catch(handleError);
}

export function getSeasonById(id) {
  return fetch(baseUrl + id, { headers: getDefaultHeaders() })
    .then(handleResponse)
    .catch(handleError);
}

export function getStatsForSeasonById(id) {
  return fetch(baseUrl + id + "/stats", { headers: getDefaultHeaders() })
    .then(handleResponse)
    .catch(handleError);
}

export function saveSeason(season) {
  return fetch(baseUrl + (season.id || ""), {
    method: season.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: getDefaultHeadersWithContentType(),
    body: JSON.stringify(season),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteSeason(seasonId) {
  return fetch(baseUrl + seasonId, {
    method: "DELETE",
    headers: getDefaultHeaders(),
  })
    .then(handleResponse)
    .catch(handleError);
}
