import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Resources from "../../Resources";
import TimeStamp from "../../TimeStamp";
import DeleteIcon from "../../Images/DeleteIcon.png";
import Modal from "../../JOBSEEKER/Home-Folder/Modal";
import AppConfiguration from "../../AppConfiguration";

export class Emp_Job_Applicants extends Component {
	constructor() {
		super();
		this.state = {
			toggleApplicantsPanel: true,
			height: 0,
			titleHeight: 0,
			countHired: 0,
			applicants: [],
			isModalOpen: false,
			jobID: null,
			applicantID: null,
		};
	}

	viewModal = () => {
		this.setState({
			isModalOpen: true,
		});
	};

	onCloseModal = () => {
		this.setState({
			isModalOpen: false,
		});
	};

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

	deleteJobApplicant = async () => {
		const { jobID, applicantID } = this.state;

		await this.openDeleteState();
		await this.onCloseModal();
		await this.props.deleteJobApplicants(applicantID, jobID);
	};

	openDeleteState = async () => {
		this.props.openDeleteState();
	};

	componentDidMount = async () => {
		try {
			const height = this.divElement.clientHeight;
			const titleHeight = this.titleElement.clientHeight;
			this.setState({ height });
			this.setState({ titleHeight });
			const { info, jobApplicants } = this.props;
			for (let index = 0; index < jobApplicants.length; index++) {
				if (
					jobApplicants[index].Candidate_Status === "Hired" &&
					info.JobID === jobApplicants[index].JobID
				) {
					await this.setState({ countHired: this.state.countHired + 1 });
				}
			}
		} catch (error) {
			// console.log(error);
		}

		const scroll = localStorage.getItem("empApplicantScroll");
		window.scrollTo(0, scroll);
	};

	componentWillUnmount() {
		localStorage.setItem("empApplicantScroll", window.pageYOffset);
		window.scrollTo(0, window.pageYOffset);
	}

	componentDidUpdate(prevProps, prevState) {
		const scroll = localStorage.getItem("empApplicantScroll");
		window.scrollTo(0, scroll);
	}

	render() {
		const { info, jobApplicants, convertedMonth, darkTheme } = this.props;
		const { height, titleHeight, toggleApplicantsPanel, countHired } =
			this.state;

		const jobApplicantsVisible = jobApplicants.filter(
			(post) => post.Is_Deleted !== "Deleted"
		);

		let countApplicants = 0;

		return (
			<>
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
						{jobApplicantsVisible.map((applicant) => {
							if (applicant.JobID === info.JobID) {
								countApplicants += 1;
							}
						})}

						{info.Is_Deleted !== "Deleted" ? (
							<div
								className='job-post-title'
								ref={(titleElement) => {
									this.titleElement = titleElement;
								}}
								style={
									info.Active_Status === "Active"
										? {
												borderLeft: "5px solid #1eff00",
										  }
										: {
												borderLeft: "5px solid #ff0000",
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
											countApplicants
										);
										localStorage.setItem(
											"empApplicantScroll",
											window.pageYOffset
										);
									}}
									title='See Job Applicants Summary'>
									<h3>{`${info.Job_Title}`}</h3>
									<p>
										Vac. Count:{" "}
										<strong>{info.Required_Employees}</strong> •
										Applied: <strong>{countApplicants}</strong> •
										Hired: <strong>{countHired}</strong>
									</p>
								</div>
								<div className='job-post-content-right-container'>
									<p>{`• ${convertedMonth} ${info.Day}, ${info.Year}`}</p>
									<div
										className='toggle-job-post-content'
										onClick={(e) => {
											this.togglePanel();
											localStorage.setItem(
												"empApplicantScroll",
												window.pageYOffset
											);
										}}
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
						) : (
							""
						)}

						{jobApplicantsVisible.map((applicant) => {
							let homeAddress = "";
							if (applicant.JobID === info.JobID) {
								// homeAddress =
								// 	applicant.Home_Address.split(", ")[
								// 		applicant.Home_Address.split(", ").length - 1
								// 	];

								return (
									<div
										className={
											applicant.Status === "New"
												? "applicant-info-container-new"
												: "applicant-info-container"
										}
										style={darkTheme ? {} : { borderBottom: "none" }}
										key={applicant.id}>
										<div className='applicant-info'>
											<div
												className='applicant-info-left-portion'
												onClick={async (e) => {
													this.viewApplicant(applicant);
													await this.props.setJobID(
														applicant.JobID
													);
													if (applicant.Status === "New") {
														await this.props.updateJobApplicantStatus(
															applicant.JobID,
															applicant.ApplicantID
														);
													}
												}}>
												<div className='applicant-image-container'>
													<div className='applicant-image'>
														<img
															src={applicant.User_Image}
															// src={`${AppConfiguration.url()}/assets/images/${
															// 	applicant.User_Image
															// }`}
															alt='User'
														/>
													</div>
													<div
														className='circle'
														style={
															applicant.Candidate_Status ===
															"Meet"
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
												</div>
												<div className='applicant-name'>
													<h3>{`${applicant.Last_Name}, ${applicant.First_Name}`}</h3>
													<p>
														{applicant.Home_Address} •{" "}
														{Resources.getCurrentAge(
															applicant.B_Month,
															applicant.B_Day,
															applicant.B_Year
														)}
													</p>
												</div>
											</div>
											<div className='applicant-info-right-portion'>
												<p>
													{TimeStamp.setTimeStamp(
														applicant.Minutes,
														applicant.Hour,
														applicant.Day,
														applicant.Month,
														applicant.Year
													)}
												</p>

												{/* {applicant.Status !== "New" && (
													<div className='applicant-info-right-portion-delete'>
														<img
															src={DeleteIcon}
															alt='Delete Applicant'
															style={
																darkTheme
																	? {
																			filter:
																				"brightness(1)",
																	  }
																	: {
																			filter:
																				"brightness(0.3)",
																	  }
															}
															onClick={(e) => {
																this.viewModal();
																this.setState({
																	jobID: applicant.JobID,
																	applicantID:
																		applicant.ApplicantID,
																});
																localStorage.setItem(
																	"empApplicantScroll",
																	window.pageYOffset
																);
															}}
														/>
													</div>
												)} */}
											</div>
										</div>
									</div>
								);
							}
						})}
					</div>
				</div>
				{this.state.isModalOpen ? (
					<Modal
						headText='Delete Applicant Confirmation'
						modalText={`Continue Deleting this applicant?`}
						confirmText='Yes'
						closeText='No'
						close={this.onCloseModal}
						confirm={this.deleteJobApplicant}
						path='/employer/applicants'
					/>
				) : (
					""
				)}
			</>
		);
	}
}

export default withRouter(Emp_Job_Applicants);
