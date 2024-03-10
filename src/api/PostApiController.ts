import GeneralApiController from './GeneralApiController';

export interface IPost {
  id: number | string;
}

interface ICategoryInPost {
  id: number;
}

interface ICreatePost {
  title: string;
  content: string;
  categories?: ICategoryInPost[];
}

class PostApiController extends GeneralApiController {
  getAllPosts = () => this.http.get('/posts');

  getPostById = (id: number) => this.http.get(`/posts/${id}`);

  createPost = (data: ICreatePost) => this.http.post('/posts', data);

  updatePost = (data: ICreatePost, id: number) => this.http.patch(`/posts/${id}`, data);

  deletePost = (id: number) => this.http.delete(`/posts/${id}`);
}

const postApiController = new PostApiController();

export default postApiController;
