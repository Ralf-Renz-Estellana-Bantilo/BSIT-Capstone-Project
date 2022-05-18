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
			values.jobTitle !== "" &&
			values.jobCategory !== "" &&
			values.placeOfWork !== "" &&
			values.noReqEmp !== "" &&
			values.minSalary !== "" &&
			values.maxSalary !== "" &&
			values.prefSex !== "" &&
			values.civilStatus !== "" &&
			values.jobType !== "" &&
			values.jobQualification !== "" &&
			// values.jobRequirement !== "" &&
			values.jobDescription !== ""
		) {
			this.closeIsNotValid();
			this.props.nextStep();
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

	formatPlaceOfWork = () => {
		const { placeOfWork } = this.props.values;
		let place = `${placeOfWork}`.split(", ");
		let formattedPlace = "";

		if (place.length === 1) {
			formattedPlace = placeOfWork;
		} else {
			if (place[0] === "" && place[1] !== "Not Specified") {
				formattedPlace = place[1] + ", " + place[2];
			} else if (place[0] !== "" && place[1] === "Not Specified") {
				formattedPlace = place[0] + ", " + place[2];
			} else if (place[0] === "" && place[1] === "Not Specified") {
				formattedPlace = place[2];
			} else {
				formattedPlace = placeOfWork;
			}
		}

		return formattedPlace;
	};

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		const { values, handleChange, isCurrentAddress } = this.props;

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

		const screenSize = document.body.clientWidth;
		const placeOfWork = this.formatPlaceOfWork();

		return (
			<div className='text-fields'>
				{this.state.isNotValid === false && (
					<Indication
						backgroundcolor='orange'
						text='MAKE SURE TO FILL-IN ALL THE FIELDS!'
						method={this.closeIsNotValid}
						delay={3}
						module='employer'
					/>
				)}
				<form className='post-input-container'>
					<h3>JOB VACANCY FORM</h3>
					<div className='post-fields'>
						<div className='post-field'>
							<label>Job Title:</label>
							<input
								list='jobLists'
								value={values.jobTitle}
								type='text'
								placeholder='Job Title'
								onChange={handleChange("jobTitle")}
							/>
							{screenSize > 600 && (
								<datalist id='jobLists'>{jobTitleSmartHints}</datalist>
							)}
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
						<div className='post-field'>
							<div className='place-of-work-container'>
								<label>
									Place of Work:{" "}
									<div className='place-of-work-check'>
										({" "}
										<input
											type='checkbox'
											name='placeOfWork'
											checked={
												isCurrentAddress === true
													? "checked"
													: values.address === values.placeOfWork
													? "checked"
													: ""
											}
											onChange={this.props.handleChangePlaceOfWork}
										/>
										<label style={{ paddingLeft: "5px" }}>
											Company Location
										</label>{" "}
										)
									</div>
								</label>
							</div>
							<input
								type='text'
								placeholder='Place of Work'
								onChange={handleChange("placeOfWork")}
								value={placeOfWork}
							/>
						</div>
						<div className='post-field'>
							<label>Job Vacancy Deadline (Optional): mm/dd/yyyy</label>
							<input
								value={values.jobRequirement}
								type='date'
								placeholder='01/11/2000'
								onChange={handleChange("jobRequirement")}
							/>
						</div>
						<div className='post-field-group'>
							<div className='post-field'>
								<label>Vacancy Count:</label>
								<input
									type='number'
									placeholder='Vacancy Count'
									onChange={handleChange("noReqEmp")}
									value={values.noReqEmp}
								/>
							</div>
							<div className='post-field'>
								<label>Gender:</label>
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
									<option value='Gay'>Gay</option>
									<option value='Lesbian'>Lesbian</option>
								</select>
							</div>
						</div>

						<div className='post-field-group'>
							<div className='post-field'>
								<label>Civil Status:</label>
								<select
									name='Civil Status'
									onChange={handleChange("civilStatus")}
									value={values.civilStatus}>
									<option disabled='disabled' hidden='hidden' value=''>
										Select Civil Status
									</option>
									<option value='Any'>Any</option>
									<option value='Single'>Single</option>
									<option value='Married'>Married</option>
									<option value='Widowed'>Widowed</option>
									<option value='Separated'>Separated</option>
									<option value='Live-in'>Live-in</option>
								</select>
							</div>
							<div className='post-field'>
								<label>Nature of Work:</label>
								<select
									name='Nature of Work'
									onChange={handleChange("jobType")}
									value={values.jobType}>
									<option disabled='disabled' hidden='hidden' value=''>
										Select Nature of Work
									</option>
									<option value='Full-time'>Full-time</option>
									<option value='Part-time'>Part-time</option>
									<option value='Contractual'>Contractual</option>
									<option value='Project-based'>Project-based</option>
									<option value='Work from home'>
										Work from home
									</option>
									<option value='Freelance'>Freelance</option>
									<option value='Internship/OJT'>
										Internship/OJT
									</option>
								</select>
							</div>
						</div>

						<div className='post-field-group'>
							<div className='post-field'>
								<label>Minimum Salary:</label>
								<input
									type='number'
									placeholder='Minimum Salary'
									onChange={handleChange("minSalary")}
									value={values.minSalary}
								/>
							</div>
							<div className='post-field'>
								<label>Maximum Salary:</label>
								<input
									type='number'
									placeholder='Maximum Salary'
									onChange={handleChange("maxSalary")}
									value={values.maxSalary}
								/>
							</div>
						</div>

						<div className='job-qualification'>
							<h4>Hiring Requirements</h4>
							<textarea
								name='work-experience'
								placeholder=' - Sample 
                            - Job 
                            - Qualifications'
								style={{ height: "200px" }}
								onChange={handleChange("jobQualification")}
								value={values.jobQualification}></textarea>
						</div>
						{/* <div className='job-qualification'>
							<h4>Job Requirements</h4>
							<textarea
								name='work-experience'
								placeholder=' - Sample
                            - Job
                            - Requirements'
								onChange={handleChange("jobRequirement")}
								defaultValue={values.jobRequirement}></textarea>
						</div> */}
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
