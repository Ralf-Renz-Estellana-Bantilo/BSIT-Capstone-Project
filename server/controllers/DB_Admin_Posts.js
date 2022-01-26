import mysql from "mysql2";

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "bantiloralfrenz",
	database: "job_search_system_db",
});

export const createAdminPost = (req, res) => {
	const adminID = req.body.adminID;
	const companyID = req.body.companyID;
	const jobID = req.body.jobID;
	const companyName = req.body.companyName;
	const username = req.body.username;
	const password = req.body.password;

	db.query(
		"INSERT INTO admin_posts (AdminID, CompanyID, JobID, Company_Name, Username, Password) VALUES (?, ?, ?, ?, ?, ?)",
		[adminID, companyID, jobID, companyName, username, password],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send("Job Posted Successfully...");
			}
		}
	);
};

export const getAdminPosts = (req, res) => {
	db.query("SELECT * FROM admin_posts ", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
};

export const account_deleteAdminPosts = (req, res) => {
	const userID = req.params.id;

	db.query(
		"DELETE FROM user_account WHERE UserID = ?",
		userID,
		(err, result) => {
			if (err) {
				console.log("deleteAppliedJob:", err);
			} else {
				res.send(result);
				// console.log("account_deleteUserAccount");
			}
		}
	);
};
