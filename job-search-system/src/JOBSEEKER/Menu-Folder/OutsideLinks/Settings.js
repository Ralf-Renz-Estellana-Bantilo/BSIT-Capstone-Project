import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Settings extends Component {
	render() {
		return (
			<>
				<Link to='/menu'>
					<button>Back</button>
				</Link>

				<div> Website Settings</div>
			</>
		);
	}
}

export default Settings;
