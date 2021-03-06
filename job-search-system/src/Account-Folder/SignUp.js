import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/Logo.png";
import shortid from "shortid";
import AddUser from "../Images/AddUser.png";
import Eye from "../Images/Eye.png";
import LeftArrow from "../Images/LeftArrow.png";
import "./Login.css";
import AuthIndication from "./AuthIndication";
import axios from "axios";
import AppConfiguration from "../AppConfiguration";

export class SignUp extends Component {
	state = {
		firstName: "",
		middleName: "",
		lastName: "",
		role: this.props.userType,
		sex: "",
		username: "",
		password: "",
		confirmPassword: "",
		step: 1,
		isPasswordVisible: false,
		isModalOpen: false,
		isValid: true,
		isPasswordMatch: true,
		isUsernameTaken: false,
		errorMessage: "",
	};

	viewModal = (e) => {
		e.preventDefault();
		this.setState({
			isModalOpen: true,
		});
	};

	onCloseModal = () => {
		this.setState({
			isModalOpen: false,
		});
	};

	handleChange = async (event, fieldName) => {
		await this.setState({
			[fieldName]: event.target.value,
			isValid: true,
			isPasswordMatch: true,
		});
	};

	handleSignUp = async (e) => {
		e.preventDefault();
		const user = this.state;

		try {
			const user = this.state;
			await axios
				.post(`${AppConfiguration.url()}/api/checkUsername`, {
					username: user.username,
					role: user.role,
				})
				.then((result) => {
					if (result.data.length === 0) {
						const signUpUser = {
							UserID: shortid.generate(),
							First_Name: user.firstName,
							Middle_Name: user.middleName,
							Last_Name: user.lastName,
							Sex: user.sex,
							Role: user.role,
							Username: user.username,
							Password: user.password,
						};
						if (
							user.firstName === "" ||
							user.lastName === "" ||
							// user.middleName === "" ||
							user.role === "" ||
							user.username === "" ||
							user.password === "" ||
							user.confirmPassword === "" ||
							user.sex === ""
						) {
							this.setState({
								isValid: false,
								errorMessage: "Fill in all the fields please...",
							});
						} else {
							if (user.role === "Job Seeker") {
								if (user.password !== user.confirmPassword) {
									this.setState({
										isPasswordMatch: false,
									});
								} else {
									this.setState({
										isValid: true,
									});
									// this.props.toggleSignUp(true);
									this.props.registerJobSeeker(signUpUser);
								}
							} else if (user.role === "Employer") {
								if (user.password !== user.confirmPassword) {
									this.setState({
										isPasswordMatch: false,
									});
								} else {
									this.setState({
										isValid: true,
									});
									// this.props.toggleSignUp(true);
									this.props.registerEmployer(signUpUser);
								}
							}
						}
					} else {
						this.setState({
							isUsernameTaken: true,
						});
					}
				});
		} catch (error) {
			this.setState({
				isValid: false,
				errorMessage: `${error}`,
			});
			alert(error);
		}
	};

	handleSubmitNext = async (e) => {
		e.preventDefault();
		const user = this.state;
		if (
			user.firstName === "" ||
			user.lastName === "" ||
			// user.middleName === "" ||
			user.role === ""
		) {
			this.setState({
				isValid: false,
				errorMessage: "Fill in all the fields please...",
			});
		} else {
			await this.setState({
				step: 2,
				isValid: true,
			});
		}
	};

	handleSubmitPrev = async (e) => {
		e.preventDefault();

		await this.setState({
			step: 1,
			isValid: true,
		});
	};

	toggleSignUpFalse() {
		this.props.toggleSignUp(false);
	}

	toggleSignUpTrue() {
		this.props.toggleSignUp(true);
	}

