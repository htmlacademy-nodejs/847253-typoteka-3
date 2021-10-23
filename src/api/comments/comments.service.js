const {CommentsRepository} = require(`./comments.repository`);

class CommentsService {
  /**
   * @type {CommentsService | null}
   */
  static instance = null;

  /**
   * @return {CommentsService | void}
   */
  constructor() {
    if (CommentsService.instance !== null) {
      return CommentsService.instance;
    }

    /**
     * @private
     * @readonly
     * @type {CommentsRepository}
     */
    this.commentsRepository = new CommentsRepository();

    CommentsService.instance = this;
  }

  /**
   * @public
   * @return {PostComment[]}
   */
  readComments = () => {
    return this.commentsRepository.readComments();
  }

  /**
   * @public
   * @param {string} commentId
   * @return {boolean}
   */
  deleteComment = (commentId) => {
    return this.commentsRepository.deleteComment(commentId);
  }
}

module.exports = CommentsService;
