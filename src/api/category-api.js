import { handleResponse, handleError } from "./api-utils";

const baseUrl = process.env.API_URL + "/categories/";

export function getCategories() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export async function saveCategory(category) {
  return fetch(baseUrl + (category.id || ""), {
    method: category.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(category)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCategory(categoryId) {
  return fetch(baseUrl + categoryId, {
    method: "DELETE",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}
