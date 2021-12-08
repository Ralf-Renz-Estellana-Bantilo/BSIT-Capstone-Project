import React, { Component } from "react";
import Indication from "../../Indication";
import Resources from "../../Resources";
import "./JobVacancyFormPart1.css";

export class JobVacancyFormPart1 extends Component {
	state = {
		isNotValid: true,
	};

	continue = (e) => {
		e.preventDefault();
		const { values } = this.props;

		if (
			values.jobTitle !== undefined &&
			values.jobCategory !== undefined &&
			values.noReqEmp !== undefined &&
			values.salary !== undefined &&
			values.prefSex !== undefined &&
			values.jobType !== undefined &&
			values.jobQualification !== undefined &&
			values.jobRequirement !== undefined &&
			values.jobDescription !== undefined
		) {
			this.closeIsNotValid();
			this.props.nextStep();
			console.log(values);
		} else {
			this.setState({
				isNotValid: false,
			});
		}
	};

	closeIsNotValid = () => {
		this.setState({
			isNotValid: true,
		});
	};

	detectJob = (e) => {
		console.log(e.target.value);
	};

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		const { values, handleChange } = this.props;

		const categories = Resources.getCategories();
		const jobTitles = Resources.getCategoriesWithDescription();

		let categoryResources = categories.map((category) => {
			return (
				<option key={category} value={category}>
					{category}
				</option>
			);
		});

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

		return (
			<div className='text-fields'>
				{this.state.isNotValid === false && (
					<Indication
						backgroundcolor='orange'
						text='Make sure to fill-in all the fields!'
						method={this.closeIsNotValid}
						delay={3}
						module='employer'
					/>
				)}
				<form className='post-input-container'>
					<h3>--- Job Vacancy Form ---</h3>
					<div className='post-fields'>
						<div className='post-field'>
							<label>Job Title:</label>
							{/* <input
								placeholder='Job Title'
								list='jobTitleList'
							/> */}
							<input
								list='jobLists'
								value={values.jobTitle}
								type='text'
								placeholder='Job Title'
								onChange={handleChange("jobTitle")}
							/>
							<datalist id='jobLists'>{jobTitleSmartHints}</datalist>
						</div>
						<div className='post-field'>
							<label>Job Category:</label>
							<select
								name='Job Category'
								onChange={handleChange("jobCategory")}
								value={values.jobCategory}>
								<option disabled='disabled' hidden='hidden' value=''>
									Select Job Category
								</option>
								{categoryResources}
							</select>
						</div>
						<div className='post-field-group'>
							<div className='post-field'>
								<label>No. of Employees:</label>
								<input
									type='number'
									placeholder='No. of Employees'
									onChange={handleChange("noReqEmp")}
									value={values.noReqEmp}
								/>
							</div>
							<div className='post-field'>
								<label>Salary:</label>
								<input
									type='number'
									placeholder='₱ ----'
									onChange={handleChange("salary")}
									value={values.salary}
								/>
							</div>
						</div>

						<div className='post-field-group'>
							<div className='post-field'>
								<label>Preferred Sex:</label>
								<select
									name='Preferred Sex'
									onChange={handleChange("prefSex")}
									value={values.prefSex}>
									<option disabled='disabled' hidden='hidden' value=''>
										Select Gender
									</option>
									<option value='Male'>Male</option>
									<option value='Female'>Female</option>
									<option value='Male/Female'>Male/Female</option>
								</select>
							</div>
							<div className='post-field'>
								<label>Job Type:</label>
								<select
									name='Job Type'
									onChange={handleChange("jobType")}
									value={values.jobType}>
									<option disabled='disabled' hidden='hidden' value=''>
										Select Job Type
									</option>
									<option value='Full-time'>Full-time</option>
									<option value='Part-time'>Part-time</option>
									<option value='Contract'>Contract</option>
									<option value='Urgent Hiring'>Urgent Hiring</option>
									<option value='Temporary'>Temporary</option>
									<option value='Seasonal'>Seasonal</option>
									<option value='Freelance'>Freelance</option>
									<option value='Intern'>Intern</option>
								</select>
							</div>
						</div>
						<div className='job-qualification'>
							<h4>Job Qualifications</h4>
							<textarea
								name='work-experience'
								placeholder=' - Sample 
                            - Job 
                            - Qualifications'
								onChange={handleChange("jobQualification")}
								value={values.jobQualification}></textarea>
						</div>
						<div className='job-qualification'>
							<h4>Job Requirements</h4>
							<textarea
								name='work-experience'
								placeholder=' - Sample
                            - Job
                            - Requirements'
								onChange={handleChange("jobRequirement")}
								defaultValue={values.jobRequirement}></textarea>
						</div>
						<div className='job-qualification'>
							<h4>Job Description</h4>
							<textarea
								name='work-experience'
								placeholder=' Sample Description'
								onChange={handleChange("jobDescription")}
								defaultValue={values.jobDescription}></textarea>
						</div>

						<div className='post-field'>
							<button onClick={(e) => this.continue(e)}>Next</button>
						</div>

						<div className='warning'>
							<p>Reminder: Fill-in all the fields!</p>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default JobVacancyFormPart1;
