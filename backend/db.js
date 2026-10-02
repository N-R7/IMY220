require('dotenv').config();

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectDB() {
    await client.connect();

    console.log("Connected to MongoDB");

    db = client.db("capture");
}

function getDB() {
    return db;
}

module.exports = {
    connectDB,
    getDB
};