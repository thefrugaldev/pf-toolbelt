import * as actionTypes from "./action-type-constants";
import * as categoryApi from "../../api/category-api";
import { beginApiCall, apiCallError } from "./api-status-actions";

export function loadCategoriesSuccess(categories) {
  return { type: actionTypes.LOAD_CATEGORIES_SUCCESS, categories };
}

export function createCategorySuccess(category) {
  return { type: actionTypes.CREATE_CATEGORY_SUCCESS, category };
}

export function updateCategorySuccess(category) {
  return { type: actionTypes.UPDATE_CATEGORY_SUCCESS, category };
}

export function deleteCategoryOptimistic(category) {
  return { type: actionTypes.DELETE_CATEGORY_OPTIMISTIC, category };
}

export const loadCategories = () => async dispatch => {
  dispatch(beginApiCall());
  try {
    const categories = await categoryApi.getCategories();
    dispatch(loadCategoriesSuccess(categories));
  } catch (error) {
    dispatch(apiCallError(error));
    throw error;
  }
};

export const saveCategory = category => dispatch => {
  console.log(category);

  dispatch(beginApiCall());
  return categoryApi
    .saveCategory(category)
    .then(savedCategory => {
      category._id
        ? dispatch(updateCategorySuccess(savedCategory))
        : dispatch(createCategorySuccess(savedCategory));
    })
    .catch(error => {
      dispatch(apiCallError(error));
      throw error;
    });
};

export const deleteCategory = category => dispatch => {
  dispatch(deleteCategoryOptimistic(category));
  return categoryApi.deleteCategory(category._id);
};
