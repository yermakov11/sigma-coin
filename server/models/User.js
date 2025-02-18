const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },
  surname: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true },
  coins: { type: Number, default: 0 },
  // isVerified: { type: Boolean, default: false },
  // verificationToken: { type: String, default: null },
});

module.exports = mongoose.model("User", userSchema);
