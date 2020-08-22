import { loginRequired} from '../controllers/userController';
const meals = require('../controllers/mealController');

module.exports = function(app) {
    app.route('/meal')
        .get(loginRequired, meals.getMeals)
        .post(loginRequired, meals.addNewMeal);

    app.route('/meal/:mealId')
        .get(loginRequired, meals.getMealWithID)
        .put(loginRequired, meals.updateMeal)
        .delete(loginRequired, meals.deleteMeal);
}

