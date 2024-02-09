
const Service = require("../models/services");


// Create a new Service
const createService = async (req, res) => {
  try {
    const { icon, title, text } = req.body;
    if (!icon|| !title || !text) {
      return res
        .status(400)
        .json({ error: "All fields (title, snippet, body) are required" });
    }

    const newService = new Service({ icon, title, text });
    const savedService = await newService.save();

    res.status(201).json(savedService);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET all Services
const getAllServices = async (req, res) => {
  try {
    const Services = await Service.find();
    res.json(Services);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET a single Service by ID
const getServiceById = async (req, res) => {
  try {
    const services = await Service.findById(req.params.id);
    if (!services) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE a Service by ID
const deleteService = async (req, res) => {
  try {
    const services = await Service.findOneAndDelete({ _id: req.params.id});
    if (!services) {
      return res.status(404).json({ msg: "Service not found" });
    }
    res.json({ msg: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PATCH
const updateService = async (req, res) => {
  try {
    const services = await Service.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!services) {
      return res.status(404).json({ msg: "Service not found" });
    }
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  createService,
  getAllServices,
  getServiceById,
  deleteService,
  updateService,
};

