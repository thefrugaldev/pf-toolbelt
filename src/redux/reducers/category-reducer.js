import * as actionTypes from "../actions/action-type-constants";
import initialState from "./initial-state";

export default function categoryReducer(
  state = initialState.categories,
  action
) {
  switch (action.type) {
    case actionTypes.LOAD_CATEGORIES_SUCCESS:
      return action.categories;
    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return [...state, { ...action.category }];
    case actionTypes.UPDATE_CATEGORY_SUCCESS:
      return state.map(category =>
        category.id === action.category.id ? action.category : category
      );
    default:
      return state;
  }
}
