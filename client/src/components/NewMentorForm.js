import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default class NewMentorForm extends Component {
    state = {
        newMentor:{
            name: '',
            profession: '',
            advice_topics: '',
            image_url: '',
            company: '',
            email: '',
            career: this.props.match.params.id
        },
        redirectToHome: false
    }

    // new mentor form
    handleChange = (evt) => {
        let newMentor = {...this.state.newMentor}
        newMentor[evt.target.name] = evt.target.value

        this.setState({newMentor})
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.post(`/api/v1/mentors/`, this.state.newMentor)
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
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="mentor-name">Name: </label>
                    <input
                        id="mentor-name"
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                        value={this.state.newMentor.name} />

                    <label htmlFor="mentor-profession">Profession: </label>
                    <input
                        id="mentor-profession"
                        type="text"
                        name="profession"
                        onChange={this.handleChange}
                        value={this.state.newMentor.profession} />

                    <label htmlFor="mentor-advice">Advice Topics: </label>
                    <input
                        id="mentor-advice"
                        type="text"
                        name="advice_topics"
                        onChange={this.handleChange}
                        value={this.state.newMentor.advice_topics} />

                    <label htmlFor="mentor-image">Profile Picture: </label>
                    <input
                        id="mentor-image"
                        type="text"
                        name="image_url"
                        onChange={this.handleChange}
                        value={this.state.newMentor.image_url} />

                    <label htmlFor="mentor-company">Company: </label>
                    <input
                        id="mentor-company"
                        type="text"
                        name="company"
                        onChange={this.handleChange}
                        value={this.state.newMentor.company} />

                    <label htmlFor="mentor-email">Email: </label>
                    <input
                        id="mentor-email"
                        type="text"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.newMentor.email} />

                    <input type="submit" value="Add Mentor" />
                </form>
            </div>
        )
    }
}
