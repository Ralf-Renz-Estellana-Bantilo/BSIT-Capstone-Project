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
				salary,
				prefSex,
				jobType,
				jobQualification,
				jobRequirement,
				jobDescription,
				address,
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
					Required_Employees: noReqEmp,
					Salary: salary,
					Job_Type: jobType,
					Preferred_Sex: prefSex,
					Job_Qualifications: jobQualification,
					Job_Requirements: jobRequirement,
					Job_Description: jobDescription,
					Employer_Name: this.props.company.Employer_Name,
					Company_Image: this.props.company.Company_Image,
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
			salary,
			prefSex,
			jobType,
			jobQualification,
			jobRequirement,
			jobDescription,
			address,
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
			Salary: salary,
			Job_Type: jobType,
			Preferred_Sex: prefSex,
			Job_Qualifications: jobQualification,
			Job_Requirements: jobRequirement,
			Job_Description: jobDescription,
			Employer_Name: this.props.company.Employer_Name,
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
				salary,
				prefSex,
				jobType,
				jobQualification,
				jobRequirement,
				jobDescription,
				employerName,
				contactNo,
				address,
			},
			targetJobPost,
		} = this.props;

		return (
			<div className='confirm-container'>
				<div className='confirm-text-fields'>
					<h3>--- Job Vacancy Preview ---</h3>

					<div className='form'>
						<label>Job Title</label>
						<p>{jobTitle}</p>
					</div>
					<div className='form'>
						<label>Job Category</label>
						<p>{jobCategory}</p>
					</div>
					<div className='form'>
						<label>No. of Required Employee/s:</label>
						<p>{noReqEmp}</p>
					</div>
					<div className='form'>
						<label>Salary</label>
						<p>₱ {salary}</p>
					</div>
					<div className='form'>
						<label>Preferred Sex</label>
						<p>{prefSex}</p>
					</div>
					<div className='form'>
						<label>Job Type</label>
						<p>{jobType}</p>
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
					<div className='form'>
						<label>Employer's Name</label>
						<p>{employerName}</p>
					</div>
					<div className='form'>
						<label>Establishment Contact Number</label>
						<p>{contactNo}</p>
					</div>

					<div className='form'>
						<label>Complete Address</label>
						<p>{address}</p>
					</div>

					<div className='buttons'>
						{targetJobPost.JobID !== undefined ? (
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
