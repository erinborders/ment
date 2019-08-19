import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import NewMentorForm from './NewMentorForm'
import axios from 'axios'
import GridList from '@material-ui/core/Gridlist'
import GridListTile from '@material-ui/core/GridListTile'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Theme from '../Theme'

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
        redirectToHome: false
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
                    // skills: jobinfo.data.SkillsList,
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

    render() {
        // const classes = useStyles();

        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }

        let mentorList = this.state.career.mentors.map(mentor => {
            return(
                <div key={mentor.id}>
                    <img src={mentor.image_url} alt={`${mentor.name}`} />
                    <Link to={`/mentors/${mentor.id}`}>{mentor.name}</Link>
                    <p>{mentor.profession}</p>
                    <p>{mentor.company}</p>
                </div>
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
        <MuiThemeProvider theme={Theme}>
            <div className="career-container" >
                <h2>{this.state.career.career_field} in {this.state.career.state}</h2>
                <input type="submit" value="Delete Career" onClick={this.deleteCareer} />
                <h3>Description</h3>
                <p>{this.state.description}</p>
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
                <h3>Mentors</h3>
                <NewMentorForm match={this.props.match}/>
                {mentorList}
            </div>
        </MuiThemeProvider>
        )
    }
}
