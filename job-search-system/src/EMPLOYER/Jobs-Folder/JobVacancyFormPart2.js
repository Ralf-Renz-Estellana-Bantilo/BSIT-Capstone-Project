import React, { Component } from "react";
import "./JobVacancyFormPart1.css";
import ReactSilver from "../../Images/ReactSilver.png";
import CountDown from "../../JOBSEEKER/Home-Folder/CountDown";

export class JobVacancyFormPart2 extends Component {
	constructor() {
		super();
		this.state = {
			file: ReactSilver,
			isNotValid: true,
		};
	}

	handleFileChange = (event) => {
		this.setState({
			file: URL.createObjectURL(event.target.files[0]),
		});
	};

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
	}

	render() {
		window.scrollTo(0, 0);
		const { values, handleChange, company } = this.props;
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
					<h3>--- Employer Form ---</h3>
					<div className='post-fields'>
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
						<div className='post-field-group-emp'>
							<div className='post-field'>
								<label>Stablishment Contact No.:</label>
								<input
									disabled='disabled'
									type='text'
									placeholder='Cellphone Number'
									onChange={handleChange("contactNo")}
									defaultValue={company.Contact_Number}
								/>
							</div>
						</div>
						{/* <div className='post-field-group-emp'>
							<div className='post-field'>
								<label>Email Address:</label>
								<input
									disabled='disabled'
									type='email'
									placeholder='Email Address'
									// onChange={handleChange("emailAddress")}
									// defaultValue={company.Contact_Number}
								/>
							</div>
						</div> */}
						<div className='post-field'>
							<label>Complete Business Location:</label>
							<input
								disabled='disabled'
								type='text'
								placeholder='Address: (street, barangay, municipality, province)'
								onChange={handleChange("address")}
								defaultValue={`${company.Street}, ${company.Zone}, ${company.Barangay}`}
							/>
						</div>
						{/* <div className='post-field'>
							<label>Stablishment Photo:</label>
							<input type='file' onChange={this.handleFileChange} />
							<div className='photo-panel'>
								<img src={this.state.file} alt='Actual Stablishment' />
							</div>
						</div> */}

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
