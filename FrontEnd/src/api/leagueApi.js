import {
  handleResponse,
  handleError,
  getDefaultHeaders,
  getDefaultHeadersWithContentType,
} from "./apiUtils";
const baseUrl = process.env.API_URL + "/leagues/";

export function getLeagues() {
  return fetch(baseUrl, { headers: getDefaultHeaders() })
    .then(handleResponse)
    .catch(handleError);
}

export function getLeagueById(id) {
  return fetch(baseUrl + id, { headers: getDefaultHeaders() })
    .then(handleResponse)
    .catch(handleError);
}

export function saveLeague(league) {
  return fetch(baseUrl + (league.id || ""), {
    method: league.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: getDefaultHeadersWithContentType(),
    body: JSON.stringify(league),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteLeague(leagueId) {
  return fetch(baseUrl + leagueId, {
    method: "DELETE",
    headers: getDefaultHeaders(),
  })
    .then(handleResponse)
    .catch(handleError);
}
