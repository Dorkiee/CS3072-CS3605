import axios from "axios"
import React, {Component} from "react"
import { Link } from 'react-router-dom';
import './CSS/courseCards.css'
import Exam from "./Exam";
export default class  displayExamination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseData: [],
      userData: [],
    };
  }  

  componentDidMount() {
    axios.get("http://localhost:4000/app/mycourses")
    .then(res => {
      console.log(res, "courseData");
      this.setState({ courseData: res.data})   
    })
    .catch(error => {
      
    });

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
  }

  render () {
    const { completedTasks } = this.props.obj;
    const isCourseCompleted = completedTasks.some(task => task.userName === this.state.userData.username);
    console.log(isCourseCompleted)
    return (
      <div>   
        {isCourseCompleted ? ( //true
            <Exam/>  
            ) : ( //false
            
            <p>Complete all courses to unlock the exam</p>
        )}
      </div>
    )
  }
  
  
}
