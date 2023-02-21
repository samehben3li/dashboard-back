import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import { IError, IUser } from '../../../interfaces';
import Form from '../Form';
import UserFields from '../UserFields';
import Alert from './Alert';

interface IProps {
  title: string;
  setOpenedAlert: Dispatch<SetStateAction<boolean>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  loading: boolean;
  action: string;
  error: IError;
  userInfo: IUser;
  setUserInfo: Dispatch<SetStateAction<IUser>>;
}

function AlertOfUser({
  title,
  setOpenedAlert,
  onSubmit,
  error,
  action,
  loading,
  userInfo,
  setUserInfo,
}: IProps) {
  return (
    <Alert title={`titles.${title}`}>
      <Form
        onSubmit={onSubmit}
        setOpenedAlert={setOpenedAlert}
        error={error}
        loading={loading}
        action={`actions.${action}`}
      >
        <UserFields userInfo={userInfo} setUserInfo={setUserInfo} />
      </Form>
    </Alert>
  );
}

export default AlertOfUser;
