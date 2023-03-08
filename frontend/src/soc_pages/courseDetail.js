import React, { Component } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import DashboardNav from "../main_pages/DashboardNav.js";
import { Link } from 'react-router-dom';
import withRouter from "./withRouter.js";
import EnrolledDetail from "../employee_pages/enrollDetail.js";



class courseDetail extends Component {
  
   
  constructor(props) {
    super(props)
    this.state = {
        courseName: '',
        courseOutline: '',
        curriculumContent: '',
        curriculumVids: '',
        curriculumGame: '',
      }
    this.onChangeCourseName = this.onChangeCourseName.bind(this);
    this.onChangecourseOutline = this.onChangecourseOutline.bind(this);
    this.onChangecurriculumContent = this.onChangecurriculumContent.bind(this);
    this.onChangecurriculumGame = this.onChangecurriculumGame.bind(this);
    this.onChangecurriculumVids = this.onChangecurriculumVids.bind(this);
    this.onDeleteCourse = this.onDeleteCourse.bind(this);

    this.changeEcourseName = this.changeEcourseName.bind(this);
    this.changeEcourseOutline = this.changeEcourseOutline.bind(this);
    this.changeEcurriculumContent = this.changeEcurriculumContent.bind(this);
    this.onChangeEcurriculumVids = this.onChangeEcurriculumVids.bind(this);
    this.enrollCourse = this.enrollCourse.bind(this);
  }

  
  componentDidMount() {
    axios.get('http://localhost:4000/app/course/' + this.props.params.id, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {

        this.setState({
        courseName: response.data.courseName,
        courseOutline: response.data.courseOutline,
        curriculumContent: response.data.curriculumContent,
        curriculumVids: response.data.curriculumVids,
        curriculumGame: response.data.curriculumGame,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      

  }

  onDeleteCourse = (event) =>
  {
    axios.delete('http://localhost:4000/app/delete-createdcourse/'+ this.props.params.id, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
        console.log('Content successfully deleted!')
        
    }).catch((error) => {
        console.log(error)
    })

    event.preventDefault();
    // Call the handleDelete method from the EnrolledDetail component

  }

  enrollCourse (event) 
  {
    event.preventDefault()
    const asignedCourses = {
      courseName:this.state.courseName,
      courseOutline: this.state.courseOutline,
      curriculumContent:this.state.curriculumContent,
      curriculumVids: this.state.curriculumVids,
      curriculumGame: this.state.curriculumGame,
    }

     axios.post('http://localhost:4000/app/enrolledcourse', asignedCourses)
       .then(response => console.log(response.data))
    
            this.setState({
                courseName: '',
                courseOutline: '',
                curriculumContent:'',
                curriculumVids: '',
                curriculumGame: '',
            })
            window.location.href = "/Training";
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

/////////////
  changeEcourseName(event) {
    this.setState({ courseName: event.target.value })
  }

  changeEcourseOutline(event) {
    this.setState({courseOutline: event.target.value})
  }

  changeEcurriculumContent (event) {
    this.setState({curriculumContent: event.target.value})
  }

  onChangeEcurriculumVids (event) {
    this.setState({curriculumVids: event.target.value})
  }

  render() {
   // checking if the video link is given
    const videoLink = this.state.curriculumVids;
    const isVideo = videoLink.includes("youtube.com");
    return (
    <div>
    <nav>
    <div class="wrapper">
    <DashboardNav/>
    <div class="main_content">
    <div class="info">
    <div className="text_content">
      <div><button type='setup' className='btn btn-primary' value='a'>
      <Link style={{color: 'white', textDecoration: 'none'}} className="edit-link" to={"/update-createdcourse/" + this.props.params.id}>
        Edit Course
      </Link>
      </button></div>

      <div><button 
      type='delete' 
      className='btn btn-primary' 
      value='delete' 
      onClick={this.onDeleteCourse} 
      size="sm" 
      variant="danger"
      style={{ backgroundColor: "red"}}
      ><Link style={{color: 'white', textDecoration: 'none'}} to="/Training" exact title="Training">
        Delete Course
        </Link>
      </button>
      {/*<EnrolledDetail ref={(enrolledDetail) => this.enrolledDetail = enrolledDetail} enrollment={this.props.enrollment} />_*/}
      </div>

      <div><h1>{this.state.courseName} Course</h1></div>
      <div><h3>{this.state.courseOutline}</h3></div>  
      <div style={{ whiteSpace: "pre-wrap" }}><p dangerouslySetInnerHTML={{__html: this.state.curriculumContent}}></p></div>
      {isVideo  ? (
      <>
      <div><iframe width="900" height="500" src={this.state.curriculumVids} frameborder="0" allowFullScreen></iframe></div> 
      </>
      ) : (
      <p>This course has no video</p>
      )}
      <div><button 
      type='setup' 
      className='btn btn-primary' 
      value='a'
      onClick={this.enrollCourse}
      >
        Setup Training
      </button></div>
      
      {/*
      <div><h2>Lecture 1</h2></div>
      <div>HERE IS WHERE THE SECTIONS WILL BE, E.G. SECTION 1 (YOU MAY ADD IMAGES)</div>
      <div><h2>Lecture 2</h2></div>
      <div>HERE IS WHERE THE SECTIONS WILL BE, E.G. SECTION 2 (YOU MAY ADD IMAGES)</div>
      <div><h2>Lecture 3</h2></div>
      <div>HERE IS WHERE THE SECTIONS WILL BE, E.G. SECTION 3 (YOU MAY ADD IMAGES)</div>
    */}
    </div>
        </div>
        </div>
        </div>
        </nav>

    </div>
    );
  }
}
export default withRouter(courseDetail);