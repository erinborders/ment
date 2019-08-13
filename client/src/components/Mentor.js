import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

export default class Mentor extends Component {
    state = {
        mentor: {
            posts: []
        },
        redirectToHome: false
    }

    componentDidMount(){
        this.fetchMentor()
    }

    fetchMentor = () => {
        axios.get(`/api/v1/mentors/${this.props.match.params.id}/`)
            .then(mentor => {
                this.setState({
                    mentor: mentor.data
                })
            })
    }

    deleteMentor = (evt) => {
        evt.preventDefault()

        axios.delete(`/api/v1/mentors/${this.props.match.params.id}/`)
            .then(() => {
                this.setState({redirectToHome: true})
            })
    }

    
    render() {
        // TO DO: MAKE THIS REDIRECT TO CAREER PAGE
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }

        let postList = this.state.mentor.posts.map(post => {
            return(
                <div key={post.id}>
                    <Link to={`/blogposts/${post.id}`} >{post.title}</Link>
                    <p>{post.description}</p>
                </div>
            )
        })

        return (
            <div>
                <img src={this.state.mentor.image_url} alt={`${this.state.mentor.name}`} />
                <h2>{this.state.mentor.name}</h2>
                <p>{this.state.mentor. profession}</p>
                <p>{this.state.mentor.advice_topics}</p>
                <input type="submit" value="Delete Mentor" onClick={this.deleteMentor} />
                <h1>Blog Posts</h1>
                    {postList}
            </div>
        )
    }
}
