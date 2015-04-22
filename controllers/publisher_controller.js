var Utils = require('./utils');
var Publisher = require('mongoose').model('publisher');
var publisherController;

module.exports = publisherController = {

    dashboard: function (req, res) {

    },

    create: function (req, res) {
        var attrs = Utils.filterAttrs(req.body, Advertiser.acceptedAttrList);
        Publisher.createFromAttrs(attrs, req.body.password, function (err, publisher) {
            if (err) {
                console.log(err);
                res.json(JSON.stringify(err));
            } else {
                res.json(JSON.stringify(publisher));
            }
        });
    },

};
