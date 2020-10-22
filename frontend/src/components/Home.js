import React, { Component, Fragment } from "react";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <div className="card text-center my-5 py-5 px-2 border-light">
          <div className="card-body">
            <h1 className="card-title mb-3">Who are you?</h1>
            <a href="#" className="btn btn-primary mr-1">
              Teacher
            </a>
            <a href="#" className="btn btn-primary ml-1">
              Student
            </a>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
