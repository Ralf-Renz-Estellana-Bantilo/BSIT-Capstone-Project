import React from "react";
import Logo from "./Images/Logo.png";
import DashboardIcon from "./Images/DashboardIcon.png";
import JobsIcon from "./Images/JobsIcon.png";
import BusinessProfile from "./Images/BusinessProfile.png";
import Building from "./Images/Building.png";
import Settings from "./Images/Settings.png";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import axios from "axios";

const Sidebar = ({
	activePage,
	setJobPosts,
	setEmployers,
	setApplicantsData,
	setJobApplicants,
	setSidebarOpen,
	setJobSeekers,
	setCompaniesData,
}) => {
	const navigate = useNavigate();

	const handleDashboard = () => {
		navigate("/admin/dashboard");
		axios.get("http://localhost:2000/api/read-jobPost").then((response) => {
			if (response) {
				setJobPosts(response.data);
			} else {
				console.log("Error fetching information...");
			}
		});

		// User_Account Database Table ----------
		axios
			.get("http://localhost:2000/api/read-user-employer")
			.then((response) => {
				if (response) {
					setEmployers(response.data);
				} else {
					console.log("Error fetching information...");
				}
			});

		// Applicant Database Table ----------
		axios
			.get("http://localhost:2000/api/read-applicant-data")
			.then((response) => {
				if (response) {
					setApplicantsData(response.data);
				} else {
					console.log("Error fetching information...");
				}
			});
	};

	const handleJobPosts = () => {
		navigate("/admin/job-posts");
		// Fetching Job Posts
		axios.get("http://localhost:2000/api/read-jobPost").then((response) => {
			if (response) {
				setJobPosts(response.data);
			} else {
				console.log("Error fetching information...");
			}
		});

		// Fetching Job Applicants
		axios
			.get("http://localhost:2000/api/read-company-applicants")
			.then((response) => {
				if (response) {
					setJobApplicants(response.data);
				} else {
					console.log("Error fetching information...");
				}
			});
	};

	const handleApplicants = () => {
		navigate("/admin/applicants");

		// Applicant Database Table ----------
		axios
			.get("http://localhost:2000/api/read-applicant-data")
			.then((response) => {
				if (response) {
					setJobSeekers(response.data);
				} else {
					console.log("Error fetching information...");
				}
			});
	};

	const handleCompanies = () => {
		navigate("/admin/companies");

		// Fetching Companies
		axios.get("http://localhost:2000/api/read-companies").then((response) => {
			if (response) {
				setCompaniesData(response.data);
			} else {
				console.log("Error fetching information...");
			}
		});
	};

	const handleSettings = () => {
		navigate("/admin/settings");
	};

	return (
		<div className='sidebar-container'>
			<div className='sidebar-categories'>
				<div className='logo-container'>
					<img
						src={Logo}
						alt='Job Search Catarman Logo'
						onClick={() => setSidebarOpen(false)}
					/>
				</div>
				<div
					className={
						activePage === "Dashboard"
							? "category-container-active"
							: "category-container"
					}
					onClick={handleDashboard}>
					<div className='category-icon'>
						<img
							src={DashboardIcon}
							alt='Dashboard Icon'
							style={
								activePage === "Dashboard"
									? { filter: "brightness(1)" }
									: {}
							}
						/>
					</div>
					<div className='category-text'>
						<h3
							style={
								activePage === "Dashboard" ? { color: "white" } : {}
							}>
							DASHBOARD
						</h3>
					</div>
				</div>
				<div
					className={
						activePage === "Job Posts"
							? "category-container-active"
							: "category-container"
					}
					onClick={handleJobPosts}>
					<div className='category-icon'>
						<img
							src={JobsIcon}
							alt='Dashboard Icon'
							style={
								activePage === "Job Posts"
									? { filter: "brightness(1)" }
									: {}
							}
						/>
					</div>
					<div className='category-text'>
						<h3
							style={
								activePage === "Job Posts" ? { color: "white" } : {}
							}>
							JOB POSTS
						</h3>
					</div>
				</div>
				<div
					className={
						activePage === "Applicants"
							? "category-container-active"
							: "category-container"
					}
					onClick={handleApplicants}>
					<div className='category-icon'>
						<img
							src={BusinessProfile}
							alt='Dashboard Icon'
							style={
								activePage === "Applicants"
									? { filter: "brightness(1)" }
									: {}
							}
						/>
					</div>
					<div className='category-text'>
						<h3
							style={
								activePage === "Applicants" ? { color: "white" } : {}
							}>
							APPLICANTS
						</h3>
					</div>
				</div>
				<div
					className={
						activePage === "Companies"
							? "category-container-active"
							: "category-container"
					}
					onClick={handleCompanies}>
					<div className='category-icon'>
						<img
							src={Building}
							alt='Dashboard Icon'
							style={
								activePage === "Companies"
									? { filter: "brightness(1)" }
									: {}
							}
						/>
					</div>
					<div className='category-text'>
						<h3
							style={
								activePage === "Companies" ? { color: "white" } : {}
							}>
							COMPANIES
						</h3>
					</div>
				</div>
				<div
					className={
						activePage === "Settings"
							? "category-container-active"
							: "category-container"
					}
					onClick={handleSettings}>
					<div className='category-icon'>
						<img
							src={Settings}
							alt='Dashboard Icon'
							style={
								activePage === "Settings"
									? { filter: "brightness(1)" }
									: {}
							}
						/>
					</div>
					<div className='category-text'>
						<h3
							style={
								activePage === "Settings" ? { color: "white" } : {}
							}>
							SETTINGS
						</h3>
					</div>
				</div>
			</div>

			<div className='sidebar-footer'>
				<div className='admin-text'>
					<h4>Administrator</h4>
				</div>
				<div className='footer'>
					<p>
						Job Search System in Catarman, Northern Samar | All Rights
						Reserved 2021
					</p>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
