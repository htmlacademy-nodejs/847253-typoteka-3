/**
 * @readonly
 * @type Object
 */
const CONFIG = {
  /**
   * Порт, на котором запускается приложение
   *
   * @type {number}
   */
  APP_PORT: process.env.APP_PORT ?? 8080,
};

module.exports = CONFIG;
