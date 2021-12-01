const {PostsRepository} = require(`../posts/posts.repository`);

class SearchService {
  static instance = null;

  constructor() {
    if (SearchService.instance !== null) {
      return SearchService.instance;
    }

    this.postsRepository = new PostsRepository();

    SearchService.instance = this;
  }

  searchPost = (query) => {
    return this.postsRepository.searchPostsByTitle(query);
  }
}

module.exports = SearchService;
