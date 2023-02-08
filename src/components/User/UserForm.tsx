import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import useHandleChange from '../../hooks/useHandleChange';
import { IError, IUser } from '../../interfaces';
import Buttons from '../Buttons/Buttons';
import ErrorContainer from '../Error';

interface IPropsForm {
  userInfo: IUser;
  setAlert: Dispatch<SetStateAction<boolean>>;
  error: IError;
  setUserInfo: Dispatch<SetStateAction<IUser>>;
  loading: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

interface IPropsInfos {
  userInfo: IUser;
  setUserInfo: Dispatch<SetStateAction<IUser>>;
}

interface IPropsField {
  setUserInfo: Dispatch<SetStateAction<IUser>>;
  valueOfInput: string | undefined;
  title: string;
  type: string;
  name: string;
}

function Field({ setUserInfo, title, ...props }: IPropsField) {
  const { t } = useTranslation();
  const handleChange = useHandleChange(setUserInfo);
  return (
    <div className="field">
      <span>{`${t(title)}`} : </span>
      <input {...props} placeholder={`${t(title)}`} onChange={handleChange} />
    </div>
  );
}

function UserFields({ userInfo, setUserInfo }: IPropsInfos) {
  return (
    <>
      <Field
        title="login.USERNAME"
        name="username"
        type="text"
        valueOfInput={userInfo.username}
        setUserInfo={setUserInfo}
      />
      <Field
        title="login.EMAIL"
        name="email"
        type="text"
        valueOfInput={userInfo.email}
        setUserInfo={setUserInfo}
      />
      <Field
        title="login.PASSWORD"
        name="password"
        type="password"
        valueOfInput={userInfo.password}
        setUserInfo={setUserInfo}
      />
    </>
  );
}

function UserForm({
  userInfo,
  setAlert,
  error,
  setUserInfo,
  loading,
  onSubmit,
}: IPropsForm) {
  return (
    <form onSubmit={onSubmit}>
      {error.status && <ErrorContainer message={error.message} />}
      <UserFields setUserInfo={setUserInfo} userInfo={userInfo} />
      <Buttons
        setOpenedAlert={setAlert}
        loading={loading}
        action="actions.CREATE"
      />
    </form>
  );
}

export default UserForm;
