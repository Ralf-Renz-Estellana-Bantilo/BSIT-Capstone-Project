import React, { Component } from "react";
import { Link } from "react-router-dom";
import TimeStamp from "../../TimeStamp";
import "./ApplicationForm.css";
import LeftArrow from "../../Images/LeftArrow.png";
import Modal from "../Home-Folder/Modal";
import { withRouter } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "../../Images/DeleteIcon.png";
import Resources from "../../Resources";
import AppConfiguration from "../../AppConfiguration";
import Loading from "../../Loading";

export class ApplicationForm extends Component {
	state = {
		seeMore: false,
		isValid: true,
		post: {},
		applicantID: "",
		isModalOpen: false,
		isDeleteModalOpen: false,
		firstName: "",
		middleName: "",
		lastName: "",
		role: "",
		homeAddress: "",
		sex: "",
		bMonth: "",
		bDay: "",
		bYear: "",
		contactNumber: "",
		email: "",
		civilStatus: "",
		educationalAttainment: "",
		resume: null,
		fileData: null,
		userImage: "",
		applicants: [],
		height: 0,
		targetDeleteJobID: null,

		// newly added fields
		disability: "",
		employmentStatus: "",
		employmentType: "",
		isLoading: false,
	};

	filterObject = () => {
		this.props.infos.map((info) => {
			if (info.JobID === this.props.targetCompany) {
				this.setState({
					post: {
						JobID: info.JobID,
						CompanyID: info.CompanyID,
						Company_Name: info.Company_Name,
						Minutes: info.Minutes,
						Hour: info.Hour,
						Day: info.Day,
						Month: info.Month,
						Year: info.Year,
						Company_Address: info.Company_Address,
						Job_Title: info.Job_Title,
						Category: info.Category,
						Required_Employees: info.Required_Employees,
						Minimum_Salary: info.Minimum_Salary,
						Maximum_Salary: info.Maximum_Salary,
						Job_Type: info.Job_Type,
						Civil_Status: info.Civil_Status,
						Preferred_Sex: info.Preferred_Sex,
						Job_Qualifications: info.Job_Qualifications,
						Job_Requirements: info.Job_Requirements,
						Job_Description: info.Job_Description,
						Employer_Name: info.Employer_Name,
						Company_Image: info.Company_Image,
						Active_Status: info.Active_Status,
						Work_Place: info.Work_Place,
						Contact_Person_Name: info.Contact_Person_Name,
						Contact_Person_Position: info.Contact_Person_Position,
						Contact_Person_Number: info.Contact_Person_Number,
						Contact_Person_Email: info.Contact_Person_Email,
					},
					targetDeleteJobID: info.JobID,
				});
			}
		});
	};

	handleSubmit = async () => {
		const {
			lastName,
			firstName,
			middleName,
			applicantID,
			homeAddress,
			sex,
			civilStatus,
			bMonth,
			bDay,
			bYear,
			contactNumber,
			email,
			educationalAttainment,
			resume,
			fileData,
			userImage,
			post,
			disability,
			employmentStatus,
			employmentType,
		} = this.state;

		const { activePage } = this.props;

		try {
			let newFileName = "";
			if (fileData !== null) {
				this.setState({
					isLoading: true,
				});
				this.onCloseModal();

				const data = new FormData();
				data.append("file", fileData);
				data.append("upload_preset", "job-search-catarman-asset");
				data.append("api_key", "326167851291639");
				data.append("api_secret", "6G0fgOrs47qz1FWrkNuz-E_FQJQ");

				await axios
					.post(
						"https://api.cloudinary.com/v1_1/doprewqnx/image/upload",
						data
					)
					.then(async (res) => {
						console.log(res.data.secure_url);
						newFileName = res.data.secure_url;
						this.setState({
							isLoading: false,
						});
					});
			} else if (
				(fileData === null && resume !== undefined) ||
				resume !== null
			) {
				this.setState({
					isLoading: false,
				});
				newFileName = resume;
			}

			let applicantData = {
				jobID: post.JobID,
				companyID: post.CompanyID,
				applicantID: applicantID,
				jobTitle: post.Job_Title,
				firstName: firstName,
				middleName: middleName,
				lastName: lastName,
				homeAddress: homeAddress,
				sex: sex,
				bMonth: bMonth,
				bDay: bDay,
				bYear: bYear,
				contactNumber: contactNumber,
				email: email,
				civilStatus: civilStatus,
				educationalAttainment: educationalAttainment,
				resume: newFileName,
				userImage: userImage,
				disability: disability,
				employmentStatus: employmentStatus,
				employmentType: employmentType,
				min: new Date().getMinutes(),
				hour: new Date().getHours(),
				day: new Date().getDate(),
				month: new Date().getMonth() + 1,
				year: new Date().getFullYear(),
				fileData: null,
			};
			await this.props.addJobApplicants(applicantData);
			await this.props.handleApplication(this.props.targetCompany);
			this.props.history.push(`/jobseeker/${activePage}`);
		} catch (error) {
			alert(error);
			this.setState({
				isLoading: false,
			});
		}
	};

