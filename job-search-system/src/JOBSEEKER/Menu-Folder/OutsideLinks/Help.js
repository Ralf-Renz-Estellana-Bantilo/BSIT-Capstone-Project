import React, { Component } from "react";
import { Link } from "react-router-dom";
import LeftArrow from "../../../Images/LeftArrow.png";
import Logo from "../../../Images/Logo.png";

export class Help extends Component {
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
					{userType === "jobseeker" ? (
						<div className='help-center-container'>
							<div className='outside-link-title'>
								<h3>Help Center</h3>
							</div>
							<div className='help-content-container'>
								<div className='help-content'>
									<div className='help-content-header'>
										<h1>Home</h1>
									</div>
									<div className='help-content-body-container'>
										<div className='help-content-body'>
											<h3>Filter Posts:</h3>
											<p>
												You can filter the job posts from your feed
												from the most recent posts to the oldest
												posts or the other way around, but there is
												also one more choice, the "Job Suggestions",
												this option is only available if you have
												your profile data set up already, otherwise
												this won't show up from the choices.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className='help-center-container'>
							Employer point of view
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Help;
