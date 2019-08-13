import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Career extends Component {
    state = {
        career: {},
        mentors: []
    }

    componentDidMount(){
        this.fetchCareer()
    }

    fetchCareer = () => {
        axios.get(`/api/v1/careers/${this.props.match.params.id}/`)
            .then(career => {
                console.log(career)
                this.setState({
                    career: career.data,
                    mentors: career.data.mentors
                })
            })
    }

    render() {
        let mentorList = this.state.mentors.map(mentor => {
            return(
                <div key={mentor.id}>
                    <img src={this.state.mentor.image_url} alt="Mentor profile picture" />
                    {/* TO DO: check that this link works */}
                    <Link to={`/api/v1/mentors/${mentor.id}`}>{mentor.name}</Link>
                    <p>{mentor.profession}</p>
                    <p>{mentor.company}</p>
                </div>
            )
        })
        return (
            
            <div>
                <h2>{this.state.career.career_field}</h2>
                <h3>Description</h3>
                <p>{this.state.career.description}</p>
                <h3>Mentors</h3>
                {mentorList}
            </div>
        )
    }
}
