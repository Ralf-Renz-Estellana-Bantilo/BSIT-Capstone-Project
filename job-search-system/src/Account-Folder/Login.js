import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../Images/Logo.png";
import Eye from "../Images/Eye.png";
import "./Login.css";
import Auth from "../Auth";
import ProfileIconFilledGray from "../Images/ProfileIconFilledGray.png";
import UsernameIcon from "../Images/UsernameIcon.png";
import PasswordIcon from "../Images/PasswordIcon.png";
import LeftArrow from "../Images/LeftArrow.png";
import WelcomeWindow from "./WelcomeWindow";
import Loading2Blue from "../Images/Loading2Blue.gif";
import Loading2Red from "../Images/Loading2Red.gif";
import axios from "axios";
import AppConfiguration from "../AppConfiguration";

export class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			usernameInput: "",
			passwordInput: "",
			role: this.props.userType,
			isPasswordVisible: false,
			isValid: true,
			isLoggedin: false,
			redirectTo: "",
			errorMessage: "",
		};
	}

	handleLogin = async (e) => {
		e.preventDefault();

		const usernameInput = this.state.usernameInput;
		const passwordInput = this.state.passwordInput;

		const role = this.state.role;

		try {
			await axios
				.post(`${AppConfiguration.url()}/api/login`, {
					role: role,
					username: usernameInput,
					password: passwordInput,
				})
				.then(async (response) => {
					try {
						console.log(response.data);
						if (response.data.length === 1) {
							let path = "";

							if (response.data[0].Role === "Job Seeker") {
								path = "/jobseeker/home";
							} else if (response.data[0].Role === "Employer") {
								path = "/employer/dashboard";
							}
							this.setState({
								redirectTo: path,
							});

							await this.props.setCurrentUser(response.data[0]);
							await this.setIsLoggedin();
							await Auth.setAuthenticated(response.data[0].UserID);
							Auth.setUserType(response.data[0].Role);
							console.log("Successfully Logged in...");
						} else if (response.data === "User does not exist!") {
							this.setState({
								errorMessage: "User not found!",
								isValid: false,
							});
						} else if (
							response.data === "Wrong Username/Password Combination..."
						) {
							this.setState({
								errorMessage: "Wrong Username/Password Combination!",
								isValid: false,
							});
						} else {
							this.setState({
								errorMessage: "Login failed!",
								isValid: false,
							});
						}
					} catch (error) {
						this.setState({
							errorMessage: "Login Error! Please try again!",
							isValid: false,
						});
						console.log(error);
					}
				});
		} catch (error) {
			this.setState({
				errorMessage: "Network Error!",
				isValid: false,
			});
			console.log(error);
			alert(error);
		}
	};

	setIsValidToFalse = () => {
		this.setState({
			isValid: false,
			isLoggedin: false,
		});
	};

	setIsLoggedin = async () => {
		await this.setState({
			isLoggedin: true,
		});

		this.props.showWelcomWindowOn();

		localStorage.setItem("darkTheme", false);
	};

	setNotLoggedin = () => {
		this.setState({
			isLoggedin: false,
		});
	};

	handleChange = async (event) => {
		await this.setState({
			role: event.target.value,
		});

		this.props.setUserType(`${this.state.role}`);
	};

	componentDidMount = async () => {
		document.title = "Job Search Catarman";

		if (`${this.state.role}` !== "") {
			await this.setState({ role: `${this.props.userType}` });
		} else {
			await this.setState({
				role: "Job Seeker",
			});
		}

		// this.props.onClosePostForm();
	};

	render() {
		let holdString = "";
		if (this.state.role === "Job Seeker") {
			holdString = "/jobseeker/home";
		} else if (this.state.role === "Employer") {
			holdString = "/employer/dashboard";
		}

		const { darkTheme } = this.props;

		return (
			<div className='login-container'>
				{this.props.showWelcomWindow === true && (
					<WelcomeWindow
						roleGif={
							this.state.role === "Job Seeker"
								? Loading2Blue
								: Loading2Red
						}
						method={this.props.showWelcomWindowOff}
						delay={4}
						currentUser={this.props.currentUser}
						path={holdString}
						getAppliedJobs={this.props.getAppliedJobs}
						setAppliedJobs={this.props.setAppliedJobs}
						resetAppliedJobs={this.props.resetAppliedJobs}
						infos={this.props.infos}
						appliedJobs={this.props.appliedJobs}
						setEmployerFeedBack={this.props.setEmployerFeedBack}
						getJobApplicantsByCompany={
							this.props.getJobApplicantsByCompany
						}
						setCompany={this.props.setCompany}
						setCompanyJobPosts={this.props.setCompanyJobPosts}
						setJobPosts={this.props.setJobPosts}
					/>
				)}
				<div className='login-nav'>
					<Link to='/'>
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
							<div className='img-login-header'>
								<img
									src={ProfileIconFilledGray}
									alt='Login'
									style={
										darkTheme
											? { filter: "brightness(1)" }
											: { filter: "brightness(0.5)" }
									}
								/>
							</div>
							<div className='select-login-header'>
								<select
									name='Role'
									defaultValue={this.state.role}
									onChange={(e) => {
										this.handleChange(e);
									}}>
									<option value='Job Seeker'>Job Seeker</option>
									<option value='Employer'>Employer</option>
								</select>
							</div>
							{this.state.isValid === false && (
								<div className='error-container'>
									<div className='error-wrapper'>
										<p>{this.state.errorMessage}</p>
									</div>
								</div>
							)}
						</div>
					</div>

					<form
						className='form-login'
						onSubmit={(e) => this.handleLogin(e)}>
						<div className='circle-blue' />
						<div className='circle-red' />
						<div className='login-form'>
							<div className='input-field'>
								<div className='login-form-icon'>
									<img
										src={UsernameIcon}
										alt='Username Icon'
										style={
											darkTheme
												? { filter: "brightness(1)" }
												: { filter: "brightness(0.3)" }
										}
										disabled={
											this.props.showWelcomWindow && "disable"
										}
									/>
								</div>
								<input
									autoFocus
									autoComplete={"off"}
									type='text'
									placeholder='Username'
									onChange={(e) => {
										this.setState({
											usernameInput: e.target.value,
											isValid: true,
										});
									}}
									disabled={this.props.showWelcomWindow && "disable"}
								/>
							</div>
						</div>
						<div className='login-form'>
							<div className='input-field'>
								<div className='login-form-icon'>
									<img
										src={PasswordIcon}
										alt='Password Icon'
										className='password-icon'
										style={
											darkTheme
												? { filter: "brightness(1)" }
												: { filter: "brightness(0.3)" }
										}
									/>
								</div>
								<input
									type={
										this.state.isPasswordVisible ? "text" : "password"
									}
									placeholder='Password'
									onChange={(e) => {
										this.setState({
											passwordInput: e.target.value,
											isValid: true,
										});
									}}
								/>
								<img
									style={
										this.state.isPasswordVisible
											? { opacity: "100%" }
											: { opacity: "30% " }
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

						<button onClick={(e) => this.handleLogin(e)}>Login</button>
					</form>
					<p>
						Don't have an account yet?{" "}
						<Link
							to='/signup'
							style={
								darkTheme ? { color: "#00b2ff" } : { color: "#ff004c" }
							}>
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
