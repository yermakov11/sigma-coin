const express = require("express");
const router = express.Router();
const { addCoins } = require("../controllers/gameController");


router.put("/addCoins/:id", addCoins);

module.exports = router;