	viewModal = () => {
		try {
			const {
				lastName,
				firstName,
				middleName,
				homeAddress,
				sex,
				civilStatus,
				bMonth,
				bDay,
				bYear,
				contactNumber,
				email,
			} = this.state;
			if (
				lastName === "" ||
				middleName === "" ||
				firstName === "" ||
				homeAddress === "" ||
				sex === "" ||
				civilStatus === "" ||
				bMonth === "" ||
				bDay === "" ||
				bYear === "" ||
				contactNumber === "" ||
				email === ""
			) {
				this.setState({
					isValid: false,
				});
			} else {
				this.setState({
					isModalOpen: true,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	viewDeleteModal = () => {
		this.setState({
			isDeleteModalOpen: true,
		});
	};

	onCloseModal = () => {
		this.setState({
			isModalOpen: false,
		});
	};

	onDeleteCloseModal = () => {
		this.setState({
			isDeleteModalOpen: false,
		});
	};

	handleDeleteAppliedJob = () => {
		const { applicants, targetDeleteJobID } = this.state;
		const applicantSession = sessionStorage.getItem("ApplicantID");
		let filteredApplicant = applicants.filter(
			(applicant) => applicant.ApplicantID === applicantSession
		);

		this.props.deleteAppliedJob(
			filteredApplicant[0].ApplicantID,
			targetDeleteJobID
		);
	};

	locateData = async () => {
		await axios
			.get(`${AppConfiguration.url()}/api/read-applicant-data`)
			.then((response) => {
				this.setState({
					applicants: response.data,
				});
			});
	};

	handleChange = async (event, fieldName) => {
		await this.setState({
			[fieldName]: event.target.value,
			isValid: true,
		});
	};

	handleFileChange = (event) => {
		try {
			this.setState({
				resume: event.target.files[0].name,
				fileData: event.target.files[0],
			});
		} catch (error) {
			console.log(error);
		}
	};

	componentDidMount = async () => {
		window.scrollTo(0, 0);
		await this.filterObject();
		await this.locateData();

		let height = 0;
		try {
			height = this.divElement.clientHeight;
			this.setState({ height });
		} catch (error) {
			this.setState({ height });
		}

		const session = sessionStorage.getItem("UserID");
		const applicantSession = sessionStorage.getItem("ApplicantID");
		const { post } = this.state;
		const { activePage } = this.props;

		if (!session) {
			localStorage.clear();
			this.props.history.push("/login");
		}

		// Fetching Job Applicant ID of the Current User
		await axios
			.post(`${AppConfiguration.url()}/api/get-applicantID`, {
				userID: session,
			})
			.then(async (response) => {
				if (response.data.length === 1) {
					await this.setState({
						applicantID: response.data[0].ApplicantID,
					});
				}
			});

		if (`${activePage}` === `profile`) {
			// Fetching Job Applicant Data
			await axios
				.post(`${AppConfiguration.url()}/api/read-specific-job-applicant`, {
					applicantID: applicantSession,
					companyID: post.CompanyID,
					jobID: post.JobID,
				})
				.then(async (response) => {
					if (response.data.length === 1) {
						await this.setState({
							firstName: response.data[0].First_Name,
							middleName: response.data[0].Middle_Name,
							lastName: response.data[0].Last_Name,
							role: response.data[0].Role,
							homeAddress: response.data[0].Home_Address,
							sex: response.data[0].Sex,
							bMonth: response.data[0].B_Month,
							bDay: response.data[0].B_Day,
							bYear: response.data[0].B_Year,
							contactNumber: response.data[0].Contact_Number,
							email: response.data[0].Email_Address,
							civilStatus: response.data[0].Civil_Status,
							educationalAttainment: response.data[0].Educ_Attainment,
							userImage: response.data[0].User_Image,
							resume: response.data[0].Resume,
							disability: response.data[0].Disability,
							employmentStatus: response.data[0].Employment_Status,
							employmentType: response.data[0].Employment_Type,
						});
					}
				});
		} else {
			const applicantSession = sessionStorage.getItem("ApplicantID");
			this.state.applicants.map((applicant) => {
				if (applicant.ApplicantID === applicantSession) {
					this.setState({
						firstName: applicant.First_Name,
						middleName: applicant.Middle_Name,
						lastName: applicant.Last_Name,
						role: applicant.Role,
						homeAddress: applicant.Home_Address,
						sex: applicant.Sex,
						bMonth: applicant.B_Month,
						bDay: applicant.B_Day,
						bYear: applicant.B_Year,
						contactNumber: applicant.Contact_Number,
						email: applicant.Email_Address,
						civilStatus: applicant.Civil_Status,
						educationalAttainment: applicant.Educ_Attainment,
						disability: applicant.Disability,
						employmentStatus: applicant.Employment_Status,
						employmentType: applicant.Employment_Type,
						userImage: this.props.currentUser.User_Image,
					});
				}
			});
		}

		if (!post.JobID) {
			this.props.history.push(`/jobseeker/${activePage}`);
		}
	};

	static defaultProps = {
		day: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
			21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
		],
		year: [
			1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
			2002, 2003, 2004, 2005, 2006, 2007, 2008,
		],
	};

	formatCompanyAddress = () => {
		const { Company_Address } = this.state.post;
		let place = `${Company_Address}`.split(", ");
		let formattedPlace = "";

		if (place.length === 1) {
			formattedPlace = Company_Address;
		} else {
			if (place[0] === "" && place[1] !== "Not Specified") {
				formattedPlace = place[1] + ", " + place[2];
			} else if (place[0] !== "" && place[1] === "Not Specified") {
				formattedPlace = place[0] + ", " + place[2];
			} else if (place[0] === "" && place[1] === "Not Specified") {
				formattedPlace = place[2];
			} else {
				formattedPlace = Company_Address;
			}
		}

		return formattedPlace;
	};

	render() {
		let birthDay = this.props.day.map((day) => {
			return (
				<option key={day} value={day}>
					{day}
				</option>
			);
		});

		const companyAddress = this.formatCompanyAddress();

		const { activePage, darkTheme, employerFeedback, numApplicants } =
			this.props;
		const {
			lastName,
			firstName,
			middleName,
			homeAddress,
			sex,
			civilStatus,
			bMonth,
			bDay,
			bYear,
			contactNumber,
			email,
			educationalAttainment,
			resume,
			post,
			height,
			disability,
			employmentStatus,
			employmentType,
			userImage,
			isLoading,
		} = this.state;

		let filteredCandidate = numApplicants.filter(
			(numApplicant) => numApplicant.JobID === post.JobID
		);
		let filteredHiredCandidate = numApplicants.filter(
			(numApplicant) =>
				numApplicant.JobID === post.JobID &&
				numApplicant.Candidate_Status === "Hired"
		);

		let applicationStatus = "";
		// feedback checking
		for (let a = 0; a < employerFeedback.length; a++) {
			if (
				employerFeedback[a].JobID === post.JobID &&
				employerFeedback[a].Status === "Seen"
			) {
				applicationStatus = employerFeedback[a].Application_Status;
			}
		}

		if (applicationStatus === "" && post.Active_Status === "Active") {
			applicationStatus = "Pending...";
		}

		if (applicationStatus === "" && post.Active_Status === "Closed") {
			applicationStatus = "Closed";
		}

		let isUpdateButtonEnable = true;
		if (
			firstName === "" ||
			middleName === "" ||
			lastName === "" ||
			sex === "" ||
			contactNumber === "" ||
			email === "" ||
			homeAddress === "" ||
			bMonth === "" ||
			bDay === "" ||
			bYear === "" ||
			civilStatus === "" ||
			educationalAttainment === "" ||
			disability === "" ||
			employmentStatus === "" ||
			employmentType === ""
		) {
			isUpdateButtonEnable = false;
		} else if (
			firstName === null ||
			middleName === null ||
			lastName === null ||
			sex === null ||
			contactNumber === null ||
			email === null ||
			homeAddress === null ||
			bMonth === null ||
			bDay === null ||
			bYear === null ||
			civilStatus === null ||
			educationalAttainment === null ||
			disability === null ||
			employmentStatus === null ||
			employmentType === null
		) {
			isUpdateButtonEnable = false;
		}

		try {
			if (
				userImage.includes("jntowv75wyhkqvy4o1xu") ||
				userImage.includes("g1r50cq1kbhqaccw7gwk")
			) {
				alert("You need to change your profile picture first!");
				isUpdateButtonEnable = false;
			}
		} catch (error) {}

		const resumeName = `${resume}`.split("/")[
			`${resume}`.split("/").length - 1
		];

		return (
			<>
				{isLoading && (
					<Loading message={"Processing Application Form..."} />
				)}
				<div className='application-form-container'>
					<Link to={`/jobseeker/${activePage}`}>
						<div className='back-icon-container'>
							<img
								src={LeftArrow}
								alt='back'
								title='Go Back'
								className='back-icon'
								style={
									darkTheme
										? { filter: "brightness(1)" }
										: { filter: "brightness(0.3)" }
								}
							/>
						</div>
					</Link>
					{/* {`${activePage}` === "profile" &&
					applicationStatus !== "Pending..." && (
						<div className='application-form-delete-container'>
							<img
								src={DeleteIcon}
								alt='Delete'
								title='Delete Applied Job'
								style={
									darkTheme
										? { filter: "brightness(1)" }
										: { filter: "brightness(0.3)" }
								}
								onClick={this.viewDeleteModal}
							/>
						</div>
					)} 

					{this.state.isDeleteModalOpen ? (
						<Modal
							headText='Delete Applied Job Confirmation'
							modalText='Continue Deleting Job Application?'
							confirmText='Delete'
							closeText='Cancel'
							close={this.onDeleteCloseModal}
							confirm={this.handleDeleteAppliedJob}
							path={`/jobseeker/${activePage}`}
						/>
					) : (
						""
					)} */}

					<div className='company-img'>
						<div className='company-img-wrapper'>
							<img
								src={post.Company_Image}
								// src={`${AppConfiguration.url()}/assets/images/${
								// 	post.Company_Image
								// }`}
								alt='Company Picture'
							/>
						</div>
						<Link
							to={`/jobseeker/${activePage}/company-profile`}
							onClick={() => {
								this.props.setCompanyID(post.CompanyID);
							}}>
							<h2>{post.Company_Name}</h2>
						</Link>
					</div>
					<div className='preview-container'>
						<div className='preview-wrapper'>
							<div className='post-content'>
								<div className='post-content-header'>
									<h3 className='job-title'>{post.Job_Title}</h3>

									<div className='apply-detail-container'>
										<div className='apply-detail'>
											<p>Job Category:</p>
											<h4>{post.Category}</h4>
										</div>
										<div className='apply-detail'>
											<p>Date Posted:</p>
											<h4>
												{TimeStamp.setTimeStamp(
													post.Minutes,
													post.Hour,
													post.Day,
													post.Month,
													post.Year
												)}
											</h4>
										</div>
										<div className='apply-detail'>
											<p>Company Address :</p>
											<h4>{companyAddress}, Catarman</h4>
										</div>
										<div className='apply-detail'>
											<p>Place of Work :</p>
											<h4>
												{post.Work_Place === post.Company_Address
													? "Company Location"
													: post.Work_Place}
											</h4>
										</div>
										<div className='apply-detail'>
											<p>Vacancy Count:</p>
											<h4>{post.Required_Employees}</h4>
										</div>
										{/* <div className='apply-detail'>
											<p>Applied | Hired:</p>
											<h4>
												{filteredCandidate.length} •{" "}
												{filteredHiredCandidate.length}
											</h4>
										</div> */}
										<div className='apply-detail'>
											<p>Applications Recieved:</p>
											<h4>{filteredCandidate.length}</h4>
										</div>
										<div className='apply-detail'>
											<p>Applicants Hired:</p>
											<h4>{filteredHiredCandidate.length}</h4>
										</div>
										<div className='apply-detail'>
											<p>Salary Range:</p>
											<h4>
												₱{" "}
												{Resources.formatMoney(
													`${post.Minimum_Salary}`
												)}{" "}
												- ₱{" "}
												{Resources.formatMoney(
													`${post.Maximum_Salary}`
												)}
											</h4>
										</div>
										<div className='apply-detail'>
											<p>Nature of Work:</p>
											<h4>{post.Job_Type}</h4>
										</div>
										<div className='apply-detail'>
											<p>Civil Status:</p>
											<h4>{post.Civil_Status}</h4>
										</div>
										<div className='apply-detail'>
											<p>Preferred Gender:</p>
											<h4>{post.Preferred_Sex}</h4>
										</div>
										<div className='apply-detail'>
											<p>Job Vacancy Deadline:</p>
											<h4>Not Set</h4>
										</div>
										<div className='apply-detail'>
											<p>Job Vacancy Status:</p>
											<div
												className='active-circle'
												style={
													post.Active_Status === "Active"
														? { backgroundColor: "#00ff40" }
														: { backgroundColor: "#ff0000" }
												}></div>
											<h4
												style={{
													position: "relative",
													left: "5px",
												}}>
												{post.Active_Status}
											</h4>
										</div>
									</div>
								</div>

								<div
									className='post-content-body'
									style={
										!this.state.seeMore
											? { height: "0px" }
											: { height: `${height}px` }
									}>
									<div
										className='post-more-info'
										ref={(divElement) => {
											this.divElement = divElement;
										}}>
										<div className='job-qualification-portion'>
											<h3>HIRING REQUIREMENTS</h3>
											<p>{post.Job_Qualifications}</p>
										</div>
										{/* <div className='job-qualification-portion'>
											<h3>JOB REQUIREMENTS</h3>
											<p>{post.Job_Requirements}</p>
										</div> */}
										<div className='job-qualification-portion'>
											<h3>JOB DESCRIPTION</h3>
											<p>{post.Job_Description}</p>
										</div>

										{/* <h2>Employer's Name: {post.Employer_Name}</h2> */}
										{post.Contact_Person_Name === null ? (
											// <h2 style={{ marginBottom: "10px" }}>
											// 	Employer's Name: {post.Employer_Name}
											// </h2>
											<></>
										) : (
											<>
												<div className='job-qualification-portion'>
													<h3>CONTACT PERSON</h3>
												</div>
												<h2 style={{ marginTop: "0px" }}>
													Full Name:{" "}
													<u>{post.Contact_Person_Name}</u>
												</h2>
												<h2 style={{ marginTop: "0px" }}>
													Position:{" "}
													<u>{post.Contact_Person_Position}</u>
												</h2>
												<h2 style={{ marginTop: "0px" }}>
													Contact Number:{" "}
													<u>{post.Contact_Person_Number}</u>
												</h2>
												<h2
													style={{
														marginTop: "0px",
														marginBottom: "10px",
													}}>
													Email Address:{" "}
													<u>{post.Contact_Person_Email}</u>
												</h2>
											</>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className='btn'>
							<button
								onClick={() => {
									this.setState({
										seeMore: !this.state.seeMore,
									});
								}}>
								{this.state.seeMore ? "See Less" : "See More"}
							</button>
						</div>
					</div>
					<div className='application-form'>
						<h2>APPLICATION FORM</h2>
						<form
							className='app-form'
							onSubmit={(e) => {
								e.preventDefault();
								this.viewModal();
							}}>
							<div className='fields'>
								<div className='group-field'>
									<div className='field'>
										<label>First Name: </label>
										<input
											name='firstName'
											type='text'
											placeholder='First Name'
											value={firstName}
											onChange={(e) => {
												this.handleChange(e, "firstName");
											}}
											disabled={
												`${activePage}` === "profile" && "disable"
											}
										/>
									</div>
									<div className='field'>
										<label>Middle Name: </label>
										<input
											type='text'
											placeholder='Middle Name'
											value={middleName}
											onChange={(e) => {
												this.handleChange(e, "middleName");
											}}
											disabled={
												`${activePage}` === "profile" && "disable"
											}
										/>
									</div>
								</div>
								<div className='group-field'>
									<div className='field'>
										<label>Last Name: </label>
										<input
											type='text'
											placeholder='Last Name'
											value={lastName}
											onChange={(e) => {
												this.handleChange(e, "lastName");
											}}
											disabled={
												`${activePage}` === "profile" && "disable"
											}
										/>
									</div>
									<div className='field'>
										<label>Home Address: </label>
										<input
											type='text'
											placeholder='Home Address'
											value={homeAddress}
											onChange={(e) => {
												this.handleChange(e, "homeAddress");
											}}
											disabled={
												`${activePage}` === "profile" && "disable"
											}
										/>
									</div>
								</div>
								<div className='group-field'>
									<div className='field'>
										<label>Gender: </label>
										<select
											value={sex}
											onChange={(e) => {
												this.handleChange(e, "sex");
											}}
											disabled={
												`${activePage}` === "profile" && "disable"
											}>
											<option
												disabled='disabled'
												hidden='hidden'
												value=''>
												Select Gender
											</option>
											<option value='Male'>Male</option>
											<option value='Female'>Female</option>
											<option value='Gay'>Gay</option>
											<option value='Lesbian'>Lesbian</option>
										</select>
									</div>
									<div className='field'>
										<label>Civil Status: </label>
										<select
											disabled={
												`${activePage}` === "profile" && "disable"
											}
											onChange={(e) => {
												this.handleChange(e, "civilStatus");
											}}
											value={civilStatus}>
											<option
												disabled='disabled'
												hidden='hidden'
												value=''>
												Select Civil Status
											</option>
											<option value='Single'>Single</option>
											<option value='Married'>Married</option>
											<option value='Widowed'>Widowed</option>
											<option value='Separated'>Separated</option>
											<option value='Live-in'>Live-in</option>
										</select>
									</div>
								</div>
								<div className='group-field'>
									<div className='field'>
										<label>Date of Birth: </label>
										<div className='birthdate'>
											<select
												value={bMonth}
												onChange={(e) => {
													this.handleChange(e, "bMonth");
												}}
												disabled={
													`${activePage}` === "profile" &&
													"disable"
												}>
												<option
													disabled='disabled'
													hidden='hidden'
													value=''>
													Month
												</option>
												<option value={1}>January</option>
												<option value={2}>February</option>
												<option value={3}>March</option>
												<option value={4}>April</option>
												<option value={5}>May</option>
												<option value={6}>June</option>
												<option value={7}>July</option>
												<option value={8}>August</option>
												<option value={9}>September</option>
												<option value={10}>October</option>
												<option value={11}>November</option>
												<option value={12}>December</option>
											</select>

											<select
												value={bDay}
												onChange={(e) => {
													this.handleChange(e, "bDay");
												}}
												disabled={
													`${activePage}` === "profile" &&
													"disable"
												}>
												<option
													disabled='disabled'
													hidden='hidden'
													value=''>
													Day
												</option>
												{birthDay}
											</select>

											{/* <select
										value={bYear}
										onChange={(e) => {
											this.handleChange(e, "bYear");
										}}
										disabled={
											`${activePage}` === "profile" && "disable"
										}>
										<option disabled='disabled' hidden='hidden'>
											Year
										</option>
										{birthYear}
									</select> */}
											<input
												type='number'
												placeholder='Year'
												style={{ width: "80px" }}
												value={bYear === 0 ? "" : bYear}
												disabled={
													`${activePage}` === "profile" &&
													"disable"
												}
												onChange={(e) => {
													this.handleChange(e, "bYear");
												}}
											/>
										</div>
									</div>
									<div className='field'>
										<label>Employment Status/Type: </label>
										<div className='employment-status-fields'>
											<select
												value={employmentStatus}
												onChange={(e) => {
													this.handleChange(e, "employmentStatus");
												}}
												disabled={
													`${activePage}` === "profile" &&
													"disable"
												}>
												<option
													disabled='disabled'
													hidden='hidden'
													value=''>
													Select Status
												</option>
												<option value='Employed'>Employed</option>
												<option value='Unemployed'>
													Unemployed
												</option>
											</select>
											<select
												value={employmentType}
												onChange={(e) => {
													this.handleChange(e, "employmentType");
												}}
												disabled={
													`${activePage}` === "profile" &&
													"disable"
												}>
												<option
													disabled='disabled'
													hidden='hidden'
													value=''>
													Select Type
												</option>
												{employmentStatus === "Employed" ? (
													<>
														<option value='Wage Employed'>
															Wage Employed
														</option>
														<option value='Self Employed'>
															Self Employed
														</option>
													</>
												) : (
													<>
														<option value='Not Specified'>
															Not Specified
														</option>
														<option value='Fresh Graduate'>
															Fresh Graduate
														</option>
														<option value='Finished Contract'>
															Finished Contract
														</option>
														<option value='Resigned'>
															Resigned
														</option>
														<option value='Retired'>
															Retired
														</option>
														{/* <option value='Others'>Others</option> */}
													</>
												)}
											</select>
										</div>
									</div>
								</div>

								<div className='group-field'>
									<div className='field'>
										<label>Contact Number: </label>
										<input
											type='text'
											placeholder='Contact Number'
											value={contactNumber}
											onChange={(e) => {
												this.handleChange(e, "contactNumber");
											}}
											disabled={
												`${activePage}` === "profile" && "disable"
											}
										/>
									</div>
									<div className='field'>
										<label>Email Address: </label>
										<input
											type='email'
											placeholder='Email Address'
											value={email}
											onChange={(e) => {
												this.handleChange(e, "email");
											}}
											disabled={
												`${activePage}` === "profile" && "disable"
											}
										/>
									</div>
								</div>
								<div className='group-field'>
									<div className='field'>
										<label>Disability: </label>
										<select
											value={disability}
											onChange={(e) => {
												this.handleChange(e, "disability");
											}}
											disabled={
												`${activePage}` === "profile" && "disable"
											}>
											<option
												disabled='disabled'
												hidden='hidden'
												value=''>
												Select Disability
											</option>
											<option value='None'>None</option>
											<option value='Visual'>Visual</option>
											<option value='Hearing'>Hearing</option>
											<option value='Speech'>Speech</option>
											<option value='Physical'>Physical</option>
											<option value='Others'>Others</option>
										</select>
									</div>
									<div className='field'>
										<label>
											{`${activePage}` === "profile"
												? "Resume:"
												: "Attach your resume here: (PDF only)"}
										</label>

										{`${activePage}` === "profile" ? (
											<input
												type='text'
												value={
													resumeName !== "null"
														? resumeName
														: "No attached file"
												}
												disabled={
													`${activePage}` === "profile" &&
													"disable"
												}
											/>
										) : (
											<input
												accept='application/pdf'
												// 	accept='application/pdf,application/msword,
												// application/vnd.openxmlformats-officedocument.wordprocessingml.document'
												type='file'
												disabled={
													`${activePage}` === "profile" &&
													"disable"
												}
												onChange={(e) => {
													this.handleFileChange(e);
												}}
												style={darkTheme ? {} : { color: "black" }}
											/>
										)}
									</div>
								</div>
								<div className='field'>
									<label>Educational Attainment: </label>
									<input
										type='text'
										placeholder='Educational Attainment'
										value={educationalAttainment}
										onChange={(e) => {
											this.handleChange(e, "educationalAttainment");
										}}
										disabled={
											`${activePage}` === "profile" && "disable"
										}
									/>
									{/* <label>Highest Educational Attainment: </label>
									<select
										value={educationalAttainment}
										onChange={(e) => {
											this.handleChange(e, "educationalAttainment");
										}}
										disabled={
											`${activePage}` === "profile" && "disable"
										}>
										<option
											disabled='disabled'
											hidden='hidden'
											value=''>
											Select Educ. Attainment
										</option>
										<option value='Elementary Undergraduate'>
											Elementary Undergraduate
										</option>
										<option value='Elementary Graduate'>
											Elementary Graduate
										</option>
										<option value='JHS Undergraduate'>
											JHS Undergraduate
										</option>
										<option value='JHS Graduate'>JHS Graduate</option>
										<option value='SHS Undergraduate'>
											SHS Undergraduate
										</option>
										<option value='SHS Graduate'>SHS Graduate</option>
										<option value='College Undergraduate'>
											College Undergraduate
										</option>
										<option value='College Graduate'>
											College Graduate
										</option>
									</select> */}
								</div>
							</div>

							{!this.state.isValid && (
								<p
									style={{
										textAlign: "center",
										padding: "10px",
										backgroundColor: "red",
										marginTop: "20px",
										fontSize: "12px",
									}}>
									Fill-in all the necessary fields!
								</p>
							)}

							{post.Active_Status ? (
								<button
									onClick={(e) => {
										e.preventDefault();
										this.viewModal();
									}}
									disabled={
										`${activePage}` === "profile"
											? "disabled"
											: `${activePage}` !== "profile" &&
											  !isUpdateButtonEnable
											? "disable"
											: ""
									}
									style={
										`${activePage}` === "profile"
											? { opacity: "0.3" }
											: `${activePage}` !== "profile" &&
											  !isUpdateButtonEnable
											? { opacity: "0.3" }
											: { opacity: "1" }
									}>
									{`${activePage}` === "profile"
										? "Application Sent"
										: "Send Application"}
								</button>
							) : (
								""
							)}

							{this.state.isModalOpen ? (
								<Modal
									headText='Confirmation Dialog'
									modalText='Continue sending your application?'
									confirmText='Send'
									closeText='Cancel'
									close={this.onCloseModal}
									confirm={this.handleSubmit}
									path={`/jobseeker/home/application-form`}
								/>
							) : (
								""
							)}
						</form>
					</div>
					{`${activePage}` === "profile" && (
						<div
							className='application-status-container'
							style={
								applicationStatus === "Hired"
									? {
											padding: "10px",
											borderRadius: "5px",
											background:
												"linear-gradient(20deg, #00f33d, #88ff00)",
									  }
									: applicationStatus === "Declined"
									? {
											padding: "10px",
											borderRadius: "5px",
											background:
												"linear-gradient(20deg, #ff004c, #ff7b00)",
									  }
									: applicationStatus === "Meet"
									? {
											padding: "10px",
											borderRadius: "5px",
											background:
												"linear-gradient(20deg, #00b2ff, #006aff)",
									  }
									: {}
							}>
							<p
								style={
									applicationStatus === "Hired"
										? {
												color: "#1f1f1f",
										  }
										: {}
								}>
								Application Status:
							</p>
							<h3
								style={
									applicationStatus === "Hired"
										? {
												color: "#121212",
										  }
										: {}
								}>
								{applicationStatus === "Meet"
									? "Scheduled for an interview"
									: applicationStatus}
							</h3>
						</div>
					)}
				</div>
			</>
		);
	}
}

export default withRouter(ApplicationForm);
