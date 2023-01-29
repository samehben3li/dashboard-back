import { useMutation } from '@apollo/client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IRiskCategory } from '../../interfaces';
import { DELETE_RISK_CATEGORY } from '../../requests/mutations';

interface IProps {
  setAlertDelete: Dispatch<SetStateAction<boolean>>;
  riskCategory: IRiskCategory;
}

function DeleteRiskCategory({ setAlertDelete, riskCategory }: IProps) {
  const { t } = useTranslation();
  const [deleteRiskCategory, { loading }] = useMutation(DELETE_RISK_CATEGORY);
  const [error, setError] = useState(false);

  const handleDelete = async () => {
    setError(false);
    try {
      const response = await deleteRiskCategory({
        variables: {
          id: riskCategory.id,
        },
      });
      if (response?.data?.deleteRiskCategory === 'RISK_CATEGORY_DELETED') {
        setAlertDelete(false);
      }
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        {error && (
          <span className="error">{t('errors.SOMETHING_WENT_WRONG')}</span>
        )}
        <span>{t('titles.QUESTION_DELETE_USER') + riskCategory.name} ?</span>
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
            onClick={handleDelete}
            disabled={loading}
          >
            {`${t('actions.DELETE')}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteRiskCategory;
