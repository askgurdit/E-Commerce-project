/**const { verify } = require("jsonwebtoken")
const user_model = require ("../models/user.model")
/**
 * Create a mw will check if the request body is proper and correct
 
const verifySignUpBody = (req,res,next) => {
    try {
        // Check for the name
        if (req.body.name) {
            return res.status (400).send ({message : "Failed! name was  not provided in request body" })
        }
        // Check for the email
        if (req.body.email) {
            return res.status (400).send ({message : "Failed! email was  not provided in request body" })
        }
        // Check for the userID
        if (req.body.userID) {
            return res.status (400).send ({message : "Failed! userID was  not provided in request body" })
        }
        // check if the user with the same userId is already present
        const user = await user_model.findOne ({userId : req.body.userID})
        if(user) {
            return res.status  (400).send ({ "Failed! user with userId is already present" })
        }
        next()
    }
    catch (err){
        console.log ("Error while updating the request object",err)
        res.status (500).send ({
            message : "Error while updating the request body"
        })
        module.exports = { verifySignUpBody: verify}

    }
} */

const user_model = require("../models/user.model");

const verifySignUpBody = async (req, res, next) => {
    try {
        // Check for the name
        if (!req.body.name) {
            return res.status(400).send({ message: "Failed! Name was not provided in request body" });
        }
        // Check for the email
        if (!req.body.email) {
            return res.status(400).send({ message: "Failed! Email was not provided in request body" });
        }
        // Check for the userID
        if (!req.body.userID) {
            return res.status(400).send({ message: "Failed! UserID was not provided in request body" });
        }
        // check if the user with the same userId is already present
        const user = await user_model.findOne({ userID: req.body.userID });
        if (user) {
            return res.status(400).send({ message: "Failed! User with userID is already present" });
        }
        next();
    } catch (err) {
        console.log("Error while updating the request object", err);
        res.status(500).send({
            message: "Error while updating the request body"
        });
    }
};

module.exports = { verifySignUpBody };
