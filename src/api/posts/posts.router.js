const {Router} = require(`express`);

const {HttpStatusCode} = require(`@root/src/constants`);
const {JsonSchemaValidator, JsonSchemaValidatorValidationError} = require(`@root/src/utils/json-schema-validator`);
const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const Logger = require(`@api/utils/logger`);

const PostsService = require(`./posts.service`);
const {PostsRepositoryPostNotFoundError, PostsRepositoryCommentNotFoundError} = require(`./posts.repository`);
const createPostCommentRequestSchema = require(`./posts.router.create-post-comment-request.schema.json`);
const createPostRequestSchema = require(`./posts.router.create-post-request.schema.json`);
const updatePostRequestSchema = require(`./posts.router.update-post-request.schema.json`);

const POSTS_ROUTE = `/api/posts`;
const POST_BY_ID_ROUTE = `/api/posts/:postId`;
const POST_COMMENTS_ROUTE = `/api/posts/:postId/comments`;
const POST_CATEGORIES_ROUTE = `/api/posts/:postId/categories`;
const POST_COMMENT_BY_ID_ROUTE = `/api/posts/:postId/comments/:commentId`;

class PostsRouter extends Router {
  static instance = null;

  constructor() {
    if (PostsRouter.instance !== null) {
      return PostsRouter.instance;
    }

    super();

    this.jsonSchemaValidator = new JsonSchemaValidator();

    this.postsService = new PostsService();

    this.logger = new Logger({
      name: `API`,
    });

    this.post(POSTS_ROUTE, handleMiddlewarePromiseRejection(this.createPost));
    this.post(POST_COMMENTS_ROUTE, handleMiddlewarePromiseRejection(this.createPostComment));
    this.get(POSTS_ROUTE, handleMiddlewarePromiseRejection(this.readPosts));
    this.get(POST_BY_ID_ROUTE, handleMiddlewarePromiseRejection(this.readPost));
    /*
     * TODO: Автотесты
     */
    this.get(POST_COMMENTS_ROUTE, handleMiddlewarePromiseRejection(this.readPostComments));
    /*
     * TODO: Автотесты
     */
    this.get(POST_CATEGORIES_ROUTE, handleMiddlewarePromiseRejection(this.readPostCategories));
    this.put(POST_BY_ID_ROUTE, handleMiddlewarePromiseRejection(this.updatePost));
    this.delete(POST_BY_ID_ROUTE, handleMiddlewarePromiseRejection(this.deletePost));
    this.delete(POST_COMMENT_BY_ID_ROUTE, handleMiddlewarePromiseRejection(this.deletePostComment));

    PostsRouter.instance = this;
  }

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

  readPosts = (_, res) => {
    res.send(this.postsService.readPosts());
  }

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

  readPostCategories = (req, res) => {
    try {
      res.send(this.postsService.readPostCategories(req.params.postId));
    } catch (error) {
      if (error instanceof PostsRepositoryPostNotFoundError) {
        this.logger.error(error);

        res.status(HttpStatusCode.NOT_FOUND).send({code: error.constructor.name, message: error.message});

        return;
      }

      throw error;
    }
  }

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
