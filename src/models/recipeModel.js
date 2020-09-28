import mongoose from 'mongoose';
//import IngredientSchema from './ingredientModel';
//const IngredientSchema = require('./ingredientModel');
const Ingredient = mongoose.model('Ingredient');

const Schema = mongoose.Schema;
const IngredientSchema = new Schema({
    ingredient: {  type: Schema.Types.ObjectId, ref: 'Ingredient' },
    quantity: String
})

export const RecipeSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a recipe name'
    },
    description: String,
    ingredients: [],
    instructions: String
}, {usePushEach: true});

mongoose.model('Recipe', RecipeSchema);
