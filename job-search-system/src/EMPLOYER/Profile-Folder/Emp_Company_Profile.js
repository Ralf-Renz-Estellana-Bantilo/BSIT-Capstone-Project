import axios from "axios";
import React, { Component } from "react";
import EditProfileIcon from "../../Images/EditProfileIcon.png";
import Indication from "../../Indication";
import Resources from "../../Resources";

export class Emp_Company_Profile extends Component {
	state = {
		visible: false,
		isIndicationOpen: false,
		firstName: "",
		middleName: "",
		lastName: "",
		street: "",
		zone: "",
		barangay: "",
		contactNumber: "",
		emailAddress: "",
		companyName: "",
		companyDescription: "",
		company: [],
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

	toggleIndication = () => {
		this.setState({
			isIndicationOpen: !this.state.isIndicationOpen,
		});
	};

	handleUpdate = () => {
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
		} = this.state;

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
			companyImage: company.Company_Image,
		};

		this.handleToggleEditProfile();
		this.toggleIndication();
		this.props.updateCompanyProfile(data);
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
			isIndicationOpen,
		} = this.state;
		const { darkTheme } = this.props;

		const barangays = Resources.getBarangay();

		let barangayResources = barangays.map((barangay) => {
			return (
				<option key={barangay} value={barangay}>
					{barangay}
				</option>
			);
		});

		return (
			<>
				{isIndicationOpen === true && (
					<Indication
						type='primary'
						text='Data has been updated!'
						method={this.toggleIndication}
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

								{/* <div className='field'>
									<label>Email Address:</label>
									<input
										name='emailAddress'
										type='email'
										placeholder='Enter your Email Address'
										value={emailAddress}
										onChange={(e) =>
											this.handleChange(e, "emailAddress")
										}
									/>
								</div> */}
							</div>
						</div>

						<div className='profession-info'>
							<h3>Business Information</h3>
							<div className='field'>
								<label>Business Stablishment Name:</label>
								<input
									type='text'
									placeholder='Set Stablishment Name'
									value={companyName}
									onChange={(e) => this.handleChange(e, "companyName")}
								/>
							</div>
							<div className='field'>
								<label>Business Stablishment Location:</label>
								<input
									type='text'
									placeholder='Input Street'
									value={street}
									onChange={(e) => this.handleChange(e, "street")}
									style={{ marginBottom: "5px" }}
								/>
								<select
									defaultValue=''
									value={zone}
									onChange={(e) => this.handleChange(e, "zone")}
									style={{ marginBottom: "5px" }}>
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
									value={barangay}
									onChange={(e) => this.handleChange(e, "barangay")}
									style={{ marginBottom: "5px" }}>
									<option disabled='disabled' hidden='hidden' value=''>
										Select Barangay
									</option>
									{barangayResources}
								</select>
							</div>

							<div className='field'>
								<label>Business Stablishment Description:</label>
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

						<div className='save-update'>
							<button onClick={this.handleUpdate}>Save Update</button>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Emp_Company_Profile;
