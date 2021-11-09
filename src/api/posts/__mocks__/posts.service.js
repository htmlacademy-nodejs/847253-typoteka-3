class PostsServiceMock {}

PostsServiceMock.prototype.createPost = jest.fn();
PostsServiceMock.prototype.readPosts = jest.fn();
PostsServiceMock.prototype.readPost = jest.fn();
PostsServiceMock.prototype.updatePost = jest.fn();
PostsServiceMock.prototype.deletePost = jest.fn();

module.exports = PostsServiceMock;
