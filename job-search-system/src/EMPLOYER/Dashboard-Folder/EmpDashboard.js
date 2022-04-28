import React, { Component } from "react";
import UpdatedResume from "../../Images/UpdatedResume.svg";
import EmpGap from "../EmpGap";
import "./EmpDashboard.css";
import EmpNavbar from "../EmpNavbar";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Resources from "../../Resources";
import AppConfiguration from "../../AppConfiguration";
import Loading from "../../Loading";
import RegistrationForm from "./RegistrationForm";

export class Emp_Dashboard extends Component {
	state = {
		comp_stablismentName: "",
		comp_street: "",
		comp_zone: "",
		comp_barangay: "",
		comp_contactNumber: 0,
		comp_description: "",
		comp_image: null,
		comp_acronym: null,
		comp_type: null,
		comp_workForce: null,
		comp_emailAddress: null,
		company: [],
		companyJobPost: [],
		isModalOpen: false,
		activeJobPost: 0,
		jobApplicantLength: 0,
		month: "",
		fileData: null,
		hasAcronym: false,
		isLoading: false,
	};

	handleChange = (event, fieldName) => {
		this.setState({
			[fieldName]: event.target.value,
		});
	};

	handleFileChange = (event) => {
		this.setState({
			comp_image: URL.createObjectURL(event.target.files[0]),
			fileData: event.target.files[0],
		});
	};

	closeModal = () => {
		this.setState({
			isModalOpen: false,
		});
	};

	handleCreateCompanyData = async (e) => {
		e.preventDefault();

		const { currentUser, company } = this.props;
		const {
			comp_stablismentName,
			comp_street,
			comp_zone,
			comp_barangay,
			comp_contactNumber,
			comp_description,
			fileData,
			comp_acronym,
			comp_type,
			comp_workForce,
			comp_emailAddress,
		} = this.state;

		const employerName = `${currentUser.First_Name} ${currentUser.Middle_Name} ${currentUser.Last_Name}`;

		try {
			this.setState({
				isLoading: true,
			});
			const data = new FormData();
			data.append("file", fileData);
			data.append("upload_preset", "job-search-catarman-asset");

			await axios
				.post(
					"https://api.cloudinary.com/v1_1/doprewqnx/image/upload",
					data
				)
				.then(async (res) => {
					const newFileName = res.data.secure_url;
					const companyData = {
						Company_Name: comp_stablismentName,
						Employer_Name: employerName,
						Street: comp_street,
						Zone: comp_zone,
						Barangay: comp_barangay,
						Contact_Number: comp_contactNumber,
						Company_Description: comp_description,
						Company_Image: newFileName,
						UserID: company.UserID,
						CompanyID: company.CompanyID,
						Company_Acronym: comp_acronym,
						Employer_Type: comp_type,
						Work_Force: comp_workForce,
						Email_Address: comp_emailAddress,
					};
					await this.updateData(employerName, newFileName, companyData);
				});
		} catch (error) {
			console.log(error);
		}
	};

	updateData = async (employerName, newFileName, companyData) => {
		const companySession = sessionStorage.getItem("CompanyID");
		const userSession = sessionStorage.getItem("UserID");
		const {
			comp_stablismentName,
			comp_street,
			comp_zone,
			comp_barangay,
			comp_contactNumber,
			comp_description,
			comp_acronym,
			comp_type,
			comp_workForce,
			comp_emailAddress,
		} = this.state;

		await axios
			.put(`${AppConfiguration.url()}/api/insertData-company`, {
				companyName: comp_stablismentName,
				employerName: employerName,
				street: comp_street,
				zone: comp_zone,
				barangay: comp_barangay,
				contactNumber: comp_contactNumber,
				companyDescription: comp_description,
				companyImage: newFileName,
				acronym: comp_acronym,
				employerType: comp_type,
				workForce: comp_workForce,
				emailAddress: comp_emailAddress,
				userID: userSession,
				companyID: companySession,
			})
			.then(async (response) => {
				await this.props.changeCompanyProfile(newFileName, companySession);
				await this.props.setCompany(companyData);
				this.closeModal();
				this.setState({
					isModalOpen: false,
					isLoading: false,
				});
			});
	};

	redirectTo = (path) => {
		this.props.history.push(path);
	};

	setMonth = (stringMonth) => {
		this.setState({
			month: stringMonth,
		});
	};

