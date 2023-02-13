import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../components/common/Logo';
import Error from '../components/common/Error';
import { inputsOfLogin } from '../utils/constants';
import useLogin from '../hooks/useLogin';
import Main from '../components/common/Main';
import { IUser } from '../interfaces';
import useHandleChange from '../hooks/useHandleChange';
import Button from '../components/common/Buttons/Button';

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

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState({ status: false, message: '' });
  const { loading, handleLogin } = useLogin(setError);
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>
    handleLogin(e, credentials);
  return (
    <Main>
      <Logo />
      <form onSubmit={handleSubmit}>
        {error.status && <Error message={error.message} />}
        {inputsOfLogin.map(input => (
          <InputGroup
            {...input}
            setCredentials={setCredentials}
            value={
              input.name === 'email' ? credentials.email : credentials.password
            }
          />
        ))}
        <Button
          isSubmit
          className="btn btn-primary"
          disabled={loading}
          onClick={undefined}
        >
          {loading ? '...' : t('login.LOGIN')}
        </Button>
      </form>
    </Main>
  );
}

export default Login;
