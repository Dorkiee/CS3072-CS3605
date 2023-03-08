/* eslint-disable no-cond-assign */
import React, { Component } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import DashboardNav from "../main_pages/DashboardNav.js";
import enrollRouter from "./enrollRouters.js";
import editUsers from "../soc_pages/editUsers.js";
import { Link } from 'react-router-dom';

class enrollDetail extends Component {
  


  constructor(props) {
    super(props)
    this.state = {
        userData: "",
        courseName: '',
        courseOutline: '',
        curriculumContent: '',
        curriculumVids: '',
        curriculumGame: false,
        completedTasks:[{userName: ''}, {completed: false}],
      }
    this.onChangeCourseName = this.onChangeCourseName.bind(this);
    this.onChangecourseOutline = this.onChangecourseOutline.bind(this);
    this.onChangecurriculumContent = this.onChangecurriculumContent.bind(this);
    this.onChangecurriculumVids = this.onChangecurriculumVids.bind(this);
    this.onChangecurriculumGame = this.onChangecurriculumGame.bind(this);

  }


  componentDidMount() {
    fetch("http://localhost:4000/app/Dashboard", { //change to get login instead i think
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
    


    axios.get('http://localhost:4000/app/mycourse/' + this.props.params.id)
      .then(response => {

        this.setState({
        courseName: response.data.courseName,
        courseOutline: response.data.courseOutline,
        curriculumContent: response.data.curriculumContent,
        curriculumVids: response.data.curriculumVids,
        curriculumGame: response.data.curriculumGame, 
        });
        console.log(response, "courseID");
      })
      .catch((error) => {
        console.log(error);
      })


 
  
  }




  onChangeCourseName(event) {
    this.setState({ courseName: event.target.value })
  }

  onChangecourseOutline(event) {
    this.setState({courseOutline: event.target.value})
  }

  onChangecurriculumContent (event) {
    this.setState({curriculumContent: event.target.value})
  }

  onChangecurriculumGame (event) {
    this.setState({curriculumGame: event.target.checked})
  }

  onChangecurriculumVids (event) {
    this.setState({curriculumVids: event.target.value})
  }

 

  onCompleteTask = (event) => {
    event.preventDefault();
  
    const taskData = {
      userName: this.state.userData.username,
      completed: true
    };
  
    axios.post('http://localhost:4000/app/completed-course-update/' + this.props.params.id, taskData)
      .then(response => {
        // Update the state to include the new task object
        this.setState(prevState => ({
          completedTasks: [...prevState.completedTasks, taskData],
        }));
        console.log(response.data);
        window.location.reload(); // Refreshing page
      });
  }
  

  render() {
    return (
    <div>
    <nav >
    <div class="wrapper">
    <DashboardNav/>
    <div class="main_content">
    <div class="info">
    <div className="text_content">
      <div><h1>{this.state.courseName} Course</h1></div>
      <div><h3>{this.state.courseOutline}</h3></div> 
      <span style={{color: "red"}}>Pressing the "Complete Course" button after finishing a course will lock it, and it won't be possible to retake the course. Please note the exam will cover most of the course material, which could influence the accuracy of my dissertation. Please ensure that you are finished with the course before clicking the button. Thank you!</span>
      {this.state.curriculumVids && this.state.curriculumVids.includes('youtube') ? (
      <iframe width="900" height="500" src={this.state.curriculumVids} frameborder="0" allowFullScreen></iframe>
      ) : (
        <p></p>
      )}
      <br></br>
      <br></br>
      <div style={{ whiteSpace: "pre-wrap" }}><p dangerouslySetInnerHTML={{__html: this.state.curriculumContent}}></p></div>
      <br></br>
      {this.state.curriculumGame ? (
        /*picture of game and explanation here */
       <Link className="view-link" to={"/Phishing-Adventure"}>
          Play Game
        </Link>
      ) : (
        <p></p>
      )}
      <br></br>
      <br></br>
      {/* possibly have the complete button locked until user has played the game */}

  
      <div><button type='delete' className='btn btn-primary' value='delete'style={{background: "red"}}  onClick={this.onCompleteTask}>
        <Link style={{color: "white", background: "red"}} to="/Current-Training" exact title="Current-Training">
        Complete Course
        </Link>
    </button></div>
    </div>
    </div>
    </div>
    </div>
    </nav>

    </div>
    );
  }
  //CREATE A BUTTON FOR COMPLETION TO TRACK USER'S PROGRESS
}
export default enrollRouter(enrollDetail);