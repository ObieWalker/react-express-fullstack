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
  console.log("Adding Item....", req.body);
  var item = req.body;

  _groceryItem.default.create(item).then(function (grocery) {
    if (grocery.length > 0) {
      res.json({
        success: true,
        message: "Grocery has been added",
        grocery: grocery
      });
    } else {
      res.json({
        success: false,
        message: "Grocery not added"
      });
    }
  }).catch(function (err) {
    console.log(err);
  });
});
router.delete('/items/:id', function (req, res) {
  var id = req.params.id;

  _groceryItem.default.findOneAndRemove(id).then(function () {
    res.json({
      success: true,
      message: "The item has been deleted"
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
  var newItem = req.body;

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