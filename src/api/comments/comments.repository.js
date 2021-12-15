const fs = require(`fs`);
const path = require(`path`);

class CommentsRepositoryReadFileError extends Error {}
class CommentsRepositoryCommentNotFoundError extends Error {}

const FIXTURES_PATH = path.resolve(__dirname, `./comments.repository.fixtures.json`);

class CommentsRepository {
  static instance = null;

  constructor() {
    if (CommentsRepository.instance !== null) {
      return CommentsRepository.instance;
    }

    this._comments = null;

    CommentsRepository.instance = this;
  }

  readComments = () => {
    return this.comments;
  }

  deleteComment = (commentId) => {
    const comment = this.comments.find(({id: currentCommentId}) => currentCommentId === commentId);

    if (comment === undefined) {
      throw new CommentsRepositoryCommentNotFoundError(`Comment with ID '${commentId}' not found`);
    }

    this.comments = this.comments.filter(
        ({id: currentCommentId}) => currentCommentId !== commentId
    );

    return true;
  }

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

  set comments(comments) {
    this._comments = comments;
  }
}

module.exports = {CommentsRepository, CommentsRepositoryCommentNotFoundError};
