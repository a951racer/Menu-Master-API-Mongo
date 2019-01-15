import { loginRequired} from '../controllers/userController';
const ingredients = require('../controllers/ingredientController');

module.exports = function(app) {
    app.route('/ingredient')
        //.get(loginRequired, ingredients.getIngredients)
        //.post(loginRequired, ingredients.addNewIngredient);
        .get(ingredients.getIngredients)
        .post(ingredients.addNewIngredient);

    app.route('/ingredient/:ingredientId')
        //.get(loginRequired, ingredients.getIngredientWithID)
        //.put(loginRequired, ingredients.updateIngredient)
        //.delete(loginRequired, ingredients.deleteIngredient);
        .get(ingredients.getIngredientWithID)
        .put(ingredients.updateIngredient)
        .delete(ingredients.deleteIngredient);
        
//    app.param('ingredientId', ingredients.getIngredientWithID);
}

