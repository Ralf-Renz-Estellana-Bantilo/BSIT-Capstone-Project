import React, { Component } from "react";
import "./Confirm.css";
import shortid from "shortid";

export class Confirm extends Component {
	constructor() {
		super();

		this.state = {
			data: {
				JobID: "",
				Company_Name: "",
				Min: "",
				Hour: "",
				Day: "",
				Month: "",
				Year: "",
				Company_Address: "",
				Job_Title: "",
				Category: "",
				Required_Employees: "",
				Salary: "",
				Job_Type: "",
				Preferred_Sex: "",
				Job_Qualifications: "",
				Job_Requirements: "",
				Job_Description: "",
				Employer_Name: "",
				imageURL: "",
				isApplied: "",
				Active_Status: "",
			},
		};
	}

	continue = () => {
		const {
			values: {
				jobTitle,
				jobCategory,
				noReqEmp,
				minSalary,
				maxSalary,
				prefSex,
				civilStatus,
				jobType,
				jobQualification,
				jobRequirement,
				jobDescription,
				placeOfWork,

				// employer form
				employerName,
				contactNo,
				address,
				emailAddress,
				contactPersonName,
				contactPersonPosition,
				contactPersonNumber,
				contactPersonEmail,
			},
		} = this.props;

		this.setState(
			{
				data: {
					JobID: shortid.generate(),
					CompanyID: this.props.company.CompanyID,
					Company_Name: this.props.company.Company_Name,
					Minutes: new Date().getMinutes(),
					Hour: new Date().getHours(),
					Day: new Date().getDate(),
					Month: new Date().getMonth() + 1,
					Year: new Date().getFullYear(),
					Date_Posted: new Date(),
					Company_Address: address,
					Job_Title: jobTitle,
					Category: jobCategory,
					Work_Place: placeOfWork,
					Required_Employees: noReqEmp,
					Minimum_Salary: minSalary,
					Maximum_Salary: maxSalary,
					Civil_Status: civilStatus,
					Job_Type: jobType,
					Preferred_Sex: prefSex,
					Job_Qualifications: jobQualification,
					Job_Requirements: jobRequirement,
					Job_Description: jobDescription,
					Employer_Name: this.props.company.Employer_Name,
					Company_Image: this.props.company.Company_Image,
					Contact_Person_Name: contactPersonName,
					Contact_Person_Position: contactPersonPosition,
					Contact_Person_Number: contactPersonNumber,
					Contact_Person_Email: contactPersonEmail,

					Is_Applied: false,
					Active_Status: "Active",
				},
			},
			function () {
				this.viewPost(this.state.data);
			}
		);
	};

	back = (e) => {
		e.preventDefault();
		this.props.prevStep();
	};

	viewPost = (post) => {
		this.props.nextStep();
		this.props.confirmJobPost(post);
	};

	updatePost = () => {
		const {
			jobTitle,
			jobCategory,
			noReqEmp,
			minSalary,
			maxSalary,
			civilStatus,
			placeOfWork,
			prefSex,
			jobType,
			jobQualification,
			jobRequirement,
			jobDescription,
			address,
			contactPersonName,
			contactPersonPosition,
			contactPersonNumber,
			contactPersonEmail,
		} = this.props.values;

		const { targetJobPost } = this.props;

		const data = {
			JobID: targetJobPost.JobID,
			CompanyID: targetJobPost.CompanyID,
			Company_Name: this.props.company.Company_Name,
			Company_Address: address,
			Job_Title: jobTitle,
			Category: jobCategory,
			Required_Employees: noReqEmp,
			Minimum_Salary: minSalary,
			Maximum_Salary: maxSalary,
			Civil_Status: civilStatus,
			Work_Place: placeOfWork,
			Job_Type: jobType,
			Preferred_Sex: prefSex,
			Job_Qualifications: jobQualification,
			Job_Requirements: jobRequirement,
			Job_Description: jobDescription,
			Employer_Name: this.props.company.Employer_Name,
			Contact_Person_Name: contactPersonName,
			Contact_Person_Position: contactPersonPosition,
			Contact_Person_Number: contactPersonNumber,
			Contact_Person_Email: contactPersonEmail,
		};
		this.props.nextStep();
		this.props.confirmJobPost(data);
	};

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		const {
			values: {
				jobTitle,
				jobCategory,
				noReqEmp,
				prefSex,
				jobType,
				jobQualification,
				jobRequirement,
				jobDescription,
				employerName,
				contactNo,
				address,
				maxSalary,
				minSalary,
				placeOfWork,
				civilStatus,
				contactPersonName,
				contactPersonPosition,
				contactPersonNumber,
				contactPersonEmail,
			},
			targetJobPost,
		} = this.props;

