var indexController = require('./controllers/index_controller');
var sessionController = require('./controllers/session_controller');
var advertiserController = require('./controllers/advertiser_controller');
var publisherController = require('./controllers/publisher_controller');
var adController = require('./controllers/ad_controller');

module.exports.construct = function(app) {
    /* Always be explicit about what requests each rout accepts */

    /* Index Controller Routes */
    app.get('/', indexController.index);
    app.get('/about', indexController.about);
    app.get('/terms', indexController.terms);
    app.get('/help', indexController.help);
    app.get('/demo', indexController.demo);

    app.get('/logout', sessionController.logout);

    /* Signup + Signin Controller Routes */
    app.get('/signup', sessionController.signup); // provide template

    app.get('/addad', adController.addPage);
    app.get('/deletead', adController.deletePage);
    app.get('/advertiser/dashboard', advertiserController.dashboard);
    app.get('/ad/untargeted', adController.untargeted);
    app.get('/ad/targeted',adController.targetadPage);
    app.post('/ad/targetad', adController.targeted);

    app.post('/ad/create', adController.create);
    app.post('/ad/delete', adController.deleteAd);



    app.post('/signin', sessionController.signin);

    app.post('/advertiser/create', advertiserController.create); //backend from /signup flow
    app.post('/publisher/create', publisherController.create); //backend from /signup flow



    /* Advertiser Dashboard Routes */
    app.get('/dashboard', advertiserController.dashboard);
    /* Publisher Dashboard Routes */
    app.post('/publisher/dashboard', publisherController.dashboard);
}

//comment