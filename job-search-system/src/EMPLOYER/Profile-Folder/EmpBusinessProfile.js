import React, { Component } from "react";
import EmpNavbar from "../EmpNavbar";
import EmpGap from "../EmpGap";
import { withRouter } from "react-router-dom";
import EmpDP from "./EmpDP";
import EmpCompanyProfile from "./EmpCompanyProfile";
import TimeStamp from "../../TimeStamp";
import "./EmpBusinessProfile.css";

export class Emp_BusinessProfile extends Component {
	state = {
		company: [],
		messagedApplicants: [],
		timeElapsed: [],
		prevJobs: [],
	};

	handleViewHiree = (applicant) => {
		this.props.setHiree(applicant);
		this.props.history.push("/employer/applicant-information");
	};

	componentDidMount = async () => {
		const { applicants, employerFeedback } = this.props;

		if (employerFeedback.length > 0) {
			for (let a = 0; a < employerFeedback.length; a++) {
				for (let b = 0; b < applicants.length; b++) {
					if (
						applicants[b].ApplicantID ===
							employerFeedback[a].ApplicantID &&
						employerFeedback[a].Type === "recruit"
					) {
						await this.setState({
							messagedApplicants: [
								...this.state.messagedApplicants,
								applicants[b],
							],
							timeElapsed: [
								...this.state.timeElapsed,
								employerFeedback[a],
							],
						});
					}
				}
			}
		}
		const session = sessionStorage.getItem("UserID");

		if (!session) {
			localStorage.clear();
			this.props.history.push("/login");
		}

		localStorage.setItem("activePage", "business-profile");
		localStorage.setItem("isSearchOpen", false);
	};

	render() {
		const { currentUser, darkTheme, employerFeedback } = this.props;
		const { messagedApplicants } = this.state;

		return (
			<div>
				<EmpGap />
				<EmpNavbar
					isSidebarOpen={this.props.isSidebarOpen}
					toggleSidebar={this.props.toggleSidebar}
					currentUser={currentUser}
					company={this.props.company}
					setCurrentUser={this.props.setCurrentUser}
					getJobApplicantsByCompany={this.props.getJobApplicantsByCompany}
					panel='Business Profile'
					darkTheme={this.props.darkTheme}
				/>
				<EmpDP
					company={this.props.company}
					currentUser={currentUser}
					changeCompanyProfile={this.props.changeCompanyProfile}
				/>
				<EmpCompanyProfile
					company={this.props.company}
					currentUser={currentUser}
					darkTheme={this.props.darkTheme}
					updateCompanyProfile={this.props.updateCompanyProfile}
					toggleIndication={this.props.toggleIndication}
					isIndicationOpen={this.props.isIndicationOpen}
				/>

				<div className='applied-jobs-container'>
					<div className='applied-jobs-title'>
						<h3>Job Seekers that you messaged: </h3>
						<h3 style={{ textAlign: "right" }}>
							({messagedApplicants.length})
						</h3>
					</div>

					{messagedApplicants.length <= 0 && (
						<p
							style={{
								textAlign: "center",
								padding: "10px",
								backgroundColor: "red",
								fontSize: "12px",
							}}>
							No messaged job seekers yet!
						</p>
					)}

					{employerFeedback.map((feedback) => {
						for (let b = 0; b < messagedApplicants.length; b++) {
							if (
								feedback.ApplicantID ===
									messagedApplicants[b].ApplicantID &&
								feedback.Application_Status === "(n/a)"
							) {
								let address =
									messagedApplicants[b].Home_Address.split(", ")[
										messagedApplicants[b].Home_Address.split(", ")
											.length - 1
									];

								return (
									<div
										className='job'
										key={feedback.FeedbackID}
										onClick={async () => {
											await this.props.setEmployerMessage(feedback);
											this.handleViewHiree(messagedApplicants[b]);
										}}>
										<div
											className='job-status'
											style={
												messagedApplicants[b].Hiring_Status ===
												"Active"
													? { backgroundColor: "rgb(0, 255, 0)" }
													: { backgroundColor: "rgb(255, 0, 0)" }
											}
										/>
										<div
											className='job-detail-container'
											style={
												darkTheme
													? { backgroundColor: "#0f0f0f" }
													: { backgroundColor: "white" }
											}>
											<div className='job-detail-upper-portion'>
												<h2>{`${messagedApplicants[b].First_Name} ${messagedApplicants[b].Middle_Name} ${messagedApplicants[b].Last_Name}`}</h2>
												<p>
													{TimeStamp.setTimeStamp(
														feedback.Minutes,
														feedback.Hour,
														feedback.Day,
														feedback.Month,
														feedback.Year
													)}
												</p>
											</div>
											<div className='job-detail-lower-portion'>
												<div className='job-detail-lower-portion-left'>
													<h3>{feedback.Job_Title}</h3>
												</div>
												<p>{address}</p>
											</div>
										</div>
									</div>
								);
							}
						}
					})}
				</div>
			</div>
		);
	}
}

export default withRouter(Emp_BusinessProfile);
