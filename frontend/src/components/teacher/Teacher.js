import React, { Component } from "react";
import TeacherLogin from "./TeacherLogin";
import TeacherRegister from "./TeacherRegister";

class Teacher extends Component {
  render() {
    return (
      <div className="my-5">
        <h1 className="mb-4">Welcome, Teacher!</h1>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a
              className="nav-link active"
              id="nav-login-tab"
              data-toggle="tab"
              href="#nav-login"
              role="tab"
              aria-controls="nav-login"
              aria-selected="true"
            >
              Login
            </a>
            <a
              className="nav-link"
              id="nav-register-tab"
              data-toggle="tab"
              href="#nav-register"
              role="tab"
              aria-controls="nav-register"
              aria-selected="false"
            >
              Register
            </a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-login"
            role="tabpanel"
            aria-labelledby="nav-login-tab"
          >
            <TeacherLogin />
          </div>
          <div
            className="tab-pane fade"
            id="nav-register"
            role="tabpanel"
            aria-labelledby="nav-register-tab"
          >
            <TeacherRegister />
          </div>
        </div>
      </div>
    );
  }
}

export default Teacher;
