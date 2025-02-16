const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logoutController");
const requireAuth = require("../middleware/requireAuth");

router.post("/", requireAuth ,logoutController.logout);

module.exports = router;
