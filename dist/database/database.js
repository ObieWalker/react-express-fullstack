"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');

var GroceryItem = require('./models/groceryItem.js');

_dotenv.default.config();

mongoose.connect(process.env.MONGODB_URI, function () {
  console.log("Mongo is connected.");
});