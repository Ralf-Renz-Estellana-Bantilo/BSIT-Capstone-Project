import React, { useEffect, useState } from "react";
import AdminResources from "../AdminResources";
import "./SummaryJobPosts.css";

const SummaryJobPosts = ({
	jobPosts,
	summaryYear,
	handlePreviousYear,
	handleNextYear,
}) => {
	// const [summaryYear, setSummaryYear] = useState(null);
	let jobPostsCopy = jobPosts.filter((post) => post.Year === summaryYear);

	// const handlePreviousYear = () => {
	// 	setSummaryYear((prevYear) => prevYear - 1);
	// };

	// const handleNextYear = () => {
	// 	setSummaryYear((prevYear) => prevYear + 1);
	// };

	const getPostsPerBarangay = () => {
		let posts = [];
		const listOfBarangays = AdminResources.getBarangay();

		for (let a = 0; a < listOfBarangays.length; a++) {
			let count = 0;
			for (let b = 0; b < jobPostsCopy.length; b++) {
				if (
					`${jobPostsCopy[b].Company_Address}`
						.toLowerCase()
						.includes(listOfBarangays[a].toLowerCase())
					// && jobPostsCopy[b].Active_Status === "Active"
				) {
					count += 1;
				}
			}

			let post = { barangay: listOfBarangays[a], count: count };
			posts.push(post);
		}

		return posts;
	};

	const getVacancyCountPerCategory = () => {
		const listOfCategories = AdminResources.getCategories();
		let posts = [];

		for (let a = 0; a < listOfCategories.length; a++) {
			let count = 0;
			for (let b = 0; b < jobPostsCopy.length; b++) {
				// if (jobPostsCopy[b].Active_Status === "Active") {
				if (listOfCategories[a] === jobPostsCopy[b].Category) {
					count += Number(jobPostsCopy[b].Required_Employees);
				}
				// }
			}
			let post = { category: listOfCategories[a], count: count };
			posts.push(post);
		}

		return posts;
	};

	const getVacancyCountPerBarangay = () => {
		const listOfBarangays = AdminResources.getBarangay();
		let posts = [];

		for (let a = 0; a < listOfBarangays.length; a++) {
			let count = 0;
			for (let b = 0; b < jobPostsCopy.length; b++) {
				let barangay =
					jobPostsCopy[b].Company_Address.split(", ")[
						jobPostsCopy[b].Company_Address.split(", ").length - 1
					];
				if (listOfBarangays[a] === barangay) {
					count += Number(jobPostsCopy[b].Required_Employees);
				}
			}
			let post = { barangay: listOfBarangays[a], count: count };
			posts.push(post);
		}

		return posts;
	};

	const getInDemandJobs = () => {
		let uniquePosts = [
			...new Set(
				jobPostsCopy.map((post) => `${post.Job_Title}`.toUpperCase())
			),
		];
		let inDemandJobs = [];

		for (let a = 0; a < uniquePosts.length; a++) {
			let count = 0;
			let title = "";
			for (let b = 0; b < jobPostsCopy.length; b++) {
				if (
					`${uniquePosts[a]}`
						.toUpperCase()
						.includes(`${jobPostsCopy[b].Job_Title}`.toUpperCase()) &&
					jobPostsCopy[b].Active_Status === "Active"
				) {
					count += Number(jobPostsCopy[b].Required_Employees);
					if (jobPostsCopy[b].Active_Status !== "Active") {
						title = uniquePosts[a] + " (Closed)";
					} else {
						title = uniquePosts[a];
					}
				}
			}

			let data = {
				jobTitle: title,
				count: count,
			};
			inDemandJobs.push(data);
		}

		return inDemandJobs;
	};

	const getHighPayingJob = () => {
		let jobs = [];
		let uniquePosts = [
			...new Set(
				jobPostsCopy.map((post) => `${post.Job_Title}`.toUpperCase())
			),
		];

		for (let a = 0; a < uniquePosts.length; a++) {
			let maxSalary = 0;
			let holdMax = 0;
			let activeStatus = "";
			for (let b = 0; b < jobPostsCopy.length; b++) {
				if (
					`${jobPostsCopy[b].Job_Title}`
						.toUpperCase()
						.includes(`${uniquePosts[a]}`.toUpperCase())
				) {
					holdMax = jobPostsCopy[b].Maximum_Salary;
					activeStatus = jobPostsCopy[b].Active_Status;
					if (holdMax > maxSalary) {
						maxSalary = holdMax;
					}
				}
			}
			let job = {
				Active_Status: activeStatus,
				Job_Title: uniquePosts[a],
				Maximum_Salary: maxSalary,
			};
			jobs.push(job);
		}

		let allJobs = jobs.sort((a, b) => {
			return Number(a.Maximum_Salary) < Number(b.Maximum_Salary) ? 1 : -1;
		});

		return allJobs;
	};

	// useEffect(() => {
	// 	setSummaryYear(new Date().getFullYear());
	// }, []);

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

	const listOfBarangays = getPostsPerBarangay().sort(
		(a, b) => b.count - a.count
	);
	let postsPerBarangay = listOfBarangays.map((barangay, index) => {
		return (
			<tr key={index}>
				<td>{barangay.barangay}</td>
				<td style={{ textAlign: "center" }}>{barangay.count}</td>
			</tr>
		);
	});

	const listOfCategories = getVacancyCountPerCategory().sort(
		(a, b) => b.count - a.count
	);
	let vacancyCountPerCategory = listOfCategories.map((category, index) => {
		return (
			<tr key={index}>
				<td>{category.category}</td>
				<td style={{ textAlign: "center" }}>{category.count}</td>
			</tr>
		);
	});

	const listOfVacancyPerBarangay = getVacancyCountPerBarangay().sort(
		(a, b) => b.count - a.count
	);
	let totalVacancyCountPerBarangay = 0;
	let vacancyCountPerBarangay = listOfVacancyPerBarangay.map(
		(barangay, index) => {
			totalVacancyCountPerBarangay += barangay.count;
			return (
				<tr key={index}>
					<td>{barangay.barangay}</td>
					<td style={{ textAlign: "center" }}>{barangay.count}</td>
				</tr>
			);
		}
	);

	const listOfInDemandJobs = getInDemandJobs().sort(
		(a, b) => b.count - a.count
	);
	let countInDemandJobs = 0;
	let inDemandJobs = listOfInDemandJobs.map((jobs, index) => {
		if (jobs.count >= 10) {
			countInDemandJobs++;
			return (
				<tr key={index}>
					<td>{jobs.jobTitle}</td>
					<td style={{ textAlign: "center" }}>{jobs.count}</td>
				</tr>
			);
		}
	});

	console.log(jobPostsCopy);

	let currentYear = new Date().getFullYear();
	let currentMonth = new Date().getMonth();
	let postsPerMonth = months.map((month, index) => {
		let count = 0;
		if (summaryYear < currentYear) {
			for (let a = 0; a < jobPostsCopy.length; a++) {
				if (jobPostsCopy[a].Month === index + 1) {
					count += 1;
				}
			}
			return (
				<tr key={index}>
					<td>{month}</td>
					<td style={{ textAlign: "center" }}>{count}</td>
				</tr>
			);
		} else if (summaryYear === currentYear) {
			if (index <= currentMonth) {
				for (let a = 0; a < jobPostsCopy.length; a++) {
					if (jobPostsCopy[a].Month === index + 1) {
						count += 1;
					}
				}
				return (
					<tr key={index}>
						<td>{month}</td>
						<td style={{ textAlign: "center" }}>{count}</td>
					</tr>
				);
			}
		}
	});

	let highPayingJobs = getHighPayingJob();
	let countHighPayingJobs = 0;
	let allHighPayingJobs = highPayingJobs.map((jobs, index) => {
		if (jobs.Maximum_Salary > 15000) {
			countHighPayingJobs++;
			return (
				<tr key={index}>
					<td>
						{jobs.Job_Title}{" "}
						{jobs.Active_Status !== "Active" && " (Closed)"}
					</td>
					<td style={{ textAlign: "center" }}>
						₱ {AdminResources.formatMoney(jobs.Maximum_Salary)}
					</td>
				</tr>
			);
		}
	});

	let totalPosts = 0;
	for (let a = 0; a < listOfBarangays.length; a++) {
		totalPosts += listOfBarangays[a].count;
	}

	let totalVacancyCount = 0;
	for (let a = 0; a < listOfCategories.length; a++) {
		totalVacancyCount += listOfCategories[a].count;
	}
	let totalPostsPerMonth = 0;
	for (let a = 0; a < months.length; a++) {
		for (let b = 0; b < jobPostsCopy.length; b++) {
			if (jobPostsCopy[b].Month === a + 1) {
				totalPostsPerMonth += 1;
			}
		}
	}

	return (
		<div className='summary-container'>
			<div className='summary'>
				<div className='summary-header'>
					<h4>JOB POSTS PER MONTH</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th className='summary-month'>Month</th>
							<th className='summary-number'>No. of Posts</th>
						</tr>
						{postsPerMonth}
						<tr>
							<td className='summary-total'>TOTAL</td>
							<td className='summary-value'>{totalPostsPerMonth}</td>
						</tr>
					</table>
				</div>
			</div>

			<div className='summary'>
				<div className='summary-header'>
					<h4>JOB POSTS PER BARANGAY</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th>Barangay</th>
							<th>No. of Posts</th>
						</tr>
						{postsPerBarangay}
						<tr>
							<td className='summary-total'>TOTAL</td>
							<td className='summary-value'>{totalPosts}</td>
						</tr>
					</table>
				</div>
			</div>

			<div className='summary'>
				<div className='summary-header'>
					<h4>VACANCY COUNT PER BARANGAY</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th>Barangay</th>
							<th>Vacancy Count</th>
						</tr>
						{vacancyCountPerBarangay}
						<tr>
							<td className='summary-total'>TOTAL</td>
							<td className='summary-value'>
								{totalVacancyCountPerBarangay}
							</td>
						</tr>
					</table>
				</div>
			</div>

			<div className='summary'>
				<div className='summary-header'>
					<h4>VACANCY COUNT PER JOB CATEGORY</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th>Category</th>
							<th>Vacancy Count</th>
						</tr>
						{vacancyCountPerCategory}
						<tr>
							<td className='summary-total'>TOTAL</td>
							<td className='summary-value'>{totalVacancyCount}</td>
						</tr>
					</table>
				</div>
			</div>

			<div className='summary'>
				<div className='summary-header'>
					<h4>IN-DEMAND JOBS</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th>Job Title</th>
							<th>Vacancy Count</th>
						</tr>
						{inDemandJobs}
						{/* <td className='summary-total'>TOTAL</td>
						<td className='summary-value'>{totalPosts}</td> */}
						{countInDemandJobs === 0 && (
							<>
								{" "}
								<td>no data found</td>
								<td>no data found</td>
							</>
						)}
					</table>
				</div>
			</div>

			<div className='summary'>
				<div className='summary-header'>
					<h4>HIGH-PAYING JOBS</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th>Job Title</th>
							<th>Max Salary</th>
						</tr>
						{allHighPayingJobs}
						{/* <td className='summary-total'>TOTAL</td>
						<td className='summary-value'>{totalPosts}</td> */}
						{countHighPayingJobs === 0 && (
							<>
								{" "}
								<td>no data found</td>
								<td>no data found</td>
							</>
						)}
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

export default SummaryJobPosts;
