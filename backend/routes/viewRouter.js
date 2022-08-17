const express = require("express");
const viewController = require("../controllers/viewController");

const router = express.Router();

router.route("/").get(viewController.openKassa);
router.route("/save-kassa-data").post(viewController.saveDataKassa);

module.exports = router;
