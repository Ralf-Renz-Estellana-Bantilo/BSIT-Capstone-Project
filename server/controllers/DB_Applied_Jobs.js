import mysql from "mysql2";

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "bantiloralfrenz",
	database: "job_search_system_db",
});

export const handleAppliedJobs = (req, res) => {
	const jobID = req.body.jobID;
	const applicantID = req.body.applicantID;
	const companyID = req.body.companyID;
	const companyName = req.body.companyName;
	const companyAddress = req.body.companyAddress;
	const jobTitle = req.body.jobTitle;
	const category = req.body.category;
	const reqNoEmp = req.body.reqNoEmp;
	const salary = req.body.salary;
	const jobType = req.body.jobType;
	const prefSex = req.body.prefSex;
	const qualifications = req.body.qualifications;
	const requirements = req.body.requirements;
	const description = req.body.description;
	const employerName = req.body.employerName;
	const companyImage = req.body.companyImage;
	const status = req.body.status;
	const min = req.body.min;
	const hour = req.body.hour;
	const day = req.body.day;
	const month = req.body.month;
	const year = req.body.year;
	const dateApplied = req.body.dateApplied;

	db.query(
		"INSERT INTO applied_jobs (JobID, ApplicantID, CompanyID, Company_Name, Company_Address, Job_Title, Category, Required_Employees, Salary, Job_Type, Preferred_Sex, Job_Qualifications, Job_Requirements, Job_Description, Employer_Name, Company_Image, Active_Status, Minutes, Hour, Day, Month, Year, Date_Applied) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[
			jobID,
			applicantID,
			companyID,
			companyName,
			companyAddress,
			jobTitle,
			category,
			reqNoEmp,
			salary,
			jobType,
			prefSex,
			qualifications,
			requirements,
			description,
			employerName,
			companyImage,
			status,
			min,
			hour,
			day,
			month,
			year,
			dateApplied,
		],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send("Job Posted Successfully...");
				// console.log("Successfully Applied for a Job");
			}
		}
	);
};

export const getAppliedJobs = (req, res) => {
	const applicantID = req.body.applicantID;

	db.query(
		"SELECT * FROM applied_jobs WHERE ApplicantID = ? ORDER BY applied_jobs.Date_Applied DESC, applied_jobs.Year DESC, applied_jobs.Month DESC, applied_jobs.Day DESC, applied_jobs.Hour DESC, applied_jobs.Minutes DESC",
		[applicantID],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
			}
		}
	);
};

export const deleteAppliedJob = (req, res) => {
	const jobID = req.params.id;

	db.query(
		"DELETE FROM applied_jobs WHERE JobID = ?",
		jobID,
		(err, result) => {
			if (err) {
				console.log("deleteAppliedJob:", err);
			} else {
				res.send(result);
				// console.log("Applied Job data has been cleaned");
			}
		}
	);
};

export const account_deleteAppliedJob = (req, res) => {
	const applicantID = req.params.id;

	db.query(
		"DELETE FROM applied_jobs WHERE ApplicantID = ?",
		applicantID,
		(err, result) => {
			if (err) {
				console.log("deleteAppliedJob:", err);
			} else {
				res.send(result);
				// console.log("account_deleteAppliedJob");
			}
		}
	);
};

export const changeAppliedJobPicture = (req, res) => {
	const image = req.body.image;
	const companyID = req.body.companyID;

	db.query(
		"UPDATE applied_jobs SET Company_Image=? WHERE CompanyID=?",
		[image, companyID],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
				// console.log("Successfully updated your company picture");
			}
		}
	);
};

export const updateAppliedJob = (req, res) => {
	const jobID = req.body.jobID;
	const jobTitle = req.body.jobTitle;
	const category = req.body.category;
	const reqNoEmp = req.body.reqNoEmp;
	const salary = req.body.salary;
	const jobType = req.body.jobType;
	const prefSex = req.body.prefSex;
	const qualifications = req.body.qualifications;
	const requirements = req.body.requirements;
	const description = req.body.description;

	db.query(
		"UPDATE applied_jobs SET Job_Title=?, Category=?, Required_Employees=?, Salary=?, Job_Type=?, Preferred_Sex=?, Job_Qualifications=?, Job_Requirements=?, Job_Description=? WHERE JobID=?",
		[
			jobTitle,
			category,
			reqNoEmp,
			salary,
			jobType,
			prefSex,
			qualifications,
			requirements,
			description,
			jobID,
		],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
				// console.log("Successfully updated your applied job");
			}
		}
	);
};

export const updateAppliedJobsBusinessProfile = (req, res) => {
	const companyID = req.body.companyID;
	const companyName = req.body.companyName;
	const companyAddress = req.body.companyAddress;

	db.query(
		"UPDATE applied_jobs SET Company_Name=?, Company_Address=? WHERE CompanyID=?",
		[companyName, companyAddress, companyID],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
				// console.log("Successfully updated your applied jobs profile");
			}
		}
	);
};

export const account_deleteAppliedJobs = (req, res) => {
	const companyID = req.params.id;

	db.query(
		"DELETE FROM applied_jobs WHERE CompanyID = ?",
		companyID,
		(err, result) => {
			if (err) {
				console.log("account_deleteAppliedJobs:", err);
			} else {
				res.send(result);
				// console.log("account_deleteAppliedJobs");
			}
		}
	);
};
