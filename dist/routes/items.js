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
  return _groceryItem.default.find(function (error, data) {
    return res.send(data);
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
      res.json({
        success: false,
        message: "No such item"
      });
    }
  }).catch(function (err) {
    console.log(err);
  });
});
router.post('/items', function (req, res) {
  _groceryItem.default.create({
    name: req.body.groceryName,
    price: req.body.groceryPrice
  }).then(function (grocery) {
    if (grocery) {
      res.json({
        success: true,
        message: "".concat(grocery.name, " has been added at &#8358;").concat(grocery.price),
        grocery: grocery
      });
    }
  }).catch(function (err) {
    console.log(err);
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
    res.json({
      success: true,
      message: " The item ".concat(deletedItem.name, " has been deleted")
    });
  }).catch(function (err) {
    res.json({
      success: false,
      message: err
    });
  });
});
router.patch('/items/:id', function (req, res) {
  var itemId = req.params.id;
  var newItem = {
    name: req.body.groceryName,
    price: req.body.groceryPrice
  };

  _groceryItem.default.findByIdAndUpdate(itemId, newItem, {
    new: true
  }).then(function (item) {
    res.json({
      success: true,
      message: "The item has been updated",
      item: item
    });
  }).catch(function (err) {
    res.json({
      success: false,
      message: err
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
    res.json({
      success: true,
      message: "The item has been purchased",
      item: item
    });
  }).catch(function (err) {
    res.json({
      success: false,
      message: err
    });
  });
});
var _default = router;
exports.default = _default;