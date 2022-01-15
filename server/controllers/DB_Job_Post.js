import mysql from "mysql2";

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "bantiloralfrenz",
	database: "job_search_system_db",
});

export const getJobPosts = (req, res) => {
	db.query(
		"SELECT * FROM job_posts ORDER BY job_posts.Date_Posted DESC, job_posts.Year DESC, job_posts.Month DESC, job_posts.Day DESC, job_posts.Hour DESC, job_posts.Minutes DESC",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
};

export const createJobPost = (req, res) => {
	const jobID = req.body.jobID;
	const companyID = req.body.companyID;
	const companyName = req.body.companyName;
	const min = req.body.min;
	const hour = req.body.hour;
	const day = req.body.day;
	const month = req.body.month;
	const year = req.body.year;
	const datePosted = req.body.datePosted;
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

	db.query(
		"INSERT INTO job_posts (JobID, CompanyID, Company_Name, Minutes, Hour, Day, Month, Year, Date_Posted, Company_Address, Job_Title, Category, Required_Employees, Salary, Job_Type, Preferred_Sex,Active_Status, Job_Qualifications, Job_Requirements, Job_Description, Employer_Name, Company_Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[
			jobID,
			companyID,
			companyName,
			min,
			hour,
			day,
			month,
			year,
			datePosted,
			companyAddress,
			jobTitle,
			category,
			reqNoEmp,
			salary,
			jobType,
			prefSex,
			status,
			qualifications,
			requirements,
			description,
			employerName,
			companyImage,
		],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send("Job Posted Successfully...");
				// console.log("Successfully Inserted data");
			}
		}
	);
};

export const getCompanyJobPosts = (req, res) => {
	const companyID = req.body.companyID;

	db.query(
		"SELECT * FROM job_posts WHERE CompanyID = ? ORDER BY job_posts.Date_Posted DESC, job_posts.Year DESC, job_posts.Month DESC, job_posts.Day DESC, job_posts.Hour DESC, job_posts.Minutes DESC",
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

export const getCompanyJobPost = (req, res) => {
	const companyID = req.body.companyID;
	const jobID = req.body.jobID;

	db.query(
		"SELECT * FROM job_posts WHERE CompanyID = ? AND JobID = ?",
		[companyID, jobID],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
			}
		}
	);
};

export const deleteCompanyPost = (req, res) => {
	const jobID = req.params.id;

	db.query("DELETE FROM job_posts WHERE JobID = ?", jobID, (err, result) => {
		if (err) {
			console.log("deleteCompanyPost:", err);
		} else {
			res.send(result);
			// console.log("Successfully deleted a post");
		}
	});
};

export const changeJobPostPicture = (req, res) => {
	const image = req.body.image;
	const companyID = req.body.companyID;

	db.query(
		"UPDATE job_posts SET Company_Image=? WHERE CompanyID=?",
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

export const updateJobPost = (req, res) => {
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
		"UPDATE job_posts SET Job_Title=?, Category=?, Required_Employees=?, Salary=?, Job_Type=?, Preferred_Sex=?, Job_Qualifications=?, Job_Requirements=?, Job_Description=? WHERE JobID=?",
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
				// console.log("Successfully updated your job post");
			}
		}
	);
};

export const updateActiveStatus = (req, res) => {
	const jobID = req.body.jobID;

	db.query(
		"UPDATE job_posts SET Active_Status='Closed' WHERE JobID=?",
		[jobID],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
				// console.log("Successfully updated the Active Status");
			}
		}
	);
};

export const updateJobPostBusinessProfile = (req, res) => {
	const companyID = req.body.companyID;
	const companyName = req.body.companyName;
	const companyAddress = req.body.companyAddress;

	db.query(
		"UPDATE job_posts SET Company_Name=?, Company_Address=? WHERE CompanyID=?",
		[companyName, companyAddress, companyID],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
				// console.log("Successfully updated your job post business profile");
			}
		}
	);
};

export const account_deleteJobPosts = (req, res) => {
	const companyID = req.params.id;

	db.query(
		"DELETE FROM job_posts WHERE CompanyID = ?",
		companyID,
		(err, result) => {
			if (err) {
				console.log("account_deleteJobPosts:", err);
			} else {
				res.send(result);
				// console.log("account_deleteJobPosts");
			}
		}
	);
};
