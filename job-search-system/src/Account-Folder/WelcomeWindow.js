import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router";
import CountDown from "../JOBSEEKER/Home-Folder/CountDown";
import "./WelcomeWindow.css";

export class WelcomeWindow extends Component {
	push = (path) => {
		this.props.history.push(path);
	};

	filterAppliedJobs = async (appliedJobs) => {
		// Determine whether or not the applicant is applied or not
		const { infos } = this.props;
		for (let post = 0; post < infos.length; post++) {
			if (appliedJobs.length !== 0) {
				for (let applied = 0; applied < appliedJobs.length; applied++) {
					if (infos[post].JobID === appliedJobs[applied].JobID) {
						await this.props.setAppliedJobs(appliedJobs[applied].JobID);
						break;
					} else {
						await this.props.resetAppliedJobs(infos[post].JobID);
					}
				}
			} else {
				await this.props.resetAppliedJobs(infos[post].JobID);
			}
		}
	};

	componentWillUnmount = async () => {
		try {
			this.push(this.props.path);
			const sessionUser = sessionStorage.getItem("UserID");
			const applicantSession = sessionStorage.getItem("ApplicantID");
			const companySession = sessionStorage.getItem("CompanyID");

			if (applicantSession) {
				// Fetching Job Posts Data
				await axios
					.get("http://localhost:2000/api/read-jobPost")
					.then((response) => {
						this.props.setJobPosts(response.data);
					});

				// Fetching Job Applicant Data
				await axios
					.post("http://localhost:2000/api/read-applied-jobs", {
						applicantID: applicantSession,
					})
					.then(async (response) => {
						await this.props.getAppliedJobs(response.data);
						await this.filterAppliedJobs(response.data);
					});

				// Fetching Employer Feedback Data
				await axios
					.post(
						"http://localhost:2000/api/read-specific-applicant-notification",
						{
							applicantID: applicantSession,
						}
					)
					.then(async (response) => {
						await this.props.setEmployerFeedBack(response.data);
					});

				// Fetching Company Data
				await axios
					.get("http://localhost:2000/api/read-companies")
					.then(async (response) => {
						await this.props.setCompany(response.data);
					});
			} else if (companySession) {
				// Fetching Job Applicant Data ------------
				await axios
					.post("http://localhost:2000/api/read-job-applicant", {
						companyID: companySession,
					})
					.then(async (response) => {
						await this.props.getJobApplicantsByCompany(response.data);
					});

				await axios
					.post("http://localhost:2000/api/read-company", {
						userID: sessionUser,
					})
					.then(async (response) => {
						if (response.data.length === 1) {
							await this.props.setCompany(response.data[0]);
						} else {
							console.log("Error fetching information...");
						}
					});

				// Fetching Job Posts Data
				await axios
					.post("http://localhost:2000/api/read-company-jobPost", {
						companyID: companySession,
					})
					.then(async (response) => {
						if (response) {
							await this.props.setCompanyJobPosts(response.data);
						} else {
							console.log("Error fetching information...");
						}
					});

				// Fetching Employer Feedback Data
				await axios
					.post(
						"http://localhost:2000/api/read-specific-employer-feedback",
						{
							companyID: companySession,
						}
					)
					.then(async (response) => {
						await this.props.setEmployerFeedBack(response.data);
					});
			}
		} catch (error) {
			console.log(error);
		}
	};
	render() {
		const { First_Name, Last_Name } = this.props.currentUser;

		return (
			<div className='welcome-container'>
				<div className='welcome-container-overlay'></div>
				<div className='welcome-container-content'>
					<img src={this.props.roleGif} alt='Loading1 gif' />
					<h3>Welcome {`${First_Name} ${Last_Name}`}</h3>
					<span>
						{
							<CountDown
								method={this.props.method}
								delay={this.props.delay}
							/>
						}
					</span>
				</div>
			</div>
		);
	}
}

export default withRouter(WelcomeWindow);
