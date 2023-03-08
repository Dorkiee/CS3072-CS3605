import axios from "axios"
import React, {Component} from "react"
import { Link } from 'react-router-dom';


export default class  taskTable extends Component {
//include tracking -- i can do this by incrementing one when the user "completed a course"
    render () {
        const { completedTasks } = this.props.obj;
        return (
            <tr>
                 <td>{this.props.obj.courseName}</td>
                <td>
                    {completedTasks.map((task, index) => (
                        <p key={index}>{task.userName}</p>
                    ))}
                </td>
            </tr>
        )
    }
}