		let finalMinSalary = "";
		let finalMaxSalary = "";
		let jobMinSalary = minSalary;
		let jobMaxSalary = maxSalary;
		for (let a = 1; a <= jobMinSalary.length; a++) {
			if (
				jobMinSalary.length - a === 3 ||
				jobMinSalary.length - a === 6 ||
				jobMinSalary.length - a === 9 ||
				jobMinSalary.length - a === 12 ||
				jobMinSalary.length - a === 15 ||
				jobMinSalary.length - a === 18 ||
				jobMinSalary.length - a === 21
			) {
				finalMinSalary += jobMinSalary[a - 1] + ",";
			} else {
				finalMinSalary += jobMinSalary[a - 1];
			}
		}
		for (let a = 1; a <= jobMaxSalary.length; a++) {
			if (
				jobMaxSalary.length - a === 3 ||
				jobMaxSalary.length - a === 6 ||
				jobMaxSalary.length - a === 9 ||
				jobMaxSalary.length - a === 12 ||
				jobMaxSalary.length - a === 15 ||
				jobMaxSalary.length - a === 18 ||
				jobMaxSalary.length - a === 21
			) {
				finalMaxSalary += jobMaxSalary[a - 1] + ",";
			} else {
				finalMaxSalary += jobMaxSalary[a - 1];
			}
		}

		return (
			<div className='confirm-container'>
				<div className='confirm-text-fields'>
					<h3>--- Job Vacancy Preview ---</h3>
					<div className='form-fields'>
						<div className='form'>
							<label>Job Title</label>
							<p>{jobTitle}</p>
						</div>
						<div className='form'>
							<label>Job Category</label>
							<p>{jobCategory}</p>
						</div>
					</div>
					<div className='form-fields'>
						<div className='form'>
							<label>Place of Work</label>
							<p>
								{placeOfWork === address
									? "Company Location"
									: placeOfWork}
							</p>
						</div>
						<div className='form'>
							<label>Vacancy Count</label>
							<p>{noReqEmp}</p>
						</div>
					</div>
					<div className='form-fields'>
						<div className='form'>
							<label>Salary Range</label>
							<p>
								₱ {finalMinSalary} - ₱ {finalMaxSalary}
							</p>
						</div>
						<div className='form'>
							<label>Preferred Gender</label>
							<p>{prefSex}</p>
						</div>
					</div>
					<div className='form-fields'>
						<div className='form'>
							<label>Civil Status</label>
							<p>{civilStatus}</p>
						</div>
						<div className='form'>
							<label>Nature of Work</label>
							<p>{jobType}</p>
						</div>
					</div>
					<div className='form'>
						<label>Job Qualifications</label>
						<p className='desc'>{jobQualification}</p>
					</div>
					<div className='form'>
						<label>Job Requirements</label>
						<p className='desc'>{jobRequirement}</p>
					</div>
					<div className='form'>
						<label>Job Descriptions</label>
						<p className='desc'>{jobDescription}</p>
					</div>
					{/* <div className='form-fields'>
						<div className='form'>
							<label>Employer's Name</label>
							<p>{employerName}</p>
						</div>
						<div className='form'>
							<label>Establishment Contact Number</label>
							<p>{contactNo}</p>
						</div>
					</div>
					<div className='form'>
						<label>Complete Address</label>
						<p>{address}</p>
					</div> */}
					{/* contact person */}
					{contactPersonName !== null && (
						<>
							<div className='form'>
								<label>Contact Person (Full Name)</label>
								<p>{contactPersonName}</p>
							</div>
							<div className='form'>
								<label>Contact Person (Position)</label>
								<p>{contactPersonPosition}</p>
							</div>
							<div className='form'>
								<label>Contact Person (Contact Number)</label>
								<p>{contactPersonNumber}</p>
							</div>
							<div className='form'>
								<label>Contact Person (Email Address)</label>
								<p>{contactPersonEmail}</p>
							</div>
						</>
					)}
					<div className='buttons'>
						{targetJobPost ? (
							<button className='continue' onClick={this.updatePost}>
								Update
							</button>
						) : (
							<button className='continue' onClick={this.continue}>
								Post
							</button>
						)}

						<button className='back' onClick={this.back}>
							Back
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Confirm;
