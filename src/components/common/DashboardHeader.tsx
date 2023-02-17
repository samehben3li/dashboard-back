import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Buttons/Button';

interface IProps {
  btnText: string;
  onClick: () => void;
}

function DashboardHeader({ btnText, onClick }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="header-container">
      {btnText && (
        <Button
          className="btn btn-header"
          onClick={onClick}
          isSubmit={false}
          disabled={false}
        >
          {t(btnText)}
        </Button>
      )}
    </div>
  );
}

export default DashboardHeader;
