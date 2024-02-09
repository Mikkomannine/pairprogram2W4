
const Tour = require("../models/tours");

// Create a new Tour
const createTour = async (req, res) => {
  try {
    const { image, title, price, description, location, duration } = req.body;
    if (!image || !title || !price || !description || !location || !duration) {
      return res
        .status(400)
        .json({ error: "All fields (title, snippet, body) are required" });
    }

    const newTour = new Tour({ image, title, price, description, location, duration});
    const savedTour = await newTour.save();

    res.status(201).json(savedTour);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET all Tours
const getAllTours = async (req, res) => {
  try {
    const Tours = await Tour.find();
    res.json(Tours);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET a single Tour by ID
const getTourById = async (req, res) => {
  try {
    const tours = await Tour.findById(req.params.id);
    if (!tours) {
      return res.status(404).json({ error: "Tour not found" });
    }
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE a Tour by ID
const deleteTour = async (req, res) => {
  try {
    const tours = await Tour.findByIdAndDelete(req.params.id);
    if (!tours) {
      return res.status(404).json({ error: "Tour not found" });
    }
    res.json({ message: "Tour deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update (Patch) a single Tour by ID
const updateTour = async (req, res) => {
  try {
    const tours = await Tour.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!tours) {
      return res.status(404).json({ error: "Tour not found" });
    }

    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  createTour,
  getAllTours,
  getTourById,
  deleteTour,
  updateTour,
};