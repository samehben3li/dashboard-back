import React, { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { IError, IUser } from '../../interfaces';
import { DELETE_USER } from '../../requests/mutations';
import Alert from '../Alert';
import Error from '../Error';

interface IProps {
  username: string;
  id: string;
  setAlertDelete: Dispatch<SetStateAction<boolean>>;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

interface IPropsButtons {
  setAlertDelete: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  onClick: () => Promise<void>;
}

const useDeleteUser = (
  setError: Dispatch<SetStateAction<IError>>,
  setUsers: Dispatch<SetStateAction<IUser[]>>,
  setAlertDelete: Dispatch<SetStateAction<boolean>>,
  id: string,
) => {
  const [deleteUser, { loading }] = useMutation(DELETE_USER);
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
  return { handleDelete, loading };
};

function ButtonsDelete({ setAlertDelete, loading, onClick }: IPropsButtons) {
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

function DeleteUserWrapper({ username, id, setAlertDelete, setUsers }: IProps) {
  const [error, setError] = useState({ status: false, message: '' });
  const { t } = useTranslation();
  const { handleDelete, loading } = useDeleteUser(
    setError,
    setUsers,
    setAlertDelete,
    id,
  );

  return (
    <Alert title={null}>
      {error.status && <Error message={error.message} />}
      <span>{t('titles.QUESTION_DELETE_USER') + username} ?</span>
      <ButtonsDelete
        setAlertDelete={setAlertDelete}
        loading={loading}
        onClick={handleDelete}
      />
    </Alert>
  );
}

export default DeleteUserWrapper;
