import "./App.css";
import Home from "./JOBSEEKER/Home-Folder/Home";
import Profile from "./JOBSEEKER/Profile-Folder/Profile";
import Notification from "./JOBSEEKER/Notification-Folder/Notification";
import Menu from "./JOBSEEKER/Menu-Folder/Menu";
import DefaultUserFemale from "./Images/DefaultUserFemale.png";
import DefaultUserMale from "./Images/DefaultUserMale.png";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./JOBSEEKER/Menu-Folder/OutsideLinks/About";
import Contact from "./JOBSEEKER/Menu-Folder/OutsideLinks/Contact";
import Help from "./JOBSEEKER/Menu-Folder/OutsideLinks/Help";
import Settings from "./JOBSEEKER/Menu-Folder/OutsideLinks/Settings";
import TermsAndCondition from "./JOBSEEKER/Menu-Folder/OutsideLinks/TermsAndCondition";
import CompanyProfile from "./JOBSEEKER/Home-Folder/CompanyProfile";
import ApplicationForm from "./JOBSEEKER/Home-Folder/ApplicationForm";
import Login from "./Account-Folder/Login";
import SignUp from "./Account-Folder/SignUp";
import LandingPage from "./LandingPage";
import UnknownPage from "./Account-Folder/UnknownPage";
import SearchEngine from "./SearchEngine";
import Emp_Dashboard from "./EMPLOYER/Dashboard-Folder/Emp_Dashboard";
import Emp_BusinessProfile from "./EMPLOYER/Profile-Folder/Emp_BusinessProfile";
import Emp_Jobs from "./EMPLOYER/Jobs-Folder/Emp_Jobs";
import Emp_Applicant from "./EMPLOYER/Applicants-Folder/Emp_Applicant";
import Emp_Setting from "./EMPLOYER/Settings-Folder/Emp_Setting";
import Emp_Account from "./EMPLOYER/Account-Folder/Emp_Account";
import axios from "axios";
import shortid from "shortid";
import Emp_Job_Applicant_Data from "./EMPLOYER/Applicants-Folder/Emp_Job_Applicant_Data";
import Hiree_Information from "./EMPLOYER/Hiree_Information";
import Resources from "./Resources";

export class App extends Component {
	constructor() {
		super();
		this.state = {
			infos: [],
			showAddTask: [],
			isLogin: [],
			isSignUp: [],
			activePage: [],
			scrollPosition: [],
			applicants: [],
			targetCompany: [],
			targetApplicant: [],
			targetJob: [],
			hasApplied: [],
			isDeleted: [],
			user: {
				jobSeeker: [],
				employer: [],
			},
			userData: [],
			appliedJobs: [],
			userType: [],
			currentUser: [],
			showWelcomWindow: [],
			jobApplicants: [],
			applicantID: "",

			// Employer Portion
			isSidebarOpen: false,
			companyJobPost: [],
			employerFeedback: [],
			company: [],
			hiree: {},
			jobApplicantData: [],
			employerMessage: "",
			numApplicants: [],
			targetJobPost: null,

			// system
			darkTheme: true,
		};
	}

	componentDidMount = async () => {
		this.setState({
			infos: [],
			showAddTask: [false],
			isLogin: false,
			isSignUp: false,
			activePage: "home",
			scrollPosition: 0,
			applicants: [],
			targetCompany: "",
			hasApplied: false,
			isDeleted: false,
			user: {
				jobSeeker: [{}],
				employer: [{}],
			},
			userData: {
				jobSeeker: [{}],
				employer: [],
			},
			appliedJobs: [],
			userType: "",
			currentUser: {},
			showWelcomWindow: false,
		});

		let theme = localStorage.getItem("darkTheme");
		if (theme === "true") {
			this.setState({
				darkTheme: true,
			});
		} else if (theme === "false") {
			this.setState({
				darkTheme: false,
			});
		} else {
			this.setState({
				darkTheme: true,
			});
		}

		// Fetching data ----------------

		// Job Posts Database Table ----------
		await axios
			.get("http://localhost:2000/api/read-jobPost")
			.then((response) => {
				this.setState({
					infos: response.data,
				});
			});

		// User_Account Database Table ----------
		await axios
			.get("http://localhost:2000/api/read-user-jobseeker")
			.then((response) => {
				this.setState({
					user: {
						jobSeeker: response.data,
						employer: [...this.state.user.employer],
					},
				});
			});

		// User_Account Database Table ----------
		await axios
			.get("http://localhost:2000/api/read-user-employer")
			.then((response) => {
				this.setState({
					user: {
						jobSeeker: [...this.state.user.jobSeeker],
						employer: response.data,
					},
				});
			});

		// Applicant Database Table ----------
		await axios
			.get("http://localhost:2000/api/read-applicant-data")
			.then((response) => {
				this.setState({
					applicants: response.data,
				});
			});

		// Fetching Job Applicants
		await axios
			.get("http://localhost:2000/api/read-company-applicants")
			.then((response) => {
				if (response) {
					this.setState({ numApplicants: response.data });
				} else {
					console.log("Error fetching information...");
				}
			});

		// Check if there is a current user that is logged in
		const sessionUser = sessionStorage.getItem("UserID");
		const companySession = sessionStorage.getItem("CompanyID");
		const applicantSession = sessionStorage.getItem("ApplicantID");
		if (sessionUser) {
			await axios
				.post("http://localhost:2000/api/fetchSession", {
					userID: sessionUser,
				})
				.then(async (response) => {
					if (response.data.length === 1) {
						await this.setCurrentUser(response.data[0]);
					} else {
						console.log("Error retaining user information");
					}
				});

			// Fetching Job Applicant ID of the Current User
			await axios
				.post("http://localhost:2000/api/get-applicantID", {
					userID: sessionUser,
				})
				.then(async (response) => {
					if (response.data.length === 1) {
						await this.setState({
							applicantID: response.data[0].ApplicantID,
						});
					}
				});

			if (applicantSession) {
				// Fetching Applied Jobs Data
				await axios
					.post("http://localhost:2000/api/read-applied-jobs", {
						applicantID: applicantSession,
					})
					.then(async (response) => {
						await this.setState({
							appliedJobs: response.data,
						});
					});

				// Employer Feedback Database Table ----------
				await axios
					.post(
						"http://localhost:2000/api/read-specific-applicant-notification",
						{
							applicantID: applicantSession,
						}
					)
					.then((response) => {
						this.setState({
							employerFeedback: response.data,
						});
					});
			}

			// Determine whether or not the applicant is applied or not
			const { infos, appliedJobs } = this.state;
			for (let post = 0; post < infos.length; post++) {
				for (let applied = 0; applied < appliedJobs.length; applied++) {
					if (infos[post].JobID === appliedJobs[applied].JobID) {
						this.setState((prevState) => ({
							infos: prevState.infos.map((info) =>
								info.JobID === appliedJobs[applied].JobID
									? Object.assign(info, { Is_Applied: true })
									: info
							),
						}));

						break;
					}
				}
			}
		} else {
			console.log("Not logged in yet..");
		}

		if (companySession) {
			// Fetching Job Applicant Data
			await axios
				.post("http://localhost:2000/api/read-job-applicant", {
					companyID: companySession,
				})
				.then(async (response) => {
					await this.setState({
						jobApplicants: response.data,
					});
				});

			await axios
				.post("http://localhost:2000/api/read-company", {
					userID: sessionUser,
				})
				.then(async (response) => {
					if (response.data.length === 1) {
						await this.setState({ company: response.data[0] });
					} else {
						console.log("Error fetching information...");
					}
				});

			// Fetching Job Posts Data
			await axios
				.post("http://localhost:2000/api/read-company-jobPost", {
					companyID: companySession,
				})
				.then(async (response) => {
					if (response) {
						await this.setState({ companyJobPost: response.data });
					} else {
						console.log("Error fetching information...");
					}
				});

			// Fetching Employer Feedback Data
			await axios
				.post("http://localhost:2000/api/read-specific-employer-feedback", {
					companyID: companySession,
				})
				.then(async (response) => {
					await this.setEmployerFeedBack(response.data);
				});
		}
	};

