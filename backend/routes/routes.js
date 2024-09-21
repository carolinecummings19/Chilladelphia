/** @format */

const { closeMongoDBConnection, getDB, connect, } = require('../mongodb.js');
const config = require('../config.json'); // Load configuration

var express = require('express');
const process = require('process');
const fs = require('fs');

// Database connection setup
const db = getDB();

// Setup the routes
var getImage = async function (req, res) {
    try {
        // Extract post_id from the request
        const { img } = req.body;

        // Send the image as a response
        return res.status(200).json({ image: 'image' });
    } catch (error) {
        console.error('Error fetching image:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};
// Put routes here
var routes = {
	get_image: getImage,
};

module.exports = routes;
