import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Mentor extends Component {
    state = {
        mentor: {},
        posts: []
    }

    componentDidMount(){
        this.fetchMentor()
    }

    fetchMentor = () => {
        axios.get(`/api/v1/mentors/${this.props.match.params.id}/`)
            .then(mentor => {
                this.setState({
                    mentor: mentor.data,
                    posts: mentor.data.posts
                })
            })
    }

    
    render() {
        let postList = this.state.posts.map(post => {
            return(
                <div key={post.id}>
                    <Link to={`/blogposts/${post.id}`} >{post.title}</Link>
                    <p>{post.description}</p>
                </div>
            )
        })

        return (
            <div>
                <img src={this.state.mentor.image_url} />
                <h2>{this.state.mentor.name}</h2>
                <p>{this.state.mentor. profession}</p>
                <p>{this.state.mentor.advice_topics}</p>
                <h1>Blog Posts</h1>
                    {postList}
            </div>
        )
    }
}
