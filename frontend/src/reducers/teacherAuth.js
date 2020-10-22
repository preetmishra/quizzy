import {
  TEACHER_LOADED,
  TEACHER_LOADING,
  TEACHER_AUTH_ERROR,
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
    case TEACHER_AUTH_ERROR:
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
