import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./layout/Nav";
import Home from "./Home";
import Teacher from "./teacher/Teacher";
import Student from "./student/Student";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Nav />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/teacher" component={Teacher} />
              <Route exact path="/student" component={Student} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
