const express = require("express");
const { verifyEmail } = require("../controllers/verifyEmailController");
const router = express.Router();

router.get("/verify/:token", verifyEmail);

module.exports = router;
