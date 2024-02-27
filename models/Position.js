const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stock_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock",
    required: true,
  },
  quantity: { 
    type: Number,
    required: true 
  },
  average_price: {
     type: Number, 
     required: true
  },
  total_investment: {
     type: Number, 
     required: true 
    },
  timestamp: {
     type: Date, 
     default: Date.now 
    },
});

const Position = mongoose.model("Position", positionSchema);

module.exports = Position;
