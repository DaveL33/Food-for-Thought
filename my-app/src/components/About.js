import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';

export default class About extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div className="rightContainer">
                <Jumbotron className="jumbo">
                    <h1>About</h1>
                    <hr/>
                    <p>INFO 340 (AD) Final Project</p>
                    <p>Joseph Yoon, Robert Kim, Kishore Vasan, David Lee</p>
                </Jumbotron>

                <Grid className="container">
                    <Row>
                        <h2>What is The Top Stuff?</h2>
                        <p>The Top Stuff is a group project for INFO 340, Client Side Development. The purpose of the our product is to allow users to see some of the "top stuff" that is going on around the world and locally. We narrowed down the stuff to music, news, and food, to keep from getting too large and out of scope initially. But, expansion and scalability options are infinite, as the world is full of top stuff.</p>
                        <p>To build the Top Stuff, we used a few frameworks, including React, Reactstrap, and Firebase, to name a few. </p>

                    </Row>
                    <Row>
                        <h2>The Team</h2>
                        <br/>
                        <Col sm="3">
                            <img className="dave" src={require("../img/joeppa.jpg")} width="150" height="150" />
                            <p>Joe</p>
                        </Col>

                        <Col sm="3">
                            <img className="dave" src={require("../img/rob.jpg")} width="150" height="150" />
                            <p>Rob</p>
                        </Col>

                        <Col sm="3">
                            <img className="dave" src={require("../img/kishore.jpg")} width="150" height="150" />
                            <p>Kishore</p>
                        </Col>

                        <Col sm="3">
                            <img className="dave" src={require("../img/dav.jpg")} width="150" height="150" />
                            <p>Dave</p>
                        </Col>

                    </Row>
                </Grid>

            </div>
        );
    }
}