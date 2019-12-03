import * as actionTypes from "./action-type-constants";
import * as userApi from "../../api/user-api";
import { beginApiCall } from "./api-status-actions";

// export function createUser(user) {
//   return { type: actionTypes.CREATE_USER, user };
// }

export function loadUsersSuccess(users) {
  return { type: actionTypes.LOAD_USERS_SUCCESS, users };
}

export function loadUsers() {
  return function(dispatch) {
    dispatch(beginApiCall());

    return userApi
      .getUsers()
      .then(user => {
        dispatch(loadUsersSuccess(user));
      })
      .catch(error => {
        throw error;
      });
  };
}
