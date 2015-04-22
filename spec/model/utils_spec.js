var modelsUtils = require('../../model/utils');

/* Test generateRandomSalt */
describe('model/utils [function generateRandomSalt]', function () {
    it ('must return a randomized string of 88 characters', function () {
        var salt = modelsUtils.generateRandomSalt();
        expect(salt.length).toBe(88);
    });
});