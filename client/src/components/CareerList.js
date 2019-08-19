import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

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
                    <Link to={`/careers/${career.id}`} >{career.career_field}</Link>
                </div>
            )
        })

        return (
            <Container>
                <Paper>
                    <h1>Career List</h1>
                    <Link to="/careers/new">Add Career</Link>
                    {careerList}
                </Paper>
            </Container>
        )
    }
}
