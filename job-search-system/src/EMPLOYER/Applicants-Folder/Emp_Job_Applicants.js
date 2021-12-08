import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Resources from "../../Resources";
import TimeStamp from "../../TimeStamp";

export class Emp_Job_Applicants extends Component {
	constructor() {
		super();
		this.state = {
			toggleApplicantsPanel: true,
			height: 0,
			titleHeight: 0,
			count: 0,
			countHired: 0,
			applicants: [],
		};
	}

	togglePanel = async () => {
		await this.setState({
			toggleApplicantsPanel: !this.state.toggleApplicantsPanel,
		});
	};

	viewApplicant = (applicant) => {
		this.props.history.push("/employer/applicants/applicant-data");

		this.props.setApplicantID(applicant.id);
		this.props.setJobApplicantData(applicant);
	};

	addApplicants = (applicant) => {
		this.setState({
			applicants: [...this.state.applicants, applicant],
		});
	};

	applicantSummary = async (jobID) => {
		const { jobApplicants } = this.props;

		for (let b = 0; b < jobApplicants.length; b++) {
			if (jobApplicants[b].JobID === jobID) {
				await this.addApplicants(jobApplicants[b]);
			}
		}
		this.props.addCandidates(this.state.applicants);

		this.props.toggleSummaryPanel();
	};

	componentDidMount = async () => {
		const height = this.divElement.clientHeight;
		const titleHeight = this.titleElement.clientHeight;
		this.setState({ height });
		this.setState({ titleHeight });

		const { info, jobApplicants } = this.props;
		for (let index = 0; index < jobApplicants.length; index++) {
			if (info.JobID === jobApplicants[index].JobID) {
				await this.setState({ count: this.state.count + 1 });
			}
			if (
				jobApplicants[index].Candidate_Status === "Hired" &&
				info.JobID === jobApplicants[index].JobID
			) {
				await this.setState({ countHired: this.state.countHired + 1 });
			}
		}
	};

	render() {
		const { info, jobApplicants, convertedMonth, darkTheme } = this.props;
		const { height, titleHeight, toggleApplicantsPanel, count, countHired } =
			this.state;

		return (
			<div
				className='job-post-summary-parent-container'
				style={
					!toggleApplicantsPanel
						? { height: `${titleHeight + 1}px` }
						: { height: `${height}px` }
				}>
				<div
					className='job-post-summary-container'
					ref={(divElement) => {
						this.divElement = divElement;
					}}>
					<div
						className='job-post-title'
						ref={(titleElement) => {
							this.titleElement = titleElement;
						}}
						style={
							info.Active_Status === "Active"
								? {
										borderLeft: "5px solid #1eff00",
										boxShadow: "1px 0px 2px black",
								  }
								: {
										borderLeft: "5px solid #ff0000",
										boxShadow: "2px 0px 2px black",
								  }
						}>
						<div
							className='job-post-content-left-container'
							onClick={() => {
								this.applicantSummary(info.JobID);
								this.props.setJobTitle(
									info.Active_Status,
									info.Job_Title,
									info.Required_Employees,
									count
								);
							}}>
							<h3>{`${info.Job_Title}`}</h3>
							<p>
								Req: <strong>{info.Required_Employees}</strong> | Hired:{" "}
								<strong>{countHired}</strong> | Applied:{" "}
								<strong>{count}</strong>
							</p>
						</div>
						<div className='job-post-content-right-container'>
							<p>{`• ${convertedMonth} ${info.Day}, ${info.Year}`}</p>
							<div
								className='toggle-job-post-content'
								onClick={this.togglePanel}
								style={
									toggleApplicantsPanel
										? {
												background:
													"linear-gradient(20deg, #ff004c, #ff7b00)",
										  }
										: {
												background:
													"linear-gradient(20deg, #00b2ff, #006aff)",
										  }
								}>
								{toggleApplicantsPanel ? "-" : "+"}
							</div>
						</div>
					</div>

					{jobApplicants.map((applicant) => {
						let homeAddress = "";
						if (applicant.JobID === info.JobID) {
							homeAddress =
								applicant.Home_Address.split(", ")[
									applicant.Home_Address.split(", ").length - 1
								];

							return (
								<div
									className={
										applicant.Status === "New"
											? "applicant-info-container-new"
											: "applicant-info-container"
									}
									key={applicant.id}>
									<div
										className='applicant-info'
										onClick={async (e) => {
											this.viewApplicant(applicant);
											await this.props.setJobID(applicant.JobID);
											await this.props.updateJobApplicantStatus(
												applicant.JobID,
												applicant.ApplicantID
											);
										}}>
										<div className='applicant-info-left-portion'>
											<div className='applicant-image'>
												<img
													src={`../assets/${applicant.User_Image}`}
													alt='User'
												/>
											</div>
											<div className='applicant-name'>
												<h3>{`${applicant.Last_Name}, ${applicant.First_Name}`}</h3>
												<p>
													{homeAddress} |{" "}
													{Resources.getCurrentAge(
														applicant.B_Month,
														applicant.B_Day,
														applicant.B_Year
													)}
												</p>
											</div>
										</div>
										<div className='applicant-info-right-portion'>
											<div
												className='circle'
												style={
													applicant.Candidate_Status === "Meet"
														? {
																background:
																	"linear-gradient(20deg, #00b2ff, #006aff)",
														  }
														: applicant.Candidate_Status ===
														  "Hired"
														? {
																background:
																	"linear-gradient(20deg, #00f33d, #88ff00)",
														  }
														: applicant.Candidate_Status ===
														  "Declined"
														? {
																background:
																	"linear-gradient(20deg, #ff004c, #ff7b00)",
														  }
														: { backgroundColor: "none" }
												}
											/>
											<p>
												{TimeStamp.setTimeStamp(
													applicant.Minutes,
													applicant.Hour,
													applicant.Day,
													applicant.Month,
													applicant.Year
												)}
											</p>
										</div>
									</div>
								</div>
							);
						}
					})}

					{/* {this.state.count === 0 && (
						<p
							style={{
								textAlign: "center",
								padding: "5px",
								fontSize: "14px",
								background: "linear-gradient(45deg, #ff7b00, #ff004c)",
							}}>
							No Applicant/s yet
						</p>
					)} */}
				</div>
			</div>
		);
	}
}

export default withRouter(Emp_Job_Applicants);
