import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  setOpenedAlert: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  action: string;
}

function Buttons({ setOpenedAlert, loading, action }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="btns">
      <button
        type="button"
        className="btn btn-cancel full-width"
        onClick={() => setOpenedAlert(false)}
      >
        {`${t('actions.CANCEL')}`}
      </button>
      <button
        type="submit"
        className="btn btn-add full-width"
        disabled={loading}
      >
        {`${t(action)}`}
      </button>
    </div>
  );
}

export default Buttons;
