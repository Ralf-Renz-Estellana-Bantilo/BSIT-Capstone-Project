import axios from "axios";
import React, { Component } from "react";
import EditProfileIcon from "../../Images/EditProfileIcon.png";
import Indication from "../../Indication";
import Resources from "../../Resources";
import "./EmpCompanyProfile.css";

export class EmpCompanyProfile extends Component {
	state = {
		visible: false,
		firstName: "",
		middleName: "",
		lastName: "",
		street: "",
		zone: "",
		barangay: "",
		contactNumber: "",
		emailAddress: "",
		companyName: "",
		acronym: "",
		employerType: "",
		workForce: "",
		companyDescription: "",
		prevState_firstName: "",
		prevState_middleName: "",
		prevState_lastName: "",
		prevState_street: "",
		prevState_zone: "",
		prevState_barangay: "",
		prevState_contactNumber: "",
		prevState_emailAddress: "",
		prevState_companyName: "",
		prevState_companyDescription: "",
		company: [],
		hasAcronym: false,
	};

	locateData = async () => {
		const { currentUser } = this.props;
		const { company } = this.state;

		await this.setState({
			firstName: currentUser.First_Name,
			middleName: currentUser.Middle_Name,
			lastName: currentUser.Last_Name,
			street: company.Street,
			zone: company.Zone,
			barangay: company.Barangay,
			contactNumber: company.Contact_Number,
			companyName: company.Company_Name,
			companyDescription: company.Company_Description,
			emailAddress: company.Email_Address,
			acronym: company.Company_Acronym,
			employerType: company.Employer_Type,
			workForce: company.Work_Force,

			// Previous States -----
			prevState_firstName: currentUser.First_Name,
			prevState_middleName: currentUser.Middle_Name,
			prevState_lastName: currentUser.Last_Name,
			prevState_street: company.Street,
			prevState_zone: company.Zone,
			prevState_barangay: company.Barangay,
			prevState_contactNumber: company.Contact_Number,
			prevState_companyName: company.Company_Name,
			prevState_companyDescription: company.Company_Description,
			prevState_emailAddress: company.Email_Address,
			prevState_acronym: company.Company_Acronym,
			prevState_employerType: company.Employer_Type,
			prevState_workForce: company.Work_Force,
		});
	};

	handleToggleEditProfile = () => {
		this.setState({ visible: !this.state.visible });
	};

	handleChange = (event, fieldName) => {
		this.setState({
			[fieldName]: event.target.value,
		});
	};

	handleUpdate = async () => {
		const {
			firstName,
			middleName,
			lastName,
			street,
			zone,
			barangay,
			contactNumber,
			companyName,
			companyDescription,
			company,
			emailAddress,
			acronym,
			employerType,
			workForce,
		} = this.state;

		let newAcronym = "";
		if (acronym !== "") {
			newAcronym = acronym;
		} else {
			newAcronym = "(n/a)";
		}

		if (
			firstName === "" ||
			middleName === "" ||
			lastName === "" ||
			street === "" ||
			zone === "" ||
			barangay === "" ||
			contactNumber === "" ||
			companyName === "" ||
			companyDescription === "" ||
			company === "" ||
			emailAddress === "" ||
			employerType === "" ||
			workForce === ""
		) {
			alert("Please fill up all the fields!");
		} else {
			const data = {
				userID: company.UserID,
				companyID: company.CompanyID,
				firstName,
				middleName,
				lastName,
				street,
				zone,
				barangay,
				contactNumber,
				companyName,
				companyDescription,
				emailAddress,
				acronym: newAcronym,
				employerType,
				workForce,
				companyImage: company.Company_Image,
			};
			await this.props.updateCompanyProfile(data);

			this.setState({
				prevState_firstName: firstName,
				prevState_middleName: middleName,
				prevState_lastName: lastName,
				prevState_street: street,
				prevState_zone: zone,
				prevState_barangay: barangay,
				prevState_contactNumber: contactNumber,
				prevState_companyName: companyName,
				prevState_companyDescription: companyDescription,
				prevState_emailAddress: emailAddress,
				prevState_acronym: acronym,
				prevState_employerType: employerType,
				prevState_workForce: workForce,
			});

			this.handleToggleEditProfile();
		}
	};

