import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Notepad from './Notepad'


export default class SideBar extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        let linkStyle = {
            textDecoration: 'none',
            color: '#efefef'
        };
        //Creates link to each section from the side navigation
        return (
            <div className="sideBar">
                <ul className="navList">
                    <li><Profile displayName={this.props.displayName} ></Profile></li>
                    <NavLink to="/"><li id="Home">Home</li></NavLink>
                    <NavLink to="/About"><li>About</li></NavLink>
                    <NavLink to="/TopMusic"><li>Top Music</li></NavLink>
                    <NavLink to="/TopNews"><li>Top News</li></NavLink>
                    <NavLink to="/TopFood"><li>Top Food</li></NavLink>

                    {this.props.children}
                    <li><Notepad user={this.props.user}></Notepad></li>
                </ul>
            </div>
        );
    }
}

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="profile">
                <div className="avatar">
                    <img className="dave" src={require("../img/dawg.png")} width="125" height="100" />
                </div>
                <div className="displayName">
                    <h6>Hello {this.props.displayName} </h6>
                </div>
            </div>
        );
    }
}