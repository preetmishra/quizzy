import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import Nav from "./layout/Nav";
import Home from "./Home";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Nav />
        <div className="container">
          <Home />
        </div>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
