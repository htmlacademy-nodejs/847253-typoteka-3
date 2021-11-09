const {Router} = require(`express`);
const pino = require(`pino`);

const {HttpStatusCode, Environment} = require(`@root/src/constants`);
const {JsonSchemaValidator, JsonSchemaValidatorValidationError} = require(`@root/src/utils/json-schema-validator`);
const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const CONFIG = require(`@api/config`);

const PostsService = require(`./posts.service`);
const {PostsRepositoryPostNotFoundError, PostsRepositoryCommentNotFoundError} = require(`./posts.repository`);
const createPostCommentRequestSchema = require(`./posts.router.create-post-comment-request.schema.json`);
const createPostRequestSchema = require(`./posts.router.create-post-request.schema.json`);
const updatePostRequestSchema = require(`./posts.router.update-post-request.schema.json`);

/**
 * @readonly
 * @type {string}
 */
const POSTS_ROUTE = `/api/posts`;

/**
 * @readonly
 * @type {string}
 */
const POST_BY_ID_ROUTE = `/api/posts/:postId`;

/**
 * @readonly
 * @type {string}
 */
const POST_COMMENTS = `/api/posts/:postId/comments`;

/**
 * @readonly
 * @type {string}
 */
const POST_COMMENT_BY_ID = `/api/posts/:postId/comments/:commentId`;

class PostsRouter extends Router {
  /**
   * @type {PostsRouter | null}
   */
  static instance = null;

  /**
   * @return {PostsRouter | void}
   */
  constructor() {
    if (PostsRouter.instance !== null) {
      return PostsRouter.instance;
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
     * @type {PostsService}
     */
    this.postsService = new PostsService();

    /**
     * @private
     * @type {pino.Logger}
     */
    this.logger = pino({
      name: `Api/PostsRouter`,
      level: CONFIG.LOG_LEVEL,
      prettyPrint: true,
    }, CONFIG.ENV === Environment.PRODUCTION ? pino.destination(CONFIG.LOGGER_OUTPUT_PATH) : process.stdout);

    this.post(POSTS_ROUTE, handleMiddlewarePromiseRejection(this.createPost));
    this.post(POST_COMMENTS, handleMiddlewarePromiseRejection(this.createPostComment));
    this.get(POSTS_ROUTE, handleMiddlewarePromiseRejection(this.readPosts));
    this.get(POST_BY_ID_ROUTE, handleMiddlewarePromiseRejection(this.readPost));
    this.get(POST_COMMENTS, handleMiddlewarePromiseRejection(this.readPostComments));
    this.put(POST_BY_ID_ROUTE, handleMiddlewarePromiseRejection(this.updatePost));
    this.delete(POST_BY_ID_ROUTE, handleMiddlewarePromiseRejection(this.deletePost));
    this.delete(POST_COMMENT_BY_ID, handleMiddlewarePromiseRejection(this.deletePostComment));

    PostsRouter.instance = this;
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  createPost = (req, res) => {
    try {
      this.jsonSchemaValidator.validate(createPostRequestSchema, req);

      res.status(HttpStatusCode.CREATED).send(this.postsService.createPost(req.body));
    } catch (error) {
      if (error instanceof JsonSchemaValidatorValidationError) {
        this.logger.error(error);

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
  createPostComment = (req, res) => {
    try {
      this.jsonSchemaValidator.validate(createPostCommentRequestSchema, req);

      res.status(HttpStatusCode.CREATED).send(this.postsService.createPostComment(req.params.postId, req.body));
    } catch (error) {
      switch (error.constructor) {
        case JsonSchemaValidatorValidationError:
          this.logger.error(error);

          res.status(HttpStatusCode.BAD_REQUEST);

          break;
        case PostsRepositoryPostNotFoundError:
          this.logger.error(error);

          res.status(HttpStatusCode.NOT_FOUND);

          break;
        default:
          throw error;
      }

      res.send({code: error.constructor.name, message: error.message});
    }
  }

  /**
   * @private
   * @param {ExpressRequest} _
   * @param {ExpressResponse} res
   * @return {void}
   */
  readPosts = (_, res) => {
    res.send(this.postsService.readPosts());
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  readPost = (req, res) => {
    try {
      res.send(this.postsService.readPost(req.params.postId));
    } catch (error) {
      if (error instanceof PostsRepositoryPostNotFoundError) {
        this.logger.error(error);

        res.status(HttpStatusCode.NOT_FOUND).send({code: error.constructor.name, message: error.message});

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
  readPostComments = (req, res) => {
    try {
      res.send(this.postsService.readPostComments(req.params.postId));
    } catch (error) {
      if (error instanceof PostsRepositoryPostNotFoundError) {
        this.logger.error(error);

        res.status(HttpStatusCode.NOT_FOUND).send({code: error.constructor.name, message: error.message});

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
  updatePost = (req, res) => {
    try {
      this.jsonSchemaValidator.validate(updatePostRequestSchema, req);

      res.send(this.postsService.updatePost(req.params.postId, req.body));
    } catch (error) {
      switch (error.constructor) {
        case JsonSchemaValidatorValidationError:
          this.logger.error(error);

          res.status(HttpStatusCode.BAD_REQUEST);

          break;
        case PostsRepositoryPostNotFoundError:
          this.logger.error(error);

          res.status(HttpStatusCode.NOT_FOUND);

          break;
        default:
          throw error;
      }

      res.send({code: error.constructor.name, message: error.message});
    }
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  deletePost = (req, res) => {
    try {
      res.send(this.postsService.deletePost(req.params.postId));
    } catch (error) {
      if (error instanceof PostsRepositoryPostNotFoundError) {
        this.logger.error(error);

        res.status(HttpStatusCode.NOT_FOUND).send({code: error.constructor.name, message: error.message});

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
  deletePostComment = (req, res) => {
    try {
      res.send(this.postsService.deletePostComment(req.params.postId, req.params.commentId));
    } catch (error) {
      if (
        error instanceof PostsRepositoryPostNotFoundError
        || error instanceof PostsRepositoryCommentNotFoundError
      ) {
        this.logger.error(error);

        res.status(HttpStatusCode.NOT_FOUND).send({code: error.constructor.name, message: error.message});

        return;
      }

      throw error;
    }
  }
}

module.exports = PostsRouter;
