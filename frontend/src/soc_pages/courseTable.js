import React, {Component} from "react"
import { Link } from 'react-router-dom';

export default class  courseTable extends Component {

    render () {
        return (
            <div className="courseContent">
            <div className="cardSize">
            <div className="insights">
            <h3 className="card-title">{this.props.obj.courseName}</h3>
                <div className="card-action">
                <Link className="view-link" to={"/course/" + this.props.obj._id}>
                View Course
                </Link>
                </div>
            </div>
            </div>
            </div>
        )
    }
}