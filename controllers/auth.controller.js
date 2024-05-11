const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model"); // Adjust the path as per your project structure

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

        // Create response object with user details
        const res_obj = {
            name: user_created.name,
            userID: user_created.userID,
            email: user_created.email,
            userType: user_created.userType,
            createdAt: user_created.createdAt,
            updatedAt: user_created.updatedAt
        };

        // Return the response back to the user
        res.status(201).send(res_obj); // 201 means successfully created
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).send({ message: "User with this userID already exists" });
        }
        console.log("Error while registering the user", err);
        res.status(500).send({ message: "Some error happened while registering the user" }); // Internal server error
    }
};
