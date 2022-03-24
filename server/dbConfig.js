import mysql from "mysql2";

// class dbConfig {
// 	constructor() {
// 		this.databaseConnection = undefined;
// 	}

// 	getConnection() {
// 		databaseConnection = mysql.createConnection({
// 			user: process.env.PORT ? "b58454bd4a7cc9" : "root",
// 			password: process.env.PORT ? "1684a61d" : "bantiloralfrenz",
// 			host: process.env.PORT ? "us-cdbr-east-05.cleardb.net" : "localhost",
// 			database: process.env.PORT
// 				? "heroku_e973498db39f7ce"
// 				: "job_search_system_db",
// 		});

// 		return this.databaseConnection;
// 	}
// }

// export default new dbConfig();

module.exports.dbConfig = function () {
	mysql.createConnection({
		user: process.env.PORT ? "b58454bd4a7cc9" : "root",
		password: process.env.PORT ? "1684a61d" : "bantiloralfrenz",
		host: process.env.PORT ? "us-cdbr-east-05.cleardb.net" : "localhost",
		database: process.env.PORT
			? "heroku_e973498db39f7ce"
			: "job_search_system_db",
	});
};
