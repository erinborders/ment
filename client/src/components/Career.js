import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import NewMentorForm from './NewMentorForm'
import axios from 'axios'
import { Button, Card, CardContent, CardMedia, Collapse, Container, FormControlLabel, Switch, GridList, GridListTile, Paper } from '@material-ui/core'

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
        redirectToHome: false,
        isMentorFormDisplayed: false
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
                this.getJobSkills()
            })
    }

    // get request for job description and certifications from careeronestop api
    getJobDescription = () => {
        axios.get(`/api/v1/job-data/?onetcode=${this.state.career.onetcode}&state=${this.state.career.state}`)
            .then(jobinfo => {
                this.setState({
                    description: jobinfo.data.Purpose.OnetDesc,
                    education: jobinfo.data.Education.Certifications
                })
            })
    }

    // get request for job skills from careeronestop api
    getJobSkills = () => {
        axios.get(`/api/v1/job-skills/?onetcode=${this.state.career.onetcode}&state=${this.state.career.state}`)
            .then(jobskills => {
                this.setState({skills: jobskills.data.OccupationDetail[0].SkillsDataList})
            })
    }

    deleteCareer = (evt) => {
        evt.preventDefault()

        axios.delete(`/api/v1/careers/${this.props.match.params.id}/`)
            .then(() => {
                this.setState({redirectToHome: true})
            })
    }

    toggleAddMentorForm = (evt) => {
        this.setState({
            isMentorFormDisplayed: !this.state.isMentorFormDisplayed
        })
    }

    render() {

        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }

        let mentorList = this.state.career.mentors.map(mentor => {
            return(
                <Card key={mentor.id} style={{maxWidth: 300, minHeight: 275}} >
                    <CardMedia
                        component="img"
                        alt={`${mentor.name}`}
                        height="140"
                        image={mentor.image_url}
                        title={`${mentor.name}`}
                        style={{objectFit: "contain"}}
                         />
                    <CardContent>
                        <Link style={{textDecoration: 'none'}} to={`/mentors/${mentor.id}`}>{mentor.name}</Link>
                        <p>{mentor.profession}</p>
                        <p>{mentor.company}</p>
                    </CardContent>
                </Card>
            )
        })

        let skillsList = this.state.skills.map(skill => {
            return(
                <GridListTile >
                    <p><strong>{skill.ElementName}</strong> - {skill.ElementDescription}</p>
                </GridListTile>
            )
        })

        let certificationList = this.state.education.map(certification => {
            return(
                <GridListTile>
                    <p>{certification.Content}</p>
                </GridListTile>
            )
        })

        return (
            
            <Container className="career-container" >
                <Paper className="content-container" >
                <h2>{this.state.career.career_field} in {this.state.career.state}</h2>
                <Button variant="outlined" color="secondary" type="submit" onClick={this.deleteCareer}>Delete Career</Button>
                <hr className="break"/>
                <h3>Description</h3>
                <p>{this.state.description}</p>
                <hr className="break"/>
                <div className="skills-education-container">
                    <div className="career-skills-container">
                        <h3>Skills</h3>
                            <GridList 
                            cellHeight={60} 
                            cols={1}
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-around',
                                overflowY: 'scroll',
                                width: 500,
                                height: 450,
                            }} >
                                {skillsList}
                            </GridList>
                        </div>
                    
                    <div className="career-education-container">
                        <h3>Education</h3>
                        <GridList 
                            cellHeight={40} 
                            cols={1}
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-around',
                                overflowY: 'scroll',
                                width: 500,
                                height: 450,
                            }} >
                                {certificationList}
                            </GridList>
                    </div>
                </div>
                <hr className="break"/>
                    <h3>Mentors</h3>
               

                    <FormControlLabel
                        control={<Switch checked={this.state.isMentorFormDisplayed} onChange={this.toggleAddMentorForm} />}
                        label="Create a Mentor" />
                   
                    <Collapse in={this.state.isMentorFormDisplayed}>
                         <NewMentorForm 
                         match={this.props.match}
                         fetchCareer={this.fetchCareer} /> 
                    </Collapse> 
                         

                    <Container className="content-container">
                        <GridList
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'start',
                                overflowY: 'scroll',
                                height: 300,
                            }} >
                                {mentorList}
                            </GridList>
                            </Container>
                            </Paper>
            </Container>
        
        )
    }
}
