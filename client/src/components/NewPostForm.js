import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default class NewPostForm extends Component {
    // TO DO: MOVE NEW FORM COMPONENTS TO THEIR PARENT COMPONENTS SO YOU CAN USE PARAMS ID
    state = {
        newBlogPost: {
            title: '',
            description: '',
            body: '',
            date: '',
            mentor: this.props.match.params.id
        },
        redirectToHome: false
    }

    // new career form
    handleChange = (evt) => {
        let newBlogPost = {...this.state.newBlogPost}
        newBlogPost[evt.target.name] = evt.target.value

        this.setState({newBlogPost})
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.post(`/api/v1/blogposts/`, this.state.newBlogPost)
            .then(() => {
                this.setState({redirectToHome: true})
            })
    }

    render() {
        if(this.state.redirectToHome){
            return <Redirect to="/" />
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="post-title">Post Title: </label>
                    <input
                       id="post-title"
                       type="text"
                       name="title"
                       onChange={this.handleChange}
                       value={this.state.newBlogPost.title}  />

                    <label htmlFor="post-date">Date: </label>
                    <input
                       id="post-date"
                       type="text"
                       name="date"
                       onChange={this.handleChange}
                       value={this.state.newBlogPost.date}  />

                    <label htmlFor="post-description">Post Description: </label>
                    <input
                       id="post-description"
                       type="text"
                       name="description"
                       onChange={this.handleChange}
                       value={this.state.newBlogPost.description}  />

                    <label htmlFor="post-body">Post Body: </label>
                    <input
                       id="post-body"
                       type="text"
                       name="body"
                       onChange={this.handleChange}
                       value={this.state.newBlogPost.body}  />

                    <input type="submit" value="Add Post" />
                </form>
            </div>
        )
    }
}
