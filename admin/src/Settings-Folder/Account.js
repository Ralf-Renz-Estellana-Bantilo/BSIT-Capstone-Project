import React, { useEffect, useState } from "react";
import JobsIcon from "../Images/JobsIcon.png";
import EmployerIcon from "../Images/Employer.png";
import BusinessProfile from "../Images/BusinessProfile.png";
import CloseIcon from "../Images/CloseIcon.png";
import DeleteIcon from "../Images/DeleteIcon.png";
import BuildingIcon from "../Images/Building.png";
import ReportIcon from "../Images/Report.png";
import "./Account.css";
import AccountJobPosts from "./AccountJobPosts";
import AccountJobApplicants from "./AccountJobApplicants";
import AccountCreateNewAdmin from "./AccountCreateNewAdmin";
import AccountCompanies from "./AccountCompanies";
import axios from "axios";
import AccountReportSummary from "./AccountReportSummary";
import Modal from "../Modal";

const Account = ({
	activeAccountPanel,
	setActiveAccountPanel,
	jobPosts,
	jobApplicants,
	adminPosts,
	admin,
	employerFeedback,
	applicantsData,
	companiesData,
}) => {
	const [companies, setCompanies] = useState([]);
	const [administrators, setAdministrators] = useState([]);

	const [openSummary, setOpenSummary] = useState(null);
	const [isVisible, setIsVisible] = useState(true);
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [isconfirmationDialogOpen, setConfirmationDialogOpen] =
		useState(false);

	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);

	const handleDeleteAdminAccount = () => {
		const userSession = sessionStorage.getItem("UserID");
		try {
			// Delete User Account Data
			axios
				.delete(
					`https://job-search-system-catarman.herokuapp.com/api/delete-user-account/${userSession}`
				)
				.then((response) => {
					setDeleteModalOpen(false);
					localStorage.clear();
					sessionStorage.clear();
				});
		} catch (error) {
			alert(error);
		}
	};

	const handleVerifyAdmin = (e) => {
		e.preventDefault();

		const { Username } = admin;
		try {
			if (username === null || password === null) {
				alert("Please input data!");
			} else if (username !== Username) {
				alert("Wrong entries! Please try again!");
			} else {
				axios
					.post(
						"https://job-search-system-catarman.herokuapp.com/api/login",
						{
							role: "Admin",
							username: username,
							password: password,
						}
					)
					.then(async (response) => {
						if (response.data.length === 1) {
							setDeleteModalOpen(true);
							setConfirmationDialogOpen(false);
						} else {
							alert("Wrong entries! Please try again!");
						}
					});
			}
		} catch (error) {
			alert(error);
		}
	};

	useEffect(() => {
		axios
			.get(
				"https://job-search-system-catarman.herokuapp.com/api/read-companies"
			)
			.then((response) => {
				if (response) {
					setCompanies(response.data);
				} else {
					console.log("Error fetching information...");
				}
			});

		axios
			.get(
				"https://job-search-system-catarman.herokuapp.com/api/read-user-admin"
			)
			.then((response) => {
				if (response) {
					setAdministrators(response.data);
				} else {
					console.log("Error fetching information...");
				}
			});
	}, []);

	let isUpdateButtonEnable = true;
	if (
		username === "" ||
		password === "" ||
		username === null ||
		password === null
	) {
		isUpdateButtonEnable = false;
	}

	return (
		<div className='job-post-panel-container'>
			{isDeleteModalOpen && (
				<Modal
					headText='Delete Account Confirmation'
					modalText={`Hey Admin, are you sure you want to delete your account?`}
					confirmText='Confirm'
					closeText='Cancel'
					close={() => setDeleteModalOpen(false)}
					confirm={handleDeleteAdminAccount}
					path='/'
				/>
			)}

			{isconfirmationDialogOpen && (
				<div className='admin-profile-container'>
					<div className='profile-modal-container'>
						<div
							className='overlay-style'
							onClick={() => {
								setConfirmationDialogOpen(false);
							}}
						/>
						<div
							className='profile-modal-style'
							style={{ width: "250px" }}>
							<div className='profile-modal-header'>
								<h3 className='modal-sub-text'>Admin Verification</h3>
								<div className='modal-close'>
									<img
										className='closeIcon'
										src={CloseIcon}
										alt='Close'
										onClick={() => {
											setConfirmationDialogOpen(false);
										}}
										title='Close'
									/>
								</div>
							</div>
							<div className='profile-content'>
								<form
									className='confirmation-fields'
									onSubmit={handleVerifyAdmin}>
									<input
										autoFocus
										type='password'
										placeholder='Username'
										value={username}
										onChange={(e) => setUsername(e.target.value)}
									/>
									<input
										type='password'
										placeholder='Password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<button
										style={
											isUpdateButtonEnable
												? { opacity: "1", margin: "0px" }
												: { opacity: "0.3", margin: "0px" }
										}
										disabled={isUpdateButtonEnable ? "" : "disabled"}>
										Continue
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className='job-post-panel'>
				<div className='job-post-header'>
					<h3>Your Account</h3>
					<img
						src={DeleteIcon}
						alt='Delete'
						title='Delete Account'
						style={{ height: "16px", top: "10px" }}
						onClick={() => setConfirmationDialogOpen(true)}
					/>
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
					<div
						className={
							activeAccountPanel === "Summary"
								? "selected-job-post"
								: "job-post"
						}
						style={{ border: "none" }}
						onClick={() => setActiveAccountPanel("Summary")}>
						<div className='account-panel'>
							<img src={ReportIcon} alt='Icon' />
							<h3>JSCatarman Report Summary</h3>
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
					<AccountCreateNewAdmin
						admin={admin}
						administrators={administrators}
						setAdministrators={setAdministrators}
					/>
				) : activeAccountPanel === "Summary" ? (
					<AccountReportSummary
						openSummary={openSummary}
						isVisible={isVisible}
						jobPosts={jobPosts}
						employerFeedback={employerFeedback}
						applicantsData={applicantsData}
						companiesData={companiesData}
						setOpenSummary={setOpenSummary}
						setIsVisible={setIsVisible}
					/>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default Account;
