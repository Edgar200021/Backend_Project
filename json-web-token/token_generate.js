const jsonWebToken = require('jsonwebtoken'),
		SECRET = process.env.SECRET


function generateAccessToken(username_id) {
	return jsonWebToken.sign(user_id, SECRET, { expiresIn: '36000s' })
  }

module.exports = {
	generateAccessToken
}