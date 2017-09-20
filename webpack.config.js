var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');
var webpack = require('webpack');

module.exports = function () {
    useDefaultConfig.plugins.push(
    	new webpack.EnvironmentPlugin(['IONIC_ENV'])
    );

    return useDefaultConfig;
}