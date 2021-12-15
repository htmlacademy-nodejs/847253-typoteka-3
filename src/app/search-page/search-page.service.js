const ApiService = require(`@app/api`);

class SearchPageService {
  static instance = null;

  constructor() {
    if (SearchPageService.instance !== null) {
      return SearchPageService.instance;
    }

    this.apiService = new ApiService();

    SearchPageService.instance = this;
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

  searchPost = async (query) => {
    const posts = await this.apiService.searchPost(query);

    return posts.map(({date, id, title}) => ({date, id, title}));
  }
}

module.exports = SearchPageService;
