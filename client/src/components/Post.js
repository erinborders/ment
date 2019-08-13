import React, { Component } from 'react'
import axios from 'axios'

export default class Post extends Component {
    state = {
        post: {}
    }

    componentDidMount() {
        this.fetchPost()
    }

    fetchPost = () => {
        axios.get(`/api/v1/posts/${this.props.match.params.id}/`)
            .then(post => {
                this.setState({post})
            })
    }


    render() {
        return (
            <div>
                <h1>{this.state.post.title}</h1>
                <p>{this.state.post.date}</p>
                <h3>{this.state.post.description}</h3>
                <p>{this.state.post.body}</p>
            </div>
        )
    }
}
