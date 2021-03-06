import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import NewPostForm from './NewPostForm'
import axios from 'axios'
import { Card, CardContent, CardMedia, Collapse, Container, FormControlLabel, Paper, Switch, TextField, Button } from '@material-ui/core'

export default class Mentor extends Component {
    state = {
        mentor: {
            posts: []
        },
        redirectToHome: false,
        isEditFormShowing: false,
        isCreateBlogPostShowing: false
    }

    componentDidMount(){
        this.fetchMentor()
    }

    // to get a specific mentor
    fetchMentor = () => {
        axios.get(`/api/v1/mentors/${this.props.match.params.id}/`)
            .then(mentor => {
                this.setState({mentor: mentor.data})
            })
    }

    // to delete a specific mentor
    deleteMentor = (evt) => {
        evt.preventDefault()

        axios.delete(`/api/v1/mentors/${this.props.match.params.id}/`)
            .then(() => {
                // goes back to career page
                this.props.history.goBack()
            })
    }

    // handle create blog post toggle
    toggleBlogPost = (evt) => {
        this.setState({isCreateBlogPostShowing: !this.state.isCreateBlogPostShowing})
    }

    // handle edit form toggle
    toggleEditForm = () => {
        this.setState({isEditFormShowing: !this.state.isEditFormShowing})
    }

    // edit mentor form
    handleChange = (evt) => {
        let editedMentor = {...this.state.mentor}
        editedMentor[evt.target.name] = evt.target.value

        this.setState({mentor: editedMentor})
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.put(`/api/v1/mentors/${this.props.match.params.id}/`, this.state.mentor)
            .then(() => {
                // to close edit form after mentor has been updated
                this.toggleEditForm()
            })
    }

    
    render() {
        let postList = this.state.mentor.posts.map(post => {
            return(
                <div key={post.id}>
                    <Link style={{textDecoration: 'none'}} to={`/blogposts/${post.id}`} ><h3>{post.title}</h3></Link>
                    <p>{post.description}</p>
                </div>
            )
        })

        return (
            <Container>
                <Paper className="content-container">
                {/* Mentor's profile and information */}
                <div style={{display: 'flex', justifyContent: 'center'}} >
                    <Card style={{maxWidth: 645, minHeight: 275, display: 'flex', flexDirection: 'wrap'}} >
                        <div style={{maxWidth: 200, display: 'flex', alignItems: 'center'}}>
                            <CardMedia
                                height="140"
                                component="img"
                                image={this.state.mentor.image_url}
                                alt={`${this.state.mentor.name}`}
                                title={`${this.state.mentor.name}`}
                                style={{objectFit: 'contain'}} 
                                />
                         </div>
                        <div style={{minWidth: 300}}>
                            <CardContent  >
                                <h2>{this.state.mentor.name}</h2>
                                <p><strong>Profession:</strong> {this.state.mentor.profession}</p>
                                <p><strong>Employer:</strong> {this.state.mentor.company}</p>
                                <p><strong>Can Give Advice On:</strong> {this.state.mentor.advice_topics}</p>
                                <a style={{textDecoration: 'none'}} href={`mailto:${this.state.mentor.email}`}>Contact</a>
                            </CardContent>
                         </div>
                    </Card>
                </div>

                {
                    this.state.isEditFormShowing ?

                    
                    <form onSubmit={this.handleSubmit}>
                            <div>
                                <TextField
                                    id="mentor-name"
                                    name="name"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    value={this.state.mentor.name} />

                                <TextField
                                    id="mentor-profession"
                                    name="profession"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    value={this.state.mentor.profession}
                                    />
                            </div>

                            <div>
                                <TextField
                                    id="mentor-advice"
                                    name="advice_topics"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    value={this.state.mentor.advice_topics} />

                                <TextField
                                    id="mentor-image"
                                    name="image_url"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    value={this.state.mentor.image_url} />
                            </div>

                            <div>
                                <TextField
                                    id="mentor-company"
                                    name="company"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    value={this.state.mentor.company} />

                                <TextField
                                    id="mentor-email"
                                    name="email"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    value={this.state.mentor.email} />
                            </div>

                            <div>
                                <Button variant="outlined" color="secondary" type="submit">Edit Mentor</Button>
                            </div> 

                </form> : 
                // TO DO: CHANGE THIS INTO A TOGGLE SHOW
                <Button variant="outlined" color="secondary" onClick={this.toggleEditForm}>Edit</Button>
               
            }

                <Button variant="outlined" color="secondary" type="submit" onClick={this.deleteMentor} >Delete</Button>
                <hr className="break" />
                <h2>Blog Posts</h2>

                <FormControlLabel
                        control={<Switch checked={this.state.isCreateBlogPostShowing} onChange={this.toggleBlogPost} />}
                        label="Create a New Post" />
                   
                    <Collapse in={this.state.isCreateBlogPostShowing}>
                        <NewPostForm match={this.props.match} fetchMentor={this.fetchMentor} />
                    </Collapse> 
                

                <Container className="content-container">
                    {postList}
                </Container>
                </Paper>
            </Container>
        )
    }
}
