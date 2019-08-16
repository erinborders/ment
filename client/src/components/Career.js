import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import NewMentorForm from './NewMentorForm'
import axios from 'axios'

export default class Career extends Component {
    state = {
        career: {
            onetcode: '',
            state: '',
            mentors: []
        },
        description: '',
        skills: [],
        education: [],
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
            .then(() => {
                this.getJobDescription()
            })
    }

    // get request for job description from careeronestop api
    getJobDescription = () => {
        axios.get(`/api/v1/job-data/?onetcode=${this.state.career.onetcode}&state=${this.state.career.state}`)
            .then(jobinfo => {
                console.log(jobinfo.data)
                
                this.setState({
                    description: jobinfo.data.Purpose.OnetDesc,
                    skills: jobinfo.data.SkillsList,
                    education: jobinfo.data.Education.Certifications
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

        let skillsList = this.state.skills.map(skill => {
            return(
                <div>
                    {skill.Content}
                </div>
            )
        })

        let certificationList = this.state.education.map(certification => {
            return(
                <div>
                    {certification.Content}
                </div>
            )
        })

        return (
            
            <div>
                <h2>{this.state.career.career_field} in {this.state.career.state}</h2>
                <input type="submit" value="Delete Career" onClick={this.deleteCareer} />
                <h3>Description</h3>
                {/* <p>{this.state.career.description}</p> */}
                <p>{this.state.description}</p>
                <h3>Skills</h3>
                {skillsList}
                <h3>Education</h3>
                {certificationList}
                <h3>Mentors</h3>
                {/* <Link to="/mentors/new">Add a Mentor</Link> */}
                <NewMentorForm match={this.props.match}/>
                {mentorList}
            </div>
        )
    }
}
