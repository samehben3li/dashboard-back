import React from 'react';
import { ICategory, IState, ITypes } from '../interfaces';
import IconTemplate from '../assets/icons/IconTemplate';
import {
  categoryIconInfo,
  flagIconInfo,
  userIconInfo,
} from '../assets/icons/iconsInfo';

export const serverURL = `${process.env.REACT_APP_SERVER || ''}/`;

export const sidebarMenu = [
  {
    id: 1,
    icon: () => <IconTemplate iconInfo={userIconInfo} />,
    path: '/',
    title: 'USERS',
  },
  {
    id: 2,
    icon: () => <IconTemplate iconInfo={categoryIconInfo} />,
    path: '/riskcategories',
    title: 'RISK_CATEGORIES',
  },
  {
    id: 3,
    icon: () => <IconTemplate iconInfo={flagIconInfo} />,
    path: '/flags',
    title: 'FLAGS',
  },
];

export const initState: IState = {
  riskCategories: [],
  dispatch: () => {},
};

export const bucketUrl: string =
  process.env.REACT_APP_AWS_BUCKET_SERVER ||
  'https://d17acd7teg556d.cloudfront.net/';

export const theadsOfFlags: string[] = [
  'flags.ID',
  'flags.RISK_CATEGORY',
  'flags.RISK_CATEGORY_TYPE',
  'flags.PLANT_PART',
  'flags.LOCATION',
];

export const theadsOfUsers: string[] = [
  'login.ID',
  'login.USERNAME',
  'login.EMAIL',
  'login.IS_ADMIN',
  'actions.UPDATE',
  'actions.DELETE',
];

export const theadsOfRiskCategory: string[] = [
  'riskCategory.ID',
  'riskCategory.NAME',
  'riskCategory.IMAGE',
  'actions.UPDATE',
  'actions.DELETE',
];

export const theadsOfAddTypes: string[] = [
  'riskCategory.NAME',
  'riskCategory.IMAGE',
  'actions.ADD',
];

export const inputsOfLogin = [
  {
    type: 'text',
    name: 'email',
    className: 'input-email',
    placeholder: 'login.EMAIL',
  },
  {
    type: 'password',
    name: 'password',
    className: 'input-password',
    placeholder: 'login.PASSWORD',
  },
];

export const initStateCategory: ICategory = {
  name: '',
  imgUrl: '',
  types: [],
};

export const initStateType: ITypes = {
  name: '',
  imgUrl: '',
};
