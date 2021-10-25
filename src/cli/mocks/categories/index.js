const {nanoid} = require(`nanoid`);

const {NANOID_ID_MAX_LENGTH} = require(`@root/src/constants`);

const {NAMES_PATH} = require(`./constants`);
const {readFile} = require(`../utils`);

/**
 * Имена категорий
 *
 * @readonly
 * @type {string[]}
 */
const names = readFile(NAMES_PATH);

/**
 * Генерирует категории в заданном количестве
 *
 * @param {number} amount
 * @return {Object[]}
 */
const generateCategories = (amount) => {
  const clampedAmount = Math.min(names.length, amount);

  return names.slice(0, clampedAmount).map((name) => ({
    name,
    id: nanoid(NANOID_ID_MAX_LENGTH),
  }));
};

module.exports = generateCategories;
