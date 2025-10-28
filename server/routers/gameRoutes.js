const express = require("express");
const router = express.Router();
const { addCoins } = require("../controllers/gameController");


router.post("/addCoins/:id", addCoins);

module.exports = router;
