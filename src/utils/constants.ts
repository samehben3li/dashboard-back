import UserIcon from '../assets/icons/UserIcon';
import CategoriesIcon from '../assets/icons/CategoryIcon';
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
