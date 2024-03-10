import GeneralApiController from './GeneralApiController';

class UserApiController extends GeneralApiController {
  getAllPostsByUser = (id: number | string) => this.http.get(`/users/${id}/posts`);
}

const userApiController = new UserApiController();

export default userApiController;
