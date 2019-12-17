import * as actionTypes from "../actions/action-type-constants";
import initialState from "./initial-state";

export default function firebaseReducer(
  state = initialState.currentUser,
  action
) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return action.currentUser;
    case actionTypes.LOGOUT:
      return action.currentUser;
    default:
      return state;
  }
}
