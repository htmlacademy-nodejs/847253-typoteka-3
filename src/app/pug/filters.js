const sass = require(`sass`);

const {createNodeSassAliasImporter} = require(`@root/src/utils/node-sass`);

/* eslint-disable no-irregular-whitespace
        --------
        Необходим этот символ пробела */
/**
 * Символ неразрывного пробела нулевой ширины
 *
 * @readonly
 * @type {string}
 */
const ZERO_WIDTH_NO_BREAK_SPACE = `﻿`;
// eslint-enable no-irregular-whitespace

/**
 * Фильтрует входной SCSS, преобразуя его в сжатый CSS.
 *
 * @bug В некоторых случаях в сжатом CSS появляется {@link ZERO_WIDTH_NO_BREAK_SPACE}, который необходимо убирать, чтобы стили работали
 *
 * @param {string} data SCSS
 * @return {string} Сжатый CSS
 */
const filterSass = (data) => {
  return sass.renderSync({
    data,
    outputStyle: `compressed`,
    importer: createNodeSassAliasImporter(`~`, `node_modules`),
  }).css.toString().replace(new RegExp(ZERO_WIDTH_NO_BREAK_SPACE, `g`), ``);
};

module.exports = {filterSass};
