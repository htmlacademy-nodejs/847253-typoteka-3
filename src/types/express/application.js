/**
 * Приложение Express
 *
 * @interface ExpressApplication
 *
 * @property {ExpressApplicationLocals}
 * @property {string} mountpath
 */

/**
 * @function
 * @name ExpressApplication#all
 *
 * @param {ExpressMiddlewarePath} path
 * @param {...ExpressMiddlewareFunction} callback
 * @return {ExpressApplication}
 */

/**
 * @function
 * @name ExpressApplication#delete
 *
 * @param {ExpressMiddlewarePath} path
 * @param {...ExpressMiddlewareFunction} callback
 * @return {ExpressApplication}
 */

/**
 * @function
 * @name ExpressApplication#disable
 *
 * @param {string} name
 * @return {ExpressApplication}
 */

/**
 * @function
 * @name ExpressApplication#disabled
 *
 * @param {string} name
 * @return {boolean}
 */

/**
 * @function
 * @name ExpressApplication#enable
 *
 * @param {string} name
 * @return {ExpressApplication}
 */

/**
 * @function
 * @name ExpressApplication#enabled
 *
 * @param {string} name
 * @return {boolean}
 */

/**
 * @function
 * @name ExpressApplicationEngineCallback
 *
 * @param {*} e
 * @param {string} [rendered]
 * @return {void}
 */

/**
 * @function
 * @name ExpressApplication#engine
 *
 * @param {string} ext
 * @param {function(path: string, options: object, callback: ExpressApplicationEngineCallback): void} callback
 * @return {ExpressApplication}
 */

/**
 * @function
 * @name ExpressApplication#get
 *
 * @param {string} name
 * @return {*}
 */

/**
 * @function
 * @name ExpressApplication#get
 *
 * @param {ExpressMiddlewarePath} path
 * @param {...ExpressMiddlewareFunction} callback
 */

/**
 * @function
 * @name ExpressApplication#listen
 *
 * @param {number} [port]
 * @param {string} [host]
 * @param {number} [backlog]
 * @param {function(): void} [callback]
 * @return {Server}
 */

/**
 * @function
 * @name ExpressApplication#param
 *
 * @param {string} name
 * @param {ExpressRequestParamHandler} callback
 * @return {ExpressApplication}
 */

/**
 * @function
 * @name ExpressApplication#path
 *
 * @return {string}
 */

/**
 * @function
 * @name ExpressApplication#post
 *
 * @param {ExpressMiddlewarePath} path
 * @param {...ExpressMiddlewareFunction} callback
 * @return {ExpressApplication}
 */

/**
 * @function
 * @name ExpressApplication#put
 *
 * @param {ExpressMiddlewarePath} path
 * @param {...ExpressMiddlewareFunction} callback
 * @return {ExpressApplication}
 */

/**
 * @function
 * @name ExpressApplication#render
 *
 * @param {string} view
 * @param {Object} [options]
 * @param {function(err: Error, html: string): void} callback
 * @return {void}
 */

/**
 * @function
 * @name ExpressApplication#route
 *
 * @param {string} path
 * @return {ExpressRouter}
 */

/**
 * @function
 * @name ExpressApplication#set
 *
 * @param {string} name
 * @param {*} value
 * @return {ExpressApplication}
 */

/**
 * @function
 * @name ExpressApplication#use
 *
 * @param {ExpressMiddlewarePath} [path]
 * @param {...ExpressMiddlewareFunction} callback
 * @return {ExpressApplication}
 */