	componentDidMount = async () => {
		document.title = "Job Search Catarman";
		window.scrollTo(0, 0);

		if (`${this.state.role}` !== "" || `${this.state.role}` !== undefined) {
			await this.setState({ role: `${this.props.userType}` });
		} else {
			await this.setState({
				role: "Job Seeker",
			});
		}
	};
	render() {
		const {
			firstName,
			middleName,
			lastName,
			sex,
			username,
			password,
			confirmPassword,
		} = this.state;
		const { darkTheme, isSignUp, toggleSignUp } = this.props;

		return (
			<div className='login-container'>
				<div className='login-nav'>
					<Link to='/' onClick={() => toggleSignUp(false)}>
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

				<div className='login-content'>
					<div className='login-header-container'>
						<div className='login-header'>
							<div className='signup-label'>
								<div className='img-login-header'>
									<img
										src={AddUser}
										alt=''
										style={
											darkTheme
												? { filter: "brightness(1)" }
												: { filter: "brightness(0.5)" }
										}
									/>
								</div>
								<div className='select-login-header'>
									<h3>Register User</h3>
								</div>
							</div>
							{this.state.isValid === false && (
								<div className='error-container'>
									<div className='error-wrapper'>
										<p>{this.state.errorMessage}</p>
									</div>
								</div>
							)}
							{this.state.isPasswordMatch === false && (
								<div className='error-container'>
									<div className='error-wrapper'>
										<p>Password Confirmation Error!</p>
									</div>
								</div>
							)}
							{this.state.isUsernameTaken && (
								<div className='error-container'>
									<div className='error-wrapper'>
										<p>Error! Username is already taken!</p>
									</div>
								</div>
							)}
							{isSignUp === true && (
								<AuthIndication
									method={() => toggleSignUp(false)}
									delay={4}
								/>
							)}
						</div>
					</div>

					{this.state.step === 1 && (
						<form
							className='form-signup'
							onSubmit={(e) => this.handleSubmitNext(e)}>
							<div className='circle-blue' />
							<div className='circle-red' />
							<div className='login-form'>
								<div className='input-field'>
									<input
										// autoFocus
										type='text'
										placeholder='First Name'
										onChange={(e) => {
											this.handleChange(e, "firstName");
										}}
										value={firstName}
									/>
								</div>
							</div>
							<div className='login-form'>
								<div className='input-field'>
									<input
										type='text'
										placeholder='Middle Name'
										onChange={(e) => {
											this.handleChange(e, "middleName");
										}}
										value={middleName}
									/>
								</div>
							</div>
							<div className='login-form'>
								<div className='input-field'>
									<input
										type='text'
										placeholder='Last Name'
										onChange={(e) => {
											this.handleChange(e, "lastName");
										}}
										value={lastName}
									/>
								</div>
							</div>
							<div className='login-form'>
								<div className='input-field'>
									<select
										name='Role'
										defaultValue={this.state.role}
										onChange={(e) => {
											this.handleChange(e, "role");
										}}>
										<option
											disabled='disabled'
											hidden='hidden'
											value=''>
											Select Role
										</option>
										<option value='Job Seeker'>Job Seeker</option>
										<option value='Employer'>Employer</option>
									</select>
								</div>
							</div>

							<button onSubmit={(e) => this.handleSubmitNext(e)}>
								Next
							</button>
						</form>
					)}

					{this.state.step === 2 && (
						<form
							className='form-signup'
							onSubmit={(e) => this.handleSignUp(e)}>
							<div className='circle-blue' />
							<div className='circle-red' />

							<div className='login-form'>
								<div className='input-field'>
									<input
										// autoFocus
										type='text'
										placeholder='Username'
										onChange={(e) => {
											this.handleChange(e, "username");
											this.setState({
												isUsernameTaken: false,
											});
										}}
										value={username}
									/>
								</div>
							</div>
							<div className='login-form'>
								<div className='input-field'>
									<input
										type={
											this.state.isPasswordVisible
												? "text"
												: "password"
										}
										placeholder='Password'
										onChange={(e) => {
											this.handleChange(e, "password");
										}}
										value={password}
									/>
									<img
										style={
											this.state.isPasswordVisible
												? { opacity: "100%" }
												: { opacity: "30%" }
										}
										src={Eye}
										alt='Password Visible'
										className='eye'
										onClick={() => {
											this.setState({
												isPasswordVisible:
													!this.state.isPasswordVisible,
											});
										}}
									/>
								</div>
							</div>
							<div className='login-form'>
								<div className='input-field'>
									<input
										type='password'
										placeholder='Confirm Password'
										onChange={(e) => {
											this.handleChange(e, "confirmPassword");
										}}
										value={confirmPassword}
									/>
								</div>
							</div>
							<div className='login-form'>
								<div className='input-field'>
									<select
										name='Sex'
										onChange={(e) => {
											this.handleChange(e, "sex");
										}}
										value={sex}>
										<option
											disabled='disabled'
											hidden='hidden'
											value=''>
											Select Sex
										</option>
										<option value='Male'>Male</option>
										<option value='Female'>Female</option>
									</select>
								</div>
							</div>
							{/* <div className='dual-button'>
								<button
									className='dual-button-back'
									onClick={(e) => this.handleSubmitPrev(e)}>
									Back
								</button>
								<button
									className='dual-sign-in'
									onClick={(e) => this.handleSignUp(e)}>
									Sign Up
								</button>
							</div> */}
							<button onSubmit={(e) => this.handleSignUp(e)}>
								Sign Up
							</button>
						</form>
					)}

					<div className='steps'>
						<div
							className='step1'
							style={
								this.state.step === 1
									? { backgroundColor: "#00b2ff" }
									: { backgroundColor: "#4d4d4d" }
							}
							onClick={this.handleSubmitPrev}
						/>
						<div
							className='step2'
							style={
								this.state.step === 1
									? { backgroundColor: "#4d4d4d" }
									: { backgroundColor: "#00b2ff" }
							}
							onClick={this.handleSubmitNext}
						/>
					</div>
					<p>
						Already have an account?{" "}
						<Link
							to='/login'
							onClick={() => {
								this.props.toggleSignUp(false);
							}}
							style={
								darkTheme ? { color: "#00b2ff" } : { color: "#ff004c" }
							}>
							Login
						</Link>
					</p>
				</div>
			</div>
		);
	}
}

export default SignUp;
