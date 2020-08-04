import { loginRequired} from '../controllers/userController';
const days = require('../controllers/dayController');

module.exports = function(app) {
    app.route('/day')
        .get(loginRequired, days.getDays)
        .post(loginRequired, days.addNewDay);

    app.route('/day/:dayId')
        .get(loginRequired, days.getDayWithID)
        .put(loginRequired, days.updateDay)
        .delete(loginRequired, days.deleteDay);
}

