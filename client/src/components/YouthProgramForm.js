import React, { Component } from 'react'
import axios from 'axios'
import settings from django.config

export default class YouthProgramForm extends Component {
    state = {
        youthProgram: {
            location: '',
            radius: ''
        }
    }

    handleChange = (evt) => {
        let youthProgram = {...this.state.youthProgram}
        youthProgram[evt.target.name] = evt.target.value 

        this.setState({youthProgram})
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.get(`https://api.careeronestop.org/v1/youthprogramfinder/${settings.CAREERONESTOP_ID}/${this.state.youthProgram.location}/${this.state.youthProgram.radius}`)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="youth-program-location">Location: </label>
                    <input
                        id="youth-program-location"
                        type="text"
                        name="location"
                        onChange={this.handleChange}
                        value={this.state.youthProgram.location} />

                    <label htmlFor="youth-program-distance">Distance: </label>
                    <input
                        id="youth-program-distance"
                        type="text"
                        name="radius"
                        onChange={this.handleChange}
                        value={this.state.youthProgram.radius} />

                    <input type="submit" value="Find Youth Programs" />
                </form>
            </div>
        )
    }
}
