const CategoriesService = require(`@api/categories/categories.service`);

const {PostsRepository} = require(`./posts.repository`);

class PostsService {
  static instance = null;

  constructor() {
    if (PostsService.instance !== null) {
      return PostsService.instance;
    }

    this.postsRepository = new PostsRepository();

    this.categoriesService = new CategoriesService();

    PostsService.instance = this;
  }

  createPost(postData) {
    return this.postsRepository.createPost(postData);
  }

  createPostComment(postId, commentData) {
    return this.postsRepository.createPostComment(postId, commentData);
  }

  readPosts = () => {
    return this.postsRepository.readPosts();
  }

  readPost = (postId) => {
    return this.postsRepository.readPost(postId);
  }

  readPostComments = (postId) => {
    return this.postsRepository.readPost(postId).comments;
  }

  readPostCategories = (postId) => {
    const post = this.readPost(postId);

    return this.categoriesService.readCategories(post.categories);
  }

  updatePost = (postId, postData) => {
    return this.postsRepository.updatePost(postId, postData);
  }

  deletePost = (postId) => {
    return this.postsRepository.deletePost(postId);
  }

  deletePostComment = (postId, commentId) => {
    return this.postsRepository.deletePostComment(postId, commentId);
  }
}

module.exports = PostsService;
