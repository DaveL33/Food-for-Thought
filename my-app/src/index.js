import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAymOOSwWpMJ4RwlvOsIn_XgzObgvQcJzc",
    authDomain: "top-stuff.firebaseapp.com",
    databaseURL: "https://top-stuff.firebaseio.com",
    projectId: "top-stuff",
    storageBucket: "top-stuff.appspot.com",
    messagingSenderId: "736301132049"
};
firebase.initializeApp(config);




ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
