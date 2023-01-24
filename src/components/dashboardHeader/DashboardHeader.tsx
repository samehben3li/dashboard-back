import React from 'react';

interface IProps {
  btnText: string;
  onClick: () => void;
}

function DashboardHeader({ btnText, onClick }: IProps) {
  return (
    <div className="dashbord-header-container">
      {btnText && (
        <button type="button" className="dashbord-header-btn" onClick={onClick}>
          {btnText}
        </button>
      )}
    </div>
  );
}

export default DashboardHeader;
