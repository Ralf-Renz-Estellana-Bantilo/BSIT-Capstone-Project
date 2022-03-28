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

export const getAllCompanies = (req, res) => {
	db.query("SELECT * FROM company", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
};

export const createCompanyData = (req, res) => {
	const userID = req.body.userID;
	const companyID = req.body.companyID;
	const companyName = req.body.companyName;
	const street = req.body.street;
	const zone = req.body.zone;
	const barangay = req.body.barangay;
	const contactNumber = req.body.contactNumber;
	const companyDescription = req.body.companyDescription;
	const companyImage = req.body.companyImage;
	const day = new Date().getDate();
	const month = new Date().getMonth() + 1;
	const year = new Date().getFullYear();

	db.query(
		"INSERT INTO company (UserID, CompanyID, Company_Name, Street, Zone, Barangay, Contact_Number, Company_Description, Company_Image, Reg_Day, Reg_Month, Reg_Year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[
			userID,
			companyID,
			companyName,
			street,
			zone,
			barangay,
			contactNumber,
			companyDescription,
			companyImage,
			day,
			month,
			year,
		],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send("Values inserted...");
				// console.log("Successfully Inserted data");
			}
		}
	);
};

export const createCompanyDataAdmin = (req, res) => {
	const userID = req.body.userID;
	const companyID = req.body.companyID;
	const companyName = req.body.companyName;
	const street = req.body.street;
	const zone = req.body.zone;
	const barangay = req.body.barangay;
	const employerName = req.body.employerName;
	const contactNumber = req.body.contactNumber;
	const companyDescription = req.body.companyDescription;
	const companyImage = req.body.companyImage;
	const acronym = req.body.acronym;
	const employerType = req.body.employerType;
	const workForce = req.body.workForce;
	const emailAddress = req.body.emailAddress;
	const day = new Date().getDate();
	const month = new Date().getMonth() + 1;
	const year = new Date().getFullYear();

	db.query(
		"INSERT INTO company (UserID, CompanyID, Company_Name, Street, Zone, Barangay, Contact_Number, Employer_Name, Company_Description, Company_Image, Company_Acronym, Employer_Type, Work_Force, Email_Address, Reg_Day, Reg_Month, Reg_Year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[
			userID,
			companyID,
			companyName,
			street,
			zone,
			barangay,
			contactNumber,
			employerName,
			companyDescription,
			companyImage,
			acronym,
			employerType,
			workForce,
			emailAddress,
			day,
			month,
			year,
		],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send("Values inserted...");
				// console.log("Successfully Inserted data");
			}
		}
	);
};

export const getCompanyData = (req, res) => {
	const userID = req.body.userID;

	db.query(
		"SELECT * FROM company WHERE UserID = ?",
		[userID],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
			}
		}
	);
};

export const getCompanyDetails = (req, res) => {
	const companyID = req.body.companyID;

	db.query(
		"SELECT * FROM company WHERE CompanyID = ?",
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

export const insertCompanyData = (req, res) => {
	const companyName = req.body.companyName;
	const employerName = req.body.employerName;
	const street = req.body.street;
	const zone = req.body.zone;
	const barangay = req.body.barangay;
	const contactNumber = req.body.contactNumber;
	const companyDescription = req.body.companyDescription;
	const companyImage = req.body.companyImage;
	const userID = req.body.userID;
	const companyID = req.body.companyID;
	const acronym = req.body.acronym;
	const employerType = req.body.employerType;
	const workForce = req.body.workForce;
	const emailAddress = req.body.emailAddress;

	db.query(
		"UPDATE company SET Company_Name=?, Employer_Name=?, Street=?, Zone=?, Barangay=?, Contact_Number=?, Company_Description=?, Company_Image=?, Company_Acronym=?, Employer_Type=?, Work_Force=?, Email_Address=? WHERE UserID=? AND CompanyID=?",
		[
			companyName,
			employerName,
			street,
			zone,
			barangay,
			contactNumber,
			companyDescription,
			companyImage,
			acronym,
			employerType,
			workForce,
			emailAddress,
			userID,
			companyID,
		],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
				// console.log("Successfully updated the data");
			}
		}
	);
};

export const getCompanyID = (req, res) => {
	const userID = req.body.userID;

	db.query(
		"SELECT CompanyID FROM company WHERE UserID=?",
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

export const changeCompanyPicture = (req, res) => {
	const image = req.body.image;
	const companyID = req.body.companyID;

	db.query(
		"UPDATE company SET Company_Image=? WHERE CompanyID=?",
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

export const updateCompanyBusinessProfile = (req, res) => {
	const companyID = req.body.companyID;
	const employerName = req.body.employerName;
	const street = req.body.street;
	const zone = req.body.zone;
	const barangay = req.body.barangay;
	const contactNumber = req.body.contactNumber;
	const companyName = req.body.companyName;
	const companyDescription = req.body.companyDescription;
	const emailAddress = req.body.emailAddress;
	const acronym = req.body.acronym;
	const employerType = req.body.employerType;
	const workForce = req.body.workForce;

	db.query(
		"UPDATE company SET Employer_Name=?, Street=?, Zone=?, Barangay=?, Contact_Number=?, Company_Name=?, Company_Description=?, Company_Acronym=?, Employer_Type=?, Work_Force=?, Email_Address=? WHERE CompanyID=?",
		[
			employerName,
			street,
			zone,
			barangay,
			contactNumber,
			companyName,
			companyDescription,
			acronym,
			employerType,
			workForce,
			emailAddress,
			companyID,
		],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
				// console.log("Successfully updated your company profile");
			}
		}
	);
};

export const account_deleteCompany = (req, res) => {
	const userID = req.params.id;

	db.query("DELETE FROM company WHERE UserID = ?", userID, (err, result) => {
		if (err) {
			console.log("account_deleteCompany:", err);
		} else {
			res.send(result);
			// console.log("account_deleteCompany");
		}
	});
};
