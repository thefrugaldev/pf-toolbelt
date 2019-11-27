import * as actionTypes from "./action-type-constants";
import * as budgetApi from "../../api/budget-api";

export function createBudget(budget) {
  return { type: actionTypes.CREATE_BUDGET, budget };
}

export function loadBudgetsSuccess(budgets) {
  return { type: actionTypes.LOAD_BUDGETS_SUCCESS, budgets };
}

export function loadBudgets() {
  return function(dispatch) {
    return budgetApi
      .getBudgets()
      .then(budgets => {
        dispatch(loadBudgetsSuccess(budgets));
      })
      .catch(error => {
        throw error;
      });
  };
}
