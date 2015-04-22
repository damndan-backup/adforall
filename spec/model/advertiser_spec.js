/* Add these three lines in model tests */
var mongoose = require('mongoose');
var advertiserMapper = require('../../model/advertiser');
advertiserMapper.define_schema();
advertiserMapper.define_model();
var Advertiser = mongoose.model('advertiser');

function startTest() {
    mongoose.connect('mongodb://localhost:27017/testdb');
    asyncSpecWait();

    Advertiser.remove({}, function (err, doc) {
        asyncSpecDone();
    });
};

function finishTest() {
    asyncSpecWait();
    Advertiser.remove({}, function (err, doc) {
        mongoose.disconnect();
        asyncSpecDone();
    });
};

describe('Advertiser new instance', function () {

    beforeEach(function () {
        startTest();
    });

    afterEach(function () {
        finishTest();
    });

    it ('must be successfully created and saved in the database', function () {
        var attrs = {
            email: 'test@splash.com',
        };

        Advertiser.createFromAttrs(attrs, '1234', function (err, advertiser) {
            expect(err).toBeNull();
            Advertiser.find(function (err, advertisers) {
                expect(advertisers.length).toBe(1);
                var newAdvertiser = advertisers[0];
                expect(newAdvertiser.email).toBe('test@splash.com');
                asyncSpecDone();
            });
        });

        asyncSpecWait();
    });

    it ('must throw a validation error without email', function () {
        var attrs = {};

        Advertiser.createFromAttrs(attrs, '1234', function (err, advertiser) {
            // Must contain an error object and a correct attr for the given attr
            expect(err).not.toBeNull();
            expect(err.errors.email).not.toBeNull();

            // Check that nothing was saved in the database
            Advertiser.find({}, function (err, advertisers) {
                expect(advertisers.length).toBe(0);
                asyncSpecDone();
            });
        });
        asyncSpecWait();
    });

    it ('must throw a validation error without password', function () {
        var attrs = {email: 'test@splash.com'};

        Advertiser.createFromAttrs(attrs, null, function (err, advertiser) {
            // Must contain an error object and a correct attr for the given attr
            expect(err).not.toBeNull();
            expect(err.errors.email).not.toBeNull();

            // Check that nothing was saved in the database
            Advertiser.find({}, function (err, advertisers) {
                expect(advertisers.length).toBe(0);
                asyncSpecDone();
            });
            asyncSpecDone();
        });

        asyncSpecWait();
    });

    it ('must throw a validation error if email exists', function () {
        var attrs = {email: 'test@splash.com'};

        Advertiser.createFromAttrs(attrs, '1234', function (err, advertiser) {
            var dupAttrs = {email: 'test@splash.com'};
            Advertiser.createFromAttrs(dupAttrs, '1234', function (err, advertiser) {
                expect(err).not.toBeNull();

                Advertiser.find({email: 'test@splash.com'}, function (err, advertisers) {
                    expect(err).toBeNull();
                    expect(advertisers.length).toBe(1);
                    expect(advertisers[0].email).toBe('test@splash.com');
                    asyncSpecDone();
                });
            });
        });
        asyncSpecWait();
    });

});

describe('Advertiser [function findByEmail]', function () {

    beforeEach(function () {
        startTest();
    });

    afterEach(function () {
        finishTest();
    });

    it ('correctly returns length 0 if there is no user with email found', function () {
        Advertiser.findByEmail('none@splash.com', function (err, advertiser) {
            expect(err).toBeNull();
            expect(advertiser.length).toBe(0);
            asyncSpecDone();
        });
        asyncSpecWait();
    });
});

describe('Advertiser [function validatePassword]', function () {

    beforeEach(function () {
        startTest();
    });

    afterEach(function () {
        finishTest();
    });

    it ('correctly validates if password & email combination matches', function () {
        var attrs = {email: 'test@splash.com'};
        Advertiser.createFromAttrs(attrs, '1234', function (err, advertiser) {
            expect(err).toBeNull();
            advertiser.validatePassword('1234', function (err, user) {
                expect(err).toBeNull();
                expect(user.email).toBe('test@splash.com');
                asyncSpecDone();
            });
        });
        asyncSpecWait();
    });
});

