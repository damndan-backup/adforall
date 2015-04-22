var Utils = require('./utils');
var Advertiser = require('mongoose').model('advertiser');
var Publisher = require('mongoose').model('publisher');
var Ad = require('mongoose').model('ad');
var adController;

module.exports = adController = {

    random: function (req, res) {
        var cpv = 0.1;
        var randomAd = Ad.getRandomAd(cpv, function (err, ad) {
            // do something with the returned ad
            if (err) {
                console.log('Error ocurred: ');
                console.log(err);
            } else {
                console.log(ad);
            }
        });
    },

    targetadPage: function(req, res) {
        res.render(Utils.getViewPath('ad', 'find_ad'),
            {
                title: 'Find an ad',
                csrfToken: req.csrfToken()
            });
    },

    targeted: function(req, res) {
        temp_target_info = req.body.targeting_info;
        if(!temp_target_info.time){
            temp_target_info.time = [0];
        }
        if(!temp_target_info.distance){
            temp_target_info.distance = null;
        }
        if(!temp_target_info.age){
            temp_target_info.age = [0];
        }

        target_info = {
            'distance': temp_target_info.distance,
            'loc': temp_target_info.loc,
            'time': temp_target_info.time,
            'age': temp_target_info.age,
            'sex': temp_target_info.sex
        };

        console.log(target_info);
        Ad.getTargetedAd(target_info, function(err, ad){
            console.log('inside callback');
            if(ad) {
                console.log(ad);
            } else {
                console.log(err);
            }

            res.redirect('/');
        });
    },

    untargeted: function(req, res) {
        Ad.getUntargetedAd(function(err, doc) {
            if(doc) {
                console.log(doc);
            } else {
                console.log(err);
            }
        });
        res.redirect('/');
    },

    // Renders template for adding 
    addPage: function(req, res) {
        res.render(Utils.getViewPath('ad', 'create_ad'),
                    {
                        title: 'Add an ad',
                        csrfToken: req.csrfToken()
                    });
    },

    // Renders template for deleting 
    deletePage: function(req, res) {
        res.render(Utils.getViewPath('ad', 'delete_ad'),
                    {
                        title: 'Delete an ad',
                        csrfToken: req.csrfToken()
                    });
    },

    // Create an add based on form
    create: function(req, res) {
        var attrs = Utils.filterAttrs(req.body, Ad.acceptedAttrList);
        console.log(req.session.user_id);
        if(req.session.user_id) {
            attrs['parent_id'] = req.session.user_id;
            Ad.createFromAttrs(attrs, function (err, ad) {
                if (err) {
                    console.log(err);
                    res.json(JSON.stringify(err));
                } else {
                    // res.json(ad.toJSON()); // for debugging

                    res.redirect('/'); // message about ID created, log in
                }
            });
        } else {
            console.log('Need to be logged in');
            res.redirect('/');
        }
    },

    deleteAd: function(req, res) { 
        var idstring = req.body.id;
        Ad.findOneAndRemove({_id: idstring}).remove(function(err, doc){
            if (err) {
                console.log(err);
                res.json(JSON.stringify(err));
            } else {
                console.log('Successfully deleted from database');
                res.redirect('/');
            }
        });

    },

    
};