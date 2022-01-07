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

	let companyPosts = null;
	if (companyPreview !== null) {
		companyPosts = jobPosts.filter(
			(post) => post.CompanyID === companyPreview.CompanyID
		);
	}

	let countCompany = 0;
	{
		companiesData.map((company) => {
			if (
				`${company.Company_Name}`
					.toLowerCase()
					.includes(`${companySearch}`.toLowerCase()) ||
				`${company.Barangay}`
					.toLowerCase()
					.includes(`${companySearch}`.toLowerCase())
			) {
				countCompany += 1;
			}
		});
	}

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
							setSidebarOpen={setSidebarOpen}
						/>
					</div>
				) : (
					""
				)}
				<div className='panel-container'>
					<Navbar
						isSidebarOpen={isSidebarOpen}
						text={companySearch}
						admin={admin}
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
												.includes(`${companySearch}`.toLowerCase())
										) {
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
														company.CompanyID === selectedCompany
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
																src={`../assets/${company.Company_Image}`}
																alt='Company'
															/>
														</div>
														<div className='basic-info'>
															<h2>{company.Company_Name}</h2>

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
									})}

									{countCompany === 0 && companySearch.length !== 0 && (
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
											{companyPreview !== null && <p>•••</p>}
										</div>
										{companyPreview !== null ? (
											<div className='company-detail-container'>
												<div className='company-image-container'>
													<div className='company-image'>
														<img
															src={`../assets/${companyPreview.Company_Image}`}
															alt='Establishment'
														/>
													</div>
													<h3>{companyPreview.Company_Name}</h3>
													{/* <StarRating
														rating={companyPosts.length}
													/> */}
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
															<span>
																{companyPreview.Street},{" "}
																{companyPreview.Zone},{" "}
																{companyPreview.Barangay}
															</span>
														</p>
														<p>
															Contact Number:{" "}
															<span>
																{companyPreview.Contact_Number}
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
																className='company-post'
																style={
																	companyPost.Active_Status ===
																	"Active"
																		? {
																				borderLeft:
																					"5px solid #00ff40",
																		  }
																		: {
																				borderLeft:
																					"5px solid red",
																		  }
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
															src={`../assets/${selectedPostPreview.Company_Image}`}
															alt='Stablishment'
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
																		{
																			selectedPostPreview.Salary
																		}
																	</h4>
																</div>
																<div className='post-detail'>
																	<p>Req. Employees:</p>
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
																			{
																				selectedPostPreview.Active_Status
																			}
																		</h4>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className='job-qualification-container'>
														<div className='job-qualification-portion'>
															<h3>--- Job Qualifications ---</h3>
															<p>
																{
																	selectedPostPreview.Job_Qualifications
																}
															</p>
														</div>
														<div className='job-qualification-portion'>
															<h3>--- Job Requirements ---</h3>
															<p>
																{
																	selectedPostPreview.Job_Requirements
																}
															</p>
														</div>
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
