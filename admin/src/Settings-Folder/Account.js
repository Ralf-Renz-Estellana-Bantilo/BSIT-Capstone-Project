import React, { useEffect, useState } from "react";
import JobsIcon from "../Images/JobsIcon.png";
import EmployerIcon from "../Images/Employer.png";
import BusinessProfile from "../Images/BusinessProfile.png";
import BuildingIcon from "../Images/Building.png";
import "./Account.css";
import AccountJobPosts from "./AccountJobPosts";
import AccountJobApplicants from "./AccountJobApplicants";
import AccountCreateNewAdmin from "./AccountCreateNewAdmin";
import AccountCompanies from "./AccountCompanies";
import axios from "axios";

const Account = ({
	activeAccountPanel,
	setActiveAccountPanel,
	jobPosts,
	jobApplicants,
	adminPosts,
}) => {
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:2000/api/read-companies").then((response) => {
			if (response) {
				setCompanies(response.data);
			} else {
				console.log("Error fetching information...");
			}
		});
	}, []);

	return (
		<div className='job-post-panel-container'>
			<div className='job-post-panel'>
				<div className='job-post-header'>
					<h3>Your Account</h3>
				</div>
				<div className='job-posts'>
					<div
						className={
							activeAccountPanel === "Job Posts"
								? "selected-job-post"
								: "job-post"
						}
						style={{ border: "none" }}
						onClick={() => setActiveAccountPanel("Job Posts")}>
						<div className='account-panel'>
							<img src={JobsIcon} alt='Icon' />
							<h3>Your Job Posts</h3>
						</div>
					</div>
					<div
						className={
							activeAccountPanel === "Job Applicants"
								? "selected-job-post"
								: "job-post"
						}
						style={{ border: "none" }}
						onClick={() => setActiveAccountPanel("Job Applicants")}>
						<div className='account-panel'>
							<img src={BusinessProfile} alt='Icon' />
							<h3>Your Job Applicants</h3>
						</div>
					</div>
					<div
						className={
							activeAccountPanel === "Companies"
								? "selected-job-post"
								: "job-post"
						}
						style={{ border: "none" }}
						onClick={() => setActiveAccountPanel("Companies")}>
						<div className='account-panel'>
							<img src={BuildingIcon} alt='Icon' />
							<h3>Your Companies</h3>
						</div>
					</div>
					<div
						className={
							activeAccountPanel === "New Account"
								? "selected-job-post"
								: "job-post"
						}
						style={{ border: "none" }}
						onClick={() => setActiveAccountPanel("New Account")}>
						<div className='account-panel'>
							<img src={EmployerIcon} alt='Icon' />
							<h3>Add New Admin Account</h3>
						</div>
					</div>
				</div>
			</div>

			<div className='job-post-preview'>
				{activeAccountPanel === "Job Posts" ? (
					<AccountJobPosts
						jobPosts={jobPosts}
						jobApplicants={jobApplicants}
						adminPosts={adminPosts}
					/>
				) : activeAccountPanel === "Job Applicants" ? (
					<AccountJobApplicants />
				) : activeAccountPanel === "Companies" ? (
					<AccountCompanies
						companies={companies}
						adminPosts={adminPosts}
					/>
				) : activeAccountPanel === "New Account" ? (
					<AccountCreateNewAdmin />
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default Account;
