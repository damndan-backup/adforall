module.exports = utils = {

    /* get_view_location
     * ========================================== 
     * Do rails style matching between controller + action and views */
    getViewPath: function(controller, action) {
        // TODO: really simple now. come up with a better routing convention
        return controller + '/' + action;
    },

    /* getRootDir
     * ==========================================
     * returns the root directory */
    getRootDir: function() {
        return '../'; // this should be handled more gracefully later
    },

    /* importModel
     * ==========================================
     * returns the Model module by searching it from the root directory */
    importModel: function(modelName) {
        return require(this.getRootDir() + '/model/' + modelName);
    },

    filterAttrs: function(attrs, filter) {
        var newObj = {},
            length = filter.length,
            i, key;

        for (i = 0; i < length; i++) {
            key = filter[i];
            newObj[key] = attrs[key];
        }

        console.log(newObj);
        return newObj;
    },
}