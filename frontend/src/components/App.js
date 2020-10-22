import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import Nav from "./layout/Nav";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Nav />
        <div className="container"></div>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
