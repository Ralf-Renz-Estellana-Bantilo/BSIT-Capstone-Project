import React, { Component } from "react";
import Emp_Navbar from "../Emp_Navbar";
import Emp_Gap from "../Emp_Gap";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Emp_DP from "./Emp_DP";
import Emp_Company_Profile from "./Emp_Company_Profile";
import TimeStamp from "../../TimeStamp";

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
		const { messagedApplicants, timeElapsed, prevJobs } = this.state;
		return (
			<div>
				<Emp_Gap />
				<Emp_Navbar
					isSidebarOpen={this.props.isSidebarOpen}
					toggleSidebar={this.props.toggleSidebar}
					handleLogout={this.props.handleLogout}
					currentUser={currentUser}
					company={this.props.company}
					setCurrentUser={this.props.setCurrentUser}
					getJobApplicantsByCompany={this.props.getJobApplicantsByCompany}
					panel='Business Profile'
					darkTheme={this.props.darkTheme}
				/>
				<Emp_DP
					company={this.props.company}
					currentUser={currentUser}
					changeCompanyProfile={this.props.changeCompanyProfile}
				/>
				<Emp_Company_Profile
					company={this.props.company}
					currentUser={currentUser}
					darkTheme={this.props.darkTheme}
					updateCompanyProfile={this.props.updateCompanyProfile}
				/>

				<div className='applied-jobs-container'>
					<h3
						style={{
							fontSize: "13px",
							color: "#5a5a5a",
							fontWeight: "600",
							marginLeft: "10px",
						}}>
						Job Seekers that you messaged:
					</h3>

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