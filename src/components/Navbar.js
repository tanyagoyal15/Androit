import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedIn from './SignedIn'
import SignedOut from './SignedOut'
import fire from '../config/FirebaseConfig'

export default class Navbar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user : {}
		}
	}

	componentDidMount() {
		this.authListener();
	}

	authListener() {
		fire.auth().onAuthStateChanged((user) => {
			if(user) {
				this.setState({ user });
				// console.log(this.state);
			} else {
				this.setState({ user : null });
				// console.log(this.state);
			}
		})
	}

	render() {
		return (
			<nav className="nav-wrapper grey darken-3">
				<div className="container">
					<Link to='/' className="brand-logo">Shop</Link>
					{this.state.user ? (<SignedIn email={this.props.email}/>) : (<SignedOut />)}
				</div>
			</nav>
		);
	}
}
