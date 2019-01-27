const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DayDefault = mongoose.model('DayDefault');

exports.addNewDayDefault = (req, res) => {
    let newDayDefault = new DayDefault(req.body);

    newDayDefault.save((err, dayDefault) => {
        if (err) {
            res.send(err);
        }
        res.json(dayDefault);
    });
};

exports.getDayDefaults = (req, res) => {
    DayDefault.find({}, (err, dayDefault) => {
        if (err) {
            res.send(err);
        }
        res.json(dayDefault);
    });
};

exports.getDayDefaultWithID = (req, res) => {
    DayDefault.findById(req.params.dayDefaultId, (err, dayDefault) => {
        if (err) {
            res.send(err);
        }
        res.json(dayDefault);
    });
}

exports.updateDayDefault = (req, res) => {
    DayDefault.findOneAndUpdate({ _id: req.params.dayDefaultId}, req.body, { new: true }, (err, dayDefault) => {
        if (err) {
            res.send(err);
        }
        res.json(dayDefault);
    })
}

exports.deleteDayDefault = (req, res) => {
    DayDefault.remove({ _id: req.params.dayDefaultId }, (err, dayDefault) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted DayDefault'});
    })
}