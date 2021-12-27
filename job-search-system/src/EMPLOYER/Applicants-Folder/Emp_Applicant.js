import React, { Component } from "react";
import Emp_Navbar from "../Emp_Navbar";
import Emp_Gap from "../Emp_Gap";
import axios from "axios";
import "./Emp_Applicant.css";
import { withRouter } from "react-router-dom";
import Emp_Job_Applicants from "./Emp_Job_Applicants";
import Emp_Applicants_Summary from "./Emp_Applicants_Summary";
import Indication from "../../Indication";

export class Emp_Applicant extends Component {
	state = {
		company: this.props.company,
		infos: this.props.companyJobPost,
		numberOfApplicants: 0,
		jobApplicants: [],
		scrollPosition: 0,
		isSummaryOpen: false,
		candidates: [],
		activeStatus: "",
		jobTitle: "",
		requiredEmp: 0,
		applied: 0,
	};

	addCandidates = (candidate) => {
		this.setState({
			candidates: candidate,
		});
	};

	setJobTitle = (activeStatus, title, req, app) => {
		this.setState({
			activeStatus: activeStatus,
			jobTitle: title,
			requiredEmp: req,
			applied: app,
		});
	};

	toggleSummaryPanel = () => {
		this.setState({
			isSummaryOpen: !this.state.isSummaryOpen,
		});
	};

	closeDeleteState = async () => {
		await this.props.closeDeleteState();
	};

	openDeleteState = async () => {
		await this.props.setDeleteState();
	};

	componentDidMount() {
		const session = sessionStorage.getItem("UserID");

		if (!session) {
			localStorage.clear();
			this.props.history.push("/login");
		}

		localStorage.setItem("activePage", "applicants");
		localStorage.setItem("isSearchOpen", false);
	}

	render() {
		const { currentUser, jobApplicants, companyJobPost } = this.props;
		const {
			company,
			activeStatus,
			candidates,
			isSummaryOpen,
			jobTitle,
			requiredEmp,
			applied,
		} = this.state;

		const month = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"June",
			"July",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];

		return (
			<div>
				<Emp_Gap />
				<Emp_Navbar
					isSidebarOpen={this.props.isSidebarOpen}
					toggleSidebar={this.props.toggleSidebar}
					handleLogout={this.props.handleLogout}
					currentUser={currentUser}
					company={company}
					setCurrentUser={this.props.setCurrentUser}
					getJobApplicantsByCompany={this.props.getJobApplicantsByCompany}
					panel='Applicants'
					darkTheme={this.props.darkTheme}
				/>

				{isSummaryOpen === true ? (
					""
				) : (
					<div className='applicant-container'>
						{companyJobPost.map((info) => {
							let convertedMonth = "";

							for (let index = 0; index < month.length; index++) {
								if (info.Month - 1 === index) {
									convertedMonth = month[index];
								}
							}

							return (
								<div key={info.JobID}>
									<Emp_Job_Applicants
										info={info}
										jobApplicants={jobApplicants}
										updateCandidateStatus={this.updateCandidateStatus}
										convertedMonth={convertedMonth}
										setApplicantID={this.props.setApplicantID}
										setJobID={this.props.setJobID}
										addCandidates={this.addCandidates}
										toggleSummaryPanel={this.toggleSummaryPanel}
										setJobTitle={this.setJobTitle}
										setJobApplicantData={
											this.props.setJobApplicantData
										}
										updateJobApplicantStatus={
											this.props.updateJobApplicantStatus
										}
										darkTheme={this.props.darkTheme}
										deleteJobApplicants={
											this.props.deleteJobApplicants
										}
										openDeleteState={this.openDeleteState}
									/>
								</div>
							);
						})}
					</div>
				)}

				{isSummaryOpen === true && (
					<div className='summary'>
						<Emp_Applicants_Summary
							candidates={candidates}
							activeStatus={activeStatus}
							jobTitle={jobTitle}
							requiredEmp={requiredEmp}
							applied={applied}
							toggleSummaryPanel={this.toggleSummaryPanel}
						/>
					</div>
				)}

				{companyJobPost.length === 0 && (
					<p
						style={{
							textAlign: "center",
							padding: "10px",
							backgroundColor: "red",
							marginTop: "20px",
							fontSize: "12px",
						}}>
						You haven't posted anything yet!
					</p>
				)}

				{this.props.isDeleted === true && (
					<Indication
						type='secondary'
						text='Job applicant has been deleted!'
						method={this.closeDeleteState}
						delay={3}
						module='employer'
					/>
				)}
			</div>
		);
	}
}

export default withRouter(Emp_Applicant);
