import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/clubs/";

export function getClubs() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function getClubById(id) {
  return fetch(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
}

export function saveClub(club) {
  return fetch(baseUrl + (club.id || ""), {
    method: club.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(club),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteClub(clubId) {
  return fetch(baseUrl + clubId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
