const gulp = require(`gulp`);
const plumber = require(`gulp-plumber`);
const sourcemap = require(`gulp-sourcemaps`);
const sass = require(`gulp-sass`)(require(`sass`));
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const concat = require(`gulp-concat`);
const csso = require(`gulp-csso`);

const {createNodeSassAliasImporter} = require(`@root/src/utils/node-sass`);

const COMPONENTS_STYLES_BY_PRIORITY_ORDER = [
  `./views/components/avatar/**/*.scss`,
  `./views/components/button/**/*.scss`,
  `./views/components/checkbox-input/**/*.scss`,
  `./views/components/icon/**/*.scss`,
  `./views/components/input/**/*.scss`,
  `./views/components/link/**/*.scss`,
  `./views/components/logo/**/*.scss`,
  `./views/components/page/**/*.scss`,
  `./views/components/paginator/**/*.scss`,
  `./views/components/plate/**/*.scss`,
  `./views/components/radio-input/**/*.scss`,
  `./views/components/stub/**/*.scss`,
  `./views/components/text/**/*.scss`,
  `./views/components/title/**/*.scss`,
  `./views/components/visual-editor-content/**/*.scss`,
  `./views/components/visually-hidden/**/*.scss`,

  `./views/components/post-card/**/*.scss`,
  `./views/components/post-card-list/**/*.scss`,
  `./views/components/information-plate/**/*.scss`,
  `./views/components/categories-navigation/**/*.scss`,
];

const STYLES_TO_COMPILE = [
  `./views/style/vars/index.scss`,
  `./views/style/mixins.scss`,
  ...COMPONENTS_STYLES_BY_PRIORITY_ORDER,
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
