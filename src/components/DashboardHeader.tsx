import React from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  btnText: string;
  onClick: () => void;
}

function DashboardHeader({ btnText, onClick }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="header-container">
      {btnText && (
        <button type="button" className="btn btn-header" onClick={onClick}>
          {`${t(btnText)}`}
        </button>
      )}
    </div>
  );
}

export default DashboardHeader;
