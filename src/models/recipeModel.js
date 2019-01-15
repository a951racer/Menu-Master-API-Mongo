import mongoose from 'mongoose';
//import IngredientSchema from './ingredientModel';
//const IngredientSchema = require('./ingredientModel');
const Ingredient = mongoose.model('Ingredient');

const Schema = mongoose.Schema;

export const RecipeSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a recipe name'
    },
    description: String,
    ingredients: [{  type: Schema.Types.ObjectId, ref: 'Ingredient' }]
}, {usePushEach: true});

mongoose.model('Recipe', RecipeSchema);
