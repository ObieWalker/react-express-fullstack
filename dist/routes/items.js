"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _groceryItem = _interopRequireDefault(require("../database/models/groceryItem.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.get('/items', function (req, res) {
  _groceryItem.default.find({}, function (error, data) {
    if (error) {
      res.status(500).json({
        success: false,
        message: error
      });
    } else {
      res.json({
        success: true,
        data: data,
        message: process.env.MONGODB_URI
      });
    }
  }).catch(function (err) {
    res.status(500).json({
      success: false,
      message: "error with input type"
    });
  });
});
router.get('/items/:id', function (req, res) {
  var id = req.params.id;

  _groceryItem.default.find({
    _id: id
  }).then(function (item) {
    if (item.length > 0) {
      res.json({
        success: true,
        item: item
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No such item"
      });
    }
  }).catch(function (err) {
    res.status(500).json({
      success: false,
      message: "error with input type"
    });
  });
});
router.post('/items', function (req, res) {
  _groceryItem.default.create({
    name: req.body.groceryName,
    price: req.body.groceryPrice
  }).then(function (grocery) {
    if (grocery) {
      res.status(201).json({
        success: true,
        message: "".concat(grocery.name, " has been added at &#8358;").concat(grocery.price),
        grocery: grocery,
        env: process.env.MONGODB_URI
      });
    }
  }).catch(function (err) {
    res.json({
      success: false,
      message: "Grocery cannot be added because ".concat(err),
      err: err
    });
  });
});
router.delete('/items/:id', function (req, res) {
  var id = req.params.id;

  _groceryItem.default.findByIdAndDelete(id).then(function (deletedItem) {
    if (deletedItem) {
      res.json({
        success: true,
        message: "The item has been deleted."
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No such item"
      });
    }
  }).catch(function (err) {
    res.status(404).json({
      success: false,
      message: "No such item"
    });
  });
});
router.patch('/items/:id', function (req, res) {
  var itemId = {
    _id: req.params.id
  };
  var newItem = {
    name: req.body.groceryName,
    price: req.body.groceryPrice
  };

  _groceryItem.default.findOneAndUpdate(itemId, {
    $set: newItem
  }, {
    new: true
  }).then(function (item) {
    if (item) {
      res.json({
        success: true,
        message: "The item has been updated",
        item: item
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No such item"
      });
    }
  }).catch(function (err) {
    res.status(404).json({
      success: false,
      message: "No such item"
    });
  });
});
router.put('/items/:id', function (req, res) {
  var itemId = req.params.id;
  var itemPurchased = {
    purchased: true
  };

  _groceryItem.default.findByIdAndUpdate(itemId, itemPurchased, {
    new: true
  }).then(function (item) {
    if (item) {
      res.json({
        success: true,
        message: "The item has been purchased",
        item: item
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No such item"
      });
    }
  }).catch(function (err) {
    res.status(404).json({
      success: false,
      message: "No such item"
    });
  });
});
var _default = router;
exports.default = _default;