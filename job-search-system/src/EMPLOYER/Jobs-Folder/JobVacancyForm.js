import React, { Component } from "react";
import JobVacancyFormPart1 from "./JobVacancyFormPart1";
import JobVacancyFormPart2 from "./JobVacancyFormPart2";
import Confirm from "./Confirm";
import Success from "./Success";
import Resources from "../../Resources";

export class JobVacancyForm extends Component {
	state = {
		step: 1,
		isCurrentAddress: false,

		// job vacancy form
		jobTitle: "",
		jobCategory: "",
		noReqEmp: "",
		minSalary: "",
		maxSalary: "",
		prefSex: "",
		civilStatus: "",
		jobType: "",
		jobQualification: "",
		jobRequirement: "",
		jobDescription: "",
		placeOfWork: "",

		// employer form
		employerName: null,
		contactNo: null,
		address: null,
		emailAddress: null,
		contactPersonName: null,
		contactPersonPosition: null,
		contactPersonNumber: null,
		contactPersonEmail: null,

		jobPost: {},
		company: [],
	};

	// proceed to the next step
	nextStep = () => {
		const { step } = this.state;
		this.setState({
			step: step + 1,
		});
	};

	// go back to the prev step
	prevStep = () => {
		const { step } = this.state;
		this.setState({
			step: step - 1,
		});
	};

	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });

		const jobTitles = Resources.getCategoriesWithDescription();
		for (let a = 0; a < jobTitles.length; a++) {
			for (let b = 0; b < jobTitles[a].jobs.length; b++) {
				if (jobTitles[a].jobs[b] === e.target.value) {
					this.setState({
						jobCategory: jobTitles[a].category,
					});
				}
			}
		}
	};

	toggleView = () => {
		this.props.toggle();
	};

	handleChangePlaceOfWork = async () => {
		const { isCurrentAddress, address } = this.state;
		await this.setState({
			isCurrentAddress: !isCurrentAddress,
		});

		if (!isCurrentAddress) {
			await this.setState({
				placeOfWork: address,
			});
		} else {
			await this.setState({
				placeOfWork: "",
			});
		}
	};

	viewPost = (post) => {
		this.props.onAddPost(post);
	};

	confirmJobPost = async (post) => {
		await this.setState({
			jobPost: post,
		});
	};

	handleResetContactPerson = () => {
		this.setState({
			contactPersonName: null,
			contactPersonPosition: null,
			contactPersonNumber: null,
			contactPersonEmail: null,
		});
	};

	componentDidMount = () => {
		const { targetJobPost, company } = this.props;

		if (targetJobPost) {
			this.setState({
				jobTitle: targetJobPost.Job_Title,
				jobCategory: targetJobPost.Category,
				noReqEmp: targetJobPost.Required_Employees,
				minSalary: targetJobPost.Minimum_Salary,
				maxSalary: targetJobPost.Maximum_Salary,
				prefSex: targetJobPost.Preferred_Sex,
				civilStatus: targetJobPost.Civil_Status,
				jobType: targetJobPost.Job_Type,
				jobQualification: targetJobPost.Job_Qualifications,
				jobRequirement: targetJobPost.Job_Requirements,
				jobDescription: targetJobPost.Job_Description,
				employerName: company.Employer_Name,
				contactNo: company.Contact_Number,
				// address: `${company.Street}, ${company.Zone}, ${company.Barangay}`,
				address: targetJobPost.Company_Address,
				placeOfWork: targetJobPost.Work_Place,
				contactPersonName: targetJobPost.Contact_Person_Name,
				contactPersonPosition: targetJobPost.Contact_Person_Position,
				contactPersonNumber: targetJobPost.Contact_Person_Number,
				contactPersonEmail: targetJobPost.Contact_Person_Email,
			});
		} else {
			this.setState({
				employerName: company.Employer_Name,
				contactNo: company.Contact_Number,
				address: `${company.Street}, ${company.Zone}, ${company.Barangay}`,
				placeOfWork: `${company.Street}, ${company.Zone}, ${company.Barangay}`,
				emailAddress: company.Email_Address,
			});
		}
	};

	render() {
		const { step } = this.state;

		const {
			jobTitle,
			jobCategory,
			noReqEmp,
			minSalary,
			maxSalary,
			prefSex,
			jobType,
			jobQualification,
			jobRequirement,
			jobDescription,
			placeOfWork,
			employerName,
			contactNo,
			address,
			civilStatus,
			emailAddress,
			contactPersonName,
			contactPersonPosition,
			contactPersonNumber,
			contactPersonEmail,
			isCurrentAddress,
		} = this.state;

		const values = {
			jobTitle,
			jobCategory,
			noReqEmp,
			minSalary,
			maxSalary,
			prefSex,
			jobType,
			jobQualification,
			jobRequirement,
			jobDescription,
			placeOfWork,
			employerName,
			contactNo,
			address,
			civilStatus,
			emailAddress,
			contactPersonName,
			contactPersonPosition,
			contactPersonNumber,
			contactPersonEmail,
			isCurrentAddress,
		};

		switch (step) {
			case 1:
				return (
					<JobVacancyFormPart1
						nextStep={this.nextStep}
						handleChange={this.handleChange}
						handleChangePlaceOfWork={this.handleChangePlaceOfWork}
						values={values}
						isCurrentAddress={isCurrentAddress}
						targetJobPost={this.props.targetJobPost}
					/>
				);

			case 2:
				return (
					<JobVacancyFormPart2
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={this.handleChange}
						handleResetContactPerson={this.handleResetContactPerson}
						values={values}
						company={this.props.company}
						targetJobPost={this.props.targetJobPost}
					/>
				);

			case 3:
				return (
					<Confirm
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						values={values}
						confirmJobPost={this.confirmJobPost}
						company={this.props.company}
						targetJobPost={this.props.targetJobPost}
					/>
				);

			case 4:
				return (
					<Success
						toggle={this.toggleView}
						jobPost={this.state.jobPost}
						onAddPost={this.viewPost}
						targetJobPost={this.props.targetJobPost}
						resetTargetJobPost={this.props.resetTargetJobPost}
						updateJobPostContent={this.props.updateJobPostContent}
					/>
				);

			default:
				<p>Default Page</p>;
		}
	}
}

export default JobVacancyForm;
