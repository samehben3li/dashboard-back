import UserIcon from '../assets/icons/UserIcon';
import CategoriesIcon from '../assets/icons/CategoryIcon';
import FlagIcon from '../assets/icons/FlagIcon';
import { IState } from '../interfaces';

export const serverURL = `${process.env.REACT_APP_SERVER || ''}/`;

export const sidebarMenu = [
  {
    id: 1,
    icon: UserIcon,
    path: '/',
    title: 'USERS',
  },
  {
    id: 2,
    icon: CategoriesIcon,
    path: '/riskcategories',
    title: 'RISK_CATEGORIES',
  },
  {
    id: 3,
    icon: FlagIcon,
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

export const getContentType = (type: string) => {
  switch (type) {
    case 'png':
      return 'image/png';
    case 'svg':
      return 'image/svg+xml';
    case 'jpeg':
      return 'image/jpeg';
    case 'jpg':
      return 'image/jpeg';
    default:
      return 'image/*';
  }
};

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
