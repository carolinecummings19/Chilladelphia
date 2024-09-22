/** @format */

const routes = require('./routes.js');

module.exports = {
	register_routes,
};

function register_routes(app) {
	app.put('/addPost', routes.add_post);
	app.post('/getPosts', routes.get_posts);
	app.get('/getImage', routes.get_image);
}