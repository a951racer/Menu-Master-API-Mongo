import mongoose from 'mongoose';

const Recipe = mongoose.model('Recipe');
const Schema = mongoose.Schema;

export const MealSchema = new Schema({
    name: String,
    order: Number,
    recipes: [{  type: Schema.Types.ObjectId, ref: 'Recipe' }]
});

mongoose.model('Meal', MealSchema);