import { createConnection } from "mysql2";
let db;
function connectToDatabase() {
	db = createConnection({
		// custom configuration ----------
		user: process.env.PORT ? "b58454bd4a7cc9" : "root",
		password: process.env.PORT ? "1684a61d" : "bantiloralfrenz",
		host: process.env.PORT ? "us-cdbr-east-05.cleardb.net" : "localhost",
		database: process.env.PORT
			? "heroku_e973498db39f7ce"
			: "job_search_system_db",
	});

	db.on("error", function (err) {
		console.log("db error", err);
		if (err.code === "PROTOCOL_CONNECTION_LOST") {
			connectToDatabase();
		} else {
			throw err;
		}
	});
}

connectToDatabase();

export default db;
