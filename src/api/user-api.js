import { handleResponse, handleError } from "./api-utils";

const baseUrl = (process.env.API_URL = "/users/");

export function getUsers() {
  return fetch(baseUrl)
    .then(handleResponse)
    .then(handleError);
}
