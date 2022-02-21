import React, { Component } from "react";
import "./JobVacancyFormPart1.css";
import ReactSilver from "../../Images/ReactSilver.png";
import CountDown from "../../JOBSEEKER/Home-Folder/CountDown";

export class JobVacancyFormPart2 extends Component {
	constructor() {
		super();
		this.state = {
			isNotValid: true,
			hasContactPerson: false,
		};
	}

	continue = (e) => {
		const { values } = this.props;

		e.preventDefault();

		if (
			values.employerName !== "" &&
			values.contactNo !== "" &&
			values.address !== ""
		) {
			this.closeIsNotValid();
			this.props.nextStep();
		} else {
			this.setState({
				isNotValid: false,
			});
		}
	};

	back = (e) => {
		e.preventDefault();
		this.props.prevStep();
	};

	closeIsNotValid = () => {
		this.setState({
			isNotValid: true,
		});
	};

	componentDidMount() {
		window.scrollTo(0, 0);

		const { contactPersonName } = this.props.values;

		if (contactPersonName) {
			this.setState({
				hasContactPerson: true,
			});
		}
	}

	render() {
		const { hasContactPerson } = this.state;
		const {
			contactPersonName,
			contactPersonPosition,
			contactPersonNumber,
			contactPersonEmail,
		} = this.props.values;

		const { company, handleChange } = this.props;

		return (
			<div className='pd-text-fields'>
				{this.state.isNotValid === false ? (
					<div className='indication' style={{ backgroundColor: "red" }}>
						<p>
							Make sure to fill-in all the fields!
							<CountDown method={this.closeIsNotValid} delay={3} />
						</p>
					</div>
				) : (
					<div></div>
				)}
				<form className='post-input-container'>
					<h3>EMPLOYER FORM</h3>
					<div className='post-fields'>
						<div className='post-field-wrapper'>
							<div className='post-field'>
								<label>Employer's Name:</label>
								<input
									disabled='disabled'
									type='text'
									placeholder='Employer Name'
									onChange={handleChange("employerName")}
									defaultValue={company.Employer_Name}
								/>
							</div>
							<div className='post-field'>
								<label>Establishment Contact No.:</label>
								<input
									disabled='disabled'
									type='text'
									placeholder='Cellphone Number'
									onChange={handleChange("contactNo")}
									defaultValue={company.Contact_Number}
								/>
							</div>
						</div>
						<div className='post-field-wrapper'>
							<div className='post-field'>
								<label>Email Address:</label>
								<input
									disabled='disabled'
									type='email'
									placeholder='Email Address'
									onChange={handleChange("emailAddress")}
									defaultValue={company.Email_Address}
								/>
							</div>
							<div className='post-field'>
								<label>Complete Establishment Location:</label>
								<input
									disabled='disabled'
									type='text'
									placeholder='Address: (street, barangay, municipality, province)'
									onChange={handleChange("address")}
									defaultValue={`${company.Street}, ${company.Zone}, ${company.Barangay}`}
								/>
							</div>
						</div>
						<h3>
							<input
								type='checkbox'
								name='contactPerson'
								checked={hasContactPerson ? "checked" : ""}
								onChange={async () => {
									await this.setState({
										hasContactPerson: !hasContactPerson,
									});
									if (hasContactPerson === true) {
										this.props.handleResetContactPerson();
									}
								}}
							/>{" "}
							CONTACT PERSON (if there's any)
						</h3>
						<div className='post-field-wrapper'>
							<div className='post-field'>
								<label>Contact Person (Full Name):</label>
								<input
									type='text'
									placeholder='Full name'
									disabled={hasContactPerson ? "" : "disabled"}
									onChange={handleChange("contactPersonName")}
									value={contactPersonName}
									style={
										hasContactPerson
											? { opacity: "1" }
											: { opacity: "0.8" }
									}
								/>
							</div>
							<div className='post-field'>
								<label>Position:</label>
								<input
									type='text'
									placeholder='Position'
									disabled={hasContactPerson ? "" : "disabled"}
									onChange={handleChange("contactPersonPosition")}
									value={contactPersonPosition}
									style={
										hasContactPerson
											? { opacity: "1" }
											: { opacity: "0.8" }
									}
								/>
							</div>
						</div>
						<div className='post-field-wrapper'>
							<div className='post-field'>
								<label>Contact Number:</label>
								<input
									type='number'
									placeholder='Contact Number'
									disabled={hasContactPerson ? "" : "disabled"}
									onChange={handleChange("contactPersonNumber")}
									value={contactPersonNumber}
									style={
										hasContactPerson
											? { opacity: "1" }
											: { opacity: "0.8" }
									}
								/>
							</div>
							<div className='post-field'>
								<label>Email Address:</label>
								<input
									type='email'
									placeholder='Email Address'
									disabled={hasContactPerson ? "" : "disabled"}
									onChange={handleChange("contactPersonEmail")}
									value={contactPersonEmail}
									style={
										hasContactPerson
											? { opacity: "1" }
											: { opacity: "0.8" }
									}
								/>
							</div>
						</div>
						<div className='post-field'>
							<button className='next' onClick={this.continue}>
								Next
							</button>
							<button className='back' onClick={this.back}>
								Back
							</button>
						</div>
						<div className='warning'>
							<p>
								Note: These data are based on your Business Information
							</p>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default JobVacancyFormPart2;
