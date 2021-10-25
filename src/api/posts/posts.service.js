const {PostsRepository} = require(`./posts.repository`);

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
   * @param {{categories: string[], image: string, title: string, previewText: string, text: string}} postData
   * @return {Post}
   */
  createPost(postData) {
    return this.postsRepository.createPost(postData);
  }

  /**
   * @param {string} postId
   * @param {{user: string, text: string}} commentData
   * @return {Comment}
   */
  createPostComment(postId, commentData) {
    return this.postsRepository.createPostComment(postId, commentData);
  }

  /**
   * @public
   * @return {Post[]}
   */
  readPosts = () => {
    return this.postsRepository.readPosts();
  }

  /**
   * @public
   * @param {string} postId
   * @return {Post}
   */
  readPost = (postId) => {
    return this.postsRepository.readPost(postId);
  }

  /**
   * @public
   * @param {string} postId
   * @return {Comment[]}
   */
  readPostComments = (postId) => {
    return this.postsRepository.readPost(postId).comments;
  }

  /**
   * @public
   * @param {string} postId
   * @param {{categories: string[], image: string, title: string, previewText: string, text: string}} postData
   * @return {Post}
   */
  updatePost = (postId, postData) => {
    return this.postsRepository.updatePost(postId, postData);
  }

  /**
   * @public
   * @param {string} postId
   * @return {boolean}
   */
  deletePost = (postId) => {
    return this.postsRepository.deletePost(postId);
  }

  /**
   * @public
   * @param {string} postId
   * @param {string} commentId
   * @return {boolean}
   */
  deletePostComment = (postId, commentId) => {
    return this.postsRepository.deletePostComment(postId, commentId);
  }
}

module.exports = PostsService;
