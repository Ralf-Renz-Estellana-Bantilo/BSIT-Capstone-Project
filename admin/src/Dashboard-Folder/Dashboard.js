import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import JobsIcon from "../Images/JobsIcon.png";
import BusinessProfile from "../Images/BusinessProfile.png";
import Employer from "../Images/Employer.png";
import AdminResources from "../AdminResources";

const Dashboard = ({
	activePage,
	setActivePage,
	jobPosts,
	applicantsData,
	employers,
	setJobPosts,
	setEmployers,
	setApplicantsData,
	setJobApplicants,
	setJobSeekers,
	setCompaniesData,
}) => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);

	useEffect(() => {
		setActivePage("Dashboard");
		localStorage.setItem("activePage", "Dashboard");
	}, []);

	const listOfBarangays = AdminResources.getBarangay();

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
		return a.Required_Employees < b.Required_Employees ? 1 : -1;
	});

	let activePosts = jobPosts.filter(
		(posts) => posts.Active_Status === "Active"
	);

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
							setSidebarOpen={setSidebarOpen}
						/>
					</div>
				) : (
					""
				)}

				<div className='panel-container'>
					<Navbar
						setSidebarOpen={setSidebarOpen}
						isSidebarOpen={isSidebarOpen}
					/>

					<div className='main-panel-container'>
						<div className='dashboard-main-panel'>
							<div className='dashboard-update-cards'>
								<div className='update-card'>
									<div className='card-text'>
										<p>Total number of Active Job Vacancies</p>
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
