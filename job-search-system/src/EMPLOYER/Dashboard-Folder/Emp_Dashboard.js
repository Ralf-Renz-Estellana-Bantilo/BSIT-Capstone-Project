import React, { Component } from "react";
import UpdatedResume from "../../Images/UpdatedResume.svg";
import Emp_Gap from "../Emp_Gap";
import "./Emp_Dashboard.css";
import Emp_Navbar from "../Emp_Navbar";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Footer from "../../JOBSEEKER/Home-Folder/Footer";
import Resources from "../../Resources";

export class Emp_Dashboard extends Component {
	state = {
		comp_stablismentName: "",
		comp_street: "",
		comp_zone: "",
		comp_barangay: "",
		comp_contactNumber: 0,
		comp_description: "",
		comp_image: null,
		company: [],
		companyJobPost: [],
		isModalOpen: false,
		activeJobPost: 0,
		jobApplicantLength: 0,
		month: "",
		fileData: null,
	};

	handleChange = (event, fieldName) => {
		this.setState({
			[fieldName]: event.target.value,
		});
	};

	handleFileChange = async (event) => {
		await this.setState({
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
		const companySession = sessionStorage.getItem("CompanyID");

		const {
			comp_stablismentName,
			comp_street,
			comp_zone,
			comp_barangay,
			comp_contactNumber,
			comp_description,
			fileData,
		} = this.state;

		const employerName = `${currentUser.First_Name} ${currentUser.Middle_Name} ${currentUser.Last_Name}`;

		const data = new FormData();
		data.append("image", fileData);

		const companyData = {
			Company_Name: comp_stablismentName,
			Employer_Name: employerName,
			Street: comp_street,
			Zone: comp_zone,
			Barangay: comp_barangay,
			Contact_Number: comp_contactNumber,
			Company_Description: comp_description,
			Company_Image: fileData.name,
			UserID: company.UserID,
			CompanyID: company.CompanyID,
		};

		await this.closeModal();
		await this.props.setCompany(companyData);

		await fetch("http://localhost:2000/api/upload-image", {
			method: "POST",
			body: data,
		})
			.then(async (result) => {
				console.log("The File has been Uploaded...");
				await this.props.changeCompanyProfile(
					fileData.name,
					companySession
				);
			})
			.catch((error) => {
				console.log("Multer Error!", error);

				this.setState({
					isModalOpen: false,
				});
			});

		await axios
			.put("http://localhost:2000/api/insertData-company", {
				companyName: comp_stablismentName,
				employerName: employerName,
				street: comp_street,
				zone: comp_zone,
				barangay: comp_barangay,
				contactNumber: comp_contactNumber,
				companyDescription: comp_description,
				companyImage: fileData.name,
				userID: company.UserID,
				companyID: company.CompanyID,
			})
			.then((response) => {
				console.log(response);

				this.setState({
					isModalOpen: false,
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

	componentDidMount = async () => {
		const { company } = this.props;
		// Fetching Company Data
		// await axios
		// 	.post("http://localhost:2000/api/read-company", {
		// 		userID: this.props.currentUser.UserID,
		// 	})
		// 	.then(async (response) => {
		// 		if (response.data.length === 1) {
		// 			await this.setState({
		// 				company: response.data[0],
		// 			});
		// 		} else {
		// 			console.log("Error fetching information...");
		// 		}
		// 	});

		// Fetching Job Posts Data
		await axios
			.post("http://localhost:2000/api/read-company-jobPost", {
				companyID: company.CompanyID,
			})
			.then(async (response) => {
				if (response) {
					await this.setState({
						activeJobPost: response.data.length,
					});
				} else {
					console.log("Error fetching information...");
				}
			});

		await axios
			.post("http://localhost:2000/api/read-job-applicant", {
				companyID: company.CompanyID,
			})
			.then(async (response) => {
				await this.setState({
					jobApplicantLength: response.data.length,
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

		for (let index = 1; index < 12; index++) {
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
		const { currentUser, jobApplicants, applicants, company } = this.props;
		const { jobApplicantLength } = this.state;
		const barangays = Resources.getBarangay();

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

		return (
			<div className='dashboard-container'>
				{/* {this.state.isModalOpen === true ? ( */}
				{company.companyName === "" ||
				company.Company_Name === "" ||
				company.companyName === null ||
				company.Company_Name === null ? (
					<div className='employer-register-company-container'>
						<div className='employer-register-overlay' />
						<form
							className='register-form'
							onSubmit={(e) => this.handleCreateCompanyData(e)}>
							<h3 onClick={this.closeModal}>Business Registration</h3>
							<div className='register-field'>
								<label>Business Stablishment Name:</label>
								<input
									autoFocus
									type='text'
									placeholder='Set Stablishment Name'
									onChange={(e) =>
										this.handleChange(e, "comp_stablismentName")
									}
								/>
							</div>
							<div className='register-field'>
								<label>Business Stablishment Location:</label>
								<input
									type='text'
									placeholder='Input Street'
									onChange={(e) => this.handleChange(e, "comp_street")}
								/>
								<select
									defaultValue=''
									onChange={(e) => this.handleChange(e, "comp_zone")}>
									<option disabled='disabled' hidden='hidden' value=''>
										Select Zone
									</option>
									<option value='Zone 1'>Zone 1</option>
									<option value='Zone 2'>Zone 2</option>
									<option value='Zone 3'>Zone 3</option>
									<option value='Zone 4'>Zone 4</option>
									<option value='Zone 5'>Zone 5</option>
									<option value='Zone 6'>Zone 6</option>
								</select>
								<select
									defaultValue=''
									onChange={(e) =>
										this.handleChange(e, "comp_barangay")
									}>
									<option disabled='disabled' hidden='hidden' value=''>
										Select Barangay
									</option>
									{barangayResources}
								</select>
							</div>
							<div className='register-field'>
								<label>Contact Number:</label>
								<input
									type='number'
									placeholder='Enter Contact Number'
									onChange={(e) =>
										this.handleChange(e, "comp_contactNumber")
									}
								/>
							</div>
							<div className='register-field'>
								<label>Business Stablishment Description:</label>
								<textarea
									placeholder='Describe what your business does..'
									onChange={(e) =>
										this.handleChange(e, "comp_description")
									}
									rows='5'
								/>
							</div>
							<div className='register-field'>
								<label>Stablishment Photo:</label>
								<input type='file' onChange={this.handleFileChange} />
							</div>
							<button onClick={(e) => this.handleCreateCompanyData(e)}>
								Continue
							</button>
						</form>
					</div>
				) : (
					""
				)}

				<Emp_Gap />
				<Emp_Navbar
					isSidebarOpen={this.props.isSidebarOpen}
					toggleSidebar={this.props.toggleSidebar}
					handleLogout={this.props.handleLogout}
					currentUser={currentUser}
					company={company}
					setCurrentUser={this.props.setCurrentUser}
					getJobApplicantsByCompany={this.props.getJobApplicantsByCompany}
					panel='Dashboard'
					darkTheme={this.props.darkTheme}
				/>

				<div className='dashboard-welcome-container'>
					<div className='dashboard-welcome-text'>
						<h3>{`Hi ${currentUser.First_Name} ${currentUser.Last_Name}, Welcome to the Dashboard...`}</h3>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
					</div>
					<div className='dashboard-welcome-content'>
						<div className='page-logo-container'>
							<div className='logo-background'></div>
							<img
								src={UpdatedResume}
								alt='Illustration'
								style={{ height: "100px" }}
							/>
						</div>
						<div className='dashboard-welcome-illustration-text'>
							<h3>
								Lorem ipsum dolor sit amet consectetur adipisicing.
							</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing
								elit. Aspernatur atque est enim, ut deserunt beatae.
							</p>
						</div>
					</div>
				</div>

				<div className='dashboard-update-container'>
					<h3>Daily Updates</h3>
					<div className='dashboard-update-card'>
						<div className='dashboard-update-card-content'>
							<h5>Available Applicants</h5>
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
							onClick={() => this.redirectTo(`/${userType}/search`)}>
							<h3>View</h3>
						</div>
					</div>

					<div className='dashboard-update-card'>
						<div className='dashboard-update-card-content'>
							<h5>Job Applicants</h5>
							<h1>{jobApplicantLength}</h1>
							<p>
								as of{" "}
								{`${
									this.state.month
								} ${new Date().getDate()}, ${new Date().getFullYear()}`}
							</p>
						</div>
						<div
							className='dashboard-update-card-link'
							onClick={() => this.redirectTo(`/${userType}/applicants`)}>
							<h3>View</h3>
						</div>
					</div>
					<div className='dashboard-update-card'>
						<div className='dashboard-update-card-content'>
							<h5>Total Active Job Post/s</h5>
							<h1>{this.state.activeJobPost}</h1>
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
		);
	}
}

export default withRouter(Emp_Dashboard);
