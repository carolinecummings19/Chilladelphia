/** @format */

const routes = require('./routes.js');

module.exports = {
	register_routes,
};

function register_routes(app) {
	// app.post('/postLink', routes.post_func);
	// app.put('/putSomething', routes.put_func);
	app.get('/getImage', routes.get_image);
}