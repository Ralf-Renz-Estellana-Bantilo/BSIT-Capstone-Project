import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import CloseIcon from "../Images/CloseIcon.png";
import LocationIcon from "../Images/LocationIcon.png";
import "./Companies.css";
import AdminResources from "../AdminResources";
import StarRating from "../StarRating";
import { useNavigate } from "react-router-dom";

const Companies = ({
	activePage,
	setActivePage,
	setJobPosts,
	setEmployers,
	setApplicantsData,
	setJobApplicants,
	setJobSeekers,
	companiesData,
	companyPreview,
	setCompanyPreview,
	jobPosts,
	setCompaniesData,
	companySearch,
	setCompanySearch,
	admin,
	setAdmin,
	setAdminPosts,
	employerFeedback,
	jobApplicants,
}) => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [selectedPostPreview, setSelectedPostPreview] = useState(null);
	const [frameNumber, setFrameNumber] = useState(1);

	const navigate = useNavigate();

	useEffect(() => {
		setActivePage("Companies");
		localStorage.setItem("activePage", "Companies");

		const sessionUser = sessionStorage.getItem("UserID");
		if (!sessionUser) {
			navigate("/");
		}
	}, []);

	const formatPlaceOfWork = () => {
		try {
			const street =
				companyPreview.Street === null ? "" : companyPreview.Street;
			const zone =
				companyPreview.Zone === null
					? "Not Specified"
					: companyPreview.Zone;

			const address = `${companyPreview.Street}, ${companyPreview.Zone}, ${companyPreview.Barangay}`;
			let place = `${address}`.split(", ");
			let formattedPlace = "";

			if (place.length === 1) {
				formattedPlace = address;
			} else {
				if (place[0] === "" && place[1] !== "Not Specified") {
					formattedPlace = place[1] + ", " + place[2];
				} else if (place[0] !== "" && place[1] === "Not Specified") {
					formattedPlace = place[0] + ", " + place[2];
				} else if (place[0] === "" && place[1] === "Not Specified") {
					formattedPlace = place[2];
				} else {
					formattedPlace = address;
				}
			}

			return formattedPlace;
		} catch (error) {
			return "";
		}
	};

	let companyPosts = null;
	if (companyPreview !== null) {
		companyPosts = jobPosts.filter(
			(post) => post.CompanyID === companyPreview.CompanyID
			// && post.Is_Deleted === "Visible"
		);
	}

	let countCompany = 0;
	{
		companiesData.map((company) => {
			if (company.Employer_Name !== null) {
				if (
					`${company.Company_Name}`
						.toLowerCase()
						.includes(`${companySearch}`.toLowerCase()) ||
					`${company.Barangay}`
						.toLowerCase()
						.includes(`${companySearch}`.toLowerCase()) ||
					`${company.Company_Acronym}`
						.toLowerCase()
						.includes(`${companySearch}`.toLowerCase())
				) {
					countCompany += 1;
				}
			}
		});
	}

	companiesData.sort((a, b) => (a.Company_Name > b.Company_Name ? 1 : -1));

	const companyAddress = formatPlaceOfWork();

	let companyPostStats = null;
	try {
		companyPostStats = companyPosts.map((post) => {
			let hiredApplicants = employerFeedback.filter(
				(feedback) =>
					feedback.Application_Status === "Hired" &&
					feedback.JobID === post.JobID
			);

			let appliedApplicants = jobApplicants.filter(
				(applicant) => applicant.JobID === post.JobID
			);

			let countBalance =
				Number(post.Required_Employees) - Number(hiredApplicants.length);

			return (
				<>
					<tr>
						<td>{post.Job_Title}</td>
						<td>{post.Required_Employees}</td>
						<td>{appliedApplicants.length}</td>
						<td>{hiredApplicants.length}</td>
						<td>{countBalance}</td>
					</tr>
				</>
			);
		});
	} catch (error) {}

	return (
		<div className='companies-container'>
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
						isSidebarOpen={isSidebarOpen}
						text={companySearch}
						admin={admin}
						setAdmin={setAdmin}
						setText={setCompanySearch}
						setSidebarOpen={setSidebarOpen}
					/>

					<div className='main-panel-container'>
						<div className='job-post-panel-container'>
							<div className='job-post-panel'>
								<div className='job-post-header'>
									<h3>
										List of Companies/Business Establishments (
										{`${countCompany}`})
									</h3>
									{/* <p title='More Options...'>•••</p> */}
								</div>
								<div className='job-posts'>
									{companiesData.map((company) => {
										if (
											`${company.Company_Name}`
												.toLowerCase()
												.includes(
													`${companySearch}`.toLowerCase()
												) ||
											`${company.Barangay}`
												.toLowerCase()
												.includes(
													`${companySearch}`.toLowerCase()
												) ||
											`${company.Company_Acronym}`
												.toLowerCase()
												.includes(`${companySearch}`.toLowerCase())
										) {
											if (company.Employer_Name !== null) {
												let selectedCompany = "";
												if (companyPreview) {
													if (
														companyPreview.CompanyID ===
														company.CompanyID
													) {
														selectedCompany =
															companyPreview.CompanyID;
													}
												}
												return (
													<div
														className={
															company.CompanyID ===
															selectedCompany
																? "selected-job-post"
																: "job-post"
														}
														style={{ border: "none" }}
														onClick={() => {
															setCompanyPreview(company);
															setFrameNumber(1);
														}}>
														<div className='upperLeft-info'>
															<div
																className='account-profile'
																style={{
																	height: "50px",
																	width: "50px",
																}}>
																<img
																	src={company.Company_Image}
																	alt='Company'
																/>
															</div>
															<div className='basic-info'>
																{company.Company_Acronym !==
																"(n/a)" ? (
																	<h2
																		title={
																			company.Company_Name
																		}>
																		{company.Company_Acronym}{" "}
																		<span>(shortened)</span>
																	</h2>
																) : (
																	<h2>
																		{company.Company_Name}
																	</h2>
																)}

																<div className='date-address'>
																	<div className='address'>
																		<img
																			src={LocationIcon}
																			alt='Location Icon'
																		/>
																		<p>{company.Barangay}</p>
																	</div>
																</div>
															</div>
														</div>
													</div>
												);
											}
										}
									})}

									{countCompany === 0 && companySearch.length === 0 && (
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
								{frameNumber === 1 ? (
									<div className='post-preview-panel'>
										<div className='job-post-header'>
											<h3>Company Detail Preview</h3>
										</div>
										{companyPreview !== null ? (
											<div className='company-detail-container'>
												<div className='company-image-container'>
													<div className='company-image'>
														<img
															src={companyPreview.Company_Image}
															alt='Establishment'
														/>
													</div>
													<h3>{companyPreview.Company_Name}</h3>
												</div>
												<div className='applicant-detail'>
													<div className='applicant-info'>
														<p>
															Employer's Name:{" "}
															<span>
																{companyPreview.Employer_Name}
															</span>
														</p>
														<p>
															Company Address:{" "}
															<span>{companyAddress}</span>
														</p>
														<p>
															Acronym/Abbreviation:{" "}
															<span>
																{companyPreview.Company_Acronym}
															</span>
														</p>
														<p>
															Employer Type:{" "}
															<span>
																{companyPreview.Employer_Type}
															</span>
														</p>
														<p>
															Work Force:{" "}
															<span>
																{companyPreview.Work_Force}
															</span>
														</p>
														<p>
															Contact Number:{" "}
															<span>
																{companyPreview.Contact_Number}
															</span>
														</p>
														<p>
															Email Address:{" "}
															<span>
																{companyPreview.Email_Address}
															</span>
														</p>
														<div className='profession-info'>
															<h4>Business Description:</h4>
															<p>
																{
																	companyPreview.Company_Description
																}
															</p>
														</div>
													</div>
												</div>
												<div className='company-posts'>
													{companyPosts.length < 2 ? (
														<h3>
															Company Post (
															{`${companyPosts.length}`})
														</h3>
													) : (
														<h3>
															Company Posts (
															{`${companyPosts.length}`})
														</h3>
													)}

													{companyPosts.map((companyPost) => {
														return (
															<div
																className={
																	companyPost.Is_Deleted ===
																	"Visible"
																		? "company-post"
																		: "company-post is-deleted"
																}
																style={
																	companyPost.Active_Status ===
																		"Active" &&
																	companyPost.Is_Deleted !==
																		"Deleted"
																		? {
																				borderLeft:
																					"5px solid #00ff40",
																		  }
																		: companyPost.Active_Status ===
																				"Closed" &&
																		  companyPost.Is_Deleted !==
																				"Deleted"
																		? {
																				borderLeft:
																					"5px solid red",
																		  }
																		: companyPost.Is_Deleted ===
																		  "Deleted"
																		? {
																				borderLeft:
																					"5px solid #006aff",
																		  }
																		: ""
																}
																onClick={() => {
																	setFrameNumber(2);
																	setSelectedPostPreview(
																		companyPost
																	);
																}}>
																<div className='post-left-portion'>
																	<h3>
																		{companyPost.Job_Title}
																	</h3>
																	<p>{companyPost.Category}</p>
																</div>
																<div className='post-right-portion'>
																	<p>
																		{AdminResources.setTimeStamp(
																			companyPost.Minutes,
																			companyPost.Hour,
																			companyPost.Day,
																			companyPost.Month,
																			companyPost.Year
																		)}
																	</p>
																</div>
															</div>
														);
													})}

													<div className='summary'>
														<div className='summary-header'>
															<h4>JOB POST STATISTICS</h4>
														</div>
														<div className='summary-content'>
															<table>
																<tr>
																	<th>Job Title</th>
																	<th>Vacancy Count</th>
																	<th>Applied</th>
																	<th>Hired</th>
																	<th>Balance</th>
																</tr>
																{companyPostStats}
															</table>
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
												No Company Selected!
											</p>
										)}
									</div>
								) : (
									<div className='post-preview-panel'>
										<div className='job-post-header'>
											<h3>Job Post Preview</h3>
										</div>

										<div>
											<div className='post-header'>
												<div className='upperLeft-info'>
													<div className='account-profile'>
														<img
															src={
																selectedPostPreview.Company_Image
															}
															alt='Establishment'
														/>
													</div>
													<div className='basic-info'>
														<h2>
															{selectedPostPreview.Company_Name}
														</h2>

														<div className='date-address'>
															<p>
																{AdminResources.setTimeStamp(
																	selectedPostPreview.Minutes,
																	selectedPostPreview.Hour,
																	selectedPostPreview.Day,
																	selectedPostPreview.Month,
																	selectedPostPreview.Year
																)}
															</p>
															<div className='address'>
																<img
																	src={LocationIcon}
																	alt='Location Icon'
																/>
																<p>
																	{
																		selectedPostPreview.Company_Address
																	}
																</p>
															</div>
														</div>
													</div>
												</div>
												<div
													className='upperRight-info'
													onClick={() => setFrameNumber(1)}>
													<img
														src={CloseIcon}
														alt='Close Panel'
														style={{ height: "25px" }}
													/>
												</div>
											</div>
											<div className='post-preview'>
												<div className='post-body'>
													<div className='post-basic-content'>
														<h3 className='job-title'>
															{selectedPostPreview.Job_Title}
														</h3>
														<p className='job-category'>
															({selectedPostPreview.Category})
														</p>

														<div className='post-detail-container'>
															<div className='post-detail-group1'>
																<div className='post-detail'>
																	<p>Salary:</p>
																	<h4>
																		₱{" "}
																		{AdminResources.formatMoney(
																			selectedPostPreview.Minimum_Salary
																		)}{" "}
																		- ₱{" "}
																		{AdminResources.formatMoney(
																			selectedPostPreview.Maximum_Salary
																		)}
																	</h4>
																</div>
																<div className='post-detail'>
																	<p>Vacancy Count:</p>
																	<h4>
																		{
																			selectedPostPreview.Required_Employees
																		}
																	</h4>
																</div>
																<div className='post-detail'>
																	<p>Job Type:</p>
																	<h4>
																		{
																			selectedPostPreview.Job_Type
																		}
																	</h4>
																</div>
															</div>

															<div className='post-detail-group2'>
																<div className='post-detail'>
																	<p>Pref. Sex:</p>
																	<h4>
																		{
																			selectedPostPreview.Preferred_Sex
																		}
																	</h4>
																</div>
																<div className='post-detail'>
																	<p>Job Status:</p>
																	<div className='active-status'>
																		<div
																			className='active-circle'
																			style={
																				selectedPostPreview.Active_Status ===
																					"Active" &&
																				selectedPostPreview.Is_Deleted ===
																					"Visible"
																					? {
																							backgroundColor:
																								"#00ff40",
																					  }
																					: selectedPostPreview.Active_Status ===
																							"Closed" &&
																					  selectedPostPreview.Is_Deleted ===
																							"Visible"
																					? {
																							backgroundColor:
																								"red",
																					  }
																					: {
																							backgroundColor:
																								"#006aff",
																					  }
																			}></div>
																		<h4>
																			{selectedPostPreview.Is_Deleted ===
																			"Visible"
																				? selectedPostPreview.Active_Status
																				: "Deleted"}

																			{selectedPostPreview.Date_Closed &&
																				` @ ${selectedPostPreview.Date_Closed}`}
																		</h4>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className='job-qualification-container'>
														<div className='job-qualification-portion'>
															<h3>
																--- Hiring Requirements ---
															</h3>
															<p>
																{
																	selectedPostPreview.Job_Qualifications
																}
															</p>
														</div>
														{/* <div className='job-qualification-portion'>
															<h3>--- Job Requirements ---</h3>
															<p>
																{
																	selectedPostPreview.Job_Requirements
																}
															</p>
														</div> */}
														<div className='job-qualification-portion'>
															<h3>--- Job Description ---</h3>
															<p>
																{
																	selectedPostPreview.Job_Description
																}
															</p>
														</div>
														<div className='job-qualification-portion'>
															<h3>--- Employer's Name ---</h3>
															<p>
																{
																	selectedPostPreview.Employer_Name
																}
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Companies;
