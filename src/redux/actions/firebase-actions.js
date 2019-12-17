import * as actionTypes from "./action-type-constants";
import { auth } from "../../auth/auth-service";

export function loginSuccess() {
  let currentUser = auth.currentUser.toJSON();
  return { type: actionTypes.LOGIN_SUCCESS, currentUser };
}

export function registerSuccess() {
  let currentUser = auth.currentUser.toJSON();
  return { type: actionTypes.REGISTER_SUCCESS, currentUser };
}

export function login(email, password) {
  return async function(dispatch) {
    try {
      const currentUser = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      dispatch(loginSuccess(currentUser));
    } catch (error) {
      throw error;
    }
  };
}

export function register(email, password) {
  return async function(dispatch) {
    try {
      const currentUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      dispatch(registerSuccess(currentUser));
    } catch (error) {
      throw error;
    }
  };
}
