import mysql from "mysql2";

let db;
function connectToDatabase() {
	db = mysql.createConnection({
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
			// Connection to the MySQL server is usually
			connectToDatabase(); // lost due to either server restart, or a
		} else {
			// connnection idle timeout (the wait_timeout
			throw err; // server variable configures this)
		}
	});
}

connectToDatabase();

export const masterselect = (req, res) => {
	const { table } = req.body;
	const { filter } = req.body;
	const { column } = req.body;
	const { sort } = req.body;

	let filterData = "1";
	let columnData = "*";
	let sortData = ";";

	if (filter) {
		if (Object.keys(filter).length > 0) {
			const filterKeys = Object.keys(filter);
			const filterValues = Object.values(filter);

			let result = [];
			for (let a = 0; a < filterKeys.length; a++) {
				const holdResult = `${filterKeys[a]} = '${filterValues[a]}'`;
				result.push(holdResult);
			}
			let construct = result.join(" AND ");
			filterData = construct;
		}
	}

	if (column) {
		if (Object.keys(column).length > 0) {
			columnData = column;
		}
	}

	if (sort) {
		if (Object.keys(sort).length > 0) {
			let orderBy = [];
			for (let a = 0; a < Object.keys(sort).length; a++) {
				const key = Object.keys(sort)[a];
				const value = Object.values(sort)[a];
				orderBy.push(`${key} ${value}`);
			}
			const construct = "ORDER BY " + orderBy.join(", ");
			sortData = construct;
		}
	}

	db.query(
		`SELECT ${columnData} FROM ${table} WHERE ${filterData} ${sortData}`,
		(err, result) => {
			if (err) {
				throw err;
			} else {
				res.send(result);
			}
		}
	);
};

export const masterdata = async (req, res) => {
	const { tables } = req.body;
	let responseArray = [];
	await new Promise(function (resolve, reject) {
		let e;

		for (let a = 0; a < tables.length; a++) {
			const table = tables[a];
			db.query("SELECT * FROM " + table, function (err, rows, fields) {
				if (e) {
					return;
				}

				if (!err) {
					responseArray = { ...responseArray, [table]: rows };
				} else {
					e = true;
					return reject(err);
				}

				if (a == tables.length - 1) {
					resolve(responseArray);
					res.send(responseArray);
				}
			});
		}
	});
};

export const insertData = async (req, res) => {
	const { table } = req.body;
	const { values } = req.body;

	let fieldsNum = [];
	let key = Object.keys(values);
	let value = Object.values(values);

	for (let a = 0; a < key.length; a++) {
		fieldsNum.push("?");
	}

	const query = `INSERT INTO ${table} (${key.join(
		", "
	)}) VALUES (${fieldsNum.join(", ")})`;

	db.query(query, value, (err, result) => {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
};

export const bulkInsert = async (req, res) => {
	const { table } = req.body;
	const { columns } = req.body;
	const { values } = req.body;

	const query = `INSERT INTO ${table} (${columns}) VALUES ?`;

	db.query(query, [values], (err, result) => {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
};

export const updateData = async (req, res) => {
	const { table } = req.body;
	const { values } = req.body;
	const { key } = req.body;

	let fieldsNum = [];
	let columns = Object.keys(values);
	let value = Object.values(values);

	for (let a = 0; a < columns.length; a++) {
		fieldsNum.push(`${columns[a]} = ?`);
	}

	const query = `UPDATE ${table} SET ${fieldsNum.join(
		", "
	)} WHERE ${Object.keys(key)} = ${Object.values(key)}`;

	db.query(query, value, (err, result) => {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
};
