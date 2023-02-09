import React from 'react';
import Button from './Buttons/Button';

interface IProps {
  btnText: string;
  onClick: () => void;
}

function DashboardHeader({ btnText, onClick }: IProps) {
  return (
    <div className="header-container">
      {btnText && (
        <Button className="btn btn-header" onClick={onClick} action={btnText} />
      )}
    </div>
  );
}

export default DashboardHeader;
