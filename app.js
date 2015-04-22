
/* =========================================================================== 
 * ======================= Ad Management Service = ===========================
 * =========================================================================*/

var ams = {
    
    /* initialize 
     * ==============================
     * load dependencies & external node modules, setup engines */ 
    initialize: function() {

        // load external modules
        var express = require('express');
        var Mongoose = require('mongoose');
        
        var path = require('path');
        var favicon = require('static-favicon');
        var logger = require('morgan');
        var cookieParser = require('cookie-parser');
        var bodyParser = require('body-parser');
        var expressSession = require('express-session'); //session
        var MongoStore = require('connect-mongo')(expressSession);
        var csrf = require('csurf')

        // initialize main express app.
        this.app = express();

        // Establish Mongoose Mongodb Connection
        var env = this.app.get('env');
        var uri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/'.concat(env);
        Mongoose.connect(uri);
        console.log(env);
        this.db = Mongoose.connection;
        this.db.on('error', console.error.bind(console, 'connection error: '));

        var db = this.db;

        // attach view engine to app
        this.app.set('views', path.join(__dirname, 'views')); // view files are in /views/
        this.app.engine('html', require('ejs').renderFile);
        this.app.engine('ejs', require('ejs-locals'));
        this.app.set('view engine', 'ejs');

        // attach modules to app
        //this.app.use(this.app.router);
        this.app.use(favicon());
        this.app.use(logger('dev'));
        this.app.use(cookieParser());
        this.app.use(expressSession(
                        {
                            secret:'sjang92',
                            saveUninitialized: true,
                            resave: true,
                            store: new MongoStore({
                                 mongoose_connection: db
                            })
                        })); //export to env 
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded());
        this.app.use(express.static(path.join(__dirname, 'public'))); // static files are in /public/
        this.app.use(csrf()); // ignore CSRF protection for now (not sure what to do yet)
    },

    /* setErrorHandlers
     * ===============================
     * set error handlers for routing. Must be called after setting the routes. */
    setErrorHandlers: function() {
        console.log('AMS: Setting Error Handlers');

        if (this.app == undefined) {    
            console.log("caught an attempt to set error handlers without initializing");
        } else {
            // Catch 404 Error and forward to error handler 
            this.app.use(function(err, req, res, next) {
                //console.log("Caught 404 Error");
                //var err = new Error('Not Found');
                //err.status = 404;
                res.render('error', {
                    message: err.message,
                    error: err
                });
                next(err);
            });

            // Error Handlers

            // 1) Dev Error Handler. print stack trace
            if (this.app.get('env') === 'development') {
                this.app.use(function(err, req, res, next) {
                    res.status(err.status || 500);
                    res.render('error', {
                        message: err.message,
                        error: err
                    });
                });
            }

            // 2) Production Error Handler
            this.app.use(function(err, req,res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: {}
                });
            });
        }
    },

    /* setRoutes
     * ================================
     * adds routes */
    setRoutes: function() {
        console.log('AMS: Setting Routes...');
        var routes = require('./routes');
        routes.construct(this.app);
    },

    /* set Database and configure some stuff, etc.*/
    setDatabase: function(reset) {
        // Import Mongoose & Model Data
        var Models = require('./model/models');
        var app = this;

        // Handle Database connection open
        this.db.once('open', function () {
            console.log('database open successful');
            // import models & seed data
            Models.initialize();
            if (reset) {
                Models.reset(Models.seed);
            }

            app.setRoutes();
            app.setErrorHandlers();
        });
    },

    setConfig: function() {
        var env = this.app.get('env');
        if (env === 'development') {
            // Set App level variables
            this.app.locals.title = 'Splash Developement';
        } else if (env === 'staging') {
            this.app.locals.title = "Splash Stage"
        } else {
            this.app.locals.title = 'Splash'
        }
    },
}

ams.initialize();
ams.setDatabase(false);
ams.setConfig();
/* export express app*/
module.exports = ams.app;

