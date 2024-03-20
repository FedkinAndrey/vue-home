import GeneralApiController from './GeneralApiController';

export interface ICategory {
  name: string;
}

class CategoryApiController extends GeneralApiController {
  getAllCategories = () => this.http.get('/categories');

  getCategoryById = (id: number | string) => this.http.get(`/categories/${id}`);

  createCategory = (data: ICategory) => this.http.post('/categories', data);
}

const categoryApiController = new CategoryApiController();

export default categoryApiController;
