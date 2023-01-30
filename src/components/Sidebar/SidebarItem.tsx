import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

interface IItem {
  id: number;
  icon: () => JSX.Element;
  path: string;
  title: string;
}
interface IProps {
  item: IItem;
}

function SidebarItem({ item }: IProps) {
  const { t } = useTranslation();
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        isActive ? 'sidebar-item-active' : 'sidebar-item'
      }
    >
      <item.icon />
      <span className="sidebar-item-label">
        {t(`sidebarItem.${item.title}`)}
      </span>
    </NavLink>
  );
}
export default SidebarItem;
