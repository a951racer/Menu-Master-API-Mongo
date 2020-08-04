import { loginRequired} from '../controllers/userController';
const recipes = require('../controllers/recipeController');


module.exports = function(app) {
    app.route('/recipe')
        .get(loginRequired, recipes.getRecipes)
        .post(loginRequired, recipes.addNewRecipe);

    app.route('/recipe/:recipeId')
        .get(loginRequired, recipes.getRecipeWithID)
        .put(loginRequired, recipes.updateRecipe)
        .delete(loginRequired, recipes.deleteRecipe);
    
    app.route('/recipe/ingredient/:recipeId')
        .post(recipes.addIngredient)

}
