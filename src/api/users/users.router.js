const {Router} = require(`express`);

const {HttpStatusCode} = require(`@root/src/constants`);
const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);
const {JsonSchemaValidator, JsonSchemaValidatorValidationError} = require(`@root/src/utils/json-schema-validator`);

const {UsersRepositoryUserNotFoundError} = require(`./users.repository`);
const UsersService = require(`./users.service`);

/**
 * @readonly
 * @type {string}
 */
const USERS_ROUTE = `/api/users`;

/**
 * @readonly
 * @type {string}
 */
const USER_BY_ID_ROUTE = `/api/users/:userId`;

class UsersRouter extends Router {
  /**
   * @type {UsersRouter | null}
   */
  static instance = null;

  /**
   * @return {UsersRouter | void}
   */
  constructor() {
    if (UsersRouter.instance !== null) {
      return UsersRouter.instance;
    }

    super();

    /**
     * @private
     * @readonly
     * @type {JsonSchemaValidator}
     */
    this.jsonSchemaValidator = new JsonSchemaValidator();

    /**
     * @private
     * @readonly
     * @type {UsersService}
     */
    this.usersService = new UsersService();

    this.get(USERS_ROUTE, handleMiddlewarePromiseRejection(this.readUsers));
    this.get(USER_BY_ID_ROUTE, handleMiddlewarePromiseRejection(this.readUser));

    UsersRouter.instance = this;
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  readUsers = (req, res) => {
    try {
      res.send(this.usersService.readUsers());
    } catch (error) {
      if (error instanceof JsonSchemaValidatorValidationError) {
        res.status(HttpStatusCode.BAD_REQUEST).send({code: error.constructor.name, message: error.message});

        return;
      }

      throw error;
    }
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  readUser = (req, res) => {
    try {
      res.send(this.usersService.readUser(req.params.userId));
    } catch (error) {
      if (error instanceof UsersRepositoryUserNotFoundError) {
        res.status(HttpStatusCode.NOT_FOUND).send({code: error.constructor.name, message: error.message});

        return;
      }

      throw error;
    }
  }
}

module.exports = UsersRouter;
