import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import TomatoTrolleyLogo from '../../assets/images/TomatoTrolleyLogo';
import LogoutIcon from '../../assets/icons/LogoutIcon';
import useAuth from '../../hooks/useAuth';
import { sidebarMenu } from '../../utils/constants';

function SideBar() {
  const location = useLocation();
  const [active, setActive] = useState(1);
  const { logout, isLoggedIn } = useAuth();

  useEffect(() => {
    sidebarMenu.forEach(element => {
      if (location.pathname === element.path) {
        setActive(element.id);
      }
    });
  }, [location.pathname]);

  return (
    <nav className={`sidebar ${!isLoggedIn ? 'hidden' : ''}`}>
      <div className="sidebar-container">
        <div className="sidebar-logo-container">
          <TomatoTrolleyLogo />
        </div>

        <div className="sidebar-container">
          <div className="sidebar-items">
            {sidebarMenu.map(item => (
              <div key={item.id}>
                <SidebarItem active={item.id === active} item={item} />
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-logout" onClick={logout}>
            <span className="sidebar-item-label">LOGOUT</span>
            <LogoutIcon />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
