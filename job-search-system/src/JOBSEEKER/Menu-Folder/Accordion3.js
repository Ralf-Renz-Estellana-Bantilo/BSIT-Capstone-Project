import axios from "axios";
import React, { useState } from "react";
import Modal from "../Home-Folder/Modal";
import "./Accordion.css";
import CloseIcon from "../../Images/CloseIcon.png";
import Eye from "../../Images/Eye.png";
import AppConfiguration from "../../AppConfiguration";

const Accordion3 = ({ deleteCompanyPosts, currentUser, setUpdated }) => {
	const [isActive, setIsActive] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [step, setStep] = useState(0);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const [currentUsername, setCurrentUsername] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newUsername, setNewUsername] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const viewModal = () => {
		setIsModalOpen(true);
	};

	const onCloseModal = () => {
		setIsModalOpen(false);
	};

	const deleteJobSeekerAccount = async () => {
		const userSession = sessionStorage.getItem("UserID");
		const applicantSession = sessionStorage.getItem("ApplicantID");

		try {
			// Delete User Account Data
			await axios
				.delete(
					`${AppConfiguration.url()}/api/delete-user-account/${userSession}`
				)
				.then(async (response) => {
					// console.log("Job Applicants have been deleted");
				});

			// Delete Applicant Data
			await axios
				.delete(
					`${AppConfiguration.url()}/api/delete-applicant/${applicantSession}`
				)
				.then(async (response) => {
					// console.log("Job Applicants have been deleted");
				});

			// Delete Job Applicant Data
			await axios
				.delete(
					`${AppConfiguration.url()}/api/account-delete-job-applicant/${applicantSession}`
				)
				.then(async (response) => {
					// console.log("Job Applicants have been deleted");
				});

			// Delete Applied Jobs Data
			await axios
				.delete(
					`${AppConfiguration.url()}/api/account-delete-applied-job/${applicantSession}`
				)
				.then(async (response) => {
					// console.log("Job Applicants have been deleted");
				});

			// Delete Employer Feedback Data
			await axios
				.delete(
					`${AppConfiguration.url()}/api/delete-employer-feedback/${applicantSession}`
				)
				.then(async (response) => {
					// console.log("Employer Feedback have been deleted");
					sessionStorage.clear();
					localStorage.clear();
				});
		} catch (error) {
			alert(error);
		}
	};

	const deleteEmployerAccount = async () => {
		const userSession = sessionStorage.getItem("UserID");
		const companySession = sessionStorage.getItem("CompanyID");

		await deletePosts();

		try {
			// Delete User Account Data
			await axios
				.delete(
					`${AppConfiguration.url()}/api/delete-user-account/${userSession}`
				)
				.then(async (response) => {
					// console.log("User Account Data have been deleted");
				});

			// Delete Company Data
			await axios
				.delete(
					`${AppConfiguration.url()}/api/delete-company/${userSession}`
				)
				.then(async (response) => {
					// console.log("Company Data have been deleted");
				});

			// Delete Job Posts Data
			await axios
				.delete(
					`${AppConfiguration.url()}/api/delete-company-jobPost/${companySession}`
				)
				.then(async (response) => {
					// console.log("Job Posts Data have been deleted");
				});

			// Delete Job Applicant Data
			await axios
				.delete(
					`${AppConfiguration.url()}/api/delete-job-applicant-employer/${companySession}`
				)
				.then(async (response) => {
					// console.log("Job Applicant Data have been deleted");
				});

			// Delete Applied Jobs Data
			await axios
				.delete(
					`${AppConfiguration.url()}/api/delete-applied-employer/${companySession}`
				)
				.then(async (response) => {
					// console.log("Applied Jobs Data have been deleted");
				});

			// Delete Employer Feedback Data
			await axios
				.delete(
					`${AppConfiguration.url()}/api/delete-employer-feedback-data/${companySession}`
				)
				.then(async (response) => {
					// console.log("Employer Feedback Data have been deleted");
					sessionStorage.clear();
					localStorage.clear();
				});
		} catch (error) {
			alert(error);
		}

		localStorage.clear();
		sessionStorage.clear();
	};

	const deletePosts = async () => {
		const companySession = sessionStorage.getItem("CompanyID");

		await deleteCompanyPosts(companySession);
	};

	const verifyUser = (e) => {
		e.preventDefault();

		try {
			const { Username, Password } = currentUser;
			const userTypeSession = sessionStorage.getItem("UserType");

			if (Username !== currentUsername) {
				alert("Wrong entries! Please try again!");
			} else {
				axios
					.post(`${AppConfiguration.url()}/api/login`, {
						role: userTypeSession,
						username: currentUsername,
						password: currentPassword,
					})
					.then(async (response) => {
						if (response.data.length === 1) {
							setStep(2);
							setIsPasswordVisible(false);
						} else {
							alert("Wrong password, Please try again!");
						}
					});
			}
		} catch (error) {}
	};

	const newUsernameAndPassword = (e) => {
		e.preventDefault();

		const userID = sessionStorage.getItem("UserID");

		if (newUsername === "" || newPassword === "" || confirmPassword === "") {
			alert("Invalid entries, Please try again!");
		} else if (newPassword !== confirmPassword) {
			alert("Password does not match!");
		} else {
			try {
				axios
					.put(`${AppConfiguration.url()}/api/update-user-account`, {
						username: newUsername,
						password: newPassword,
						userID: userID,
					})
					.then(async (response) => {
						setStep(0);
						resetAllFields();
						setUpdated();
					});
			} catch (error) {}
		}
	};

	const resetAllFields = () => {
		setCurrentUsername("");
		setCurrentPassword("");
		setNewUsername("");
		setNewPassword("");
		setConfirmPassword("");
	};

	const userTypeSession = sessionStorage.getItem("UserType");
	let userType = "";
	if (userTypeSession === "Job Seeker") {
		userType = "jobseeker";
	} else if (userTypeSession === "Employer") {
		userType = "employer";
	}

	return (
		<div className='accordion-item'>
			<div
				className='accordion-title'
				onClick={() => setIsActive(!isActive)}>
				<div>Account</div>
				<div
					className='toggle-container'
					style={{
						background: isActive
							? "linear-gradient(to bottom, #ff7b00, #ff004c)"
							: "linear-gradient(to bottom, #00b2ff, #006aff)",
					}}>
					<p title={isActive ? "Show Less" : "Show More"}>
						{isActive ? "-" : "+"}
					</p>
				</div>
			</div>
			{userType === "jobseeker" ? (
				<div>
					{isModalOpen === true && (
						<Modal
							headText='Delete Job Seeker Account Confirmation'
							modalText={`Are you sure you want to delete this account?`}
							confirmText='Confirm'
							closeText='Cancel'
							close={onCloseModal}
							confirm={deleteJobSeekerAccount}
							path='/signup'
						/>
					)}
				</div>
			) : (
				<div>
					{isModalOpen === true && (
						<Modal
							headText='Delete Employer Account Confirmation'
							modalText={`Are you sure you want to delete this account?`}
							confirmText='Confirm'
							closeText='Cancel'
							close={onCloseModal}
							confirm={deleteEmployerAccount}
							path='/signup'
						/>
					)}
				</div>
			)}
			{isActive && (
				<div className='accordion-content'>
					<div className='accordion-content-button'>
						<button
							className='accordionButton'
							onClick={() => setStep(1)}>
							Change Username and Password
						</button>
						<button className='accordionButton' onClick={viewModal}>
							Delete Account
						</button>
						{/* <button className='accordionButton'>Reboot Account</button> */}
					</div>
				</div>
			)}
			{step === 1 && (
				<div className='modal-container'>
					<div
						className='overlay-style'
						onClick={() => {
							setStep(0);
							resetAllFields();
						}}></div>
					<div className='verification-container'>
						<img
							className='close-icon'
							src={CloseIcon}
							alt='Close'
							onClick={() => {
								setStep(0);
								resetAllFields();
							}}
						/>
						<div className='verification-container-header'>
							<h3>Verify Current User</h3>
						</div>
						<form
							className='verification-container-form'
							onSubmit={(e) => {
								verifyUser(e);
							}}>
							<input
								autoFocus
								type='text'
								placeholder='Current Username'
								value={currentUsername}
								onChange={(e) => setCurrentUsername(e.target.value)}
							/>
							<div className='password-input'>
								<input
									type={isPasswordVisible ? "text" : "password"}
									placeholder='Current Password'
									value={currentPassword}
									onChange={(e) => setCurrentPassword(e.target.value)}
								/>
								<img
									className='eye-icon'
									style={
										isPasswordVisible
											? { filter: "brightness(0.3)" }
											: { filter: "brightness(0.7)" }
									}
									src={Eye}
									alt='Password Visible'
									onClick={() => {
										setIsPasswordVisible(!isPasswordVisible);
									}}
								/>
							</div>
							<button
								onClick={(e) => {
									verifyUser(e);
								}}>
								Continue
							</button>
						</form>
						<div className='progress-indication'>
							<div
								className='circle'
								style={{ backgroundColor: "#00b2ff" }}></div>
							<div
								className='circle'
								style={{ backgroundColor: "grey" }}></div>
						</div>
					</div>
				</div>
			)}
			{step === 2 && (
				<div className='modal-container'>
					<div
						className='overlay-style'
						onClick={() => {
							setStep(0);
							resetAllFields();
						}}></div>
					<div className='verification-container'>
						<img
							className='close-icon'
							src={CloseIcon}
							alt='Close'
							onClick={() => {
								setStep(0);
								resetAllFields();
							}}
						/>
						<div className='verification-container-header'>
							<h3>Enter New Username & Password</h3>
						</div>
						<form
							className='verification-container-form'
							onSubmit={(e) => {
								newUsernameAndPassword(e);
							}}>
							<input
								autoFocus
								type='text'
								placeholder='New Username'
								value={newUsername}
								onChange={(e) => setNewUsername(e.target.value)}
							/>
							<div className='password-input'>
								<input
									type={isPasswordVisible ? "text" : "password"}
									placeholder='New Password'
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
								/>
								<img
									className='eye-icon'
									style={
										isPasswordVisible
											? { filter: "brightness(0.3)" }
											: { filter: "brightness(0.7)" }
									}
									src={Eye}
									alt='Password Visible'
									onClick={() => {
										setIsPasswordVisible(!isPasswordVisible);
									}}
								/>
							</div>
							<input
								type='password'
								placeholder='Confirm Password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<button
								onClick={(e) => {
									newUsernameAndPassword(e);
								}}>
								Update
							</button>
						</form>
						<div className='progress-indication'>
							<div
								className='circle'
								style={{ backgroundColor: "grey" }}></div>
							<div
								className='circle'
								style={{ backgroundColor: "#00b2ff" }}></div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

Accordion3.defaultProps = {
	deleteCompanyPosts: function () {},
};

export default Accordion3;
