const express = require('express'),
  sqlite3 = require('sqlite3').verbose(),
  cryptoJS = require('crypto-js'),
  app = express(),
  port = 3001,
  dataBase = new sqlite3.Database('database.db'),
  usersData = require('./models/usersData'),
  productsData = require('./models/productsData'),
  userRoutes = require('./routes/userRoutes')

app.use(express.json())



usersData.createUsers(dataBase)
productsData.createProducts(dataBase)
userRoutes.users_routes_get(app)
userRoutes.users_routes_get_id(app)
userRoutes.users_routes_post(app)
userRoutes.users_routes_put(app)
userRoutes.users_routes_delete(app)
userRoutes.users_routes_register(app)
userRoutes.users_routes_login(app)


//app.get('/products', (req, res) => {
//  dataBase.all('SELECT * FROM products', [], (err, data) => {
//    res.send(data)
//  })
//})

//app.get('/products/:id', (req, res) => {
//  const id = req.params.id
//  dataBase.get('SELECT * FROM products WHERE id = ?', [id], (err, data) => {
//    res.send(data)
//  })
//})

//app.post('/newproduct', authenticateToken, (req, res) => {
//  const name = req.body.name,
//    price = req.body.price
//  dataBase.run(
//    'INSERT INTO products (name,price) VALUES (?, ?)',
//    [name, price],
//    (err, data) => {
//      res.send('Done')
//    }
//  )
//})

//app.put('/changeproduct/:id', authenticateToken, (req, res) => {
//  const name = req.body.name,
//    price = req.body.price,
//    id = req.params.id
//  dataBase.run(
//    'UPDATE products SET name = ?, price = ? WHERE id = ?',
//    [name, price, id],
//    (err, data) => {
//      res.send('Done')
//    }
//  )
//})

//app.delete('/products/:id', authenticateToken, (req, res) => {
//  const id = req.params.id
//  dataBase.run('DELETE FROM products WHERE id = ?', [id], (err, data) => {
//    res.send('Done')
//  })
//})

//app.get('/users', (req, res) => {
//  dataBase.all('SELECT * FROM users', [], (err, data) => {
//    res.send(data)
//  })
//})


//app.post('/register', (req, res) => {
//  const name = req.body.name,
//    role = req.body.role,
//    username = req.body.username,
//    password = req.body.password,
//    hashedPassword = cryptoJS.SHA256(password).toString()

//  dataBase.run(
//    ' INSERT INTO users (name, role, username, password) VALUES (?, ?, ?, ?)',
//    [name, role, username, hashedPassword],
//    (err, data) => {
//      if (err) {
//        res.send(JSON.stringify({ status: 'Error registration' }))
//      }
//      res.send(JSON.stringify({ status: 'User created' }))
//    }
//  )
//})

//app.post('/login', (req, res) => {
//  const username = req.body.username,
//    password = req.body.password,
//    hashedPassword = cryptoJS.SHA256(password).toString()

//  dataBase.get(
//    'SELECT * FROM users WHERE username = ?',
//    [username],
//    function (err, data) {
//	let token = generateAccessToken(username, data.role)
//      if (username === data.username && hashedPassword === data.password) {
//        res.send(JSON.stringify({ status: 'Logged in', jsonWebToken: token }))
//      } else {
//        res.send(JSON.stringify({ status: 'Wrong details' }))
//      }
//    }
//  )
//})

app.listen(port)
