const ApiService = require(`@app/api`);

class AdminNewPostPageService {
  static instance = null;

  constructor() {
    if (AdminNewPostPageService.instance !== null) {
      return AdminNewPostPageService.instance;
    }

    this.apiService = new ApiService();

    AdminNewPostPageService.instance = this;
  }

  createPost = ({'preview-text': previewText, ...formData}) => {
    return this.apiService.createPost({
      ...formData,
      previewText,
    });
  }

  readCategories = async () => {
    const categories = await this.apiService.readCategories();

    return categories.map(({id, name}) => ({id, name}));
  }

  /*
   * TODO: Получение авторизованного пользователя
   */
  readUser = async () => {
    const users = await this.apiService.readUsers();

    const user = users[0];

    user.role = `Administrator`;

    return user;
  }
}

module.exports = AdminNewPostPageService;
