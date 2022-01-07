import React, { Component } from "react";
import { Link } from "react-router-dom";
import TimeStamp from "../../TimeStamp";
import "./AppliedJob.css";

export class AppliedJob extends Component {
	handleChangePage = async (page) => {
		await this.props.handleChangePage(page);
	};

	componentDidMount = async () => {
		await this.handleChangePage("profile");
	};

	render() {
		let {
			JobID,
			Job_Title,
			Company_Name,
			Company_Address,
			Minutes,
			Hour,
			Day,
			Month,
			Year,
		} = this.props.appliedJob;

		const { darkTheme, infos, employerFeedback } = this.props;

		let homeAddress =
			Company_Address.split(", ")[Company_Address.split(", ").length - 1];

		let activeStatus = "";
		for (let a = 0; a < infos.length; a++) {
			if (JobID === infos[a].JobID) {
				activeStatus = infos[a].Active_Status;
			}
		}

		let applicationStatus = "";
		// feedback checking
		for (let a = 0; a < employerFeedback.length; a++) {
			if (
				employerFeedback[a].JobID === JobID &&
				employerFeedback[a].Status === "Seen"
			) {
				applicationStatus = employerFeedback[a].Application_Status;
			}
		}

		return (
			<Link to={`/jobseeker/${this.props.activePage}/application-form`}>
				<div
					className='job'
					style={
						darkTheme
							? { backgroundColor: "#0f0f0f" }
							: { backgroundColor: "white" }
					}
					onClick={() => {
						this.props.setCompanyID(JobID);
					}}>
					<div
						className='job-status'
						style={
							activeStatus === "Active"
								? { backgroundColor: "rgb(0, 255, 0)" }
								: { backgroundColor: "rgb(255, 0, 0)" }
						}
					/>
					<div className='job-detail-container'>
						<div className='job-detail-upper-portion'>
							<h2 title='Job Title'>
								{Job_Title}{" "}
								<div
									style={
										applicationStatus === "Declined"
											? {
													background:
														"linear-gradient(20deg, #ff004c, #ff7b00)",
											  }
											: applicationStatus === "Meet"
											? {
													background:
														"linear-gradient(20deg, #00b2ff, #006aff)",
											  }
											: applicationStatus === "Hired"
											? {
													background:
														"linear-gradient(20deg, #00f33d, #88ff00)",
											  }
											: {}
									}></div>
							</h2>
							<p title='Date Applied'>
								{TimeStamp.setTimeStamp(
									Minutes,
									Hour,
									Day,
									Month,
									Year
								)}
							</p>
						</div>
						<div className='job-detail-lower-portion'>
							<div className='job-detail-lower-portion-left'>
								<h3 title='Company Name'>{Company_Name}</h3>
								{/* <p>{Company_Address}</p> */}
							</div>
							<p title='Company Address'>{homeAddress}</p>
						</div>
					</div>
				</div>
			</Link>
		);
	}
}

export default AppliedJob;
