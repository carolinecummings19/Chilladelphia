/** @format */

const helper = require('../routes/route_helper.js')
const dbsingleton = require('../db_access.js');
const config = require('../config.json'); // Load configuration
const fs = require('fs');

var express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const process = require('process');
const { v4: uuidv4 } = require('uuid');

// Database connection setup
const db = dbsingleton;

// Setup the routes
  
// Put routes here
var routes = {
	
};

module.exports = routes;
