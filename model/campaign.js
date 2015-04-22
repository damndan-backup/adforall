var mongoose = require('mongoose');
var Advertiser = require('./advertiser');
var Schema = mongoose.Schema;

module.exports = Campaign = {

    define_schema: function() {

        // Not much usage in the beginning, but will find more later
        // this.purpose_enum = {
        //    NOT_SPECIFIED: 0,
        //    IMPRESSION: 1,
        //    // TODO: Add More purpose enum types
        // }

        this.schema = new Schema;

        this.schema.add({

            title: String,
            is_active: Boolean, // campaign can be turned off. turning this off should turn off all ads in it.
            // purpose: {type: Number, max: 5}, // hard coded string
            
            budget: Number,

            /* parent is Advertiser*/
            parent_id: String,
        });
    },

    define_model: function() {
        var _this = this;
        
        // Define Campaign Model
        
        /* Define Static Methods */
        this.schema.statics.find_by_id = function(id, callback) {
            return this.find({_id: id}, callback);
        }

        /* Define Instance Methods */
        this.schema.methods.get_parent = function(callback) {
            return Advertiser.schema.find({_id: _this.parent_id}, callback);
        }

        this.model = mongoose.model('campaign', this.schema);
    }
}