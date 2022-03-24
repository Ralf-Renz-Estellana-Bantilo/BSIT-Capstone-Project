import React, { useEffect, useState } from "react";
import AdminResources from "../AdminResources";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "./JobPosts.css";
import DeleteIcon from "../Images/DeleteIcon.png";
import CloseIcon from "../Images/CloseIcon.png";
import LocationIcon from "../Images/LocationIcon.png";
import PopupMenuJobPost from "../PopupMenuJobPost";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import axios from "axios";
import shortid from "shortid";
import AppConfiguration from "../AppConfiguration";

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
	const [isJobPostOptionOpen, setIsJobPostOptionOpen] = useState(false);
	const [isJobPostPanelOpen, setJobPostPanelOpen] = useState(false);
	const [previewID, setPreviewID] = useState(null);
	const [previewDeleteCompany, setPreviewDeleteCompany] = useState(null);

	// States for Posting a Job
	const [jobTitle, setJobTitle] = useState(null);
	const [jobCategory, setJobCategory] = useState("");
	const [noReqEmp, setNoReqEmp] = useState(null);
	const [minSalary, setMinSalary] = useState(null);
	const [maxSalary, setMaxSalary] = useState(null);
	const [civilStatus, setCivilStatus] = useState("");
	const [placeOfWork, setPlaceOfWork] = useState(null);
	const [prefSex, setPrefSex] = useState("");
	const [jobType, setJobType] = useState("");
	const [jobQualification, setJobQualification] = useState(null);
	const [jobRequirement, setJobRequirement] = useState(null);
	const [jobDescription, setJobDescription] = useState(null);
	const [companyName, setCompanyName] = useState(null);
	const [companyAcronym, setCompanyAcronym] = useState("");
	const [employerType, setEmployerType] = useState("");
	const [workForce, setWorkForce] = useState("");
	const [street, setStreet] = useState(null);
	const [zone, setZone] = useState("");
	const [companyBarangay, setCompanyBarangay] = useState("");
	const [employerFirstName, setEmployerFirstName] = useState(null);
	const [employerMiddleName, setEmployerMiddleName] = useState(null);
	const [employerLastName, setEmployerLastName] = useState(null);
	const [contactNumber, setContactNumber] = useState(null);
	const [emailAddress, setEmailAddress] = useState(null);
	const [companyDescription, setCompanyDescription] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [companyImage, setCompanyImage] = useState(null);
	const [contactPersonName, setContactPersonName] = useState(null);
	const [contactPersonPosition, setContactPersonPosition] = useState(null);
	const [contactPersonNumber, setContactPersonNumber] = useState(null);
	const [contactPersonEmail, setContactPersonEmail] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [hasAcronym, setHasAcronym] = useState(true);
	const [hasContactPerson, setHasContactPerson] = useState(false);

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
			"" +
			new Date().getDate() +
			new Date().getFullYear();

		if (
			jobTitle === null ||
			jobCategory === "" ||
			placeOfWork === null ||
			noReqEmp === null ||
			minSalary === null ||
			maxSalary === null ||
			prefSex === "" ||
			civilStatus === "" ||
			jobType === "" ||
			jobQualification === null ||
			jobRequirement === null ||
			jobDescription === null ||
			companyName === null ||
			// companyAcronym === null ||
			employerType === "" ||
			workForce === "" ||
			street === null ||
			zone === "" ||
			companyBarangay === "" ||
			employerFirstName === null ||
			employerMiddleName === null ||
			employerLastName === null ||
			contactNumber === null ||
			emailAddress === null ||
			companyDescription === null ||
			companyImage === null
			// contactPersonName === null &&
			// contactPersonPosition === null &&
			// contactPersonNumber === null &&
			// contactPersonEmail === null
		) {
			alert("Make sure to fill-in all the fields!");
		} else {
			let holdAcronym = "";
			if (hasAcronym) {
				holdAcronym = "(n/a)";
			} else {
				holdAcronym = hasAcronym;
			}

			if (companyImage.size > 2090000) {
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
					Minimum_Salary: minSalary,
					Maximum_Salary: maxSalary,
					Civil_Status: civilStatus,
					Work_Place: placeOfWork,
					Preferred_Sex: prefSex,
					Job_Type: jobType,
					Job_Qualifications: jobQualification,
					Job_Requirements: jobRequirement,
					Job_Description: jobDescription,
					Company_Name: companyName,
					Company_Acronym: holdAcronym,
					Employer_Type: employerType,
					Work_Force: workForce,
					Company_Address: `${street}, ${zone}, ${companyBarangay}`,
					Street: street,
					Zone: zone,
					Barangay: companyBarangay,
					Employer_First_Name: employerFirstName,
					Employer_Middle_Name: employerMiddleName,
					Employer_Last_Name: employerLastName,
					Employer_Name: `${employerFirstName} ${employerMiddleName} ${employerLastName}`,
					Contact_Number: contactNumber,
					Email_Address: emailAddress,
					Company_Description: companyDescription,
					Company_Image: date + "_" + companyImage.name,
					File: companyImage,
					Contact_Person_Name: contactPersonName,
					Contact_Person_Position: contactPersonPosition,
					Contact_Person_Number: contactPersonNumber,
					Contact_Person_Email: contactPersonEmail,
					Active_Status: "Active",
				};
				setJobPostPanelOpen(false);
				addPost(post);
				clearInputEntries();
			}
		}
	};

	const clearInputEntries = () => {
		// Clearing all the entries
		setJobTitle("");
		setJobCategory("");
		setNoReqEmp("");
		setMinSalary("");
		setMaxSalary("");
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
			.delete(`${AppConfiguration.url()}/api/delete-jobPost/${post.JobID}`)
			.then(async (response) => {
				setIsModalOpen(false);
			});
		await axios
			.delete(
				`${AppConfiguration.url()}/api/delete-job-applicants/${post.JobID}`
			)
			.then((response) => {});
		await axios
			.delete(
				`${AppConfiguration.url()}/api/delete-applied-job/${post.JobID}`
			)
			.then(async (response) => {
				let posts = jobPosts;
				let index = posts.findIndex((x) => x.JobID === post.JobID);
				posts.splice(index, 1);
				await setJobPosts(posts);
				await setIsJobPostOptionOpen(false);
				alert("Job Post has been deleted!");
			});
	};

	const handleClosePost = () => {
		setJobPosts(
			jobPosts.map((jobPost) =>
				jobPost.JobID === post.JobID
					? { ...jobPost, Active_Status: "Closed" }
					: jobPost
			)
		);
		setPostPreview({ ...post, Active_Status: "Closed" });
		setIsJobPostOptionOpen(false);

		// Fetching Job Post Data
		axios
			.put(`${AppConfiguration.url()}/api/update-jobPost-active-status`, {
				jobID: post.JobID,
			})
			.then((response) => {
				// console.log(response);
			});
	};

	let post = postPreview;

	let numApplicants = [];
	if (post) {
		numApplicants = jobApplicants.filter(
			(candidate) => candidate.JobID === post.JobID
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

	let previewAcronym = "";
	if (post) {
		for (let a = 0; a < companiesData.length; a++) {
			if (companiesData[a].CompanyID === post.CompanyID) {
				previewAcronym = companiesData[a].Company_Acronym;
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
					modalText={`Deleting this post means also deleting all the job applicants in it, wanna continue?`}
					// modalText={`Are you sure you want to permanently delete this post from ${post.Company_Name}?`}
					confirmText='Yes'
					closeText='No'
					close={() => setIsModalOpen(false)}
					confirm={handleDeletePost}
					path='/admin/job-posts'
				/>
			)}

			{isJobPostOptionOpen && (
				<div className='modal-container'>
					<div
						className='overlay-style'
						onClick={() => setIsJobPostOptionOpen(false)}
					/>
					<div className='modal-style'>
						<div className='modal-header'>
							<h3 className='modal-sub-text'>Job Post Option</h3>
							<div className='modal-close'>
								<img
									className='closeIcon'
									src={CloseIcon}
									alt='Close'
									onClick={() => setIsJobPostOptionOpen(false)}
								/>
							</div>
						</div>
						<h1 className='modal-text'>{post.Job_Title}</h1>
						<div className='modal-buttons'>
							<button
								className='modal-button-back'
								onClick={() => {
									setIsModalOpen(true);
									setIsJobPostOptionOpen(false);
								}}>
								Delete Job Post
							</button>
							<button
								className='modal-button-send'
								onClick={handleClosePost}
								disabled={
									post.Active_Status === "Active" ? "" : "disabled"
								}
								style={
									post.Active_Status === "Active"
										? { opacity: "1" }
										: { opacity: "0.7" }
								}>
								{post.Active_Status === "Active"
									? "Close Job Post"
									: "Closed"}
							</button>
						</div>
					</div>
				</div>
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
											<div className='post-field'>
												<label>Place of Work:</label>
												<input
													type='text'
													placeholder='Place of Work'
													value={placeOfWork}
													onChange={(e) => {
														setPlaceOfWork(e.target.value);
													}}
												/>
											</div>
											<div className='post-field-group'>
												<div className='post-field'>
													<label>Vacancy Count:</label>
													<input
														type='number'
														placeholder='Vacancy Count'
														onChange={(e) =>
															setNoReqEmp(e.target.value)
														}
														value={noReqEmp}
													/>
												</div>
												<div className='post-field'>
													<label>Preferred Gender:</label>
													<select
														name='Preferred Gender'
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
														<option value='Gay'>Gay</option>
														<option value='Lesbian'>
															Lesbian
														</option>
													</select>
												</div>
											</div>
											<div className='post-field-group'>
												<div className='post-field'>
													<label>Civil Status:</label>
													<select
														name='Job Type'
														onChange={(e) =>
															setCivilStatus(e.target.value)
														}
														value={civilStatus}>
														<option
															disabled='disabled'
															hidden='hidden'
															value=''>
															Select Civil Status
														</option>
														<option value='Any'>Any</option>
														<option value='Single'>Single</option>
														<option value='Married'>
															Married
														</option>
														<option value='Widowed'>
															Widowed
														</option>
														<option value='Separated'>
															Separated
														</option>
														<option value='Live-in'>
															Live-in
														</option>
													</select>
												</div>

												<div className='post-field'>
													<label>Nature of Work:</label>
													<select
														name='Nature of Work'
														onChange={(e) =>
															setJobType(e.target.value)
														}
														value={jobType}>
														<option
															disabled='disabled'
															hidden='hidden'
															value=''>
															Select Nature of Work
														</option>
														<option value='Full-time'>
															Full-time
														</option>
														<option value='Part-time'>
															Part-time
														</option>
														<option value='Contractual'>
															Contractual
														</option>
														<option value='Project-based'>
															Project-based
														</option>
														<option value='Work from home'>
															Work from home
														</option>
														<option value='Freelance'>
															Freelance
														</option>
														<option value='Internship/OJT'>
															Internship/OJT
														</option>
													</select>
												</div>
											</div>
											<div className='post-field-group'>
												<div className='post-field'>
													<label>Minimum Salary:</label>
													<input
														type='number'
														placeholder='Minimum Salary'
														onChange={(e) =>
															setMinSalary(e.target.value)
														}
														value={minSalary}
													/>
												</div>
												<div className='post-field'>
													<label>Maximum Salary:</label>
													<input
														type='number'
														placeholder='Maximum Salary'
														onChange={(e) =>
															setMaxSalary(e.target.value)
														}
														value={maxSalary}
													/>
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
											<h3>Business Establishment Information</h3>
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
													<div className='acronym-container'>
														<label>Acronym/Abbreviation:</label>
														<div className='acronym'>
															<input
																type='checkbox'
																name='acronym'
																checked={
																	hasAcronym &&
																	companyAcronym.length === 0
																		? "checked"
																		: ""
																}
																onChange={() => {
																	setHasAcronym(!hasAcronym);
																	if (!hasAcronym) {
																		setCompanyAcronym("");
																	}
																}}
															/>
															<label>(n/a)</label>
														</div>
													</div>
													<input
														type='text'
														placeholder={`Enter Company's Acronym/Abbreviation`}
														value={companyAcronym}
														onChange={(e) =>
															setCompanyAcronym(e.target.value)
														}
														disabled={
															hasAcronym ? "disabled" : ""
														}
														style={
															hasAcronym
																? { opacity: "0.7" }
																: {}
														}
													/>
												</div>
												<div className='post-field'>
													<label>Employer Type:</label>
													<select
														value={employerType}
														onChange={(e) =>
															setEmployerType(e.target.value)
														}>
														<option
															disabled='disabled'
															hidden='hidden'
															value=''>
															Select Employer Type
														</option>
														<option value='Government'>
															Government
														</option>
														<option value='Recruitment & Placement Agency'>
															Recruitment & Placement Agency
														</option>
														<option value='Private'>
															Private
														</option>
														<option value='Licenced Recruitment Agency (Overseas)'>
															Licenced Recruitment Agency
															(Overseas)
														</option>
														<option value='DO 174-17. Subcontractor'>
															DO 174-17. Subcontractor
														</option>
													</select>
												</div>
												<div className='post-field'>
													<label>Total Work Force:</label>
													<select
														value={workForce}
														onChange={(e) =>
															setWorkForce(e.target.value)
														}>
														<option
															disabled='disabled'
															hidden='hidden'
															value=''>
															Select Total Work Force
														</option>
														<option value='Micro (1-9)'>
															Micro (1-9)
														</option>
														<option value='Small (10-99)'>
															Small (10-99)
														</option>
														<option value='Medium (100-199)'>
															Medium (100-199)
														</option>
														<option value='Large (200 and up)'>
															Large (200 and up)
														</option>
													</select>
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
													<label>Contact No.:</label>
													<input
														type='text'
														placeholder='Cellphone Number'
														value={contactNumber}
														onChange={(e) =>
															setContactNumber(e.target.value)
														}
													/>
												</div>
												<div className='post-field'>
													<label>Email Address:</label>
													<input
														type='text'
														placeholder='Email Address'
														value={emailAddress}
														onChange={(e) =>
															setEmailAddress(e.target.value)
														}
													/>
												</div>
												<div className='job-qualification'>
													<h4>Company Description:</h4>
													<textarea
														name='business-description'
														placeholder='Enter Business Description'
														value={companyDescription}
														onChange={(e) =>
															setCompanyDescription(
																e.target.value
															)
														}
														style={{ width: "95%" }}></textarea>
												</div>

												<div className='post-field'>
													<label>Establishment Photo:</label>
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
												<div className='contact-person-container'>
													<div className='contact-person-header'>
														<h2>Set Contact Person: </h2>
														<div className='contact-person'>
															<input
																type='checkbox'
																name='contact-person'
																checked={
																	hasContactPerson
																		? "checked"
																		: ""
																}
																onChange={() => {
																	{
																		setHasContactPerson(
																			!hasContactPerson
																		);
																	}
																}}
															/>{" "}
															{/* <h4>(n/a)</h4> */}
														</div>{" "}
													</div>
													{hasContactPerson && (
														<>
															<div className='post-field'>
																<label>
																	Contact Person (Full Name):
																</label>
																<input
																	type='text'
																	placeholder='Full Name'
																	value={contactPersonName}
																	onChange={(e) =>
																		setContactPersonName(
																			e.target.value
																		)
																	}
																/>
															</div>
															<div className='post-field'>
																<label>Position:</label>
																<input
																	type='text'
																	placeholder='Position'
																	value={contactPersonPosition}
																	onChange={(e) =>
																		setContactPersonPosition(
																			e.target.value
																		)
																	}
																/>
															</div>
															<div className='post-field'>
																<label>Contact Number:</label>
																<input
																	type='text'
																	placeholder='Contact Number'
																	value={contactPersonNumber}
																	onChange={(e) =>
																		setContactPersonNumber(
																			e.target.value
																		)
																	}
																/>
															</div>
															<div className='post-field'>
																<label>Email Address:</label>
																<input
																	type='text'
																	placeholder='Email Address'
																	value={contactPersonEmail}
																	onChange={(e) =>
																		setContactPersonEmail(
																			e.target.value
																		)
																	}
																/>
															</div>
														</>
													)}
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

												let acronym = "";
												for (
													let a = 0;
													a < companiesData.length;
													a++
												) {
													if (
														companiesData[a].CompanyID ===
														jobPost.CompanyID
													) {
														acronym =
															companiesData[a].Company_Acronym;
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
																{acronym !== "(n/a)" ? (
																	<h5
																		title={
																			jobPost.Company_Name
																		}>
																		{acronym}{" "}
																		<span>(shortened)</span>
																	</h5>
																) : (
																	<h5>
																		{jobPost.Company_Name}
																	</h5>
																)}
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
											{post && (
												<p
													title='Job Post Option'
													onClick={() => {
														setIsJobPostOptionOpen(true);
													}}>
													•••
												</p>
											)}
										</div>

										{post !== null ? (
											<>
												<div className='post-header'>
													<div className='upperLeft-jobPost'>
														<div className='account-profile-container'>
															<div className='account-profile'>
																<img
																	src={`../assets/${post.Company_Image}`}
																	alt='Establishment'
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
															{/* <h2>{post.Company_Name}</h2> */}
															{previewAcronym !== "(n/a)" ? (
																<h2 title={post.Company_Name}>
																	{previewAcronym}{" "}
																	<span>(shortened)</span>
																	{/* {acronym} <span>(acronym/abbreviation)</span> */}
																</h2>
															) : (
																<h2>{post.Company_Name}</h2>
															)}

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
													{/* <div className='upperRight-jobPost'>
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
													</div> */}
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
																		<p>Salary Range:</p>
																		<h4>
																			₱{" "}
																			{AdminResources.formatMoney(
																				post.Minimum_Salary
																			)}{" "}
																			- ₱{" "}
																			{AdminResources.formatMoney(
																				post.Maximum_Salary
																			)}
																		</h4>
																	</div>
																	<div className='post-detail'>
																		<p>Vacancy Count:</p>
																		<h4>
																			{" "}
																			{
																				post.Required_Employees
																			}{" "}
																		</h4>
																	</div>
																	<div className='post-detail'>
																		<p>Applied Applicants:</p>
																		<h4>
																			{numApplicants.length}
																		</h4>
																	</div>
																	<div className='post-detail'>
																		<p>Date Posted:</p>
																		<h4>
																			{post.Month < 10
																				? `0${post.Month}`
																				: post.Month}
																			-
																			{post.Day < 10
																				? `0${post.Day}`
																				: post.Day}
																			-{post.Year}
																		</h4>
																	</div>
																</div>

																<div className='post-detail-group2'>
																	<div className='post-detail'>
																		<p title='Preferred Gender'>
																			Pref. Gender:
																		</p>
																		<h4>
																			{post.Preferred_Sex}
																		</h4>
																	</div>
																	<div className='post-detail'>
																		<p>Nature of Work:</p>
																		<h4>{post.Job_Type}</h4>
																	</div>
																	<div className='post-detail'>
																		<p>Civil Status:</p>
																		<h4>
																			{post.Civil_Status}
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
																<h3>--- Place of Work ---</h3>
																<p
																	style={{
																		textAlign: "center",
																	}}>
																	{post.Work_Place}
																</p>
															</div>
															<div className='job-qualification-portion'>
																<h3>--- Employer's Name ---</h3>
																<p
																	style={{
																		textAlign: "center",
																	}}>
																	{post.Employer_Name}
																</p>
															</div>
															{post.Contact_Person_Name && (
																<>
																	<div className='job-qualification-portion'>
																		<h3>
																			--- Contact Person ---
																		</h3>
																		<p>
																			Full Name:{" "}
																			<span
																				style={{
																					textDecoration:
																						"underline",
																				}}>
																				{
																					post.Contact_Person_Name
																				}
																			</span>
																			<br />
																			Position:{" "}
																			<span
																				style={{
																					textDecoration:
																						"underline",
																				}}>
																				{
																					post.Contact_Person_Position
																				}
																			</span>
																			<br />
																			Contact Number:{" "}
																			<span
																				style={{
																					textDecoration:
																						"underline",
																				}}>
																				{
																					post.Contact_Person_Number
																				}
																			</span>
																			<br />
																			Email Address:{" "}
																			<span
																				style={{
																					textDecoration:
																						"underline",
																				}}>
																				{
																					post.Contact_Person_Email
																				}
																			</span>
																		</p>
																	</div>
																</>
															)}
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
