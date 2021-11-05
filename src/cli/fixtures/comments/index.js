const {nanoid} = require(`nanoid`);

const {NANOID_ID_MAX_LENGTH} = require(`@root/src/constants`);
const {createAndFillArray} = require(`@root/src/utils/arrays`);
const {generateRandomNumber} = require(`@root/src/utils/generators`);

const {readFile, generateText} = require(`../utils`);
const {
  SENTENCES_MIN_AMOUNT,
  SENTENCES_MAX_AMOUNT,
  TEXT_SENTENCES_PATH,
} = require(`./constants`);

/**
 * Предложения, из которых будет сформирован текст для комментариев
 *
 * @readonly
 * @type {string[]}
 */
const textSentences = readFile(TEXT_SENTENCES_PATH);

/**
 * Генерирует комментарий
 *
 * @return {Object} Комментарий
 */
const generateComment = () => ({
  id: nanoid(NANOID_ID_MAX_LENGTH),
  user: nanoid(NANOID_ID_MAX_LENGTH),
  date: new Date().toISOString(),
  text: generateText(textSentences, generateRandomNumber(SENTENCES_MIN_AMOUNT, SENTENCES_MAX_AMOUNT)),
});

/**
 * Генерирует комментарии в заданном количестве
 *
 * @param {number} amount Количество комментариев
 * @return {Object[]} Записи
 */
const generateComments = (amount) => createAndFillArray(
    amount,
    () => generateComment()
);

module.exports = generateComments;
