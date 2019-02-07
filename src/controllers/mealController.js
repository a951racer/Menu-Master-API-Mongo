const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Meal = mongoose.model('Meal');

exports.addNewMeal = (req, res) => {
    let newMeal = new Meal(req.body);

    newMeal.save((err, meal) => {
        if (err) {
            res.send(err);
        }
        res.json(meal);
    });
};

exports.getMeals = (req, res) => {
    Meal.find()
        .sort({order: 1})
        .exec((err, meal) => {
        if (err) {
            res.send(err);
        }
        res.json(meal);
    });
};

exports.getMealWithID = (req, res) => {
    Meal.findById(req.params.mealId, (err, meal) => {
        if (err) {
            res.send(err);
        }
        res.json(meal);
    });
}

exports.updateMeal = (req, res) => {
    Meal.findOneAndUpdate({ _id: req.params.mealId}, req.body, { new: true }, (err, meal) => {
        if (err) {
            res.send(err);
        }
        res.json(meal);
    })
}

exports.deleteMeal = (req, res) => {
    Meal.remove({ _id: req.params.mealId }, (err, meal) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted Meal'});
    })
}