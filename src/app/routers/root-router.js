'use strict';

const {Router} = require(`express`);

const PageId = require(`../constants/page-id`);

const rootRouter = new Router();

rootRouter.get(`/`, (req, res) => {
  res.render(`pages/main-page/main-page`, {
    router: {
      path: `/`,
      query: req.query || {},
    },
    page: {
      id: PageId.MAIN,
      title: `Типотека`,
    },
    user: {
      name: `Грека`,
      surname: `Река`,
      avatar: `https://thispersondoesnotexist.com/image`,
    },
  });
});

module.exports = rootRouter;
