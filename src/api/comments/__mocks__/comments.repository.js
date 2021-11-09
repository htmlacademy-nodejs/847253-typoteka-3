class CommentsRepositoryCommentNotFoundErrorMock extends Error {}

class CommentsRepositoryMock {}

CommentsRepositoryMock.prototype.readComments = jest.fn();
CommentsRepositoryMock.prototype.deleteComment = jest.fn();

module.exports = {
  CommentsRepository: CommentsRepositoryMock,
  CommentsRepositoryCommentNotFoundError: CommentsRepositoryCommentNotFoundErrorMock,
};
