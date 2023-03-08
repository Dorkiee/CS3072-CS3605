

import { NavLink } from "react-router-dom";
import React, { Component } from 'react';
import "./CSS/signForm.css"

//NEED TO DISTINGUSION WITH USER WANTS TO LOGIN AND POST THE RIGHT DATA BASED ON ROLE??? 
//TICK "isAdmin" TO TRUE IF username MATCH ADMIN USER'S username AND LOG THEM INTO THE SOC_DASHBOARD ??


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    console.log(username, password);
    fetch("http://localhost:4000/app/log-in", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("isLoggedIn", true);
          window.location.href = "/Dashboard";
        } else {
          alert("Incorrect username or password.");
        }
      });
  }


render () {
    return (
    <div>
      <div class="containerForm">
      <form onSubmit={this.handleSubmit}>
      <h3>Sign In</h3>
        <br></br>
      <div className="mb-3">
        <label>Username</label>
        <input
          type="username"
          className="form-control"
          placeholder="Enter username"
          onChange={(e) => this.setState({ username: e.target.value })}
        />
      </div>
      <br></br>
      <div className="mb-3">
        <label>Pin</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => this.setState({ password: e.target.value })}
        />
      </div>
      <br></br>
    
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <br></br>
      <p className="forgot-pin text-right">
        <a href="/sign-up">Register</a>
      </p>
    </form> 
    
    </div>
    
    <footer className='footerLogin'>
      <p>&copy; 2023 PhishShield, developed by Kehinde Oduyeye 1814493</p>
      </footer>  
    </div>
    );
    }
  };
    
  export default Login;