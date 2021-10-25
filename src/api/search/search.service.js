const {PostsRepository} = require(`../posts/posts.repository`);

class SearchService {
  /**
   * @type {SearchService | null}
   */
  static instance = null;

  /**
   * @return {SearchService | void}
   */
  constructor() {
    if (SearchService.instance !== null) {
      return SearchService.instance;
    }

    /**
     * @private
     * @readonly
     * @type {PostsRepository}
     */
    this.postsRepository = new PostsRepository();

    SearchService.instance = this;
  }

  /**
   * @public
   * @param {string} query
   * @return {Post[]}
   */
  search = (query) => {
    return this.postsRepository.searchPostsByTitle(query);
  }
}

module.exports = SearchService;
