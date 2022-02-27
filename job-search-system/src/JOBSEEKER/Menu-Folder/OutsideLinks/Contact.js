import React, { useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import LeftArrow from "../../../Images/LeftArrow.png";
import Logo from "../../../Images/Logo.png";
import emailjs from "emailjs-com";

const Contact = ({ darkTheme, history }) => {
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		try {
			emailjs
				.sendForm(
					"gmail",
					"template_0kdw8xu",
					form.current,
					"user_d4MCLJciZKPbKaM472IEi"
				)
				.then(
					(result) => {
						// console.log(result.text);
					},
					(error) => {
						alert(error.text);
					}
				);

			const userTypeSession = sessionStorage.getItem("UserType");
			let userType = "";
			if (userTypeSession === "Job Seeker") {
				userType = "jobseeker";
			} else {
				userType = "employer";
			}

			alert("Message sent!");

			history.push(
				userType === "jobseeker"
					? `/${userType}/menu`
					: `/${userType}/settings`
			);
		} catch (error) {
			alert(error);
		}
	};

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
					<form ref={form} className='contact-form' onSubmit={sendEmail}>
						<div className='contact-form-header'>
							<h3>Contact Us</h3>
						</div>
						<div className='contact'>
							<input
								autoFocus
								type='text'
								placeholder='Enter your name'
								name='from_name'
							/>
							<input
								type='email'
								placeholder='Enter your email address'
								name='from_email'
							/>
							<textarea
								cols='30'
								rows='5'
								placeholder='Enter your Message'
								name='message'></textarea>
							<button onClick={sendEmail}>Send Message</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Contact);
