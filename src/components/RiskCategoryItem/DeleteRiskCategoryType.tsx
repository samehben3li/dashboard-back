import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { IInputOptions } from '../../interfaces';

interface IProps {
  setAlertDelete: Dispatch<SetStateAction<boolean>>;
  riskCategoryType: IInputOptions;
}

function DeleteRiskCategoryType({ setAlertDelete, riskCategoryType }: IProps) {
  const { t } = useTranslation();
  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        <span>
          {t('titles.QUESTION_DELETE_USER') + riskCategoryType.name} ?
        </span>
        <div className="btns">
          <button
            type="button"
            className="btn btn-cancel full-width"
            onClick={() => setAlertDelete(false)}
          >
            {`${t('actions.CANCEL')}`}
          </button>
          <button type="button" className="btn btn-delete full-width">
            {`${t('actions.DELETE')}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteRiskCategoryType;
