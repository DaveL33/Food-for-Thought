import React, { Component } from 'react';
import './musicStyle.css'
import './musicRespStyle.css'

export default class TopMusic extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="rightContainer">
                <MusicPage></MusicPage>
            </div>
        );
    }
}
const queryURL = "https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=3b7073a687cc95da319e6dff74046fac&format=json";

class MusicPage extends Component {
    constructor(props) {
        super(props)
        this.state = { songs: [] }

        this.fetchSongs = this.fetchSongs.bind(this);
    }

    fetchSongs() {
        fetch(queryURL, {
            method: "GET"
        }).then(res => {
            if (!res.ok) {
                throw Error("error")
            }
            return res.json()
        }).then(data => {

            this.setState({ songs: data.tracks.track })



        }).catch(function (error) {
            console.log(error)
        })
    }


    render() {
        var songArr = this.state.songs
        var songTiles = songArr.map((song) =>
            <a class="songEl respoSongEl" href={song.url}>
                <img class="imageEl" src={song['image'][3]['#text']} alt=""></img>

                <h2 class="songName">{song.name}</h2>
            </a>
        )


        return (
            <div className="music-content">

                <div class="title">
                    <h1 aria-label="Title: The Music Archive">The Music Archive</h1>
                    <h2 aria-label="Subtitle: The Music Archive">"Explore Thy Muse.." </h2>
                </div>

                <div aria-hidden="true" class="black-line"></div>

                <div aria-hidden="true" class="flex-container">
                    <div aria-hidden="true" class="topSongsCont flex-child">
                        <button aria-label="Button for: Get Top Songs" class="getTopSongs" id="getSongs" onClick={this.fetchSongs}>
                            <h3>Get Top Songs Atm (Click Me):</h3>
                        </button>
                        <p aria-label="Click button above"><strong>Click the button above: to see the Top Songs Right Now! :)</strong></p>

                        {songTiles}
                    </div>
                    <div aria-hidden="true" class="black-line"></div>

                </div>
            </div>
        )
    }
}