import React from 'react';
import { useTranslation } from 'react-i18next';
import TomatoTrolleyLogo from '../../assets/images/TomatoTrolleyLogo';
import LogoutIcon from '../../assets/icons/LogoutIcon';
import useAuth from '../../hooks/useAuth';
import { sidebarMenu } from '../../utils/constants';
import SidebarItem from './SidebarItem';

function SideBar() {
  const { logout, isLoggedIn } = useAuth();
  const { t } = useTranslation();

  return (
    <nav className={`sidebar ${!isLoggedIn ? 'hidden' : ''}`}>
      <div className="sidebar-container">
        <div className="sidebar-logo-container">
          <TomatoTrolleyLogo />
        </div>
        <div className="sidebar-items">
          {sidebarMenu.map(item => (
            <SidebarItem item={item} key={item.id} />
          ))}
        </div>
        <button type="button" className="btn btn-logout" onClick={logout}>
          <span className="sidebar-item-label">{t('sidebarItem.LOGOUT')}</span>
          <LogoutIcon />
        </button>
      </div>
    </nav>
  );
}

export default SideBar;
