import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const DayDefaultSchema = new Schema({
    order: {
        type: Number,
        required: 'Enter the order of the day within the week'
    },
    name: {
        type: String,
        required: 'Enter a day name'
    },
    breakfast: {
        type: Boolean,
        default: false
    },
    lunch: {
        type: Boolean,
        default: false
    },
    dinner: {
        type: Boolean,
        default: false
    },

});

mongoose.model('DayDefault', DayDefaultSchema);