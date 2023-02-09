import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import useHandleChange from '../../hooks/useHandleChange';
import { IUser } from '../../interfaces';

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

export default UserFields;
