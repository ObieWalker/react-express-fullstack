const mongoose = require('mongoose');

const GroceryItem = new mongoose.Schema({
  name: { type: String, default:'' },
  purchased: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  id: { type: String }
})

module.exports = mongoose.model('GroceryItem', GroceryItem)