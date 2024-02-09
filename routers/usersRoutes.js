const express = require("express");
const usersController = require("../controllers/usersController");
const { checkRole } = require("../middleware/rolesMiddleware");
const router = express.Router();

// Get All users
router.get("/", usersController.getAllUsers);

// Get Single user by ID
router.get("/:id", usersController.getUserById);

// Create a New user
//router.post("/", checkRole("admin"), usersController.createUser);
router.post("/", usersController.createUser)

// Update user by ID
router.patch("/:id", usersController.updateUser);

// Delete user by ID
router.delete("/:id", usersController.deleteUser);

module.exports = router;
