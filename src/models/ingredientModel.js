import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const IngredientSchema = new Schema({
    externalId: {
        type: String
    },
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
    },
    size: {
        type: String
    },
    price: {
        type: String
    },
    new: {
        type: Boolean,
        default: false
    },
    external: {
        type: Boolean,
        default: false
    },
    voiceTag: String
});

mongoose.model('Ingredient', IngredientSchema);