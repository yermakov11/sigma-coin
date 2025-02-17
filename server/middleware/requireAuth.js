const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Authorization token required" });
        }

        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        let user;
        if (decoded._id) {
            user = await User.findById(decoded._id).select("_id");
        }
        if (!user && decoded.email) {
            user = await User.findOne({ email: decoded.email }).select("_id");
        }

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired. Please log in again." });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid token." });
        }
        
        return res.status(401).json({ error: "Request is not authorized" });
    }
};

module.exports = requireAuth;
