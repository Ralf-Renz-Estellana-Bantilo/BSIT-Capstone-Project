import React from "react";
import LeftArrow from "../Images/LeftArrow.png";
import SummaryJobCategories from "./SummaryJobCategories";
import SummaryJobPosts from "./SummaryJobPosts";
import SummaryJobSeekersHired from "./SummaryJobSeekersHired";
import SummaryOpportunityHotspot from "./SummaryOpportunityHotspot";
import SummaryRegisteredUser from "./SummaryRegisteredUser";

const AccountReportSummary = ({
	openSummary,
	setOpenSummary,
	isVisible,
	setIsVisible,
	jobPosts,
	employerFeedback,
	applicantsData,
	companiesData,
}) => {
	const handleOpenSummary = (text) => {
		setIsVisible(false);
		setOpenSummary(text);
	};

	return (
		<div className='post-preview-panel'>
			<div className='job-post-header'>
				{!isVisible && (
					<img
						src={LeftArrow}
						alt='Back'
						title='Back'
						onClick={() => setIsVisible(true)}
					/>
				)}

				{isVisible ? <h3>Reports Summary</h3> : <h3>{openSummary}</h3>}
			</div>

			{isVisible && (
				<div className='job-posts'>
					<div
						className='job-post'
						style={{ border: "none" }}
						onClick={() => handleOpenSummary("Job Posts Summary")}>
						<div className='account-panel' style={{ height: "30.1px" }}>
							<h3>Job Posts Summary</h3>
						</div>
					</div>
					<div
						className='job-post'
						style={{ border: "none" }}
						onClick={() =>
							handleOpenSummary("Hired Job Seekers Summary")
						}>
						<div className='account-panel' style={{ height: "30.1px" }}>
							<h3>Hired Job Seekers Summary</h3>
						</div>
					</div>
					<div
						className='job-post'
						style={{ border: "none" }}
						onClick={() => handleOpenSummary("Registered User Summary")}>
						<div className='account-panel' style={{ height: "30.1px" }}>
							<h3>Registered User Summary</h3>
						</div>
					</div>
					{/* <div
						className='job-post'
						style={{ border: "none" }}
						onClick={() =>
							handleOpenSummary("Opportunity Hotspot Summary")
						}>
						<div className='account-panel' style={{ height: "30.1px" }}>
							<h3>Opportunity Hotspot Summary</h3>
						</div>
					</div>
					<div
						className='job-post'
						style={{ border: "none" }}
						onClick={() => handleOpenSummary("Job Categories Summary")}>
						<div className='account-panel' style={{ height: "30.1px" }}>
							<h3>Job Categories Summary</h3>
						</div>
					</div> */}
				</div>
			)}

			{!isVisible && (
				<div className='job-posts'>
					{openSummary === "Job Posts Summary" ? (
						<SummaryJobPosts jobPosts={jobPosts} />
					) : openSummary === "Hired Job Seekers Summary" ? (
						<SummaryJobSeekersHired
							jobPosts={jobPosts}
							employerFeedback={employerFeedback}
						/>
					) : openSummary === "Registered User Summary" ? (
						<SummaryRegisteredUser
							applicantsData={applicantsData}
							companiesData={companiesData}
						/>
					) : openSummary === "Opportunity Hotspot Summary" ? (
						<SummaryOpportunityHotspot />
					) : openSummary === "Job Categories Summary" ? (
						<SummaryJobCategories jobPosts={jobPosts} />
					) : (
						""
					)}
				</div>
			)}
		</div>
	);
};

export default AccountReportSummary;
