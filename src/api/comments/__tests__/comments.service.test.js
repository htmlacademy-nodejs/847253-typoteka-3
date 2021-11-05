const {CommentsRepository} = require(`../comments.repository`);
const CommentsService = require(`../comments.service`);

jest.mock(`../comments.repository`);

describe(`CommentsService`, () => {
  test(`Реализует шаблон проектирования "Одиночка"`, () => {
    expect(new CommentsService()).toBe(new CommentsService());
  });

  describe(`readComments`, () => {
    test(`Возвращает пустую коллекцию комментариев`, () => {
      const commentsService = new CommentsService();

      const EXPECTED_COMMENTS = [];

      CommentsRepository.prototype.readComments.mockReturnValueOnce(EXPECTED_COMMENTS);

      expect(commentsService.readComments()).toEqual(EXPECTED_COMMENTS);
    });

    test(`Возвращает комментарии`, () => {
      const commentsService = new CommentsService();

      const EXPECTED_COMMENTS = [{
        id: `3EPlkL`,
        user: `N1n6Z3`,
        date: `2021-10-23T20:45:18.189Z`,
        text: `Совсем немного...`,
      }];

      CommentsRepository.prototype.readComments.mockReturnValueOnce(EXPECTED_COMMENTS);

      expect(commentsService.readComments()).toEqual(EXPECTED_COMMENTS);
    });
  });

  test(`deleteComment вызывает удаление комментария в репозитории и возвращает результат`, () => {
    const commentsService = new CommentsService();

    const COMMENT_TO_DELETE_ID = `3EPlkL`;

    const EXPECTED_RESULT = true;

    CommentsRepository.prototype.deleteComment.mockReturnValueOnce(EXPECTED_RESULT);

    expect(commentsService.deleteComment(COMMENT_TO_DELETE_ID)).toBe(EXPECTED_RESULT);
    expect(CommentsRepository.prototype.deleteComment).toHaveBeenCalledWith(COMMENT_TO_DELETE_ID);
  });
});
