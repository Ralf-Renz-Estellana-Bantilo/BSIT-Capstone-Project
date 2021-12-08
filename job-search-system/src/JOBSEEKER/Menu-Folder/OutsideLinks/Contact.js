import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Contact extends Component {
	render() {
		return (
			<>
				<Link to='/menu'>
					<button>Back</button>
				</Link>

				<div> Contact Us by Messaging me!</div>
			</>
		);
	}
}

export default Contact;
