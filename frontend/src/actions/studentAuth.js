import axios from "axios";

import {
  STUDENT_LOADED,
  STUDENT_LOADING,
  STUDENT_AUTH_ERROR,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGOUT_SUCCESS,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_REGISTER_FAIL,
} from "./types";

// Check Token and load Student.
export const loadStudent = () => (dispatch, getState) => {
  // Student loading.
  dispatch({ type: STUDENT_LOADING });

  axios
    .get("api/auth/user/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: STUDENT_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: STUDENT_AUTH_ERROR,
      });
    });
};

// Login.
export const loginStudent = (username, password) => (dispatch) => {
  // Headers.
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Body.
  const body = JSON.stringify({ username, password });
  axios
    .post("api/login/student/", body, config)
    .then((res) => {
      console.log("From Login");
      console.log(res.data);
      dispatch({
        type: STUDENT_LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: STUDENT_LOGIN_FAIL,
      });
    });
};

// Register.
export const registerStudent = (firstName, lastName, username, password) => (
  dispatch
) => {
  // Headers.
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Body.
  const body = JSON.stringify({
    user: { first_name: firstName, last_name: lastName, username, password },
  });
  console.log("From action");
  console.log(body);

  axios
    .post("api/student/", body, config)
    .then((res) => {
      dispatch({
        type: STUDENT_REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      dispatch({
        type: STUDENT_REGISTER_FAIL,
      });
    });
};

// Helper function.
export const tokenConfig = (getState) => {
  // Get token from state.
  const token = getState().studentAuth.token;

  // Headers.
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token exists, add it to the headers config.
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
