import * as actionTypes from "../actions/action-type-constants";
import initialState from "./initial-state";

export default function budgetReducer(state = initialState.budgets, action) {
  //TODO: update state to use id for lookups
  //https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
  switch (action.type) {
    case actionTypes.CREATE_BUDGET_SUCCESS:
      return [...state, { ...action.budget }];
    case actionTypes.UPDATE_BUDGET_SUCCESS:
      return state.map(budget =>
        budget.id === action.budget.id ? action.budget : budget
      );
    case actionTypes.LOAD_BUDGETS_SUCCESS:
      return action.budgets;
    default:
      return state;
  }
}
