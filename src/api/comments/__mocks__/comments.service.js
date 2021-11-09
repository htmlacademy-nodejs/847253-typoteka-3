class CommentsServiceMock {}

CommentsServiceMock.prototype.readComments = jest.fn();
CommentsServiceMock.prototype.deleteComment = jest.fn();

module.exports = CommentsServiceMock;
