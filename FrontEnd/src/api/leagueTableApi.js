import { handleResponse, handleError, getDefaultHeaders } from "./apiUtils";
const baseUrl = process.env.API_URL + "/leagueTable/";

export function getLeagueTableByLeagueId(id) {
  return fetch(baseUrl + id, { headers: getDefaultHeaders() })
    .then(handleResponse)
    .catch(handleError);
}
