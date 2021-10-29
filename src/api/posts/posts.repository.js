const fs = require(`fs`);
const path = require(`path`);

const {nanoid} = require(`nanoid`);

const LoggedError = require(`@root/src/utils/logged-error`);

const {NANOID_ID_MAX_LENGTH} = require(`@root/src/constants`);

class PostsRepositoryReadFileError extends LoggedError {}
class PostsRepositoryPostNotFoundError extends LoggedError {}
class PostsRepositoryCommentNotFoundError extends LoggedError {}

/**
 * Пользователь
 *
 * @typedef User
 * @type Object
 * @property {string} id Идентификатор
 * @property {string} name Имя
 * @property {string} surname Фамилия
 * @property {string} avatar Аватар
 * @property {string} role Роль
 */


/**
 * Комментарий
 *
 * @typedef Comment
 * @type Object
 * @property {string} id Идентификатор
 * @property {User} user Пользователь
 * @property {ISODateString} date Дата публикации
 * @property {string} text Текст
 */

/**
 * Запись
 *
 * @typedef Post
 * @type Object
 * @property {string} id Идентификатор
 * @property {string[]} categories Категории
 * @property {string} image Изображение
 * @property {ISODateString} date Дата публикации
 * @property {string} title Заголовок
 * @property {string} previewText Текст для предпросмотра
 * @property {string} text Текст
 * @property {PostComment[]} comments Комментарии
 */

/**
 * @readonly
 * @type {string}
 */
const MOCKS_PATH = path.resolve(__dirname, `./posts.mocks.json`);

class PostsRepository {
  /**
   * @type {PostsRepository | null}
   */
  static instance = null;

  /**
   * @return {PostsRepository | void}
   */
  constructor() {
    if (PostsRepository.instance !== null) {
      return PostsRepository.instance;
    }

    /**
     * @private
     * @type {Post[] | null}
     */
    this._posts = null;

    PostsRepository.instance = this;
  }

  /**
   * @public
   * @param {{categories: string[], image: string, date: string, title: string, previewText: string, text: string}} data
   * @return {Post}
   */
  createPost({
    categories,
    image,
    date,
    title,
    previewText,
    text,
  }) {
    /**
     * @readonly
     * @type {Post}
     */
    const post = {
      id: nanoid(NANOID_ID_MAX_LENGTH),
      categories,
      image,
      date,
      title,
      previewText,
      text,
      comments: [],
    };

    this.posts.push(post);

    return true;
  }

  /**
   * @param {string} postId
   * @param {{user: string, text: string}} commentData
   * @return {Comment}
   */
  createPostComment(postId, {user, text}) {
    const post = this.readPost(postId);

    /**
     * @readonly
     * @type {Comment}
     */
    const comment = {
      text,
      id: nanoid(NANOID_ID_MAX_LENGTH),
      user,
      date: new Date().toISOString(),
    };

    post.comments.push(comment);

    return comment;
  }

  /**
   * @public
   * @return {Post[]}
   */
  readPosts = () => {
    return this.posts;
  }

  /**
   * @public
   * @param {string} postId
   * @return {Post}
   * @throws {PostsRepositoryPostNotFoundError}
   */
  readPost = (postId) => {
    /**
     * @readonly
     * @type {Post}
     */
    const post = this.posts.find(
        /**
         * @param {Post} post
         * @return {boolean}
         */
        ({id: currentPostId}) => currentPostId === postId
    );

    if (post === undefined) {
      throw new PostsRepositoryPostNotFoundError(`Post with ID '${postId}' not found`);
    }

    return post;
  }

  /**
   * @public
   * @param {string} postId
   * @param {{[categories]: string[], [image]: string, [date]: string, [title]: string, [previewText]: string, [text]: string}} postData
   * @return {boolean}
   */
  updatePost = (postId, {
    categories,
    image,
    date,
    title,
    previewText,
    text,
  }) => {
    const post = this.readPost(postId);

    post.categories = categories ?? post.categories;
    post.image = image ?? post.image;
    post.date = date ?? post.date;
    post.title = title ?? post.title;
    post.previewText = previewText ?? post.previewText;
    post.text = text ?? post.text;

    return true;
  }


  /**
   * @public
   * @param {string} postId
   * @return {boolean}
   */
  deletePost = (postId) => {
    /**
     * @type {Post[]}
     */
    const posts = [];
    /**
     * @readonly
     * @type {Post | null}
     */
    let postToDelete = null;

    this.posts.forEach(
        /**
         * @param {Post} post
         * @return {void}
         */
        (post) => {
          const {id: currentPostId} = post;

          if (currentPostId === postId) {
            postToDelete = post;

            return;
          }

          posts.push(post);
        }
    );

    if (postToDelete === null) {
      throw new PostsRepositoryPostNotFoundError(`Post with ID '${postId}' not found`);
    }

    this.posts = posts;

    return true;
  }

  /**
   * @public
   * @param {string} postId
   * @param {string} commentId
   * @return {boolean}
   */
  deletePostComment = (postId, commentId) => {
    /**
     * @type {Post}
     */
    const post = this.readPost(postId);

    /**
     * @type {Comment[]}
     */
    const comments = [];

    /**
     * @readonly
     * @type {Comment | null}
     */
    let commentToDelete = null;

    post.comments.forEach(
        /**
         * @param {Comment} comment
         * @return {void}
         */
        (comment) => {
          const {id: currentCommentId} = comment;

          if (currentCommentId === commentId) {
            commentToDelete = comment;

            return;
          }

          comments.push(comment);
        }
    );

    if (commentToDelete === null) {
      throw new PostsRepositoryCommentNotFoundError(`Comment with ID '${commentId}' not found`);
    }

    post.comments = comments;

    return true;
  }

  /**
   * @param {string} query
   * @return {Post[]}
   */
  searchPostsByTitle = (query) => {
    const words = query.split(` `).map((word) => word.toLowerCase());

    return this.posts.filter(
        /**
         * @param {Post} post
         * @return {boolean}
         */
        ({title}) => words.some(
            /**
             * @param {string} word
             * @return {boolean}
             */
            (word) => title.toLowerCase().includes(word)
        )
    );
  }

  /**
   * @private
   * @return {Post[]}
   * @throws {PostsRepositoryReadFileError}
   */
  get posts() {
    if (this._posts === null) {
      try {
        const buffer = fs.readFileSync(MOCKS_PATH);

        this._posts = JSON.parse(buffer.toString());
      } catch {
        throw new PostsRepositoryReadFileError(`Failed to read file with test data`);
      }
    }

    return this._posts;
  }

  /**
   * @private
   * @param {Post[] | null} posts
   * @return {void}
   */
  set posts(posts) {
    this._posts = posts;
  }
}

module.exports = {PostsRepository, PostsRepositoryPostNotFoundError, PostsRepositoryCommentNotFoundError};
