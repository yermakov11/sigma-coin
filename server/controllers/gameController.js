const User = require("../models/User");

const addCoins = async (req, res) => {
  try {
    const { coins } = req.body;
    const {id} = req.params; 

    const balance = await User.findByIdAndUpdate(id, req.body);
    if (!balance) {
      return res.status(404).json({ message: "User not found" });
    }
    
    balance.coins += coins;
    await balance.save();
    res.json({ balance: balance.coins });
  } catch (error) {
    console.error("Error adding coins:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { addCoins };
