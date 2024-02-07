const express = require("express");
const usersController = require("../controllers/usersController");
const { checkRole } = require("../middleware/rolesMiddleware");
const router = express.Router();

// Get All users
router.get("/", usersController.getAllusers);

// Get Single user by ID
router.get("/:id", usersController.getuserById);

// Create a New user
router.post("/", checkRole("admin"), usersController.createuser);

// Update user by ID
router.put("/:id", checkRole("admin"), usersController.updateuser);

// Delete user by ID
router.delete("/:id", checkRole("admin"), usersController.deleteuser);

module.exports = router;
