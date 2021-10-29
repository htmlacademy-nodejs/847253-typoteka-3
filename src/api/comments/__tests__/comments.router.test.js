const {HttpStatusCode} = require(`@root/src/constants`);

const CommentsRouter = require(`../comments.router`);
const CommentsService = require(`../comments.service`);
const {CommentsRepositoryCommentNotFoundError} = require(`../comments.repository`);

jest.mock(`../comments.repository`);
jest.mock(`../comments.service`);

describe(`CommentsRouter`, () => {
  test(`Реализует шаблон проектирования "Одиночка"`, () => {
    expect(new CommentsRouter()).toBe(new CommentsRouter());
  });

  describe(`readComments`, () => {
    test(`Передаёт пустую коллекцию комментариев в ответе на запрос`, () => {
      const commentsRouter = new CommentsRouter();

      const EXPECTED_COMMENTS = [];

      const response = {send: jest.fn()};

      CommentsService.prototype.readComments.mockReturnValueOnce(EXPECTED_COMMENTS);

      commentsRouter.readComments(null, response);

      expect(response.send).toHaveBeenCalledWith(EXPECTED_COMMENTS);
    });

    test(`Передаёт комментарии в ответе на запрос`, () => {
      const commentsRouter = new CommentsRouter();

      const EXPECTED_COMMENTS = [{
        id: `3EPlkL`,
        user: `N1n6Z3`,
        date: `2021-10-23T20:45:18.189Z`,
        text: `Совсем немного...`,
      }];

      const response = {send: jest.fn()};

      CommentsService.prototype.readComments.mockReturnValueOnce(EXPECTED_COMMENTS);

      commentsRouter.readComments(null, response);

      expect(response.send).toHaveBeenCalledWith(EXPECTED_COMMENTS);
    });
  })

  describe(`deleteComment`, () => {
    test(`Передаёт код 404 и ошибку в ответе на запрос, если получает исключение CommentsRepositoryCommentNotFound`, () => {
      const commentsRouter = new CommentsRouter();

      const COMMENT_TO_DELETE_ID = `3EPlkL`;

      const request = {
        params: {
          commentId: COMMENT_TO_DELETE_ID,
        },
      };

      const response = {send: jest.fn()};

      response.status = jest.fn(() => response);

      const commentsRepositoryCommentNotFoundError = (
        new CommentsRepositoryCommentNotFoundError(`Comment with ID '${COMMENT_TO_DELETE_ID}' not found`)
      );

      CommentsService.prototype.deleteComment.mockImplementationOnce(() => {
        throw commentsRepositoryCommentNotFoundError;
      });

      commentsRouter.deleteComment(request, response);

      expect(CommentsService.prototype.deleteComment).toHaveBeenCalledWith(COMMENT_TO_DELETE_ID);
      expect(response.status).toHaveBeenCalledWith(HttpStatusCode.NOT_FOUND);
      expect(response.send).toHaveBeenCalledWith({
        code: commentsRepositoryCommentNotFoundError.constructor.name,
        message: commentsRepositoryCommentNotFoundError.message
      });
    });

    test(`Вызывает удаление комментария в сервисе и передаёт результат в ответе на запрос`, () => {
      const commentsRouter = new CommentsRouter();

      const COMMENT_TO_DELETE_ID = `3EPlkL`;

      const EXPECTED_RESULT = true;

      const request = {
        params: {
          commentId: COMMENT_TO_DELETE_ID,
        },
      };

      const response = {send: jest.fn()};

      CommentsService.prototype.deleteComment.mockReturnValueOnce(EXPECTED_RESULT);

      commentsRouter.deleteComment(request, response);

      expect(CommentsService.prototype.deleteComment).toHaveBeenCalledWith(COMMENT_TO_DELETE_ID);
      expect(response.send).toHaveBeenCalledWith(EXPECTED_RESULT);
    });
  });
});
