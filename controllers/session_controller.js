var Utils = require('./utils');
var Mongoose = require('mongoose');
var Advertiser = Mongoose.model('advertiser');
var sessions_controller;

/* This Controller handles requests related to session handling. */
module.exports = sessions_controller = {

    /* Action: signup
     * ==========================================
     * GET: - Render either advertiser or publisher signup template */
    signup: function(req, res) {
        var type = req.query.type;
        res.render(Utils.getViewPath('session', type.concat('_signup')),
                    {
                        title: 'Sign Up for Splash',
                        csrfToken: req.csrfToken()
                    });
    },

    /* Action: signin
     * ==========================================
     * signs in a user with the given information. 
     * Check user type (advertiser, publisher, admin), validity, 
     * etc. */
    signin: function(req, res) {
        if (req.session.user_id) {
            console.log('Already signed in');
            res.redirect('/');
        } else {

           /* Determine the type of the requested user and dynamically handle
           Signing in */
            var type = req.query.type;
            var email = req.body.email;
            var password = req.body.password;
            var userModelByType = Mongoose.model(type);

            var user_id;
            var callback = function(err, user) {
                if (err) {
                    console.log("Error while logging in the user");
                    return;
                }

                user_id = user._id;


                /* Set the type of the session */
                req.session.type = type;
                req.session.user_id = user_id;
                res.redirect('/');
            }

            userModelByType.findByEmail(email, function(err, found){
                if (err) {
                    console.log("Error: " + err);
                    res.redirect('/'); // Please try again
                } else if(found) {
                    found.validatePassword(email, password, callback);
                } else {
                    console.log("Such email doesn't exist");
                    res.redirect('/'); // email doesn't exist error
                }
            }); 
        }

        

    },

    /* Action: logout 
     * ==========================================
     * Logout a user. */
    logout: function (req, res) {
        req.session.type = null;
        req.session.destroy(function(err) {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    }
}