const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealSlot = mongoose.model('MealSlot');

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