import React, { useEffect, useState } from "react";
import AdminResources from "../AdminResources";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "./JobPosts.css";
import DeleteIcon from "../Images/DeleteIcon.png";
import LocationIcon from "../Images/LocationIcon.png";
import User from "../Images/User.png";
import PopupMenuJobPost from "../PopupMenuJobPost";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import axios from "axios";
import shortid from "shortid";

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
	addPost,
	location,
	status,
	sort,
	setLocation,
	setStatus,
	setSort,
	jobPostSearch,
	setJobPostSearch,
	admin,
	setAdmin,
	setAdminPosts,
}) => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
	const [isJobPostPanelOpen, setJobPostPanelOpen] = useState(false);
	const [previewID, setPreviewID] = useState(null);
	const [previewDeleteCompany, setPreviewDeleteCompany] = useState(null);

	// States for Posting a Job
	const [jobTitle, setJobTitle] = useState("");
	const [jobCategory, setJobCategory] = useState("");
	const [noReqEmp, setNoReqEmp] = useState("");
	const [salary, setSalary] = useState("");
	const [prefSex, setPrefSex] = useState("");
	const [jobType, setJobType] = useState("");
	const [jobQualification, setJobQualification] = useState("");
	const [jobRequirement, setJobRequirement] = useState("");
	const [jobDescription, setJobDescription] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [street, setStreet] = useState("");
	const [zone, setZone] = useState("");
	const [companyBarangay, setCompanyBarangay] = useState("");
	const [employerFirstName, setEmployerFirstName] = useState("");
	const [employerMiddleName, setEmployerMiddleName] = useState("");
	const [employerLastName, setEmployerLastName] = useState("");
	const [contactNumber, setContactNumber] = useState("");
	const [companyDescription, setCompanyDescription] = useState("");
	const [imagePreview, setImagePreview] = useState(null);
	const [companyImage, setCompanyImage] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		setActivePage("Job Posts");
		localStorage.setItem("activePage", "Job Posts");

		const sessionUser = sessionStorage.getItem("UserID");
		if (!sessionUser) {
			navigate("/");
		}
	}, []);

	const handlePostJob = async () => {
		const date =
			new Date().getMonth() +
			1 +
			"_" +
			new Date().getDate() +
			"_" +
			new Date().getFullYear();

		if (companyImage.size > 2000000) {
			alert("File too large (2mb limit) ! Please try again!");
		} else {
			const post = {
				JobID: shortid.generate(),
				CompanyID: shortid.generate(),
				Minutes: new Date().getMinutes(),
				Hour: new Date().getHours(),
				Day: new Date().getDate(),
				Month: new Date().getMonth() + 1,
				Year: new Date().getFullYear(),
				Date_Posted: new Date(),
				Job_Title: jobTitle,
				Category: jobCategory,
				Required_Employees: noReqEmp,
				Salary: salary,
				Preferred_Sex: prefSex,
				Job_Type: jobType,
				Job_Qualifications: jobQualification,
				Job_Requirements: jobRequirement,
				Job_Description: jobDescription,
				Company_Name: companyName,
				Company_Address: `${street}, ${zone}, ${companyBarangay}`,
				Street: street,
				Zone: zone,
				Barangay: companyBarangay,
				Employer_First_Name: employerFirstName,
				Employer_Middle_Name: employerMiddleName,
				Employer_Last_Name: employerLastName,
				Contact_Number: contactNumber,
				Company_Description: companyDescription,
				Company_Image: date + "_" + companyImage.name,
				File: companyImage,
				Active_Status: "Active",
			};
			setJobPostPanelOpen(false);
			addPost(post);

			clearInputEntries();
		}
	};

	const clearInputEntries = () => {
		// Clearing all the entries
		setJobTitle("");
		setJobCategory("");
		setNoReqEmp("");
		setSalary("");
		setPrefSex("");
		setJobType("");
		setJobQualification("");
		setJobRequirement("");
		setJobDescription("");
		setCompanyName("");
		setStreet("");
		setZone("");
		setCompanyBarangay("");
		setEmployerFirstName("");
		setEmployerMiddleName("");
		setEmployerLastName("");
		setContactNumber("");
		setCompanyImage(null);
		setImagePreview(null);
	};

	const handleChange = (text) => {
		const jobTitles = AdminResources.getCategoriesWithDescription();
		for (let a = 0; a < jobTitles.length; a++) {
			for (let b = 0; b < jobTitles[a].jobs.length; b++) {
				if (jobTitles[a].jobs[b] === text) {
					setJobCategory(jobTitles[a].category);
				}
			}
		}
	};

	const handleDeletePost = async () => {
		await axios
			.delete(`http://localhost:2000/api/delete-jobPost/${previewID}`)
			.then(async (response) => {
				console.log("Post has been deleted");
				setIsModalOpen(false);

				let posts = jobPosts;
				let index = posts.findIndex((x) => x.JobID === previewID);
				posts.splice(index, 1);

				await setJobPosts(posts);
				await setPostPreview(null);
			});
		await axios
			.delete(`http://localhost:2000/api/delete-job-applicants/${previewID}`)
			.then(async (response) => {
				console.log("Job Applicants have been deleted");
			});
		await axios
			.delete(`http://localhost:2000/api/delete-applied-job/${previewID}`)
			.then(async (response) => {
				console.log("Applied Job has been deleted");
			});
	};

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

	{
		activePosts.map((jobPost) => {
			let address =
				jobPost.Company_Address.split(", ")[
					jobPost.Company_Address.split(", ").length - 1
				];
			if (
				(`${jobPost.Job_Title}`
					.toLowerCase()
					.includes(`${jobPostSearch}`.toLowerCase()) ||
					`${jobPost.Job_Type}`
						.toLowerCase()
						.includes(`${jobPostSearch}`.toLowerCase()) ||
					`${jobPost.Category}`
						.toLowerCase()
						.includes(`${jobPostSearch}`.toLowerCase()) ||
					`${jobPost.Company_Address}`
						.toLowerCase()
						.includes(`${jobPostSearch}`.toLowerCase()) ||
					`${jobPost.Company_Name}`
						.toLowerCase()
						.includes(`${jobPostSearch}`.toLowerCase()) ||
					`${jobPost.Preferred_Sex}`
						.toLowerCase()
						.includes(`${jobPostSearch}`.toLowerCase())) &&
				`${address}`.toLowerCase().includes(location.toLowerCase())
			) {
				countList += 1;
				return null;
			}
		});
	}

	if (count === 0) {
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

	// Posting a JOB logic -----
	const categories = AdminResources.getCategories();
	const jobTitles = AdminResources.getCategoriesWithDescription();

	let categoryResources = categories.map((category) => {
		return (
			<option key={category} value={category}>
				{category}
			</option>
		);
	});

	let arrayJobs = [];
	let arrayCategories = [];

	for (let a = 0; a < jobTitles.length; a++) {
		let categoryName = jobTitles[a].category;
		for (let b = 0; b < jobTitles[a].jobs.length; b++) {
			arrayJobs.push(jobTitles[a].jobs[b]);
			arrayCategories.push(categoryName);
		}
	}

	let numCount = -1;

	let jobTitleSmartHints = arrayJobs.map((jobTitle) => {
		numCount += 1;
		return (
			<option key={jobTitle} value={jobTitle}>
				{arrayCategories[numCount]}
			</option>
		);
	});

	const listOfBarangays = AdminResources.getBarangay();
	let barangay = listOfBarangays.map((b) => {
		return (
			<option key={b} value={b}>
				{b}
			</option>
		);
	});

	let finalSalary = "";
	if (post) {
		let jobSalary = post.Salary;
		for (let a = 1; a <= jobSalary.length; a++) {
			if (
				jobSalary.length - a === 3 ||
				jobSalary.length - a === 6 ||
				jobSalary.length - a === 9 ||
				jobSalary.length - a === 12 ||
				jobSalary.length - a === 15 ||
				jobSalary.length - a === 18 ||
				jobSalary.length - a === 21
			) {
				finalSalary += jobSalary[a - 1] + ",";
			} else {
				finalSalary += jobSalary[a - 1];
			}
		}
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

			{isModalOpen && (
				<Modal
					headText='Delete Post Confirmation'
					modalText={`Are you sure you want to permanently delete this post from ${previewDeleteCompany}?`}
					confirmText='Yes'
					closeText='No'
					close={() => setIsModalOpen(false)}
					confirm={handleDeletePost}
					path='/admin/job-posts'
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
						text={jobPostSearch}
						admin={admin}
						setText={setJobPostSearch}
						isSidebarOpen={isSidebarOpen}
						isJobPostPanelOpen={isJobPostPanelOpen}
						setSidebarOpen={setSidebarOpen}
						setJobPostPanelOpen={setJobPostPanelOpen}
						setAdmin={setAdmin}
					/>

					<div className='main-panel-container'>
						{isJobPostPanelOpen ? (
							<div className='job-post-panel-container'>
								<div className='job-post-panel'>
									<div className='job-post-header'>
										<h3>Job Vacancy Form</h3>
									</div>
									<div className='job-posts'>
										<div className='post-fields'>
											<div className='post-field'>
												<label>Job Title:</label>
												<input
													list='jobLists'
													type='text'
													placeholder='Job Title'
													value={jobTitle}
													onChange={(e) => {
														setJobTitle(e.target.value);
														handleChange(e.target.value);
													}}
												/>
												<datalist id='jobLists'>
													{jobTitleSmartHints}
												</datalist>
											</div>
											<div className='post-field'>
												<label>Job Category:</label>
												<select
													name='Job Category'
													value={jobCategory}
													onChange={(e) =>
														setJobCategory(e.target.value)
													}>
													<option
														disabled='disabled'
														hidden='hidden'
														value=''>
														Select Job Category
													</option>
													{categoryResources}
												</select>
											</div>
											<div className='post-field-group'>
												<div className='post-field'>
													<label>No. of Employees:</label>
													<input
														type='number'
														placeholder='No. of Employees'
														onChange={(e) =>
															setNoReqEmp(e.target.value)
														}
														value={noReqEmp}
													/>
												</div>
												<div className='post-field'>
													<label>Salary:</label>
													<input
														type='number'
														placeholder='₱ ----'
														onChange={(e) =>
															setSalary(e.target.value)
														}
														value={salary}
													/>
												</div>
											</div>

											<div className='post-field-group'>
												<div className='post-field'>
													<label>Preferred Sex:</label>
													<select
														name='Preferred Sex'
														onChange={(e) =>
															setPrefSex(e.target.value)
														}
														value={prefSex}>
														<option
															disabled='disabled'
															hidden='hidden'
															value=''>
															Select Gender
														</option>
														<option value='Male'>Male</option>
														<option value='Female'>Female</option>
														<option value='Male/Female'>
															Male/Female
														</option>
													</select>
												</div>
												<div className='post-field'>
													<label>Job Type:</label>
													<select
														name='Job Type'
														onChange={(e) =>
															setJobType(e.target.value)
														}
														value={jobType}>
														<option
															disabled='disabled'
															hidden='hidden'
															value=''>
															Select Job Type
														</option>
														<option value='Full-time'>
															Full-time
														</option>
														<option value='Part-time'>
															Part-time
														</option>
														<option value='Contract'>
															Contract
														</option>
														<option value='Urgent Hiring'>
															Urgent Hiring
														</option>
														<option value='Temporary'>
															Temporary
														</option>
														<option value='Seasonal'>
															Seasonal
														</option>
														<option value='Freelance'>
															Freelance
														</option>
														<option value='Intern'>Intern</option>
													</select>
												</div>
											</div>
											<div className='job-qualification'>
												<h4>Job Qualifications</h4>
												<textarea
													name='work-experience'
													placeholder=' - Sample 
                            - Job 
                            - Qualifications'
													onChange={(e) =>
														setJobQualification(e.target.value)
													}
													defaultValue={
														jobQualification
													}></textarea>
											</div>
											<div className='job-qualification'>
												<h4>Job Requirements</h4>
												<textarea
													name='work-experience'
													placeholder=' - Sample
                            - Job
                            - Requirements'
													onChange={(e) =>
														setJobRequirement(e.target.value)
													}
													defaultValue={jobRequirement}></textarea>
											</div>
											<div className='job-qualification'>
												<h4>Job Description</h4>
												<textarea
													name='work-experience'
													placeholder=' Sample Description'
													onChange={(e) =>
														setJobDescription(e.target.value)
													}
													defaultValue={jobDescription}></textarea>
											</div>
										</div>
									</div>
								</div>

								<div className='job-post-preview'>
									<div className='post-preview-panel'>
										<div className='job-post-header'>
											<h3>Business Stablishment Information</h3>
										</div>
										<div className='job-posts'>
											<div className='post-fields'>
												<div className='post-field'>
													<label>Company Name:</label>
													<input
														type='text'
														placeholder={`Enter Company's Name`}
														value={companyName}
														onChange={(e) =>
															setCompanyName(e.target.value)
														}
													/>
												</div>
												<div className='post-field'>
													<label>Employer's First Name:</label>
													<input
														type='text'
														placeholder={`First Name`}
														value={employerFirstName}
														onChange={(e) =>
															setEmployerFirstName(
																e.target.value
															)
														}
													/>
												</div>
												<div className='post-field'>
													<label>Employer's Middle Name:</label>
													<input
														type='text'
														placeholder={`Middle Name`}
														value={employerMiddleName}
														onChange={(e) =>
															setEmployerMiddleName(
																e.target.value
															)
														}
													/>
												</div>
												<div className='post-field'>
													<label>Employer's Last Name:</label>
													<input
														type='text'
														placeholder={`Last Name`}
														value={employerLastName}
														onChange={(e) =>
															setEmployerLastName(e.target.value)
														}
													/>
												</div>
												<div className='post-field'>
													<label>Street:</label>
													<input
														type='text'
														placeholder='Address: (Street)'
														value={street}
														onChange={(e) =>
															setStreet(e.target.value)
														}
													/>
												</div>
												<div className='post-field'>
													<label>Zone:</label>
													{/* <input
														type='text'
														placeholder='Address: (Zone)'
														value={zone}
														onChange={(e) =>
															setZone(e.target.value)
														}
													/> */}
													<select
														value={zone}
														onChange={(e) =>
															setZone(e.target.value)
														}>
														<option
															disabled='disabled'
															hidden='hidden'
															value=''>
															Select Zone
														</option>
														<option value='Zone 1'>Zone 1</option>
														<option value='Zone 2'>Zone 2</option>
														<option value='Zone 3'>Zone 3</option>
														<option value='Zone 4'>Zone 4</option>
														<option value='Zone 5'>Zone 5</option>
														<option value='Zone 6'>Zone 6</option>
													</select>
												</div>
												<div className='post-field'>
													<label>Barangay:</label>
													<select
														value={companyBarangay}
														onChange={(e) =>
															setCompanyBarangay(e.target.value)
														}>
														<option
															disabled='disabled'
															hidden='hidden'
															value=''>
															Select Barangay
														</option>
														{barangay}
													</select>
												</div>
												<div className='post-field'>
													<label>Stablishment Contact No.:</label>
													<input
														type='text'
														placeholder='Cellphone Number'
														value={contactNumber}
														onChange={(e) =>
															setContactNumber(e.target.value)
														}
													/>
												</div>
												<div className='job-qualification'>
													<h4>Company Description:</h4>
													<textarea
														name='business-description'
														placeholder='Enter Business Description'
														onChange={(e) =>
															setCompanyDescription(
																e.target.value
															)
														}></textarea>
												</div>

												<div className='post-field'>
													<label>Stablishment Photo:</label>
													<input
														type='file'
														accept='image/jpeg, image/png'
														onChange={(e) => {
															setCompanyImage(e.target.files[0]);
															setImagePreview(
																URL.createObjectURL(
																	e.target.files[0]
																)
															);
														}}
													/>
													<div className='photo-panel'>
														<img
															src={imagePreview}
															alt={
																companyImage !== null
																	? "Company Picture"
																	: "No Loaded Picture"
															}
														/>
													</div>
												</div>

												<div className='post-field'>
													<button
														className='next'
														onClick={handlePostJob}>
														Post
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
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
											if (
												`${jobPost.Job_Title}`
													.toLowerCase()
													.includes(
														`${jobPostSearch}`.toLowerCase()
													) ||
												`${jobPost.Job_Type}`
													.toLowerCase()
													.includes(
														`${jobPostSearch}`.toLowerCase()
													) ||
												`${jobPost.Category}`
													.toLowerCase()
													.includes(
														`${jobPostSearch}`.toLowerCase()
													) ||
												`${jobPost.Company_Address}`
													.toLowerCase()
													.includes(
														`${jobPostSearch}`.toLowerCase()
													) ||
												`${jobPost.Company_Name}`
													.toLowerCase()
													.includes(
														`${jobPostSearch}`.toLowerCase()
													) ||
												`${jobPost.Preferred_Sex}`
													.toLowerCase()
													.includes(
														`${jobPostSearch}`.toLowerCase()
													)
											) {
												let address =
													jobPost.Company_Address.split(", ")[
														jobPost.Company_Address.split(", ")
															.length - 1
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
																jobPost.Active_Status ===
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
															onClick={() =>
																setPostPreview(jobPost)
															}>
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
											}
										})}

										{count === 0 &&
										activePosts.length > 0 &&
										location.length !== 0 ? (
											<p
												style={{
													textAlign: "center",
													padding: "10px",
													backgroundColor: "red",
													color: "white",
													fontWeight: "500",
													fontSize: "14px",
												}}>
												No Posts Available in {location}!
											</p>
										) : countList === 0 && location.length === 0 ? (
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
										) : (
											""
										)}
									</div>
								</div>

								<div className='job-post-preview'>
									<div className='post-preview-panel'>
										<div className='job-post-header'>
											<h3>Job Post Preview</h3>
										</div>

										{post !== null ? (
											<>
												<div className='post-header'>
													<div className='upperLeft-jobPost'>
														<div className='account-profile-container'>
															<div className='account-profile'>
																<img
																	src={`../assets/${post.Company_Image}`}
																	alt='Stablishment'
																/>
															</div>
															{/* {post.Required_Employees >= 5 && (
															<div
																className='verify'
																title='Verified'>
																<img
																	src={OKIcon}
																	alt='Verified'
																/>
															</div>
														)} */}
														</div>

														<div className='basic-jobPost'>
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
													<div className='upperRight-jobPost'>
														<img
															src={DeleteIcon}
															alt='Delete post'
															title='Delete this post'
															onClick={() => {
																setIsModalOpen(true);
																setPreviewID(post.JobID);
																setPreviewDeleteCompany(
																	post.Company_Name
																);
															}}
														/>
													</div>
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
																		<h4>₱ {finalSalary}</h4>
																	</div>
																	<div className='post-detail'>
																		<p title='Required no. of Employees'>
																			Req. Employees:
																		</p>
																		<h4>
																			{
																				post.Required_Employees
																			}
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
																		<p title='Preferred Sex'>
																			Pref. Sex:
																		</p>
																		<h4>
																			{post.Preferred_Sex}
																		</h4>
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
																<h3>
																	--- Job Qualifications ---
																</h3>
																<p>{post.Job_Qualifications}</p>
															</div>
															<div className='job-qualification-portion'>
																<h3>
																	--- Job Requirements ---
																</h3>
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
											</>
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
												No Job Post Selected!
											</p>
										)}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default JobPosts;
