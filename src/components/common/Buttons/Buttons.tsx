import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import CancelButton from './CancelButton';

interface IProps {
  setOpenedAlert: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  action: string;
  isSubmit: boolean;
  onClick: (() => Promise<void>) | undefined;
}

function Buttons({
  setOpenedAlert,
  loading,
  action,
  isSubmit,
  onClick,
}: IProps) {
  const { t } = useTranslation();
  return (
    <div className="btns">
      <CancelButton
        setOpenedAlert={setOpenedAlert}
        addedClassName="full-width"
      />
      <Button
        isSubmit={isSubmit}
        className={
          isSubmit ? 'btn btn-add full-width' : 'btn btn-delete full-width'
        }
        disabled={loading}
        onClick={onClick}
      >
        {t(action)}
      </Button>
    </div>
  );
}

export default Buttons;
