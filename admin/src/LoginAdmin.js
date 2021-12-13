import React, { useState } from "react";
import Logo from "./Images/Logo.png";
import Eye from "./Images/Eye.png";
import PasswordIcon from "./Images/PasswordIcon.png";
import UsernameIcon from "./Images/UsernameIcon.png";
import "./LoginAdmin.css";
import { useNavigate } from "react-router-dom";
import AdminWelcomeWindow from "./AdminWelcomeWindow";

const LoginAdmin = () => {
	const [isPasswordVisible, setPasswordVisible] = useState(false);
	const [isValid, setValid] = useState(true);
	const [isWelcomeOpen, setWelcomeOpen] = useState(false);
	const [userName, setUserName] = useState(null);
	const [password, setPassword] = useState(null);

	const USERNAME = "ralf";
	const PASSWORD = "bantilo";

	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();

		try {
			if (USERNAME === userName && PASSWORD === password) {
				setWelcomeOpen(true);
			} else {
				setValid(false);
			}
		} catch (error) {
			alert(error);
		}
	};

	const closeWelcome = () => {
		setWelcomeOpen(false);
	};

	return (
		<>
			{isWelcomeOpen && (
				<AdminWelcomeWindow method={closeWelcome} delay={5} />
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
							<p>
								© Job Search System in Catarman, Northern Samar - 2021
							</p>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default LoginAdmin;
