import * as actionTypes from "../actions/action-type-constants";
import initialState from "./initial-state";

export default function lineItemReducer(
  state = initialState.lineItems,
  action
) {
  //TODO: update state to use id for lookups
  //https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
  switch (action.type) {
    case actionTypes.CREATE_LINE_ITEM_SUCCESS:
      return [...state, { ...action.lineItem }];
    case actionTypes.UPDATE_LINE_ITEM_SUCCESS:
      return state.map(lineItem =>
        lineItem._id === action.lineItem._id ? action.lineItem : lineItem
      );
    case actionTypes.LOAD_LINE_ITEMS_SUCCESS:
      return action.lineItems;
    case actionTypes.DELETE_LINE_ITEM_OPTIMISTIC:
      return state.filter(lineItem => lineItem._id !== action.lineItem._id);
    default:
      return state;
  }
}
