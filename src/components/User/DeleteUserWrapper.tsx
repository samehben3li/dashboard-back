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
  const [error, setError] = useState({ status: false, message: '' });
  const { t } = useTranslation();
  const handleDelete = async () => {
    setError({ status: false, message: '' });
    try {
      const responseMutation = await deleteUser({
        variables: {
          id,
        },
      });
      if (responseMutation?.data?.deleteUser === 'DATA_DELETED') {
        setUsers(prev => prev?.filter(u => u.id !== id));
        setAlertDelete(false);
      }
    } catch ({ message, ...err }) {
      setError({
        status: true,
        message:
          message === 'DATA_NOT_FOUND'
            ? 'USER_NOT_FOUND'
            : (message as string) || 'SOMETHING_WENT_WRONG',
      });
    }
  };

  return (
    <div className="alert-container">
      <div className="alert-wrapper">
        {error.status && (
          <span className="error">{`${t(`errors.${error.message}`)}`}</span>
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
