import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard-Folder/Dashboard";
import JobPosts from "./Job-Post-Folder/JobPosts";
import Applicants from "./Applicant-Folder/Applicants";
import Companies from "./Company-Folder/Companies";
import Settings from "./Settings-Folder/Settings";
import LoginAdmin from "./LoginAdmin";
import shortid from "shortid";
import AppConfiguration from "./AppConfiguration";

export default function App() {
	const [jobPosts, setJobPosts] = useState([]);
	const [jobSeekers, setJobSeekers] = useState([]);
	const [employers, setEmployers] = useState([]);
	const [companiesData, setCompaniesData] = useState([]);
	const [applicantsData, setApplicantsData] = useState([]);
	const [jobApplicants, setJobApplicants] = useState([]);
	const [employerFeedback, setEmployerFeedback] = useState([]);

	const [activePage, setActivePage] = useState("Dashboard");

	// Admin Data
	const [admin, setAdmin] = useState([]);
	const [adminPosts, setAdminPosts] = useState([]);

	// Preview --------
	const [postPreview, setPostPreview] = useState(null);
	const [applicantPreview, setApplicantPreview] = useState(null);
	const [companyPreview, setCompanyPreview] = useState(null);

	// Job Post States
	const [location, setLocation] = useState("");
	const [status, setStatus] = useState("Active");
	const [sort, setSort] = useState("Most Recent");
	const [activeAccountPanel, setActiveAccountPanel] = useState("Job Posts");

	// Search States
	const [jobPostSearch, setJobPostSearch] = useState("");
	const [applicantSearch, setApplicantSearch] = useState("");
	const [companySearch, setCompanySearch] = useState("");

	useEffect(async () => {
		await axios
			.get(`${AppConfiguration.url()}/api/read-jobPost`)
			.then((response) => {
				if (response) {
					setJobPosts(response.data);
				} else {
					console.log(`Error fetching information...`);
				}
			});

		// Applicant Database Table ----------
		await axios
			.get(`${AppConfiguration.url()}/api/read-applicant-data`)
			.then((response) => {
				if (response) {
					setJobSeekers(response.data);
				} else {
					console.log(`Error fetching information...`);
				}
			});

		// User_Account Database Table ----------
		await axios
			.get(`${AppConfiguration.url()}/api/read-user-employer`)
			.then((response) => {
				if (response) {
					setEmployers(response.data);
				} else {
					console.log(`Error fetching information...`);
				}
			});

		// Applicant Database Table ----------
		await axios
			.get(`${AppConfiguration.url()}/api/read-applicant-data`)
			.then((response) => {
				if (response) {
					setApplicantsData(response.data);
				} else {
					console.log(`Error fetching information...`);
				}
			});

		// Fetching Companies
		await axios
			.get(`${AppConfiguration.url()}/api/read-companies`)
			.then((response) => {
				if (response) {
					setCompaniesData(response.data);
				} else {
					console.log(`Error fetching information...`);
				}
			});

		// Fetching Job Applicants
		await axios
			.get(`${AppConfiguration.url()}/api/read-company-applicants`)
			.then((response) => {
				if (response) {
					setJobApplicants(response.data);
				} else {
					console.log(`Error fetching information...`);
				}
			});

		// Fetching Admin Posts
		await axios
			.get(`${AppConfiguration.url()}/api/admin/read-posts`)
			.then((response) => {
				if (response) {
					setAdminPosts(response.data);
				} else {
					console.log(`Error fetching information...`);
				}
			});

		// Fetching Employers Feedback
		await axios
			.get(`${AppConfiguration.url()}/api/read-employer-feedback`)
			.then((response) => {
				if (response) {
					setEmployerFeedback(response.data);
				} else {
					console.log(`Error fetching information...`);
				}
			});

		const sessionUser = sessionStorage.getItem(`UserID`);
		if (sessionUser) {
			await axios
				.post(`${AppConfiguration.url()}/api/fetchSession`, {
					userID: sessionUser,
				})
				.then(async (response) => {
					if (response.data.length === 1) {
						setAdmin(response.data[0]);
					}
				});
		}

		// return () => {
		// 	cleanup;
		// };
	}, []);

	const addPost = async (post) => {
		const id = shortid.generate();
		const generatedUsername = generateID();
		const generatedPassword = id;
		const userID = sessionStorage.getItem("UserID");
		const generatedUserID = id;
		const employerName = `${post.Employer_First_Name} ${post.Employer_Middle_Name} ${post.Employer_Last_Name}`;

		const company = {
			UserID: generatedUserID,
			CompanyID: post.CompanyID,
			Employer_Name: employerName,
			Street: post.Street,
			Zone: post.Zone,
			Barangay: post.Barangay,
			Contact_Number: post.Contact_Number,
			Company_Name: post.Company_Name,
			Company_Acronym: post.Company_Acronym,
			Company_Description: post.Company_Description,
			Company_Image: post.Company_Image,
			Email_Address: post.Email_Address,
			Employer_Type: post.Employer_Type,
			Work_Force: post.Work_Force,
		};
		setCompaniesData((companyData) => [...companyData, company]);
		setJobPosts((posts) => [...posts, post]);

		try {
			await axios
				.post(`${AppConfiguration.url()}/api/create-company-admin`, {
					userID: generatedUserID,
					companyID: post.CompanyID,
					companyName: post.Company_Name,
					street: post.Street,
					zone: post.Zone,
					barangay: post.Barangay,
					employerName: employerName,
					contactNumber: post.Contact_Number,
					companyDescription: post.Company_Description,
					companyImage: post.Company_Image,
					acronym: post.Company_Acronym,
					employerType: post.Employer_Type,
					workForce: post.Work_Force,
					emailAddress: post.Email_Address,
				})
				.then(() => {
					// console.log("Successfully Created a company...");
				});

			await axios
				.post(`${AppConfiguration.url()}/api/create-jobPost`, {
					jobID: post.JobID,
					companyID: post.CompanyID,
					companyName: post.Company_Name,
					min: post.Minutes,
					hour: post.Hour,
					day: post.Day,
					month: post.Month,
					year: post.Year,
					datePosted: post.Date_Posted,
					companyAddress: post.Company_Address,
					jobTitle: post.Job_Title,
					category: post.Category,
					placeOfWork: post.Work_Place,
					reqNoEmp: post.Required_Employees,
					minSalary: post.Minimum_Salary,
					maxSalary: post.Maximum_Salary,
					civilStatus: post.Civil_Status,
					jobType: post.Job_Type,
					prefSex: post.Preferred_Sex,
					qualifications: post.Job_Qualifications,
					requirements: post.Job_Requirements,
					description: post.Job_Description,
					employerName: employerName,
					companyImage: post.Company_Image,
					emailAddress: post.Email_Address,
					contactPersonName: post.Contact_Person_Name,
					contactPersonPosition: post.Contact_Person_Position,
					contactPersonNumber: post.Contact_Person_Number,
					contactPersonEmail: post.Contact_Person_Email,
					status: post.Active_Status,
				})
				.then(() => {
					// console.log(`1 Successfully Posted a Job Vacancy...`);
				});

			await axios
				.post(`${AppConfiguration.url()}/api/create-user`, {
					userID: generatedUserID,
					firstName: post.Employer_First_Name,
					middleName: post.Employer_Middle_Name,
					lastName: post.Employer_Last_Name,
					sex: "Male",
					role: "Employer",
					username: generatedUsername,
					password: generatedPassword,
					userImage:
						"https://res.cloudinary.com/doprewqnx/image/upload/v1648959524/jntowv75wyhkqvy4o1xu.png",
				})
				.then(() => {
					// console.log("2 Successfully Registered a Company...");
				});

			await axios
				.post(`${AppConfiguration.url()}/api/admin/add-post`, {
					adminID: userID,
					companyID: post.CompanyID,
					jobID: post.JobID,
					companyName: post.Company_Name,
					username: generatedUsername,
					password: generatedPassword,
				})
				.then(() => {
					// console.log("3 Successfully Added a Post...");
				});
		} catch (error) {
			alert(error);
		}
	};

	const generateID = () => {
		const num1 = Math.floor(Math.random() * 10);
		const num2 = Math.floor(Math.random() * 10);
		const num3 = Math.floor(Math.random() * 10);
		const num4 = Math.floor(Math.random() * 10);
		const num5 = Math.floor(Math.random() * 10);
		const num6 = Math.floor(Math.random() * 10);

		const currentYear = new Date().getFullYear();
		const convertedYear = `${currentYear}`;
		const first2digit = convertedYear[2] + convertedYear[3];

		const id = first2digit + num1 + num2 + num3 + num4 + num5 + num6;

		return id;
	};

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						exact
						path='/'
						element={<LoginAdmin setAdmin={setAdmin} />}
					/>
					<Route
						exact
						path='/admin/dashboard'
						element={
							<Dashboard
								activePage={activePage}
								jobPosts={jobPosts}
								applicantsData={applicantsData}
								employers={employers}
								jobApplicants={jobApplicants}
								admin={admin}
								companiesData={companiesData}
								employerFeedback={employerFeedback}
								setActivePage={setActivePage}
								setJobPosts={setJobPosts}
								setEmployers={setEmployers}
								setApplicantsData={setApplicantsData}
								setCompaniesData={setCompaniesData}
								setJobApplicants={setJobApplicants}
								setJobSeekers={setJobSeekers}
								setAdmin={setAdmin}
								setAdminPosts={setAdminPosts}
							/>
						}
					/>
					<Route
						exact
						path='/admin/job-posts'
						element={
							<JobPosts
								activePage={activePage}
								jobPosts={jobPosts}
								jobApplicants={jobApplicants}
								companiesData={companiesData}
								postPreview={postPreview}
								location={location}
								status={status}
								sort={sort}
								admin={admin}
								jobPostSearch={jobPostSearch}
								setActivePage={setActivePage}
								setJobPosts={setJobPosts}
								setEmployers={setEmployers}
								setApplicantsData={setApplicantsData}
								setCompaniesData={setCompaniesData}
								setJobApplicants={setJobApplicants}
								setJobSeekers={setJobSeekers}
								setPostPreview={setPostPreview}
								addPost={addPost}
								setLocation={setLocation}
								setStatus={setStatus}
								setSort={setSort}
								setJobPostSearch={setJobPostSearch}
								setAdmin={setAdmin}
								setAdminPosts={setAdminPosts}
							/>
						}
					/>
					<Route
						exact
						path='/admin/applicants'
						element={
							<Applicants
								activePage={activePage}
								jobSeekers={jobSeekers}
								applicantPreview={applicantPreview}
								admin={admin}
								applicantSearch={applicantSearch}
								setActivePage={setActivePage}
								setJobPosts={setJobPosts}
								setEmployers={setEmployers}
								setApplicantsData={setApplicantsData}
								setCompaniesData={setCompaniesData}
								setJobApplicants={setJobApplicants}
								setJobSeekers={setJobSeekers}
								setApplicantPreview={setApplicantPreview}
								setApplicantSearch={setApplicantSearch}
								setAdmin={setAdmin}
								setAdminPosts={setAdminPosts}
							/>
						}
					/>
					<Route
						exact
						path='/admin/companies'
						element={
							<Companies
								activePage={activePage}
								companiesData={companiesData}
								companyPreview={companyPreview}
								jobPosts={jobPosts}
								admin={admin}
								companySearch={companySearch}
								employerFeedback={employerFeedback}
								jobApplicants={jobApplicants}
								setActivePage={setActivePage}
								setJobPosts={setJobPosts}
								setEmployers={setEmployers}
								setApplicantsData={setApplicantsData}
								setCompaniesData={setCompaniesData}
								setJobApplicants={setJobApplicants}
								setJobSeekers={setJobSeekers}
								setCompanyPreview={setCompanyPreview}
								setCompanySearch={setCompanySearch}
								setAdmin={setAdmin}
								setAdminPosts={setAdminPosts}
							/>
						}
					/>
					<Route
						exact
						path='/admin/settings'
						element={
							<Settings
								admin={admin}
								adminPosts={adminPosts}
								jobPosts={jobPosts}
								activePage={activePage}
								employerFeedback={employerFeedback}
								applicantsData={applicantsData}
								companiesData={companiesData}
								activeAccountPanel={activeAccountPanel}
								setActiveAccountPanel={setActiveAccountPanel}
								setActivePage={setActivePage}
								setJobPosts={setJobPosts}
								setEmployers={setEmployers}
								setApplicantsData={setApplicantsData}
								setCompaniesData={setCompaniesData}
								setJobApplicants={setJobApplicants}
								setJobSeekers={setJobSeekers}
								setAdmin={setAdmin}
								setAdminPosts={setAdminPosts}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
