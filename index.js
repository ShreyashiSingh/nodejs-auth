const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://shreyashiss2567:0eW2V3xKHaLpXZ6Q@cluster0.fxexqgb.mongodb.net/Stock', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Stock Schema
const stockSchema = new Schema({
  stock_id: Number,
  stock_name: String,
  price: Number
});

const Stock = mongoose.model('Stock', stockSchema);

// Define User Schema
const customerSchema = new Schema({
  user_id: Number,
  name: String,
  available_amount: Number,
  utilized_amount: Number
});

const User = mongoose.model('Customer', customerSchema);

// Define Order Schema
const orderSchema = new Schema({
  order_id: Number,
  user_id: Number,
  stock_id: Number,
  buy_price: Number,
  sell_price: Number
});

const Order = mongoose.model('Order', orderSchema);

async function buyStock(user, stock, quantity) {
  const totalCost = stock.price * quantity;

  if (user.available_amount >= totalCost) {
    const orderId = generateOrderId();
    
    // Insert the order into the order table
    const order = new Order({
      order_id: orderId,
      user_id: user.user_id,
      stock_id: stock.stock_id,
      buy_price: stock.price
    });

    await order.save();

    // Update user's available and utilized amounts
    user.available_amount -= totalCost;
    user.utilized_amount += totalCost;
    await user.save();

    console.log(`Order placed successfully. Remaining balance: ${user.available_amount}`);
  } else {
    console.log('Insufficient funds to buy stock.');
  }

  // Close the Mongoose connection when done
  mongoose.connection.close();
}

function generateOrderId() {
  // Implement a logic to generate a unique order ID (e.g., using Date.now())
  return Date.now();
}

// Example usage:
async function example() {
  const stock = new Stock({
    stock_id: 2,
    stock_name: 'XYZ',
    price: 100
  });

  const user = new User({
    user_id: 2,
    name: 'Mary',
    available_amount: 1000,
    utilized_amount: 0
  });

  await stock.save();
  await user.save();

  await buyStock(user, stock, 5);
}
example().catch(error => console.error(error));

