import React, { Component } from 'react';
import axios from 'axios'
import "../main_pages/CSS/signForm.css"

class adminSignup extends Component {
  constructor () {
    super ()
    this.state = {
      username: '',
      firstName: '',
      lastName:'',
      companyName:'',
      role:'',
      age:'',
      isAdmin: false,
      isUser: false,
      password: ''
    }
    this.changeusername = this.changeusername.bind(this)
    this.changeFirstName = this.changeFirstName.bind(this)
    this.changeLastName = this.changeLastName.bind(this)
    this.changeCompanyName = this.changeCompanyName.bind(this)
    this.changepassword = this.changepassword.bind(this)
    this.changeage = this.changeage.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  changeusername(event) {
    this.setState({
      username:event.target.value
    })
  }

  changeFirstName(event) {
    this.setState({
      firstName:event.target.value
    })
  }

  changeLastName(event) {
    this.setState({
      lastName:event.target.value
    })
  } 

  changeCompanyName(event) {
    this.setState({
      companyName:event.target.value
    })
  } 

  changepassword(event) {
    this.setState({
      password:event.target.value
    })
  }

  changeage(event) {
    this.setState({
      age:event.target.value
    })
  }

  onSubmit(event) {
    event.preventDefault()
  
    const registeredA = {
        registered_by: 'moderator',
        username:this.state.username,
        firstName: this.state.firstName,
        lastName:this.state.lastName,
        companyName:this.state.companyName,
        role:'admin',
        age:this.state.age,
        isAdmin: true,
        isUser: false,
        password:this.state.password
    }

    axios.post('http://localhost:4000/app/sign-up-admin', registeredA)
   .then(response => console.log(response.data))

        this.setState({
            registered_by: '',
            username: '',
            firstName:'',
            lastName:'',
            companyName: '',
            role:'',
            age:'',
            isAdmin: false,
            isUser: false,
            password: '',
        })
  }

  validationpassword = event => { //testing validation, password must be higher than 4 but less than 6 for format to be submitted 
    const password = event.target.value;
    const isValid = /^[0-9]{8,10}$/.test(password);

    if (isValid) {
      this.setState({ errorMessage: '' });
    } else {
      this.setState({ errorMessage: 'incorrect format 8-10 digits, please try again' });
    }
  };

  render () {
    return (
    <div>
      <div class="containerForm">
        <form onSubmit={this.onSubmit} >
          <h3 className='text-wrapper'>Sign Up Today</h3>
          <br></br>
          <div className='mb-3'>
              <label>Username</label>
              <input className="form-control" 
              type="username" 
              id="username" 
              placeholder="username *"
              onChange={this.changeusername}
              value={this.state.username}
              required
              />
          </div>
          <div className="mb-3">
            <label>First Name</label>
              <input  type="text" 
               id="firstName"  
               className="form-control"
               placeholder="First Name *"
               onChange={this.changeFirstName}
              value={this.state.firstName}
              required
               />
          </div>
          <div className="mb-3">
            <label>Last Name</label>
              <input  type="text" 
              id="lastName" 
              className="form-control" 
              placeholder="Last Name *"
              onChange={this.changeLastName}
              value={this.state.lastName}
              required
              />
          </div>

          <div className="mb-3"> {/* have two sign up pages -- have a drop down to select registed company -- if company not listed, send request to IT age for them to sign up?*/}
            <label>Role</label>
            <br></br>
            <select   type="role" 
              id="companyName" 
              className="dropdown-select" 
              placeholder="Company Name *"
              onChange={this.changeCompanyName}
              value={this.state.companyName}
              required
              >
                <option value="">Please select an option *</option>
                <option value="Soc Analyst">Soc Analyst</option>
               </select> 
          </div>
          <div className="mb-3"> {/* have two sign up pages -- have a drop down to select registed company -- if company not listed, send request to IT age for them to sign up?*/}
            <label>Age</label>
            <br></br>
            <select 
            className="dropdown-select" 
              type="age" 
              id="age" 
              placeholder="Select your age *"
              onChange={this.changeage}
              value={this.state.age}
              required
              >
                <option value="">Please select an option *</option>
                <option value="18 to 24">18 to 24</option>
                <option value="25 to 34">25 to 34</option>
                <option value="35 to 44">35 to 44</option>
                <option value="45 to 54">45 to 54</option>
                <option value="55 to 64">55 to 64</option>
                <option value="65 or over">65 or over</option>
                </select>
          </div>

          <div className="mb-3">
            <label>Pin</label>
            <input className="form-control" 
              type="password"  
              id="password" 
              placeholder="password *"
              pattern="[0-9]{8,10}"
              onChange={this.changepassword}
              value={this.state.password}
              onBlur={this.validatepassword}
              required
              />
          </div>
          <div className='d-grid'>
          <button type='submit' className='btn btn-primary' value='Submit'>
            Sign up
          </button>
          </div>
          </form>
          </div>

      </div>   
  );
}
} 
export default adminSignup;