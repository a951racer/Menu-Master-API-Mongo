const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment')

const Day = mongoose.model('Day');

exports.getMenu = (req, res) => {
    const today = moment().utcOffset('America/Chicago').startOf('day').toDate();
    Day.find({date: {$gte: today}})
        .populate({
            path: 'mealSlots',
            options: {sort: 'order'},
            populate: { path: 'recipes' }})
        .sort('-order')
        .exec((err, days) => {
        if (err) {
            return res.send(err);
        }
        return res.json(days);
    });
};

exports.getDayWithID = (req, res) => {
    Day.findById(req.params.dayId)
        .populate({
            path: 'mealSlots',
            options: {sort: 'orders'},
            populate: { path: 'recipes' }})
            .sort('-order')
            .exec(function(err, day) {
        if (err) {
            res.send(err);
        }
        res.json(day);
    });
}