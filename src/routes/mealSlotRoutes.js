import { loginRequired} from '../controllers/userController';
const mealSlots = require('../controllers/mealSlotController');

module.exports = function(app) {
    app.route('/mealSlot')
        .get(loginRequired, mealSlots.getMealSlots)
        .post(loginRequired, mealSlots.addNewMealSlot);
        //.get(meals.getMeals)
        //.post(meals.addNewMeal);

    app.route('/mealSlot/:mealSlotId')
        .get(loginRequired, mealSlots.getMealSlotWithID)
        .put(loginRequired, mealSlots.updateMealSlot)
        .delete(loginRequired, mealSlots.deleteMealSlot);
        //.get(meals.getMealWithID)
        //.put(meals.updateMeal)
        //.delete(meals.deleteMeal);
        
//    app.param('mealId', meals.getMealWithID);
}

