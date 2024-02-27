const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  symbol: {
     type: String, 
     required: true 
    },
  company_name: { 
    type: String,
    required: true 
    },
  current_price: { 
    type: Number,
    required: true 
    },
    
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