	setJobPosts = (jobPosts) => {
		this.setState({
			infos: jobPosts,
		});
	};

	addPost = async (post) => {
		const { infos, companyJobPost } = this.state;
		// await this.setState({ infos: [post, ...infos] });
		await this.setState({
			infos: [...infos, post],
			companyJobPost: [post, ...companyJobPost],
		});

		try {
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
		} catch (error) {
			console.log(error);
		}
	};

	deletePost = (id) => {
		let infos = this.state.infos;
		let index = infos.findIndex((x) => x.JobID === id);
		infos.splice(index, 1);
		this.setState({ infos: infos });

		this.setDeleteState();
	};

	deleteCompanyPosts = (companyID) => {
		let infos = this.state.infos;

		let jobPosts = infos.filter(
			(jobPosts) => jobPosts.CompanyID !== companyID
		);

		this.setState({ infos: jobPosts });
	};

	setDeleteState = () => {
		this.setState({
			isDeleted: true,
		});
	};

	closeDeleteState = () => {
		this.setState({
			isDeleted: false,
		});
	};

	handleToggle = () => {
		let newValue = !this.state.showAddTask;
		this.setState({ showAddTask: newValue });
	};

	onTogglePostForm = () => {
		this.setState({ showAddTask: !this.state.showAddTask });
	};

	handleLogin = async () => {
		await this.setState({
			isLogin: true,
		});
	};

	handleLogout = () => {
		this.setState({
			isLogin: false,
		});
	};

	showWelcomWindowOn = () => {
		this.setState({
			showWelcomWindow: true,
		});
	};

	showWelcomWindowOff = () => {
		this.setState({
			showWelcomWindow: false,
		});
	};

	handleChangePage = (page) => {
		this.setState({
			activePage: page,
		});
	};

	toggleSignUp = (condition) => {
		this.setState({
			isSignUp: condition,
		});
	};

	handleScroll = () => {
		this.setState({
			scrollPosition: window.pageYOffset,
		});
	};

	resetScroll = () => {
		this.setState({
			scrollPosition: 0,
		});
	};

	handleChange = (event, fieldName) => {
		this.setState((prevState) => ({
			jobSeeker: {
				...prevState.jobSeeker,

				[fieldName]: event.target.value,
			},
		}));
	};

	setCompanyID = (id) => {
		this.setState({
			targetCompany: id,
		});
	};

	setApplicantID = (id) => {
		this.setState({
			targetApplicant: id,
		});
	};

	setJobID = (id) => {
		this.setState({
			targetJob: id,
		});
	};

	setAppliedJobs = async (targetCompany) => {
		await this.setState((prevState) => ({
			infos: prevState.infos.map((info) =>
				info.JobID === targetCompany
					? Object.assign(info, { Is_Applied: true })
					: info
			),
		}));
	};

	resetAppliedJobs = async (targetCompany) => {
		await this.setState((prevState) => ({
			infos: prevState.infos.map((info) =>
				info.JobID === targetCompany
					? Object.assign(info, { Is_Applied: false })
					: info
			),
		}));
	};

	handleApplication = async (targetCompany) => {
		this.setState((prevState) => ({
			infos: prevState.infos.map((info) =>
				info.JobID === targetCompany
					? Object.assign(info, { Is_Applied: true })
					: info
			),
		}));

		this.setApplied();

		{
			this.state.infos.map((info) => {
				const data = {
					JobID: info.JobID,
					ApplicantID: sessionStorage.getItem("ApplicantID"),
					CompanyID: info.CompanyID,
					Company_Name: info.Company_Name,
					Minutes: new Date().getMinutes(),
					Hour: new Date().getHours(),
					Day: new Date().getDate(),
					Month: new Date().getMonth() + 1,
					Year: new Date().getFullYear(),
					Company_Address: info.Company_Address,
					Job_Title: info.Job_Title,
					Category: info.Category,
					Required_Employees: info.Required_Employees,
					Salary: info.Salary,
					Job_Type: info.Job_Type,
					Preferred_Sex: info.Preferred_Sex,
					Job_Qualifications: info.Job_Qualifications,
					Job_Requirements: info.Job_Requirements,
					Job_Description: info.Job_Description,
					Employer_Name: info.Employer_Name,
					Company_Image: info.Company_Image,
					Is_Applied: info.Is_Applied,
					Active_Status: info.Active_Status,
				};

				info.JobID === targetCompany && this.handleAppliedJobs(data);
			});
		}
	};

