import GeneralApiController from './GeneralApiController';

export interface IAddress {
  street?: string;
  city?: string;
  country?: string;
}

export interface IRegister {
  fullName: string;
  email: string;
  password: string;
  address?: IAddress;
}

export type ILogin = Omit<IRegister, 'fullName' | 'address'>;

class AuthApiController extends GeneralApiController {
  register = (data: IRegister) => this.http.post('/auth/register', data);

  login = (data: ILogin) => this.http.post('/auth/login', data);

  logout = () => this.http.post('/auth/logout');
}

const authApiController = new AuthApiController();

export default authApiController;
