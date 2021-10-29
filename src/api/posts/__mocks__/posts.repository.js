class PostsRepositoryPostNotFoundErrorMock extends Error {}


class PostsRepositoryMock {}

PostsRepositoryMock.prototype.createPost = jest.fn();
PostsRepositoryMock.prototype.readPosts = jest.fn();
PostsRepositoryMock.prototype.readPost = jest.fn();
PostsRepositoryMock.prototype.updatePost = jest.fn();
PostsRepositoryMock.prototype.deletePost = jest.fn();
PostsRepositoryMock.prototype.searchPostsByTitle = jest.fn();

module.exports = {
  PostsRepository: PostsRepositoryMock,
  PostsRepositoryPostNotFoundError: PostsRepositoryPostNotFoundErrorMock
};
