import * as actionTypes from "../actions/action-type-constants";
import initialState from "./initial-state";

function actionTypeendsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type === actionTypes.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === actionTypes.API_CALL_ERROR ||
    actionTypeendsInSuccess(action.type)
  ) {
    return state - 1;
  }

  return state;
}