	setApplied = () => {
		this.setState({
			hasApplied: true,
		});
	};

	closeHasApplied = () => {
		this.setState({
			hasApplied: false,
		});
	};

	registerJobSeeker = async (user) => {
		const jobSeeker = this.state.user.jobSeeker;
		const employer = this.state.user.employer;
		const userData = this.state.userData;
		const applicants = this.state.applicants;
		const generateApplicantID = shortid.generate();

		if (user.Sex === "Male") {
			let addImage = { ...user, userImage: DefaultUserMale };

			await this.setState({
				user: {
					jobSeeker: [...jobSeeker, addImage],
					employer: [...employer],
				},
				userData: {
					jobSeeker: [
						...userData.jobSeeker,
						{
							id: user.UserID,
							firstName: Resources.formatName(user.First_Name),
							middleName: Resources.formatName(user.Middle_Name),
							lastName: Resources.formatName(user.Last_Name),
							role: user.Role,
							homeAddress: "",
							sex: user.Sex,
							bMonth: "",
							bDay: "",
							bYear: "",
							contactNumber: "",
							email: "",
							civilStatus: "",
							educationalAttainment: "",
							username: user.Username,
							password: user.Password,
							userImage: "DefaultUserMale.png",
						},
					],
				},
			});

			await axios
				.post("http://localhost:2000/api/create-user", {
					userID: user.UserID,
					firstName: Resources.formatName(user.First_Name),
					middleName: Resources.formatName(user.Middle_Name),
					lastName: Resources.formatName(user.Last_Name),
					sex: user.Sex,
					role: user.Role,
					username: user.Username,
					password: user.Password,
					userImage: "DefaultUserMale.png",
				})
				.then(() => {
					console.log("Successfully Registered...");
				});

			await axios
				.post("http://localhost:2000/api/create-applicant-data", {
					userID: user.UserID,
					applicantID: generateApplicantID,
					firstName: Resources.formatName(user.First_Name),
					middleName: Resources.formatName(user.Middle_Name),
					lastName: Resources.formatName(user.Last_Name),
					role: user.Role,
					sex: user.Sex,
					homeAddress: "",
					userImage: "DefaultUserMale.png",
					emailAddress: "",
					contactNumber: "",
					bMonth: null,
					bDay: null,
					bYear: null,
					civilStatus: "",
					educationalAttainment: "",
					hiringStatus: "Inactive",
				})
				.then(() => {
					console.log("Successfully Created your data...");
				});
		} else {
			let addImage = { ...user, userImage: DefaultUserFemale };
			await this.setState({
				user: {
					jobSeeker: [...jobSeeker, addImage],
					employer: [...employer],
				},
				userData: {
					jobSeeker: [
						...userData.jobSeeker,
						{
							id: user.UserID,
							firstName: user.First_Name,
							middleName: user.Middle_Name,
							lastName: user.Last_Name,
							role: user.Role,
							homeAddress: "",
							sex: user.Sex,
							bMonth: 0,
							bDay: 0,
							bYear: 0,
							contactNumber: "",
							email: "",
							civilStatus: "0",
							educationalAttainment: "",
							username: user.Username,
							password: user.Password,
							userImage: "DefaultUserFemale.png",
						},
					],
				},
			});

			await axios
				.post("http://localhost:2000/api/create-user", {
					userID: user.UserID,
					firstName: user.First_Name,
					middleName: user.Middle_Name,
					lastName: user.Last_Name,
					sex: user.Sex,
					role: user.Role,
					username: user.Username,
					password: user.Password,
					userImage: "DefaultUserFemale.png",
				})
				.then(() => {
					console.log("Successfully Registered...");
				});

			await axios
				.post("http://localhost:2000/api/create-applicant-data", {
					userID: user.UserID,
					applicantID: shortid.generate(),
					firstName: user.First_Name,
					middleName: user.Middle_Name,
					lastName: user.Last_Name,
					role: user.Role,
					sex: user.Sex,
					homeAddress: "",
					userImage: "DefaultUserFemale.png",
					emailAddress: "",
					contactNumber: "",
					bMonth: 1,
					bDay: 11,
					bYear: 2000,
					civilStatus: "",
					educationalAttainment: "",
					hiringStatus: "Inactive",
				})
				.then(() => {
					console.log("Successfully Created your Applicant data...");
				});
		}

		const registeredApplicant = {
			First_Name: Resources.formatName(user.First_Name),
			Middle_Name: Resources.formatName(user.Middle_Name),
			Last_Name: Resources.formatName(user.Last_Name),
			Home_Address: null,
			Sex: user.Sex,
			B_Month: 0,
			B_Day: 0,
			B_Year: null,
			Contact_Number: null,
			Email_Address: null,
			Civil_Status: null,
			Educ_Attainment: null,
			Preferred_Job: null,
			Preferred_Category: null,
			Preferred_Salary: null,
			Interested_In: null,
			Good_At: null,
			Credentials: null,
			UserID: user.UserID,
			ApplicantID: generateApplicantID,
		};

		this.setState({
			applicants: [...applicants, registeredApplicant],
		});
	};

	registerEmployer = async (user) => {
		const jobSeeker = this.state.user.jobSeeker;
		const employer = this.state.user.employer;
		await this.setState({
			user: {
				jobSeeker: [...jobSeeker],
				employer: [...employer, user],
			},
		});

		let defaultImage = "";

		if (user.Role === "Male") {
			defaultImage = "DefaultUserMale.png";
		} else {
			defaultImage = "DefaultUserFemale.png";
		}

		await axios
			.post("http://localhost:2000/api/create-user", {
				userID: user.UserID,
				firstName: Resources.formatName(user.First_Name),
				middleName: Resources.formatName(user.Middle_Name),
				lastName: Resources.formatName(user.Last_Name),
				sex: user.Sex,
				role: user.Role,
				username: user.Username,
				password: user.Password,
				userImage: defaultImage,
			})
			.then(() => {
				console.log("Successfully Registered...");
			});

		await axios
			.post("http://localhost:2000/api/create-company", {
				userID: user.UserID,
				companyID: shortid.generate(),
				companyName: "",
				street: "",
				zone: "",
				barangay: "",
				contactNumber: "",
				companyDescription: "",
				companyImage: "",
			})
			.then(() => {
				console.log("Successfully Registered your Company...");
			});
	};

