const sass = require(`sass`);

const filterSass = (data) => sass.renderSync({
  data,
  outputStyle: `compressed`,
  // eslint-disable-next-line no-irregular-whitespace
}).css.toString().replace(/﻿/g, ``);

module.exports = {filterSass};
