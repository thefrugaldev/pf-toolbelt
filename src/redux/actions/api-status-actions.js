import * as actionTypes from "./action-type-constants";

export function beginApiCall() {
  return { type: actionTypes.BEGIN_API_CALL };
}
