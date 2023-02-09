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
        action="actions.CANCEL"
        className="btn btn-cancel full-width"
        onClick={() => setAlertDelete(false)}
      />
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
