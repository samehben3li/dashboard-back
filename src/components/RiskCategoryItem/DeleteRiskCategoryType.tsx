import { useMutation } from '@apollo/client';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DELETE_RISK_CATEGORY_TYPE_ACTION } from '../../context/appActions';
import { AppContext } from '../../context/AppContext';
import { IInputOptions, IRiskCategory } from '../../interfaces';
import { DELETE_RISK_CATEGORY_TYPE } from '../../requests/mutations';

interface IProps {
  setAlertDelete: Dispatch<SetStateAction<boolean>>;
  riskCategoryType: IInputOptions;
  riskCategoryId: string;
  setRiskCategory: Dispatch<SetStateAction<IRiskCategory>>;
}

function DeleteRiskCategoryType({
  setAlertDelete,
  riskCategoryType,
  riskCategoryId,
  setRiskCategory,
}: IProps) {
  const [error, setError] = useState({ status: false, message: '' });
  const { t } = useTranslation();
  const [deleteRiskCategory, { loading }] = useMutation(
    DELETE_RISK_CATEGORY_TYPE,
  );
  const { dispatch } = useContext(AppContext);

  const handleDelete = () => {
    setError({ status: false, message: '' });
    deleteRiskCategory({
      variables: {
        riskCategoryTypeId: riskCategoryType.id,
        riskCategoryId,
      },
    })
      .then(() => {
        dispatch(
          DELETE_RISK_CATEGORY_TYPE_ACTION(riskCategoryId, riskCategoryType.id),
        );
        setRiskCategory(prev => ({
          ...prev,
          riskCategoryTypes: prev?.riskCategoryTypes?.filter(
            rct => rct.id !== riskCategoryType.id,
          ),
        }));
        setAlertDelete(false);
      })
      .catch(({ message }) =>
        setError({
          status: true,
          message: (message as string) || 'SOMETHING_WENT_WRONG',
        }),
      );
  };

  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        {error.status && (
          <span className="error">{`${t(`errors.${error.message}`)}`}</span>
        )}
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

export default DeleteRiskCategoryType;
