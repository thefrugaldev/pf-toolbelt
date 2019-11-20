import * as actionTypes from "../actions/action-type-constants";

export default function cardReducer(state = [], action) {
  //TODO: update state to use id for lookups
  //https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
  switch (action.type) {
    case actionTypes.CREATE_CARD:
      return [...state, { ...action.card }];
    default:
      return state;
  }
}
