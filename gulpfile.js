const gulp = require(`gulp`);
const plumber = require(`gulp-plumber`);
const sourcemap = require(`gulp-sourcemaps`);
const sass = require(`gulp-sass`)(require('sass'));
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const concat = require(`gulp-concat`);
const csso = require(`gulp-csso`);

const STYLE_TO_COMPILE = [
  `src/express/views/style/vars/index.scss`,
  `src/express/views/style/mixins.scss`,
  `src/express/views/components/**/*.scss`,
];

const style = () => {
  return gulp.src(STYLE_TO_COMPILE)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(concat(`style.min.css`))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(sourcemap.write(`.`))
    .pipe(gulp.dest(`src/express/public/css`))
};

const watch = () => {
  style();
  gulp.watch(STYLE_TO_COMPILE, style);
};

module.exports = {style, watch};
