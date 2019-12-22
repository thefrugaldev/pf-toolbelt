import * as actionTypes from "../actions/action-type-constants";
import initialState from "./initial-state";

export default function categoryReducer(
  state = initialState.categories,
  action
) {
  switch (action.type) {
    case actionTypes.LOAD_CATEGORIES_SUCCESS:
      return action.categories;
    default:
      return state;
  }
}
