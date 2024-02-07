// controllers/usersController.js
const uuid = require("uuid");
const users = require("../models/users");

// Create a new User
const createUser = async (req, res) => {
  try {
    const { title, snippet, body } = req.body;
    if (!title || !snippet || !body) {
      return res
        .status(400)
        .json({ error: "All fields (title, snippet, body) are required" });
    }

    const newUser = new User({ title, snippet, body });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET all Users
const getAllUsers = async (req, res) => {
  try {
    const Users = await User.find();
    res.json(Users);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET a single User by ID
const getUserById = async (req, res) => {
  try {
    const User = await User.findById(req.params.id);
    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(User);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE a User by ID
const deleteUser = async (req, res) => {
  try {
    const User = await User.findByIdAndDelete(req.params.id);
    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update (Patch) a single User by ID
const updateUser = async (req, res) => {
  try {
    const User = await User.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(User);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Replace (Put) a single User by ID
const putUser = async (req, res) => {
  try {
    const User = await User.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }// To return the updated document
    );

    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(User);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};