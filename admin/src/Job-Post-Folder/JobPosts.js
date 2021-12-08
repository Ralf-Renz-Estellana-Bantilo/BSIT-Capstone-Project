import React, { useEffect, useState } from "react";
import AdminResources from "../AdminResources";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "./JobPosts.css";
import OKIcon from "../Images/OKIcon.png";
import LocationIcon from "../Images/LocationIcon.png";
import PopupMenuJobPost from "../PopupMenuJobPost";

const JobPosts = ({
	activePage,
	setActivePage,
	jobPosts,
	jobApplicants,
	setJobPosts,
	setEmployers,
	setApplicantsData,
	setJobApplicants,
	companiesData,
	setJobSeekers,
	postPreview,
	setPostPreview,
	setCompaniesData,
}) => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
	const [location, setLocation] = useState("");
	const [status, setStatus] = useState("Active");
	const [sort, setSort] = useState("Most Recent");

	useEffect(() => {
		setActivePage("Job Posts");
	}, []);

	let post = postPreview;

	let numApplicants = [];
	let companyData = [];
	if (post) {
		numApplicants = jobApplicants.filter(
			(candidate) => candidate.JobID === post.JobID
		);

		companyData = companiesData.filter(
			(data) => data.CompanyID === post.CompanyID
		);
	}

	let activePosts = null;
	if (status === "All") {
		activePosts = jobPosts;
	} else {
		activePosts = jobPosts.filter((posts) => posts.Active_Status === status);
	}

	let countList = 0;
	let count = 0;

	for (let a = 0; a < activePosts.length; a++) {
		let address =
			activePosts[a].Company_Address.split(", ")[
				activePosts[a].Company_Address.split(", ").length - 1
			];
		if (`${address}`.toLowerCase().includes(location.toLowerCase())) {
			countList += 1;
		}
	}

	if (sort === "Most Recent") {
		activePosts = activePosts.sort((a, b) => {
			return a.Date_Posted < b.Date_Posted ? 1 : -1;
		});
	} else if (sort === "Old Posts First") {
		activePosts = activePosts.sort((a, b) => {
			return a.Date_Posted < b.Date_Posted ? -1 : 1;
		});
	}

	return (
		<div className='job-post-container'>
			{isPopupMenuOpen && (
				<PopupMenuJobPost
					setIsPopupMenuOpen={setIsPopupMenuOpen}
					setLocation={setLocation}
					setStatus={setStatus}
					setSort={setSort}
					location={location}
					status={status}
					sort={sort}
				/>
			)}

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
						activePage={activePage}
						isSidebarOpen={isSidebarOpen}
						setSidebarOpen={setSidebarOpen}
					/>

					<div className='main-panel-container'>
						<div className='job-post-panel-container'>
							<div className='job-post-panel'>
								<div className='job-post-header'>
									<h3>List of Job Posts ({countList})</h3>
									<p
										title='More Options...'
										onClick={() => setIsPopupMenuOpen(true)}>
										•••
									</p>
								</div>
								<div className='job-posts'>
									{activePosts.map((jobPost) => {
										let address =
											jobPost.Company_Address.split(", ")[
												jobPost.Company_Address.split(", ").length -
													1
											];
										let selectedPost = "";
										if (post) {
											if (post.JobID === jobPost.JobID) {
												selectedPost = post.JobID;
											}
										}
										if (
											`${address}`
												.toLowerCase()
												.includes(location.toLowerCase())
										) {
											count += 1;
											return (
												<div
													className={
														jobPost.JobID === selectedPost
															? "selected-job-post"
															: "job-post"
													}
													style={
														jobPost.Active_Status === "Active"
															? {
																	borderLeft:
																		"5px solid #00ff40",
															  }
															: { borderLeft: "5px solid red" }
													}
													onClick={() => setPostPreview(jobPost)}>
													<div className='post-right-text'>
														<h2>{jobPost.Job_Title}</h2>
														<h5>{jobPost.Company_Name}</h5>
													</div>
													<div className='post-left-text'>
														<p>
															{AdminResources.setTimeStamp(
																jobPost.Minutes,
																jobPost.Hour,
																jobPost.Day,
																jobPost.Month,
																jobPost.Year
															)}
														</p>
														<h3>{address}</h3>
													</div>
												</div>
											);
										}
									})}

									{count === 0 && activePosts.length > 0 && (
										<p
											style={{
												textAlign: "center",
												padding: "10px",
												backgroundColor: "red",
												fontWeight: "500",
												fontSize: "14px",
											}}>
											No Posts Available in {location}!
										</p>
									)}
								</div>
							</div>

							<div className='job-post-preview'>
								<div className='post-preview-panel'>
									<div className='job-post-header'>
										<h3>Job Post Preview</h3>
									</div>

									{post !== null ? (
										<div>
											<div className='post-header'>
												<div className='upperLeft-info'>
													<div className='account-profile-container'>
														<div className='account-profile'>
															<img
																src={`../assets/${post.Company_Image}`}
																alt='Stablishment'
															/>
														</div>
														{post.Required_Employees >= 5 && (
															<div
																className='verify'
																title='Verified'>
																<img src={OKIcon} alt='okay' />
															</div>
														)}
													</div>

													<div className='basic-info'>
														<h2>{post.Company_Name}</h2>

														<div className='date-address'>
															<p>
																{AdminResources.setTimeStamp(
																	post.Minutes,
																	post.Hour,
																	post.Day,
																	post.Month,
																	post.Year
																)}
															</p>
															<div className='address'>
																<img
																	src={LocationIcon}
																	alt='Location Icon'
																/>
																<p>{post.Company_Address}</p>
															</div>
														</div>
													</div>
												</div>
												<div className='upperRight-info'>•••</div>
											</div>
											<div className='post-preview'>
												<div className='post-body'>
													<div className='post-basic-content'>
														<h3 className='job-title'>
															{post.Job_Title}
														</h3>
														<p className='job-category'>
															({post.Category})
														</p>

														<div className='post-detail-container'>
															<div className='post-detail-group1'>
																<div className='post-detail'>
																	<p>Salary:</p>
																	<h4>₱ {post.Salary}</h4>
																</div>
																<div className='post-detail'>
																	<p>Req. Employees:</p>
																	<h4>
																		{post.Required_Employees}
																	</h4>
																</div>
																<div className='post-detail'>
																	<p>Applied Applicants:</p>
																	<h4>
																		{numApplicants.length}
																	</h4>
																</div>
															</div>

															<div className='post-detail-group2'>
																<div className='post-detail'>
																	<p>Job Type:</p>
																	<h4>{post.Job_Type}</h4>
																</div>
																<div className='post-detail'>
																	<p>Pref. Sex:</p>
																	<h4>{post.Preferred_Sex}</h4>
																</div>
																<div className='post-detail'>
																	<p>Job Status:</p>
																	<div className='active-status'>
																		<div
																			className='active-circle'
																			style={
																				post.Active_Status ===
																				"Active"
																					? {
																							backgroundColor:
																								"#00ff40",
																					  }
																					: {
																							backgroundColor:
																								"red",
																					  }
																			}></div>
																		<h4>
																			{post.Active_Status}
																		</h4>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className='job-qualification-container'>
														<div className='job-qualification-portion'>
															<h3>--- Job Qualifications ---</h3>
															<p>{post.Job_Qualifications}</p>
														</div>
														<div className='job-qualification-portion'>
															<h3>--- Job Requirements ---</h3>
															<p>{post.Job_Requirements}</p>
														</div>
														<div className='job-qualification-portion'>
															<h3>--- Job Description ---</h3>
															<p>{post.Job_Description}</p>
														</div>
														<div className='job-qualification-portion'>
															<h3>--- Employer's Name ---</h3>
															<p>{post.Employer_Name}</p>
														</div>
														{/* <div className='job-qualification-portion'>
															<h3>--- Contact Number ---</h3>
															<p>
																{companyData[0].Contact_Number}
															</p>
														</div>
														<div className='job-qualification-portion'>
															<h3>
																--- Company Description ---
															</h3>
															<p>
																{
																	companyData[0]
																		.Company_Description
																}
															</p>
														</div> */}
													</div>
												</div>
											</div>
										</div>
									) : (
										<p
											style={{
												textAlign: "center",
												padding: "10px",
												backgroundColor: "red",
												fontWeight: "500",
												fontSize: "14px",
											}}>
											No Job Post Selected!
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default JobPosts;
