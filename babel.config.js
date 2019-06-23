"use strict";

module.exports = (api) => {

    api.cache(true);

    const presets = [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "entry"
            }
        ]
    ];
    const plugins = [["@babel/plugin-proposal-class-properties", {loose: true}], "@babel/plugin-syntax-class-properties", ["@babel/plugin-proposal-private-methods", {loose: true}], "@babel/plugin-proposal-object-rest-spread"];

    return {
        presets,
        plugins
    };
};