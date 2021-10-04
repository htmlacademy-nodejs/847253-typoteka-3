'use strict';

const path = require(`path`);

const createNodeSassAliasImporter = (alias, actualPath) => (url) => {
  return {file: url.startsWith(alias) ? path.resolve(actualPath, url.substr(1)) : url};
};

module.exports = {createNodeSassAliasImporter};
