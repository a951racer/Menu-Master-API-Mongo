const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Day = mongoose.model('Day');

exports.getMenu = (req, res) => {
    Day.find()
        .populate({
            path: 'mealSlots',
            options: {sort: 'order'},
            populate: { path: 'recipes' }})
        .sort('-order')
        .exec((err, days) => {
        if (err) {
            res.send(err);
        }
        res.json(days);
    });
};

exports.getDayWithID = (req, res) => {
    Day.findById(req.params.dayId)
        .populate({
            path: 'mealSlots',
            options: {sort: 'order'},
            populate: { path: 'recipes' }})
            .sort('-order')
            .exec(function(err, day) {
        if (err) {
            res.send(err);
        }
        res.json(day);
    });
}