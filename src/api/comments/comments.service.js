const {CommentsRepository} = require(`./comments.repository`);

class CommentsService {
  static instance = null;

  constructor() {
    if (CommentsService.instance !== null) {
      return CommentsService.instance;
    }

    this.commentsRepository = new CommentsRepository();

    CommentsService.instance = this;
  }

  readComments = () => {
    return this.commentsRepository.readComments();
  }

  deleteComment = (commentId) => {
    return this.commentsRepository.deleteComment(commentId);
  }
}

module.exports = CommentsService;
