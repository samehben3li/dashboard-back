import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';

interface IProps {
  setOpenedAlert: Dispatch<SetStateAction<boolean>>;
  addedClassName: string | undefined;
}

function CancelButton({ setOpenedAlert, addedClassName }: IProps) {
  const { t } = useTranslation();
  return (
    <Button
      className={`btn btn-cancel ${addedClassName || ''}`}
      onClick={() => setOpenedAlert(false)}
      isSubmit={false}
      disabled={false}
    >
      {t('actions.CANCEL')}
    </Button>
  );
}

export default CancelButton;
