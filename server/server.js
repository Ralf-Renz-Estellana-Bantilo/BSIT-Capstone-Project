import express from "express";
import mysql from "mysql2";
import cors from "cors";
import {
	account_deleteUserAccount,
	changeAccountPicture,
	checkExistingUsernames,
	createUser,
	getAdminUsers,
	getEmployerUsers,
	getJobSeekerUsers,
	getRegisteredUsers,
	login,
	retainUser,
	updateUserAccountBusinessProfile,
	updateUsernameAndPassword,
} from "./controllers/DB_User_Account.js";
import {
	account_deleteApplicant,
	changeApplicantPicture,
	createApplicantData,
	getApplicantData,
	getApplicantID,
	updateApplicantHiringStatus,
	updateJobProfile,
} from "./controllers/DB_Applicant.js";
import {
	account_deleteCompany,
	changeCompanyPicture,
	createCompanyData,
	createCompanyDataAdmin,
	getAllCompanies,
	getCompanyData,
	getCompanyDetails,
	getCompanyID,
	insertCompanyData,
	updateCompanyBusinessProfile,
} from "./controllers/DB_Company.js";
import {
	account_deleteJobPosts,
	changeJobPostPicture,
	createJobPost,
	deleteCompanyPost,
	getCompanyJobPost,
	getCompanyJobPosts,
	getJobPosts,
	updateActiveStatus,
	updateJobPost,
	updateJobPostBusinessProfile,
} from "./controllers/DB_Job_Post.js";
import {
	account_deleteEmployer,
	account_deleteJobApplicants,
	addJobApplicants,
	deleteJobApplicant,
	deleteJobApplicants,
	getJobApplicant,
	getJobApplicants,
	getJobApplicantsByJobPost,
	updateCandidateStatus,
	updateJobApplicantStatus,
} from "./controllers/DB_Job_Applicant.js";
import {
	account_deleteAppliedJob,
	account_deleteAppliedJobs,
	changeAppliedJobPicture,
	deleteAppliedJob,
	getAppliedJobs,
	handleAppliedJobs,
	updateAppliedJob,
	updateAppliedJobsBusinessProfile,
} from "./controllers/DB_Applied_Jobs.js";
import {
	account_deleteEmployerFeedback,
	account_deleteFeedback,
	addEmployerFeedBack,
	changeEmployerFeedbackPicture,
	deleteApplicantNotification,
	getApplicantResponse,
	getEmployerFeedBacks,
	getEmployerFeedBack_Employer,
	getEmployerFeedBack_JobSeeker,
	updateFeedbackBusinessProfile,
	updateNotificationStatus,
} from "./controllers/DB_Employer_Feedback.js";
import {
	createAdminPost,
	getAdminPosts,
} from "./controllers/DB_Admin_Posts.js";
import {
	bulkInsert,
	insertData,
	masterdata,
	masterselect,
	updateData,
} from "./api/api.js";

const app = express();
const PORT = process.env.PORT || 2000;
app.use(express.json());

app.use(
	cors({
		// origin: [
		// 	"https://job-search-catarman.netlify.app/",
		// 	"https://ralf-expenses-tracker.netlify.app",
		// ],
		origin: "*",
		preflightContinue: true,
		methods: ["GET", "POST", "PUT"],
		credentials: true,
	})
);

// Add headers before the routes are defined
// app.use(function (req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept"
// 	);
// 	if (req.method == "OPTIONS") {
// 		return res.sendStatus(200);
// 	}
// 	next();
// });

let db;
try {
	if (!process.env.PORT) {
		db = mysql.createConnection({
			user: "root",
			password: "bantiloralfrenz",
			host: "localhost",
			database: "job_search_system_db",
		});

		db.connect((err) => {
			if (err) {
				console.log("Cannot connect to the database...", err);
			} else {
				console.log("MySQL connection successfully stablished...");
			}
		});
	} else {
		function connectToDatabase() {
			db = mysql.createConnection({
				user: "b58454bd4a7cc9",
				password: "1684a61d",
				host: "us-cdbr-east-05.cleardb.net",
				database: "heroku_e973498db39f7ce",
			});

			db.connect((err) => {
				if (err) {
					console.log("Cannot connect to the database...", err);
				} else {
					console.log("MySQL connection successfully stablished...");
				}
			});

			db.on("error", function (err) {
				console.log("db error", err);
				if (err.code === "PROTOCOL_CONNECTION_LOST") {
					connectToDatabase();
				} else {
					throw err;
				}
			});
		}
		connectToDatabase();
	}
} catch (error) {
	console.log("Server Error:", error);
}

app.get("/", (req, res) => {
	res.send("App is live!");
});

// User_Account Database Table ----------
app.get("/api/read-user-jobseeker", getJobSeekerUsers);
app.get("/api/read-user-employer", getEmployerUsers);
app.get("/api/read-users", getRegisteredUsers);
app.get("/api/read-user-admin", getAdminUsers);
app.post("/api/create-user", createUser);
app.post("/api/login", login);
app.post("/api/fetchSession", retainUser);
app.post("/api/checkUsername", checkExistingUsernames);
app.put("/api/update-user-profile", changeAccountPicture);
app.put("/api/update-user-account", updateUsernameAndPassword);
app.put("/api/update-user-business-profile", updateUserAccountBusinessProfile);
app.delete("/api/delete-user-account/:id", account_deleteUserAccount);

