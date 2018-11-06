"use strict";

var _morgan = _interopRequireDefault(require("morgan"));

var _items = _interopRequireDefault(require("./routes/items.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');

var bodyParser = require('body-parser');

var open = require('open');

var mongoose = require('mongoose');

var express = require('express');

var port = process.env.PORT || 5000;
var app = express();

require('./database/database.js');

app.use((0, _morgan.default)('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
})); // app.use('/', express.static('dist'));
// app.use('*', express.static('dist'));

app.get('/hi', function (req, res) {
  res.send({
    express: 'Hello From Express'
  });
});
app.use('/api/v1/', _items.default); // app.use((req, res, next) => console.log("testss"))
// app.use(app.router);
// router.initialize(app);
// app.use('/', express.static('dist'));
// app.use('*', (req, res) => {
//   console.log("Use an arrow function na!!")
// })
// express.static('dist'));

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    if (process.env.NODE_ENV === 'development') {
      open("http://localhost:".concat(port));
    }
  }
});