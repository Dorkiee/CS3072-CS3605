import React, {Component} from 'react';
import { NavLink, Link } from "react-router-dom";
import './CSS/HomePage.css';
export default class  navigationHeader extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
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
            this.setState({ userData: data.data})
        });
       }
    signOut = () => {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("isLoggedIn");
      window.localStorage.href = "/";
      
    }
  


render () {
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  const isAdmin = this.state.userData.isAdmin;
  const canTakeExam = this.state.userData.canTakeExam;

  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow" style={{ backgroundColor: 'white' }}>
        <div className="container">
        {loggedIn? (
        <>
          <NavLink className="navbar-brand fs-3 fw-bold" to="/Dashboard" exact>
          <span style={{ color: '#f77c1b'  }}>P</span><span style={{ color: '#1b68b3' }}>hish</span><span style={{ color: '#f77c1b' }}>S</span><span style={{ color: '#1b68b3' }}>hield</span>
          </NavLink>
          </>
          ) : (
            <>
            <NavLink className="navbar-brand fs-3 fw-bold" to="/" exact>
            <span style={{ color: '#f77c1b' }}>P</span><span style={{ color: '#1b68b3' }}>hish</span><span style={{ color: '#f77c1b' }}>S</span><span style={{ color: '#1b68b3' }}>hield</span>
          </NavLink>
          </>    
          ) }
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="material-symbols-outlined">menu</span>
          </button>

<div className="collapse" id="navbarToggleExternalContent">
<ul class="navbar-nav me-auto mb-2 mb-lg-0">
  {loggedIn ? (
      <>
       {isAdmin ? (
                <div>
                  <li><a href="/Dashboard" className="active">
                    <span class="material-symbols-outlined">home</span>
                    <h6>Dashboard</h6>
                  </a></li>
                  <li><a href="/Users">
                    <span class="material-symbols-outlined">group</span>
                    <h6>Users</h6>
                  </a></li>
                  <li><a href="/Training">
                    <span class="material-symbols-outlined">model_training</span>
                    <h6>Courses</h6>
                  </a></li>
                  <li><a href="/" onClick={this.signOut}>
                    <span class="material-symbols-outlined">logout</span>
                    <h6>Sign out</h6>
                  </a></li>
                </div>
              ) : (
                <div>
                  <a href="/Dashboard" className="active">
                    <span class="material-symbols-outlined">home</span>
                    <h6>Dashboard</h6>
                  </a>
                  <a href="/Current-Training">
                    <span class="material-symbols-outlined">school</span>
                    <h6>Training</h6>
                  </a>

                  {canTakeExam ? (
                    <a href={"/Examination/" + this.state.userData._id}>
                      <span class="material-symbols-outlined">quiz</span>
                      <h6>Examination</h6>
                    </a>
                  ) : (
                  
                    <></>
                  )}
                  <a href="/" onClick={this.signOut}>
                    <span class="material-symbols-outlined">logout</span>
                    <h6>Sign out</h6>
                  </a>
                </div>
              )}
      </>
    ) : (
      <>
        <NavLink className="nav-link" to="/log-in" exact title="Login">
          Login
        </NavLink>
        <ul></ul>
        <span> | </span>
        <ul></ul>
        <Link className="view-link" to="/sign-up" exact title="Signup" style={{borderRadius: "35px", background : "#1b68b3"}}>
          Register
        </Link>
      </>
    )} 

</ul>
</div>


<div className='nav-item'>
  <div className="collapse navbar-collapse ">
    {loggedIn ? (
      <>
        <NavLink className="nav-link text-success" to="/Dashboard" exact title="Dashboard">
          <span style={{ color: '#1b68b3' }}>Hi, <strong>{this.state.userData.username}</strong> </span>
        </NavLink>
      </>
    ) : (
      <>
        <NavLink className="nav-link" to="/log-in" exact title="Login">
          Login
        </NavLink>
        <ul></ul>
        <span> | </span>
        <ul></ul>
        <Link className="view-link" to="/sign-up" exact title="Signup" style={{borderRadius: "35px", background : "#1b68b3"}}>
          Register
        </Link>
      </>
    )}                        
  </div>
    </div>


        </div>
      </nav>
    </div>
  )
  }
}

