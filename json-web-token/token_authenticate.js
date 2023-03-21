const jsonWebToken = require('jsonwebtoken'),
		SECRET = process.env.SECRET


function authenticateToken(req, res, next) {
	const token = req.headers.authorization

	if(token == null ) {
		return res.sendStatus(401)
	}
	jsonWebToken.verify(token, SECRET, (err,user) => {
		if (err) {
			return res.sendStatus(403)
		}
		
		const {role} = user
		if(role != 'admin') {
			return ren.sendStatus(403)
		}

		next()
	})
}

function checkRole(req, res) {
	const token = req.headers.authorization,
		decoded = jsonWebToken.decode(token),
		role = decoded.role
		return role
}

module.exports = {authenticateToken, checkRole}