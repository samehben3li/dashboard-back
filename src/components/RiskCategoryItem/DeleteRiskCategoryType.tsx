import { useMutation } from '@apollo/client';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { DELETE_RISK_CATEGORY_TYPE_ACTION } from '../../context/appActions';
import { AppContext } from '../../context/AppContext';
import { IInputOptions, IRiskCategory } from '../../interfaces';
import { DELETE_RISK_CATEGORY_TYPE } from '../../requests/mutations';
import DeleteAlert from '../Alerts/DeleteAlert';

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
  const [deleteRiskCategory, { loading }] = useMutation(
    DELETE_RISK_CATEGORY_TYPE,
  );
  const { dispatch } = useContext(AppContext);

  const handleDelete = async () => {
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
    <DeleteAlert
      error={error}
      name={riskCategoryType.name}
      setAlertDelete={setAlertDelete}
      onClick={handleDelete}
      loading={loading}
    />
  );
}

export default DeleteRiskCategoryType;
