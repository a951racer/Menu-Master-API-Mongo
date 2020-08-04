import { loginRequired } from '../controllers/userController';
const dayDefaults = require('../controllers/dayDefaultController');

module.exports = function(app) {
    app.route('/dayDefault')
        .get(loginRequired, dayDefaults.getDayDefaults)
        .post(loginRequired, dayDefaults.addNewDayDefault);

    app.route('/dayDefault/:dayDefaultId')
        .get(loginRequired, dayDefaults.getDayDefaultWithID)
        .put(loginRequired, dayDefaults.updateDayDefault)
        .delete(loginRequired, dayDefaults.deleteDayDefault);
}

