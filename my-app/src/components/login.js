import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';

export default class login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			'email': undefined,
			'password': undefined,
			'handle': undefined
		};

	}

	//update state for specific field
	handleChange = (event) => {
		let field = event.target.name; //which input
		let value = event.target.value; //what value

		let changes = {}; //object to hold changes
		changes[field] = value; //change this field
		this.setState(changes); //update state
	}

	//handle signUp button
	handleSignUp = (event) => {
		event.preventDefault(); //don't submit

		this.props.signUpCallback(this.state.email, this.state.password, this.state.handle);
	}

	//handle signIn button
	handleSignIn = (event) => {
		event.preventDefault(); //don't submit
		this.props.signInCallback(this.state.email, this.state.password);
	}

	render() {
		return (
			<div className="loginContainer">
				<Jumbotron className="jumbo">
					<h1>The Top Stuff</h1>
					<hr />
					<p>Already have an account? Sign-in below!</p>
					<p>Don't have an account? No problem! Sign-up below!</p>
				</Jumbotron>

				<Grid className="container">
					<Row>
						<Col sm="5">
							<form>
								<div className="loginForm">
									<h3>Register</h3>
									<p>Create an account below.</p>
									<hr />

									<label for="email"><b>Email</b></label>
									<br />
									<input type="text" placeholder="Enter Email" name="email" required onChange={this.handleChange} />
									<br />
									<label for="username"><b>Username</b></label>
									<br />
									<input type="text" placeholder="Enter Username" name="handle" required onChange={this.handleChange} />
									<br />
									<label for="pass"><b>Password</b></label>
									<br />
									<input type="password" placeholder="Enter Password" name="password" required onChange={this.handleChange} />
									<p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
									<button type="submit" className="registerbtn" onClick={this.handleSignUp}>Register</button>
								</div>
							</form>
						</Col>

						<Col sm="2">
							<div className="lilUziVert"></div>
						</Col>

						<Col sm="5">
							<form>
								<div className="loginForm">
									<h3>Sign-in</h3>
									<p>Already a member? Sign-in below.</p>
									<hr />

									<label for="email"><b>Email</b></label>
									<br />
									<input type="text" placeholder="Enter Email" name="email" required onChange={this.handleChange} />
									<br />
									<label for="pass"><b>Password</b></label>
									<br />
									<input type="password" placeholder="Enter Password" name="password" required onChange={this.handleChange} />

									<hr />
									<button type="submit" className="registerbtn" onClick={this.handleSignIn}>Login</button>
								</div>
							</form>
						</Col>

						<br />
					</Row>
				</Grid>

			</div>
		);
	}
}
