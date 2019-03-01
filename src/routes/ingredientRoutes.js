import { loginRequired} from '../controllers/userController';
const ingredients = require('../controllers/ingredientController');

module.exports = function(app) {
    app.route('/ingredient')
        .get(loginRequired, ingredients.getIngredients)
        .post(loginRequired, ingredients.addNewIngredient);

    app.route('/ingredient/:ingredientId')
        .get(loginRequired, ingredients.getIngredientWithID)
        .put(loginRequired, ingredients.updateIngredient)
        .delete(loginRequired, ingredients.deleteIngredient);
        
    app.route('/ingredient/upload')
        .post(loginRequired, ingredients.upload);
}