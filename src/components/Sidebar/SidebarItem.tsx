import React from 'react';
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
  return (
    <Link
      to={item.path}
      className={active ? 'sidebar-item-active' : 'sidebar-item'}
    >
      <item.icon />
      <span className="sidebar-item-label">{item.title}</span>
    </Link>
  );
}
export default SidebarItem;
