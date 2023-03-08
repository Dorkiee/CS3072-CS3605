import axios, { Axios } from "axios";
import React, {Component, useState, useEffect} from "react";
import EmpTable from './empTable.js'
import TaskStatus from './TaskStatus.js'
import { NavLink } from "react-router-dom";
import DashboardNav from "../main_pages/DashboardNav.js";
import "../soc_pages/CSS/Table-Fourm.css";


// for task status have it as X0...Xn10 out of XX and XX should be the number of tasks created.
export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
    };
  }  
  
  componentDidMount() {
    axios.get("http://localhost:4000/app/log-in")
    .then(res => {
      console.log(res, "userData");
      this.setState({ userData: res.data})   
    })
    .catch(error => {
      
      });
    }

    DataTable () {
      return this.state.userData.map ((res, i) => {
        return <EmpTable obj={res} key={i}/>
      });
    }
  

    render () {
      
        return (
        <div>
        <nav >
        <div class="wrapper">
        <DashboardNav/>
          <div class="main_content">
            {/*<div class="header">Welcome!! user name here</div>*/}
            <div class="info">
            <div class="Tabelcontainer">
            <div>
                <br></br>
            </div>
            <div>
            <form class="usertable">
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Department</th>
                            <th>Access Level</th>
                            <th>Exam Taken</th>
                            <th>Exam Score</th>
                            <th>Passed</th>
                            <th>Settings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.DataTable()}
                    </tbody>
                </table>
            </form>
            </div>
            <div>
              {<TaskStatus/>}
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