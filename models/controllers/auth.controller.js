const bcrypt = require("bcryptjs");


exports.signup = async (req, res) => {
    try {
        // Read the request body
        const request_body = req.body;

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
