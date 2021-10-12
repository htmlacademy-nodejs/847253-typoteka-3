const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const PostsService = require(`./posts.service`);

/**
 * @readonly
 * @type {string}
 */
const POSTS_ROUTE = `/posts`;

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

    this.get(POSTS_ROUTE, handleMiddlewarePromiseRejection(this.getPosts));

    PostsRouter.instance = this;
  }

  /**
   * @private
   * @param {ExpressRequest} _
   * @param {ExpressResponse} res
   * @return {void}
   */
  getPosts = async (_, res) => {
    res.send(await this.postsService.getPosts());
  }
}

module.exports = PostsRouter;