	handleAppliedJobs = async (job) => {
		const { appliedJobs, numApplicants } = this.state;

		this.setState({
			appliedJobs: [job, ...appliedJobs],
			numApplicants: [job, ...numApplicants],
		});

		await axios
			.post("http://localhost:2000/api/create-applied-job", {
				jobID: job.JobID,
				applicantID: sessionStorage.getItem("ApplicantID"),
				companyID: job.CompanyID,
				companyName: job.Company_Name,
				companyAddress: job.Company_Address,
				jobTitle: job.Job_Title,
				category: job.Category,
				reqNoEmp: job.Required_Employees,
				salary: job.Salary,
				jobType: job.Job_Type,
				prefSex: job.Preferred_Sex,
				qualifications: job.Job_Qualifications,
				requirements: job.Job_Requirements,
				description: job.Job_Description,
				employerName: job.Employer_Name,
				companyImage: job.Company_Image,
				status: job.Active_Status,
				min: new Date().getMinutes(),
				hour: new Date().getHours(),
				day: new Date().getDate(),
				month: new Date().getMonth() + 1,
				year: new Date().getFullYear(),
				dateApplied: new Date(),
			})
			.then(() => {
				console.log("Successfully Applied for a Job");
			});
	};

	getAppliedJobs = async (appliedJob) => {
		await this.setState({
			appliedJobs: appliedJob,
		});
	};

	addJobApplicants = async (applicant) => {
		try {
			const { jobApplicants } = this.state;
			await this.setState({
				jobApplicants: [...jobApplicants, applicant],
			});

			await axios
				.post("http://localhost:2000/api/create-job-applicant", {
					jobID: applicant.jobID,
					companyID: applicant.companyID,
					applicantID: applicant.applicantID,
					jobTitle: applicant.jobTitle,
					firstName: applicant.firstName,
					middleName: applicant.middleName,
					lastName: applicant.lastName,
					homeAddress: applicant.homeAddress,
					sex: applicant.sex,
					bMonth: applicant.bMonth,
					bDay: applicant.bDay,
					bYear: applicant.bYear,
					contactNumber: applicant.contactNumber,
					email: applicant.email,
					civilStatus: applicant.civilStatus,
					educationalAttainment: applicant.educationalAttainment,
					userImage: applicant.userImage,
					min: applicant.min,
					hour: applicant.hour,
					day: applicant.day,
					month: applicant.month,
					year: applicant.year,
					dateApplied: new Date(),
					candidateStatus: "Not hired yet",
					resume: applicant.resume,
				})
				.then(() => {
					console.log("Successfully Added a Job Application!");
				});
		} catch (error) {
			console.log(error);
		}
	};

	getJobApplicantsByCompany = (jobApplicant) => {
		this.setState({
			jobApplicants: jobApplicant,
		});
	};

	setUserType = async (type) => {
		await this.setState(
			(this.state = {
				userType: type,
			})
		);
	};

	setCurrentUser = async (user) => {
		await this.setState({
			currentUser: user,
		});
	};

	setApplicants = (applicants) => {
		this.setState({
			applicants,
		});
	};

	changeCurrentUserProfile = (imageName, targetApplicant) => {
		this.setState((prevState) => ({
			currentUser: {
				...prevState.currentUser, // keep all other key-value pairs
				User_Image: imageName, // update the value of specific key
			},
			applicants: prevState.applicants.map((applicant) =>
				applicant.UserID === targetApplicant
					? Object.assign(applicant, { User_Image: imageName })
					: applicant
			),
		}));
	};

	changeCompanyProfile = (imageName, targetCompany) => {
		this.setState((prevState) => ({
			company: {
				...prevState.company, // keep all other key-value pairs
				Company_Image: imageName, // update the value of specific key
			},

			infos: prevState.infos.map((info) =>
				info.CompanyID === targetCompany
					? Object.assign(info, { Company_Image: imageName })
					: info
			),

			companyJobPost: prevState.companyJobPost.map((companyJobPost) =>
				companyJobPost.CompanyID === targetCompany
					? Object.assign(companyJobPost, { Company_Image: imageName })
					: companyJobPost
			),
		}));
	};

	toggleHiringStatus = async (applicantID, status) => {
		await this.setState((prevState) => ({
			applicants: prevState.applicants.map((applicant) =>
				applicant.ApplicantID === applicantID
					? Object.assign(applicant, { Hiring_Status: status })
					: applicant
			),
		}));
	};

	updateApplicantData = (user) => {
		this.setState((prevState) => ({
			applicants: prevState.applicants.map((applicant) =>
				applicant.ApplicantID === user.ApplicantID
					? Object.assign(applicant, {
							First_Name: Resources.formatName(user.First_Name),
							Middle_Name: Resources.formatName(user.Middle_Name),
							Last_Name: Resources.formatName(user.Last_Name),
							Home_Address: user.Home_Address,
							Sex: user.Sex,
							B_Month: user.B_Month,
							B_Day: user.B_Day,
							B_Year: user.B_Year,
							Contact_Number: user.Contact_Number,
							Email_Address: user.Email_Address,
							Civil_Status: user.Civil_Status,
							Educ_Attainment: user.Educ_Attainment,
							Preferred_Job: user.Preferred_Job,
							Preferred_Category: user.Preferred_Category,
							Preferred_Salary: user.Preferred_Salary,
							Interested_In: user.Interested_In,
							Good_At: user.Good_At,
							Credentials: user.Credentials,
					  })
					: applicant
			),
		}));

		// Spread Operator ----------
		this.setState((prevState) => ({
			// Spread Operator ----------
			currentUser: {
				...prevState.currentUser,
				First_Name: Resources.formatName(user.First_Name),
				Middle_Name: Resources.formatName(user.Middle_Name),
				Last_Name: Resources.formatName(user.Last_Name),
			},
		}));

		// User Account Database Table -----------
		axios
			.put("http://localhost:2000/api/update-user-business-profile", {
				firstName: Resources.formatName(user.First_Name),
				middleName: Resources.formatName(user.Middle_Name),
				lastName: Resources.formatName(user.Last_Name),
				userID: user.UserID,
			})
			.then((response) => {
				console.log(response);
			});
	};

	// Employer Portion ----------------------
	toggleSidebar = () => {
		this.setState({
			isSidebarOpen: !this.state.isSidebarOpen,
		});
	};

