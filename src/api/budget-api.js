import { handleResponse, handleError } from "./api-utils";

const baseUrl = process.env.API_URL + "/budgets/";

export function getBudgets() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveBudget(budget) {
  return fetch(baseUrl + (budget.id || ""), {
    method: budget.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(budget)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteBudget(budgetId) {
  return fetch(baseUrl + budgetId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
