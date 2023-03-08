import React, { Component } from 'react';
import axios from 'axios';

export default class UsersCount extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/app/taskcount')
      .then(res => this.setState({ count: res.data.count }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>{this.state.count}</div>
      
    );
  }
}
