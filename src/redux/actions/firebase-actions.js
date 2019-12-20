import * as actionTypes from "./action-type-constants";
import { auth } from "../../auth/auth-service";

export const loginSuccess = () => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    currentUser: auth.currentUser.toJSON()
  };
};

export const registerSuccess = () => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    currentUser: auth.currentUser.toJSON()
  };
};

export const register = (email, password) => async dispatch => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    dispatch(registerSuccess());
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

export const logout = () => async dispatch => {
  try {
    await auth.signOut();
    dispatch({ type: actionTypes.LOGOUT, currentUser: auth.currentUser });
  } catch (error) {
    throw error;
  }
};

//is this necessary if the user is forced to log in?
//we'll already have the current user object
export const fetchUser = () => async dispatch => {
  try {
    await auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        localStorage.setItem("isAuthenticated", true);
        dispatch({
          type: actionTypes.FETCH_USER,
          currentUser: currentUser.toJSON()
        });
      } else {
        localStorage.removeItem("isAuthenticated");
        dispatch({
          type: actionTypes.FETCH_USER,
          currentUser: null
        });
      }
    });
  } catch (error) {
    throw error;
  }
};
