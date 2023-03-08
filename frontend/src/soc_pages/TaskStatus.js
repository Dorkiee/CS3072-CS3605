import React, { Component } from "react";
import axios from "axios";
import TaskTable from "./taskTable.js";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseData: [],
      userData: {},
      selectedUser: null,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/app/mycourses")
      .then((res) => {
        console.log(res, "courseData");
        this.setState({ courseData: res.data });
      })
      .catch((error) => {});

    axios
      .get("http://localhost:4000/app/log-in")
      .then((res) => {
        console.log(res, "userData");
        this.setState({ userData: res.data });
      })
      .catch((error) => {});
  }

  DataTable() {
    let filteredData = this.state.courseData;
    if (this.state.selectedUser) {
      filteredData = filteredData.filter((course) =>
        course.completedTasks.some(
          (task) => task.userName === this.state.selectedUser
        )
      );
    }
    return filteredData.map((res, i) => {
      return <TaskTable obj={res} key={i} userData={this.state.userData} />;
    });
  }

  handleUserSelect = (e) => {
    this.setState({ selectedUser: e.target.value });
  };

  render() {
    const userOptions = [
      ...new Set(
        this.state.courseData
          .flatMap((course) =>
            course.completedTasks.map((task) => task.userName)
          )
          .filter((userName) => !!userName)
      ),
    ];

    return (
      <div>
        <nav>
          <div>
            <div class="main_content">
              <div class="info">
                <div class="Tabelcontainer">
                  <div>
                    <br></br>
                  </div>
                  <form class="usertable">
                    <label htmlFor="user-select">Filter by user:</label>
                    <select id="user-select" onChange={this.handleUserSelect}>
                      <option value="">All users</option>
                      {userOptions.map((user, i) => (
                        <option value={user} key={i}>
                          {user}
                        </option>
                      ))}
                    </select>
                    <table>
                      <thead>
                        <tr>
                          <th>Courses assigned to users</th>
                          <th>Users who have completed the course</th>
                        </tr>
                      </thead>
                      <tbody>{this.DataTable()}</tbody>
                    </table>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
