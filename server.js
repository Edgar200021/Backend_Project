const express = require('express'),
  sqlite3 = require('sqlite3').verbose(),
  cryptoJS = require('crypto-js'),
  jsonWebToken = require('jsonwebtoken'),
  app = express(),
  port = 3001,
  dataBase = new sqlite3.Database('database.db')

app.use(express.json())

dataBase.run(
  'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL,role TEXT NOT NULL,username TEXT NOT NULL,password TEXT NOT NULL)'
)
dataBase.run(
  'CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY, user_id INTEGER , FOREIGN KEY (user_id) REFERENCES users (id) )'
)
dataBase.run(
  'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price INTEGER )'
)

app.get('/products', (req, res) => {
  dataBase.all('SELECT * FROM products', [], (err, data) => {
    res.send(data)
  })
})

app.get('/products/:id', (req, res) => {
	const id = req.params.id
	dataBase.get("SELECT * FROM products WHERE id = ?", [id], (err, data) => {
		res.send(data)
	})
})

app.post('/new', (req, res) => {
  const name = req.body.name
  const price = req.body.price
  dataBase.run(
    'INSERT INTO products (name,price) VALUES (?, ?)',
    [name, price],
    (err, data) => {
      res.send('Done')
    }
  )
})

app.listen(port)
