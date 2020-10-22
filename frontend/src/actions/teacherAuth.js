import axios from "axios";

import { TEACHER_LOADED, TEACHER_LOADING, TEACHER_AUTH_ERROR } from "./types";

// Check Token and load Teacher.
export const loadTeacher = () => (dispatch, getState) => {
  // Teacher loading.
  dispatch({ type: TEACHER_LOADING });

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

  axios
    .get("/api/auth/user", config)
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
