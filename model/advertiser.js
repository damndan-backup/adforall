/* Import Modules */
var Mongoose = require('mongoose');
var Utils = require('./utils');
var Schema = Mongoose.Schema;

/* =========================================================================== 
 * ============================= Model: Advertiser ===========================
 * =========================================================================*/

/* This Advertiser model holds information that are both low read, low write. 
 * Most of the information here won't change unless the advertiser explicitly 
 * chooses to do so. Automated updating doesn't ocurr here. 
 */
module.exports = Advertiser = {

    /* define_schema 
     * ================================
     * Define the schema for Advertiser Model. All Schema adding should go here 
     * Call once when server fires up */
    define_schema: function() {
        this.schema = new Schema;

        this.schema.add({
            // Use default Mongoose id for advertisers
            email: {
                type: String,
                required: true,
                index: {unique: true, sparse: true},
                set: Utils.toLower,
            },
            first_name: String,
            last_name: String,
            account_name: String, // should be company name
            website: String,
            address: String,
            zipcode: String,
            country: String,
            registration_date: {
                type: Date, 
                default: Date.now
            },
            password_digest: {
                type: String, // hashed password
                required: true,
            },
            password_salt: { 
                type: String,
                required: true,
            },
            is_admin: {
                type: Boolean,
                default: false,
            },
        });
    },

    /* define_model
    * =================================
    * Define the model & methods based on the schema. 
    * Make sure that all query & insert methods are defined here. Do not call
    * raw mongojs drivier / mongoose CRUD operations outside of the model file. 
    * When there's a need for a query not supported currently, add a method here. */
    define_model: function() { 
        this.defineStaticMethods();
        this.defineInstanceMethods();
        this.defineValidations();
        this.model = Mongoose.model('advertiser', this.schema);
    },

    defineStaticMethods: function () {

        this.schema.statics.createFromAttrs = function(attrs, password, callback) {
            var newAdvertiser = new this(attrs);
            newAdvertiser.password_salt = this.generatePasswordSalt();
            newAdvertiser.password_digest = this.generatePasswordDigest(password, newAdvertiser.password_salt);
            newAdvertiser.save(function (err, doc, num) {
                console.log("Successfully saved newAdvertiser");
                callback(err, doc);
            });
        };

        /* findByEmail
         * ======================================
         * */
        this.schema.statics.findByEmail = function(email,callback) {
            this.findOne({email:email}, callback);
        };

        /* generatePasswordDigest
         * ======================================
         * @param {string} password
         * @param {string} salt
         * @return {string} password_hash
         * */
        this.schema.statics.generatePasswordDigest = function(password, salt) {
            return Utils.generatePasswordDigest(password, salt);
        };

        this.schema.statics.generatePasswordSalt = function() {
            return Utils.generateRandomSalt();
        };

        this.schema.statics.acceptedAttrList = [
        'email', 'first_name', 'last_name', 'account_name', 
        'website', 'address', 'zipcode', 'country'
        ];
    },

    defineInstanceMethods: function () {
        /* Querying for children should be done through querying for all Ads
         * with parent_id = this.id*/
        this.schema.methods.getAllAds = function (callback) {
            var Ad = Mongoose.model('ad');
            Ad.find({parent_id: this.id}, callback);
        };

        /* validatePassword
         * ======================================
         * @param email
         * @param password
         * @param callback() 
         * takes in the email & password of the current user who wishes to login. 
         * queries the database for a match. If not found, return False 
         * callback receives an Advertiser model object */
        this.schema.methods.validatePassword = function(email, password, callback) {
            var salt = this.password_salt;
            var hash = Utils.generatePasswordDigest(password, salt);

            // Signin successful
            if (hash === this.password_digest) {
                callback(null, this);
            } else {
                callback('Password does not match', null);
            }
        };

    },

    defineValidations: function () {

        // EMAIL VALIDATION
        this.schema.path('email').validate(function (email) {
            return Utils.emailRegexp.test(email);
        }, 'invalid email address');

        this.schema.pre('save', function(next) {
            next();
        });

    },
}