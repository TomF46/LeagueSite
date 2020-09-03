import {
  handleResponse,
  handleError,
  getDefaultHeaders,
  getDefaultHeadersWithContentType,
} from "./apiUtils";
const baseUrl = process.env.API_URL + "/squads/";
const baseUrlForQueryString = process.env.API_URL + "/squads";

export function getSquads() {
  return fetch(baseUrl, { headers: getDefaultHeaders() })
    .then(handleResponse)
    .catch(handleError);
}

export function getSquadById(id) {
  return fetch(baseUrl + id, { headers: getDefaultHeaders() })
    .then(handleResponse)
    .catch(handleError);
}

export function getSquadByClubId(id) {
  return fetch(baseUrlForQueryString + "?clubId=" + id, {
    headers: getDefaultHeaders(),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveSquad(squad) {
  return fetch(baseUrl + (squad.id || ""), {
    method: squad.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: getDefaultHeadersWithContentType(),
    body: JSON.stringify(squad),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function AddSquadToLeague(req) {
  return fetch(baseUrl + "AddToLeague", {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: getDefaultHeadersWithContentType(),
    body: JSON.stringify(req),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteSquad(squadId) {
  return fetch(baseUrl + squadId, {
    method: "DELETE",
    headers: getDefaultHeaders(),
  })
    .then(handleResponse)
    .catch(handleError);
}
