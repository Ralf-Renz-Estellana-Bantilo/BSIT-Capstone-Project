import React, { Component } from "react";
import { Link } from "react-router-dom";
import LeftArrow from "../../../Images/LeftArrow.png";
import User from "../../../Images/User.png";
import Piolo from "../../../Images/Piolo.jpg";
import Logo from "../../../Images/Logo.png";
import Resources from "../../../Resources";
import Footer from "../../Home-Folder/Footer";

export class About extends Component {
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
					<div className='outside-link-title'>
						<h3>About Us</h3>
					</div>
					<div className='outside-link-content'>
						<p>
							<strong>
								Job Search System in Catarman, Northern Samar{" "}
							</strong>{" "}
							or simply <em>"Job Search Catarman"</em> is a Job Portal
							Web Application that is designed to help applicants to find
							a job that matches their skills, needs, and location. Also,
							employers that have business/business stablishments within
							the municipality of Catarman can post their job vacancies
							and could preview and select the right applicants that
							suits their needs.
							<br />
							<br />
							We are committed to continuously improving the value we
							provide to jobseekers and employers. To deliver on this, we
							continue to evolve our product and service offerings to
							better facilitate the matching of jobseekers to employers.
							<br />
							<br />
							<strong>Job Search Catarman</strong> was developed by a
							couple of 4th year Information Technology students from the
							University of Eastern Philippines as part of their Capstone
							Project. This is meant to be the easiest way to find a job
							and to find some applicants for a certain job.
							{/* <br />
							<br /> */}
							{/* <strong>Piolo Jose Nava</strong>,{" "}
							{Resources.getCurrentAge(7, 10, 2000)}, a programmer from
							Catarman, Northern Samar.
							<br />
							<br />
							<strong>Ralf Renz Bantilo</strong>,{" "}
							{Resources.getCurrentAge(7, 10, 2000)}, a programmer from
							San Roque, Northern Samar. */}
						</p>
					</div>

					<div className='outside-link-cards'>
						<div className='outside-link-card'>
							<div className='outside-link-card-upper-portion'>
								<img src={User} alt='Programmer' />
							</div>
							<div className='outside-link-card-lower-portion'>
								<h3 className='about-owner-name'>Ralf Renz Bantilo</h3>
								<h5 className='about-owner-position'>
									Software Developer
								</h5>
								<p className='about-owner-info'>
									Bachelor of Science in Information Technology student
									from the University of Eastern Philippines who lives
									in San Roque, Northern Samar.
								</p>
								<p className='about-owner-email'>
									ralfrenzbantilo853@gmail.com
								</p>
								<button className='about-owner-button'>
									See More Details
								</button>
							</div>
						</div>
						<div className='outside-link-card'>
							<div className='outside-link-card-upper-portion'>
								<img src={Piolo} alt='Programmer' />
							</div>
							<div className='outside-link-card-lower-portion'>
								<h3 className='about-owner-name'>Piolo Jose Nava</h3>
								<h5 className='about-owner-position'>
									Software Developer
								</h5>
								<p className='about-owner-info'>
									Bachelor of Science in Information Technology student
									from the University of Eastern Philippines who lives
									in Catarman, Northern Samar.
								</p>
								<p className='about-owner-email'>
									piolonava01@gmail.com
								</p>
								<button className='about-owner-button'>
									See More Details
								</button>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default About;
