const {Router} = require(`express`);

const {HttpStatusCode} = require(`@root/src/constants`);
const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);
const {JsonSchemaValidator} = require(`@root/src/utils/json-schema-validator`);

const Logger = require(`@api/utils/logger`);

const {UsersRepositoryUserNotFoundError} = require(`./users.repository`);
const UsersService = require(`./users.service`);

const USERS_ROUTE = `/api/users`;
const USER_BY_ID_ROUTE = `/api/users/:userId`;

class UsersRouter extends Router {
  static instance = null;

  constructor() {
    if (UsersRouter.instance !== null) {
      return UsersRouter.instance;
    }

    super();

    this.jsonSchemaValidator = new JsonSchemaValidator();

    this.usersService = new UsersService();

    this.logger = new Logger({
      name: `API`,
    });

    this.get(USERS_ROUTE, handleMiddlewarePromiseRejection(this.readUsers));
    this.get(USER_BY_ID_ROUTE, handleMiddlewarePromiseRejection(this.readUser));

    UsersRouter.instance = this;
  }

  readUsers = (_, res) => {
    res.send(this.usersService.readUsers());
  }

  readUser = (req, res) => {
    try {
      res.send(this.usersService.readUser(req.params.userId));
    } catch (error) {
      if (error instanceof UsersRepositoryUserNotFoundError) {
        this.logger.error(error);

        res.status(HttpStatusCode.NOT_FOUND).send({code: error.constructor.name, message: error.message});

        return;
      }

      throw error;
    }
  }
}

module.exports = UsersRouter;
