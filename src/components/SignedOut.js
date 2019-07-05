import React , {Component} from 'react'
import {NavLink} from 'react-router-dom'

export default class SignedOut extends Component{
	render() {
		return (
			<ul className="right">
				<li><NavLink to='/cart'>Cart</NavLink></li>
				<li><NavLink to='/signup'>Sign Up</NavLink></li>
				<li><NavLink to='/login'>Log In</NavLink></li>
			</ul>
		)
	}
}