const PostsRepository = require(`./posts.repository`);

class PostsService {
  /**
   * @type {PostsRepository | null}
   */
  static instance = null;

  /**
   * @return {PostsRepository | void}
   */
  constructor() {
    if (PostsService.instance !== null) {
      return PostsService.instance;
    }

    /**
     * @private
     * @readonly
     * @type {PostsRepository}
     */
    this.postsRepository = new PostsRepository();

    PostsService.instance = this;
  }

  /**
   * @public
   * @return {Post[]}
   */
  getPosts() {
    return this.postsRepository.getPosts();
  }
}

module.exports = PostsService;
