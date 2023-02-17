import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useHandleChange } from '../../hooks';
import { IUser } from '../../interfaces';

interface IPropsField {
  setUserInfo: Dispatch<SetStateAction<IUser>>;
  valueOfInput: string | undefined;
  title: string;
  type: string;
  name: string;
}

function UserField({
  setUserInfo,
  title,
  valueOfInput,
  ...props
}: IPropsField) {
  const { t } = useTranslation();
  const handleChange = useHandleChange(setUserInfo);
  return (
    <div className="field">
      <span>{t(title)} : </span>
      <input
        {...props}
        placeholder={`${t(title)}`}
        value={valueOfInput}
        onChange={handleChange}
      />
    </div>
  );
}

export default UserField;
