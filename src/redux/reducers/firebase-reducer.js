import * as actionTypes from "../actions/action-type-constants";
import initialState from "./initial-state";

export default function firebaseReducer(
  state = initialState.currentUser,
  action
) {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.LOGOUT:
      return action.currentUser;
    default:
      return state;
  }
}
