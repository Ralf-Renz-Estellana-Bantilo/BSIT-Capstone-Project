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

	// Preview --------
	const [postPreview, setPostPreview] = useState(null);
	const [applicantPreview, setApplicantPreview] = useState(null);
	const [companyPreview, setCompanyPreview] = useState(null);

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

		// Fetching Job Applicants
		// axios
		// 	.get("http://localhost:2000/api/read-company-applicants")
		// 	.then((response) => {
		// 		if (response) {
		// 			setJobApplicants(response.data);
		// 		} else {
		// 			console.log("Error fetching information...");
		// 		}
		// 	});

		// Fetching Companies
		axios.get("http://localhost:2000/api/read-companies").then((response) => {
			if (response) {
				setCompaniesData(response.data);
			} else {
				console.log("Error fetching information...");
			}
		});

		// return () => {
		// 	cleanup;
		// };
	}, []);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route exact path='/' element={<LoginAdmin />} />
					<Route
						exact
						path='/admin/dashboard'
						element={
							<Dashboard
								activePage={activePage}
								jobPosts={jobPosts}
								applicantsData={applicantsData}
								employers={employers}
								setActivePage={setActivePage}
								setJobPosts={setJobPosts}
								setEmployers={setEmployers}
								setApplicantsData={setApplicantsData}
								setCompaniesData={setCompaniesData}
								setJobApplicants={setJobApplicants}
								setJobSeekers={setJobSeekers}
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
								setActivePage={setActivePage}
								setJobPosts={setJobPosts}
								setEmployers={setEmployers}
								setApplicantsData={setApplicantsData}
								setCompaniesData={setCompaniesData}
								setJobApplicants={setJobApplicants}
								setJobSeekers={setJobSeekers}
								setPostPreview={setPostPreview}
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
								setActivePage={setActivePage}
								setJobPosts={setJobPosts}
								setEmployers={setEmployers}
								setApplicantsData={setApplicantsData}
								setCompaniesData={setCompaniesData}
								setJobApplicants={setJobApplicants}
								setJobSeekers={setJobSeekers}
								setApplicantPreview={setApplicantPreview}
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
								setActivePage={setActivePage}
								setJobPosts={setJobPosts}
								setEmployers={setEmployers}
								setApplicantsData={setApplicantsData}
								setCompaniesData={setCompaniesData}
								setJobApplicants={setJobApplicants}
								setJobSeekers={setJobSeekers}
								setCompanyPreview={setCompanyPreview}
							/>
						}
					/>
					<Route
						exact
						path='/admin/settings'
						element={
							<Settings
								activePage={activePage}
								setActivePage={setActivePage}
								setJobPosts={setJobPosts}
								setEmployers={setEmployers}
								setApplicantsData={setApplicantsData}
								setCompaniesData={setCompaniesData}
								setJobApplicants={setJobApplicants}
								setJobSeekers={setJobSeekers}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
