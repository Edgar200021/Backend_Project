const sql = ( 'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER )')

function createProducts (myDatabase) {
	myDatabase.run(sql)
}

module.exports = {createProducts}