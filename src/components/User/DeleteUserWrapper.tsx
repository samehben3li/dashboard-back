import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDeleteUser } from '../../hooks';
import { IUser } from '../../interfaces';
import { DeleteAlert } from '../common';

interface IProps {
  username: string;
  id: string;
  setAlertDelete: Dispatch<SetStateAction<boolean>>;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

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
      setOpenedAlert={setAlertDelete}
      loading={loading}
      onClick={handleClick}
      error={error}
      name={username}
    />
  );
}

export default DeleteUserWrapper;
