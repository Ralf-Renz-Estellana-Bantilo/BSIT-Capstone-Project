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

export default function App() {
	const [jobPosts, setJobPosts] = useState([]);
	const [jobSeekers, setJobSeekers] = useState([]);
	const [employers, setEmployers] = useState([]);
	const [companiesData, setCompaniesData] = useState([]);
	const [applicantsData, setApplicantsData] = useState([]);
	const [jobApplicants, setJobApplicants] = useState([]);
	const [activePage, setActivePage] = useState("Dashboard");

	// Admin Data
	const [admin, setAdmin] = useState([]);

	// Preview --------
	const [postPreview, setPostPreview] = useState(null);
	const [applicantPreview, setApplicantPreview] = useState(null);
	const [companyPreview, setCompanyPreview] = useState(null);

	// Job Post States
	const [location, setLocation] = useState("");
	const [status, setStatus] = useState("Active");
	const [sort, setSort] = useState("Most Recent");

	// Search States
	const [jobPostSearch, setJobPostSearch] = useState("");
	const [applicantSearch, setApplicantSearch] = useState("");
	const [companySearch, setCompanySearch] = useState("");

	useEffect(() => {
		axios.get("http://localhost:2000/api/read-jobPost").then((response) => {
			if (response) {
				setJobPosts(response.data);
			} else {
				console.log("Error fetching information...");
			}
		});

		// Applicant Database Table ----------
		axios
			.get("http://localhost:2000/api/read-applicant-data")
			.then((response) => {
				if (response) {
					setJobSeekers(response.data);
				} else {
					console.log("Error fetching information...");
				}
			});

		// User_Account Database Table ----------
		axios
			.get("http://localhost:2000/api/read-user-employer")
			.then((response) => {
				if (response) {
					setEmployers(response.data);
				} else {
					console.log("Error fetching information...");
				}
			});

		// Applicant Database Table ----------
		axios
			.get("http://localhost:2000/api/read-applicant-data")
			.then((response) => {
				if (response) {
					setApplicantsData(response.data);
				} else {
					console.log("Error fetching information...");
				}
			});

		// Fetching Companies
		axios.get("http://localhost:2000/api/read-companies").then((response) => {
			if (response) {
				setCompaniesData(response.data);
			} else {
				console.log("Error fetching information...");
			}
		});

		const sessionUser = sessionStorage.getItem("UserID");
		if (sessionUser) {
			axios
				.post("http://localhost:2000/api/fetchSession", {
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
		setJobPosts((posts) => [...posts, post]);

		await axios
			.post("http://localhost:2000/api/create-company-admin", {
				userID: sessionStorage.getItem("UserID"),
				companyID: post.CompanyID,
				companyName: post.Company_Name,
				street: post.Street,
				zone: post.Zone,
				barangay: post.Barangay,
				employerName: post.Employer_Name,
				contactNumber: post.Contact_Number,
				companyDescription: post.Company_Description,
				companyImage: post.Company_Image,
			})
			.then(() => {
				console.log("Successfully Created a company...");
			});

		await axios
			.post("http://localhost:2000/api/create-jobPost", {
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
				reqNoEmp: post.Required_Employees,
				salary: post.Salary,
				jobType: post.Job_Type,
				prefSex: post.Preferred_Sex,
				qualifications: post.Job_Qualifications,
				requirements: post.Job_Requirements,
				description: post.Job_Description,
				employerName: post.Employer_Name,
				companyImage: post.Company_Image,
				status: post.Active_Status,
			})
			.then(() => {
				console.log("Successfully Posted a Job Vacancy...");
			});

		const data = new FormData();
		data.append("image", post.File);
		await fetch("http://localhost:2000/api/upload-image", {
			method: "POST",
			body: data,
		})
			.then(async (result) => {
				console.log("The File has been Uploaded...");
			})
			.catch((error) => {
				console.log("Multer Error!", error);
			});

		await fetch("http://localhost:2000/api/upload-image-admin", {
			method: "POST",
			body: data,
		})
			.then(async (result) => {
				console.log("The File has been Uploaded to the Administrator...");
			})
			.catch((error) => {
				console.log("Multer Error!", error);
			});
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
								admin={admin}
								setActivePage={setActivePage}
								setJobPosts={setJobPosts}
								setEmployers={setEmployers}
								setApplicantsData={setApplicantsData}
								setCompaniesData={setCompaniesData}
								setJobApplicants={setJobApplicants}
								setJobSeekers={setJobSeekers}
								setAdmin={setAdmin}
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
							/>
						}
					/>
					<Route
						exact
						path='/admin/settings'
						element={
							<Settings
								admin={admin}
								activePage={activePage}
								setActivePage={setActivePage}
								setJobPosts={setJobPosts}
								setEmployers={setEmployers}
								setApplicantsData={setApplicantsData}
								setCompaniesData={setCompaniesData}
								setJobApplicants={setJobApplicants}
								setJobSeekers={setJobSeekers}
								setAdmin={setAdmin}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
