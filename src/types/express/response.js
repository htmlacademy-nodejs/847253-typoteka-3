/**
 * Объект ответа
 *
 * @interface ExpressResponse
 * @property {ExpressApplication} app
 * Приложения Express, использующее промежуточное ПО.
 * Примечание: {@link ExpressResponse.app} идентично свойству {@link ExpressRequest.app} в объекте запроса
 *
 * @property {boolean} headersSent
 * Индикатор, указывающий, отправило ли приложение HTTP-заголовки для ответа
 *
 * @property {ExpressResponseLocals} locals Локальные переменные объекта ответа
 */

/**
 * Локальные переменные объекта ответа.
 * Объект, содержащий локальные переменные ответа, привязанные к запросу и, следовательно,
 * доступные только для представлений, отображаемых во время этого цикла запроса/ответа (если есть).
 * В противном случае это свойство идентично {@link ExpressApplication.locals локальным переменным приложения}.
 *
 * @typedef ExpressResponseLocals
 * @type Object
 */

/**
 * @function
 * @name ExpressResponse#send
 *
 * @param {Buffer | string | Object | boolean | Array} [body]
 * @return {ExpressResponse}
 */

/**
 * @function
 * @name ExpressResponse#status
 *
 * @param {HttpStatusCode} code
 * @return {ExpressResponse}
 */

/**
 * @function
 * @name ExpressResponse#render
 *
 * @param {string} view
 * @param Object [locals]
 * @param {function(error: Error, html: string): void} callback
 */
