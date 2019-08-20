import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Paper, Tooltip } from '@material-ui/core'

export default class CareerList extends Component {
    state = {
        careers: []
    }

    componentDidMount(){
        this.fetchCareers()
    }

    fetchCareers = () => {
        axios.get('/api/v1/careers/')
            .then(careers => {
                this.setState({careers: careers.data})
            })
    }

    render() {
        let careerList = this.state.careers.map(career => {
            return(
                <div key={career.id}>
                    <Link style={{textDecoration: 'none'}} to={`/careers/${career.id}`} >{career.career_field}</Link>
                </div>
            )
        })

        return (
            <Container>
                <h2 id="slogan">"Don't know what job you want? <br/> Calm down and get some MenT"</h2>
                <Paper className="content-container">
                    <h1>
                        Careers 
                        <Tooltip title="Add a Career" placement="right">
                            <Link style={{textDecoration: 'none'}} to="/careers/new">(+)</Link>
                        </Tooltip>
                    </h1>
                    
                    <hr className="break"/>
                    {careerList}
                </Paper>
            </Container>
        )
    }
}
