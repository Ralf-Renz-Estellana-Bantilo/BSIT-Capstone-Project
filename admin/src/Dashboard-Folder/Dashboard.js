import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import JobsIcon from "../Images/JobsIcon.png";
import BusinessProfile from "../Images/BusinessProfile.png";
import Employer from "../Images/Employer.png";
import VacancyCount from "../Images/VacancyCount.png";
import Percentage from "../Images/Percentage.png";
import HiredApplicants from "../Images/HiredApplicants.png";
import AdminResources from "../AdminResources";
import { useNavigate } from "react-router-dom";

const Dashboard = ({
	activePage,
	setActivePage,
	jobPosts,
	applicantsData,
	employers,
	setJobPosts,
	jobApplicants,
	setEmployers,
	setApplicantsData,
	setJobApplicants,
	setJobSeekers,
	setCompaniesData,
	admin,
	setAdmin,
	setAdminPosts,
}) => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		setActivePage("Dashboard");
		localStorage.setItem("activePage", "Dashboard");

		const sessionUser = sessionStorage.getItem("UserID");
		if (!sessionUser) {
			navigate("/");
		}
	}, []);

	const getTotalVacancyCount = () => {
		let vacancyCount = 0;
		for (let a = 0; a < jobPosts.length; a++) {
			if (jobPosts[a].Active_Status === "Active") {
				vacancyCount += Number(jobPosts[a].Required_Employees);
			}
		}
		return vacancyCount;
	};

	const getApplicantsHired = () => {
		let applicantHired = 0;
		let uniqueApplicants = [
			...new Set(jobApplicants.map((applicant) => applicant.ApplicantID)),
		];

		let count = 0;
		for (let a = 0; a < uniqueApplicants.length; a++) {
			for (let b = 0; b < jobApplicants.length; b++) {
				if (
					uniqueApplicants[a] === jobApplicants[b].ApplicantID &&
					jobApplicants[b].Candidate_Status === "Hired"
				) {
					count += 1;
					break;
				}
			}
		}

		// console.log(count);

		// for (let a = 0; a < jobApplicants.length; a++) {
		// 	if (jobApplicants[a].Candidate_Status === "Hired") {
		// 		applicantHired += 1;
		// 	}
		// }
		return count;
		// return applicantHired;
	};

	const getAverageDailyPost = () => {
		let average = 0;
		let countDays = 0;
		const post = jobPosts.length;
		const day = new Date().getDate();
		const month = new Date().getMonth() + 1;
		const year = new Date().getFullYear();
		const time = AdminResources.getLastDayOfTheMonth();

		let filterTime = time.filter((t) => t.year === year);
		for (let a = 0; a < filterTime.length; a++) {
			if (filterTime[a].month <= month) {
				if (filterTime[a].month === month) {
					countDays += day;
				} else {
					countDays += filterTime[a].lastDay;
				}
			}
		}
		let quotient = post / countDays;
		average = parseFloat(quotient.toFixed(2));
		return average;
	};

	const getHighPayingJob = () => {
		let allJobs = jobPosts.sort((a, b) => {
			return Number(a.Maximum_Salary) < Number(b.Maximum_Salary) ? 1 : -1;
		});

		return allJobs;
	};

	const listOfBarangays = AdminResources.getBarangay();
	const listOfCategories = AdminResources.getCategories();

	let uniquePosts = [...new Set(jobPosts.map((post) => post.Job_Title))];
	let inDemandJobs = [];

	for (let a = 0; a < uniquePosts.length; a++) {
		let count = 0;
		for (let b = 0; b < jobPosts.length; b++) {
			if (
				uniquePosts[a] === jobPosts[b].Job_Title &&
				jobPosts[b].Active_Status === "Active"
			) {
				count += Number(jobPosts[b].Required_Employees);
			}
		}

		let data = {
			Job_Title: uniquePosts[a],
			Required_Employees: count,
		};
		inDemandJobs.push(data);
	}

	let posts = inDemandJobs.sort((a, b) => {
		return Number(a.Required_Employees) < Number(b.Required_Employees)
			? 1
			: -1;
	});

	let activePosts = jobPosts.filter(
		(posts) => posts.Active_Status === "Active"
	);

	let totalVacancyCount = getTotalVacancyCount();
	let totalApplicantsHired = getApplicantsHired();
	let dailyPostAverage = getAverageDailyPost();
	let highPayingJobs = getHighPayingJob();

	return (
		<div className='dashboard-container'>
			<div className='content-wrapper'>
				{isSidebarOpen ? (
					<div className='sidebar-container'>
						<Sidebar
							activePage={activePage}
							setActivePage={setActivePage}
							setJobPosts={setJobPosts}
							setEmployers={setEmployers}
							setApplicantsData={setApplicantsData}
							setCompaniesData={setCompaniesData}
							setJobApplicants={setJobApplicants}
							setJobSeekers={setJobSeekers}
							setAdminPosts={setAdminPosts}
							setSidebarOpen={setSidebarOpen}
						/>
					</div>
				) : (
					""
				)}

				<div className='panel-container'>
					<Navbar
						activePage={activePage}
						setSidebarOpen={setSidebarOpen}
						isSidebarOpen={isSidebarOpen}
						admin={admin}
						setAdmin={setAdmin}
					/>

					<div className='main-panel-container'>
						<div className='dashboard-main-panel'>
							<div className='dashboard-update-cards'>
								<div className='update-card'>
									<div className='card-text'>
										<p>Total number of Active Job Posts</p>
										<h2>{activePosts.length}</h2>
									</div>
									<div className='card-icon'>
										<img src={JobsIcon} alt='Job Posts' />
									</div>
								</div>
								<div className='update-card'>
									<div className='card-text'>
										<p>Total number of Job Seekers</p>
										<h2>{applicantsData.length}</h2>
									</div>
									<div className='card-icon'>
										<img src={BusinessProfile} alt='Job Posts' />
									</div>
								</div>
								<div className='update-card'>
									<div className='card-text'>
										<p>Total number of Employers</p>
										<h2>{employers.length}</h2>
									</div>
									<div className='card-icon'>
										<img src={Employer} alt='Job Posts' />
									</div>
								</div>
							</div>
							<div className='dashboard-update-cards'>
								<div className='update-card'>
									<div className='card-text'>
										<p>Total number of Vacancy Count</p>
										<h2>{totalVacancyCount}</h2>
									</div>
									<div className='card-icon'>
										<img src={VacancyCount} alt='Job Posts' />
									</div>
								</div>
								<div className='update-card'>
									<div className='card-text'>
										<p>Total number of Applicants Hired</p>
										<h2>{totalApplicantsHired}</h2>
									</div>
									<div className='card-icon'>
										<img src={HiredApplicants} alt='Job Posts' />
									</div>
								</div>
								<div className='update-card'>
									<div className='card-text'>
										<p>Job Post per day (average)</p>
										<h2>{dailyPostAverage}%</h2>
									</div>
									<div className='card-icon'>
										<img src={Percentage} alt='Job Posts' />
									</div>
								</div>
							</div>
							<div className='dashboard-update-table'>
								<div className='update-table-container'>
									<div className='update-table-header'>
										<h4>Job Posts per Barangay</h4>
									</div>
									<div className='update-table-body'>
										{listOfBarangays.map((barangay, index) => {
											let count = 0;
											for (let a = 0; a < jobPosts.length; a++) {
												if (
													`${jobPosts[a].Company_Address}`
														.toLowerCase()
														.includes(barangay.toLowerCase()) &&
													jobPosts[a].Active_Status === "Active"
												) {
													count += 1;
												}
											}

											return (
												<div className='table-post' key={index}>
													<div className='post-barangay'>
														{barangay}
													</div>
													<div className='post-number'>
														<h3>{count}</h3>
													</div>
												</div>
											);
										})}
									</div>
								</div>
								<div className='update-table-container'>
									<div className='update-table-header'>
										<h4>Vacancy Count per Category</h4>
									</div>
									<div className='update-table-body'>
										{listOfCategories.map((category, index) => {
											let countVacancy = 0;
											for (let a = 0; a < jobPosts.length; a++) {
												if (
													jobPosts[a].Active_Status === "Active"
												) {
													if (category === jobPosts[a].Category) {
														countVacancy += Number(
															jobPosts[a].Required_Employees
														);
													}
												}
											}

											return (
												<div className='table-post' key={index}>
													<div className='post-barangay'>
														{category}
													</div>
													<div className='post-number'>
														<h3>{countVacancy}</h3>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</div>
							<div className='dashboard-update-table'>
								<div className='update-table-container'>
									<div className='update-table-header'>
										<h4>In-demand Jobs</h4>
									</div>
									<div className='update-table-body'>
										{inDemandJobs.map((jobs, index) => {
											if (jobs.Required_Employees > 10) {
												return (
													<div className='table-post' key={index}>
														<div className='post-barangay'>
															{jobs.Job_Title}
														</div>
														<div className='post-number'>
															<h3>{jobs.Required_Employees}</h3>
														</div>
													</div>
												);
											}
										})}
									</div>
								</div>
								<div className='update-table-container'>
									<div className='update-table-header'>
										<h4>High Paying Jobs</h4>
									</div>
									<div className='update-table-body'>
										{highPayingJobs.map((jobs, index) => {
											if (jobs.Active_Status === "Active") {
												return (
													<div className='table-post' key={index}>
														<div className='post-barangay'>
															{jobs.Job_Title}
														</div>
														<div className='post-number'>
															<h3 style={{ fontSize: "13px" }}>
																max: ₱{" "}
																{AdminResources.formatMoney(
																	jobs.Maximum_Salary
																)}
															</h3>
														</div>
													</div>
												);
											}
										})}
									</div>
								</div>
								{/* <div className='update-table-container'>
									<div className='update-table-header'>
										<h4>Vacancy Count per Category</h4>
									</div>
									<div className='update-table-body'>
										{listOfCategories.map((category, index) => {
											let countVacancy = 0;
											for (let a = 0; a < jobPosts.length; a++) {
												if (category === jobPosts[a].Category) {
													countVacancy += Number(
														jobPosts[a].Required_Employees
													);
												}
											}

											return (
												<div className='table-post' key={index}>
													<div className='post-barangay'>
														{category}
													</div>
													<div className='post-number'>
														<h3>{countVacancy}</h3>
													</div>
												</div>
											);
										})}
									</div>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
