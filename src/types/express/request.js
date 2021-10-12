/**
 * Объект запроса
 *
 * @interface ExpressRequest
 *
 * @property {ExpressApplication} app
 * Приложения Express, использующее промежуточное ПО.
 * Примечание: {@link ExpressRequest.app} идентично свойству {@link ExpressResponse.app} в объекте ответа
 *
 * @property baseUrl
 * @property body
 * @property cookies
 * @property fresh
 * @property hostname
 * @property ip
 * @property ips
 * @property method
 * @property originalUrl
 * @property params
 * @property path
 * @property protocol
 * @property query
 * @property route
 * @property secure
 * @property signedCookies
 * @property stale
 * @property subdomains
 * @property xhr
 */

/**
 * Примечание: Возвращает *false*, если *types* не поддерживаются
 *
 * @function
 * @name ExpressRequest#accepts
 *
 * @param {string | string[]} types
 * @return {string | boolean}
 */

/**
 * @function
 * @name ExpressRequest#acceptsCharset
 *
 * @param {...string} charset
 */

/**
 * @function
 * @name ExpressRequest#acceptsEncoding
 *
 * @param {...string} encoding
 */

/**
 * @function
 * @name ExpressRequest#acceptsLanguages
 *
 * @param {...string} lang
 */

/**
 * @function
 * @name ExpressRequest#get
 *
 * @param {string} field
 */

/**
 * @function
 * @name ExpressRequest#is
 *
 * @param {string} type
 */

/**
 * @function
 * @name ExpressRequest#param
 *
 * @param {string} name
 * @param {string} [defaultValue]
 */

/**
 * @typedef ExpressRequestRangeOptions
 * @property {boolean} [combine]
 */

/**
 * @function
 * @name ExpressRequest#range
 *
 * @param {number} size
 * @param {ExpressRequestRangeOptions} [options]
 */
