'use strict';

const {Router} = require(`express`);

const PageId = require(`../constants/page-id`);

const signInRouter = new Router();

signInRouter.get(`/sign-in`, (req, res) => {
  res.render(`pages/sign-in-page/sign-in-page`, {
    router: {
      path: `/sign-in`,
    },
    page: {
      id: PageId.SIGN_IN,
      title: `Вход с паролем`,
    },
  });
});

module.exports = signInRouter;
