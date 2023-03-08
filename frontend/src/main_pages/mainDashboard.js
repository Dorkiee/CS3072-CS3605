import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import DashboardNav from "./DashboardNav.js";
import "../main_pages/CSS/dashboardCSS.css";
import axios from "axios"

export default class mainDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      count: 0,
      Tcount: 0,
      Ecount: 0,
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
        })
        
        .then((response) => response.json())
        .then((data) => {
            console.log(data, "userData");
            this.setState({ userData: data.data})
        });

    axios.get("http://localhost:4000/app/users-count")
    .then(res => {
      this.setState({ count: res.data.count })   
    })
    .catch(error => {
      
    });


    axios.get("http://localhost:4000/app/task-count")
    .then(res => {
      this.setState({ Tcount: res.data.count })   
    })
    .catch(error => {
      
    });


    axios.get("http://localhost:4000/app/enroll-count")
    .then(res => {
      this.setState({ Ecount: res.data.count })   
    })
    .catch(error => {
      
    });
  }

    signOut = () => {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("isLoggedIn");
      window.localStorage.href = "/home";
    }

    render () {
      const {userData} = this.state;
      const { count } = this.state;
      const { Tcount } = this.state;
      const { Ecount } = this.state;
      return (
        <div>
        <nav>
        <div class="wrapper">
        <DashboardNav/>
        <div class="main_content">
        <div className="info">
        <div className="text_content">


            <h1>Welcome back, {this.state.userData.username}</h1>
            <br></br>
            <br></br>

          {userData.isAdmin &&  (
            <>
            <div className="courseContent">
          <div className="cardSize">
          <div className="insights">
          <span class="material-symbols-outlined" style={{fontSize: "70px", textAlign: "center", color: "#2A85DF"}}>groups<p className="card-title" style={{color: "#2A85DF"}}>Number of Users</p></span>
          <div className="card-action">
          <h4 style={{color: "#5FA3E7"}}>{count === null ? "No registered users yet" : `${count}`}</h4>
          </div>
          </div>
          </div>
          </div>

          <div className="courseContent">
          <div className="cardSize">
          <div className="insights">
          <span class="material-symbols-outlined" style={{fontSize: "70px", textAlign: "center", color: "#5FA3E7"}}>task<p className="card-title" style={{color: "#5FA3E7"}}>Number of Tasks</p></span>
          <div className="card-action">
          <h4 style={{color: "#95C2EF"}}>{Tcount === null ? "No course created yet" : `${Tcount}`}</h4>
          </div>
          </div>
          </div>
          </div>
          <br></br>
          <br></br>
          
          </>
         )}


            {userData.isUser &&  (
            <>
            <div className="courseContent">
          <div className="cardSize">
          <div className="insights">
          <span class="material-symbols-outlined" style={{fontSize: "70px", textAlign: "center", color: "#2A85DF"}}>school<p className="card-title" style={{color: "#2A85DF"}}>Courses</p></span>
          <div className="card-action">
          <h4 style={{color: "#5FA3E7"}}>{Ecount === null ? "No course assigned yet" : `${Ecount}`}</h4>
          </div>
          </div>
          </div>

          
          </div>

          <div className="courseContent">
          <div className="cardSize">
          <div className="insights">
          <span class="material-symbols-outlined" style={{fontSize: "70px", textAlign: "center", color: "#F56476"}}>notification_important<p className="card-title" style={{color: "#F56476"}}>Days Left</p></span>
          <div className="card-action">
          <h4 style={{color: "#F88C99", fontSize: "18px"}}>You have until the 14th to complete all courses and the exam!</h4>
          </div>
          </div>
          </div>

          
          </div>
          <br></br>
          <br></br>
          <h3 style={{textAlign: "inherit"}}>Tutorial:</h3>
          <p>Watch this short video to teach you how to use this Learning Management System.</p>
          <br></br>
          <div><iframe width="900" height="500" src="https://www.youtube.com/embed/7KUSKPUHgnk" frameborder="0" allowFullScreen></iframe></div> 
          </>
         )}

        </div>
        </div>
        </div>
        </div>
        </nav>
        
        
        {/* 
        
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
        <div class="wrapper">
          <DashboardNav/>
          <div class="main_content">
            <div class="info">
            <h1>{this.state.userData.firstName} {this.state.userData.lastName}</h1>
            <h1>{this.state.userData.email}</h1>
         
            </div>
            </div>
            </div>
            </nav>
        
        */}
        
            
          </div>
        );
    }
}