/** @format */

const { closeMongoDBConnection, getDB, connect, } = require('../mongodb.js');
const config = require('../config.json'); // Load configuration

var express = require('express');
const process = require('process');
const fs = require('fs');

// Database connection setup
const db = getDB();

// Setup the routes
const getImage = async (req) => {
    const { lat, long } = req;
    console.log('lat:', lat, 'long:', long);
    try {
      const result = await db.collection('Images_UCD').findOne({
        br_lat: { $gte: lat },    // Top-left latitude must be greater than or equal to req.lat
        tl_lat: { $lte: lat },    // Bottom-right latitude must be less than or equal to req.lat
        tl_long: { $gte: long },  // Top-left longitude must be greater than or equal to req.long
        br_long: { $lte: long }   // Bottom-right longitude must be less than or equal to req.long
      });
  
      if (!result) {
        throw new Error('No matching element found');
      }
  
      return result;
  
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching image');
    }
  };
  

// Put routes here
var routes = {
	get_image: getImage,
};

module.exports = routes;
