const fs = require(`fs`);
const path = require(`path`);

const LoggedError = require(`@root/src/utils/logged-error`);

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

class CommentsRepositoryReadFileError extends LoggedError {}
class CommentsRepositoryCommentNotFoundError extends LoggedError {}

/**
 * @readonly
 * @type {string}
 */
const MOCKS_PATH = path.resolve(__dirname, `./comments.mocks.json`);

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

    return true;
  }

  /**
   * @public
   * @return {PostComment[]}
   */
  readComments = () => {
    return this.comments;
  }

  /**
   * @private
   * @return {PostComment[]}
   * @throws {CommentsRepositoryReadFileError}
   */
  get comments() {
    if (this._comments === null) {
      try {
        const buffer = fs.readFileSync(MOCKS_PATH);

        this._comments = JSON.parse(buffer.toString());
      } catch {
        throw new CommentsRepositoryReadFileError(`Failed to read file with test data`);
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
