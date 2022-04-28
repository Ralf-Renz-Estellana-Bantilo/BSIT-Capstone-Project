import React, { Component } from "react";
import CountDownSignUp from "../JOBSEEKER/Home-Folder/CountDownSignUp";

export class AuthIndication extends Component {
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

export default AuthIndication;
