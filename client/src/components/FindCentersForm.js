import React, { Component } from 'react'
import axios from 'axios'

export default class FindCentersForm extends Component {
    state = {
        youthProgram: {
            location: '',
            radius: ''
        },
        hasSearchedYouthPrograms: false,
        programs: [],
        jobCenter: {
            location: '',
            radius: ''
        },
        hasSearchedJobCenters: false,
        centers: []
    }

    // youth program form
    handleChange = (evt) => {
        let youthProgram = {...this.state.youthProgram}
        youthProgram[evt.target.name] = evt.target.value 

        this.setState({youthProgram})
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        
        axios.get(`/api/v1/youth-programs/?location=${this.state.youthProgram.location}&radius=${this.state.youthProgram.radius}`)
            .then(programs => {
                this.setState({
                    programs: programs.data.YouthProgramList,
                    hasSearchedYouthPrograms: true
                })
            })
    }

    // job center form
    handleJobSearchChange = (evt) => {
        let jobCenter = {...this.state.jobCenter}
        jobCenter[evt.target.name] = evt.target.value 

        this.setState({jobCenter})
    }

    handleJobSearchSubmit = (evt) => {
        evt.preventDefault()

        axios.get(`/api/v1/job-centers/?location=${this.state.jobCenter.location}&radius=${this.state.jobCenter.radius}`)
            .then(centers => {
                console.log(centers.data.OneStopCenterList)
                this.setState({
                    centers: centers.data.OneStopCenterList,
                    hasSearchedJobCenters: true
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

        let centerList = this.state.centers.map(center => {
            return(
                <div key={center.ID}>
                    {center.Name}
                </div>

            )
        })

        return (
            <div>
                <div className="youth-center-search">
                    <h2>Nearby Youth Job Programs</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="youth-program-location">Location: </label>
                        <input
                            id="youth-program-location"
                            type="text"
                            name="location"
                            placeholder="Zipcode"
                            onChange={this.handleChange}
                            value={this.state.youthProgram.location} />

                        <label htmlFor="youth-program-distance">Distance: </label>
                        <input
                            id="youth-program-distance"
                            type="text"
                            name="radius"
                            placeholder="Miles"
                            onChange={this.handleChange}
                            value={this.state.youthProgram.radius} />

                        <input type="submit" value="Find Youth Programs" />
                    </form>
                    {
                        this.state.hasSearchedYouthPrograms ?
                        programList : null
                    }
                </div>
                
                <div className="job-center-search">
                    <h2>Nearby American Job Centers</h2>
                    <form onSubmit={this.handleJobSearchSubmit}>
                        <label htmlFor="job-center-location">Location: </label>
                        <input
                            id="job-center-location"
                            type="text"
                            name="location"
                            placeholder="Zipcode"
                            onChange={this.handleJobSearchChange}
                            value={this.state.jobCenter.location} />

                        <label htmlFor="job-center-distance">Distance: </label>
                        <input
                            id="job-center-distance"
                            type="text"
                            name="radius"
                            onChange={this.handleJobSearchChange}
                            value={this.state.jobCenter.radius} />

                        <input type="submit" value="Find Job Centers" />
                    </form>

                    {
                        this.state.hasSearchedJobCenters ?
                        centerList : null
                    }
                </div>

            </div>
        )
    }
}
