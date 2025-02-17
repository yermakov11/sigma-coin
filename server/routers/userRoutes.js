const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/requireAuth");

router.get("/",  userController.getAllUsers);
router.get("/:id", userController.getUser);
router.delete("/",  userController.deleteUser);

module.exports = router;
