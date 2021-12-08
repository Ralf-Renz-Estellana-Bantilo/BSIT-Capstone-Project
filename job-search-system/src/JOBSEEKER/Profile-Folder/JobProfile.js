import React, { Component } from "react";
import "./JobProfile.css";
import EditProfileIcon from "../../Images/EditProfileIcon.png";
import axios from "axios";
import Resources from "../../Resources";
import Indication from "../../Indication";

export class JobProfile extends Component {
	constructor() {
		super();
		this.state = {
			visible: false,
			isIndicationOpen: false,
			firstName: "",
			middleName: "",
			lastName: "",
			address: "",
			sex: "",
			bMonth: 0,
			bDay: 0,
			bYear: 0,
			contactNumber: "",
			email: "",
			civilStatus: "",
			educationalAttainment: "",
			preferredJob: "",
			preferredCategory: "",
			preferredSalary: "",
			interest: "",
			goodAt: "",
			credentials: "",
		};
	}

	handleToggleEditProfile = () => {
		this.setState({ visible: !this.state.visible });
	};

	handleChange = (event, fieldName) => {
		this.setState({
			[fieldName]: event.target.value,
		});
	};

	toggleIndication = async () => {
		await this.setState({
			isIndicationOpen: !this.state.isIndicationOpen,
		});
	};

	locateData = async () => {
		const { applicants, currentUser } = this.props;
		const userSession = sessionStorage.getItem("UserID");

		await applicants.map(async (applicant) => {
			if (applicant.UserID === userSession) {
				await this.setState({
					firstName: currentUser.First_Name,
					middleName: currentUser.Middle_Name,
					lastName: currentUser.Last_Name,
					address: applicant.Home_Address,
					sex: currentUser.Sex,
					bMonth: applicant.B_Month,
					bDay: applicant.B_Day,
					bYear: applicant.B_Year,
					contactNumber: applicant.Contact_Number,
					email: applicant.Email_Address,
					civilStatus: applicant.Civil_Status,
					educationalAttainment: applicant.Educ_Attainment,
					preferredJob: applicant.Preferred_Job,
					preferredCategory: applicant.Preferred_Category,
					preferredSalary: applicant.Preferred_Salary,
					interest: applicant.Interested_In,
					goodAt: applicant.Good_At,
					credentials: applicant.Credentials,
				});
			}
		});
	};

	updateApplicantData = async () => {
		const {
			firstName,
			middleName,
			lastName,
			sex,
			contactNumber,
			email,
			bMonth,
			bDay,
			bYear,
			address,
			civilStatus,
			educationalAttainment,
			preferredJob,
			preferredCategory,
			preferredSalary,
			interest,
			goodAt,
			credentials,
		} = this.state;
		if (
			firstName === "" ||
			middleName === "" ||
			lastName === "" ||
			sex === "" ||
			contactNumber === "" ||
			email === "" ||
			address === "" ||
			bMonth === "" ||
			bDay === "" ||
			bYear === "" ||
			civilStatus === "" ||
			educationalAttainment === "" ||
			preferredJob === "" ||
			preferredCategory === "" ||
			preferredSalary === "" ||
			interest === "" ||
			goodAt === "" ||
			credentials === ""
		) {
			alert("Please fill up all the fields");
		} else {
			await axios
				.put("http://localhost:2000/api/update-appplicant-data", {
					firstName: firstName,
					middleName: middleName,
					lastName: lastName,
					email: email,
					bMonth: parseInt(bMonth),
					bDay: parseInt(bDay),
					bYear: parseInt(bYear),
					sex: sex,
					contactNumber: contactNumber,
					address: address,
					civilStatus: civilStatus,
					educationalAttainment: educationalAttainment,
					preferredJob: preferredJob,
					preferredCategory: preferredCategory,
					preferredSalary: preferredSalary,
					interest: interest,
					goodAt: goodAt,
					credentials: credentials,
					userID: sessionStorage.getItem("UserID"),
				})
				.then((response) => {
					console.log("Job Profile has been Updated");
					this.handleToggleEditProfile();
					this.toggleIndication();
				});
		}
	};

