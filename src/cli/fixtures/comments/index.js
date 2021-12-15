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

const textSentences = readFile(TEXT_SENTENCES_PATH);

const generateComment = () => ({
  id: nanoid(NANOID_ID_MAX_LENGTH),
  post: nanoid(NANOID_ID_MAX_LENGTH),
  user: nanoid(NANOID_ID_MAX_LENGTH),
  date: new Date().toISOString(),
  text: generateText(textSentences, generateRandomNumber(SENTENCES_MIN_AMOUNT, SENTENCES_MAX_AMOUNT)),
});

const generateComments = (amount) => createAndFillArray(
    amount,
    () => generateComment()
);

module.exports = generateComments;
