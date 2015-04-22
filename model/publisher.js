var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Utils = require('./utils');

/* ========================================================================== 
 * =========================== Model: Publisher =============================
 * ======================================================================== */

 module.exports = Publisher = {

    define_schema: function () {
        var app_schema = new Schema(
            {
                name: String, // name of the application
                platform: [{type: Number, max: 5}], // there are in total 6 types of platforms.
                app_token: String, // automatically generated application token. This should be indexed
                website: String,
            }
        );

        this.schema = new Schema;

        this.schema.add(
            {
                email: {
                    type: String,
                    required: true,
                    index: {unique: true, sparse: true},
                    set: Utils.toLower, // store in lowercase
                },

                first_name: String,

                last_name: String,

                address: String,

                zipcode: String,

                country: String,

                registration_date : {
                    type: Date,
                    default: Date.now
                },

                password_digest: {
                    type: String,
                    require: true,
                },

                password_salt: {
                    type: String,
                    required: true,
                },

                publisher_key: {
                    type: String, //unique publisher key. Used for encryption
                    index: {unique: true, spares: true},
                },
                apps: [app_schema], //embedded docs of apps
            }
        );

    },

    define_model: function () {
        this.defineStaticMethods();
        this.defineInstanceMethods();
        this.defineValidations();
        this.model = Mongoose.model('publisher', this.schema);
    },

    defineStaticMethods: function () {
        this.schema.statics.acceptedAttrList = [
            'email', 'first_name', 'last_name', 'account_name',
            'website', 'address', 'zipcode', 'country'
        ];

        this.schema.statics.find_by_id = function(id, callback) {
            this.findOne({_id: id}, callback);
        };

        this.schema.statics.generatePasswordSalt = function () {
            return Utils.generateRandomSalt();
        };

        this.schema.statics.generatePasswordDigest = function (password, salt) {
            return Utils.generatePasswordDigest(password, salt);
        };
    },

    defineInstanceMethods: function () {
        /* Define Instance Methods */
        this.schema.methods.get_apps = function() {
            return this.apps;
        };

        this.schema.methods.validatePassword = function(password, callback) {
            var salt = this.password_salt;
            var hash = Utils.generatePasswordDigest(password, salt);

            if (hash === this.password_digest) {
                callback('Login Successful', this);
            } else {
                callback('Password does not match', null);
            }
        };

    },

    defineValidations: function () {
        this.schema.path('email').validate(function (email) {
            return Utils.emailRegexp.test(email);
        }, 'invalid email address');

        this.schema.pre('save', function (next) {
            next();
        });
    },
 }