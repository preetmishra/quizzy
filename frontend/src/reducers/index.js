import { combineReducers } from "redux";
import teacherAuth from "./teacherAuth";
import studentAuth from "./studentAuth";

// Combine all the reducers here.
export default combineReducers({
  teacherAuth,
  studentAuth,
});
