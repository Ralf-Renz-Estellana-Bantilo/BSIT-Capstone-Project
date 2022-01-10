import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import User from "../Images/User.png";
import LocationIcon from "../Images/LocationIcon.png";
import AdminResources from "../AdminResources";
import "./Applicants.css";
import { useNavigate } from "react-router-dom";

const Applicants = ({
	activePage,
	setActivePage,
	setJobPosts,
	setEmployers,
	setApplicantsData,
	setJobApplicants,
	setJobSeekers,
	jobSeekers,
	applicantPreview,
	setApplicantPreview,
	setCompaniesData,
	applicantSearch,
	setApplicantSearch,
	admin,
	setAdmin,
}) => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		setActivePage("Applicants");
		localStorage.setItem("activePage", "Applicants");

		const sessionUser = sessionStorage.getItem("UserID");
		if (!sessionUser) {
			navigate("/");
		}
	}, []);

	const getMonth = (monthNum) => {
		let month = "";
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

		for (let a = 0; a < months.length; a++) {
			if (monthNum - 1 === a) {
				month = months[a];
			}
		}

		return month;
	};

	let applicant = applicantPreview;

	let countApplicant = 0;
	{
		jobSeekers.map((jobSeeker) => {
			if (
				`${jobSeeker.Preferred_Job}`
					.toLowerCase()
					.includes(`${applicantSearch}`.toLowerCase()) ||
				`${jobSeeker.Preferred_Category}`
					.toLowerCase()
					.includes(`${applicantSearch}`.toLowerCase()) ||
				`${jobSeeker.Last_Name}`
					.toLowerCase()
					.includes(`${applicantSearch}`.toLowerCase()) ||
				`${jobSeeker.First_Name}`
					.toLowerCase()
					.includes(`${applicantSearch}`.toLowerCase()) ||
				`${jobSeeker.Home_Address}`
					.toLowerCase()
					.includes(`${applicantSearch}`.toLowerCase()) ||
				`${jobSeeker.Hiring_Status}`
					.toLowerCase()
					.includes(`${applicantSearch}`.toLowerCase())
			) {
				countApplicant += 1;
			}
		});
	}

	return (
		<div className='applicants-container'>
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
						isSidebarOpen={isSidebarOpen}
						text={applicantSearch}
						admin={admin}
						setAdmin={setAdmin}
						setText={setApplicantSearch}
						setSidebarOpen={setSidebarOpen}
					/>

					<div className='main-panel-container'>
						<div className='job-post-panel-container'>
							<div className='job-post-panel'>
								<div className='job-post-header'>
									<h3>List of Job Seekers ({countApplicant})</h3>
									{/* <p title='More Options...'>•••</p> */}
								</div>
								<div className='job-posts'>
									{jobSeekers.map((jobSeeker) => {
										if (
											`${jobSeeker.Preferred_Job}`
												.toLowerCase()
												.includes(
													`${applicantSearch}`.toLowerCase()
												) ||
											`${jobSeeker.Preferred_Category}`
												.toLowerCase()
												.includes(
													`${applicantSearch}`.toLowerCase()
												) ||
											`${jobSeeker.Last_Name}`
												.toLowerCase()
												.includes(
													`${applicantSearch}`.toLowerCase()
												) ||
											`${jobSeeker.First_Name}`
												.toLowerCase()
												.includes(
													`${applicantSearch}`.toLowerCase()
												) ||
											`${jobSeeker.Home_Address}`
												.toLowerCase()
												.includes(
													`${applicantSearch}`.toLowerCase()
												) ||
											`${jobSeeker.Hiring_Status}`
												.toLowerCase()
												.includes(
													`${applicantSearch}`.toLowerCase()
												)
										) {
											let selectedApplicant = "";
											if (applicant) {
												if (
													applicant.ApplicantID ===
													jobSeeker.ApplicantID
												) {
													selectedApplicant =
														applicant.ApplicantID;
												}
											}
											return (
												<div
													className={
														jobSeeker.ApplicantID ===
														selectedApplicant
															? "selected-job-post"
															: "job-post"
													}
													style={
														jobSeeker.Hiring_Status === "Active"
															? {
																	borderLeft:
																		"5px solid #00ff40",
															  }
															: { borderLeft: "5px solid red" }
													}
													onClick={() => {
														// setApplicant(jobSeeker);
														setApplicantPreview(jobSeeker);
													}}>
													<div className='upperLeft-info'>
														<div
															className='account-profile'
															style={{
																height: "50px",
																width: "50px",
															}}>
															<img
																src={`../assets/${jobSeeker.User_Image}`}
																alt='Job Seeker'
															/>
														</div>
														<div className='basic-info'>
															<h2>
																{jobSeeker.Last_Name},{" "}
																{jobSeeker.First_Name}{" "}
																{jobSeeker.Middle_Name[0]}.
															</h2>

															<div className='date-address'>
																<p>
																	•{" "}
																	{AdminResources.getCurrentAge(
																		jobSeeker.B_Month,
																		jobSeeker.B_Day,
																		jobSeeker.B_Year
																	)}
																</p>
																<div className='address'>
																	<img
																		src={LocationIcon}
																		alt='Location Icon'
																	/>
																	<p>
																		{jobSeeker.Home_Address}
																	</p>
																</div>
															</div>
														</div>
													</div>
												</div>
											);
										}
									})}

									{countApplicant === 0 &&
										applicantSearch.length !== 0 && (
											<p
												style={{
													textAlign: "center",
													padding: "10px",
													backgroundColor: "red",
													color: "white",
													fontWeight: "500",
													fontSize: "14px",
												}}>
												No results found!
											</p>
										)}
								</div>
							</div>

							<div className='job-post-preview'>
								<div className='post-preview-panel'>
									<div className='job-post-header'>
										<h3>Job Seeker Preview</h3>
									</div>
									{applicant !== null ? (
										<div className='applicant-preview-container'>
											<div className='applicant-image-container'>
												<div className='applicant-basic-info'>
													<div className='applicant-image'>
														<img
															src={`../assets/${applicant.User_Image}`}
															alt='Applicant'
														/>
													</div>

													<div className='applicant-detail'>
														<div className='detail'>
															{/* Name:{" "} */}
															<p>
																{applicant.First_Name}{" "}
																{applicant.Middle_Name}{" "}
																{applicant.Last_Name}
															</p>
														</div>
														<div className='detail'>
															<p>{applicant.Home_Address}</p>
														</div>
														<div className='detail'>
															{/* Age:  */}
															<p>
																{AdminResources.getCurrentAge(
																	applicant.B_Month,
																	applicant.B_Day,
																	applicant.B_Year
																)}
															</p>
														</div>
														<div className='detail'>
															{/* Sex:  */}
															<p>{applicant.Sex}</p>
														</div>
														<div className='detail'>
															{/* Sex:  */}
															<div
																className='detail-status'
																style={
																	applicant.Hiring_Status ===
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
															<p>
																{applicant.Hiring_Status ===
																"Active"
																	? "Available to Hire"
																	: "Unavailable to Hire"}
															</p>
														</div>
													</div>
												</div>
											</div>
											<div className='applicant-info-container'>
												<div className='applicant-info'>
													<p>
														Email Address:{" "}
														<span>{applicant.Email_Address}</span>
													</p>
													<p>
														Contact Number:{" "}
														<span>
															{applicant.Contact_Number}
														</span>
													</p>
													<p>
														Date of Birth:{" "}
														<span>
															{" "}
															{getMonth(applicant.B_Month)}{" "}
															{applicant.B_Day},{" "}
															{applicant.B_Year}
														</span>
													</p>
													<p>
														Civil Status:{" "}
														<span>{applicant.Civil_Status}</span>
													</p>
													<p>
														Educational Attainment:{" "}
														<span>
															{applicant.Educ_Attainment}
														</span>
													</p>
												</div>
												<div className='applicant-info'>
													<p>
														Preferred Job/s:{" "}
														<span>{applicant.Preferred_Job}</span>
													</p>
													<p>
														Preferred Category:{" "}
														<span>
															{applicant.Preferred_Category}
														</span>
													</p>
													<p>
														Preferred Salary:{" "}
														<span>
															{applicant.Preferred_Salary}
														</span>
													</p>
													<div className='profession-info'>
														<h4>Interested in:</h4>
														<p>{applicant.Interested_In}</p>
													</div>
													<div className='profession-info'>
														<h4>Good at:</h4>
														<p>{applicant.Good_At}</p>
													</div>
													<div className='profession-info'>
														<h4>Credentials:</h4>
														<p>{applicant.Credentials}</p>
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
												color: "white",
												fontWeight: "500",
												fontSize: "14px",
											}}>
											No Job Seeker Selected!
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

export default Applicants;