	handleAcronym = async () => {
		await this.setState({
			comp_acronym: "(n/a)",
			hasAcronym: !this.state.hasAcronym,
		});
	};

	componentDidMount = async () => {
		const { company } = this.props;

		// Fetching Job Posts Data
		await axios
			.post(`${AppConfiguration.url()}/api/read-company-jobPost`, {
				companyID: company.CompanyID,
			})
			.then(async (response) => {
				if (response) {
					await this.setState({
						activeJobPost: response.data,
					});
				} else {
					console.log(`Error fetching information...`);
				}
			});

		await axios
			.post(`${AppConfiguration.url()}/api/read-job-applicant`, {
				companyID: company.CompanyID,
			})
			.then(async (response) => {
				await this.setState({
					jobApplicantLength: response.data,
				});
			});

		if (
			company.Company_Name === "" ||
			company.Company_Name === undefined ||
			company.Company_Name === null
		) {
			this.setState({
				isModalOpen: true,
			});
		}

		const currentMonth = new Date().getMonth() + 1;
		const MONTH = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		for (let index = 1; index <= 12; index++) {
			if (currentMonth === index) {
				this.setMonth(MONTH[index - 1]);
			}
		}

		const session = sessionStorage.getItem("UserID");

		if (!session) {
			localStorage.clear();
			this.props.history.push("/login");
		}

		localStorage.setItem("activePage", "dashboard");
		localStorage.setItem("isSearchOpen", false);
	};

