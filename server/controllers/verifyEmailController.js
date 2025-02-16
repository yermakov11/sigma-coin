const User=require('../models/User');

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        console.log("Received token:", token);
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findOne({ verificationToken: token });
        console.log("Decoded token:", decoded);

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.json({ message: "Email verified successfully! You can now log in." });
    } catch (error) {
        res.status(400).json({ error: "Invalid or expired token" });
    }
};

module.exports = { verifyEmail };
