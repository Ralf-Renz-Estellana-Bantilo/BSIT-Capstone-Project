import React, { Component } from "react";
import "./JobProfile.css";
import EditProfileIcon from "../../Images/EditProfileIcon.png";
import axios from "axios";
import Resources from "../../Resources";
import Indication from "../../Indication";
import AppConfiguration from "../../AppConfiguration";
import Loading from "../../Loading";

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
			bMonth: "",
			bDay: "",
			bYear: "",
			contactNumber: "",
			email: "",
			civilStatus: "",
			educationalAttainment: "",
			preferredJob: "",
			preferredCategory: "",
			preferredSalaryMin: "",
			preferredSalaryMax: "",
			resume: null,
			fileData: null,
			interest: "",
			goodAt: "",
			credentials: "",
			prevState_firstName: "",
			prevState_middleName: "",
			prevState_lastName: "",
			prevState_address: "",
			prevState_sex: "",
			prevState_bMonth: "",
			prevState_bDay: "",
			prevState_bYear: "",
			prevState_contactNumber: "",
			prevState_email: "",
			prevState_civilStatus: "",
			prevState_educationalAttainment: "",
			prevState_preferredJob: "",
			prevState_preferredCategory: "",
			prevState_preferredSalary: "",
			prevState_interest: "",
			prevState_goodAt: "",
			prevState_credentials: "",

			// newly added fields
			disability: "",
			employmentStatus: "",
			employmentType: "",
			isLoading: false,
		};
	}

	handleToggleEditProfile = () => {
		this.setState({ visible: !this.state.visible });
	};

	handleChange = (e, fieldName) => {
		this.setState({
			[fieldName]: e.target.value,
		});

		const jobTitles = Resources.getCategoriesWithDescription();
		for (let a = 0; a < jobTitles.length; a++) {
			for (let b = 0; b < jobTitles[a].jobs.length; b++) {
				if (jobTitles[a].jobs[b] === e.target.value) {
					this.setState({
						preferredCategory: jobTitles[a].category,
					});
				}
			}
		}
	};

	handleFileChange = (event) => {
		try {
			this.setState({
				fileData: event.target.files[0],
				resume: event.target.files[0].name,
			});
		} catch (error) {
			this.setState({
				file: null,
			});
		}
	};

	toggleIndication = async () => {
		await this.setState({
			isIndicationOpen: !this.state.isIndicationOpen,
		});
	};

	locateData = async () => {
		const { applicants } = this.props;
		const userSession = sessionStorage.getItem("UserID");

		await applicants.map((applicant) => {
			if (applicant.UserID === userSession) {
				this.setState({
					firstName: applicant.First_Name,
					middleName: applicant.Middle_Name,
					lastName: applicant.Last_Name,
					address: applicant.Home_Address,
					sex: applicant.Sex,
					bMonth: applicant.B_Month,
					bDay: applicant.B_Day,
					bYear: applicant.B_Year,
					contactNumber: applicant.Contact_Number,
					email: applicant.Email_Address,
					civilStatus: applicant.Civil_Status,
					educationalAttainment: applicant.Educ_Attainment,
					preferredJob: applicant.Preferred_Job,
					preferredCategory: applicant.Preferred_Category,
					preferredSalaryMin: applicant.Minimum_Salary,
					preferredSalaryMax: applicant.Maximum_Salary,
					interest: applicant.Interested_In,
					resume: applicant.My_Resume,
					goodAt: applicant.Good_At,
					credentials: applicant.Credentials,
					disability: applicant.Disability,
					employmentStatus: applicant.Employment_Status,
					employmentType: applicant.Employment_Type,

					// -----
					prevState_firstName: applicant.First_Name,
					prevState_middleName: applicant.Middle_Name,
					prevState_lastName: applicant.Last_Name,
					prevState_address: applicant.Home_Address,
					prevState_sex: applicant.Sex,
					prevState_bMonth: applicant.B_Month,
					prevState_bDay: applicant.B_Day,
					prevState_bYear: applicant.B_Year,
					prevState_contactNumber: applicant.Contact_Number,
					prevState_email: applicant.Email_Address,
					prevState_civilStatus: applicant.Civil_Status,
					prevState_educationalAttainment: applicant.Educ_Attainment,
					prevState_preferredJob: applicant.Preferred_Job,
					prevState_preferredCategory: applicant.Preferred_Category,
					prevState_preferredSalaryMin: applicant.Minimum_Salary,
					prevState_preferredSalaryMax: applicant.Maximum_Salary,
					prevState_interest: applicant.Interested_In,
					prevState_goodAt: applicant.Good_At,
					prevState_resume: applicant.My_Resume,
					prevState_credentials: applicant.Credentials,
					prevState_disability: applicant.Disability,
					prevState_employmentStatus: applicant.Employment_Status,
					prevState_employmentType: applicant.Employment_Type,
				});
			}
		});
	};

	updateApplicantData = async () => {
		try {
			this.setState({
				isLoading: true,
			});
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
				preferredSalaryMin,
				preferredSalaryMax,
				interest,
				resume,
				goodAt,
				credentials,
				disability,
				employmentStatus,
				employmentType,
				fileData,
			} = this.state;

			let newFileName = null;
			if (fileData !== null) {
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

			if (
				firstName === null ||
				middleName === null ||
				lastName === null ||
				sex === null ||
				contactNumber === null ||
				email === null ||
				address === null ||
				bMonth === null ||
				bDay === null ||
				bYear === null ||
				civilStatus === null ||
				educationalAttainment === null ||
				preferredJob === null ||
				preferredCategory === null ||
				preferredSalaryMin === null ||
				preferredSalaryMax === null ||
				interest === null ||
				goodAt === null ||
				credentials === null ||
				disability === null ||
				employmentStatus === null ||
				employmentType === null
			) {
				alert("Please fill up all the fields");
			} else {
				await axios
					.put(`${AppConfiguration.url()}/api/update-appplicant-data`, {
						firstName: Resources.formatName(firstName),
						middleName: Resources.formatName(middleName),
						lastName: Resources.formatName(lastName),
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
						preferredSalaryMin: preferredSalaryMin,
						preferredSalaryMax: preferredSalaryMax,
						resume: newFileName,
						interest: interest,
						goodAt: goodAt,
						credentials: credentials,
						disability: disability,
						employmentStatus: employmentStatus,
						employmentType: employmentType,
						userID: sessionStorage.getItem("UserID"),
					})
					.then((response) => {
						// console.log("Job Profile has been Updated");
						this.handleToggleEditProfile();
						this.toggleIndication();

						const user = {
							First_Name: firstName,
							Middle_Name: middleName,
							Last_Name: lastName,
							Home_Address: address,
							Sex: sex,
							B_Month: parseInt(bMonth),
							B_Day: parseInt(bDay),
							B_Year: parseInt(bYear),
							Contact_Number: contactNumber,
							Email_Address: email,
							Civil_Status: civilStatus,
							Educ_Attainment: educationalAttainment,
							Preferred_Job: preferredJob,
							Preferred_Category: preferredCategory,
							Minimum_Salary: preferredSalaryMin,
							Maximum_Salary: preferredSalaryMax,
							Interested_In: interest,
							My_Resume: newFileName,
							Good_At: goodAt,
							Credentials: credentials,
							Disability: disability,
							Employment_Status: employmentStatus,
							Employment_Type: employmentType,
							UserID: sessionStorage.getItem("UserID"),
							ApplicantID: sessionStorage.getItem("ApplicantID"),
						};

						this.props.updateApplicantData(user);
						// console.log(user);
					});

				this.setState({
					firstName: Resources.formatName(firstName),
					middleName: Resources.formatName(middleName),
					lastName: Resources.formatName(lastName),
					resume: newFileName,
					fileData: null,

					prevState_firstName: Resources.formatName(firstName),
					prevState_middleName: Resources.formatName(middleName),
					prevState_lastName: Resources.formatName(lastName),
					prevState_email: email,
					prevState_bMonth: parseInt(bMonth),
					prevState_bDay: parseInt(bDay),
					prevState_bYear: parseInt(bYear),
					prevState_sex: sex,
					prevState_contactNumber: contactNumber,
					prevState_address: address,
					prevState_civilStatus: civilStatus,
					prevState_educationalAttainment: educationalAttainment,
					prevState_preferredJob: preferredJob,
					prevState_preferredCategory: preferredCategory,
					prevState_preferredSalary: preferredSalaryMin,
					prevState_interest: interest,
					prevState_goodAt: goodAt,
					prevState_credentials: credentials,
				});
			}
		} catch (error) {
			alert(error);
		}
	};

	componentDidMount = async () => {
		const { applicants } = this.props;

		// Applicant Database Table ----------
		if (applicants.length === 0) {
			await axios
				.get(`${AppConfiguration.url()}/api/read-applicant-data`)
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
	};

	render() {
		let birthDay = this.props.day.map((day) => {
			return (
				<option key={day} value={day}>
					{day}
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
			preferredSalaryMin,
			preferredSalaryMax,
			resume,
			interest,
			goodAt,
			credentials,
			prevState_firstName,
			prevState_middleName,
			prevState_lastName,
			prevState_address,
			prevState_sex,
			prevState_bMonth,
			prevState_bDay,
			prevState_bYear,
			prevState_contactNumber,
			prevState_email,
			prevState_civilStatus,
			prevState_educationalAttainment,
			prevState_preferredJob,
			prevState_preferredCategory,
			prevState_preferredSalaryMin,
			prevState_preferredSalaryMax,
			prevState_interest,
			prevState_resume,
			prevState_goodAt,
			prevState_credentials,
			isIndicationOpen,

			disability,
			employmentStatus,
			employmentType,
			prevState_disability,
			prevState_employmentStatus,
			prevState_employmentType,
			isLoading,
		} = this.state;

		const { darkTheme } = this.props;

		let isUpdateButtonEnable = true;

		if (
			prevState_firstName === firstName &&
			prevState_middleName === middleName &&
			prevState_lastName === lastName &&
			prevState_address === address &&
			prevState_sex === sex &&
			prevState_bMonth === bMonth &&
			prevState_bDay === bDay &&
			prevState_bYear === bYear &&
			prevState_contactNumber === contactNumber &&
			prevState_email === email &&
			prevState_civilStatus === civilStatus &&
			prevState_educationalAttainment === educationalAttainment &&
			prevState_preferredJob === preferredJob &&
			prevState_preferredCategory === preferredCategory &&
			prevState_preferredSalaryMin === preferredSalaryMin &&
			prevState_preferredSalaryMax === preferredSalaryMax &&
			prevState_interest === interest &&
			prevState_goodAt === goodAt &&
			prevState_resume === resume &&
			prevState_credentials === credentials &&
			prevState_disability === disability &&
			prevState_employmentStatus === employmentStatus &&
			prevState_employmentType === employmentType
		) {
			isUpdateButtonEnable = false;
		} else if (
			firstName === null ||
			middleName === null ||
			lastName === null ||
			address === null ||
			sex === null ||
			bMonth === null ||
			bDay === null ||
			bYear === null ||
			contactNumber === null ||
			email === null ||
			civilStatus === null ||
			educationalAttainment === null ||
			preferredJob === null ||
			preferredCategory === null ||
			preferredSalaryMin === null ||
			preferredSalaryMax === null ||
			interest === null ||
			goodAt === null ||
			credentials === null ||
			disability === null ||
			employmentStatus === null ||
			employmentType === null ||
			firstName === "" ||
			middleName === "" ||
			lastName === "" ||
			address === "" ||
			sex === "" ||
			bMonth === "" ||
			bDay === "" ||
			bYear === "" ||
			contactNumber === "" ||
			email === "" ||
			civilStatus === "" ||
			educationalAttainment === "" ||
			preferredJob === "" ||
			preferredCategory === "" ||
			preferredSalaryMin === "" ||
			preferredSalaryMax === "" ||
			interest === "" ||
			goodAt === "" ||
			credentials === "" ||
			disability === "" ||
			employmentStatus === "" ||
			employmentType === "" ||
			firstName === undefined ||
			middleName === undefined ||
			lastName === undefined ||
			address === undefined ||
			sex === undefined ||
			bMonth === undefined ||
			bDay === undefined ||
			bYear === undefined ||
			contactNumber === undefined ||
			email === undefined ||
			civilStatus === undefined ||
			educationalAttainment === undefined ||
			preferredJob === undefined ||
			preferredCategory === undefined ||
			preferredSalaryMin === undefined ||
			preferredSalaryMax === undefined ||
			interest === undefined ||
			goodAt === undefined ||
			credentials === undefined ||
			disability === undefined ||
			employmentStatus === undefined ||
			employmentType === undefined
		) {
			isUpdateButtonEnable = false;
		}

		const jobTitles = Resources.getCategoriesWithDescription();

		let arrayJobs = [];
		let arrayCategories = [];

		for (let a = 0; a < jobTitles.length; a++) {
			let categoryName = jobTitles[a].category;
			for (let b = 0; b < jobTitles[a].jobs.length; b++) {
				arrayJobs.push(jobTitles[a].jobs[b]);
				arrayCategories.push(categoryName);
			}
		}

		let count = -1;

		let jobTitleSmartHints = arrayJobs.map((jobTitle) => {
			count += 1;
			return (
				<option key={jobTitle} value={jobTitle}>
					{arrayCategories[count]}
				</option>
			);
		});

		const screenSize = document.body.clientWidth;

		const resumeName = `${resume}`.split("/")[
			`${resume}`.split("/").length - 1
		];

		return (
			<>
				{isIndicationOpen ? (
					<Indication
						type='primary'
						text='JOB SEEKER PROFILE HAS BEEN UPDATED!'
						method={this.toggleIndication}
						delay={3}
					/>
				) : (
					""
				)}
				<div className='job-profile-container'>
					<h3>Job Seeker Profile</h3>
					{preferredJob === null && (
						<div className='badge' onClick={this.handleToggleEditProfile}>
							<p>!</p>
						</div>
					)}

					<img
						src={EditProfileIcon}
						alt='Edit Profile Details'
						title={
							this.state.visible
								? "Close Profile Details"
								: "Edit Profile Details"
						}
						onClick={this.handleToggleEditProfile}
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
							<h3>Personal Information</h3>
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
										// autocomplete='off'
									/>
								</div>
							</div>
							<div className='basic-info-field-group-birthday'>
								<div className='basic-info-birthdate-field'>
									<label>Date of Birth: </label>
									<div className='basic-info-birthdate'>
										<select
											name='bMonth'
											value={bMonth}
											onChange={(event) => {
												this.handleChange(event, "bMonth");
											}}>
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
											name='bDay'
											value={bDay}
											onChange={(event) => {
												this.handleChange(event, "bDay");
											}}>
											<option
												disabled='disabled'
												hidden='hidden'
												value=''>
												Day
											</option>
											{birthDay}
										</select>
										<input
											type='number'
											placeholder='Year'
											style={{ width: "80px" }}
											value={bYear}
											onChange={(e) => {
												this.setState({ bYear: e.target.value });
											}}
										/>
									</div>
								</div>

								<div className='field'>
									<label>Gender:</label>
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
											Select Gender
										</option>
										<option value='Male'>Male</option>
										<option value='Female'>Female</option>
										<option value='Gay'>Gay</option>
										<option value='Lesbian'>Lesbian</option>
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
									<label>Home Address: (St., Brgy., Mun.)</label>
									<input
										name='address'
										type='text'
										placeholder='(Street/Village, Barangay, Municipality)'
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
										value={civilStatus}
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
										<option value='Widowed'>Widowed</option>
										<option value='Separated'>Separated</option>
										<option value='Live-in'>Live-in</option>
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
									{/* <label>Highest Educational Attainment: </label>
									<select
										name='educationalAttainment'
										value={educationalAttainment}
										onChange={(event) => {
											this.handleChange(
												event,
												"educationalAttainment"
											);
										}}>
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
							<div className='basic-info-field'>
								<div className='field'>
									<label>Disability:</label>
									<select
										name='disability'
										placeholder='Enter Civil Status'
										value={disability}
										onChange={(event) => {
											this.handleChange(event, "disability");
										}}>
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
									<label>Employment Status/Type:</label>
									<div className='employment-type-field-container'>
										<select
											name='employmentStatus'
											value={employmentStatus}
											onChange={(event) => {
												this.handleChange(
													event,
													"employmentStatus"
												);
											}}>
											<option
												disabled='disabled'
												hidden='hidden'
												value=''>
												Select Status
											</option>
											<option value='Employed'>Employed</option>
											<option value='Unemployed'>Unemployed</option>
										</select>
										<select
											name='employmentType'
											value={employmentType}
											onChange={(event) => {
												this.handleChange(event, "employmentType");
											}}>
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
													<option value='Retired'>Retired</option>
													{/* <option value='Others'>Others</option> */}
												</>
											)}
										</select>
									</div>
								</div>
							</div>
						</div>

						<div
							className='basic-info'
							style={{ display: visible ? "" : "none" }}>
							<h3>Job Preference</h3>
							<div className='basic-info-field'>
								<div className='field'>
									<label>Preferred Job/s:</label>
									<input
										name='preferredJob'
										list='jobLists'
										type='text'
										value={preferredJob}
										placeholder='Enter Preferred Job/s'
										onChange={(event) => {
											this.handleChange(event, "preferredJob");
										}}
									/>
									{screenSize > 600 && (
										<datalist id='jobLists'>
											{jobTitleSmartHints}
										</datalist>
									)}
								</div>
								<div className='field'>
									<label>Preferred Category:</label>
									<select
										name='Job Category'
										value={preferredCategory}
										onChange={(event) => {
											this.handleChange(event, "preferredCategory");
										}}
										style={{ width: "100%" }}>
										<option
											disabled='disabled'
											hidden='hidden'
											value=''>
											Select Job Category
										</option>
										{categoryResources}
									</select>
								</div>
							</div>
							<div className='basic-info-field'>
								<div className='field'>
									<label>Preferred Salary Range:</label>

									<div className='employment-type-field-container'>
										<label>min:</label>
										<input
											name='preferredSalaryMin'
											type='number'
											placeholder='Min. Salary'
											value={preferredSalaryMin}
											onChange={(event) => {
												this.handleChange(
													event,
													"preferredSalaryMin"
												);
											}}
										/>
										<label>max:</label>
										<input
											name='preferredSalaryMax'
											type='number'
											placeholder='Max. Salary'
											value={preferredSalaryMax}
											onChange={(event) => {
												this.handleChange(
													event,
													"preferredSalaryMax"
												);
											}}
										/>
									</div>
								</div>
								<div className='field'>
									<label>Resume (if necessary): {resumeName}</label>
									<input
										name='preferredSalary'
										type='file'
										accept='application/pdf'
										// accept='application/pdf,application/msword,
										// 	application/vnd.openxmlformats-officedocument.wordprocessingml.document'
										onChange={this.handleFileChange}
									/>
								</div>
							</div>

							<div className='field'>
								<label>Personal Skills:</label>
								<textarea
									name='goodAt'
									id='textarea'
									cols='30'
									rows='10'
									placeholder='Enter the things that you are Personal Skills...'
									value={goodAt}
									onChange={(event) => {
										this.handleChange(event, "goodAt");
									}}></textarea>
							</div>
							<div className='field'>
								<label>Interests:</label>
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
							<button
								onClick={this.updateApplicantData}
								style={
									isUpdateButtonEnable
										? { opacity: "1" }
										: { opacity: "0.3" }
								}
								disabled={isUpdateButtonEnable ? "" : "disabled"}>
								Save Update
							</button>
						</div>
					</div>
				</div>
				{isLoading && <Loading />}
			</>
		);
	}
}

export default JobProfile;
