const {Router} = require(`express`);

const {HttpStatusCode} = require(`@root/src/constants`);
const {JsonSchemaValidator, JsonSchemaValidatorValidationError} = require(`@root/src/utils/json-schema-validator`);
const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const PostsService = require(`./posts.service`);
const {PostsRepositoryPostNotFoundError, PostsRepositoryCommentNotFoundError} = require(`./posts.repository`);
const postDataSchema = require(`./schemas/post-data-schema.json`);
const commentDataSchema = require(`./schemas/comment-data-schema.json`);

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
     * @type {PostsService}
     */
    this.postsService = new PostsService();

    /**
     * @private
     * @readonly
     * @type {JsonSchemaValidator}
     */
    this.jsonSchemaValidator = new JsonSchemaValidator();

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
      this.jsonSchemaValidator.validate(postDataSchema, req.body);

      res.status(HttpStatusCode.CREATED).send(this.postsService.createPost({
        categories: req.body.categories,
        image: req.body.image,
        title: req.body.title,
        previewText: req.body.previewText,
        text: req.body.text,
      }));
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
  createPostComment = (req, res) => {
    try {
      this.jsonSchemaValidator.validate(commentDataSchema, req.body);

      res.status(HttpStatusCode.CREATED).send(this.postsService.createPostComment(req.params.postId, {
        user: req.body.user,
        text: req.body.text,
      }));
    } catch (error) {
      switch (error.constructor) {
        case JsonSchemaValidatorValidationError:
          res.status(HttpStatusCode.BAD_REQUEST);

          break;
        case PostsRepositoryPostNotFoundError:
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
        res.status(HttpStatusCode.NOT_FOUND).send({code: error.constructor.name, message: error.message});
      }
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
        res.status(HttpStatusCode.NOT_FOUND).send({code: error.constructor.name, message: error.message});
      }
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
      this.jsonSchemaValidator.validate(postDataSchema, req.body);

      res.send(this.postsService.updatePost(req.params.postId, {
        categories: req.body.categories,
        image: req.body.image,
        title: req.body.title,
        previewText: req.body.previewText,
        text: req.body.text,
      }));
    } catch (error) {
      switch (error.constructor) {
        case JsonSchemaValidatorValidationError:
          res.status(HttpStatusCode.BAD_REQUEST);

          break;
        case PostsRepositoryPostNotFoundError:
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
      this.postsService.deletePost(req.params.postId);

      res.send();
    } catch (error) {
      if (error instanceof PostsRepositoryPostNotFoundError) {
        res.status(HttpStatusCode.NOT_FOUND).send({code: error.constructor.name, message: error.message});
      }
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
      this.postsService.deletePostComment(req.params.postId, req.params.commentId);

      res.send();
    } catch (error) {
      if (
        error instanceof PostsRepositoryPostNotFoundError
        || error instanceof PostsRepositoryCommentNotFoundError
      ) {
        res.status(HttpStatusCode.NOT_FOUND).send({code: error.constructor.name, message: error.message});
      }
    }
  }
}

module.exports = PostsRouter;
