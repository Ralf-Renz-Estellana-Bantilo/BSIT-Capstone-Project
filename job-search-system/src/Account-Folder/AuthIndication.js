import React, { Component } from "react";
import { Link } from "react-router-dom";
import CountDown from "../JOBSEEKER/Home-Folder/CountDown";

export class AuthIndication extends Component {
	toggleSignUp = () => {
		this.props.toggleSignUp(false);
	};

	render() {
		return (
			<div className='success-container'>
				<div className='success-wrapper'>
					<p>
						Successfully Registered..{" "}
						<Link to='/login' onClick={this.toggleSignUp}>
							Login
						</Link>{" "}
						now!
					</p>
					{
						<CountDown
							method={this.props.method}
							delay={this.props.delay}
						/>
					}
				</div>
			</div>
		);
	}
}

export default AuthIndication;
