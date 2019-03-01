const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealSlot = mongoose.model('MealSlot');
const Recipe = mongoose.model('Recipe')

exports.addNewMealSlot = (req, res) => {
    let newMealSlot = new MealSlot(req.body);

    newMealSlot.save((err, mealSlot) => {
        if (err) {
            res.send(err);
        }
        res.json(mealSlot);
    });
};

exports.getMealSlots = (req, res) => {
    MealSlot.find()
        .sort({order: 1})
        .exec((err, mealSlot) => {
        if (err) {
            res.send(err);
        }
        res.json(mealSlot);
    });
};

exports.getMealSlotWithID = (req, res) => {
    MealSlot.findById(req.params.mealSlotId, (err, mealSlot) => {
        if (err) {
            res.send(err);
        }
        res.json(mealSlot);
    });
}

exports.updateMealSlot = (req, res) => {
    const meal = req.body;
    meal.recipes.forEach(recipe => {
        Recipe.findById(recipe._id, (err, foundRecipe) => {
            if (err) res.send(err)
            if (!foundRecipe) {
                let newRecipe = new Recipe(recipe)
                newRecipe.save((err, newSlot) => {
                    if (err) {
                        res.send(err);
                    }
                    recipe._id = newRecipe._id;
                })
            } else {
                Recipe.findOneAndUpdate({ _id: recipe._id}, recipe, { new: true })
            }
        })
    })
    const newMealSlot = new MealSlot(meal)
    MealSlot.findOneAndUpdate({ _id: req.params.mealSlotId}, req.body, { new: true }, (err, mealSlot) => {
        if (err) {
            res.send(err);
        }
        res.json(mealSlot);
    })
}

exports.deleteMealSlot = (req, res) => {
    MealSlot.remove({ _id: req.params.mealSlotId }, (err, mealSlot) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted MealSlot'});
    })
}