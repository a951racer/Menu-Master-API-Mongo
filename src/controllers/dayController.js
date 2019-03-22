const async = require('async')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const Day = mongoose.model('Day')
const MealSlot = mongoose.model('MealSlot');

exports.getDays = (req, res) => {
    const today = moment().utcOffset('America/Chicago').startOf('day').toDate();
    Day.find({date: {$gte: today}})
        .sort({date: 1})
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
        .sort('date')
        .exec(function(err, day) {
        if (err) {
            res.send(err);
        }
        res.json(day);
    });
}

exports.addNewDay = (req, res) => {
    let day = req.body
    let slotList = []
    day.mealSlots.forEach((slot) => {
        if (!slot._id) {
            const newSlot = new MealSlot(slot)
            slotList.push(newSlot)
            newSlot.save((err, savedSlot) => {

            })
        } else {
            slotList.push(slot)
        }
    })
    day.mealSlots = slotList
    const newDay = new Day(day)
    newDay.save((err, day) => {
        if (err) {
            res.send(err);
        }
        res.json(day);
    });
};

exports.updateDay = (req, res) => {
    let day = req.body
    let slotList = []
    day.mealSlots.forEach((slot) => {
        if (!slot._id) {
            const newSlot = new MealSlot(slot)
            slotList.push(newSlot)
            newSlot.save((err, savedSlot) => {

            })
        } else {
            slotList.push(slot)
        }
    })
    day.mealSlots = slotList
    Day.findOneAndUpdate({ _id: req.params.dayId}, day, { new: true }, (err, day) => {
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

function buildSlotList(slots) {
    let slotList = []
    slots.forEach(slot => {
        console.log('slot: ', slot)
        const newSlot = findSlot(slot)
        console.log('returned slot: ', newSlot)
        slotList.push(newSlot)
        console.log('slot list: ', slotList)
    })
    console.log('slotList: ', slotList)
    return slotList
}

function findSlot(slot) {
    MealSlot.findById(slot._id, (err, foundSlot) => {
        if (err) res.send(err)
        if (!foundSlot) {
            console.log('slot not found')
            delete slot._id
            let newMealSlot = new MealSlot(slot)
            newMealSlot.save((err, newSlot) => {
                if (err) res.send(err)
                return newSlot
            })
        } else {
            console.log('slot found: ', slot)
            return slot
        }
    })
}