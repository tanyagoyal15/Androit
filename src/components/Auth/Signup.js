import React, { Component } from 'react';
import fire from '../../config/FirebaseConfig'

export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName : '',
			lastName : '',
			email : '',
			password : ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id] : e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
		.then((u) => {
			// console.log('user signed in');
    		this.props.history.push("/");
		})
		.catch((error) => {
			// console.log(error);
			{alert(error.code)}
		})
	}

	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Sign Up</h5>
					<div className="input-field">
						<label htmlFor="firstName">FirstName</label>
						<input type="text" id="firstName" onChange={this.handleChange} required/>
					</div>
					<div className="input-field">
						<label htmlFor="lastName">LastName</label>
						<input type="text" id="lastName" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" value={this.state.email} id="email" onChange={this.handleChange} required/>
					</div>
					<div className="input-field">
						<label htmlFor="password">Password(min 6 length)</label>
						<input type="password" value={this.state.password} id="password" onChange={this.handleChange} required/>
					</div>
					<div className="input-field">
						<button className="btn pink lighten-1 z-depth-0">Signup</button>
					</div>
					<p>Already A User? <a href="/login">Go to Login</a></p>
				</form>
			</div>
		);
	}
}
