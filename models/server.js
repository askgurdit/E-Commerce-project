const express = require("express");
const mongoose = require("mongoose");
const app = express();
const server_config = require("./configs/server.config");
const { db_config, DB_URL } = require("./configs/db.config");
const user_model = require("./user.model");
const bcrypt = require("bcryptjs");

app.use(express.json());

// Stitch the route to the server
const authRoutes = require("./routes/auth.route");
app.use("/eComm/api/v1/auth", authRoutes); // Use the correct path here

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
async function init() {
    let user = await user_model.findOne({ userID: "admin" });
    if (user) {
        console.log("Admin is already present");
        return;
    }
    try {
        user = await user_model.create({
            name: "Vishwa",
            userID: "admin",
            email: "kankvish@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("Welcome!", 8), // 8 is used as salt here
        });
        console.log("Admin created", user);
    } catch (err) {
        console.log("Error while creating admin", err);
    }
}

// Starting the server
app.listen(server_config.PORT, () => {
    console.log("Server started at port num :", server_config.PORT);
});
