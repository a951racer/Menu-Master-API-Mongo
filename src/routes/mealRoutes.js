import { loginRequired} from '../controllers/userController';
const meals = require('../controllers/mealController');

module.exports = function(app) {
    app.route('/meal')
        .get(loginRequired, meals.getMeals)
        .post(loginRequired, meals.addNewMeal);
        //.get(meals.getMeals)
        //.post(meals.addNewMeal);

    app.route('/meal/:mealId')
        .get(loginRequired, meals.getMealWithID)
        .put(loginRequired, meals.updateMeal)
        .delete(loginRequired, meals.deleteMeal);
        //.get(meals.getMealWithID)
        //.put(meals.updateMeal)
        //.delete(meals.deleteMeal);
        
//    app.param('mealId', meals.getMealWithID);
}

