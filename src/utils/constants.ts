import UserIcon from '../assets/icons/UserIcon';

export const serverURL = `${process.env.REACT_APP_SERVER || ''}/`;

export const sidebarMenu = [
  {
    id: 1,
    icon: UserIcon,
    path: '/',
    title: 'USERS',
  },
];
