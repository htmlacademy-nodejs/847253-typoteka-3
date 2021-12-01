const {nanoid} = require(`nanoid`);

const {NANOID_ID_MAX_LENGTH} = require(`@root/src/constants`);
const {getRandomArrayValue, createAndFillArray} = require(`@root/src/utils/arrays`);

const {readFile} = require(`../utils`);
const {NAMES_PATH, SURNAMES_PATH, AVATARS_URLS_PATH, ROLES_PATH} = require(`./constants`);

const names = readFile(NAMES_PATH);

const surnames = readFile(SURNAMES_PATH);

const avatarsUrls = readFile(AVATARS_URLS_PATH);

const roles = readFile(ROLES_PATH);

const generateUser = () => ({
  id: nanoid(NANOID_ID_MAX_LENGTH),
  name: getRandomArrayValue(names),
  surname: getRandomArrayValue(surnames),
  avatar: getRandomArrayValue(avatarsUrls),
  role: getRandomArrayValue(roles),
});

const generateUsers = (amount) => createAndFillArray(
    amount,
    generateUser
);

module.exports = generateUsers;
