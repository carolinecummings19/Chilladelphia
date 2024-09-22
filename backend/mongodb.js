const { MongoClient } = require('mongodb');
const config = require('./config.json');

let db;

const connect = async () => {
  console.log("Database name: ", config.dbName);
    if (!db) {
        const client = new MongoClient(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(config.dbName);
        console.log("Connected to database1");
    }
    return db;
};

const getDB = async () => {
    if (!db) {
        await connect();
        console.log("Connected to database2");
    }
    return db;
};

const closeMongoDBConnection = async () => {
    if (db) {
        await db.close();
        db = null;
    }
};

module.exports = { connect, getDB, closeMongoDBConnection };