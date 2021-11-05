const fs = require(`fs`);
const path = require(`path`);

/**
 * Комментарий
 *
 * @typedef PostComment
 * @type Object
 * @property {string} id Идентификатор
 * @property {User.id} user Пользователь
 * @property {Post.id} post Запись
 * @property {ISODateString} date Дата публикации
 * @property {string} text Текст
 */

class CommentsRepositoryReadFileError extends Error {}
class CommentsRepositoryCommentNotFoundError extends Error {}

/**
 * @readonly
 * @type {string}
 */
const FIXTURES_PATH = path.resolve(__dirname, `./comments.repository.fixtures.json`);

class CommentsRepository {
  /**
   * @type {CommentsRepository | null}
   */
  static instance = null;

  /**
   * @return {CommentsRepository | void}
   */
  constructor() {
    if (CommentsRepository.instance !== null) {
      return CommentsRepository.instance;
    }

    /**
     * @private
     * @type {PostComment[] | null}
     */
    this._comments = null;

    CommentsRepository.instance = this;
  }

  /**
   * @public
   * @return {PostComment[]}
   */
  readComments = () => {
    return this.comments;
  }

  /**
   * @public
   * @param {string} commentId
   * @return {boolean}
   * @throws {CommentsRepositoryCommentNotFoundError}
   */
  deleteComment = (commentId) => {
    /**
     * @type {PostComment | undefined}
     */
    const comment = this.comments.find(
        /**
         * @param {PostComment} comment
         * @return {boolean}
         */
        ({id: currentCommentId}) => currentCommentId === commentId
    );

    if (comment === undefined) {
      throw new CommentsRepositoryCommentNotFoundError(`Comment with ID '${commentId}' not found`);
    }

    this.comments = this.comments.filter(
        /**
         * @param {PostComment} comment
        * @return {boolean}
         */
        ({id: currentCommentId}) => currentCommentId !== commentId
    );

    return true;
  }

  /**
   * @private
   * @return {PostComment[]}
   * @throws {CommentsRepositoryReadFileError}
   */
  get comments() {
    if (this._comments === null) {
      try {
        const buffer = fs.readFileSync(FIXTURES_PATH);

        this._comments = JSON.parse(buffer.toString());
      } catch {
        throw new CommentsRepositoryReadFileError(`Failed to read file with fixtures`);
      }
    }

    return this._comments;
  }

  /**
   * @private
   * @param {PostComment[] | null} comments
   * @return {void}
   */
  set comments(comments) {
    this._comments = comments;
  }
}

module.exports = {CommentsRepository, CommentsRepositoryCommentNotFoundError};
