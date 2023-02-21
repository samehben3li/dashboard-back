import React from 'react';
import { useTranslation } from 'react-i18next';
import TomatoTrolleyLogo from '../../assets/images/TomatoTrolleyLogo';
import { sidebarMenu } from '../../utils/constants';
import SidebarItem from './SidebarItem';
import { Button } from '../common';
import { useAuth } from '../../hooks';
import IconTemplate from '../../assets/icons/IconTemplate';
import { logoutIconInfo } from '../../assets/icons/iconsInfo';

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
        <Button
          isSubmit={false}
          disabled={false}
          className="btn btn-logout"
          onClick={logout}
        >
          <span className="sidebar-item-label">{t('sidebarItem.LOGOUT')}</span>
          <IconTemplate iconInfo={logoutIconInfo} />
        </Button>
      </div>
    </nav>
  );
}

export default SideBar;
