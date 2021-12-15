const ApiService = require(`@app/api`);

class AdminEditPostPageService {
  static instance = null;

  constructor() {
    if (AdminEditPostPageService.instance !== null) {
      return AdminEditPostPageService.instance;
    }

    this.apiService = new ApiService();

    AdminEditPostPageService.instance = this;
  }

  readCategories = async () => {
    const categories = await this.apiService.readCategories();

    return categories.map(({id, name}) => ({id, name}));
  }

  readPost = (postId) => {
    return this.apiService.readPost(postId);
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

  updatePost = (postId, {'preview-text': previewText, ...formData}) => {
    return this.apiService.updatePost(postId, {
      ...formData,
      previewText,
    });
  }
}

module.exports = AdminEditPostPageService;
