/* Global namespace in file scope */
var Mongoose = require('mongoose');
var Advertiser = require('./advertiser');
var Ad = require('./ad');
var Publisher = require('./publisher');

var models;

/* ===========================================================================
 * ========================== MongoDB Database Module ========================
 * ========================================================================= */

/* module database
 * ====================================
 * Declare and export database module. */
module.exports = models = {

    initialize: function() {
        console.log('AMS - Models: Initializing models');

        //Campaign.define_schema();
        //Campaign.define_model();

        Ad.define_schema();
        Ad.define_model();

        Advertiser.define_schema();
        Advertiser.define_model();

        Publisher.define_schema();
        Publisher.define_model();
    },

    /* Wipes out the entire mongo database. 
     * Run callback function when done. Note that this is purely for testing
     * & dev purposes. */
    reset: function(callback) {
        var drop_publishers = function(callback) {
            Publisher.model.remove({}, callback);
        }

        var drop_publishers_callback = function(err) {
            if (!err) {
                console.log("Successfully deleted all publishers");
                callback();
            }
        }

        var drop_ads = function(callback) {
            Ad.model.remove({}, callback);
        }

        var drop_ads_callback = function(err) {
            if (!err) {
                console.log("Successfully deleted all ads");
                drop_publishers(drop_publishers_callback);
            }
        }

        var drop_advertisers = function(callback) {
            Advertiser.model.remove({}, callback);
        }

        var drop_advertisers_callback = function(err) {
            if (!err) {
                console.log("Successfully deleted all advertisers");
                drop_ads(drop_ads_callback);
            }
        }
        
        console.log("Deleting All Mongo documents...");
        drop_advertisers(drop_advertisers_callback);
    },

    /* Put seed data in the database 
     * TODO: All seed operations should be imported from seeds.js later */
    seed: function() {
        console.log("Seeding database with initial data...");

        /* Test advertiser */
        var test_advertiser = new Advertiser.model();
        test_advertiser.email = "sjang92@gmail.com";
        test_advertiser.first_name = "Se Won";
        test_advertiser.last_name = "Jang";
        test_advertiser.advertiser_name = "Test Advertiser";
        test_advertiser.zipcode = "94305";
        test_advertiser.country = "United States";

        test_advertiser.save(function(err, doc, num) {
            if (!err) {
                console.log("test advertiser saved successfully");
            } else {
                // an error is caused because Path 'password_salt', 'passwrod_digest'
                console.log("Error while saving test advertiser: " +  err);
            }
        });

        var test_ad = new Ad.model();
        test_ad.title = "Test Advertisment";
        test_ad.is_active = false;
        test_ad.start_date = Date.now();
        test_ad.end_date = Date.now();
        test_ad.parent_id = test_advertiser.id;
        test_ad.targeting_info = {
            sex: 0,
            loc: [0,0],
        }
        test_ad.budget = 200;

        test_ad.save(function(err, doc, num) {
            if (!err) {
                console.log("test ad saved successfully");
            } else {
                console.log("Error while saving test ad: " + err);
            }
        });

        var test_publisher = new Publisher.model();
        test_publisher.email = "sjang92@gmail.com";
        test_publisher.first_name = "Se Won";
        test_publisher.last_name = "Jang";

        test_publisher.save(function (err, doc, num) {
            if (!err) {
                console.log("test_publisher saved successfully");
            } else {
                // an error is caused because Path 'password_salt'
                console.log("Error while saving test publisher: " + err);
            }
        });

        var admin = new Advertiser.model();
        admin.email = 'admin@splash.com';
        admin.first_name='Admin';
        admin.last_name='Admin';
        admin.is_admin = true;
        admin.password_salt = Mongoose.model('advertiser').generatePasswordSalt();
        admin.password_digest = Mongoose.model('advertiser').generatePasswordDigest('1234', admin.password_salt);
        admin.save(function (err, doc, num) {
            if (!err) {
                console.log('admin saved successfully');
                console.log(doc);
            } else {
                console.log('Error while saving admin user');
                console.log(err);
            }
        });

        console.log(Mongoose.model('advertiser').schema.tree);
    },
}

