import React, { Component } from 'react'
import axios from 'axios'

export default class Post extends Component {
    state = {
        blogPost: {}
    }

    componentDidMount() {
        this.fetchPost()
    }

    fetchPost = () => {
        axios.get(`/api/v1/blogposts/${this.props.match.params.id}/`)
            .then(blogPost => {
                this.setState({blogPost: blogPost.data})
            })
    }


    render() {
        return (
            <div>
                <h1>{this.state.blogPost.title}</h1>
                <p>{this.state.blogPost.date}</p>
                <h3>{this.state.blogPost.description}</h3>
                <p>{this.state.blogPost.body}</p>
            </div>
        )
    }
}
