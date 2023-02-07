import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  title: string;
  children: ReactNode;
}

function Alert({ title, children }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        <span className="alert-title">{`${t(title)}`}</span>
        <div className="hr" />
        {children}
      </div>
    </div>
  );
}

export default Alert;
