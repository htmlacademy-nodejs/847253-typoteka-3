'use strict';

module.exports = {
  /**
   * Порт, на котором запускается приложение
   */
  port: process.env.APP_PORT || 8080,
  /**
   * Шаблонизатор
   */
  viewEngine: `pug`,
  /**
   * Необходимо ли кэшировать представления
   */
  viewCache: false,
  /**
   * Имя директории с представлениями
   */
  views: `views`,
  /**
   * Имя директории с публичной статикой
   */
  public: `public`,
};
