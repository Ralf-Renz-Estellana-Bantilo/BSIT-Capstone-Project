import React, { Component } from "react";
import JobVacancyFormPart1 from "./JobVacancyFormPart1";
import JobVacancyFormPart2 from "./JobVacancyFormPart2";
import Confirm from "./Confirm";
import Success from "./Success";
import axios from "axios";
import Resources from "../../Resources";

export class JobVacancyForm extends Component {
	state = {
		step: 1,
		jobTitle: "",
		jobCategory: "",
		noReqEmp: "",
		salary: "",
		prefSex: "",
		jobType: "",
		jobQualification: "",
		jobRequirement: "",
		jobDescription: "",
		employerName: "",
		contactNo: "",
		address: "",

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

	viewPost = (post) => {
		this.props.onAddPost(post);
	};

	confirmJobPost = async (post) => {
		await this.setState({
			jobPost: post,
		});
	};

	componentDidMount = async () => {
		const { targetJobPost, company } = this.props;

		if (targetJobPost) {
			this.setState({
				jobTitle: targetJobPost.Job_Title,
				jobCategory: targetJobPost.Category,
				noReqEmp: targetJobPost.Required_Employees,
				salary: targetJobPost.Salary,
				prefSex: targetJobPost.Preferred_Sex,
				jobType: targetJobPost.Job_Type,
				jobQualification: targetJobPost.Job_Qualifications,
				jobRequirement: targetJobPost.Job_Requirements,
				jobDescription: targetJobPost.Job_Description,
				employerName: company.Employer_Name,
				contactNo: company.Contact_Number,
				address: `${company.Street}, ${company.Zone}, ${company.Barangay}`,
			});
		} else {
			this.setState({
				employerName: company.Employer_Name,
				contactNo: company.Contact_Number,
				address: `${company.Street}, ${company.Zone}, ${company.Barangay}`,
			});
		}
	};

	render() {
		const { step } = this.state;

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
			employerName,
			contactNo,
			website,
			address,
		} = this.state;
		const values = {
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
			website,
			address,
		};

		switch (step) {
			case 1:
				return (
					<JobVacancyFormPart1
						nextStep={this.nextStep}
						handleChange={this.handleChange}
						values={values}
						targetJobPost={this.props.targetJobPost}
					/>
				);

			case 2:
				return (
					<JobVacancyFormPart2
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={this.handleChange}
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
