/**
 * @readonly
 * @type {object}
 */
const CONFIG = {
  /**
   * Порт, на котором запускается приложение
   *
   * @type {number}
   */
  API_PORT: process.env.API_PORT ?? 8081,
};

module.exports = CONFIG;
