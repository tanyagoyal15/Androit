import React , {Component} from 'react'
import {NavLink} from 'react-router-dom'
import { logout } from './Navbar'
import fire from '../config/FirebaseConfig'

export default class SignedIn extends Component{
	constructor(props) {
		super(props)
		this.state = {

		}
		this.logout = this.logout.bind(this);
	}

	logout() {
		fire.auth().signOut();
	}
	render() {
		return (
			<ul className="right">
				<li><NavLink to='/cart'>Cart</NavLink></li>
				<li><a onClick={this.logout}>Logout</a></li>
				<li><NavLink to='/' className="lighten-1">Profile</NavLink></li>
			</ul>
		)
	}
}