'use strict';

const sass = require(`sass`);

// eslint-disable-next-line no-irregular-whitespace
const ZERO_WIDTH_NO_BREAK_SPACE = `﻿`;

/**
 * Фильтрует входной SCSS, преобразуя его в сжатый CSS.
 * @bug В некоторых случаях в сжатом CSS появляется {@link ZERO_WIDTH_NO_BREAK_SPACE}, который необходимо убирать, чтобы стили работали
 * @param {string} data SCSS
 * @return {string} Сжатый CSS
 */
const filterSass = (data) => sass.renderSync({
  data,
  outputStyle: `compressed`,
}).css.toString().replace(new RegExp(ZERO_WIDTH_NO_BREAK_SPACE, `g`), ``);

module.exports = {filterSass};
