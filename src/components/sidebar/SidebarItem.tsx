import { Link } from 'react-router-dom';
import './style.css';

interface IItem {
  id: number;
  icon: string;
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
      <img
        src={item.icon}
        alt={`icon-${item.icon}`}
        className="sidebar-item-icon"
      />
      <span className="sidebar-item-label">{item.title}</span>
    </Link>
  );
}
export default SidebarItem;