	addEmployerFeedBack = async (feedback) => {
		const { employerFeedback } = this.state;
		this.setState({
			employerFeedback: [feedback, ...employerFeedback],
		});

		await axios
			.post("http://localhost:2000/api/create-employer-feedback", {
				feedbackID: shortid.generate(),
				applicantID: feedback.ApplicantID,
				companyID: feedback.CompanyID,
				jobID: feedback.JobID,
				companyImage: feedback.Company_Image,
				companyName: feedback.Company_Name,
				jobTitle: feedback.Job_Title,
				companyAddress: feedback.Company_Address,
				min: feedback.Minutes,
				hour: feedback.Hour,
				day: feedback.Day,
				month: feedback.Month,
				year: feedback.Year,
				dateReplied: feedback.Date_Replied,
				applicationStatus: feedback.Application_Status,
				status: feedback.Status,
				type: feedback.Type,
				message: feedback.Message,
			})
			.then(() => {
				console.log("Successfully Added a Feedback!");
			});

		await axios
			.put("http://localhost:2000/api/update-job-applicant-status", {
				candidateStatus: feedback.Application_Status,
				applicantID: feedback.ApplicantID,
				companyID: feedback.CompanyID,
				jobID: feedback.JobID,
			})
			.then((response) => {
				console.log(response);
			});
	};

	setEmployerFeedBack = async (feedback) => {
		await this.setState({
			employerFeedback: feedback,
		});
	};

	updateCandidateStatus = (applicantID, jobID, status) => {
		this.setState((prevState) => ({
			jobApplicants: prevState.jobApplicants.map((jobApplicant) =>
				jobApplicant.ApplicantID === applicantID &&
				jobApplicant.JobID === jobID
					? Object.assign(jobApplicant, { Candidate_Status: status })
					: jobApplicant
			),
		}));
	};

	setCompany = async (response) => {
		await this.setState({
			company: response,
		});
	};

	setCompanyJobPosts = async (response) => {
		await this.setState({
			companyJobPost: response,
		});
	};

	updateNotificationStatus = async (feedbackID) => {
		await this.setState((prevState) => ({
			employerFeedback: prevState.employerFeedback.map((feedback) =>
				feedback.FeedbackID === feedbackID
					? Object.assign(feedback, { Status: "Seen" })
					: feedback
			),
		}));

		await axios
			.put("http://localhost:2000/api/update-feedback-status", {
				feedbackID: feedbackID,
			})
			.then((response) => {});
	};

	updateJobApplicantStatus = async (jobID, applicantID) => {
		await this.setState((prevState) => ({
			jobApplicants: prevState.jobApplicants.map((applicant) =>
				applicant.JobID === jobID && applicant.ApplicantID === applicantID
					? Object.assign(applicant, { Status: "Seen" })
					: applicant
			),
		}));

		await axios
			.put(
				"http://localhost:2000/api/update-job-applicant-notification-status",
				{
					jobID: jobID,
					applicantID: applicantID,
				}
			)
			.then((response) => {});
	};

	deleteNotification = (feedbackID) => {
		let employerFeedback = this.state.employerFeedback;
		let index = employerFeedback.findIndex(
			(feedback) => feedback.FeedbackID === feedbackID
		);
		employerFeedback.splice(index, 1);
		this.setState({ employerFeedback: employerFeedback });
	};

	setHiree = async (hiree) => {
		await this.setState({ hiree });
	};

	setJobApplicantData = (applicantData) => [
		this.setState({
			jobApplicantData: applicantData,
		}),
	];

	setEmployerMessage = (message) => {
		this.setState({
			employerMessage: message,
		});
	};

	deleteEmployerPost = (id) => {
		let companyJobPost = this.state.companyJobPost;
		let index = companyJobPost.findIndex((x) => x.JobID === id);
		companyJobPost.splice(index, 1);
		this.setState({ companyJobPost: companyJobPost });

		this.deletePost(id);
	};

	deleteJobApplicants = (applicantID, jobID) => {
		let jobApplicants = this.state.jobApplicants;
		let index = jobApplicants.findIndex(
			(x) => x.JobID === jobID && x.ApplicantID === applicantID
		);
		jobApplicants.splice(index, 1);
		this.setState({ jobApplicants: jobApplicants });
	};

	setTargetJobPost = (post) => {
		this.setState({
			targetJobPost: post,
		});
	};

	resetTargetJobPost = () => {
		this.setState({
			targetJobPost: {},
		});
	};

	updateJobPostContent = async (jobPost) => {
		this.setState((prevState) => ({
			infos: prevState.infos.map((info) =>
				info.JobID === jobPost.JobID
					? Object.assign(info, {
							Company_Address: jobPost.Company_Address,
							Job_Title: jobPost.Job_Title,
							Category: jobPost.Category,
							Required_Employees: jobPost.Required_Employees,
							Salary: jobPost.Salary,
							Job_Type: jobPost.Job_Type,
							Preferred_Sex: jobPost.Preferred_Sex,
							Job_Qualifications: jobPost.Job_Qualifications,
							Job_Requirements: jobPost.Job_Requirements,
							Job_Description: jobPost.Job_Description,
							Employer_Name: jobPost.Employer_Name,
					  })
					: info
			),

			companyJobPost: prevState.companyJobPost.map((companyJobPost) =>
				companyJobPost.JobID === jobPost.JobID
					? Object.assign(companyJobPost, {
							Company_Address: jobPost.Company_Address,
							Job_Title: jobPost.Job_Title,
							Category: jobPost.Category,
							Required_Employees: jobPost.Required_Employees,
							Salary: jobPost.Salary,
							Job_Type: jobPost.Job_Type,
							Preferred_Sex: jobPost.Preferred_Sex,
							Job_Qualifications: jobPost.Job_Qualifications,
							Job_Requirements: jobPost.Job_Requirements,
							Job_Description: jobPost.Job_Description,
							Employer_Name: jobPost.Employer_Name,
					  })
					: companyJobPost
			),
		}));

		// Fetching Job Post Data
		await axios
			.put("http://localhost:2000/api/update-jobPost-content", {
				jobTitle: jobPost.Job_Title,
				category: jobPost.Category,
				reqNoEmp: jobPost.Required_Employees,
				salary: jobPost.Salary,
				jobType: jobPost.Job_Type,
				prefSex: jobPost.Preferred_Sex,
				qualifications: jobPost.Job_Qualifications,
				requirements: jobPost.Job_Requirements,
				description: jobPost.Job_Description,
				jobID: jobPost.JobID,
			})
			.then((response) => {
				console.log(response);
			});

		await axios
			.put("http://localhost:2000/api/update-applied-job-content", {
				jobTitle: jobPost.Job_Title,
				category: jobPost.Category,
				reqNoEmp: jobPost.Required_Employees,
				salary: jobPost.Salary,
				jobType: jobPost.Job_Type,
				prefSex: jobPost.Preferred_Sex,
				qualifications: jobPost.Job_Qualifications,
				requirements: jobPost.Job_Requirements,
				description: jobPost.Job_Description,
				jobID: jobPost.JobID,
			})
			.then((response) => {
				console.log(response);
			});
	};

