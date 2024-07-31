const User = require("../models/userdb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const user = await User.findOne(
      { login: req.body.login },
      { email: req.body.email }
    );
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      login: req.body.login,
      name: req.body.name,
      surname: req.body.surname,
      password: hashedPassword,
      email: req.body.email,
    });
    const token = jwt.sign({ _id: newUser._id }, "secretkey123", {
      expiresIn: "30d",
    });
    const data = await newUser.save();
    res.status(200).json({
      message: "User registered successfully",
      token: token,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({login});
    if (!user) {
      return res.status(401).json({ message: "Invalid login or email" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    const token = jwt.sign({ _id: user._id }, "secretkey123", {
      expiresIn: "30d",
    });
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { signup, login };
