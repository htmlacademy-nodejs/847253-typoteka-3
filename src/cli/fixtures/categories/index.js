const {nanoid} = require(`nanoid`);

const {NANOID_ID_MAX_LENGTH} = require(`@root/src/constants`);

const {NAMES_PATH} = require(`./constants`);
const {readFile} = require(`../utils`);

const names = readFile(NAMES_PATH);

const generateCategories = (amount) => {
  const clampedAmount = Math.min(names.length, amount);

  return names.slice(0, clampedAmount).map((name) => ({
    name,
    id: nanoid(NANOID_ID_MAX_LENGTH),
  }));
};

module.exports = generateCategories;
