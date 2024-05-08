/**
 * POST localhost:8888/eComm/api/v1/auth/signup
 * I need to intercept this
 */

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/signup", authController.signup);

module.exports = router;




/**
 * const authController = require("../controllers/auth.controller");

module.exports = (app) => {
    app.post("/eComm/api/v1/auth/signup", authController.signup);
};
 */
