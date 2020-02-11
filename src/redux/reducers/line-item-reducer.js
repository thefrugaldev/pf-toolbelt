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
    case actionTypes.SORT_LINE_ITEMS:
      return [...state].sort(compareItems(action.key, action.order));
    default:
      return state;
  }
}

const compareItems = (key, order = "asc") => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      //prop doesn't exist on either object
      return 0;
    }

    console.log(typeof a[key]);

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    const res = order === "desc" ? comparison * -1 : comparison;

    return res;
  };
};
