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
        category._id === action.category._id ? action.category : category
      );
    case actionTypes.DELETE_CATEGORY_OPTIMISTIC:
      return state.filter(category => category._id != action.category._id);
    default:
      return state;
  }
}
