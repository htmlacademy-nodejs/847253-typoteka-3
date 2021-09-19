'use strict';

const {Router} = require(`express`);

const PageId = require(`../constants/page-id`);

const postsRouter = new Router();

postsRouter.get(`/posts/:id`, (req, res) => {
  res.render(`pages/post-page/post-page`, {
    router: {
      path: `/posts/${req.params.id}`,
    },
    page: {
      id: PageId.POST,
      title: `Запись`
    },
    user: {
      name: `Грека`,
      surname: `Река`,
      avatar: `https://thispersondoesnotexist.com/image`,
    },
  });
});

postsRouter.get(`/posts/category/:id`, (req, res) => {
  res.render(`pages/posts-by-category-page/posts-by-category-page`, {
    router: {
      path: `/posts/category/${req.params.id}`,
    },
    page: {
      id: PageId.POSTS_BY_CATEGORY,
      title: `Записи по категории`
    },
    user: {
      name: `Грека`,
      surname: `Река`,
      avatar: `https://thispersondoesnotexist.com/image`,
    },
  });
});

module.exports = postsRouter;
