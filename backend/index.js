/**
 * This module will start the express server
 */

// import the express app
const webapp = require('./routes/routes.js');

const port = 3000;

// start the web server
webapp.listen(port, () =>{
    console.log('Server running on port', port);
})