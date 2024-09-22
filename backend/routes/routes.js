/** @format */

const { closeMongoDBConnection, getDB, connect, } = require('../mongodb.js');
const config = require('../config.json'); // Load configuration

var express = require('express');
const process = require('process');
const fs = require('fs');
const { ObjectId } = require('mongodb');

// Database connection setup

// Setup the routes
const getImage = async (req, res) => {
    const db = await getDB();
    const lat = parseFloat(req.query.lat);
    const long = parseFloat(req.query.long);
    console.log('lat:', lat, 'long:', long);

    if (isNaN(lat) || isNaN(long)) {
        return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }

    try {
        const result = await db.collection('Images_UCD').findOne({
            $and: [
                { tl_lat: { $gte: lat } },
                { br_lat: { $lte: lat } },
                { tl_long: { $lte: long } },
                { br_long: { $gte: long } }
            ]
        });

        if (!result) {
            return res.status(404).json({ error: 'No matching image found' });
        }

        res.json(result);

    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).json({ error: 'Error fetching image' });
    }
};

const addPost = async (req, res) => {
    const db = await getDB();
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({ error: 'Title, content, and author are required' });
    }

    try {
        const newPost = {
            title,
            content,
            author,
            createdAt: new Date()
        };

        const result = await db.collection('DiscussionPosts').insertOne(newPost);

        res.status(201).json(result.ops[0]);
    } catch (error) {
        console.error('Error adding post:', error);
        res.status(500).json({ error: 'Error adding post' });
    }
};

const getPosts = async (req, res) => {
    const db = await getDB();

    try {
        const posts = await db.collection('DiscussionPosts').find().toArray();

        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Error fetching posts' });
    }
};
  

// Put routes here
var routes = {
	get_image: getImage,
    add_post: addPost,
    get_posts: getPosts,
};

module.exports = routes;
