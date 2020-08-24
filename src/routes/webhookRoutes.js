const webhooks = require('../controllers/webhookController');


module.exports = function(app) {
    app.route('/webhook/addListItem')
        .post(webhooks.addListItem);
}
