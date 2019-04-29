import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const IngredientSchema = new Schema({
    name: {
        type: String,
        required: 'Enter an ingredient name'
    },
    description: {
        type: String
    },
    size: {
        type: String
    },
    productLink: {
        type: String
    },
    imageLink: {
        type: String
    }
});

mongoose.model('Ingredient', IngredientSchema);