export interface IContext {
  headers: {
    authorization: string;
  };
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

export interface IInputOptions {
  id: string;
  imgUrl: string;
  name: string;
}

export interface IRiskCategory extends IInputOptions {
  riskCategoryTypes: Array<IInputOptions>;
}
