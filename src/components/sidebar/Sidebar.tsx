import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';

import sidebarMenu from '../../constants/sidebarMenu';

import './style.css';
import logo from '../../assets/images/IUNU_tomato-trolley_Logo.svg';
import LogoutIcon from '../../assets/icons/logout.svg';
import { logout } from '../../utils/auth';

function SideBar() {
  const location = useLocation();

  const [active, setActive] = useState(1);

  useEffect(() => {
    sidebarMenu.forEach(element => {
      if (location.pathname === element.path) {
        setActive(element.id);
      }
    });
  }, [sidebarMenu, location.pathname]);

  return (
    <nav className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-logo-container">
          <img src={logo} alt="logo" />
        </div>

        <div className="sidebar-container">
          <div className="sidebar-items">
            {sidebarMenu.map(item => (
              <div key={item.id}>
                <SidebarItem active={item.id === active} item={item} />
              </div>
            ))}
          </div>
          <button type="button" className="sidebar-footer" onClick={logout}>
            <span className="sidebar-item-label">LOGOUT</span>
            <img
              src={LogoutIcon}
              alt="icon-logout"
              className="sidebar-item-icon"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
