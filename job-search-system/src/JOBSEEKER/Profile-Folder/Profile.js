import React, { Component } from "react";
import Gap from "../../Gap";
import { Header } from "../../Header";
import { withRouter } from "react-router-dom";
import Navbar from "../../Navbar";
import Dp from "./Dp";
import JobProfile from "./JobProfile";
import "./Profile.css";
import AppliedJob from "./AppliedJob";

export class Profile extends Component {
	state = {
		applicantID: "",
		appliedJobsNum: [],
		hiringState: "",
	};

	handleChangePage = async (page) => {
		await this.props.handleChangePage(page);
	};

	handleToggleHire = async () => {
		const { hiringState } = this.state;
		const applicantSession = sessionStorage.getItem("ApplicantID");
		if (hiringState === "Active") {
			await this.setState({ hiringState: "Inactive" });
			await this.props.toggleHiringStatus(applicantSession, "Inactive");
		} else {
			await this.setState({ hiringState: "Active" });
			await this.props.toggleHiringStatus(applicantSession, "Active");
		}
	};

	componentDidMount = async () => {
		const scrollData = localStorage.getItem("profileScroll");
		window.scrollTo(0, scrollData);

		const session = sessionStorage.getItem("UserID");

		if (!session) {
			localStorage.clear();
			this.props.history.push("/login");
		}

		const { applicants } = this.props;
		for (let a = 0; a < applicants.length; a++) {
			if (applicants[a].UserID === session) {
				await this.setState({ hiringState: applicants[a].Hiring_Status });
			}
		}

		await this.handleChangePage("profile");
	};

	componentWillUnmount() {
		localStorage.setItem("profileScroll", window.pageYOffset);
		window.scrollTo(0, window.pageYOffset);
	}

	render() {
		const applicantSession = sessionStorage.getItem("ApplicantID");
		const session = sessionStorage.getItem("UserID");
		const { applicants, company } = this.props;

		const { hiringState } = this.state;
		let hiringStatus = "";
		if (hiringState !== "") {
			hiringStatus = hiringState;
		} else {
			for (let a = 0; a < applicants.length; a++) {
				if (applicants[a].UserID === session) {
					hiringStatus = applicants[a].Hiring_Status;
				}
			}
		}

		return (
			<>
				<Header
					currentUser={this.props.currentUser}
					history={this.props.history}
				/>
				<Navbar
					activePage='profile'
					applicants={this.props.applicants}
					employerFeedback={this.props.employerFeedback}
					setEmployerFeedBack={this.props.setEmployerFeedBack}
					darkTheme={this.props.darkTheme}
				/>
				<Gap />

				<Dp
					currentUser={this.props.currentUser}
					handleToggleHire={this.handleToggleHire}
					hiringStatus={hiringStatus}
					setTheme={this.props.setTheme}
					applicants={this.props.applicants}
					changeCurrentUserProfile={this.props.changeCurrentUserProfile}
				/>
				<JobProfile
					currentUser={this.props.currentUser}
					userData={this.props.userData}
					user={this.props.user}
					infos={this.props.infos}
					applicants={this.props.applicants}
					setApplicants={this.props.setApplicants}
					darkTheme={this.props.darkTheme}
					updateApplicantData={this.props.updateApplicantData}
				/>

				<div className='applied-jobs-container'>
					<div className='applied-jobs-title'>
						<h3>Jobs you Applied for: </h3>
						<h3 style={{ textAlign: "right" }}>
							({this.props.appliedJobs.length})
						</h3>
					</div>
					{this.props.appliedJobs.length <= 0 && (
						<p
							style={{
								textAlign: "center",
								padding: "10px",
								backgroundColor: "red",
								fontSize: "12px",
							}}>
							You haven't applied for a job yet!
						</p>
					)}
					{this.props.appliedJobs.map((appliedJob) => {
						let appliedCompany = [];
						for (let a = 0; a < company.length; a++) {
							if (appliedJob.CompanyID === company[a].CompanyID) {
								appliedCompany = company[a];
								break;
							}
						}
						if (appliedJob.ApplicantID === applicantSession) {
							return (
								<div key={appliedJob.JobID}>
									<AppliedJob
										appliedJob={appliedJob}
										company={appliedCompany}
										currentUser={this.props.currentUser}
										activePage={this.props.activePage}
										handleChangePage={this.props.handleChangePage}
										setCompanyID={this.props.setCompanyID}
										darkTheme={this.props.darkTheme}
										infos={this.props.infos}
										employerFeedback={this.props.employerFeedback}
									/>
								</div>
							);
						}
					})}
				</div>
				<div style={{ marginBottom: "20px" }}></div>
			</>
		);
	}
}

export default withRouter(Profile);
