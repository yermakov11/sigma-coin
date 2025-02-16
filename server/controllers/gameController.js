const Balance = require("../models/Balance");

const addCoins = async (req, res) => {
  try {
    const { coins } = req.body;
    if (!coins || coins < 0)
      return res.status(400).json({ message: "Invalid coin amount" });

    let balance = await Balance.findOne({ userId: req.user.id });
    if (!balance) {
      balance = await Balance.create({ userId: req.user.id, coins: 0 });
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
