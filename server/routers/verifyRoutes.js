const express = require("express");
const { verifyEmail } = require("../controllers/verifyEmailController");
const router = express.Router();

router.get("/:token", verifyEmail);

module.exports = router;