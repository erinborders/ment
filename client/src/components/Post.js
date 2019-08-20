import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Button, Container, Paper, TextField } from '@material-ui/core'

export default class Post extends Component {
    state = {
        blogPost: {},
        isEditFormShowing: false
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

    deletePost = (evt) => {
        evt.preventDefault()

        axios.delete(`/api/v1/blogposts/${this.props.match.params.id}/`)
            .then(() => {
                this.props.history.goBack()
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
                this.toggleEditForm()
            })
    }


    render() {
        

        return (
            <Container>
                <Paper className="content-container">

                <h1>{this.state.blogPost.title}</h1>
                <Button variant="outlined" color="secondary" type="submit" onClick={this.deletePost}>Delete</Button>
                
                    <p>{this.state.blogPost.date}</p>
                <h3>{this.state.blogPost.description}</h3>
                <Container>
                    <p>{this.state.blogPost.body}</p>
                </Container>

                {
                    this.state.isEditFormShowing ?
                    // edit form
                    
                    // TO DO: PUT IN ITS OWN COMPONENT
                    <div className="edit-form">
                        <h2>Edit Form</h2> 
                        <form onSubmit={this.handleSubmit}>
                
                <Container style={{display: 'flex', justifyContent: 'space-between'}}>
                    <TextField
                        id="post-title"
                        label="Title"
                        name="title"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.blogPost.title} />

                    <TextField
                        id="post-date"
                        label="Date"
                        name="date"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.blogPost.date} />

                    </Container>
                    <Container>

                    <TextField
                        id="post-description"
                        label="Description"
                        name="description"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.blogPost.description} />
                    </Container>
                    <Container>

                    <TextField
                        id="post-body"
                        label="How was your day?"
                        name="body"
                        margin="normal"
                        multiline
                        rows="20"
                        fullWidth
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.blogPost.body} />

                    </Container>
                    <div>

                    <Button variant="outlined" color="secondary" type="submit" >Publish Changes</Button>
                    </div>
                    </form>
                    </div>: <Button variant="outlined" color="secondary" type="submit" onClick={this.toggleEditForm} >Edit Post</Button>
               
            }
                  
            </Paper>
            </Container>
        )
    }
}
