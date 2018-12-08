import React, { Component } from 'react';
import logo from './logo.svg';
import SideBar from './components/sidebar.js';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import TopMusic from './components/TopMusic';
import TopNews from './components/TopNews';
import TopFood from './components/TopFood';
import SavedStuff from './components/SavedStuff';
import Login from './components/login';
import firebase from 'firebase/app';
import 'firebase/auth';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.unReg = null;

  }

  //A callback function for logging out the current user
  handleSignOut = () => {
    this.setState({ errorMessage: null }); //clear any old errors
    firebase.auth().signOut()
      .catch(err => this.setState({ errorMessage: err.message }));
    console.log(this.state.errorMessage);
    /* TODO: sign out user here */
  }


  handleSignUp = (email, password, handle, avatar) => {
    this.setState({ errorMessage: null }); //clear any old errors

    this.state.handle = handle;


    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
      })
      .catch((err) => {
        this.setState({ errorMessage: err.message });
      });
  }

  //A callback function for logging in existing users
  handleSignIn = (email, password) => {
    this.setState({ errorMessage: null }); //clear any old errors
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(err => this.setState({ errorMessage: err.message }));
    /* TODO: sign in user here */
  }

  componentDidMount() {
    this.unReg = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
      } else {
        this.setState({ user: null })
      }
      this.setState({ loading: false });
    });
  }
  componentWillUnmount() {
    this.unReg();
  }



  render() {
    let content = null; //content to render
    if (this.state.loading) {
      content = (<div className="text-center">
        <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
      </div>)
    } else if (!this.state.user) { //if logged out, show signup form
      content = (
        <div className="container">
          {<Login signUpCallback={this.handleSignUp}
            signInCallback={this.handleSignIn} />}
        </div>
      );
    }
    else { //if logged in, show welcome message
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: this.state.handle,
      }).then(function () {
        // Update successful.
      }).catch(function (error) {
        // An error happened.
      });
      content = (
        <div className="App" >

          < BrowserRouter >
            <div className="pageContainer">


              <SideBar user={this.state.user} email={this.state.user.email} displayName={this.state.user.displayName} >
                {<li className="btn btn-warning" onClick={this.handleSignOut} >LOG OUT {this.state.user.displayName}</li>}
              </SideBar>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/About" component={About} />
                <Route path="/TopMusic" component={TopMusic} />
                <Route path="/TopNews" component={TopNews} />
                <Route path="/TopFood" component={TopFood} />
                <Route path="/SavedStuff" component={SavedStuff} />
              </Switch>
            </div>
          </BrowserRouter >
        </div>
      );
    }

    console.log(this.state.errorMessage);

    return (
      <div className="App" >
        {this.state.errorMessage &&
          <p className="alert alert-danger">{this.state.errorMessage}</p>
        }
        {content}


        {this.state.errorMessage}
      </div >
    );
  }
}

export default App;
