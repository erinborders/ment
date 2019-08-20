import React, { Component } from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import { Button, Container, TextField } from '@material-ui/core';

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
                <Paper className="content-container">

                <Container className="youth-center-search">
                    <h2>Nearby Youth Job Programs</h2>
                    <form onSubmit={this.handleSubmit}>
                    <Container className="youth-center-form">
                    <TextField
                        id="youth-program-location"
                        label="Zipcode"
                        name="location"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.youthProgram.location} />
                    </Container>

                    <Container>
                    <TextField
                        id="youth-program-distance"
                        label="Distance"
                        name="radius"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.youthProgram.radius} />
                    </Container>

                        <Container>
                            <Button variant="outlined" color="secondary" type="submit">Find Youth Programs</Button>
                        </Container>
                    </form>

                    {
                        this.state.hasSearchedYouthPrograms ?
                        programList : null
                    }

                </Container>
                <hr className="break"/>
                <div className="job-center-search">
                    <h2>Nearby American Job Centers</h2>
                    <form onSubmit={this.handleJobSearchSubmit}>

                    <Container>
                    <TextField
                        id="job-center-location"
                        label="Zipcode"
                        name="location"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleJobSearchChange}
                        value={this.state.jobCenter.location} />
                    </Container>

                    <Container>
                    <TextField
                        id="job-center-distance"
                        label="Distance"
                        name="radius"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleJobSearchChange}
                        value={this.state.jobCenter.radius} />
                    </Container>

                        <Container>
                            <Button variant="outlined" color="secondary" type="submit">Find Job Centers</Button>
                        </Container>
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
