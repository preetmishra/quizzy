import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { getTeachers } from "../../actions/teachers";
import teachers from "../../reducers/teachers";

class Teachers extends Component {
  componentDidMount() {
    this.props.getTeachers();
  }

  render() {
    return (
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.teachers.map((teacher) => (
              <tr key={teacher.user.id}>
                <td>{teacher.user.id}</td>
                <td>{teacher.user.username}</td>
                <td>{teacher.user.first_name}</td>
                <td>{teacher.user.last_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // prop: state.reducer.key
  teachers: state.teachers.teachers,
});

// The second argument to the first call maps the action to props.
export default connect(mapStateToProps, { getTeachers })(Teachers);