	updateJobPostStatus = async (jobID) => {
		this.setState((prevState) => ({
			infos: prevState.infos.map((info) =>
				info.JobID === jobID
					? Object.assign(info, {
							Active_Status: "Closed",
					  })
					: info
			),

			companyJobPost: prevState.companyJobPost.map((companyJobPost) =>
				companyJobPost.JobID === jobID
					? Object.assign(companyJobPost, {
							Active_Status: "Closed",
					  })
					: companyJobPost
			),
		}));

		// Fetching Job Post Data
		await axios
			.put("http://localhost:2000/api/update-jobPost-active-status", {
				jobID: jobID,
			})
			.then((response) => {
				// console.log(response);
			});
	};

	updateCompanyProfile = (newValue) => {
		this.setState((prevState) => ({
			company: {
				UserID: newValue.userID,
				CompanyID: newValue.companyID,
				Employer_Name: `${newValue.firstName} ${newValue.middleName} ${newValue.lastName}`,
				Street: newValue.street,
				Zone: newValue.zone,
				Barangay: newValue.barangay,
				Contact_Number: newValue.contactNumber,
				Company_Name: newValue.companyName,
				Company_Description: newValue.companyDescription,
				Company_Image: newValue.companyImage,
			},

			companyJobPost: prevState.companyJobPost.map((companyPost) =>
				companyPost.CompanyID === newValue.companyID
					? Object.assign(companyPost, {
							Company_Name: newValue.companyName,
							Company_Address: `${newValue.street}, ${newValue.zone}, ${newValue.barangay}`,
					  })
					: companyPost
			),

			infos: prevState.infos.map((info) =>
				info.CompanyID === newValue.companyID
					? Object.assign(info, {
							Company_Name: newValue.companyName,
							Company_Address: `${newValue.street}, ${newValue.zone}, ${newValue.barangay}`,
					  })
					: info
			),

			// Spread Operator ----------
			currentUser: {
				...prevState.currentUser,
				First_Name: newValue.firstName,
				Middle_Name: newValue.middleName,
				Last_Name: newValue.lastName,
			},
		}));

		// User Account Database Table -----------
		axios
			.put("http://localhost:2000/api/update-user-business-profile", {
				firstName: newValue.firstName,
				middleName: newValue.middleName,
				lastName: newValue.lastName,
				userID: newValue.userID,
			})
			.then((response) => {
				// console.log(response);
			});

		// Company Database Table -----------
		axios
			.put("http://localhost:2000/api/update-company-business-profile", {
				employerName: `${newValue.firstName} ${newValue.middleName} ${newValue.lastName}`,
				street: newValue.street,
				zone: newValue.zone,
				barangay: newValue.barangay,
				contactNumber: newValue.contactNumber,
				companyName: newValue.companyName,
				companyDescription: newValue.companyDescription,
				companyID: newValue.companyID,
			})
			.then((response) => {
				// console.log(response);
			});

		// Job Posts Database Table -----------
		axios
			.put("http://localhost:2000/api/update-jobPost-business-profile", {
				companyName: newValue.companyName,
				companyAddress: `${newValue.street}, ${newValue.zone}, ${newValue.barangay}`,
				companyID: newValue.companyID,
			})
			.then((response) => {
				// console.log(response);
			});

		// Applied Jobs Database Table -----------
		axios
			.put(
				"http://localhost:2000/api/update-applied-jobs-business-profile",
				{
					companyName: newValue.companyName,
					companyAddress: `${newValue.street}, ${newValue.zone}, ${newValue.barangay}`,
					companyID: newValue.companyID,
				}
			)
			.then((response) => {
				// console.log(response);
			});

		// Employer Feedback Database Table -----------
		axios
			.put(
				"http://localhost:2000/api/update-employer-feedback-business-profile",
				{
					companyName: newValue.companyName,
					companyAddress: `${newValue.street}, ${newValue.zone}, ${newValue.barangay}`,
					companyID: newValue.companyID,
				}
			)
			.then((response) => {
				// console.log(response);
			});
	};

	setTheme = async () => {
		await this.setState({
			darkTheme: !this.state.darkTheme,
		});

		if (this.state.darkTheme) {
			localStorage.setItem("darkTheme", true);
		} else {
			localStorage.setItem("darkTheme", false);
		}
	};

