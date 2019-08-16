import React, { Component } from 'react'
import axios from 'axios'

export default class YouthProgramForm extends Component {
    state = {
        youthProgram: {
            location: '',
            radius: ''
        },
        hasSearched: false,
        programs: []
    }

    handleChange = (evt) => {
        let youthProgram = {...this.state.youthProgram}
        youthProgram[evt.target.name] = evt.target.value 

        this.setState({youthProgram})
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        // look up query strings
        axios.get(`/api/v1/youth-programs/`)
            .then(programs => {
                console.log(programs.data.YouthProgramList)
                this.setState({
                    programs: programs.data.YouthProgramList,
                    hasSearched: true
                })
            })
    }

    render() {
        let programList = this.state.programs.map(program => {
            return(
                <div key={program.ID}>
                    {program.Name}  
                </div>
            )
        })

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
                {
                    this.state.hasSearched ?
                    programList : null
                }
            </div>
        )
    }
}
