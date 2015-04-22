var controllerUtils = require('../../controllers/utils');

describe('controllers/utils [function filterAttrs]', function () {
    it ('must filter the keys in a given object', function () {
        var obj = {
            a: 1,
            b: 2,
            c: 3,
        };
        var filter = ['a', 'b'];

        var filtered = controllerUtils.filterAttrs(obj, filter);
        expect(filtered['a']).toBe(1);
        expect(filtered['b']).toBe(2);
        expect(filtered['c']).toBeUndefined();
    });
});