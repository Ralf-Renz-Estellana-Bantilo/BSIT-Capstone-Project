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

export const createApplicantData = (req, res) => {
	const userID = req.body.userID;
	const applicantID = req.body.applicantID;
	const firstName = req.body.firstName;
	const middleName = req.body.middleName;
	const lastName = req.body.lastName;
	const role = req.body.role;
	const sex = req.body.sex;
	const homeAddress = req.body.homeAddress;
	const userImage = req.body.userImage;
	const emailAddress = req.body.emailAddress;
	const contactNumber = req.body.contactNumber;
	const bMonth = req.body.bMonth;
	const bDay = req.body.bDay;
	const bYear = req.body.bYear;
	const civilStatus = req.body.civilStatus;
	const educationalAttainment = req.body.educationalAttainment;
	const hiringStatus = req.body.hiringStatus;
	const day = new Date().getDate();
	const month = new Date().getMonth() + 1;
	const year = new Date().getFullYear();

	db.query(
		"INSERT INTO applicant (UserID, ApplicantID, First_Name, Middle_Name, Last_Name, Role, Sex, Home_Address, User_Image, Email_Address, Contact_Number, B_Month, B_Day, B_Year, Civil_Status, Educ_Attainment, Hiring_Status, Reg_Day, Reg_Month, Reg_Year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[
			userID,
			applicantID,
			firstName,
			middleName,
			lastName,
			role,
			sex,
			homeAddress,
			userImage,
			emailAddress,
			contactNumber,
			bMonth,
			bDay,
			bYear,
			civilStatus,
			educationalAttainment,
			hiringStatus,
			day,
			month,
			year,
		],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Values inserted...");
				// console.log("Successfully Inserted Applicant Data");
			}
		}
	);
};

export const getApplicantData = (req, res) => {
	db.query("SELECT * FROM applicant", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
};

export const changeApplicantPicture = (req, res) => {
	const image = req.body.image;
	const userID = req.body.userID;

	db.query(
		"UPDATE applicant SET User_Image=? WHERE UserID=?",
		[image, userID],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
				// console.log("Successfully updated your applicant profile");
			}
		}
	);
};

export const updateApplicantHiringStatus = (req, res) => {
	const hiringStatus = req.body.hiringStatus;
	const userID = req.body.userID;

	db.query(
		"UPDATE applicant SET Hiring_Status=? WHERE UserID=?",
		[hiringStatus, userID],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
				// console.log("Toggle Hiring Status");
			}
		}
	);
};

export const updateJobProfile = (req, res) => {
	const userID = req.body.userID;
	const firstName = req.body.firstName;
	const middleName = req.body.middleName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const bMonth = req.body.bMonth;
	const bDay = req.body.bDay;
	const bYear = req.body.bYear;
	const sex = req.body.sex;
	const contactNumber = req.body.contactNumber;
	const address = req.body.address;
	const civilStatus = req.body.civilStatus;
	const educationalAttainment = req.body.educationalAttainment;
	const preferredJob = req.body.preferredJob;
	const preferredCategory = req.body.preferredCategory;
	const preferredSalaryMin = req.body.preferredSalaryMin;
	const preferredSalaryMax = req.body.preferredSalaryMax;
	const interest = req.body.interest;
	const goodAt = req.body.goodAt;
	const credentials = req.body.credentials;
	const disability = req.body.disability;
	const employmentStatus = req.body.employmentStatus;
	const employmentType = req.body.employmentType;
	const resume = req.body.resume;

	db.query(
		"UPDATE applicant SET First_Name=?, Middle_Name=?, Last_Name=?, Email_Address=?, B_Month=?, B_Day=?, B_Year=?, Sex=?, Contact_Number=?,Home_Address=?, Civil_Status=?, Educ_Attainment=?, Preferred_Job=?, Preferred_Category=?, Minimum_Salary=?, Maximum_Salary=?, My_Resume=?, Interested_In=?, Good_At=?, Credentials=?, Disability=?, Employment_Status=?, Employment_Type=? WHERE UserID=?",
		[
			firstName,
			middleName,
			lastName,
			email,
			bMonth,
			bDay,
			bYear,
			sex,
			contactNumber,
			address,
			civilStatus,
			educationalAttainment,
			preferredJob,
			preferredCategory,
			preferredSalaryMin,
			preferredSalaryMax,
			resume,
			interest,
			goodAt,
			credentials,
			disability,
			employmentStatus,
			employmentType,
			userID,
		],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
				// console.log("Successfully updated job applicant data");
			}
		}
	);
};

export const getApplicantID = (req, res) => {
	const userID = req.body.userID;

	db.query(
		"SELECT ApplicantID FROM applicant WHERE UserID=?",
		[userID],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
};

export const account_deleteApplicant = (req, res) => {
	const applicantID = req.params.id;

	db.query(
		"DELETE FROM applicant WHERE ApplicantID = ?",
		applicantID,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
				// console.log("account_deleteApplicant");
			}
		}
	);
};
