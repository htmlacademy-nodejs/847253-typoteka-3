const {CommentsRepository, CommentsRepositoryCommentNotFoundError} = require(`../comments.repository`);

jest.mock(`@root/src/utils/logged-error`);

describe(`CommentsRepository`, () => {
  test(`Реализует шаблон проектирования "Одиночка"`, () => {
    expect(new CommentsRepository()).toBe(new CommentsRepository());
  });

  describe(`readComments`, () => {
    test(`Возвращает пустую коллекцию комментариев`, () => {
      const commentsRepository = new CommentsRepository();

      const EXPECTED_COMMENTS = [];

      commentsRepository.comments = EXPECTED_COMMENTS;

      expect(commentsRepository.readComments()).toEqual(EXPECTED_COMMENTS);
    });

    test(`Возвращает комментарии`, () => {
      const commentsRepository = new CommentsRepository();

      const EXPECTED_COMMENTS = [{
        id: `3EPlkL`,
        user: `N1n6Z3`,
        date: `2021-10-23T20:45:18.189Z`,
        text: `Совсем немного...`
      }];

      commentsRepository.comments = EXPECTED_COMMENTS;

      expect(commentsRepository.readComments()).toEqual(EXPECTED_COMMENTS);
    });
  });

  describe(`deleteComment`, () => {
    test(`Выбрасывает CommentsRepositoryNotFoundError, если комментарий не найден`, () => {
      const commentsRepository = new CommentsRepository();

      commentsRepository.comments = [{
        id: `3EPlkL`,
        user: `N1n6Z3`,
        date: `2021-10-23T20:45:18.189Z`,
        text: `Совсем немного...`
      }];

      expect(() => {
        commentsRepository.deleteComment(`Nb-01s`);
      }).toThrow(CommentsRepositoryCommentNotFoundError);
    });

    test(`Удаляет комментарий`, () => {
      const commentsRepository = new CommentsRepository();

      const COMMENT_TO_DELETE_ID = `3EPlkL`;

      commentsRepository.comments = [{
        id: COMMENT_TO_DELETE_ID,
        user: `N1n6Z3`,
        date: `2021-10-23T20:45:18.189Z`,
        text: `Совсем немного...`
      }];

      expect(commentsRepository.deleteComment(COMMENT_TO_DELETE_ID)).toBe(true);
      expect(commentsRepository.readComments()).toEqual([]);
    });
  });
});
