const uuid = require("uuid");
const tours = require("../models/tours");

// Create a new Tour
const createTour = async (req, res) => {
  try {
    const { title, snippet, body } = req.body;
    if (!title || !snippet || !body) {
      return res
        .status(400)
        .json({ error: "All fields (title, snippet, body) are required" });
    }

    const newTour = new Tour({ title, snippet, body });
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
    const Tour = await Tour.findById(req.params.id);
    if (!Tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    res.json(Tour);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE a Tour by ID
const deleteTour = async (req, res) => {
  try {
    const Tour = await Tour.findByIdAndDelete(req.params.id);
    if (!Tour) {
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
    const Tour = await Tour.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!Tour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    res.json(Tour);
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