	render() {
		const { darkTheme } = this.state;
		const userTypeSession = sessionStorage.getItem("UserType");
		let userType = "";

		if (darkTheme) {
			document.body.style.backgroundColor = "#0f0f0f";
		} else {
			document.body.style.backgroundColor = "#c4c4c4";
		}

		if (userTypeSession === "Job Seeker") {
			userType = "jobseeker";
		} else if (userTypeSession === "Employer") {
			userType = "employer";
		}

		return (
			<div className={darkTheme ? "app-dark" : "app-light"}>
				<Router>
					<Switch>
						<Route
							exact
							path='/login'
							component={() => (
								<Login
									isLogin={this.state.isLogin}
									showWelcomWindow={this.state.showWelcomWindow}
									user={this.state.user}
									userType={this.state.userType}
									currentUser={this.state.currentUser}
									infos={this.state.infos}
									appliedJobs={this.state.appliedJobs}
									darkTheme={this.state.darkTheme}
									handleLogin={this.handleLogin}
									showWelcomWindowOn={this.showWelcomWindowOn}
									showWelcomWindowOff={this.showWelcomWindowOff}
									setUserType={this.setUserType}
									setCurrentUser={this.setCurrentUser}
									getAppliedJobs={this.getAppliedJobs}
									setAppliedJobs={this.setAppliedJobs}
									resetAppliedJobs={this.resetAppliedJobs}
									getJobApplicantsByCompany={
										this.getJobApplicantsByCompany
									}
									setEmployerFeedBack={this.setEmployerFeedBack}
									setCompany={this.setCompany}
									setCompanyJobPosts={this.setCompanyJobPosts}
									setJobPosts={this.setJobPosts}
								/>
							)}
						/>
						<Route
							exact
							path='/signup'
							component={() => (
								<SignUp
									isSignUp={this.state.isSignUp}
									darkTheme={this.state.darkTheme}
									userType={this.state.userType}
									registerJobSeeker={this.registerJobSeeker}
									registerEmployer={this.registerEmployer}
									toggleSignUp={this.toggleSignUp}
									setUserType={this.setUserType}
								/>
							)}
						/>
						<Route
							exact
							path='/'
							component={() => (
								<LandingPage
									darkTheme={this.state.darkTheme}
									setUserType={this.setUserType}
								/>
							)}
						/>

						<Route
							exact
							path={`/${userType}/home`}
							render={() => (
								<Home
									activePage={this.state.activePage}
									infos={this.state.infos}
									userData={this.state.userData}
									badge={this.state.employerFeedback.length}
									employerFeedback={this.state.employerFeedback}
									applicants={this.state.applicants}
									numApplicants={this.state.numApplicants}
									scrollPosition={this.state.scrollPosition}
									darkTheme={this.state.darkTheme}
									hasApplied={this.state.hasApplied}
									currentUser={this.state.currentUser}
									isDeleted={this.state.isDeleted}
									setEmployerFeedBack={this.setEmployerFeedBack}
									onDelete={this.deletePost}
									handleChangePage={this.handleChangePage}
									handleScroll={this.handleScroll}
									setCompanyID={this.setCompanyID}
									closeHasApplied={this.closeHasApplied}
									closeDeleteState={this.closeDeleteState}
									setCurrentUser={this.setCurrentUser}
								/>
							)}
						/>
						<Route
							exact
							path={`/${userType}/profile`}
							render={() => (
								<Profile
									activePage={this.state.activePage}
									showAdd={this.state.showAddTask}
									infos={this.state.infos}
									darkTheme={this.state.darkTheme}
									targetCompany={this.state.targetCompany}
									appliedJobs={this.state.appliedJobs}
									userData={this.state.userData}
									user={this.state.user}
									applicants={this.state.applicants}
									badge={this.state.employerFeedback.length}
									employerFeedback={this.state.employerFeedback}
									currentUser={this.state.currentUser}
									onAddPost={this.addPost}
									onAdd={this.onTogglePostForm}
									handleChangePage={this.handleChangePage}
									setCompanyID={this.setCompanyID}
									setCurrentUser={this.setCurrentUser}
									setApplicants={this.setApplicants}
									setEmployerFeedBack={this.setEmployerFeedBack}
									changeCurrentUserProfile={
										this.changeCurrentUserProfile
									}
									toggleHiringStatus={this.toggleHiringStatus}
									updateApplicantData={this.updateApplicantData}
								/>
							)}
						/>
						<Route
							exact
							path={`/${userType}/notification`}
							render={() => (
								<Notification
									activePage={this.state.activePage}
									currentUser={this.state.currentUser}
									darkTheme={this.state.darkTheme}
									employerFeedback={this.state.employerFeedback}
									badge={this.state.employerFeedback.length}
									handleChangePage={this.handleChangePage}
									setCurrentUser={this.setCurrentUser}
									updateNotificationStatus={
										this.updateNotificationStatus
									}
									deleteNotification={this.deleteNotification}
									setEmployerFeedBack={this.setEmployerFeedBack}
									setCompanyID={this.setCompanyID}
								/>
							)}
						/>
						<Route
							exact
							path={`/${userType}/menu`}
							render={() => (
								<Menu
									activePage={this.state.activePage}
									darkTheme={this.state.darkTheme}
									currentUser={this.state.currentUser}
									badge={this.state.employerFeedback.length}
									employerFeedback={this.state.employerFeedback}
									handleChangePage={this.handleChangePage}
									setCurrentUser={this.setCurrentUser}
									handleLogout={this.handleLogout}
									resetScroll={this.resetScroll}
									setEmployerFeedBack={this.setEmployerFeedBack}
									setTheme={this.setTheme}
								/>
							)}
						/>

						{/* Home Sub Components */}
						<Route
							exact
							path={`/${userType}/${this.state.activePage}/company-profile`}
							render={() => (
								<CompanyProfile
									infos={this.state.infos}
									targetCompany={this.state.targetCompany}
									activePage={this.state.activePage}
									darkTheme={this.state.darkTheme}
								/>
							)}
						/>
						<Route
							exact
							path={`/${userType}/${this.state.activePage}/apply-now`}
							render={() => (
								<ApplicationForm
									user={this.state.user}
									infos={this.state.infos}
									jobApplicants={this.state.jobApplicants}
									darkTheme={this.state.darkTheme}
									targetCompany={this.state.targetCompany}
									activePage={this.state.activePage}
									currentUser={this.state.currentUser}
									applicants={this.state.applicants}
									employerFeedback={this.state.employerFeedback}
									handleChange={this.handleChange}
									handleApplication={this.handleApplication}
									addJobApplicants={this.addJobApplicants}
									setCompanyID={this.setCompanyID}
								/>
							)}
						/>
						<Route
							exact
							path={`/${userType}/search`}
							render={() => (
								<SearchEngine
									activePage={this.state.activePage}
									infos={this.state.infos}
									employerFeedback={this.state.employerFeedback}
									numApplicants={this.state.numApplicants}
									hasApplied={this.state.hasApplied}
									isDeleted={this.state.isDeleted}
									applicants={this.state.applicants}
									darkTheme={this.state.darkTheme}
									handleChangePage={this.handleChangePage}
									onDelete={this.deletePost}
									setCompanyID={this.setCompanyID}
									closeHasApplied={this.closeHasApplied}
									closeDeleteState={this.closeDeleteState}
									setHiree={this.setHiree}
									setEmployerMessage={this.setEmployerMessage}
								/>
							)}
						/>

						{/* Menu Sub Components */}
						<Route exact path='/jobseeker/menu/about' component={About} />
						<Route
							exact
							path='/jobseeker/menu/contact'
							component={Contact}
						/>
						<Route exact path='/jobseeker/menu/help' component={Help} />
						<Route
							exact
							path='/jobseeker/menu/settings'
							component={Settings}
						/>
						<Route
							exact
							path='/jobseeker/menu/terms-and-condition'
							component={TermsAndCondition}
						/>

						{/* EMPLOYER COMPONENT LINKS */}

						<Route
							exact
							path={`/${userType}/dashboard`}
							component={() => (
								<Emp_Dashboard
									activePage={this.state.activePage}
									company={this.state.company}
									isSidebarOpen={this.state.isSidebarOpen}
									currentUser={this.state.currentUser}
									jobApplicants={this.state.jobApplicants}
									applicants={this.state.applicants}
									darkTheme={this.state.darkTheme}
									toggleSidebar={this.toggleSidebar}
									handleChangePage={this.handleChangePage}
									handleLogout={this.handleLogout}
									setCurrentUser={this.setCurrentUser}
									getJobApplicantsByCompany={
										this.getJobApplicantsByCompany
									}
									changeCompanyProfile={this.changeCompanyProfile}
									setCompany={this.setCompany}
								/>
							)}
						/>
						<Route
							exact
							path={`/${userType}/business-profile`}
							component={() => (
								<Emp_BusinessProfile
									currentUser={this.state.currentUser}
									darkTheme={this.state.darkTheme}
									company={this.state.company}
									applicants={this.state.applicants}
									employerFeedback={this.state.employerFeedback}
									setCurrentUser={this.setCurrentUser}
									handleLogout={this.handleLogout}
									getJobApplicantsByCompany={
										this.getJobApplicantsByCompany
									}
									setHiree={this.setHiree}
									setEmployerMessage={this.setEmployerMessage}
									changeCompanyProfile={this.changeCompanyProfile}
									updateCompanyProfile={this.updateCompanyProfile}
								/>
							)}
						/>
						<Route
							exact
							path={`/${userType}/jobs`}
							component={() => (
								<Emp_Jobs
									currentUser={this.state.currentUser}
									targetJobPost={this.state.targetJobPost}
									showAdd={this.state.showAddTask}
									isDeleted={this.state.isDeleted}
									company={this.state.company}
									companyJobPost={this.state.companyJobPost}
									darkTheme={this.state.darkTheme}
									onAddPost={this.addPost}
									toggle={this.handleToggle}
									handleLogout={this.handleLogout}
									setCurrentUser={this.setCurrentUser}
									getJobApplicantsByCompany={
										this.getJobApplicantsByCompany
									}
									deleteEmployerPost={this.deleteEmployerPost}
									onAdd={this.onTogglePostForm}
									closeDeleteState={this.closeDeleteState}
									setTargetJobPost={this.setTargetJobPost}
									resetTargetJobPost={this.resetTargetJobPost}
									updateJobPostContent={this.updateJobPostContent}
									updateJobPostStatus={this.updateJobPostStatus}
								/>
							)}
						/>
						<Route
							exact
							path={`/${userType}/applicants`}
							component={() => (
								<Emp_Applicant
									currentUser={this.state.currentUser}
									jobApplicants={this.state.jobApplicants}
									company={this.state.company}
									companyJobPost={this.state.companyJobPost}
									user={this.state.user}
									infos={this.state.infos}
									targetCompany={this.state.targetCompany}
									darkTheme={this.state.darkTheme}
									isDeleted={this.state.isDeleted}
									setCurrentUser={this.setCurrentUser}
									setCompanyID={this.setCompanyID}
									handleLogout={this.handleLogout}
									setApplicantID={this.setApplicantID}
									setJobID={this.setJobID}
									getJobApplicantsByCompany={
										this.getJobApplicantsByCompany
									}
									setJobApplicantData={this.setJobApplicantData}
									updateJobApplicantStatus={
										this.updateJobApplicantStatus
									}
									deleteJobApplicants={this.deleteJobApplicants}
									setDeleteState={this.setDeleteState}
									closeDeleteState={this.closeDeleteState}
								/>
							)}
						/>
						<Route
							exact
							path={`/${userType}/settings`}
							component={() => (
								<Emp_Setting
									company={this.state.company}
									darkTheme={this.state.darkTheme}
									currentUser={this.state.currentUser}
									handleLogout={this.handleLogout}
									setCurrentUser={this.setCurrentUser}
									getJobApplicantsByCompany={
										this.getJobApplicantsByCompany
									}
									setTheme={this.setTheme}
									deleteCompanyPosts={this.deleteCompanyPosts}
								/>
							)}
						/>
						<Route
							exact
							path={`/${userType}/account`}
							component={() => (
								<Emp_Account
									company={this.state.company}
									darkTheme={this.state.darkTheme}
									currentUser={this.state.currentUser}
									handleLogout={this.handleLogout}
									setCurrentUser={this.setCurrentUser}
									getJobApplicantsByCompany={
										this.getJobApplicantsByCompany
									}
								/>
							)}
						/>

						<Route
							exact
							path={`/${userType}/applicants/applicant-data`}
							component={() => (
								<Emp_Job_Applicant_Data
									employerFeedback={this.state.employerFeedback}
									jobApplicantData={this.state.jobApplicantData}
									companyJobPost={this.state.companyJobPost}
									darkTheme={this.state.darkTheme}
									addEmployerFeedBack={this.addEmployerFeedBack}
									updateCandidateStatus={this.updateCandidateStatus}
								/>
							)}
						/>

						<Route
							exact
							path={`/${userType}/applicant-information`}
							component={() => (
								<Hiree_Information
									hiree={this.state.hiree}
									company={this.state.company}
									employerMessage={this.state.employerMessage}
									darkTheme={this.state.darkTheme}
									employerFeedback={this.state.employerFeedback}
									addEmployerFeedBack={this.addEmployerFeedBack}
								/>
							)}
						/>

						{/* unknown route */}
						<Route
							path='*'
							render={() => (
								<UnknownPage
									activePage={this.state.activePage}
									isLogin={this.state.isLogin}
								/>
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;