import React, {Component} from "react";
import "../main_pages/CSS/dashboardCSS.css";
import DashboardNav from "../main_pages/DashboardNav.js";
import axios from "axios";
import DisplayExamination from "./displayExamination.js";

export default class lockedExamination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      courses: [],
    };
  }  
  
  
  componentDidMount() {
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
        }).then((response) => response.json())
        .then((data) => {
            console.log(data, "userData");
            this.setState({ userData: data.data})
        });

      
    axios.get("http://localhost:4000/app/mycourses")
    .then(response => {
      console.log(response, "displayed all enrolled courses");
      this.setState({ courses: response.data})
    })
    .catch(error => {
      console.log(error);
    });

    }

    DataTable () {
      return this.state.courses.map ((res, i) => {
        return <DisplayExamination obj={res} key={i}/>
      });
    }

    render () {
      const isAdmin = this.state.userData.isAdmin;
      console.log(isAdmin, "role");
        return (
          <div>
          <nav >
          <div class="wrapper">
          <DashboardNav/>
            <div class="main_content">
              <div class="info">
                <div className="text_content">
               <br></br>
               <br></br>
                        {this.DataTable()}
              </div>
              </div>
              </div>
              </div>
              </nav>
            </div>
        );
    }
}