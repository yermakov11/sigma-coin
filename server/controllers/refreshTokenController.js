const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies?.jwt;
        if (!refreshToken) return res.sendStatus(401); 

        const foundUser = await User.findOne({ refreshToken }).exec();
        if (!foundUser) return res.sendStatus(403); 

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403); 

            const accessToken = jwt.sign(
                { userId: foundUser._id, email: foundUser.email }, 
                process.env.ACCESS_TOKEN_SECRET, 
                { expiresIn: '15m' }
            );

            res.json({ accessToken });
        });

    } catch (error) {
        console.error("Refresh Token Error:", error);
        res.sendStatus(500);
    }
};

module.exports = handleRefreshToken;
