import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  title: string;
  children: ReactNode;
}

function Content({ title, children }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="content">
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
