/**
 * This will be the starting file of the project (Means when we run this file the project will run)
 */
const express = require("express");
const mongoose = require("mongoose");
const app = express(); // Fixed missing parentheses
const server_config = require("./configs/server.configs.js");
const { db_config, DB_URL } = require("./configs/db.config");
const user_model = require ("./user.model")

//const { init } = require("./init"); // Assuming init function is defined in init.js

/**
 * Create an admin user at the starting of the application
 * If not already present
 */
// Connection with MongoDB
mongoose.connect(DB_URL);
const connection = mongoose.connection;
connection.on("error", () => {
    console.log('Error while connecting to the MongoDB');
});
connection.once("open", () => {
    console.log("Connected to MongoDB");
    init(); // Call init function here
});
async function init () {
    let user = await user_model.findOne ({userID : "admin"})
}
/**
 * Starting the server
 */
app.listen(server_config.PORT, () => {
    console.log("Server started at port num :", server_config.PORT);
});
