const express = require(`express`);
const {nanoid} = require(`nanoid`);

const {HttpStatusCode, NANOID_ID_MAX_LENGTH} = require(`@root/src/constants`);
const LogInfo = require(`@root/src/utils/log-info`);

const Logger = require(`@api/utils/logger`);
const CONFIG = require(`@api/config`);

const CategoriesRouter = require(`./categories`);
const CommentsRouter = require(`./comments`);
const PostsRouter = require(`./posts`);
const SearchRouter = require(`./search`);
const UsersRouter = require(`./users`);

const NOT_FOUND_ERROR_ROUTE = `*`;

class ApiRouterNotFoundError extends Error {}

class Api {
  static instance = null;

  constructor() {
    if (Api.instance !== null) {
      return Api.instance;
    }

    this._express = express();

    this.server = null;

    this.logger = new Logger({
      name: `API`,
    });

    this.express.use(express.json());
    this.express.use(this.logReqRes);
    this.express.use(this.setCors);
    this.express.use(new CategoriesRouter());
    this.express.use(new CommentsRouter());
    this.express.use(new PostsRouter());
    this.express.use(new SearchRouter());
    this.express.use(new UsersRouter());
    this.express.use(NOT_FOUND_ERROR_ROUTE, this.handleNotFoundError);
    this.express.use(this.handleInternalServerError);
  }

  handleExpressListen = (error) => {
    if (error) {
      this.logger.error(error);

      return;
    }

    this.logger.info(`The API has been started on port ${CONFIG.API_PORT}`);
  }

  handleServerClose = () => {
    this.server = null;
    this.logger.info(`The API has been successfully stopped`);
  }

  start = () => {
    this.server = this.express.listen(CONFIG.API_PORT, this.handleExpressListen);
  }

  stop = () => {
    this.server.close(this.handleServerClose);
  }

  handleInternalServerError = (error, _, res, next) => {
    this.logger.error(error);

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({code: error.constructor.name, message: error.message});

    next();
  }

  handleNotFoundError = (req, res) => {
    const error = new ApiRouterNotFoundError(`Resource with baseUrl '${req.baseUrl}' not found`);

    this.logger.error(error);

    res.status(HttpStatusCode.NOT_FOUND).send({code: error.constructor.name, message: error.message});
  }

  logReqRes = (req, res, next) => {
    const requestId = nanoid(NANOID_ID_MAX_LENGTH);
    const requestTimestamp = Date.now();

    const requestLogInfo = new LogInfo(
        {
          requestId,
          method: req.method,
          url: req.url,
          body: req.body,
        },
        `Request [RequestID: {{requestId}}] [Resource: {{method}} {{url}}] [Body: {{body}}]`,
    );

    this.logger.debug(requestLogInfo.toString());

    const chunks = [];

    const resWrite = res.write;
    const resEnd = res.end;

    res.write = (chunk, ...restParams) => {
      chunks.push(chunk);

      return resWrite.call(res, ...restParams);
    };

    res.end = (chunk, ...restParams) => {
      if (chunk) {
        chunks.push(chunk);
      }

      resEnd.call(res, chunk, ...restParams);
    };

    res.on(`finish`, () => {
      const responseTimestamp = Date.now();

      const responseLogInfo = new LogInfo(
          {
            requestId,
            statusCode: res.statusCode,
            time: `${responseTimestamp - requestTimestamp} ms`,
            body: Buffer.concat(chunks).toString(`utf8`),
          },
          `Response [RequestID: {{requestId}}] [StatusCode: {{statusCode}}] [Time: {{time}}] [Body: {{body}}]`
      );

      this.logger.info(responseLogInfo.toString());
    });

    next();
  }

  setCors = (_, res, next) => {
    res.setHeader(`Access-Control-Allow-Origin`, CONFIG.APP_URL);

    next();
  }

  get express() {
    return this._express;
  }
}

module.exports = Api;