	render() {
		const { currentUser, applicants, company } = this.props;
		const {
			jobApplicantLength,
			activeJobPost,
			hasAcronym,
			comp_stablismentName,
			comp_street,
			comp_zone,
			comp_barangay,
			comp_contactNumber,
			comp_description,
			comp_image,
			comp_acronym,
			comp_type,
			comp_workForce,
			comp_emailAddress,
			fileData,
			isLoading,
		} = this.state;
		const barangays = Resources.getBarangay();

		let newApplicants = 0;
		for (let a = 0; a < jobApplicantLength.length; a++) {
			if (jobApplicantLength[a].Status === "New") {
				newApplicants += 1;
			}
		}

		let barangayResources = barangays.map((barangay) => {
			return (
				<option key={barangay} value={barangay}>
					{barangay}
				</option>
			);
		});

		let numAvailableApplicants = 0;
		for (let a = 0; a < applicants.length; a++) {
			if (applicants[a].Hiring_Status === "Active") {
				numAvailableApplicants += 1;
			}
		}
		const userTypeSession = sessionStorage.getItem("UserType");
		let userType = "";
		if (userTypeSession === "Job Seeker") {
			userType = "jobseeker";
		} else {
			userType = "employer";
		}

		let activeJobPosts = 0;
		for (let a = 0; a < activeJobPost.length; a++) {
			if (activeJobPost[a].Active_Status === "Active") {
				activeJobPosts += 1;
			}
		}

		let hour = new Date().getHours();
		let mins = new Date().getMinutes();
		let ampm = "AM";

		if (hour > 12) {
			hour = hour - 12;
			ampm = "PM";
		}
		if (mins < 10) {
			mins = "0" + mins;
		}

		let greetings = "";
		const currentHour = new Date().getHours();
		if (currentHour >= 4 && currentHour < 11) {
			greetings = "Good Morning";
		} else if (currentHour >= 11 && currentHour < 13) {
			greetings = "Good Noon";
		} else if (currentHour >= 13 && currentHour < 18) {
			greetings = "Good Afternoon";
		} else if (currentHour >= 18 && currentHour <= 24) {
			greetings = "Good Evening";
		} else if (currentHour == 1 && currentHour < 4) {
			greetings = "Good Evening";
		} else {
			greetings = "Hi";
		}

		const now = hour + ":" + mins + " " + ampm;

		let isUpdateButtonEnable = true;

		if (
			comp_stablismentName === "" ||
			// comp_street === "" ||
			comp_zone === "" ||
			comp_barangay === "" ||
			comp_contactNumber === "" ||
			comp_description === "" ||
			comp_image === "" ||
			comp_acronym === "" ||
			comp_type === "" ||
			comp_workForce === "" ||
			comp_emailAddress === "" ||
			fileData === ""
		) {
			isUpdateButtonEnable = false;
		} else if (
			comp_stablismentName === null ||
			// comp_street === null ||
			comp_zone === null ||
			comp_barangay === null ||
			comp_contactNumber === null ||
			comp_description === null ||
			comp_image === null ||
			comp_acronym === null ||
			comp_type === null ||
			comp_workForce === null ||
			comp_emailAddress === null ||
			fileData === null
		) {
			isUpdateButtonEnable = false;
		}

		return (
			<>
				<div className='dashboard-container'>
					{company.companyName === "" ||
					company.Company_Name === "" ||
					company.Company_Name === null ? (
						<RegistrationForm
							handleCreateCompanyData={this.handleCreateCompanyData}
							closeModal={this.closeModal}
							handleChange={this.handleChange}
							handleAcronym={this.handleAcronym}
							handleFileChange={this.handleFileChange}
							isUpdateButtonEnable={isUpdateButtonEnable}
							barangayResources={barangayResources}
							hasAcronym={hasAcronym}
						/>
					) : (
						""
					)}
					<EmpGap />
					<EmpNavbar
						isSidebarOpen={this.props.isSidebarOpen}
						toggleSidebar={this.props.toggleSidebar}
						currentUser={currentUser}
						company={company}
						setCurrentUser={this.props.setCurrentUser}
						getJobApplicantsByCompany={
							this.props.getJobApplicantsByCompany
						}
						panel='Dashboard'
						darkTheme={this.props.darkTheme}
						setApplicants={this.props.setApplicants}
					/>
					<div className='dashboard-welcome-container'>
						<div className='dashboard-welcome-text'>
							<h3>{`${greetings} ${currentUser.First_Name} ${currentUser.Last_Name}, Welcome to the Dashboard!`}</h3>
							<p>
								Here are the updates that we got for you as of {now},{" "}
								{`${
									this.state.month
								} ${new Date().getDate()}, ${new Date().getFullYear()}`}
								.
							</p>
						</div>
						<div className='dashboard-welcome-content'>
							<div className='page-logo-container'>
								<div className='logo-background'></div>
								<img
									src={UpdatedResume}
									alt='Illustration'
									style={{ height: "110px" }}
								/>
							</div>
							<div className='dashboard-welcome-illustration-text'>
								<h3>
									Start searching for applicants who fit your job
									requirements!
								</h3>
								{/* <p>
								Lorem ipsum dolor sit amet consectetur, adipisicing
								elit. Aspernatur atque est enim, ut deserunt beatae.
							</p> */}
							</div>
						</div>
					</div>
					<div className='dashboard-update-container'>
						<h3>Daily Updates</h3>
						<div className='dashboard-update-card-container'>
							<div className='dashboard-update-card'>
								<div className='dashboard-update-card-content'>
									<h5>Available Job Seekers</h5>
									<h1>{numAvailableApplicants}</h1>
									<p>
										as of{" "}
										{`${
											this.state.month
										} ${new Date().getDate()}, ${new Date().getFullYear()}`}
									</p>
								</div>
								<div
									className='dashboard-update-card-link'
									onClick={() =>
										this.redirectTo(`/${userType}/search`)
									}>
									<h3>View</h3>
								</div>
							</div>
							<div className='dashboard-update-card'>
								<div className='dashboard-update-card-content'>
									<h5>Unread Job Applications</h5>
									<h1>{newApplicants}</h1>
									<p>
										as of{" "}
										{`${
											this.state.month
										} ${new Date().getDate()}, ${new Date().getFullYear()}`}
									</p>
								</div>
								<div
									className='dashboard-update-card-link'
									onClick={() =>
										this.redirectTo(`/${userType}/applicants`)
									}>
									<h3>View</h3>
								</div>
							</div>
							<div className='dashboard-update-card'>
								<div className='dashboard-update-card-content'>
									<h5>
										{activeJobPosts <= 1
											? "Total Active Job Post"
											: "Total Active Job Posts"}
									</h5>
									<h1>{activeJobPosts}</h1>
									<p>
										as of{" "}
										{`${
											this.state.month
										} ${new Date().getDate()}, ${new Date().getFullYear()}`}
									</p>
								</div>
								<div
									className='dashboard-update-card-link'
									onClick={() => this.redirectTo(`/${userType}/jobs`)}>
									<h3>View</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
				{isLoading && (
					<Loading
						role='Employer'
						message='Processing Registration Form...'
					/>
				)}
			</>
		);
	}
}

export default withRouter(Emp_Dashboard);
