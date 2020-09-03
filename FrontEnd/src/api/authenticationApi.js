import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authentication/";

export function Login(userLoginDetails) {
  return fetch(baseUrl + "authenticate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userLoginDetails),
  })
    .then(handleResponse)
    .catch(handleError);
}
