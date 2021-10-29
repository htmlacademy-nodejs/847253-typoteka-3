const request = require(`supertest`);

const {HttpStatusCode} = require(`@root/src/constants`);

const App = require(`@api/app`);

const {CommentsRepository} = require(`../comments.repository`);

describe(`CommentsRouter`, () => {
  const app = new App();

  beforeAll(() => {
    app.start();
  });

  afterAll(() => {
    app.stop();
  });

  describe(`GET /api/comments`, () => {
    test(`Возвращает код 200 и пустую коллекцию комментариев`, async () => {
      const commentsRepository = new CommentsRepository();

      const EXPECTED_COMMENTS = [];

      commentsRepository.comments = EXPECTED_COMMENTS;

      const response = await request(app.expressApplication).get(`/api/comments`);

      expect(response.statusCode).toBe(HttpStatusCode.OK);
      expect(response.body).toEqual(EXPECTED_COMMENTS);
    });

    test(`Возвращает код 200 и комментарии`, async () => {
      const commentsRepository = new CommentsRepository();

      const EXPECTED_COMMENTS = [{
        id: `3EPlkL`,
        user: `N1n6Z3`,
        date: `2021-10-23T20:45:18.189Z`,
        text: `Совсем немного...`
      }];

      commentsRepository.comments = EXPECTED_COMMENTS;

      const response = await request(app.expressApplication).get(`/api/comments`);

      expect(response.statusCode).toBe(HttpStatusCode.OK);
      expect(response.body).toEqual(EXPECTED_COMMENTS);
    });
  })

  describe(`DELETE /api/comments/:id`, () => {
    test(`Возвращает код 404 и ошибку, если комментарий не найден`, async () => {
      const commentsRepository = new CommentsRepository();

      const COMMENT_ID = `Jha1s2`;

      commentsRepository.comments = [{
        id: `3EPlkL`,
        user: `N1n6Z3`,
        date: `2021-10-23T20:45:18.189Z`,
        text: `Совсем немного...`
      }];

      const response = await request(app.expressApplication).delete(`/api/comments/${COMMENT_ID}`);

      expect(response.statusCode).toBe(HttpStatusCode.NOT_FOUND);
      expect(response.body).toEqual({
        code: `CommentsRepositoryCommentNotFoundError`,
        message: `Comment with ID '${COMMENT_ID}' not found`,
      });
    });

    test(`Возвращает код 200, true и удаляет комментарий`, async () => {
      const commentsRepository = new CommentsRepository();

      const COMMENT_ID = `3EPlkL`;

      commentsRepository.comments = [{
        id: COMMENT_ID,
        user: `N1n6Z3`,
        date: `2021-10-23T20:45:18.189Z`,
        text: `Совсем немного...`
      }];

      const deleteCommentResponse = await request(app.expressApplication).delete(`/api/comments/${COMMENT_ID}`);

      expect(deleteCommentResponse.statusCode).toBe(HttpStatusCode.OK);
      expect(deleteCommentResponse.body).toEqual(true);

      const readCommentsResponse = await request(app.expressApplication).get(`/api/comments`);

      expect(readCommentsResponse.statusCode).toBe(HttpStatusCode.OK);
      expect(readCommentsResponse.body).toEqual([]);
    });
  });
});
