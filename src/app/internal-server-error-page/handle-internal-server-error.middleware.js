const Logger = require(`@app/utils/logger`);

const {
  INTERNAL_SERVER_ERROR_PAGE_VIEW_PATH,
  INTERNAL_SERVER_ERROR_PAGE_ID,
  INTERNAL_SERVER_ERROR_PAGE_TITLE,
} = require(`./constants`);

const logger = new Logger(`InternalServerErrorPage`);

const handleInternalServerError = (error, req, res, next) => {
  logger.error(error);

  res.render(INTERNAL_SERVER_ERROR_PAGE_VIEW_PATH, {
    router: {
      href: req.originalUrl,
    },
    page: {
      id: INTERNAL_SERVER_ERROR_PAGE_ID,
      title: INTERNAL_SERVER_ERROR_PAGE_TITLE,
    },
    error: {
      code: `500`,
      title: `Что-то пошло не так`,
    },
    user: {
      name: `Грека`,
      surname: `Река`,
      avatar: `https://thispersondoesnotexist.com/image`,
    },
  });

  next();
};

module.exports = handleInternalServerError;
