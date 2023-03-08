import React, { Component } from 'react';
import axios from 'axios';
import "../main_pages/CSS/signForm.css";

class signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      companyName: '',
      age: '',
      department: '',
      role: 'user',
      isAdmin: false,
      isUser: true,
      password: '',
      errorUserMessage: '',
      errorPinMessage: '',
    };
    this.changeUsername = this.changeUsername.bind(this);
    this.changeCompanyName = this.changeCompanyName.bind(this);
    this.changepassword = this.changepassword.bind(this);
    this.changeDepartment = this.changeDepartment.bind(this);
    this.changeAge = this.changeAge.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  changeCompanyName(event) {
    this.setState({
      companyName: event.target.value
    });
  }

  changepassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  changeDepartment(event) {
    this.setState({
      department: event.target.value
    });
  }

  changeAge(event) {
    this.setState({
      age: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const isValid = /^(?=.*[A-Za-z]{4})(?=.*\d)[A-Za-z\d]*$/.test(this.state.username);
  
    if (isValid) {
      const registered = {
        registered_by: 'admin',
        username: this.state.username,
        companyName: this.state.companyName,
        age: this.state.age,
        role: 'user',
        department: this.state.department,
        isAdmin: false,
        isUser: true,
        password: this.state.password
      };
  
      axios
        .post('http://localhost:4000/app/sign-up', registered)
        .then(() => {
          window.alert('Sign up successful! Please log in.');
          window.location.href = '/log-in';
        })
        .catch(error => console.error(error));
    } else {
      this.setState({
        errorUserMessage:
          'Username must contain at least 4 letter characters and 1 number character.'
      });
  
      this.setState({
        username: '',
        companyName: '',
        age: '',
        department: '',
        role: '',
        isAdmin: false,
        isUser: true,
        password: ''
      });
    }
  }

  validateUsername = async (event) => {
    const username = event.target.value;
  
    // Check if the username is valid (4 letter characters and 1 number)
    const isValid = /^(?=.*[A-Za-z]{4})(?=.*\d)[A-Za-z\d]*$/.test(username);
  
    if (isValid) {
      // Check if the username is available
      try {
        const response = await fetch(`http://localhost:4000/app/check-username/${username}`);
        const data = await response.json();
        if (data.isAvailable) {
          // Username is available
          this.setState({
            errorUserMessage: '',
            isUsernameAvailable: true,
          });
        } else {
          // Username is not available
          this.setState({
            errorUserMessage: 'This username is already taken.',
            isUsernameAvailable: false,
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // Username is not valid
      this.setState({
        errorUserMessage:
          'Username must contain at least 4 letter characters and 1 number character.',
        isUsernameAvailable: false,
      });
    }
  };
  
  

  validatePassword = event => {
    const password = event.target.value;
    const isValid = /^[0-9]{4,6}$/.test(password);

    if (isValid) {
      this.setState({ errorPinMessage: '' });
    } else {
      this.setState({
        errorPinMessage:
          'Password must be between 4 and 6 digits long'
      });
    }
  };

  render() {
    return (
      <div>
        <div className="containerForm">
          <form onSubmit={this.onSubmit}>
            <h3 className="text-wrapper">Sign Up Today</h3>
            <br />
            <div className="mb-3">
              <label>Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Username *"
                pattern="[a-zA-Z]{4}[a-zA-Z0-9]*"
                onChange={this.changeUsername}
                value={this.state.username}
                onBlur={this.validateUsername}
                required
              />
              {this.state.errorUserMessage && (
                <div style={{color: "red"}}>
                  {this.state.errorUserMessage}
                </div>
              )}
          </div>
          <div className="mb-3">
            <label>Age</label>
            <br></br>
            <select 
            className="dropdown-select" 
              type="age" 
              id="age" 
              placeholder="Select your age *"
              onChange={this.changeAge}
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
          <div className="mb-3"> {/* have two sign up pages -- have a drop down to select registed company -- if company not listed, send request to IT department for them to sign up?*/}
            <label>Profession</label>
            <br></br>
              <select  
              id="companyName dropdown" 
              className="dropdown-select" 
              placeholder="Select an option"
              onChange={this.changeCompanyName}
              value={this.state.companyName}
              required
              >
                <option value="">Please select an option *</option>
                <option value="Indivior">Indivior Employee</option>
                <option value="Brunel">Brunel Student</option>
                <option value="Public">Member of public</option>
                </select>
          </div>
          <div className="mb-3"> {/* have two sign up pages -- have a drop down to select registed company -- if company not listed, send request to IT department for them to sign up?*/}
            <label>Department</label>
            <br></br>
            <select  
              id="department" 
              className="dropdown-select" 
              placeholder="Select an option"
              onChange={this.changeDepartment}
              value={this.state.department}
              required
              >
                <option value="">Please select an option *</option>
                <option value="Indivior: IT">Indivior: IT</option>
                <option value="Indivior: Legal & Governance">Indivior: Legal & Governance</option>
                <option value="Indivior: Finance">Indivior: Finance</option>
                <option value="Indivior: Commercial">Indivior: Commercial</option>
                <option value="Indivior: Research & Development">Indivior: Research & Development</option>
                <option value="Indivior: Supply">Indivior: Supply</option>
                <option value="Indivior: Medical">Indivior: Medical</option>
                <option value="Brunel: Computer Science">Brunel: Computer Science</option>
                <option value="Brunel">Brunel</option>
                <option value="Public">Member of public</option>
                </select>
          </div>
          <div className="mb-3">
            <label>Pin</label>
              <input className="form-control" 
              type="password"  
              id="password" 
              placeholder="password *"
              pattern="[0-9]{4,6}"
              onChange={this.changepassword}
              value={this.state.password}
              onBlur={this.validatePassword}
              required
              />
              {this.state.errorPinMessage && (
                <div style={{color: "red"}}>
                  {this.state.errorPinMessage}
                </div>
              )}
          </div>
          <div className='d-grid'>
          <button type='submit' className='btn btn-primary' value='Submit'>
            Sign up
          </button>
          </div>
          </form>
          </div>
          <br></br>
          <br></br>
          <footer className='footerLogin'>
          <p>&copy; 2023 PhishShield, developed by Kehinde Oduyeye 1814493</p>
          </footer>  
      </div>   
  );
}
} 
export default signup;