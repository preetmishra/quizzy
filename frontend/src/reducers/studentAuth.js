import {
  STUDENT_LOADED,
  STUDENT_LOADING,
  STUDENT_AUTH_ERROR,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGOUT_SUCCESS,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_REGISTER_FAIL,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  student: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STUDENT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case STUDENT_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        student: { user: action.payload },
      };
    case STUDENT_LOGIN_SUCCESS:
    case STUDENT_REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case STUDENT_AUTH_ERROR:
    case STUDENT_LOGIN_FAIL:
    case STUDENT_LOGOUT_SUCCESS:
    case STUDENT_REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        student: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
