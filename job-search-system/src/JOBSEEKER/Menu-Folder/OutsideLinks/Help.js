import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Help extends Component {
	render() {
		return (
			<>
				<Link to='/menu'>
					<button>Back</button>
				</Link>

				<div> Welcome to Help Center</div>
			</>
		);
	}
}

export default Help;