	componentDidMount = async () => {
		const { applicants } = this.props;

		// Applicant Database Table ----------
		if (applicants.length === 0) {
			await axios
				.get("http://localhost:2000/api/read-applicant-data")
				.then((response) => {
					this.props.setApplicants(response.data);
				});
		}

		await this.locateData();
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

		const getCategories = Resources.getCategories();
		let categoryResources = getCategories.map((category) => {
			return (
				<option key={category} value={category}>
					{category}
				</option>
			);
		});

		const {
			visible,
			firstName,
			middleName,
			lastName,
			role,
			address,
			sex,
			bMonth,
			bDay,
			bYear,
			contactNumber,
			email,
			civilStatus,
			educationalAttainment,
			preferredJob,
			preferredCategory,
			preferredSalary,
			interest,
			goodAt,
			credentials,
			isIndicationOpen,
		} = this.state;

		const { darkTheme } = this.props;

		return (
			<>
				{isIndicationOpen ? (
					<Indication
						type='primary'
						text='Updated Job Profile Successfully!'
						method={this.toggleIndication}
						delay={3}
					/>
				) : (
					""
				)}
				<div className='job-profile-container'>
					<h3>Job Seeker Profile</h3>
					<img
						src={EditProfileIcon}
						alt='Edit Profile Details'
						title={
							this.state.visible
								? "Close Profile Details"
								: "Edit Profile Details"
						}
						onClick={this.handleToggleEditProfile}
						// style={{ opacity: this.state.visible ? "1" : ".3" }}
						style={
							darkTheme
								? { filter: "brightness(1)" }
								: { filter: "brightness(0.3)" }
						}
					/>

					<div className='profile-detail'>
						<div
							className='basic-info'
							style={{ display: this.state.visible ? "" : "none" }}>
							<h3>Basic Information</h3>
							<div className='basic-info-field'>
								<div className='field'>
									<label>First Name:</label>
									<input
										name='firstName'
										type='text'
										placeholder='First Name'
										value={firstName}
										onChange={(event) => {
											this.handleChange(event, "firstName");
										}}
									/>
								</div>

								<div className='field'>
									<label>Middle Name:</label>
									<input
										name='middleName'
										type='text'
										placeholder='Middle Name'
										value={middleName}
										onChange={(event) => {
											this.handleChange(event, "middleName");
										}}
									/>
								</div>
							</div>
							<div className='basic-info-field'>
								<div className='field'>
									<label>Last Name:</label>
									<input
										name='lastName'
										type='text'
										placeholder='Last Name'
										value={lastName}
										onChange={(event) => {
											this.handleChange(event, "lastName");
										}}
									/>
								</div>

								<div className='field'>
									<label>Email Address:</label>
									<input
										type='email'
										name='email'
										placeholder='Enter Email Address'
										value={email}
										onChange={(event) => {
											this.handleChange(event, "email");
										}}
									/>
								</div>
							</div>
							<div className='basic-info-field-group-birthday'>
								<div className='basic-info-birthdate-field'>
									<label>Date of Birth: </label>
									<div className='basic-info-birthdate'>
										<select
											value={bMonth}
											onChange={(e) => {
												this.handleChange(e, "bMonth");
											}}>
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
											}}>
											<option disabled='disabled' hidden='hidden'>
												Day
											</option>
											{birthDay}
										</select>

										<select
											value={bYear}
											onChange={(e) => {
												this.handleChange(e, "bYear");
											}}>
											<option disabled='disabled' hidden='hidden'>
												Year
											</option>
											{birthYear}
										</select>
									</div>
								</div>

