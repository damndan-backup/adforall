var Utils = require('./utils');
var index_controller;
var advertiser = require('./advertiser_controller');

module.exports = index_controller = {

    index: function(req, res) {
        var context = {
            title: 'Splash',
            csrfToken: req.csrfToken()
        }

        console.log(req.session.user_id);

        if(req.session.user_id){
            res.redirect('/dashboard');
        } else {
            res.render(Utils.getViewPath('index', 'index'), context);
        }

    },

    demo: function(req, res) {
        res.render(Utils.getViewPath('index', 'demo'), {csrfToken: req.csrfToken()});
    },

    about: function(req, res) {
        res.render(Utils.getViewPath('index', 'about'), {title: 'About'});
    },

    terms: function(req, res) {
        res.render(Utils.getViewPath('index', 'terms'), {title: 'Terms & Conditions'});
    },

    help: function(req, res) {
        res.render(Utils.getViewPath('index', 'help'), {title: 'Help'});
    },
}

