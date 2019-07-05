import React, { Component } from 'react';
import fire from '../../config/FirebaseConfig'

export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
		// console.log(this.state);
		fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
		.then((u) => {
			// console.log('user logged in');
    		this.props.history.push("/");
		})
		.catch((error) => {
			// console.log(error);
			{alert(error.code)}
		});
	}

	render() {
		return (
			<div className="container">
				<form action="/" onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">Log In</h5>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" value={this.state.email} id="email" onChange={this.handleChange} required/>
					</div>
					<div className="input-field">
						<label htmlFor="password">Password(min 6 length)</label>
						<input type="password" value={this.state.password} id="password" onChange={this.handleChange} required/>
					</div>
					<div className="input-field">
						<button className="btn pink lighten-1 z-depth-0">Login</button>
					</div>
					<p>New User? <a href="/signup">Go to SignUp</a></p>
				</form> 
			</div>
		);
	}
}
