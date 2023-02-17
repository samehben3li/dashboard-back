import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useHandleChange } from '../../hooks';
import { IUser } from '../../interfaces';

interface IPropsInput {
  type: string;
  name: string;
  className: string;
  placeholder: string;
  setCredentials: Dispatch<SetStateAction<IUser>>;
  value: string;
}

function InputGroup({ setCredentials, placeholder, ...props }: IPropsInput) {
  const { t } = useTranslation();
  const handleChange = useHandleChange(setCredentials);

  return (
    <div className="input-group">
      <input
        {...props}
        onChange={handleChange}
        placeholder={`${t(placeholder)}`}
      />
      <div className="input-icon" />
    </div>
  );
}

export default InputGroup;