// Applicant Database Table ----------
app.post("/api/create-applicant-data", createApplicantData);
app.post("/api/get-applicantID", getApplicantID);
app.get("/api/read-applicant-data", getApplicantData);
app.put("/api/update-appplicant-profile", changeApplicantPicture);
app.put("/api/update-appplicant-data", updateJobProfile);
app.put("/api/update-appplicant-hiring-status", updateApplicantHiringStatus);
app.delete("/api/delete-applicant/:id", account_deleteApplicant);

// Company Database Table ----------
app.get("/api/read-companies", getAllCompanies);
app.post("/api/get-companyID", getCompanyID);
app.post("/api/create-company", createCompanyData);
app.post("/api/create-company-admin", createCompanyDataAdmin);
app.post("/api/read-company", getCompanyData);
app.post("/api/read-company-details", getCompanyDetails);
app.put("/api/insertData-company", insertCompanyData);
app.put("/api/update-company-picture", changeCompanyPicture);
app.put("/api/update-company-business-profile", updateCompanyBusinessProfile);
app.delete("/api/delete-company/:id", account_deleteCompany); // ----------

// Job Posts Database Table ----------
app.get("/api/read-jobPost", getJobPosts);
app.get("/api/read-company-applicants", getJobApplicantsByJobPost);
app.post("/api/create-jobPost", createJobPost);
app.post("/api/read-company-jobPost", getCompanyJobPosts);
app.post("/api/read-specific-company-jobPost", getCompanyJobPost);
app.put("/api/update-jobPost-picture", changeJobPostPicture);
app.put("/api/update-jobPost-content", updateJobPost);
app.put("/api/update-jobPost-active-status", updateActiveStatus);
app.put("/api/update-jobPost-business-profile", updateJobPostBusinessProfile);
app.put("/api/delete-jobPost", deleteCompanyPost);
app.delete("/api/delete-company-jobPost/:id", account_deleteJobPosts); // ----------

// Job Applicants Database Table ----------
app.post("/api/create-job-applicant", addJobApplicants);
app.post("/api/read-job-applicant", getJobApplicants);
app.post("/api/read-specific-job-applicant", getJobApplicant);
app.put("/api/delete-job-applicants", deleteJobApplicants);
app.delete(
	"/api/delete-specific-job-applicant/:jobID/:applicantID",
	deleteJobApplicant
);
app.delete(
	"/api/account-delete-job-applicant/:id",
	account_deleteJobApplicants
);
app.put("/api/update-job-applicant-status", updateCandidateStatus);
app.put(
	"/api/update-job-applicant-notification-status",
	updateJobApplicantStatus
);
app.delete("/api/delete-job-applicant-employer/:id", account_deleteEmployer); // ----------

// Applied Jobs Database Table
app.post("/api/create-applied-job", handleAppliedJobs);
app.post("/api/read-applied-jobs", getAppliedJobs);
app.put("/api/update-applied-job-picture", changeAppliedJobPicture);
app.put("/api/update-applied-job-content", updateAppliedJob);
app.put("/api/delete-applied-job", deleteAppliedJob);
app.delete("/api/account-delete-applied-job/:id", account_deleteAppliedJob);
app.put(
	"/api/update-applied-jobs-business-profile",
	updateAppliedJobsBusinessProfile
);
app.delete("/api/delete-applied-employer/:id", account_deleteAppliedJobs); // ----------

// Employer Feedback Database Table
app.get("/api/read-employer-feedback", getEmployerFeedBacks);
app.post("/api/create-employer-feedback", addEmployerFeedBack);
app.post(
	"/api/read-specific-applicant-notification",
	getEmployerFeedBack_JobSeeker
);
app.post("/api/read-specific-employer-feedback", getEmployerFeedBack_Employer);
app.post("/api/read-applicant-response", getApplicantResponse);
app.put("/api/update-feedback-status", updateNotificationStatus);
app.put("/api/update-employer-feedback-picture", changeEmployerFeedbackPicture);
app.put("/api/delete-applicant-notification", deleteApplicantNotification);
app.delete("/api/delete-employer-feedback/:id", account_deleteFeedback);
app.put(
	"/api/update-employer-feedback-business-profile",
	updateFeedbackBusinessProfile
);
app.delete(
	"/api/delete-employer-feedback-data/:id",
	account_deleteEmployerFeedback
);

// Admin Posts
app.get("/api/admin/read-posts", getAdminPosts);
app.post("/api/admin/add-post", createAdminPost);

// DYNAMIC APIs ----------------------------------------------------------
app.post("/api/masterselect", masterselect);
app.post("/api/masterdata", masterdata);
app.post("/api/bulkInsert", bulkInsert);
app.post("/api/insertData", insertData);
app.put("/api/updateData", updateData);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
