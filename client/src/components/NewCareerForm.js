import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'

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
            <Container>
                <Paper className="content-container">

                <h2>New Career Form</h2>
                <a style={{textDecoration: 'none'}} href="https://www.onetcodeconnector.org/find/result" target="_blank">Find Onet Codes</a>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <TextField
                            id="career-field"
                            label="Career"
                            name="career_field"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.newCareer.career_field} />

                        <TextField
                            id="career-occupations"
                            label="Industry"
                            name="occupations"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.newCareer.occupations} />
                    </div>

                    <div>
                        <TextField
                            id="career-onetcode"
                            label="Onet Code"
                            name="onetcode"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.newCareer.onetcode} />

                        <TextField
                            id="career-state"
                            label="State Abbreviation"
                            name="state"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.newCareer.state} />
                    </div>

                    <div>
                        <Button variant="outlined" type="submit">Add New Career</Button>
                    </div>
                    
                </form>
                </Paper>
            </Container>
        )
    }
}
