import { Dispatch } from 'react';

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
export interface IPayload {
  id?: string;
  riskCategories?: IRiskCategory[];
  riskCategory?: IRiskCategory;
  idType?: string;
}

export interface IAction {
  type: string;
  payload: IPayload;
}

export interface AppContextProps {
  riskCategories: IState['riskCategories'];
  dispatch: Dispatch<IAction>;
}
export interface IState {
  riskCategories: IRiskCategory[];
  dispatch: Dispatch<IAction>;
}

interface ILocation {
  left: string[];
  right: string[];
}

export interface IFlag {
  id?: string;
  userId?: string;
  riskCategory: IInputOptions;
  riskCategoryType: IInputOptions;
  plantPart: IInputOptions;
  location: ILocation;
}
