var mongoose = require('mongoose');
var Campaign = require('./campaign');
var Advertiser = require('./advertiser');
var Schema = mongoose.Schema;
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var fs = require('fs');
var zlib = require('zlib');


module.exports = Ad = {

    define_schema: function() {
        this.schema = new Schema;

        /* TODO: Figure out a way to store daily, and even hourly view count */
        this.schema.add({
            title: {
                type: String,
                required: true,
            },
            is_active: Boolean,
            start_date: {
                type: Date,
                //required: true,
            },
            end_date: {
                type: Date,
            },
            parent_id: String, // _id of an advertiser document 

            targeting_info: {
                sex: {
                    type: Number, 
                    max: 2,
                    default: 0
                },
                age: {
                    type: [Number],
                    default: [0]
                },
                time: {
                    type: [Number],
                    default: [0]
                },
                loc: {
                    type: [Number], 
                    index: {
                        type:'Point', 
                        sparse: true
                    },
                },
                distance: {
                    type: Number
                },
            },

            budget: { // total amount of money for the ad
                type: Number,
                index: true,
                default: 0,
            },

            burnRate: { // amount of money paid to user when listening to the ad
                type: Number,
                default: 0,
            },

            random: { // To allow random querying of ads
                type: Number,
                index: true,
                default: Math.random(),
            },

            content: {
                type: String,
            },

            totalListens: {
                type: Number,
                default: 0
            },

            monthlyListens: {
                type: [Number],
                default: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },

            averageDistance: {
                type: Number,
                default: 0
            },

            totalLikes: {
                type: Number,
                default: 0
            },

            percentLiked: {
                type: Number,
                default: 0
            },

            averageAge: {
                type: Number,
                default: 0
            }
        });
    },

    define_model: function() {
        this.defineStaticMethods();
        this.defineInstanceMethods();
        this.defineValidations();
        this.model = mongoose.model('ad', this.schema);
    },

    defineStaticMethods: function () {
        /* Define Static Methods */
        this.schema.statics.find_by_id = function(id, callback) {
            return this.find({_id: id}, callback);
        }

        this.schema.statics.find_by_advertiser = function(id, callback) {
            return this.find({parent_id: id}, callback);
        }

        /* Static: find_random_candidate 
         * ======================================
         * Returns a random Ad from all servable ads */
        this.schema.statics.find_random_candidate = function(callback) {
            return null;
        }

        /* Static: find_candidates*/
        this.schema.statics.find_candidates = function(targeting_info, callback) {
            if(!targeting_info.age){
                targeting_info.age = [0];
            }

            if(targeting_info.sex === '0') { // Find a function that does this later
                targeting_info.sex = 0;
            } else if (targeting_info.sex === '1') {
                targeting_info.sex = 1;
            } else {
                targeting_info.sex = 2;
            }


            // find location + distance that covers the location given in targeting_info
            if (JSON.stringify(targeting_info.loc) == JSON.stringify(['',''])) {
                targeting_info.distance = null;
                targeting_info.loc = [null, null];
                console.log(targeting_info);
                return this.find({targeting_info: targeting_info}, callback); 
            } else {
                console.log('Inside location search');
                var targetInfo = targeting_info;

                // targetInfo.distance = {};
                // targetInfo.loc = {};

                queryInfo = {
                    distance: {$exists: true},
                    loc: {$exists: true},
                    time: targetInfo.time,
                    age: targetInfo.age,
                    sex: targetInfo.sex
                };

                console.log(queryInfo);
                console.log('^target Info');


                // for now just find everything and go through each one... 
                this.find({targeting_info: {$exists: true}}, function(err, ads){
                    console.log("Everything found: ");
                    console.log(ads);
                    var newads = [];
                    ads.forEach( function(ad) {

                        if (ad.targeting_info.sex == queryInfo.sex && 
                            ad.targeting_info.age.indexOf(queryInfo.age) >= 0 && 
                            ad.targeting_info.time.indexOf(queryInfo.time) >= 0 && ad.targeting_info.distance && ad.targeting_info.loc) {

                            if (Math.pow(targetInfo.loc[0] - ad.targeting_info.loc[0],2) + Math.pow(targetInfo.loc[1] - ad.targeting_info.loc[1],2) <= Math.pow(ad.targeting_info.distance,2)){
                                newads.push(ad);
                            }
                        }
                    });

                    console.log("The result: ");
                    console.log(newads);
                }); 

                
            }
            
        }

        this.schema.statics.createFromAttrs = function(attrs, callback) {
            var newAd = new this(attrs);
            newAd.save(function (err, doc, num) {
                console.log("Successfully saved newAd");
                callback(err, doc);
            });
        };

        this.schema.statics.acceptedAttrList = [
        'title', 'is_active', 'start_date', 'end_date',
        'targeting_info', 'budget', 'burnRate', 'content'
        ];



        /* Don't user his in production to serve ads. For testing purposes */
        this.schema.statics.getRandomAd = function(cpv, callback) {
            var rand = Math.random();
            var gteTarget = {
                budget: {
                    $gte: cpv,
                }, 
                random: {
                    $gte: rand,
                },
            };
            var lteTarget = {
                budget: {
                    $gte: cpv,
                },
                random: {
                    $gte: rand,
                },
            };

            this.findOne(gteTarget, function (err, ad) {
                if (err) {
                    callback(err, null);
                } else {

                    if (ad) {
                        callback(null, ad);
                    } else {
                        this.findOne(lteTarget, function (err, ad) {
                            if (err) {
                                callback(err, null);
                            } else {
                                if (ad) {
                                    callback(null, ad);
                                } else {
                                    callback(err, ad);
                                }
                            }
                        });
                    }
                }
            });
        };

        /* Method to get an advertisment not based on targeting info 
         * Is it safe to load all ads first, and then process that info? 
         * Proposed Mechanism: Load Ad infos onto the RAM by using Redis, 
         * And let this be refreshed every n minutes. This way, ad infos do not
         * need to be fetched from the database every time. 
         * In short, RAM = {Ad targeting infos } 
         *           mongoDB = {Full Ad Info }*/
        this.schema.statics.getUntargetedAd = function(callback) {
            // Things to consider when fetching an untargeted ad: 
            // 1) Cost, 2) Location? 3) Remaining budget 4) Burn rate? 
            var noInfo = {
                distance: 0,
                loc: [0, 0],
                time: [0],
                age: [0],
                sex: 0,

            }

            console.log(noInfo);

            this.find({targeting_info: noInfo}, function(err, ads) {
                console.log('ads: ' + ads);
                if (err) {
                    callback(err, null);
                } else {
                    var rand;
                    var length = ads.length;
                    console.log('length: ' + length);
                    if (length != 0) {
                        while (true) {
                            rand = Math.floor(Math.random()*length);
                            console.log('rand: ' + rand);
                            if(ads[rand].budget >= ads[rand].burnRate) {
                                break;
                            }
                        }                       
                    }


                    callback(null, ads[rand]);
                }
            });

        };

        /* Method to get an advertisment based on the given targeting info */
        this.schema.statics.getTargetedAd = function (targetInfo, callback) {
                target_info = targetInfo;
                //target_info.budget = {$gt : 0};
                this.find_candidates(target_info, function(err, ads) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else {
    
                        var rand;
                        var length = ads.length;
                        
                        var i = 0;                        
                        console.log(length);
                        while (i < length) {
                            
                            rand = Math.floor(Math.random()*length);
                            console.log("rand " + rand);
                            if(ads[rand].budget >= ads[rand].burnRate) {
                                break;
                            }

                            i++;
                        }

                        if (length == 0 || ads[rand].budget < ads[rand].burnRate) {
                            callback('No ads matching', null);
                        } else {
                            callback(null, ads[rand]);
                        }

                    }
                });

        };
    }, 

    defineInstanceMethods: function () {

    },

    defineValidations: function () {

    },
}