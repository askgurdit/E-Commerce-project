const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model"); // Adjust the path as per your project structure
const JWT = require("jsonwebtoken");
const secret = require("../configs/auth.config");

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

exports.signin = async (req, res) => {
    try {
        // Check if the userId is present in the system
        const user = await user_model.findOne({ userID: req.body.userID });

        if (!user) {
            return res.status(400).send({ message: "User ID is not valid" });
        }

        // Check if the password is correct
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Wrong password" });
        }

        // Create and return the JWT token
        const token = JWT.sign({ id: user.userID }, secret.secret, { expiresIn: 120 }); // seconds
        res.status(200).send({
            name: user.name,
            userId: user.userID,
            email: user.email,
            userType: user.userType,
            accessToken: token // Corrected typo here
        });
    } catch (err) {
        console.log("Error while signing in the user", err);
        res.status(500).send({ message: "Some error happened while signing in the user" });
    }
};
