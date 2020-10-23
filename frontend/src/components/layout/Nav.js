import React, { Component } from "react";

class Nav extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Quizzy
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsenav"
            aria-controls="collapsenav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsenav">
            <ul className="navbar-nav ml-auto mr-0">
              <li className="nav-item">
                <a className="nav-link" href="api">
                  API
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="api/docs/">
                  Docs
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
