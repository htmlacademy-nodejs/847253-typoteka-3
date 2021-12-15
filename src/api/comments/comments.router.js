const {Router} = require(`express`);

const {HttpStatusCode} = require(`@root/src/constants`);
const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);
const {JsonSchemaValidator} = require(`@root/src/utils/json-schema-validator`);

const Logger = require(`@api/utils/logger`);

const {CommentsRepositoryCommentNotFoundError} = require(`./comments.repository`);
const CommentsService = require(`./comments.service`);

const COMMENTS_ROUTE = `/api/comments`;

const COMMENT_BY_ID_ROUTE = `/api/comments/:commentId`;

class CommentsRouter extends Router {
  static instance = null;

  constructor() {
    if (CommentsRouter.instance !== null) {
      return CommentsRouter.instance;
    }

    super();

    this.jsonSchemaValidator = new JsonSchemaValidator();

    this.commentsService = new CommentsService();

    this.logger = new Logger({
      name: `API`,
    });

    this.get(COMMENTS_ROUTE, handleMiddlewarePromiseRejection(this.readComments));
    this.delete(COMMENT_BY_ID_ROUTE, handleMiddlewarePromiseRejection(this.deleteComment));

    CommentsRouter.instance = this;
  }

  readComments = (_, res) => {
    res.send(this.commentsService.readComments());
  }

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
