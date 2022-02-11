import React, { Component } from "react";
import EmpNavbar from "../EmpNavbar";
import EmpGap from "../EmpGap";
import "./EmpApplicant.css";
import { withRouter } from "react-router-dom";
import EmpJobApplicants from "./EmpJobApplicants";
import EmpApplicantsSummary from "./EmpApplicantsSummary";
import Indication from "../../Indication";

export class EmpApplicant extends Component {
	state = {
		company: this.props.company,
		numberOfApplicants: 0,
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
				<EmpGap />
				<EmpNavbar
					isSidebarOpen={this.props.isSidebarOpen}
					toggleSidebar={this.props.toggleSidebar}
					currentUser={currentUser}
					company={company}
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
									<EmpJobApplicants
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
						<EmpApplicantsSummary
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

export default withRouter(EmpApplicant);
