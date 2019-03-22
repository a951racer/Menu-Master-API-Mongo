import mongoose from 'mongoose';

const MealSlot = mongoose.model('MealSlot');
const Schema = mongoose.Schema;

export const DaySchema = new Schema({
    date: Date,
    note: String,
    mealSlots: [{  type: Schema.Types.ObjectId, ref: 'MealSlot' }]
});

mongoose.model('Day', DaySchema);