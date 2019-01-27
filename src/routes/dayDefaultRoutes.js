import { loginRequired } from '../controllers/userController';
const dayDefaults = require('../controllers/dayDefaultController');

module.exports = function(app) {
    app.route('/dayDefault')
        //.get(loginRequired, dayDefaults.getDayDefaults)
        //.post(loginRequired, dayDefaults.addNewDayDefault);
        .get(dayDefaults.getDayDefaults)
        .post(dayDefaults.addNewDayDefault);

    app.route('/dayDefault/:dayDefaultId')
        //.get(loginRequired, dayDefaults.getDayDefaultWithID)
        //.put(loginRequired, dayDefaults.updateDayDefault)
        //.delete(loginRequired, dayDefaults.deleteDayDefault);
        .get(dayDefaults.getDayDefaultWithID)
        .put(dayDefaults.updateDayDefault)
        .delete(dayDefaults.deleteDayDefault);
        
//    app.param('dayDefaultId', dayDefaults.getDayDefaultWithID);
}

