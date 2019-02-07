const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Day = mongoose.model('Day');

exports.addNewDay = (req, res) => {
    let newDay = new Day(req.body);

    newDay.save((err, day) => {
        if (err) {
            res.send(err);
        }
        res.json(day);
    });
};

exports.getDays = (req, res) => {
    Day.find({}, (err, days) => {
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

exports.updateDay = (req, res) => {
    Day.findOneAndUpdate({ _id: req.params.dayId}, req.body, { new: true }, (err, day) => {
        if (err) {
            res.send(err);
        }
        res.json(day);
    })
}

exports.deleteDay = (req, res) => {
    Day.remove({ _id: req.params.dayId }, (err, day) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted Day'});
    })
}