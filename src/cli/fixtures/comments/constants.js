const path = require(`path`);

/**
 * Минимальное количество предложений в комментарии
 *
 * @readonly
 * @type {number}
 */
const SENTENCES_MIN_AMOUNT = 2;

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

module.exports = {SENTENCES_MIN_AMOUNT, SENTENCES_MAX_AMOUNT, TEXT_SENTENCES_PATH};
