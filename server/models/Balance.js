const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const balanceSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    coins: { type: Number, default: 0 },
});

module.exports = mongoose.model('Balance', balanceSchema);
