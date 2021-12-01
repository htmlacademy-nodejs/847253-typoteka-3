const axios = require(`axios`);

const CONFIG = require(`@app/config`);

const HTTP_CLIENT_TIMEOUT = 1000;

class ApiService {
  static instance = null;

  constructor() {
    if (ApiService.instance !== null) {
      return ApiService.instance;
    }

    this.httpClient = axios.create({baseURL: CONFIG.API_URL, timeout: HTTP_CLIENT_TIMEOUT});
  }

  createPost = async (postData) => {
    return (await this.httpClient.post(`/posts`, postData)).data;
  }

  readPosts = async () => {
    return (await this.httpClient.get(`/posts`)).data;
  }

  readPost = async (postId) => {
    return (await this.httpClient.get(`/posts/${postId}`)).data;
  }

  readCategories = async () => {
    return (await this.httpClient.get(`/categories`)).data;
  }

  readComments = async () => {
    return (await this.httpClient.get(`/comments`)).data;
  }

  readUsers = async () => {
    return (await this.httpClient.get(`/users`)).data;
  }

  updatePost = async (postId, postData) => {
    return (await this.httpClient.put(`/posts/${postId}`, postData)).data;
  }

  searchPost = async (query) => {
    return (await this.httpClient.get(`/search?q=${query}`)).data;
  }
}

module.exports = ApiService;
