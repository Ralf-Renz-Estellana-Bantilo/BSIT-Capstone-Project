import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import CountDownSignUp from "../JOBSEEKER/Home-Folder/CountDownSignUp";

export class AuthIndication extends Component {
	componentWillUnmount() {
		this.props.history.push("/login");
	}

	render() {
		return (
			<div className='success-container'>
				<div className='success-wrapper'>
					<p>
						Registered Successfully!
						{
							<CountDownSignUp
								method={this.props.method}
								delay={this.props.delay}
							/>
						}
					</p>
				</div>
			</div>
		);
	}
}

export default withRouter(AuthIndication);
