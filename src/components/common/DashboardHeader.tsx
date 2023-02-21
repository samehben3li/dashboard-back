import React, { Dispatch, SetStateAction } from 'react';
import ButtonOpenAlert from './Buttons/ButtonOpenAlert';

interface IProps {
  btnText: string;
  setOpenedAlert: Dispatch<SetStateAction<boolean>>;
}

function DashboardHeader({ btnText, setOpenedAlert }: IProps) {
  return (
    <div className="header-container">
      {btnText && (
        <ButtonOpenAlert
          className="header"
          setOpenedAlert={setOpenedAlert}
          action={btnText}
        />
      )}
    </div>
  );
}

export default DashboardHeader;
