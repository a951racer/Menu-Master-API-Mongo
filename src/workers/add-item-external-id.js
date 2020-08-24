const dotenv            = require('dotenv');
const configureMongoose = require('../../build/config/mongoose');
const mongoose          = require('mongoose');
const async             = require('async');

dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const db = configureMongoose();
const Ingredient = mongoose.model('Ingredient');

function run() {
  Ingredient.find((err, ingredients) => {
    if (err) {
        console.log(err);
        process.exit()
    }
    async.each(ingredients, (ingredient, next) => {
      let externalId = ingredient.productLink ? ingredient.productLink.split("/")[4] : null;
      ingredient.externalId = externalId;
      ingredient.new = false;
      ingredient.external = false;
      Ingredient.findOneAndUpdate({ _id: ingredient._id }, ingredient, (err, ingredient) => {
        if (err) {
          console.log(err);
          next(err);
        }
        next();
      });
    }, (err) => {
      console.log("done");
      process.exit();  
    });
  });
};

run();