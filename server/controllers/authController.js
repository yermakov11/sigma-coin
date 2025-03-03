const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendVerificationEmail=require('../utils/sendVerificationEmail');

const signup = async (req, res) => {
  try {
    const { name, surname, password, email } = req.body;
    if (!name || !surname || !password || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) return res.status(409).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

    const newUser = new User({ name, surname, password: hashedPassword, email, verificationToken });
    await newUser.save();

    await sendVerificationEmail(email, verificationToken);

    return res.status(201).json({ success: `User ${name} registered. Verify your email!` });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required." });

    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.status(401).json({ message: "User not found." });

    if (!foundUser.isVerified) return res.status(403).json({ message: "Email not verified." });

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials." });

    const accessToken = jwt.sign({ userId: foundUser._id, email: foundUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ userId: foundUser._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000 });

    return res.json({ message: "Login successful", accessToken });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login };
