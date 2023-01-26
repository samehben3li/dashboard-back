import React from 'react';

interface IProps {
  btnText: string;
  onClick: () => void;
}

function DashboardHeader({ btnText, onClick }: IProps) {
  return (
    <div className="header-container">
      {btnText && (
        <button type="button" className="btn btn-header" onClick={onClick}>
          {btnText}
        </button>
      )}
    </div>
  );
}

export default DashboardHeader;
