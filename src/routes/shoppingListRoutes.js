import { loginRequired} from '../controllers/userController';
const shoppingLists = require('../controllers/listController');


module.exports = function(app) {
    app.route('/list')
        .get(loginRequired, shoppingLists.getLists)
        .post(loginRequired, shoppingLists.addNewList);

    app.route('/list/:listId')
        .get(loginRequired, shoppingLists.getListWithID)
        .put(loginRequired, shoppingLists.updateList)
        .delete(loginRequired, shoppingLists.deleteList);
    
    app.route('/list/item/:listId')
        .post(shoppingLists.addItem)

}
