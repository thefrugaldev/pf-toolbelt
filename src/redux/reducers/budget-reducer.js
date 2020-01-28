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
        budget._id === action.budget._id ? action.budget : budget
      );
    case actionTypes.LOAD_BUDGETS_SUCCESS:
      return action.budgets;
    case actionTypes.DELETE_BUDGET_OPTIMISTIC:
      return state.filter(budget => budget._id !== action.budget._id);
    default:
      return state;
  }
}
