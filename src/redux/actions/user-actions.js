import * as actionTypes from "./action-type-constants";
import * as userApi from "../../api/user-api";

// export function createUser(user) {
//   return { type: actionTypes.CREATE_USER, user };
// }

export function loadUsersSuccess(users) {
  return { type: actionTypes.LOAD_USERS_SUCCESS, users };
}

export function loadUsers() {
  return function(dispatch) {
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
