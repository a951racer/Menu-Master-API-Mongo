const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const List = mongoose.model('ShoppingList');

exports.addNewList = (req, res) => {
    let newList = new List(req.body);

    newList.save((err, list) => {
        if (err) {
            res.send(err);
        }
        res.json(list);
    });
};

exports.getLists = (req, res) => {
    List.find()
        .populate('items.groceryItem')
        .sort({open: -1, date: -1})
        .exec((err, list) => {
        if (err) {
            res.send(err);
        }
        res.json(list);
    });
};

exports.getListWithID = (req, res) => {
    List.findById(req.params.listId).populate('items').exec((err, list) => {
        if (err) {
            res.send(err);
        }
        res.json(list);
    });
}

exports.updateList = (req, res) => {
    List.findOneAndUpdate({ _id: req.params.listId}, req.body, { new: true }, (err, list) => {
        if (err) {
            res.send(err);
        }
        res.json(list);
    })
}

exports.deleteList = (req, res) => {
    List.remove({ _id: req.params.listId }, (err, list) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted List'});
    })
}

exports.addItem = (req, res) => {
    List.findById(req.params.listId, (err, list) => {
        if (err) {
            res.send(err);
        }
        list.items.push(req.body.id)
        list.save((err) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                res.status(200).json(list);
              }          
        })
    });
}
