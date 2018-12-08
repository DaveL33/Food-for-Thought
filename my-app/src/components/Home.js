import React, { Component } from 'react';
import firebase from 'firebase/app';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        this.notesRef = firebase.database().ref('Notes');

        this.notesRef.on('value', (snapshot) => {
            this.setState({ notes: snapshot.val() });
        })



    }

    render() {

        if (!this.state.notes) return null;

        let keys = Object.keys(this.state.notes);

        let notes = keys.map((key) => {
            let noteObj = this.state.notes[key];
            noteObj.key = key;


            return noteObj;
        });

        //Renders out the saved notes
        let noteHtml = notes.map((note) => (
            <div className="rend-note">
                <h5>
                    {note.title}
                </h5>
                <p>{note.body}</p>
                <p><h6>- Anonymous</h6></p>
            </div>
        ));

        return (
            <div className="gray-bg">

                <div className="home-intro">
                    <span id="star" className="oi oi-star"></span>
                    <h1>What is this Website About?</h1>

                    <div >
                        <p>Discover the "Top Stuff" to your heart's content, anything from popping music to scandalous news to delicious restaurants. </p>
                        <p>When you discover something, you can add it to the the notebook on the left. You will see notes the community's notes as well </p>
                    </div>
                </div>

                <div className="saved-notes-container">
                    <h4>Recent Saved Notes:</h4>
                    <h6>(Notes appear here..) </h6>

                    <div className="flex-cont">
                        {noteHtml}
                    </div>

                </div>
            </div>
        );
    }
}