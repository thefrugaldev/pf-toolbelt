import { handleResponse, handleError, buildQueryString } from "./api-utils";

const baseUrl = process.env.API_URL + "/budgets/";

export function getBudgets(filters) {
  const requestUrl = baseUrl.concat(buildQueryString(filters));

  return fetch(requestUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveBudget(budget) {
  return fetch(baseUrl + (budget._id || ""), {
    method: budget._id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(budget)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteBudget(budgetId) {
  return fetch(baseUrl + budgetId, {
    method: "DELETE",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}
