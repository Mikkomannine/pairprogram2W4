const uuid = require("uuid");
const services = require("../models/services");
const express = require('express');

// Create a new Service
const createService = async (req, res) => {
  try {
    const { title, snippet, body } = req.body;
    if (!title || !snippet || !body) {
      return res
        .status(400)
        .json({ error: "All fields (title, snippet, body) are required" });
    }

    const newService = new Service({ title, snippet, body });
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
    const Service = await Service.findById(req.params.id);
    if (!Service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(Service);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE a Service by ID
const deleteService = async (req, res) => {
  try {
    const Service = await Service.findByIdAndDelete(req.params.id);
    if (!Service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Replace (Put) a single Service by ID
const updateService = async (req, res) => {
  try {
    const updatedService = await Service.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }// To return the updated document
    );

    if (!updatedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(updatedService);
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

