const menu = require('../controllers/menuController');

module.exports = function(app) {
    app.route('/menu')
        .get(menu.getMenu)

//    app.param('dayId', days.getDayWithID);
}

