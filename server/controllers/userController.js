const User = require("../models/User");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!req?.params?.id) return res.status(400).json({ message: "User ID required" });
  if (!user) return res.status(204).json({ message: `User ID ${req.params.id} not found` });
  res.json(user);
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: `User ID ${req.user.id} not found` });
    }
    if (user) {
      user.name = req.body.name || user.name;
      user.surname = req.body.surname || user.surname;
      user.email = req.body.email || user.email;
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        surname: updatedUser.surname,
        email: updatedUser.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res.status(204).json({ message: `User ID ${req.body.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

module.exports = { getAllUsers, updateUser, deleteUser, getUser };
