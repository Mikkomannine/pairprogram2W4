// controllers/usersController.js
const User = require("../models/users");

// Create a new User
const createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
      return res
        .status(400)
        .json({ msg: "All fields are required" });
    }

    const newUser = new User({
      name,
      email,
      role,
    });
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
    res.status(500).json({ error: "Internal Server Error 2024" });
  }
};

// GET a single User by ID
const getUserById = async (req, res) => {
  try {
    const users = await User.findById({ _id: req.params.id});
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE a User by ID
const deleteUser = async (req, res) => {
  try {
    const users = await User.findOneAndDelete( {_id: req.params.id});
    if (!users) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update (Patch) a single User by ID
const updateUser = async (req, res) => {
  try {
    const users = await User.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(users);
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