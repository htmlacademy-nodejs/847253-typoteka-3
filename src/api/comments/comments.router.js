const {Router} = require(`express`);
const pino = require(`pino`);

const {HttpStatusCode, Environment} = require(`@root/src/constants`);
const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);
const {JsonSchemaValidator} = require(`@root/src/utils/json-schema-validator`);

const CONFIG = require(`@api/config`);

const {CommentsRepositoryCommentNotFoundError} = require(`./comments.repository`);
const CommentsService = require(`./comments.service`);

/**
 * @readonly
 * @type {string}
 */
const COMMENTS_ROUTE = `/api/comments`;

/**
 * @readonly
 * @type {string}
 */
const COMMENT_BY_ID_ROUTE = `/api/comments/:commentId`;

class CommentsRouter extends Router {
  /**
   * @type {CommentsRouter | null}
   */
  static instance = null;

  /**
   * @return {CommentsRouter | void}
   */
  constructor() {
    if (CommentsRouter.instance !== null) {
      return CommentsRouter.instance;
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
     * @type {CommentsService}
     */
    this.commentsService = new CommentsService();

    /**
     * @private
     * @type {pino.Logger}
     */
    this.logger = pino({
      name: `Api/CommentsRouter`,
      level: CONFIG.LOG_LEVEL,
      prettyPrint: true,
    }, CONFIG.ENV === Environment.PRODUCTION ? pino.destination(CONFIG.LOGGER_OUTPUT_PATH) : process.stdout);

    this.get(COMMENTS_ROUTE, handleMiddlewarePromiseRejection(this.readComments));
    this.delete(COMMENT_BY_ID_ROUTE, handleMiddlewarePromiseRejection(this.deleteComment));

    CommentsRouter.instance = this;
  }

  /**
   * @private
   * @param {ExpressRequest} _
   * @param {ExpressResponse} res
   * @return {void}
   */
  readComments = (_, res) => {
    res.send(this.commentsService.readComments());
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  deleteComment = (req, res) => {
    try {
      res.send(this.commentsService.deleteComment(req.params.commentId));
    } catch (error) {
      if (error instanceof CommentsRepositoryCommentNotFoundError) {
        this.logger.error(error);

        res.status(HttpStatusCode.NOT_FOUND).send({code: error.constructor.name, message: error.message});

        return;
      }

      throw error;
    }
  }
}

module.exports = CommentsRouter;
