const path = require(`path`);

const NAMES_PATH = path.resolve(__dirname, `./names.txt`);
const SURNAMES_PATH = path.resolve(__dirname, `./surnames.txt`);
const AVATARS_URLS_PATH = path.resolve(__dirname, `./avatars-urls.txt`);
const ROLES_PATH = path.resolve(__dirname, `./roles.txt`);

module.exports = {NAMES_PATH, SURNAMES_PATH, AVATARS_URLS_PATH, ROLES_PATH};
