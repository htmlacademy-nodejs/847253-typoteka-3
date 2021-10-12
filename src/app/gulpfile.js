const gulp = require(`gulp`);
const plumber = require(`gulp-plumber`);
const sourcemap = require(`gulp-sourcemaps`);
const sass = require(`gulp-sass`)(require(`sass`));
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const concat = require(`gulp-concat`);
const csso = require(`gulp-csso`);

const {createNodeSassAliasImporter} = require(`@root/src/utils/node-sass`);

const STYLES_TO_COMPILE = [
  `./views/style/vars/index.scss`,
  `./views/style/mixins.scss`,
  `./views/components/**/*.scss`,
];

const style = () => {
  return gulp.src(STYLES_TO_COMPILE)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass({
      importer: createNodeSassAliasImporter(`~`, `../../node_modules`),
    }))
    .pipe(concat(`style.min.css`))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(sourcemap.write(`.`))
    .pipe(gulp.dest(`./public/css`));
};

const watch = () => {
  style();
  gulp.watch(STYLES_TO_COMPILE, style);
};

module.exports = {style, watch};
