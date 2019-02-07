const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Recipe = mongoose.model('Recipe');

exports.addNewRecipe = (req, res) => {
    let newRecipe = new Recipe(req.body);

    newRecipe.save((err, recipe) => {
        if (err) {
            res.send(err);
        }
        res.json(recipe);
    });
};

exports.getRecipes = (req, res) => {
    Recipe.find()
        .populate('ingredients')
        .sort({name: 1})
        .exec((err, recipe) => {
        if (err) {
            res.send(err);
        }
        res.json(recipe);
    });
};

exports.getRecipeWithID = (req, res) => {
    Recipe.findById(req.params.recipeId).populate('ingredients').exec((err, recipe) => {
        if (err) {
            res.send(err);
        }
        res.json(recipe);
    });
}

exports.updateRecipe = (req, res) => {
    Recipe.findOneAndUpdate({ _id: req.params.recipeId}, req.body, { new: true }, (err, recipe) => {
        if (err) {
            res.send(err);
        }
        res.json(recipe);
    })
}

exports.deleteRecipe = (req, res) => {
    Recipe.remove({ _id: req.params.recipeId }, (err, recipe) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted Recipe'});
    })
}

exports.addIngredient = (req, res) => {
    Recipe.findById(req.params.recipeId, (err, recipe) => {
        if (err) {
            res.send(err);
        }
        recipe.ingredients.push(req.body.id)
        recipe.save((err) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                res.status(200).json(recipe);
              }          
        })
    });
}
