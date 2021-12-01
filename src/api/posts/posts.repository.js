const fs = require(`fs`);
const path = require(`path`);

const {nanoid} = require(`nanoid`);

const {NANOID_ID_MAX_LENGTH} = require(`@root/src/constants`);

class PostsRepositoryReadFileError extends Error {}
class PostsRepositoryPostNotFoundError extends Error {}
class PostsRepositoryCommentNotFoundError extends Error {}

const FIXTURES_PATH = path.resolve(__dirname, `./posts.repository.fixtures.json`);

class PostsRepository {
  static instance = null;

  constructor() {
    if (PostsRepository.instance !== null) {
      return PostsRepository.instance;
    }

    this._posts = null;

    PostsRepository.instance = this;
  }

  createPost({
    categories,
    image,
    date,
    title,
    previewText,
    text,
  }) {
    const post = {
      id: nanoid(NANOID_ID_MAX_LENGTH),
      categories,
      image,
      date,
      title,
      previewText,
      text,
      comments: [],
    };

    this.posts.push(post);

    return true;
  }

  createPostComment(postId, {user, text}) {
    const post = this.readPost(postId);

    const comment = {
      text,
      id: nanoid(NANOID_ID_MAX_LENGTH),
      user,
      date: new Date().toISOString(),
    };

    post.comments.push(comment);

    return comment;
  }

  readPosts = () => {
    return this.posts;
  }

  readPost = (postId) => {
    const post = this.posts.find(
        ({id: currentPostId}) => currentPostId === postId
    );

    if (post === undefined) {
      throw new PostsRepositoryPostNotFoundError(`Post with ID '${postId}' not found`);
    }

    return post;
  }

  updatePost = (postId, {
    categories,
    image,
    date,
    title,
    previewText,
    text,
  }) => {
    const post = this.readPost(postId);

    post.categories = categories ?? post.categories;
    post.image = image ?? post.image;
    post.date = date ?? post.date;
    post.title = title ?? post.title;
    post.previewText = previewText ?? post.previewText;
    post.text = text ?? post.text;

    return true;
  }

  deletePost = (postId) => {
    const posts = [];

    let postToDelete = null;

    this.posts.forEach((post) => {
      const {id: currentPostId} = post;

      if (currentPostId === postId) {
        postToDelete = post;

        return;
      }

      posts.push(post);
    });

    if (postToDelete === null) {
      throw new PostsRepositoryPostNotFoundError(`Post with ID '${postId}' not found`);
    }

    this.posts = posts;

    return true;
  }

  deletePostComment = (postId, commentId) => {
    const post = this.readPost(postId);

    const comments = [];

    let commentToDelete = null;

    post.comments.forEach((comment) => {
      const {id: currentCommentId} = comment;

      if (currentCommentId === commentId) {
        commentToDelete = comment;

        return;
      }

      comments.push(comment);
    });

    if (commentToDelete === null) {
      throw new PostsRepositoryCommentNotFoundError(`Comment with ID '${commentId}' not found`);
    }

    post.comments = comments;

    return true;
  }

  searchPostsByTitle = (query) => {
    const words = query.split(` `).map((word) => word.toLowerCase());

    return this.posts.filter(
        ({title}) => words.some(
            (word) => title.toLowerCase().includes(word)
        )
    );
  }

  get posts() {
    if (this._posts === null) {
      try {
        const buffer = fs.readFileSync(FIXTURES_PATH);

        this._posts = JSON.parse(buffer.toString());
      } catch {
        throw new PostsRepositoryReadFileError(`Failed to read file with fixtures`);
      }
    }

    return this._posts;
  }

  set posts(posts) {
    this._posts = posts;
  }
}

module.exports = {PostsRepository, PostsRepositoryPostNotFoundError, PostsRepositoryCommentNotFoundError};
