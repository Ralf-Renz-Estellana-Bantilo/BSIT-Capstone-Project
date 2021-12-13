import mysql from "mysql2";

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "bantiloralfrenz",
	database: "job_search_system_db",
});

export const getEmployerFeedBacks = (req, res) => {
	db.query(
		"SELECT * FROM employer_feedback ORDER BY employer_feedback.Date_Replied DESC, employer_feedback.Year DESC, employer_feedback.Month DESC, employer_feedback.Day DESC, employer_feedback.Hour DESC, employer_feedback.Minutes DESC",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
};

export const getEmployerFeedBack_JobSeeker = (req, res) => {
	const applicantID = req.body.applicantID;

	db.query(
		"SELECT * FROM employer_feedback WHERE ApplicantID = ? ORDER BY employer_feedback.Date_Replied DESC, employer_feedback.Year DESC, employer_feedback.Month DESC, employer_feedback.Day DESC, employer_feedback.Hour DESC, employer_feedback.Minutes DESC",
		[applicantID],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
};

export const getEmployerFeedBack_Employer = (req, res) => {
	const companyID = req.body.companyID;

	db.query(
		"SELECT * FROM employer_feedback WHERE CompanyID = ? ORDER BY employer_feedback.Date_Replied DESC, employer_feedback.Year DESC, employer_feedback.Month DESC, employer_feedback.Day DESC, employer_feedback.Hour DESC, employer_feedback.Minutes DESC",
		// "SELECT * FROM employer_feedback WHERE CompanyID = ? AND Type = 'recruit' ORDER BY employer_feedback.Date_Replied DESC, employer_feedback.Year DESC, employer_feedback.Month DESC, employer_feedback.Day DESC, employer_feedback.Hour DESC, employer_feedback.Minutes DESC"
		[companyID],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
};

export const getApplicantResponse = (req, res) => {
	const applicantID = req.body.applicantID;
	const companyID = req.body.companyID;
	const jobID = req.body.jobID;

	db.query(
		"SELECT Message FROM employer_feedback WHERE ApplicantID=? AND CompanyID=? AND JobID=?",
		[applicantID, companyID, jobID],
		(err, result) => {
			if (err) {
				console.log("getApplicantResponse:", err);
			} else {
				res.send(result);
			}
		}
	);
};

export const addEmployerFeedBack = (req, res) => {
	const feedbackID = req.body.feedbackID;
	const applicantID = req.body.applicantID;
	const companyID = req.body.companyID;
	const jobID = req.body.jobID;
	const companyImage = req.body.companyImage;
	const companyName = req.body.companyName;
	const jobTitle = req.body.jobTitle;
	const companyAddress = req.body.companyAddress;
	const min = req.body.min;
	const hour = req.body.hour;
	const day = req.body.day;
	const month = req.body.month;
	const year = req.body.year;
	const dateReplied = req.body.dateReplied;
	const applicationStatus = req.body.applicationStatus;
	const status = req.body.status;
	const type = req.body.type;
	const message = req.body.message;

	db.query(
		"INSERT INTO employer_feedback (FeedbackID, ApplicantID,  CompanyID, JobID, Company_Image, Company_Name, Job_Title, Company_Address, Minutes, Hour, Day, Month, Year, Date_Replied, Application_Status, Status, Type, Message ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[
			feedbackID,
			applicantID,
			companyID,
			jobID,
			companyImage,
			companyName,
			jobTitle,
			companyAddress,
			min,
			hour,
			day,
			month,
			year,
			dateReplied,
			applicationStatus,
			status,
			type,
			message,
		],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send("Job Posted Successfully...");
				console.log("Successfully Added a Feedback");
			}
		}
	);
};

export const updateNotificationStatus = (req, res) => {
	const feedbackID = req.body.feedbackID;

	db.query(
		"UPDATE employer_feedback SET Status = 'Seen' WHERE FeedbackID=?",
		[feedbackID],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
				console.log("Successfully updated the notification Status");
			}
		}
	);
};

export const account_deleteFeedback = (req, res) => {
	const applicantID = req.params.id;

	db.query(
		"DELETE FROM employer_feedback WHERE ApplicantID = ?",
		applicantID,
		(err, result) => {
			if (err) {
				console.log("deleteAppliedJob:", err);
			} else {
				res.send(result);
				console.log("account_deleteApplicant");
			}
		}
	);
};

export const changeEmployerFeedbackPicture = (req, res) => {
	const image = req.body.image;
	const companyID = req.body.companyID;

	db.query(
		"UPDATE employer_feedback SET Company_Image=? WHERE CompanyID=?",
		[image, companyID],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
				console.log("Successfully updated your company picture");
			}
		}
	);
};

export const updateFeedbackBusinessProfile = (req, res) => {
	const companyID = req.body.companyID;
	const companyName = req.body.companyName;
	const companyAddress = req.body.companyAddress;

	db.query(
		"UPDATE employer_feedback SET Company_Name=?, Company_Address=? WHERE CompanyID=?",
		[companyName, companyAddress, companyID],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
				console.log("Successfully updated your feedback profile");
			}
		}
	);
};

export const account_deleteEmployerFeedback = (req, res) => {
	const companyID = req.params.id;

	db.query(
		"DELETE FROM employer_feedback WHERE CompanyID = ?",
		companyID,
		(err, result) => {
			if (err) {
				console.log("account_deleteEmployerFeedback:", err);
			} else {
				res.send(result);
				console.log("account_deleteEmployerFeedback");
			}
		}
	);
};
