import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import NewPostForm from './NewPostForm'
import axios from 'axios'

export default class Mentor extends Component {
    state = {
        mentor: {
            posts: []
        },
        redirectToHome: false,
        isEditFormShowing: false
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
                // redirects to home page
                this.setState({redirectToHome: true})
            })
    }

    // handle edit form toggle
    toggleEditForm = (evt) => {
        this.setState({isEditFormShowing: !this.state.isEditFormShowing})
    }

    // edit mentor form
    handleChange = (evt) => {
        let editedMentor = {...this.state.editedMentor}
        editedMentor[evt.target.name] = evt.target.value

        this.setState({mentor: editedMentor})
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.put(`/api/v1/mentors/${this.props.match.params.id}/`, this.state.mentor)
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

                {
                    this.state.isEditFormDisplayed ?
                    <div>
                        <form onSubmit={this.handleSubmit}>
                    <label htmlFor="mentor-name">Name: </label>
                    <input
                        id="mentor-name"
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                        value={this.state.newMentor.name} />

                    <label htmlFor="mentor-profession">Profession: </label>
                    <input
                        id="mentor-profession"
                        type="text"
                        name="profession"
                        onChange={this.handleChange}
                        value={this.state.newMentor.profession} />

                    <label htmlFor="mentor-advice">Advice Topics: </label>
                    <input
                        id="mentor-advice"
                        type="text"
                        name="advice_topics"
                        onChange={this.handleChange}
                        value={this.state.newMentor.advice_topics} />

                    <label htmlFor="mentor-image">Profile Picture: </label>
                    <input
                        id="mentor-image"
                        type="text"
                        name="image_url"
                        onChange={this.handleChange}
                        value={this.state.newMentor.image_url} />

                    <label htmlFor="mentor-company">Company: </label>
                    <input
                        id="mentor-company"
                        type="text"
                        name="company"
                        onChange={this.handleChange}
                        value={this.state.newMentor.company} />

                    <label htmlFor="mentor-email">Email: </label>
                    <input
                        id="mentor-email"
                        type="text"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.newMentor.email} />

                    <input type="submit" value="Add Mentor" />
                </form>
                </div> : <input type="submit" value="Edit" onClick={this.toggleEditForm} />
                }

                <input type="submit" value="Delete Mentor" onClick={this.deleteMentor} />
                <h1>Blog Posts</h1>
                <NewPostForm match={this.props.match} />
                    {postList}
            </div>
        )
    }
}
