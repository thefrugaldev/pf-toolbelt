import { handleResponse, handleError } from "./api-utils";

const baseUrl = process.env.API_URL + "/budgets/";

export function getBudgets() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveBudget(budget) {
  if (!budget.month || !budget.day || !budget.year) {
    const currentDate = new Date();

    budget.day = currentDate.getDate();
    budget.month = currentDate.getMonth() + 1; // Get month is zero-based
    budget.year = currentDate.getFullYear();
  }

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
