import React, { Component } from "react";
import SearchIcon from "../Images/SearchIcon.png";
import MenuIconFilled from "../Images/MenuIconFilled.png";
import Logout from "../Images/Logout.png";
import "./Emp_Navbar.css";
import Modal from "../JOBSEEKER/Home-Folder/Modal";
import Logo from "../Images/Logo.png";
import DashboardIcon from "../Images/DashboardIcon.png";
import BusinessProfile from "../Images/BusinessProfile.png";
import JobsIcon from "../Images/JobsIcon.png";
import ApplicantIcon from "../Images/ApplicantIcon.png";
import Settings from "../Images/Settings.png";
import Icon4 from "../Images/Icon4.png";
import CloseIcon from "../Images/CloseIcon.png";
import Footer from "../JOBSEEKER/Home-Folder/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Auth from "../Auth";
import { withRouter } from "react-router-dom";

export class Emp_Navbar extends Component {
	state = {
		isModalOpen: false,
		isSidebarOpen: false,
		company: [],
	};

	handleLogout = (e) => {
		e.preventDefault();
		console.log("User has been logged out!");
		this.props.handleLogout();

		Auth.setNotAuthenticated();
		localStorage.clear();
	};

	handleApplicant = async () => {
		const companySession = sessionStorage.getItem("CompanyID");

		// Fetching Job Applicant Data ------------
		await axios
			.post("http://localhost:2000/api/read-job-applicant", {
				companyID: companySession,
			})
			.then(async (response) => {
				await this.props.getJobApplicantsByCompany(response.data);
			});
	};

	viewModal = () => {
		this.setState({
			isModalOpen: true,
		});
	};

	onCloseModal = () => {
		this.setState({
			isModalOpen: false,
		});
	};

	toggleSidebar = () => {
		this.setState({
			isSidebarOpen: !this.state.isSidebarOpen,
		});
	};

	push = () => {
		const userTypeSession = sessionStorage.getItem("UserType");
		let userType = "";
		if (userTypeSession === "Job Seeker") {
			userType = "jobseeker";
		} else {
			userType = "employer";
		}
		this.props.history.push(`/${userType}/search`);
	};

	componentDidMount = async () => {
		document.title = "Employer | Job Search Catarman";
	};

