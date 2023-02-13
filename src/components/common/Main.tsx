import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

function Main({ children }: IProps) {
  return (
    <div className="main">
      <div className="modal">{children}</div>
    </div>
  );
}

export default Main;