								<div className='field'>
									<label>Sex:</label>
									<select
										name='sex'
										value={sex}
										onChange={(event) => {
											this.handleChange(event, "sex");
										}}>
										<option
											disabled='disabled'
											hidden='hidden'
											value=''>
											Select Sex
										</option>
										<option value='Male'>Male</option>
										<option value='Female'>Female</option>
									</select>
								</div>
							</div>

							<div className='basic-info-field'>
								<div className='field'>
									<label>Contact No.:</label>
									<input
										name='contactNumber'
										type='text'
										placeholder='Enter Contact Number'
										value={contactNumber}
										onChange={(event) => {
											this.handleChange(event, "contactNumber");
										}}
									/>
								</div>
								<div className='field'>
									<label>Home Address:</label>
									<input
										name='address'
										type='text'
										placeholder='Enter Home Address'
										value={address}
										onChange={(event) => {
											this.handleChange(event, "address");
										}}
									/>
								</div>
							</div>

							<div className='basic-info-field'>
								<div className='field'>
									<label>Civil Status:</label>
									<select
										name='civilStatus'
										placeholder='Enter Civil Status'
										defaultValue={civilStatus}
										onChange={(event) => {
											this.handleChange(event, "civilStatus");
										}}>
										<option
											disabled='disabled'
											hidden='hidden'
											value=''>
											Select Civil Status
										</option>
										<option value='Single'>Single</option>
										<option value='Married'>Married</option>
									</select>
								</div>
								<div className='field'>
									<label>Educational Attainment:</label>
									<input
										name='educationalAttainment'
										type='text'
										placeholder='Enter Educational Attainment'
										value={educationalAttainment}
										onChange={(event) => {
											this.handleChange(
												event,
												"educationalAttainment"
											);
										}}
									/>
								</div>
							</div>
						</div>

						<div
							className='profession-info'
							style={{ display: visible ? "" : "none" }}>
							<h3>Profession</h3>
							<div className='field'>
								<label>Preferred Job/s:</label>
								<input
									name='preferredJob'
									type='text'
									value={preferredJob}
									placeholder='Enter Preferred Job/s'
									onChange={(event) => {
										this.handleChange(event, "preferredJob");
									}}
								/>
							</div>
							<div className='field'>
								<label>Preferred Category:</label>
								<select
									name='Job Category'
									value={preferredCategory}
									onChange={(event) => {
										this.handleChange(event, "preferredCategory");
									}}>
									<option disabled='disabled' hidden='hidden' value=''>
										Select Job Category
									</option>
									{categoryResources}
								</select>
							</div>
							<div className='field'>
								<label>₱referred Salary:</label>
								<input
									name='preferredSalary'
									type='text'
									placeholder='Enter your Preferred Salary'
									value={preferredSalary}
									onChange={(event) => {
										this.handleChange(event, "preferredSalary");
									}}
								/>
							</div>
							<div className='field'>
								<label>Interested in:</label>
								<textarea
									name='interest'
									id='textarea'
									cols='30'
									rows='10'
									placeholder='What are you interested in?'
									value={interest}
									onChange={(event) => {
										this.handleChange(event, "interest");
									}}></textarea>
							</div>
							<div className='field'>
								<label>Good at:</label>
								<textarea
									name='goodAt'
									id='textarea'
									cols='30'
									rows='10'
									placeholder='Enter the things that you are good at...'
									value={goodAt}
									onChange={(event) => {
										this.handleChange(event, "goodAt");
									}}></textarea>
							</div>
							<div className='field'>
								<label>Credentials:</label>
								<textarea
									name='credentials'
									id='textarea'
									cols='30'
									rows='10'
									placeholder='Enter your credentials...'
									value={credentials}
									onChange={(event) => {
										this.handleChange(event, "credentials");
									}}></textarea>
							</div>
						</div>

						<div
							className='save-update'
							style={{ display: this.state.visible ? "" : "none" }}>
							<button onClick={this.updateApplicantData}>
								Save Update
							</button>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default JobProfile;
