import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';

interface IProps {
  setOpenedAlert: Dispatch<SetStateAction<boolean>>;
  className: string;
  action: string;
}

function ButtonOpenAlert({ setOpenedAlert, className, action }: IProps) {
  const { t } = useTranslation();
  return (
    <Button
      className={`btn btn-${className}`}
      onClick={() => setOpenedAlert(true)}
      isSubmit={false}
      disabled={false}
    >
      {t(action)}
    </Button>
  );
}

export default ButtonOpenAlert;
