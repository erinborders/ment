import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default class Post extends Component {
    state = {
        blogPost: {},
        redirectToHome: false,
        isEditFormShowing: false
    }

    componentDidMount() {
        this.fetchPost()
    }

    fetchPost = () => {
        axios.get(`/api/v1/blogposts/${this.props.match.params.id}/`)
            .then(blogPost => {
                console.log(blogPost.data)
                this.setState({blogPost: blogPost.data})
            })
    }

    deletePost = (evt) => {
        evt.preventDefault()

        axios.delete(`/api/v1/blogposts/${this.props.match.params.id}/`)
            .then(() => {
                this.setState({redirectToHome: true})
            })
    }

    // handle edit form toggle
    toggleEditForm = (evt) => {
        this.setState({isEditFormShowing: !this.state.isEditFormShowing})
    }

    // editing post
    handleChange = (evt) => {
        let editedBlogPost = {...this.state.blogPost}
        editedBlogPost[evt.target.name] = evt.target.value

        this.setState({blogPost: editedBlogPost})
    }

    handleSubmit =(evt) => {
        evt.preventDefault()

        axios.put(`/api/v1/blogposts/${this.props.match.params.id}/`, this.state.blogPost)
            .then(() => {
                console.log('blog post edited!')
            })
    }


    render() {
        // TO DO: CHANGE THIS TO REDIRECT BACK TO MENTOR
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <input type="submit" value="Delete Post" onClick={this.deletePost} />
                <h1>{this.state.blogPost.title}</h1>
                    <p>{this.state.blogPost.date}</p>
                <h3>{this.state.blogPost.description}</h3>
                    <p>{this.state.blogPost.body}</p>

                {
                    this.state.isEditFormShowing ?
                    // edit form
                    // TO DO: CHANGE TO BOOTSTRAP FORM
                    <div className="edit-form">
                        <h2>Edit Form</h2> 
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="post-title">Title: </label>
                            <input
                                id="post-title"
                                type="text"
                                name="title"
                                onChange={this.handleChange}
                                value={this.state.blogPost.title}
                                 />

                            <label htmlFor="post-date">Date: </label>
                            <input
                                id="post-date"
                                type="text"
                                name="date"
                                onChange={this.handleChange}
                                value={this.state.blogPost.date}
                                 />

                            <label htmlFor="post-description">Description: </label>
                            <input
                                id="post-description"
                                type="text"
                                name="description"
                                onChange={this.handleChange}
                                value={this.state.blogPost.description}
                                 />

                            <label htmlFor="post-body">Body: </label>
                            <input
                                id="post-body"
                                type="text"
                                name="body"
                                onChange={this.handleChange}
                                value={this.state.blogPost.body}
                                 />

                            <input type="submit" value="Edit Post" />
                        </form>
                    </div>

                    : <input type="submit" value="Edit Post" onClick={this.toggleEditForm} />
                }
            </div>
        )
    }
}
