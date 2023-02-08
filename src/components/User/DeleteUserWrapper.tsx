import React, { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from '@apollo/client';
import { IError, IUser } from '../../interfaces';
import { DELETE_USER } from '../../requests/mutations';
import DeleteAlert from '../Alerts/DeleteAlert';

interface IProps {
  username: string;
  id: string;
  setAlertDelete: Dispatch<SetStateAction<boolean>>;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

const useDeleteUser = (
  setError: Dispatch<SetStateAction<IError>>,
  setUsers: Dispatch<SetStateAction<IUser[]>>,
  setAlertDelete: Dispatch<SetStateAction<boolean>>,
) => {
  const [deleteUser, { loading }] = useMutation(DELETE_USER);
  const handleDelete = async (id: string) => {
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

function DeleteUserWrapper({ username, id, setAlertDelete, setUsers }: IProps) {
  const [error, setError] = useState({ status: false, message: '' });
  const { handleDelete, loading } = useDeleteUser(
    setError,
    setUsers,
    setAlertDelete,
  );

  const handleClick = () => handleDelete(id);

  return (
    <DeleteAlert
      setAlertDelete={setAlertDelete}
      loading={loading}
      onClick={handleClick}
      error={error}
      name={username}
    />
  );
}

export default DeleteUserWrapper;
