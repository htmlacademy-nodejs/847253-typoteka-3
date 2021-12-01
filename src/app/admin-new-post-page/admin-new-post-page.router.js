const {Router} = require(`express`);

const {HttpStatusCode} = require(`@root/src/constants`);
const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);
const {JsonSchemaValidator, JsonSchemaValidatorValidationError} = require(`@root/src/utils/json-schema-validator`);

const Logger = require(`@app/utils/logger`);

const AdminNewPostPageService = require(`./admin-new-post-page.service`);
const createPostRequestSchema = require(`./admin-new-post-page.router.create-post-request.schema.json`);

const {ADMIN_POSTS_PAGE_ROUTE} = require(`../admin-posts-page/constants`);
const {
  ADMIN_NEW_POST_PAGE_ROUTE,
  ADMIN_NEW_POST_PAGE_VIEW_PATH,
  ADMIN_NEW_POST_PAGE_ID,
  ADMIN_NEW_POST_PAGE_TITLE,
} = require(`./constants`);

class AdminNewPostPageRouter extends Router {
  static instance = null;

  constructor() {
    if (AdminNewPostPageRouter.instance !== null) {
      return AdminNewPostPageRouter.instance;
    }

    super();

    this.logger = new Logger({name: `AdminNewPostPageRouter`});

    this.jsonSchemaValidator = new JsonSchemaValidator();

    this.adminNewPostPageService = new AdminNewPostPageService();

    this.get(ADMIN_NEW_POST_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getAdminNewPostPage));
    this.post(ADMIN_NEW_POST_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.createPost));

    AdminNewPostPageRouter.instance = this;
  }

  getAdminNewPostPage = async (req, res) => {
    const categories = await this.adminNewPostPageService.readCategories();
    const user = await this.adminNewPostPageService.readUser();

    res.render(ADMIN_NEW_POST_PAGE_VIEW_PATH, {
      postFormData: {
        categories: {options: categories},
      },
      user,
      router: {
        href: req.originalUrl,
      },
      page: {
        id: ADMIN_NEW_POST_PAGE_ID,
        title: ADMIN_NEW_POST_PAGE_TITLE,
      },
    });
  }

  createPost = async (req, res) => {
    try {
      this.jsonSchemaValidator.validate(createPostRequestSchema, req);

      await this.adminNewPostPageService.createPost(req.body);

      res.redirect(HttpStatusCode.CREATED, ADMIN_POSTS_PAGE_ROUTE);
    } catch (error) {
      if (error instanceof JsonSchemaValidatorValidationError) {
        this.logger.error(error);

        res.redirect(HttpStatusCode.OK, ADMIN_NEW_POST_PAGE_ROUTE);

        return;
      }

      throw error;
    }
  }
}

module.exports = AdminNewPostPageRouter;
