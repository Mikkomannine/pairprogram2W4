const express = require("express");
const serviceController = require("../controllers/servicesController");
const { checkRole } = require("../middleware/rolesMiddleware");
const router = express.Router();


// Get All service
router.get("/", serviceController.getAllServices);

// Get Single user by ID
router.get("/:id", serviceController.getServiceById);

// Accessible only by users with the "admin" role
router.post("/", checkRole("admin"), serviceController.createService);
router.put("/:id", checkRole("admin"), serviceController.updateService);
router.delete("/:id", checkRole("admin"), serviceController.deleteService);

module.exports = router;
