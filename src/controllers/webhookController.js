const mongoose = require('mongoose')
const Schema = mongoose.Schema

const List = mongoose.model('ShoppingList')
const Ingredient = mongoose.model('Ingredient')

exports.addListItem = (req, res) => {
    List.find({open: true})
        .populate('items.groceryItem')
        .sort({date: -1})
        .exec((err, lists) => {
          if (err) {
              res.send(err);
          }
          let list = null
          if (!lists.length) {
            list = new List({
              note: 'Created by webhook',
              open: true,
              items: []
            })
          } else {
            list = lists[0]
          }
          Ingredient.find({voiceTag: req.body.item})
            .sort({name: 1})
            .exec((err, ingredients) => {
              if (err) {
                  res.send(err)
              }
              if (ingredients.length) {
                let exists = list.items.find(item => item.groceryItem._id.toString() === ingredients[0]._id.toString())
                if (!exists) {
                  list.items.push({
                    groceryItem: ingredients[0]._id,
                    complete: false
                  })
                  List.updateOne({_id: list._id}, {items: list.items}, (err) => {
                    res.json(list)
                  })
                } else {
                  res.json(list)                  
                }
              } else {
                res.json(list)
              }
            })
        })
}
