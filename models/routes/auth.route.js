/**
 * POST localhost:8888/eComm/api/v1/auth/signup
 * I need to intercept this
 */

/**const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMW = require ("C:/auth_mw")
router.post("/signup", authController.signup);

module.exports = (app) => {
    app.post ("/ecomm/api/v1/auth/signup",[authMW.verifySignUpBody],authController.signup)
}
module.exports = router;*/

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMW = require("C:/Users/askdi/OneDrive/Desktop/Github Repo's and JS/Mr beast clone/JavaScript/E-Commerce-project/middlewares/auth_mw.js");

router.post("/signup", authMW.verifySignUpBody, authController.signup);

module.exports = router;






/**
 * const authController = require("../controllers/auth.controller");

module.exports = (app) => {
    app.post("/eComm/api/v1/auth/signup", authController.signup);
};
 */
