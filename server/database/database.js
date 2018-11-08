import dotenv from 'dotenv';
const mongoose = require('mongoose');
const GroceryItem  = require('./models/groceryItem.js');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, function(){
  console.log("process.env.MONGODB_URI===>>>>>>", process.env.MONGODB_URI)
  console.log("Mongo is connected.")
});