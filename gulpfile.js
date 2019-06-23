const gulp = require("gulp");
const sprite = require("gulp-svg-sprite");
const plumber = require("gulp-plumber");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");
// const pngSprite = require("gulp.spritesmith");
// const merge = require("merge-stream");
// const imagemin = require("gulp-imagemin");
// const mozjpeg = require("imagemin-mozjpeg");
// const pngquant = require("imagemin-pngquant");
//
// imagemin.mozjpeg = mozjpeg;
// imagemin.pngquant = pngquant;
//
gulp.task("svg", function() {
    return gulp.src("./assets/sprites/svg/*.svg")
            .pipe(plumber())
            .pipe(cheerio({
              run: function($) {
                $("[fill]").removeAttr("fill");
                $("[stroke]").removeAttr("stroke");
                $("[style]").removeAttr("style");
              },
              parserOptions: {
                xmlMode: true
              }
            }))
            .pipe(replace("$&t;", ">"))
            .pipe(sprite({
                log: "debug",
                mode: {
                    symbol: {
                        sprite: "svg-sprite.svg",
                        dest: ""
                    }
                }
            }))
            .on("error", function(error) {
              console.log(error);
            })
            .pipe(gulp.dest("public/"));
});

gulp.task("color_svg", function() {
    return gulp.src("assets/sprites/color-svg/*.svg")
            .pipe(plumber())
            .pipe(replace("$&t;", ">"))
            .pipe(sprite({
                log: "debug",
                mode: {
                    symbol: {
                        sprite: "color-svg-sprite.svg",
                        dest: ""
                    }
                }
            }))
            .on("error", function(error) {
              console.log(error);
            })
            .pipe(gulp.dest("public/"));
});

gulp.task("imgs:optimize", function() {
    return gulp.src("public/imgs/**")
            .pipe(imagemin([
                imagemin.mozjpeg({progressive: true, quality: 50}),
                imagemin.pngquant({quality: 80})
            ], {
                verbose: true
            }))
            .pipe(gulp.dest("public/imgs"))
});