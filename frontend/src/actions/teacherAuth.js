import axios from "axios";

import {
  TEACHER_LOADED,
  TEACHER_LOADING,
  TEACHER_AUTH_ERROR,
  TEACHER_LOGIN_SUCCESS,
  TEACHER_LOGIN_FAIL,
  TEACHER_LOGOUT_SUCCESS,
  TEACHER_REGISTER_SUCCESS,
  TEACHER_REGISTER_FAIL,
} from "./types";

// Check Token and load Teacher.
export const loadTeacher = () => (dispatch, getState) => {
  // Teacher loading.
  dispatch({ type: TEACHER_LOADING });

  axios
    .get("api/auth/user/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: TEACHER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: TEACHER_AUTH_ERROR,
      });
    });
};

// Login.
export const loginTeacher = (username, password) => (dispatch) => {
  // Headers.
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Body.
  const body = JSON.stringify({ username, password });
  axios
    .post("api/login/teacher/", body, config)
    .then((res) => {
      console.log("From Login");
      console.log(res.data);
      dispatch({
        type: TEACHER_LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: TEACHER_LOGIN_FAIL,
      });
    });
};

// Register.
export const registerTeacher = (firstName, lastName, username, password) => (
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
    .post("api/teacher/", body, config)
    .then((res) => {
      dispatch({
        type: TEACHER_REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      dispatch({
        type: TEACHER_REGISTER_FAIL,
      });
    });
};

// Helper function.
export const tokenConfig = (getState) => {
  // Get token from state.
  const token = getState().teacherAuth.token;

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
