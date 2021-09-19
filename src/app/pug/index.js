'use strict';

const pug = require(`pug`);

const {filterSass} = require(`./filters`);

pug.filters.sass = filterSass;
