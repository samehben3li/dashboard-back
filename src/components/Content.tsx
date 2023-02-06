import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  title: string;
  children: ReactNode;
  dashboardHeader: ReactNode | undefined;
}

function Content({ title, children, dashboardHeader }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="content">
      {!!dashboardHeader && dashboardHeader}
      <div className="content-container">
        <div className="content-header">
          <h2>{`${t(title)}`}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Content;