	render() {
		const { panel, darkTheme, company } = this.props;
		const userTypeSession = sessionStorage.getItem("UserType");
		let userType = "";
		if (userTypeSession === "Job Seeker") {
			userType = "jobseeker";
		} else {
			userType = "employer";
		}

		return (
			<div className='dashboard-navbar-parent-container'>
				{this.state.isModalOpen ? (
					<Modal
						headText='Logout Confirmation'
						modalText='Are you sure you want to logout?'
						confirmText='Logout'
						closeText='Cancel'
						close={this.onCloseModal}
						confirm={this.handleLogout}
						path='/login'
					/>
				) : (
					""
				)}
				<div className='dashboard-navbar-container'>
					<div className='dashboard-navbar'>
						<div className='dashboard-navbar-left'>
							<img
								src={MenuIconFilled}
								alt='Menu'
								onClick={this.toggleSidebar}
							/>
							<div
								className='dashboard-search-input'
								onClick={this.push}>
								<input
									type='text'
									placeholder='Search here...'
									onFocus={() =>
										this.props.history.push(`/${userType}/search`)
									}
								/>
								<img src={SearchIcon} alt='Search' />
							</div>
						</div>
						<div className='dashboard-navbar-right'>
							<div className='dashboard-navbar-profile-holder'>
								<h3>{company.Company_Name}</h3>
								<div
									className='dashboard-navbar-account-profile'
									onClick={() =>
										this.props.history.push(
											"/employer/business-profile"
										)
									}>
									<img
										src={`../assets/${company.Company_Image}`}
										alt='Company'
									/>
								</div>
							</div>
							<div className='dashboard-logout-container'>
								<img src={Logout} alt='' onClick={this.viewModal} />
							</div>
						</div>
					</div>
				</div>
				<div className='panel-indicator'>
					<h3>{this.props.panel}</h3>
				</div>

				<div className='sidebar-parent-container'>
					<div
						className='sidebar-overlay-style'
						style={
							this.state.isSidebarOpen
								? { display: "" }
								: { display: "none" }
						}
					/>
					<div
						className='sidebar-container'
						style={
							this.state.isSidebarOpen
								? { width: "280px" }
								: { width: "0px" }
						}>
						<div className='sidebar-logo-container'>
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
						<div
							className={
								panel === "Dashboard"
									? "category-panel-container-active"
									: "category-panel-container"
							}>
							<Link to='/employer/dashboard'>
								<div className='category-icon'>
									<img
										src={DashboardIcon}
										alt='Dashboard Icon'
										style={
											darkTheme
												? { filter: "brightness(1)" }
												: { filter: "brightness(0.1)" }
										}
									/>
								</div>
								<div className='category-text'>
									<h3>DASHBOARD</h3>
								</div>
							</Link>
						</div>

						<div
							className={
								panel === "Business Profile"
									? "category-panel-container-active"
									: "category-panel-container"
							}>
							<Link to='/employer/business-profile'>
								<div className='category-icon'>
									<img
										src={BusinessProfile}
										alt='Business Profile Icon'
										style={
											darkTheme
												? { filter: "brightness(1)" }
												: { filter: "brightness(0.1)" }
										}
									/>
								</div>
								<div className='category-text'>
									<h3>BUSINESS PROFILE</h3>
								</div>
							</Link>
						</div>

						<div
							className={
								panel === "Jobs"
									? "category-panel-container-active"
									: "category-panel-container"
							}>
							<Link to='/employer/jobs'>
								<div className='category-icon'>
									<img
										src={JobsIcon}
										alt='Jobs Icon'
										style={
											darkTheme
												? { filter: "brightness(1)" }
												: { filter: "brightness(0.1)" }
										}
									/>
								</div>
								<div className='category-text'>
									<h3>JOB POSTS</h3>
								</div>
							</Link>
						</div>

						<div
							className={
								panel === "Applicants"
									? "category-panel-container-active"
									: "category-panel-container"
							}
							onClick={this.handleApplicant}>
							<Link to='/employer/applicants'>
								<div className='category-icon'>
									<img
										src={ApplicantIcon}
										alt='Applicant  Icon'
										style={
											darkTheme
												? { filter: "brightness(1)" }
												: { filter: "brightness(0.1)" }
										}
									/>
								</div>
								<div className='category-text'>
									<h3>APPLICANTS</h3>
								</div>
							</Link>
						</div>

						<div
							className={
								panel === "Settings"
									? "category-panel-container-active"
									: "category-panel-container"
							}>
							<Link to='/employer/settings'>
								<div className='category-icon'>
									<img
										src={Settings}
										alt='Settings Icon'
										style={
											darkTheme
												? { filter: "brightness(1)" }
												: { filter: "brightness(0.1)" }
										}
									/>
								</div>
								<div className='category-text'>
									<h3>SETTINGS</h3>
								</div>
							</Link>
						</div>

						{/* <div
							className={
								panel === "Account"
									? "category-panel-container-active"
									: "category-panel-container"
							}>
							<Link to='/employer/account'>
								<div className='category-icon'>
									<img
										src={Icon4}
										alt='Icon4 Icon'
										style={
											darkTheme
												? { filter: "brightness(1)" }
												: { filter: "brightness(0.1)" }
										}
									/>
								</div>
								<div className='category-text'>
									<h3>ACCOUNT</h3>
								</div>
							</Link>
						</div> */}

						<div className='footer-panel'>
							<Footer />
						</div>

						<img
							src={CloseIcon}
							alt='Close Sidebar'
							onClick={this.toggleSidebar}
							className='closeSidebar'
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Emp_Navbar);
