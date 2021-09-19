'use strict';

const {Router} = require(`express`);

const PageId = require(`../constants/page-id`);

const myRouter = new Router();

myRouter.get(`/my/categories`, (req, res) => {
  res.render(`pages/admin-categories-page/admin-categories-page`, {
    router: {
      path: `/my/categories`,
    },
    page: {
      id: PageId.ADMIN_CATEGORIES,
      title: `Категории - Панель управления`
    },
    user: {
      name: `Грека`,
      surname: `Река`,
      avatar: `https://thispersondoesnotexist.com/image`,
      role: `Administrator`,
    }
  });
});

myRouter.get(`/my/posts`, (req, res) => {
  res.render(`pages/admin-posts-page/admin-posts-page`, {
    router: {
      path: `/my/posts`,
    },
    page: {
      id: PageId.ADMIN_POSTS,
      title: `Записи - Панель управления`
    },
    user: {
      name: `Грека`,
      surname: `Река`,
      avatar: `https://thispersondoesnotexist.com/image`,
      role: `Administrator`,
    },
  });
});

myRouter.get(`/my/posts/new`, (req, res) => {
  res.render(`pages/admin-post-page/admin-post-page`, {
    router: {
      path: `/my/posts/new`,
    },
    page: {
      id: PageId.ADMIN_NEW_POST,
      title: `Новая запись - Панель управления`
    },
    user: {
      name: `Грека`,
      surname: `Река`,
      avatar: `https://thispersondoesnotexist.com/image`,
      role: `Administrator`,
    },
  });
});

myRouter.get(`/my/posts/:id`, (req, res) => {
  res.render(`pages/admin-post-page/admin-post-page`, {
    router: {
      path: `/my/posts/${req.params.id}`,
    },
    page: {
      id: PageId.ADMIN_EDIT_POST,
      title: `Редактирование записи - Панель управления`
    },
    user: {
      name: `Грека`,
      surname: `Река`,
      avatar: `https://thispersondoesnotexist.com/image`,
      role: `Administrator`,
    },
  });
});

myRouter.get(`/my/comments`, (req, res) => {
  res.render(`pages/admin-comments-page/admin-comments-page`, {
    router: {
      path: `/my/comments`,
    },
    page: {
      id: PageId.ADMIN_COMMENTS,
      title: `Комментарии - Панель управления`
    },
    user: {
      name: `Грека`,
      surname: `Река`,
      avatar: `https://thispersondoesnotexist.com/image`,
      role: `Administrator`,
    },
  });
});


module.exports = myRouter;
