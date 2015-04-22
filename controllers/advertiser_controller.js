var Utils = require('./utils');
var Mongoose = require('mongoose');
var Advertiser = Mongoose.model('advertiser');
var Ad = Mongoose.model('ad');
var advertiserController;

module.exports = advertiserController = {

    /* Action: index
     * ==========================================
     * renders the index page of the dashboard. This index page contains nav
     * items that allow the  */
    dashboard: function (req, res) {
        console.log("Dashboard: ");
        Ad.find_by_advertiser(req.session.user_id, function(err, ad) {
            console.log(req.session.user_id);
            var length = ad.length;
            console.log(length);
            var i;

            for(i=0; i<length; i++) {
                console.log("Advertisement " + i);
                console.log(ad[i].title);
                console.log(ad[i].start_date);
                console.log(ad);
            }

            var context = {
                csrfToken: req.csrfToken(),
                ad: ad
            }

            res.render(Utils.getViewPath('index', 'dashboard'), context);
        });
    },
    
    /* Action: create
     * ==========================================
     * creates an advertiser document from the given parameters. 
     * Parameters are stored in req.body
     * In order to change the params that are inserted when an advertiser is
     * created, edit Advertiser.acceptedAttrList
     * This action sends back a json response, 
     *      1) If Validation Fails
                Sends back the err object returned by Mongoose model
            2) Succeeds
                Sends back the _id of the new advertiser object
                Once the frontend AJAX block receives a valid user id, it must
                redirect the user to a diff page (Email Verification)
     */
    create: function (req, res) {
        var attrs = Utils.filterAttrs(req.body, Advertiser.acceptedAttrList);
        Advertiser.createFromAttrs(attrs, req.body.password, function (err, advertiser) {
            if (err) {
                console.log(err);
                res.json(JSON.stringify(err));
            } else {
                // res.json(advertiser.toJSON()); // for debugging

                res.redirect('/'); // message about ID created, log in
            }
        });
    },
};