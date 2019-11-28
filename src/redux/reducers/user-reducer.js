import * as actionTypes from "../actions/action-type-constants";
import initialState from "./initial-state";

export default function userReducer(state = initialState.users, action) {
  //TODO: update state to use id for lookups
  //https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
  switch (action.type) {
    // case actionTypes.CREATE_USER:
    //   return [...state, { ...action.user }];
    case actionTypes.LOAD_USERS_SUCCESS:
      return action.users;
    default:
      return state;
  }
}
