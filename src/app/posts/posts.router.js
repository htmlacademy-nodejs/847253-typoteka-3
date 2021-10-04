'use strict';

const {Router} = require(`express`);

const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);

const {postPageConstants, postsByCategoryConstants} = require(`./constants`);

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

    this.get(postPageConstants.ROUTE, handleMiddlewarePromiseRejection(this.getPostPage));
    this.get(postsByCategoryConstants.ROUTE, handleMiddlewarePromiseRejection(this.getPostsByCategoryPage));

    PostsRouter.instance = this;
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  getPostPage = (req, res) => {
    res.render(postPageConstants.VIEW_PATH, {
      router: {
        href: req.originalUrl,
      },
      page: {
        id: postPageConstants.PAGE_ID,
        title: postPageConstants.PAGE_TITLE,
      },
      user: {
        name: `Грека`,
        surname: `Река`,
        avatar: `https://thispersondoesnotexist.com/image`,
      },
    });
  }

  /**
   * @private
   * @param {ExpressRequest} req
   * @param {ExpressResponse} res
   * @return {void}
   */
  getPostsByCategoryPage = (req, res) => {
    res.render(postsByCategoryConstants.VIEW_PATH, {
      router: {
        href: req.originalUrl,
      },
      page: {
        id: postsByCategoryConstants.PAGE_ID,
        title: postsByCategoryConstants.PAGE_TITLE,
      },
      user: {
        name: `Грека`,
        surname: `Река`,
        avatar: `https://thispersondoesnotexist.com/image`,
      },
    });
  }
}

module.exports = PostsRouter;
