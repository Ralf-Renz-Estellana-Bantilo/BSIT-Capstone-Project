import mysql from "mysql2";
import bcrypt from "bcrypt";
const saltRounds = 11;

const db = mysql.createConnection({
	// user: "root",
	// host: "localhost",
	// password: "bantiloralfrenz",
	// database: "job_search_system_db",

	username: "b58454bd4a7cc9",
	password: "1684a61d",
	host: "us-cdbr-east-05.cleardb.net",
	database: "heroku_e973498db39f7ce",
});

export const createUser = (req, res) => {
	const userID = req.body.userID;
	const firstName = req.body.firstName;
	const middleName = req.body.middleName;
	const lastName = req.body.lastName;
	const sex = req.body.sex;
	const role = req.body.role;
	const username = req.body.username;
	const password = req.body.password;
	const userImage = req.body.userImage;

	bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
		db.query(
			"INSERT INTO user_account (UserID, First_Name, Middle_Name, Last_Name, Sex, Role, Username, Password, User_Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[
				userID,
				firstName,
				middleName,
				lastName,
				sex,
				role,
				username,
				hashedPassword,
				userImage,
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
	});
};

export const getJobSeekerUsers = (req, res) => {
	db.query(
		"SELECT * FROM user_account WHERE Role='Job Seeker'",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
};

export const getEmployerUsers = (req, res) => {
	db.query(
		"SELECT * FROM user_account WHERE Role='Employer'",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
};

export const getAdminUsers = (req, res) => {
	db.query("SELECT * FROM user_account WHERE Role='Admin'", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
};

export const login = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const role = req.body.role;

	db.query(
		"SELECT * FROM user_account WHERE Role = ? AND Username = ?",
		[role, username],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				try {
					if (result.length === 1) {
						bcrypt.compare(
							password,
							result[0].Password,
							(error, response) => {
								if (response) {
									res.send(result);
								} else {
									res.send("Wrong Username/Password Combination...");
								}
							}
						);
					} else if (result.length > 1) {
						for (let a = 0; a < result.length; a++) {
							bcrypt.compare(
								password,
								result[a].Password,
								(error, response) => {
									try {
										if (response) {
											res.send(Array(result[a]));
										}
										if (error) {
											console.log(error);
										}
									} catch (catcherror) {
										console.log(catcherror);
									}
								}
							);
						}
					} else {
						res.send("User does not exist!");
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
	);
};

export const retainUser = (req, res) => {
	const userID = req.body.userID;

	db.query(
		"SELECT * FROM user_account WHERE UserID = ?",
		[userID],
		(err, result) => {
			if (result.length > 0) {
				res.send(result);
			} else {
				res.send("Couldnt find user!");
			}
		}
	);
};

export const changeAccountPicture = (req, res) => {
	const image = req.body.image;
	const userID = req.body.userID;

	db.query(
		"UPDATE user_account SET User_Image=? WHERE UserID=?",
		[image, userID],
		(err, result) => {
			if (err) {
				console.log("Error:", err);
			} else {
				res.send(result);
				// console.log("Successfully updated your profile");
			}
		}
	);
};

export const account_deleteUserAccount = (req, res) => {
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

export const updateUserAccountBusinessProfile = (req, res) => {
	const userID = req.body.userID;
	const firstName = req.body.firstName;
	const middleName = req.body.middleName;
	const lastName = req.body.lastName;

	db.query(
		"UPDATE user_account SET First_Name=?, Middle_Name=?, Last_Name=? WHERE UserID=?",
		[firstName, middleName, lastName, userID],
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

export const updateUsernameAndPassword = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const userID = req.body.userID;

	bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
		db.query(
			"UPDATE user_account SET Username=?, Password=? WHERE UserID=?",
			[username, hashedPassword, userID],
			(err, result) => {
				if (err) {
					console.log("Error:", err);
				} else {
					res.send(result);
					// console.log("Successfully updated your applied jobs profile");
				}
			}
		);
	});
};

export const checkExistingUsernames = (req, res) => {
	const username = req.body.username;
	const role = req.body.role;

	db.query(
		"SELECT * FROM user_account WHERE Username = ? AND Role = ?",
		[username, role],
		(err, result) => {
			if (err) {
				res.send("Couldnt find user!");
			} else {
				res.send(result);
			}
		}
	);
};
