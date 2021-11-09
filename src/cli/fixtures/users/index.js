const {nanoid} = require(`nanoid`);

const {NANOID_ID_MAX_LENGTH} = require(`@root/src/constants`);
const {getRandomArrayValue, createAndFillArray} = require(`@root/src/utils/arrays`);

const {readFile} = require(`../utils`);
const {NAMES_PATH, SURNAMES_PATH, AVATARS_URLS_PATH, ROLES_PATH} = require(`./constants`);

/**
 * Имена
 *
 * @readonly
 * @type {string[]}
 */
const names = readFile(NAMES_PATH);

/**
 * Фамилии
 *
 * @readonly
 * @type {string[]}
 */
const surnames = readFile(SURNAMES_PATH);

/**
 * Ссылки на аватары
 *
 * @readonly
 * @type {string[]}
 */
const avatarsUrls = readFile(AVATARS_URLS_PATH);

/**
 * Роли
 *
 * @readonly
 * @type {string[]}
 */
const roles = readFile(ROLES_PATH);

/**
 * Генерирует пользователя
 *
 * @return {Object} Пользователь
 */
const generateUser = () => ({
  id: nanoid(NANOID_ID_MAX_LENGTH),
  name: getRandomArrayValue(names),
  surname: getRandomArrayValue(surnames),
  avatar: getRandomArrayValue(avatarsUrls),
  role: getRandomArrayValue(roles),
});

/**
 * Генерирует пользователей в заданном количестве
 *
 * @param {number} amount Количество пользователей
 * @return {Object[]} Пользователи
 */
const generateUsers = (amount) => createAndFillArray(
    amount,
    generateUser
);

module.exports = generateUsers;
