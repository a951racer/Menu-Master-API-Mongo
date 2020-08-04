import mongoose from 'mongoose';

const Ingredient = mongoose.model('Ingredient');
const Schema = mongoose.Schema;

export const ListSchema = new Schema({
    date: {
      type: Date,
      default: Date.now
    },
    note: String,
    open: {
      type: Boolean,
      default: true},
    items: [
      {
        groceryItem: {
          type: Schema.Types.ObjectId,
          ref: 'Ingredient'
        },
        complete: {
          type: Boolean,
          default: false
        }
      }
    ]
});

mongoose.model('ShoppingList', ListSchema);