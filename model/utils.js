var Crypto = require('crypto');

module.exports = Utils = {
    generateRandomSalt: function () {
        return salt = Crypto.randomBytes(64).toString('base64');
    },

    generatePasswordDigest: function (password, salt) {
        if (password) {
            return Crypto.createHash('md5').update(password.concat(salt)).digest('hex');
        } else {
            return null;
        }
    },

    toLower: function(string) {
        return string.toLowerCase();
    },

    encodePassword: function(password) {
        var salt = this.generateRandomSalt();
        return Crypto.createHash('md5').update(password.concat(salt)).digest('hex');
    },

    emailRegexp: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};