	componentDidMount = async () => {
		window.scrollTo(0, 0);
		const sessionUser = sessionStorage.getItem("UserID");
		await axios
			.post("http://localhost:2000/api/read-company", {
				userID: sessionUser,
			})
			.then(async (response) => {
				if (response.data.length === 1) {
					this.setState({
						company: response.data[0],
					});
				} else {
					console.log("Error fetching information...");
				}
			});
		await this.locateData();
	};

	render() {
		const {
			firstName,
			middleName,
			lastName,
			street,
			zone,
			barangay,
			contactNumber,
			emailAddress,
			companyName,
			companyDescription,
			acronym,
			employerType,
			workForce,
			prevState_firstName,
			prevState_middleName,
			prevState_lastName,
			prevState_street,
			prevState_zone,
			prevState_barangay,
			prevState_contactNumber,
			prevState_companyName,
			prevState_companyDescription,
			prevState_emailAddress,
			prevState_acronym,
			prevState_employerType,
			prevState_workForce,
		} = this.state;
		const { isIndicationOpen } = this.props;

		const { darkTheme } = this.props;

		const barangays = Resources.getBarangay();

		let barangayResources = barangays.map((barangay) => {
			return (
				<option key={barangay} value={barangay}>
					{barangay}
				</option>
			);
		});

		let isUpdateButtonEnable = true;

		if (
			prevState_firstName === firstName &&
			prevState_middleName === middleName &&
			prevState_lastName === lastName &&
			prevState_street === street &&
			prevState_zone === zone &&
			prevState_barangay === barangay &&
			prevState_contactNumber === contactNumber &&
			prevState_companyName === companyName &&
			prevState_emailAddress === emailAddress &&
			prevState_acronym === acronym &&
			prevState_employerType === employerType &&
			prevState_workForce === workForce &&
			prevState_companyDescription === companyDescription
		) {
			isUpdateButtonEnable = false;
		}

		return (
			<>
				{isIndicationOpen === true && (
					<Indication
						type='primary'
						text='BUSINESS PROFILE HAS BEEN UPDATED!'
						method={this.props.toggleIndication}
						delay={3}
						module='employer'
					/>
				)}
				<div className='job-profile-container'>
					<h3>Business Profile</h3>
					<img
						src={EditProfileIcon}
						alt='Edit Profile Details'
						onClick={this.handleToggleEditProfile}
						style={
							darkTheme
								? { filter: "brightness(1)" }
								: { filter: "brightness(0.3)" }
						}
					/>

					<div
						className='profile-detail'
						style={{ display: this.state.visible ? "" : "none" }}>
						<div className='basic-info'>
							<h3>Employer Information</h3>
							<div className='basic-info-field'>
								<div className='field'>
									<label>First Name:</label>
									<input
										name='firstName'
										type='text'
										placeholder='First Name'
										value={firstName}
										onChange={(e) =>
											this.handleChange(e, "firstName")
										}
									/>
								</div>

								<div className='field'>
									<label>Middle Name:</label>
									<input
										name='middleName'
										type='text'
										placeholder='Middle Name'
										value={middleName}
										onChange={(e) =>
											this.handleChange(e, "middleName")
										}
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
										onChange={(e) => this.handleChange(e, "lastName")}
									/>
								</div>

								<div className='field'>
									<label>Contact No.:</label>
									<input
										name='contactNumber'
										type='text'
										placeholder='Enter Contact Number'
										value={contactNumber}
										onChange={(e) =>
											this.handleChange(e, "contactNumber")
										}
									/>
								</div>
							</div>
							<div className='basic-info-field'>
								<div className='field'>
									<label>Email Address:</label>
									<input
										name='emailAddress'
										type='email'
										placeholder='Email Address'
										value={emailAddress}
										onChange={(e) =>
											this.handleChange(e, "emailAddress")
										}
									/>
								</div>
							</div>
						</div>

						<div className='profession-info'>
							<h3>Establishment Details</h3>
							<div className='profession-info-field'>
								<div className='field'>
									<label>Business Establishment Name:</label>
									<input
										type='text'
										placeholder='Set Establishment Name'
										value={companyName}
										onChange={(e) =>
											this.handleChange(e, "companyName")
										}
									/>
								</div>
								<div className='field'>
									<label>Acronym/Abbreviation:</label>
									<div className='acronym-container'>
										<input
											type='text'
											placeholder='Set Acronym/Abbreviation'
											value={acronym === "(n/a)" ? "" : acronym}
											onChange={(e) =>
												this.handleChange(e, "acronym")
											}
										/>
										<div className='acronym'>
											<input
												type='checkbox'
												name='acronym'
												onChange={(e) => {
													this.setState({
														hasAcronym: e.target.checked,
														acronym: "",
													});
												}}
												checked={
													acronym === null ||
													acronym === "(n/a)" ||
													acronym === ""
														? "checked"
														: ""
												}
											/>
											<label>(n/a)</label>
										</div>
									</div>
								</div>
							</div>
							<div className='profession-info-field'>
								<div className='field'>
									<label>Employer Type:</label>
									<select
										defaultValue=''
										value={employerType}
										onChange={(e) =>
											this.handleChange(e, "employerType")
										}>
										<option
											disabled='disabled'
											hidden='hidden'
											value=''>
											Select Employer Type
										</option>
										<option value='Government'>Government</option>
										<option value='Recruitment & Placement Agency'>
											Recruitment & Placement Agency
										</option>
										<option value='Private'>Private</option>
										<option value='Licenced Recruitment Agency (Overseas)'>
											Licenced Recruitment Agency (Overseas)
										</option>
										<option value='DO 174-17. Subcontractor'>
											DO 174-17. Subcontractor
										</option>
									</select>
								</div>
								<div className='field'>
									<label>Total Work Force:</label>
									<select
										defaultValue=''
										value={workForce}
										onChange={(e) =>
											this.handleChange(e, "workForce")
										}>
										<option
											disabled='disabled'
											hidden='hidden'
											value=''>
											Select Total Work Force
										</option>
										<option value='Micro (1-9)'>Micro (1-9)</option>
										<option value='Small (10-99)'>
											Small (10-99)
										</option>
										<option value='Medium (100-199)'>
											Medium (100-199)
										</option>
										<option value='Large (200 and up)'>
											Large (200 and up)
										</option>
									</select>
								</div>
							</div>
							<div className='profession-info-field'>
								<div className='field'>
									<label>Street:</label>
									<input
										type='text'
										placeholder='Input Street'
										value={street}
										onChange={(e) => this.handleChange(e, "street")}
									/>
								</div>
								<div className='field'>
									<label>Zone:</label>
									<select
										defaultValue=''
										value={zone}
										onChange={(e) => this.handleChange(e, "zone")}>
										<option
											disabled='disabled'
											hidden='hidden'
											value=''>
											Select Zone
										</option>
										<option value='Zone 1'>Zone 1</option>
										<option value='Zone 2'>Zone 2</option>
										<option value='Zone 3'>Zone 3</option>
										<option value='Zone 4'>Zone 4</option>
										<option value='Zone 5'>Zone 5</option>
										<option value='Zone 6'>Zone 6</option>
									</select>
								</div>
							</div>
							<div className='profession-info-field'>
								<div className='field'>
									<label>Barangay:</label>
									<select
										defaultValue=''
										value={barangay}
										onChange={(e) =>
											this.handleChange(e, "barangay")
										}>
										<option
											disabled='disabled'
											hidden='hidden'
											value=''>
											Select Barangay
										</option>
										{barangayResources}
									</select>
								</div>
								<div className='field'>
									<label>Municipality/Province:</label>
									<input
										disabled='disable'
										type='text'
										value='Catarman, Northern Samar'
									/>
								</div>
							</div>
							<div className='profession-info-field'>
								<div className='field'>
									<label>Business Establishment Description:</label>
									<textarea
										name='interest'
										id='textarea'
										placeholder='Describe what your business does..'
										value={companyDescription}
										onChange={(e) =>
											this.handleChange(e, "companyDescription")
										}
									/>
								</div>
							</div>
						</div>

						<div className='save-update'>
							<button
								onClick={this.handleUpdate}
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
			</>
		);
	}
}

export default EmpCompanyProfile;
