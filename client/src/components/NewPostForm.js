import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Button, Container, TextField } from '@material-ui/core'

export default class NewPostForm extends Component {
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
                {/* TO DO: ADD SPACING BETWEEN FORM INPUT FIELDS */}
                    <div>
                    <TextField
                        id="post-title"
                        label="Title"
                        name="title"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.newBlogPost.title} />

                    <TextField
                        id="post-date"
                        label="Date"
                        name="date"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.newBlogPost.date} />

                    </div>
                    <Container>

                    <TextField
                        id="post-description"
                        label="Description"
                        name="description"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.newBlogPost.description} />
                    </Container>
                    <Container>

                    <TextField
                        id="post-body"
                        label="How was your day?"
                        name="body"
                        margin="normal"
                        multiline="true"
                        rows="20"
                        fullWidth
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.newBlogPost.body} />

                    </Container>
                    <div>

                    <Button variant="outlined" color="secondary" type="submit" >Publish</Button>
                    </div>
                    
                </form>
            </div>
        )
    }
}
