import React, { Dispatch, SetStateAction } from 'react';
import { IUser } from '../../interfaces';
import UserField from './UserField';

interface IPropsInfos {
  userInfo: IUser;
  setUserInfo: Dispatch<SetStateAction<IUser>>;
}

function UserFields({ userInfo, setUserInfo }: IPropsInfos) {
  return (
    <>
      <UserField
        title="login.USERNAME"
        name="username"
        type="text"
        valueOfInput={userInfo.username}
        setUserInfo={setUserInfo}
      />
      <UserField
        title="login.EMAIL"
        name="email"
        type="text"
        valueOfInput={userInfo.email}
        setUserInfo={setUserInfo}
      />
      <UserField
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
