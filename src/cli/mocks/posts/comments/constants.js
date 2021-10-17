const path = require(`path`);

/**
 * Максимальное количество предложений в комментарии
 *
 * @readonly
 * @type {number}
 */
const SENTENCES_MAX_AMOUNT = 2;

/**
 * Путь до файла с предложениями из которых будет сформирован текст для комментария
 *
 * @readonly
 * @type {string}
 */
const TEXT_SENTENCES_PATH = path.resolve(__dirname, `./text-sentences.txt`);

module.exports = {SENTENCES_MAX_AMOUNT, TEXT_SENTENCES_PATH};
