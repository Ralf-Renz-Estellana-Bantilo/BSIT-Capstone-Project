import React, { Component } from "react";
import { Link } from "react-router-dom";
import TimeStamp from "../../TimeStamp";
import "./ApplicationForm.css";
import LeftArrow from "../../Images/LeftArrow.png";
import Modal from "../Home-Folder/Modal";
import { withRouter } from "react-router-dom";
import axios from "axios";

export class ApplicationForm extends Component {
	state = {
		seeMore: false,
		isValid: true,
		post: {},
		applicantID: "",
		isModalOpen: false,
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
		resume: "",
		fileData: null,
		userImage: "",
		applicants: [],
		height: 0,
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
						Salary: info.Salary,
						Job_Type: info.Job_Type,
						Preferred_Sex: info.Preferred_Sex,
						Job_Qualifications: info.Job_Qualifications,
						Job_Requirements: info.Job_Requirements,
						Job_Description: info.Job_Description,
						Employer_Name: info.Employer_Name,
						Company_Image: info.Company_Image,
						Active_Status: info.Active_Status,
					},
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
		} = this.state;

		const applicantData = {
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
			resume: resume,
			userImage: userImage,
			min: new Date().getMinutes(),
			hour: new Date().getHours(),
			day: new Date().getDate(),
			month: new Date().getMonth() + 1,
			year: new Date().getFullYear(),
			fileData: fileData,
		};

		try {
			if (this.state.fileData !== null) {
				const data = new FormData();
				data.append("pdf", this.state.fileData);
				await fetch("http://localhost:2000/api/upload-pdf", {
					method: "POST",
					body: data,
				})
					.then((result) => {
						console.log("The PDF File has been Uploaded...");
					})
					.catch((error) => {
						console.log("Multer Error!", error);
					});
			}

			await this.props.addJobApplicants(applicantData);
			await this.props.handleApplication(this.props.targetCompany);
		} catch (error) {
			console.log("Application Form:", error);
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

	onCloseModal = () => {
		this.setState({
			isModalOpen: false,
		});
	};

	locateData = async () => {
		await axios
			.get("http://localhost:2000/api/read-applicant-data")
			.then((response) => {
				this.setState({
					applicants: response.data,
				});
			});
	};

	handleChange = (event, fieldName) => {
		this.setState({
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

		const height = this.divElement.clientHeight;
		this.setState({ height });

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
			.post("http://localhost:2000/api/get-applicantID", {
				userID: session,
			})
			.then(async (response) => {
				if (response.data.length === 1) {
					await this.setState({
						applicantID: response.data[0].ApplicantID,
					});
				}
			});

		if (`${activePage}` === "profile") {
			// Fetching Job Applicant Data
			await axios
				.post("http://localhost:2000/api/read-specific-job-applicant", {
					applicantID: applicantSession,
					companyID: post.CompanyID,
					jobID: post.JobID,
				})
				.then(async (response) => {
					if (response.data.length === 1) {
						this.setState({
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
						userImage: this.props.currentUser.User_Image,
					});
				}
			});
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

	render() {
		let birthDay = this.props.day.map((day) => {
			return (
				<option key={day} value={day}>
					{day}
				</option>
			);
		});

		let birthYear = this.props.year.map((year) => {
			return (
				<option key={year} value={year}>
					{year}
				</option>
			);
		});

		const { activePage, darkTheme } = this.props;
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
			seeMore,
			height,
		} = this.state;

		return (
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
				<div className='company-img'>
					<div className='company-img-wrapper'>
						<img
							src={`../../assets/${post.Company_Image}`}
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
										<h4>{post.Company_Address}</h4>
									</div>
									<div className='apply-detail'>
										<p>Job Category:</p>
										<h4>{post.Category}</h4>
									</div>
									<div className='apply-detail'>
										<p>Required No. of Employees:</p>
										<h4>{post.Required_Employees}</h4>
									</div>
									<div className='apply-detail'>
										<p>Salary:</p>
										<h4>{post.Salary}</h4>
									</div>
									<div className='apply-detail'>
										<p>Job Type:</p>
										<h4>{post.Job_Type}</h4>
									</div>
									<div className='apply-detail'>
										<p>Preferred Sex:</p>
										<h4>{post.Preferred_Sex}</h4>
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
										<h4 style={{ position: "relative", left: "5px" }}>
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
										<h3>--- Job Qualifications ---</h3>
										<p>{post.Job_Qualifications}</p>
									</div>
									<div className='job-qualification-portion'>
										<h3>--- Job Requirements ---</h3>
										<p>{post.Job_Requirements}</p>
									</div>
									<div className='job-qualification-portion'>
										<h3>--- Job Description ---</h3>
										<p>{post.Job_Description}</p>
									</div>

									<h2>Employer's Name: {post.Employer_Name}</h2>
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
					<h2>Application Form</h2>
					<div className='app-form'>
						<div className='fields'>
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
									disabled={`${activePage}` === "profile" && "disable"}
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
									disabled={`${activePage}` === "profile" && "disable"}
								/>
							</div>
							<div className='field'>
								<label>Last Name: </label>
								<input
									type='text'
									placeholder='Last Name'
									value={lastName}
									onChange={(e) => {
										this.handleChange(e, "lastName");
									}}
									disabled={`${activePage}` === "profile" && "disable"}
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
									disabled={`${activePage}` === "profile" && "disable"}
								/>
							</div>
							<div className='status-group'>
								<div className='field'>
									<label>Sex: </label>
									<select
										value={sex}
										onChange={(e) => {
											this.handleChange(e, "sex");
										}}
										disabled={
											`${activePage}` === "profile" && "disable"
										}>
										<option disabled='disabled' hidden='hidden'>
											Select Sex
										</option>
										<option value='Male'>Male</option>
										<option value='Female'>Female</option>
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
										<option disabled='disabled' hidden='hidden'>
											Civil Status
										</option>
										<option value='Single'>Single</option>
										<option value='Married'>Married</option>
									</select>
								</div>
							</div>
							<div className='birthdate-field'>
								<label>Date of Birth: </label>
								<div className='birthdate'>
									<select
										value={bMonth}
										onChange={(e) => {
											this.handleChange(e, "bMonth");
										}}
										disabled={
											`${activePage}` === "profile" && "disable"
										}>
										<option disabled='disabled' hidden='hidden'>
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
											`${activePage}` === "profile" && "disable"
										}>
										<option disabled='disabled' hidden='hidden'>
											Day
										</option>
										{birthDay}
									</select>

									<select
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
									</select>
								</div>
							</div>
							<div className='field'>
								<label>Contact Number: </label>
								<input
									type='text'
									placeholder='Contact Number'
									value={contactNumber}
									onChange={(e) => {
										this.handleChange(e, "contactNumber");
									}}
									disabled={`${activePage}` === "profile" && "disable"}
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
									disabled={`${activePage}` === "profile" && "disable"}
								/>
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
									disabled={`${activePage}` === "profile" && "disable"}
								/>
							</div>
							<div className='field'>
								<label>
									{`${activePage}` === "profile"
										? "Attached File:"
										: "Attach your resume here (if necessary):"}
								</label>

								{`${activePage}` === "profile" ? (
									<input
										type='text'
										placeholder='No attached file'
										value={resume}
										disabled={
											`${activePage}` === "profile" && "disable"
										}
									/>
								) : (
									<input
										accept='application/pdf,application/msword,
											application/vnd.openxmlformats-officedocument.wordprocessingml.document'
										type='file'
										disabled={
											`${activePage}` === "profile" && "disable"
										}
										onChange={(e) => {
											this.handleFileChange(e);
										}}
										style={darkTheme ? {} : { color: "black" }}
									/>
								)}
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

						<button
							onClick={this.viewModal}
							disabled={`${activePage}` === "profile" && "disable"}
							style={
								`${activePage}` === "profile"
									? { opacity: "0.3" }
									: { opacity: "1" }
							}>
							{`${activePage}` === "profile"
								? "Application Sent"
								: "Send Application"}
						</button>

						{this.state.isModalOpen ? (
							<Modal
								headText='Confirmation Dialog'
								modalText='Continue sending your application?'
								confirmText='Send'
								closeText='Back'
								close={this.onCloseModal}
								confirm={this.handleSubmit}
								path={`/jobseeker/${activePage}`}
							/>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(ApplicationForm);
