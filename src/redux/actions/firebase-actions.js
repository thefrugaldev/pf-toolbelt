import * as actionTypes from "./action-type-constants";
import { auth } from "../../auth/auth-service";

export function loginSuccess(user) {
  return { type: actionTypes.LOGIN_SUCCESS, user };
}

export function registerSuccess(user) {
  return { type: actionTypes.REGISTER_SUCCESS, user };
}

export function login(email, password) {
  return async function(dispatch) {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      dispatch(loginSuccess(user));
    } catch (error) {
      throw error;
    }
  };
}

export function register(email, password) {
  return async function(dispatch) {
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);
      dispatch(registerSuccess(user));
    } catch (error) {
      throw error;
    }
  };
}
