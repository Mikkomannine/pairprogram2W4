const express = require("express");
const tourController = require("../controllers/toursController");
const { checkRole } = require("../middleware/rolesMiddleware");

const router = express.Router();

// Get all tours
router.get("/", tourController.getAllTours);

// Get a single tour by ID
router.get("/:id", tourController.getTourById);

// Create a new tour
router.post("/", tourController.createTour);

// Update a tour by ID
router.patch("/:id", tourController.updateTour);

// Delete a tour by ID
router.delete("/:id", tourController.deleteTour);

module.exports = router;
