import { useMutation } from '@apollo/client';
import React, { Dispatch, SetStateAction, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DELETE_RISK_CATEGORY_ACTION } from '../../context/appActions';
import { AppContext } from '../../context/AppContext';
import { IRiskCategory } from '../../interfaces';
import { DELETE_RISK_CATEGORY } from '../../requests/mutations';
import DeleteAlert from '../common/Alerts/DeleteAlert';

interface IProps {
  setAlertDelete: Dispatch<SetStateAction<boolean>>;
  riskCategory: IRiskCategory;
}

function DeleteRiskCategory({ setAlertDelete, riskCategory }: IProps) {
  const [deleteRiskCategory, { loading }] = useMutation(DELETE_RISK_CATEGORY);
  const { dispatch } = useContext(AppContext);
  const [error, setError] = useState({ status: false, message: '' });
  const navigate = useNavigate();

  const handleDelete = async () => {
    setError({ status: false, message: '' });
    try {
      const response = await deleteRiskCategory({
        variables: {
          id: riskCategory.id,
        },
      });
      if (response?.data?.deleteRiskCategory === 'DATA_DELETED') {
        dispatch(DELETE_RISK_CATEGORY_ACTION(riskCategory.id));
        setAlertDelete(false);
        navigate('/riskcategories');
      }
    } catch ({ message }) {
      setError({
        status: true,
        message: (message as string) || 'SOMETHING_WENT_WRONG',
      });
    }
  };
  return (
    <DeleteAlert
      setOpenedAlert={setAlertDelete}
      onClick={handleDelete}
      loading={loading}
      error={error}
      name={riskCategory.name}
    />
  );
}

export default DeleteRiskCategory;
