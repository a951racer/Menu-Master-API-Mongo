import { loginRequired} from '../controllers/userController';
const mealSlots = require('../controllers/mealSlotController');

module.exports = function(app) {
    app.route('/mealSlot')
        .get(loginRequired, mealSlots.getMealSlots)
        .post(loginRequired, mealSlots.addNewMealSlot);

    app.route('/mealSlot/:mealSlotId')
        .get(loginRequired, mealSlots.getMealSlotWithID)
        .put(loginRequired, mealSlots.updateMealSlot)
        .delete(loginRequired, mealSlots.deleteMealSlot);
}

