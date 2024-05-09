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


/**
 * {
    "name": "YourName2",
    "userID": "yourUserID2",
    "email": "your@email2.com",
    "userType": "CUSTOMER",
    "password": "yourPasswo123"
}
 */


/** BELOW IS THE CODE WITH PASSWORD FEILD  IN THE POSTMAN OUTPUT TOO.....
 * const bcrypt = require("bcryptjs");
const user_model = require("../user.model"); // Adjust the path as per your project structure


exports.signup = async (req, res) => {
    try {
        // Read the request body
        const request_body = req.body;

        // Log the request body to check the value of password
        console.log("Request Body:", request_body);

        // Check if the password field is present and has a value
        if (!request_body.password) {
            return res.status(400).send({ message: "Password is required" });
        }

        // Log the request body to check the value of password
console.log("Request Body:", request_body);

        // Create user object with hashed password
        const userobj = {
            name: request_body.name,
            userID: request_body.userID,
            email: request_body.email,
            userType: request_body.userType,
            password: bcrypt.hashSync(request_body.password, 8)
        };

        // Insert the data in the user collection in MongoDB
        const user_created = await user_model.create(userobj);

        // Return the response back to the user
        res.status(201).send(user_created); // 201 means successfully created
    } catch (err) {
        console.log("Error while registering the user", err);
        res.status(500).send({ message: "Some error happened while registering the user" }); // Internal server error
    }
};

 */