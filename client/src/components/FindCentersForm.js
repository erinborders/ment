import React, { Component } from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
            <Container>
                <Paper>

                <div className="youth-center-search">
                    <h2>Nearby Youth Job Programs</h2>
                    <form onSubmit={this.handleSubmit}>
                        
                    <TextField
                        id="youth-program-location"
                        label="Zipcode"
                        name="location"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.youthProgram.location} />

                    <TextField
                        id="youth-program-distance"
                        label="Distance"
                        name="radius"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.youthProgram.radius} />

                        <div>
                            <Button variant="outlined" color="secondary" type="submit">Find Youth Programs</Button>
                        </div>
                    </form>

                    {
                        this.state.hasSearchedYouthPrograms ?
                        programList : null
                    }

                </div>
                
                <div className="job-center-search">
                    <h2>Nearby American Job Centers</h2>
                    <form onSubmit={this.handleJobSearchSubmit}>

                    <TextField
                        id="job-center-location"
                        label="Zipcode"
                        name="location"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleJobSearchChange}
                        value={this.state.jobCenter.location} />

                    <TextField
                        id="job-center-location"
                        label="Distance"
                        name="radius"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleJobSearchChange}
                        value={this.state.jobCenter.radius} />

                        <div>
                            <Button variant="outlined" color="secondary" type="submit">Find Job Centers</Button>
                        </div>
                    </form>

                    {
                        this.state.hasSearchedJobCenters ?
                        centerList : null
                    }
                </div>

                    </Paper>
            </Container>
        )
    }
}
