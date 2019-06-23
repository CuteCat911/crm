let Encore = require("@symfony/webpack-encore");

Encore
    .configureDefinePlugin((options) => {
        options.DEV = JSON.stringify(!Encore.isProduction());
    })
    .enableStylusLoader()
    .setOutputPath("public/build/")
    .setPublicPath("/build")
    .addEntry("common_js", "./assets/js/common.js")
    .addStyleEntry("common_css", "./assets/stylus/common.styl")
    .enablePostCssLoader((options) => {
        options.config = {
            path: "config/postcss.config.js"
        };
    })
    .enableVueLoader()
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
;

module.exports = Encore.getWebpackConfig();