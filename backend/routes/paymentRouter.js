const express = require("express");
const paymeController = require("../controllers/paymeController");

const router = express.Router();

router.route("/").post(paymeController.handler);

module.exports = router;
