import express from 'express'
import GroceryItem from '../database/models/groceryItem.js';

const router = express.Router();


  router.get('/items',(req, res) => {
    GroceryItem.find({}, (error, data) => {
      if(error){
        res.status(500).json({
          success: false,
          message: error
        });
      } else {
        res.json({
          success: true,
          data,
          message: process.env.MONGODB_URI
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "error with input type"
      });
    })

    }  )

  router.get('/items/:id',(req, res) => {
    const id = req.params.id

    GroceryItem.find({
      _id : id
    })
    .then(item => {
      if (item.length > 0){
        res.json({
          success: true,
          item
        })
      } else {
        res.status(404).json({
          success: false,
          message: "No such item"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "error with input type"
      });
    })
  })

  router.post('/items',(req, res) => {
    GroceryItem.create({
      name: req.body.groceryName,
      price: req.body.groceryPrice
    })
    .then(grocery => {
      if (grocery) {
        res.status(201).json({
          success: true,
          message: `${grocery.name} has been added at &#8358;${grocery.price}`,
          grocery,
          env: process.env.MONGODB_URI
        })
      }
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Grocery cannot be added because ${err}`,
        err
      })
    })
  })

  router.delete('/items/:id',(req, res) => {
    const id = req.params.id
    GroceryItem.findByIdAndDelete(id)
    .then((deletedItem) => {
      if (deletedItem){
        res.json({
          success: true,
          message: `The item has been deleted.`
        })
      } else {
        res.status(404).json({
          success: false,
          message: "No such item"
        });
      }
    })
    .catch(err => {
      res.status(404).json({
        success: false,
        message: "No such item"
      });
    })
  })

  router.patch('/items/:id',(req, res) => {
    const itemId = { _id : req.params.id }
    const newItem = {
      name: req.body.groceryName,
      price: req.body.groceryPrice
    }
    GroceryItem.findOneAndUpdate(itemId, { $set: newItem }, {new:true})
    .then(item => {
      if(item){
        res.json({
          success: true,
          message: "The item has been updated",
          item
        })
      }  else {
        res.status(404).json({
          success: false,
          message: "No such item"
        });
      }
    })
    .catch(err => {
      res.status(404).json({
        success: false,
        message: "No such item"
      });
    })
  })

  router.put('/items/:id',(req, res) => {
    const itemId = req.params.id
    const itemPurchased = {
      purchased: true
    }
    GroceryItem.findByIdAndUpdate(itemId, itemPurchased, {new:true})
    .then(item => {
      if (item){
        res.json({
          success: true,
          message: "The item has been purchased",
          item
        })
      } else {
        res.status(404).json({
          success: false,
          message: "No such item"
        });
      }
    })
    .catch(err => {
      res.status(404).json({
        success: false,
        message: "No such item"
      });
    })
  })

export default router;