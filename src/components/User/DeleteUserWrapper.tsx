import React, { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { IUser } from '../../interfaces';
import { DELETE_USER } from '../../requests/mutations';

interface IProps {
  username: string;
  id: string;
  setAlertDelete: Dispatch<SetStateAction<boolean>>;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

function DeleteUserWrapper({ username, id, setAlertDelete, setUsers }: IProps) {
  const [deleteUser, { loading }] = useMutation(DELETE_USER);
  const [error, setError] = useState(false);
  const { t } = useTranslation();
  const handleDelete = async () => {
    setError(false);
    try {
      const responseMutation = await deleteUser({
        variables: {
          id,
        },
      });
      if (responseMutation?.data?.deleteUser === 'USER_DELETED') {
        setUsers(prev => prev?.filter(u => u.id !== id));
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
          <span className="error">{`${t('errors.SOMETHING_WENT_WRONG')}`}</span>
        )}
        <span>{t('titles.QUESTION_DELETE_USER') + username} ?</span>
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

export default DeleteUserWrapper;
