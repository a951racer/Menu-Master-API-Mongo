import mongoose from 'mongoose';

const MealSlot = mongoose.model('MealSlot');
const Schema = mongoose.Schema;

export const DaySchema = new Schema({
    date: Date,
    mealSlots: [{  type: Schema.Types.ObjectId, ref: 'MealSlot' }]
});

mongoose.model('Day', DaySchema);