import GeneralApiController from './GeneralApiController';

export interface IPost {
  id: number | string;
}

class PostApiController extends GeneralApiController {
  getAllPosts = () => this.http.get('/post');
  createPost = (data) => this.http.post('/post', data);

  // createPost = (data: ILogin) => this.http.post('/auth/login', data);
}

const postApiController = new PostApiController();

export default postApiController;
