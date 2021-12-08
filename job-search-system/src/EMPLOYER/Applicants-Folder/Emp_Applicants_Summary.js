import React, { Component } from "react";
import "./Emp_Applicants_Summary.css";
import CloseIcon from "../../Images/CloseIcon.png";
import TimeStamp from "../../TimeStamp";
import Resources from "../../Resources";

export class Emp_Applicants_Summary extends Component {
	state = {
		activeButton: "All",
		candidates: this.props.candidates,
	};

	handleChangeActiveButton = async (text) => {
		await this.setState({
			activeButton: text,
		});
	};

	handleClosePanel = async () => {
		await this.props.toggleSummaryPanel();
	};

	render() {
		const { jobTitle, requiredEmp, applied, activeStatus } = this.props;
		const { activeButton, candidates } = this.state;

		let filteredCandidate = [];

		if (activeButton === "All") {
			filteredCandidate = candidates;
		} else if (activeButton === "Hired") {
			filteredCandidate = candidates.filter(
				(candidate) => candidate.Candidate_Status === "Hired"
			);
		} else if (activeButton === "Meet") {
			filteredCandidate = candidates.filter(
				(candidate) => candidate.Candidate_Status === "Meet"
			);
		} else if (activeButton === "Declined") {
			filteredCandidate = candidates.filter(
				(candidate) => candidate.Candidate_Status === "Declined"
			);
		}

		return (
			<div className='job-applicant-summary-container'>
				<h4>--- Job Applicants Summary ---</h4>
				<div className='job-applicant-summary-header'>
					<div className='summary-header-label'>
						<h3>
							{jobTitle}{" "}
							{activeStatus === "Closed" && `(${activeStatus})`}
						</h3>
						<p>
							Required: {requiredEmp} | Applied: {applied}
						</p>
						<div className='summary-header-label-close'>
							<img
								src={CloseIcon}
								alt='Close'
								onClick={this.handleClosePanel}
							/>
						</div>
					</div>
					<div className='summary-header-buttons'>
						<button
							onClick={() => this.handleChangeActiveButton("All")}
							style={
								activeButton === "All"
									? {
											background:
												"linear-gradient(20deg, #e4e4e4, #949494)",
											color: "#242526",
											fontWeight: "500",
									  }
									: {}
							}>
							All
						</button>
						<button
							onClick={() => this.handleChangeActiveButton("Hired")}
							style={
								activeButton === "Hired"
									? {
											background:
												"linear-gradient(20deg, #00f33d, #88ff00)",
											color: "#242526",
											fontWeight: "500",
									  }
									: {}
							}>
							Hired
						</button>
						<button
							onClick={() => this.handleChangeActiveButton("Meet")}
							style={
								activeButton === "Meet"
									? {
											background:
												"linear-gradient(20deg, #00b2ff, #006aff)",
											fontWeight: "500",
											color: "white",
									  }
									: {}
							}>
							Meet
						</button>
						<button
							onClick={() => this.handleChangeActiveButton("Declined")}
							style={
								activeButton === "Declined"
									? {
											background:
												"linear-gradient(20deg, #ff004c, #ff7b00)",
											fontWeight: "500",
											color: "white",
									  }
									: {}
							}>
							Declined
						</button>
					</div>
					<p className='result'>{filteredCandidate.length}</p>
				</div>

				{candidates.length !== 0 ? (
					<div className='job-applicant-summary-content'>
						{filteredCandidate.map((candidate) => {
							return (
								<div
									className='applicant-info-container'
									key={candidate.ApplicantID}>
									<div className='applicant-info'>
										<div className='applicant-info-left-portion'>
											<div className='applicant-image'>
												<img
													src={`../assets/${candidate.User_Image}`}
													alt='User'
												/>
											</div>
											<div className='applicant-name'>
												<h3>{`${candidate.Last_Name}, ${candidate.First_Name}`}</h3>
												<p>
													{candidate.Home_Address} |{" "}
													{Resources.getCurrentAge(
														candidate.B_Month,
														candidate.B_Day,
														candidate.B_Year
													)}
												</p>
											</div>
										</div>
										<div className='applicant-info-right-portion'>
											<p>
												{TimeStamp.setTimeStamp(
													candidate.Minutes,
													candidate.Hour,
													candidate.Day,
													candidate.Month,
													candidate.Year
												)}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<p
						style={{
							textAlign: "center",
							padding: "10px",
							backgroundColor: "red",
							fontSize: "12px",
						}}>
						No Job Applicants yet!
					</p>
				)}

				{filteredCandidate.length === 0 && candidates.length !== 0 && (
					<p
						style={{
							textAlign: "center",
							padding: "10px",
							backgroundColor: "red",
							fontSize: "12px",
						}}>
						Nothing to display!
					</p>
				)}
			</div>
		);
	}
}

export default Emp_Applicants_Summary;
