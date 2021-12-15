const {Router} = require(`express`);

const {HttpStatusCode} = require(`@root/src/constants`);
const {handleMiddlewarePromiseRejection} = require(`@root/src/utils/express`);
const {JsonSchemaValidator, JsonSchemaValidatorValidationError} = require(`@root/src/utils/json-schema-validator`);

const Logger = require(`@app/utils/logger`);

const updatePostRequestSchema = require(`./admin-edit-post-page.router.update-post-request.schema.json`);
const AdminEditPostPageService = require(`./admin-edit-post-page.service`);

const {ADMIN_POSTS_PAGE_ROUTE} = require(`../admin-posts-page/constants`);
const {
  ADMIN_EDIT_POST_PAGE_ROUTE,
  ADMIN_EDIT_POST_PAGE_VIEW_PATH,
  ADMIN_EDIT_POST_PAGE_ID,
  ADMIN_EDIT_POST_PAGE_TITLE,
} = require(`./constants`);

class AdminEditPostPageRouter extends Router {
  static instance = null;

  constructor() {
    if (AdminEditPostPageRouter.instance !== null) {
      return AdminEditPostPageRouter.instance;
    }

    super();

    this.logger = new Logger({name: `AdminNewPostPageRouter`});

    this.jsonSchemaValidator = new JsonSchemaValidator();

    this.adminEditPostPageService = new AdminEditPostPageService();

    this.get(ADMIN_EDIT_POST_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.getAdminEditPostPage));
    this.post(ADMIN_EDIT_POST_PAGE_ROUTE, handleMiddlewarePromiseRejection(this.updatePost));

    AdminEditPostPageRouter.instance = this;
  }

  getAdminEditPostPage = async (req, res) => {
    try {
      const post = await this.adminEditPostPageService.readPost(req.params.postId);
      const categories = await this.adminEditPostPageService.readCategories();
      const user = await this.adminEditPostPageService.readUser();

      res.render(ADMIN_EDIT_POST_PAGE_VIEW_PATH, {
        postId: post.id,
        postFormData: {
          categories: {value: post.categories, options: categories},
          date: {value: post.date},
          title: {value: post.title},
          previewText: {value: post.previewText},
          text: {value: post.text},
          image: {value: post.image}
        },
        user,
        categories,
        router: {
          href: req.originalUrl,
        },
        page: {
          id: ADMIN_EDIT_POST_PAGE_ID,
          title: ADMIN_EDIT_POST_PAGE_TITLE,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  updatePost = async (req, res) => {
    try {
      this.jsonSchemaValidator.validate(updatePostRequestSchema, req);

      await this.adminEditPostPageService.updatePost(req.params.postId, req.body);

      res.redirect(HttpStatusCode.OK, ADMIN_POSTS_PAGE_ROUTE);
    } catch (error) {
      if (error instanceof JsonSchemaValidatorValidationError) {
        this.logger.error(error);

        res.redirect(HttpStatusCode.BAD_REQUEST, ADMIN_EDIT_POST_PAGE_ROUTE.replace(`:postId`, req.params.postId));

        return;
      }

      throw error;
    }
  }
}

module.exports = AdminEditPostPageRouter;
