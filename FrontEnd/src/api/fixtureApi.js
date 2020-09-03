import {
  handleResponse,
  handleError,
  getDefaultHeaders,
  getDefaultHeadersWithContentType,
} from "./apiUtils";
const baseUrl = process.env.API_URL + "/fixtures/";

export function getFixtures() {
  return fetch(baseUrl, { headers: getDefaultHeaders() })
    .then(handleResponse)
    .catch(handleError);
}

export function getFixtureById(id) {
  return fetch(baseUrl + id, { headers: getDefaultHeaders() })
    .then(handleResponse)
    .catch(handleError);
}

export function saveFixture(fixture) {
  return fetch(baseUrl + (fixture.id || ""), {
    method: fixture.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: getDefaultHeadersWithContentType(),
    body: JSON.stringify(fixture),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteFixture(fixtureId) {
  return fetch(baseUrl + fixtureId, {
    method: "DELETE",
    headers: getDefaultHeaders(),
  })
    .then(handleResponse)
    .catch(handleError);
}
