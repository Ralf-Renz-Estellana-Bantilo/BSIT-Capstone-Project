import mysql from "mysql2";

let db;
function connectToDatabase() {
	db = mysql.createConnection({
		// development configuration ----------
		// user: "root",
		// password: "bantiloralfrenz",
		// host: "localhost",
		// database: "job_search_system_db",

		// production configuration ----------
		// user: "b58454bd4a7cc9",
		// password: "1684a61d",
		// host: "us-cdbr-east-05.cleardb.net",
		// database: "heroku_e973498db39f7ce",

		// custom configuration ----------
		user: process.env.PORT ? "b58454bd4a7cc9" : "root",
		password: process.env.PORT ? "1684a61d" : "bantiloralfrenz",
		host: process.env.PORT ? "us-cdbr-east-05.cleardb.net" : "localhost",
		database: process.env.PORT
			? "heroku_e973498db39f7ce"
			: "job_search_system_db",
	});

	// db.connect((err) => {
	// 	if (err) {
	// 		console.log("Cannot connect to the database...", err);
	// 	} else {
	// 		console.log("MySQL connection successfully stablished...");
	// 	}
	// });

	db.on("error", function (err) {
		console.log("db error", err);
		if (err.code === "PROTOCOL_CONNECTION_LOST") {
			// Connection to the MySQL server is usually
			connectToDatabase(); // lost due to either server restart, or a
		} else {
			// connnection idle timeout (the wait_timeout
			throw err; // server variable configures this)
		}
	});
}

connectToDatabase();

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
	const placeOfWork = req.body.placeOfWork;
	const reqNoEmp = req.body.reqNoEmp;
	const minSalary = req.body.minSalary;
	const maxSalary = req.body.maxSalary;
	const civilStatus = req.body.civilStatus;
	const jobType = req.body.jobType;
	const prefSex = req.body.prefSex;
	const qualifications = req.body.qualifications;
	const requirements = req.body.requirements;
	const description = req.body.description;
	const employerName = req.body.employerName;
	const companyImage = req.body.companyImage;
	const contactPersonName = req.body.contactPersonName;
	const contactPersonPosition = req.body.contactPersonPosition;
	const contactPersonNumber = req.body.contactPersonNumber;
	const contactPersonEmail = req.body.contactPersonEmail;
	const status = req.body.status;

	db.query(
		"INSERT INTO job_posts (JobID, CompanyID, Company_Name, Minutes, Hour, Day, Month, Year, Date_Posted, Company_Address, Job_Title, Category, Work_Place, Required_Employees, Minimum_Salary, Maximum_Salary, Civil_Status, Job_Type, Preferred_Sex, Active_Status, Job_Qualifications, Job_Requirements, Job_Description, Employer_Name, Company_Image, Contact_Person_Name, Contact_Person_Position, Contact_Person_Number,Contact_Person_Email, Is_Deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Visible')",
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
			placeOfWork,
			reqNoEmp,
			minSalary,
			maxSalary,
			civilStatus,
			jobType,
			prefSex,
			status,
			qualifications,
			requirements,
			description,
			employerName,
			companyImage,
			contactPersonName,
			contactPersonPosition,
			contactPersonNumber,
			contactPersonEmail,
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
	const companyID = req.body.companyID;
	const jobID = req.body.jobID;

	db.query(
		"UPDATE job_posts SET Is_Deleted='Deleted' WHERE CompanyID=? AND JobID=?",
		[companyID, jobID],
		(err, result) => {
			if (err) {
				console.log("deleteCompanyPost:", err);
			} else {
				res.send(result);
				console.log("Successfully deleted a job post");
			}
		}
	);
};

// export const deleteCompanyPost = (req, res) => {
// 	const jobID = req.params.id;

// 	db.query("DELETE FROM job_posts WHERE JobID = ?", jobID, (err, result) => {
// 		if (err) {
// 			console.log("deleteCompanyPost:", err);
// 		} else {
// 			res.send(result);
// 			// console.log("Successfully deleted a post");
// 		}
// 	});
// };

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
	const minSalary = req.body.minSalary;
	const maxSalary = req.body.maxSalary;
	const civilStatus = req.body.civilStatus;
	const placeOfWork = req.body.placeOfWork;
	const jobType = req.body.jobType;
	const prefSex = req.body.prefSex;
	const qualifications = req.body.qualifications;
	const requirements = req.body.requirements;
	const description = req.body.description;
	const contactPersonName = req.body.contactPersonName;
	const contactPersonPosition = req.body.contactPersonPosition;
	const contactPersonNumber = req.body.contactPersonNumber;
	const contactPersonEmail = req.body.contactPersonEmail;

	db.query(
		"UPDATE job_posts SET Job_Title=?, Category=?, Required_Employees=?, Minimum_Salary=?, Maximum_Salary=?, Civil_Status=?, Work_Place=?, Job_Type=?, Preferred_Sex=?, Job_Qualifications=?, Job_Requirements=?, Job_Description=?, Contact_Person_Name=?, Contact_Person_Position=?, Contact_Person_Number=?, Contact_Person_Email=? WHERE JobID=?",
		[
			jobTitle,
			category,
			reqNoEmp,
			minSalary,
			maxSalary,
			civilStatus,
			placeOfWork,
			jobType,
			prefSex,
			qualifications,
			requirements,
			description,
			contactPersonName,
			contactPersonPosition,
			contactPersonNumber,
			contactPersonEmail,
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
