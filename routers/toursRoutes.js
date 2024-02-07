const express = require("express");
const tourController = require("../controllers/toursController");
const { checkRole } = require("../middleware/rolesMiddleware");

const router = express.Router();

// Get all tours
router.get("/", tourController.getAllTours);

// Get a single tour by ID
router.get("/:id", tourController.getTourById);

// Create a new tour
router.post("/", checkRole("admin"), tourController.createTour);

// Update a tour by ID
router.put("/:id", checkRole("admin"), tourController.updateTour);

// Delete a tour by ID
router.delete("/:id", checkRole("admin"), tourController.deleteTour);

module.exports = router;
