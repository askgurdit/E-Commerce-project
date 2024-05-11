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
const authMW = require("../middlewares/auth_mw");

/**router.post("/signup", authMW.verifySignUpBody, authController.signup);

module.exports = router;
module.exports = (app) => {
    app.post ("/eComm/api/v1/signup",[authMW.verifySignUpBody],authController.signup)
}
/**
 * route for
 * POST localhost:8888/ecomm/api/v1/auth/signin

app.post ("eComm/api.v1/auth/signin")
 */
router.post("/signup", authMW.verifySignUpBody, authController.signup);
router.post("/signin", authController.signin);

module.exports = router;







/**
 * const authController = require("../controllers/auth.controller");

module.exports = (app) => {
    app.post("/eComm/api/v1/auth/signup", authController.signup);
};
 */
