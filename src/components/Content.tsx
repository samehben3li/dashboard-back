import React, { ReactNode } from 'react';

interface IProps {
  title: string;
  children: ReactNode;
}

function Content({ title, children }: IProps) {
  return (
    <div className="content">
      <div className="content-container">
        <div className="content-header">
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Content;
