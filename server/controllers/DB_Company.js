import mysql from "mysql2";

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "bantiloralfrenz",
	database: "job_search_system_db",
});

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

	db.query(
		"INSERT INTO company (UserID, CompanyID, Company_Name, Street, Zone, Barangay, Contact_Number, Company_Description, Company_Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
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

	db.query(
		"INSERT INTO company (UserID, CompanyID, Company_Name, Street, Zone, Barangay, Contact_Number, Employer_Name, Company_Description, Company_Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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

	db.query(
		"UPDATE company SET Company_Name=?, Employer_Name=?, Street=?, Zone=?, Barangay=?, Contact_Number=?, Company_Description=?, Company_Image=? WHERE UserID=? AND CompanyID=?",
		[
			companyName,
			employerName,
			street,
			zone,
			barangay,
			contactNumber,
			companyDescription,
			companyImage,
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

	db.query(
		"UPDATE company SET Employer_Name=?, Street=?, Zone=?, Barangay=?, Contact_Number=?, Company_Name=?, Company_Description=? WHERE CompanyID=?",
		[
			employerName,
			street,
			zone,
			barangay,
			contactNumber,
			companyName,
			companyDescription,
			companyID,
		],
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
