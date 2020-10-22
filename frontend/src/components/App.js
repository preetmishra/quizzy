import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./layout/Nav";
import Home from "./Home";
import Teacher from "./teacher/Teacher";
import Student from "./student/Student";
import { Provider } from "react-redux";

import { loadTeacher } from "../actions/teacherAuth";
import store from "../store";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadTeacher());
  }

  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
