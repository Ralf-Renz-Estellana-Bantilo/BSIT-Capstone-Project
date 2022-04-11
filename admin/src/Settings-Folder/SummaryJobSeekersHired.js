import React from "react";
import AdminResources from "../AdminResources";

const SummaryJobSeekersHired = ({
	employerFeedback,
	jobPosts,
	summaryYear,
	handlePreviousYear,
	handleNextYear,
}) => {
	let jobPostsCopy = jobPosts.filter((post) => post.Year === summaryYear);
	let employerFeedbackCopy = employerFeedback.filter(
		(feedback) => feedback.Year === summaryYear
	);

	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const getApplicantsHiredPerMonth = () => {
		let applicants = [];
		let hiredApplicants = employerFeedbackCopy.filter(
			(feedback) => feedback.Application_Status === "Hired"
		);
		let uniqueFeedback = [
			...new Set(
				employerFeedbackCopy.map((feedback) => feedback.ApplicantID)
			),
		];

		for (let a = 0; a < months.length; a++) {
			let count = 0;
			for (let c = 0; c < uniqueFeedback.length; c++) {
				for (let b = 0; b < hiredApplicants.length; b++) {
					if (
						hiredApplicants[b].ApplicantID === uniqueFeedback[c] &&
						a + 1 === hiredApplicants[b].Month
					) {
						count += 1;
						break;
					}
				}
			}
			let applicant = { month: months[a], count: count };
			applicants.push(applicant);
		}

		return applicants;
	};

	const getHiredApplicantsPerCategory = () => {
		const listOfCategories = AdminResources.getCategories();
		let applicants = [];
		let hiredApplicants = employerFeedbackCopy.filter(
			(feedback) => feedback.Application_Status === "Hired"
		);

		for (let a = 0; a < listOfCategories.length; a++) {
			let count = 0;
			for (let b = 0; b < hiredApplicants.length; b++) {
				for (let c = 0; c < jobPostsCopy.length; c++) {
					if (
						hiredApplicants[b].JobID === jobPostsCopy[c].JobID &&
						listOfCategories[a] === jobPostsCopy[c].Category
					) {
						count += 1;
					}
				}
			}

			let applicant = { category: listOfCategories[a], count: count };
			applicants.push(applicant);
		}

		return applicants;
	};

	let totalApplicantsHired = getApplicantsHiredPerMonth();
	let totalHiredJobSeekersPerMonth = 0;
	let currentMonth = new Date().getMonth();
	let hiredJobSeekersPerMonth = totalApplicantsHired.map(
		(hiredApplicant, index) => {
			if (index <= currentMonth) {
				totalHiredJobSeekersPerMonth += hiredApplicant.count;
				return (
					<tr key={index}>
						<td>{hiredApplicant.month}</td>
						<td style={{ textAlign: "center" }}>
							{hiredApplicant.count}
						</td>
					</tr>
				);
			}
		}
	);

	let totalApplicantsHiredPerCategory = getHiredApplicantsPerCategory().sort(
		(a, b) => b.count - a.count
	);
	let totalHiredJobSeekersPerCategory = 0;
	let hiredJobSeekersPerCategory = totalApplicantsHiredPerCategory.map(
		(hiredPerCategory, index) => {
			totalHiredJobSeekersPerCategory += hiredPerCategory.count;
			return (
				<tr key={index}>
					<td>{hiredPerCategory.category}</td>
					<td style={{ textAlign: "center" }}>{hiredPerCategory.count}</td>
				</tr>
			);
		}
	);

	let currentYear = new Date().getFullYear();

	return (
		<div className='summary-container'>
			<div className='summary'>
				<div className='summary-header'>
					<h4>HIRED JOB SEEKERS PER MONTH</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th className='summary-month'>Month</th>
							<th className='summary-number'>
								No. of Hired Job Seekers
							</th>
						</tr>
						{hiredJobSeekersPerMonth}
						{/* <td className='summary-total'>TOTAL</td>
						<td className='summary-value'>
							{totalHiredJobSeekersPerMonth}
						</td> */}
					</table>
				</div>
			</div>
			<div className='summary'>
				<div className='summary-header'>
					<h4>HIRED JOB SEEKERS PER CATEGORY</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th>Category</th>
							<th>No. of Hired Job Seekers</th>
						</tr>
						{hiredJobSeekersPerCategory}
						{/* <tr>
							<td className='summary-total'>TOTAL</td>
							<td className='summary-value'>
								{totalHiredJobSeekersPerCategory}
							</td>
						</tr> */}
					</table>
				</div>
			</div>
			<div className='summary-duration'>
				<button
					onClick={handlePreviousYear}
					disabled={summaryYear <= 2021 && "disabled"}
					title='Previous Year'>
					{" "}
					-{" "}
				</button>
				<p>{summaryYear}</p>
				<button
					onClick={handleNextYear}
					disabled={currentYear <= summaryYear && "disabled"}
					title='Next Year'>
					{" "}
					+{" "}
				</button>
			</div>
		</div>
	);
};

export default SummaryJobSeekersHired;
