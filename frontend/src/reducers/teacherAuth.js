import {
  TEACHER_LOADED,
  TEACHER_LOADING,
  TEACHER_AUTH_ERROR,
  TEACHER_LOGIN_SUCCESS,
  TEACHER_LOGIN_FAIL,
  TEACHER_LOGOUT_SUCCESS,
  TEACHER_REGISTER_SUCCESS,
  TEACHER_REGISTER_FAIL,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  teacher: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TEACHER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case TEACHER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        teacher: { user: action.payload },
      };
    case TEACHER_LOGIN_SUCCESS:
    case TEACHER_REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case TEACHER_AUTH_ERROR:
    case TEACHER_LOGIN_FAIL:
    case TEACHER_LOGOUT_SUCCESS:
    case TEACHER_REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        teacher: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
