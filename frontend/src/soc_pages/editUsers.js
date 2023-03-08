import React, { Component } from "react";
import axios from 'axios';
import DashboardNav from "../main_pages/DashboardNav.js";
import withRouter from "./withRouter.js";
import { Link } from 'react-router-dom';

class editUsers extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
        username: '',
        role: '',
        department: '',
        isAdmin: false,

        completedContent : false,
        taskStatus: 0,
      }
    this.onChangeusername = this.onChangeusername.bind(this)
    this.onChangeRole = this.onChangeRole.bind(this)
    this.onChangeDepartment = this.onChangeDepartment.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteUser = this.onDeleteUser.bind(this);

  }


  componentDidMount() {

    axios.get('http://localhost:4000/app/edits/' + this.props.params.id)
      .then(response => {

        this.setState({
        username: response.data.username,
        role: response.data.role, 
        department: response.data.department,
        completedContent: response.data.completedContent, 
        taskStatus: response.data.taskStatus,
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  onChangeusername(event) {
    this.setState({ username: event.target.value })
  }
  onChangeRole(event) {
    this.setState({ role: event.target.value })
  }
  onChangeDepartment(event) {
    this.setState({ department: event.target.value })
  }



  onSubmit(event) {
    event.preventDefault()

    const editUserObject = {
      username: this.state.username,
      role: this.state.role,
      department:this.state.department,
    };
    axios.put('http://localhost:4000/app/update/' + this.props.params.id, editUserObject)
      .then((res) => {
        console.log(res.data)
        console.log('User successfully updated')
      }).catch((error) => {
        console.log(error)
      })
    // Redirect to employee list 
   
  }

  onDeleteUser = (event) =>
  {
    axios.delete('http://localhost:4000/app/deleteUser/'+ this.props.params.id, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
        console.log('user successfully deleted!')
        
    }).catch((error) => {
        console.log(error)
    })

    event.preventDefault();

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
      <div className="mx-auto" style={{ width: '900px' }}>
       
        <form onSubmit={this.onSubmit} >
          <div className='mb-3'>
              <label>Update username</label>
              <input className="form-control" 
              type="username" 
              id="username" 
              placeholder={this.state.username}
              onChange={this.onChangeusername}
              value={this.state.username}
              />
          </div>
          <div className="mb-3">
            <label>Update Role</label>
              <input className="form-control" 
              type="role"  
              id="role" 
              placeholder="Role *"
              onChange={this.onChangeRole}
              value={this.state.role}
              />
          </div>
          <div className="mb-3">
            <label>Update Department</label>
              <input className="form-control" 
              type="role"  
              id="role" 
              placeholder="Department *"
              onChange={this.onChangeDepartment}
              value={this.state.department}
              />
          </div>
          <div className='d-grid'>
          <button type='submit' className='btn btn-primary' value='Submit'>
          <Link to="/Users" exact title="Users" style={{color: "white"}}>
            Update User
            </Link>
          </button>
<br></br>
          <button type='delete' className='btn btn-primary' value='delete' onClick={this.onDeleteUser} style={{ backgroundColor: "red"}}>
                <Link to="/Users" exact title="Users" style={{color: "white"}}>
                Delete User
                </Link>
            </button>
          </div>
          </form>
          </div>
          </div>
        </div>
        </div>
        </div>
        </nav>

    </div>
    );
  }
}
export default withRouter(editUsers);