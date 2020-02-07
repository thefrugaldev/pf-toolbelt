import { handleResponse, handleError, buildQueryString } from "./api-utils";

const baseUrl = process.env.API_URL + "/line-items/";

export function getLineItems(filters) {
  const requestUrl = baseUrl.concat(buildQueryString(filters));

  return fetch(requestUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveLineItem(lineItem) {
  return fetch(baseUrl + (lineItem._id || ""), {
    method: lineItem._id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(lineItem)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteLineItem(lineItemId) {
  return fetch(baseUrl + lineItemId, {
    method: "DELETE",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}
