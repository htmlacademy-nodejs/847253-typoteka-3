'use strict';

const fs = require(`fs`);
const path = require(`path`);

const LoggedError = require(`@root/src/utils/logged-error`);

class PostsRepositoryReadFileError extends LoggedError {}

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
    this.posts = null;

    PostsRepository.instance = this;
  }

  /**
   * @public
   * @return {Post[]}
   * @throws {PostsRepositoryReadFileError}
   */
  getPosts() {
    if (this.posts === null) {
      try {
        const buffer = fs.readFileSync(MOCKS_PATH);

        this.posts = JSON.parse(buffer.toString());
      } catch {
        throw new PostsRepositoryReadFileError(`При чтении файла с тестовыми данными произошла ошибка`);
      }
    }

    return this.posts;
  }
}

module.exports = PostsRepository;
