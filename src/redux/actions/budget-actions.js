import * as actionTypes from "./action-type-constants";
import * as budgetApi from "../../api/budget-api";

export function loadBudgetsSuccess(budgets) {
  return { type: actionTypes.LOAD_BUDGETS_SUCCESS, budgets };
}

export function createBudgetSuccess(budget) {
  return { type: actionTypes.CREATE_BUDGET_SUCCESS, budget };
}

export function updateBudgetSuccess(budget) {
  return { type: actionTypes.UPDATE_BUDGET_SUCCESS, budget };
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

export function saveBudget(budget) {
  // could use state directly from redux thunk's second param
  // ex: return (dispatch, getState) => {
  return dispatch => {
    return budgetApi
      .saveBudget(budget)
      .then(savedBudget => {
        budget.id
          ? dispatch(updateBudgetSuccess(savedBudget))
          : dispatch(createBudgetSuccess(savedBudget));
      })
      .catch(error => {
        throw error;
      });
  };
}
