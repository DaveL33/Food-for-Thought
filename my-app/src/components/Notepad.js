import React, { Component } from 'react'
import firebase from 'firebase/app';

export default class Notepad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }

    // get current user

    // when the text in the notebook form changes
    updateNoteTitle = (event) => {
        this.setState({ title: event.target.value });
    }

    // when the text in the notebook form changes
    updateNoteBody = (event) => {
        this.setState({ body: event.target.value });
    }

    //post a new chirp to the database
    postNote = (event) => {

        let newNote = {
            title: this.state.title,
            body: this.state.body
        };

        let notesRef = firebase.database().ref()
        notesRef.child("Notes").push(newNote);
    }

    render() {
        return (
            <div className="notepad">
                <h2>Your Notebook</h2>
                <div className="title">
                    <label>Title:</label>
                    <input onChange={this.updateNoteTitle} />
                </div>
                <div className="note">
                    <label>Note:</label>
                    <textarea onChange={this.updateNoteBody}></textarea>
                </div>
                <button onClick={this.postNote}>Save this Note! :)</button>
            </div>
        );
    }
}