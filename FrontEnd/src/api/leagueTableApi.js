import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/leagueTable/";

export function getLeagueTableByLeagueId(id) {
  return fetch(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
}
