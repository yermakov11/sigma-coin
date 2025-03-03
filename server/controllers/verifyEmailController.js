const User = require("../models/User");
const jwt = require("jsonwebtoken");

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ email: decoded.email, verificationToken: token });

    if (!user) return res.status(400).json({ message: "Invalid or expired token." });

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ message: "Email verified successfully. You can now log in." });

  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

module.exports = { verifyEmail };
