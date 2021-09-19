'use strict';

// Модуль с утилитарными функция по работе с Express.js

const fs = require(`fs`);

const {Router} = require(`express`);

/**
 * Ошибка импортирования модуля-маршрутизатора
 *
 * @reason Импортируемый модуль-маршрутизатор не является экземпляром класса {@link Router}
 */
class RouterImportError extends Error {}

/**
 * Создаёт маршрутизатор, объединяющий другие маршрутизаторы из указанной директории
 *
 * @param {string} path Абсолютный путь до директории с модулями-маршрутизаторами, имена которых оканчиваются на "-router.js"
 * @return {Router} Маршрутизатор, объединяющий все маршрутизаторы из директории <path>
 * @throws {RouterImportError}
 * @example
 * createCombinedRouter(path.resolve(__dirname, `./routers`);
 */
const createCombinedRouter = (path) => {
  const combinedRouter = new Router();

  const filenames = fs.readdirSync(path);

  filenames
    .filter((fileName) => fileName.endsWith(`-router.js`))
    .forEach((fileName)=> {
      const probablyRouter = require(`${path}/${fileName}`);

      if (Object.getPrototypeOf(probablyRouter) !== Router) {
        throw new RouterImportError(`The imported module "${fileName}" does not provide any instance of the Router class`);
      }

      combinedRouter.use(probablyRouter);
    });

  return combinedRouter;
};

module.exports = {createCombinedRouter};
