const user_controller = require('../controller/user_controller'),
	token_authenticate = require('../json-web-token/token_authenticate')

function users_routes_get(app) {
	app.get('/',user_controller.getData)
}

function users_routes_get_id(app) {
	app.get('/get/:id', user_controller.getDataId)
}
function users_routes_post(app) {
	app.post('/new',token_authenticate.authenticateToken, user_controller.postData)
}

function users_routes_put(app) {
	app.put('/put/:id', token_authenticate.authenticateToken, user_controller.putData)
}

function users_routes_delete(app) {
	app.delete('/delete/:id', token_authenticate.authenticateToken, user_controller.deleteData)
}

function users_routes_register(app) {
	app.post('/register', user_controller.registerUser)
}

function users_routes_login(app) {
	app.post('/login', user_controller.loginUser)
}

module.exports = {
	users_routes_get, users_routes_get_id,users_routes_post,users_routes_put,users_routes_delete,users_routes_register,users_routes_login
}