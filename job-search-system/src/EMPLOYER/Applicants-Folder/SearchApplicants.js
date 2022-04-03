import React, { Component } from "react";
import LocationIcon from "../../Images/LocationIcon.png";
import "./SearchApplicants.css";
import { withRouter } from "react-router-dom";
import Resources from "../../Resources";
import AppConfiguration from "../../AppConfiguration";

export class Search_Applicants extends Component {
	constructor() {
		super();
		this.state = {
			showMore: [false],
			isModalOpen: false,
		};
	}
	seeMore = (e) => {
		if (this.state.showMore === true) {
			this.setState({
				showMore: !this.state.showMore,
			});
		} else {
			this.setState({
				showMore: !this.state.showMore,
			});
		}
	};

	viewModal = () => {
		this.setState({
			isModalOpen: true,
		});
	};

	handleViewHiree = (applicant) => {
		this.props.setHiree(applicant);
		this.props.history.push("/employer/applicant-information");
		const data = {
			Job_Title: applicant.Preferred_Job,
		};
		this.props.setEmployerMessage(data);
	};

	render() {
		const { applicant, employerFeedback, darkTheme } = this.props;

		let messaged = false;
		if (employerFeedback.length > 0) {
			for (let a = 0; a < employerFeedback.length; a++) {
				if (
					employerFeedback[a].ApplicantID === applicant.ApplicantID &&
					employerFeedback[a].JobID === "(n/a)"
				) {
					if (employerFeedback[a].Job_Title === applicant.Preferred_Job) {
						messaged = true;
					}
				}
			}
		}

		return (
			<div>
				<div className='search-applicant-container'>
					<div className='search-applicant-header'>
						<div className='search-applicant-upperLeft-info'>
							<div className='search-applicant-account-profile'>
								<img
									src={applicant.User_Image}
									// src={`${AppConfiguration.url()}/assets/images/${
									// 	applicant.User_Image
									// }`}
									alt='Applicant'
									style={{ height: "60px" }}
								/>
							</div>

							<div className='search-applicant-basic-info'>
								<h2>{`${applicant.First_Name} ${applicant.Last_Name}`}</h2>

								<div className='search-applicant-address'>
									<div className='address'>
										<img
											src={LocationIcon}
											alt='Location Icon'
											style={
												darkTheme
													? { filter: "brightness(0.7)" }
													: { filter: "brightness(0.1)" }
											}
										/>
										<p>{applicant.Home_Address}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='search-applicant-body'>
						<div className='search-applicant-basic-content'>
							<div className='search-applicant-job-title'>
								<h3>{applicant.Preferred_Job}</h3>
								<p>{`(${applicant.Preferred_Category})`}</p>
							</div>
						</div>
						<div className='post-detail-container'>
							<div className='post-detail-group1'>
								<div className='post-detail'>
									<p>Contact Number:</p>
									<h4>{applicant.Contact_Number}</h4>
								</div>
								<div className='post-detail'>
									<p>Email Address:</p>
									<h4>{applicant.Email_Address}</h4>
								</div>
								<div className='post-detail'>
									<p>Preferred Salary Range:</p>
									<h4>
										₱{" "}
										{Resources.formatMoney(applicant.Minimum_Salary)}{" "}
										- ₱{" "}
										{Resources.formatMoney(applicant.Maximum_Salary)}
									</h4>
								</div>
							</div>
							<div className='post-detail-group2'>
								<div className='post-detail'>
									<p>Gender:</p>
									<h4>{applicant.Sex}</h4>
								</div>
								{/* <div className='post-detail'>
									<p>Civil Status:</p>
									<h4>{applicant.Civil_Status}</h4>
								</div> */}
								<div className='post-detail'>
									<p>Age:</p>
									<h4>
										{Resources.getCurrentAge(
											applicant.B_Month,
											applicant.B_Day,
											applicant.B_Year
										)}
									</h4>
								</div>
								<div className='post-detail'>
									<p>Hiring Status:</p>
									<div className='active-status'>
										<div
											className='active-circle'
											style={{ backgroundColor: "#00ff40" }}></div>
										<h4>
											{applicant.Hiring_Status === "Active"
												? "Available"
												: "Unavailble"}
										</h4>
									</div>
								</div>
							</div>
						</div>
						<div className='view-applicant-detail-btn'>
							<button
								onClick={() => this.handleViewHiree(applicant)}
								disabled={messaged ? "disabled" : ""}
								style={
									messaged ? { opacity: "0.3" } : { opacity: "1" }
								}>
								{messaged ? "Messaged" : "View More Details"}
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Search_Applicants);
