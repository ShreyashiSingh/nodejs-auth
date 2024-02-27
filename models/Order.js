const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
    },

  stock_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stock',
    required: true
    },

  order_type: { 
    type: String,
     enum: ['Buy', 'Sell'],
      required: true 
    },

  quantity: { 
    type: Number, 
    required: true 
    },

  price_limit: { 
    type: Number, 
    required: true
 },

  timestamp: { 
    type: Date,
    default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
