const path = require(`path`);

const SENTENCES_MIN_AMOUNT = 2;
const SENTENCES_MAX_AMOUNT = 2;

const TEXT_SENTENCES_PATH = path.resolve(__dirname, `./text-sentences.txt`);

module.exports = {SENTENCES_MIN_AMOUNT, SENTENCES_MAX_AMOUNT, TEXT_SENTENCES_PATH};
