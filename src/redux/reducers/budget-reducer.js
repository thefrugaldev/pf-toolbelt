import * as actionTypes from "../actions/action-type-constants";

export default function budgetReducer(state = [], action) {
  //TODO: update state to use id for lookups
  //https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
  switch (action.type) {
    case actionTypes.CREATE_BUDGET:
      return [...state, { ...action.budget }];
    default:
      return state;
  }
}
