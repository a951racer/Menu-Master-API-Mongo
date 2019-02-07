import mongoose from 'mongoose';
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';

const Recipe = mongoose.model('Recipe');
const Schema = mongoose.Schema;

export const MealSlotSchema = new Schema({
    meal: String,
    order: Number,
    recipes: [{  type: Schema.Types.ObjectId, ref: 'Recipe' }]
});

mongoose.model('MealSlot', MealSlotSchema);