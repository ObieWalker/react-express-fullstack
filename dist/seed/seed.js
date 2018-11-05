"use strict";

var dotenv = require('dotenv');

var mongoose = require('mongoose');

var GroceryItem = require('../database/models/groceryItem.js');

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', function () {
  mongoose.connection.db.dropDatabase();
  var groceryItems = [new GroceryItem({
    name: "Oranges",
    price: Math.floor(Math.random() * 100) / 100 + 100
  }), new GroceryItem({
    name: "Apples",
    purchased: true,
    price: Math.floor(Math.random() * 100) / 100 + 100
  }), new GroceryItem({
    name: "Bananas",
    price: Math.floor(Math.random() * 100) / 100 + 100
  }), new GroceryItem({
    name: "Guava",
    price: Math.floor(Math.random() * 100) / 100 + 100
  }), new GroceryItem({
    name: "Pineapple",
    price: Math.floor(Math.random() * 100) / 100 + 100
  })];
  var done = 0;
  groceryItems.forEach(function (item) {
    console.log(item);
    item.save().then(function (savedItem) {
      done++;

      if (done === groceryItems.length) {
        end();
      }
    }).catch(function (err) {
      console.log(err);
    });
  });

  var end = function end() {
    mongoose.disconnect();
  };
});