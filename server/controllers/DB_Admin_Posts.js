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
				console.log(err);
			} else {
				res.send(result);
				// console.log("account_deleteUserAccount");
			}
		}
	);
};
