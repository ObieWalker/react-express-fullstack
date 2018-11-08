const dotenv = require('dotenv');
const mongoose = require('mongoose');
const GroceryItem  = require('../../database/models/GroceryItem.js');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI_TEST)

mongoose.connection.on('connected', () => {

mongoose.connection.db.dropDatabase();

  const groceryItems = [
    new GroceryItem({
      name: "Oranges",
      price: (Math.floor(Math.random() * 10000))/100
    }),
    new GroceryItem({
      name: "Apples",
      price: (Math.floor(Math.random() * 10000))/100
    }),
    new GroceryItem({
      name: "Bananas",
      price: (Math.floor(Math.random() * 10000))/100
    }),
    new GroceryItem({
      name: "Guava",
      price: (Math.floor(Math.random() * 10000))/100
    }),
    new GroceryItem({
      name: "Pineapple",
      price: (Math.floor(Math.random() * 10000))/100
    }),
  ]

  let done = 0

  groceryItems.forEach((item) =>{
    item.save()
    .then(savedItem => {
      done++
      if (done === groceryItems.length){
        end();
      }
    })
    .catch(err => {
      console.log(err)
    })
  })

  const end = () => {
    mongoose.disconnect();
  }

});