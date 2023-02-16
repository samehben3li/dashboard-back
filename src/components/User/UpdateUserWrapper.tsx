import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useMutation } from '@apollo/client';
import { IError, IUser } from '../../interfaces';
import { UPDATE_USER } from '../../requests/mutations';
import { Alert, Form, UserFields } from '../common';

interface IProps {
  setAlertUpdate: Dispatch<SetStateAction<boolean>>;
  user: IUser;
}

const useUpdateUser = (
  setError: Dispatch<SetStateAction<IError>>,
  setAlertUpdate: Dispatch<SetStateAction<boolean>>,
) => {
  const [updateUserMutation, { loading }] = useMutation(UPDATE_USER);
  const handleUpdate = async (
    e: FormEvent<HTMLFormElement>,
    userInfo: IUser,
  ) => {
    e.preventDefault();
    setError({ status: false, message: '' });
    try {
      await updateUserMutation({
        variables: {
          ...userInfo,
        },
      });
      setAlertUpdate(false);
    } catch ({ message }) {
      setError({
        status: true,
        message: (message as string) || 'SOMETHING_WENT_WRONG',
      });
    }
  };
  return { handleUpdate, loading };
};

function UpdateUserWrapper({ setAlertUpdate, user }: IProps) {
  const [userInfo, setUserInfo] = useState(user);
  const [error, setError] = useState({ status: false, message: '' });
  const { handleUpdate, loading } = useUpdateUser(setError, setAlertUpdate);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) =>
    handleUpdate(e, userInfo);

  return (
    <Alert title="titles.UPDATE_USER">
      <Form
        onSubmit={onSubmit}
        setOpenedAlert={setAlertUpdate}
        error={error}
        loading={loading}
        action="actions.UPDATE"
      >
        <UserFields userInfo={userInfo} setUserInfo={setUserInfo} />
      </Form>
    </Alert>
  );
}

export default UpdateUserWrapper;
