import { useMutation } from '@apollo/client';
import { Dispatch, SetStateAction } from 'react';
import { IError, IUser } from '../interfaces';
import { DELETE_USER } from '../requests/mutations';

const useDeleteUser = (
  setError: Dispatch<SetStateAction<IError>>,
  setUsers: Dispatch<SetStateAction<IUser[]>>,
  setAlertDelete: Dispatch<SetStateAction<boolean>>,
) => {
  const [deleteUser, { loading }] = useMutation(DELETE_USER);
  const handleDelete = async (id: string) => {
    setError({ status: false, message: '' });
    try {
      await deleteUser({
        variables: {
          id,
        },
      });
      setUsers(prev => prev?.filter(u => u.id !== id));
      setAlertDelete(false);
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

export default useDeleteUser;
