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
