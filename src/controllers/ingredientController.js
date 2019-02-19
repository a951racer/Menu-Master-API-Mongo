const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const Ingredient = mongoose.model('Ingredient');

exports.addNewIngredient = (req, res) => {
    let newIngredient = new Ingredient(req.body);
    newIngredient.save((err, ingredient) => {
        if (err) {
            res.send(err);
        }
        res.json(ingredient);
    });
};

exports.getIngredients = (req, res) => {
    Ingredient.find()
        .sort({name: 1})
        .exec((err, ingredient) => {
        if (err) {
            res.send(err);
        }
        res.json(ingredient);
    });
};

exports.getIngredientWithID = (req, res) => {
    Ingredient.findById(req.params.ingredientId, (err, ingredient) => {
        if (err) {
            res.send(err);
        }
        res.json(ingredient);
    });
}

exports.updateIngredient = (req, res) => {
    Ingredient.findOneAndUpdate({ _id: req.params.ingredientId}, req.body, { new: true }, (err, ingredient) => {
        if (err) {
            res.send(err);
        }
        res.json(ingredient);
    })
}

exports.deleteIngredient = (req, res) => {
    Ingredient.remove({ _id: req.params.ingredientId }, (err, ingredient) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted Ingredient'});
    })
}

exports.upload = (req, res) => {
    var form = new IncomingForm();
    let readStream;
    form.on('file', (field, file) => {
      fs.readFile(file.path, (err, data) => {
        if (err) console.error(err);
        const records = parse(data, {
            columns: true,
            skip_empty_lines: true
          });
        records.forEach(ingredient => {
            let newIngredient = new Ingredient(ingredient);
            newIngredient.save((err, ingredient) => {
                if (err) console.error(err);
            });
        });
      })
    });
    form.on('end', () => {
      res.json();
    });
    form.parse(req);
}