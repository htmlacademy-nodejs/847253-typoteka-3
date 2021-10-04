'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const {HttpStatusCode} = require(`@root/src/constants`);

const CONFIG = require(`@api/config`);

const PostsRouter = require(`./posts/posts.router`);

class App {
  /**
   * @type {App}
   */
  static instance = null;

  /**
   * @return {App | void}
   */
  constructor() {
    if (App.instance !== null) {
      return App.instance;
    }

    /**
     * @private
     * @type {ExpressApplication}
     */
    this.expressApplication = express();

    this.expressApplication.use(express.json());
    this.expressApplication.use(new PostsRouter());
    this.expressApplication.use(this.handleInternalServerError);
  }

  /**
   * @private
   * @return {void}
   */
  handleExpressListen = () => {
    console.info(chalk.green(`The API has been started on port ${CONFIG.API_PORT}`));
  }

  /**
   * @public
   * @return {void}
   */
  start() {
    this.expressApplication.listen(CONFIG.API_PORT, this.handleExpressListen)
  }

  /**
   * @private
   * @param {Error} error
   * @param {ExpressRequest} _
   * @param {ExpressResponse} res
   * @param {ExpressMiddlewareNextFunction} next
   * @return {void}
   */
  handleInternalServerError = (error, _, res, next) => {
    if (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({code: error.constructor.name, message: error.message});
    }

    next();
  }
}

module.exports = App;
