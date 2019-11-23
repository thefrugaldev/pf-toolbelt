import * as actionTypes from "./action-type-constants";

export function createBudget(budget) {
  return { type: actionTypes.CREATE_BUDGET, budget };
}
