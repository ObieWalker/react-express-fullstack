import express from 'express'
import GroceryItem from '../database/models/groceryItem.js';

const router = express.Router();


  router.get('/items',(req, res) => 
    GroceryItem.find((error, data) => 
      res.send(data)
    )
  )

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
        res.json({
          success: false,
          message: "No such item"
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  })

  router.post('/items',(req, res) => {
    GroceryItem.create({
      name: req.body.groceryName,
      price: req.body.groceryPrice
    })
    .then(grocery => {
      if (grocery) {
        res.json({
          success: true,
          message: `${grocery.name} has been added at &#8358;${grocery.price}`,
          grocery
        })
      }
    })
    .catch(err => {
      console.log(err)
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
      res.json({
        success: true,
        message: ` The item ${deletedItem.name} has been deleted`
      })
    })
    .catch(err => {
      res.json({
        success: false,
        message: err
      })
    })
  })

  router.patch('/items/:id',(req, res) => {
    const itemId = req.params.id
    const newItem = {
      name: req.body.groceryName,
      price: req.body.groceryPrice
    }
    GroceryItem.findByIdAndUpdate(itemId, newItem, {new:true})
    .then(item => {
      res.json({
        success: true,
        message: "The item has been updated",
        item
      })
    })
    .catch(err => {
      res.json({
        success: false,
        message: err
      })
    })
  })

  router.put('/items/:id',(req, res) => {
    const itemId = req.params.id
    const itemPurchased = {
      purchased: true
    }
    GroceryItem.findByIdAndUpdate(itemId, itemPurchased, {new:true})
    .then(item => {
      res.json({
        success: true,
        message: "The item has been purchased",
        item
      })
    })
    .catch(err => {
      res.json({
        success: false,
        message: err
      })
    })
  })

export default router;