import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface IItem {
  id: number;
  icon: () => JSX.Element;
  path: string;
  title: string;
}
interface IProps {
  item: IItem;
  active: boolean;
}

function SidebarItem({ item, active }: IProps) {
  const { t } = useTranslation();
  return (
    <Link
      to={item.path}
      className={active ? 'sidebar-item-active' : 'sidebar-item'}
    >
      <item.icon />
      <span className="sidebar-item-label">
        {t(`sidebarItem.${item.title}`)}
      </span>
    </Link>
  );
}
export default SidebarItem;
