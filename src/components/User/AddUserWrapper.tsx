import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useMutation } from '@apollo/client';
import { IUser, IError } from '../../interfaces';
import { ADD_USER } from '../../requests/mutations';
import Alert from '../common/Alerts/Alert';
import UserFields from '../common/UserFields';
import Form from '../common/Form';

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
      <Form
        onSubmit={handleAddUser}
        setOpenedAlert={setAlertAddUser}
        loading={loading}
        error={error}
        action="actions.CREATE"
      >
        <UserFields userInfo={userInfo} setUserInfo={setUserInfo} />
      </Form>
    </Alert>
  );
}

export default AddUserWrapper;
