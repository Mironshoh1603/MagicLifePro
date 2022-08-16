const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.signUp);
router.route("/verify_code").post(authController.verify_code);
router.route("/register").post(authController.RegisterData);

module.exports = router;
