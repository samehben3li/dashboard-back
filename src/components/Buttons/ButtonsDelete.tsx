import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  setAlertDelete: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  onClick: () => Promise<void>;
}

function ButtonsDelete({ setAlertDelete, loading, onClick }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="btns">
      <button
        type="button"
        className="btn btn-cancel full-width"
        onClick={() => setAlertDelete(false)}
      >
        {`${t('actions.CANCEL')}`}
      </button>
      <button
        type="button"
        className="btn btn-delete full-width"
        onClick={onClick}
        disabled={loading}
      >
        {`${t('actions.DELETE')}`}
      </button>
    </div>
  );
}

export default ButtonsDelete;
