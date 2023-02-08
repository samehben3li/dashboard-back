import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useMutation } from '@apollo/client';
import { IUser, IError } from '../../interfaces';
import { ADD_USER } from '../../requests/mutations';
import Alert from '../Alert';
import UserForm from './UserForm';

interface IProps {
  setAlertAddUser: Dispatch<SetStateAction<boolean>>;
  setUsers: Dispatch<SetStateAction<IUser[]>>;
}

const initStateCred = {
  username: '',
  password: '',
  email: '',
};

const useCreateUser = (
  setError: Dispatch<SetStateAction<IError>>,
  setAlertAddUser: Dispatch<SetStateAction<boolean>>,
  setUsers: Dispatch<SetStateAction<IUser[]>>,
) => {
  const [createUser, { loading }] = useMutation(ADD_USER);
  const handleCreateUser = async (
    e: FormEvent<HTMLFormElement>,
    userInfo: IUser,
  ) => {
    e.preventDefault();
    setError({ status: false, message: '' });
    try {
      const response = await createUser({
        variables: {
          ...userInfo,
        },
      });
      setUsers(prev => [...prev, response?.data?.createUser]);
      setAlertAddUser(false);
    } catch ({ message }) {
      setError({
        status: true,
        message: (message as string) || 'SOMETHING_WENT_WRONG',
      });
    }
  };
  return { handleCreateUser, loading };
};

function AddUserWrapper({ setAlertAddUser, setUsers }: IProps) {
  const [userInfo, setUserInfo] = useState<IUser>(initStateCred);
  const [error, setError] = useState({ status: false, message: '' });
  const { handleCreateUser, loading } = useCreateUser(
    setError,
    setAlertAddUser,
    setUsers,
  );

  const handleAddUser = (e: FormEvent<HTMLFormElement>) =>
    handleCreateUser(e, userInfo);

  return (
    <Alert title="titles.NEW_USER_INFO">
      <UserForm
        setAlert={setAlertAddUser}
        userInfo={userInfo}
        error={error}
        setUserInfo={setUserInfo}
        loading={loading}
        onSubmit={handleAddUser}
      />
    </Alert>
  );
}

export default AddUserWrapper;
