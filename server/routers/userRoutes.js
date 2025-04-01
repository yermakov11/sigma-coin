const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyToken");

router.get("/profile", verifyJWT, userController.getUser);
router.put("/profile", verifyJWT, userController.updateUser);


module.exports = router;
