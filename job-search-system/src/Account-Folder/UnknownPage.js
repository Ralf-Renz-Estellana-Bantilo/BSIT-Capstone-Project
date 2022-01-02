import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import QuestionMarkIcon from "../Images/QuestionMarkIcon.png";
import "./UnknownPage.css";

export class UnknownPage extends Component {
	gotoHome = () => {
		this.props.history.push("/");
	};

	render() {
		return (
			<div className='unknown-page-container'>
				<div className='unknown-page'>
					<img src={QuestionMarkIcon} alt='Unknown Page' />
					<h3>Sorry, Page not found!</h3>
					<div className='try'>
						<li>Try to login again.</li>
						<li>We couldn't recognize this link.</li>
						<li>
							You might not have the previledge to access this link.
						</li>
					</div>
					<button onClick={this.gotoHome}>Home</button>
				</div>
			</div>
		);
	}
}

export default withRouter(UnknownPage);
