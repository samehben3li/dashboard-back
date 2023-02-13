import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';

interface IProps {
  setOpenedAlert: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  action: string;
}

function Buttons({ setOpenedAlert, loading, action }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="btns">
      <Button
        className="btn btn-cancel full-width"
        onClick={() => setOpenedAlert(false)}
        isSubmit={false}
        disabled={false}
      >
        {t('actions.CANCEL')}
      </Button>
      <Button
        isSubmit
        className="btn btn-add full-width"
        disabled={loading}
        onClick={undefined}
      >
        {t(action)}
      </Button>
    </div>
  );
}

export default Buttons;
