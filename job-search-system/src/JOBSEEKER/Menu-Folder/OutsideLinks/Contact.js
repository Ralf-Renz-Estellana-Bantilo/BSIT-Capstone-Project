import React, { Component } from "react";
import { Link } from "react-router-dom";
import LeftArrow from "../../../Images/LeftArrow.png";
import Logo from "../../../Images/Logo.png";

export class Contact extends Component {
	render() {
		const { darkTheme } = this.props;

		const userTypeSession = sessionStorage.getItem("UserType");
		let userType = "";
		if (userTypeSession === "Job Seeker") {
			userType = "jobseeker";
		} else {
			userType = "employer";
		}

		return (
			<div className='outside-link-container'>
				<div className='login-nav'>
					<Link
						to={
							userType === "jobseeker"
								? `/${userType}/menu`
								: `/${userType}/settings`
						}>
						<img
							src={LeftArrow}
							alt='Go Back'
							style={
								darkTheme
									? { filter: "brightness(1)" }
									: { filter: "brightness(0.1)" }
							}
						/>
					</Link>
					<div className='login-image-container'>
						<img
							src={Logo}
							alt='Job Search Catarman Logo'
							style={
								darkTheme
									? { filter: "brightness(1)" }
									: { filter: "brightness(0.1)" }
							}
						/>
					</div>
				</div>

				<div className='outside-link'>
					<div className='contact-container'>
						<form className='contact-form'>
							<div className='contact-form-header'>
								<h3>Contact Us</h3>
							</div>
							<div className='contact'>
								<input
									autoFocus
									type='text'
									placeholder='Enter your name'
								/>
								<input
									type='email'
									placeholder='Enter your email address'
								/>
								<textarea
									cols='30'
									rows='5'
									placeholder='Enter your Message'></textarea>
								<button>Send Message</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Contact;
