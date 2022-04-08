import React, { useState } from "react";
import Logo from "./Images/Logo.png";
import Eye from "./Images/Eye.png";
import PasswordIcon from "./Images/PasswordIcon.png";
import UsernameIcon from "./Images/UsernameIcon.png";
import "./LoginAdmin.css";
import AdminWelcomeWindow from "./AdminWelcomeWindow";
import axios from "axios";
import AppConfiguration from "./AppConfiguration";

const LoginAdmin = ({ setAdmin }) => {
	const [isPasswordVisible, setPasswordVisible] = useState(false);
	const [isValid, setValid] = useState(true);
	const [isWelcomeOpen, setWelcomeOpen] = useState(false);
	const [userName, setUserName] = useState(null);
	const [password, setPassword] = useState(null);
	const [userID, setUserID] = useState(null);
	const [name, setName] = useState(null);

	const handleLogin = async (e) => {
		e.preventDefault();

		// try {
		// 	if (userName !== null && password !== null) {
		// 		await axios
		// 			.post(`${AppConfiguration.url()}/api/login`, {
		// 				role: "Admin",
		// 				username: userName,
		// 				password: password,
		// 			})
		// 			.then(async (response) => {
		// 				if (response.data.length === 1) {
		// 					setAdmin(response.data[0]);
		// 					setUserID(response.data[0].UserID);
		// 					setWelcomeOpen(true);
		// 					setName(
		// 						`${response.data[0].First_Name} ${response.data[0].Last_Name}`
		// 					);
		// 				} else {
		// 					setValid(false);
		// 				}
		// 			});
		// 	} else {
		// 		setValid(false);
		// 	}
		// } catch (error) {
		// 	alert(error);
		// }
		setAdmin({
			UserID: "rreb2000",
			First_Name: "Ralf Renz",
			Middle_Name: "Estellana",
			Last_Name: "Bantilo",
			Sex: "Male",
			Role: "Employer",
			Username: "generatedUsername",
			Password: "generatedPassword",
			User_Image:
				"https://res.cloudinary.com/doprewqnx/image/upload/v1648959524/jntowv75wyhkqvy4o1xu.png",
		});
		setUserID("rreb2000");
		setWelcomeOpen(true);
		setName(`Ralf Renz Bantilo`);
	};

	const closeWelcome = () => {
		setWelcomeOpen(false);
	};

	return (
		<>
			{isWelcomeOpen && (
				<AdminWelcomeWindow
					method={closeWelcome}
					delay={5}
					userID={userID}
					name={name}
				/>
			)}
			<div className='login-container'>
				<form
					className='login-form-container'
					onSubmit={(e) => handleLogin(e)}>
					<div className='circle-blue' />
					<div className='circle-red' />
					<div className='login-logo-container'>
						<h3>ADMINISTRATOR</h3>
						<div className='login-logo'>
							<img src={Logo} alt='Job Search System Logo' />
						</div>
						{!isValid && (
							<div className='error-container'>
								<div className='error-wrapper'>
									<p>User not found!</p>
								</div>
							</div>
						)}
					</div>
					<div className='login-input-container'>
						<div className='login-input'>
							<div className='login-form'>
								<div className='input-field'>
									<div className='login-form-icon'>
										<img src={UsernameIcon} alt='Username Icon' />
									</div>
									<input
										autoFocus
										autoComplete={"off"}
										type='text'
										placeholder='Username'
										onChange={(e) => {
											setUserName(e.target.value);
											setValid(true);
										}}
									/>
								</div>
								<div className='input-field'>
									<div className='login-form-icon'>
										<img
											src={PasswordIcon}
											alt='Password Icon'
											className='password-icon'
										/>
									</div>
									<input
										type={isPasswordVisible ? "text" : "password"}
										placeholder='Password'
										onChange={(e) => {
											setPassword(e.target.value);
											setValid(true);
										}}
									/>
									<img
										onClick={() =>
											setPasswordVisible(!isPasswordVisible)
										}
										style={
											isPasswordVisible
												? { filter: "brightness(.4)" }
												: { filter: "brightness(.8)" }
										}
										src={Eye}
										alt='Password Visible'
										className='eye'
										title={
											isPasswordVisible
												? "Hide Password"
												: "Show Password"
										}
									/>
								</div>
							</div>
							<button onClick={(e) => handleLogin(e)}>Login</button>
						</div>
						<div className='login-footer'>
							<p>Copyright © 2021 | Job Search System in Catarman</p>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default LoginAdmin;
