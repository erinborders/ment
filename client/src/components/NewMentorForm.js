import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
                <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                    <div>
                    <TextField
                        id="mentor-name"
                        label="Name"
                        name="name"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.newMentor.name} />

                    <TextField
                        id="mentor-profession"
                        label="Profession"
                        name="profession"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.newMentor.profession} />
                    </div>

                    <div>
                        <TextField
                            id="mentor-advice"
                            label="Can Give Advice On"
                            name="advice_topics"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.newMentor.advice_topics} />

                        <TextField
                            id="mentor-image"
                            label="Picture Url"
                            name="image_url"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.newMentor.image_url} />
                    </div>

                    <div>
                    <TextField
                            id="mentor-company"
                            label="Company"
                            name="company"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.newMentor.company} />

                    <TextField
                            id="mentor-email"
                            label="Email"
                            name="email"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.newMentor.email} />
                    </div>
                
                    {/* <input type="submit" value="Add Mentor" /> */}
                    <Button variant="outlined" type="submit">Add Mentor</Button>
                </form>
            </div>
        )
    }
}
