import * as actionTypes from "./action-type-constants";
import { auth } from "../../auth/auth-service";

export function loginSuccess() {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    currentUser: auth.currentUser.toJSON()
  };
}

export function registerSuccess() {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    currentUser: auth.currentUser.toJSON()
  };
}

export const logout = () => async dispatch => {
  try {
    await auth.signOut();
    dispatch({ type: actionTypes.LOGOUT, currentUser: auth.currentUser });
  } catch (error) {
    throw error;
  }
};

export const login = (email, password) => async dispatch => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch(loginSuccess());
  } catch (error) {
    throw error;
  }
};

export const register = (email, password) => async dispatch => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    dispatch(registerSuccess());
  } catch (error) {
    throw error;
  }
};
