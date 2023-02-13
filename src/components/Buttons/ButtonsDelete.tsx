import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';

interface IProps {
  setAlertDelete: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  onClick: () => Promise<void>;
}

function ButtonsDelete({ setAlertDelete, loading, onClick }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="btns">
      <Button
        className="btn btn-cancel full-width"
        onClick={() => setAlertDelete(false)}
        isSubmit={false}
        disabled={false}
      >
        {t('actions.CANCEL')}
      </Button>
      <Button
        isSubmit={false}
        className="btn btn-delete full-width"
        onClick={onClick}
        disabled={loading}
      >
        {t('actions.DELETE')}
      </Button>
    </div>
  );
}

export default ButtonsDelete;
