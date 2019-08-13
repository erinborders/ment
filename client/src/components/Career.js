import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import NewMentorForm from './NewMentorForm'
import axios from 'axios'

export default class Career extends Component {
    state = {
        career: {
            mentors: []
        },
        redirectToHome: false
    }

    componentDidMount(){
        this.fetchCareer()
    }

    fetchCareer = () => {
        axios.get(`/api/v1/careers/${this.props.match.params.id}/`)
            .then(career => {
                this.setState({
                    career: career.data
                })
            })
    }

    deleteCareer = (evt) => {
        evt.preventDefault()

        axios.delete(`/api/v1/careers/${this.props.match.params.id}/`)
            .then(() => {
                this.setState({redirectToHome: true})
            })
    }

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }

        let mentorList = this.state.career.mentors.map(mentor => {
            return(
                <div key={mentor.id}>
                    <img src={mentor.image_url} alt={`${mentor.name}`} />
                    <Link to={`/mentors/${mentor.id}`}>{mentor.name}</Link>
                    <p>{mentor.profession}</p>
                    <p>{mentor.company}</p>
                </div>
            )
        })
        return (
            
            <div>
                <h2>{this.state.career.career_field}</h2>
                <input type="submit" value="Delete Career" onClick={this.deleteCareer} />
                <h3>Description</h3>
                <p>{this.state.career.description}</p>
                <h3>Mentors</h3>
                {/* <Link to="/mentors/new">Add a Mentor</Link> */}
                <NewMentorForm match={this.props.match}/>
                {mentorList}
            </div>
        )
    }
}
