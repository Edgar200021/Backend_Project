const sql = ('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL,role TEXT NOT NULL,username TEXT NOT NULL,password TEXT NOT NULL)')

function createUsers (myDatabase) {
	myDatabase.run(sql)
}

module.exports = {createUsers}