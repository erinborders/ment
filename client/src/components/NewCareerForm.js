import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default class NewCareerForm extends Component {
    state = {
        newCareer: {
            career_field: '',
            occupations: '',
            onetcode: '',
            state: ''
        },
        redirectToHome: false
    }

    // new career form
    handleChange = (evt) => {
        let newCareer = {...this.state.newCareer}
        newCareer[evt.target.name] = evt.target.value

        this.setState({newCareer})
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.post(`/api/v1/careers/`, this.state.newCareer)
            .then(() => {
                this.setState({redirectToHome: true})
            })
    }

    render() {
        if(this.state.redirectToHome){
            return <Redirect to="/" />
        }

        return (
            <div>
                <a href="https://www.onetcodeconnector.org/find/result">Find OnetCodes</a>
                <h2>New Career Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="career-field">Career Field: </label>
                    <input
                        id="career-field"
                        type="text"
                        name="career_field"
                        onChange={this.handleChange}
                        value={this.state.newCareer.career_field} />

                    <label htmlFor="career-occupations">Career Occupations: </label>
                    <input
                        id="career-occupations"
                        type="text"
                        name="occupations"
                        onChange={this.handleChange}
                        value={this.state.newCareer.occupations} />

                    <label htmlFor="career-onetcode">Career OnetCode: </label>
                    <input
                        id="career-onetcode"
                        type="text"
                        name="onetcode"
                        onChange={this.handleChange}
                        value={this.state.newCareer.onetcode} />

                    <label htmlFor="career-state">State: </label>
                    <input 
                        id="career-state"
                        type="text"
                        name="state"
                        onChange={this.handleChange}
                        value={this.state.newCareer.state} />

                    {/* <label htmlFor="career-skills">Career Skills: </label>
                    <input
                        id="career-skills"
                        type="text"
                        name="skills"
                        onChange={this.handleChange}
                        value={this.state.newCareer.skills} />

                    <label htmlFor="career-education">Education: </label>
                    <input
                        id="career-education"
                        type="text"
                        name="education"
                        onChange={this.handleChange}
                        value={this.state.newCareer.education} />

                    <label htmlFor="career-employers">Employers: </label>
                    <input
                        id="career-employers"
                        type="text"
                        name="employers"
                        onChange={this.handleChange}
                        value={this.state.newCareer.employers} />

                    <label htmlFor="career-data">Job Data: </label>
                    <input
                        id="career-data"
                        type="text"
                        name="job_data"
                        onChange={this.handleChange}
                        value={this.state.newCareer.job_data} /> */}

                    <input type="submit" value="Add New Career" />
                </form>
            </div>
        )
    }
}
