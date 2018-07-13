const webpack = require("webpack");
require("dotenv").config();

module.exports = {
    /**
     * This is used to define global constants using DefinePlugin that are configured during runtime.
     * This will make the process.env variables available to the React application at runtime.
     */
    webpack: config => {
        // accumulate and reduce the process.env variables to an object env
        // the initial value is set to {}
        const env = Object.keys(process.env).reduce((accumulator, currentValue) => {
            accumulator[`process.env.${currentValue}`] = JSON.stringify(process.env[currentValue]);
            return accumulator;
        }, {});

        // configure the env variables with DefinePlugin
        // ref: https://webpack.js.org/plugins/define-plugin/
        config.plugins.push(new webpack.DefinePlugin(env));
        return config;
    }
}