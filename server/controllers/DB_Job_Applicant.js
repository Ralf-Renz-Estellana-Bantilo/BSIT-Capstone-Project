import mysql from "mysql2";

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "bantiloralfrenz",
	database: "job_search_system_db",
});

export const addJobApplicants = (req, res) => {
	const jobID = req.body.jobID;
	const companyID = req.body.companyID;
	const applicantID = req.body.applicantID;
	const jobTitle = req.body.jobTitle;
	const firstName = req.body.firstName;
	const middleName = req.body.middleName;
	const lastName = req.body.lastName;
	const homeAddress = req.body.homeAddress;
	const sex = req.body.sex;
	const bMonth = req.body.bMonth;
	const bDay = req.body.bDay;
	const bYear = req.body.bYear;
	const contactNumber = req.body.contactNumber;
	const email = req.body.email;
	const civilStatus = req.body.civilStatus;
	const educationalAttainment = req.body.educationalAttainment;
	const resume = req.body.resume;
	const userImage = req.body.userImage;
	const min = req.body.min;
	const hour = req.body.hour;
	const day = req.body.day;
	const month = req.body.month;
	const year = req.body.year;
	const dateApplied = req.body.dateApplied;
	const candidateStatus = req.body.candidateStatus;
	const disability = req.body.disability;
	const employmentStatus = req.body.employmentStatus;
	const employmentType = req.body.employmentType;

	db.query(
		"INSERT INTO job_applicants (JobID, CompanyID, ApplicantID, Job_Title, First_Name, Middle_Name, Last_Name, Home_Address, Sex, B_Month, B_Day, B_Year, Contact_Number, Email_Address, Civil_Status, Educ_Attainment, Resume, User_Image, Minutes, Hour, Day, Month, Year, Date_Applied, Candidate_Status, Status, Disability, Employment_Status, Employment_Type ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', ?, ?, ?)",
		[
			jobID,
			companyID,
			applicantID,
			jobTitle,
			firstName,
			middleName,
			lastName,
			homeAddress,
			sex,
			bMonth,
			bDay,
			bYear,
			contactNumber,
			email,
			civilStatus,
			educationalAttainment,
			resume,
			userImage,
			min,
			hour,
			day,
			month,
			year,
			dateApplied,
			candidateStatus,
			disability,
			employmentStatus,
			employmentType,
		],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send("Successfully Added a candidate");
				// console.log("Successfully Added a candidate to the database");
			}
		}
	);
};

export const getJobApplicants = (req, res) => {
	const companyID = req.body.companyID;

	db.query(
		"SELECT * FROM job_applicants WHERE CompanyID = ? ORDER BY job_applicants.Date_Applied ASC, job_applicants.Year ASC, job_applicants.Month ASC, job_applicants.Day ASC, job_applicants.Hour ASC, job_applicants.Minutes ASC",
		[companyID],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
			}
		}
	);
};

export const getJobApplicantsByJobPost = (req, res) => {
	db.query("SELECT * FROM job_applicants", (err, result) => {
		if (err) {
			console.log("Error:", err);
		} else {
			res.send(result);
		}
	});
};

export const getJobApplicant = (req, res) => {
	const applicantID = req.body.applicantID;
	const companyID = req.body.companyID;
	const jobID = req.body.jobID;

	db.query(
		"SELECT * FROM job_applicants WHERE ApplicantID = ? AND CompanyID = ? AND JobID = ?",
		[applicantID, companyID, jobID],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
			}
		}
	);
};

export const deleteJobApplicants = (req, res) => {
	const jobID = req.params.id;

	db.query(
		"DELETE FROM job_applicants WHERE JobID = ?",
		jobID,
		(err, result) => {
			if (err) {
				console.log("deleteCompanyPost:", err);
			} else {
				res.send(result);
				// console.log("Job Applicant data has been cleaned");
			}
		}
	);
};

export const deleteJobApplicant = (req, res) => {
	const jobID = req.params.jobID;
	const applicantID = req.params.applicantID;

	db.query(
		"DELETE FROM job_applicants WHERE JobID = ? AND ApplicantID = ?",
		[jobID, applicantID],
		(err, result) => {
			if (err) {
				console.log("deleteCompanyPost:", err);
			} else {
				res.send(result);
				// console.log("Job Applicant data has been cleaned");
			}
		}
	);
};

export const account_deleteJobApplicants = (req, res) => {
	const applicantID = req.params.id;

	db.query(
		"DELETE FROM job_applicants WHERE ApplicantID = ?",
		applicantID,
		(err, result) => {
			if (err) {
				console.log("deleteAppliedJob:", err);
			} else {
				res.send(result);
				// console.log("account_deleteJobApplicants");
			}
		}
	);
};

export const updateCandidateStatus = (req, res) => {
	const applicantID = req.body.applicantID;
	const companyID = req.body.companyID;
	const jobID = req.body.jobID;
	const candidateStatus = req.body.candidateStatus;

	db.query(
		"UPDATE job_applicants SET Candidate_Status = ? WHERE ApplicantID=? AND CompanyID=? AND JobID=?",
		[candidateStatus, applicantID, companyID, jobID],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
				// console.log("Successfully updateD Candidate Status");
			}
		}
	);
};

export const updateJobApplicantStatus = (req, res) => {
	const jobID = req.body.jobID;
	const applicantID = req.body.applicantID;

	db.query(
		"UPDATE job_applicants SET Status = 'Seen' WHERE JobID=? AND ApplicantID=?",
		[jobID, applicantID],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
				// console.log("Successfully updated the job applicant  Status");
			}
		}
	);
};

export const account_deleteEmployer = (req, res) => {
	const companyID = req.params.id;

	db.query(
		"DELETE FROM company WHERE CompanyID = ?",
		companyID,
		(err, result) => {
			if (err) {
				console.log("account_deleteJobApplicants:", err);
			} else {
				res.send(result);
				// console.log("account_deleteJobApplicants");
			}
		}
	);
};
