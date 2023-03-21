const sqlite3 = require('sqlite3').verbose(),
  dataBase = new sqlite3.Database('database.db'),
  cryptoJS = require('crypto-js'),
  token_generate = require('../json-web-token/token_generate')

function getData(req, res) {
  dataBase.all('SELECT * FROM products', [], (err, data) => {
    res.send(data)
  })
}

function getDataId(req, res) {
  const id = req.params.id
  dataBase.get('SELECT * FROM products WHERE id = ?', [id], (err, data) => {
    res.send(data)
  })
}

function postData(req, res) {
  const name = req.body.name,
    price = req.body.price
  dataBase.run(
    'INSERT INTO products (name,price) VALUES (?, ?)',
    [name, price],
    (err, data) => {
      res.send('Done')
    }
  )
}

function putData(req, res) {
  const name = req.body.name,
    price = req.body.price,
    id = req.params.id
  dataBase.run(
    'UPDATE products SET name = ?, price = ? WHERE id = ?',
    [name, price, id],
    (err, data) => {
      res.send('Done')
    }
  )
}

function deleteData (req, res) {
	const id = req.params.id
	dataBase.run('DELETE FROM products WHERE id = ?', [id], (err, data) => {
	  res.send('Done')
	})
}

function registerUser(req, res) {
    const username = req.body.username,
		password = req.body.password,
		hashedPassword = cryptoJS.SHA256(password).toString()

  dataBase.run(
    ' INSERT INTO users ( role, username, password) VALUES (?, ?, ?, ?)',
    ['user', username, hashedPassword],
    (err, data) => {
      if (err) {
        res.send(JSON.stringify({ status: 'Error registration' }))
      }
      res.send(JSON.stringify({ status: 'User created' }))
    }
  )
}

function loginUser(req, res) {
	const username = req.body.username,
    password = req.body.password,
    hashedPassword = cryptoJS.SHA256(password).toString()

  dataBase.get(
    'SELECT * FROM users WHERE username = ?',
    [username],
    function (err, data) {
	let token =token_generate.generateAccessToken({username,id:data.id,role:data.role})
      if (username === data.username && hashedPassword === data.password) {
        res.send(JSON.stringify({ status: 'Logged in', jsonWebToken: token }))
      } else {
        res.send(JSON.stringify({ status: 'Wrong details' }))
      }
    }
  )
}

module.exports = {
	getData,getDataId,postData,putData,deleteData,registerUser,loginUser
}