'use strict';

const fs = require(`fs`).promises;

const chalk = require(`chalk`);

/**
 * Записывает JSON в файл
 *
 * @param {string} path Путь, включая имя файла и его расширение
 * @param {string} data Данные, подлежащие сохранению
 * @return {Promise<void>}
 * @throws {Error} Ошибка из {@link fs.writeFile}
 */
const writeJsonToFile = async (path, data) => {
  try {
    await fs.writeFile(path, JSON.stringify(data));

    console.info(
        chalk.green(`Данные успешно записаны в "${path}"`)
    );
  } catch (error) {
    console.error(
        chalk.red(`Не удалось произвести запись в "${path}"`)
    );

    throw error;
  }
};

/**
 * Читает файл
 *
 * @param {string} path Путь, включая имя файла и его расширение
 * @return {Promise<string[]>} Содержимое файла
 * @throws {Error} Ошибка из {@link fs.readFile}
 */
const readFile = async (path) => {
  try {
    return (await fs.readFile(path))
      .toString()
      .split(`\n`)
      .filter((line) => line.length > 0);
  } catch (error) {
    console.error(
        chalk.red(`Не удалось прочитать файл "${path}"\n${error}`)
    );

    throw error;
  }
};

module.exports = {writeJsonToFile, readFile};
