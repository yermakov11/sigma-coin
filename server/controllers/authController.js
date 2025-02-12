const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, surname, password, email } = req.body;
  if (!name || !surname || !password || !email) {
    return res.status(400).json({ message: "Username and password are required." });
  }
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.sendStatus(409);

  try {
    const hashPwd = await bcrypt.hash(password, 10);
    const result = await User.create({
      name: name,
      surname: surname,
      password: hashPwd,
      email: email,
    });
    console.log(result);
    return res.status(200).json({ success: `New user ${name} created!` });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password){
      return res.status(400).json({ message: "Username and password are required." });
    }
    const fountUser = await User.findOne({ email: email }).exec();
    if (!fountUser) return res.sendStatus(400);

    const match = bcrypt.compare(password, fountUser.password);

    if (match) {
      const accessToken = jwt.sign(
        { UserInfo: { email: fountUser.email } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );
      const refreshToken = jwt.sign(
        { username: fountUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );

      fountUser.refreshToken = refreshToken;
      const result = await fountUser.save();
      console.log(result);

      res.cookie("jwt", refreshToken, {httpOnly: true,secure: true,sameSite: "None",maxAge: 24 * 60 * 60 * 1000,});
      return res.json({ message: "User successfully logged in", accessToken });

    } else {
      res.sendStatus(401).json({ message: "user not found" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: 'Server error' });    
  }
};

module.exports = { signup, login };
