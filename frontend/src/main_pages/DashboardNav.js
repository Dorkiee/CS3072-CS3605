import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import "../main_pages/CSS/dashboardCSS.css";
import axios from "axios"

export default class DashboardNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      courseData: [],
    };
  }  
  
  componentDidMount() {
    fetch('http://localhost:4000/app/mycourses')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({ courseData: data });
    })
    .catch(error => {
      // Handle error
    });

    
    fetch("http://localhost:4000/app/Dashboard", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      }, 
      body: JSON.stringify ({
        token: window.localStorage.getItem("token"),
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({ userData: data.data })
    });
  }

  signOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  }


  render() {
    const isAdmin = this.state.userData.isAdmin;
    const courses = this.state.courseData;
    const username = this.state.userData.username;
    const userCompletedCourses = courses.filter((course) =>
      course.completedTasks.some((task) => task.userName === username && task.completed)
    );
    const allCoursesCompleted =
      userCompletedCourses.length === courses.length;
  
      console.log(allCoursesCompleted)
    return (
      <div>
        <p>{this.state.courseData.courseName}</p>
        <div className="container">
          <aside>
            <div className="top">
              <div className="logo">
                <h2>{this.state.userData.companyName}</h2>
              </div>
              <div className="close">
                <span class="material-symbols-outlined">close</span>
              </div>
            </div>
            {isAdmin ? (
              <div className="sidebar">
                <NavLink to="/Dashboard" activeClassName="active">
                  <span class="material-symbols-outlined">home</span>
                  <h6>Dashboard</h6>
                </NavLink>
                <NavLink to="/Users" activeClassName="active">
                  <span class="material-symbols-outlined">group</span>
                  <h6>Users</h6>
                </NavLink>
                <NavLink to="/Training" activeClassName="active">
                  <span class="material-symbols-outlined">model_training</span>
                  <h6>Courses</h6>
                </NavLink>
                <a href="/" onClick={this.signOut}>
                  <span class="material-symbols-outlined">logout</span>
                  <h6>Sign out</h6>
                </a>
              </div>
            ) : (
              <div className="sidebar">
                <NavLink to="/Dashboard" activeClassName="active">
                  <span class="material-symbols-outlined">home</span>
                  <h6>Dashboard</h6>
                </NavLink>
                <NavLink to="/Current-Training" activeClassName="active">
                  <span class="material-symbols-outlined">school</span>
                  <h6>Training</h6>
                </NavLink>
                {allCoursesCompleted ? (
                  <NavLink to={"/Examination/" + this.state.userData._id} activeClassName="active">
                    <span class="material-symbols-outlined">quiz</span>
                    <h6>Examination</h6>
                  </NavLink>
                ):(
                  <p>complete all courses to access exam</p>
                )}
                <a href="/" onClick={this.signOut}>
                  <span class="material-symbols-outlined">logout</span>
                  <h6>Sign out</h6>
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>
    );
  }
  
    
    
}