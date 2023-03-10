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
