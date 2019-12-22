import { handleResponse, handleError } from "./api-utils";

const baseUrl = process.env.API_URL + "/categories/";

export async function getCategories() {
  try {
    let response = await fetch(baseUrl);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function saveCategory(category) {
  try {
    let reponse = await fetch(baseUrl + (category.id || ""), {
      method: category.id ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(category)
    });
    return handleResponse(reponse);
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteCategory(categoryId) {
  try {
    let response = await fetch(baseUrl + categoryId, {
      method: "DELETE"
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
