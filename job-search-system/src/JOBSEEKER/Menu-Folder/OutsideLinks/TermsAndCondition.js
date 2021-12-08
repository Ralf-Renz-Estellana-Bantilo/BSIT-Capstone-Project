import React, { Component } from "react";
import { Link } from "react-router-dom";

export class TermsAndCondition extends Component {
	render() {
		return (
			<>
				<Link to='/menu'>
					<button>Back</button>
				</Link>

				<div> Terms And Condition</div>
			</>
		);
	}
}

export default TermsAndCondition;
