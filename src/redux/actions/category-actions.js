import * as actionTypes from "./action-type-constants";
import * as categoryApi from "../../api/category-api";
import { beginApiCall, apiCallError } from "./api-status-actions";

export function loadCategoriesSuccess(categories) {
  return { type: actionTypes.LOAD_CATEGORIES_SUCCESS, categories };
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
