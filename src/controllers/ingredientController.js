const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ingredient = mongoose.model('Ingredient');

exports.addNewIngredient = (req, res) => {
    let newIngredient = new Ingredient(req.body);

    newIngredient.save((err, ingredient) => {
        if (err) {
            res.send(err);
        }
        res.json(ingredient);
    });
};

exports.getIngredients = (req, res) => {
    Ingredient.find()
        .sort({name: 1})
        .exec((err, ingredient) => {
        if (err) {
            res.send(err);
        }
        res.json(ingredient);
    });
};

exports.getIngredientWithID = (req, res) => {
    Ingredient.findById(req.params.ingredientId, (err, ingredient) => {
        if (err) {
            res.send(err);
        }
        res.json(ingredient);
    });
}

exports.updateIngredient = (req, res) => {
    Ingredient.findOneAndUpdate({ _id: req.params.ingredientId}, req.body, { new: true }, (err, ingredient) => {
        if (err) {
            res.send(err);
        }
        res.json(ingredient);
    })
}

exports.deleteIngredient = (req, res) => {
    Ingredient.remove({ _id: req.params.ingredientId }, (err, ingredient) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted Ingredient'});
    })
}