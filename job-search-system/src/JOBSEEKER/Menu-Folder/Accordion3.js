import axios from "axios";
import React, { useState } from "react";
import Modal from "../Home-Folder/Modal";
import "./Accordion.css";

const Accordion3 = ({ deleteCompanyPosts }) => {
	const [isActive, setIsActive] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const viewModal = () => {
		setIsModalOpen(true);
	};

	const onCloseModal = () => {
		setIsModalOpen(false);
	};

	const deleteJobSeekerAccount = async () => {
		const userSession = sessionStorage.getItem("UserID");
		const applicantSession = sessionStorage.getItem("ApplicantID");
		console.log("userSession", userSession);
		console.log("applicantSession", applicantSession);

		// Delete User Account Data
		await axios
			.delete(`http://localhost:2000/api/delete-user-account/${userSession}`)
			.then(async (response) => {
				console.log("Job Applicants have been deleted");
			});

		// Delete Applicant Data
		await axios
			.delete(
				`http://localhost:2000/api/delete-applicant/${applicantSession}`
			)
			.then(async (response) => {
				console.log("Job Applicants have been deleted");
			});

		// Delete Job Applicant Data
		await axios
			.delete(
				`http://localhost:2000/api/account-delete-job-applicant/${applicantSession}`
			)
			.then(async (response) => {
				console.log("Job Applicants have been deleted");
			});

		// Delete Applied Jobs Data
		await axios
			.delete(
				`http://localhost:2000/api/account-delete-applied-job/${applicantSession}`
			)
			.then(async (response) => {
				console.log("Job Applicants have been deleted");
			});

		// Delete Employer Feedback Data
		await axios
			.delete(
				`http://localhost:2000/api/delete-employer-feedback/${applicantSession}`
			)
			.then(async (response) => {
				console.log("Employer Feedback have been deleted");
			});
	};

	const deleteEmployerAccount = async () => {
		const userSession = sessionStorage.getItem("UserID");
		const companySession = sessionStorage.getItem("CompanyID");
		console.log("userSession", userSession);
		console.log("companySession", companySession);

		await deletePosts();

		// Delete User Account Data
		await axios
			.delete(`http://localhost:2000/api/delete-user-account/${userSession}`)
			.then(async (response) => {
				console.log("User Account Data have been deleted");
			});

		// Delete Company Data
		await axios
			.delete(`http://localhost:2000/api/delete-company/${userSession}`)
			.then(async (response) => {
				console.log("Company Data have been deleted");
			});

		// Delete Job Posts Data
		await axios
			.delete(
				`http://localhost:2000/api/delete-company-jobPost/${companySession}`
			)
			.then(async (response) => {
				console.log("Job Posts Data have been deleted");
			});

		// Delete Job Applicant Data
		await axios
			.delete(
				`http://localhost:2000/api/delete-job-applicant-employer/${companySession}`
			)
			.then(async (response) => {
				console.log("Job Applicant Data have been deleted");
			});

		// Delete Applied Jobs Data
		await axios
			.delete(
				`http://localhost:2000/api/delete-applied-employer/${companySession}`
			)
			.then(async (response) => {
				console.log("Applied Jobs Data have been deleted");
			});

		// Delete Employer Feedback Data
		await axios
			.delete(
				`http://localhost:2000/api/delete-employer-feedback-data/${companySession}`
			)
			.then(async (response) => {
				console.log("Employer Feedback Data have been deleted");
			});

		localStorage.clear();
		sessionStorage.clear();
	};

	const deletePosts = async () => {
		const companySession = sessionStorage.getItem("CompanyID");

		await deleteCompanyPosts(companySession);
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
					<div
						title={isActive ? "Show Less" : "Show More"}
						className='toggleAccordion'>
						{isActive ? "-" : "+"}
					</div>
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
						<button className='accordionButton'>Update Account</button>
						<button className='accordionButton' onClick={viewModal}>
							Delete Account
						</button>
						<button className='accordionButton'>Reboot Account</button>
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
