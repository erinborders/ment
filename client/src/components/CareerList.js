import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

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
            <div>
                <h1>Career List</h1>
                {careerList}
            </div>
        )
    }
}
