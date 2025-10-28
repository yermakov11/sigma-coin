const User = require("../models/User");

const addCoins = async (req, res) => {
  try {
    const { coins } = req.body;
    const {id} = req.params; 

    if(isNaN(coins)){
        return res.status(400).json({message:"Invalid coin value"});
    }

    const balance = await User.findById(id);
    if (!balance) {
      return res.status(404).json({ message: "User not found" });
    }
    
    balance.coins += Number(coins);
    await balance.save();
    res.json({ balance: balance.coins });
  } catch (error) {
    console.error("Error adding coins:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { addCoins };
