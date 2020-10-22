import React, { Component } from "react";

class TeacherRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { username, password, firstName, lastName } = this.state;
    return (
      <div className="card card-body border-top-0">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              className="form-control"
              type="text"
              name="firstName"
              onChange={this.onChange}
              value={firstName}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              className="form-control"
              type="text"
              name="lastName"
              onChange={this.onChange}
              value={lastName}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              onChange={this.onChange}
              value={username}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={this.onChange}
              value={password}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default TeacherRegister;
